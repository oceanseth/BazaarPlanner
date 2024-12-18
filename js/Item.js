class Item {
    constructor({ name, tags, cooldown, enchants, text, bottomtext, icon }) {
        Object.assign(this, { name, cooldown, enchants, text, bottomtext, tags, icon });
        this.size = tags.includes('Small') ? 1 : tags.includes('Medium') ? 2 : 3;
    }
    static getFromName(itemName) {
        return new Item(items[itemName]);
    }
}