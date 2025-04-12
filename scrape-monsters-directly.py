import requests
import json
import os
import re

def fetch_monster_encounters():
    url = "https://www.howbazaar.gg/api/monsterEncounterDays"
    response = requests.get(url)
    return response.json()['data']

def download_image_if_missing(name, type_folder):
    """
    Downloads the image from howbazaar.gg if it doesn't exist locally
    Args:
        name: Name of the item/monster
        type_folder: 'items' or 'monsters'
    """
    # Clean filename
    clean_name = re.sub(r'[ \'\"\(\)\-_\.\&]', '', name)
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

def process_monster(monster):
    # Extract basic monster info
    processed = {
        "name": monster["cardName"],
        "icon": f"images/monsters/{re.sub(r'[ \'\"\(\)\-_\.]', '', monster['cardName'])}.avif",
        "day": monster["day"],
        "health": monster["health"],
        "level": monster["level"],
        "skills": [],
        "items": []
    }
    
    # Process skills
    for skill in monster["skills"]:
        processed["skills"].append({
            "name": skill["card"]["name"],
            "tier": get_tier_number(skill["tierType"])
        })
    
    # Process items
    for item in monster["items"]:
        item_data = {
            "name": item["card"]["name"],
            "tier": get_tier_number(item["tierType"])
        }
        if item.get("enchantmentType"):  # Only add enchant if it exists
            item_data["enchant"] = item["enchantmentType"]
        processed["items"].append(item_data)
    
    # Download image if needed
    download_image_if_missing(monster["cardName"], "monsters")
    
    return processed

def get_tier_number(tier):
    tiers = {
        "Bronze": 0,
        "Silver": 1,
        "Gold": 2,
        "Diamond": 3,
        "Legendary": 4
    }
    return tiers.get(tier, 0)

def main():
    # Fetch and process data
    encounters = fetch_monster_encounters()
    monsters = {}
    
    # Process each monster group
    for day in encounters:
        for group in day["groups"]:
            for monster in group:
                # Skip if monster is already processed (take first occurrence)
                if monster["cardName"] not in monsters:
                    monsters[monster["cardName"]] = process_monster(monster)
    
    # Write to file
    with open("monsters.js", "w", encoding="utf-8") as f:
        f.write("export const monsters = ")
        json.dump(monsters, f, indent=2)
        f.write(";")

if __name__ == "__main__":
    main()