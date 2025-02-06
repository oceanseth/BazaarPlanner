from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from webdriver_manager.chrome import ChromeDriverManager
import json
import time
import os
import requests

def scroll_to_bottom(driver):
    # Get initial height
    last_height = driver.execute_script("return document.body.scrollHeight")
    
    while True:
        # Scroll down
        driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
        
        # Wait for new content to load
        time.sleep(1)
        
        # Calculate new scroll height
        new_height = driver.execute_script("return document.body.scrollHeight")
        
        # Break if no more new content (height didn't change)
        if new_height == last_height:
            break
            
        last_height = new_height

def setup_driver():
    chrome_options = Options()
    chrome_options.add_argument("--headless")  # Run in headless mode
    chrome_options.add_argument("--window-size=1920,1080")
    chrome_options.add_argument("--log-level=3")  # Suppress console messages
    chrome_options.add_experimental_option('excludeSwitches', ['enable-logging'])  # Suppress USB errors
    
    service = Service(ChromeDriverManager().install())
    driver = webdriver.Chrome(service=service, options=chrome_options)
    return driver

def fetch_skills_html():
    print("Fetching skills page...")
    driver = setup_driver()
    
    try:
        driver.get("https://www.howbazaar.gg/skills")
        
        print("Scrolling to load all skills...")
        scroll_to_bottom(driver)
        
        # Save the complete HTML
        html_content = driver.page_source
        with open('skills.html', 'w', encoding='utf-8') as f:
            f.write(html_content)
        print("Saved complete HTML to skills.html")
        
        return html_content
        
    finally:
        driver.quit()

def download_image(url, local_path):
    try:
        response = requests.get(f"https://www.howbazaar.gg/{url}")
        if response.status_code == 200:
            os.makedirs(os.path.dirname(local_path), exist_ok=True)
            with open(local_path, 'wb') as f:
                f.write(response.content)
            return True
        return False
    except Exception as e:
        print(f"Error downloading image {url}: {str(e)}")
        return False

def parse_skill_html(html_content):
    # Ensure the images directory exists
    
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
            img_container = div.find('div', class_=lambda x: x and 'relative' in x and 'overflow-hidden' in x and 'rounded-md' in x)
            if img_container:
                img = img_container.find('img')
                if img:
                    icon_path = img.get('src')
                    if icon_path:
                        icon_path = icon_path.lstrip('/')
                        skill['icon'] = icon_path
                        
                        # Check if image exists locally and download if it doesn't
                        local_path = f"./public/{icon_path}"
                        if not os.path.exists(local_path):
                            print(f"Downloading missing icon: {icon_path}")
                            if download_image(icon_path, local_path):
                                print(f"Successfully downloaded: {icon_path}")
                            else:
                                print(f"Failed to download: {icon_path}")
                        
                        print(f"Found icon: {skill['icon']}")
                else:
                    print(f"Warning: No img tag found for {name}")
            else:
                print(f"Warning: No img container found for {name}")
            
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
                        tags[tag_text.title()] = 1
                    
            skill['name'] = name
            skill['tags'] = list(tags.keys())
            print(f"  Final tags: {skill['tags']}")
            
            # Get description
            description = []
            ul = div.find('ul', class_='list-inside')
            if ul:
                for li in ul.find_all('li'):
                    description.append(li.text.strip())
            skill['text'] = ' '.join(description)
            
            skills[name] = skill
    
    return skills

# Main execution
if __name__ == "__main__":
    try:
        html_content = fetch_skills_html()
        skills = parse_skill_html(html_content)
        
        # Save as JavaScript constant
        with open('skills.js', 'w', encoding='utf-8') as f:
            f.write("export const skills = ")
            json.dump(skills, f, indent=2, ensure_ascii=False)
            f.write(";")
            
        print("Skills data saved to skills.js")
        
        # Clean up the temporary HTML file
        if os.path.exists('skills.html'):
            os.remove('skills.html')
            print("Cleaned up skills.html")
            
    except Exception as e:
        print(f"An error occurred: {str(e)}")