from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.action_chains import ActionChains
from webdriver_manager.chrome import ChromeDriverManager
import json
import time

def setup_driver():
    chrome_options = Options()
    chrome_options.add_argument("--window-size=1920,1080")
    chrome_options.add_argument("--log-level=3")
    chrome_options.add_experimental_option('excludeSwitches', ['enable-logging'])
    
    service = Service(ChromeDriverManager().install())
    driver = webdriver.Chrome(service=service, options=chrome_options)
    return driver

def scroll_to_bottom(driver):
    """Scroll to bottom of page and wait for new items to load"""
    last_height = driver.execute_script("return document.body.scrollHeight")
    while True:
        # Scroll down
        driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
        
        # Wait for new items to load
        time.sleep(2)
        
        # Calculate new scroll height and compare with last scroll height
        new_height = driver.execute_script("return document.body.scrollHeight")
        if new_height == last_height:
            # If heights are the same, we've reached the bottom
            break
        last_height = new_height

def get_enchants(driver, item_button):
    """Get enchantments for an item"""
    enchants = {}
    try:
        # Click enchants tab if it exists
        enchants_tab = driver.find_element(By.XPATH, "//button[contains(text(), 'Enchants')]")
        enchants_tab.click()
        time.sleep(1)
        
        # Get all enchant entries
        enchant_entries = driver.find_elements(By.CSS_SELECTOR, "div.bg-white.rounded-lg")
        for entry in enchant_entries:
            try:
                enchant_name = entry.find_element(By.CSS_SELECTOR, "div.font-bold").text
                enchant_text = entry.find_element(By.CSS_SELECTOR, "div.text-sm").text
                enchants[enchant_name.lower()] = enchant_text
            except:
                continue
    except:
        pass
    return enchants

def get_tags(driver):
    """Get all tags for an item"""
    tags = {}
    try:
        tag_elements = driver.find_elements(By.CSS_SELECTOR, "div.font-medium.inline-flex.items-center")
        for tag in tag_elements:
            tag_text = tag.text.lower()
            if tag_text:
                tags[tag_text] = 1
    except:
        pass
    return tags

def parse_description(description_list):
    result = {}
    
    if not description_list:
        return result
        
    for line in description_list:
        # Check for cooldown
        if line.startswith("Cooldown"):
            try:
                cooldown = int(line.split()[1])
                result["cooldown"] = cooldown
            except (IndexError, ValueError):
                result["cooldown"] = None
            continue
            
        # Check for ammo
        if line.startswith("Ammo Max"):
            continue  # Skip ammo line for now, could add later if needed
            
        # If we get here, it's descriptive text
        if "text" not in result:
            result["text"] = line
        else:
            result["bottomtext"] = line
            
    return result

def process_item(item_div):
    name = item_div.find('div', class_='name').text.strip()
    
    icon_div = item_div.find('div', class_='icon')
    icon_path = icon_div.find('img')['src'] if icon_div and icon_div.find('img') else None
    
    tier = item_div.find('div', class_='tier').text.strip()
    
    tags_div = item_div.find('div', class_='tags')
    tags = [tag.strip() for tag in tags_div.text.split(',')] if tags_div else []
    
    description_div = item_div.find('div', class_='description')
    description_texts = description_div.stripped_strings if description_div else []
    description_list = [text.strip() for text in description_texts if text.strip()]
    
    enchants = {}
    enchants_div = item_div.find('div', class_='enchants')
    if enchants_div:
        enchant_items = enchants_div.find_all('div', class_='enchant')
        for enchant in enchant_items:
            name_div = enchant.find('div', class_='name')
            desc_div = enchant.find('div', class_='description')
            if name_div and desc_div:
                enchants[name_div.text.strip()] = desc_div.text.strip()
    
    item_data = {
        "name": name,
        "icon": icon_path,
        "tier": tier,
        "tags": tags,
        "cooldown": None,  # Default value
        "enchants": enchants
    }
    
    # Process description texts
    for line in description_list:
        if line.startswith("Cooldown"):
            try:
                cooldown_value = line.split()[1]
                item_data["cooldown"] = int(cooldown_value)
            except (IndexError, ValueError):
                pass
        elif not line.startswith("Ammo Max"):  # Skip ammo lines
            if "text" not in item_data:
                item_data["text"] = line
            elif "bottomtext" not in item_data:
                item_data["bottomtext"] = line
    
    return name, item_data

def parse_items():
    driver = setup_driver()
    driver.get("https://www.howbazaar.gg/items")
    items = {}
    
    try:
        print("Waiting for initial items to load...")
        WebDriverWait(driver, 20).until(
            EC.presence_of_element_located((By.CSS_SELECTOR, "div.bg-white.rounded-lg"))
        )
        
        # Scroll to load all items
        print("Scrolling to load all items...")
        scroll_to_bottom(driver)
        
        # Wait a moment for the final items to load
        time.sleep(2)
        
        print("Getting item elements...")
        item_elements = driver.find_elements(By.CSS_SELECTOR, "div.bg-white.rounded-lg.border-gray-200")
        print(f"Found {len(item_elements)} items")

        for item in item_elements:
            try:
                # Get item name
                name_element = item.find_element(By.CSS_SELECTOR, "div.flex.flex-col.gap-2.p-4 > div.font-bold.text-2xl")
                name = name_element.text.replace(" 🔗", "")
                
                # Get item icon URL and convert to relative path
                icon_element = item.find_element(By.CSS_SELECTOR, "img.relative.h-\\[200px\\]")
                full_icon_url = icon_element.get_attribute("src")
                icon_url = full_icon_url.replace("https://www.howbazaar.gg/", "").lstrip("/")
                
                # Get item tiers
                tier_elements = item.find_elements(By.CSS_SELECTOR, "div.font-medium.inline-flex[class*='bg-tiers-']")
                tier = tier_elements[0].text.replace("+", "") if tier_elements else "Unknown"

                # Get item tags
                tags = []
                tag_elements = item.find_elements(By.CSS_SELECTOR, "div.font-medium.inline-flex:not([class*='bg-tiers-'])")
                for tag in tag_elements:
                    tag_text = tag.text.strip()
                    if tag_text and not tag_text.endswith("+"):
                        tags.append(tag_text)

                # Get item description and stats
                stat_elements = item.find_elements(By.CSS_SELECTOR, "ul.list-inside.leading-loose > li")
                cooldown = None
                text = None
                bottomtext = None
                
                for stat in stat_elements:
                    line = stat.text
                    if line.startswith("Cooldown"):
                        try:
                            cooldown = int(line.split()[1])
                        except (IndexError, ValueError):
                            pass
                    elif not line.startswith("Ammo Max"):
                        if text is None:
                            text = line
                        else:
                            bottomtext = line

                # Get enchantments
                enchants = {}
                enchant_elements = item.find_elements(By.CSS_SELECTOR, "div.grid.grid-cols-3 > div")
                for enchant in enchant_elements:
                    try:
                        enchant_name = enchant.find_element(By.CSS_SELECTOR, "div.text-lg.font-semibold").text
                        enchant_effect = enchant.find_element(By.CSS_SELECTOR, "div:not(.text-lg)").text
                        enchants[enchant_name] = enchant_effect
                    except:
                        continue

                print(f"Processing item: {name}")
                item_data = {
                    "name": name,
                    "icon": icon_url,
                    "tier": tier,
                    "tags": tags,
                    "cooldown": cooldown,
                    "enchants": enchants
                }
                
                if text:
                    item_data["text"] = text
                if bottomtext:
                    item_data["bottomtext"] = bottomtext

                items[name] = item_data

            except Exception as e:
                print(f"Error processing item: {str(e)}")
                continue

    except Exception as e:
        print(f"Error during scraping: {str(e)}")
    
    finally:
        driver.quit()
        print("Driver closed successfully")
    
    return items

if __name__ == "__main__":
    print("Starting item scraping...")
    items = parse_items()
    print(f"Writing {len(items)} items to file...")
    
    # Save as JavaScript file
    with open('items.js', 'w', encoding='utf-8') as f:
        f.write("const items = ")
        json.dump(items, f, indent=2, ensure_ascii=False)
        f.write(";")
    print("Done!") 