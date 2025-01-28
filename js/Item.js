class Item {
    static hiddenTags = ['Damage', 'Crit'];
    static itemID = 0;
    
    constructor(itemData, board) {
        if(!itemData) {
            console.log("Item data is undefined");
            return;
        }
        this.id = Item.itemID++;
        this.startItemData = itemData;
        this.board = board;
        Object.assign(this, this.startItemData);
        
        // Ensure text is always an array
        this.text = Array.isArray(this.text) ? this.text : [this.text].filter(Boolean);
        
        this.isEditable = true;
        this.size = this.tags.includes('Small') ? 1 : this.tags.includes('Medium') ? 2 : 3;
        if(this.startItemData.cooldown) {
            this.cooldown = (this.startItemData.cooldown || 0) * 1000;
        }
        this.element = this.createElement();

        if(itemData.cooldown) {
            this.cooldown = this.startItemData.cooldown * 1000;
            this.progressBar = document.createElement('div'); 
            this.progressBar.className = 'battleItemProgressBar';

            this.hasteIndicator = document.createElement('div');
            this.hasteIndicator.className = 'haste-indicator hidden';
            this.progressBar.appendChild(this.hasteIndicator);

            this.slowIndicator = document.createElement('div');
            this.slowIndicator.className = 'slow-indicator hidden';
            this.progressBar.appendChild(this.slowIndicator);
    
            this.element.appendChild(this.progressBar);
        }

        this.priceTagElement = document.createElement('div');
        this.priceTagElement.className = 'price-tag';
        this.element.appendChild(this.priceTagElement);
        
        this.triggerValuesElement = document.createElement('div');
        this.triggerValuesElement.className = 'trigger-values';
        this.element.appendChild(this.triggerValuesElement);

        this.multicastElement = document.createElement('div');
        this.multicastElement.className = 'multicast-element';
        this.triggerValuesElement.appendChild(this.multicastElement);

        if(this.tags.includes("Weapon")) {
            this.damageElement = document.createElement('div');
            this.damageElement.className = 'damage-element';
            this.triggerValuesElement.appendChild(this.damageElement);
        }

        if(this.tags.includes("Burn")) {    
            this.burnElement = document.createElement('div');
            this.burnElement.className = 'burn-element';
            this.triggerValuesElement.appendChild(this.burnElement);
        }

        if(this.tags.includes("Poison")) {
            this.poisonElement = document.createElement('div');
            this.poisonElement.className = 'poison-element';
            this.triggerValuesElement.appendChild(this.poisonElement);
        }
        if(this.tags.includes("Shield")) {
            this.shieldElement = document.createElement('div');
            this.shieldElement.className = 'shield-element';
            this.shieldElement.textContent = this.shield;
            this.triggerValuesElement.appendChild(this.shieldElement);
        }

        this.reset();

        if(board) {
            board.addItem(this);
        }
    }
    updateTriggerValuesElement() {
        if(this.shieldElement) this.shieldElement.textContent = Number(this.shield).toFixed(1);
        if(this.burnElement) this.burnElement.textContent = Number(this.burn).toFixed(1);
        if(this.poisonElement) this.poisonElement.textContent = Number(this.poison).toFixed(1);
        if(this.damageElement) this.damageElement.textContent = Number(this.damage).toFixed(1);
        if(this.multicastElement && this.multicast>0) this.multicastElement.textContent = "x"+Number(this.multicast).toFixed(0);
        else this.multicastElement.style.display = 'none';
        this.priceTagElement.textContent = Number(this.value).toFixed(0);
    }
    reset() {
        Object.assign(this, this.startItemData);
        this.size = this.tags.includes('Small') ? 1 : this.tags.includes('Medium') ? 2 : 3;
        if(this.startItemData.cooldown) {
            this.cooldown = (this.startItemData.cooldown || 0) * 1000;
        }
        this.isDestroyed = false;
        this.hasteTimeRemaining = 0;
        this.slowTimeRemaining = 0;
        this.numTriggers = 0;
        this.effectiveBattleTime = 0;
        this.pendingMulticasts = 0;
        if(!this.crit) this.crit = 0;

        this.value = this.startItemData.value || this.getInitialValue();
        this.damage = this.calculateDamage();
        this.burn = this.calculateBurn();
        this.poison = this.calculatePoison();
        this.heal = this.calculateHeal();
        this.ammoRemaining = this.ammo;

        this.triggerFunctions = [];
        this.adjacentItemTriggers = []; //functions to call when any item adjacent to this item is triggered
        this.hasteTriggers = []; //functions to call when haste is applied to this item
        this.slowTriggers = []; //functions to call when slow is applied to this item

        /*
        this.applyWeaponTrigger();
        this.applySlowTrigger();
        this.applyHasteTrigger();
        this.applyPoisonTrigger();
        this.applyBurnTrigger();
        this.applyHealTrigger();
        this.applyShieldTrigger();
        this.applyItemSizeTrigger();
        */

        this.text.forEach(text => this.setupTextFunctions(text));
        this.updateTriggerValuesElement();

        if(this.progressBar) {
            this.progressBar.style.bottom = '-5px';
            this.progressBar.style.display = 'none';   
            this.hasteIndicator.classList.add('hidden');
            this.slowIndicator.classList.add('hidden');             
        }        
    }

    getInitialValue() {
        const rarityIndex = ['Bronze', 'Silver', 'Gold', 'Diamond', 'Legendary'].indexOf(this.rarity || 'Bronze');
        return this.size * Math.pow(2, rarityIndex);           
    }

    adjacentItemTriggered(item) {
        this.adjacentItemTriggers.forEach(func => func(item));
    }

    createElement() {
        const mergedSlot = document.createElement('div');
        mergedSlot.className = 'merged-slot';
        
        // Add classes for each tag
        if (this.tags && Array.isArray(this.tags)) {
            this.tags.forEach(tag => {
                mergedSlot.classList.add(`tag-${tag.toLowerCase()}`);
            });
        }
        mergedSlot.classList.add(this.rarity || 'Bronze');
        mergedSlot.style.width = `${this.size * 80 + this.startIndex*2}px`;
        mergedSlot.style.left = `calc(${this.startIndex * 80 + this.startIndex*2}px)`;
        mergedSlot.draggable = true;
        mergedSlot.setAttribute('data-size', this.size);
        mergedSlot.addEventListener('click', () => {
            this.editPopup();
        });
        
        if (this.icon) {
            const icon = document.createElement('img');
            icon.src = this.icon;
            icon.draggable = false;
            mergedSlot.appendChild(icon);
        }

        mergedSlot.addEventListener('dragstart', Board.handleDragStart);
        mergedSlot.addEventListener('dragend', Board.handleDragEnd);

        this.tooltip = this.createTooltipElement();
        mergedSlot.appendChild(this.tooltip);
        
        // Add event listeners
        mergedSlot.addEventListener('mouseenter', () => {
            this.tooltip.style.display = 'block';
        });
        
        mergedSlot.addEventListener('mouseleave', () => {
            this.tooltip.style.display = 'none';
        });
        
        return mergedSlot;
    }
    
    createTooltipElement() {
        const tooltip = document.createElement('div');
        tooltip.className = 'tooltip';
        tooltip.style.pointerEvents = 'none';

        // Filter out hidden tags
        let tagsArray = [];
        if (this.tags) {
            if (Array.isArray(this.tags)) {
                tagsArray = this.tags.filter(tag => !Item.hiddenTags.includes(tag));
            } else if (typeof this.tags === 'object') {
                tagsArray = Object.entries(this.tags)
                    .filter(([key, value]) => value && !Item.hiddenTags.includes(key))
                    .map(([key, _]) => key);
            }
        }
        
        // Create HTML content with structured layout
        let tooltipContent = `
            <div class="tooltip-content">
                ${this.ammo ? `
                    <div class="tooltip-ammo">
                        Ammo<br>${this.ammo}
                    </div>
                ` : ''}
                ${this.cooldown ? `
                    <div class="tooltip-cooldown-circle ${this.rarity||'Bronze'}Border">${this.cooldown/1000}<span class="unit">SEC</span></div>
                ` : ''}
                <div class="tooltip-tags">
                    ${tagsArray.map(tag => `<span class="tag tooltip-tag-${tag.toLowerCase()}">${tag}</span>`).join('')}
                </div>
                <div class="tooltip-name ${this.rarity||'Bronze'}Border">${this.name}</div>
                <div class="tooltip-main ${this.rarity||'Bronze'}Border">                    
                    <div class="tooltip-main-text">
                        ${Array.isArray(this.text) ? 
                            this.text.join('<br>') : 
                            (this.text || '')}
                    </div>
                    ${this.crit ? `
                    <div class="tooltip-divider"></div>
                    <div class="tooltip-crit">
                       Crit Chance: ${this.crit}%
                    </div>
                ` : ''}
                </div>
                <div class="tooltip-bottom">
                    <div class="tooltip-bottom-text">
                        ${this.bottomText || ''}
                    </div>
                </div>
            </div>
        `;
        
        tooltip.innerHTML = tooltipContent;
        tooltip.style.display = 'none'; // Hidden by default
        
        return tooltip;
    }

    static getDataFromName(itemName) {
        return items[itemName];
    }
    static constructFromName(itemName, board) {
        let itemData = Item.getDataFromName(itemName);
        return new Item(itemData, board);
    }
    setIndex(index) {
        this.startIndex = index;
        this.element.style.left = `${2+(index * 82)}px`;
        // Sort the board's items array after changing an index
        if (this.board) {
            this.board.sortItems();
            this.board.resetItems();
            this.updateTooltip();
        }
    }
    updateTooltip() {
        const newTooltip = this.createTooltipElement();
        $(this.tooltip).replaceWith(newTooltip);
        this.tooltip = newTooltip;  // Update the reference to point to the new element
    }
    calculateDamage() {
        if (!this.tags.includes('Weapon')) return 0;
        const damageRegex = /Deal (?:\(([^)]+)\)|(\d+)) damage/i;
        
        for (const textElement of this.text) {
            const match = textElement.match(damageRegex);
            if (match) {
                return match[1] ? getRarityValue(match[1], this.rarity) : parseInt(match[2]);
            }
        }
        return 0;
    }
    calculateBurn() {
        if (!this.tags.includes('Burn')) return 0;
        const burnRegex = /Burn (?:\(([^)]+)\)|(\d+))/i;
        
        for (const textElement of this.text) {
            const match = textElement.match(burnRegex);
            if (match) {
                return match[1] ? getRarityValue(match[1], this.rarity) : parseInt(match[2]);
            }
        }
        return 0;
    }
    calculateHeal() {
        if (!this.tags.includes('Heal')) return 0;
        const healRegex = /Heal (?:\(([^)]+)\)|(\d+))/i;
        
        for (const textElement of this.text) {
            const match = textElement.match(healRegex);
            if (match) {
                return match[1] ? getRarityValue(match[1], this.rarity) : parseInt(match[2]);
            }
        }
        return 0;
    }
    calculateShield() {
        if (!this.tags.includes('Shield')) return 0;
        const shieldRegex = /Shield (?:\(([^)]+)\)|(\d+))/i;
        
        for (const textElement of this.text) {
            const match = textElement.match(shieldRegex);
            if (match) {
                return match[1] ? getRarityValue(match[1], this.rarity) : parseInt(match[2]);
            }
        }
        return 0;
    }
    calculatePoison() {
        if (!this.tags.includes('Poison')) return 0;
        const poisonRegex = /Poison (?:\(([^)]+)\)|(\d+))/i;
        
        for (const textElement of this.text) {
            const match = textElement.match(poisonRegex);
            if (match) {
                return match[1] ? getRarityValue(match[1], this.rarity) : parseInt(match[2]);
            }
        }
        return 0;
    }

    applyHaste(duration) {
        this.hasteTimeRemaining += duration * 1000;
        this.hasteTriggers.forEach(func => func(this));
        this.board.hasteTriggers.forEach(func => func(this));
    }

    applySlow(duration) {
        this.slowTimeRemaining += duration * 1000;
        this.board.onSlowTriggers.forEach(func => func());
    }

    updateProgressBar(progress) {
        this.progressBar.style.bottom = `calc(${progress}% - 5px)`;        
        this.updateStatusIndicators();
    }

    updateCombat(timeDiff) {
        if (!this.progressBar || this.isDestroyed) return;

        // Calculate effective time considering haste/slow
        let effectiveTimeDiff = timeDiff;
        if (this.hasteTimeRemaining > 0) effectiveTimeDiff *= 2; // haste multiplier
        if (this.slowTimeRemaining > 0) effectiveTimeDiff *= 0.5; // slow multiplier

        // Update status durations
        if (this.hasteTimeRemaining > 0) this.hasteTimeRemaining -= timeDiff;
        if (this.slowTimeRemaining > 0) this.slowTimeRemaining -= timeDiff;

        if(this.isHasted) {
            this.hasteTimeRemaining -= timeDiff;
            if(this.hasteTimeRemaining <= 0) {
                this.isHasted = 0;
            }
        }
        if(this.isSlowed) {
            this.slowTimeRemaining -= timeDiff;
            if(this.slowTimeRemaining <= 0) {
                this.isSlowed = 0;
            }
        }
        if(this.ammo && this.ammoRemaining<=0 && this.numTriggers < Math.floor((effectiveTimeDiff+this.effectiveBattleTime) / this.cooldown)) {
            //don't progress battle time if no ammo is remaining and the item is ready to trigger
            return;
        }
        this.effectiveBattleTime += effectiveTimeDiff;
        // Update progress and check for triggers
        const progress = (this.effectiveBattleTime % this.cooldown) / this.cooldown * 100;
        this.updateProgressBar(progress);

        const newTriggers = Math.floor(this.effectiveBattleTime / this.cooldown);
        if (newTriggers > this.numTriggers && (!this.ammo || this.ammoRemaining>0)) {
            if(this.ammo) this.ammoRemaining--;
            if(this.multicast>0) {
                this.pendingMulticasts+=parseInt(this.multicast)-1;    
            }
            this.numTriggers = newTriggers;
            this.trigger();
        }
        if(this.pendingMulticasts>0) {
            this.pendingMulticasts--;
            this.trigger();
        }
    }

    trigger() {
        this.triggerFunctions.forEach(func => func());
        this.board.itemTriggered(this);
        this.getAdjacentItems().forEach(item => item.adjacentItemTriggered(this));
    }

    dealDamage(damage) {
        let crit="";
        // Handle critical hits using itemData.crit (0-100) instead of critChance
        if (this.crit && battleRandom() < (this.crit / 100)) {
            damage *= 2;
            crit =" critically strikes and";
        }
        
        this.board.player.hostileTarget.takeDamage(damage);
        log(this.board.player.name + "'s " + this.name + crit +
            " deals "+ damage+" damage to " +
            this.board.player.hostileTarget.name);            
    }
    getWeaponTriggerFunction(text) {
        let match;
        if(!this.tags.includes("Weapon")) return null;

        //Deal damage equal to ( 20% » 30% ) of your enemy's Max Health.
        let damageRegex = /Deal damage equal to \(\s*(\d+)%\s*»\s*(\d+)%\s*\) of your enemy's Max Health/i;
        match = text.match(damageRegex);
        if(match) {
            const dmgMultiplier = getRarityValue(`${match[1]}»${match[2]}`, this.rarity);
            this.damage = this.board.player.hostileTarget.maxHealth*dmgMultiplier/100;         
            return () => {
                this.damage = this.board.player.hostileTarget.maxHealth*dmgMultiplier/100;      
                this.dealDamage(this.damage);
                this.updateTriggerValuesElement();
            };
        }

        //Your weapons gain ( 2 » 4 » 6 » 8 ) damage for the fight.
        damageRegex = /^\s*Your weapons gain (?:\(([^)]+)\)|(\d+)) damage for the fight/i;
        match = text.match(damageRegex);
        if(match) {
            const dmgGain = getRarityValue(`${match[1]}»${match[2]}`, this.rarity);
            return () => {
                this.board.items.forEach(item => {
                    if(item.tags.includes("Weapon")) {
                        item.damage += dmgGain;
                        log(item.name + " gained " + dmgGain + " damage for the fight");
                        item.updateTriggerValuesElement();
                    }
                });
            };
        }

        //Adjacent Weapons gain ( 5 » 10 ) Damage for the fight.
        damageRegex = /Adjacent Weapons gain \(\s*(\d+)\s*»\s*(\d+)\s*\) Damage for the fight/i;
        match = text.match(damageRegex);
        if(match) {
            const dmgGain = getRarityValue(`${match[1]}»${match[2]}`, this.rarity);
            const adjacentWeapons = this.getAdjacentItems().filter(item => item.tags.includes("Weapon"));
            return () => {
                adjacentWeapons.forEach(item => {
                    item.damage += dmgGain;
                    log(this.name + " gave " + item.name + " " + dmgGain + " damage for the fight");
                    item.updateTriggerValuesElement();
                });
            };
        }

        //Deal damage equal to the highest Shield value of items you have.  
        damageRegex = /Deal damage equal to the highest Shield value of items you have/i;
        match = text.match(damageRegex);
        if(match) {
            const shieldItems = this.board.items.filter(item => item.tags.includes("Shield"));
            this.damage = shieldItems.reduce((max, item) => Math.max(max, item.shield), 0);
            this.board.shieldValuesChangedTriggers.set(this.id, () => {
                this.damage = shieldItems.reduce((max, item) => Math.max(max, item.shield), 0);
                this.updateTriggerValuesElement();
            });
            return () => {
                this.damage = shieldItems.reduce((max, item) => Math.max(max, item.shield), 0);
                this.dealDamage(this.damage);
                this.updateTriggerValuesElement();
            };
        } 
               
        //it also gains ( +10 » +20 » +30 » +40 ) damage.
        damageRegex = /it also gains\s*\(\s*\+?(\d+)\s*»\s*\+?(\d+)\s*»\s*\+?(\d+)\s*»\s*\+?(\d+)\s*\)\s*damage/i;
        match = text.match(damageRegex);
        if(match) {
            const dmgGain = getRarityValue(`${match[1]}»${match[2]}»${match[3]}»${match[4]}`, this.rarity);
            return (item) => {
                item.damage += dmgGain;
                log(item.name + " gained " + dmgGain + " damage");
                item.updateTriggerValuesElement();
            };
        }

        //Deal ( 10 » 20 » 30 » 40 ) damage.
        damageRegex = /Deal (?:\(([^)]+)\)|(\d+)) damage/i;
        match = text.match(damageRegex);
        if(match) {
            const damageValue = match[1] ? getRarityValue(match[1], this.rarity) : parseInt(match[2]);
            this.damage = damageValue;
            return () => {   
                this.dealDamage(this.damage);        
            };
        }

        return null;
    }
    isHasteTargetable() {
        return this.cooldown && this.isDestroyed == false;
    }
    isSlowTargetable() {
        return this.cooldown && this.isDestroyed == false;
    }
        
    getSlowTriggerFunctionFromText(text) {        
        let slowRegex = /Slow (?:\(([^)]+)\)|(\d+)) (?:(\w+) )?items?\(?s?\)?\s*for (?:\(([^)]+)\)|(\d+)) second/i;
        if (slowRegex.test(text)) {            
            const [_, itemsRange, singleItemCount, requiredTag, durationRange, singleDuration] = text.match(slowRegex);
                
                const numItemsToSlow = itemsRange ? 
                    getRarityValue(itemsRange, this.rarity) : 
                    parseInt(singleItemCount);
                const duration = durationRange ? 
                    getRarityValue(durationRange, this.rarity) : 
                    parseInt(singleDuration);
            
            return () => {
                let items = Array.from(this.board.player.hostileTarget.board.items);
                items = items.filter(i => i.isSlowTargetable());

                    if (requiredTag) {
                        items = items.filter(i => i.tags && i.tags.includes(requiredTag));
                    }
                    const selectedItems = items
                        .sort(() => battleRandom() - 0.5)
                        .slice(0, numItemsToSlow);
                    
                    selectedItems.forEach(i => {
                        i.applySlow(duration);
                        log(this.name + " slowed " + i.name + " for " + duration + " seconds");
                });
            };
        }
        return null;
    }

    getHasteTriggerFunctionFromText(text) {        
        let hasteRegex = /^Haste (?:\(([^)]+)\)|(\d+)) (?:(\w+) )?item.* for (?:\(([^)]+)\)|(\d+)) second/;
        if (hasteRegex.test(text)) {                
            const [_, itemsRange, singleItemCount, requiredTag, durationRange, singleDuration] = text.match(hasteRegex);
                
                const numItemsToHaste = itemsRange ? 
                    getRarityValue(itemsRange, this.rarity) : 
                    parseInt(singleItemCount);
                const duration = durationRange ? 
                    getRarityValue(durationRange, this.rarity) : 
                    parseInt(singleDuration);
            
            return () => {
                let items = Array.from(this.board.items);
                items = items.filter(i => i.cooldown != null);
                
                    if (requiredTag) {
                        items = items.filter(i => i.tags && i.tags.includes(requiredTag));
                    }
                    const selectedItems = items
                        .sort(() => battleRandom() - 0.5)
                        .slice(0, numItemsToHaste);
                
                    selectedItems.forEach(i => {
                        i.applyHaste(duration);
                        log(this.name + " hasted " + i.name + " for " + duration + " seconds");
                    });
            };
        }
        hasteRegex = /^Haste your items for (?:\(([^)]+)\)|(\d+)) second/i;
        if (hasteRegex.test(text)) {
            const duration = getRarityValue(text.match(hasteRegex)[1], this.rarity);
            return () => {
                this.board.items.forEach(i => i.applyHaste(duration));
                log(this.name + " hasted all items for " + duration + " seconds");
            };
        }
        //Haste another item for ( 1 » 2 » 3 » 4 ) second(s).
        hasteRegex = /^Haste another item for (?:\(([^)]+)\)|(\d+)) second/i;
        if (hasteRegex.test(text)) {
            const duration = getRarityValue(text.match(hasteRegex)[1], this.rarity);
            return () => {
                let itemToHaste = this.board.items.filter(i => i.cooldown != null).sort(() => battleRandom() - 0.5)[0];
                itemToHaste.applyHaste(duration);
                log(this.name + " hasted "+itemToHaste.name+" for " + duration + " seconds");
            };
        }
        hasteRegex = /^Haste the item to the right of this/i;
        if (hasteRegex.test(text)) {
            const itemToHaste = this.getItemToTheRight();
            if(itemToHaste) {
                itemToHaste.applyHaste(duration);
                log(this.name + " hasted "+itemToHaste.name+" for " + duration + " seconds");
            }
        }
        hasteRegex = /^Haste the item to the left of this/i;
        if (hasteRegex.test(text)) {
            const itemToHaste = this.getItemToTheLeft();
            if(itemToHaste) {
                itemToHaste.applyHaste(duration);
                log(this.name + " hasted "+itemToHaste.name+" for " + duration + " seconds");
            }
        }
        hasteRegex = /^Haste it for (?:\(([^)]+)\)|(\d+)) second/i;
        if (hasteRegex.test(text)) {
            const duration = getRarityValue(text.match(hasteRegex)[1], this.rarity);
            return (item) => {
                item.applyHaste(duration);
                log(this.name + " hasted "+item.name+" for " + duration + " seconds");
            };
        }
        return null;
    }

    getPoisonTriggerFunctionFromText(text) {
        if(!this.tags.includes("Poison")) return null; 
        let regex = /Poison (?:\(([^)]+)\)|(\d+))/i;
        let match = text.match(regex);
        if(match) {
            const poisonAmount = getRarityValue(match[1], this.rarity);
            this.poison = poisonAmount;
            this.updateTriggerValuesElement();
            return () => {                
                this.board.player.hostileTarget.poison += this.poison;
                log(this.name + " poisoned " + this.board.player.hostileTarget.name + " for " + this.poison);
            };
        }
        return null;
    }

    getBurnTriggerFunctionFromText(text) {
        if(!this.tags.includes("Burn")) return null; 
        let regex = /Burn (?:\(([^)]+)\)|(\d+))/i;
        let match = text.match(regex);
        if(match) {
            const burnAmount = getRarityValue(match[1], this.rarity);
            this.burn = burnAmount;
            this.updateTriggerValuesElement();
            return () => {                
                this.board.player.hostileTarget.applyBurn(this.burn);
                log(this.name + " burned " + this.board.player.hostileTarget.name + " for " + this.burn);
            };
        }
        return null;
    }

    getHealTriggerFunctionFromText(text) {
        if(!this.tags.includes("Heal")) return null; 
        let regex = /Heal (?:\(([^)]+)\)|(\d+))/i;
        let match = text.match(regex);
        if(match) {
            const healAmount = getRarityValue(match[1], this.rarity);
            this.heal = healAmount;
            this.updateTriggerValuesElement();
            return () => {                
                this.board.player.heal(this.heal);
                log(this.name + " healed " + this.board.player.name + " for " + healAmount);
            };
        }
        return null;
    }   

    getItemToTheLeft() {
        const itemIndex = this.board.items.indexOf(this);
        if (itemIndex > 0) {
            const leftItem = this.board.items[itemIndex-1];
            if(leftItem.startIndex + leftItem.size == this.startIndex) {
                return leftItem; //if the left item is directly adjacent to this item, return it
            }
        } 
        return null;
    }

    getItemToTheRight() {
        const itemIndex = this.board.items.indexOf(this);
        if (itemIndex < this.board.items.length - 1) {
            const rightItem = this.board.items[itemIndex + 1];
            if(this.startIndex + this.size == rightItem.startIndex) {
                return rightItem; //if the right item is directly adjacent to this item, return it
            }
        } 
        return null;
    }
    getAdjacentItems() {
        return [this.getItemToTheLeft(), this.getItemToTheRight()].filter(item => item !== null);
    }

    getShieldTriggerFunctionFromText(text) {
    if(!this.tags.includes("Shield") && !this.tags.includes("ShieldReference")) return null;        
        // Match patterns like "Shield equal to ( 1x » 2x ) the value of the adjacent items"
        let regex = /Shield equal to \(\s*(\d+)x\s*»\s*(\d+)x\s*\) the value of the adjacent items/i;
        let match = text.match(regex);
        if (match) {
            const [_, minMultiplier, maxMultiplier] = match;
            const multiplier = getRarityValue(`${minMultiplier}»${maxMultiplier}`, this.rarity);
            const shieldAmount = this.getAdjacentItems().reduce((sum, item) => sum + item.value, 0) * multiplier;
            this.shield = shieldAmount;
            this.updateTriggerValuesElement();
            return () => {
                const shieldAmount = this.getAdjacentItems().reduce((sum, item) => sum + item.value, 0) * multiplier;
                this.shield = shieldAmount;
                this.updateTriggerValuesElement();
            };
        }

        // Shield equal to ( 2 » 3 ) times the value of your items.
        regex = /Shield equal to \(\s*(\d+)\s*»\s*(\d+)\s*\) times the value of your items/i;
        match = text.match(regex);
        if (match) {
            const [_, minMultiplier, maxMultiplier] = match;
            const multiplier = getRarityValue(`${minMultiplier}»${maxMultiplier}`, this.rarity);
            const shieldAmount = this.board.items.reduce((sum, item) => sum + item.value, 0) * multiplier;
            this.shield = shieldAmount;
            this.updateTriggerValuesElement();
            return () => {
                const shieldAmount = this.board.items.reduce((sum, item) => sum + item.value, 0) * multiplier;
                this.shield = shieldAmount;
                this.updateTriggerValuesElement();
            };
        }

        //Shield equal to your current Health.
        regex = /Shield equal to your current Health/i;
        match = text.match(regex);
        if (match) {
            this.shield = this.board.player.maxHealth;
            this.updateTriggerValuesElement();
            return () => {
                const shieldAmount = this.board.player.health;
                this.shield = shieldAmount;
                this.board.player.applyShield(shieldAmount);
                log(this.name + " shielded " + this.board.player.name + " for " + shieldAmount);
                this.updateTriggerValuesElement();
            };
        }

        //Shield equal to ( 1x » 2x » 3x ) this item's value.
        regex = /Shield equal to \(\s*(\d+)x\s*»\s*(\d+)x\s*»\s*(\d+)x\s*\) this item's value/i;
        match = text.match(regex);
        if (match) {
            const [_, minMultiplier, maxMultiplier, maxMultiplier2] = match;
            const multiplier = getRarityValue(`${minMultiplier}»${maxMultiplier}»${maxMultiplier2}`, this.rarity);
            this.shield = this.value * multiplier;
            this.updateTriggerValuesElement();
            return (item) => {
                this.shield = this.value * multiplier;
                this.board.player.applyShield(this.shield);
                log((item?.name||"unknown item") + " was used, causing " +this.name + " to shield " + this.board.player.name + " for " + this.shield);
            };
        }
        
        //this gains damage equal to ( 10% » 20% » 40% ) of the Shield lost.
        regex = /this gains damage equal to \(\s*(\d+)%\s*»\s*(\d+)%\s*»\s*(\d+)%\s*\) of the Shield lost/i;            
        match = text.match(regex);
        if (match) {
            return (shieldLost) => {
                let gainDamage = shieldLost * getRarityValue(`${match[1]}»${match[2]}»${match[3]}`, this.rarity)/100;
                this.damage += gainDamage;
                log(this.name + " gained " + gainDamage + " damage for "+this.board.player.name+" losing " + shieldLost + " shield");
                this.updateTriggerValuesElement();
            };
        }
        
        //Adjacent Shield items gain ( 5 » 10 ) Shield for the fight.
        regex = /Adjacent Shield items gain \(\s*(\d+)\s*»\s*(\d+)\s*\) Shield for the fight/i;
        match = text.match(regex);
        if (match) {
            const shieldAmount = getRarityValue(`${match[1]}»${match[2]}`, this.rarity);
            const adjacentShields = this.getAdjacentItems().filter(item => item.tags.includes("Shield"));
            return () => {
                adjacentShields.forEach(item => {
                    item.shield += shieldAmount;
                    item.updateTriggerValuesElement();
                    log(this.name + " gave " + item.name + " " + shieldAmount + " shield");
                });
            };
        }
        //Your Shield items gain ( +2 » +4 » +6 » +8 ) Shield for the fight.
        regex = /Your Shield items gain\s*\(\s*\+\s*(\d+)\s*»\s*\+\s*(\d+)\s*»\s*\+\s*(\d+)\s*»\s*\+\s*(\d+)\s*\)\s*Shield for the fight/i;
        match = text.match(regex);
        if (match) {
            const shieldAmount = getRarityValue(`${match[1]}»${match[2]}»${match[3]}»${match[4]}`, this.rarity);
            const shieldItems = this.board.items.filter(item => item.tags.includes("Shield"));
            return () => {
                shieldItems.forEach(item => {
                    item.shield += shieldAmount;
                    log(this.name + " gave " + item.name + " " + shieldAmount + " shield");
                    item.updateTriggerValuesElement();
                });
                this.board.shieldValuesChanged();
            };
        }

        //Shield ( 1 » 2 » 3 » 4 ).
        regex = /Shield (?:\(([^)]+)\)|(\d+))/i;
        match = text.match(regex);
        if (match) {
            const shieldAmount = getRarityValue(match[1], this.rarity);
            this.shield = shieldAmount;
            this.updateTriggerValuesElement();
            return () => {
                this.board.player.applyShield(this.shield);
                log(this.name + " shielded " + this.board.player.name + " for " + this.shield);
            };            
        }
        return null;
    }

    updateStatusIndicators() {
         // Update haste indicator
         if (this.hasteTimeRemaining > 0) {
             this.hasteIndicator.classList.remove('hidden');
             this.hasteIndicator.textContent = (this.hasteTimeRemaining / 1000).toFixed(1);
         } else {
             this.hasteIndicator.classList.add('hidden');
         }
 
         // Update slow indicator
         if (this.slowTimeRemaining > 0) {
             this.slowIndicator.classList.remove('hidden');
             this.slowIndicator.textContent = (this.slowTimeRemaining / 1000).toFixed(1);
         } else {
             this.slowIndicator.classList.add('hidden');
         }
    }
        
    editPopup() {
        if(!this.isEditable || document.querySelector('.item-edit-popup')==null) return;
        const itemData = this.startItemData;
        // List of available enchantments and rarities
        const enchantments = [
            'None',
            'Fiery',
            'Radiant',
            'Heavy',
            'Golden',
            'Icy',
            'Turbo',
            'Shielded',
            'Restorative',
            'Toxic',
            'Shiny',
            'Deadly'
        ];

        const rarities = [
            'Bronze',
            'Silver',
            'Gold',
            'Diamond'
        ];

        // Extract current enchantment if it exists
        const enchantPrefixes = /^(Fiery|Radiant|Heavy|Golden|Icy|Turbo|Shielded|Restorative|Toxic|Shiny|Deadly)\s+/;
        const currentEnchant = enchantPrefixes.test(itemData.name) ? 
            itemData.name.match(enchantPrefixes)[1] : 'None';
        const baseName = Item.stripEnchantFromName(itemData.name);
        
        const popup = document.createElement('div');
        popup.className = 'item-edit-popup';
        
        // Start with basic HTML
        let popupHTML = `<h3>Edit ${itemData.name}</h3>`;
        
        // Add enchantment field
        popupHTML += `
            <div class="form-group">
                <label>Enchantment:</label>
                <select id="edit-enchant">
                    ${enchantments.map(e => 
                        `<option value="${e}" ${e === currentEnchant ? 'selected' : ''}>${e}</option>`
                    ).join('')}
                </select>
            </div>`;
        
        popupHTML += `
            <div class="form-group">
                <label>Rarity:</label>
                <select id="edit-rarity">
                    ${rarities.map(r => 
                        `<option value="${r}" ${r === (itemData.rarity || 'Bronze') ? 'selected' : ''}>${r}</option>`
                    ).join('')}
                </select>
            </div>`;
        // Add damage field only if item has damage
        if (itemData.damage !== undefined) {
            popupHTML += `
                <div class="form-group">
                    <label>Damage:</label>
                    <input type="number" id="edit-damage" value="${itemData.damage || 0}">
                </div>`;
        }
        
        // Add cooldown field only if item has cooldown
        if (itemData.cooldown !== undefined) {
            popupHTML += `
                <div class="form-group">
                    <label>Cooldown (seconds):</label>
                    <input type="number" id="edit-cooldown" value="${itemData.cooldown || 0}">
                </div>`;
        }
        
        // Add crit chance field only if item has damage
        if (itemData.tags.indexOf('Weapon') !== -1) {
            popupHTML += `
                <div class="form-group">
                    <label>Crit Chance (0-100):</label>
                    <input type="number" min="0" max="100" id="edit-crit" value="${itemData.crit || 0}">
                </div>`;
        }
        
        // Add buttons
        popupHTML += `
            <div class="button-group">
                <button class="save-edit">Save</button>
                <button class="cancel-edit">Cancel</button>
            </div>`;
        
        popup.innerHTML = popupHTML;
        document.body.appendChild(popup);
        
        popup.querySelector('.save-edit').addEventListener('click', () => {
            const enchant = popup.querySelector('#edit-enchant').value;
            
            // Update name with enchantment
            itemData.name = enchant === 'None' ? baseName : `${enchant} ${baseName}`;
            
            // Only update fields that exist in the form
            if (popup.querySelector('#edit-rarity')) {
                itemData.rarity = popup.querySelector('#edit-rarity').value;
            }
            if (popup.querySelector('#edit-damage')) {
                itemData.damage = parseFloat(popup.querySelector('#edit-damage').value) || 0;
            }
            if (popup.querySelector('#edit-cooldown')) {
                itemData.cooldown = parseFloat(popup.querySelector('#edit-cooldown').value) || 0;
            }
            if (popup.querySelector('#edit-crit')) {
                itemData.crit = parseFloat(popup.querySelector('#edit-crit').value) || 0;
            }
            
            item.setAttribute('data-item', JSON.stringify(itemData));
            item.itemData = itemData;
            popup.remove();
        });
        
        popup.querySelector('.cancel-edit').addEventListener('click', () => {
            popup.remove();
        });
    }
    static stripEnchantFromName(name) {
        const enchantPrefixes = /^(Fiery|Radiant|Heavy|Golden|Icy|Turbo|Shielded|Restorative|Toxic|Shiny|Deadly)\s+/;
        if (enchantPrefixes.test(name)) {
            return name.replace(enchantPrefixes, '');
        }
        return name;
    }

    // Add this new method to the Item class
    static compareByIndex(a, b) {
        return a.startIndex - b.startIndex;
    }

    setupTextFunctions(text) {
        let regex = /^\s*When you ([^,]*), (.*)\./i;
        let match = text.match(regex);
        let ifFunction = null;
        if(match) {
            const ifregex = /\s*if (.*), (.*)\./i;
            const ifmatch = text.match(ifregex);
            if(ifmatch) {
                switch(ifmatch[1].toLowerCase()) {
                    case "it is a weapon":
                        ifFunction = (item) => {
                            if(item.tags.includes("Weapon")) {
                                if(!(('fnFromItem'+this.id) in item)) {
                                    item['fnFromitem'+this.id] = item.getTriggerFunctionFromText(ifmatch[2]);
                                }
                                if(item['fnFromitem'+this.id]) {
                                    item['fnFromitem'+this.id](item);
                                }
                            }
                        }
                    break;                
                }
            }          

            switch(match[1].toLowerCase()) {
                case "use an item":
                    this.board.itemTriggers.set(this.id, this.getTriggerFunctionFromText(match[2]));
                    return;
                case "use an adjacent item":
                    this.adjacentItemTriggers.push(this.getTriggerFunctionFromText(match[2]));
                    return;
                case "use the item to the right of this":
                    const rightItem = this.getItemToTheRight();
                    const rightItemUsedFunction = this.getTriggerFunctionFromText(match[2]);
                    if(rightItem) {
                        this.board.itemTriggers.set(rightItem.id, (item)=> {
                            if(item.id === rightItem.id) {
                                rightItemUsedFunction(item);
                                if(ifFunction) ifFunction(item);
                            }
                        });
                    }
                    return;
                case "use the core or another ray":
                    const f = this.getTriggerFunctionFromText(match[2]);
                    this.whenItemTagTriggers(["Core", "Ray"], 
                        (item) => {
                            if(item.id !== this.id) {
                              f(item);  
                            }
                        }
                    );
                    return;
                case "haste":
                    this.board.hasteTriggers.set(this.id,this.getTriggerFunctionFromText(match[2]));
                    return;
                case "slow":
                    this.board.slowTriggers.set(this.id,this.getTriggerFunctionFromText(match[2]));
                    return;
                case "lose shield":
                    this.board.player.lostShieldTriggers.set(this.id, this.getTriggerFunctionFromText(match[2]));
                    return;
                case "sell this": //do nothing
                case "buy this":
                    return;
            }
            console.log("No code yet written for this case! '" + text + "' matched 'When you' but not '" + match[2]+"'");
            return;
        }
        regex = /^\s*When this gains (.*), (.*)/i;
        match = text.match(regex);
        if(match) {
            switch(match[1].toLowerCase()) {
                case "haste":
                    this.board.hasteTriggers.set(this.id,this.getTriggerFunctionFromText(match[2]));
                    return;
                case "slow":
                    this.board.slowTriggers.set(this.id,this.getTriggerFunctionFromText(match[2]));
                    return;
                case "damage":
                    this.board.damageTriggers.set(this.id,this.getTriggerFunctionFromText(match[2]));
                    return;
            }
        }

        this.triggerFunctions.push(this.getTriggerFunctionFromText(text));
        return null;
    }
    
    /*
    When an item with a tag is used, trigger the given function
    tag can be a string or an array of strings
    */
    whenItemTagTriggers(tag, func) {
        this.board.itemTriggers.set(this.id,(item) => {
            // Handle both string and array cases
            const tags = Array.isArray(tag) ? tag : [tag];
            if (tags.some(t => item.tags.includes(t))) {
                func(item);
            }
        });
    }

    getAnonymousTriggerFunctionFromText(text) {        
        let regex,match;
        //Your weapons gain ( 2 » 4 » 6 » 8 ) damage for the fight.
        regex = /^\s*your weapons gain (?:\(([^)]+)\)|(\d+)) damage for the fight/i;                
        match = text.match(regex);
        if(match) {
            const dmgGain = getRarityValue(`${match[1]}»${match[2]}`, this.rarity);
            return () => {
                this.board.items.forEach(item => {
                    if(item.tags.includes("Weapon")) {
                        item.damage += dmgGain;
                        log(item.name + " gained " + dmgGain + " damage for the fight");
                        item.updateTriggerValuesElement();
                    }
                });
            }
        }
        //your items gain ( +2% » +4% » +6% » +8% ) Crit chance for the fight.
        regex = /your items gain \(\s*(\d+)%\s*»\s*(\d+)%\s*»\s*(\d+)%\s*»\s*(\d+)%\s*\) Crit chance for the fight/i;
        match = text.match(regex);
        if(match) {
            const critGain = getRarityValue(`${match[1]}»${match[2]}»${match[3]}»${match[4]}`, this.rarity);
            return () => {
                this.board.items.forEach(i => i.crit += critGain);
                log(this.name + " gave all items " + critGain + " crit chance");
            }
        }
        //Multicast ( 1 » 2 » 3 » 4 ).
        regex = /^Multicast (?:\(([^)]+)\)|(\d+))/i;
        match = text.match(regex);
        if(match) {
            this.multicast = match[1] ? getRarityValue(match[1], this.rarity) : parseInt(match[2]);
            return () => {};
        }        
        regex = /^Gain (?:\(([^)]+)\)|(\d+)) gold/i;
        match = text.match(regex);
        if(match) {            
            return () => {
                this.board.player.gold += match[1] ? getRarityValue(match[1], this.rarity) : parseInt(match[2]);
                log(this.name + " gave " + this.board.player.gold + " gold to " + this.board.player.name);
            }
        }
        //Give the weapon to the left of this ( +10 » +20 » +30 ) damage for the fight
        regex = /^Give the weapon to the left of this \(\s*\+?(\d+)\s*»\s*\+?(\d+)\s*»\s*\+?(\d+)\s*\) damage for the fight/i;
        match = text.match(regex);
        if(match) {
            const dmgGain = getRarityValue(`${match[1]}»${match[2]}»${match[3]}`, this.rarity);
            const leftItem = this.getItemToTheLeft();
            return () => {
                if(leftItem) {
                    leftItem.damage += dmgGain;
                    log(this.name+" gave " + leftItem.name + " " + dmgGain + " damage");
                    leftItem.updateTriggerValuesElement();
                }
            }
        }
        regex = /^Crit chance \(\s*(\d+)%\s*»\s*(\d+)%\s*»\s*(\d+)%\s*»\s*(\d+)%\s*\)/i;
        match = text.match(regex);
        if(match) {
            this.crit = getRarityValue(`${match[1]}»${match[2]}»${match[3]}»${match[4]}`, this.rarity);
            this.updateTooltip();
            this.text = this.text.filter(t => t!=text);
            this.updateTooltip();
            return () => {};
        }
        return null;
    }
    
    getTriggerFunctionFromText(text) {
        return this.getWeaponTriggerFunction(text) ||
        this.getSlowTriggerFunctionFromText(text) ||
        this.getShieldTriggerFunctionFromText(text) ||
        this.getBurnTriggerFunctionFromText(text) ||
        this.getHasteTriggerFunctionFromText(text) ||
        this.getPoisonTriggerFunctionFromText(text) ||
        this.getHealTriggerFunctionFromText(text) ||
    //    this.getCritTriggerFunctionFromText(text) ||
   //     this.getAmmoTriggerFunctionFromText(text) ||
        this.getAnonymousTriggerFunctionFromText(text) ||
        (() => { console.log("Could not parse "+ text+ " into a trigger function.")})
    }
    
}