#https://www.howbazaar.gg/api/items

import requests
import json
import re
import os

def download_image_if_missing(name, type_folder):
    """
    Downloads the image from howbazaar.gg if it doesn't exist locally
    Args:
        name: Name of the item/monster
        type_folder: 'items' or 'monsters'
    """
    # Clean filename
    clean_name = re.sub(r'[ \'\"\(\)\-_\.]', '', name)
    local_path = f"./public/images/{type_folder}/{clean_name}.avif"
    
    # Check if file exists
    if not os.path.exists(local_path):
        # Create directory if it doesn't exist
        os.makedirs(f"./public/images/{type_folder}", exist_ok=True)
        
        # Construct URL
        url = f"https://www.howbazaar.gg/images/{type_folder}/{clean_name}.avif"
        
        try:
            response = requests.get(url)
            response.raise_for_status()
            
            # Save the image
            with open(local_path, 'wb') as f:
                f.write(response.content)
            print(f"Downloaded {local_path}")
        except Exception as e:
            print(f"Failed to download {url}: {e}")

def fetch_items():
    url = "https://www.howbazaar.gg/api/items"
    response = requests.get(url)
    return response.json()['data']

def process_item(item):
    # Initialize the processed item structure
    processed = {
        "name": item["name"],
        "icon": f"images/items/{re.sub(r'[ \'\"\(\)\-_\.]', '', item['name'])}.avif",
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
    
    # Download image if needed
    download_image_if_missing(item["name"], "items")
    
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
