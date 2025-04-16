import { getRarityValue } from "./utils.js";

export class ItemFunction {
    static items = new Map();
    static doNothingItemNames = ["Bar of Gold","Super Syrup","Signet Ring", "Bag of Jewels","Disguise","Bulky Package","Bootstraps","Business Card",
        "Epicurean Chocolate","Spare Change","Pelt","Candy Mail","Machine Learning","Chocoholic","Like Clockwork","Upgrade Hammer", "Sifting Pan",
    "Vending Machine","Piggy Bank","Cash Register","VIP Pass","Cargo Shorts","Alembic","The Tome of Yyahan","Catalyst","Chunk of Lead","Chunk of Gold", "Catalyst"];
    static setupItems() {
        ItemFunction.doNothingItemNames.forEach(itemName => {
            ItemFunction.items.set(itemName, (item) => {});
        });
    }
}
//When you use an adjacent item,charge the other adjacent item for (1/2) second(s) and it gains (10%/20%) Crit Chance for the fight. from Pendulum
ItemFunction.items.set("Pendulum",(item)=>{
    item.charge = getRarityValue("1/2",item.rarity);
    const critChance = getRarityValue("10 >> 20",item.rarity);
    const adjacentItems = item.getAdjacentItems();
    if(adjacentItems.length==2) {
        item.board.itemTriggers.set(item.id,(i)=>{
            if(adjacentItems.includes(i)) {
                const otherItem = adjacentItems.find(j=>j.id!=i.id);
                if(otherItem && !otherItem.isDestroyed) {
                    item.applyChargeTo(otherItem);
                    otherItem.gain(critChance,'crit',item);
                }
            }
        });
    }
});

//Charge adjacent items (1/2) second(s).
//If you have the same amount of items on both sides of this, Charge all other items instead.
ItemFunction.items.set("Scales",(item)=>{
    item.charge = getRarityValue("1/2",item.rarity);
    let chargeTargets = [];
    const f = ()=>{
        const sameAmountOnBothSides = item.board.activeItems.filter(i=>i.startIndex<item.startIndex).length == item.board.activeItems.filter(i=>i.startIndex>item.startIndex).length;
        if(sameAmountOnBothSides) {
            chargeTargets = item.board.activeItems;
        } else chargeTargets = item.getAdjacentItems();
    }

    f();
    item.board.itemDestroyedTriggers.set(item.id,f);
    
    item.triggerFunctions.push(()=>{
        chargeTargets.forEach(i=>item.applyChargeTo(i));
    });
});

//When this gains Haste or when you Freeze, Charge this 2 second(s). from Snowmobile
ItemFunction.items.set("Snowmobile",(item)=>{
    item.charge = 2;
    item.board.freezeTriggers.set(item.id,(i)=>{
        item.applyChargeTo(item);
    });
    item.board.hasteTriggers.set(item.id,(i)=>{
        if(item.id==i.id) item.applyChargeTo(item);
    });
});
//While you have less health than your opponent, your items gain (10%/15%/20%) Crit Chance. from Desperate Strike
ItemFunction.items.set("Desperate Strike",(item)=>{
    const critGain = getRarityValue("10 >> 15 >> 20",item.rarity);
    let gainedCrit = false; 

    const f = ()=>{
        if(item.board.player.health<item.board.player.hostileTarget.health) {
            if(!gainedCrit) {
                item.board.items.forEach(i=>i.gain(critGain,'crit'));
                gainedCrit = true;
            }
        } else {
            if(gainedCrit) {
                item.board.items.forEach(i=>i.gain(-critGain,'crit'));
                gainedCrit = false;
            }
        }
    };
    f();
    item.board.startOfFightTriggers.set(item.id,f);         
    item.board.player.healthChanged(f);
    item.board.player.hostileTarget.healthChanged(f);
});

//Your Weapons have (+1/+2/+3) damage for each ammo you have on your items in play. from Loaded Fury
ItemFunction.items.set("Loaded Fury",(item)=>{
    const multiplier = getRarityValue("1 >> 2 >> 3",item.rarity);
    item.board.items.forEach(i=>{
        if(i.tags.includes("Ammo")) {
            item.board.giveAll("Weapon",i.ammo*multiplier,'damage');
            i.ammoChanged((newAmmo,oldAmmo)=>{
                item.board.giveAll("Weapon",(newAmmo-oldAmmo)*multiplier,'damage');
            });
        }
    });

});

//Your leftmost and rightmost Weapons have + Damage equal to (1x/2x) their value. from Boar Market
ItemFunction.items.set("Boar Market",(item)=>{
    const multiplier = getRarityValue("1x >> 2x",item.rarity);
    const weapons = item.board.items.filter(i=>i.tags.includes("Weapon"));
    if(weapons.length>0) {
        weapons[0].gain(multiplier*weapons[0].value,'damage');
    }
    if(weapons.length>1) {
        weapons[weapons.length-1].gain(multiplier*weapons[weapons.length-1].value,'damage');
    }
});
//If you have a vehicle, reduce your non-vehicle items' cooldowns by (10%/15%/20%). from Command Ship
ItemFunction.items.set("Command Ship",(item)=>{
    const cooldownReduction = getRarityValue("10 >> 15 >> 20",item.rarity);
    if(item.board.items.some(i=>i.tags.includes("Vehicle"))) {
        item.board.items.forEach(i=>{
            if(!i.tags.includes("Vehicle")) i.gain(-i.cooldown*cooldownReduction/100,'cooldown');
        });
    }
});
//If you have exactly one friend, reduce its and the Core's cooldown by (5%/10%/15%). from Buddy System
ItemFunction.items.set("Buddy System",(item)=>{
    let cooldownRemoved = false;
    const cooldownReduction = getRarityValue("5 >> 10 >> 15",item.rarity);
    const f = ()=>{
        const friends = item.board.activeItems.filter(i=>i.tags.includes("Friend"));
        if(friends.length==1 && !cooldownRemoved) {
            friends[0].gain(-friends[0].cooldown*cooldownReduction/100,'cooldown');
            item.board.items.forEach(i=>{
                if(i.tags.includes("Core")) i.gain(-i.cooldown*cooldownReduction/100,'cooldown');
            });
            cooldownRemoved = true;
        } else if(cooldownRemoved) {
            friends[0].gain(friends[0].cooldown*cooldownReduction/100,'cooldown');
            item.board.items.forEach(i=>{
                if(i.tags.includes("Core")) i.gain(i.cooldown*cooldownReduction/100,'cooldown');
            });
            cooldownRemoved = false;
        }
    };
    f();
    item.board.itemDestroyedTriggers.set(item.id,f);
});
//If you have exactly 2 Weapons in play, your items have +50% Crit Chance. from Dual Wield
ItemFunction.items.set("Dual Wield",(item)=>{
    let critGained = false;
    const f = ()=>{
        const weaponCount = item.board.items.filter(i=>i.tags.includes("Weapon")).length;
        if(weaponCount==2 && !critGained) {
            item.board.items.forEach(i=>{
                i.gain(50,'crit');
            });
            critGained = true;
        } else if(weaponCount!=2 && critGained) {
            item.board.items.forEach(i=>{
                i.gain(-50,'crit');
            });
            critGained = false;
        }
    };
    f();
    item.board.itemDestroyedTriggers.set(item.id,f);
});
//The first time you Freeze, Burn, Slow, Poison, and Haste each fight, Charge 1 item 2 » 4 second(s). from Neophiliac
ItemFunction.items.set("Neophiliac",(item)=>{
    item.charge = getRarityValue("2 >> 4",item.rarity);
    [item.board.burnTriggers,item.board.poisonTriggers,item.board.freezeTriggers,item.board.slowTriggers,item.board.hasteTriggers].forEach(t=>{
        t.set(item.id,()=>{
            item.applyChargeTo(item.pickRandom(item.board.activeItems.filter(i=>i.cooldown>0)));
            t.delete(item.id);
        });
    });
});

//If you have only one medium item, its cooldown is reduced by 30%. from Hyper Focus
ItemFunction.items.set("Hyper Focus",(item)=>{
    const mediumItemCount = item.board.items.filter(i=>i.tags.includes("Medium")).length;
    if(mediumItemCount==1) {
        item.gain(-item.cooldown*30/100,'cooldown');
    }
});

//If you have exactly 1 weapon, your Shield items have (+10/+20/+30) shield. from Specialist
ItemFunction.items.set("Specialist",(item)=>{
    const shieldGain = getRarityValue("10 >> 20 >> 30",item.rarity);
    if(item.board.items.filter(i=>i.tags.includes("Weapon")).length==1) {
        item.board.items.forEach(i=>{
            if(i.tags.includes("Shield")) i.gain(shieldGain,'shield');
        });
    }
});
//If you have at least 7 items in play, your items have their cooldowns reduced by (5%/10%/15%). from Tiny Dancer
ItemFunction.items.set("Tiny Dancer",(item)=>{
    const cooldownReduction = getRarityValue("5 >> 10 >> 15",item.rarity);
    if(item.board.items.length>=7) {
        item.board.items.forEach(i=>{
            i.gain(-i.cooldown*(cooldownReduction/100),'cooldown');
        });
    }
});
//Your leftmost Tool has +1 Multicast. from Re-Tooled
ItemFunction.items.set("Re-Tooled",(item)=>{
    const leftmostTool = item.board.items.find(i=>i.tags.includes("Tool"));
    if(leftmostTool) {
        leftmostTool.gain(1,'multicast');
    }
});

//All items have a cooldown increase of (30%/50%). from Lethargy
ItemFunction.items.set("Lethargy",(item)=>{
    const cooldownIncrease = getRarityValue("30 >> 50",item.rarity);
    item.board.items.forEach(i=>{
        i.gain(i.cooldown*cooldownIncrease/100,'cooldown');
    });
    item.board.player.hostileTarget.board.items.forEach(i=>{
        i.gain(i.cooldown*cooldownIncrease/100,'cooldown');
    });
});
//Your Shield items gain ( +4 » +8 » +12 ) Shield and your Weapons ( +4 » +8 » +12 ) damage for the fight. from Cosmic Plumage
ItemFunction.items.set("Cosmic Plumage",(item)=>{
    const gain = getRarityValue("4 >> 8 >> 12",item.rarity);
    item.triggerFunctions.push(()=>{
        item.board.items.forEach(i=>{
            if(i.tags.includes("Shield")) i.gain(gain,'shield');
            if(i.tags.includes("Weapon")) i.gain(gain,'damage');
        });
    });
});

//Burn ( 4 » 6 » 8 ) from Curry
//Charge another small item ( 3 » 4 » 5 ) second(s). from Curry
ItemFunction.items.set("Curry",(item)=>{
    const burn = getRarityValue("4 >> 6 >> 8",item.rarity);
    item.charge = getRarityValue("3 >> 4 >> 5",item.rarity);
    item.gain(burn,'burn');
    item.triggerFunctions.push(()=>{
        item.applyChargeTo(item.pickRandom(item.board.activeItems.filter(i=>i.id!=item.id && i.tags.includes("Small"))));
        item.applyBurn(item.burn);
    });
});

//Deal 10 >> 20 damage.
//At the start of each fight with Dragon Tooth, spend 3 gold and your weapons permanently gain ( 5 » 10 ) damage. from Dragon Tooth
ItemFunction.items.set("Dragon Tooth",(item)=>{
    const damage = getRarityValue("10 >> 20",item.rarity);
    const damageGain = getRarityValue("5 >> 10",item.rarity);
    item.board.startOfFightTriggers.set(item.id,()=>{
        if(item.board.player.gold<3) {
            item.log(item.board.player.name + " does not have enough gold to use " + item.name + ".");
            return;
        }
        item.board.player.spend(3);
        item.board.items.forEach(i=>{
            if(i.tags.includes("Weapon")) i.gain(damageGain,'damage',item);
        });
    });
    item.gain(damage,'damage');
    item.triggerFunctions.push(()=>{
        item.dealDamage(damage);
    });
});

//This item's value is equal to your highest value Property. from Deed
ItemFunction.items.set("Deed",(item)=>{
    const f = ()=>{
        const highestValueProperty = item.board.activeItems.filter(i=>i.tags.includes("Property")).reduce((max,i)=>Math.max(max,i.value),0);
        item.value = highestValueProperty;
    }
    f();
    item.board.itemValuesChangedTriggers.set(item.id,f);
    item.board.itemDestroyedTriggers.set(item.id,f);
});


//Destroy this and all smaller items for the fight. from Dam
//When you use another Aquatic item, charge this (1 >> 2) seconds. from Dam
ItemFunction.items.set("Dam",(item)=>{
    const chargeDuration = getRarityValue("1 >> 2",item.rarity);
    item.triggerFunctions.push(()=>{
        [...item.board.items,...item.board.player.hostileTarget.board.items].forEach(i=>{
            if(i.size< item.size) i.destroy(item);
        });
        item.destroy(item);
    });
    item.whenItemTagTriggers(["Aquatic"], (i) => { 
        item.applyChargeTo(item, i);
    });
});

//Deal 16 Damage.
//Your Medium Weapons have ( +8 » +16 » +24 ) Damage for each Medium item you have. from Crook
ItemFunction.items.set("Crook",(item)=>{
    const damage = getRarityValue("8 >> 16 >> 24",item.rarity);
    item.gain(16,'damage');
    const mediumItemCount = item.board.activeItems.filter(i=>i.tags.includes("Medium")).length;
    item.board.items.forEach(i=>{
        if(i.tags.includes("Weapon")&&i.tags.includes("Medium")) i.gain(damage*mediumItemCount,'damage');
    });
    item.board.itemDestroyedTriggers.set(item.id,(itemDestroyed)=>{
        if(itemDestroyed.tags.includes("Medium")) {
            item.board.activeItems.forEach(i=>{
                if(i.tags.includes("Weapon")&&i.tags.includes("Medium")) i.gain(-damage,'damage');
            });
        }
    });
});

//You have Regeneration equal to ( 1x » 2x ) adjacent properties' values. from Closed Sign
ItemFunction.items.set("Closed Sign",(item)=>{
    const regeneration = getRarityValue("1x >> 2x",item.rarity);
    item.board.player.regen += regeneration*item.getAdjacentItems().filter(i=>i.tags.includes("Property")).reduce((acc,i)=>acc+i.value,0);
    item.board.updateHealthElement();
});

//If you have a Vehicle, at the start of each fight, use this. from Propane Tank
//Haste your Vehicles for ( 3 » 4 » 5 ) second(s). from Propane Tank
ItemFunction.items.set("Propane Tank",(item)=>{
    const hasteDuration = getRarityValue("3 >> 4 >> 5",item.rarity);
    item.board.startOfFightTriggers.set(item.id,()=>{
        item.trigger();
    });
    item.triggerFunctions.push(()=>{
        item.board.items.forEach(i=>{
            if(i.tags.includes("Vehicle")) item.applyHasteTo(i,hasteDuration);
        });
       
    });
});

// You have increased max health equal to ( 10 » 15 » 20 ) times this item's value. from Pawn Shop
ItemFunction.items.set("Pawn Shop",(item)=>{
    const maxHealthIncrease = getRarityValue("10 >> 15 >> 20",item.rarity);    
    item.board.player.maxHealth += maxHealthIncrease*item.value;
    item.board.player.health=item.board.player.maxHealth;
    item.board.updateHealthElement();
    item.valueChanged((newValue,oldValue)=>{
        item.board.player.maxHealth += maxHealthIncrease*(newValue-oldValue);
    });
});

//This item's cooldown is reduced by 5 seconds for each adjacent large item. from Hammock
ItemFunction.items.set("Hammock",(item)=>{
    const largeItemCount = item.getAdjacentItems().filter(i=>i.tags.includes("Large")).length;
    item.gain(-largeItemCount*5*1000,'cooldown');
});

//The item to the left of this has its cooldown reduced by ( 25% » 50% ). from Phonograph
ItemFunction.items.set("Phonograph",(item)=>{   
    const cooldownReduction = getRarityValue("25 >> 50",item.rarity);
    const leftItem = item.getItemToTheLeft();
    if(leftItem) {
        leftItem.gain(leftItem.cooldown*(1-cooldownReduction/100)-leftItem.cooldown,'cooldown');
    }
});

// When your opponent uses a Weapon or Burn item, Charge this 2 second(s). from Blast Doors
ItemFunction.items.set("Blast Doors",(item)=>{
    item.charge = 2;
    item.board.player.hostileTarget.board.itemTriggers.set(item.id,(i)=>{
        if(i.tags.includes("Weapon")||i.tags.includes("Burn")) {
            item.applyChargeTo(item, i);
        }
    });
});
//"When you Slow with an item, Freeze with an item, Poison with an item, or Burn with an item, a Regeneration item gains (1/2/3) Regeneration for the fight." from Vital Renewal
ItemFunction.items.set("Vital Renewal",(item)=>{
    item.setupTextFunctions("When you Slow with an item, Freeze with an item, Poison with an item, or Burn with an item, a Regeneration item gains (1/2/3) Regeneration for the fight.");    
});

//Deal 20 damage
//When you Freeze, Burn or Poison, this gains ( 10 » 20 » 30 ) damage for the fight. from Refractor
ItemFunction.items.set("Refractor",(item)=>{
    const damage = getRarityValue("10 >> 20 >> 30",item.rarity);
    item.gain(20,'damage');
    item.board.burnTriggers.set(item.id,(i)=>{
        item.gain(damage,'damage');
    });
    item.board.poisonTriggers.set(item.id,(i)=>{
        item.gain(damage,'damage');
    });
    item.board.freezeTriggers.set(item.id,(i)=>{
        item.gain(damage,'damage');
    });
    item.triggerFunctions.push(()=>{
        item.dealDamage(item.damage);
    });
    
});

ItemFunction.items.set("Flagship",(item)=>{
    const uniqueTags = new Set();
    item.board.items.forEach(i=>{
        if(i.id!=item.id) {
            ["Tool", "Friend", "Property", "Ammo"].forEach(tagType => {
                if(i.tags.includes(tagType)) {
                    uniqueTags.add(tagType);
                }
            });
        }
    });
    if(uniqueTags.size>0) {
        item.gain(uniqueTags.size,'multicast');
    }
    item.setupTextFunctions(item.text[0]);
});

//Reload your Potions 1 Ammo and Charge them 1 second(s). from Athanor
ItemFunction.items.set("Athanor",(item)=>{
    item.charge = 1;
    return () => {        
        item.board.items.forEach(i=>{
            if(i.tags.includes("Potion")) {
                i.gain(1,'ammo');
                item.applyChargeTo(i);
            }
        });
    }
});


//Weapon Properties adjacent to this have + Damage equal to ( 1x » 2x ) the value of your highest value item. from Open Sign                                        
//Shield Properties adjacent to this have + Shield equal to ( 1x » 2x ) the value of your highest value item. from Open Sign   
ItemFunction.items.set("Open Sign",(item)=>{
    const amount = getRarityValue("1x >> 2x",item.rarity);
    item.getAdjacentItems().forEach(i=>{
        const highestValueItem = item.board.activeItems.reduce((max,i)=>Math.max(max,i.value),0);
        if(i.tags.includes("Weapon") && i.tags.includes("Property")) {
            i.gain(amount*highestValueItem,'damage');
        }
        if(i.tags.includes("Shield") && i.tags.includes("Property")) {
            i.gain(amount*highestValueItem,'shield');
        }
    });
});

//Destroy this and 3 small enemy items for the fight from Antimatter Chamber
ItemFunction.items.set("Antimatter Chamber",(item)=>{
        item.triggerFunctions.push(()=>{
            let smallEnemyItems = item.board.player.hostileTarget.board.items.filter(i=>i.tags.includes("Small"));
            let numItemsToDestroy = Math.min(3,smallEnemyItems.length);
            smallEnemyItems.sort(() => item.battleRandom() - 0.5).slice(0,numItemsToDestroy).forEach(i=>i.destroy(item));
            item.destroy(item);
        });
});
//"Multicast 2",
//"Crit Chance 25%",
//"Deal 100 damage.",
//"When you use another Toy, Friend or Ammo item, charge this 1 second(s)."
ItemFunction.items.set("Teddy",(item)=>{
    item.charge = 1;
    item.multicast = 2;
    item.gain(25,'critChance');
    item.gain(100,'damage');
    item.triggerFunctions.push(()=>{
        item.applyChargeTo(item);
    });
    item.whenItemTagTriggers(["Toy","Friend","Ammo"], (item) => { 
        item.applyChargeTo(item);
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
//Deal ( 6 » 12 » 18 » 24 ) damage.
//When you use this, reload this 1 Ammo if it is your only weapon. From Rifle
ItemFunction.items.set("Rifle",(item)=>{
    const damage = getRarityValue("6 >> 12 >> 18 >> 24",item.rarity);
    item.gain(damage,'damage');
    item.triggerFunctions.push(()=>{
        item.dealDamage(item.damage);
        if(item.board.items.filter(i=>i.tags.includes("Weapon")&&i.cooldown>0).length==1) {
            item.gain(1,'ammo');
        }
    });
});

//Your Lifesteal Weapons gain ( +5 » +10 » +15 » +20 ) damage for the fight. from Mortar & Pestle
//The weapon on the right has Lifesteal. from Mortar & Pestle
ItemFunction.items.set("Mortar & Pestle",(item)=>{
    const damage = getRarityValue("5 >> 10 >> 15 >> 20",item.rarity);
    const rightItem = item.getItemToTheRight();
    if(rightItem && rightItem.tags.includes("Weapon")) {
        rightItem.lifesteal = true;
    }
    item.triggerFunctions.push(()=>{
        item.board.items.forEach(i=>{
            if(i.tags.includes("Weapon")&&i.lifesteal) {
                i.gain(damage,'damage');
            }
        });
    });
});

ItemFunction.items.set("Balcony",(item)=>{
    //The Property to the left of this has double value in combat and has its cooldown reduced by ( 5% » 10% » 15% ).
    const property = item.getItemToTheLeft();
    if(property && property.tags.includes("Property")) {
        property.gain(property.value,'value');
        property.value_multiplier += 1;
        property.cooldown *= 1-(getRarityValue("5 >> 10 >> 15",item.rarity)/100);
    //    property.updateTriggerValuesElement();

    }
});
//Burn both players ( 2 » 3 » 4 » 5 ).
//Adjacent items have their cooldowns reduced by ( 6% » 9% » 12% » 15% ). from Thrusters
ItemFunction.items.set("Thrusters",(item)=>{
    const burnAmount = getRarityValue("2 >> 3 >> 4 >> 5",item.rarity);
    const cooldownReduction = getRarityValue("6 >> 9 >> 12 >> 15",item.rarity);
    item.gain(burnAmount,'burn');
    item.getAdjacentItems().forEach(i=>{
        i.gain(i.cooldown * (1-(cooldownReduction)/100)-i.cooldown,'cooldown');
    });
    return ()=>{
        item.applyBurn(item.burn);
    }
});
//Burn both players ( 4 » 6 » 8 ). from Nitro
ItemFunction.items.set("Nitro",(item)=>{
    const burnAmount = getRarityValue("4 >> 6 >> 8",item.rarity);
    item.gain(burnAmount,'burn');
    item.triggerFunctions.push(()=>{
        item.applyBurn(item.burn,item);
        item.applyBurn(item.burn,item,{selfTarget:true});
    });
});
//The Core gains ( +5% » +10% » +15% ) Crit Chance for the fight. from Cooling Fan
ItemFunction.items.set("Cooling Fan",(item)=>{
    const critChance = getRarityValue("5 >> 10 >> 15",item.rarity);
    item.triggerFunctions.push(()=>{
        item.board.items.forEach(i=>{if(i.tags.includes("Core")) i.gain(critChance,'critChance');});
    });
});
// Your leftmost Weapon has lifesteal. from Circle of Life
ItemFunction.items.set("Circle of Life",(item)=>{
    const leftmostWeapon = item.board.items.find(i=>i.tags.includes("Weapon"));
    if(leftmostWeapon) {
        leftmostWeapon.lifesteal = true;
        leftmostWeapon.updateTriggerValuesElement();
    }
});

ItemFunction.items.set("Cryosleeve",(item)=>{
    //Freeze this and adjacent items for 1 second(s). into a trigger function.
    //When any item gains freeze, shield ( 50 >> 75 >> 100)
    //When one of your items gains Freeze, reduce the duration by half. into a trigger function.

    let shieldAmount = getRarityValue("50 >> 75 >> 100",item.rarity);
    item.gain(shieldAmount,'shield');
    item.triggerFunctions.push(()=>{
       [item,...item.getAdjacentItems()].forEach(i=>item.applyFreezeTo(i,1));
    });
    item.board.freezeTriggers.set(item.id,(i,source)=>{
            item.applyShield(item.shield);
            if(i.board==item.board) {
                i.freezeDurationRemaining /= 2;
                item.log(item.name + " reduced " + i.name + " freeze duration by half");
            }
    });
    item.board.player.hostileTarget.board.freezeTriggers.set(item.id,(i,source)=>{
        if(i.board==item.board) {
            i.freezeDurationRemaining /= 2;
            item.log(item.name + " reduced " + i.name + " freeze duration by half");
        }
        item.applyShield(item.shield);
    });
});
ItemFunction.items.set("Cryosphere",(item)=>{
    const freezeDuration = getRarityValue("2 >> 3",item.rarity);
    // Freeze all items other than The Core for ( 2 » 3 ) second(s).
    item.triggerFunctions.push(()=>{
        item.board.items.forEach(i=>{
            if(i.tags.includes("Core")) return;
           item.applyFreezeTo(i,freezeDuration);
        });
        item.board.player.hostileTarget.board.items.forEach(i=>{
            if(i.tags.includes("Core")) return;
            item.applyFreezeTo(i,freezeDuration);
        });
    });
});
ItemFunction.items.set("Iceberg",(item)=>{
    //When your enemy uses an item, Freeze it for 1 second(s).
    item.board.player.hostileTarget.board.itemTriggers.set(item.id,(i)=>{
        item.applyFreezeTo(i,1);
    });
});
ItemFunction.items.set("Stopwatch",(item)=>{
    //Freeze both players' items for ( 1 » 2 ) second(s).
    item.triggerFunctions.push(()=>{
        item.board.items.forEach(i=>{
            item.applyFreezeTo(i,getRarityValue("1 >> 2",item.rarity));
        });
        item.board.player.hostileTarget.board.items.forEach(i=>{
            item.applyFreezeTo(i,getRarityValue("1 >> 2",item.rarity));
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
        thisAndItemsToTheRight.forEach(i=>item.applyHasteTo(i,getRarityValue("2 >> 4",item.rarity)));
    });
});
//If you have 5 or fewer items in play, their cooldowns are reduced by ( 10% » 20% ). from Stained Glass Window
ItemFunction.items.set("Stained Glass Window",(item)=>{
    const cooldownReduction = getRarityValue("10 >> 20",item.rarity);
    item.board.items.forEach(i=>{
        if(item.board.items.length<=5) {
            i.gain(i.cooldown*(1-cooldownReduction/100)-i.cooldown,'cooldown');
        }
    });
});

//Burn 4 >> 6 >> 8
//Poison 2 >> 3 >> 4
//If you have another item with Burn, Poison, Slow, or Freeze, this has +1 Multicast for each. from Weather Glass
ItemFunction.items.set("Weather Glass",(item)=>{
    item.gain(getRarityValue("4 >> 6 >> 8",item.rarity),'burn');
    item.gain(getRarityValue("2 >> 3 >> 4",item.rarity),'poison');
    const itemsWithBurn = item.board.items.filter(i=>i!=item && i.tags.includes("Burn"));
    const itemsWithPoison = item.board.items.filter(i=>i!=item && i.tags.includes("Poison"));
    const itemsWithSlow = item.board.items.filter(i=>i!=item && i.tags.includes("Slow"));
    const itemsWithFreeze = item.board.items.filter(i=>i!=item && i.tags.includes("Freeze"));
    item.multicast = (itemsWithBurn.length>0?1:0) + (itemsWithPoison.length>0?1:0) + (itemsWithSlow.length>0?1:0) + (itemsWithFreeze.length>0?1:0);
    item.triggerFunctions.push(()=>{
        item.applyBurn(item.burn);
        item.applyPoison(item.poison);
    });
});

ItemFunction.items.set("GPU",(item)=>{
    //Haste the Core for ( 1 » 2 » 3 » 4 ) second(s).
    const hasteDuration = getRarityValue("1 >> 2 >> 3 >> 4",item.rarity);
    item.triggerFunctions.push(()=>{
        item.board.items.forEach(i=>{
            if(i.tags.includes("Core")) {
                item.applyHasteTo(i,hasteDuration);
            }
        });
    });
});

ItemFunction.items.set("Metronome",(item)=>{
    let hasteDuration = getRarityValue("1 >> 2 >> 3",item.rarity);
    //When you use an adjacent item, give the other adjacent item haste for ( 1 » 2 » 3 ) second(s).
    item.getAdjacentItems().forEach(i=>{
        i.triggerFunctions.push(()=>{
            let otherAdjacentItem = item.getAdjacentItems().find(i2=>i!=i2);
            if(otherAdjacentItem) {
                item.applyHasteTo(otherAdjacentItem,hasteDuration);
                //log("usage of "+i.name+" gave "+otherAdjacentItem.name+" haste for "+hasteDuration+" seconds");
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
        item.log(item.name + " healed for " + healAmount + "% of max health.");
        item.board.player.dieTriggers.delete(item.id);
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
ItemFunction.items.set("Sparring Partner",(item)=>{
    //When you would die, Cleanse all Burn and Poison, double your Max Health and Heal to full. In addition, your enemy gains 1 Gold.
    item.board.player.dieTriggers.set(item.id,()=>{
        item.board.player.burn=0;
        item.board.player.poison=0;
        item.board.player.maxHealth *= 2;
        item.board.player.heal(item.board.player.maxHealth);
        item.board.player.hostileTarget.addGold(1);
    });
});
ItemFunction.items.set("Balanced Friendship",(item)=>{
    //Tour Weapons have (  +2  » +4  » +6   ) damage and Shield items have (  +2  » +4  » +6   ) shield for each friend you have.
    const amount = getRarityValue("2 >> 4 >> 6",item.rarity);   
    const friendCount = item.board.items.filter(i=>i.tags.includes("Friend")).length;
    item.board.items.forEach(i=>{
        if(i.tags.includes("Weapon")) {
            i.damage += amount*friendCount;

        }
        if(i.tags.includes("Shield")) {
            i.shield += amount*friendCount;
        }
    });
});
ItemFunction.items.set("All Talk",(item)=>{
//While you have more than half Health, your weapons have (  +25  » +50   ) damage.
    const amount = getRarityValue("25 >> 50",item.rarity);
    item.board.items.forEach(i=>{
        if(i.tags.includes("Weapon")) {
            i.gain(amount,'damage');
        }
    });
    item.board.player.healthAboveHalfTriggers.set(item.id,()=>{
        item.board.items.forEach(i=>{
            if(i.tags.includes("Weapon")) {
                i.gain(amount,'damage');
            }
        });
    });
    item.board.player.healthBelowHalfTriggers.set(item.id,()=>{
        item.board.items.forEach(i=>{
            if(i.tags.includes("Weapon")) {
                i.gain(-amount,'damage');
            }
        });
    });
});
ItemFunction.items.set("Big Ego",(item)=>{
    //Your Weapons have Lifesteal.
    item.board.items.forEach(i=>{
        if(i.tags.includes("Weapon")) {
            i.lifesteal = true;
        }
    });
});
ItemFunction.items.set("Bonk",(item)=>{
    //Enemy cooldowns are increased by 1 second(s)
    item.board.player.hostileTarget.board.items.forEach(i=>{
        i.cooldown += 1000;
    });
});


//Reduce the cooldown of your Properties by (  10%  » 15%   ). from Industrialist
ItemFunction.items.set("Industrialist",(item)=>{
    const amount = getRarityValue("10 >> 15",item.rarity);
    item.board.items.forEach(i=>{
        if(i.tags.includes("Property")) {
            i.gain(i.cooldown*(1-amount/100)-i.cooldown,'cooldown');
        }
    });
});

ItemFunction.items.set("Prosperity",(item)=>{
    //Your Shield items have + Shield equal to the value of your Items.
    const amount = item.board.items.reduce((acc,i)=>acc+i.value,0);
    item.oldValueTotel = amount;
    item.board.items.forEach(i=>{
        if(i.tags.includes("Shield")) {
            i.gain(amount,'shield');
        }
    });
    item.board.itemValuesChangedTriggers.set(item.id,()=>{
        const amount = item.board.items.reduce((acc,i)=>acc+i.value,0);
        if(amount!=item.oldValueTotel) {
            item.gain(amount-item.oldValueTotel,'shield');
            item.oldValueTotel = amount;
        }
    });
});
ItemFunction.items.set("Full Arsenal",(item)=>{
    //Your item's cooldowns are reduced by (  5%  » 10%   ) if you have a Vehicle, reduced by (  5%  » 10%   ) if you have a Weapon, and reduced by (  5%  » 10%   ) if you have a Tool.
    const amount = getRarityValue("5 >> 10",item.rarity);
    let count =0;
    item.board.items.forEach(i=>{
        if(i.tags.includes("Vehicle")) count++;
        if(i.tags.includes("Weapon")) count++;
        if(i.tags.includes("Tool")) count++;
    });
    item.board.items.forEach((i)=>{
        i.gain(i.cooldown * (1-(amount*count)/100)-i.cooldown,'cooldown');
    })
});
ItemFunction.items.set("Hypnotic Drain",(item)=>{
    //When you use a weapon with Lifesteal, Freeze a smaller item for 2 second(s).
    item.board.itemTriggers.set(item.id,(i)=>{
        if(i.tags.includes("Weapon") && i.lifesteal) {
            const smallerItems = item.board.player.hostileTarget.board.items.filter(i=>i.size<item.size);
            if(smallerItems.length>0) {
                const smallerItem = item.pickRandom(smallerItems);
                item.applyFreezeTo(smallerItem,2);
                item.log(item.name + " used " + i.name + " with Lifesteal to Freeze " + smallerItem.name + " for 2 seconds");
            }
        }
    });
});

ItemFunction.items.set("Mortal Coil",(item)=>{
    // The weapon to the left of this has lifesteal
    const weapon = item.getItemToTheLeft();
    if(weapon && weapon.tags.includes("Weapon")) {
        weapon.lifesteal = true;
    }
    item.lifesteal = true;
    const dmg = getRarityValue("50 >> 100",item.rarity);
    item.gain(dmg,'damage');
    item.triggerFunctions.push(()=>{
        item.dealDamage(item.damage);
    });
});
ItemFunction.items.set("Scythe",(item)=>{
    //Deal damage equal to a third of your enemy's max health.
    const dmg = item.board.player.hostileTarget.maxHealth/3;
    item.gain(dmg,'damage');
    item.triggerFunctions.push(()=>{
        item.dealDamage(item.damage);
    });

});

// Adjacent items have bonus damage, heal, or shield equal to their Crit Chance. from Swash Buckle
ItemFunction.items.set("Swash Buckle",(item)=>{
    const adjacentItems = item.getAdjacentItems();
    adjacentItems.forEach(i=>{
        if(i.tags.includes("Weapon")) { 
            i.gain(i.crit,'damage');
            i.critChanged((newCrit,oldCrit)=>{
                i.gain(newCrit-oldCrit,'damage');
            });
        }
        if(i.tags.includes("Heal")) {
            i.gain(i.crit,'heal');
            i.critChanged((newCrit,oldCrit)=>{
                i.gain(newCrit-oldCrit,'heal');
            });
        }
        if(i.tags.includes("Shield")) {
            i.gain(i.crit,'shield');
            i.critChanged((newCrit,oldCrit)=>{
                i.gain(newCrit-oldCrit,'shield');
            });
        }
    });
});


//Increase your other items' Freeze by 1 second(s). from Sapphire
ItemFunction.items.set("Sapphire",(item)=>{
    item.board.items.forEach(i=>{
        if(i.id!=item.id) {
            i.gain(1,'freezeBonus');
        }
    });
});

//The Core has its cooldown reduced by (  10%  » 15%   ). from Overclocked
//While you have Burn, double this effect. from Overclocked
ItemFunction.items.set("Overclocked",(item)=>{
    const cooldownReduction = getRarityValue("10 >> 15",item.rarity);
    let hasBeenDoubled = false;
    const cores = item.board.items.filter(i=>i.tags.includes("Core"));  
    cores.forEach(i=>{
        i["doublingAmountFromOverclocked"+item.id] = i.cooldown*(1 - cooldownReduction/100) - i.cooldown;
        i.gain(i["doublingAmountFromOverclocked"+item.id],'cooldown');
    });
    item.board.player.burnChanged((newBurn)=>{
        if(newBurn>0) {
            if(!hasBeenDoubled) {
                hasBeenDoubled = true;
                cores.forEach(i=>{
                    i.gain(i["doublingAmountFromOverclocked"+item.id],'cooldown');
                });
            }
        } else {
                cores.forEach(i=>{
                    i.gain(-i["doublingAmountFromOverclocked"+item.id],'cooldown');
                    i["doublingAmountFromOverclocked"+item.id] = 0;
                });
                hasBeenDoubled = false;
        }                        
    });
});
//Shield (100 >> 150 ).
//All item cooldowns are increased by ( 1 » 2 ) second(s). from Fort
// Your items with a cooldown of 8 seconds or greater have +1 Multicast.
ItemFunction.items.set("Fort",(item)=>{
    item.gain( getRarityValue("100 >> 150",item.rarity),'shield');
    item.board.items.forEach(i=>{

        i.gain( 1000*getRarityValue("1 >> 2",item.rarity),'cooldown');
    });
    item.board.items.forEach(i=>{
        if(i.cooldown>=8000) {
            i.multicast++;  
        }
    });
    item.triggerFunctions.push(()=> {
        item.applyShield(item.shield);
    });
});

//Deal 100 damage.
//This deals ( 3 » 5 » 10 ) times more damage if it is your only weapon. from Sniper Rifle
ItemFunction.items.set("Sniper Rifle",(item)=>{
    const amount = getRarityValue("3 >> 5 >> 10",item.rarity);
    if(item.board.items.filter(i=>i.tags.includes("Weapon")).length==1) {
        item.damage_multiplier *= amount;
    }
    item.gain(100,'damage');

    item.triggerFunctions.push(()=>{
        item.dealDamage(item.damage);
    });
});
//You have (  +1  » +2  » +3   ) income for each Property you have (including Stash). from Open for Business
ItemFunction.items.set("Open for Business",(item)=>{
    const amount = getRarityValue("1 >> 2 >> 3",item.rarity);
    item.board.items.forEach(i=>{
        if(i.tags.includes("Property")) {
            item.board.player.income += amount;
        }

    });
});
ItemFunction.items.set("Atlatl",(item)=>{
    //Deal ( 20 » 40 » 60 » 80 ) damage.
    //This item's cooldown is reduced by 1% for every 2 damage it has. from Atlatl
    const damage = getRarityValue("20 >> 40 >> 60 >> 80",item.rarity);
    item.damageChanged((newDamage,oldDamage)=>{
        item.gain(item.cooldown*(1- ((newDamage-oldDamage)/2/100)) - item.cooldown,'cooldown');
    })
    item.gain(damage,'damage');
    item.triggerFunctions.push(()=>{
        item.dealDamage(item.damage);
    });
});
//Your leftmost and rightmost items have their cooldowns reduced by (  5%  » 10%  » 15%   ). from Vengeance
ItemFunction.items.set("Vengeance",(item)=>{
    const cooldownReduction = getRarityValue("5 >> 10 >> 15",item.rarity);
    const leftmostItem = item.board.items[0];
    const rightmostItem = item.board.items[item.board.items.length-1];
    if(leftmostItem) {
        leftmostItem.gain(leftmostItem.cooldown*(1-cooldownReduction/100)-leftmostItem.cooldown,'cooldown');
    }
    if(rightmostItem) {
        rightmostItem.gain(rightmostItem.cooldown*(1-cooldownReduction/100)-rightmostItem.cooldown,'cooldown');
    }
});
ItemFunction.items.set("Weights",(item)=>{
    ////Your weapons gain ( 2 » 4 » 6 » 8 ) damage for the fight.
    //your heal items gain (  5  » 10  » 15   ) heal for the fight
    const amount = getRarityValue("2 >> 4 >> 6 >> 8",item.rarity);
    const healAmount = getRarityValue("5 >> 10 >> 15",item.rarity);
    item.triggerFunctions.push(()=>{
    item.board.items.forEach(i=>{
        if(i.tags.includes("Weapon")) {
            i.gain(amount,'damage');
        }
        if(i.tags.includes("Heal")) {
                i.gain(healAmount,'heal');
            }
        });
    });
});

ItemFunction.items.set("Pet Rock",(item)=>{
    //"Deal ( 8 » 16 » 24 » 32 ) damage.",
    //"If this is your only friend, your items have ( +10% » +15% » +20% » +25% ) Crit Chance."
    const damage = getRarityValue("8 >> 16 >> 24 >> 32",item.rarity);
    item.gain(damage,'damage');
    item.triggerFunctions.push(()=>{
        item.dealDamage(item.damage);
    });
    const comparisonFunction = () => {
        const friends = item.board.activeItems.filter(i=>i.tags.includes("Friend"));
        if(friends.length==1 && friends[0].id==item.id) {
            return true;
        }
        return false;
    }
    const undoableFunction = item.getUndoableFunctionFromText("your items have ( +10% » +15% » +20% » +25% ) Crit Chance.",comparisonFunction,true);
    item.board.itemDestroyedTriggers.set(item.id,undoableFunction);
});

/*    "Your weapons gain ( 6 » 9 » 12 ) Damage for the fight.",
      "Your Heal items gain ( 6 » 9 » 12 ) Heal for the fight.",
      "Your Shield items gain ( 6 » 9 » 12 ) Shield for the fight.",
      "If you have another Tool, Weapon, Property or Apparel this has +1 Multicast for each."
    */
ItemFunction.items.set("Apropos Chapeau",(item)=>{
    const dmgGain = getRarityValue("6 >> 9 >> 12",item.rarity);
    const healGain = getRarityValue("6 >> 9 >> 12",item.rarity);
    const shieldGain = getRarityValue("6 >> 9 >> 12",item.rarity);
    const uniqueTags = new Set();
    item.board.items.forEach(i => {
        if(i==item) return;
        if(i.tags.includes("Tool")) uniqueTags.add("Tool");
        if(i.tags.includes("Weapon")) uniqueTags.add("Weapon");
        if(i.tags.includes("Property")) uniqueTags.add("Property");
        if(i.tags.includes("Apparel")) uniqueTags.add("Apparel");
    });
    const amount = uniqueTags.size;
    item.multicast+=amount;
    item.triggerFunctions.push(()=>{
        item.board.items.forEach(i=>{
            if(i.tags.includes("Weapon")) {
                i.gain(dmgGain,'damage');
            }
            if(i.tags.includes("Heal")) {
                i.gain(healGain,'heal');
            }
            if(i.tags.includes("Shield")) {
                i.gain(shieldGain,'shield');
            }
        });
    });
});

// When any player uses an item, all items gain (  2%  » 4%   ) Crit Chance for the fight.
ItemFunction.items.set("Foreboding Winds",(item)=>{
    const critGain = getRarityValue("2 >> 4",item.rarity);
    const critGainTriggerFunction = (i)=>{
        item.board.items.forEach(i=>{
            i.gain(critGain,'crit');
        });
        item.board.player.hostileTarget.board.items.forEach(i=>{
            i.gain(critGain,'crit');
        });
    };
    item.board.itemTriggers.set(item.id,critGainTriggerFunction);
    item.board.player.hostileTarget.board.itemTriggers.set(item.id,critGainTriggerFunction);
});
//You have (  +35  » +100  » +200  » +300   ) Max Health for each Non-Weapon item you have. from Healthy Hoarder
ItemFunction.items.set("Healthy Hoarder",(item)=>{
    const amount = getRarityValue("35 >> 100 >> 200 >> 300",item.rarity);
    const nonWeaponCount = item.board.items.filter(i=>!i.tags.includes("Weapon")).length;
    item.board.player.maxHealth += amount*nonWeaponCount;
});

// You have (  +100  » +200  » +300   ) Max Health for each Weapon you have. from Brawler
ItemFunction.items.set("Brawler",(item)=>{
    const amount = getRarityValue("100 >> 200 >> 300",item.rarity);
    const weaponCount = item.board.items.filter(i=>i.tags.includes("Weapon")).length;
    item.board.player.maxHealth += amount*weaponCount;
});
//The weapon to the left of this has ( +10 » +20 » +30 » +50 ) damage. from Silencer
//If you have exactly one weapon, reduce its cooldown by ( 15% » 20% » 25% » 30% ). from Silencer
ItemFunction.items.set("Silencer",(item)=>{
    const dmgGain = getRarityValue("10 >> 20 >> 30 >> 50",item.rarity);
    const cooldownReduction = getRarityValue("15 >> 20 >> 25 >> 30",item.rarity);
    const weapons = item.board.items.filter(i=>i.tags.includes("Weapon"));
    if(weapons.length==1) {
        weapons[0].gain(weapons[0].cooldown*(100-cooldownReduction)/100 - weapons[0].cooldown,'cooldown');
    }
    if(weapons.length>0 && weapons[0].startIndex < item.startIndex) {
        let leftWeapon=item.getItemToTheLeft();
        if(leftWeapon && leftWeapon.tags.includes("Weapon")) {
            leftWeapon.gain(dmgGain,'damage');
        }
    }    
});

//Infernal Greatsword
//Deal 2 damage.
//Burn equal to this item's damage.
//This gains Damage equal to your enemy's Burn for the fight.
    ItemFunction.items.set("Infernal Greatsword",(item)=>{
        item.damageChanged((newDamage,oldDamage)=>{
            item.gain(newDamage-oldDamage,'burn');
        });
        item.gain(2,'damage');
        item.triggerFunctions.push(()=>{
            item.dealDamage(item.damage);
            item.applyBurn(item.burn);
            item.gain(item.board.player.hostileTarget.burn,'damage');
        });
    });

//Burn (3 >> 6 >> 9 >> 12)
//This has + Burn equal to (50%/75%/100%) of the Burn of your non-Fire Claw items.from Fire Claw
ItemFunction.items.set("Fire Claw",(item)=>{
    const burnAmount = getRarityValue("6 >> 9 >> 12", item.rarity);
    const burnPercentage = getRarityValue("50 >> 75 >> 100", item.rarity);
    const nonFireClawItems = item.board.items.filter(i=>!i.name.includes("Fire Claw"));
    item.gain(burnAmount,'burn');
    item.gain(nonFireClawItems.reduce((acc,i)=>acc+i.burn,0)*burnPercentage/100,'burn');
    nonFireClawItems.forEach(i=>{
        i.burnChanged((newBurn,oldBurn)=>{
            item.gain((newBurn-oldBurn)*burnPercentage/100,'burn');
        });
    });
    item.triggerFunctions.push(()=>{
        item.applyBurn(item.burn);
    });
});
//If you have exactly one weapon, it has Lifesteal and (  5%  » 10%   ) Crit Chance. from Quality over Quantity
ItemFunction.items.set("Quality over Quantity",(item)=>{
    const critGain = getRarityValue("5 >> 10",item.rarity);
    const weapons = item.board.items.filter(i=>i.tags.includes("Weapon"));
    if(weapons.length==1) {
        weapons[0].lifesteal = true;
        weapons[0].gain(critGain,'crit');
    }
});
//If you have at least 7 items in play, your Weapons deal (  +20  » +25  » +30   ) damage. from Noisy Cricket
ItemFunction.items.set("Noisy Cricket",(item)=>{
    const amount = getRarityValue("20 >> 25 >> 30",item.rarity);
    
    if(item.board.items.length>=7) {
        item.board.items.forEach(i=>{
            if(i.tags.includes("Weapon")) {
                i.gain(amount,'damage');
            }
        });
    }
});
//When you use the Core, adjacent weapons gain (  10  » 20  » 30   ) damage for the fight. from Firepower
ItemFunction.items.set("Firepower",(item)=>{
    const amount = getRarityValue("10 >> 20 >> 30",item.rarity);
    item.board.itemTriggers.set(item.id,(i)=>{
        if(i.tags.includes("Core")) {
            const adjacentItems = i.getAdjacentItems();
            adjacentItems.forEach(i=>{
                if(i.tags.includes("Weapon")) {
                    i.gain(amount,'damage');
                }
            });
        }
    });
});

//You have ( +50% » +75% » +100% ) Max Health. from Belt
ItemFunction.items.set("Belt",(item)=>{
    const amount = getRarityValue("50 >> 75 >> 100",item.rarity);
    //item.board.player.maxHealth += item.board.player.maxHealth*amount/100;
    //need to make some way to undo this between resets of it
    
});

//Weapons to the right of this have ( +25 » +50 » +100 ) damage. from Figurehead
//Aquatic items to the left of this have their cooldowns reduced by ( 10% » 20% » 30% ).
ItemFunction.items.set("Figurehead",(item)=>{
    const amount = getRarityValue("25 >> 50 >> 100",item.rarity);
    const weapons = item.board.items.filter(i=>i.tags.includes("Weapon") && i.startIndex > item.startIndex);
    weapons.forEach(i=>{
        i.gain(amount,'damage');
    });
    const cooldownReduction = getRarityValue("10 >> 20 >> 30",item.rarity);
    const aquaticItems = item.board.items.filter(i=>i.tags.includes("Aquatic") && i.startIndex < item.startIndex);
    aquaticItems.forEach(i=>{
        i.gain(i.cooldown*(100-cooldownReduction)/100 - i.cooldown,'cooldown');
    });
});
//If you only have one weapon, it deals triple damage and has its cooldown increased by 50%. from One Shot, One Kill
ItemFunction.items.set("One Shot, One Kill",(item)=>{
    const weapons = item.board.items.filter(i=>i.tags.includes("Weapon"));
    if(weapons.length==1) {
        weapons[0].gain(weapons[0].damage*2,'damage');
        weapons[0].damage_multiplier+=2;
        weapons[0].gain(weapons[0].cooldown*.5,'cooldown');
    }
});
//If you have 5 or fewer items you have (+500/+1000/+2000) Max Health. from Large Appetites
ItemFunction.items.set("Large Appetites",(item)=>{
    const amount = getRarityValue("500 >> 1000 >> 2000",item.rarity);
    if(item.board.items.length<=5) {
        item.board.player.maxHealth += amount;
        item.board.player.health = item.board.player.maxHealth;
        item.board.updateHealthElement();
    }
});
//If you have no weapons, your items' cooldowns are reduced by (10%/20%). from Minimalist
ItemFunction.items.set("Minimalist",(item)=>{
    const cooldownReduction = getRarityValue("10 >> 20",item.rarity);
    if(item.board.items.filter(i=>i.tags.includes("Weapon")).length==0) {
        item.board.items.forEach(i=>{
            i.gain(-i.cooldown*cooldownReduction/100,'cooldown');
        });
    }
});
//Torpedo
ItemFunction.items.set("Torpedo",(item)=>{
    const amount = getRarityValue("25 >> 50 >> 75",item.rarity);
    item.gain(100,"damage");
    item.board.itemTriggers.set(item.id,(i)=>{
        if(i.id!=item.id && (i.tags.includes("Aquatic") || i.tags.includes("Ammo"))) {
            item.gain(amount,'damage');
            if(i.tags.includes("Large")) {
                if(item.ammo<item.maxAmmo) {
                    item.gain(1,'ammo',i);
                }
            }
        }
    });
    item.triggerFunctions.push(()=>{
        item.dealDamage(item.damage);
    });
});
//If you have exactly one weapon, it has (+5/+10) Max Ammo. from Depth Charge
//...if it is also Aquatic, it has (+25/+50) Damage. from Depth Charge
ItemFunction.items.set("Depth Charge",(item)=>{
    const maxAmmoGain = getRarityValue("5 >> 10",item.rarity);
    const damageGain = getRarityValue("25 >> 50",item.rarity);
    const weapons = item.board.items.filter(i=>i.tags.includes("Weapon"));
    if(weapons.length==1) {
        if(weapons[0].tags.includes("Ammo")) {
            weapons[0].maxAmmo += maxAmmoGain;
            weapons[0].ammo = weapons[0].maxAmmo;
        }
        if(weapons[0].tags.includes("Aquatic")) {
            weapons[0].gain(damageGain,'damage');
        }    
    }
});
//Your Small Diamond-tier items have their cooldowns reduced by (30%/40%/50%/60%). from Diamond Fangs
ItemFunction.items.set("Diamond Fangs",(item)=>{
    const cooldownReduction = getRarityValue("30 >> 40 >> 50 >> 60",item.rarity);
    item.board.items.forEach(i=>{
        if(i.tags.includes("Small") && i.rarity=="Diamond") {
            i.gain(-i.cooldown*cooldownReduction/100,'cooldown');
        }
    });
});
//Your Shield Vehicles gain (30%/60%) Shield. from Expert Pilot
//Your Weapon Vehicles gain (30%/60%) Damage. from Expert Pilot
ItemFunction.items.set("Expert Pilot",(item)=>{
    const amount = getRarityValue("30 >> 60",item.rarity);
    item.board.items.forEach(i=>{
        if(i.tags.includes("Shield")) {
            i.gain(i.damage * amount/100,'shield');
        }
        if(i.tags.includes("Weapon")) {
            i.gain(i.damage * amount/100,'damage');
        }
    });
});

//Both players' weapons have double damage. from Glass Cannon
ItemFunction.items.set("Glass Cannon",(item)=>{
    [...item.board.items, ...item.board.player.hostileTarget.board.items].forEach(i=>{
        if(i.tags.includes("Weapon")) {
            i.gain(i.damage,'damage');
            i.damage_multiplier+=1;
            i.updateTriggerValuesElement();
        }
    });
});
//Reload all your items ( 1 » 2 » 3 ) Ammo and charge them 1 second(s). from Port
ItemFunction.items.set("Port",(item)=>{
    const amount = getRarityValue("1 >> 2 >> 3",item.rarity);
    item.charge = 1;
    item.triggerFunctions.push(()=>{
        item.board.items.forEach(i=>{
            if(i.tags.includes("Ammo")) {
                i.gain(amount,'ammo', item);
                item.applyChargeTo(i);
            }
        });
    });
});

//Poison 10.
//Gain 10 regeneration for the fight.
//When any non-weapon is used, Charge this 1 second(s). from Necronomicon
ItemFunction.items.set("Necronomicon",(item)=>{
    item.charge = 1;
    item.gain(10,'poison');
    item.board.itemTriggers.set(item.id,(i)=>{
        if(!i.tags.includes("Weapon")) {
            item.applyChargeTo(item, i);
        }
    });
    item.board.player.hostileTarget.board.itemTriggers.set(item.id,(i)=>{
        if(!i.tags.includes("Weapon")) {
            item.applyChargeTo(item, i);
        }
    });
    item.triggerFunctions.push(()=>{
        item.applyPoison(item.poison);
        item.board.player.gainRegen(10);
    });
});

ItemFunction.items.set("Piggles",()=>{});

//Your Weapons deal (  +10  » +15  » +20  » +25   ) Damage. from Strength
ItemFunction.items.set("Strength",(item)=>{
    const amount = getRarityValue("10 >> 15 >> 20 >> 25",item.rarity);
    item.board.items.forEach(i=>{
        if(i.tags.includes("Weapon")) {
            i.gain(amount,'damage');
        }
    });
});

//At the start of each fight with Crystal Bonsai, this gains ( 2 » 4 » 6 » 8 ) value. from Crystal Bonsai
ItemFunction.items.set("Crystal Bonsai", (item)=>{
    const amount = getRarityValue("2 >> 4 >> 6 >> 8",item.rarity);
    item.board.startOfFightTriggers.set(item.id,()=>{
        item.gain(amount,'value');
    });
    item.triggerFunctions.push(item.getTriggerFunctionFromText("Heal equal to ( 1x » 2x » 3x » 4x ) this item's value."));
});

//When you use a Potion, transform it into a Potion for the fight and gain (1/2/3) Regeneration for the fight. from Recycling Bin
ItemFunction.items.set("Recycling Bin",(item)=>{
    item.regen = getRarityValue("1/2/3",item.rarity);
    item.board.itemTriggers.set(item.id,(i)=>{
        if(i.tags.includes("Potion")) {
            item.applyRegen(item.regen);
        }
    });
});
//"Haste your Lifesteal weapons for (1/2/3/4) second(s)." from runic potion
//"(1/2/3/4) of your weapons gain Lifesteal for the fight." from runic potion
ItemFunction.items.set("Runic Potion",(item)=>{
    const amount = getRarityValue("1/2/3/4",item.rarity);
    item.triggerFunctions.push(()=>{
        item.board.activeItems.forEach(i=>{
            if(i.tags.includes("Weapon") && i.lifesteal) {
                item.applyHasteTo(i,amount);
            }
        });
        const lifestealNeedingWeapons = item.board.activeItems.filter(i=>i.tags.includes("Weapon") && !i.lifesteal);
        item.pickRandom(lifestealNeedingWeapons,amount).forEach(i=>{
            i.lifesteal=true;
        });
    });
});
ItemFunction.setupItems();
