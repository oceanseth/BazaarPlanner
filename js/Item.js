class Item {
    constructor(itemData, board) {
        this.startItemData = itemData;
        this.board = board;
        Object.assign(this, this.startItemData);
        this.size = this.tags.includes('Small') ? 1 : this.tags.includes('Medium') ? 2 : 3;
        this.cooldown = (this.startItemData.cooldown || 5) * 1000;

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
     

        if(board) {
            board.items.push(this);
        }
    }
    reset() {
        Object.assign(this, this.startItemData);
        this.size = this.tags.includes('Small') ? 1 : this.tags.includes('Medium') ? 2 : 3;
        this.cooldown = (this.startItemData.cooldown || 5) * 1000; // Convert to ms
        this.hasteTimeRemaining = 0;
        this.slowTimeRemaining = 0;
        this.numTriggers = 0;
        this.effectiveBattleTime = 0;
        this.damage = this.calculateDamage();
        this.progressBar.style.bottom = '-5px';
        this.hasteIndicator.classList.add('hidden');
        this.slowIndicator.classList.add('hidden');                
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
        
        // Handle tags - convert to array if it's an object
        let tagsArray = [];
        if (this.tags) {
            if (Array.isArray(this.tags)) {
                tagsArray = this.tags;
            } else if (typeof this.tags === 'object') {
                // Convert object to array of keys where value is truthy
                tagsArray = Object.entries(this.tags)
                    .filter(([_, value]) => value)
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
        return new Item(itemElement, board);
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
        //log('triggered item ', itemData.name);
        if(this.tags.includes("Weapon")) {
            let damage = this.damage;
            let crit="";
            // Handle critical hits using itemData.crit (0-100) instead of critChance
            if (this.crit && Math.random() < (this.crit / 100)) {
                damage *= 2;
                crit =" critically strikes and";
            }
            
            if(this.element.parentElement.id == 'bottom-board') {
                topPlayerHealth -= damage;
                log("Bottom player's "+this.name + 
                            crit +
                            " deals "+ damage+" damage.");
            } else {
                bottomPlayerHealth -= damage;
                log("Top player's "+this.name + 
                            crit+
                            " deals "+ damage+" damage.");
            }
        }
        // Check for haste effect when item is triggered
        if (this.text && this.text.includes('Haste')) {
            applyHasteEffect(this, this.board);
        }
        if (this.text && this.text.includes('Slow')) {
            applySlowEffect(this, this.board.id == 'inventory-board' ? bottomBoard:inventoryBoard);
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
}