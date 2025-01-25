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
            this.cooldown = this.startItemData.cooldown * 1000;
        }

        this.progressBar = document.createElement('div'); 
        this.progressBar.className = 'battleItemProgressBar';

        this.hasteIndicator = document.createElement('div');
        this.hasteIndicator.className = 'haste-indicator hidden';
        this.progressBar.appendChild(this.hasteIndicator);

        this.slowIndicator = document.createElement('div');
        this.slowIndicator.className = 'slow-indicator hidden';
        this.progressBar.appendChild(this.slowIndicator);

        this.element = this.createElement();
        this.element.appendChild(this.progressBar);

        this.priceTagElement = document.createElement('div');
        this.priceTagElement.className = 'price-tag';
        this.element.appendChild(this.priceTagElement);
        
        this.triggerValuesElement = document.createElement('div');
        this.triggerValuesElement.className = 'trigger-values';
        this.element.appendChild(this.triggerValuesElement);

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
        this.priceTagElement.textContent = Number(this.value).toFixed(0);
    }
    reset() {
        Object.assign(this, this.startItemData);
        this.size = this.tags.includes('Small') ? 1 : this.tags.includes('Medium') ? 2 : 3;
        if(this.startItemData.cooldown) {
            this.cooldown = (this.startItemData.cooldown || 5) * 1000;
        }
        this.isDestroyed = false;
        this.hasteTimeRemaining = 0;
        this.slowTimeRemaining = 0;
        this.numTriggers = 0;
        this.effectiveBattleTime = 0;
        this.pendingMulticasts = 0;

        this.value = this.startItemData.value || this.getInitialValue();
        this.damage = this.calculateDamage();
        this.burn = this.calculateBurn();
        this.poison = this.calculatePoison();
        this.heal = this.calculateHeal();
        this.multicast = this.calculateMulticast();
        this.ammoRemaining = this.ammo;

        this.triggerFunctions = [];
        this.adjacentItemTriggers = [];
        this.applyWeaponTrigger();
        this.applySlowTrigger();
        this.applyHasteTrigger();
        this.applyPoisonTrigger();
        this.applyBurnTrigger();
        this.applyHealTrigger();
        this.applyShieldTrigger();
        this.applyItemSizeTrigger();
        this.updateTriggerValuesElement();

        this.progressBar.style.bottom = '-5px';
        this.hasteIndicator.classList.add('hidden');
        this.slowIndicator.classList.add('hidden');    
        this.progressBar.style.display = 'none';            
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

        const tooltip = this.createTooltipElement();
        mergedSlot.appendChild(tooltip);
        
        // Add event listeners
        mergedSlot.addEventListener('mouseenter', () => {
            tooltip.style.display = 'block';
        });
        
        mergedSlot.addEventListener('mouseleave', () => {
            tooltip.style.display = 'none';
        });
        
        return mergedSlot;
    }
    
    createTooltipElement() {
        const tooltip = document.createElement('div');
        this.tooltip = tooltip;
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
                    <div class="tooltip-cooldown-circle">${this.cooldown/1000}<span class="unit">SEC</span></div>
                ` : ''}
                <div class="tooltip-tags">
                    ${tagsArray.map(tag => `<span class="tag tooltip-tag-${tag}">${tag}</span>`).join('')}
                </div>
                <div class="tooltip-name">${this.name}</div>
                <div class="tooltip-divider"></div>
                <div class="tooltip-main">                    
                    <div class="tooltip-main-text">
                        ${Array.isArray(this.text) ? 
                            this.text.join('<br>') : 
                            (this.text || '')}
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
        }
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
    calculateMulticast() {
        const multicastRegex = /Multicast (?:\(([^)]+)\)|(\d+))/i;
        for (const textElement of this.text) {
            const match = textElement.match(multicastRegex);
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
    }

    applySlow(duration) {
        this.slowTimeRemaining += duration * 1000;
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
        this.getAdjacentItems().forEach(item => item.adjacentItemTriggered(this));
    }

    applyItemSizeTrigger() {
        if(this.tags.includes("Small")) {
           this.triggerFunctions.push(() => this.board.player.smallItemTriggered(this));
        } else if(this.tags.includes("Medium")) {
            this.triggerFunctions.push(() => this.board.player.mediumItemTriggered(this));
        } else if(this.tags.includes("Large")) {
            this.triggerFunctions.push(() => this.board.player.largeItemTriggered(this));
        }
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
    applyWeaponTrigger() {
        let match;
        if(this.tags.includes("Weapon")) {
            //Deal damage equal to ( 20% » 30% ) of your enemy's Max Health.
            
            for (const textElement of this.text) {
                let damageRegex = /Deal damage equal to \(\s*(\d+)%\s*»\s*(\d+)%\s*\) of your enemy's Max Health/i;
                match = textElement.match(damageRegex);
                if(match) {
                    const dmgMultiplier = getRarityValue(`${match[1]}»${match[2]}`, this.rarity);
                    this.damage = this.board.player.hostileTarget.maxHealth*dmgMultiplier/100;         
                    this.triggerFunctions.push(() => {
                        this.damage = this.board.player.hostileTarget.maxHealth*dmgMultiplier/100;      
                        this.dealDamage(this.damage);
                    });
                    continue;
                }
            
                //Your weapons gain ( 2 » 4 » 6 » 8 ) damage for the fight.
                damageRegex = /Your weapons gain (?:\(([^)]+)\)|(\d+)) damage for the fight/i;
                match = textElement.match(damageRegex);
                if(match) {
                    const dmgGain = getRarityValue(`${match[1]}»${match[2]}`, this.rarity);
                    this.triggerFunctions.push(() => {
                        this.board.items.forEach(item => {
                            if(item.tags.includes("Weapon")) {
                                item.damage += dmgGain;
                                log(item.name + " gained " + dmgGain + " damage for the fight");
                                item.updateTriggerValuesElement();
                            }
                        });
                    });
                    continue;
                }
                //Adjacent Weapons gain ( 5 » 10 ) Damage for the fight.
                damageRegex = /Adjacent Weapons gain \(\s*(\d+)\s*»\s*(\d+)\s*\) Damage for the fight/i;
                match = textElement.match(damageRegex);
                if(match) {
                    const dmgGain = getRarityValue(`${match[1]}»${match[2]}`, this.rarity);
                    const adjacentWeapons = this.getAdjacentItems().filter(item => item.tags.includes("Weapon"));
                    this.triggerFunctions.push(() => {
                        adjacentWeapons.forEach(item => {
                            item.damage += dmgGain;
                            log(this.name + " gave " + item.name + " " + dmgGain + " damage for the fight");
                            item.updateTriggerValuesElement();
                        });
                    });
                    continue;
                }

                //Deal ( 10 >> 20 >> 30 >> 40 ) damage.
                damageRegex = /Deal (?:\(([^)]+)\)|(\d+)) damage/i;
                match = textElement.match(damageRegex);
                if(match) {
                    const dmgMultiplier = getRarityValue(`${match[1]}»${match[2]}`, this.rarity);
                                
                    this.triggerFunctions.push(() => {   
                        this.dealDamage(this.damage);        
                    });
                    continue;
                }
            }
        }
    }
        
    applySlowTrigger() {        
        for (const textElement of this.text) {
            let slowRegex = /Slow (?:\(([^)]+)\)|(\d+)) (?:(\w+) )?items?\(?s?\)?\s*for (?:\(([^)]+)\)|(\d+)) second/i;
            if (slowRegex.test(textElement)) {            
                const [_, itemsRange, singleItemCount, requiredTag, durationRange, singleDuration] = textElement.match(slowRegex);
                
                const numItemsToSlow = itemsRange ? 
                    getRarityValue(itemsRange, this.rarity) : 
                    parseInt(singleItemCount);
                const duration = durationRange ? 
                    getRarityValue(durationRange, this.rarity) : 
                    parseInt(singleDuration);
            
                this.triggerFunctions.push(() => {
                    let items = Array.from(this.board.player.hostileTarget.board.items);
                    items = items.filter(i => i.cooldown != null);

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
                });
            }
        }
    }

    applyHasteTrigger() {        
        for (const textElement of this.text) {
            let hasteRegex = /Haste (?:\(([^)]+)\)|(\d+)) (?:(\w+) )?item.* for (?:\(([^)]+)\)|(\d+)) second/;
            if (hasteRegex.test(textElement)) {                
                const [_, itemsRange, singleItemCount, requiredTag, durationRange, singleDuration] = textElement.match(hasteRegex);
                
                const numItemsToHaste = itemsRange ? 
                    getRarityValue(itemsRange, this.rarity) : 
                    parseInt(singleItemCount);
                const duration = durationRange ? 
                    getRarityValue(durationRange, this.rarity) : 
                    parseInt(singleDuration);
            
                this.triggerFunctions.push(() => {
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
                });
            }
            hasteRegex = /Haste your items for (?:\(([^)]+)\)|(\d+)) second/i;
            if (hasteRegex.test(textElement)) {
                const duration = getRarityValue(textElement.match(hasteRegex)[1], this.rarity);
                this.triggerFunctions.push(() => {
                    this.board.items.forEach(i => i.applyHaste(duration));
                    log(this.name + " hasted all items for " + duration + " seconds");
                });
            }
            //Haste another item for ( 1 » 2 » 3 » 4 ) second(s).
            hasteRegex = /Haste another item for (?:\(([^)]+)\)|(\d+)) second/i;
            if (hasteRegex.test(textElement)) {
                const duration = getRarityValue(textElement.match(hasteRegex)[1], this.rarity);
                this.triggerFunctions.push(() => {
                    let itemToHaste = this.board.items.filter(i => i.cooldown != null).sort(() => battleRandom() - 0.5)[0];
                    itemToHaste.applyHaste(duration);
                    log(this.name + " hasted "+itemToHaste.name+" for " + duration + " seconds");
                });
            }
        }
    }

    applyPoisonTrigger() {
        if(!this.tags.includes("Poison")) return; 
        this.triggerFunctions.push(() => {
            this.board.player.hostileTarget.poison += this.poison;
            log(this.name + " poisoned " + this.board.player.hostileTarget.name + " for " + this.poison);
        });
    }

    applyBurnTrigger() {
        if(!this.tags.includes("Burn")) return; 
        this.triggerFunctions.push(() => {
            this.board.player.hostileTarget.burn += this.burn;
            log(this.name + " burned " + this.board.player.hostileTarget.name + " for " + this.burn);
        });
    }

    applyHealTrigger() {
        if(!this.tags.includes("Heal")) return; 
        this.triggerFunctions.push(() => {
            let healAmount = this.heal;
            if(this.board.player.health + this.heal > this.board.player.maxHealth) {
                healAmount = this.board.player.maxHealth - this.board.player.health;
                this.board.player.heal(healAmount);
            } else {
                this.board.player.heal(this.heal);
            }

            log(this.name + " healed " + this.board.player.name + " for " + healAmount);
        });
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

    applyShieldTrigger() {
        if(!this.tags.includes("Shield") && !this.tags.includes("ShieldReference")) return; 
     
        for (const textElement of this.text) {
            // Match patterns like "Shield equal to ( 1x » 2x ) the value of the adjacent items"
            let shieldRegex = /Shield equal to \(\s*(\d+)x\s*»\s*(\d+)x\s*\) the value of the adjacent items/i;
            let match = textElement.match(shieldRegex);
            if (match) {
                const [_, minMultiplier, maxMultiplier] = match;
                const multiplier = getRarityValue(`${minMultiplier}»${maxMultiplier}`, this.rarity);
                const shieldAmount = this.getAdjacentItems().reduce((sum, item) => sum + item.value, 0) * multiplier;
                this.shield = shieldAmount;
                this.updateTriggerValuesElement();
                continue;
            }

            // Shield equal to ( 2 » 3 ) times the value of your items.
            shieldRegex = /Shield equal to \(\s*(\d+)\s*»\s*(\d+)\s*\) times the value of your items/i;
            match = textElement.match(shieldRegex);
            if (match) {
                const [_, minMultiplier, maxMultiplier] = match;
                const multiplier = getRarityValue(`${minMultiplier}»${maxMultiplier}`, this.rarity);
                const shieldAmount = this.board.items.reduce((sum, item) => sum + item.value, 0) * multiplier;
                this.shield = shieldAmount;
                this.updateTriggerValuesElement();
                continue;
            }

            //Shield equal to your current Health.
            shieldRegex = /Shield equal to your current Health/i;
            match = textElement.match(shieldRegex);
            if (match) {
                this.shield = this.board.player.maxHealth;
                this.updateTriggerValuesElement();
                this.triggerFunctions.push(() => {
                    const shieldAmount = this.board.player.health;
                    this.shield = shieldAmount;
                    this.board.player.applyShield(shieldAmount);
                    log(this.name + " shielded " + this.board.player.name + " for " + shieldAmount);
                    this.updateTriggerValuesElement();
                });
                continue;
            }

            //When you use an item, Shield equal to ( 1x » 2x » 3x ) this item's value.
            shieldRegex = /When you use an item, Shield equal to \(\s*(\d+)x\s*»\s*(\d+)x\s*»\s*(\d+)x\s*\) this item's value/i;
            match = textElement.match(shieldRegex);
            if (match) {
                const [_, minMultiplier, maxMultiplier, maxMultiplier2] = match;
                const multiplier = getRarityValue(`${minMultiplier}»${maxMultiplier}»${maxMultiplier2}`, this.rarity);
                this.shield = this.value * multiplier;
                this.updateTriggerValuesElement();
                const itemTriggered = (item) => {
                    this.shield = this.value * multiplier;
                    this.board.player.applyShield(this.shield);
                    log((item?.name||"unknown item") + " was used, causing " +this.name + " to shield " + this.board.player.name + " for " + this.shield);
                };
                this.board.player.largeItemTriggers.push(itemTriggered);
                this.board.player.mediumItemTriggers.push(itemTriggered);
                this.board.player.smallItemTriggers.push(itemTriggered);
                continue;
            }

            //When you use an adjacent item, Shield ( 1 » 2 » 3 » 4 ).
            shieldRegex = /When you use an adjacent item, Shield (?:\(([^)]+)\)|(\d+))/i;
            match = textElement.match(shieldRegex);
            if (match) {
                const shieldAmount = getRarityValue(match[1], this.rarity);
                this.shield = shieldAmount;
                this.adjacentItemTriggers.push((item) => {
                    this.board.player.applyShield(this.shield);
                    log(item.name+" usage caused " + this.name + " to shield " + this.board.player.name + " for " + this.shield);                    
                });
                continue;
            }
            
            //When you lose Shield, this gains damage equal to ( 10% » 20% » 40% ) of the Shield lost.
            shieldRegex = /When you lose Shield, this gains damage equal to \(\s*(\d+)%\s*»\s*(\d+)%\s*»\s*(\d+)%\s*\) of the Shield lost/i;            
            match = textElement.match(shieldRegex);
            if (match) {
                this.board.player.lostShieldTriggers.set(this.id, (shieldLost) => {
                    let gainDamage = shieldLost * getRarityValue(`${match[1]}»${match[2]}»${match[3]}`, this.rarity)/100;
                    this.damage += gainDamage;
                    log(this.name + " gained " + gainDamage + " damage for "+this.board.player.name+" losing " + shieldLost + " shield");
                    this.updateTriggerValuesElement();
                });
                continue;
            }
            //Adjacent Shield items gain ( 5 » 10 ) Shield for the fight.
            shieldRegex = /Adjacent Shield items gain \(\s*(\d+)\s*»\s*(\d+)\s*\) Shield for the fight/i;
            match = textElement.match(shieldRegex);
            if (match) {
                const shieldAmount = getRarityValue(`${match[1]}»${match[2]}`, this.rarity);
                const adjacentShields = this.getAdjacentItems().filter(item => item.tags.includes("Shield"));
                this.triggerFunctions.push(() => {
                  adjacentShields.forEach(item => {
                        item.shield += shieldAmount;
                        item.updateTriggerValuesElement();
                        log(this.name + " gave " + item.name + " " + shieldAmount + " shield");
                    });
                });
                continue;
            }
            //Shield ( 1 » 2 » 3 » 4 ).
            shieldRegex = /Shield (?:\(([^)]+)\)|(\d+))/i;
            match = textElement.match(shieldRegex);
            if (match) {
                const shieldAmount = getRarityValue(match[1], this.rarity);
                this.shield = shieldAmount;
                this.updateTriggerValuesElement();
                this.triggerFunctions.push(() => {
                    this.board.player.applyShield(this.shield);
                    log(this.name + " shielded " + this.board.player.name + " for " + this.shield);
                });
                continue;
            }

        }
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
}