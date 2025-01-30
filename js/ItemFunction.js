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
ItemFunction.items.set("Cryosleeve",(item)=>{
    //Freeze this and adjacent items for 1 second(s). into a trigger function.
    //When any item gains freeze, shield ( 50 >> 75 >> 100)
    //When one of your items gains Freeze, reduce the duration by half. into a trigger function.

    let shieldAmount = getRarityValue("50 >> 75 >> 100",item.rarity);
    item.triggerFunctions.push(()=>{
       [item,...item.getAdjacentItems()].forEach(i=>i.applyFreeze(1,item));
    });
    item.board.freezeTriggers.set(item.id,(i,source)=>{
            item.applyShield(shieldAmount);
            i.freezeDurationRemaining /= 2;
            log(item.name + " reduced " + i.name + " freeze duration by half");
    });
    item.board.player.hostileTarget.board.freezeTriggers.set(item.id,(i,source)=>{
        item.applyShield(shieldAmount);
    });
});
ItemFunction.items.set("Cryosphere",(item)=>{
    // Freeze all items other than The Core for ( 2 » 3 ) second(s).
    item.triggerFunctions.push(()=>{
        item.board.items.forEach(i=>{
            if(i.tags.includes("Core")) return;
            i.applyFreeze(getRarityValue("2 >> 3",item.rarity),item);
        });
    });
});
ItemFunction.items.set("Iceberg",(item)=>{
    //When your enemy uses an item, Freeze it for 1 second(s).
    item.board.player.hostileTarget.board.itemTriggers.set(item.id,(i)=>{
        i.applyFreeze(1,item);
    });
});
ItemFunction.items.set("Stopwatch",(item)=>{
    //Freeze both players' items for ( 1 » 2 ) second(s).
    item.triggerFunctions.push(()=>{
        item.board.items.forEach(i=>{
            i.applyFreeze(getRarityValue("1 >> 2",item.rarity),item);
        });
        item.board.player.hostileTarget.board.items.forEach(i=>{
            i.applyFreeze(getRarityValue("1 >> 2",item.rarity),item);
        });
    });
});

