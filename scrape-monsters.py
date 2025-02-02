import threading
import time
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from webdriver_manager.chrome import ChromeDriverManager
import json

class ScriptTimeout(Exception):
    pass

def run_with_timeout(timeout_seconds):
    def decorator(func):
        def wrapper(*args, **kwargs):
            result = [None]
            exception = [None]
            
            def worker():
                try:
                    result[0] = func(*args, **kwargs)
                except Exception as e:
                    exception[0] = e
            
            thread = threading.Thread(target=worker)
            thread.daemon = True
            thread.start()
            thread.join(timeout_seconds)
            
            if thread.is_alive():
                raise ScriptTimeout(f"Script took longer than {timeout_seconds} seconds")
            if exception[0]:
                raise exception[0]
            return result[0]
        return wrapper
    return decorator

def setup_driver():
    chrome_options = Options()
    # chrome_options.add_argument("--headless")  # Uncomment to run in headless mode
    chrome_options.add_argument("--window-size=1920,1080")
    chrome_options.add_argument("--log-level=3")  # Suppress console messages
    chrome_options.add_experimental_option('excludeSwitches', ['enable-logging'])  # Suppress USB errors
    
    service = Service(ChromeDriverManager().install())
    driver = webdriver.Chrome(service=service, options=chrome_options)
    return driver

def get_tier_from_class(class_attr):
    """Helper function to determine tier from class attribute"""
    if "bronze" in class_attr.lower():
        return 1
    elif "silver" in class_attr.lower():
        return 2
    elif "gold" in class_attr.lower():
        return 3
    elif "diamond" in class_attr.lower():
        return 4
    elif "legendary" in class_attr.lower():
        return 5
    return 1  # default to tier 1 if no tier found

def parse_monsters():
    driver = setup_driver()
    driver.get("https://www.howbazaar.gg/monsters")
    monsters = {}
    processed_count = 0
    completed_days = set()  # Track which days we've completed
    
    try:
        while True:
            day_sections = WebDriverWait(driver, 10).until(  # Reduced wait time from 30 to 10
                EC.presence_of_all_elements_located((By.CSS_SELECTOR, "div.mb-8"))
            )
            
            if processed_count == 0:
                total_monsters = sum(len(section.find_elements(By.CSS_SELECTOR, "button")) 
                                   for section in day_sections)
                print(f"Found {total_monsters} monsters to process")
            
            found_new_monster = False
            
            for section in day_sections:
                day_header = section.find_element(By.CSS_SELECTOR, "div.text-2xl.font-bold").text
                if day_header == "Event":
                    day = 11  # Treat Event section as day 11
                else:
                    day = int(day_header.replace("Day ", ""))
                
                # Skip days we've already completed
                if day in completed_days:
                    continue
                
                print(f"\nChecking {day_header}")
                driver.execute_script("arguments[0].scrollIntoView(true);", section)
                time.sleep(0.1)  # Reduced from 1 second
                
                monster_buttons = section.find_elements(By.CSS_SELECTOR, "button")
                all_processed = True  # Track if we've processed all monsters in this day
                
                for button in monster_buttons:
                    try:
                        driver.execute_script("arguments[0].scrollIntoView(true);", button)
                        time.sleep(0.1)  # Reduced from 1 second
                        
                        name = button.find_element(By.CSS_SELECTOR, "div.font-semibold div").text
                        
                        if name not in monsters:
                            all_processed = False
                            print(f"Processing monster: {name} ({processed_count + 1}/{total_monsters})")
                            found_new_monster = True
                            
                            try:
                                clickable_button = WebDriverWait(driver, 10).until(
                                    EC.element_to_be_clickable(button)
                                )
                                
                                # Get icon before clicking
                                try:
                                    icon = button.find_element(By.CSS_SELECTOR, "img").get_attribute("src")
                                    icon = icon.replace("https://www.howbazaar.gg/", "").lstrip('/')
                                    print(f"Found icon: {icon}")
                                except Exception as e:
                                    print(f"Error getting icon: {str(e)}")
                                    icon = ""
                                
                                # Create the expected ID from monster name
                                monster_details_id = name.replace(" ", "_")
                                
                                # Click with JavaScript as it's more reliable
                                driver.execute_script("arguments[0].click();", clickable_button)
                                
                                # Wait for monster details section to load using the ID
                                WebDriverWait(driver, 10).until(
                                    EC.presence_of_element_located((By.ID, monster_details_id)),
                                    message=f"Waiting for {name} details to load"
                                )
                                
                                # Get skills - updated to include tiers
                                skills = []
                                try:
                                    # Wait for skills section
                                    skills_header = WebDriverWait(driver, 10).until(
                                        EC.presence_of_element_located((By.XPATH, "//div[contains(@class, 'font-semibold') and text()='Skills']"))
                                    )
                                    # Get the grid div that immediately follows the Skills header
                                    skills_grid = skills_header.find_element(By.XPATH, "following-sibling::div[1]")
                                    skill_cards = skills_grid.find_elements(By.CSS_SELECTOR, "div.bg-white")
                                    for card in skill_cards:
                                        skill_name = card.find_element(By.CSS_SELECTOR, "div.font-bold.text-lg").text
                                        class_attr = card.get_attribute("class")
                                        skills.append({
                                            "name": skill_name,
                                            "tier": get_tier_from_class(class_attr)
                                        })
                                    print(f"Found {len(skills)} skills")
                                except Exception as e:
                                    print(f"Error getting skills: {str(e)}")
                                
                                # Get items - updated to include tiers
                                items = []
                                try:
                                    # Wait for items section
                                    items_header = WebDriverWait(driver, 10).until(
                                        EC.presence_of_element_located((By.XPATH, "//div[contains(@class, 'font-semibold') and text()='Items']"))
                                    )
                                    
                                    # Get the parent grid div that contains all items
                                    items_grid = WebDriverWait(driver, 10).until(
                                        EC.presence_of_element_located((By.CSS_SELECTOR, "div.grid.gap-2.grid-cols-3"))
                                    )
                                    
                                    # Find all item cards
                                    item_cards = items_grid.find_elements(By.CSS_SELECTOR, "div.bg-white")
                                    
                                    for card in item_cards:
                                        # Updated selector to match the actual HTML structure
                                        item_name = card.find_element(By.CSS_SELECTOR, "div.font-bold.text-lg, div.font-bold.text-xl").text.strip()
                                        class_attr = card.get_attribute("class")
                                        items.append({
                                            "name": item_name,
                                            "tier": get_tier_from_class(class_attr)
                                        })
                                    print(f"Found {len(items)} items")
                                except Exception as e:
                                    print(f"Error getting items: {str(e)}")
                                
                                # Get monster health - updated selector to match new HTML
                                try:
                                    health_element = WebDriverWait(driver, 10).until(
                                        EC.presence_of_element_located((By.CSS_SELECTOR, "span.text-xl.text-green-700"))
                                    )
                                    health = int(health_element.text.replace(" health", ""))
                                    print(f"Found health: {health}")
                                except Exception as e:
                                    print(f"Error getting health: {str(e)}")
                                    health = None
                                
                                # Store monster data and save backup immediately
                                monsters[name] = {
                                    "name": name,
                                    "icon": icon,
                                    "day": day,
                                    "health": health,  # Add health to the monster data
                                    "skills": skills,
                                    "items": items
                                }
                                
                                # Save backup after each monster
                                with open('monsters_backup.json', 'w', encoding='utf-8') as f:
                                    json.dump(monsters, f, indent=2, ensure_ascii=False)
                                
                                processed_count += 1
                                #time.sleep(.05)  # Reduced wait after processing
                            #    driver.get("https://www.howbazaar.gg/monsters")
                             #   time.sleep(.15)  # Reduced from 3 seconds
                                break
                                
                            except Exception as e:
                                print(f"Error processing monster details: {str(e)}")
                                continue
                    
                    except Exception as e:
                        print(f"Error reading monster button: {str(e)}")
                        continue
                
                if all_processed:
                    print(f"Completed Day {day}")
                    completed_days.add(day)
                
                if found_new_monster:
                    break

            if not found_new_monster:
                print("No new monsters found - finished!")
                break

    finally:
        driver.quit()
        print("Driver closed successfully")
    
    return monsters

if __name__ == "__main__":
    print("Starting monster scraping...")
    try:
        monsters = parse_monsters()
        print(f"Writing {len(monsters)} monsters to file...")
        
        # Write as JavaScript constant
        with open('monsters.js', 'w', encoding='utf-8') as f:
            f.write("export const monsters = ")
            json.dump(monsters, f, indent=2, ensure_ascii=False)
            f.write(";")
            
        print("Done!")
    except ScriptTimeout:
        print("\nScript timed out. Saving current progress...")
        # Copy the backup file to monsters.js
        with open('monsters_backup.json', 'r', encoding='utf-8') as backup_file:
            monsters = json.load(backup_file)
        with open('monsters.js', 'w', encoding='utf-8') as f:
            f.write("export const monsters = ")
            json.dump(monsters, f, indent=2, ensure_ascii=False)
            f.write(";")
        print("Final data saved to monsters.js")
    except KeyboardInterrupt:
        print("\nScript interrupted by user. Saving current progress...")
        # Copy the backup file to monsters.js
        with open('monsters_backup.json', 'r', encoding='utf-8') as backup_file:
            monsters = json.load(backup_file)
        with open('monsters.js', 'w', encoding='utf-8') as f:
            f.write("export const monsters = ")
            json.dump(monsters, f, indent=2, ensure_ascii=False)
            f.write(";")
        print("Final data saved to monsters.js")