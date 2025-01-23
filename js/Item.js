class Item {
    static hiddenTags = ['Damage', 'Crit'];
    
    constructor(itemData, board) {
        this.startItemData = itemData;
        this.board = board;
        Object.assign(this, this.startItemData);
        this.size = this.tags.includes('Small') ? 1 : this.tags.includes('Medium') ? 2 : 3;
        if(this.startItemData.cooldown) {
            this.cooldown = (this.startItemData.cooldown || 5) * 1000;
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

        this.reset();


        this.priceTagElement = document.createElement('div');
        this.priceTagElement.className = 'price-tag';
        this.priceTagElement.textContent = this.value;
        this.element.appendChild(this.priceTagElement);
        
        this.triggerValuesElement = document.createElement('div');
        this.triggerValuesElement.className = 'trigger-values';
        this.element.appendChild(this.triggerValuesElement);

        if(this.tags.includes("Weapon")) {
            this.damageElement = document.createElement('div');
            this.damageElement.className = 'damage-element';
            this.damageElement.textContent = this.damage;
            this.triggerValuesElement.appendChild(this.damageElement);
        }

        if(this.tags.includes("Burn")) {    
            this.burnElement = document.createElement('div');
            this.burnElement.className = 'burn-element';
            this.burnElement.textContent = this.burn;
            this.triggerValuesElement.appendChild(this.burnElement);
        }

        if(this.tags.includes("Poison")) {
            this.poisonElement = document.createElement('div');
            this.poisonElement.className = 'poison-element';
            this.poisonElement.textContent = this.poison;
            this.triggerValuesElement.appendChild(this.poisonElement);
        }

   
     

        if(board) {
            board.items.push(this);
        }
    }
    reset() {
        Object.assign(this, this.startItemData);
        this.size = this.tags.includes('Small') ? 1 : this.tags.includes('Medium') ? 2 : 3;
        if(this.startItemData.cooldown) {
            this.cooldown = (this.startItemData.cooldown || 5) * 1000;
        }

        this.hasteTimeRemaining = 0;
        this.slowTimeRemaining = 0;
        this.numTriggers = 0;
        this.effectiveBattleTime = 0;
        this.value = this.startItemData.value || this.getInitialValue();
        this.damage = this.calculateDamage();
        this.burn = this.calculateBurn();
        this.poison = this.calculatePoison();
        this.heal = this.calculateHeal();
        this.shield = this.calculateShield();
        this.triggerFunctions = [];
        this.applyWeaponTrigger();
        this.applySlowTrigger();
        this.applyHasteTrigger();
        this.applyPoisonTrigger();
        this.applyBurnTrigger();
        this.applyHealTrigger();
        this.applyShieldTrigger();
        this.applyItemSizeTrigger();

        this.progressBar.style.bottom = '-5px';
        this.hasteIndicator.classList.add('hidden');
        this.slowIndicator.classList.add('hidden');    
        this.progressBar.style.display = 'none';            
    }

    getInitialValue() {
        const rarityIndex = ['Bronze', 'Silver', 'Gold', 'Diamond', 'Legendary'].indexOf(this.rarity || 'Bronze');
        return this.size * Math.pow(2, rarityIndex);           
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
        
        mergedSlot.style.width = `${this.size * 10}%`;
        mergedSlot.style.left = `${this.startIndex * 10}%`;
        mergedSlot.draggable = true;
        mergedSlot.setAttribute('data-size', this.size);
        
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
        
        if(this.board.element) {
            this.board.element.appendChild(mergedSlot);
        }
        return mergedSlot;
    }
    
    createTooltipElement() {
        const tooltip = document.createElement('div');
        this.tooltip = tooltip;
        tooltip.className = 'tooltip';
        
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
                <div class="tooltip-tags">
                    ${tagsArray.map(tag => `<span class="tag tooltip-tag-${tag}">${tag}</span>`).join('')}
                </div>
                <div class="tooltip-name">${this.name}</div>
                <div class="tooltip-divider"></div>
                <div class="tooltip-main">
                    ${this.cooldown ? `
                        <div class="cooldown-circle">${this.cooldown/1000}<span class="unit">SEC</span></div>
                    ` : ''}
                    <div class="tooltip-main-text">${this.text || ''}</div>
                </div>
                ${this.bottomText ? `
                    <div class="tooltip-divider"></div>
                    <div class="tooltip-bottom">${this.bottomText}</div>
                ` : ''}
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
        this.element.style.left = `${index * 10}%`;
    }
    calculateDamage() {
        if (!this.tags.includes('Weapon')) return 0;
        const damageRegex = /Deal (?:\(([^)]+)\)|(\d+)) damage/i;
        const match = this.text.match(damageRegex);
        return match ? 
            (match[1] ? getRarityValue(match[1], this.rarity) : parseInt(match[2])) 
            : 0;
    }
    calculateBurn() {
        if (!this.tags.includes('Burn')) return 0;
        const burnRegex = /Burn (?:\(([^)]+)\)|(\d+))/i;
        const match = this.text.match(burnRegex);
        return match ? 
            (match[1] ? getRarityValue(match[1], this.rarity) : parseInt(match[2])) 
            : 0;
    }
    calculateHeal() {
        if (!this.tags.includes('Heal')) return 0;
        const healRegex = /Heal (?:\(([^)]+)\)|(\d+))/i;
        const match = this.text.match(healRegex);
        return match ? 
            (match[1] ? getRarityValue(match[1], this.rarity) : parseInt(match[2])) 
            : 0;
    }
    calculateShield() {
        if (!this.tags.includes('Shield')) return 0;
        const shieldRegex = /Shield (?:\(([^)]+)\)|(\d+))/i;
        const match = this.text.match(shieldRegex);
        return match ? 
            (match[1] ? getRarityValue(match[1], this.rarity) : parseInt(match[2])) 
            : 0;
    }
    calculatePoison() {
        if (!this.tags.includes('Poison')) return 0;
        const poisonRegex = /Poison (?:\(([^)]+)\)|(\d+))/i;
        const match = this.text.match(poisonRegex);
        return match ? 
            (match[1] ? getRarityValue(match[1], this.rarity) : parseInt(match[2])) 
            : 0;
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
        if (!this.progressBar) return;


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
        this.effectiveBattleTime += effectiveTimeDiff;
        // Update progress and check for triggers
        const progress = (this.effectiveBattleTime % this.cooldown) / this.cooldown * 100;
        this.updateProgressBar(progress);

        const newTriggers = Math.floor(this.effectiveBattleTime / this.cooldown);
        if (newTriggers > this.numTriggers) {
            this.trigger();
            this.numTriggers = newTriggers;
        }
    }

    trigger() {
        this.triggerFunctions.forEach(func => func());
    }

    applyItemSizeTrigger() {
        if(this.tags.includes("Small")) {
           this.triggerFunctions.push(() => this.board.player.smallItemTriggered());
        } else if(this.tags.includes("Medium")) {
            this.triggerFunctions.push(() => this.board.player.mediumItemTriggered());
        } else if(this.tags.includes("Large")) {
            this.triggerFunctions.push(() => this.board.player.largeItemTriggered());
        }
    }

    applyWeaponTrigger() {
        if(this.tags.includes("Weapon")) {
            this.triggerFunctions.push(() => {
                let damage = this.damage;
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
            });
        }
    }
        
    applySlowTrigger() {
        // Extract slow text from the item's text property - tag is optional
        // Both item count and duration can be either a single digit or a range
        const slowRegex = /Slow (?:\(([^)]+)\)|(\d+)) (?:(\w+) )?items?\(?s?\)?\s*for (?:\(([^)]+)\)|(\d+)) second/i;
        
        if (!this.text || !slowRegex.test(this.text)) return;
        
        const [_, itemsRange, singleItemCount, requiredTag, durationRange, singleDuration] = this.text.match(slowRegex);
        
        // Get the appropriate values based on item's rarity
        const numItemsToSlow = itemsRange ? 
            getRarityValue(itemsRange, this.rarity) : 
            parseInt(singleItemCount);
        const duration = durationRange ? 
            getRarityValue(durationRange, this.rarity) : 
            parseInt(singleDuration);
      
        this.triggerFunctions.push(() => {
                // Find all progress bars in the same board
            let items = Array.from(this.board.player.hostileTarget.board.items);
            items = items.filter(i => i.cooldown != null); // filter out items that do not have a cooldown/ability to trigger

            // Filter by tag if one was specified
            if (requiredTag) {
                items = items.filter(i => {
                    return i.tags && i.tags.includes(requiredTag);
                });
            }
            // Randomly select N progress bars
            const selectedItems = items
                .sort(() => battleRandom() - 0.5)
                .slice(0, numItemsToSlow);
            
            // Apply slow effect to selected bars
            selectedItems.forEach(i => {
                i.applySlow(duration);
                log(this.name + " slowed " + i.name + " for " + duration + " seconds");
            });
        });
    }

    applyHasteTrigger() {
        // Extract haste text from the item's text property - tag is optional
        // Both item count and duration can be either a single digit or a range
        const hasteRegex = /Haste (?:\(([^)]+)\)|(\d+)) (?:(\w+) )?item.* for (?:\(([^)]+)\)|(\d+)) second/;

        if (!this.text || !hasteRegex.test(this.text)) return;
        
        const [_, itemsRange, singleItemCount, requiredTag, durationRange, singleDuration] = this.text.match(hasteRegex);
        
        // Get the appropriate values based on item's rarity
        const numItemsToHaste = itemsRange ? 
            getRarityValue(itemsRange, this.rarity) : 
            parseInt(singleItemCount);
        const duration = durationRange ? 
            getRarityValue(durationRange, this.rarity) : 
            parseInt(singleDuration);
        
       
        this.triggerFunctions.push(() => {
             // Find all progress bars in the same board
            let items = Array.from(this.board.items);
            items = items.filter(i => i.cooldown != null); // filter out items that do not have a cooldown/ability to trigger
            
            // Filter by tag if one was specified
            if (requiredTag) {
                items = items.filter(i => {
                    return i.tags && i.tags.includes(requiredTag);
                });
            }
            // Randomly select N items from the board
            const selectedItems = items
            .sort(() => battleRandom() - 0.5)
            .slice(0, numItemsToHaste);
        
            // Apply haste effect to selected bars
            selectedItems.forEach(i => {
                i.applyHaste(duration);
                log(this.name + " hasted " + i.name + " for " + duration + " seconds");
            });
        });
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
            this.board.player.health += this.heal;
            log(this.name + " healed " + this.board.player.name + " for " + this.heal);
        });
    }   

    applyShieldTrigger() {
        if(!this.tags.includes("Shield")) return; 
        this.triggerFunctions.push(() => {
            this.board.player.shield += this.shield;
            log(this.name + " shielded " + this.board.player.name + " for " + this.shield);
        });
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
}