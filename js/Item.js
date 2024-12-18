class Item {
    constructor({ name, tags, cooldown, enchants, text, bottomtext }) {
        Object.assign(this, { name, cooldown, enchants, text, bottomtext, tags });
        this.size = tags.includes('Small') ? 1 : tags.includes('Medium') ? 2 : 3;
    }
    getFromName(itemName) {
        return new Item(items[itemName]);
    }
}