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
import os

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
        
        # Wait for Cloudflare and initial page load
        time.sleep(5)  # Increased initial wait time
        
        # Check if we're still on the Cloudflare page
        if "Just a moment..." in driver.title or "Verify you are human" in driver.page_source:
            print("Detected Cloudflare challenge page, waiting longer...")
            time.sleep(20)
        
        print(f"Current URL: {driver.current_url}")
        
        # Wait for and click the item image with better error handling
        wait = WebDriverWait(driver, 30)
        try:
            # First wait for the page to be in a stable state
            wait.until(lambda d: d.execute_script("return document.readyState") == "complete")
            
            # Then wait for the specific image
            item_image = wait.until(
                EC.presence_of_element_located((By.CSS_SELECTOR, f"img[alt='{item_name}']"))
            )
            try:
                driver.execute_script("arguments[0].scrollIntoView(true);", item_image)
                time.sleep(1)  # Brief pause after scroll
                item_image.click()
            except Exception as click_error:
                print(f"Standard click failed, trying JavaScript click: {click_error}")
                driver.execute_script("arguments[0].click();", item_image)
            
            # Verify we've navigated to a new URL
            time.sleep(2)
            if "search" in driver.current_url:
                print("Warning: Still on search page after click attempt")
                return None
            
        except Exception as e:
            print(f"Error during image click attempt: {str(e)}")
            if "search" in driver.current_url:
                print("Failed to navigate to item page")
                return None

        print(f"Current URL after clicking: {driver.current_url}")

        print("Waiting for page to load...")
        wait = WebDriverWait(driver, 30)
        
        print("\nWaiting for main content...")
        basic_container = wait.until(
            EC.presence_of_element_located((By.ID, "engine-basic"))
        )
        html = basic_container.get_attribute("innerHTML")
        
        #<div style="color: var(--secondary); font-size: 14px; text-align: center; text-decoration: underline dotted;">Medium</div>
        #<div style="color: var(--secondary); font-size: 14px; text-align: center; text-decoration: underline dotted;">Medium</div>
        # Modified regex to find all priority matches with escaped special characters
        regex = r'<div style="color: var\(--secondary\); font-size: 14px; text-align: center; text-decoration: underline dotted;">(Medium|Low|High|Immediate)</div>'
        matches = re.finditer(regex, html)
        priorities = []
        for match in matches:
            priority_text = match.group(1)
            priorities.append(PRIORITY_MAP[priority_text])
            print(f"Found priority: {priority_text}")
        
        if priorities:
            return priorities
        else:
            print("No priority matches found in HTML:", html)
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
    try:
        # Get the current directory where the script is running
        current_dir = os.path.dirname(os.path.abspath(__file__))
        items_js_path = os.path.join(current_dir, 'items.js')
        
        # Store the updated items in memory
        updated_items = None
        items_json = None
        
        # Read items.js first and store in memory
        print(f"Reading items.js from {items_js_path}...")
        with open(items_js_path, 'r', encoding='utf-8') as read_file:
            content = read_file.read()
            items_json = json.loads(content.replace('export const items = ', '').rstrip(';'))
        
        # Initialize Chrome after file read is complete
        options = uc.ChromeOptions()
        options.add_argument('--disable-blink-features=AutomationControlled')
        options.add_argument('--no-sandbox')
        options.add_argument('--disable-dev-shm-usage')
        options.add_argument('--headless')  
        driver = uc.Chrome(options=options, version_main=134)
        
        try:
            # Process first 5 items
            for i, (item_name, item_data) in enumerate(items_json.items()):               
                    
                print(f"\nProcessing item {i+1}/5: {item_name}...")
                
                num_text_lines = len(item_data['text'])
                priorities = get_priority(driver, item_name)
                
                if priorities is None:
                    print(f"Warning: Using default priorities [0] * {num_text_lines} for {item_name}")
                    priorities = [0] * num_text_lines
                elif len(priorities) != num_text_lines:
                    print(f"Warning: Number of priorities ({len(priorities)}) doesn't match number of text lines ({num_text_lines})")
                    priorities.extend([0] * (num_text_lines - len(priorities)))
                
                # Update the priorities list
                item_data['priorities'] = priorities[:num_text_lines]
                print(f"Saved priorities for {item_name}: {priorities[:num_text_lines]}")
                
                # Add delay to avoid overwhelming the server
                time.sleep(1)
            
            # Store the updated items
            updated_items = items_json
            
        finally:
            driver.quit()
        
        # Save file after all processing is complete
        if updated_items is not None:
            print(f"\nSaving to items.js...")
            
            # Prepare the content as a string
            output_content = 'export const items = ' + json.dumps(updated_items, indent=2) + ';'
            
            # Write to items-test.js
            with open(os.path.join(current_dir, 'items.js'), 'w', encoding='utf-8') as write_file:
                write_file.write(output_content)
            print("Save completed!")
            
    except Exception as e:
        print(f"Error in main: {str(e)}")
        raise

if __name__ == "__main__":
    main()
