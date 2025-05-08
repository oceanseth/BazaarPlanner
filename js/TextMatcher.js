import { getRarityValue } from "./utils.js";
import { Item } from "./Item.js";
import { Board } from "./Board.js";

export class TextMatcher {
    static comparitors = [];
    static getTriggerFunctionFromText(text, item) {
        for(let matcher of TextMatcher.matchers) {
            if(matcher.regex.test(text)) {                
                item.textMatches.push(matcher);
                return matcher.func(item,text.match(matcher.regex));
            }
        }
        return null;
    }
    static matchers = [];
}
TextMatcher.comparitors["If you have exactly one weapon, "]= {
    test: (item) => {
        return item.board.activeItems.filter(i=>i.tags.includes("Weapon")).length==1;
    },
    setup: (item,f) => {
        item.target = item.board.items.filter(i=>i.tags.includes("Weapon"))[0];
        item.board.itemDestroyedTriggers.set(item.id,()=> {f(item.target);});
    }
};
TextMatcher.comparitors["If you have no other weapons, "]= {
    test: (item) => {
        return item.board.activeItems.filter(i=>i.tags.includes("Weapon")).length==0;
    },
    setup: (item,f) => {
        item.target = item.board.items.filter(i=>i.tags.includes("Weapon"))[0];
        item.board.itemDestroyedTriggers.set(item.id,()=> {f(item.target);});
    }
};
TextMatcher.matchers.push({
    id: "Essence Overflow Matcher",
    regex: /^your weapons have \+ damage equal to your Regen(?:eration)?\.$/i,
    func: (item, match)=>{
        item.board.items.forEach(item => {
            if(item.tags.includes("Weapon")) {
                item.gain(item.board.player.regen,'damage');
            }
        });
        item.board.player.regenChanged((newRegen,oldRegen)=>{
            item.board.items.forEach(item => {
                if(item.tags.includes("Weapon")) {
                    item.gain(newRegen-oldRegen,'damage');
                }
            });
        });
        return ()=>{};
    },
});
TextMatcher.matchers.push({
    desc: "if something, do something while something",
    regex: new RegExp(`^(${Object.keys(TextMatcher.comparitors).join('|')})?(.*) while you(r enemy)? (?:has|have) a (Slowed|Hasted|Frozen) item\.$`, 'i'),
    func: (item, match)=>{        
        const targetBoard = match[3] ? item.board.player.hostileTarget.board : item.board;
        const f = item.getUndoableFunctionFromText(match[2], ()=>(match[1]?TextMatcher.comparitors[match[1]].test(item):1) && targetBoard["has"+match[4]+"Item"]);
        targetBoard["has"+match[4]+"ItemChanged"](() => {f(item.target);});   
        if(match[1]) {
            TextMatcher.comparitors[match[1]].setup(item,f);
        }
        return ()=>{};
    },
});
TextMatcher.matchers.push({
    //If you have no other weapons, this has +1 multicast. from quill and ink
    regex: new RegExp(`^(${Object.keys(TextMatcher.comparitors).join('|')})(.*)$`, 'i'),
    func: (item, match)=>{
        const f = item.getUndoableFunctionFromText(match[2], ()=>(TextMatcher.comparitors[match[1]].test(item)));
        TextMatcher.comparitors[match[1]].setup(item,f);
        return ()=>{};
    },
});
TextMatcher.matchers.push({
    //gain (1/2) time(s) your Regeneration for the fight. from Emergency Draught
    regex: /^\s*gain (\([^)]+\)|\d+) time\(?s\)? your Regen(?:eration)? for the fight\.$/i,
    func: (item, match)=>{
        const multiplier = getRarityValue(match[1], item.rarity);
        item.gain(item.board.player.regen*multiplier,'regen');
        item.board.player.regenChanged((newAmount,oldAmount)=>{
            item.gain((newAmount-oldAmount) * multiplier,'regen');
        });
        return ()=>{
            item.applyRegen();
        }; 
    },
});
TextMatcher.matchers.push({
    //This has +1 Multicast for each Weapon or friend your enemy has. from Thrown Net
    regex: /^this has \+1 Multicast for each Weapon or friend your enemy has\.$/i,
    func: (item, match)=>{
        let multicastAdded = item.board.player.hostileTarget.board.items.filter(i=>i.tags.includes("Weapon")||i.tags.includes("Friend")).length;        
        item.gain(multicastAdded,'multicast');
        item.board.player.hostileTarget.board.itemDestroyedTriggers.set(item.id,(i,source)=>{
           if(i.tags.includes("Weapon")||i.tags.includes("Friend")) {            
            item.gain(-1,'multicast', source);
           }
        });
        return ()=>{};
    },
});
TextMatcher.matchers.push({
    // Deal damage equal to the Regeneration plus the Burn on both players. from Sunlight Spear
    regex: /^deal damage equal to the Regen(?:eration)? plus the Burn on both players\.$/i,
    func: (item, match)=>{
        item.gain(item.board.player.regen+item.board.player.hostileTarget.regen,'damage');
        item.board.player.regenChanged((newRegen,oldRegen)=>{
            item.gain(newRegen-oldRegen,'damage');
        });
        item.board.player.hostileTarget.regenChanged((newRegen,oldRegen)=>{
            item.gain(newRegen-oldRegen,'damage');
        });
        item.board.player.burnChanged((newBurn,oldBurn)=>{
            item.gain(newBurn-oldBurn,'damage');
        });
        item.board.player.hostileTarget.burnChanged((newBurn,oldBurn)=>{
            item.gain(newBurn-oldBurn,'damage');
        });
        return ()=>{
            item.applyDamage(item.damage);
        };
    },
});
TextMatcher.matchers.push({
    //Your Burn items gain Burn equal to 15% of this item's value for the fight. from Fiery Pyg's Gym
    regex: /^Your (\w+) items gain (\w+) equal to (\([^)]+\)|\d+)%? of this item's (\w+) for the fight\.$/i,
    func: (item, match)=>{
        const whatTag = Item.getTagFromText(match[1]);
        const whatToGain = match[2].toLowerCase();
        const multiplier = getRarityValue(match[3], item.rarity)/100;
        const whatThing = Item.getTagFromText(match[4]);
        item.board.items.forEach(i=>{
            if(i.tags.includes(whatTag)) {
                i.gain(item[whatThing]*multiplier,whatToGain);
            }
        });
        return ()=>{};
    },
});
TextMatcher.matchers.push({
    //give your items (+1/+2) value for the fight. from Billboard
    regex: /^give your items (\([^)]+\)|\d+) ([^\s]+) for the fight\.$/i,
    func: (item, match)=>{
        const amountToGain = getRarityValue(match[1], item.rarity);
        const whatToGain = match[2];
       
        return ()=>{
            item.board.items.forEach(item => {
                item.gain(amountToGain,whatToGain);
            });
        };
    },
});
TextMatcher.matchers.push({
    //This item's cooldown is reduced by 1% for every value it has. from Billboard
    regex: /^this item's cooldown is reduced by 1% for every value it has\.$/i,
    func: (item, match)=>{
        let cooldownReducedBy = item.value*item.cooldown/100;
        item.gain(-cooldownReducedBy,'cooldown');
        item.valueChanged((newVal,oldVal)=>{
            const newCooldownReducedBy = newVal*(item.cooldown+cooldownReducedBy)/100;
            item.gain(-(newCooldownReducedBy-cooldownReducedBy),'cooldown');
            cooldownReducedBy = newCooldownReducedBy;
        });
        return ()=>{};
    },
});
TextMatcher.matchers.push({
    //Gain Regeneration for the fight equal to half your current Poison. from Noxious Potion
    regex: /^gain Regen(?:eration)? for the fight equal to half your current Poison\.$/i,
    func: (item, match)=>{        
        return ()=>{
            item.board.player.regen += item.board.player.poison/2;
        };
    },
});
TextMatcher.matchers.push({
    //This item's cooldown is reduced by 1 second for each adjacent Friend. from Nanobot
    regex: /^this item's cooldown is reduced by 1 second for each adjacent Friend\.$/i,
    func: (item, match)=>{
        let cooldownReducedBy = item.adjacentItems.filter(i=>i.tags.includes("Friend")).length;
        item.gain(-cooldownReducedBy*1000,'cooldown');
        item.board.itemDestroyedTriggers.set(item.id,(i,source)=>{            
            if(i.tags.includes("Friend") && i.adjacentItems.includes(item)) {
                item.gain(1000,'cooldown', source);
            }
        });
        return ()=>{};
    },
});
TextMatcher.matchers.push({
      // Haste (  2  » 4  » 6   ) items 2 second(s).  
      regex: /^Haste (?:\(([^)]+)\)|(\d+)) (?:(\w+) )?items?.* for (\([^)]+\)|\d+) second/i,
      func: (item, match)=>{            
          const [_, itemsRange, singleItemCount, requiredTag, durationRange] = match;
              
          const numItemsToHaste = itemsRange ? 
              getRarityValue(itemsRange, item.rarity) : 
              parseInt(singleItemCount);
          item.haste += getRarityValue(durationRange, item.rarity);
          
          return () => {
              let items = Array.from(item.board.items);
              items = items.filter(i => i.isHasteTargetable());        
              if(requiredTag=='adjacent') {
                items = items.filter(i => i.adjacentItems.includes(item));
              } else if (requiredTag) {
                  items = items.filter(i => i.tags && i.tags.includes(requiredTag));
              }
              const selectedItems = item.pickRandom(items,numItemsToHaste);
          
              selectedItems.forEach(i => {
                  item.applyHasteTo(i);
              });
          };
      },
});
TextMatcher.matchers.push({
    //Deal (500/1000) damage to the player with less health. from Gavel
    regex: /^deal (\([^)]+\)|\d+) damage to the player with less health\.$/i,
    func: (item, match)=>{
        const amount = getRarityValue(match[1], item.rarity);
        item.gain(amount,'damage');
        return ()=>{
            const target = item.board.player.health<=item.board.player.hostileTarget.health?item.board.player:item.board.player.hostileTarget;
            item.dealDamage(item.damage, target);
        };
    },
});
TextMatcher.matchers.push({
    //Deal (15/20/25) damage for each Friend you have. from Nanobot, Junkyard Lance
    regex: /^deal (\([^)]+\)|\d+) damage for each ([^\s]+)(?: item)? you have( \(including Stash\))?\.$/i,
    func: (item, match)=>{
        const amount = getRarityValue(match[1], item.rarity);
        const tag = Item.getTagFromText(match[2]);
        const totalDamage = item.board.items.filter(i=>i.tags.includes(tag)).length*amount;
        item.gain(totalDamage,'damage');
        item.board.itemDestroyedTriggers.set(item.id,(i)=>{
            if(i.tags.includes(tag)) {
                item.gain(-amount,'damage');
            }
        });
        return ()=>{
            item.applyDamage(item.damage);
        };
    },
});
TextMatcher.matchers.push({
    //Double the damage of your Large weapons. from Big Guns
    regex: /^double the damage of your ([^\s]+) weapons\.$/i,
    func: (item, match)=>{
        const tag = Item.getTagFromText(match[1]);
        item.board.items.forEach(i=>{
        if(i.tags.includes(tag)) {
            const oldMultiplier = i["damage_multiplier"];
            i["damage_multiplier"] = 1;
            i.gain(i.damage,'damage');
            i["damage_multiplier"] = oldMultiplier+1;
        }
        });
        return ()=>{};
    },
});
TextMatcher.matchers.push({
    //When (?:this|this item) gains (.*), (.*) Mech Moles
    regex: /^When (?:this|this item) gains (.*), (.*)/i,
    func: (item, match)=>{
        const f = item.getTriggerFunctionFromText(match[2]);
        const f2 = (i,source)=>{ if(i.id==item.id) f(i,source); };
        switch(match[1].toLowerCase()) {
            case "haste":
                item.board.hasteTriggers.set(item.id+"_"+f.text,f2);
                break;
            case "slow":
                item.board.slowTriggers.set(item.id+"_"+f.text,f2);
                break;
            case "damage":
                item.board.damageTriggers.set(item.id+"_"+f.text,f2);
                break;
            case "freeze":
                item.board.freezeTriggers.set(item.id+"_"+f.text,f2);
                break;
            default:
                console.log("Unknown when gain trigger: "+match[1]);
        }
        return ()=>{};
    }
});
TextMatcher.matchers.push({
    //Haste your rightmost item 1 second(s).
    regex: /^Haste your (leftmost|rightmost) item (\d+) second\(?s?\)?\.$/i,
    func: (item, match)=>{
        item.haste += getRarityValue(match[2], item.rarity);
        const whichItem = match[1]=='leftmost'?item.board.items[0]:item.board.items[item.board.items.length-1];        
        return ()=>{
            item.applyHasteTo(whichItem);
        };
    },
});
TextMatcher.matchers.push({
    //This has double charge amount. from Shiny fiber optic cable
    regex: /^this has double charge amount\.$/i,
    func: (item, match)=>{
        item.charge_pauseChanged = true;
        const oldChargeMultiplier = item.charge_multiplier;
        item.charge_multiplier = 1;
        item.charge*=2;
        item.charge_pauseChanged = false;
        item.charge_multiplier = oldChargeMultiplier;
        item.charge_multiplier +=1 ;
        return ()=>{};
    },
});
TextMatcher.matchers.push({
    //heal for 1 and take no damage for 1 second(s). from Memento Mori and Invulnerability Potion
    regex: /^(?:you )?take no damage for (\([^)]+\)|\d+) second\(?s?\)?\.$/i,
    func: (item, match)=>{
       // const healAmount = getRarityValue(match[1], item.rarity);
        const duration = 1000*getRarityValue(match[1], item.rarity);
        let diedAtTime;
        return ()=>{
         //   item.board.player.health=0;
       //     item.applyHeal(healAmount);
            diedAtTime = item.board.player.battleTime;
            item.log(item.name + " damage prevention starts");
            item.board.player.healthChanged((newHealth,oldHealth)=>{
                if(newHealth<oldHealth && diedAtTime >= item.board.player.battleTime - duration) {
                    item.board.player.damage_pauseChanged = true;
                    item.board.player.health += (oldHealth-newHealth); //undo the damage
                    item.board.player.damage_pauseChanged = false;
                    item.log(item.name + " prevented "+(oldHealth-newHealth)+" damage");
                } else if(diedAtTime < item.board.player.battleTime - duration) {
                    item.log(item.name + " damage prevention expires");
                    item.board.player.healthCancelChanged(item.id);
                }
            },item.id);
        };
    },
});
TextMatcher.matchers.push({
    //The sandstorm begins!
    regex: /^the sandstorm begins!/i,
    func: (item, match)=>{
        return ()=>{
            item.board.player.battle.startSandstorm();
        };
    },
});
TextMatcher.matchers.push({
    //Enchant a non-enchanted item for the fight. From Laboratory
    regex: /^Enchant another non-enchanted item for the fight\.$/i,
    func: (item)=>{
        return ()=>{
            const nonEnchantedItems = item.board.items.filter(i=>i.id!=item.id && !i.tags.includes("Enchanted"));
            if(nonEnchantedItems.length>0) {
                const target = item.pickRandom(nonEnchantedItems);
                target.addTemporaryEnchant();
            }
        };
    },
});
TextMatcher.matchers.push({
    //Increase an enemy item's cooldown by ( 1 » 2 » 3 ) seconds for the fight.
    regex: /^Increase (an enemy|this) item's cooldown by (\([^)]+\)|\d+) second\(?s?\)? for the fight\.$/i,
    func: (item, match)=>{
        const cooldownIncrease = parseInt(getRarityValue(match[2], item.rarity));
        
        return ()=>{
            const target = match[1]=='this'?item:item.pickRandom(item.board.player.hostileTarget.board.items.filter(i=>i.cooldown>1000));
            if(target) {
                target.gain(1000*cooldownIncrease,'cooldown',item);
            }
        };
    },
});
TextMatcher.matchers.push({
    //if you have a Large item.
    regex: /^(.*) if you have a ([^\s]+) item\.$/i,
    func: (item, match)=>{
        const tag = Item.getTagFromText(match[2]);
        const f = item.getTriggerFunctionFromText(match[1]);
        if(item.board.items.some(i=>i.tags.includes(tag))) {
            f();
        }
        return ()=>{};
    }
});
TextMatcher.matchers.push({
    //While your enemy has Poison, this has ( +50% » +100% ) Crit Chance. from Basilisk Fang
    regex: /^While your enemy has Poison, (.*)$/i,
    func: (item, match)=>{
        item.board.player.hostileTarget.poisonChanged(item.getUndoableFunctionFromText(match[1],
            (newValue)=>{
                if(newValue>0) return true; return false;
            }
        ));
        return ()=>{};
    },
});
TextMatcher.matchers.push({
    //Your Weapons have + Damage equal to (1/2/3) times your Regeneration. from Staff of the Moose 
    regex: /^Your Weapons have \+ Damage equal to (\([^)]+\)|\d+) times your Regen(?:eration)?\.$/i,
    func: (item, match)=>{
        const damageMultiplier = getRarityValue(match[1], item.rarity);
        item.board.items.forEach(i=>{
            if(i.tags.includes("Weapon")) {
                i.gain(item.board.player.regen*damageMultiplier,'damage');  
            }
        });
        item.board.player.regenChanged((newRegen,oldRegen)=>{
            item.board.items.forEach(i=>{
                if(i.tags.includes("Weapon")) {
                    i.gain((newRegen-oldRegen)*damageMultiplier,'damage');
                }
            });
        });
        return ()=>{};
    },
});
TextMatcher.matchers.push({
    //When this is transformed, (.*) from Sulphur
    regex: /^When this is transformed, (.*)$/i,
    func: (item, match)=>{
        const f = item.getTriggerFunctionFromText(match[1]);
        item.board.transformTriggers.set(item.id+"_"+f.text,
            (i,source) => {
                if(i.id==item.id) {
                    f(i,source);
                }
            }
        );
        return ()=>{};
    },
});
TextMatcher.matchers.push({
    //from Viper Cane
    // "A Poison item gains + Poison equal to (10%/20%) of this item's damage for the fight.",
    //"A Regeneration item gains + Regeneration equal to (10%/20%) of this item's damage for the fight."

    regex: /^A ([^\s]+) item gains \+\s?([^\s]+) equal to (\([^)]+\)|\d+)%? of this item's ([^\s]+) for the fight\.$/i,
    func: (item, match)=>{
        const whatToGain = match[2];
        const whatTag = Item.getTagFromText(match[1]);
        const multiplier = getRarityValue(match[3], item.rarity)/100;
        const whatThing = match[4].toLowerCase();
        return ()=>{
            const validTargets = item.board.activeItems.filter(i=>i.tags.includes(whatTag));
            const target = item.pickRandom(validTargets);
            if(target) {
                target.gain(item[whatThing]*multiplier, whatToGain);
            }
        };
    },
});
TextMatcher.matchers.push({    
    //Your Heal items have +Heal equal to this item's value. from Vineyard
    regex: /^Your (Regen|Poison|Heal)(?:eration)? items have \+\s?(Regen|Poison|Heal)(?:eration)? equal to (?:(\([^)]+\)|\d+%?) of )?this item's (\w+)\.$/i,
    func: (item, match)=>{
        const whatToGain = match[2];
        const whatTag = Item.getTagFromText(match[1]);
        const multiplier = match[3]?getRarityValue(match[3], item.rarity)/100:1;
        const whatThing = Item.getTagFromText(match[4]).toLowerCase();
        const f = (amount)=> {
            item.board.items.forEach(i=>{
                if(i.tags.includes(whatTag)) {
                    i.gain(amount*multiplier, whatToGain);
                }
            });
        };
        f(item[whatThing]);
        item[whatThing+"Changed"]((newVal,oldVal)=>{
            f(newVal-oldVal);
        });
        return ()=>{};
    },
});
TextMatcher.matchers.push({    
    regex: /^You have \+Regen(?:eration)? equal to this item's (\w+)\.$/i,
    func: (item, match)=>{
        const whatThing = Item.getTagFromText(match[1]).toLowerCase();
        item.board.player.regen += item[whatThing];
        item[whatThing+"Changed"]((newVal,oldVal)=>{
            item.board.player.regen += newVal-oldVal;
        });
        return ()=>{};
    },
});

TextMatcher.matchers.push({
    //poison (1/2/3) for each type this has.
    regex: /^(\w+) \(([^)]+)\) for each(?: unique)? type this has\.?$/i,
    func: (item, match)=>{
        const amount = getRarityValue(match[2], item.rarity);
        const typeCount = item.tags.filter(tag => Board.uniqueTypeTags.includes(tag)).length;
        const whatToDo = Item.getTagFromText(match[1]);
        item.gain(amount * typeCount, whatToDo);
        return ()=>{
            item["apply"+whatToDo](item[whatToDo.toLowerCase()]);
        };
    },
});
TextMatcher.matchers.push({
    //Reduce your enemy's Max Health by (10%/15%/20%) for the fight. from Shrinking Potion
    regex: /^Reduce your enemy's Max Health by (\([^)]+\)|\d+)%? for the fight\.$/i,
    func: (item, match)=>{
        const amount = getRarityValue(match[1], item.rarity);
        return ()=>{
            item.board.player.hostileTarget.maxHealth -= item.board.player.hostileTarget.maxHealth * amount / 100;
            if(item.board.player.hostileTarget.maxHealth<item.board.player.hostileTarget.health) {
                item.board.player.hostileTarget.health = item.board.player.hostileTarget.maxHealth;
            }
        };
    },
});
TextMatcher.matchers.push({
    //The Burn item to the left of this gains + Burn equal to your Regeneration for the fight. from Secret Formula
    //The Poison item to the right of this gains + Poison equal to your Regeneration for the fight. from Secret Formula
    regex: /^The ([^\s]+) item to the (left|right) of this gains \+\s?([^\s]+) equal to your (Burn|Poison|Regen)(?:eration)? for the fight\.$/i,
    func: (item, match)=>{
        const whatToGain = match[3].toLowerCase();
        const tag = Item.getTagFromText(match[1]);
        const whatOfYours = match[4].toLowerCase();
        return ()=>{
            let target = match[2]=='left'?item.getItemToTheLeft():item.getItemToTheRight();
            if(target.tags.includes(tag)) {
                target.gain(item.board.player[whatOfYours],whatToGain,item);
            }
        };
    },
});
//Your items gain +100% Crit Chance for (3/4/5) seconds. from Strength Potion
TextMatcher.matchers.push({
    regex: /^Your items gain \+100% Crit Chance for (\([^)]+\)|\d+) second\(?s?\)?\.$/i,
    func: (item, match)=>{
        const duration = getRarityValue(match[1], item.rarity)*1000;
        return ()=>{
            const timeToCancel = item.board.player.battleTime+duration;
            item.board.items.forEach(i=>{
                i.gain(100,'crit',item);
            });
            item.board.player.battleTimeChanged((newTime)=>{
                if(newTime>=timeToCancel) {
                    item.board.items.forEach(i=>{
                        i.gain(-100,'crit',item);
                    });
                    item.board.player.battleTimeCancelChanged(item.id);
                }
            }, item.id);
        };
    },
});
TextMatcher.matchers.push({
    //enchant it with ... if able
    regex: /^enchant it with (.*) if able\.$/i,
    func: (item, match)=>{
        const enchant = Item.getTagFromText(match[1]);
        return ()=>{
            if(Object.keys(item.enchants).includes(enchant)) {
                item.addTemporaryEnchant(enchant);
            }
        };
    },
});
TextMatcher.matchers.push({
    //For every (1/2/3) poison on the enemy, this has +1 multicast  from Plauge Glaive
    regex: /^For every (\([^)]+\)|\d+) (burn|poison|regen)(?:eration)? on the enemy, this has \+1 multicast\.$/i,
    func: (item, match)=>{
        const amount = getRarityValue(match[1], item.rarity);
        const whatToDo = match[2].toLowerCase();
        let multicastAdded = 0;
        item.board.player.hostileTarget[whatToDo+"Changed"]((newAmount) => {
            const multicastAddedShouldBe = Math.floor(newAmount/amount);
            if(multicastAddedShouldBe!=multicastAdded) {
                item.gain(multicastAddedShouldBe-multicastAdded,'multicast',item);
            }
            multicastAdded = multicastAddedShouldBe;
        });
        return ()=>{};
    },
});
TextMatcher.matchers.push({
    //When one of your Burn items gains Haste, if it already has Haste, it gains (1/2/3) Burn for the fight.
    //When one of your Weapons gains Haste, if it already has Haste, it gains (+5/+10/+15) damage.
    regex: /^When one of your ([^\s]+)s?(?: items)? gains Haste, if it already has Haste, it gains (\([^)]+\)|\d+) (\w+)(?: for the fight)?\.$/i,
    func: (item, match)=>{
        const amount = getRarityValue(match[2], item.rarity);
        const tag = Item.getTagFromText(match[1]);
        const whatToGain = match[3].toLowerCase();
        item.board.hasteTriggers.set(item.id+"_"+whatToGain, (i,source,duration)=>{
            if((tag=='Items'||i.tags.includes(tag) )&& i.hasteTimeRemaining>duration) {
                i.gain(amount,whatToGain,item);
            }
        });
        return ()=>{};
    },
});
TextMatcher.matchers.push({
    //Charge another Tech item (1/2) second(s). from Lens
    //Charge another item 1 second(s). from Flurry of Blows
    regex: /^Charge another( [^\s]+)? item (\([^)]+\)|\d+) second\(?s\)?\.?$/i,
    func: (item, match)=>{
        const tag = Item.getTagFromText(match[1]);        
        item.charge = getRarityValue(match[2], item.rarity);
        return ()=>{
            const target = item.pickRandom(item.board.activeItems.filter(i=>i.id!=item.id&&(tag==null||i.tags.includes(tag))));
            if(target) {
                item.applyChargeTo(target);
            }
        };
    },
});
TextMatcher.matchers.push({
    //This loses 25% Crit Chance for the fight. from Letter Opener
    regex: /^This loses (\d+)%? Crit Chance for the fight\.?$/i,
    func: (item, match)=>{
        const amount = getRarityValue(match[1], item.rarity);
        return ()=>{
            item.gain(-amount,'crit',item);
        };
    },
});
TextMatcher.matchers.push({
    //A Friend gains +1 Multicast for the fight. from Card Table
    regex: /^A Friend gains \+1 Multicast for the fight\.$/i,
    func: (item, match)=>{
        return ()=>{
            const friends = item.board.activeItems.filter(i=>i.tags.includes("Friend"));
            if(friends.length>0) {
                const friend = item.pickRandom(friends);
                friend.gain(1,'multicast',item);
            }
        };
    },
});

//charge the Core (1/2) second(s). from Dooltron Mainframe
TextMatcher.matchers.push({
    regex: /^charge the Core (\([^)]+\)|\d+) second\(?s\)?\.?$/i,
    func: (item, match)=>{
        item.charge = getRarityValue(match[1], item.rarity);
        return ()=>{
            item.board.activeItems.filter(i=>i.tags.includes("Core")).forEach(i=>{
               item.applyChargeTo(i);
            });
           
        };
    },
});
//Your Dooltron has the Core type. from Dooltron Mainframe
TextMatcher.matchers.push({
    regex: /^Your Dooltron has the Core type\.$/i,
    func: (item, match)=>{
        const dooltron = item.board.items.filter(i=>i.name.endsWith("Dooltron"));
        if(dooltron.length>0 && !dooltron[0].tags.includes("Core")) {
            dooltron[0].tags.push("Core");
        }
        return ()=>{};
    },
});
TextMatcher.matchers.push({
    //This has double damage bonus.
    regex: /^This has double damage bonus\.$/i,
    func: (item, match)=>{
        const [strippedName] = Item.stripEnchantFromName(item.name);
        //remove the weapon tag given by obsidian assuming this text came from that enchant
        if(!items[strippedName].tags.includes("Weapon") && item.tags.includes("Weapon")) {
            item.tags = item.tags.filter(tag => tag !== "Weapon");
        }
        item.hasDoubleDamageBonus = true;
        return ()=>{};
    },
});
TextMatcher.matchers.push({
    regex: /^(Your \w+(?: items)? have )((?:(?! and ).)*) and (.*)\.$/i,
    func: (item, match)=>{
        const f1 = item.getTriggerFunctionFromText(match[1]+match[2]+".");
        const f2 = item.getTriggerFunctionFromText(match[1]+match[3]+".");
        f1();
        f2();
        return ()=>{};
    }
})
//Your friends gain +10% Crit Chance for the fight.
TextMatcher.matchers.push({
    regex: /^Your (\w+)s?(?: items?) gain (\([^)]+\)|\+?\d+)%? Crit Chance for the fight\.$/i,
    func: (item, match)=>{
        const tag = Item.getTagFromText(match[1]);
        const amount = getRarityValue(match[2], item.rarity);        
        return ()=>{
            item.board.activeItems.filter(i=>i.tags.includes(tag)).forEach(friend=>{
                friend.gain(amount,'crit',item);
            });
        };
    }
});
TextMatcher.matchers.push({
    //If this is adjacent to a Regeneration item
    regex: /^If this is adjacent to a (\w+) item, (.*)\.$/i,
    func: (item, match)=>{
        const tag = Item.getTagFromText(match[1]);
        const adjacentItems = item.adjacentItems;
        if(adjacentItems.some(i=>i.tags.includes(tag))) {
            return item.getTriggerFunctionFromText(match[2]);
        }
        return ()=>{};
    }
});
TextMatcher.matchers.push({
    //gain (25/50/75) Regeneration for the fight. from Staff of the Moose
    regex: /^\s*gain (\([^)]+\)|\d+) Regen(?:eration)? for the fight\.$/i,
    func: (item, match)=>{
        item.gain(getRarityValue(match[1], item.rarity),'regen');
        return ()=>{
            item.applyRegeneration(item.regen);
        };
    }
});
TextMatcher.matchers.push({
    //this gains +Damage for the fight equal to the amount Poisoned. from Test Subject Alpha
    regex: /^this gains \+Damage for the fight equal to the amount (?:Poisoned|Burned)\.$/i,
    func: (theItem, match)=>{
        return (source, {poisonAmount})=>{
                theItem.gain(poisonAmount,'damage');
        };
    }
});
TextMatcher.matchers.push({
    //When a player uses a Weapon, Poison that player (3/4/5). from Wild Quillback
    regex: /^When a player uses a Weapon, Poison that player (\([^)]+\)|\d+)\.$/i,
    func: (item, match)=>{        
        item.gain(getRarityValue(match[1], item.rarity),'poison');
        item.whenItemTagTriggers("Weapon", (i)=>{
            item.applyPoison({source:i,selfTarget: true});
        });
        const hostileBoardItems = item.board.player.hostileTarget.board.items;
        if(hostileBoardItems.length>0) {
            hostileBoardItems[0].whenItemTagTriggers("Weapon", (i)=>{
                item.applyPoison({source:i,selfTarget: true});
            });
        }
        return ()=>{};
    }
});
TextMatcher.matchers.push({
    //When the item to the left of this Shields. from Wrist Warrior
    regex: /^When the item to the left of this Shields, (.*)$/i,
    func: (item, match)=>{
       const leftItem = item.getItemToTheLeft();
       const f = item.getTriggerFunctionFromText(match[1]);
       if(leftItem) {
        item.board.shieldTriggers.set(item.id+"_"+leftItem.id, (i)=>{
            if(i==leftItem) {
                f(item);
            }
        });
       }
       return ()=>{};
    }
});
TextMatcher.matchers.push({
    //Charge 1 non-Toy item(s) (1/2/3/4) second(s). from Speedrunner
    regex: /^Charge 1 (non-)?([\w]+) item\(?s?\)? (\([^)]+\)|\d+) second\(?s\)?\.$/i,
    func: (item, match)=>{
        const non = match[1]!=null;
        const tag = Item.getTagFromText(match[2]);
        item.gain(getRarityValue(match[3], item.rarity),'charge');        
        return ()=>{
            const targetItems = item.board.items.filter(i=>non?!i.tags.includes(tag):i.tags.includes(tag));
            if(targetItems.length>0) {
                item.applyChargeTo(item.pickRandom(targetItems));
            }
        };
    }
});
TextMatcher.matchers.push({
    // your items with Shield gain (+10/+20/+30) Shield for the fight. from 28 Hour Fitness
    regex: /^your items with Shield gain (\([^)]+\)|\d+) Shield for the fight\.$/i,
    func: (item, match)=>{
        const amount = getRarityValue(match[1], item.rarity);
        return ()=>{
            item.board.activeItems.filter(i=>i.tags.includes("Shield")).forEach(i=>{
                i.gain(amount,'shield',item);
            });
        };
    }
});

//your weapons gain + damage for the fight equal to (1/2) times the amount Poisoned. from Infused Bracers
TextMatcher.matchers.push({
    regex: /^your weapons gain \+ damage for the fight equal to (\([^)]+\)|\d+) times the amount (?:Poisoned|Burned)\.$/i,
    func: (item, match)=>{
        const multiplier = getRarityValue(match[1], item.rarity);
        return (source,{amount})=>{
            item.board.activeItems.filter(i=>i.tags.includes("Weapon")).forEach(i=>{
                i.gain(amount*multiplier,'damage',item);
            });
        };
    }
});
//The Weapon to the left has Lifesteal. from Infused Bracers
TextMatcher.matchers.push({
    regex: /^The Weapon to the (right|left) has Lifesteal\.$/i,
    func: (item, match)=>{
        const left = match[1]=='left';
        const weapon = left?item.getItemToTheLeft():item.getItemToTheRight();
        if(weapon) {
            weapon.lifesteal = true;
        }
        return ()=>{};
    }
});
//This has +1 Multicast for each player with Poison. from Barbed Claws
TextMatcher.matchers.push({
    regex: /^This has \+1 Multicast for each player with (Poison|Burn)\.$/i,
    func: (item, match)=>{
        const f = (newAmount,oldAmount)=>{
                if(newAmount>0 && oldAmount<=0) {
                    item.gain(1,'multicast',item);
                } else if(newAmount<=0 && oldAmount>0) {
                    item.gain(-1,'multicast',item);
                }
        };
        if(match[1].toLowerCase()=="poison") {
            item.board.player.poisonChanged(f);
            item.board.player.hostileTarget.poisonChanged(f);
        } else {
            item.board.player.burnChanged(f);
            item.board.player.hostileTarget.burnChanged(f);
        }
        return ()=>{};
    }
});
TextMatcher.matchers.push({
    //If you have 3 or more Shield items they gain (+20/+30/+40/+50) Shield for the fight. from Showcase
    regex: /^If you have 3 or more (\w+)(?: items)?, they gain (\([^)]+\)|\d+) (\w+) for the fight\.$/i,
    func: (item, match)=>{
        const tag = Item.getTagFromText(match[1]);
        const amount = getRarityValue(match[2], item.rarity);
        const whatToGain = match[3].toLowerCase();
        return ()=>{
            const items = item.board.activeItems.filter(i=>i.tags.includes(tag));
            if(items.length>=3) {
                items.forEach(i=>{
                    i.gain(amount,whatToGain,item);
                });
            }
        };
    }
});
//The item to the left of this has + Crit Chance equal to your Poison. from Optical Augment
TextMatcher.matchers.push({
    regex: /^The item to the (right|left) of this has \+ Crit Chance equal to your (Poison|Burn)\.$/i,
    func: (item, match)=>{
        const target = match[1]=='left'?item.getItemToTheLeft():item.getItemToTheRight();
        if(target) {
            let totalGained = 0;
            item.board.player.poisonChanged((newAmount)=>{
                target.gain(newAmount-totalGained,'crit',item);
                totalGained = newAmount;
            });
        }
        return ()=>{};
    }
});
//Heal equal to the value of adjacent items. from Hypergreens
TextMatcher.matchers.push({
    regex: /^Heal equal to the value of adjacent items\.$/i,
    func: (item, match)=>{
        item.gain(item.adjacentItems.reduce((sum,i)=>sum+i.value,0),'heal');
        item.adjacentItems.forEach(i=>{
           i.valueChanged((newAmount, oldAmount)=>{
            item.gain(newAmount-oldAmount,'heal');
           });
        });
        return ()=>{
            item.applyHeal(item.heal);
        };
    }
});
//Gain Regen for the fight equal to (1/2/3) times this item's value.
TextMatcher.matchers.push({
    regex: /^Gain Regen for the fight equal to (\([^)]+\)|\d+) times this item's value\.$/i,
    func: (item, match)=>{
        const multiplier = getRarityValue(match[1], item.rarity);
        item.gain(item.value*multiplier,'regen');
        item.valueChanged((newAmount, oldAmount)=>{
            item.gain(newAmount-oldAmount,'regen');
        });
        return ()=>{
            item.applyRegen();
        };
    }
});
//Gain Regen equal to 10% of this item's Heal for the fight. from Bushel
TextMatcher.matchers.push({
    regex: /^Gain Regen equal to (\d+)% of this item's Heal for the fight\.$/i,
    func: (item, match)=>{
        const multiplier = getRarityValue(match[1], item.rarity);
        item.gain(item.heal*multiplier/100,'regen');
        item.healChanged((newAmount, oldAmount)=>{
            item.gain(newAmount-oldAmount,'regen');
        });
        return ()=>{
            item.applyRegen();
        };
    }
});

window.TextMatcher = TextMatcher;