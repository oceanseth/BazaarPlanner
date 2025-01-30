class ItemFunction {
    static items = new Map();
}
ItemFunction.items.set("Flagship",(item)=>{
        let multicast = item.multicast || 0;
        item.board.items.forEach(i=>{
            if(i.id!=item.id && i.tags.some(tag => ["Tool", "Friend", "Property","Ammo"].includes(tag))) multicast++;
        });
        item.multicast = multicast;
        item.updateTriggerValuesElement();
        if(multicast>0) item.multicastElement.style.display = 'block';

        item.setupTextFunctions(item.text[0]);
});
ItemFunction.items.set("Antimatter Chamber",(item)=>{
    //Destroy this and 3 small enemy items for the fight
        item.triggerFunctions.push(()=>{
            let smallEnemyItems = item.board.player.hostileTarget.board.items.filter(i=>i.tags.includes("Small"));
            let numItemsToDestroy = Math.min(3,smallEnemyItems.length);
            smallEnemyItems.sort(() => battleRandom() - 0.5).slice(0,numItemsToDestroy).forEach(i=>i.destroy());
            item.destroy();
        });
});
ItemFunction.items.set("Crow's Nest",(item)=>{
        const critToGain = getRarityValue("20 >> 40 >> 60 >> 80",item.rarity);
        const weaponItems = item.board.items.filter(i=>i.tags.includes("Weapon"));
        if(weaponItems.length==1) {
            weaponItems[0].lifesteal = 100;
            weaponItems[0].updateTriggerValuesElement();
        }
        weaponItems.forEach(i=>{
            if(i.id!=item.id) {
                i.crit += critToGain;
            }
        });
});
ItemFunction.items.set("Balcony",(item)=>{
    //The Property to the left of this has double value in combat and has its cooldown reduced by ( 10% » 20% » 30% ).
    const property = item.getItemToTheLeft();
    if(property && property.tags.includes("Property")) {
        property.value *= 2;
        property.cooldown *= 1-(getRarityValue("10 >> 10 >> 20 >> 30",item.rarity)/100);
        property.updateTriggerValuesElement();
    }
});
