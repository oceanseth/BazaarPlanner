import json
import requests
import os
from pathlib import Path
from urllib.parse import urljoin

# Base URL for the website
BASE_URL = "https://howbazaar.gg"

# Create directories if they don't exist
Path("./images/skills").mkdir(parents=True, exist_ok=True)

# Read the skills.js file
with open('skills.js', 'r', encoding='utf-8') as f:
    # Remove 'const skills = ' from start and ';' from end
    content = f.read().strip()
    content = content.replace('const skills = ', '').rstrip(';')
    skills = json.loads(content)

# Download all icons
for skill_name, skill_data in skills.items():
    icon_path = skill_data.get('icon')
    if icon_path:
        # Create full URL and local path
        icon_url = urljoin(BASE_URL, icon_path)
        local_path = f".{icon_path}"  # Prepend . to make it relative to current directory
        
        try:
            print(f"Downloading {skill_name} icon...")
            response = requests.get(icon_url)
            response.raise_for_status()  # Raise an error for bad status codes
            
            # Save the file
            with open(local_path, 'wb') as f:
                f.write(response.content)
            print(f"Successfully saved {local_path}")
            
        except Exception as e:
            print(f"Error downloading {skill_name} icon: {e}")

print("Download complete!")