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