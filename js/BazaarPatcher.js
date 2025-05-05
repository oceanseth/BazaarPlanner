import { items } from '../items.js';
export class BazaarPatcher {
    static apply() {
        if(items["Pistol Sword"].text[1].match(/^When you use an Ammo item, deal .* damage\.$/i)) {
            items["Pistol Sword"].text[1] = "When you use an Ammo item, deal damage equal to 1 times this item's damage.";
        }
    }
}