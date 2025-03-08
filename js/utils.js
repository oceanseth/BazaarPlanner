import LZString from 'lz-string';
import { Board } from './Board.js';
import { Item } from './Item.js';
import { Skill } from './Skill.js';


export function colorTextArray(textArray, rarityIndex) {
    return Array.isArray(textArray) ? 
        textArray.map(line => {
            line=line.replace(/(?:^|\s)(Ammo|Haste|Charge|Heal|Shield|Slow|Lifesteal|Freeze|Multicast|(?:\([^\)]+\)|\d+) Damage|Burn|Poison|Crit Chance|Value)( |\.|,|:)/gi," <font class='$1'>$1</font>$2");
         
            // Match patterns like ( X » Y » Z » W ) or ( X / Y / Z / W )
            return line.replace(/\(\s*((?:[^»)\/]+\s*[»\/]\s*)*[^»)\/]+)\s*\)/g, (match, values) => {
                const parts = values.split(/[»\/]/).map(s => s.trim());
                const selectedValue = parts[Math.min(rarityIndex, parts.length - 1)];
                return `(${parts.map((val, i) => 
                    i+(4-parts.length) === rarityIndex ? `<b class="rarity-${Item.rarityLevels[rarityIndex]}">${val}</b>` : val
                ).join(' » ')})`;
            });
        }).join('<br>') : 

        (textArray || '');
}

export function getRarityValue(valueString, rarity) {
    if(valueString==undefined) {
        console.log("gettingRarityValue of undefined ");
        return 0;
    }
    if(typeof valueString === 'number') {
        return ""+valueString;
    }
    if(valueString[0]=='(') {
        valueString = valueString.slice(1,-1);
    }
    // Parse values (e.g., "1 » 2 » 3 » 4" or "1 >> 2" into [1, 2, 3, 4] or [1, 2] )
    const values = valueString.split(/[»>\/]+/).map(v => parseFloat(v.trim()));
    
    // Get the appropriate value based on item's rarity
    const rarityIndex = Item.rarityLevels.indexOf(rarity || 'Bronze');
    return values[rarityIndex-(4-values.length)] || values[0];
}

export function updateUrlState() {        
    if(window.isLoadingFromUrl) { return; }
    topPlayer.battle.calculateWinRate();
    const boardState = [topPlayer.board,bottomPlayer.board]
    .flatMap(board => board.items)
    .map(item => {
        let toReturn = {name: item.name, startIndex: item.startIndex, board: item.board.boardId};
        if(item.rarity && item.rarity!='Bronze') toReturn.rarity = item.rarity;
        const [baseName] = Item.stripEnchantFromName(item.name);   
        const baseItem = structuredClone(items[baseName]);
        const testItem = new Item(baseItem);

        for(const key in baseItem) {
            if (Array.isArray(baseItem[key]) && Array.isArray(item[key])) {
                // Compare arrays by checking if they have the same values
                if (!baseItem[key].every((val, i) => val === item[key][i]) || 
                    baseItem[key].length !== item[key].length) {
                    toReturn[key] = item[key];
                }
            } else if (typeof baseItem[key] === 'object' && baseItem[key] !== null && 
                        typeof item[key] === 'object' && item[key] !== null) {
                // Deep compare objects
                const baseKeys = Object.keys(baseItem[key]);
                const itemKeys = Object.keys(item[key]);
                
                if (baseKeys.length !== itemKeys.length || 
                    !baseKeys.every(k => baseItem[key][k] === item[key][k])) {
                    toReturn[key] = item[key];
                }
            } else if(baseItem[key] != item[key]) {
                toReturn[key] = item[key];
            }
        }
        
        for(const key in item.startItemData) {
            if(item.startItemData[key] && baseItem[key] == undefined && testItem.startItemData[key] != item[key]) {
                toReturn[key] = item.startItemData[key];
            }
        }
        
        
        Item.possibleChangeAttributes.forEach(attribute=>{
            if(item[attribute] != undefined && baseItem[attribute] != item.startItemData[attribute]) {
                toReturn[attribute] = item.startItemData[attribute];
            } else {
                delete toReturn[attribute];
            }
        });
        if(item.lifesteal) {
            toReturn.lifesteal = true;
        }
        if(parseInt(item.getStartingCooldownFromText(baseItem.cooldown)) == parseInt(item.getStartingCooldownFromText(item.startItemData.cooldown)))
            delete toReturn.cooldown;
        else {
            toReturn.cooldown = parseInt(item.startItemData.cooldown);
        }

        return toReturn;
    });
    
    [topPlayer.board,bottomPlayer.board].forEach(board=>{
        const aBoardState ={
            name: '_b_'+board.boardId,
            health: board.player.maxHealth,
            regen: board.player.regen,
            playerName: board.player.name,
            skills: board.skills.map(skill => {
                const skillData = {name: skill.name};
                if(skills[skill.name].tier != skill.tier) {
                    skillData.tier = skill.tier;
                }
                if(skills[skill.name].text.join('\n') != skill.text.join('\n')) {
                    skillData.text = skill.text;
                }
                return skillData;
            })
        };
        if(aBoardState.skills.length == 0) {
            delete aBoardState.skills;
        }
        boardState.push(aBoardState);
    });



    // Compress the JSON string using LZ compression
    const stateStr = LZString.compressToEncodedURIComponent(JSON.stringify(boardState));
    window.history.pushState({state: stateStr}, '', `#${stateStr}`);
}
window.addEventListener('popstate', () => {
    loadFromUrl();  // This will load the state from the current URL hash
});


export function loadFromUrl(hash) {
    if(!hash && window.previouslyLoadedHash == window.location.hash) {
        return;
    }
    if(!hash) hash = window.location.hash.slice(1); // Remove the # symbol
    if (!hash) return;
    window.isLoadingFromUrl = true;
    const boardsCleared = new Map();

    try {
        if(hash.length < 10) {
            firebase.database().ref('tinyurls/'+parseInt(hash, 36)).once('value').then(snapshot => {
                const url = snapshot.val().url;
                loadFromUrl(url);
                return;
            });
            return;
        }
            
        window.isLoadingFromUrl = true;
        window.previouslyLoadedHash = window.location.hash;
        
        let newItems = [];
        // Decompress the state string
        const boardState = JSON.parse(LZString.decompressFromEncodedURIComponent(hash));
        // Add items from URL state
        boardState.forEach((boardStateObject) => {
            if(boardStateObject.name.startsWith('_b_')) {
                const boardId = boardStateObject.name.slice(3);
                const board = Board.getBoardFromId(boardId);
                if(!boardsCleared.has(boardId)) {
                    board.clear();
                    boardsCleared.set(boardId,board);
                }
                board.player.startPlayerData.maxHealth = boardStateObject.health;
                if(boardStateObject.playerName) board.player.startPlayerData.name = boardStateObject.playerName;
                if(boardStateObject.regen) board.player.startPlayerData.regen = boardStateObject.regen;
                    
                if(boardStateObject.skills) {
                    boardStateObject.skills.forEach(skill => {
                        board.addSkill(skill.name,skill);
                    });
                }

                board.updateHealthElement();
                return;
            }
            const { board, startIndex, name, ...itemWithoutBoardAndStartIndex} = boardStateObject;
            const boardId = board;
            const theBoard = Board.getBoardFromId(boardId);
            if(!boardsCleared.has(boardId)) {
                theBoard.clear();
                boardsCleared.set(boardId,theBoard);
            }

            const [baseName, enchant] = Item.stripEnchantFromName(name);

            const newItemData = structuredClone(items[baseName]);
            Object.assign(newItemData, itemWithoutBoardAndStartIndex);
            const newItem = new Item(newItemData, theBoard);
            newItem.enchant = enchant;
            newItem.name = name;
            newItem.setIndex(startIndex);
        });       

        boardsCleared.forEach((board) => {
            board.reset();
            board.setup();
        });
    } catch (error) {
        console.error('Error loading board state from URL:', error);
    }

    window.isLoadingFromUrl = false;
    //topPlayer.battle.calculateWinRate();
}

export function setupChangeListeners(obj,arr) {
    arr.forEach(key=>{
        if(obj[key] !== undefined) {
            obj[key+"_changedMap"] = new Map();
            obj[key+"_changedArray"] = [];
            obj[key+"_multiplier"] = 1;
            obj[key] = 0;
            return;
        }
        var value = 0;
        obj[key+"_changedMap"] = new Map();
        obj[key+"_changedArray"] = [];
        obj[key+"_multiplier"] = 1;
        obj[key+"Changed"] = (f, source)=>{
            if(source) {
                obj[key+"_changedMap"].set(source,f);
            } else {
                obj[key+"_changedArray"].push(f);
            }
        }

        obj[key+"CancelChanged"] = (source)=>{
            obj[key+"_changedMap"].delete(source);
        }


        Object.defineProperty(obj, key, {
        get: function () { return value; },
        set: function (v) {
            const oldValue = value;
            value = (v-oldValue)*obj[key+"_multiplier"]+oldValue;
            if(obj[key+"_pauseChanged"]) return;
            obj[key+"_changedMap"].forEach(f=>f(value, oldValue));
            obj[key+"_changedArray"].forEach(f=>f(value, oldValue));
        }

        });
    });
}