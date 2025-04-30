import { Item } from './Item.js';
import { Skill } from './Skill.js';
import { updateUrlState } from './utils.js';
import { setupChangeListeners } from './utils.js';
import { loadFromUrl } from './utils.js';
import LZString from 'lz-string';

class Board {
    player = null; //Will be set when a player is initialized and they create a board
    static boards = new Map();
    static uniqueTypeTags = ['Ammo','Apparel','Aquatic','Core','Dinosaur','Dragon','Food','Friend','Loot','Potion','Property','Ray','Tech','Tool','Toy','Vehicle','Weapon'];
    static possibleChangeAttributes = ['hasSlowedItem','hasHastedItem','hasFrozenItem'];

    constructor(boardId, player, options={editable:true, skills: true}) {
        setupChangeListeners(this, Board.possibleChangeAttributes);
        this.boardId = boardId;
        this.player = player;
        this.player.board = this;
        this.element = document.getElementById(boardId);
        this.options = options;
        this.initialize();
        Board.boards.set(boardId,this);
        this.reset();
        this.player.reset();
    }    
    static transformBoardIds(stateString,transformations) {
        if(!stateString) return stateString;
        let boardState = JSON.parse(LZString.decompressFromEncodedURIComponent(stateString));
        Object.entries(transformations).forEach(([oldBoardId, newBoardId]) => {
            if(newBoardId) {
                boardState.forEach(item => {  
                    if(item.name=='_b_'+oldBoardId) {
                        item.name = '_b_'+newBoardId;
                        return;
                    }                 
                    if(item.board==oldBoardId) {
                        item.board=newBoardId;
                        return;
                    }
                });            
            } else {
                boardState = boardState.filter(item => item.board!=oldBoardId);
            }
        });
        return LZString.compressToEncodedURIComponent(JSON.stringify(boardState));
    }
    loadEncounter(encounter) {
        loadFromUrl(encounter.d);
        window.history.pushState({state: encounter.d}, '', `#${encounter.d}`);
    }
    loadRun(run) {
        if(run && run.d && this.follow) {
            loadFromUrl(run.d);
            window.history.pushState({state: run.d}, '', `#${run.d}`);
        }        
    }
    loadFullRun(run) {
        //const currentEncounter = run.currentEncounter;
        this.fullRunData = run;
        if(run.encounters) {
        let html = '<select id="sim-encounter-select"><option disabled>Encounters</option>';
            run.encounters.forEach( (e,i)=> {
                html += `<option style="background-color: ${e.v=="0"?"#aa4444":"#44aa44"};" value="${i}">${e.v=="0"?"Loss":"Win"} - ${e.name}</option>`;
            });
            html += '</select>';
            this.importElement.innerHTML = html;
            this.importElement.querySelector('#sim-encounter-select').onchange = (e) => {      
                this.loadEncounter(run.encounters[e.target.value]);
            };
        }
    }
    _followingCurrentRunId = null;
    unfollow() {
        firebase.database().ref('users/'+this._follow+"/currentrun").off();
        firebase.database().ref('users/'+this._follow+"/runs/"+this._followingCurrentRunId).off();
        this.importElement.innerHTML = "";
        this._followingCurrentRunId = null;
    }
    set follow(value) {
        if(value==this._follow) return;
        //only follow ourselves for now
        if(value) {
            this.unfollow();
            firebase.database().ref('users/'+value+"/currentrun").on('value', snapshot => {
                const runValue = snapshot.val();
                this.loadRun(runValue);
                if(this._followingCurrentRunId!==runValue.id) {
                    if(this._followingCurrentRunId) {
                        firebase.database().ref('users/'+value+"/runs/"+this._followingCurrentRunId).off();
                    }
                    this._followingCurrentRunId = runValue.id;
                        
                    firebase.database().ref('users/'+value+"/runs/"+runValue.id).on('value', snapshot => {
                        const fullRun = snapshot.val();
                        fullRun.id = runValue.id;
                        this.loadFullRun(fullRun);
                    });
                }
            });
        } else {
           this.unfollow();
        }
        this._follow = value;
    }
    get follow() {
        return this._follow;
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
        if(this.options.editable && this.options.skills) {
            const addSkillButton = document.createElement('div');
            addSkillButton.className = 'add-skill-button';
            addSkillButton.classList.add('editorOpener');
            addSkillButton.innerHTML = "Add Skill➕";
            addSkillButton.onclick = () => {
                this.showSkillSelector();
            };
            this.element.appendChild(addSkillButton);
            this.importElement = document.createElement('div');
            this.importElement.className = 'import-element';
            this.element.appendChild(this.importElement);
            this.createDeleteZone();
        }
        this.createHealthElement();
        this.createSkillsElement();
        this.createGoldElement();
        this.createDPSElement();
        this.createIncomeElement();
        this.createWinRateElement();
        this.createPlayerElement();
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
        if(this.options.editable)updateUrlState();
    }
    get activeItems() {
        return this.items.filter(item => !item.isDestroyed);
    }
    get activeItemCount() {
        return this.activeItems.length;
    }

    reset() {
        setupChangeListeners(this, Board.possibleChangeAttributes );
        this.inCombat = false;
        this.critPossible=true;
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
        this.reloadTriggers = new Map(); //functions to call when any item on this board is reloaded
        this.transformTriggers = new Map(); //functions to call when any item on this board is transformed
        this.startOfFightTriggers = new Map();
        this.itemDestroyedTriggers = new Map(); //functions to call when an item on this board is destroyed
        this.healTriggers = [];
        this.shieldTriggers = new Map();
        this.ammoTriggers = [];
        this.largeItemTriggers = [];
        this.mediumItemTriggers = [];
        this.smallItemTriggers = [];
        this.uniqueTypeTagCache = [];
        
        this.resetItems();
        if(this.player?.battle) {
            this.player.battle.battleTimeDiff = 0;
            this.updateHealthElement();
            this.updateDPSElement();
            this.updatePlayerElement();
            if(this.winRateElement) {
                this.winRateElement.style.display = "none";
            }
        }
        
        this.updateGoldElement();
        this.updateIncomeElement();
    }
    setup() {
        this.setupItems();
    }
    setupItems() {
        if(this.items.length>0 && !this.items[this.items.length-1].tags.includes("Rightmost")) {
            this.items[this.items.length-1].tags.push("Rightmost");
        }
        if(this.items.length>0 && !this.items[0].tags.includes("Leftmost")) {
            this.items[0].tags.push("Leftmost");
        }
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
        if(!this.options.editable) return;
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
                    <input autocomplete="off" type=text id='skill-selector-filter'>
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
                <img src="/images/items/${Item.cleanName(skillName)}.avif" alt="${skillName}">
                <span>${skillName}</span>
            `;
            this.skillSelector.querySelector('.skill-selector-body').appendChild(skillItem);
            skillItem.onclick = () => {
                const rarity = this.skillSelector.querySelector('#skill-selector-rarity').value;
                this.addSkill(skillName,{rarity:rarity});
                this.skillSelector.style.display = 'none';
                this.player.reset();
                this.player.setup();
                if(this.options.editable) updateUrlState();
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
                    <img src="/images/items/${Item.cleanName(skillName)}.avif" style='box-shadow: 1px 1px 10px 1px rgba(14,14, 14, 1);'>
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
        this.critPossible=false;
        this.critTriggers.forEach(func => func(item));
        this.critPossible=true;
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
         (this.player.battle.battleTimeDiff/1000).toFixed(0)+"s"+
        "   DPS: " + (this.damageApplied/(this.player.battle.battleTimeDiff/1000)).toFixed(0)+
        " / HPS: "+(this.healingApplied/(this.player.battle.battleTimeDiff/1000)).toFixed(0)+
        " / SPS: "+(this.shieldApplied/(this.player.battle.battleTimeDiff/1000)).toFixed(0) +
        (this.damageApplied>0?"<div class='totals'><font title='Total Damage Done' class='Damage'>"+(this.damageApplied).toFixed(0)+"</font>":"") +
        (this.player.hostileTarget.poisonDamageReceived>0?" <font title='Total Poison Damage Done' class='Poison'>"+this.player.hostileTarget.poisonDamageReceived.toFixed(0)+"</font>":"") +
        (this.player.hostileTarget.burnDamageReceived>0?" <font title='Total Burn Damage Done' class='Burn'>"+this.player.hostileTarget.burnDamageReceived.toFixed(0)+"</font>":"") +
        (this.healingApplied>0?" <font title='Total Healing Done' class='Heal'>"+this.healingApplied.toFixed(0)+"</font>":"") +
        (this.shieldApplied>0?" <font title='Total Shield Applied' class='Shield'>"+this.shieldApplied.toFixed(0)+"</font>":"") +
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
    updatePlayerElement() {
        if(!this.playerElement) return;
        if(monsters[this.player?.name]) {
            this.playerElement.style.backgroundImage = `url(/images/monsters/${monsters[this.player?.name].id}.avif)`;
        } else if(Item.characterTags.includes(this.player?.name)) {
            this.playerElement.style.backgroundImage = `url(images/fromBT/${this.player?.name}.png)`;
        } else if(Item.characterTags.includes(this.player?.hero)) {
            this.playerElement.style.backgroundImage = `url(images/fromBT/${this.player?.hero}.png)`;
        }else {
            this.playerElement.style.backgroundImage = "none";
        }
        if(this.options.editable) {
            this.playerElement.classList.add('editorOpener');
            this.playerElement.onclick = () => {
                this.player.openEditor();
            }
        }
        this.playerElement.innerHTML = `<span>${this.player?.name}</span>`;
    }
    setAsWinner() {
        if(this.playerElement) {
            this.playerElement.style.backgroundImage = "url(images/victory.webp)";
        }
    }
    setAsLoser() {
        if(this.playerElement) {
            this.playerElement.style.backgroundImage = "url(images/defeat.webp)";
        }
    }
    updateGoldElement() {
        this.goldElement.textContent = this.player?.gold;
    }
    updateIncomeElement() {
        this.incomeElement.textContent = "+" +this.player?.income;
    }
    
    
    clone(newPlayer) {
        const clone = new Board("cloned-"+this.boardId,newPlayer);
        clone.items = this.items.map(item => item.clone(clone));
        clone.skills = this.skills.map(skill => skill.clone(clone));
        //clone.reset();
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
        let newSkill = new Skill(newSkillData, this,this.options.editable);
        this.skills.push(newSkill);
        this.skillsElement.appendChild(newSkill.element);
        newSkill.setup();
    }
    removeSkill(skill) {
        this.skills = this.skills.filter(s => s !== skill);
        this.skillsElement.removeChild(skill.element);
        this.player.reset();
        this.player.setup();
        if(this.options.editable) updateUrlState();
    }
    createPlayerElement() {
        this.playerElement = document.createElement('div');
        this.playerElement.className = 'player-element';
        if(this.player.name) {
            this.playerElement.innerHTML = `<span>${this.player.name}</span>`;
        } else {
            this.playerElement.innerHTML = "<span>Player</span>";
        }
        this.element.appendChild(this.playerElement);
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
        
        if(this.options.editable) {
            this.healthElement.classList.add('editorOpener');
            this.healthElement.onclick = () => {
                this.player.openEditor();
            }
        }
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

        this.updateHealthElement();
    }
    createGoldElement() {
        this.goldElement = document.createElement('div');
        this.goldElement.className = 'gold-element';
        this.goldElement.title = "Gold";
        if(this.options.editable) {
            this.goldElement.classList.add('editorOpener');
            this.goldElement.onclick = () => {
                this.player.openEditor();
                this.player.editorElement.querySelector('#player-gold').focus();
            }
        }
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
        if(this.options.editable) {
            this.incomeElement.classList.add('editorOpener');
            this.incomeElement.onclick = () => {
                this.player.openEditor();
                this.player.editorElement.querySelector('#player-income').focus();
            }
        }
        this.element.appendChild(this.incomeElement);
    }



    createSkillsElement() {
        this.skillsElement = document.createElement('div');
        this.skillsElement.className = 'skills-element';
        this.element.appendChild(this.skillsElement);
    }


    startBattle() {
        this.inCombat = true;
        this.damageApplied = 0;
        this.healingApplied = 0;
        this.shieldApplied = 0;
        this.items.forEach(item => {if(item.progressBar) item.progressBar.style.display = 'block'});
        this.player.shieldChanged((newShield,oldShield) => {
            if(newShield>oldShield) {
                this.shieldApplied += newShield-oldShield;
            }
        });        
        this.startOfFightTriggers.forEach(func => func());
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

    giveAll(tag,value,stat) {
        this.items.forEach(item => {
            if(item.tags.includes(tag)) {
                item.gain(value,stat);
            }
        });
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
                        const openSpacesToTheLeft = this.getOpenSpacesToTheLeft(someItem,foundItem);
                        const openSpacesToTheRight =this.getOpenSpacesToTheRight(someItem,foundItem);                        

                        //how much is the left side of the dragging item over the right side of someItem
                        const rightOverlap = someItem.startIndex+someItem.size - startIndex;
                        
                        //how much is the right side of the dragging item over the left side of someItem
                        const leftOverlap = startIndex+draggingElementSize-(someItem.startIndex);
                        if(rightOverlap<leftOverlap && openSpacesToTheLeft>=rightOverlap) {
                            //we can push the item to the left) {
                                this.shiftItemsToTheLeft(someItem,rightOverlap,foundItem);
                               if(foundItem) foundItem.startIndex=startIndex-(rightOverlap-foundItem.size);
                                return true;
                        } else {
                            //we can push the item to the right
                            if(openSpacesToTheRight>=draggingElementSize + (startIndex-someItem.startIndex)) {
                                this.shiftItemsToTheRight(someItem, leftOverlap,foundItem);
                                if(foundItem) foundItem.startIndex=startIndex-(leftOverlap-foundItem.size);
                                return true;
                            }
                        }
                        if(openSpacesToTheLeft>=rightOverlap) {
                            this.shiftItemsToTheLeft(someItem, rightOverlap,foundItem);
                            if(foundItem) foundItem.startIndex=startIndex;
                            return true;
                        }  
                        if(openSpacesToTheRight>=leftOverlap) {
                            this.shiftItemsToTheRight(someItem,rightOverlap,foundItem);
                            if(foundItem) foundItem.startIndex=startIndex;
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
    createDeleteZone() {
        // Initialize delete zone globally
        this.deleteZone = document.createElement('div');
        this.deleteZone.className = 'delete-zone';
        this.deleteZone.textContent = ' Drop here to delete';
        
        // Add dragover and drop handlers for delete zone
        this.deleteZone.addEventListener('dragover', (e) => {
            e.preventDefault();
            e.dataTransfer.dropEffect = 'move';
            this.deleteZone.classList.add('active');
        });

        this.deleteZone.addEventListener('dragleave', () => {
            this.deleteZone.classList.remove('active');
        });

        this.deleteZone.addEventListener('drop', (e) => {
            e.preventDefault();
            const draggingElement = document.querySelector('.dragging');
            if (draggingElement) {
                // Get the source board and remove the item from its tracking
                const sourceBoard = Board.getBoardFromId(draggingElement.closest('.board')?.id);
                if (sourceBoard) {
                    // Remove the item from the board's tracking by matching the element
                    sourceBoard.items = sourceBoard.items.filter(item => item.element !== draggingElement);
                }
                
                draggingElement.classList.add('removing');
                setTimeout(() => {
                    draggingElement.remove();
                    // Clean up any ghost elements
                    const ghost = document.querySelector('.drag-ghost');
                    if (ghost) ghost.remove();
                }, 500);
            }
            this.deleteZone.classList.remove('active');
            this.deleteZone.style.display = 'none';
            this.player.battle.resetBattle();
            if(this.options.editable) updateUrlState();
        }); 
        this.element.appendChild(this.deleteZone);
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
            itemData = items[draggingElement.getAttribute('data-name')];
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
            this.player.battle.resetBattle();
            if(this.options.editable) updateUrlState();
        }
        document.querySelectorAll('.valid-drop, .invalid-drop, .dragging').forEach(element => {
            element.classList.remove('valid-drop', 'invalid-drop', 'dragging');
        });

        Board.boards.forEach(board => {
            if(board.deleteZone) {
                board.deleteZone.style.display = 'none';
            }
        });
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
        if(this.options.editable) updateUrlState();
    }
    uniqueTypeTagCache = [];
    get uniqueTypeTags() {
        if(this.uniqueTypeTagCache.length>0) return this.uniqueTypeTagCache;
        const types = new Set();
        this.items.forEach(item => {
            item.tags.forEach(tag => {
                if(Board.uniqueTypeTags.includes(tag)) {
                    types.add(tag);
                }
            });
        });
        this.uniqueTypeTagCache = Array.from(types);
        return this.uniqueTypeTagCache;
    }
    get uniqueTypes() {
        if(this.uniqueTypeTagCache.length>0) return this.uniqueTypeTagCache.length;        
        return this.uniqueTypeTags.length;
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
                    this.reset();
                    this.setup();
                    if(this.options.editable) updateUrlState();
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
        Board.boards.forEach(board => {
            if(board.items.some(item => item.element === draggedElement)) {              
                board.deleteZone.style.display = 'block';
            }
        });    
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
    

        Board.boards.forEach(board => {
                if(board.deleteZone) board.deleteZone.style.display = 'none';
        });    
        Board.boards.forEach(board => {
            board.items.forEach(item => {
                item.updateElementPosition();
            });
            board.items.sort(Item.compareByIndex);
        });
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
            itemData.tier = item.tier;
            itemData.enchant = item.enchant || enchant;
            let newItem = new Item(itemData, this);
            newItem.setIndex(startIndex);
            startIndex += newItem.size;
        });

        
        monsterData.skills.forEach(skill => {
            let skillData = Skill.getDataFromName(skill.name);
            if(!skillData) return;
            skillData.name = skill.name;
            skillData.tier = skill.tier;
            let newSkill = new Skill(skillData);
            newSkill.name = skill.name;
            this.skills.push(newSkill);
            newSkill.board = this;
            this.skillsElement.appendChild(newSkill.element);
        });

        this.player.startPlayerData.maxHealth = monsterData.health;
        this.player.startPlayerData.name = monsterData.name;
        this.player.startPlayerData.regen = monsterData.regen||0;

        this.player.battle.resetBattle();
        if(this.options.editable) updateUrlState();
    }
    itemTriggered(item) {    
        this.critPossible=false;
        this.itemTriggers.forEach(func => func(item));
        this.critPossible=true;
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