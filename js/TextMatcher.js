import { getRarityValue } from "./utils.js";
import { Item } from "./Item.js";

export class TextMatcher {
    static comparitors = [];
    static regexps = [
        //Your weapons have + damage equal to your Regeneration. from Essence Overflow
        /^your weapons have \+ damage equal to your Regeneration\.$/i,

    ];
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
window.TextMatcher = TextMatcher;