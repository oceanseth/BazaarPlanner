import requests
import json
import os
import re

def fetch_skills():
    url = "https://www.howbazaar.gg/api/skills"
    response = requests.get(url)
    return response.json()['data']

def transform_skill(skill_data):
    # Combine all tags into one list
    all_tags = (
        skill_data.get('heroes', []) + 
        skill_data.get('tags', []) + 
        skill_data.get('hiddenTags', [])
    )
    # Remove empty strings and duplicates
    all_tags = list(set(tag for tag in all_tags if tag))

    # Create the icon path
    icon_name = re.sub(r'[ \'\"\(\)\-_\.\&]', '', skill_data['name'])
    icon_path = f"images/skills/{icon_name}.avif"
    if(len(skill_data['unifiedTooltips']) <= 0):
        print(f"No unified tooltips for {skill_data['name']}")
        return None

    # Convert tier names to numeric values
    tier_mapping = {
        'Bronze': 0,
        'Silver': 1,
        'Gold': 2,
        'Diamond': 3,
        'Legendary': 4
    }
    tier = tier_mapping.get(skill_data['startingTier'], 0)  # Default to 0 if tier not found

    return {
        'text': [s.strip() + '.' for s in skill_data['unifiedTooltips'][0].split('.') if s.strip()],
        'tier': tier,  # Using the numeric tier value
        'tags': all_tags,
        'icon': icon_path
    }

def main():
    # Fetch skills from API
    skills_data = fetch_skills()
    
    # Transform into our format
    transformed_skills = {}
    for skill in skills_data:
        transformed_skill = transform_skill(skill)
        if transformed_skill is not None:
            transformed_skills[skill['name']] = transformed_skill

    # Write to file
    with open('skills.js', 'w', encoding='utf-8') as f:
        f.write('export const skills = ')
        json.dump(transformed_skills, f, indent=2)
        f.write(';')

if __name__ == "__main__":
    main()