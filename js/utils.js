import LZString from 'lz-string';
import { Board } from './Board.js';
import { Item } from './Item.js';
import { Skill } from './Skill.js';
import { Run } from './Run.js';

export function colorTextArray(textArray, rarityIndex) {
    return Array.isArray(textArray) ? 
        textArray.map(line => {
            line=line.replace(/(?:^|\s)(Deadly|Golden|Obsidian|Shiny|Fiery|Toxic|Shielded|Heavy|Icy|Turbo|Restorative|Radiant|Ammo|Haste|Charge|Heal|Shield|Slow|Lifesteal|Freeze|Multicast|(?:\([^\)]+\)|\d+) Damage|Burn|Regeneration|Poison|Crit Chance|Value)( |\.|,|:|$)/gi,
                (match, group1, group2) => {
                    const capitalized = group1.charAt(0).toUpperCase() + group1.slice(1);
                    return ` <font class='${capitalized}'>${capitalized}</font>${group2}`;
                });
         
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
    const boardState = [topPlayer.board,bottomPlayer.board]
    .flatMap(board => board.items)
    .map(item => {
        let toReturn = {name: item.name, startIndex: item.startIndex, board: item.board.boardId};
        if(item.rarity && item.rarity!='Bronze') toReturn.tier = Item.rarityLevels.indexOf(item.rarity);
        const [baseName] = Item.stripEnchantFromName(item.name);   
        const baseItem = structuredClone(items[baseName]);
        const testItem = new Item(baseItem);

        
        for(const key in item.startItemData) {
            if(Array.isArray(item.startItemData[key])) {
                toReturn[key] = item.startItemData[key].filter(tag=>!testItem[key].includes(tag));         
                if(toReturn[key].length == 0) {
                    delete toReturn[key];
                }
            } else if(item.startItemData[key] && baseItem[key] == undefined && testItem.startItemData[key] != item[key]) {
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
        if(parseFloat(item.getStartingCooldownFromText(baseItem.cooldown)) == parseFloat(item.getStartingCooldownFromText(item.startItemData.cooldown)))
            delete toReturn.cooldown;
        else {
            toReturn.cooldown = parseFloat(item.startItemData.cooldown);
        }
        delete toReturn.rarity;
        return toReturn;
    });
    
    [topPlayer.board,bottomPlayer.board].forEach(board=>{
        const aBoardState ={
            name: '_b_'+board.boardId,
            health: board.player.maxHealth,
            regen: board.player.regen||0,
            playerName: board.player.name,
            hero: board.player.hero,
            level: board.player.level||1,
            gold: board.player.gold||0,
            shield: board.player.shield||0,
            income: board.player.income||5,
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
    if(hash.startsWith('run=')) {
        const params = new URLSearchParams(hash);
        Run.loadRunInSim(params.get('run'), params.get('e'), params.get('u'));
        return;
    }
    User.updateUserPresence();
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
        let skillFunctions = [];
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
                if(boardStateObject.shield!==undefined) board.player.startPlayerData.shield = boardStateObject.shield;
                if(boardStateObject.hero=='Common') {
                    for(const monsterIndex in window.monsters) {
                        const monster = window.monsters[monsterIndex];
                        if( monster.level==boardStateObject.level && monster.health==boardStateObject.health && (monster.skills.length==0 || boardStateObject.skills.some(skill=>skill.name==monster.skills[0].name))) {
                            board.player.startPlayerData.name = monster.name;
                            board.player.startPlayerData.hero = monster.name;
                            break;
                        }
                    }
                } else {
                    if(boardStateObject.playerName) board.player.startPlayerData.name = boardStateObject.playerName;
                    if(boardStateObject.hero) board.player.startPlayerData.hero = boardStateObject.hero;
                }
                if(boardStateObject.regen!==undefined) board.player.startPlayerData.regen = boardStateObject.regen;
                else board.player.startPlayerData.regen = 0;
                if(boardStateObject.gold!==undefined) board.player.startPlayerData.gold = boardStateObject.gold;
                else board.player.startPlayerData.gold = 0;
                if(boardStateObject.income!==undefined) board.player.startPlayerData.income = boardStateObject.income;
                else board.player.startPlayerData.income = 0;
                    
                if(boardStateObject.skills) {
                    boardStateObject.skills.forEach(skill => {
                        //skillFunctions.push(()=>{
                            board.addSkill(skill.name,skill);
                        //});
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
            const tags = newItemData.tags?[...newItemData.tags]:[];
            Object.assign(newItemData, itemWithoutBoardAndStartIndex);
            tags.forEach(tag=>{
               if(!newItemData.tags.includes(tag)) {
                newItemData.tags.push(tag);
               }
            });
            const newItem = new Item(newItemData, theBoard);
            newItem.enchant = enchant;
            newItem.name = name;
            newItem.setIndex(startIndex);
        });       
        let refreshBoards = () =>{
            boardsCleared.forEach((board) => {
                if(board.player) {
                    board.player.reset();
                } else {
                    board.reset();
                }   
            });
            boardsCleared.forEach((board) => {
                if(board.player) {
                    board.player.setup();
                } else {
                    board.setup();
                }
            });
        };

        refreshBoards();
        let itemsToEvaluate = [...boardsCleared.values()].flatMap(board=>board.items);
        
        itemsToEvaluate.forEach(item=>{
            ["slow","freeze","haste"].forEach(attribute=>{
                if(item[attribute+"Final"] != undefined) {
                    item.startItemData[attribute] = (item.startItemData[attribute] || 0) + (item[attribute+"Final"]/1000 - item[attribute]);
                    delete item.startItemData[attribute+"Final"];                    
                    delete item[attribute+"Final"];
                }
            });
            if(item.cooldownFinal != undefined) {  
                if(item.cooldownFinal < 100) item.cooldownFinal *= 1000; //fix anyone running previous version of importer, can remove this in a month or so
                item.startItemData.cooldown = (item.startItemData.cooldown || 0) + ((item.cooldownFinal - item.cooldown)/ 1000);
                delete item.startItemData.cooldownFinal;
                delete item.cooldownFinal;
            }
            if(item.valueFinal != undefined) {
                item.startItemData.value = (item.startItemData.value || 0) + (item.valueFinal - item.value);
                delete item.startItemData.valueFinal;
                delete item.valueFinal;
            }
            if(item.ammoFinal != undefined) {
                item.startItemData.ammo = (item.startItemData.ammo || 0) + (item.ammoFinal - item.ammo);
                delete item.startItemData.ammoFinal;
                delete item.ammoFinal;
            }
        });
        refreshBoards();
        
        itemsToEvaluate.forEach(item=>{
            let numTries = 0;
            while(Item.possibleChangeAttributes.some(attribute=>item[attribute+"Final"] != undefined && item[attribute+"Final"] != item[attribute])) {
                //console.log("Evaluating item",item.name);
                Item.possibleChangeAttributes.forEach(attribute=>{
                    if(item[attribute+"Final"] != undefined && item[attribute+"Final"] != item[attribute]) {
                      if(numTries==0) {
                        item.startItemData[attribute] = item.startItemData[attribute]||0 + (item[attribute+"Final"] - item[attribute])/item[attribute+"_multiplier"];
                        item[attribute] = item[attribute+"Final"];
                      } else {
                        if(item[attribute]<item[attribute+"Final"]) {
                            if(item[attribute+"Final"]-item[attribute]>50) item.startItemData[attribute]*=2;
                            else item.startItemData[attribute]+=1;
                        } else {
                            if(item[attribute]-item[attribute+"Final"]>50) item.startItemData[attribute]/=2;
                            else item.startItemData[attribute]-=1;
                        }
                        item.startItemData[attribute] = Math.floor(item.startItemData[attribute]);
                      }
                       // item.reset();
                       // item.setup();
                        
                        refreshBoards();
                    }
                });
                numTries++;
                if(numTries > 500) {
                    console.log("Failed to equalize item attributes with those given from game",item.name);
                    break;
                }
            }
            
            Item.possibleChangeAttributes.forEach(attribute=>{
                if(item[attribute+"Final"] != undefined) {
                    delete item.startItemData[attribute+"Final"];
                }
            });
            //refreshBoards();
        });
        skillFunctions.forEach(f=>f());
        refreshBoards();
    } catch (error) {
        console.error('Error loading board state from URL:', error);
    }

    window.isLoadingFromUrl = false;
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
                value = ((v-oldValue)*obj[key+"_multiplier"]+oldValue)||0;
                if(obj[key+"_pauseChanged"]) return;
                obj[key+"_changedMap"].forEach(f=>f(value, oldValue));
                obj[key+"_changedArray"].forEach(f=>f(value, oldValue));
            }
        });
    });
}