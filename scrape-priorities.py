import requests
from bs4 import BeautifulSoup
import json
import time
from urllib.parse import quote
import undetected_chromedriver as uc
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import TimeoutException, NoSuchElementException
import re

# Priority mapping
PRIORITY_MAP = {
    "Low": 0,
    "Medium": 1,
    "High": 2,
    "Immediate": 3
}
def format_item_name(name):
    """Convert item name to URL format"""
    return quote(name.replace(" ", "-"))

def get_priority(driver, item_name):
    """Fetch priority from bazaardb.gg for a given item using Selenium"""
    # First navigate to search page
    search_query = quote(item_name)
    search_url = f"https://bazaardb.gg/search?q={search_query}"
    
    try:
        print(f"\nNavigating to search page: {search_url}")
        driver.get(search_url)
        
        # Wait for Cloudflare
        time.sleep(2)
        
        # Check if we're still on the Cloudflare page
        if "Just a moment..." in driver.title or "Verify you are human" in driver.page_source:
            print("Detected Cloudflare challenge page, waiting longer...")
            time.sleep(20)
        
        print(f"Current URL: {driver.current_url}")
        
        # Look for the card link
        wait = WebDriverWait(driver, 30)
        card_container = wait.until(
            EC.presence_of_element_located((By.CLASS_NAME, "CardList_cardContainer__pES_C"))
        )
        
        # Find the first card link
        card_link = card_container.find_element(By.TAG_NAME, "a")
        item_url = card_link.get_attribute("href")
        
        print(f"Found item URL: {item_url}")
        driver.get(item_url)
        
        # Wait for page load after redirect
        time.sleep(2)
        
        print(f"Current URL after redirect: {driver.current_url}")

        print("Waiting for page to load...")
        wait = WebDriverWait(driver, 30)
        
        print("\nWaiting for main content...")
        basic_container = wait.until(
            EC.presence_of_element_located((By.ID, "engine-basic"))
        )
        html = basic_container.get_attribute("innerHTML")
        regex = r'<div style="padding:4px;color:var\(--secondary\);font-size:14px">(Medium|Low|High|Immediate)</div>'
        match = re.search(regex, html)
        if match:
            priority_text = match.group(1)
            print(f"Found priority: {priority_text}")
            return PRIORITY_MAP[priority_text]
        else:
            print("No priority match found in HTML:", html)
            return None
        
            
    except TimeoutException:
        print(f"Timeout waiting for priority element for {item_name}")
        return None
    except NoSuchElementException:
        print(f"Could not find priority element for {item_name}")
        return None
    except Exception as e:
        print(f"Error fetching priority for {item_name}: {str(e)}")
        return None

def main():
    # Initialize undetected-chromedriver with modified options
    options = uc.ChromeOptions()
    # options.add_argument('--headless')  # Remove headless mode to allow manual solving
    options.add_argument('--disable-blink-features=AutomationControlled')
    options.add_argument('--no-sandbox')
    options.add_argument('--disable-dev-shm-usage')
    driver = uc.Chrome(options=options)
    
    try:
        # Read items.js
        with open('items.js', 'r') as f:
            content = f.read()
            items_json = json.loads(content.replace('export const items = ', '').rstrip(';'))
        
        # Process each item
        for item_name, item_data in items_json.items():
            print(f"Processing {item_name}...")
            
            num_text_lines = len(item_data['text'])
            
            if 'priorities' not in item_data:
                item_data['priorities'] = []
                
            for i in range(num_text_lines):
                priority = get_priority(driver, item_name)
                if priority is None:
                    print(f"Warning: Using default priority 0 for {item_name} text line {i+1}")
                    priority = 0
                
                if i < len(item_data['priorities']):
                    item_data['priorities'][i] = priority
                else:
                    item_data['priorities'].append(priority)
                    
            if len(item_data['priorities']) > num_text_lines:
                item_data['priorities'] = item_data['priorities'][:num_text_lines]
            
            # Add delay to avoid overwhelming the server
            time.sleep(1)
        
        # Write updated items.js file
        with open('items-test.js', 'w') as f:
            f.write('export const items = ')
            json.dump(items_json, f, indent=2)
            f.write(';')
    finally:
        driver.quit()

if __name__ == "__main__":
    main()
