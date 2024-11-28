import os
import requests
import json

def ensure_dir(directory):
    if not os.path.exists(directory):
        os.makedirs(directory)

def download_image(url, path):
    # Remove any leading dots or slashes from the path
    path = path.lstrip('./\\')
    
    if os.path.exists(path):
        print(f"Skipping existing file: {path}")
        return
    
    try:
        # If the URL is already a full URL, use it directly
        if url.startswith('http'):
            full_url = url
        else:
            # Otherwise, prepend the base URL
            full_url = f"https://www.howbazaar.gg/{url.lstrip('/')}"
            
        response = requests.get(full_url)
        if response.status_code == 200:
            # Ensure the directory exists before writing the file
            os.makedirs(os.path.dirname(path), exist_ok=True)
            
            with open(path, 'wb') as f:
                f.write(response.content)
            print(f"Downloaded: {path}")
        else:
            print(f"Failed to download {url}: Status code {response.status_code}")
    except Exception as e:
        print(f"Error downloading {url}: {str(e)}")

def main():
    # Create necessary directories
    ensure_dir("images/items")
    ensure_dir("images/skills")
    ensure_dir("images/monsters")
    
    # Load monsters.js
    with open('monsters.js', 'r', encoding='utf-8') as f:
        content = f.read()
        # Remove "const monsters = " from start and ";" from end
        json_str = content.replace("const monsters = ", "").rstrip(";")
        monsters_data = json.loads(json_str)
    
    # Download monster icons
    print("\nProcessing monster icons...")
    for monster in monsters_data.values():
        if "icon" in monster and monster["icon"]:
            download_image(monster["icon"], monster["icon"])
    
    # Load items.js
    with open('items.js', 'r', encoding='utf-8') as f:
        content = f.read()
        # Remove "const items = " from start and ";" from end
        json_str = content.replace("const items = ", "").rstrip(";")
        items_data = json.loads(json_str)
    
    # Download item icons
    print("\nProcessing item icons...")
    for item in items_data.values():
        if "icon" in item and item["icon"]:
            download_image(item["icon"], item["icon"])
    
    # Load skills.js
    with open('skills.js', 'r', encoding='utf-8') as f:
        content = f.read()
        # Remove "const skills = " from start and ";" from end
        json_str = content.replace("const skills = ", "").rstrip(";")
        skills_data = json.loads(json_str)
    
    # Download skill icons
    print("\nProcessing skill icons...")
    for skill in skills_data.values():
        if "icon" in skill and skill["icon"]:
            download_image(skill["icon"], skill["icon"])

if __name__ == "__main__":
    main()
    print("\nDownload complete!")