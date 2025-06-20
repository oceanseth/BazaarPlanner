#https://www.howbazaar.gg/api/items

import requests
import json
import re
import os

def download_image_if_missing(name, type_folder, id):
    """
    Downloads the image from howbazaar.gg if it doesn't exist locally
    Args:
        name: Name of the item/monster
        type_folder: 'items' or 'monsters'
        id: Optional UUID for the card's image
    """
    # Clean filename
    clean_name = re.sub(r'[ \'\"\(\)\-_\.\&]', '', name)
    local_path = f"./public/images/{type_folder}/{clean_name}.avif"
    
    # Check if file exists
    if not os.path.exists(local_path):
        # Create directory if it doesn't exist
        os.makedirs(f"./public/images/{type_folder}", exist_ok=True)
        
        # Construct URL using cardId if available, otherwise fall back to old format
        url = f"https://howbazaar-images.b-cdn.net/images/{type_folder}/{id}.avif"

        try:
            response = requests.get(url)
            response.raise_for_status()
            
            # Save the image
            with open(local_path, 'wb') as f:
                f.write(response.content)
            print(f"Downloaded {local_path}")
        except Exception as e:
            print(f"Failed to download image for {name}: {e}")

def fetch_items():
    url = "https://www.howbazaar.gg/api/items"
    response = requests.get(url)
    return response.json()['data']

def process_item(item):
    # Initialize the processed item structure
    processed = {
        "name": item["name"],
        "tier": {"Bronze": 0, "Silver": 1, "Gold": 2, "Diamond": 3, "Legendary": 4}[item["startingTier"]],
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

    # Process quests into a flattened structure
    if item.get("quests"):
        processed["quests"] = {}
        for quest in item["quests"]:
            for entry in quest["entries"]:
                if entry["tooltips"] and entry["rewardTooltips"]:
                    processed["quests"][entry["tooltips"][0]] = entry["rewardTooltips"][0]
    
    # Process unified tooltips
    tooltips = item["unifiedTooltips"]
    for tooltip in tooltips:
        # Extract cooldown if present
        if tooltip.startswith("Cooldown"):
            cd = tooltip.split("Cooldown")[1].split("seconds")[0].strip()
            processed["cooldown"] = cd if "(" in cd else int(cd)
            continue
        if tooltip.startswith("Multicast"):
            multicast = tooltip.split("Multicast ")[1]
            processed["multicast"] = int(multicast) if multicast.isdigit() else multicast
            continue
        # Extract ammo if present
        if tooltip.startswith("Ammo"):
            ammo = tooltip.split("Ammo")[1].split(".")[0].strip()
            processed["ammo"] = int(ammo) if ammo.isdigit() else ammo
            continue
            
        processed["text"].append(tooltip)
    
    # Process enchantments
    for enchant in item.get("enchantments", []):
        processed["enchants"][enchant["type"]] = enchant["tooltips"][0]
    
    # Download image if needed, now passing the cardId
    download_image_if_missing(item["name"], "items", item.get("id"))
    
    return processed

def main():
    items = fetch_items()
    processed_items = {}
    
    # Load existing file to preserve priorities
    existing_data = {}
    try:
        with open("items.js", "r", encoding="utf-8") as f:
            content = f.read()
            if content:
                # Remove "export const items = " and ";" from the content
                json_str = content.replace("export const items = ", "").rstrip(";")
                existing_data = json.loads(json_str)
    except FileNotFoundError:
        pass

    # Process new items
    for item in items:
        processed = process_item(item)
        # Preserve priorities if they exist
        if item["name"] in existing_data and "priorities" in existing_data[item["name"]]:
            processed["priorities"] = existing_data[item["name"]]["priorities"]
        processed_items[item["name"]] = processed
    
    # Write to file
    with open("items.js", "w", encoding="utf-8") as f:
        f.write("export const items = ")
        json.dump(processed_items, f, indent=2)
        f.write(";")

if __name__ == "__main__":
    main()
