import { Item } from './Item.js';
import { Skill } from './Skill.js';
import { updateUrlState } from './utils.js';

class Board {
    player = null; //Will be set when a player is initialized and they create a board
    static boards = new Map();
    static uniqueTypeTags = ['Ammo','Apparel','Aquatic','Core','Dinosaur','Dragon','Food','Friend','Loot','Potion','Property','Ray','Tech','Tool','Toy','Vehicle','Weapon'];

    constructor(boardId, player) {
        this.boardId = boardId;
        this.player = player;
        this.element = document.getElementById(boardId);
        this.initialize();
        Board.boards.set(boardId,this);
    }
    
    static resetBoards() {
        const players = Array.from(Board.boards.values()).map(board=>board.player);
        players.forEach(player=>player.reset());
        players.forEach(player=>player.setup());
    }

    static getBoardFromId(boardId) {
        if(Board.boards.has(boardId)) return Board.boards.get(boardId);
        console.log("Board not found: " + boardId);
        return null;
    }

    initialize() {
        this.slots = [];
        this.items = [];
        this.skills = [];
        if(!this.element) {
            this.updateHealthElement = ()=>{};
            this.updateDPSElement = ()=>{};
            this.updateGoldElement = ()=>{};
            this.updateIncomeElement = ()=>{};
            return;
        }
        this.element.innerHTML = '';
        // Create slots
        for (let i = 0; i < 10; i++) {
            const slot = document.createElement('div');
            slot.className = 'board-slot';
            slot.style.left = `${i * 84}px`;
            slot.dataset.index = i;
            
            slot.addEventListener('dragover', (e) => this.handleSlotDragOver(e, this));
            slot.addEventListener('drop', (e) => this.handleSlotDrop(e, this));
            slot.addEventListener('touchmove', (e) => this.handleTouchMove(e, this));
            slot.addEventListener('touchend', (e) => this.handleTouchEnd(e, this));
            
            this.element.appendChild(slot);
            this.slots.push(slot);
        }

        const addSkillButton = document.createElement('div');
        addSkillButton.className = 'add-skill-button';
        addSkillButton.classList.add('editorOpener');
        addSkillButton.innerHTML = "➕";
        addSkillButton.onclick = () => {
            this.showSkillSelector();
        };
        this.element.appendChild(addSkillButton);
        this.importElement = document.createElement('div');
        this.importElement.className = 'import-element';
        this.element.appendChild(this.importElement);

        this.createHealthElement();
        this.createSkillsElement();
        this.createGoldElement();
        this.createDPSElement();
        this.createIncomeElement();
        this.createWinRateElement();
        this.reset();


    }
    clear() {
        if(this.element) {
            this.skillsElement.innerHTML = '';        
            this.items.forEach(item => item.element.remove());
        }
        this.items = [];
        this.skills = [];
        this.reset();
        updateUrlState();
    }
    get activeItems() {
        return this.items.filter(item => !item.isDestroyed);
    }
    get activeItemCount() {
        return this.activeItems.length;
    }

    reset() {
        this.damageDealt = 0;
        this.itemTriggers = new Map(); //functions to call when any item on this board is triggered
        this.freezeTriggers = new Map(); //functions to call when any item on this board is frozen
        this.shieldValuesChangedTriggers = new Map(); //functions to call when shield values change
        this.itemValuesChangedTriggers = new Map(); //functions to call when item values change
        this.hasteTriggers = new Map(); //functions to call when haste is applied to any item on this board
        this.slowTriggers = new Map(); //functions to call when slow is applied to any item on this board
        this.burnTriggers = new Map();
        this.poisonTriggers = new Map();
        this.critTriggers = new Map();
        this.startOfFightTriggers = new Map();
        this.itemDestroyedTriggers = new Map(); //functions to call when an item on this board is destroyed
        this.healTriggers = [];
        this.shieldTriggers = new Map();
        this.ammoTriggers = [];
        this.largeItemTriggers = [];
        this.mediumItemTriggers = [];
        this.smallItemTriggers = [];
        
        this.resetItems();
        if(this.player?.battle) {
            this.player.battle.battleTimeDiff = 0;
            this.updateHealthElement();
            this.updateDPSElement();
        }

        this.updateGoldElement();
        this.updateIncomeElement();
    }
    
    setup() {
        this.setupItems();
    }
    setupItems() {
        this.items.forEach(item => item.setup());
        this.setupSkills();
        this.items.forEach(item => item.updateTriggerValuesElement());
    }

    resetItems() {
        this.items.forEach(item => item.reset());
        this.resetSkills();
        this.items.forEach(item => item.updateTriggerValuesElement());
    }

    resetSkills() {
        this.skills.forEach(skill => skill.board=this);
        this.skills.forEach(skill => skill.reset());
    }
    setupSkills() {
        this.skills.forEach(skill => skill.setup());
    }


    showSkillSelector() {
        if(this.skillSelector) {
            document.body.removeChild(this.skillSelector);
        }
        this.skillSelector = document.createElement('div');
        this.skillSelector.classList.add('skill-selector', 'editor');
        this.skillSelector.innerHTML = `
            <div class="skill-selector-header">
                <div class="form-group">
                    <label>Skill Rarity:</label>
                    <select id="skill-selector-rarity">
                        ${Item.rarityLevels.map(r => 
                            `<option value="${r}">${r}</option>`
                        ).join('')}
                    </select>
                </div>
                <div class="form-group">
                    <label>Filter:</label>
                    <input type=text id='skill-selector-filter'>
                </div>
            </div>
            <div class="skill-selector-body">
            </div>
        `;
        this.skillSelector.style.display = 'block';
        
        for(let skillName in skills) {
            const skill = skills[skillName];
            if(!skill) continue;
            if(this.skills.find(s => s.name == skillName)) continue;
            const skillItem = document.createElement('div');
            skillItem.className = 'skill-selector-item';
            skillItem.innerHTML = `
                <img src="${skill.icon}" alt="${skillName}">
                <span>${skillName}</span>
            `;
            this.skillSelector.querySelector('.skill-selector-body').appendChild(skillItem);
            skillItem.onclick = () => {
                const rarity = this.skillSelector.querySelector('#skill-selector-rarity').value;
                this.addSkill(skillName,{rarity:rarity});
                this.skillSelector.style.display = 'none';
                Board.resetBoards();
                updateUrlState();
            };
            skillItem.onmouseenter = (e) => {
                const skillSelectorTooltip = document.createElement('div');
                skillSelectorTooltip.className = 'skill-selector-tooltip';
                const skillName = e.target.querySelector('span').textContent;
                const skill = skills[skillName];
                const selectedRarity = this.skillSelector.querySelector('#skill-selector-rarity').value;
                if(skill) {
                    skillSelectorTooltip.innerHTML = `
                    <div class='skill-icon ${selectedRarity}' style='position:absolute; top:0px; left:-120px; width: 120px; height: 120px;'>
                    <img src="${skill.icon}" style='box-shadow: 1px 1px 10px 1px rgba(14,14, 14, 1);'>
                    </div>
                    <h1>${skillName}</h1>
                    <p>${skill.text.map(line => `<span>${line}</span>`).join('')}</p>
                    `;
                }

                this.skillSelector.appendChild(skillSelectorTooltip);
            }

            skillItem.onmouseleave = (e) => {
                this.skillSelector.querySelector('.skill-selector-tooltip').remove();
            }




        }    
        this.skillSelector.querySelector('#skill-selector-filter').oninput = (e) => {
            const filter = e.target.value.toLowerCase();
            this.skillSelector.querySelector('.skill-selector-body').querySelectorAll('.skill-selector-item').forEach(item => {
                if(item.querySelector('span').textContent.toLowerCase().includes(filter) ||
                    skills[item.querySelector('span').textContent].tags.some(tag => tag.toLowerCase()==filter.toLowerCase())||
                    skills[item.querySelector('span').textContent].text.map(line => line.toLowerCase()).join(' ').includes(filter)) {
                    item.style.display = 'flex';
                } else {
                    item.style.display = 'none';
                }
            });
            

        }
        document.body.appendChild(this.skillSelector);
        this.skillSelector.querySelector('#skill-selector-filter').focus();
    }
    




    itemDidCrit(item) {
        this.critTriggers.forEach(func => func(item));
    }
    itemValuesChanged(item) {
        this.itemValuesChangedTriggers.forEach(func => func(item));
    }
    updateDPSElement() {
        if(!this.player.battle) return;
        if(this.player.battle.battleTimeDiff==0) {
            this.dpsElement.innerHTML = "";
            return;
        }
        this.dpsElement.innerHTML = ""+
        "   DPS: " + (this.damageApplied/(this.player.battle.battleTimeDiff/1000)).toFixed(0)+
        " / HPS: "+(this.healingApplied/(this.player.battle.battleTimeDiff/1000)).toFixed(0)+
        " / SPS: "+(this.shieldApplied/(this.player.battle.battleTimeDiff/1000)).toFixed(0) +
        (this.damageApplied>0?"<div class='totals'><font class='Damage'>"+(this.damageApplied - this.player.hostileTarget.poisonDamageReceived - this.player.hostileTarget.burnDamageReceived).toFixed(0)+"</font>":"") +
        (this.player.hostileTarget.poisonDamageReceived>0?" <font class='Poison'>"+this.player.hostileTarget.poisonDamageReceived.toFixed(0)+"</font>":"") +
        (this.player.hostileTarget.burnDamageReceived>0?" <font class='Burn'>"+this.player.hostileTarget.burnDamageReceived.toFixed(0)+"</font>":"") +
        "</div>"
        ;
    }
    updateHealthElement() {
        const healthPercent = (this.player?.health || 0) / (this.player?.maxHealth || 1000) * 100;
        this.healthElement.style.background = `linear-gradient(to right, 

            #44ff44 ${healthPercent}%, 
            #999999 ${healthPercent}%
        )`;
        
        this.healthElementHealth.innerHTML = this.player?.health.toFixed(0);
        this.healthElementShield.innerHTML = this.player?.shield>0?this.player?.shield.toFixed(0):"";
        this.healthElementBurn.innerHTML = this.player?.burn>0?this.player?.burn.toFixed(0):"";
        this.healthElementPoison.innerHTML = this.player?.poison>0?this.player?.poison.toFixed(0):"";
        this.healthElementRegen.innerHTML = this.player?.regen>0?this.player?.regen.toFixed(0):"";
    } 
    updateGoldElement() {
        this.goldElement.textContent = this.player?.gold;
    }
    updateIncomeElement() {
        this.incomeElement.textContent = "+" +this.player?.income;
    }
    updateImportElement() {
        if(!this.importedData) {return;}
        let encounterIndex=-1;
        this.importElement.innerHTML = `
            <select id="import-select">
                ${this.importedData.encounters.map( e=> {
                    encounterIndex++;
                    return `
                    <option value="${encounterIndex}-player">Day ${e.day} Player Board</option>
                    <option value="${encounterIndex}-opponent">Day ${e.day}-${e.opponent.name}</option>
                    `;

                }).join('')}

            </select>
        `;
        this.importElement.querySelector('#import-select').onchange = (e) => {      
            const encounterIndex = parseInt(e.target.value.split('-')[0]);
            const isPlayerBoard = e.target.value.split('-')[1] == 'player';
            const encounter = this.importedData.encounters[encounterIndex];
            this.importFromDayData(isPlayerBoard?encounter.player:encounter.opponent);
            return true;
        }

    }
    importFromDayData(data,isPlayerBoard) {
        window.isLoadingFromUrl = true;
        if(data.error) {
            alert(data.error);
        } else {
            this.player.startData = {};
            this.player.startData.gold = data.gold;
            this.player.startData.level = data.level;
            this.player.startData.name = data.heroName || data.name;
            this.player.startData.maxHealth = data.maxHealth;
            this.player.startData.health = data.maxHealth;
            this.clear();
            let currentIndex=0;


            data.hand.forEach(item => {
                let itemData = items[item.name];
                if(!itemData) {
                    console.log("Item not found: " + item.name);
                    return;
                }

                itemData.rarity = ["Bronze","Silver","Gold","Diamond","Legendary"][parseInt(item.tier)];
                itemData.enchant = Item.possibleEnchants[parseInt(item.enchantment)];
                let newItem = new Item(items[item.name], this);
                //this.addItem(newItem);
                item.itemAdded = newItem;

                newItem.setIndex(currentIndex);           
                currentIndex += newItem.size;
            });
            data.skills.forEach(skill => {
                this.addSkill(skill.name,{rarity:Item.rarityLevels[parseInt(skill.tier)]});
            });
            Board.resetBoards();
            data.hand.forEach(item => {
                if(item.attributes.DamageAmount) {
                    item.itemAdded.startItemData.damage = parseInt(item.attributes.DamageAmount) - item.itemAdded.damage;
                }
                if(item.attributes.Cooldown) {
                    item.itemAdded.startItemData.cooldown += item.attributes.Cooldown/1000 - item.itemAdded.cooldown/1000; 

                }
                if(item.attributes.CritChance) {
                    item.itemAdded.startItemData.crit = parseInt(item.attributes.CritChance) - item.itemAdded.crit;
                }               
                if(item.attributes.HealAmount) {
                    item.itemAdded.startItemData.heal = parseInt(item.attributes.HealAmount) - item.itemAdded.heal;
                }
                if(item.attributes.ShieldApplyAmount) {
                    item.itemAdded.startItemData.shield = parseInt(item.attributes.ShieldApplyAmount) - item.itemAdded.shield;
                }
                delete item.itemAdded;           
            });
        }

        
        Board.resetBoards();
        window.isLoadingFromUrl = false;
        updateUrlState();
    }
    importFromBazaarTracker() {        
        if(!window.isDoner) {
            alert("This feature is only available for doners or kickstarter backers");
            return;
        }

        let runId = prompt("Enter the bazaar tracker run ID:");
        if(runId) {
            if(runId.indexOf("=")!=-1) {
                runId = runId.split("=")[1];
            }
            console.log("Importing from run ID: " + runId);
            fetch(`https://www.bazaarplanner.com/import?runId=${runId}`)
                .then(response => response.json())
                .then(data => {
                    this.importedData = data;
                    this.updateImportElement();
                    this.importFromDayData(data);                    
                })
                .finally(() => {
                    window.isLoadingFromUrl = false;
                })

                .catch(error => {
                    console.error('Error:', error);
                });

        }
        

    }
    clone(newPlayer) {
        const clone = new Board("cloned-"+this.boardId,newPlayer);
        clone.items = this.items.map(item => item.clone(clone));
        clone.skills = this.skills.map(skill => skill.clone(clone));
        return clone;
    }

    addSkill(skillName,skillData) {
        if(!skills[skillName]) {
            console.log("Skill not found: " + skillName);
            return;
        }
        let newSkillData = structuredClone(skills[skillName]);
        newSkillData.name = skillName;
        Object.assign(newSkillData,skillData);
        let newSkill = new Skill(newSkillData);
        this.skills.push(newSkill);
        newSkill.board = this;
        this.skillsElement.appendChild(newSkill.element);
        newSkill.setup();
    }
    removeSkill(skill) {
        this.skills = this.skills.filter(s => s !== skill);
        this.skillsElement.removeChild(skill.element);
        Board.resetBoards();
        updateUrlState();
    }
    createWinRateElement() {
        this.winRateElement = document.createElement('div');
        this.winRateElement.className = 'win-rate-element';
        this.winRateElement.innerHTML = "0%";
        this.element.appendChild(this.winRateElement);
    }

    createHealthElement() {
        this.healthElement = document.createElement('div');

        this.healthElement.className = 'health-element';
        this.healthElement.classList.add('editorOpener');

        this.healthElementHealth = document.createElement('div');
        this.healthElementHealth.className = 'health-element-health';
        this.healthElement.appendChild(this.healthElementHealth);
        this.healthElementShield = document.createElement('div');
        this.healthElementShield.className = 'health-element-shield';
        this.healthElement.appendChild(this.healthElementShield);
        this.healthElementBurn = document.createElement('div');
        this.healthElementBurn.className = 'health-element-burn';
        this.healthElement.appendChild(this.healthElementBurn);
        this.healthElementPoison = document.createElement('div');
        this.healthElementPoison.className = 'health-element-poison';
        this.healthElement.appendChild(this.healthElementPoison);
        this.healthElementRegen = document.createElement('div');
        this.healthElementRegen.className = 'health-element-regen';
        this.healthElement.appendChild(this.healthElementRegen);
        this.element.appendChild(this.healthElement);
        this.healthElement.onclick = () => {
            this.player.openEditor();
        }
        this.updateHealthElement();
    }
    createGoldElement() {
        this.goldElement = document.createElement('div');
        this.goldElement.className = 'gold-element';
        this.goldElement.title = "Gold";
        this.element.appendChild(this.goldElement);
    }
    createDPSElement() {
        this.dpsElement = document.createElement('div');
        this.dpsElement.className = 'dps-element';
        this.dpsElement.title = "DPS";
        this.element.appendChild(this.dpsElement);
    }
    createIncomeElement() {
        this.incomeElement = document.createElement('div');
        this.incomeElement.className = 'income-element';
        this.incomeElement.title = "Income";
        this.element.appendChild(this.incomeElement);
    }



    createSkillsElement() {
        this.skillsElement = document.createElement('div');
        this.skillsElement.className = 'skills-element';
        this.element.appendChild(this.skillsElement);
    }


    startBattle() {
        this.damageApplied = 0;
        this.healingApplied = 0;
        this.shieldApplied = 0;
        this.items.forEach(item => {if(item.progressBar) item.progressBar.style.display = 'block'});
        this.startOfFightTriggers.forEach(func => func());
        this.player.hostileTarget.healthChanged((newHealth,oldHealth) => {
            if(newHealth<oldHealth) {
                this.damageApplied += oldHealth-newHealth;
            }
        });
        this.player.shieldChanged((newShield,oldShield) => {
            if(newShield>oldShield) {
                this.shieldApplied += newShield-oldShield;
            }
        });        
    }
    getOpenSpacesToTheLeft(someItem,skipItem) {        
        let openSpaces = someItem.startIndex;
        for(let itemIndex = this.items.indexOf(someItem)-1;itemIndex>=0;itemIndex--) {
            let itemToTheLeft = this.items[itemIndex];
            if(itemToTheLeft!=skipItem) {
                openSpaces -= itemToTheLeft.size;
            }
        }
        return openSpaces;
    }

    getOpenSpacesToTheRight(someItem,skipItem) {
        let openSpaces = 10 - (someItem.startIndex + someItem.size);
        for(let itemIndex = this.items.indexOf(someItem)+1;itemIndex<this.items.length;itemIndex++) {
            let itemToTheRight = this.items[itemIndex];
            if(itemToTheRight!=skipItem) {                
                openSpaces -= itemToTheRight.size;
            }
        }   
        return openSpaces;
    }

    shiftItemsToTheLeft(item,shiftAmount,ignoreItem) {     
        //console.log("Shifting items from "+item.startIndex+" to the left "+shiftAmount);
        let itemIndex = this.items.indexOf(item);
        let overlapCheckPosition=0;
        do {

            item.startIndex -= shiftAmount;
            item.updateElementPosition();
            overlapCheckPosition = item.startIndex;
            itemIndex--;
            if(itemIndex<0) return;
            item = this.items[itemIndex];
            if(item==ignoreItem) {
                itemIndex--;
                if(itemIndex<0) return;
                item = this.items[itemIndex];
            }
            shiftAmount = item.startIndex+item.size-overlapCheckPosition;
        } while(shiftAmount>0);
    }



    shiftItemsToTheRight(item,shiftAmount,ignoreItem) {
        //console.log("Shifting items from "+item.startIndex+" to the right "+shiftAmount);
        let itemIndex = this.items.indexOf(item);
        let overlapCheckPosition=0;
        do {

            item.startIndex += shiftAmount;
            item.updateElementPosition();
            overlapCheckPosition = item.startIndex+item.size;
            itemIndex++; 
            if(itemIndex>=this.items.length) return;
            item = this.items[itemIndex];     
            if(item==ignoreItem) {
                itemIndex++; 
                if(itemIndex>=this.items.length) return;
                item = this.items[itemIndex];     
            }
            shiftAmount = overlapCheckPosition-item.startIndex;
        } while (shiftAmount>0);

    }



    isValidPlacement(startIndex, draggingElement) {

        if (startIndex + parseInt(draggingElement.dataset.size) > 10 || startIndex < 0) return false;
        
        const existingItems = this.items;
        let foundItem = null;
        const itemsToCheck = existingItems.filter(someItem => {
            if(someItem.element==draggingElement) {
                foundItem = someItem;
            }
            return someItem.element !== draggingElement;
        });
        const draggingElementSize = parseInt(draggingElement.dataset.size);

        // Check each slot that would be occupied by the new item
        for (let i = startIndex; i < startIndex + draggingElementSize; i++) {
            // Check if any existing item overlaps with this slot
            for (const someItem of itemsToCheck) {
                const slotStart = someItem.startIndex;
                const slotSize = someItem.size;
                
                if (!isNaN(slotStart) && !isNaN(slotSize)) {
                    // Check if there's any overlap between the existing item and the slot we're checking
                    const itemEnd = slotStart + slotSize - 1;
                    if (i >= slotStart && i <= itemEnd) { //we found the item that overlaps with the new item
                        //check if we can push the item to the left
                        const openSpacesToTheLeft = this.getOpenSpacesToTheLeft(someItem,foundItem);
                        //check if we can push the item to the right
                        const openSpacesToTheRight =this.getOpenSpacesToTheRight(someItem,foundItem);
                    //    delayedLog("Open spaces to the right: " + openSpacesToTheRight,'openSpacesToTheRight');
                    //    delayedLog("Open spaces to the left: " + openSpacesToTheLeft,'openSpacesToTheLeft');
                        

                        //how much is the left side of the dragging item over the right side of someItem
                        const rightOverlap = someItem.startIndex+someItem.size - startIndex;
                        
                        //how much is the right side of the dragging item over the left side of someItem
                        const leftOverlap = startIndex+draggingElementSize-(someItem.startIndex);
                        if(rightOverlap<leftOverlap && openSpacesToTheLeft>=rightOverlap) {
                            //we can push the item to the left) {
                                this.shiftItemsToTheLeft(someItem,rightOverlap,foundItem);
                                return true;
                        } else {
                            //we can push the item to the right
                            if(openSpacesToTheRight>=draggingElementSize + (startIndex-someItem.startIndex)) {
                                this.shiftItemsToTheRight(someItem, leftOverlap,foundItem);
                                return true;
                            }
                        }

                        if(openSpacesToTheLeft>=rightOverlap) {
                            this.shiftItemsToTheLeft(someItem, rightOverlap,foundItem);
                            return true;
                        }
  
                        if(openSpacesToTheRight>=leftOverlap) {
                            this.shiftItemsToTheRight(someItem,rightOverlap,foundItem);
                            return true;
                        }

                        return false;
                    }
                }
            }
        }
        
        return true;
    }

    handleSlotDragOver(e,board) {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
        
        const slot = e.target.closest('.board-slot');
        if (!slot) return;
        
        const draggingElement = document.querySelector('.dragging');
        if (!draggingElement) return;
        
        const startIndex = parseInt(slot.dataset.index);
        
        // Get the correct board instance for the slot being hovered over        
        board.updateDropPreview(slot, startIndex, draggingElement);
    }

    handleTouchMove(touchEvent, board) {
        touchEvent.preventDefault(); // Prevent scrolling
        const touch = touchEvent.touches[0];
        const element = document.elementFromPoint(touch.clientX, touch.clientY);
        
        // Create synthetic dragover event
        const syntheticEvent = {
            preventDefault: () => {},
            target: element,
            dataTransfer: {
                dropEffect: 'move'
            }
        };
        
        this.handleSlotDragOver(syntheticEvent, board);
    }

    handleTouchEnd(touchEvent, board) {
        touchEvent.preventDefault();
        const touch = touchEvent.changedTouches[0];
        const element = document.elementFromPoint(touch.clientX, touch.clientY);
        
        // Create synthetic drop event
        const syntheticEvent = {
            preventDefault: () => {},
            target: element,
            dataTransfer: {
                dropEffect: 'move'
            }
        };
        
        this.handleSlotDrop(syntheticEvent, board);
    }

    updateDropPreview(slot, startIndex, draggingElement) {
        // Clear all preview classes first
        document.querySelectorAll('.valid-drop, .invalid-drop').forEach(element => {
            element.classList.remove('valid-drop', 'invalid-drop');
        });
        
        if (this.isValidPlacement(startIndex, draggingElement)) {
            // Add valid-drop class to all affected slots
            for (let i = 0; i < draggingElement.dataset.size; i++) {
                const targetSlot = this.slots[startIndex + i];
                if (targetSlot) {
                    targetSlot.classList.add('valid-drop');
                }
            }
        } else {
            slot.classList.add('invalid-drop');
        }
    }

    clearDropPreview() {
        document.querySelectorAll('.board-slot').forEach(slot => {
            slot.classList.remove('valid-drop', 'invalid-drop');
        });
    }

    handleSlotDrop(e, board) {
        e.preventDefault();
        this.clearDropPreview();
        
        const slot = e.target.closest('.board-slot');
        if (!slot) return;
        let itemData;
        const startIndex = parseInt(slot.dataset.index);
        
        const draggingElement = document.querySelector('.dragging');
        if(draggingElement==null) {
            console.log("No dragging element found");
            return;
        }
        const alreadyOnBoard = draggingElement.classList.contains('merged-slot');
        let size=1;
        let foundItem = null;
        if(alreadyOnBoard) {
            let boardItems = Board.getBoardFromId(draggingElement.closest('.board')?.id).items;
            foundItem = boardItems.find(item => item.element === draggingElement);
            size = foundItem.size;
        } else {
            itemData = JSON.parse(draggingElement.getAttribute('data-item'));
            size = getSizeValue(itemData.tags.find(tag => ['Small', 'Medium', 'Large'].includes(tag)) || 'Small');
        }

        const boardElement = slot.closest('.board');
        const targetBoard = Board.getBoardFromId(boardElement.id);
        const closestBoard = draggingElement.closest('.board')?.id;
        const sourceBoard = closestBoard?Board.getBoardFromId(closestBoard):null;

        if (board.isValidPlacement(startIndex, draggingElement)) {
            if (alreadyOnBoard) {  
                if(targetBoard==sourceBoard) {
                    foundItem.setIndex(startIndex);
                } else {
                    foundItem.board = targetBoard;
                    targetBoard.addItem(foundItem);
                    foundItem.setIndex(startIndex);
                    sourceBoard.removeItem(foundItem);                    
                }
            } else { // If it was not already on a board, create a new item on the target board
               let newItem = new Item(itemData, targetBoard);
                newItem.setIndex(startIndex);
            }
            targetBoard.sortItems();
            Board.resetBoards();
            updateUrlState();
        }
        document.querySelectorAll('.valid-drop, .invalid-drop, .dragging').forEach(element => {
            element.classList.remove('valid-drop', 'invalid-drop', 'dragging');
        });

    
        deleteZone.style.display = 'none';
    }

    addItem(item) {
        this.items.push(item);
        if(this.element) {
            this.element.appendChild(item.element);
        }
        this.sortItems();
//        Board.resetBoards();
 //       updateUrlState();
    }
    sortItems() {
        this.items.sort(Item.compareByIndex);
    }
    removeItem(item) {
        this.items = this.items.filter(i => i !== item);
        updateUrlState();
    }
    get uniqueTypes() {
        const types = new Set();
        this.items.forEach(item => {
            item.tags.forEach(tag => {
                if(Board.uniqueTypeTags.includes(tag)) {
                    types.add(tag);
                }
            });
        });
        return types.size;
    }

    save() {        
        const name = prompt("What do you want to name this board?");
        const items = this.items.map(item => ({
            item: item.startItemData,
            startIndex: item.startIndex,
            size: item.size
        }));
        const skills = this.skills.map(skill => ({
            name: skill.name,
            rarity: skill.rarity
        }));
        const player = {
            name: this.player.name,
            maxHealth: this.player.maxHealth,
            gold: this.player.gold,
            income: this.player.income
        };
        const blob = new Blob([JSON.stringify({items, skills, player}, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `BP-${name}.json`;
        a.click();
        URL.revokeObjectURL(url);
    }

    load() {
        this.clear();
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.json';
        input.onchange = e => {
            const file = e.target.files[0];
            const reader = new FileReader();
            
            reader.onload = event => {
                try {
                    const data = JSON.parse(event.target.result);
                    const items = data.items;
                    const skills = data.skills;
                    items.forEach(({item, startIndex, size}) => {
                        let newItem = new Item(item, this);
                        newItem.setIndex(startIndex);
                    });
                    skills.forEach(({name, rarity}) => {
                        this.addSkill(name,{rarity:rarity});
                    });
                    this.player.startPlayerData = data.player;
                    Board.resetBoards();
                    updateUrlState();
                } catch (error) {
                    console.error('Error loading file:', error);
                    alert('Invalid file format');
                }
            };
            
            reader.readAsText(file);
        };
        
        input.click();
    }

    static handleDragStart(e) {
        const draggedElement = e.currentTarget;
        e.dataTransfer.setDragImage(draggedElement, 0, draggedElement.offsetHeight / 2);
        draggedElement.classList.add('dragging');
        document.querySelectorAll('.board-slot').forEach(slot => {
            slot.classList.add('dragtarget');
        });
        // Use requestAnimationFrame to modify the element after the drag has started

        requestAnimationFrame(() => {
            draggedElement.style.opacity = '0';
            draggedElement.style.pointerEvents = 'none';
            draggedElement.style.zIndex = '-1';
        });
        
        // Hide all tooltips when starting to drag
        document.querySelectorAll('.tooltip').forEach(tooltip => {
            tooltip.style.display = 'none';
        });
        
        deleteZone.style.display = 'block';
    }
    static handleTouchStart(touchEvent) {
        touchEvent.preventDefault();
        const element = touchEvent.currentTarget;
        
        // Create synthetic dragstart event
        const syntheticEvent = {
            preventDefault: () => {},
            currentTarget: element,
            dataTransfer: {
                setDragImage: () => {}
            }
        };
        
        Board.handleDragStart(syntheticEvent);
    }

    static handleTouchEnd(touchEvent) {
        const syntheticEvent = {
            currentTarget: touchEvent.currentTarget
        };
        
        Board.handleDragEnd(syntheticEvent);
    }
    static handleDragEnd(e) {
        const draggedElement = e.currentTarget;
        // Restore original element properties
        draggedElement.style.opacity = '1';
        draggedElement.style.pointerEvents = '';  // Reset to default
        draggedElement.style.zIndex = '';  // Reset to default
        
        document.querySelectorAll('.valid-drop, .invalid-drop, .dragging, .dragtarget').forEach(element => {
            element.classList.remove('valid-drop', 'invalid-drop', 'dragging', 'dragtarget');
        });
    

        
        deleteZone.style.display = 'none';

        /*
        // Get the board that originally contained this element
        const sourceBoard = Board.getBoardFromId(draggedElement.closest('.board')?.id);
        if (sourceBoard) {
            // Remove the item from the board's tracking
            sourceBoard.items.delete(draggedElement);
        }
        */
        
        // Re-enable tooltip functionality after drag ends
        document.querySelectorAll('.tooltip').forEach(tooltip => {
            tooltip.style.display = 'none';
        });
    }

    loadMonsterData(monsterData) {            
        this.initialize();
        this.reset();
        let startIndex = 0;
        // Load monster items to the board
        monsterData.items.forEach(item => {      
            let [name,enchant] = Item.stripEnchantFromName(item.name);        
            let itemData = Item.getDataFromName(name);
            if(!itemData) return;
            itemData.rarity = Item.rarityLevels[item.tier];
            itemData.enchant = enchant;
            let newItem = new Item(itemData, this);
            newItem.setIndex(startIndex);
            startIndex += newItem.size;
        });

        
        monsterData.skills.forEach(skill => {
            let skillData = Skill.getDataFromName(skill.name);
            if(!skillData) return;
            skillData.rarity = Item.rarityLevels[skill.tier];
            let newSkill = new Skill(skillData);
            newSkill.name = skill.name;
            this.skills.push(newSkill);
            newSkill.board = this;
            this.skillsElement.appendChild(newSkill.element);
        });

        this.player.startPlayerData.maxHealth = monsterData.health;
        this.player.startPlayerData.name = monsterData.name;

        Board.resetBoards();
        updateUrlState();
    }
    itemTriggered(item) {    
        this.itemTriggers.forEach(func => func(item));
    }

   
}


function getSizeValue(size) {
    switch(size?.toLowerCase()) {
        case 'small': return 1;
        case 'medium': return 2;
        case 'large': return 3;
        default: return 1;
    }
}

export { Board, getSizeValue }; 