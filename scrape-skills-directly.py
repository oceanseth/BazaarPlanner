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
    icon_name = re.sub(r'[ \'\"\(\)\-_]', '', skill_data['name'])
    icon_path = f"images/skills/{icon_name}.avif"
    if(len(skill_data['unifiedTooltips']) <= 0):
        print(f"No unified tooltips for {skill_data['name']}")
        return None
    return {
        'text': skill_data['unifiedTooltips'],
        'tier': skill_data['startingTier'],
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