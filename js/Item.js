import { Board } from './Board.js';
import { getRarityValue, updateUrlState, colorTextArray, setupChangeListeners } from './utils.js';
import { ItemFunction } from './ItemFunction.js';

export class Item {
    static hiddenTags = ['Damage', 'Crit'];
    static rarityLevels = ['Bronze', 'Silver', 'Gold', 'Diamond', 'Legendary'];
    static possibleEnchants = ['Deadly', 'Ethereal', 'Fiery', 'Golden', 'Heavy', 'Icy', 'Mystical', 'Obsidian', 'Radiant', 'Restorative', 'Shielded', 'Shiny', 'Tiny', 'Toxic', 'Turbo' ];
    static possibleChangeAttributes = ['damage','shield','burn','poison','heal','ammo','value'];
    static enchantTagMap = {
        'Toxic': 'Poison',
        'Fiery': 'Burn',        
        'Icy': 'Freeze',
        'Restorative': 'Heal',
        'Shielded': 'Shield',
    }
    static itemID = 0;
    
    pickRandom(...args) {
        return this.board.player.battle.pickRandom(...args);
    }

    battleRandom(...args) {
        return this.board.player.battle.battleRandom(...args);
    }



    constructor(itemData, board) {
        if(!itemData) {
            console.log("Item data is undefined");
            return;
        }
        this.id = Item.itemID++;
        setupChangeListeners(this,Item.possibleChangeAttributes);
        this.startItemData = structuredClone(itemData);
        this.board = board;        
        Object.assign(this, this.startItemData);
        if(this.rarity == undefined && this.tier!=undefined) {
            this.rarity = Item.rarityLevels[Item.rarityLevels.indexOf(this.tier)];
        }
        
        // Ensure text is always an array
        this.text = Array.isArray(this.text) ? this.text : [this.text].filter(Boolean);

        this.isEditable = true;
        this.size = this.tags.includes('Small') ? 1 : this.tags.includes('Medium') ? 2 : 3;
        if(this.startItemData.value==undefined) this.startItemData.value = this.getInitialValue();
        if(items[this.name] && items[this.name].value==undefined) items[this.name].value = this.startItemData.value;

        this.value = this.startItemData.value;
        if(itemData.value==undefined) itemData.value = this.startItemData.value;
        this.resetCooldown();
        this.element = this.createElement();

        if(itemData.cooldown) {
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
        this.freezeElement = document.createElement('div');
        this.freezeElement.className = 'freeze-element hidden';
        this.element.appendChild(this.freezeElement);

        this.priceTagElement = document.createElement('div');
        this.priceTagElement.className = 'price-tag';
        this.element.appendChild(this.priceTagElement);

        this.battleStatsElement = document.createElement('div');
        this.battleStatsElement.className = 'battle-stats';
        this.battleStatsElement.innerHTML = `
            <div class="damage-element"></div>
            <div class="burn-element"></div>
            <div class="poison-element"></div>
            <div class="heal-element"></div>
            <div class="shield-element"></div>
        `;
        this.element.appendChild(this.battleStatsElement);
        
        this.reset();

        if(board) {
            board.addItem(this);
        }
        if(this.startItemData.enchants && this.startItemData.enchants['Radiant']==undefined) {
            this.startItemData.enchants['Radiant'] = 'Can not be Frozen, Slowed or Destroyed.';
        }
    }

    destroy(source) {
        if(this.enchant=='Radiant') {return};
        this.isDestroyed = true;
        this.element.classList.add('destroyed');
        log(source.name + " destroyed " + this.name);
        this.board.itemDestroyedTriggers.forEach(func => func(this,source));
        this.board.itemValuesChangedTriggers.forEach(func => func(this,source));
    }

    updateTriggerValuesElement() {
        const formatNumber = num => Number.isInteger(num) ? num.toString() : num.toFixed(0);
      

        if(this.heal>0) {
            this.healElement.style.display ='block';
            this.healElement.textContent = formatNumber(this.heal); 
        }
        else this.healElement.style.display = 'none';

        if(this.shield>0) {
            this.shieldElement.style.display ='block';
            this.shieldElement.textContent = formatNumber(this.shield);
        }
        else this.shieldElement.style.display = 'none';

        if(this.burn>0) {
            this.burnElement.style.display ='block';
            this.burnElement.textContent = formatNumber(this.burn);
        }
        else this.burnElement.style.display = 'none';

        if(this.poison>0) {
            this.poisonElement.style.display ='block';
            this.poisonElement.textContent = formatNumber(this.poison);
        }
        else this.poisonElement.style.display = 'none';

        if(this.damage>0) {
            this.damageElement.style.display ='block';
            this.damageElement.textContent = formatNumber(this.damage);
        }
        else this.damageElement.style.display = 'none';

        if(this.multicast>0) {
            this.multicastElement.style.display ='block';
            this.multicastElement.textContent = "x"+Number(this.multicast+1).toFixed(0);
        }
        else this.multicastElement.style.display = 'none';

        if(this.lifesteal > 0) this.damageElement.classList.add('lifesteal');
        else this.damageElement.classList.remove('lifesteal');
        if(this.maxAmmo) {
            this.ammoElement.style.display ='block';
            const maxAmmoDots = this.size*60/15;
            if(this.maxAmmo>maxAmmoDots) {
                this.ammoElement.innerHTML = '<div class="ammo-icon ammo-icon-empty"></div>'.repeat(Math.max(0,maxAmmoDots-this.ammo)) +
                '<div class="ammo-icon ammo-icon-full"></div>'.repeat(Math.min(this.ammo,maxAmmoDots));
            } else {
                this.ammoElement.innerHTML = '<div class="ammo-icon ammo-icon-empty"></div>'.repeat(this.maxAmmo-this.ammo) +
                '<div class="ammo-icon ammo-icon-full"></div>'.repeat(this.ammo);
            }
            const ammoWidth = Math.min(this.size*60, this.maxAmmo*15);
            this.ammoElement.style.width= `${ammoWidth}px`;            
        }
        else this.ammoElement.style.display = 'none';

        if(this.battleStats.damage) {
            this.battleStatsElement.querySelector('.damage-element').style.display = 'block';
            this.battleStatsElement.querySelector('.damage-element').textContent = this.battleStats.damage.toFixed(0);
        }

        if(this.battleStats.shield) {
            this.battleStatsElement.querySelector('.shield-element').style.display = 'block';
            this.battleStatsElement.querySelector('.shield-element').textContent = this.battleStats.shield.toFixed(0);
        }

        if(this.battleStats.burn) {
            this.battleStatsElement.querySelector('.burn-element').style.display = 'block';
            this.battleStatsElement.querySelector('.burn-element').textContent = this.battleStats.burn.toFixed(0);
        }

        if(this.battleStats.poison) {
            this.battleStatsElement.querySelector('.poison-element').style.display = 'block';
            this.battleStatsElement.querySelector('.poison-element').textContent = this.battleStats.poison.toFixed(0);
        }
        if(this.battleStats.heal) {
            this.battleStatsElement.querySelector('.heal-element').style.display = 'block';
            this.battleStatsElement.querySelector('.heal-element').textContent = this.battleStats.heal.toFixed(0);
        }
        
        

        this.priceTagElement.textContent = Number(this.value).toFixed(0);
    }
    resetCooldown() {
        this.cooldown = this.getStartingCooldownFromText(this.startItemData.cooldown);
    }
    getStartingCooldownFromText(cooldown) {
        if(typeof cooldown === 'string') {
            return parseInt(getRarityValue(cooldown.slice(1,-1), this.rarity||'Bronze'))*1000;
        }

        else if(cooldown) {
            return cooldown * 1000;
        }
        return 0;

    }
    reset() {
        Object.assign(this, this.startItemData);
        this.tags = structuredClone(this.startItemData.tags);

        if(this.enchant) this.name = this.enchant + ' ' + this.name;
        if(this.enchant && Item.enchantTagMap[this.enchant]) this.tags.push(Item.enchantTagMap[this.enchant]);
        this.size = this.tags.includes('Small') ? 1 : this.tags.includes('Medium') ? 2 : 3;
        this.resetCooldown();
        this.isDestroyed = false;
        this.element.classList.remove('destroyed');
        this.hasteTimeRemaining = 0;
        this.hasDoubleHasteDuration = false;
        this.slowTimeRemaining = 0;
        this.numTriggers = 0;
        this.effectiveBattleTime = 0;
        this.pendingMulticasts = 0;
        this.heal = this.startItemData.heal||0;
        this.critMultiplier = 100; //default crit multiplier is 100% more damage
        this.freezeBonus = 0;
        this.battleStats = {};
        this.battleStatsElement.querySelectorAll('div').forEach(div => div.style.display = 'none');
        setupChangeListeners(this,Item.possibleChangeAttributes);

        this.crit = this.calculateCrit()+(this.startItemData.crit||0);
        this.freezeDurationRemaining = 0;
        this.freezeElement.classList.add('hidden');
        this.element.classList.remove('frozen',...Item.rarityLevels, ...Item.possibleEnchants);
        this.element.classList.add(this.rarity || 'Bronze');
        if(this.enchant) {
            this.element.classList.add(this.enchant);
        }
    
        this.value = this.startItemData.value;
        this.damage = this.startItemData.damage||0;
        this.shield = this.startItemData.shield||0;
        this.burn = this.startItemData.burn||0;
        this.poison = this.startItemData.poison||0;

        this.multicast = 0;
        this.maxAmmo = this.startItemData.ammo||0;
        this.ammo = this.maxAmmo;

        this.triggerFunctions = [];
        this.adjacentItemTriggers = []; //functions to call when any item adjacent to this item is triggered
        this.hasteTriggers = []; //functions to call when haste is applied to this item
        this.slowTriggers = []; //functions to call when slow is applied to this item   

        if(this.progressBar) {
            this.progressBar.style.bottom = '-5px';
            this.progressBar.style.display = 'none';   
            this.hasteIndicator.classList.add('hidden');
            this.slowIndicator.classList.add('hidden');             
        }            
    }
    setup() {
        if(!this.executeSpecificItemFunction()) {
            this.text.forEach(text => this.setupTextFunctions(text));
        }
        if(this.enchant) {
            if(this.enchant!='Radiant') {
                this.setupTextFunctions(this.enchants[this.enchant]);
            }            
        }       
    }

    getInitialValue() {
        const rarityIndex = Item.rarityLevels.indexOf(this.rarity || 'Bronze');
        return  (this.enchant?2:1) * this.size * Math.pow(2, rarityIndex);           
    }

    adjacentItemTriggered(item) {
        this.adjacentItemTriggers.forEach(func => func(item));
    }

    createElement() {
        const mergedSlot = document.createElement('div');
        mergedSlot.innerHTML = `<div class="trigger-values">
            <div class="damage-element"></div>
            <div class="burn-element"></div>
            <div class="poison-element"></div>
            <div class="heal-element"></div>
            <div class="shield-element"></div>
            <div class="multicast-element"></div>
            <div class="ammo-element"></div>
            </div>
            <div class="price-tag"></div>
        </div>`;        
        this.triggerValuesElement = mergedSlot.querySelector('.trigger-values');
        this.damageElement = this.triggerValuesElement.querySelector('.damage-element');
        this.burnElement = this.triggerValuesElement.querySelector('.burn-element');
        this.poisonElement = this.triggerValuesElement.querySelector('.poison-element');
        this.healElement = this.triggerValuesElement.querySelector('.heal-element');
        this.shieldElement = this.triggerValuesElement.querySelector('.shield-element');
        this.multicastElement = this.triggerValuesElement.querySelector('.multicast-element');
        this.ammoElement = this.triggerValuesElement.querySelector('.ammo-element');
        mergedSlot.className = 'merged-slot';
        
        // Add classes for each tag
        if (this.tags && Array.isArray(this.tags)) {
            this.tags.forEach(tag => {
                mergedSlot.classList.add(`tag-${tag.toLowerCase()}`);
            });
        }
        mergedSlot.classList.add(this.rarity || 'Bronze', 'editorOpener');
        mergedSlot.style.width = `${this.size * 80 + this.startIndex*2}px`;
        mergedSlot.style.left = `calc(${this.startIndex * 80 + this.startIndex*2}px)`;
        mergedSlot.draggable = true;
        mergedSlot.setAttribute('data-size', this.size);
        mergedSlot.addEventListener('click', () => {
            this.showEditor();
        });
        
        if (this.icon) {
            const icon = document.createElement('img');
            icon.src = this.icon;
            icon.draggable = false;
            mergedSlot.appendChild(icon);
        }

        mergedSlot.addEventListener('dragstart', Board.handleDragStart);
        mergedSlot.addEventListener('dragend', Board.handleDragEnd);
        mergedSlot.addEventListener('touchstart', Board.handleTouchStart);
        mergedSlot.addEventListener('touchend', Board.handleTouchEnd);
        // Add event listeners
        mergedSlot.addEventListener('mouseenter', () => {
            if(this.isDestroyed) return;
            this.tooltip = this.createTooltipElement();
            this.element.appendChild(this.tooltip);
        });
        
        mergedSlot.addEventListener('mouseleave', () => {
            this.tooltip.style.display = 'none';
            this.tooltip.remove();
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
        let rarityIndex = Item.rarityLevels.indexOf(this.rarity || 'Bronze');
        // Create HTML content with structured layout
        let tooltipContent = `
            <div class="tooltip-content">
                ${this.ammo ? `
                    <div class="tooltip-ammo">
                        Ammo<br>${this.ammo}
                    </div>
                ` : ''}
                ${this.cooldown ? `
                    <div class="tooltip-cooldown-circle ${this.rarity||'Bronze'}Border">${(this.cooldown/1000).toFixed(1)}<span class="unit">SEC</span></div>
                ` : ''}
                <div class="tooltip-tags">
                    ${tagsArray.map(tag => `<span class="tag tooltip-tag-${tag.toLowerCase()}">${tag}</span>`).join('')}
                </div>
                <div class="tooltip-name ${this.rarity||'Bronze'}Border">${this.name}</div>
                <div class="tooltip-main ${this.rarity||'Bronze'}Border">                    
                    <div class="tooltip-main-text">
                        ${colorTextArray(this.text,rarityIndex)}
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
                        ${this.lifesteal>0?'Lifesteal<br>':''}
                        ${this.critMultiplier>100?'Crit Multiplier: '+this.critMultiplier+'%<br>':''}
                        ${this.enchant?this.enchants[this.enchant]+'<br>':''}
                    </div>
                </div>
            </div>
        `;
        
        tooltip.innerHTML = tooltipContent;
        return tooltip;
    }

    static getDataFromName(itemName) {
        return structuredClone(items[itemName]);
    }
    static constructFromName(itemName, board) {
        let itemData = Item.getDataFromName(itemName);
        return new Item(itemData, board);
    }
    updateElementPosition() {
        this.element.style.left = `${(this.startIndex * 84)}px`;
    }
    setIndex(index) {
        this.startIndex = index;
        this.updateElementPosition();
        // Sort the board's items array after changing an index
        if (this.board) {
            this.board.sortItems();

//            Board.resetBoards(); //need to rerun the text functions for new position of item and reset player regen/life/etc
  //          updateUrlState();

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
    calculateCrit() {
        let critRegex = /^Crit Chance (?:\(\s*(\d+)%(?:\s*»\s*(\d+)%)*\s*\)|(\d+)%)\.?/i;      
        for (const textElement of this.text) {
            const match = textElement.match(critRegex);
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

    applyHaste(duration) {
        this.hasteTimeRemaining += duration * 1000;
        this.hasteTriggers.forEach(func => func(this));
        this.board.hasteTriggers.forEach(func => func(this));
    }

    applyHasteTo(item,duration) {
        if(this.hasDoubleHasteDuration) {
            duration*=2;
        }
        item.applyHaste(duration);
        log(this.name + " hastened " + item.name + " for " + duration + " seconds");
    }

    applySlow(duration) {
        this.slowTimeRemaining += duration * 1000;        
    }

    applySlowTo(item,duration) {
        if(this.hasDoubleSlowDuration) {    
            item.applySlow(duration*2); 
        }else{
            item.applySlow(duration);
        }
        log(this.name + " slowed " + item.name + " for " + duration + " seconds");
        this.board.slowTriggers.forEach(func => func(item,this));
    }

    updateProgressBar(progress) {
        this.progressBar.style.bottom = `calc(${progress}% - 5px)`;        
        this.updateStatusIndicators();
    }

    updateBattle(timeDiff) {
        if (!this.progressBar || this.isDestroyed) return;
        if(this.freezeDurationRemaining > 0) {
            this.freezeDurationRemaining -= timeDiff;
            if(this.freezeDurationRemaining > 0) {
                this.element.classList.add('frozen');       
                this.freezeElement.classList.remove('hidden');
                this.freezeElement.textContent = (this.freezeDurationRemaining/1000).toFixed(1);
                return;
            }
            this.freezeDurationRemaining = 0;
            this.element.classList.remove('frozen');
            this.freezeElement.classList.add('hidden');
        }

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
        if(this.maxAmmo && this.ammo<=0 && this.numTriggers < Math.floor((effectiveTimeDiff+this.effectiveBattleTime) / this.cooldown)) {
            //don't progress battle time if no ammo is remaining and the item is ready to trigger
            return;
        }
        this.effectiveBattleTime += effectiveTimeDiff;
        // Update progress and check for triggers
        const progress = (this.effectiveBattleTime % this.cooldown) / this.cooldown * 100;
        this.updateProgressBar(progress);

        const newTriggers = Math.floor(this.effectiveBattleTime / this.cooldown);
        if (newTriggers > this.numTriggers && (!this.maxAmmo || this.ammo>0)) {
            if(this.maxAmmo) this.ammo--;
            if(this.multicast>0) {
                this.pendingMulticasts+=parseInt(this.multicast);    
            }
            this.numTriggers =this.numTriggers+1;
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

    doICrit() {
        if(this.crit && this.battleRandom(this.crit / 100)) {
            return true;
        }
        return false;
    }
    applyDamage(damage) {
        this.dealDamage(damage);
    }
    dealDamage(damage) {
        let doesCrit = this.doICrit();
        // Handle critical hits using itemData.crit (0-100) instead of critChance

        if (doesCrit) {
            damage *= (1+this.critMultiplier/100);
        }

        this.board.player.hostileTarget.takeDamage(damage);
        log(this.name + (doesCrit?" critically strikes and":"") +
            " deals "+ damage+" damage to " +
            this.board.player.hostileTarget.name);            
        if(this.lifesteal >0) {
            let oldHealth = this.board.player.health;
            if(this.board.player.health +damage > this.board.player.maxHealth) {
                this.board.player.health = this.board.player.maxHealth;
            } else {
                this.board.player.health += damage;
            }
            log(this.name + " lifesteals " + (this.board.player.health-oldHealth) + " health");
        }
        if(doesCrit) {
            this.board.itemDidCrit(this);
        }
        if(this.battleStats.damage == undefined) this.battleStats.damage = 0;
        this.battleStats.damage += damage;
    }
    applyShield(shieldAmount) {
        let doesCrit = this.doICrit();
        if(doesCrit) {
            shieldAmount *= (1+this.critMultiplier/100);
        }
        log(this.name + (doesCrit?"critically ":"")+" shielded " + this.board.player.name + " for " + shieldAmount);
        this.board.player.applyShield(shieldAmount);
        if(doesCrit) {
            this.board.itemDidCrit(this);
        }
        this.board.shieldTriggers.forEach(func => func(this));
        if(this.battleStats.shield == undefined) this.battleStats.shield = 0;
        this.battleStats.shield += shieldAmount;
    }
    applyBurn(burnAmount, source,{selfTarget}={selfTarget:false}) {
        let doesCrit = this.doICrit();
        if(doesCrit) {
            burnAmount *= (1+this.critMultiplier/100);
        }
        const target = (selfTarget?this.board.player:this.board.player.hostileTarget);
        log(this.name + (doesCrit?"critically ":"")+" burned " + target.name + " for " + burnAmount);
        target.applyBurn(burnAmount);
        if(doesCrit) {
            this.board.itemDidCrit(this);
        }
        this.board.burnTriggers.forEach(func => func(this));
        if(this.battleStats.burn == undefined) this.battleStats.burn = 0;
        this.battleStats.burn += burnAmount;
    }
    applyHeal(healAmount) {
        let doesCrit = this.doICrit();
        if(doesCrit) {
            healAmount *= (1+this.critMultiplier/100);
        }
        log(this.name + (doesCrit?"critically ":"")+" healed " + this.board.player.name + " for " + healAmount);
        this.board.player.heal(healAmount);
        if(doesCrit) {
            this.board.itemDidCrit(this);
        }
        if(this.battleStats.heal == undefined) this.battleStats.heal = 0;
        this.battleStats.heal += healAmount;
    }
    applyFreeze(duration,source) {
        if(this.enchant=='Radiant') return;
        if(!this.isFreezeTargetable()) return;
        if(source&&source.freezeBonus) {
            duration += source.freezeBonus;
        }
        this.freezeDurationRemaining += duration*1000;
        this.element.classList.add('frozen');
        this.freezeElement.textContent = (this.freezeDurationRemaining/1000).toFixed(1);
        this.freezeElement.classList.remove('hidden');

        log(this.name + " was frozen by " + source.name + " for " + duration + " seconds");
        this.board.freezeTriggers.forEach(func => func(this,source));
    }
    removeFreeze(source) {
        if (this.freezeDurationRemaining <= 0) 
            return;
        this.freezeDurationRemaining = 0;
        this.element.classList.remove('frozen');
        this.freezeElement.classList.add('hidden');
        log(source.name + ' unfroze ' + this.name);
    }
    removeSlow() {
        if (this.slowTimeRemaining <= 0) 
            return;
        this.slowTimeRemaining = 0;
        this.isSlowed = 0;
        log(this.name + " was un-slowed");
    }
    applyPoison(poisonAmount,source,{selfTarget}={selfTarget:false}) {
        let doesCrit = this.doICrit();
        if(doesCrit) {
            poisonAmount *= (1+this.critMultiplier/100);
        }
        const target = (selfTarget?this.board.player:this.board.player.hostileTarget);
        log(this.name + (doesCrit?"critically ":"")+" poisoned " + target.name + " for " + poisonAmount.toFixed(0));
        target.applyPoison(poisonAmount);
        if(doesCrit) {
            this.board.itemDidCrit(this);
        }
        this.board.poisonTriggers.forEach(func => func(this));
        if(this.battleStats.poison == undefined) this.battleStats.poison = 0;
        this.battleStats.poison += poisonAmount;
    }
    getWeaponTriggerFunction(text) {
        let match;

        //Deal damage equal to your enemy's max health
        //Deal damage equal to ( 20% » 30% ) of your enemy's Max Health.
        let damageRegex = /Deal damage equal to \(?([^)]+)?\)?(?: of )?(your|your enemy's|the enemy's) Max Health\.?/i;
        match = text.match(damageRegex);

        if(match) {
            const dmgMultiplier = match[1]?getRarityValue(match[1], this.rarity):100;
            if(match[2]=='your') {
                this.gain(this.board.player.maxHealth*dmgMultiplier/100,'damage');
                this.board.player.maxHealthChanged((newMaxHealth,oldMaxHealth)=>{
                    this.gain(newMaxHealth*dmgMultiplier/100 - oldMaxHealth*dmgMultiplier/100,'damage');
                });


            } else {
                this.gain(this.board.player.hostileTarget.maxHealth*dmgMultiplier/100,'damage');
                this.board.player.hostileTarget.maxHealthChanged((newMaxHealth,oldMaxHealth)=>{
                    this.gain(newMaxHealth*dmgMultiplier/100 - oldMaxHealth*dmgMultiplier/100,'damage');
                });
            }            


            return () => {
                this.dealDamage(this.damage);
            };



        }
        //educe its cooldown by 5% for the fight.
        damageRegex = /Reduce its cooldown by (\d+)% for the fight\.?/i;
        match = text.match(damageRegex);
        if(match) {
            const cooldownReduction = getRarityValue(match[1], this.rarity);
            return (item) => {
                const target = item||this;
                target.gain(target.cooldown*(1-cooldownReduction/100) - target.cooldown,'cooldown');
            };
        }
        //Your weapons gain ( 2 » 4 » 6 » 8 ) damage for the fight.
        //your Shield items gain (  5  » 10  » 15   ) Shield for the fight
        damageRegex = /^Your ([^\s]+)\s*(?:items)? gain (?:\(([^)]+)\)|(\d+))\s+([^\s]+)\s+for the fight\.?/i;
        match = text.match(damageRegex);

        if(match) {
            const gainAmount = match[2]?getRarityValue(match[2], this.rarity):parseInt(match[3]);
            return () => {
                this.board.items.forEach(item => {
                    if(item.tags.includes(Item.getTagFromText(match[1]))) {
                        item.gain(gainAmount,match[4].toLowerCase());
//                        log(item.name + " gained " + gainAmount + " " + match[4] + " for the fight");
                      //  item.updateTriggerValuesElement();

                    }
                });
            };
        }

        //Adjacent (Weapons|Tool items|Tools) gain ( 5 » 10 ) Damage for the fight.
        damageRegex = /(this and)?\s*Adjacent ([^\s]+)s?\s*(?:items)?\s*gain (?:\(([^)]+)\)|(\d+)) ([^\s]+)(?: chance)? for the fight\.?/i;
        match = text.match(damageRegex);
        if(match) {
            const itemType = match[2];
            const gainAmount = match[3] ? getRarityValue(match[3], this.rarity) : parseInt(match[4]);            
            return () => {
                const adjacentItems = this.getAdjacentItems().filter(item => item.tags.includes(Item.getTagFromText(itemType)));

                if(match[1]) adjacentItems.push(this);
                adjacentItems.forEach(item => {
                    item.gain(gainAmount,match[5].toLowerCase());
                    log(item.name + " gained " + gainAmount + " " + match[5] + " for the fight");
                });


            };
        }


        //Deal damage equal to the highest Shield value of items you have.  
        damageRegex = /Deal damage equal to the highest Shield value of items you have/i;
        match = text.match(damageRegex);
        if(match) {
            const shieldItems = this.board.items.filter(item => item.tags.includes("Shield"));
            this.highestShieldValue = shieldItems.reduce((max, item) => Math.max(max, item.shield), 0);
            this.damage = this.highestShieldValue;

            this.board.shieldValuesChangedTriggers.set(this.id, (shieldItem) => {
                if(shieldItem.shield != this.highestShieldValue) {
                    let shieldDiff = shieldItem.shield - this.highestShieldValue;
                    this.highestShieldValue = shieldItem.shield;
                    this.gain(shieldDiff,'damage');
                    this.updateTriggerValuesElement();
                }
            });

            return () => {
                this.dealDamage(this.damage);
            };

        } 
               
        //it also gains ( +10 » +20 » +30 » +40 ) damage.
        damageRegex = /it also gains (\([^)]+\)|\+?\d+) damage/i;
        match = text.match(damageRegex);
        if(match) {
            const dmgGain = getRarityValue(match[1], this.rarity);
            return (item) => {
                item.gain(dmgGain,'damage');
            };
        }

        //Deal ( 10 » 20 » 30 » 40 ) damage.
        damageRegex = /^Deal (?:\(([^)]+)\)|(\d+)) damage/i;
        match = text.match(damageRegex);
        if(match) {
            const damageValue = match[1] ? getRarityValue(match[1], this.rarity) : parseInt(match[2]);
            this.gain(damageValue,'damage');
            return () => {   
                this.dealDamage(this.damage);        
            };
        }

        //Crit Chance 20%
        let critRegex = /^Crit Chance (?:\(\s*(\d+)%(?:\s*»\s*(\d+)%)*\s*\)|(\d+)%)\.?/i;
        match = text.match(critRegex);
        if(match) {
            const critChance = match[1] ? getRarityValue(match[1], this.rarity) : parseInt(match[2]);
            this.crit = critChance + (this.startItemData.crit||0);
            return () => {};
        }
        return null;
    }
    isHasteTargetable() {
        return this.cooldown && this.cooldown>0 && this.isDestroyed == false;
    }
    isSlowTargetable() {
        return !this.isDestroyed && this.cooldown > 0 && (this.slowTimeRemaining <= 0 || !this.board.items.some(item => item.slowTimeRemaining <= 0 && item.isHasteTargetable()));        
    }
    isChargeTargetable = this.isHasteTargetable;
    isFreezeTargetable() {
        return !this.isDestroyed && this.cooldown > 0 && (this.freezeDurationRemaining <= 0 || !this.board.items.some(item => item.freezeDurationRemaining <= 0 && item.isHasteTargetable()));
    }

        
    getSlowTriggerFunctionFromText(text) {        
        let regex = /Slow (?:\(([^)]+)\)|(\d+)|an) (?:(\w+) )?items?\(?s?\)?\s*for (?:\(([^)]+)\)|(\d+)) second/i;
        let match;
        if (regex.test(text)) {            
            const [_, itemsRange, singleItemCount, requiredTag, durationRange, singleDuration] = text.match(regex);
                if(singleItemCount == 'an') {
                    singleItemCount = 1;
                }
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
                    const selectedItems = this.pickRandom(items,numItemsToSlow);
                    
                    if(selectedItems && selectedItems.length>0) {
                        selectedItems.forEach(i => {
                            this.applySlowTo(i,duration);
                        });
                    }

            };
        }
        //slow it for (  2  » 4   ) second(s).
        regex = /slow it for (?:\(([^)]+)\)|(\d+)) second\(?s?\)?\.?/i;
        match = text.match(regex);
        if(match) {
            const duration = parseInt(match[1] ? getRarityValue(match[1], this.rarity) : match[2]);
            return (item) => {
                this.applySlowTo(item,duration);
            };

        }
        return null;
    }

    getHasteTriggerFunctionFromText(text) {      
        // Haste (  2  » 4  » 6   ) items 2 second(s).  
        let regex = /^Haste (?:\(([^)]+)\)|(\d+)) (?:(\w+) )?items?.* for (?:\(([^)]+)\)|(\d+)) second/;
        let match;
        if (regex.test(text)) {                
            const [_, itemsRange, singleItemCount, requiredTag, durationRange, singleDuration] = text.match(regex);
                
            const numItemsToHaste = itemsRange ? 
                getRarityValue(itemsRange, this.rarity) : 
                parseInt(singleItemCount);
            const duration = durationRange ? 
                getRarityValue(durationRange, this.rarity) : 
                parseInt(singleDuration);
            
            return () => {
                let items = Array.from(this.board.items);
                items = items.filter(i => i.isHasteTargetable());        
                if (requiredTag) {
                    items = items.filter(i => i.tags && i.tags.includes(requiredTag));
                }
                const selectedItems = this.pickRandom(items,numItemsToHaste);
            
                selectedItems.forEach(i => {
                    this.applyHasteTo(i,duration);
                    log(this.name + " hasted " + i.name + " for " + duration + " seconds");
                });
            };
        }
        regex = /^Haste your items for (?:\(([^)]+)\)|(\d+)) second/i;
        if (regex.test(text)) {
            const duration = getRarityValue(text.match(regex)[1], this.rarity);
            return () => {
                this.board.items.forEach(i => this.applyHasteTo(i,duration));
                log(this.name + " hasted all items for " + duration + " seconds");
            };
        }
        //slow all enemy items for ( 1 » 2 » 3 » 4 ) second(s).
        regex = /^slow all enemy items for (?:\(([^)]+)\)|(\d+)) second\(?s?\)?\.?$/i;
        match = text.match(regex);
        if(match) {
            const duration = getRarityValue(match[1], this.rarity);
            return () => {
                this.board.player.hostileTarget.board.items.forEach(i => this.applySlowTo(i,duration));
                log(this.name + " slowed all enemy items for " + duration + " seconds");
            };
        }
        
        
        //Haste ( 1 » 2 » 3 » 4 ) Aquatic or Toy item(s) for 2 second(s).
        //Haste a weapon (  3  » 5  » 7  » 9   ) second(s).
        regex = /^Haste (?:\(([^)]+)\)|(\d+)|an?) (non-)?([^\s]+)(?: or \s*([^\s^\d]+))?\s*(?:item|items|item\(s\))? (?:for )?(?:\(([^)]+)\)|(\d+)) second\(?s?\)?\.?$/i;
        match = text.match(regex);
        if(match) {
            const isNon = match[3] == "non-";
            const tagToMatch = Item.getTagFromText(match[4]);
            const orTagToMatch = Item.getTagFromText(match[5]);
            const numToHaste = parseInt(match[1] ? getRarityValue(match[1], this.rarity) : match[2]?match[2]:1);
            const hasteAmount = parseInt(match[6] ? getRarityValue(match[6], this.rarity) : match[7]);
            const itemsToHaste = tagToMatch ? this.board.items.filter((item) => 
                item.tags.includes(tagToMatch)!==isNon ||
                (orTagToMatch?item.tags.includes(orTagToMatch):false)
            ) : this.board.items;
            return ()=>{
                this.pickRandom(itemsToHaste,numToHaste).forEach(item=>item.applyHaste(hasteAmount,this));
            };

        }


        //Haste another item for ( 1 » 2 » 3 » 4 ) second(s).
        //Haste an item for ( 1 » 2 » 3 ) second(s)
        regex = /^Haste (an|another) item for (?:\(([^)]+)\)|(\d+)) second\(?s?\)?\.?/i;
        if (regex.test(text)) {
            const [_, target, durationRange, singleDuration] = text.match(regex);
            const duration = durationRange ? 
                getRarityValue(durationRange, this.rarity) : 
                parseInt(singleDuration);
            return () => {
                let itemToHaste = this.pickRandom(this.board.items);
                this.applyHasteTo(itemToHaste,duration);
                log(this.name + " hasted "+itemToHaste.name+" for " + duration + " seconds");
            };
        }
        regex = /^Haste the item to the right of this for (\([^)]+\)|\d+) second\(?s?\)?\.?$/i;
        if (regex.test(text)) {
            const duration = getRarityValue(text.match(regex)[1], this.rarity);
            const itemToHaste = this.getItemToTheRight();
            return (item) => { 
                if(itemToHaste) {
                    this.applyHasteTo(itemToHaste,duration);
                }
            }
            
        }

        //Haste this ( 1 » 2 » 3 » 4 ) second(s).
        regex = /^Haste this(?:\s+(?:\(\s*([^)]+)\s*\)|\d+) second\(?s?\)?\.?)$/i;
        match = text.match(regex);
        if(match) {
            const duration = getRarityValue(match[1], this.rarity);
            return () => {
                this.applyHasteTo(this,duration);
            };
        }

        regex = /^Haste the item to the left of this/i;
        if (regex.test(text)) {
            const itemToHaste = this.getItemToTheLeft();
            if(itemToHaste) {
                this.applyHasteTo(itemToHaste,duration);
                log(this.name + " hasted "+itemToHaste.name+" for " + duration + " seconds");
            }

        }
        //Haste adjacent items for ( 1 » 2 » 3 ) second(s)
        regex = /^Haste adjacent items (?:for)?\s*(\([^]+\)|\d+) second\(?s?\)?\.?/i;
        match = text.match(regex);
        if(match) {
            const duration = getRarityValue(match[1], this.rarity);
            return () => {
                this.getAdjacentItems().forEach(item => this.applyHasteTo(item,duration));
                log(this.name + " hasted adjacent items for " + duration + " seconds"); 
            };
        }


        regex = /^Haste it for (?:\(([^)]+)\)|(\d+)) second\(?s?\)?\.?/i;
        match = text.match(regex);
        if(match) {
            const duration = parseInt(match[1] ? getRarityValue(match[1], this.rarity) : match[2]);
            return (item) => {
                this.applyHasteTo(item,duration);
                log(this.name + " hasted "+item.name+" for " + duration + " seconds");
            };

        }
        //this gains Haste for ( 2 » 4 ) second(s)
        regex = /this gains Haste for (?:\(([^)]+)\)|(\d+)) second\(?s?\)?\.?/i;
        match = text.match(regex);
        if(match) {

            const duration = parseInt(match[1] ? getRarityValue(match[1], this.rarity) : match[2]);
            return () => {
                this.applyHasteTo(this,duration);
                log(this.name + " gained haste for " + duration + " seconds");
            };
        }
        return null;
    }

    getPoisonTriggerFunctionFromText(text) {
        let regex = /Poison (?:\(([^)]+)\)|(\d+))\.?/i;
        let match = text.match(regex);
        if(match) {
            const poisonAmount = match[1] ? getRarityValue(match[1], this.rarity) : parseInt(match[2]);
            this.gain(poisonAmount,'poison');
            return () => {                
                this.applyPoison(this.poison);
            };
        }      
        //Poison both players ( 4 » 6 » 8 » 10 ). from Noxious Potion
        regex = /^Poison both players (\([^)]+\)|\d+)\.?/i;
        match = text.match(regex);
        if(match) {
            const poisonAmount = getRarityValue(match[1], this.rarity);
            return () => {
                this.applyPoison(poisonAmount);
                this.applyPoison(poisonAmount,{selfTarget:true});
            };
        }
        
        return null;
    }


    getBurnTriggerFunctionFromText(text) {
        let regex = /Burn (?:\(([^)]+)\)|(\d+))\.?/i;
        let match = text.match(regex);
        if(match) {
            const burnAmount = match[1] ? getRarityValue(match[1], this.rarity) : parseInt(match[2]);

            this.gain(burnAmount,'burn');
            return () => {                
                this.applyBurn(this.burn);
            };

        }
        //Burn equal to ( 1 » 2 ) times this item's damage.
        regex = /^([^\s]+) equal to (\([^)]+\)|(\d+)|double|triple)?(?: times)?\s*this item's damage/i;
        match = text.match(regex);
        if(match) {
            const whatToDo = match[1].toLowerCase();
            const multiplier = !match[2]? 1 : match[2]=='double'?2:match[2]=='triple'?3:parseInt(getRarityValue(match[2], this.rarity));
            this.gain(this.damage * multiplier,whatToDo);
            this.damageChanged((newDamage,oldDamage)=>{
                if(newDamage != oldDamage) {
                    this.gain((newDamage-oldDamage)*multiplier,whatToDo);
                }
            });


            return () => {          
                this.applyBurn(this.burn);
            };


        }
        //Increase your other items' Burn by 2. from Ruby
        regex = /^Increase your other items' ([^\s]+)(?: chance)? by (?:\(([^)]+)\)|(\d+))\.?/i;
        match = text.match(regex);
        if(match) {
            const gainAmount = parseInt(match[2] ? getRarityValue(match[2], this.rarity) : match[3]);
            const whatToGain = match[1].toLowerCase();
            return () => { 
                this.board.items.forEach(item => {
                    if(item.id != this.id) {
                        item.gain(gainAmount,whatToGain);
                    }
                });
            };
        }


        return null;

    }

    getHealTriggerFunctionFromText(text) {
        let regex = /Heal (?:\(([^)]+)\)|(\d+))/i;
        let match = text.match(regex);
        if(match) {
            const healAmount = match[1] ? getRarityValue(match[1], this.rarity) : parseInt(match[2]);
            this.gain(healAmount,'heal');
            return () => {                
                this.applyHeal(this.heal);

                log(this.name + " healed " + this.board.player.name + " for " + healAmount);
            };
        }
        //Heal equal to this item's Damage.
        regex = /Heal equal to this item's Damage/i;
        match = text.match(regex);
        if(match) {
            this.gain(this.damage,'heal');
            this.damageChanged((newDamage,oldDamage)=>{
                if(newDamage != oldDamage) {
                    this.gain((newDamage-oldDamage),'heal');
                }
            });
            return () => {
                this.applyHeal(this.heal);
            };

        }

        //Heal equal to ( 1x » 2x » 3x » 4x ) this item's value
        regex = /Heal equal to (\([^)]+\)|\d+x)(?: times)? this item's value/i;
        match = text.match(regex);
        if(match) {
            const healMultiplier = parseInt(getRarityValue(match[1], this.rarity));
            this.heal = this.value * healMultiplier;
            this.valueChanged((newValue,oldValue)=>{
                if(newValue != oldValue) {
                    this.gain((newValue-oldValue)*healMultiplier,'heal');
                }
            });
            return () => {                
                this.applyHeal(this.heal);
            };
        }
        //Heal equal to your Shield.
        regex = /Heal equal to your Shield\.?/i;
        match = text.match(regex);

        if(match) {
            this.board.player.shieldChanged((oldShield,newShield)=>{
                this.gain(newShield-oldShield,'heal');
            });
            return () => {
                this.applyHeal(this.heal);
            };
        }
        //permanently gain ( +10 » +20 » +40 ) Max Health.
        regex = /permanently gain (\([^)]+\)|\d+) Max Health/i;
        match = text.match(regex);
        if(match) {
            const maxHealthToGain = getRarityValue(match[1], this.rarity);            
            return () => {
                this.board.player.maxHealth += maxHealthToGain;
            };
        }
        //Heal equal to ( 5% » 10% » 15% ) of your Max Health. from Lemonade Stand
        regex = /Heal equal to (\([^)]+\)|\d+%) of your Max Health/i;
        match = text.match(regex);
        if(match) {
            const healMultiplier = getRarityValue(match[1], this.rarity);
            this.gain(this.board.player.maxHealth * healMultiplier/100,'heal');
            this.board.player.maxHealthChanged((newHealth,oldHealth)=>{
                this.gain((newHealth-oldHealth)*healMultiplier/100,'heal');
            });
            return () => {
                this.applyHeal(this.heal);
            };
        }

        return null;
    }   


    getItemToTheLeft() {
        const itemIndex = this.board.items.indexOf(this);
        if (itemIndex > 0) {
            const leftItem = this.board.items[itemIndex-1];
            if(leftItem.startIndex + leftItem.size == this.startIndex) {
                return leftItem.isDestroyed ? null : leftItem; //if the left item is directly adjacent to this item, return it
            }
        } 
        return null;
    }

    getItemToTheRight() {
        const itemIndex = this.board.items.indexOf(this);
        if (itemIndex < this.board.items.length - 1) {
            const rightItem = this.board.items[itemIndex + 1];
            if(this.startIndex + this.size == rightItem.startIndex) {
                return rightItem.isDestroyed ? null : rightItem; //if the right item is directly adjacent to this item, return it
            }
        } 
        return null;
    }
    getAdjacentItems() {
        return [this.getItemToTheLeft(), this.getItemToTheRight()].filter(item => item !== null);
    }

    gain(amount,type,source) {
        amount = parseFloat(amount);
        if(!["cooldown"].includes(type)) {
            log(this.name + " gained " + amount.toFixed(0) + " " + type + (source?(" from "+source.name):""));
        }

        
        switch(type.toLowerCase()) {
            case 'ammo':
                this.ammo += amount;
                if(this.ammo>this.maxAmmo) {
                    this.ammo = this.maxAmmo;
                }
                break;
            case 'value':
                this.value = this.value+amount;
                this.board.itemValuesChangedTriggers.forEach(func => func(this));
                break;
                
            case 'shield':
                this.shield += amount;
                this.board.shieldValuesChangedTriggers.forEach(func => func(this));
                break;
                
            case 'damage':
                this.damage += amount;
                // this.board.damageChangedTriggers.forEach(func => func(this));
                break;
                

            case 'heal':
                this.heal += amount;
                // this.board.healthChangedTriggers.forEach(func => func(this));
                break;
                
            case 'gold':
                this.gold += amount;
                // this.board.goldChangedTriggers.forEach(func => func(this));
                break;
                
            case 'income':
                this.income += amount;
                // this.board.incomeChangedTriggers.forEach(func => func(this));
                break;
                
            case 'poison':
                this.poison += amount;
                // this.board.poisonChangedTriggers.forEach(func => func(this));
                break;
                
            case 'burn':
                this.burn += amount;
                break;
                
            case 'crit':
            case 'crit chance':
                this.crit += amount;
                break;
            case 'critmultiplier':
                this.critMultiplier += amount;
                break;
            case 'cooldown':
                const oldCooldown = this.cooldown;
                this.cooldown += amount;
                if(this.cooldown<1000) this.cooldown = 1000; //cooldown can't go below 1 second
                log(this.name + " cooldown changed from " + (oldCooldown/1000).toFixed(1) + "s to " + (this.cooldown/1000).toFixed(1) + "s");
                break;
            case 'freezebonus':
                this.freezeBonus += amount;
                break;
        }
    }



    getFreezeTriggerFunctionFromText(text) {
        //Freeze all enemy items for (  1  » 2  » 3   ) second(s).
        let regex = /Freeze all enemy items for (?:\(([^)]+)\)|(\d+)) second\(?s\)?\.?/i;
        let match = text.match(regex);
        if(match) {
            const freezeDuration = (this.freezeBonus||0) + (match[1] ? getRarityValue(match[1], this.rarity) : parseInt(match[2]));
            return () => {
                this.board.player.hostileTarget.board.items.forEach(item => item.applyFreeze(freezeDuration,this));
            };
        }
        
        //Freeze 1 item for (  3  » 4  » 5   ) second(s). from Quick Freeze
        regex = /^Freeze (\([^)]+\)|\d+) items? for (\([^)]+\)|\d+) second\(?s\)?\.?$/i;
        match = text.match(regex);
        if(match) {
            const numItems = getRarityValue(match[1], this.rarity);
            const freezeDuration = getRarityValue(match[2], this.rarity);
            return (item) => {
                const targets = this.board.player.hostileTarget.board.items.filter(i=>i.isFreezeTargetable());
                const itemsToFreeze = this.pickRandom(targets,numItems);
                if(itemsToFreeze.length>0) itemsToFreeze.forEach(item => item.applyFreeze(freezeDuration,this));
                else {
                    log(this.name + " tried to freeze " + numItems + " item(s) but there were no items to freeze");
                }
            };
        }

        //Freeze 1 item of equal or smaller size for 1 second(s).
        regex = /^Freeze (\([^)]+\)|\d+) item(?:s)? of equal or smaller size for (\([^)]+\)|\d+) second\(?s?\)?\.?$/i;
        match = text.match(regex);
        if(match) {
            const numItems = getRarityValue(match[1], this.rarity);
            const freezeDuration = getRarityValue(match[2], this.rarity);
            return (item) => {
                const targets = this.board.player.hostileTarget.board.items.filter(i=> i.size<=(item||this).size && i.isFreezeTargetable());
                const itemsToFreeze = this.pickRandom(targets,numItems);
                if(itemsToFreeze.length>0) itemsToFreeze.forEach(item => item.applyFreeze(freezeDuration,item||this));
                else {
                    log(this.name + " tried to freeze " + numItems + " item(s) of equal or smaller size but there were no items to freeze");
                }
            };
        }

        // Freeze 1 medium or small item for ( 1 » 2 ) second(s).
        regex = /^Freeze (\([^)]+\)|\d+) medium or small item(?:s)? for (\([^)]+\)|\d+) second\(?s\)?\.?$/i;
        match = text.match(regex);
        if(match) {
            const numItems = getRarityValue(match[1], this.rarity);
            const freezeDuration = getRarityValue(match[2], this.rarity);
            return (item) => {
                const targets = this.board.player.hostileTarget.board.items.filter(i=> i.size<=2 && i.isFreezeTargetable());
                const itemsToFreeze = this.pickRandom(targets,numItems);
                itemsToFreeze.forEach(item => item.applyFreeze(freezeDuration,item||this));                
            };
        }

        //Your leftmost Freeze item gains +1 second to Freeze.      
        regex = /^Your leftmost Freeze item gains \+1 second to Freeze\.?$/i;
        match = text.match(regex);
        if(match) {
            const targets = this.board.items.filter(i=> i.tags.includes("Freeze"));
            if(targets.length>0) {
                targets[0].gain(1,'freezebonus');
            }
            return () => {};
        }
    }


    getShieldTriggerFunctionFromText(text) {        
        // Match patterns like "Shield equal to ( 1x » 2x ) the value of the adjacent items"
        let regex = /Shield equal to \(\s*(\d+)x\s*»\s*(\d+)x\s*\) the value of the adjacent items/i;
        let match = text.match(regex);
        if (match) {
            const [_, minMultiplier, maxMultiplier] = match;
            const multiplier = getRarityValue(`${minMultiplier}»${maxMultiplier}`, this.rarity);
            this.shieldAmountFromValues = this.getAdjacentItems().reduce((sum, item) => sum + item.value, 0) * multiplier;
            this.gain(this.shieldAmountFromValues,'shield');

            this.board.itemValuesChangedTriggers.set(this.id, () => {
                let newShieldAmountFromValues = this.getAdjacentItems().reduce((sum, item) => sum + item.value, 0) * multiplier;
                if(newShieldAmountFromValues != this.shieldAmountFromValues) {
                    this.gain(newShieldAmountFromValues-this.shieldAmountFromValues,'shield');
                    this.shieldAmountFromValues = newShieldAmountFromValues;
                }
            });
            return () => {
                this.applyShield(this.shield);
            };

        }
        // Gain Shield equal to your enemy's burn.
        regex = /Gain Shield equal to your enemy's burn/i;
        match = text.match(regex);
        if(match) {
            return () => {
                this.gain(this.board.player.hostileTarget.burn,'shield');
                this.applyShield(this.shield);
            };
        }
        //Shield equal to ( 1x » 2x » 3x ) your gold
        regex = /Shield equal to (\([^)]+\)|\d+x) your gold/i;
        match = text.match(regex);
        if(match) {
            const multiplier = getRarityValue(match[1], this.rarity);
            this.gain(this.gold * multiplier,'shield');
            this.board.player.goldChanged((newGold,oldGold)=>{
                this.gain((newGold-oldGold)*multiplier,'shield');
            });
            return () => {
                this.applyShield(this.shield);
            };
        }

        // Shield equal to ( 2 » 3 ) time(s) the value of your items.
        regex = /Shield equal to \(\s*(\d+)\s*»\s*(\d+)\s*\) time\(?s\)? the value of your items/i;
        match = text.match(regex);
        if (match) {
            const [_, minMultiplier, maxMultiplier] = match;
            const multiplier = getRarityValue(`${minMultiplier}»${maxMultiplier}`, this.rarity);
            const shieldAmount = this.board.items.reduce((sum, item) => sum + item.value, 0) * multiplier;
            this.gain(shieldAmount,'shield');
            this.board.itemValuesChangedTriggers.set(this.id,()=>{
                const newShield = this.board.items.reduce((sum, item) => sum + item.value, 0) * multiplier;
                if(newShield != this.shield) {
                    this.shield = newShield;
                    this.board.shieldValuesChangedTriggers.forEach(func => func(this));
                //    this.updateTriggerValuesElement();
                }
            });
            return () => {
                this.applyShield(this.shield);
            };


        }

        //Shield equal to your current Health.
        regex = /Shield equal to your current Health/i;
        match = text.match(regex);
        if (match) {
            const shieldAmount = this.board.player.health;
            this.gain(shieldAmount,'shield');
            this.board.player.healthChanged((newHealth,oldHealth)=>{
                this.gain(newHealth-oldHealth,'shield');
            }, this.id);
            return () => {
                this.applyShield(this.shield);
            };

        }
        //Your Shield items gain Shield equal to this item's value for the fight.
        regex = /^Your Shield items gain Shield equal to this item's value for the fight\.?$/i;
        match = text.match(regex);
        if(match) {
            return ()=>{
                this.board.items.forEach(item => {
                    if(item.tags.includes("Shield") || item.enchant=='Shielded') {
                        item.gain(this.value,'shield');
                    }
                });
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
            };
        }

        //Your Shield items gain ( +2 » +4 » +6 » +8 ) Shield for the fight.
        regex = /Your Shield items gain\s*\(\s*\+\s*(\d+)\s*»\s*\+\s*(\d+)\s*»\s*\+\s*(\d+)\s*»\s*\+\s*(\d+)\s*\)\s*Shield for the fight/i;
        match = text.match(regex);
        if (match) {
            const shieldAmount = getRarityValue(`${match[1]}»${match[2]}»${match[3]}»${match[4]}`, this.rarity);            
            return () => {
                const shieldItems = this.board.items.filter(item => item.tags.includes("Shield"));
                shieldItems.forEach(item => {
                    item.gain(shieldAmount,'shield');
                    log(this.name + " gave " + item.name + " " + shieldAmount + " shield");
                });
            };

        }
        //Deal damage equal to your shield
        regex = /Deal damage equal to your shield/i;
        match = text.match(regex);
        if (match) {
            this.board.player.shieldChanged((newShield,oldShield)=>{
                this.gain(newShield-oldShield,'damage');
            }, this.id);
            return () => {
                this.dealDamage(this.damage);
            };
        }
        //Shield equal to this item's damage.
        regex = /Shield equal to this item's damage/i;
        match = text.match(regex);
        if (match) {
            this.gain(this.damage,'shield');
            this.damageChanged((newDamage,oldDamage)=>{
                this.gain(newDamage-oldDamage,'shield');
            }, this.id);
            return () => {
                this.applyShield(this.shield);
            };

        }
        //Shield equal to ( 1 » 2 » 3 » 4 ) time(s) your Income.
        regex = /Shield equal to (?:\(([^)]+)\)|(\d+)) time\(?s\)? your Income/i;
        match = text.match(regex);
        if (match) {
            const multiplier =  match[1] ? getRarityValue(match[1], this.rarity) : parseInt(match[2]);
            this.gain(this.board.player.income * multiplier,'shield');
            return () => {
                this.applyShield(this.shield);
            };
        }
        //Your Shield items have +1 Shield for every (  4  » 3  » 2   ) gold you have.
        regex = /Your Shield items have \+([\d]+) Shield for every (?:\(([^)]+)\)|(\d+)) gold you have\.?/i;
        match = text.match(regex);
        if (match) {
            const multiplier = parseInt( match[2] ? getRarityValue(match[2], this.rarity) : match[3]);
            const shieldAmount = parseInt(match[1]) * multiplier;
            this.board.items.forEach(item => {
                if(item.tags.includes("Shield")) {
                    item.gain(shieldAmount,'shield');
                }
            });
            return () => {};
        }

        //Shield ( 1 » 2 » 3 » 4 ).
        regex = /Shield (?:\(([^)]+)\)|(\d+))/i;
        match = text.match(regex);
        if (match) {
            const shieldAmount = match[1] ? getRarityValue(match[1], this.rarity) : parseInt(match[2]);
            this.gain(shieldAmount,'shield');
            return () => {
                this.applyShield(this.shield);
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
    setEnchant(enchant) {
        if(this.enchant!=enchant) {
            if(this.enchant!='') {                
                const [baseName] = Item.stripEnchantFromName(this.name);
                this.startItemData.tags = structuredClone(items[baseName].tags);
            }
            this.tags = this.startItemData.tags; //reset tags to default when enchant changes
            this.enchant = enchant=='None'?'':enchant;
        }
    }
    showEditor() {
        if(!this.isEditable || document.querySelector('.item-edit-popup')!=null) return;
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
       
        let [baseName, enchant] = Item.stripEnchantFromName(itemData.name);
        enchant = this.enchant;
        const popup = document.createElement('div');
        popup.className = 'editor';
        
        // Start with basic HTML
        let popupHTML = `<h3>Edit ${itemData.name}</h3>`;
        
        // Add enchantment field
        popupHTML += `
            <div class="form-group">
                <label>Enchant:</label>
                <select id="edit-enchant">
                    ${enchantments.map(e => 
                        `<option value="${e}" ${e === enchant ? 'selected' : ''}>${e}</option>`
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

        popupHTML += `
            <div class="form-group">
                <label>Value:</label>
                <input type="number" id="edit-value" value="${this.value}">
            </div>`;
        // Add damage field only if item has damage

        if (this.tags.includes("Weapon")) {
            popupHTML += `

                <div class="form-group">
                    <label>Damage:</label>
                    <input type="number" id="edit-damage" value="${this.damage}">
                </div>`;
        }
        if(this.tags.includes("Shield")) {
            popupHTML += `
                <div class="form-group">
                    <label>Shield:</label>
                    <input type="number" id="edit-shield" value="${this.shield}">
                </div>`;
        }
        if(this.tags.includes("Poison")) {
            popupHTML += `
                <div class="form-group">
                    <label>Poison:</label>
                    <input type="number" id="edit-poison" value="${this.poison}">
                </div>`;
        }
        if(this.tags.includes("Burn")) {
            popupHTML += `
                <div class="form-group">
                    <label>Burn:</label>
                    <input type="number" id="edit-burn" value="${this.burn}">
                </div>`;
        }
        if(this.tags.includes("Ammo")) {
            popupHTML += `
                <div class="form-group">
                    <label>Max Ammo:</label>
                    <input type="number" id="edit-maxammo" value="${this.maxAmmo}">
                </div>`;
        }
        if(this.tags.includes("Heal")) {
            popupHTML += `
                <div class="form-group">
                    <label>Heal:</label>
                    <input type="number" id="edit-heal" value="${this.heal}">
                </div>`;
        }


        // Add cooldown field only if item has cooldown
        if (this.cooldown !== undefined && this.cooldown!=0) {
            popupHTML += `
                <div class="form-group">
                    <label>Cooldown (seconds):</label>
                    <input type="number" id="edit-cooldown" value="${(this.cooldown/1000).toFixed(1)}">
                </div>`;

        }
        

        // Add crit chance field only if item has damage, shield, burn, poison, or heal, or is a weapon
        if (this.damage>0 || this.shield > 0 || this.burn > 0 || this.poison > 0 || this.heal > 0 || this.tags.includes("Weapon")) {
            popupHTML += `
                <div class="form-group">
                    <label>Crit Chance (0-100):</label>

                    <input type="number" min="0" max="100" id="edit-crit" value="${this.crit || 0}">
                </div>
                <div class="form-group">
                    <label>Lifesteal:</label>
                    <select id="edit-lifesteal">
                        <option value="0" ${this.lifesteal?'':''}>No</option>
                        <option value="1" ${this.lifesteal?'selected':''}>Yes</option>
                    </select>
                </div>


                `;

        }
        

        // Add buttons
        popupHTML += `
            <div class="button-group">
                <button class="save-edit">Save</button>
                <button class="cancel-edit">Cancel</button>
            </div>`;
        
        popup.innerHTML = popupHTML;
        document.body.appendChild(popup);
        popup.querySelector('#edit-rarity').addEventListener('change',()=>{
            const initialValueFromRarity = this.getInitialValue();
            this.rarity = popup.querySelector('#edit-rarity').value;
            const newValueFromRarity = this.getInitialValue();
            const oldStartDataValue = this.startItemData.value||initialValueFromRarity;
            this.startItemData.rarity = popup.querySelector('#edit-rarity').value;
            this.startItemData.value = oldStartDataValue-initialValueFromRarity+newValueFromRarity;
            Board.resetBoards();
            updateUrlState();
            popup.remove();            
        });
        popup.querySelector('#edit-enchant').addEventListener('change',()=>{
            const initialValueFromEnchant = this.getInitialValue();
            this.enchant = popup.querySelector('#edit-enchant').value=='None'?'':popup.querySelector('#edit-enchant').value;
            const newValueFromEnchant = this.getInitialValue();
            const oldStartDataValue = this.startItemData.value||initialValueFromEnchant;
            this.startItemData.value = oldStartDataValue-initialValueFromEnchant+newValueFromEnchant;
            Board.resetBoards();
            updateUrlState();
            popup.remove();            
        });
        
        popup.querySelector('.save-edit').addEventListener('click', () => {
            Board.resetBoards();
            const enchant = popup.querySelector('#edit-enchant').value;

            // Update name with enchantment
            this.name = enchant === 'None' ? baseName : `${enchant} ${baseName}`;
            this.setEnchant(enchant);
            
            // Only update fields that exist in the form
            if (popup.querySelector('#edit-damage')) {                
                const newDamage = parseFloat(popup.querySelector('#edit-damage').value);
                this.startItemData.damage = (this.startItemData.damage||0) + (newDamage-this.damage)/this.damage_multiplier;
            }
            if (popup.querySelector('#edit-cooldown')) {
                this.startItemData.cooldown = this.startItemData.cooldown - (this.cooldown - (parseFloat(popup.querySelector('#edit-cooldown').value)*1000 || 0))/1000;
            }
            if (popup.querySelector('#edit-crit')) {
                this.startItemData.crit = parseFloat(popup.querySelector('#edit-crit').value) - this.crit;
            }            
            if (popup.querySelector('#edit-value')) {
                const newValue = parseFloat(popup.querySelector('#edit-value').value);
                this.startItemData.value = (this.startItemData.value||0) + (newValue - this.value)/this.value_multiplier;
            }
            if(popup.querySelector('#edit-poison')) {
                const newPoison = parseFloat(popup.querySelector('#edit-poison').value);
                this.startItemData.poison = (this.startItemData.poison||0) + (newPoison - this.poison)/this.poison_multiplier;
            }
            if(popup.querySelector('#edit-burn')) {
                const newBurn = parseFloat(popup.querySelector('#edit-burn').value);
                this.startItemData.burn = (this.startItemData.burn||0) + (newBurn - this.burn)/this.burn_multiplier;
            }
            if(popup.querySelector('#edit-lifesteal')) {
                this.lifesteal = popup.querySelector('#edit-lifesteal').value == '1';
                this.startItemData.lifesteal = this.lifesteal;
            }
            if(popup.querySelector('#edit-shield')) {
                Board.resetBoards();
                const newShield = parseFloat(popup.querySelector('#edit-shield').value);
                this.startItemData.shield = (this.startItemData.shield||0) + (newShield - this.shield)/this.shield_multiplier;
            }
            if(popup.querySelector('#edit-maxammo')) {
                this.startItemData.maxAmmo = parseFloat(popup.querySelector('#edit-maxammo').value);
                this.startItemData.ammo = this.startItemData.maxAmmo;
            }
            if(popup.querySelector('#edit-heal')) {
                const newHeal = parseFloat(popup.querySelector('#edit-heal').value);
                this.startItemData.heal = (this.startItemData.heal||0) + (newHeal - this.heal)/(this.heal_multiplier||1);
            }
            popup.remove();
            //this.updateStatusIndicators();
            //this.updateTriggerValuesElement();
            Board.resetBoards();



            updateUrlState();
        });
        

        popup.querySelector('.cancel-edit').addEventListener('click', () => {
            popup.remove();
        });

    }
    static stripEnchantFromName(name) {
        const enchantPrefixes = /^(Fiery|Radiant|Heavy|Golden|Icy|Turbo|Shielded|Restorative|Toxic|Shiny|Deadly)\s+/;
        if (enchantPrefixes.test(name)) {
            const match = enchantPrefixes.exec(name);
            return [name.replace(match[0], ''), match[1]];
        }
        return [name, ''];


    }

    // Add this new method to the Item class
    static compareByIndex(a, b) {
        return a.startIndex - b.startIndex;
    }

    setupTextFunctions(text) {
        if(text.match(/^At the start of each hour/i)) {
            return;
        }
        let regex = /^\s*When you(r enemy)? ([^,]*), (.*)$/i;
        let match = text.match(regex);
        let ifFunction = null;
        if(match) {
            let [_, enemyMatch, conditionalMatch, textAfterComma] = match;
            const ifregex = /(.*\.) if (.*), (.*)\./i;
            const ifmatch = textAfterComma.match(ifregex);
            let targetBoard = this.board;
            if(enemyMatch) {
                targetBoard = this.board.player.hostileTarget.board;
            }
            if(ifmatch) {
                textAfterComma = ifmatch[1];
                switch(ifmatch[2].toLowerCase()) {
                    case "it is a weapon":

                        ifFunction = (item) => {
                            if(item.tags.includes("Weapon")) {
                                if(!(('fnFromItem'+this.id) in item)) {
                                    item['fnFromitem'+this.id] = this.getTriggerFunctionFromText(ifmatch[3]);
                                }
                                if(item['fnFromitem'+this.id]) {
                                    item['fnFromitem'+this.id](item);
                                }
                            }
                        }
                    break;                
                }
            }
            const triggerFunctionFromText = this.getTriggerFunctionFromText(textAfterComma);

            const useAdjacentTagItem = conditionalMatch.match(/^use an adjacent ([^\s]+)?(?: item)?$/i);
            if(useAdjacentTagItem) {
                let tagToMatch2 = Item.getTagFromText(useAdjacentTagItem[1]);
                if(tagToMatch2.toLowerCase()=='item') {
                    tagToMatch2 = null;
                }
                const adjacentItems = this.getAdjacentItems();
                targetBoard.itemTriggers.set(this.id, (item) => {
                    if(adjacentItems.some(i=>i.id==item.id)) {
                        if(!tagToMatch2) {
                            triggerFunctionFromText(item);
                        } else if(item.tags.includes(tagToMatch2)) {
                            triggerFunctionFromText(item);
                        }

                    }
                });
                return;
            }
            const whenmatch = conditionalMatch.match(/^uses? an? ([^\s]+)(?: item)?$/i);
            if(whenmatch) {
                const tagToMatch = Item.getTagFromText(whenmatch[1]);
                this.whenItemTagTriggers(tagToMatch, triggerFunctionFromText, targetBoard);
                return;
            }


            switch(conditionalMatch.toLowerCase()) {
                case "use an item":
                    this.board.itemTriggers.set(this.id, triggerFunctionFromText);
                    return;

                case "use another item":
                    this.board.itemTriggers.set(this.id, (item) =>  {                        
                        if(item.id !== this.id) {
                            triggerFunctionFromText(item);
                        }
                    });
                    return;
                case "use another tech":
                    this.board.itemTriggers.set(this.id, (item) =>  {                        
                        if(item.id !== this.id && item.tags.includes("Tech")) {
                            triggerFunctionFromText(item);
                        }
                    });
                    return;
                case "over-heal":
                    this.board.player.overhealTriggers.set(this.id, triggerFunctionFromText);
                    return;
                case "heal":
                    this.board.player.healTriggers.set(this.id, triggerFunctionFromText);
                case "use a friend":
                    this.board.itemTriggers.set(this.id, (item) =>  {                        
                        if(item.tags.includes("Friend")) {
                            triggerFunctionFromText(item);
                        }
                    });
                    return;
                case "use another friend":
                    this.board.itemTriggers.set(this.id, (item) =>  {                        
                        if(item.id !== this.id && item.tags.includes("Friend")) {
                            triggerFunctionFromText(item);
                        }
                    });
                    return;
                case "use another aquatic item":
                    this.board.itemTriggers.set(this.id, (item) => {
                        if(item.id !== this.id && item.tags.includes("Aquatic")) {
                            triggerFunctionFromText(item);
                        }
                    });
                    return;
                case "use another weapon":
                    this.board.itemTriggers.set(this.id, (item) => {
                        if(item.id !== this.id && item.tags.includes("Weapon")) {
                            triggerFunctionFromText(item);
                        }
                    });
                    return;
                case "use a weapon":
                    this.board.itemTriggers.set(this.id, (item) =>  {                        
                        if(item.tags.includes("Weapon")) {
                            triggerFunctionFromText(item);
                        }
                    });
                    return;            
                case "use an item with ammo":
                    this.board.itemTriggers.set(this.id, (item) => {
                        if(item.tags.includes("Ammo")) {
                            triggerFunctionFromText(item);
                        }
                    });
                    return;
                
                case "use another ammo item":
                    this.board.itemTriggers.set(this.id, (item) => {
                        if(item.id !== this.id && item.tags.includes("Ammo")) {
                            triggerFunctionFromText(item);
                        }
                    });
                    return;
                case "crit with another item":
                    this.board.critTriggers.set(this.id, (item) => {
                        if(item.id !== this.id) {
                            triggerFunctionFromText(item);
                        }
                    });
                    return;
                case "use another non-weapon item":
                case "use a non-weapon item":
                    this.board.itemTriggers.set(this.id, (item) =>  {                        
                        if(item.id !== this.id && !item.tags.includes("Weapon")) {
                            triggerFunctionFromText(item);
                        }
                    });
                    return;
                case "use an adjacent item":
                    this.adjacentItemTriggers.push(triggerFunctionFromText);
                    return;
                case "use another weapon or haste":
                    this.board.itemTriggers.set(this.id, (item) => {
                        if(item.id!==this.id&&(item.tags.includes("Weapon"))) {
                            triggerFunctionFromText(item);
                        }
                    });
                    this.board.hasteTriggers.set(this.id, (item) => {
                        triggerFunctionFromText(item);
                    });
                    return;
                case "use the item to the right of this":
                    const rightItem = this.getItemToTheRight();
                    if(rightItem) {
                        rightItem.triggerFunctions.push(() => {
                            triggerFunctionFromText(rightItem);
                            if(ifFunction) ifFunction(rightItem);
                        });
                    }
                    return;
                case "use the item to the left of this":
                    const leftItem = this.getItemToTheLeft();
                    if(leftItem) {
                        leftItem.triggerFunctions.push(() => {
                            triggerFunctionFromText(leftItem);
                            if(ifFunction) ifFunction(leftItem);
                        });
                    }
                    return;
                case "use any item to the left of this":
                    this.board.itemTriggers.set(this.id, (item)=> {
                        if(item.startIndex < this.startIndex) {
                            triggerFunctionFromText(item);
                            if(ifFunction) ifFunction(item);
                        }
                    });
                    return;
                case "use any item to the right of this":
                    this.board.itemTriggers.set(this.id, (item)=> {
                        if(item.startIndex > this.startIndex) {
                            triggerFunctionFromText(item);
                            if(ifFunction) ifFunction(item);
                        }
                    });
                    return;
                case "use the property to the left of this":
                    const leftPropertyItem = this.getItemToTheLeft();
                    if(leftPropertyItem&&leftPropertyItem.tags.includes("Property")) {
                        leftPropertyItem.triggerFunctions.push(triggerFunctionFromText);
                    }
                    return;
                case "use the weapon to the left":
                case "use the weapon to the left of this":
                    const leftWeaponItem = this.getItemToTheLeft();
                    if(leftWeaponItem&&leftWeaponItem.tags.includes("Weapon")) {
                        leftWeaponItem.triggerFunctions.push(() => {
                            triggerFunctionFromText(leftWeaponItem);
                            if(ifFunction) ifFunction(leftWeaponItem);
                        });
                    }
                    return;
                case "use the weapon to the right of this":
                    const rightWeaponItem = this.getItemToTheRight();
                    if(rightWeaponItem&&rightWeaponItem.tags.includes("Weapon")) {
                        rightWeaponItem.triggerFunctions.push(triggerFunctionFromText);
                    }

                    return;
                case "use the core or another ray":
                    this.whenItemTagTriggers(["Core", "Ray"], 
                        (item) => {
                            if(item.id !== this.id) {
                              triggerFunctionFromText(item);  
                            }
                        }
                    );
                    return;
                case "use the core":
                    this.whenItemTagTriggers(["Core"],
                        (item) => {
                            triggerFunctionFromText(item);  
                        }
                    );
                    return;
                case "burn":
                    this.board.burnTriggers.set(this.id,triggerFunctionFromText);
                    return;
                case "haste":
                    this.board.hasteTriggers.set(this.id,triggerFunctionFromText);
                    return;

                case "slow":
                    this.board.slowTriggers.set(this.id,triggerFunctionFromText);
                    return;
                case "freeze":
                    this.board.player.hostileTarget.board.freezeTriggers.set(this.id,(target,source)=>{
                        if(source.board==this.board) {
                            triggerFunctionFromText(source);
                        }
                    });
                    this.board.freezeTriggers.set(this.id,(target,source)=>{
                        if(source.board==this.board) {
                            triggerFunctionFromText(source);
                        }
                    });
                    return;
                case "crit":
                    this.board.critTriggers.set(this.id,triggerFunctionFromText);
                    return;
                case "shield":
                    this.board.shieldTriggers.set(this.id,triggerFunctionFromText);

                    return;
                case "lose shield":
                    this.board.player.lostShieldTriggers.set(this.id,triggerFunctionFromText);
                    return;


                case "poison":
                    this.board.poisonTriggers.set(this.id, triggerFunctionFromText);
                    return;
                case "use a Tech":
                    this.whenItemTagTriggers("Tech", (item) => {
                        triggerFunctionFromText(item);
                    });

                    return;
                case "use a property":
                    this.whenItemTagTriggers("Property", (item) => {
                        triggerFunctionFromText(item);
                    });

                    return;
                case "use a small item":
                    this.whenItemTagTriggers("Small", (item) => {
                        triggerFunctionFromText(item);
                    });

                    return;
                case "use a large item":
                    this.whenItemTagTriggers("Large", (item) => {
                        triggerFunctionFromText(item);
                    });

                    return;
                case "crit with any item":
                    this.board.critTriggers.set(this.id, triggerFunctionFromText);
                    return;
                case "use your leftmost item":
                    this.board.itemTriggers.set(this.id, (item) => {
                        if(item.startIndex==0) {
                            triggerFunctionFromText(item);
                        }
                    });

                    return;
                case "sell a weapon": //do nothing
                case "sell this": 
                case "buy this":
                case "buy another aquatic item":
                case "level up":
                case "sell a spare change":
                case "win a fight":
                case "win a fight against a player":
                case "buy a weapon":
                case "visit a merchant":
                case "sell a small item":
                case "sell another non-weapon item":
                case "sell a large item":
                case "win a fight against a monster with this":
                case "gain gold":
                case "win a fight with langxian in play":
                    return;

            }
            console.log("No code yet written for this case! '" + text + "' matched 'When you' but not '" + conditionalMatch+"'");

            return;
        }
        //The first (  4  » 8   ) times you use a non-Weapon item each fight, Charge 1 Weapon 1 second(s). from Mixed Message
        //The first (  4  » 8   ) times you Shield each fight, Charge 1 item 1 second(s).
        //The first (  4  » 8   ) times your enemy uses a non-weapon item each fight, Charge 1 Weapon 1 second(s).
        regex = /^The first (\([^)]+\)|\d+)?\s?times? (.+) each fight, (.*)/i;
        match = text.match(regex);
        if(match) {
            const numTimes = match[1]?getRarityValue(match[1], this.rarity):1;
            const ntimesFunction = this.getTriggerFunctionFromText(match[3]);
            const thingDone = match[2].toLowerCase();
            switch(thingDone) {
                case "you shield":
                    let shieldCount = 0;
                    this.board.shieldTriggers.set(this.id,()=>{
                        shieldCount++;
                        if(shieldCount <= numTimes) {
                            ntimesFunction(this);
                            if(shieldCount==numTimes) {
                                this.board.shieldTriggers.delete(this.id);
                            }
                        }
                    });
                    return;
                case "you use your slowest weapon":
                    let slowestWeaponCount = 0;
                    let slowestWeapon = this.board.items.reduce((a,b)=>Math.min(a,b.cooldown),Infinity);
                    let slowestWeaponCooldown = slowestWeapon.cooldown||Infinity;
                    
                    this.board.itemTriggers.set(this.id,(item)=>{
                        if(item.tags.includes("Weapon")) {
                            if(item.cooldown < slowestWeaponCooldown) { 
                                slowestWeapon = this.board.items.reduce((a,b)=>Math.min(a,b.cooldown),Infinity);
                                slowestWeaponCooldown = slowestWeapon.cooldown;
                                if(item.id==slowestWeapon.id) {
                                    ntimesFunction(item);                                                           
                                    if(slowestWeaponCount++==numTimes) {
                                        this.board.itemTriggers.delete(this.id);
                                    }
                                }
                            }
                        }
                    });
                    return;
                case "you use your rightmost item":
                    let rightmostItemCount = 0;
                    const rightmostItem = this.board.items[this.board.items.length-1];
                    this.board.itemTriggers.set(this.id,(item)=>{
                        if(item.id==rightmostItem.id) {
                            ntimesFunction(item);
                            if(rightmostItemCount++ == numTimes) {
                                this.board.itemTriggers.delete(this.id);
                            }
                        }
                    });
                    return;
                case "you use the core":
                case "use the core": // existing wording is scuffed for liquid core
                    let coreUsedCount = 0;
                    this.board.itemTriggers.set(this.id,(item)=>{
                        if(item.tags.includes("Core")&&coreUsedCount++ <= numTimes) {
                            ntimesFunction(item);
                            if(coreUsedCount==numTimes) {
                                this.board.itemTriggers.delete(this.id);
                            }
                        }
                    });
                    return;
                case "you freeze":
                    let freezeCount = 0;
                    this.board.player.hostileTarget.board.freezeTriggers.set(this.id,(item)=>{
                        if(freezeCount++<=numTimes) {
                            ntimesFunction(item);
                            if(freezeCount==numTimes) {
                                this.board.player.hostileTarget.board.freezeTriggers.delete(this.id);
                            }
                        }
                    });
                    return;
                case "you haste":
                    let hasteCount = 0;
                    this.board.hasteTriggers.set(this.id,(item)=>{
                        if(hasteCount++<=numTimes) {
                            ntimesFunction(item);
                            if(hasteCount==numTimes) {
                                this.board.hasteTriggers.delete(this.id);
                            }
                        }
                    });
                    return;
                case "you crit":
                    let critCount = 0;

                    this.board.critTriggers.set(this.id,(item)=>{
                        if(critCount++<=numTimes) {
                            ntimesFunction(item);
                            if(critCount==numTimes) {
                                this.board.critTriggers.delete(this.id);
                            }
                        }
                    });
                    return;
                case "you slow":
                    let slowCount = 0;
                    this.board.slowTriggers.set(this.id,(item)=>{
                        if(slowCount++<=numTimes) {
                            ntimesFunction(item);
                            if(slowCount==numTimes) {
                                this.board.slowTriggers.delete(this.id);
                            }
                        }
                    });
                    return;
                case "you fall below half health":
                    let healthBelowHalfCount = 0;
                    this.board.player.healthBelowHalfTriggers.set(this.id,(item)=>{
                        if(healthBelowHalfCount++<=numTimes) {
                            ntimesFunction(item);
                            if(healthBelowHalfCount>=numTimes) {
                                this.board.player.healthBelowHalfTriggers.delete(this.id);
                            }
                        } 

                    });


                    return;
                case "you poison":
                    let poisonCount = 0;
                    this.board.poisonTriggers.set(this.id,(item)=>{
                        if(poisonCount++<=numTimes) {
                            ntimesFunction(item);
                            if(poisonCount>=numTimes) {
                                this.board.poisonTriggers.delete(this.id);
                            }
                        } 
                    });
                    return;
                case "you use a non-weapon item":
                case "your enemy uses a non-weapon item":
                    const target = thingDone.includes("enemy")?this.board.player.hostileTarget:this.board.player;

                    let nonWeaponCount = 0;
                    target.board.itemTriggers.set(this.id,(item)=>{
                        if(!item.tags.includes("Weapon")) {
                            if(nonWeaponCount++ <= numTimes) {
                                ntimesFunction(item);
                                if(nonWeaponCount==numTimes) {
                                    target.board.itemTriggers.delete(this.id);
                                }
                            }
                        }
                    });

                    return;
                case "you would die":
                    let dieCount = 0;
                    this.board.player.dieTriggers.set(this.id,(item)=>{
                        if(dieCount++<=numTimes) {
                            ntimesFunction(item);
                            if(dieCount>=numTimes) {
                                this.board.player.dieTriggers.delete(this.id);
                            }
                        } 

                    });
                    return;
                case "you use an ammo item":

                    let ammoUsedCount = 0;
                    this.board.itemTriggers.set(this.id,(item)=>{
                        if(item.tags.includes("Ammo") && ammoUsedCount<=numTimes) {
                            ammoUsedCount++;
                            ntimesFunction(item);
                            if(ammoUsedCount==numTimes) {
                                this.board.itemTriggers.delete(this.id);
                            }
                        }
                    });
                    return;
                case "you freeze, burn, slow, poison, and haste":
                    ["freeze","burn","slow","poison","haste"].forEach(attribute=>{
                        let attributeCount = 0;
                        this.board[attribute+'Triggers'].set(this.id,(item)=>{                                
                            ntimesFunction(item);
                            if(attributeCount++==numTimes) {
                                this.board[attribute+'Triggers'].delete(this.id);
                            }
                        });
                    });
                    return;
                case "you use a large item":
                    let largeItemCount = 0;
                    this.board.itemTriggers.set(this.id,(item)=>{
                        if(item.tags.includes("Large") && largeItemCount++<=numTimes) {
                            ntimesFunction(item);
                            if(largeItemCount>=numTimes) {
                                this.board.itemTriggers.delete(this.id);
                            }
                        } 
                    });
                    return;
            }
            console.log("matched the first "+numTimes+" times but not '"+thingDone+"' from "+this.name);
            


        }
        
        
        //At the start of each fight,
        regex = /^\s*At the start of each fight, (.*)/i;
        match = text.match(regex);
        if(match) {
            const f = this.getTriggerFunctionFromText(match[1]);
            this.board.startOfFightTriggers.set(this.id,f);
            return;
        }
        regex = /^\s*When (?:this|this item) gains (.*), (.*)/i;
        match = text.match(regex);
        if(match) {
            const f = this.getTriggerFunctionFromText(match[2]);
            const f2 = (item)=>{ if(this.id==item.id) f(); };
            switch(match[1].toLowerCase()) {
                case "haste":
                    this.board.hasteTriggers.set(this.id,f2);
                    return;
                case "slow":
                    this.board.slowTriggers.set(this.id,f2);
                    return;
                case "damage":
                    this.board.damageTriggers.set(this.id,f2);
                    return;
                case "freeze":
                    this.board.freezeTriggers.set(this.id,(target, source) =>{
                        if(target.id==this.id) {
                            f(this, source);
                        }
                    });
                    return;
            }
        }
        //When any item gains freeze, ...
        regex = /^\s*When any item gains freeze, (.*)/i;
        match = text.match(regex);
        if(match) {
            const f = this.getTriggerFunctionFromText(match[1]);
            this.board.freezeTriggers.set(this.id,(item,source)=>{
                    f();
            });
            this.board.player.hostileTarget.board.freezeTriggers.set(this.id,(item,source)=>{
                f();
            });
            return;
        }

        //When any non-weapon item is used
        regex = /^\s*When any (non-)?([^s]*)\s*(?:item)\s*is used, (.*)/i;
        match = text.match(regex);
        if(match) {
            const f = this.getTriggerFunctionFromText(match[3]);
            const nonF = match[1]?i=>!i:i=>i;
            const tag = Item.getTagFromText(match[2]);
            const boardTriggerFunction = (item)=>{
                if(nonF(item.tags.includes(tag))) {
                    f(item);
                }
            };
            this.board.itemTriggers.set(this.id,boardTriggerFunction);
            this.board.player.hostileTarget.board.itemTriggers.set(this.id,boardTriggerFunction);


            return;
        }

        //The first time you fall below half health each fight, Freeze 1 item(s) for 99 second(s). into a trigger function.
        regex = /^\s*The first time you fall below half health each fight, (.*)\.?/i;
        match = text.match(regex);

        if(match) {
            const f = this.getTriggerFunctionFromText(match[1]);
            this.board.player.healthBelowHalfTriggers.set(this.id,()=>{
                f();
                this.board.player.healthBelowHalfTriggers.delete(this.id);
            });
            

            return;
        }
         //If you have 4 or fewer items, ...
         regex = /^If you have (\d+) or (fewer|more|less|greater) items(?: in play)?, (.*)/i
         match = text.match(regex);
         if(match) {
            const numItems = parseInt(match[1]);
            const comparisonFunction =  match[2]=="fewer"||match[2]=="less"?()=>this.board.activeItemCount<=numItems:()=>this.board.activeItemCount>=numItems;            
            this.board.itemDestroyedTriggers.set(this.id,this.getUndoableFunctionFromText(match[3], comparisonFunction));
            return;
         }
         //While your enemy has more health than you, your Weapons have their cooldowns reduced by (  5%  » 10%  » 20%   ).
         regex = /^While your enemy has more health than you, (.*)/i;
         match = text.match(regex);
         if(match) {
            const f = this.getUndoableFunctionFromText(match[1],()=>{
                return this.board.player.hostileTarget.health > this.board.player.health;
            });
            this.board.player.healthChanged(f);
            this.board.player.hostileTarget.healthChanged(f);
            return;
         }
         //If you have a Vehicle or Large item,
         regex = /^If you have a ([^\s]+) (?:or ([^\s]+))? item, (.*)/i
         match = text.match(regex);
         if(match) {
            const tagToMatch = Item.getTagFromText(match[1]);
            const tagToMatch2 = Item.getTagFromText(match[3]);
            const comparisonFunction = () => this.board.activeItems.some(item => 
                item.tags.includes(tagToMatch) || 
                (tagToMatch2 && item.tags.includes(tagToMatch2))
            );
            this.board.itemDestroyedTriggers.set(this.id,this.getUndoableFunctionFromText(match[3], comparisonFunction));
            return;
        }

        this.triggerFunctions.push(this.getTriggerFunctionFromText(text));
        return null;
    }
    
    /*
    When an item with a tag is used, trigger the given function
    tag can be a string or an array of strings
    */
    whenItemTagTriggers(tag, func, board) {
        board = board || this.board;  // Set default value for board if not provided
        board.itemTriggers.set(this.id,(item) => {
            // Handle both string and array cases
            const tags = Array.isArray(tag) ? tag : [tag];
            if (tags.some(t => item.tags.includes(t))) {
                func(item);
            }
        });
    }

    chargeBy(seconds, source) {
        //calculate time to next trigger
        if(source) {
            log(source.name + " charged " + this.name + " for " + seconds + " second(s)");
        }
        const timeToNextTrigger = this.cooldown - (this.effectiveBattleTime % this.cooldown);
        if(timeToNextTrigger > seconds*1000) {
            this.effectiveBattleTime += seconds*1000;
            return;
        }
        this.effectiveBattleTime += timeToNextTrigger;
        
    }

    getAnonymousTriggerFunctionFromText(text) {        
        let regex,match;
        const skipStrings = ["At the start of each day"];
        for(let i=0;i<skipStrings.length;i++) { 
            if(text.includes(skipStrings[i])) {
                return ()=>{};
            }
        }
        
        //it gains ( +20 » +40 ) damage for the fight
        regex = /^it gains (\([^)]+\)|\+?\d+) damage for the fight/i;
        match = text.match(regex);
        if(match) {
            const damageGain = getRarityValue(match[1], this.rarity);
            return (item) => item.gain(damageGain,'damage');
        }
   

        //Shield equal to this item's Ammo.
        regex = /^(?:Deal )?([^\s]+) equal to this item's Ammo\.?$/i;
        match = text.match(regex);
        if(match) {
            const tagToMatch = Item.getTagFromText(match[1]);
            this.gain(this.ammo,tagToMatch.toLowerCase());
            this.ammoChanged((newAmmo,oldAmmo)=>{
                this.gain(newAmmo-oldAmmo,tagToMatch.toLowerCase());
            });
            return () => {
                this['apply'+tagToMatch](this[tagToMatch.toLowerCase()]);
            }

        }

        //charge this 1 second(s) OR charge this ( 1 » 2 » 3 ) second(s)
        regex = /^\s*charge this (?:\(([^)]+)\)|(\d+)) second\(?s?\)?/i;
        match = text.match(regex);
        if(match) {
            const seconds = match[1] ? getRarityValue(match[1], this.rarity) : parseInt(match[2]);
            return () => {
                this.chargeBy(seconds);
                log(this.name + " charged for " + seconds + " second(s)");
            }
        }
        //Charge the item to the (left|right) of this ( 1 » 2 » 3 » 4 ) second(s).
        regex = /^\s*Charge the item to the (left|right) (?:of this|for)? (?:\(([^)]+)\)|(\d+)) second\(?s?\)?/i;
        match = text.match(regex);
        if(match) {
            const seconds = parseInt(match[2] ? getRarityValue(match[2], this.rarity) : match[3]);
            return () => {
                const itemToCharge = match[1]=='left'?this.getItemToTheLeft():this.getItemToTheRight();
                if(itemToCharge) {
                    itemToCharge.chargeBy(seconds);
                    log(this.name + " charged " + itemToCharge.name + " for " + seconds + " second(s)");
                }

            }
        }
        //+50% Crit Chance
        regex = /^(?:The ([^\s]+) to the left (of this )?has)?\s*\+50% Crit Chance/i;
        match = text.match(regex);
        if(match) {
            if(match[1]) {
                const leftItem = this.getItemToTheLeft();
                if(leftItem) {
                    if(leftItem.tags.includes(Item.getTagFromText(match[1]))) {
                        leftItem.gain(50,'crit');
                    }
                }
            } else {
                this.gain(50,'crit');
            }
            return () => {};
        }
        //When one of your items run out of ammo, Charge this 1 second(s).
        regex = /^\s*When one of your items run out of ammo, (.*)/i;
        match = text.match(regex);
        if(match) {
            const f = this.getTriggerFunctionFromText(match[1]);
            this.board.items.forEach(item => {
                if(item.tags.includes("Ammo")) {
                    item.ammoChanged((newAmmo,oldAmmo)=>{
                        if(newAmmo<=0) {
                            f();
                        }
                    });
                }
            });
            return () => {};
        }
        //Charge 1 item 1 second(s). into a trigger function.
        //Charge 1 Weapon 1 second(s). into a trigger function.
        regex = /^\s*Charge (\d+|a|your)? ([^\s]+)s? (?:item)?\s*(?:for)?\s*(?:by)?\s*(\([^)]+\)|\d+) second\(?s?\)?\.?/i;
        match = text.match(regex);
        if(match) {
            const numItemsToCharge = match[1]=='a'?1:match[1]=='your'?Infinity:parseInt(match[1]);
            const seconds = parseInt(getRarityValue(match[3], this.rarity));
            return () => {
                let validTargets = this.board.items.filter(item => item.isChargeTargetable());
                if(match[2]=='leftmost'&&validTargets.length>0) validTargets = validTargets[0];
                else if(match[2]=='rightmost'&&validTargets.length>0) validTargets = validTargets[validTargets.length-1];
                else if(match[2]!='item') validTargets = validTargets.filter(item => item.tags.includes(match[2]));

                for(let i=0;i<Math.min(numItemsToCharge,validTargets.length);i++) {
                    const item = validTargets[Math.floor(this.battleRandom()*(validTargets.length))];
                    if(item) {
                        item.chargeBy(seconds,this);
                    }   
                }
            }
        }
        //double the damage of your leftmost Weapon for the fight.
        regex = /^\s*double the damage of your leftmost Weapon for the fight\.?/i;
        match = text.match(regex);
        if(match) {
            let leftmostWeapon = null;
            for(let i=0; i<this.board.items.length; i++) {
                if(this.board.items[i].tags.includes("Weapon")) {
                    leftmostWeapon = this.board.items[i];
                    break;

                }
            }
            return () => {
                leftmostWeapon.gain(leftmostWeapon.damage,'damage');
            }
        }
        
         //Burn equal to 10% of this item's damage.
        regex = /^\s*(?:Deal )?(Burn|Poison|Heal|Shield|Damage) equal to (10% of|[\d]+|\([^)]+\))(?: times)? (?:this item's ([^\s^\.]+)|the value of your items)\.?/i;
        match = text.match(regex);
        if(match) {
            const whatToGain = match[1];
            const whatToGainLowercase = whatToGain.toLowerCase();
            const multiplier = match[2]=='10% of'?0.1:getRarityValue(match[2], this.rarity);
            const whatToCheck = match[3]?match[3].toLowerCase() : 'value of your items';
            if(whatToCheck=='value of your items') {
                this.gain(this.board.items.reduce((sum,item)=>sum+item.value,0)*multiplier, whatToGainLowercase);
                this.board.items.forEach(item=>{
                    item.valueChanged((newValue,oldValue)=>{
                        this.gain((newValue - oldValue) *multiplier, whatToGainLowercase);
                    });
                });
            } else {
                this.gain(this[whatToCheck]*multiplier, whatToGainLowercase);
                
                this[whatToCheck+"Changed"]((newValue,oldValue)=>{
                    this.gain((newValue - oldValue) *multiplier, whatToGainLowercase);
                });
            }

            return () => {
                this["apply"+whatToGain](this[whatToGainLowercase]);
            };
        }


        //remove Freeze and Slow from your items and Cleanse half your Burn and Poison.
        regex = /^\s*remove Freeze and Slow from your items and Cleanse half your Burn and Poison\.?/i;
        match = text.match(regex);
        if(match) {
            return () => {
                this.board.items.forEach(item => {
                    item.removeFreeze(this);
                    item.removeSlow(this);
                });
                this.board.player.burn = this.board.player.burn/2;
                this.board.player.poison = this.board.player.poison/2;
                log(this.name + " removed Freeze and Slow from "+this.board.player.name+"'s items and Cleansed half their Burn and Poison");
            }
        }
        //gain shield equal to (  10%  » 20%  » 35%  » 50%   ) of your max health
        regex = /^\s*(?:gain )?shield equal to (?:\(\s*(\d+)%(?:\s*»\s*(\d+)%)*\s*\)|\+?(\d+)%) of your max health/i;
        match = text.match(regex);
        if(match) {
            const healthPercentage = match[1] ? getRarityValue(match[1], this.rarity) : parseInt(match[2]);
            return () => {
                const shieldGain = this.board.player.maxHealth*healthPercentage/100;
                this.applyShield(shieldGain);
                log(this.name + " added " + shieldGain + " shield to " + this.board.player.name);
            }

        }
        //reduce an item's cooldown by 5% for the fight
        regex = /^\s*reduce an item's cooldown by (5)% for the fight/i;
        match = text.match(regex);
        if(match) {
            return () => {
                const items = this.board.items.filter(item => item.isHasteTargetable());
                const item =this.pickRandom(items);
                if(item) {
                    item.cooldown *= 1 - (parseInt(match[1])/100);
                    log(this.name + " reduced " + item.name + " cooldown by 5%");
                }
            }
        }
        
        //reduce this item's cooldown by 50%
        //Reduce this item's cooldown by ( 10% » 20% ) for the fight.
        regex = /^reduce this item's cooldown by (\([^)]+\)|\d+)(?: for the fight)?\.?/i;
        match = text.match(regex);

        if(match) {          
            const cooldownReduction = getRarityValue(match[1], this.rarity);
            return () => {
               this.gain(this.cooldown * (1-cooldownReduction/100)-this.cooldown,'cooldown');
            }
        }

        //Your enemy's Shield items lose ( 5 » 10 » 15 » 20 ) Shield for the fight
        regex = /^\s*Your enemy's ([^\s]+) items lose (?:\(([^)]+)\)|(\d+)) ([^\s]+) for the fight/i;
        match = text.match(regex);
        if(match) {
            const lossAmount = match[2] ? getRarityValue(match[2], this.rarity) : parseInt(match[3]);
            return () => {
                this.board.player.hostileTarget.board.items.forEach(item => {   
                    if(item.tags.includes(match[1])) {
                        item.gain(-lossAmount,match[4].toLowerCase());
                        log(this.name + " caused " + item.name + " to lose " + lossAmount + " " + match[4]);
                    }
                });
            }

        }
        
        //Reduce the cooldown of your aquatic items by (  10%  » 20%   ).
        regex = /^\s*Reduce the cooldown of your ([^\s]+) items by (?:\(([^)]+)\)|(\+?\d+%))\.?/i;
        match = text.match(regex);

        if(match) {
            const cooldownReduction = parseInt(match[2] ? getRarityValue(match[2], this.rarity) : match[3]);
            const tagToMatch = Item.getTagFromText(match[1]);
            this.board.items.forEach(item => {
                if(item.tags.includes(tagToMatch)) {
                    item.gain(item.cooldown * (1-cooldownReduction/100) - item.cooldown,'cooldown');
                }
            });
            return () => {};
        }


        //This deals double Crit damage
        regex = /^\s*This deals double Crit damage/i;
        match = text.match(regex);
        if(match) {
            this.gain(100,'critMultiplier');
            return () => {};
        }
        //Reload this
        regex = /^\s*Reload this/i;
        match = text.match(regex);
        if(match) {
            return () => {
                this.ammo = this.maxAmmo;
                log(this.name + " reloaded");
            }
        }
        //Your other Friends' cooldowns are reduced by ( 10% » 20% » 30% )
        regex = /^\s*Your other Friends' cooldowns are reduced by (?:\(\s*(\d+)%(?:\s*»\s*(\d+)%)*\s*\)|\+?(\d+)%)/i;
        match = text.match(regex);
        if(match) {
            const cooldownReduction = getRarityValue(match.slice(1).filter(Boolean).join('»'), this.rarity);
            this.board.items.forEach(item => {  
                if(item.id !== this.id && item.tags.includes("Friend")) {
                    item.cooldown *= (1-cooldownReduction/100);
                }
            });
            return () => {};
        }


        //Reload the item to the right of this ( 1 » 2 » 3 » 4 ) Ammo.
        regex = /^\s*Reload the item to the right of this (?:\(([^)]+)\)|(\d+)) Ammo\.?/i;
        match = text.match(regex);
        if(match) {
            const ammo = match[1] ? getRarityValue(match[1], this.rarity) : parseInt(match[2]);
            //any item to the right
            // while(!rightAmmoItem.tags.includes("Ammo") && (rightAmmoItem=rightAmmoItem.getItemToTheRight()));

            return () => {
                const rightItem = this.getItemToTheRight();
                if(rightItem&&rightItem.tags.includes("Ammo")) {
                    rightItem.ammo += ammo;
                    if(rightItem.ammo>rightItem.maxAmmo) {
                        rightItem.ammo = rightItem.maxAmmo;
                    } else {
                        log(this.name + " gave " + rightItem.name + " " + ammo + " Ammo");
                    }                    
                }
            }
        }
        //Adjacent items have ( +1 » +2 » +3 » +4 ) Max Ammo
        regex = /^\s*Adjacent items have (?:\(\s*\+?(\d+)(?:\s*»\s*\+?(\d+))*\s*\)|\+?(\d+)) Max Ammo/i;
        match = text.match(regex);
        if(match) {
            const maxAmmo = match[1] ? getRarityValue(match[1], this.rarity) : parseInt(match[2]);
            this.getAdjacentItems().forEach(item => {
                item.ammo +=maxAmmo;
                item.maxAmmo += maxAmmo;
            });
            return () => {};
        }

        //Reload adjacent Ammo items ( 1 » 2 » 3 ) Ammo. from Ramrod
        regex = /^\s*Reload adjacent Ammo items (?:\(([^)]+)\)|(\d+)) Ammo\.?/i;
        match = text.match(regex);
        if(match) {
            const ammo = parseInt(match[1] ? getRarityValue(match[1], this.rarity) : match[2]);
            return () => {
                this.getAdjacentItems().forEach(item => {
                    item.gain(ammo,'ammo');
                });
            };
        }

        //remove freeze from your items
        regex = /^\s*remove freeze from your items/i;
        match = text.match(regex) ;
        if(match) {
            return () => {
                this.board.items.forEach(i => i.removeFreeze(this));
            }
        }
       
        //your items gain ( +2% » +4% » +6% » +8% ) Crit chance for the fight.
        //or: your items gain +20% Crit chance for the fight.
        regex = /your items gain (?:\(\s*\+?(\d+)%(?:\s*»\s*\+?(\d+)%)*\s*\)|\+?(\d+)%) Crit chance for the fight/i;
        match = text.match(regex);
        if(match) {
            const critGain = match[3] ? 
                parseInt(match[3]) : // Single value format
                getRarityValue(match.slice(1, 3).filter(Boolean).join('»'), this.rarity); // Rarity progression format
            return () => {
                this.board.items.forEach(i => i.gain(critGain,'crit'));
                log(this.name + " gave all items " + critGain + " crit chance");
            }
        }

        //Multicast ( 1 » 2 » 3 » 4 ).
        regex = /^Multicast (?:\(([^)]+)\)|(\d+))/i;
        match = text.match(regex);
        if(match) {
            this.multicast = parseInt(match[1] ? getRarityValue(match[1], this.rarity) : parseInt(match[2])) - 1;
            return () => {};
        }        
        
        regex = /^Gain (?:\(([^)]+)\)|(\d+)) gold/i;
        match = text.match(regex);
        if(match) {            
            return () => {
                this.board.player.addGold(match[1] ? getRarityValue(match[1], this.rarity) : parseInt(match[2]));
                log(this.name + " gave " + this.board.player.gold + " gold to " + this.board.player.name);
            }
        }

        //Lifesteal 100
        regex = /^Lifesteal (\d+)/i;
        match = text.match(regex);
        if(match) {
           this.lifesteal = parseInt(match[1]);           
           return () => {};
        }
        //This and items to the right of this have ( +15% » +20% » +25% » +30% ) Crit Chance. from Critical Core
        regex = /^\s*This and items to the right of this have (?:\(([^)]+)\)|\+?(\d+)%?) ([^\s]+)(?: chance)?\.?/i;
        match = text.match(regex);
        if(match) {
            const gainAmount = parseInt(match[1] ? getRarityValue(match[1], this.rarity) : match[2]);
            const whatToGain = match[3].toLowerCase();
            for(let i=this.board.items.indexOf(this);i<this.board.items.length;i++) {
                    this.board.items[i].gain(gainAmount,whatToGain.toLowerCase());
            }
            return () => {};
        }
        //Heal to full.
        regex = /^\s*Heal to full\.?/i;
        match = text.match(regex);
        if(match) {
            return () => {
                this.board.player.heal(this.board.player.maxHealth-this.board.player.health);
            }
        }

        //This has +1 Multicast for each adjacent Property.
        //For each adjacent Vehicle, this has +1 Multicast. 
        regex = /^\s*(?:This has \+1 Multicast for each adjacent ([^\s^\.]+)|For each adjacent ([^\s^\.]+), this has \+1 Multicast)\.?/i;
        match = text.match(regex);
        if(match) {
            const tagToMatch = match[1]?Item.getTagFromText(match[1]):Item.getTagFromText(match[2]);
            this.getAdjacentItems().forEach(item => {
                if(item.tags.includes(tagToMatch)) {
                    this.multicast++;
                }
            });
            return () => {};
        }
        //This has +1 Multicast. (from shiny)
        regex = /^\s*This has \+1 Multicast\.?/i;
        match = text.match(regex);
        if(match) {
            this.multicast++;
            return () => {};
        }

        //Non-tech item cooldowns are increased by ( 1 » 2 ) second(s). from Chronobarrier
        regex = /^\s*Non-tech item cooldowns are increased by (\([^)]+\)|\d+) second\(s\)\.?/i;
        match = text.match(regex);
        if(match) {
            const cooldownIncrease = getRarityValue(match[1], this.rarity);
            [...this.board.player.hostileTarget.board.items,...this.board.items]            
            .forEach(item => {
                if(!item.tags.includes("Tech")) {
                    item.gain(cooldownIncrease*1000,'cooldown');
                }
            });
            return () => {};
        }

        //reduce your leftmost item's cooldown by ( 3% » 6% » 9% » 12% )
        regex = /^\s*reduce your leftmost item's cooldown by (\([^)]+\)|\d+%)/i;
        match = text.match(regex);
        if(match) {
            const cooldownReduction = getRarityValue(match[1], this.rarity);
            const leftmostItem = this.board.items[0];
            return () => {
                leftmostItem.gain(leftmostItem.cooldown * (1-cooldownReduction/100)-leftmostItem.cooldown,'cooldown');
                log(this.name + " reduced " + leftmostItem.name + " cooldown by " + cooldownReduction + "%");
            };
        }

        //This has +1 Multicast for each Property you have.
        regex = /^\s*This has \+(\d+) Multicast for each ([^\s^\.]+) you have\.?/i;
        match = text.match(regex);
        if(match) {
            const tagToMatch = Item.getTagFromText(match[2]);
            this.board.items.forEach(item => {
                if(item.tags.includes(tagToMatch)) {
                    this.multicast+=parseInt(match[1]);
                }
            });
            return () => {};

        }
        // remove Freeze from it
        regex = /^\s*remove Freeze from it/i;
        match = text.match(regex);

        if(match) {
            return (target, source) => {
                target.removeFreeze(this);
            }
        }
        // Your other tools have their cooldowns reduced by ( 5% » 10% » 15% » 20% ).
        regex = /^\s*Your other tools have their cooldowns reduced by \(\s*(\d+)%(?:\s*»\s*(\d+)%){1,3}\s*\)\s*\.?$/i;
        match = text.match(regex);
        if(match) {
            const cooldownReduction = getRarityValue(match.slice(1).filter(Boolean).join('»'), this.rarity);
            this.board.items.forEach(item => {
                if(item.id != this.id && item.tags.includes("Tool")) {
                    item.cooldown *= (1-cooldownReduction/100);
                }
            });
            return () => {};
        }

        //Slow all your opponent's items for (  3  » 5  » 7   ) second(s).
        regex = /^\s*Slow all your opponent's items for (\([^)]+\)|\d+) second\(?s?\)?\.?$/i;
        match = text.match(regex);
        if(match) {
            const slowDuration = getRarityValue(match[1], this.rarity);
            return () => {
                this.board.player.hostileTarget.board.items.forEach(item => {   
                    this.applySlowTo(item,slowDuration);
                });
            };
        }
        
        //You have ( +1 » +2 » +3 ) Regeneration
        regex = /^\s*You have (\([^)]+\)|\d+) Regeneration\.?/i;
        match = text.match(regex);
        if(match) {
            const regeneration = getRarityValue(match[1], this.rarity);
            this.board.player.regeneration += regeneration;
            return () => {};
        }

        //Poison equal to your Regeneration.
        regex = /^\s*Poison equal to your Regeneration\.?/i;
        match = text.match(regex);
        if(match) {            
            return () => {
                this.applyPoison(this.board.player.regeneration||0);
            };
        }
        //Heal equal to your opponent's Poison.
        regex = /^\s*Heal equal to your opponent's Poison\.?/i;
        match = text.match(regex);
        if(match) {
            return () => {
                if(this.board.player.hostileTarget.poison>0) {
                    this.applyHeal(this.board.player.hostileTarget.poison);
                }
            };
        }

        //Charge your other non-weapon items ( 1 » 2 ) second(s).
        regex = /^\s*Charge your other non-weapon items (\([^)]+\)|\d+) second\(?s?\)?\.?$/i;
        match = text.match(regex);
        if(match) {
            const chargeDuration = getRarityValue(match[1], this.rarity);
           
            return () => {
                this.board.items.forEach(item => {
                    if(item.id != this.id && item.cooldown>0 && !item.tags.includes("Weapon")) {
                        item.chargeBy(chargeDuration);
                    }
                });
            };
        }
        //an enemy item has its cooldown increased by ( 3 » 6 ) second(s). from Spyglass
        regex = /^\s*an enemy item has its cooldown increased by (\([^)]+\)|\d+) second\(?s?\)?\.?$/i;
        match = text.match(regex);
        if(match) {
            const cooldownIncrease = getRarityValue(match[1], this.rarity);
            return () => {
                const targetItems = this.board.player.hostileTarget.board.items.filter(item => item.cooldown>0);
                const targetItem = this.pickRandom(targetItems);
                if(targetItem) {
                    targetItem.gain(cooldownIncrease*1000,'cooldown');
                    log(this.name + " increased " + targetItem.name + " cooldown by " + cooldownIncrease + " seconds");
                }
            };
        }
        

        /*this gains ( 5 » 10 » 15 » 20 ) damage for the fight

        somehow, magically, this is covered by the regex used for 'this and adjacent Poison items gain ( 1 » 2 » 3 ) Poison for the fight' case, as 'damage' works the same way as 'Poison'

        regex = /^\s*this gains (?:\(([^)]+)\)|(\d+)) damage for the fight/i;
        match = text.match(regex);
        if(match) {
            const dmgGain = match[1] ? getRarityValue(match[1], this.rarity) : parseInt(match[2]);
            return () => {
                this.damage += dmgGain;
                log(this.name + " gained " + dmgGain + " damage");
            };
        }*/
       //Destroy an enemy item for the fight.
       regex = /^Destroy an enemy item for the fight\.?$/i;
       match = text.match(regex);
       if(match) {
        return () => {
            this.pickRandom(this.board.player.hostileTarget.board.items).destroy(this);
        };
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
                }
            }
        }
        regex = /^Crit chance \(\s*(\d+)%\s*»\s*(\d+)%\s*»\s*(\d+)%\s*»\s*(\d+)%\s*\)/i;
        match = text.match(regex);
        if(match) {
            this.crit = getRarityValue(`${match[1]}»${match[2]}»${match[3]}»${match[4]}`, this.rarity);
            this.text = this.text.filter(t => t!=text);
            return () => {};
        }
        //Your other Slow items have +1 Slow.
        regex = /^Your other ([^\s]+) items have (\+\d+) (Slow|Haste|Shield|Burn|Poison|Heal)\.?/i;
        match = text.match(regex);
        if(match) {
            const value = parseInt(match[2]);
            this.board.items.forEach(item => {
                if(item.id == this.id) return;
                if(item.tags.includes(match[1])) {
                    switch(match[3]) {
                        case "Slow":    
                            item.slow += value;
                            break;
                        case "Haste":
                            item.haste += value;
                            break;                            
                        default:
                            item.gain(value,match[3].toLowerCase());
                    }
                }
            });

            return () => {};            
        }
        //Freeze 1 small? item for ( 1 » 2 ) second(s)
        regex = /^\s*Freeze\s+(?:(?:\(([^)]+)\)|(\d+))|an|a)\s*([^\s]+)?\s*item\(?s?\)?\s+for\s+(?:\(([^)]+)\)|(\d+))\s+second\(?s?\)?\.?/i;
        match = text.match(regex);        
        if(match) {
            const seconds = match[4] ? getRarityValue(match[4], this.rarity) : parseInt(match[5]);
            const tagToMatch = match[3] ? Item.getTagFromText(match[3]) : null;
            let numToFreeze = match[1] ? getRarityValue(match[1], this.rarity) : match[2] ? parseInt(match[2]) : 1;
            return () => {
                let itemsToFreeze = this.board.player.hostileTarget.board.items;
                if(tagToMatch) {
                    itemsToFreeze = itemsToFreeze.filter(item => item.tags.includes(tagToMatch));
                }
                itemsToFreeze = itemsToFreeze.filter(item => item.isFreezeTargetable());
                const numToFreezeNow = Math.min(numToFreeze, itemsToFreeze.length);
                this.pickRandom(itemsToFreeze,numToFreezeNow).forEach(item => {
                    item.applyFreeze(seconds,this);
                });

            };
        }
        //items adjacent to it gain (  3%  » 6%  » 9%   ) Crit chance.
        regex = /^items adjacent to it gain (?:\(([^)]+)\)|\+?(\d+)%?) ([^\s]+)(?: chance)?/i;
        match = text.match(regex);
        if(match) {
            const gainAmount = parseInt(match[1] ? getRarityValue(match[1], this.rarity) : match[2]);
            const gainType = match[3].toLowerCase();
            return (item)=>{
                item.getAdjacentItems().forEach(i => i.gain(gainAmount,gainType));
            };
        }

        //Adjacent items have ( +15% » +30% » +50% ) Crit Chance. from Sextant
        //Adjacent items have ( +3% » +6% » +9% » +12% ) Crit chance
        regex = /^Adjacent items have (?:\(([^)]+)\)|\+?(\d+)%?) Crit chance\.?/i;
        match = text.match(regex);
        if(match) {
            const critGain = parseInt(match[1] ? getRarityValue(match[1], this.rarity) : match[2]);
            this.getAdjacentItems().forEach(item => {
                item.gain(critGain,'crit');
            });
            return ()=>{};
        }


        //Adjacent items have their cooldown reduced by ( 10% » 15% » 20% » 25% ).
        regex = /^Adjacent items have their cooldown reduced by (?:\(\s*(\d+)%(?:\s*»\s*(\d+)%)*\s*\)|(\d+)%)\.?$/i;
        match = text.match(regex);
        if(match) {
            if (match[3]) {
                // Single number format
                const cooldownReduction = parseInt(match[3]);
                this.getAdjacentItems().forEach(item => {
                    item.cooldown *= (1-cooldownReduction/100);
                });
            } else {
                // Range format
                const rarityString = match.slice(1).filter(Boolean).join('»');
                const cooldownReduction = getRarityValue(rarityString, this.rarity);
                this.getAdjacentItems().forEach(item => {
                    item.cooldown *= (1-cooldownReduction/100);
                });
            }
            return ()=>{};
        }
        //This has triple value in combat.
        regex = /^This has triple value in combat\.?$/i;
        match = text.match(regex);
        if(match) {
            this.gain(this.value*2,'value');
            return ()=>{};
        }
        //Use all your other items.
        regex = /^Use all your other items\.?$/i;
        match = text.match(regex);
        if(match) {
            return () => {
                this.board.items.forEach(item => {
                    if(item.id != this.id) {
                        item.trigger();
                    }
                });
            }
        }
         //Your weapons gain damage equal to your weakest weapon's damage for the fight. [0]
         regex = /^Your weapons gain damage equal to your weakest weapon's damage for the fight.*?$/i;
         match = text.match(regex);
         if(match) {
            return () => {
                const weakestWeaponDamage = this.board.items.filter(item => item.tags.includes("Weapon")).reduce((min, item) => Math.min(min, item.damage), Infinity);
                this.board.items.forEach(item => {
                    if(item.tags.includes("Weapon")) {
                        item.gain(weakestWeaponDamage,'damage');
                    }
                });
            }
         }
        //Charge all items to the right of this 1 second(s).
        regex = /^Charge all items to the right of this (?:\(([^)]+)\)|(\d+)) second\(?s?\)?\.?/i;
        match = text.match(regex);
        if(match) {
            const seconds = match[1] ? getRarityValue(match[1], this.rarity) : parseInt(match[2]);
            return () => {
                this.board.items.filter(item => item.startIndex>this.startIndex).forEach(item => {
                    item.chargeBy(seconds);
                });
            };
        }
        //Charge adjacent Small items ( 1 » 2 » 3 » 4 ) second(s).
        regex = /^Charge adjacent\s*([^\s]+)? items (?:\(([^)]+)\)|(\d+)) second\(?s?\)?\.?/i;
        match = text.match(regex);
        if(match) {
            const seconds = match[2] ? getRarityValue(match[2], this.rarity) : parseInt(match[3]);
            const tagToMatch = Item.getTagFromText(match[1]);
            const itemsToCharge = tagToMatch ? this.getAdjacentItems().filter(item => item.tags.includes(tagToMatch)) : this.getAdjacentItems();
            return () => {
                itemsToCharge.forEach(item => {
                    item.chargeBy(seconds);
                });
            };


        }

        //Burn items to the right of this gain ( 1 » 2 » 3 » 4 ) Burn for the fight

        regex = /^(?:the )?([^\s]+)(?: item)?s? to the right of this gains? (?:\(([^)]+)\)|(\d+)) ([^\s]+).*/i;
        match = text.match(regex);

        if(match) {
            const gainAmount = match[2] ? getRarityValue(match[2], this.rarity) : parseInt(match[3]);
            const tagToMatch = Item.getTagFromText(match[1]);
            return () => {
                this.board.items.filter(item => item.startIndex>this.startIndex && item.tags.includes(tagToMatch)).forEach(item => {
                    item.gain(gainAmount,match[4].toLowerCase());
                    log(this.name + " gave " + item.name + " " + gainAmount + " " + match[4]);
                });
            };
        }
        //This has double value in combat.
        regex = /^This has double value in combat\.?$/i;
        match = text.match(regex);
        if(match) {
            this.gain(this.value,'value');
            this.value_multiplier += 1;
            return ()=>{};
        }
        // Deal damage equal to 3 times the value of your items.
        regex = /^Deal damage equal to 3 times the value of your items\.?$/i;
        match = text.match(regex);
        if(match) {
            const totalValue = this.board.items.reduce((sum, item) => sum + item.value, 0);
            this.gain(totalValue*3,'damage');
            return ()=>{
                this.dealDamage(this.damage);
            };
        }
        //Your items have double value in combat.
        regex = /^Your items have double value (?:in|during) combat\.?$/i;
        match = text.match(regex);
        if(match) {
            this.board.items.forEach(item => {
                const oldmultiplier = item.value_multiplier;
                item.value_multiplier = 1;
                item.gain(item.value,'value');
                item.value_multiplier = oldmultiplier+1;
            });
            return ()=>{};
        }




        //Give Shield items to the right of this ( +5 » +10 » +20 » +40 ) Shield for the fight.
        regex = /^Give ([^\s]+)? items to the right of this (?:\(([^)]+)\)|(\d+)) ([^\s]+) for the fight\.?/i;
        match = text.match(regex);
        if(match) {
            const tagToMatch = match[1] ? Item.getTagFromText(match[1]) : null;
            const gainAmount = match[2] ? getRarityValue(match[2], this.rarity) : parseInt(match[3]);
            const itemsToGive = this.board.items.filter(item => item.startIndex>this.startIndex && (tagToMatch ? item.tags.includes(tagToMatch) : true));
            return () => {
                itemsToGive.forEach(item => {
                    item.gain(gainAmount,match[4].toLowerCase());
                    log(this.name + " gave " + item.name + " " + gainAmount + " " + match[4]);
                });
            };
        }
       
        //For each adjacent Friend or Property, this gains ( +4 » +8 ) Burn.
        regex = /^For each adjacent ([^\s]+)( or ([^\s]+))?, this gains (?:\(([^)]+)\)|(\d+)) ([^\s]+).*/i;
        match = text.match(regex);

        if(match) {
            const tagToMatch = Item.getTagFromText(match[1]);
            const tagToMatch2 = Item.getTagFromText(match[2]);
            const gainAmount = match[3] ? getRarityValue(match[3], this.rarity) : parseInt(match[4]);
            return () => {
                this.getAdjacentItems().forEach(item => {

                    if(item.tags.includes(tagToMatch) || item.tags.includes(tagToMatch2)) {
                        item.gain(gainAmount,match[4].toLowerCase());
                    }

                });
            }
        }
        //a weapon gains (  +5  » +10  » +15  » +20   ) damage for the fight.
        regex = /^a ([^\s]+)(?: item)? gains (?:\(([^)]+)\)|(\d+)) ([^\s]+) for the fight\.?$/i;
        match = text.match(regex);
        if(match) {
            const tagToMatch = Item.getTagFromText(match[1]);
            const gainAmount = match[2] ? getRarityValue(match[2], this.rarity) : parseInt(match[3]);
            const targetItems = this.board.items.filter(item => item.tags.includes(tagToMatch));
            return () => {
                let targetItem = this.pickRandom(targetItems);
                if(targetItem) {
                    targetItem.gain(gainAmount,match[4].toLowerCase());
                }
            }
        }
        //this gains Shield equal to the value of that item for the fight
        regex = /^\s*this gains \+?Shield equal to the value of that item for the fight\.?$/i;
        match = text.match(regex);
        if(match) {
            return (item)=>{
                this.shield += item.value;
                log(this.name + " gained " + item.value + " Shield");
            };
        }
        //This has double damage.
        regex = /^\s*This has double (damage|poison|burn)\.?$/i;
        match = text.match(regex);
        if(match) {
            const whatToGain = match[1].toLowerCase();
            this.gain(this[whatToGain],whatToGain);
            this[whatToGain+"_multiplier"] = 2;
            return ()=>{};
        }
        //This has double poison


        //Cleanse half your Burn.
        regex = /^\s*Cleanse half your Burn\.?$/i;
        match = text.match(regex);
        if(match) {
            return () => {
                this.board.player.burn /= 2;
                log(this.name + " cleansed half "+this.board.player.name+"'s Burn");
            }
        }
        //reload 2 Ammo
        regex = /^\s*reload (\d+) Ammo/i;
        match = text.match(regex);
        if(match) {
            return () => {
                this.ammo += parseInt(match[1]);
                log(this.name + " reloaded " + match[1] + " Ammo");
            }
        }
        //use this
        regex = /^\s*use this/i;
        match = text.match(regex);
        if(match) {
            return () => {
                this.trigger();
            }
        }
        //Use the Core.
        regex = /^\s*Use the Core\.?$/i;
        match = text.match(regex);
        if(match) {
            return () => {
                this.board.items.forEach(item=>{
                    if(item.tags.includes("Core")) {
                        log(this.name+" used "+item.name);
                        item.trigger();
                    }
                });
            }
        }
        //this gains ( 1 » 2 » 3 » 4 ) (tag)
        regex = /^\s*this (?:permanently )?gains (\([^)]+\)|\d+) ([^\s]+)\.?/i;
        match = text.match(regex);
        if(match) {
            const isPercentageBased = match[1].includes("%");
            const gainAmount = getRarityValue(match[1].replace("%",""), this.rarity);            
            const whatToGain = match[2].toLowerCase();
            if(isPercentageBased) {
                return () => {
                    this.gain(this[whatToGain]*gainAmount/100,whatToGain);
                    log(this.name + " gained " + gainAmount + " " + whatToGain);
                }
            } else {
                return () => {
                    this[whatToGain] += gainAmount;
                    log(this.name + " gained " + gainAmount + " " + whatToGain);
                }        
            }
        }
        //This deals quadruple crit damage.
        regex = /^This deals quadruple crit damage\.?$/i;
        match = text.match(regex);
        if(match) {            
                this.gain(300,'critMultiplier');
                return () => {}
        }
        //Your Weapons have (  +5%  » +10%  » +15%  » +20%   ) Crit chance. 
        /*Your Shield items have +1 Shield 
        regex = /^Your ([^\s]+)(?:s)? (?:items)?\s*have (?:\(([^)]+)\)|(\+?\d+%?)) ([^\s^\.]+)(?: chance)?\.?$/i;
        match = text.match(regex);
        if(match) {
            const tagToMatch = Item.getTagFromText(match[1]);
            const haveAmount = parseInt(match[2] ? getRarityValue(match[2], this.rarity) : match[3]);
            const whatToGain = match[4].toLowerCase();
            this.board.items.forEach(item => {
                if(tagToMatch=='Item' || item.tags.includes(tagToMatch)) {
                    item.gain(haveAmount,whatToGain);
                }
            });
            return ()=>{};
        }*/
        


        //Your Shield items have + Shield equal to (  2  » 3  » 4   ) times your level.
        regex = /^Your Shield items have \+ Shield equal to (?:\(([^)]+)\)|(\d+)) times your level.*$/i;
        match = text.match(regex);
        if(match) {
            const gainAmount = this.board.player.level * (match[1] ? getRarityValue(match[1], this.rarity) : parseInt(match[2]));
            this.board.items.forEach(item => {
                if(item.tags.includes("Shield")) {
                    item.gain(gainAmount,'shield');
                }
            }); 
            return ()=>{};

        }
        
        //Your Weapons have (  +5%  » +10%  » +15%  » +20%   ) Crit chance. 
        //Your Shield items have +1 Shield 
        //your items have ( +1% » +2% » +3% » +4% ) crit chance
        //your items have ( +1% » +2% » +3% » +4% ) crit chance for each weapon you have
        regex = /^your ([^\s]+)(?:s)? (?:items)?\s*have (\([^\)]+\)|\+?\d+%?) ([^\s]+)\s*(?:chance)?\s*(?:for each ([^\s]+) you have)?./i;
        match = text.match(regex);

        if(match) {
            const tagToMatch = Item.getTagFromText(match[1]);
            const gainAmount = parseInt(getRarityValue(match[2], this.rarity));
            const whatToGain = match[3].toLowerCase();
            const multiplier = match[4]?this.board.items.filter(item=>item.tags.includes(Item.getTagFromText(match[4]))).length:1;
            this.board.items.forEach(item => {
                if(tagToMatch=='Item' || item.tags.includes(tagToMatch)) {
                    item.gain(gainAmount*multiplier,whatToGain);
                }
            });
            return ()=>{};
        }
        //Your leftmost item with Ammo has (  +1  » +2  » +3  » +4   ) Max Ammo.
        regex = /^Your leftmost item with Ammo has (?:\(([^)]+)\)|(\d+)) Max Ammo\.?$/i;
        match = text.match(regex);
        if(match) {
            const gainAmount = parseInt(match[1] ? getRarityValue(match[1], this.rarity) : match[2]);
            const matchingItem = this.board.items.filter(item => item.tags.includes("Ammo")).sort((a,b) => a.startIndex - b.startIndex)[0];
            if(matchingItem) {
                matchingItem.maxAmmo += gainAmount;
                matchingItem.ammo = matchingItem.maxAmmo;
            }
            return ()=>{};


        }
        //Your Weapons have double Crit damage.
        regex = /^Your Weapons have double Crit damage\.?$/i;
        match = text.match(regex);
        if(match) {
            this.gain(this.critMultiplier,'critMultiplier');
            return ()=>{};
        }
        //This has double Heal.
        regex = /^This has double Heal\.?$/i;
        match = text.match(regex);
        if(match) {
            this.healChanged((newvalue,oldvalue) => {
                this.heal_pauseChanged = true;
                this.gain(newvalue-oldvalue,'heal');
                this.heal_pauseChanged = false;
            })
            return ()=>{};
        }

        //Your leftmost Weapon deals (  +20  » +30  » +40  » +50   ) Damage.
        //Your leftmost Poison item has (  +3  » +6  » +9  » +12   ) Poison.
        regex = /^Your (leftmost|rightmost) ([^\s]+)(?: item)? (?:has|deals|gains)\s*\(([^)]+)\)\s*([^\s^\.]+)\.?.*/i;
        match = text.match(regex);
        if(match) {
            const gainAmount = getRarityValue(match[3], this.rarity);
            const matchingItem = match[1] == "leftmost" ?
                this.board.items.filter(item => item.tags.includes(match[2]))
                    .sort((a,b) => a.startIndex - b.startIndex)[0] :
                this.board.items.filter(item => item.tags.includes(match[2]))
                    .sort((a,b) => b.startIndex - a.startIndex)[0];
            
            if(matchingItem) {
                matchingItem.gain(gainAmount, match[4].toLowerCase());
            }

            return ()=>{};
        }
        //give it (  +2%  » +4%  » +6%  » +8%   ) crit Chance for the fight
        regex = /^(?:give it |it gains )(?:\(([^)]+)\)|(\d+)) ([^\s]+) (?:Chance) for the fight\.?$/i;
        match = text.match(regex);
        if(match) {

            const gainAmount = match[1] ? getRarityValue(match[1], this.rarity) : parseInt(match[2]);
            const whatToGain = match[3].toLowerCase();
            return (item) => {
                item.gain(gainAmount, whatToGain, this);
            }

        }

        //Your leftmost Poison item has (  +3  » +6  » +9  » +12   ) Poison.
        //Your leftmost item has (  +8%  » +16%  » +24%  » +32%   ) Crit chance.
        regex = /^Your (leftmost|rightmost) ([^\s]+)?\s*item has (?:\(([^)]+)\)|(\d+))\s*([^\.]+)\.?.*/i;
        match = text.match(regex);
        if(match) {
            const gainAmount = match[3] ? getRarityValue(match[3], this.rarity) : parseInt(match[4]);
            const tagToMatch = match[2] ? Item.getTagFromText(match[2]) : null;
            const matchingItems = tagToMatch?this.board.items.filter(item => item.tags.includes(tagToMatch)):this.board.items;

            const matchingItem = match[1] == "leftmost" ?                
                    matchingItems.sort((a,b) => a.startIndex - b.startIndex)[0] :
                matchingItems.sort((a,b) => b.startIndex - a.startIndex)[0];


            if(matchingItem) {
                matchingItem.gain(gainAmount, match[5].toLowerCase());
            }   
            return ()=>{};
        }
        //This has double Haste duration.
        regex = /^This has double Haste duration\.?$/i;
        match = text.match(regex);
        if(match) {
            this.hasDoubleHasteDuration = true;
            return ()=>{};
        }

        //Your weapons have + damage equal to your gold.
        regex = /^Your weapons have \+ damage equal to your gold\.?$/i;
        match = text.match(regex);
        if(match) {
            this.board.items.forEach(item => {
                if(item.tags.includes("Weapon")) {
                    item.gain(this.board.player.gold,'damage');
                }
            });
            return ()=>{};
        }
        //your other items gain Value equal to this item's Value for the fight.
        regex = /^your other items gain Value equal to this item's Value for the fight\.?$/i;
        match = text.match(regex);
        if(match) {
            return ()=>{
                this.board.items.forEach(item => {
                    if(item.id!=this.id) { 
                        item.gain(this.value,'value');
                    }
                });
            }
        }
        
        //Reload your Potions 1 Ammo.
        regex = /^Reload your Potions 1 Ammo\.?$/i;
        match = text.match(regex);
        if(match) {
            return ()=>{
                this.board.items.forEach(item => {  
                    if(item.tags.includes("Potion")) {
                        item.gain(1,'ammo');
                    }
                });
            }
        }
        

        //Your weapons gain Damage equal to this item's value for the fight.
        regex = /^Your weapons gain Damage equal to this item's value for the fight\.?$/i;
        match = text.match(regex);

        if(match) {
            return ()=>{
                this.board.items.forEach(item => {
                    if(item.tags.includes("Weapon")) {  
                        item.gain(this.value,'damage');
                    }
                });
            };
        }

        //Freeze all non-weapon items for (  2  » 3   ) second(s).
        regex = /^Freeze all non-weapon items for (?:\(([^)]+)\)|(\d+)) second\(?s?\)?\.?$/i;
        match = text.match(regex);
        if(match) {
            const freezeAmount = parseInt(match[1] ? getRarityValue(match[1], this.rarity) : match[2]);
            return ()=>{
                this.board.items.forEach(item => {
                    if(!item.tags.includes("Weapon")) {
                        item.applyFreeze(freezeAmount,this);
                    }
                });
                this.board.player.hostileTarget.board.items.forEach(item => {
                    if(!item.tags.includes("Weapon")) {
                        item.applyFreeze(freezeAmount,this);
                    }
                });
            };
        }
        //reload (  1  » 2  » 3   ) the item to the left of it.
        regex = /^reload (\([^)]+\)|\d+) the item to the left of it\.?$/i;
        match = text.match(regex);
        if(match) {
            const reloadAmount = getRarityValue(match[1], this.rarity);
            return (it) => {
                const item = it.getItemToTheLeft();
                if(item) {
                    item.gain(reloadAmount,'ammo');
                }
            }   
        }

        //Your Weapons have + Damage equal to (  1x  » 2x  » 3x   ) your income.
        regex = /^Your ([^\s]+)(?: items)? have \+ ([^\s]+) equal to (?:\(([^)]+)\)|(\d+)x) your income\.?$/i;
        match = text.match(regex);


        if(match) {
            const tagToMatch = Item.getTagFromText(match[1]);
            const whatToGain = match[2].toLowerCase();
            const gainAmount = parseInt(match[3] ? getRarityValue(match[3], this.rarity) : match[4]);
            this.board.items.forEach(item => {
                if(item.tags.includes(tagToMatch)) {
                    item.gain(gainAmount,whatToGain);
                }
            });
            return ()=>{};
        }

        //gain ( 2 » 4 ) Regeneration for the fight.
        regex = /^gain (?:\(([^)]+)\)|(\d+)) Regeneration for the fight\.?$/i;
        match = text.match(regex);
        if(match) {
            const gainAmount = parseInt(match[1] ? getRarityValue(match[1], this.rarity) : match[2]);
           return ()=>{
            this.board.player.gainRegen(gainAmount);
            log(this.name + " added " + gainAmount + " Regeneration");
           }

        }
        
        //Reinforced Steel
        //your Weapons gain (  +5  » +10  » +15   ) damage and your Shield items gain (  +5  » +10  » +15   ) shield for the fight.
        regex = /^your ([^\s]+)s?(?: items)? gain (?:\(([^)]+)\)|(\d+)) ([^\s]+) and your ([^\s]+)(?: items)? gain (?:\(([^)]+)\)|(\d+)) ([^\s]+) for the fight\.?$/i;
        match = text.match(regex);
        if(match) {
            const firstTag = Item.getTagFromText(match[1]);
            const firstGain = match[2] ? getRarityValue(match[2], this.rarity) : parseInt(match[3]);
            const firstStat = match[4].toLowerCase();
            const secondTag = Item.getTagFromText(match[5]);
            const secondGain = match[6] ? getRarityValue(match[6], this.rarity) : parseInt(match[7]);
            const secondStat = match[8].toLowerCase();
            
            return () => {
                this.board.items.forEach(item => {
                    if(item.tags.includes(firstTag)) {
                        item.gain(firstGain, firstStat);
                    }
                    if(item.tags.includes(secondTag)) {
                        item.gain(secondGain, secondStat);
                    }
                });
            }
        }

        //You have (  2  » 4  » 6   ) Regeneration for each item with Ammo you have.
        regex = /^You have (?:\(([^)]+)\)|(\d+)) Regeneration for each ([^\s]+) item you have.*$/i;
        match = text.match(regex);
        if(match) {
            const regenToAdd = match[1] ? getRarityValue(match[1], this.rarity) : parseInt(match[2]);
            const itemCount = this.board.items.filter(item => item.tags.includes(Item.getTagFromText(match[3]))).length;
            this.board.player.gainRegen(regenToAdd * itemCount);
            this.board.updateHealthElement();
            log(this.name + " added " + regenToAdd * itemCount + " Regeneration");
            return ()=>{};

        }

        return null;
    }
    getCritTriggerFunctionFromText(text) {
        let regex,match;
        //Your items gain Crit Chance equal to this item's value for the fight.
        regex = /^\s*Your items gain Crit Chance equal to this item's value for the fight\.?$/i;
        match = text.match(regex);
        if(match) {
            return () => {
                this.board.items.forEach(item => {
                    item.gain(this.value,'crit');
                });
            }
        }
    }

    executeSpecificItemFunction() {
        const [strippedName] = Item.stripEnchantFromName(this.name);
        const f = ItemFunction.items.get(strippedName);
        if(f) { f(this); return true; }
        return false;
    }

    

    getTriggerFunctionFromText(text) {
        return this.getWeaponTriggerFunction(text) ||
        this.getSlowTriggerFunctionFromText(text) ||
        this.getShieldTriggerFunctionFromText(text) ||
        this.getBurnTriggerFunctionFromText(text) ||
        this.getHasteTriggerFunctionFromText(text) ||
        this.getPoisonTriggerFunctionFromText(text) ||
        this.getHealTriggerFunctionFromText(text) ||
        this.getFreezeTriggerFunctionFromText(text) ||
        this.getCritTriggerFunctionFromText(text) ||
   //     this.getAmmoTriggerFunctionFromText(text) ||
        this.getAnonymousTriggerFunctionFromText(text) ||
        (() => { console.log("Could not parse "+ text+ " from "+this.name); return ()=>{};})();
    }
    static getTagFromText(text) {
        if (!text) return null;
        text = text.replace(/s$/, ''); // Remove trailing 's' if present
        return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
    }

    getUndoableFunctionFromText(text, comparisonFunction,checkComparison=true) {
        //reduce this item's cooldown by 50%
        let regex = /^reduce this item's cooldown by (\d+)%.*/i;
        let match = text.match(regex);
        let doIt,undoIt;
        if(match) {
            const cooldownReduction = parseInt(match[1]);
            doIt = () => {
                this.cooldown *= (1-cooldownReduction/100);
            };
            undoIt = () => {
                this.cooldown /= (1-cooldownReduction/100);
            };
        }
        //your weapons have (  +5  » +10  » +20   ) damage.
        //your items have (  +5%  » +10%  » +20%   ) Crit Chance.
        regex = /^your ([^s]+)s?(?: items)? have (?:\(([^)]+)\)|\+?(\d+)%?) ([^\s^\.]+)\s*(?:Chance)?\.?$/i;
        match = text.match(regex);
        if(match) {
            const gainAmount = parseInt(match[2] ? getRarityValue(match[2], this.rarity) : match[3]);
            const whatToGain = match[4].toLowerCase();
            const whichItems = match[1] ? this.board.items.filter(item => item.tags.includes(Item.getTagFromText(match[1]))) : this.board.items;
            doIt = () => {
                whichItems.forEach(item => {
                    item.gain(gainAmount, whatToGain);
                });
            };
            undoIt = () => {
                whichItems.forEach(item => {
                    item.gain(-gainAmount, whatToGain);
                });
            }

        }   
       
        //this has +1 Multicast.
        regex = /^this has \+1 Multicast\.?$/i;
        match = text.match(regex);
        if(match) {
            doIt = () => {
                this.multicast += 1;
            };
            undoIt = () => {
                this.multicast -= 1;
            };
        }



        //your Weapons have their cooldowns reduced by (  5%  » 10%  » 20%   ).
        regex = /^your ([^\s]+)s?(?: items)? have their cooldowns reduced by (?:\(([^)]+)\)|(\d+)%?)\.?$/i;    
        match = text.match(regex);
        if(match) {
            const cooldownReduction = parseInt(match[2] ? getRarityValue(match[2], this.rarity) : match[3]);
            const tagToMatch = Item.getTagFromText(match[1]);
            doIt = () => {
                this.board.items.forEach(item => {
                    if(item.tags.includes(tagToMatch)) {
                        item.gain(item.cooldown * (1-cooldownReduction/100) - item.cooldown, "cooldown");
                    }
                });
            };

            undoIt = () => {
                this.board.items.forEach(item => {
                    if(item.tags.includes(tagToMatch)) {
                        item.gain(item.cooldown - item.cooldown * (1-cooldownReduction/100), "cooldown");
                    }
                });
            };
        }


        if(!doIt) {
            console.log("Could not parse "+ text+ " from "+this.name);
            return null;
        }


        if(checkComparison && comparisonFunction()) {
            this.didIt=true;
            doIt();
        } 
        return (...args)=>{
            if(this.didIt && !comparisonFunction(...args)) {
                undoIt(...args);
                this.didIt=false;
            } else if(!this.didIt && comparisonFunction(...args)) {
                doIt(...args);
                this.didIt=true;
            }
        };
    }
}