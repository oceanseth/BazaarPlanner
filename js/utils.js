import LZString from 'lz-string';
import { Board } from './Board.js';
import { Item } from './Item.js';

export function getRarityValue(valueString, rarity) {
    // Parse values (e.g., "1 » 2 » 3 » 4" or "1 >> 2 >> 3 >> 4" into [1, 2, 3, 4])

    const values = valueString.split(/[»>]+/).map(v => parseFloat(v.trim()));
    
    // Get the appropriate value based on item's rarity
    const rarityIndex = ['Bronze', 'Silver', 'Gold', 'Diamond'].indexOf(rarity || 'Bronze');
    return values[rarityIndex] || values[0];
}

export function battleRandom() {
    if (!window.battleRNG) {
        console.error('Battle RNG not initialized!');
        return Math.random(); // Fallback to regular random
    }
    return window.battleRNG();
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
            if(parseInt(Item.getStartingCooldownFromText(baseItem.cooldown)) == parseInt(item.cooldown/1000))
                delete toReturn.cooldown;
            return toReturn;

        });

    

    // Compress the JSON string using LZ compression
    const stateStr = LZString.compressToEncodedURIComponent(JSON.stringify(boardState));
    window.history.replaceState(null, '', `#${stateStr}`);
}

export function loadFromUrl() {
    const hash = window.location.hash.slice(1); // Remove the # symbol
    if (!hash) return;
    window.isLoadingFromUrl = true;
    try {
        // Decompress the state string
        const boardState = JSON.parse(LZString.decompressFromEncodedURIComponent(hash));
        // Add items from URL state
        boardState.forEach((item) => {
            const { board, startIndex, name, ...itemWithoutBoardAndStartIndex} = item;
            const [baseName, enchant] = Item.stripEnchantFromName(name);
            const newItemData = structuredClone(items[baseName]);
            Object.assign(newItemData, itemWithoutBoardAndStartIndex);   
            const newItem = new Item(newItemData, Board.getBoardFromId(board));
            newItem.enchant = enchant;
            newItem.name = name;
            newItem.setIndex(startIndex);
            


        });

    } catch (error) {
        console.error('Error loading board state from URL:', error);
    }
    window.isLoadingFromUrl = false;
}