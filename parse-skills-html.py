from bs4 import BeautifulSoup
import json

def parse_skill_html(html_content):
    soup = BeautifulSoup(html_content, 'html.parser')
    skills = {}
    
    skill_divs = soup.find_all('div', class_=lambda x: x and 'bg-white' in x and 'rounded-lg' in x)
    print(f"Found {len(skill_divs)} skill divs")
    
    for div in skill_divs:
        skill = {}
        
        # Get skill name
        name_div = div.find('div', class_='font-bold text-2xl')
        if name_div:
            name = name_div.text.strip().replace(' 🔗', '')
            print(f"\nProcessing: {name}")
            
            # Get skill image URL
            img = div.find('img', class_='relative')
            if img:
                skill['icon'] = img.get('src')
                
            # Get tags
            tags = {}
            flex_wraps = div.find_all('div', class_=lambda x: x and 'flex flex-wrap gap-2' in x)
            for flex_wrap in flex_wraps:
                tag_divs = flex_wrap.find_all('div', class_=lambda x: x and 'inline-flex' in x)
                print(f"Found {len(tag_divs)} potential tags")
                for tag_div in tag_divs:
                    tag_text = tag_div.text.strip()
                    print(f"  Found tag: {tag_text}")
                    if (not tag_text.endswith('+') and 
                        tag_text not in ['Bronze', 'Silver', 'Gold', 'Diamond', 'Legendary'] and 
                        tag_text):
                        tags[tag_text.lower()] = 1
                    
            skill['name'] = name
            skill['tags'] = tags
            print(f"  Final tags: {tags}")
            
            # Get description
            description = []
            ul = div.find('ul', class_='list-inside')
            if ul:
                for li in ul.find_all('li'):
                    description.append(li.text.strip())
            skill['text'] = ' '.join(description)
            
            skills[name] = skill
    
    return skills

# Read the HTML file
with open('skills.html', 'r', encoding='utf-8') as file:
    html_content = file.read()

# Parse the HTML
skills = parse_skill_html(html_content)

# Write to JavaScript file
with open('skills.js', 'w', encoding='utf-8') as f:
    f.write('const skills = ')
    json.dump(skills, f, indent=2, ensure_ascii=False)
    f.write(';')

print(f"\nSuccessfully saved {len(skills)} skills to skills.js")