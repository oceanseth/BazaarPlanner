import { items } from '../items.js';
import { monsters } from '../monsters.js';
import { ItemFunction } from './ItemFunction.js';
import { skills } from '../skills.js';
export class BazaarPatcher {
    static customSetupFunctions = new Map();
    static apply() {
        if(items["Pistol Sword"].text[1].match(/^When you use an Ammo item, deal .* damage\.$/i)) {
            items["Pistol Sword"].text[1] = "When you use an Ammo item, deal damage.";
        }
        if(items["Epicurean Chocolate"]) {
            items["Epicurean Chocolate"].text=[items["Epicurean Chocolate"].text[0]];
        }
        if(!items["Sleeping Potion"].tags.includes("Ammo")) {
            items["Sleeping Potion"].tags.push("Ammo");
        }
        if(items["Rapid Injection System"].text[0]=="When you poison yourself, Poison (4/8/12).") {
            items["Rapid Injection System"].text[0] = "When you poison yourself, Poison.";
            items["Rapid Injection System"].enchants["Fiery"] = "When you Poison yourself, Burn (4/8/12).";
        }
        //Poison equal to 10% 0f this item's Damage. from Toxic Concealed Dagger
        if(items["Concealed Dagger"].enchants["Toxic"].match(/^Poison equal to 10% 0f this item's Damage\.$/i)) {
            items["Concealed Dagger"].enchants["Toxic"] = "Poison equal to 10% of this item's Damage.";
        }
        items["Shadowed Cloak"].text = ["When you use the item to the right of this, haste it for (1/2/3/4) seconds and it gains (3/5/7/9) damage for the fight."]
        
        if(skills["Hardly Workin'"].text[0].match(/times times/i)) {
            skills["Hardly Workin'"].text[0] = skills["Hardly Workin'"].text[0].replace(/times times/i, "times");
        }
        if(skills["Augmented Weaponry"].text[0].match(/^Your weapons have \+1 Damage\.$/i)) {
           BazaarPatcher.customSetupFunctions.set("Augmented Weaponry",(item)=>{
            if(item.Custom_1) {
              item.text[0] = item.text[0].replace(/\+[\d]+ Damage/i, `+${item.Custom_1} Damage`);
              if(item.itemProxy) {
                item.itemProxy.text[0] = item.itemProxy.text[0].replace(/\+[\d+] Damage/i, `+${item.Custom_1} Damage`);
              }
            }
           });
        }
        if(skills["Augmented Defenses"].text[0].match(/^Your shield items have \+1 Shield\.$/i)) {
            BazaarPatcher.customSetupFunctions.set("Augmented Defenses",(item)=>{
             if(item.Custom_1) {
               item.text[0] = item.text[0].replace(/\+[\d]+ Shield/i, `+${item.Custom_1} Shield`);
               if(item.itemProxy) {
                 item.itemProxy.text[0] = item.itemProxy.text[0].replace(/\+[\d+] Shield/i, `+${item.Custom_1} Shield`);
               }
             }
            });
         }
        if(skills["Power Broker"].text[0]=="Your weapons have +Damage equal (1/2/3) times to your income.") {
            skills["Power Broker"].text[0] = "Your weapons have +Damage equal to (1/2/3) times your income.";
        }
        if(items["Subscraper"].text[1]=="Your other items have +Value equal to this item's Value during combat.") {
            items["Subscraper"].text[1] = "At the start of each fight, your other items gain Value equal to this item's Value for the fight.";
        }
        if(items["Temple Expedition Ticket"]) {
            items["[Jungle Expedition] Temple Expedition Ticket"] = items["Temple Expedition Ticket"];
            for(var m in monsters) {
                monsters[m].items.forEach(i=>{
                    if(i.name=="Temple Expedition Ticket") {
                        i.name = "[Jungle Expedition] Temple Expedition Ticket";
                    }
                });
            }
        }
        if(items["Sands of Time"]) {
            items["Sands of Time"].quests = {"Buy 6 Slow items":"This has +1 Multicast","Buy 5 Relics":"When you use another relic, charge this 1 second."};
        }
        if(items["Tomb of the Ancients"]) {
            items["Tomb of the Ancients"].quests = {
                "Complete 1 quest on another item": "Poison (5/10/15).",
                "Complete 2 quests on other items": "Freeze 1 item for 0.5 second(s)."
              };
        }
        if(items["Ethergy Conduit"]) {
            items["Ethergy Conduit"].text[0]=items["Ethergy Conduit"].text[0].replace("Poison or use","Poison, or use");
        }
        if(items["Dinosawer"]) {
            items["Dinosawer"].text[1]=items["Dinosawer"].text[1].replace("Tools or Relics","Tools, or Relics");
        }
        if(items["Darkstone Engine"]) {
            items["Darkstone Engine"].quests = {
                "A Weapon is used 50 times":"At the start of each fight, Enchant a non-enchanted item with Obsidian for the fight."
            }
        }
        if(items["Trebuchet"]) {
            items["Trebuchet"].text[2] = "When you use another Weapon, charge this 2 seconds.";
            items["Trebuchet"].text[3] = "When you Haste, charge this 2 seconds.";
        }
        BazaarPatcher.customSetupFunctions.set("Orange Julian",(item)=>{
            if(item.Custom_0) {
                item.text[0] = item.text[0].replace(/\+[\d]+ Damage/i, `+${item.Custom_0} Damage`);
            }
        });
        
        //community items

        items["DBG-BZZ3R"] = {
            name: "DBG-BZZ3R",
            text: ["Transform into a random bug."],
            tags: ["Small","Community"],
            tier: 4,
            cooldown: 1,
            "enchants": {
                "Heavy": "...and Enchant the transformation with Heavy if able.",
                "Icy": "...and Enchant the transformation with Icy if able.",
                "Turbo": "...and Enchant the transformation with Turbo if able.",
                "Shielded": "...and Enchant the transformation with Shielded if able.",
                "Restorative": "...and Enchant the transformation with Restorative if able.",
                "Toxic": "...and Enchant the transformation with Toxic if able.",
                "Fiery": "...and Enchant the transformation with Fiery if able.",
                "Shiny": "...and Enchant the transformation with Shiny if able.",
                "Deadly": "...and Enchant the transformation with Deadly if able.",
                "Radiant": "...and Enchant the transformation with Radiant if able.",
                "Obsidian": "...and Enchant the transformation with Obsidian if able."
            },
        }
        ItemFunction.items.set("DBG-BZZ3R",(item)=>{
            item.triggerFunctions.push(()=>{
                const newItemData = structuredClone(
                    items[
                        item.pickRandom(["RED-F1R3FLY","YLW-M4NT1S","GRN-W4SP","BLU-B33TL3","BLK-SP1D3R"])
                    ]);
                newItemData.enchant = item.enchant;
                newItemData.tier = item.tier;
                item.transformInto(newItemData);
            });
        });
    }
}