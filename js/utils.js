import LZString from 'lz-string';
import { Board } from './Board.js';
import { Item } from './Item.js';
import { Skill } from './Skill.js';

export function getRarityValue(valueString, rarity) {
    // Parse values (e.g., "1 » 2 » 3 » 4" or "1 >> 2" into [1, 2, 3, 4] or [1, 2] )
    const values = valueString.split(/[»>]+/).map(v => parseFloat(v.trim()));
    
    // Get the appropriate value based on item's rarity
    const rarityIndex = Item.rarityLevels.indexOf(rarity || 'Bronze');
    return values[rarityIndex-(4-values.length)] || values[0];
}

export function updateUrlState() {        
    if(window.isLoadingFromUrl) { return; }
    const boardState = Array.from(Board.boards.values())
    .flatMap(board => board.items)
    .map(item => {
        let toReturn = {name: item.name, startIndex: item.startIndex, board: item.board.boardId};
        if(item.rarity && item.rarity!='Bronze') toReturn.rarity = item.rarity;
        const [baseName] = Item.stripEnchantFromName(item.name);   
        const baseItem = structuredClone(items[baseName]);

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
        if(parseInt(item.getStartingCooldownFromText(baseItem.cooldown)) == parseInt(item.getStartingCooldownFromText(item.startItemData.cooldown)))
            delete toReturn.cooldown;
        else {
            toReturn.cooldown = parseInt(item.startItemData.cooldown);
        }
        return toReturn;
    });
    
    Board.boards.forEach(board=>{
        boardState.push({
            name: 'DataForBoard_'+board.boardId,
            health: board.player.maxHealth,
            skills: board.skills.map(skill => ({name: skill.name, tier: Item.rarityLevels.indexOf(skill.rarity)}))
        });
    });



    // Compress the JSON string using LZ compression
    const stateStr = LZString.compressToEncodedURIComponent(JSON.stringify(boardState));
    window.history.replaceState(null, '', `#${stateStr}`);
}
export function colorTextArray(textArray, rarityIndex) {
    return Array.isArray(textArray) ? 
        textArray.map(line => {
            // Match patterns like ( X » Y » Z » W )

            return line.replace(/\(\s*((?:[^»)]+\s*»\s*)*[^»)]+)\s*\)/g, (match, values) => {
                const parts = values.split('»').map(s => s.trim());
                const selectedValue = parts[Math.min(rarityIndex, parts.length - 1)];
                return `(${parts.map((val, i) => 
                    i+(4-parts.length) === rarityIndex ? `<b class="rarity-${Item.rarityLevels[rarityIndex]}">${val}</b>` : val
                ).join(' » ')})`;
            });
        }).join('<br>') : 

        (textArray || '');
}
export function loadFromUrl(hash) {
    if(!hash) hash = window.location.hash.slice(1); // Remove the # symbol
    if (!hash) return;
    window.isLoadingFromUrl = true;
    try {
        if(hash.length < 10) {
            firebase.database().ref('tinyurls/'+parseInt(hash, 36)).once('value').then(snapshot => {
                const url = snapshot.val().url;
                loadFromUrl(url);
                return;
            });
            return;
        }


        // Decompress the state string
        const boardState = JSON.parse(LZString.decompressFromEncodedURIComponent(hash));
        // Add items from URL state
        boardState.forEach((item) => {
            if(item.name.startsWith('DataForBoard_')) {
                const board = Board.getBoardFromId(item.name.slice(13));
                board.player.maxHealth = item.health;
                board.player.health = item.health;

                item.skills.forEach(skill => {
                    board.addSkill(skill.name,{rarity:Item.rarityLevels[parseInt(skill.tier)]});
                });



                board.updateHealthElement();
                return;

            }
            const { board, startIndex, name, ...itemWithoutBoardAndStartIndex} = item;

            const [baseName, enchant] = Item.stripEnchantFromName(name);

            const newItemData = structuredClone(items[baseName]);
            Object.assign(newItemData, itemWithoutBoardAndStartIndex);   
            const newItem = new Item(newItemData, Board.getBoardFromId(board));

            newItem.enchant = enchant;
            newItem.name = name;
            newItem.setIndex(startIndex);
        });
        Board.resetBoards();
    } catch (error) {
        console.error('Error loading board state from URL:', error);
    }

    window.isLoadingFromUrl = false;
}

export function setupChangeListeners(obj,arr) {
    arr.forEach(key=>{
        if(obj[key] != undefined) {
            obj[key+"_changedMap"] = new Map();
            obj[key+"_changedArray"] = [];
            obj[key] = 0;
            return;
        }
        var value = 0;
        obj[key+"_changedMap"] = new Map();
        obj[key+"_changedArray"] = [];
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
            value = v;
            if(obj[key+"_pauseChanged"]) return;
            obj[key+"_changedMap"].forEach(f=>f(v, oldValue));
            obj[key+"_changedArray"].forEach(f=>f(v, oldValue));
        }

        });
    });
}