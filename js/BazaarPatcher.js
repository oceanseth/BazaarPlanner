import { items } from '../items.js';
import { ItemFunction } from './ItemFunction.js';
export class BazaarPatcher {
    static apply() {
        if(items["Pistol Sword"].text[1].match(/^When you use an Ammo item, deal .* damage\.$/i)) {
            items["Pistol Sword"].text[1] = "When you use an Ammo item, deal damage.";
        }
        if(!items["Sleeping Potion"].tags.includes("Ammo")) {
            items["Sleeping Potion"].tags.push("Ammo");
        }
        if(items["Rapid Injection System"].text[0]=="When you poison yourself, Poison (4/8/12).") {
            items["Rapid Injection System"].text[0] = "When you poison yourself, Poison.";
        }

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
    }
}