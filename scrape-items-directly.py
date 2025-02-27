#https://www.howbazaar.gg/api/items

import requests
import json
import re


def fetch_items():
    url = "https://www.howbazaar.gg/api/items"
    response = requests.get(url)
    return response.json()['data']

def process_item(item):
    # Initialize the processed item structure
    processed = {
        "name": item["name"],
        "icon": f"images/items/{re.sub(r'[ \'\"\(\)\-_]', '', item['name'])}.avif",
        "tier": item["startingTier"],
        "tags": [],
        "cooldown": None,
        "ammo": None,
        "text": [],
        "enchants": {}
    }
    
    # Combine all tags
    processed["tags"].extend(item.get("heroes", []))
    processed["tags"].append(item["size"])
    processed["tags"].extend(item.get("tags", []))
    processed["tags"].extend(item.get("hiddenTags", []))
    
    # Process unified tooltips
    tooltips = item["unifiedTooltips"]
    for tooltip in tooltips:
        # Extract cooldown if present
        if "Cooldown" in tooltip:
            cd = tooltip.split("Cooldown")[1].split("seconds")[0].strip()
            processed["cooldown"] = cd if "(" in cd else int(cd)
            continue
            
        # Extract ammo if present
        if "Ammo" in tooltip:
            ammo = tooltip.split("Ammo")[1].split(".")[0].strip()
            processed["ammo"] = int(ammo) if ammo.isdigit() else ammo
            continue
            
        processed["text"].append(tooltip)
    
    # Process enchantments
    for enchant in item.get("enchantments", []):
        processed["enchants"][enchant["type"]] = enchant["tooltips"][0]
    
    return processed

def main():
    items = fetch_items()
    processed_items = {}
    
    for item in items:
        processed_items[item["name"]] = process_item(item)
    
    # Write to file
    with open("items.js", "w", encoding="utf-8") as f:
        f.write("export const items = ")
        json.dump(processed_items, f, indent=2)
        f.write(";")

if __name__ == "__main__":
    main()
