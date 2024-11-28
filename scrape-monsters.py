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

@run_with_timeout(300)  # 5 minutes timeout
def parse_monsters():
    driver = setup_driver()
    driver.get("https://www.howbazaar.gg/monsters")
    monsters = {}
    processed_count = 0
    
    try:
        monster_buttons = WebDriverWait(driver, 20).until(
            EC.presence_of_all_elements_located((By.CSS_SELECTOR, "div.grid.gap-2.justify-items-center.grid-cols-5 button"))
        )
        total_monsters = len(monster_buttons)
        print(f"Found {total_monsters} monsters to process")
        
        while processed_count < total_monsters:
            try:
                monster_buttons = WebDriverWait(driver, 20).until(
                    EC.presence_of_all_elements_located((By.CSS_SELECTOR, "div.grid.gap-2.justify-items-center.grid-cols-5 button"))
                )
                
                for button in monster_buttons:
                    try:
                        name = button.find_element(By.CSS_SELECTOR, "div.font-bold").text
                        
                        if name not in monsters:
                            print(f"Processing monster: {name} ({processed_count + 1}/{total_monsters})")
                            
                            # Get monster icon
                            try:
                                icon = button.find_element(By.CSS_SELECTOR, "img").get_attribute("src")
                                # Remove the domain part and leading slash
                                icon = icon.replace("https://www.howbazaar.gg/", "").lstrip('/')
                                print(f"Found icon: {icon}")
                            except Exception as e:
                                print(f"Error getting icon: {str(e)}")
                                icon = ""
                            
                            # Click the button
                            WebDriverWait(driver, 10).until(
                                EC.element_to_be_clickable(button)
                            ).click()
                            
                            # Wait for monster details
                            WebDriverWait(driver, 10).until(
                                EC.presence_of_element_located((By.CSS_SELECTOR, ".font-bold.text-3xl"))
                            )
                            
                            # Get skills - updated selectors
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
                                    skill_name = card.find_element(By.CSS_SELECTOR, "div.font-bold.text-2xl").text
                                    skills.append(skill_name)
                                print(f"Found {len(skills)} skills")
                            except Exception as e:
                                print(f"Error getting skills: {str(e)}")
                            
                            # Get items - updated selectors
                            items = []
                            try:
                                # Wait for items section
                                items_header = WebDriverWait(driver, 10).until(
                                    EC.presence_of_element_located((By.XPATH, "//div[contains(@class, 'font-semibold') and text()='Items']"))
                                )
                                # Get the grid div that immediately follows the Items header
                                items_grid = items_header.find_element(By.XPATH, "following-sibling::div[1]")
                                item_cards = items_grid.find_elements(By.CSS_SELECTOR, "div.bg-white")
                                for card in item_cards:
                                    item_name = card.find_element(By.CSS_SELECTOR, "div.font-bold.text-2xl").text.strip()
                                    items.append(item_name)
                                print(f"Found {len(items)} items")
                            except Exception as e:
                                print(f"Error getting items: {str(e)}")
                            
                            # Get monster health
                            try:
                                health_element = WebDriverWait(driver, 10).until(
                                    EC.presence_of_element_located((By.CSS_SELECTOR, "div.font-medium.inline-flex.items-center.text-green-800"))
                                )
                                # Extract just the number from the health text
                                health = int(health_element.text.split()[0])
                                print(f"Found health: {health}")
                            except Exception as e:
                                print(f"Error getting health: {str(e)}")
                                health = None
                            
                            # Store monster data and save backup immediately
                            monsters[name] = {
                                "name": name,
                                "icon": icon,
                                "health": health,  # Add health to the monster data
                                "skills": skills,
                                "items": items
                            }
                            
                            # Save backup after each monster
                            with open('monsters_backup.json', 'w', encoding='utf-8') as f:
                                json.dump(monsters, f, indent=2, ensure_ascii=False)
                            
                            processed_count += 1
                            print(f"Successfully processed {name}")
                            
                            # Go back to monster list
                            driver.get("https://www.howbazaar.gg/monsters")
                            time.sleep(2)
                            break
                            
                    except Exception as e:
                        print(f"Error processing button: {str(e)}")
                        continue
                
            except Exception as e:
                print(f"Error in main loop: {str(e)}")
                driver.get("https://www.howbazaar.gg/monsters")
                time.sleep(5)
                continue
                
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
            f.write("const monsters = ")
            json.dump(monsters, f, indent=2, ensure_ascii=False)
            f.write(";")
            
        print("Done!")
    except ScriptTimeout:
        print("\nScript timed out. Saving current progress...")
        # Copy the backup file to monsters.js
        with open('monsters_backup.json', 'r', encoding='utf-8') as backup_file:
            monsters = json.load(backup_file)
        with open('monsters.js', 'w', encoding='utf-8') as f:
            f.write("const monsters = ")
            json.dump(monsters, f, indent=2, ensure_ascii=False)
            f.write(";")
        print("Final data saved to monsters.js")
    except KeyboardInterrupt:
        print("\nScript interrupted by user. Saving current progress...")
        # Copy the backup file to monsters.js
        with open('monsters_backup.json', 'r', encoding='utf-8') as backup_file:
            monsters = json.load(backup_file)
        with open('monsters.js', 'w', encoding='utf-8') as f:
            f.write("const monsters = ")
            json.dump(monsters, f, indent=2, ensure_ascii=False)
            f.write(";")
        print("Final data saved to monsters.js")