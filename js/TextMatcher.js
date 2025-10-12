import { getRarityValue } from "./utils.js";
import { Item } from "./Item.js";
import { Board } from "./Board.js";

export class TextMatcher {
    static comparitors = {
        "if you have exactly one weapon, ":{
            test: (item) => {
                return item.board.activeItems.filter(i=>i.tags.includes("Weapon")).length==1;
            },
            setup: (item,f) => {
                item.target = item.board.items.filter(i=>i.tags.includes("Weapon"))[0];
                item.board.itemDestroyedTriggers.set(item.id,()=> {f(item.target);});
            }
        },
        "if you have exactly 1 tech item, ":{
            test: (item) => {
                return item.board.activeItems.filter(i=>i.tags.includes("Tech")).length==1;
            },
            setup: (item,f) => {
                item.target = item.board.items.filter(i=>i.tags.includes("Tech"))[0];
                item.board.itemDestroyedTriggers.set(item.id,()=> {f(item.target);});
            }
        },
        "if you have no other weapons, ":{
            test: (item) => {
                return item.board.activeItems.filter(i=>i!=item &&i.tags.includes("Weapon")).length==0;
            },
            setup: (item,f) => {
                item.target = item.board.items.filter(i=>i.tags.includes("Weapon"))[0];
                item.board.itemDestroyedTriggers.set(item.id,()=> {f(item.target);});
            }
        }
    };
    static getTriggerFunctionFromText(text, item) {
        for(let matcher of TextMatcher.matchers) {
            if(matcher.regex.test(text)) {                
                item.textMatches.push(matcher);
                return matcher.func(item,text.match(matcher.regex));
            }
        }
        return null;
    }
    /*
    static getFunctionFromUndoableFunctions(text, item) {
        for(let matcher of TextMatcher.undoableFunctions) {
            let match = text.match(matcher.regex);
            if(match) {
                const undoableFunction = matcher.func(item,match);              
                return undoableFunction.doIt;
            }
        }
        return null;
    }
    */
    static matchers = [];
    static undoableFunctions = [
    {
        regex: /^This has double (damage|poison|burn|shield|heal|ammo|charge|regen)\.?$/i,
        func: (item, match)=>{
            let whatToGain = match[1].toLowerCase();
            if(whatToGain=="ammo") {
                whatToGain = "maxAmmo";
            }
          
            const doIt = () => {
                item[whatToGain+"pauseChanged"] = true;
                const oldMultiplier = item[whatToGain+"_multiplier"];
                item[whatToGain+"_multiplier"] =1;
                item.gain(item[whatToGain],whatToGain);
                item[whatToGain+"pauseChanged"] = false;
                item[whatToGain+"_multiplier"] = oldMultiplier*2;
            }
            const undoIt = () => {
                item[whatToGain+"pauseChanged"] = true;
                const oldMultiplier = item[whatToGain+"_multiplier"];
                item[whatToGain+"_multiplier"] = 1;
                item.gain(-item[whatToGain],whatToGain);
                item[whatToGain+"pauseChanged"] = false;
                item[whatToGain+"_multiplier"] = oldMultiplier/2;
            };
            return {doIt, undoIt};
        },
    },
    {
        regex: /^(this item's|its) cooldown is (?:(halved)|reduced by (\([^)]+\)|[\d\.]+)%?( seconds?)?)\.?$/i,
        func: (item, match)=>{
            const cooldownReduction = match[2] ? 50 : getRarityValue(match[3], item.rarity);
            const isSeconds = match[4] ? true : false;
            let cooldownReducedBy = 0;
            const itemToReduce = match[1]!='its' ? item : null;
            const doIt = (item) => {
                if(itemToReduce) {
                    item = itemToReduce;
                }
                const oldCooldown = item.cooldown;
                cooldownReducedBy = isSeconds ? cooldownReduction*1000 : cooldownReduction*oldCooldown/100;
                if(isSeconds) {
                    item.gain(-cooldownReducedBy,'cooldown');
                } else {
                    item.gain(-cooldownReducedBy,'cooldown');
                }
                cooldownReducedBy = oldCooldown - item.cooldown;
            };
            const undoIt = (item) => {
                item.gain(cooldownReducedBy,'cooldown');
                cooldownReducedBy = 0;
            };
            return {doIt, undoIt};
        }
    },     
    {
        regex: /^reduce this item's cooldown by (\d+)%.*/i,
        func: (item, match)=>{
            const cooldownReduction = parseInt(match[1]);
            const doIt = () => {
                item.cooldown *= (1-cooldownReduction/100);
            };
            const undoIt = () => {
                item.cooldown /= (1-cooldownReduction/100);
            };
            return {doIt, undoIt};
        },
    },
    {
        //this is a Vehicle. from Dino Saddle
        regex: /^This is a (\w+)\.?$/i,
        func: (item, match)=>{
            const tag = Item.getTagFromText(match[1]);
            const doIt = (item) => {
                if(!item.tags.includes(tag)) {
                    item.tags.push(tag);
                }
            }
            const undoIt = (item) => {
                if(item.tags.includes(tag)) {
                    item.tags.splice(item.tags.indexOf(tag),1);
                }
            }
            return {doIt, undoIt};
        },
    },
    {
        //this has (+50%/+100%) Crit Chance. from Basilisk Fang
        regex: /^this has (\([^)]+\)|\d+)%? Crit Chance\.?$/i,
        func: (item, match)=>{
            const critChance = getRarityValue(match[1], item.rarity);
            const doIt = () => {
                item.gain(critChance,'crit');
            }
            const undoIt = () => {
                item.gain(-critChance,'crit');
            }
            return {doIt, undoIt};
        },
    },
    {
        regex: /^\s*when you Crit with it charge a non-weapon item (\([^)]+\)|\d+) second\(s\)\.?$/i,
        func: (item, match)=>{
            item.charge = getRarityValue(match[1], item.rarity);
            const doIt = (it) => {
                item.board.critTriggers.set(item.id+"undoablefunction",(i)=>{
                    if(i.id==it.target.id) {
                        item.applyChargeTo(item.pickRandom(item.board.items.filter(item => !item.tags.includes("Weapon") && item.cooldown>0)));
                    }
                });
            }
            const undoIt = (it) => {
                item.board.critTriggers.delete(item.id+"undoablefunction");
            }
            return {doIt, undoIt};
        },
    },
    {
        //your weapons have (  +5  » +10  » +20   ) damage.
        //your items have (  +5%  » +10%  » +20%   ) Crit Chance.
        regex: /^your ([^s]+)s?(?: items)?\s?(?:and ([^s]+)s?(?: items)?)? have (?:\(([^)]+)\)|\+?(\d+)%?) ([^\s^\.]+)\s*(?:Chance)?\.?$/i,
        func: (item, match)=>{
            const gainAmount = parseInt(match[3] ? getRarityValue(match[3], this.rarity) : match[4]);
            const whatToGain = match[5].toLowerCase();
            const whichItems = (match[1]&&match[1]!='item') ? item.board.items.filter(item => item.tags.includes(Item.getTagFromText(match[1]))) : item.board.items;
            const whichItems2 = (match[2]&&match[2]!='item') ? item.board.items.filter(item => item.tags.includes(Item.getTagFromText(match[2]))) : item.board.items;
            const doIt = () => {
                whichItems.forEach(item => {
                    item.gain(gainAmount, whatToGain);
                });
            };
            const undoIt = () => {
                whichItems.forEach(item => {
                    item.gain(-gainAmount, whatToGain);
                });
            }
            return {doIt, undoIt};
        },
    },
    {
        //this has +1 Multicast.
        regex: /^this has \+1 Multicast\.?$/i,
        func: (item, match)=>{
            const doIt = () => {
                this.multicast += 1;
            };
            const undoIt = () => {
                this.multicast -= 1;
            };
            return {doIt, undoIt};
        },
    },
    {

        //your Heal and Regeneration items have their cooldowns reduced by (5%/10%/15%). from Rapid Relief
        //Your Weapons' cooldowns are reduced by (5%/10%/15%) from Frozen Shot
        //your Weapons have their cooldowns reduced by (  5%  » 10%  » 20%   ).
        regex: /^your ([^\s]+?)s?'?(?: and ([^\s]+)s?)?(?: items)? (?:have their cooldowns|cooldowns are) (increased|reduced) by (\([^)]+\)|\d+%?)( second\(?s?\)?)?\.?$/i,
        func: (item, match)=>{
            const cooldownReduction = getRarityValue(match[4], this.rarity);
            const tagToMatch = Item.getTagFromText(match[1]);
            const tagToMatch2 = Item.getTagFromText(match[2]);
            const isSeconds = match[5] ? true : false;
            const isReduced = match[3] == "reduced" ? true : false;
            let cooldownReducedBy = 0;
            const doIt = () => {
                item.board.items.forEach(item => {
                    if(item.tags.includes(tagToMatch) || (tagToMatch2 && item.tags.includes(tagToMatch2))) {
                        if(isSeconds) {
                            item.gain((isReduced?-1:1)*cooldownReduction*1000,'cooldown');
                        } else {
                            cooldownReducedBy = item.cooldown * cooldownReduction/100;
                            item.gain((isReduced?-1:1)*cooldownReducedBy, "cooldown");
                        }
                    }
                });
            };

            const undoIt = () => {
                item.board.items.forEach(item => {
                    if(item.tags.includes(tagToMatch) || (tagToMatch2 && item.tags.includes(tagToMatch2))) {
                        if(isSeconds) {
                            item.gain((isReduced?1:-1)*cooldownReduction*1000,'cooldown');
                        } else {
                            item.gain((isReduced?1:-1)*cooldownReducedBy, "cooldown");
                        }
                    }
                });
            };
            return {doIt, undoIt};
        },
    },
    ]
}

TextMatcher.matchers.push({
    id: "Essence Overflow Matcher",
            regex: /^your weapons have \+\s?damage equal to your Regen(?:eration)?\.?$/i,
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
    regex: new RegExp(`^(${Object.keys(TextMatcher.comparitors).join('|')})?(.*) while you(r enemy)? (?:has|have) a (Slowed|Hasted|Frozen) item\.?$`, 'i'),
    func: (item, match)=>{        
        const targetBoard = match[3] ? item.board.player.hostileTarget.board : item.board;
        const typeOfItem = Item.getTagFromText(match[4]);
        const f = item.getUndoableFunctionFromText(match[2], ()=>{
            return (match[1]?TextMatcher.comparitors[match[1].toLowerCase()].test(item):1) && targetBoard["has"+typeOfItem+"Item"];
        });
        targetBoard["has"+typeOfItem+"ItemChanged"](() => {
            f(item.target);
        });   
        if(match[1]) {
            TextMatcher.comparitors[match[1].toLowerCase()].setup(item,f);
        }
        return ()=>{};
    },
});
TextMatcher.matchers.push({
    //If you have no other weapons, this has +1 multicast. from quill and ink
    regex: new RegExp(`^(${Object.keys(TextMatcher.comparitors).join('|')})(.*)$`, 'i'),
    func: (item, match)=>{
        const f = item.getUndoableFunctionFromText(match[2], ()=>(TextMatcher.comparitors[match[1].toLowerCase()].test(item)), true, item.target);
        TextMatcher.comparitors[match[1].toLowerCase()].setup(item,f);
        return ()=>{};
    },
});
TextMatcher.matchers.push({
    //gain (1/2) time(s) your Regeneration for the fight. from Emergency Draught
            regex: /^\s*gain (\([^)]+\)|\d+) time\(?s\)? your Regen(?:eration)? for the fight\.?$/i,
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
    //This has +1 Multicast for each Weapon or friend an enemy has. from Thrown Net
            regex: /^this has \+1 Multicast for each Weapon or friend an enemy has\.?$/i,
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
            regex: /^deal damage equal to the Regen(?:eration)? plus the Burn on both players\.?$/i,
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
            item.applyDamage();
        };
    },
});
TextMatcher.matchers.push({
    //Your Burn items gain Burn equal to 15% of this item's value for the fight. from Fiery Pyg's Gym
            regex: /^Your (\w+) items gain (\w+) equal to (\([^)]+\)|\d+)%? of this item's (\w+) for the fight\.?$/i,
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
            regex: /^give your items (\([^)]+\)|\d+) ([^\s]+) for the fight\.?$/i,
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
            regex: /^this item's cooldown is reduced by 1% for every value it has\.?$/i,
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
            regex: /^gain Regen(?:eration)? for the fight equal to half your current Poison\.?$/i,
    func: (item, match)=>{        
        return ()=>{
            item.board.player.regen += item.board.player.poison/2;
        };
    },
});
TextMatcher.matchers.push({
    //This item's cooldown is reduced by 1 second for each adjacent Friend. from Nanobot
            regex: /^(?:this item's cooldown is reduced by 1 second for each adjacent (\w+)(?: item)?|for each adjacent (\w+)(?: or (\w+))?(?: item)?, this item's cooldown is reduced by 1 second)\.?$/i,
    func: (item, match)=>{
        const tags = [Item.getTagFromText(match[1]),Item.getTagFromText(match[2]),Item.getTagFromText(match[3])].filter(Boolean);
        let cooldownReducedBy = item.adjacentItems.filter(i=>tags.some(tag=>i.tags.includes(tag))).length;
        item.gain(-cooldownReducedBy*1000,'cooldown');
        item.board.itemDestroyedTriggers.set(item.id,(i,source)=>{            
            if(tags.some(tag=>i.tags.includes(tag)) && i.adjacentItems.includes(item)) {
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
            regex: /^deal (\([^)]+\)|\d+) damage to the player with less health\.?$/i,
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
            regex: /^deal (\([^)]+\)|\d+) damage for each ([^\s]+)(?: item)? you have( \(including Stash\))?\.?$/i,
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
            item.applyDamage();
        };
    },
});
TextMatcher.matchers.push({
    //Double the damage of your Large weapons. from Big Guns
            regex: /^double the damage of your ([^\s]+) weapons\.?$/i,
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
            regex: /^Haste your (leftmost|rightmost) item (\d+) second\(?s?\)?\.?$/i,
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
            regex: /^this has double charge amount\.?$/i,
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
            regex: /^(?:you )?take no damage for (\([^)]+\)|\d+) second\(?s?\)?\.?$/i,
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
            regex: /^Enchant a(?:nother)? non-enchanted item(?: with (.*))? for the fight\.?$/i,
    func: (item, match)=>{
        return ()=>{
            const specificEnchant = match[1];
            const nonEnchantedItems = item.board.items.filter(i=>i.id!=item.id && !i.tags.includes("Enchanted") && (!specificEnchant || Object.keys(i.enchants).includes(specificEnchant)));
            if(nonEnchantedItems.length>0) {
                const target = item.pickRandom(nonEnchantedItems);
                target.addTemporaryEnchant(specificEnchant);
            }
        };
    },
});
TextMatcher.matchers.push({
    //Increase an enemy item's cooldown by ( 1 » 2 » 3 ) seconds for the fight.
            regex: /^Increase (an enemy|this) item's cooldown by (\([^)]+\)|\d+) second\(?s?\)? for the fight\.?$/i,
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
            regex: /^(.*) if you have a ([^\s]+) item\.?$/i,
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
    regex: /^While your enemy (?:has|is) Poison(?:ed)?, (.*)$/i,
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
            regex: /^Your Weapons have \+\s?Damage equal to (\([^)]+\)|\d+) times your (Regen|Income)(?:eration)?\.?$/i,
    func: (item, match)=>{
        const damageMultiplier = getRarityValue(match[1], item.rarity);
        const sourceAmount = match[2]=='Regen(?:eration)'?item.board.player.regen:item.board.player.income;
        item.board.items.forEach(i=>{
            if(i.tags.includes("Weapon")) {
                i.gain(sourceAmount*damageMultiplier,'damage');  
            }
        });
        if(match[2]=='Regen') {
        item.board.player.regenChanged((newRegen,oldRegen)=>{
            item.board.items.forEach(i=>{
                if(i.tags.includes("Weapon")) {
                    i.gain((newRegen-oldRegen)*damageMultiplier,'damage');
                }
            });
        });
    } else if(match[2]=='Income') {
        item.board.player.incomeChanged((newIncome,oldIncome)=>{
            item.board.items.forEach(i=>{
                if(i.tags.includes("Weapon")) {
                    i.gain((newIncome-oldIncome)*damageMultiplier,'damage');
                }
            });
        });
    }
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

            regex: /^A ([^\s]+) item gains \+\s?([^\s]+) equal to (\([^)]+\)|\d+)%? of this item's ([^\s]+) for the fight\.?$/i,
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
    regex: /^Your (Regen|Poison|Heal)(?:eration)? items have \+\s?(Regen|Poison|Heal)(?:eration)? equal to (?:(\([^)]+\)|\d+%?) of )?this item's (\w+)\.?$/i,
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
            regex: /^You have \+Regen(?:eration)? equal to this item's (\w+)\.?$/i,
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
        item.typesChanged(()=> {
            const newTypeCount = item.tags.filter(tag => Board.uniqueTypeTags.includes(tag)).length;
            item.gain(amount * (newTypeCount - typeCount), whatToDo);
        }, item.id+"_typesChanged_"+whatToDo);
        return ()=>{
            item["apply"+whatToDo]();
        };
    },
});
TextMatcher.matchers.push({
    //Reduce an enemy's Max Health by (10%/15%/20%) for the fight. from Shrinking Potion
            regex: /^Reduce an enemy's Max Health by (\([^)]+\)|\d+)%? for the fight\.?$/i,
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
    regex: /^The ([^\s]+) item to the (left|right) of this gains \+\s?([^\s]+) equal to your (Burn|Poison|Regen)(?:eration)? for the fight\.?$/i,
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
            regex: /^Your items gain \+100% Crit Chance for (\([^)]+\)|\d+) second\(?s?\)?\.?$/i,
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
            regex: /^enchant it with (.*) if able\.?$/i,
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
            regex: /^For every (\([^)]+\)|\d+) (burn|poison|regen)(?:eration)? on the enemy, this has \+1 multicast\.?$/i,
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
    regex: /^When one of your ([^\s]+)s?(?: items)? gains Haste, if it already has Haste, it gains (\([^)]+\)|\d+) (\w+)(?: for the fight)?\.?$/i,
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
            regex: /^A Friend gains \+1 Multicast for the fight\.?$/i,
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
            regex: /^Your Dooltron has the Core type\.?$/i,
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
    regex: /^This has double damage (and shield )?bonus\.?$/i,
    func: (item, match)=>{
        const [strippedName] = Item.stripEnchantFromName(item.name);
        //remove the weapon tag given by obsidian assuming this text came from that enchant
        if(!items[strippedName].tags.includes("Weapon") && item.tags.includes("Weapon")) {
            item.tags = item.tags.filter(tag => tag !== "Weapon");
        }
        item.hasDoubleDamageBonus = true;
        item.hasDoubleShieldBonus = match[1]!=null;
        return ()=>{};
    },
});
TextMatcher.matchers.push({
            regex: /^(Your \w+(?: items)? have )((?:(?! and ).)*) and (.*)\.?$/i,
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
            regex: /^Your (\w+)s?(?: items?) gain (\([^)]+\)|\+?\d+)%? Crit Chance for the fight\.?$/i,
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
            regex: /^If this is adjacent to a (\w+) item, (.*)\.?$/i,
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
            regex: /^\s*gain (\([^)]+\)|\d+) Regen(?:eration)? for the fight\.?$/i,
    func: (item, match)=>{
        item.gain(getRarityValue(match[1], item.rarity),'regen');
        return ()=>{
            item.applyRegen();
        };
    }
});
TextMatcher.matchers.push({
    //this gains +Damage for the fight equal to the amount Poisoned. from Test Subject Alpha
            regex: /^this gains \+Damage for the fight equal to the amount (?:Poisoned|Burned)\.?$/i,
    func: (theItem, match)=>{
        return ({source,amount})=>{
                theItem.gain(amount,'damage',source);
        };
    }
});
/*
TextMatcher.matchers.push({
    //When a player uses a Weapon, Poison that player (3/4/5). from Wild Quillback
            regex: /^When a player uses a Weapon, Poison that player (\([^)]+\)|\d+)\.?$/i,
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
*/
//Poison that player (3/4/5)
TextMatcher.matchers.push({
            regex: /^Poison that player (\([^)]+\)|\d+)\.?$/i,
    func: (item, match)=>{
        item.gain(getRarityValue(match[1], item.rarity),'poison');
        return (i,{source}={})=>{
            const itemUsed = i||source;
            item.applyPoison({selfTarget: item.board.player==itemUsed.board.player});
        };
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
            regex: /^Charge (?:1|a) (non-)?([\w]+) item\(?s?\)? (\([^)]+\)|\d+) second\(?s\)?\.?$/i,
    func: (item, match)=>{
        const non = match[1]!=null;
        const tag = Item.getTagFromText(match[2]);
        item.gain(getRarityValue(match[3], item.rarity),'charge');        
        return ()=>{
            const targetItems = item.board.items.filter(i=>i.cooldown>0 && (non?!i.tags.includes(tag):i.tags.includes(tag)));
            if(targetItems.length>0) {
                item.applyChargeTo(item.pickRandom(targetItems));
            }
        };
    }
});
TextMatcher.matchers.push({
    // your items with Shield gain (+10/+20/+30) Shield for the fight. from 28 Hour Fitness
            regex: /^your items with Shield gain (\([^)]+\)|\d+) Shield for the fight\.?$/i,
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
            regex: /^your weapons gain \+\s?damage for the fight equal to (\([^)]+\)|\d+) times the amount (?:Poisoned|Burned)\.?$/i,
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
            regex: /^The Weapon to the (right|left) has Lifesteal\.?$/i,
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
            regex: /^This has \+1 Multicast for each player with (Poison|Burn)\.?$/i,
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
            regex: /^If you have 3 or more (\w+)(?: items)?, they gain (\([^)]+\)|\d+) (\w+) for the fight\.?$/i,
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
            regex: /^The item to the (right|left) of this has \+\s?Crit Chance equal to your (Poison|Burn)\.?$/i,
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
            regex: /^Heal equal to the value of adjacent items\.?$/i,
    func: (item, match)=>{
        item.gain(item.adjacentItems.reduce((sum,i)=>sum+i.value,0),'heal');
        item.adjacentItems.forEach(i=>{
           i.valueChanged((newAmount, oldAmount)=>{
            item.gain(newAmount-oldAmount,'heal');
           });
        });
        return ()=>{
            item.applyHeal();
        };
    }
});
//Gain Regen for the fight equal to (1/2/3) times this item's value.
TextMatcher.matchers.push({
            regex: /^Gain Regen for the fight equal to (\([^)]+\)|\d+) times this item's value\.?$/i,
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
            regex: /^Gain Regen equal to (\d+)% of this item's Heal for the fight\.?$/i,
    func: (item, match)=>{
        const multiplier = getRarityValue(match[1], item.rarity);
        item.gain(item.heal*multiplier/100,'regen');
        item.healChanged((newAmount, oldAmount)=>{
            item.gain((newAmount-oldAmount)*multiplier/100,'regen');
        });
        return ()=>{
            item.applyRegen();
        };
    }
});
//Haste adjacent Property items for (1/2/3) second(s). from vip pass
TextMatcher.matchers.push({
            regex: /^Haste adjacent (\w+) items for (\([^)]+\)|\d+) second\(?s\)?\.?$/i,
    func: (item, match)=>{
        const tag = Item.getTagFromText(match[1]);
        const amount = getRarityValue(match[2], item.rarity);
        item.gain(amount,'haste');
        return ()=>{
            item.board.activeItems.filter(i=>i.tags.includes(tag)).forEach(i=>{
                item.applyHasteTo(i);
            });
        };
    }
});
TextMatcher.matchers.push({
    //Increase it's value and this item's value by 1 from vip pass
            regex: /^(?:permanently )?Increase it'?s value and this item's value by (\([^)]+\)|\d+) for the fight\.?$/i,            
    func: (item, match)=>{
        const amount = getRarityValue(match[1], item.rarity);
        return (it,options)=>{
                options.target.gain(amount,'value');
                item.gain(amount,'value');
        }
    }
});
// This has half Slow duration. from Heavy Shot Glasses
TextMatcher.matchers.push({
            regex: /^This has half (Slow|Haste|Freeze) duration\.?$/i,
    func: (item, match)=>{
        const tag = Item.getTagFromText(match[1]);
        item[tag.toLowerCase()+"Duration_multiplier"] *= 0.5;
        return ()=>{};
    }
});
//destroy this from powder 
TextMatcher.matchers.push({
            regex: /^destroy this\.?$/i,
    func: (item, match)=>{
        return ()=>{
            item.destroy();
        };
    }
});
//While in play, you have (+1/+2/+3/+4) Income. from Ring King Gauntlets
TextMatcher.matchers.push({
            regex: /^While in play, you have (\([^)]+\)|\d+) Income\.?$/i,
    func: (item, match)=>{
        const amount = getRarityValue(match[1], item.rarity);
        item.board.player.income += amount;
        item.board.updateIncomeElement();
        return ()=>{};
    }
});
//transform into a (Gold/Diamond) copy of another small, non-legendary item you have for the fight. from Hologram Projector
TextMatcher.matchers.push({
            regex: /^\s*transform into a (\([^)]+\)|\w+) copy of another small, non-legendary item you have for the fight\.?$/i,
    func: (item, match)=>{
        const tier = Item.rarityLevels.indexOf(getRarityValue(match[1], item.rarity));
        return ()=>{
            const targetItem = item.pickRandom(item.board.items.filter(i=>i!=item && i.tags.includes("Small") && i.tier!=4));
            if(targetItem) {
                const newItemData = structuredClone(items[targetItem.nameWithoutEnchant]);
                newItemData.tier = tier;
                newItemData.enchant = item.enchant;
                item.transformInto(newItemData);
            }
        };
    }
});
//When this is Destroyed ...
TextMatcher.matchers.push({
    regex: /^When this is Destroyed, (.*)$/i,
    func: (item, match)=>{
        const f = item.getTriggerFunctionFromText(match[1]);
        item.board.itemDestroyedTriggers.set(item.id, (i)=>{
            if(i==item) {
                f(item);
            }
        });
        return ()=>{};
    }
});

TextMatcher.matchers.push({
    //Charge the core 1 second. from Kinetic Cannon 
            regex: /^Charge the core (\([^)]+\)|\d+) second\(?s?\)?\.?$/i,
    func: (item, match)=>{
        const amount = getRarityValue(match[1], item.rarity);
        item.gain(amount,'charge');
        return ()=>{
            const targetItems = item.board.items.filter(i=>i.tags.includes("Core"));
            targetItems.forEach(i=>{
                item.applyChargeTo(i);
            });
        };
    }
});
TextMatcher.matchers.push({
    //This gains +1 Multicast. from Pesky Pete
            regex: /^This gains \+1 Multicast\.?$/i,
    func: (item, match)=>{        
        return ()=>{
            item.gain(1,'multicast',item);
        };
    }
});
//If you have another Tool, Apparel, Tech, Weapon, or Friend, this has (+50/+100/+150) Damage for each. from Forklift
TextMatcher.matchers.push({
            regex: /^If you have another (\w+(?:, (?:or )?\w+)*)(?: item)?,? this has (\([^)]+\)|\+?\d+) (\w+)(?: for each)?\.?$/i,
    func: (item, match)=>{
        const tags = match[1].split(", ");
        const amount = getRarityValue(match[2], item.rarity);
        const whatToGain = match[3].toLowerCase();
        item.board.activeItems.filter(i=>i!=item && tags.some(tag=>i.tags.includes(tag))).forEach(i=>{
            item.gain(amount,whatToGain,i);
        });
        return ()=>{};
    }
});
//"Your items with no Cooldown have (+25%/+50%) Damage, Burn, Poison, Shield, Heal, and Regen." from Passive Power
TextMatcher.matchers.push({
            regex: /^Your items with no Cooldown have (\([^)]+\)|\d+%?) Damage, Burn, Poison, Shield, Heal, and Regen\.?$/i,
    func: (item, match)=>{
        const amount = getRarityValue(match[1], item.rarity);
        const multiplier = 1+amount/100;
        item.board.activeItems.filter(i=>!i.cooldown).forEach(i=>{
            ["damage","burn","poison","shield","heal","regen"].forEach(stat=>{
                let oldAmount = i[stat];
                let oldMultiplier = i[stat+"_multiplier"];
                i[stat+"_multiplier"] = 1;
                i[stat] *= multiplier;
                i[stat+"_multiplier"] = oldMultiplier;
                i[stat+"_multiplier"] *= multiplier;
            });
        });
        return ()=>{};
    }
});

//If this is your only Tech item its cooldown is reduced by 50%. from Temporal Navigator
TextMatcher.matchers.push({
    regex: /^If this is your only (\w+)(?: item)?,? (.*)$/i,
    func: (item, match)=>{
        const tag = Item.getTagFromText(match[1]);
        const comparisonFunction = ()=>(item.board.items.filter(i=>i.tags.includes(tag)).length==1);
        const f = item.getUndoableFunctionFromText(match[2].replace(/^it has/i,"this has"),comparisonFunction);
        item.board.itemDestroyedTriggers.set(item.id, f);
        return ()=>{          
        };
    }
});
//If you have a Quest item ... from Excavaction Tools
TextMatcher.matchers.push({
    regex: /^If you have a (\w+) item, (.*)$/i,
    func: (item, match)=>{
        const tag = Item.getTagFromText(match[1]);
        const comparisonFunction = ()=>(item.board.items.filter(i=>i.tags.includes(tag)).length>0);
        const f = item.getUndoableFunctionFromText(match[2],comparisonFunction);
        item.board.itemDestroyedTriggers.set(item.id, f);
        return ()=>{};
    }
});
//If you have no weapons, ... from Pacifist
TextMatcher.matchers.push({
    regex: /^If you have no (\w+)(?: item)?s?, (.*)$/i,
    func: (item, match)=>{
        const tag = Item.getTagFromText(match[1]);
        if(item.board.items.filter(i=>i.tags.includes(tag)).length==0) {
            item.getTriggerFunctionFromText(match[2])();
        }
        return ()=>{};
    }
});
//Your items Slow for 1 more second from Amber (text change from 'slow bonus')
TextMatcher.matchers.push({
            regex: /^Your items Slow for (\([^)]+\)|\d+) more second\(?s?\)?\.?$/i,
    func: (item, match)=>{
        const amount = getRarityValue(match[1], item.rarity);
        item.board.activeItems.forEach(i=>{
            i.gain(amount,'slow');
        });
        return ()=>{};
    }
});

//Charge 1 item from another hero 1 second(s). from Jack of All Trades
TextMatcher.matchers.push({
            regex: /^Charge (\(\d+\)|\d+) item\(?s?\)? from another hero (\([^)]+\)|\d+) second\(?s?\)?\.?$/i,
    func: (item, match)=>{
        const numItemsToCharge = getRarityValue(match[1], item.rarity);
        const amount = getRarityValue(match[2], item.rarity);
        item.gain(amount,'charge');
        return ()=>{
            const targetItems = item.pickRandom(
                item.board.items.filter(i=>i.cooldown>0 && !i.tags.includes(item.board.player.hero)),
                numItemsToCharge
            );
            targetItems.forEach(i=>{
                item.applyChargeTo(i);
            });
        };
    }
});
//When the Sandstorm starts you take (25%/50%/75%) less damage for the rest of the fight. from Hunker Down
TextMatcher.matchers.push({
    regex: /^When the Sandstorm starts,? (.*)$/i,
    func: (item, match)=>{
        const f = item.getTriggerFunctionFromText(match[1]);
        item.board.player.battle.sandstormTriggers.set(item.id, f);
        return ()=>{};
    }
});
//Your Rightmost Item is a Vehicle. from Free Ride
TextMatcher.matchers.push({
            regex: /^Your (Rightmost|Leftmost) Item is a (\w+)\.?$/i,
    func: (item, match)=>{
        const tag = Item.getTagFromText(match[2]);
        const target = match[1]=='Rightmost'?item.board.items[item.board.items.length-1]:item.board.items[0];
        if(target) {
            if(!target.tags.includes(tag)) {
                target.tags.push(tag);
            }
        }
        return ()=>{};
    }
});
//Your Property items and Toys have (+10%/+15%/+20%) Crit chance. from Critical Investments
TextMatcher.matchers.push({
            regex: /^Your (\w+)(?: items)? and Toys have (\([^)]+\)|\d+%?) Crit chance\.?$/i,
    func: (item, match)=>{
        const tag = Item.getTagFromText(match[1]);
        const amount = getRarityValue(match[2], item.rarity);
        item.board.activeItems.filter(i=>i.tags.includes(tag)).forEach(i=>{
            i.gain(amount,'crit');
        });
    }
});


//The first time you fall below half health each fight, Freeze 1 item(s) for 99 second(s). 
TextMatcher.matchers.push({
    regex: /^The first time (you|a player) falls? below half health(?: each fight)?, (.*)\.?/i,
    func: (item, match)=>{
            const f = item.getTriggerFunctionFromText(match[2]);
            let targets = match[1]=='you'?[item.board.player]:[item.board.player,item.board.player.hostileTarget];
            targets.forEach(t=>{
                t.healthBelowHalfTriggers.set(item.id,()=>{
                    f();
                    t.healthBelowHalfTriggers.delete(item.id);
                });
            });            
        return ()=>{};
    }
});
//When one of your items runs out of ammo ... from Adaptive Ordinance
TextMatcher.matchers.push({
    regex: /^When one of your items runs out of ammo, (.*)\.?/i,
    func: (item, match)=>{
        const f = item.getTriggerFunctionFromText(match[1]);
        item.board.items.filter(i=>i.tags.includes("Ammo")).forEach(i=>{
            i.ammoChanged((newAmount, oldAmount)=>{
                if(newAmount==0) {
                    f();
                }
            });
        });
        return ()=>{};
    }
});
//When one of your Dinosaurs deals damage, gain that much shield. from Tanky Anky
TextMatcher.matchers.push({
            regex: /^When one of your (\w+)s? deals damage, gain that much shield\.?$/i,
    func: (item, match)=>{
        const tag = Item.getTagFromText(match[1]);
        item.board.items.filter(i=>i.tags.includes(tag)).forEach(i=>{
            i.board.damageTriggers.set(item.id, ({source,target,amount}={})=>{
                if(source.tags.includes(tag)) {
                    item.applyShield({amount});
                }
            });
        });
        return ()=>{};
    }
});
//Enemy Weapons have (-10/-25/-50/-75) Damage. from Tanky Anky
TextMatcher.matchers.push({
            regex: /^Enemy (\w+)s? have (\([^)]+\)|\d+) (\w+)\.?$/i,
    func: (item, match)=>{
        const tag = Item.getTagFromText(match[1]);        
        const amount = getRarityValue(match[2], item.rarity);
        const whatToLose = Item.getTagFromText(match[3]);
        item.board.player.hostileTarget.board.items.filter(i=>i.tags.includes(tag)).forEach(i=>{
            i.gain(amount,whatToLose);
            i.updateTriggerValuesElement();
        });
        return ()=>{};
    }
});
//Enchant 1 non-enchanted item on each player's board for the fight. from Spirit Diffuser
TextMatcher.matchers.push({
            regex: /^Enchant (\d+) non-enchanted item\(?s?\)? on each player's board for the fight\.?$/i,
    func: (item, match)=>{
        const amount = getRarityValue(match[1], item.rarity);
        return ()=> {
            item.pickRandom(item.board.items.filter(i=>!i.enchant),amount).forEach(i=>{
                i.addTemporaryEnchant();
            });
            item.pickRandom(item.board.player.hostileTarget.board.items.filter(i=>!i.enchant),amount).forEach(i=>{
                i.addTemporaryEnchant();
            });
        }
    }
});
//The item to the left is an Ammo item. from Biomerge Arm
TextMatcher.matchers.push({
            regex: /^The item to the (right|left)(?: of this)? is an? (\w+)(?: item)?\.?$/i,
    func: (item, match)=>{
        const target = match[1]=='left'?item.leftItem:item.rightItem;
        if(target) {
            target.tags.push(Item.getTagFromText(match[2]));
        }
        return ()=>{};
    }
});
//When an item runs out of Ammo ... from Biomerge Arm
TextMatcher.matchers.push({
    regex: /^When an item runs out of Ammo, (.*)\.?/i,
    func: (item, match)=>{
        const f = item.getTriggerFunctionFromText(match[1]);
        item.board.items.forEach(i=>{
            i.ammoChanged((newAmount, oldAmount)=>{
                if(newAmount==0 && oldAmount>0) {
                    f(i);
                }
            });
        });
        return ()=>{};
    }
});
//The item to the left of this has +100% Crit Chance and +1 max ammo. from Biomerge Arm
TextMatcher.matchers.push({
            regex: /^The item to the (right|left)(?: of this)? has (.*) and (.*)\.?$/i,
    func: (item, match)=>{
        const target = match[1]=='left'?item.leftItem:item.rightItem;
        if(target) {
            target.setupTextFunctions(match[2]);
            target.setupTextFunctions(match[3]);
            return ()=>{};
        }
    }
});
// +100% Crit Chance 
TextMatcher.matchers.push({
    regex: /^\+\s?(\d+)%? Crit Chance\.?$/i,
    func: (item, match)=>{
        const amount = getRarityValue(match[1], item.rarity);
        item.gain(amount,'crit');
        return ()=>{};
    }
});
//+1 max ammo.
TextMatcher.matchers.push({
    regex: /^\+\s?(\d+) max ammo\.?$/i,
    func: (item, match)=>{
        const amount = getRarityValue(match[1], item.rarity);
        item.gain(amount,'maxAmmo');
        return ()=>{};
    }
});
//This has +1 Multicast for each other item you have from a different Hero. from Sword of Swords
TextMatcher.matchers.push({
            regex: /^This has \+1 Multicast for each other item you have from a different Hero\.?$/i,
    func: (item, match)=>{
        item.board.items.filter(
            i=>i!=item && 
            !i.tags.includes(item.board.player.hero) && 
            i.tags.some(t=>Item.characterTags.includes(t))
        ).forEach(i=>{
            item.gain(1,'multicast',i);
        });
        return ()=>{};
    }
});
//Charge adjacent Large items for half their cooldown." from Red Button
TextMatcher.matchers.push({
            regex: /^Charge adjacent Large items for half their cooldown\.?$/i,
    func: (item, match)=>{
        return ()=>{
         let targets = [item.leftItem,item.rightItem].filter(i=>i && i.tags.includes("Large"));
         targets.forEach(i=>{
            const oldCharge = item.charge;
            item.charge = i.cooldown/2000;
            item.applyChargeTo(i);
            item.charge = oldCharge;
         });
        }
    }
});
//"If your enemy has more items than you, destroy one of their items." from Rex Spex
TextMatcher.matchers.push({
            regex: /^If your opponent has more items than you, destroy an item\.?$/i,
    func: (item, match)=>{
        return ()=>{
            if(item.board.player.hostileTarget.board.activeItems.length>item.board.activeItems.length) {
               item.pickRandom(item.board.player.hostileTarget.board.activeItems).destroy();
            }
        }   
    }
});
//This has +damage equal to (100/200/300) times the number of Types it has. from hydraulic press
TextMatcher.matchers.push({
            regex: /^This has \+\s?(\w+) equal to (\([^)]+\)|\d+) times the number of Types it has\.?$/i,
    func: (item, match)=>{
        const whatToGain = Item.getTagFromText(match[1]);
        const amount = getRarityValue(match[2], item.rarity);
        let types = [];
        item.tags.forEach(tag => {
            if(Board.uniqueTypeTags.includes(tag)) {
                types.push(tag);
            }
        });
        item.gain(amount*types.length,whatToGain);
        return ()=>{};
    }
});
//"Poison 5 for each Poison item you have." from Maitoan Altar
TextMatcher.matchers.push({
            regex: /^(Poison|Burn|Heal|Regen) (\d+) for each (\w+) item you have\.?$/i,
    func: (item, match)=>{
        const whatToDo = match[1];
        const amount = getRarityValue(match[2], item.rarity);
        const tag = Item.getTagFromText(match[3]);
        
        item.board.items.filter(i=>i.tags.includes(tag)).forEach(i=>{
            item.gain(amount,whatToDo);
        });
        item.board.itemDestroyedTriggers.set(item.id, (i)=>{
            if(i.tags.includes(tag)) {
                item.gain(-amount,whatToDo);
            }
        });
        return ()=>{
            item["apply"+whatToDo]();
        };
    }
});
//"This item's cooldown is reduced by 1 second for each other Relic you have." from Maitoan Altar
TextMatcher.matchers.push({
            regex: /^This item's cooldown is reduced by (\d+) second\(?s?\)? for each other (\w+) you have\.?$/i,
    func: (item, match)=>{
        const amount = 1000*getRarityValue(match[1], item.rarity);
        const tag = Item.getTagFromText(match[2]);        
        const numRelics = item.board.items.filter(i=>i.tags.includes(tag) && i!=item).length;
        item.gain(-amount*numRelics,'cooldown');
        item.board.itemDestroyedTriggers.set(item.id, (i)=>{
            if(i.tags.includes(tag) && i!=item) {
                i.gain(amount,'cooldown');
            }
        });
        return ()=>{};
    }
});
//"Freeze it 1 second(s)." from Nullfrost Altar
TextMatcher.matchers.push({
            regex: /^Freeze it (\([^)]+\)|\d+) second\(?s?\)?\.?$/i,
    func: (item, match)=>{
        const amount = getRarityValue(match[1], item.rarity);
        item.gain(amount,'freeze');
        return (it)=>{
            item.applyFreezeTo(it);
        };
    }
});
//Remote all freeze from it. from Nullfrost Altar
TextMatcher.matchers.push({
            regex: /^Remove all freeze from it\.?$/i,
    func: (item, match)=>{
        return (it)=>{
            it.removeFreeze(item);
        };
    }
});
//"Relic Weapons gain (+10/+20/+30) Damage for the fight." from Primal Core
TextMatcher.matchers.push({
            regex: /^Your ((?:\w+)( and (?:\w+))*) (\w+)s? gain (\([^)]+\)|\d+) (\w+) for the fight\.?$/i,
    func: (item, match)=>{
        const tags = match[1].split(" and ");
        const tag2 = match[3] ? Item.getTagFromText(match[3]) : null;
        const amount = getRarityValue(match[4], item.rarity);
        const whatToGain = match[5].toLowerCase();
        return ()=>{
            item.board.activeItems.filter(i=>(tag2=='Item'||i.tags.includes(tag2)) && (tags[0]=='other'?i!=item:tags.some(tag=>i.tags.includes(tag)))).forEach(i=>{
                i.gain(amount,whatToGain);
            });
        };
    }
});
TextMatcher.matchers.push({
            regex: /^At the end of each fight, (.*)\.?$/i,
    func: ()=>{
        return ()=>{};
    }
});
//"This item's cooldown is increased by 1 second for each Tech item you have." from Flint Stones
TextMatcher.matchers.push({
            regex: /^This item's cooldown is increased by (\d+) second\(?s?\)? for each (\w+)(?: item)? you have\.?$/i,
    func: (item, match)=>{
        const amount = 1000*getRarityValue(match[1], item.rarity);
        const tag = Item.getTagFromText(match[2]);
        const numTechs = item.board.items.filter(i=>i.tags.includes(tag) && i!=item).length;
        item.gain(amount*numTechs,'cooldown');
        item.board.itemDestroyedTriggers.set(item.id, (i)=>{
            if(i.tags.includes(tag) && i!=item) {
                i.gain(-amount,'cooldown');
            }
        });
        return ()=>{};
    }
});
//"Burn (2/4/6/8) for each Relic or Tool you have." from Flint Stones
TextMatcher.matchers.push({
            regex: /^Burn (\([^)]+\)|\d+) for each (\w+) or (\w+) you have\.?$/i,
    func: (item, match)=>{
        const amount = getRarityValue(match[1], item.rarity);
        const tag = Item.getTagFromText(match[2]);
        const tag2 = Item.getTagFromText(match[3]);
        const numThings = item.board.items.filter(i=>i.tags.includes(tag) || i.tags.includes(tag2)).length;
        item.gain(amount*numThings,'burn');
        item.board.itemDestroyedTriggers.set(item.id, (i)=>{
            if(i.tags.includes(tag) || i.tags.includes(tag2)) {
                i.gain(-amount,'burn');
            }
        });
        return ()=>{};
    }
});
//"This item's cooldown is reduced by 50% if you have at least 4 other Dinosaurs." from Dinosawer
TextMatcher.matchers.push({
            regex: /^This item's cooldown is reduced by (\([^)]+\)|\d+)% if you have at least (\d+) other (\w+(?:,? (?:or )?(\w+))*)s?\.?$/i,
    func: (item, match)=>{
        const amount = getRarityValue(match[1], item.rarity);
        const numThingsRequired = getRarityValue(match[2], item.rarity);
        const tags = match[3].split(",").map(t=>Item.getTagFromText(t.replace("or","").trim()));
        const numThings = item.board.items.filter(i=>i!=item && tags.some(t=>i.tags.includes(t))).length;
        if(numThings>=numThingsRequired) {
            item.gain(item.cooldown*-amount/100,'cooldown');
        }
        item.board.itemDestroyedTriggers.set(item.id+"_"+tags.join(","), (i)=>{
            const numThings = item.board.items.filter(i=>i!=item && tags.some(t=>i.tags.includes(t))).length;
            if(numThings<numThingsRequired) {
                i.gain(item.cooldown*amount/100,'cooldown');
            }
            item.board.itemDestroyedTriggers.delete(item.id+"_"+tags.join(","));
        });
        return ()=>{};
    }
});
//"This has +1 Multicast for each other Relic or Dinosaur you have." from Dino Disguise
TextMatcher.matchers.push({
            regex: /^This has \+1 Multicast for each other (\w+) or (\w+) you have\.?$/i,
    func: (item, match)=>{
        const tag = Item.getTagFromText(match[1]);
        const tag2 = Item.getTagFromText(match[2]);
        const numThings = item.board.items.filter(i=>i!=item && (i.tags.includes(tag) || i.tags.includes(tag2))).length;
        item.gain(numThings,'multicast');
        item.board.itemDestroyedTriggers.set(item.id+"_"+tag+","+tag2, (i)=>{            
            if(i!=item && (i.tags.includes(tag) || i.tags.includes(tag2))) {
                i.gain(-1,'multicast');
            }
        });
        return ()=>{};
    }
});
//If you have a ... item ... from Dino Saddle
TextMatcher.matchers.push({
    regex: /^If you have a (\w+)(?: item)?, (.*)$/i,
    func: (item, match)=>{
        const tag = Item.getTagFromText(match[1]);
        const f = item.getUndoableFunctionFromText(match[2],()=>item.board.activeItems.filter(i=>i.tags.includes(tag)).length>0, true, item);
        item.board.itemDestroyedTriggers.set(item.id, ()=>f(item));
        return ()=>{};
    }
});
//"Deal damage equal to (1/2/3/4) times your Income." from Ring King Gauntlets
TextMatcher.matchers.push({
            regex: /^Deal damage equal to (\([^)]+\)|\d+) times your Income\.?$/i,
    func: (item, match)=>{
        const amount = getRarityValue(match[1], item.rarity);
        item.gain(amount*item.board.player.income,'damage');
        item.board.player.incomeChanged((newIncome,oldIncome)=>{
            item.gain(amount*(newIncome-oldIncome),'damage');
        });
        return ()=>{
            item.applyDamage();
        };
    }
});
//while you have shield, ...
TextMatcher.matchers.push({
    regex: /^while you have shield, (.*)$/i,
    func: (item, match)=>{
        const comparisonFunction = ()=>{
            return item.board.player.shield>0;
        }
        const f = item.getUndoableFunctionFromText(match[1],comparisonFunction,true,item);
        item.board.player.shieldChanged(f);
        return ()=>{};
    }
});

// "This has Multicast equal to its current ammo." from Shuriken
TextMatcher.matchers.push({
            regex: /^This has \+?\s?Multicast equal to its (?:current )?ammo\.?$/i,
    func: (item, match)=>{
        item.gain(item.ammo-1,'multicast');
        item.ammoChanged((newAmmo,oldAmmo)=>{
            item.gain(newAmmo-oldAmmo,'multicast');
        });
        return ()=>{};
    }
});

//"spend all its Ammo." from Shuriken
TextMatcher.matchers.push({
            regex: /^spend all its Ammo\.?$/i,
    func: (item, match)=>{
        return ()=>{
            item.ammo = 0;
        };
    }
});

//"This has the Types of items you have in your Stash." from Cargo Shorts
TextMatcher.matchers.push({
            regex: /^This has the Types of items you have in your Stash\.?$/i,
    func: (item, match)=>{
        item.board.backpack?.items.forEach(i=>{
            i.tags.forEach(t=>{
                if(Board.uniqueTypeTags.includes(t) && !item.tags.includes(t)) {
                    item.tags.push(t);
                }
            });
        });
        item.typesChangedFunctions.forEach(f=>f(item));
        return ()=>{};
    }
});

//While this is flying, ...
TextMatcher.matchers.push({
    regex: /^While this is flying, (.*)$/i,
    func: (item, match)=>{
        const f = item.getUndoableFunctionFromText(match[1],()=>item.flying,true,item);
        item.flyingChanged(f);
        return ()=>{};
    }
});

//When one of your items starts or stops flying, ...
TextMatcher.matchers.push({
    regex: /^When (?:one of )?your items (starts?)?(?: or )?(stops?)? flying, (.*)$/i,
    func: (item, match)=>{
        const f = item.getTriggerFunctionFromText(match[3], item);
        item.board.activeItems.forEach(i=>{
            i.flyingChanged((newFlying,oldFlying)=>{
                if(newFlying!=oldFlying) {
                    if(match[1] && !newFlying) {
                        return;
                    }
                    if(match[2] && newFlying) {
                        return;
                    }
                    f(i);
                }
            });
        });
        return ()=>{};
    }
});

//Adjacent items start/stop flying.
TextMatcher.matchers.push({
    regex: /^Adjacent items (start|stop) flying\.?$/i,
    func: (item, match)=>{
        const adjacentItems = item.adjacentItems;        
        return ()=>{
            adjacentItems.forEach(i=>{
                i.flying = match[1]=='start';
                item.log("Because of "+item.name+", "+i.name+" "+match[1]+" flying.");
            });
        };
    }
});

//An adjacent item starts Flying.
TextMatcher.matchers.push({
    regex: /^An (adjacent )?item (starts|stops) Flying\.?$/i,
    func: (item, match)=>{
        const itemTargets = match[1] ? item.adjacentItems : item.board.items;
        return ()=>{
            const selectedItem = item.pickRandom(itemTargets.filter(i=>!i.isDestroyed && i.flying!=(match[2]=='starts')));
            if (selectedItem) {
                selectedItem.flying = match[2]=='starts';
                item.log("Because of "+item.name+", "+selectedItem.name+" "+match[2]+" flying.");
            }
        };
    }
});
TextMatcher.matchers.push({
    regex: /^this (starts|stops) Flying\.?$/i,
    func: (item, match)=>{
        const isStart = match[1]=='starts';
        return ()=>{
            item.flying = isStart;
            item.log(item.name+" "+match[1]+" flying.");
        };
    }
});

// it gains () damage and () shield for the fight.
TextMatcher.matchers.push({
            regex: /^it gains (\([^)]+\)|\d+) damage and (\([^)]+\)|\d+) shield for the fight\.?$/i,
    func: (item, match)=>{
        const damage = getRarityValue(match[1], item.rarity);
        const shield = getRarityValue(match[2], item.rarity);
        return (i)=>{
            if(i.tags.includes('Weapon')) {
                i.gain(damage,'damage');
            }
            if(i.tags.includes('Shield')) {
                i.gain(shield,'shield');
            }
        };
    }
});

//"This starts or stops Flying" from Clockwork Disc
TextMatcher.matchers.push({
    regex: /^This starts or stops Flying\.?$/i,
    func: (item, match)=>{
        return ()=>{
            item.flying = !item.flying;
            item.log(item.name+" "+item.flying?"starts":"stops"+" flying.");
        };
    }
});

//"If this is Flying, ..." from Jetpack
TextMatcher.matchers.push({
    regex: /^If this is Flying, (.*)$/i,
    func: (item, match)=>{
        const f = item.getTriggerFunctionFromText(match[1], item);
        return ()=>{
            if(item.flying) {
                f(item);
            }
        };
    }
});

//"Your () items' Cooldowns are reduced by (2%/3%) for each () item you have." from Nanobot Construction
TextMatcher.matchers.push({
            regex: /^Your (\w+) items' Cooldowns are reduced by (\([^)]+\)|\d+)% for each (\w+) item you have\.?$/i,
    func: (item, match)=>{
        const itemsToReduce = item.board.items.filter(i=>i.tags.includes(Item.getTagFromText(match[1])));
        const amount = getRarityValue(match[2], item.rarity);
        const tag = Item.getTagFromText(match[3]);
        const numThings = item.board.items.filter(i=>i.tags.includes(tag)).length;
        itemsToReduce.forEach(i=>{
            i.gain(-(amount/100)*i.cooldown*numThings,'cooldown');
        });
        item.board.itemDestroyedTriggers.set(item.id, (i)=>{
            if(i.tags.includes(tag)) {
                itemsToReduce.forEach(ii=>{
                    ii.gain((ii.cooldown/(1-(amount/100)))*(amount/100),'cooldown');
                });
            }
        });
        return ()=>{};
    }
});

//'When your items are Frozen, Burn (8/12/16).'  from Frozen Flames
TextMatcher.matchers.push({
    regex: /^When your items are Frozen, (.*)$/i,
    func: (item, match)=>{
        const f = item.getTriggerFunctionFromText(match[1], item);
        item.board.items.forEach(i=>{
            i.isFrozenChanged((newIsFrozen,oldIsFrozen)=>{
                if(newIsFrozen&&!oldIsFrozen) {
                    f();
                }
            });
        });
        return ()=>{};
    }
});
            
//'When your items run out of ammo, gain (10/20/30) Regen for the fight.' from Adaptive Ordinance
TextMatcher.matchers.push({
    regex: /^When your items run out of ammo, (.*)$/i,
    func: (item, match)=>{
        const f = item.getTriggerFunctionFromText(match[1], item);
        item.board.items.forEach(i=>{
            i.ammoChanged((newAmmo,oldAmmo)=>{
                if(newAmmo==0&&oldAmmo>0) {
                    f();
                }
            });
        });
        return ()=>{};
    }
});

//When this starts Flying ... from Wrecking Ball
TextMatcher.matchers.push({
    regex: /^When this (starts|stops) Flying, (.*)$/i,
    func: (item, match)=>{
        const f = item.getTriggerFunctionFromText(match[2], item);
        const isStart = match[1]=='starts';
        item.flyingChanged((newFlying,oldFlying)=>{
            if(isStart&&newFlying&&!oldFlying) {
                f(item);
            }
            if(!isStart&&!newFlying&&oldFlying) {
                f(item);
            }
        });
        return ()=>{};
    }
});

//"(1/2/3) Small item(s) start Flying." from Haunting Flight
TextMatcher.matchers.push({
    regex: /^(\([^)]+\)|\d+|all)( of your)? (\w+)?\s?item\(?s?\)? (start|stop)s? Flying\.?$/i,
    func: (item, match)=>{
        const numItems = getRarityValue(match[1], item.rarity);
        const yourItems = !!match[2];
        const tag = Item.getTagFromText(match[3]);
        const isStart = match[4].startsWith('start');
        
        return ()=>{
            if(isNaN(numItems)) {
                [...item.board.items,...(yourItems?[]:item.board.player.hostileTarget.board.items)].forEach(i=>{
                    i.flying = isStart;
                });
                item.log("Because of "+item.name+", all "+(yourItems?"your":"")+" items "+(isStart?"start":"stop")+" flying.");
                return;
            }
            const items = item.board.activeItems.filter(i=>(!tag||i.tags.includes(tag)) && i.flying!=isStart);
            item.pickRandom(items,numItems).forEach(i=>{
                i.flying = isStart;
                item.log("Because of "+item.name+", "+i.name+" "+(isStart?"starts":"stops")+" flying.");
            });
        };
    }
});

//"Freeze an item on each Player's board for (1/2) second(s)" from Weather Machine
TextMatcher.matchers.push({
    regex: /^Freeze (\([^)]+\)|\d+|an) item\(?s?\)? on each Player's board for (\([^)]+\)|\d+) second\(?s?\)?\.?$/i,
    func: (item, match)=>{
        const amount = getRarityValue(match[2], item.rarity);
        const numItems = match[1]=='an' ? 1 : getRarityValue(match[1], item.rarity);
        item.freeze += amount;
        return ()=>{
           item.applyFreezes(numItems);
           item.applyFreezes(numItems,item.board.player);
        };
    }
});

//"Slow all items for (1/2) second(s)" from Weather Machine
TextMatcher.matchers.push({
    regex: /^Slow (\([^)]+\)|\d+|all) item\(?s?\)? for (\([^)]+\)|\d+) second\(?s?\)?\.?$/i,
    func: (item, match)=>{
        const amount = getRarityValue(match[2], item.rarity);
        const numItems = match[1]=='all' ? undefined : getRarityValue(match[1], item.rarity);
        item.slow += amount;
        return ()=>{
            item.applySlows(numItems);
            if(match[1]=='all') item.applySlows(undefined,item.board.player);
        };
    }
});
//"Destroy this and an enemy item with no Cooldown for the fight" from Unstable Grav Well
TextMatcher.matchers.push({
    regex: /^Destroy this and an enemy item with no Cooldown for the fight\.?$/i,
    func: (item, match)=>{
        return ()=>{
            let itemsToDestroy=[];
            item.board.player.hostileTarget.board.items.forEach(i=>{
                if(i.cooldown==0) {
                    itemsToDestroy.push(i);
                }
            });
            if(itemsToDestroy.length>0) {
                item.pickRandom(itemsToDestroy).destroy();
            }
            item.destroy();
        };
    }
});

//"When this is Hasted." from Thermal Lance
TextMatcher.matchers.push({
    regex: /^When this is Hasted, (.*)$/i,
    func: (item, match)=>{
        const f = item.getTriggerFunctionFromText(match[1], item);
        item.board.hasteTriggers.set(item.id,(hastedItem)=> {
            if(hastedItem==item) {
                f(item);
            }
        });
        return ()=>{};
    }
});

//"Haste that item for (1/2) second(s)." from Stellar Swallowtail
TextMatcher.matchers.push({
    regex: /^Haste that item for (\([^)]+\)|\d+) second\(?s?\)?\.?$/i,
    func: (item, match)=>{
        const amount = getRarityValue(match[1], item.rarity);
        item.haste += amount;
        return (i)=>{
            item.applyHasteTo(i);
        };
    }
});
//"When another item is Hasted." from Stellar Swallowtail
TextMatcher.matchers.push({
    regex: /^When another item is Hasted, (.*)$/i,
    func: (item, match)=>{
        const f = item.getTriggerFunctionFromText(match[1], item);
        item.board.hasteTriggers.set(item.id,(hastedItem)=> {
            if(hastedItem!=item) {
                f(hastedItem);
            }
        });
        return ()=>{};
    }
});
//"items adjacent to this gain (4%/8%/12%) Crit Chance for the fight." from Radar Module
TextMatcher.matchers.push({
    regex: /^items adjacent to this gain (\([^)]+\)|\d+%?) Crit Chance for the fight\.?$/i,
    func: (item, match)=>{
        const amount = getRarityValue(match[1], item.rarity);
        return ()=> {
            item.adjacentItems.forEach(i=>{
                i.gain(amount,'crit');
            });
        };
    }
});