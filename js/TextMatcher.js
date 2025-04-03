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
        return item.board.items.filter(i=>i.tags.includes("Weapon")).length==1;
    },
    setup: (item,f) => {
        item.target = item.board.items.filter(i=>i.tags.includes("Weapon"))[0];
        item.board.itemDestroyedTriggers.set(item.id,()=> {f(item.target);});
    }
};
TextMatcher.matchers.push({
    id: "Essence Overflow Matcher",
    regex: /^your weapons have \+ damage equal to your Regeneration\.$/i,
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
    //gain (1/2) time(s) your Regeneration for the fight. from Emergency Draught
    regex: /^gain (\([^)]+\)|\d+) time\(?s\)? your Regeneration for the fight\.$/i,
    func: (item, match)=>{
        const regenMultiplier = 1+getRarityValue(match[1], item.rarity);
        return ()=>{
            item.board.player.regen *= regenMultiplier;
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
    regex: /^deal damage equal to the Regeneration plus the Burn on both players\.$/i,
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
    regex: /^gain Regeneration for the fight equal to half your current Poison\.$/i,
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
        let cooldownReducedBy = item.getAdjacentItems().filter(i=>i.tags.includes("Friend")).length;
        item.gain(-cooldownReducedBy*1000,'cooldown');
        item.board.itemDestroyedTriggers.set(item.id,(i,source)=>{            
            if(i.tags.includes("Friend") && i.getAdjacentItems().includes(item)) {
                item.gain(1000,'cooldown', source);
            }
        });
        return ()=>{};
    },
});
TextMatcher.matchers.push({
      // Haste (  2  » 4  » 6   ) items 2 second(s).  
      regex: /^Haste (?:\(([^)]+)\)|(\d+)) (?:(\w+) )?items?.* for (?:\(([^)]+)\)|(\d+)) second/i,
      func: (item, match)=>{            
          const [_, itemsRange, singleItemCount, requiredTag, durationRange, singleDuration] = match;
              
          const numItemsToHaste = itemsRange ? 
              getRarityValue(itemsRange, item.rarity) : 
              parseInt(singleItemCount);
          const duration = durationRange ? 
              getRarityValue(durationRange, item.rarity) : 
              parseInt(singleDuration);
          
          return () => {
              let items = Array.from(item.board.items);
              items = items.filter(i => i.isHasteTargetable());        
              if(requiredTag=='adjacent') {
                items = items.filter(i => i.getAdjacentItems().includes(item));
              } else if (requiredTag) {
                  items = items.filter(i => i.tags && i.tags.includes(requiredTag));
              }
              const selectedItems = item.pickRandom(items,numItemsToHaste);
          
              selectedItems.forEach(i => {
                  item.applyHasteTo(i,duration);
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
        const duration = getRarityValue(match[2], item.rarity);
        const whichItem = match[1]=='leftmost'?item.board.items[0]:item.board.items[item.board.items.length-1];        
        return ()=>{
            item.applyHasteTo(whichItem, duration);
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
            item.board.player.healthChanged((newHealth,oldHealth)=>{
                if(newHealth<oldHealth && diedAtTime >= item.board.player.battleTime - duration) {
                    item.board.player.damage_pauseChanged = true;
                    item.board.player.health += (oldHealth-newHealth); //undo the damage
                    item.board.player.damage_pauseChanged = false;
                } else if(diedAtTime < item.board.player.battleTime - duration) {
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
    regex: /^Enchant a non-enchanted item for the fight\.$/i,
    func: (item)=>{
        return ()=>{
            const nonEnchantedItems = item.board.items.filter(i=>!i.tags.includes("Enchanted"));
            if(nonEnchantedItems.length>0) {
                const target = item.pickRandom(nonEnchantedItems);
                target.addRandomTemporaryEnchant();
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
    regex: /^Your Weapons have \+ Damage equal to (\([^)]+\)|\d+) times your Regeneration\.$/i,
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
    //Your Regeneration items have + Regeneration equal to (10%/20%) of this item's damage. from Viper Cane
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
    //The item to the left of this has + Burn equal to your Regeneration. from Secret Formula
    //The item to the Right of this has + Poison equal to your Regeneration. from Secret Formula
    regex: /^The item to the (left|right) of this has \+\s?([^\s]+) equal to your (Burn|Poison|Regen)(?:eration)?\.$/i,
    func: (item, match)=>{
        const whatOfYours = match[3].toLowerCase();
        const amount = item.board.player[whatOfYours];
        const target = match[1]=='left'?item.getItemToTheLeft():item.getItemToTheRight();
        const whatToGain = Item.getTagFromText(match[2]);
        if(target) target.gain(amount,whatToGain);
        item.board.player[whatOfYours+"Changed"]((newVal,oldVal)=>{
            if(target) target.gain(newVal-oldVal,whatToGain);
        });
        return ()=>{};
    },
});
window.TextMatcher = TextMatcher;