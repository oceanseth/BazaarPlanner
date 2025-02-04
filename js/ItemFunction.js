export class ItemFunction {
    static items = new Map();
    static doNothingItemNames = ["Bar of Gold"];
    static setupItems() {
        ItemFunction.doNothingItemNames.forEach(itemName => {
            ItemFunction.items.set(itemName, (item) => {});
        });
    }
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
        property.gain(property.value,'value');
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
ItemFunction.items.set("Forklift",(item)=>{
    //Deal ( 50 » 100 ) damage for each item to the left of this.
    //Haste this and the items on the right of this for ( 2 » 4 ) second(s). into a trigger function.
    let damage = getRarityValue("50 >> 100",item.rarity);
    item.damage = (item.startItemData.damage||0) + item.board.items.reduce((acc,i)=>i.startIndex<item.startIndex?acc+damage:acc,0);
    item.triggerFunctions.push(()=>{    
        let thisAndItemsToTheRight = item.board.items.filter(i=>i.startIndex>=item.startIndex);
        thisAndItemsToTheRight.forEach(i=>i.applyHaste(getRarityValue("2 >> 4",item.rarity),item));
    });
});
ItemFunction.items.set("GPU",(item)=>{
    //Haste the Core for ( 1 » 2 » 3 » 4 ) second(s).
    item.board.player.hostileTarget.board.items.forEach(i=>{
        if(i.tags.includes("Core")) {
            i.applyHaste(getRarityValue("1 >> 2 >> 3 >> 4",item.rarity),item);
        }
    });
});
ItemFunction.items.set("Metronome",(item)=>{
    let hasteDuration = getRarityValue("1 >> 2 >> 3",item.rarity);
    //When you use an adjacent item, give the other adjacent item haste for ( 1 » 2 » 3 ) second(s).
    item.getAdjacentItems().forEach(i=>{
        i.triggerFunctions.push(()=>{
            let otherAdjacentItem = item.getAdjacentItems().find(i2=>i!=i2);
            if(otherAdjacentItem) {
                otherAdjacentItem.applyHaste(hasteDuration,item);
                log("usage of "+i.name+" gave "+otherAdjacentItem.name+" haste for "+hasteDuration+" seconds");
            }
        });
    });


});
ItemFunction.items.set("Luxury Tents",(item)=>{
    //The first time you would die each fight, Heal for ( 25% » 50% ) of your Max Health. into a trigger function.
    //Your Heal items have +1 Multicast.
    item.board.items.forEach(i=>{
        if(i.id!=item.id && i.tags.includes("Heal")) {
            i.multicast++;
        }
    });
    const healAmount = getRarityValue("25 >> 50",item.rarity);
    item.board.player.dieTriggers.set(item.id,()=>{
        item.board.player.heal(item.board.player.maxHealth*healAmount/100);
        log(item.name + " healed for " + healAmount + "% of max health.");
    });
});
ItemFunction.items.set("Cybersecurity",(item)=>{
    // "Deal ( 15 » 30 » 60 ) damage for each Weapon you have.",
      //"This deals ( 2 » 3 » 4 ) time(s) damage if it is your only friend."

      let damage = getRarityValue("15 >> 30 >> 60",item.rarity);
      let times = getRarityValue("2 >> 3 >> 4",item.rarity);
      let weaponCount = item.board.items.filter(i=>i.tags.includes("Weapon")).length;
      item.damage = damage* weaponCount;

      let onlyFriend = item.board.items.filter(i=>i.tags.includes("Friend")).length==1;
      item.triggerFunctions.push(()=>{
        if(onlyFriend) {
            item.dealDamage(item.damage*times);
        } else {
            item.dealDamage(item.damage);
        }
      });
});

ItemFunction.items.set("Atomic Clock",(item)=>{
//Increase an enemy item's cooldown by ( 1 » 2 » 3 ) seconds for the fight.
item.triggerFunctions.push(()=>{
    item.board.player.hostileTarget.board.items.forEach(i=>{
        i.cooldown += 1000*getRarityValue("1 >> 2 >> 3",item.rarity);
        i.updateTriggerValuesElement();
    });
});
});

ItemFunction.items.set("Pulse Rifle",(item)=>{

    //Deal ( 10 » 20 » 40 » 80 ) damage. 
   //This has +1 Multicast if it is adjacent to a Friend. Double this if it is your only Friend.
   item.damage = getRarityValue("10 >> 20 >> 40 >> 80",item.rarity);
   let friendCount = item.board.items.filter(i=>i.tags.includes("Friend")).length;
   let adjacentFriendCount = item.getAdjacentItems().filter(i=>i.tags.includes("Friend")).length;

   if(adjacentFriendCount>0) {
    item.multicast++;
   }
   if(friendCount==1) {
    item.multicast++;
   }
   item.triggerFunctions.push(()=>{
    item.dealDamage(item.damage);
   });
});
ItemFunction.items.set("Anything to Win",(item)=>{
    //When you use a non-weapon item, Burn (  1  » 2  » 3   ) and Poison (  1  » 2  » 3   ).
    const amount = getRarityValue("1 >> 2 >> 3",item.rarity);
    item.board.itemTriggers.set(item.id,(i)=>{
        if(i.tags.includes("Weapon")) return;
        item.applyBurn(amount);
        item.applyPoison(amount);
    });
});

ItemFunction.setupItems();
