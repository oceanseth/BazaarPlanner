import { Board } from './Board.js';
import { getRarityValue, updateUrlState, colorTextArray, setupChangeListeners } from './utils.js';
import { ItemFunction } from './ItemFunction.js';
import { TextMatcher } from './TextMatcher.js';
import { BazaarPatcher } from './BazaarPatcher.js';

export class Item {
    static hiddenTags = ['Damage', 'Crit'];
    static rarityLevels = ['Bronze', 'Silver', 'Gold', 'Diamond', 'Legendary'];
    static possibleEnchants = ['Deadly', 'Ethereal', 'Fiery', 'Golden', 'Heavy', 'Icy', 'Mystical', 'Obsidian', 'Radiant', 'Restorative', 'Shielded', 'Shiny','Toxic', 'Turbo' ];
    static possibleChangeAttributes = ['damage','shield','burn','poison','heal','ammo','value','crit','regen','charge','lifesteal','slow','haste','freeze'];
    static characterTags = ['Dooley','Vanessa','Pygmalien','Mak','Stelle','Common'];
    static sizeTags = ['Small','Medium','Large'];
    static allowedGainMap = {
        "crit": ["Weapon","Poison","Burn","Shield","Heal"]
    };

    static enchantTagMap = {
        'Toxic': 'Poison',
        'Fiery': 'Burn',        
        'Icy': 'Freeze',
        'Restorative': 'Heal',
        'Shielded': 'Shield',
        'Turbo': 'Haste',
        'Obsidian': 'Weapon',
        'Deadly': 'Crit',
        'Heavy': 'Slow',
        'Shiny': 'Multicast',
        'Golden': 'Golden',
        'Radiant': 'Radiant',
    }
    static itemID = 0;

    static getCacheByTag(tag) {
        if(Item[tag+"Cache"]==undefined) {
            const cache = []; 
            Object.values(items).forEach(i=>{ if(i.tags.includes(tag)) cache.push(i); });
            Item[tag+"Cache"] = cache;
        }
        return Item[tag+"Cache"];
    }
    
    pickRandom(...args) {
        return this.board.player.battle.pickRandom(...args);
    }

    battleRandom(...args) {
        return this.board.player.battle.battleRandom(...args);
    }

    log(s) {
           if(this.board.player.battle) this.board.player.battle.log(s);
    }
    _isEditable = false;
    get editable() {
        return this._isEditable;
    }
    set editable(value) {
        if(value==this._isEditable) return;
        this._isEditable = value?true:false;
        this.setupEditableEvents();
    }
    setupEditableEvents() {
        const e = this.element;  
        if(this.editable && e) {
            this.element.style.cursor='move';       
            e.draggable = true;        
            e.addEventListener('click', this.showEditor);

            e.addEventListener('dragstart', Board.handleDragStart);
            e.addEventListener('dragend', Board.handleDragEnd);
            e.addEventListener('touchstart', Board.handleTouchStart);
            e.addEventListener('touchend', Board.handleTouchEnd);
        } else if(e) {
            this.element.style.cursor='default';
            e.draggable = false;
            e.removeEventListener('click', this.showEditor);
            e.removeEventListener('dragstart', Board.handleDragStart);
            e.removeEventListener('dragend', Board.handleDragEnd);
            e.removeEventListener('touchstart', Board.handleTouchStart);
            e.removeEventListener('touchend', Board.handleTouchEnd);
        }
    }
    get sizeTag() {
        return Item.sizeTags[this.size-1];
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
        if(board) this.editable = board.options.editable;
        else this.editable = true;
        Object.assign(this, this.startItemData);
        if(this.rarity == undefined && this.tier!=undefined) {
            this.rarity = Item.rarityLevels[this.tier];
            this.startItemData.rarity = this.rarity;
        } 
        // Ensure text is always an array
        this.text = Array.isArray(this.text) ? this.text : this.text?[this.text].filter(Boolean):[];
        if(this.text.length>0) {
            for(let i=0;i<this.text.length;i++) {
                this.text[i] = this.text[i].replace(/Properties/i, match => 
                    match[0] === match[0].toUpperCase() ? "Property items" : "property items"
                );            
            }
        }

        this.size = this.tags.includes('Small') ? 1 : this.tags.includes('Medium') ? 2 : 3;
        
        
        if(this.startItemData.value==undefined) {
            this.startItemData.value = 0;
             this.startItemData.value = this.getInitialValue();
             if(items[this.name] && items[this.name].value==undefined) {
                items[this.name].value = this.startItemData.value;
            }
        }

        this.value = this.startItemData.value;
        
        //if(itemData.value==undefined) itemData.value = this.startItemData.value;
        
        this.resetCooldown();
        this.element = this.createElement();
        this.setupEditableEvents();

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
            <div class="heal-element"></div>    
            <div class="damage-element"></div>
            <div class="burn-element"></div>
            <div class="poison-element"></div>            
            <div class="shield-element"></div>
            <div class="multicast-element"></div>
        `;
        this.element.appendChild(this.battleStatsElement);
        this.updateElementPosition();
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
        this.log((source?source.name:"") + " destroyed " + this.name);
        if(this.tags.includes("Ammo")) {
          this.ammo = 0;
        }
        this.board.itemDestroyedTriggers.forEach(func => func(this,source));
        this.board.itemValuesChangedTriggers.forEach(func => func(this,source));
        source.board.player.destroyTriggers.forEach(func => func(this,source));
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

        if(this.regen>0) {
            this.regenElement.style.display ='block';
            this.regenElement.textContent = formatNumber(this.regen);
        }
        else this.regenElement.style.display = 'none';

        if(this.lifesteal > 0) this.damageElement.classList.add('lifesteal');
        else this.damageElement.classList.remove('lifesteal');
        if(this.maxAmmo) {
            this.ammoElement.style.display ='block';
            const maxAmmoDots = this.size*60/10;
            if(this.maxAmmo>maxAmmoDots) {
                this.ammoElement.innerHTML = '<div class="ammo-icon ammo-icon-empty"></div>'.repeat(Math.max(0,maxAmmoDots-this.ammo)) +
                '<div class="ammo-icon ammo-icon-full"></div>'.repeat(Math.min(this.ammo,maxAmmoDots));
            } else {
                this.ammoElement.innerHTML = '<div class="ammo-icon ammo-icon-empty"></div>'.repeat(this.maxAmmo-this.ammo) +
                '<div class="ammo-icon ammo-icon-full"></div>'.repeat(this.ammo);
            }
            const ammoWidth = Math.min(this.size*60, this.maxAmmo*10);
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
        if(this.battleStats.useCount) {
            this.battleStatsElement.querySelector('.multicast-element').style.display = 'block';
            this.battleStatsElement.querySelector('.multicast-element').textContent = this.battleStats.useCount.toFixed(0);
        }
        
        

        this.priceTagElement.textContent = Number(this.value).toFixed(0);
    }
    resetCooldown() {
        this.cooldown = this.getStartingCooldownFromText(this.startItemData.cooldown);
    }
    getStartingCooldownFromText(cooldown) {
        if(!cooldown) return 0;
        if(typeof cooldown === 'string') {
            cooldown = getRarityValue(cooldown, this.rarity||'Bronze');
        }

        return cooldown * 1000;

    }
    get regeneration() {
        return this.regen;
    }
    set regeneration(value) {
        this.regen = value;
    }
    regenerationChanged(f,s) {
        this.regenChanged(f,s);
    }
    reset() {
        if(this.resetFunctions) {
            this.resetFunctions.forEach(func => func());
        }
        this.resetFunctions = [];
        setupChangeListeners(this,Item.possibleChangeAttributes);
        this.pendingCharges = [];
        if(this.tooltip) {
            this.tooltip.remove();
            this.tooltip=null;
        }
        this.critCheck = [];
        this.removeTemporaryEnchant();
        this.textMatches = [];
        this.lifesteal = 0;
        this.isDestroyed = false;
        this.value = this.startItemData.value;
        this.element.classList.remove('destroyed');
        this.hasteTimeRemaining = 0;
        this.hasDoubleHasteDuration = false;
        this.hasDoubleFreezeDuration = false;
        this.hasDoubleSlowDuration = false;
        this.slowTimeRemaining = 0;
        this.numTriggers = 0;
        this.effectiveBattleTime = 0;
        this.pendingMulticasts = 0;
        this.critMultiplier = 100; //default crit multiplier is 100% more damage
        this.regen = 0;
        this.battleStats = { useCount:0 };
        if(this.priorities && this.priorities.length>0) {
            this.priority = this.priorities[0];
        } else {
            this.priority = 0;
        }

        this.startItemData.tags = this.startItemData.tags.filter(tag => tag!="Leftmost"&&tag!="Rightmost");
        Object.assign(this, this.startItemData);
        this.tags = [...this.startItemData.tags];
        this.element.classList.remove('frozen',...Item.rarityLevels, ...Item.possibleEnchants);
        this.resetEnchant();
        this.size = this.tags.includes('Small') ? 1 : this.tags.includes('Medium') ? 2 : 3;
        this.resetCooldown();


        this.battleStatsElement.querySelectorAll('div').forEach(div => div.style.display = 'none');

        this.freezeDurationRemaining = 0;
        this.freezeElement.classList.add('hidden');
        this.element.classList.add(this.rarity || 'Bronze');
    
        this.value = this.startItemData.value;
        this.damage = this.startItemData.damage||0;
        this.shield = this.startItemData.shield||0;
        this.burn = this.startItemData.burn||0;
        this.poison = this.startItemData.poison||0;
        this.damageBonus = this.startItemData.damageBonus||0;

        this.multicast = 0;
        this.maxAmmo = this.startItemData.ammo||0;
        if(typeof this.maxAmmo === 'string') {
            this.maxAmmo = getRarityValue(this.maxAmmo, this.rarity);
        }
        this.ammo = this.maxAmmo;

        this.triggerFunctions = [];
        this.adjacentItemTriggers = []; //functions to call when any item adjacent to this item is triggered

        if(this.progressBar) {
            this.progressBar.style.bottom = '-5px';
            this.progressBar.style.display = 'none';   
            this.hasteIndicator.classList.add('hidden');
            this.slowIndicator.classList.add('hidden');             
        }            
    }
    resetEnchant() {
        if(this.enchant) {
            this.name = this.enchant + ' ' + this.name;
            if(Item.enchantTagMap[this.enchant] && !this.tags.includes(Item.enchantTagMap[this.enchant])) this.tags.push(Item.enchantTagMap[this.enchant]);
            this.tags.push("Enchanted");
            this.element.classList.add(this.enchant);
            
        // Generate and apply enchant overlay
            if (this.enchant=='Golden') {
                this.element.style.setProperty('--enchant-overlay', `url(/images/enchants/EdgeOverlay-${Item.cleanName(this.nameWithoutEnchant)}.webp)`);
                this.element.style.setProperty('--enchant-overlay-mix-blend-mode', 'overlay');
                this.element.classList.add('has-enchant-overlay');
            } else if(this.enchant=='Shiny') {
                this.element.style.setProperty('--enchant-overlay', `url(/images/enchants/EdgeOverlay-${Item.cleanName(this.nameWithoutEnchant)}.webp)`);
                this.element.style.setProperty('--enchant-overlay-mix-blend-mode', 'luminosity');
                this.element.classList.add('has-enchant-overlay');
            } else if(this.enchant=='Radiant') {
                this.element.style.setProperty('--enchant-overlay', `url(/images/enchants/EdgeOverlay-${Item.cleanName(this.nameWithoutEnchant)}.webp)`);
                this.element.style.setProperty('--enchant-overlay-filter', 'hue-rotate(250deg) saturate(150%)');
                this.element.style.setProperty('--enchant-overlay-mix-blend-mode', 'color-burn');
                this.element.classList.add('has-enchant-overlay');
            } else if(this.enchant=='Deadly') {
                this.element.style.setProperty('--enchant-overlay', `url(/images/enchants/EdgeOverlay-${Item.cleanName(this.nameWithoutEnchant)}.webp)`);
                this.element.style.setProperty('--enchant-overlay-filter', 'hue-rotate(-45deg) saturate(200%)');
                this.element.style.setProperty('--enchant-overlay-mix-blend-mode', 'color-burn');
                this.element.classList.add('has-enchant-overlay');
            } else {
                this.element.style.setProperty('--enchant-overlay-mix-blend-mode', 'overlay'); 
                this.element.style.setProperty('--enchant-overlay-filter', '');
                this.element.style.removeProperty('--enchant-overlay');
                this.element.classList.remove('has-enchant-overlay');
            }


        } else {
            this.element.style.removeProperty('--enchant-overlay');
            this.element.classList.remove('has-enchant-overlay');           
            this.element.style.setProperty('--enchant-overlay-mix-blend-mode', 'overlay'); 
        }
    }
    setup() {
        if(BazaarPatcher.customSetupFunctions.has(this.name)) {
            BazaarPatcher.customSetupFunctions.get(this.name)(this);
        }
        if(!this.executeSpecificItemFunction()) {
            
            this.text.forEach((text, index) => {
                const textSplit = text.split(/(?<=\.)[^d]/);
                if(textSplit.length>2) {
                    this.text[index] = textSplit[0];
                    this.text.push(...textSplit.slice(1));
                }
                this.setupTextFunctions(text, this.priorities?this.priorities[index]:0)
            });
        }
        if(this.enchant) {
            if(this.enchant!='Radiant') {
                this.setupTextFunctions(this.enchants[this.enchant]);
            }            
        }       
    }
    clone(newBoard) {
       const clone = new Item(structuredClone(this.startItemData),newBoard);
       clone.startIndex = this.startIndex;
       clone.enchant = this.enchant;       
       return clone;
    }

    getInitialValue() {
        return  (this.enchant?2:1) * this.size * Math.pow(2, this.tier);
    }

    adjacentItemTriggered(item) {
        this.board.critPossible=false;
        this.adjacentItemTriggers.forEach(func => func(item));
        this.board.critPossible=true;
    }
    static cleanName(name) {
        return name.replace(/[ '"()\-_\.&]/g, '');
    }
    createElement() {
        const mergedSlot = document.createElement('div');
        mergedSlot.innerHTML = `<div class="trigger-values">
            <div class="heal-element"></div>    
            <div class="regen-element"></div>
            <div class="damage-element"></div>
            <div class="shield-element"></div>
            <div class="burn-element"></div>
            <div class="poison-element"></div>                        
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
        this.regenElement = this.triggerValuesElement.querySelector('.regen-element');
        mergedSlot.className = 'merged-slot';
        if(this.editable) {
            mergedSlot.style.cursor='move';
        }
        
        // Add classes for each tag
        if (this.tags && Array.isArray(this.tags)) {
            this.tags.forEach(tag => {
                mergedSlot.classList.add(`tag-${tag.toLowerCase()}`);
            });
        }
        mergedSlot.classList.add(this.rarity || 'Bronze', this.editable?'editorOpener':'not-editable');
        mergedSlot.style.width = `${this.size * 80 + this.startIndex*2}px`;
        mergedSlot.setAttribute('data-size', this.size);
        const icon = document.createElement('img');
        icon.src = '/images/items/'+Item.cleanName(this.name)+'.avif';
        icon.draggable = false;
        mergedSlot.appendChild(icon);


        // Add event listeners
        mergedSlot.addEventListener('mouseenter', () => {
            if(this.isDestroyed) return;
            this.tooltip = this.createTooltipElement();
            this.element.appendChild(this.tooltip);
        });
        
        mergedSlot.addEventListener('mouseleave', () => {
            if(this.tooltip) {
                this.tooltip.remove();
            }
        });
    
        return mergedSlot;
    }
    createEnchantPreviewElement() {
        let html = "<div class='item-enchant-preview'>";
        if(this.enchants) {
            for(let i in this.enchants) {
                html += `<div class="enchant-preview-container">
            <div class="enchant-name">${colorTextArray([i],this.tier)}</div>
            <div class="enchant-description">${colorTextArray([this.enchants[i]],this.tier)}</div>
        </div>
            `;
            }
        }
        html += "</div>";
        const preview = document.createElement('div');
        preview.id = 'item-enchant-preview';
        preview.innerHTML = html;
        return preview;
    }
    createTooltipElement() {
        const tooltip = document.createElement('div');
        tooltip.className = 'tooltip';
        const tooltips = document.getElementsByClassName('tooltip');
        Array.from(tooltips).forEach(t=>{ //tooltips get stuck open sometimes, lets remove any that aren't the current one
            if(t!=tooltip) {
                t.remove();
            }
        });
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
        //let rarityIndex = Item.rarityLevels.indexOf(this.rarity || 'Bronze');
        // Create HTML content with structured layout
        let tooltipContent = `<div class="background-image" style="opacity:0.2;background-image:url('/images/items/${Item.cleanName(this.nameWithoutEnchant)}.avif'); background-size: cover; background-position: center;"></div>
            <div class="tooltip-content">
                <div class="tooltip-tags">
                    ${tagsArray.map(tag => `<span class="tag tooltip-tag-${tag.toLowerCase()}">${tag}</span>`).join('')}
                </div>
                <div class="tooltip-name ${this.rarity||'Bronze'}Border">${[this.name]}
                                ${this.ammo ? `
                    <div class="tooltip-ammo">
                        Ammo<br>${this.ammo}
                    </div>
                ` : ''}
                </div>
                <div class="tooltip-main ${this.rarity||'Bronze'}Border">                    
                    <div class="tooltip-main-text">
                        ${colorTextArray(this.text,this.tier)}
                    </div>
                    ${this.crit ? `
                    <div class="tooltip-divider"></div>
                    <div class="tooltip-crit">
                       Crit Chance: ${this.crit}%
                    </div>
                ` : ''}
                </div>
                <div class="tooltip-bottom ${this.rarity||'Bronze'}Border">
                    <div class="tooltip-bottom-text">
                        ${this.lifesteal>0?'Lifesteal<br>':''}
                        ${this.critMultiplier>100?'Crit Multiplier: '+this.critMultiplier+'%<br>':''}
                        ${this.enchant?colorTextArray([this.enchants[this.enchant]],this.tier)+'<br>':''}
                        ${this.startItemData.haste>0?'Haste Bonus: '+this.startItemData.haste+'s<br>':''}
                        ${this.startItemData.slow>0?'Slow Bonus: '+this.startItemData.slow+'s<br>':''}
                        ${this.startItemData.freeze>0?'Freeze Bonus: '+this.startItemData.freeze+'s<br>':''}
                        ${this.damageBonus>0?'Damage Bonus: '+this.damageBonus+'<br>':''}
                    </div>
                </div>
        `;
        if(this.cooldown && this.cooldown>0) {
            tooltipContent +=`<div class="tooltip-cooldown-container">`;
            if((typeof items[this.nameWithoutEnchant].cooldown)!='string') {
                tooltipContent +=`<div class="tooltip-cooldown-circle ${Item.rarityLevels[this.tier]}Border">${(this.cooldown/1000).toFixed(1)}<span class="unit">SEC</span></div>`;
            } else {        
                const cooldownNumbers = items[this.nameWithoutEnchant].cooldown.replace(/[\(\)]/g,'').split('/');        
                const currentCooldownDiff = ((this.cooldown - 1000*parseFloat(cooldownNumbers[this.tier-(4-cooldownNumbers.length)]))/1000);
                tooltipContent += cooldownNumbers.map((c,i)=>`<div class="tooltip-cooldown-circle ${Item.rarityLevels[i+(4-cooldownNumbers.length)]}Border" `+
                (this.tier!=i+(4-cooldownNumbers.length)?'style="filter: brightness(50%);"':'')
                +`>${(parseFloat(c)+currentCooldownDiff).toFixed(2)}<span class="unit">SEC</span></div>`).join('');
            }
            tooltipContent +=`</div>`;
        }
        tooltipContent +='</div>';
        tooltip.innerHTML = tooltipContent;
        if(!this.enchant && this._isEditable) tooltip.appendChild(this.createEnchantPreviewElement());
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
        this.board.hasHastedItem = 1;
    }

    applyHasteTo(item) {
        let duration = this.haste;
        if(this.hasDoubleHasteDuration) {
            duration*=2;
        }
        if(item.hasteTimeRemaining<=0) {
            item.becameHastedOnEffectiveBattleTime = this.effectiveBattleTime ;
        }
        item.applyHaste(duration);
        this.log(this.name + " hastened " + item.name + " for " + duration + " seconds");
        this.board.critPossible=false;
        this.board.hasteTriggers.forEach(func => func(item, this, duration*1000));
        this.board.critPossible=true;
    }

    applySlow(duration) {
        this.slowTimeRemaining += duration * 1000;    
        this.isSlowed = 1;
        this.board.hasSlowedItem = 1;
    }

    applySlowTo(item) {
        if(item.enchant=='Radiant') {
            this.log(this.name + " cannot slow " + item.name + " because it has the Radiant enchantment.");
            return;
        }
        let duration = this.slow;
        if(this.hasDoubleSlowDuration) {    
            duration *= 2;
        }
        item.applySlow(duration);
        this.log(this.name + " slowed " + item.name + " for " + duration + " seconds");
        this.board.critPossible=false;
        this.board.slowTriggers.forEach(func => func(item,this));
        this.board.critPossible=true;
    }

    applyChargeTo(item,source=this) {
        //item.chargeBy(this.charge,source);
        item.pendingCharges.push({seconds:this.charge,source});
    }

    reload(source) {
        this.ammo = this.maxAmmo;
        this.log((source?source.name:"") + " reloaded " + this.name);
        this.board.critPossible=false;
        this.board.reloadTriggers.forEach(func => func(this,source));
        this.board.critPossible=true;        
    }

    updateProgressBar(progress) {
        this.progressBar.style.bottom = `calc(${progress}% - 5px)`;        
        this.updateStatusIndicators();
    }
    progressHasteAndSlowAndReturnEffectiveTimeDiff(timeDiff) {        
        // Calculate effective time considering haste/slow
        // timediff has not yet been added to this.effectiveBattleTime for the current tick
        let effectiveTimeDiff = timeDiff;        
        if(this.becameHastedOnEffectiveBattleTime!=(this.effectiveBattleTime + this.board.player.battle.battleIntervalSpeed)) //make sure it didn't gain haste on this same tick)
        { 
            if(this.hasteTimeRemaining > 0 ) {
                if(!this.slowTimeRemaining>0) effectiveTimeDiff *= this.cooldown>2000?2:this.cooldown/1000; // haste multiplier            
                this.hasteTimeRemaining -= timeDiff;
                if(this.hasteTimeRemaining <= 0) {
                    this.hasteTimeRemaining = 0;
                    this.isHasted = 0;
                    if(!this.board.items.some(i=>i.hasteTimeRemaining>0)) {
                        this.board.hasHastedItem = 0;
                    }
                }
            }
        }
        if(this.becameSlowedOnEffectiveBattleTime!=(this.effectiveBattleTime + this.board.player.battle.battleIntervalSpeed)) //make sure it didn't gain slow on this same tick)
        {
            if (this.slowTimeRemaining > 0) {
                if(!this.hasteTimeRemaining>0)effectiveTimeDiff *= 0.5; // slow multiplier                
                this.slowTimeRemaining -= timeDiff;
                if(this.slowTimeRemaining <= 0) {
                    this.slowTimeRemaining = 0;
                    this.isSlowed = 0;
                    if(!this.board.items.some(i=>i.slowTimeRemaining>0)) {
                        this.board.hasSlowedItem = 0;
                    }
                }
            }
        }

        return effectiveTimeDiff;
    }

    updateBattle(timeDiff) {
        
        if(this.freezeDurationRemaining > 0) {
            this.freezeDurationRemaining -= timeDiff;
            if(this.freezeDurationRemaining > 0) {
                this.element.classList.add('frozen');       
                this.freezeElement.classList.remove('hidden');
                this.freezeElement.textContent = (this.freezeDurationRemaining/1000).toFixed(1);

                this.progressHasteAndSlowAndReturnEffectiveTimeDiff(timeDiff);

                return;
            }
            
            this.freezeDurationRemaining = 0;
            this.isFrozen = 0;
            if(!this.board.items.some(i=>i.freezeDurationRemaining>0)) {
                this.board.hasFrozenItem = 0;
            }
            this.element.classList.remove('frozen');
            this.freezeElement.classList.add('hidden');
        }
        
        if (!this.progressBar || this.isDestroyed) return;

        let effectiveTimeDiff = this.progressHasteAndSlowAndReturnEffectiveTimeDiff(timeDiff);
        if(this.pendingCharges.length>0 && (this.board.player.battle.numTicks % 2==0)) { //every other tick  (assuming 100ms ticks, to match 200ms in game)
            let charge = this.pendingCharges.pop();
            this.chargeBy(charge.seconds,charge.source);
        }

        if(this.maxAmmo && this.ammo<=0 && this.numTriggers < Math.floor((effectiveTimeDiff+this.effectiveBattleTime) / this.cooldown)) {
            //don't progress battle time if no ammo is remaining and the item is ready to trigger
            return;
        }
        this.effectiveBattleTime += effectiveTimeDiff;
        // Update progress and check for triggers
        const progress = (this.effectiveBattleTime % (this.cooldown)) / this.cooldown * this.board.player.battle.battleIntervalSpeed;
        this.updateProgressBar(progress);

        const newTriggers = Math.floor((this.effectiveBattleTime -(this.numTriggers))/ this.cooldown);
        if (newTriggers > this.numTriggers && (!this.maxAmmo || this.ammo>0)) {
            if(this.maxAmmo) this.ammo--;
            if(this.multicast>0) {
                this.pendingMulticasts+=parseInt(this.multicast);    
            }
            this.numTriggers =this.numTriggers+1;
            this.trigger();
        } else if(this.pendingMulticasts>0) {
            this.pendingMulticasts--;
            this.trigger();
        }
    }

    trigger() {
        this.triggerFunctions.forEach(func => func());
        this.board.itemTriggered(this);
        this.adjacentItems.forEach(item => item.adjacentItemTriggered(this));
        this.battleStats.useCount++;
        /*
        if(this.pendingCharge) {
            if(this.pendingCharge >= this.cooldown) {
                this.pendingCharge -= this.cooldown-1;
                this.effectiveBattleTime += this.cooldown-1;
            } else {
                this.effectiveBattleTime += this.pendingCharge;
                this.pendingCharge = 0;
            }
        }*/
    }

    doICrit() {
        if(!this.board.critPossible) return false;
        if(this.critCheck[this.effectiveBattleTime]!==undefined) return this.critCheck[this.effectiveBattleTime];
        if(this.cooldown>0 && this.crit && this.battleRandom(this.crit / 100)) {
            this.critCheck[this.effectiveBattleTime] = true;
            this.board.itemDidCrit(this);
            return true;
        }
        this.critCheck[this.effectiveBattleTime] = false;
        return false;
    }
    applyDamage({amount=this.damage,target=this.board.player.hostileTarget}={}) {
        this.dealDamage(amount,target);
    }
    dealDamage(damage,target=this.board.player.hostileTarget) {
        damage = parseFloat(damage);
        if(isNaN(damage) || damage <=0) return;
        let doesCrit = this.doICrit();
        // Handle critical hits using itemData.crit (0-100) instead of critChance

        if (doesCrit) {
            damage *= (1+this.critMultiplier/100);
        }

       damage = target.takeDamage(damage);
        this.log(this.name + (doesCrit?" critically strikes and":"") +
            " deals "+ damage+" damage to " +
            target.name);            
        if(this.lifesteal >0) {
            this.board.player.heal(damage,this);
            this.log(this.name + " lifesteals " + damage + " health");
        }
        if(this.battleStats.damage == undefined) this.battleStats.damage = 0;
        this.battleStats.damage += damage;
    }
    applyShield({amount=this.shield, source=this}={}) {
        let doesCrit = this.doICrit();
        if(doesCrit) {
            amount *= (1+this.critMultiplier/100);
        }
        this.log(this.name + (doesCrit?" critically":"")+" shielded " + this.board.player.name + " for " + amount);
        this.board.player.applyShield(amount);
        this.board.shieldTriggers.forEach(func => func(this));
        if(this.battleStats.shield == undefined) this.battleStats.shield = 0;
        this.battleStats.shield += amount;
    }
    applyBurn({burnAmount=this.burn, source=this,selfTarget=false}={}) {
        let doesCrit = this.doICrit();
        if(doesCrit) {
            burnAmount *= (1+this.critMultiplier/100);
        }
        const target = (selfTarget?this.board.player:this.board.player.hostileTarget);
        this.log(this.name + (doesCrit?" critically ":"")+" burned " + target.name + " for " + burnAmount);
        target.applyBurn(burnAmount);
        this.board.burnTriggers.forEach(func => func(this,source));
        if(this.battleStats.burn == undefined) this.battleStats.burn = 0;
        this.battleStats.burn += burnAmount;
    }
    applyRegeneration({amount=this.regen, source=this}={}) {
        let doesCrit = this.doICrit();
        if(doesCrit) {
            amount *= (1+this.critMultiplier/100);
        }
        this.board.player.regen+=amount;
        this.log(this.name + (doesCrit?" critically ":"")+" adds " + amount + " regen");
        if(this.battleStats.regen == undefined) this.battleStats.regen = 0;
        this.battleStats.regen += amount;
    }
    applyRegen(o) {
        this.applyRegeneration(o);
    }
    applyHeal({amount=this.heal, source=this}={}) {
        amount = parseFloat(amount);
        if(isNaN(amount) || amount <=0) return;
        let doesCrit = this.doICrit();
        if(doesCrit) {
            amount *= (1+this.critMultiplier/100);
        }        
        this.log(this.name + (doesCrit?" critically ":"")+" healed " + this.board.player.name + " for " + amount);
        this.board.player.heal(amount,this);
        if(this.battleStats.heal == undefined) this.battleStats.heal = 0;
        this.battleStats.heal += amount;
    }
    applyFreezes(amount) {
        for(let i=0;i<amount;i++) {
            this.applyFreezeTo(this.pickRandom(this.board.player.hostileTarget.board.activeItems.filter(i=>i.isFreezeTargetable())));
        }
    }
    applyFreeze(duration,source=null) {
        if(source!=null) { return source.applyFreezeTo(this,duration);}
        if(this.enchant=='Radiant') return;
        if(this.isDestroyed) return;
        this.freezeDurationRemaining += duration*1000;
        this.board.hasFrozenItem = 1;
        this.isFrozen = 1;
        this.element.classList.add('frozen');
        this.freezeElement.textContent = (this.freezeDurationRemaining/1000).toFixed(1);
        this.freezeElement.classList.remove('hidden');      
    }
    applyFreezeTo(item) {
        if(item.enchant=='Radiant') {
            this.log(this.name + "'s freeze was prevented by " + item.name + ".");
            return;
        }
        let duration = this.freeze;
        if(this.hasDoubleFreezeDuration) {
            duration*=2;
        }
        item.applyFreeze(duration);
        this.log(this.name + " froze " + item.name + " for " + duration + " seconds");
        this.board.freezeTriggers.forEach(func => func(item,this));
    }
    removeFreeze(source) {
        if (this.freezeDurationRemaining <= 0) 
            return;
        this.freezeDurationRemaining = 0;
        this.isFrozen = 0;
        if(!this.board.items.some(i=>i.freezeDurationRemaining>0)) {
            this.board.hasFrozenItem = 0;
        }
        this.element.classList.remove('frozen');
        this.freezeElement.classList.add('hidden');
        this.log(source.name + ' unfroze ' + this.name);
    }
    removeSlow() {
        if (this.slowTimeRemaining <= 0) 
            return;
        this.slowTimeRemaining = 0;
        this.isSlowed = 0;
        this.log(this.name + " was un-slowed");
    }
    applyPoison({amount=this.poison,source=this,selfTarget=false}={}) {
        let doesCrit = this.doICrit();
        if(doesCrit) {
            amount *= (1+this.critMultiplier/100);
        }
        const target = (selfTarget?this.board.player:this.board.player.hostileTarget);
        this.log(this.name + (doesCrit?" critically ":"")+" poisoned " + target.name + " for " + amount.toFixed(0) +(source!=this?" from "+source.name:""));
        target.applyPoison(amount);
        this.board.poisonTriggers.forEach(func => func({source, amount, target}));
        if(this.battleStats.poison == undefined) this.battleStats.poison = 0;
        this.battleStats.poison += amount;
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
        //Reduce its cooldown by 5% for the fight.
        damageRegex = /Reduce its cooldown by (\([^\)]+\)|\d+%) for the fight\.?/i;
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
        damageRegex = /^Your (other )?([^\s]+)\s*(?:items)? (?:gain|get) \+?(\([^)]+\)|\d+)\s+([^\s]+)\s+for the fight\.?/i;
        match = text.match(damageRegex);
        if(match) {
            const other = match[1]=='other';
            const gainAmount = getRarityValue(match[3], this.rarity);
            const tagToMatch = Item.getTagFromText(match[2]);
            const whatToGain = match[4].toLowerCase();
            if(whatToGain=='damage') {
                this.damageBonus += gainAmount;
            }
            return () => {
                this.board.items.forEach(item => {
                    if(other && item.id == this.id) return;
                    if(tagToMatch=='Item' || item.tags.includes(tagToMatch)) {
                        item.gain(whatToGain=='damage'?0:gainAmount,whatToGain,this);
                    }
                });
            };
        }
        //The Core gains ( +5 » +10 ) damage for the fight.
        damageRegex = /The Core gains (\([^)]+\)|\d+) damage for the fight\.?/i;
        match = text.match(damageRegex);
        if(match) {
            const gainAmount = getRarityValue(match[1], this.rarity);
            return () => {
                this.gain(gainAmount,'damage');
            };
        }
        
        //If your enemy has at least ( 5 » 4 ) items, destroy a small( or medium) enemy item for the fight. from Momma-Saur
        damageRegex = /If your enemy has at least (\([^)]+\)|\d+) items, destroy a small( or medium)? enemy item for the fight\.?/i;
        match = text.match(damageRegex);
        if(match) {
            const requireItemCount = getRarityValue(match[1], this.rarity);
            return ()=>{
                const itemCount = this.board.player.hostileTarget.board.activeItems.length;
                if(itemCount>=requireItemCount) {
                    this.pickRandom(this.board.player.hostileTarget.board.activeItems.filter(i=>i.tags.includes("Small")||(match[2]&&i.tags.includes("Medium")))).destroy(this);
                }
            };
        }

        //    your Dinosaurs permanently gain ( 30 » 40 ) damage. from Momma-Saur
        damageRegex = /your Dinosaurs permanently gain (\([^)]+\)|\d+) damage\.?/i;
        match = text.match(damageRegex);
        if(match) {
            const gainAmount = getRarityValue(match[1], this.rarity);
            return () => {
                this.board.activeItems.forEach(i=>{
                    if(i.tags.includes("Dinosaur")) {
                        i.gain(gainAmount,'damage');
                    }
                });
            };
        }

        //Adjacent Weapons permanently gain ( +1 » +2 » +3 » +4 ) Damage. from Epicurean Chocolate
        //Adjacent (Weapons|Tool items|Tools) gain ( 5 » 10 ) Damage for the fight.
        damageRegex = /^(this and)?\s*Adjacent ([^\s]+)s?\s*(?:items)?\s*(?:permanently )?(gain )?(\([^)]+\)|\d+) ([^\s]+)(?: chance)?(?: for the fight)?\.?/i;
        match = text.match(damageRegex);
        if(match) {
            const itemType = match[2];
            const gainAmount = getRarityValue(match[4], this.rarity);            
            return (i) => {
                let adjacentItems = (((!match[1])&&i)?i:this).adjacentItems;
                if(match[2]!="items") {
                    adjacentItems = adjacentItems.filter(item => item.tags.includes(Item.getTagFromText(itemType)));
                }

                if(match[1]) adjacentItems.push(this);
                adjacentItems.forEach(item => {
                    item.gain(gainAmount,match[5].toLowerCase(), this);
                });


            };
        }


        //Deal damage equal to the highest Shield value of items you have.  
        damageRegex = /Deal damage equal to the highest Shield value of items you have/i;
        match = text.match(damageRegex);
        if(match) {
            const shieldItems = this.board.items.filter(item => item.tags.includes("Shield"));
            let highestShieldValue = shieldItems.reduce((max, item) => Math.max(max, item.shield), 0);
            this.gain(highestShieldValue,'damage');

            this.board.shieldValuesChangedTriggers.set(this.id, (shieldItem) => {
                if(!this.board.items.includes(shieldItem)) return;
                if(shieldItem.shield > highestShieldValue) {
                    let shieldDiff = shieldItem.shield - highestShieldValue;
                    highestShieldValue = shieldItem.shield;
                    if(shieldItem == this) {
                        this.damage_pauseChanged = true;
                        this.gain(shieldDiff,'damage');
                        this.damage_pauseChanged = false;
                    } else {
                        this.gain(shieldDiff,'damage');
                    }
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
        damageRegex = /^Deal (\([^)]+\)|\d+)?\s*damage\.?$/i;
        match = text.match(damageRegex);
        if(match) {
            const damageValue = match[1] ? getRarityValue(match[1], this.rarity):0;
            this.gain(damageValue,'damage');
            return () => {   
                this.dealDamage(this.damage);        
            };
        }
        //Damage ( 10 » 20 » 30 » 40 ).
        damageRegex = /^Damage (\([^)]+\)|\d+)\./i;
        match = text.match(damageRegex);
        if(match) {
            const damageValue =  getRarityValue(match[1], this.rarity);
            this.gain(damageValue,'damage');
            return () => {   
                this.dealDamage(this.damage);        
            };
        }

        damageRegex = /^Crit chance (\([^)]+\)|\d+%?)/i;
        match = text.match(damageRegex);
        if(match) {
            this.gain(getRarityValue(match[1], this.rarity),'crit');
            return () => {};
        }
        return null;
    }
    isHasteTargetable() {
        return this.cooldown && this.cooldown>0 && this.isDestroyed == false;
    }
    isSlowTargetable() {
        return !this.isDestroyed && this.cooldown && this.cooldown > 0;        
    }
    isChargeTargetable = this.isHasteTargetable;
    isFreezeTargetable() {
        return !this.isDestroyed && (this.cooldown > 0 || (this.size<3));
        /*
        && (this.cooldown > 0  || !this.board.items.some(item => item.cooldown > 0 && item.freezeDurationRemaining<=0))
        && (this.freezeDurationRemaining <= 0 || !this.board.items.some(item => item.freezeDurationRemaining <= 0 && item.isHasteTargetable()));
        */
    }

        
    getSlowTriggerFunctionFromText(text) {        
        let regex = /Slow (?:\(([^)]+)\)|(\d+)|an) (?:(\w+) )?items?\(?s?\)?\s*(?:for)? (?:\(([^)]+)\)|(\d+)) second/i;
        let match;
        if (regex.test(text)) {            
            let [_, itemsRange, singleItemCount, requiredTag, durationRange, singleDuration] = text.match(regex);
            if(singleItemCount == 'an') {
                singleItemCount = 1;
            }
            const numItemsToSlow = itemsRange ? 
                getRarityValue(itemsRange, this.rarity) : 
                parseInt(singleItemCount);

            const duration = durationRange ? 
                getRarityValue(durationRange, this.rarity) : 
                parseInt(singleDuration);
            this.slow+=duration;
            
            return () => {
                let items = this.board.player.hostileTarget.board.activeItems.filter(i => i.isSlowTargetable());

                if (requiredTag) {
                    items = items.filter(i => i.tags && i.tags.includes(requiredTag));
                }
                const selectedItems = this.pickRandom(items,numItemsToSlow);
                
                if(selectedItems && selectedItems.length>0) {
                    selectedItems.forEach(i => {
                        this.applySlowTo(i);
                    });
                }

            };
        }
        //slow it for (  2  » 4   ) second(s).
        regex = /slow it for (?:\(([^)]+)\)|(\d+)) second\(?s?\)?\.?/i;
        match = text.match(regex);
        if(match) {
            this.slow+= parseInt(match[1] ? getRarityValue(match[1], this.rarity) : match[2]);
            return (item) => {
                this.applySlowTo(item);
            };

        }
        //Slow the item to the left of this for 1 second(s). from Power Sander
        regex = /^Slow the item to the left of this for (\([^)]+\)|\d+) second\(?s?\)?\.?$/i;
        match = text.match(regex);
        if(match) {
            this.slow+= getRarityValue(match[1], this.rarity);
            return () => {
                const itemToSlow = this.getItemToTheLeft();
                if(itemToSlow) {
                    this.applySlowTo(itemToSlow);
                }
            };
        }
        return null;
    }

    getHasteTriggerFunctionFromText(text) {      
       let regex,match;
        regex = /^(Haste|Slow) your( other)? items (?:for )?(\([^)]+\)|\d+) second/i;
        match = text.match(regex);
        if(match) {
            this.gain(getRarityValue(match[3], this.rarity),match[1].toLowerCase());
            const other = match[2]==' other';
            const whatToDo = Item.getTagFromText(match[1]);
            
            return () => {
                this.board.items.forEach(i => {
                    if(other && i.id == this.id) return;
                    this["apply"+whatToDo+"To"](i);
                });
            };
        }
        // Haste your Friends for ( 1 » 2 » 3 ) second(s). from DJ Rob0t
        //Haste your tools for ( 1 » 2 » 3 » 4 ) second(s). from Dishwasher
        regex = /^Haste your ([^\s]+) for (\([^)]+\)|\d+) second\(?s?\)?\.?/i;
        match = text.match(regex);
        if(match) {
            this.haste+= getRarityValue(match[2], this.rarity);
            const whatToHaste = Item.getTagFromText(match[1]);
            return () => {  
                this.board.items.forEach(i => {
                    if(i.tags.includes(whatToHaste)) {
                        this.applyHasteTo(i);
                    }
                });
            };
        }

        //your Small items gain Haste for ( 1 » 2 » 3 ) second(s). from Holsters
        regex = /^your ([^\s]+) items gain Haste for (\([^)]+\)|\d+) second\(?s?\)?\.?/i;
        match = text.match(regex);
        if(match) {
            this.haste+= getRarityValue(match[2], this.rarity);
            const whatToHaste = Item.getTagFromText(match[1]);
            return () => {
                this.board.items.forEach(i => {
                    if(i.tags.includes(whatToHaste)) {
                        this.applyHasteTo(i);
                    }
                });
            };
        }

        // haste items adjacent to it (1/2) second(s). from Tall Buildings
        regex = /^haste items adjacent to it (\([^)]+\)|\d+) second\(?s?\)?\.?$/i;
        match = text.match(regex);
        if(match) {
            this.haste+= getRarityValue(match[1], this.rarity);
            return (item) => {
                (item||this).adjacentItems.forEach(item => this.applyHasteTo(item));
            };
        }
        

        //slow all enemy items for ( 1 » 2 » 3 » 4 ) second(s).
        regex = /^(slow|freeze) all enemy (?:(\w+) )?items for (\([^)]+\)|\d+) second\(?s?\)?\.?$/i;
        match = text.match(regex);
        if(match) {
            const whatToDo = Item.getTagFromText(match[1]);
            const tagToMatch = match[2] ? Item.getTagFromText(match[2]) : null;
            this[whatToDo.toLowerCase()]+= getRarityValue(match[3], this.rarity);

            return () => {
                this.board.player.hostileTarget.board.items.forEach(i => {
                    if(tagToMatch && !i.tags.includes(tagToMatch)) return;
                    this["apply"+whatToDo+"To"](i);
                });
            };
        }
         //slow both players' items for ( 1 » 2 » 3 » 4 ) second(s).
         regex = /^(slow|freeze) both players' (?:(\w+) )?items for (\([^)]+\)|\d+) second\(?s?\)?\.?$/i;
         match = text.match(regex);
         if(match) {
             const whatToDo = Item.getTagFromText(match[1]);
             const tagToMatch = match[2] ? Item.getTagFromText(match[2]) : null;
             this[whatToDo.toLowerCase()]+= getRarityValue(match[3], this.rarity);            
 
             return () => {
                 [...this.board.activeItems,...this.board.player.hostileTarget.board.activeItems].forEach(i => {
                     if(tagToMatch && !i.tags.includes(tagToMatch)) return;
                     this["apply"+whatToDo+"To"](i);
                 });
             };
         }
        
        
        //Haste ( 1 » 2 » 3 » 4 ) Aquatic or Toy item(s) for 2 second(s).
        //Haste a weapon (  3  » 5  » 7  » 9   ) second(s).
        regex = /^Haste (?:\(([^)]+)\)|(\d+)|an?) (non-)?([^\s]+)(?: or \s*([^\s^\d]+))?\s*(?:item|items|item\(s\))? (?:for )?(\([^)]+\)|\d+) second\(?s?\)?\.?$/i;
        match = text.match(regex);
        if(match) {
            const isNon = match[3] == "non-";
            const tagToMatch = Item.getTagFromText(match[4]);
            const orTagToMatch = Item.getTagFromText(match[5]);
            const numToHaste = parseInt(match[1] ? getRarityValue(match[1], this.rarity) : match[2]?match[2]:1);
            this.haste+= getRarityValue(match[6], this.rarity);
            const itemsToHaste = tagToMatch&&tagToMatch!='Item' ? this.board.items.filter((item) => 
                item.isHasteTargetable() &&(
                item.tags.includes(tagToMatch)!==isNon ||
                (orTagToMatch?item.tags.includes(orTagToMatch):false)
                )
            ) : this.board.items;
            return ()=>{
                this.pickRandom(itemsToHaste,numToHaste).forEach(item=>this.applyHasteTo(item));
            };

        }


        //Haste another item for ( 1 » 2 » 3 » 4 ) second(s).
        //Haste an item for ( 1 » 2 » 3 ) second(s)
        regex = /^Haste (an|another) item for (?:\(([^)]+)\)|(\d+)) second\(?s?\)?\.?/i;
        if (regex.test(text)) {
            const [_, target, durationRange, singleDuration] = text.match(regex);
            this.haste+= parseInt(durationRange ? 
                getRarityValue(durationRange, this.rarity) : 
                parseInt(singleDuration));
            return () => {
                let itemToHaste = this.pickRandom(this.board.items);
                this.applyHasteTo(itemToHaste);
            };
        }

        //Haste the item to the left of this for (1/2/3/4) second(s). from Smelling Salts
        //Haste the Friend to the right of this for (2/2/2/5) second(s). from Sat-Comm
        regex = /^Haste the (\w+)?\s?(?:item)? to the (left|right)(?: of this)? for (\([^)]+\)|\d+) second\(?s?\)?\.?$/i;
        match = text.match(regex);
        if(match) {
            const tagToMatch = match[1] ? Item.getTagFromText(match[1]) : null;
            this.haste+= getRarityValue(match[3], this.rarity);
            const itemToHaste = match[2]=='left'?this.getItemToTheLeft():this.getItemToTheRight();
            if(tagToMatch && itemToHaste && tagToMatch!='Item'&& !itemToHaste.tags.includes(tagToMatch)) return ()=>{};
            return (item) => { 
                if(itemToHaste) {
                    this.applyHasteTo(itemToHaste);
                }
            }
            
        }

        //Haste this ( 1 / 2 / 3 / 4 ) second(s).
        regex = /^Haste this (\([^)]+\)|\d+) second\(?s?\)?\.$/i;
        match = text.match(regex);
        if(match) {
            this.haste += getRarityValue(match[1], this.rarity);
            return (item) => {
                this.applyHasteTo(item||this);
            };
        }

        //Haste the item to the left of this for (1/2/3/4) second(s). from Smelling Salts
        regex = /^Haste the item to the left of this for (\([^)]+\)|\d+) second\(?s?\)?\.?$/i;
        match = text.match(regex);
        if(match) {
            this.haste += getRarityValue(match[1], this.rarity);
            const itemToHaste = this.getItemToTheLeft();
            if(itemToHaste) {
                this.applyHasteTo(itemToHaste);
            }

        }
        //Haste adjacent items for ( 1 » 2 » 3 ) second(s)
        regex = /^Haste adjacent items (?:for)?\s*(\([^]+\)|\d+) second\(?s?\)?\.?/i;
        match = text.match(regex);
        if(match) {
            this.haste += getRarityValue(match[1], this.rarity);
            return () => {
                this.adjacentItems.forEach(item => this.applyHasteTo(item));
            };
        }


        regex = /^Haste it for (?:\(([^)]+)\)|(\d+)) second\(?s?\)?\.?/i;
        match = text.match(regex);
        if(match) {
            this.haste += parseInt(match[1] ? getRarityValue(match[1], this.rarity) : match[2]);
            return (item) => {
                this.applyHasteTo(item);
            };

        }
        //this gains Haste for ( 2 » 4 ) second(s)
        regex = /this gains Haste for (?:\(([^)]+)\)|(\d+)) second\(?s?\)?\.?/i;
        match = text.match(regex);
        if(match) {
            this.haste += parseInt(match[1] ? getRarityValue(match[1], this.rarity) : match[2]);
            return () => {
                this.applyHasteTo(this);
            };
        }
        return null;
    }

    getPoisonTriggerFunctionFromText(text) {
        let regex = /^(Poison|Burn) (yourself|both players)?\s*(?:for)?\s*(\([^)]+\)|\d+)\.?$/i;
        let match = text.match(regex);
        if(match) {
            const whatToDo = match[1];
            const target = match[2] ? match[2].toLowerCase() : "yourself";
            const poisonAmount = getRarityValue(match[3], this.rarity);
            this.gain(poisonAmount,whatToDo.toLowerCase());
            return () => {                
                if(target=="yourself") {
                    this["apply"+whatToDo]({selfTarget:true});
                } else if(target=="both players") {
                    this["apply"+whatToDo]({selfTarget:true});
                    this["apply"+whatToDo]();
                } else {
                    this["apply"+whatToDo]();
                }
            };
        }      
        regex = /^Poison.$/i;
        match = text.match(regex);
        if(match) {
            return () => {
                this.applyPoison();
            };
        }
        //Poison both players ( 4 » 6 » 8 » 10 ). from Noxious Potion
        //Burn both players ( 5 » 10 » 15 » 20 ). from Plasma Grenade
        regex = /^(Poison|Burn) both players (\([^)]+\)|\d+)\.?/i;
        match = text.match(regex);
        if(match) {
            const whatToDo = match[1];
            const amount = getRarityValue(match[2], this.rarity);
            this.gain(amount,whatToDo.toLowerCase());

            return (source) => {
                this["apply"+whatToDo]({source});
                this["apply"+whatToDo]({source,selfTarget:true});
            };
        }
        
        return null;
    }


    getBurnTriggerFunctionFromText(text) {
        let regex = /^(Burn|Poison|Heal|Shield) (\([^)]+\)|\d+)( for each unique type you have)?\.?$/i;
        let match = text.match(regex);
        if(match) {
            const amount = getRarityValue(match[2], this.rarity);
            const whatToGain = Item.getTagFromText(match[1]);
            const multiplier = match[3] ? this.board.uniqueTypes : 1;
            this.gain(amount*multiplier,whatToGain.toLowerCase());
            return () => {                
                this["apply"+whatToGain]();
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
        //one of your Burn items gains +15 burn for the fight. from Draconic Rage
        regex = /^one of your ([^\s]+) items gains (\([^)]+\)|\+\d+) ([^\s]+) for the fight\.?/i;
        match = text.match(regex);
        if(match) {
            const whatTypeOfItem = match[1].toLowerCase();
            const whatToGain = match[3].toLowerCase();
            const whatToGainTag = Item.getTagFromText(whatToGain);
            const gainAmount = parseInt(match[2] ? getRarityValue(match[2], this.rarity) : match[3]);
            return () => {
                const targets = this.board.activeItems.filter(item => item.tags.includes(whatToGainTag));
                if(targets.length>0) {
                    this.pickRandom(targets).gain(gainAmount,whatToGain);
                }
            };
        }   

        return null;

    }

    getHealTriggerFunctionFromText(text) {
        let regex = /Heal(?: for)? (?:\(([^)]+)\)|(\d+))(?: and (.*))?$/i;
        let match = text.match(regex);
        if(match) {
            const healAmount = match[1] ? getRarityValue(match[1], this.rarity) : parseInt(match[2]);
            this.gain(healAmount,'heal');
            const andFunction = match[3] ? this.getTriggerFunctionFromText(match[3]) : null;
            return () => {                
                this.applyHeal();
                andFunction?.();
            };
        }

             /*Burn equal to ( 1 » 2 ) times this item's damage.
             regex = /^([^\s]+) equal to (\([^)]+\)|(\d+)|double|triple)?(?: times)?\s*this item's damage/i;
             match = text.match(regex);
             if(match) {
                 const whatToDo = Item.getTagFromText(match[1]);
                 const multiplier = !match[2]? 1 : match[2]=='double'?2:match[2]=='triple'?3:parseInt(getRarityValue(match[2], this.rarity));
                 this.gain(this.damage * multiplier,whatToDo.toLowerCase());
                 this.damageChanged((newDamage,oldDamage)=>{
                     if(newDamage != oldDamage) {
                         this.gain((newDamage-oldDamage)*multiplier,whatToDo.toLowerCase());
                     }
                 });
     
     
                 return () => {          
                     this["apply"+whatToDo](this[whatToDo.toLowerCase()]);
                 };
     
     
             }*/

        //Heal equal to this item's Damage.
        //Deal damage equal to this item's Heal.
        regex = /^(?:Deal )?(Heal|Shield|Burn|Poison|Damage) equal to (\([^)]+\)|\d+|double|triple)?(?: time\(?s\)?)?\s*this item's (Heal|Shield|Burn|Poison|Damage|Value|Regen)(?:eration)?/i;
        match = text.match(regex);
        if(match) {
            const whatToGain = match[1].toLowerCase();
            const gainFrom = match[3].toLowerCase();
            const multiplier = !match[2]? 1 : match[2]=='double'?2:match[2]=='triple'?3:getRarityValue(match[2], this.rarity);
            this.gain(this[gainFrom]*multiplier,whatToGain); 
            this[gainFrom+'Changed']((newAmount,oldAmount)=>{
                if(newAmount != oldAmount) {
                    this.gain((newAmount-oldAmount)*multiplier,whatToGain);
                }
            });
            return () => {
                this['apply'+Item.getTagFromText(whatToGain)](this[whatToGain]);
            };

        }
        //Heal equal to ( 1 » 2 » 3 ) times the value of your highest value item. from Truffles
        regex = /Heal equal to (\([^)]+\)|\d+) times the value of your highest value item/i;
        match = text.match(regex);
        if(match) {
            const multiplier = parseInt(getRarityValue(match[1], this.rarity));
            let highestValue = this.board.items.reduce((max,item)=>Math.max(max,item.value),0);
            this.gain(highestValue*multiplier,'heal');
            this.board.itemValuesChangedTriggers.set(this.id,(item)=>{
                const newHighestValue = this.board.items.reduce((max,item)=>Math.max(max,item.value),0);
                if(newHighestValue>highestValue) {
                    this.gain(newHighestValue-highestValue,'heal');
                    highestValue = newHighestValue;
                }
            });
            return () => {
                this.applyHeal();
            };
        }
        //Deal damage equal to this item's Heal.
        regex = /Deal damage equal to this item's (Heal|Shield|Burn|Poison|Value)/i;
        match = text.match(regex);
        if(match) {
            const whatToDeal = match[1].toLowerCase();
            this.gain(this[whatToDeal],'damage');
            this[whatToDeal+'Changed']((newAmount,oldAmount)=>{
                if(newAmount != oldAmount) {
                    this.gain((newAmount-oldAmount),'damage');
                }
            });
            return () => {
                this.applyDamage(this.damage);  
            };
        }
        //this gains Heal equal to the value of that item for the fight.
        regex = /this gains Heal equal to the value of that item for the fight\.?/i;
        match = text.match(regex);
        if(match) {
            return (item) => {
                this.gain(item.value,'heal');
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
                this.applyHeal();
            };
        }
        //Heal equal to your Shield.
        regex = /Heal equal to your Shield\.?/i;
        match = text.match(regex);
        if(match) {
            this.board.player.shieldChanged((newShield,oldShield)=>{
                this.gain(newShield-oldShield,'heal');
            });
            return () => {
                this.applyHeal();
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
        regex = /^(?:Gain )?(Heal|Shield|Regen)(?: equal to)? (\([^)]+\)|\d+%) of your Max Health(?: for the fight)?\.?$/i;
        match = text.match(regex);
        if(match) {
            const tag = Item.getTagFromText(match[1]);
            const multiplier = getRarityValue(match[2], this.rarity);
            this.gain(this.board.player.maxHealth * multiplier/100,tag.toLowerCase());
            this.board.player.maxHealthChanged((newHealth,oldHealth)=>{
                this.gain((newHealth-oldHealth)*multiplier/100,tag.toLowerCase());
            });
            return () => {
                this["apply"+tag]();
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
    get adjacentItems() {
        return [this.getItemToTheLeft(), this.getItemToTheRight()].filter(item => item !== null);
    }

    gain(amount,type,source) {
        amount = parseFloat(amount);
        if(!["cooldown","damage"].includes(type)) {
            this.log(this.name + " gained " + amount.toFixed(0) + " " + type + (source?(" from "+source.name):""));
        }

        
        switch(type.toLowerCase()) {
            case 'ammo':
                this.ammo += amount;
                if(this.ammo>this.maxAmmo) {
                    this.ammo = this.maxAmmo;
                }
                this.board.reloadTriggers.forEach(func => func(this,source));
                break;
            case 'maxammo':
            case 'max ammo':
                this.maxAmmo += amount;
                this.ammo += amount;
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
                if(source && source.damageBonus) {
                    amount += source.damageBonus;
                }
                if(source && source.hasDoubleDamageBonus) {
                    amount *= 2;
                }
                this.damage += amount;
                this.log(this.name + " gained " + amount.toFixed(0) + " " + type + (source?(" from "+source.name):""));
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
            case 'regeneration':
            case 'regen':
                this.regen += amount;
                this.log((source?(source.name+" gave "):"") + this.name + " +" + amount.toFixed(0) + " Regen");
                break;
                
            case 'crit':
            case 'crit chance':
                if(!this.crit) this.crit = 0;
                this.crit += amount;
                break;
            case 'critmultiplier':
                this.critMultiplier += amount;
                break;
            case 'cooldown':
                if(this.cooldown<=0) return;
                const oldCooldown = this.cooldown;
                this.cooldown += amount;                
                if(this.cooldown<1000) this.cooldown = 1000; //cooldown can't go below 1 second
                this.log((source?(source.name+" caused "):"")+this.name + " cooldown change from " + (oldCooldown/1000).toFixed(1) + "s to " + (this.cooldown/1000).toFixed(1) + "s");
                //become a time bender
                if(this.effectiveBattleTime>0) {
                    const timeToTriggerNTimes = this.numTriggers * oldCooldown;
                    const timeSpentInCurrentCooldown = this.effectiveBattleTime - timeToTriggerNTimes;
                    const percentThroughCurrentCooldown = timeSpentInCurrentCooldown / oldCooldown;
                    const battleTimeToAdd = this.cooldown*percentThroughCurrentCooldown;
                    this.effectiveBattleTime = this.cooldown*this.numTriggers + battleTimeToAdd;
                }


                break;
            case 'freeze':
                this.freeze += amount;
                break;
            case 'haste':
                this.haste += amount;
                break;
            case 'slow':
                this.slow += amount;
            break;
            case 'multicast':
                if(this.cooldown>0) {
                    this.multicast += amount;
                }
                break;
            case 'charge':
                this.charge += amount;
                break;
            default:
                console.log("Unknown gain type: " + type);
        }
    }



    getFreezeTriggerFunctionFromText(text) {
        //Freeze all enemy items for (  1  » 2  » 3   ) second(s).
        let regex = /Freeze all enemy items for (\([^)]+\)|\d+) second\(?s\)?\.?/i;
        let match = text.match(regex);
        if(match) {
            this.freeze += getRarityValue(match[1], this.rarity);
            return () => {
                this.board.player.hostileTarget.board.items.forEach(item => this.applyFreezeTo(item));
            };
        }
        
        //Freeze 1 item for (  3  » 4  » 5   ) second(s). from Quick Freeze
        regex = /^Freeze (\([^)]+\)|\d+)(?: item\(?s?\)?)? for (\([^)]+\)|[\d\.]+) second\(?s\)?\.?$/i;
        match = text.match(regex);
        if(match) {
            const numItems = getRarityValue(match[1], this.rarity);
            this.freeze += getRarityValue(match[2], this.rarity);
            return (item) => {
                for(let i=0;i<numItems;i++) {
                    const targets = this.board.player.hostileTarget.board.items.filter(i=>i.isFreezeTargetable());
                    const itemToFreeze = this.pickRandom(targets);
                    if(itemToFreeze) this.applyFreezeTo(itemToFreeze);
                    else {
                        this.log(this.name + " tried to freeze " + numItems + " item(s) but there were no items to freeze");
                    }
                }
            };
        }
        //Freeze adjacent items for 1 second(s). from Ice Luge 
        regex = /^Freeze adjacent items for (\([^)]+\)|\d+) second\(?s\)?\.?$/i;
        match = text.match(regex);
        if(match) {
            this.freeze += getRarityValue(match[1], this.rarity);
            return () => {
                this.adjacentItems.forEach(item => this.applyFreezeTo(item));
            };
        }

        //Reduce the cooldown of adjacent items by (1/2) second(s) for the fight. from Ice Luge
        regex = /^Reduce the cooldown of adjacent items by (\([^)]+\)|\d+)\s*second\(?s\)?(?: for the fight)?\.?$/i;
        match = text.match(regex);
        if(match) {
            const cooldownReduction = getRarityValue(match[1], this.rarity);
            return () => {
                this.adjacentItems.forEach(item => {
                    item.gain(-cooldownReduction*1000,'cooldown', this);
                });
            };
        }
        //Freeze 1 item(s) of equal or smaller size for 1 second(s). from Liquid Cooled
        //Freeze 1 item of equal or smaller size for 1 second(s).
        regex = /^Freeze (\([^)]+\)|\d+) item\(?s?\)? of equal or smaller size for (\([^)]+\)|\d+) second\(?s?\)?\.?$/i;
        match = text.match(regex);
        if(match) {
            const numItems = getRarityValue(match[1], this.rarity);
            this.freeze += getRarityValue(match[2], this.rarity);
            return (item) => {
                for(let i=0;i<numItems;i++) {
                    const targets = this.board.player.hostileTarget.board.items.filter(i=> i.size<=(item||this).size && i.isFreezeTargetable());
                    const itemToFreeze = this.pickRandom(targets);
                    if(itemToFreeze) this.applyFreezeTo(itemToFreeze);
                    else {
                        this.log(this.name + " tried to freeze " + numItems + " item(s) of equal or smaller size but there were no items to freeze");
                    }
                }
            };
        }

        // Freeze 1 medium or small item for ( 1 » 2 ) second(s).
        regex = /^Freeze (\([^)]+\)|\d+) medium or small item(?:s)? for (\([^)]+\)|\d+) second\(?s?\)?\.?$/i;
        match = text.match(regex);
        if(match) {
            const numItems = getRarityValue(match[1], this.rarity);
            this.freeze += getRarityValue(match[2], this.rarity);
            return (item) => {
                for(let i=0;i<numItems;i++) {
                    const targets = this.board.player.hostileTarget.board.items.filter(i=> i.size<=2 && i.isFreezeTargetable());
                    const itemToFreeze = this.pickRandom(targets);
                    if(itemToFreeze) this.applyFreezeTo(itemToFreeze);
                    else {
                        this.log(this.name + " tried to freeze " + numItems + " medium or small item(s) but there were no items to freeze");
                    }
                }
            };
        }
        //Freeze it for 1 second(s). from Tripwire
        regex = /^Freeze it for (\([^)]+\)|\d+) second\(?s\)?\.?$/i;
        match = text.match(regex);
        if(match) {
            this.freeze += getRarityValue(match[1], this.rarity);
            return (item) => {
                this.applyFreezeTo(item);
            };  
        }

        //Your leftmost Freeze item gains +1 second to Freeze.      
        regex = /^Your leftmost Freeze item gains \+1 second to Freeze\.?$/i;
        match = text.match(regex);
        if(match) {
            const targets = this.board.items.filter(i=> i.tags.includes("Freeze"));
            if(targets.length>0) {
                targets[0].gain(1,'freeze');
            }
            return () => {};
        }
    }


    getShieldTriggerFunctionFromText(text) {        
        // Match patterns like "Shield equal to ( 1x » 2x ) the value of the adjacent items"
        let regex = /Shield equal to (\([^)]+\)|\d+x?)(?: times)? the value of the adjacent items/i;
        let match = text.match(regex);
        if (match) {
            const multiplier = getRarityValue(match[1], this.rarity);
            this.shieldAmountFromValues = this.adjacentItems.reduce((sum, item) => sum + item.value, 0) * multiplier;
            this.gain(this.shieldAmountFromValues,'shield');

            this.board.itemValuesChangedTriggers.set(this.id, () => {
                let newShieldAmountFromValues = this.adjacentItems.reduce((sum, item) => sum + item.value, 0) * multiplier;
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
            this.board.player.hostileTarget.burnChanged((newBurn,oldBurn)=>{
                this.gain(newBurn-oldBurn,'shield');
            }, this.id);
            return () => {
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

        //use your highest Shield item. from Emergency Shield
        regex = /^use your highest Shield item\.?$/i;
        match = text.match(regex);
        if(match) {
            return ()=>{
                const highestShield = this.board.activeItems.reduce((max, item) => item.tags.includes("Shield") ? (item.shield>(max?max.shield:0))?item:max:max, null);
                if(highestShield) {
                    this.log(this.name + " used " + highestShield.name + " as highest Shield item");
                    highestShield.trigger();
                }
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
       
        // While you have Shield, this item's cooldown is reduced by 50%. from Welding Torch
        regex = /While you have Shield, this item's cooldown is reduced by 50%\.?/i;
        match = text.match(regex);
        if(match) {
            const cooldownReduction = 0.5;
            let increasedCooldown = false;
            this.board.player.shieldChanged((newShield,oldShield)=>{
                if(newShield>0 && !increasedCooldown) {
                    this.cooldown *= cooldownReduction;
                    increasedCooldown = true;
                } else {
                    this.cooldown *= 1/cooldownReduction;
                    increasedCooldown = false;
                }
            }, this.id);
            return () => {};
        }
        
        //this gains damage equal to ( 10% » 20% » 40% ) of the Shield lost.
        regex = /this gains damage equal to (\([^)]+\)|\d+%?)\s* of the Shield lost/i;            
        match = text.match(regex);
        if (match) {
            const multiplier = getRarityValue(match[1], this.rarity);
            return (shieldLost) => {
                let gainDamage = shieldLost * multiplier/100;
                this.gain(gainDamage,'damage');
                this.log(this.name + " gained " + gainDamage + " damage for "+this.board.player.name+" losing " + shieldLost + " shield");
            };
        }

        //Your Shield item to the right of this gains ( +4 » +8 » +12 » +16 ) Shield for the fight. from Yellow Piggles R
        //Your Shield items gain ( +2 » +4 » +6 » +8 ) Shield for the fight. from Yellow Piggles X
        regex = /^(?:Your|The) ([^\s]+)? ?item(s)?(?: to the (right|left) of this)? gains? (\([^)]+\)|\+?\d+%?) ([^\s]+)(?: chance)? for the fight/i;
        match = text.match(regex);
        if (match) {
            const tagToMatch = Item.getTagFromText(match[1]);
            const pluralItems = match[2];
            const amount = getRarityValue(match[4], this.rarity);    
            const whatToGain = Item.getTagFromText(match[5]);        
            return () => {
                const targets = match[3]=='right' ? 
                    pluralItems? this.board.activeItems.filter(i=>i.startIndex>this.startIndex && (!tagToMatch || i.tags.includes(tagToMatch))) : [this.getItemToTheRight()] :
                    match[3]=='left' ?
                    pluralItems? this.board.activeItems.filter(i=>i.startIndex<this.startIndex && (!tagToMatch || i.tags.includes(tagToMatch))) : [this.getItemToTheLeft()] :
                    this.board.activeItems;
                targets.forEach(target => {
                    if(target) target.gain(amount,whatToGain.toLowerCase(), this);
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
        regex = /^Shield (\([^)]+\)|\d+)(?: for each ([^\s]+) item you have)?\./i;
        match = text.match(regex);
        if (match) {
            const shieldAmount = getRarityValue(match[1], this.rarity);
            const tagToMatch = match[2] ? Item.getTagFromText(match[2]) : null;
            const multiplier = tagToMatch ? this.board.items.filter(i=>i.tags.includes(tagToMatch)).length : 1;
            this.gain(shieldAmount*multiplier,'shield');
            this.board.itemDestroyedTriggers.set(this.id,(item)=>{
                if(item.tags.includes(tagToMatch)) {
                    this.gain(-shieldAmount,'shield');
                }
            });
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
            this.name = enchant === 'None' ? this.nameWithoutEnchant : `${enchant} ${this.nameWithoutEnchant}`;
            if(this.enchant!='') {                
                this.startItemData.tags = structuredClone(items[this.nameWithoutEnchant].tags);
            }
            this.tags = this.startItemData.tags; //reset tags to default when enchant changes
            this.enchant = enchant=='None'?'':enchant;
        }
    }
    showEditor = () => {
        //document.getElementsByClassName("editor").forEach(e=>e.remove());
        if(!this.editable || document.querySelector('.item-edit-popup')!=null) return;
        const itemData = this.startItemData;
        // List of available enchantments and rarities
        const enchantments = ['None',...Object.keys(items[itemData.name].enchants)];
        const rarities = Item.rarityLevels;

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
                <label><span class='Shield'>E</span><span class='Burn'>n</span><span class='Poison'>c</span><span class='Freeze'>h</span><span class='Haste'>a</span><span class='Slow'>n</span><span class='Multicast'>t</span>:</label>
                <select id="edit-enchant">
                    ${enchantments.map(e => 
                        `<option class='${Item.enchantTagMap[e]}' value="${e}" ${e === enchant ? 'selected' : ''}>${e}</option>`
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
                <label>Tags:</label>
                <input type="text" id="edit-tags" value="${this.tags.join(', ')}">
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
        if(this.tags.includes("Regen") || this.regen > 0) {
            popupHTML += `
                <div class="form-group">
                    <label>Regen:</label>
                    <input type="number" id="edit-regen" value="${this.regen}">
                </div>`;
        }
        if(this.tags.includes("Haste")) {
            popupHTML += `
                <div class="form-group">
                    <label>Haste Duration:</label>
                    <input type="number" id="edit-haste" value="${this.haste}">
                </div>`;
        }
        if(this.tags.includes("Slow")) {
            popupHTML += `
                <div class="form-group">
                    <label>Slow Duration:</label>
                    <input type="number" id="edit-slow" value="${this.slow}">
                </div>`;
        }
        if(this.tags.includes("Freeze")) {
            popupHTML += `
                <div class="form-group">
                    <label>Freeze Duration:</label>
                    <input type="number" id="edit-freeze" value="${this.freeze}">
                </div>`;
        }


        // Add cooldown field only if item has cooldown
        if (this.cooldown !== undefined && this.cooldown!=0) {
            popupHTML += `
                <div class="form-group">
                    <label>Cooldown:</label>
                    <input type="number" id="edit-cooldown" value="${(this.cooldown/1000).toFixed(1)}">
                </div>`;

        }
        if(this.damageBonus>0) {
            popupHTML += `
                <div class="form-group">
                    <label>Damage Bonus:</label>
                    <input type="number" id="edit-damage-bonus" value="${this.damageBonus}">
                </div>`;
        }
        

        // Add crit chance field only if item has damage, shield, burn, poison, or heal, or is a weapon
        if (this.damage>0 || this.shield > 0 || this.burn > 0 || this.poison > 0 || this.heal > 0 || this.tags.includes("Weapon")) {
            popupHTML += `
                <div class="form-group">
                    <label>Crit Chance:</label>

                    <input type="number" min="0" max="100" id="edit-crit" value="${this.crit || 0}">
                </div>`;
        }
        if(this.tags.includes("Weapon")) {
            popupHTML += `
                <div class="form-group">
                    <label>Lifesteal:</label>
                    <select id="edit-lifesteal">
                        <option value="0" ${this.lifesteal?'':''}>No</option>
                        <option value="1" ${this.lifesteal?'selected':''}>Yes</option>
                    </select>
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
        popup.querySelector('#edit-rarity').addEventListener('change',()=>{
            this.setRarity(popup.querySelector('#edit-rarity').value);            
            this.board.player.battle.resetBattle();
            updateUrlState();
            popup.remove();            
        });
        popup.querySelector('#edit-enchant').addEventListener('change',()=>{
            const initialValueFromEnchant = this.getInitialValue();
            const oldEnchant = this.enchant;
            this.enchant = popup.querySelector('#edit-enchant').value=='None'?'':popup.querySelector('#edit-enchant').value;
            if(this.enchant!=oldEnchant) {
                if(oldEnchant&&!items[baseName].tags.includes(Item.enchantTagMap[oldEnchant])) {
                    this.startItemData[Item.enchantTagMap[oldEnchant].toLowerCase()] = 0;
                }
                this.startItemData.tags = structuredClone(items[baseName].tags);
            }
            const newValueFromEnchant = this.getInitialValue();
            const oldStartDataValue = this.startItemData.value||initialValueFromEnchant;
            this.startItemData.value = oldStartDataValue-initialValueFromEnchant+newValueFromEnchant;
            this.board.player.battle.resetBattle();
            updateUrlState();
            popup.remove();            
        });
        
        popup.querySelector('.save-edit').addEventListener('click', () => {
            this.board.player.battle.resetBattle();
            const enchant = popup.querySelector('#edit-enchant').value;
            this.setEnchant(enchant);

            this.startItemData.tags = popup.querySelector('#edit-tags').value.split(',').map(t=>t.trim());
            
            // Only update fields that exist in the form
            if (popup.querySelector('#edit-damage')) {                
                const newDamage = parseFloat(popup.querySelector('#edit-damage').value);
                this.startItemData.damage = (this.startItemData.damage||0) + (newDamage-this.damage)/this.damage_multiplier;
                if(this.startItemData.damage<=0) {
                    delete this.startItemData.damage;
                }
            }
            if (popup.querySelector('#edit-cooldown')) {
                this.startItemData.cooldown = getRarityValue(this.startItemData.cooldown,this.rarity) - (this.cooldown - (parseFloat(popup.querySelector('#edit-cooldown').value)*1000 || 0))/1000;
            }
            if (popup.querySelector('#edit-crit')) {
                this.startItemData.crit = parseFloat(popup.querySelector('#edit-crit').value) - this.crit;
                if(this.startItemData.crit<=0) {
                    delete this.startItemData.crit;
                }
            }            
            if (popup.querySelector('#edit-damage-bonus')) {
                const newDamageBonus = parseFloat(popup.querySelector('#edit-damage-bonus').value);
                this.startItemData.damageBonus = (this.startItemData.damageBonus||0) + (newDamageBonus - this.damageBonus);
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
                this.lifesteal = popup.querySelector('#edit-lifesteal').value == '1' ? 100 : 0;
                this.startItemData.lifesteal = this.lifesteal;
            }
            if(popup.querySelector('#edit-shield')) {
                const newShield = parseFloat(popup.querySelector('#edit-shield').value);
                this.startItemData.shield = (this.startItemData.shield||0) + (newShield - this.shield)/this.shield_multiplier;
            }
            if(popup.querySelector('#edit-maxammo')) {
                this.startItemData.ammo = parseInt(this.startItemData.ammo||0) + (parseInt(popup.querySelector('#edit-maxammo').value)-this.maxAmmo)/(this.ammo_multiplier||1);
            }
            if(popup.querySelector('#edit-heal')) {
                const newHeal = parseFloat(popup.querySelector('#edit-heal').value);
                this.startItemData.heal = (this.startItemData.heal||0) + (newHeal - this.heal)/(this.heal_multiplier||1);
            }
            if(popup.querySelector('#edit-haste')) {
                const newHaste = parseFloat(popup.querySelector('#edit-haste').value);
                this.startItemData.haste = (this.startItemData.haste||0) + (newHaste - this.haste)/(this.hasDoubleHasteDuration?2:1);
            }
            if(popup.querySelector('#edit-slow')) {
                const newSlow = parseFloat(popup.querySelector('#edit-slow').value);
                this.startItemData.slow = (this.startItemData.slow||0) + (newSlow - this.slow/(this.hasDoubleSlowDuration?2:1));
            }
            if(popup.querySelector('#edit-freeze')) {
                const newFreeze = parseFloat(popup.querySelector('#edit-freeze').value);
                this.startItemData.freeze = (this.startItemData.freeze||0) + (newFreeze - this.freeze)/(this.hasDoubleFreezeDuration?2:1);
            }
            if(popup.querySelector('#edit-regen')) {
                const newRegen = parseFloat(popup.querySelector('#edit-regen').value);
                this.startItemData.regen = (this.startItemData.regen||0) + (newRegen - this.regen);
            }
            popup.remove();
            this.board.player.battle.resetBattle();

            updateUrlState();
        });
        

        popup.querySelector('.cancel-edit').addEventListener('click', () => {
            popup.remove();
        });

    }
    setRarity(rarity) {
        const initialValueFromRarity = this.getInitialValue();
        this.rarity = rarity;
        const newValueFromRarity = this.getInitialValue();
        const oldStartDataValue = this.startItemData.value||initialValueFromRarity;
        this.startItemData.tier = Item.rarityLevels.indexOf(rarity);
        this.startItemData.rarity = rarity;
        this.startItemData.value = oldStartDataValue-initialValueFromRarity+newValueFromRarity;
    }
    get nameWithoutEnchant() {
        return Item.stripEnchantFromName(this.name)[0];
    }
    static stripEnchantFromName(name) {
        const enchantPrefixes = new RegExp(`^(${Item.possibleEnchants.join('|')})\\s+`);
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
        let regex = /^\s*When (you|your enemy|any player|either player|your items|your enemy's items|the core|an adjacent item)? ([^,]*), (.*)$/i;
        let match = text.match(regex);
        let ifFunction = null;
        if(match) {
            let [_, enemyMatch, conditionalMatch, textAfterComma] = match;
            const ifregex = /(.*\.) if (.*), (.*)\./i;
            const ifmatch = textAfterComma.match(ifregex);
            let targetBoards = [this.board];
            if(enemyMatch=="your enemy") {
                targetBoards = [this.board.player.hostileTarget.board];
            } else if(enemyMatch=="any player"||enemyMatch=="either player") {
                targetBoards.push(this.board.player.hostileTarget.board);
            } else if(enemyMatch=="your enemy's items") {
                targetBoards.push(this.board.player.hostileTarget.board);
            } else if(enemyMatch.toLowerCase()=="the core") {
                conditionalMatch = "the core "+conditionalMatch;
            } else if(enemyMatch=="an adjacent item") {
                conditionalMatch = "an adjacent item "+conditionalMatch;
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
            const skipCases = [
                "sell a weapon", //do nothing
                "sell this", 
                "buy this",
                "buy another aquatic item",
                "level up",
                "sell 10 items",
                "sell a spare change",
                "win a fight",
                "win a fight against a player",
                "buy a weapon",
                "visit a merchant",
                "sell a small item",
                "sell another non-weapon item",
                "sell a large item",
                "sell a tool",
                "win a fight against a monster with this",
                "gain gold",
                "win a fight with langxian in play",
                "buy",
                "sell",
                "win a fight with stained glass window in play",
                "sell an item",
                "sell a property",
                "buy an aquatic item",
                "buy a potion",
                "buy a property",
                "buy another item",
                "upgrade a friend",
                "sell a medium or large item",
                "start a fight",
                "sell a reagent",
                "transform a reagent",
                "win a fight against a hero",
                "level up and at the start of each day",
                "lose a fight with this in play",
                "win a fight with this in play"
            ];
            if(skipCases.includes(conditionalMatch.toLowerCase())) {
                return;
            }
            //freeze, or burn, blah blah blah
            let conditionalMatches = [conditionalMatch];
            if(textAfterComma.includes(",")) {
                do {
                    const regex = /^([^,]+),(?: or)? (.*)$/;
                    const m = textAfterComma.match(regex);
                    if(m) {
                        conditionalMatches.push(m[1]);
                        textAfterComma = m[2];
                    }
                } while(textAfterComma.includes(","));
            }            

            const triggerFunctionFromText = this.getTriggerFunctionFromText(textAfterComma);

            const useAdjacentTagItem = conditionalMatch.match(/^use an adjacent ([^\s]+)?(?: item)?$/i);
            if(useAdjacentTagItem) {
                let tagToMatch2 = Item.getTagFromText(useAdjacentTagItem[1]);
                if(tagToMatch2.toLowerCase()=='item') {
                    tagToMatch2 = null;
                }
                const adjacentItems = this.adjacentItems.filter(i=>!tagToMatch2||i.tags.includes(tagToMatch2));
                adjacentItems.forEach(i=>{
                    i.triggerFunctions.push(()=>{
                        triggerFunctionFromText(this,{source:this,target:i});
                    });
                });
                return;
            }
            const whenmatch = conditionalMatch.match(/^uses? an?(other)? (non-)?([^\s]+)(?: item)?$/i);
            if(whenmatch) {
                const other = whenmatch[1];
                const non = whenmatch[2];
                const tagToMatch = Item.getTagFromText(whenmatch[3]);
                
                targetBoards.forEach(board => {
                    if(non) {
                        this.whenNonItemTagTriggers(tagToMatch, triggerFunctionFromText, board, other?this:null);
                    } else {
                        this.whenItemTagTriggers(tagToMatch, triggerFunctionFromText, board, other?this:null);
                    }
                });
                return;
            }
            let regex = /^use a (\w+) or (\w+) item$/i;
            const useOrMatch = conditionalMatch.match(regex);
            if(useOrMatch) {
                let tagToMatch = Item.getTagFromText(useOrMatch[1]);
                let tagToMatch2 = Item.getTagFromText(useOrMatch[2]);
                this.whenItemTagTriggers([tagToMatch, tagToMatch2], triggerFunctionFromText);
                return;
            }

            conditionalMatches.forEach(conditionalMatch=>{

                switch(conditionalMatch.toLowerCase()) {
                    case "use an item":
                        this.board.itemTriggers.set(this.id+"_"+triggerFunctionFromText.text, triggerFunctionFromText);
                        return;

                    case "use another item":
                        this.board.itemTriggers.set(this.id+"_"+triggerFunctionFromText.text, (item) =>  {                        
                            if(item.id !== this.id) {
                                triggerFunctionFromText(item);
                            }
                        });
                        return;
                    case "use another tech":
                        this.board.itemTriggers.set(this.id+"_"+triggerFunctionFromText.text, (item) =>  {                        
                            if(item.id !== this.id && item.tags.includes("Tech")) {
                                triggerFunctionFromText(item);
                            }
                        });
                        return;
                    case "destroy an item":
                    case "destroy an item during combat":
                        this.board.player.destroyTriggers.set(this.id+"_"+triggerFunctionFromText.text, (item) => {
                            triggerFunctionFromText(item);
                        });
                        return;
                    case "over-heal":
                        this.board.player.overhealTriggers.set(this.id, triggerFunctionFromText);
                        return;
                    case "heal":
                        this.board.player.healTriggers.set(this.id, triggerFunctionFromText);
                        return;
                    case "use a friend":
                        this.board.itemTriggers.set(this.id+"_"+triggerFunctionFromText.text, (item) =>  {                        
                            if(item.tags.includes("Friend")) {
                                triggerFunctionFromText(item);
                            }
                        });
                        return;
                    case "use another friend":
                        this.board.itemTriggers.set(this.id+"_"+triggerFunctionFromText.text, (item) =>  {                        
                            if(item.id !== this.id && item.tags.includes("Friend")) {
                                triggerFunctionFromText(item);
                            }
                        });
                        return;
                    case "use another aquatic item":
                        this.board.itemTriggers.set(this.id+"_"+triggerFunctionFromText.text, (item) => {
                            if(item.id !== this.id && item.tags.includes("Aquatic")) {
                                triggerFunctionFromText(item);
                            }
                        });
                        return;
                    case "use another weapon":
                        this.board.itemTriggers.set(this.id+"_"+triggerFunctionFromText.text, (item) => {
                            if(item.id !== this.id && item.tags.includes("Weapon")) {
                                triggerFunctionFromText(item);
                            }
                        });
                        return;
                    case "use a weapon":
                        this.board.itemTriggers.set(this.id+"_"+triggerFunctionFromText.text, (item) =>  {                        
                            if(item.tags.includes("Weapon")) {
                                triggerFunctionFromText(item);
                            }
                        });
                        return;            
                    case "use an item with ammo":
                        this.board.itemTriggers.set(this.id+"_"+triggerFunctionFromText.text, (item) => {
                            if(item.tags.includes("Ammo")) {
                                triggerFunctionFromText(item);
                            }
                        });
                        return;
                    
                    case "use another ammo item":
                        this.board.itemTriggers.set(this.id+"_"+triggerFunctionFromText.text, (item) => {
                            if(item.id !== this.id && item.tags.includes("Ammo")) {
                                triggerFunctionFromText(item);
                            }
                        });
                        return;
                    case "crit with an item":
                        this.board.critTriggers.set(this.id+"_"+triggerFunctionFromText.text, (item) => {
                                triggerFunctionFromText(item);
                        });
                        return;
                    case "crit with another item":
                        this.board.critTriggers.set(this.id+"_"+triggerFunctionFromText.text, (item) => {
                            if(item.id !== this.id) {
                                triggerFunctionFromText(item);
                            }
                        });
                        return;
                    case "crit with an adjacent item":
                        this.board.critTriggers.set(this.id+"_"+triggerFunctionFromText.text, (item) => {
                            if(item.id !== this.id && this.adjacentItems.some(i=>i.id==item.id)) {
                                triggerFunctionFromText(item);
                            }
                        });
                        return;
                    case "use another non-weapon item":
                    case "use a non-weapon item":
                        this.board.itemTriggers.set(this.id+"_"+triggerFunctionFromText.text, (item) =>  {                        
                            if(item.id !== this.id && !item.tags.includes("Weapon")) {
                                triggerFunctionFromText(item);
                            }
                        });
                        return;
                    case "use an adjacent item":
                        this.adjacentItemTriggers.push(triggerFunctionFromText);
                        return;
                    case "use another weapon or haste":
                        this.board.itemTriggers.set(this.id+"_"+triggerFunctionFromText.text, (item) => {
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
                        this.board.itemTriggers.set(this.id+"_"+triggerFunctionFromText.text, (item)=> {
                            if(item.startIndex < this.startIndex) {
                                triggerFunctionFromText(item);
                                if(ifFunction) ifFunction(item);
                            }
                        });
                        return;
                    case "use any item to the right of this":
                        this.board.itemTriggers.set(this.id+"_"+triggerFunctionFromText.text, (item)=> {
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
                    case "use the ammo item to the right of this":
                        const rightAmmoItem = this.getItemToTheRight();
                        if(rightAmmoItem&&rightAmmoItem.tags.includes("Ammo")) {
                            rightAmmoItem.triggerFunctions.push(triggerFunctionFromText);
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
                    case "use a friend or the core":
                        this.whenItemTagTriggers(["Friend", "Core"],
                            (item) => {
                                triggerFunctionFromText(item);  
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
                    case "an adjacent item burns":
                        this.board.itemTriggers.set(this.id+"_"+triggerFunctionFromText.text, (item) => {
                            if(item.id !== this.id && this.adjacentItems.some(i=>i==item)) {
                                triggerFunctionFromText(item);
                            }
                        });
                        return;
                    case "burn with an item":
                        this.board.itemTriggers.set(this.id+"_"+triggerFunctionFromText.text, (item) => {
                            if(item.tags.includes("Burn")) {
                                triggerFunctionFromText(item);
                            }
                        });
                        return;
                    case "or your enemy burns":
                        this.board.player.hostileTarget.board.burnTriggers.set(this.id,triggerFunctionFromText);
                    case "burn":
                        this.board.burnTriggers.set(this.id+"_"+triggerFunctionFromText.toString(),triggerFunctionFromText);
                        return;
                    case "poison yourself":
                        this.board.poisonTriggers.set(this.id, ({target,...rest}) => {
                            if(target==this.board.player) {
                                triggerFunctionFromText(this, {target,...rest});
                            }
                        });
                        return;
                    case "poison":
                        this.board.poisonTriggers.set(this.id+"_"+triggerFunctionFromText.text, triggerFunctionFromText);
                        return;
                    case "poison or burn":
                        this.board.burnTriggers.set(this.id+"_"+triggerFunctionFromText.text,triggerFunctionFromText);
                        this.board.poisonTriggers.set(this.id+"_"+triggerFunctionFromText.text,triggerFunctionFromText);
                        return;
                    case "haste":
                        this.board.hasteTriggers.set(this.id+"_whenyouhaste",(i,source) => {
                            triggerFunctionFromText(source);
                        });
                        return;

                    case "slow or poison":
                        targetBoards.forEach(board => {
                            board.poisonTriggers.set(this.id+"_"+triggerFunctionFromText.text, triggerFunctionFromText);
                            board.slowTriggers.set(this.id+"_"+triggerFunctionFromText.text, triggerFunctionFromText);
                        });
                        return;
                    case "slow with an item":
                        this.board.slowTriggers.set(this.id+triggerFunctionFromText.text, (target, source) => {
                            if(this.board.items.some(i=>i.id==source.id)) {
                                triggerFunctionFromText(source);
                            }
                        });
                        return;
                    case "slow":
                        this.board.slowTriggers.set(this.id+"_"+triggerFunctionFromText.text,(i,source)=>{
                            triggerFunctionFromText(source);
                        });
                        return;
                    case "gain freeze":
                        this.board.player.hostileTarget.board.freezeTriggers.set(this.id,triggerFunctionFromText);
                        return;
                    case "freeze":
                        this.board.freezeTriggers.set(this.id+"_"+triggerFunctionFromText.text,(target,source)=>{
                                triggerFunctionFromText(source);
                        });
                        return;
                    case "freeze with an item":
                        this.board.freezeTriggers.set(this.id+triggerFunctionFromText.text, (target, source) => {
                            if(this.board.items.some(i=>i.id==source.id)) {
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
                    case "shield or heal": 
                        this.board.shieldTriggers.set(this.id,triggerFunctionFromText);
                        this.board.player.healTriggers.set(this.id,triggerFunctionFromText);
                        return;
                    case "lose shield":
                        this.board.player.lostShieldTriggers.set(this.id,triggerFunctionFromText);
                        return;
                        
                    case "or your enemy poisons":
                        this.board.player.hostileTarget.board.poisonTriggers.set(this.id+"_"+triggerFunctionFromText.text,triggerFunctionFromText);
                    case "poison with an item":
                        this.board.itemTriggers.set(this.id+'-poison_with_an_item', (item) => {
                            if(item.tags.includes("Poison")) {
                                triggerFunctionFromText(item);
                            }
                        });
                        return;

                    case "use a Tech":
                        this.whenItemTagTriggers("Tech", (item) => {
                            triggerFunctionFromText(item);
                        });
                        return;
                    case "use another toy":
                        this.whenItemTagTriggers("Toy", (item) => { 
                            if(item.id !== this.id) {
                                triggerFunctionFromText(item);
                            }
                        });
                        return;
                    case "use an adjacent item or dragon item":
                        const adjacentItems = this.adjacentItems;
                        this.board.itemTriggers.set(this.id,(item)=>{
                            if(adjacentItems.some(i=>i.id==item.id)||item.tags.includes("Dragon")) {
                                triggerFunctionFromText(item);
                            }
                        });
                        return;
                    case "burn or use a dragon item":
                        this.board.burnTriggers.set(this.id,triggerFunctionFromText);
                        this.whenItemTagTriggers("Dragon", (item) => {
                            triggerFunctionFromText(item);
                        });
                        return;
                    case "use another tool":
                        this.whenItemTagTriggers("Tool", (item) => {
                            if(item.id !== this.id) {
                                triggerFunctionFromText(item);
                            }
                        });
                        return;
                    case "gain regen":
                    case "gain regeneration":
                        this.board.player.regenChanged((newRegen,oldRegen)=>{
                            if(newRegen>oldRegen) {
                                triggerFunctionFromText(this);
                            }
                        });
                        return;
                    case "use a property":
                        this.whenItemTagTriggers("Property", (item) => {
                            triggerFunctionFromText(item);
                        });
                        return;
                    case "haste or slow":
                        this.board.hasteTriggers.set(this.id,triggerFunctionFromText);
                        this.board.slowTriggers.set(this.id,triggerFunctionFromText);
                        return;
                    case "use a small item":
                        this.whenItemTagTriggers("Small", (item) => {
                            triggerFunctionFromText(item);
                        });
                        return;
                    case "crit with a weapon":
                        this.board.critTriggers.set(this.id,(item)=>{
                            if(item.tags.includes("Weapon")) {
                                triggerFunctionFromText(item);
                            }
                        });
                        return;
                    case "use this":
                        this.triggerFunctions.push(triggerFunctionFromText);
                        return;
                    case "use a large item":
                        this.whenItemTagTriggers("Large", (item) => {
                            triggerFunctionFromText(item);
                        });
                    case "gain burn":
                        this.board.player.hostileTarget.board.burnTriggers.set(this.id,triggerFunctionFromText);

                        return;
                    case "crit with any item":
                        this.board.critTriggers.set(this.id, triggerFunctionFromText);
                        return;
                    case "use an item with burn":
                        this.board.itemTriggers.set(this.id, (item) => {
                            if(item.tags.includes("Burn")) {
                                triggerFunctionFromText(item);
                            }
                        });
                        return;
                    case "heal or gain regen":
                    case "heal or gain regeneration":
                        this.board.player.regenChanged((newRegen,oldRegen)=>{                            
                            if(this.board.inCombat && newRegen>oldRegen) {
                                triggerFunctionFromText(this);
                            }
                        });
                        this.board.player.healTriggers.set(this.id,triggerFunctionFromText);
                        return;
                    case "reload":
                        this.board.reloadTriggers.set(this.id+"_"+triggerFunctionFromText.text,triggerFunctionFromText);
                        return;
                    case "use the leftmost item":
                    case "use your leftmost item":
                        this.board.itemTriggers.set(this.id+"_"+triggerFunctionFromText.text, (item) => {
                            const leftmostItemWithCooldown = this.board.items.filter(i=>i.cooldown>0)[0];
                            if(leftmostItemWithCooldown && item==leftmostItemWithCooldown) {
                                triggerFunctionFromText(item);
                            }
                        });

                        return;
                    case "takes damage":
                        targetBoards.forEach((board)=>{
                            board.player.healthChanged((newValue,oldValue)=>{
                                if(newValue<oldValue) {
                                    triggerFunctionFromText(this,oldValue-newValue);
                                }
                            });
                        });
                        return;
                    case "the core gains haste":
                        this.board.hasteTriggers.set(this.id+"_"+triggerFunctionFromText.text,(item)=>{
                            if(item.tags.includes("Core")) {
                                triggerFunctionFromText(item);
                            }
                        });
                        return;
                    case "reload or transform a potion":
                        this.board.reloadTriggers.set(this.id+"_"+triggerFunctionFromText.text,(item)=> {
                            if(item.tags.includes("Potion")) {
                                triggerFunctionFromText(item);
                            }
                        });
                    case "transform a potion":
                        this.board.transformTriggers.set(this.id+"_"+triggerFunctionFromText.text,(item,source)=>{
                            if(item.tags.includes("Potion")) {
                                triggerFunctionFromText(item);
                            }
                        });
                        return;
                    case "an adjacent item hastes or slows":
                        const adjacentHastingOrSlowingItems = this.adjacentItems;
                        this.board.hasteTriggers.set(this.id,(item,source)=>{
                            if(adjacentHastingOrSlowingItems.some(i=>i.id==source.id)) {
                                triggerFunctionFromText(source);
                            }
                        });
                        this.board.slowTriggers.set(this.id,(item,source)=>{
                            if(adjacentHastingOrSlowingItems.some(i=>i.id==source.id)) {
                                triggerFunctionFromText(source);
                            }
                        });
                        return;
                    case "use another relic or enchanted item":
                        this.whenItemTagTriggers(["Relic", "Enchanted"], (item) => {
                            if(item.id !== this.id) {
                                triggerFunctionFromText(item);
                            }
                        });
                        return;
                    case "an adjacent item poisons or burns":
                        this.board.burnTriggers.set(this.id+triggerFunctionFromText.text,(item,source)=>{
                            if(this.adjacentItems.some(i=>i.id==source.id)) {
                                triggerFunctionFromText(source);
                            }
                        });
                        //intending to skip return here
                        case "an adjacent item poisons":                            
                            this.board.poisonTriggers.set(this.id+triggerFunctionFromText.text,({source,...rest})=>{
                                if(this.adjacentItems.some(i=>i.id==source.id)) {
                                    triggerFunctionFromText({source, ...rest});
                                }
                            });
                    return;

                    case "an adjacent item slows or freezes":
                        const adjItems = this.adjacentItems;
                        this.board.slowTriggers.set(this.id+triggerFunctionFromText.text,(item,source)=>{
                            if(adjItems.some(i=>i.id==source.id)) {
                                triggerFunctionFromText(source);
                            }
                        });
                        this.board.freezeTriggers.set(this.id+triggerFunctionFromText.text,(item,source)=>{
                            if(adjItems.some(i=>i.id==source.id)) {
                                triggerFunctionFromText(source);
                            }
                        });
                        this.board.player.hostileTarget.board.freezeTriggers.set(this.id+triggerFunctionFromText.text,(item,source)=>{
                            if(adjItems.some(i=>i.id==source.id)) {
                                triggerFunctionFromText(source);
                            }
                        });
                        this.board.player.hostileTarget.board.slowTriggers.set(this.id+triggerFunctionFromText.text,(item,source)=>{
                            if(adjItems.some(i=>i.id==source.id)) {
                                triggerFunctionFromText(source);
                            }
                        });
                        return;
                }
                console.log("No code yet written for this case! '" + text + "' matched 'When you' but not '" + conditionalMatch+"' from "+this.name);

                return;
            });
            if(conditionalMatches.length>0) {return;}
        }
        //The first (  4  » 8   ) times you use a non-Weapon item each fight, Charge 1 Weapon 1 second(s). from Mixed Message
        //The first (  4  » 8   ) times you Shield each fight, Charge 1 item 1 second(s).
        //The first (  4  » 8   ) times your enemy uses a non-weapon item each fight, Charge 1 Weapon 1 second(s).
        //"The first (5/10/15) times you slow each fight, Charge 1 Regeneration item 1 second(s)." Hardly Workin'
        regex = /^The first (\([^)]+\)|\d+)?\s?times? ([^,]+?)(?: each fight| in a fight)?, (.*)/i;
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
                case "you over-heal":
                    let overhealCount = 0;
                    this.board.player.overhealTriggers.set(this.id+"_"+ntimesFunction.text,()=> {
                        overhealCount++;
                        if(overhealCount<=numTimes) {
                            ntimesFunction(this);
                        } else {
                            this.board.player.overhealTriggers.delete(this.id+"_"+ntimesFunction.text);
                        }
                    });
                    return;
                case "you use your slowest weapon":
                    let slowestWeaponCount = 0;
                    let slowestWeapon;
                    let slowestWeaponCooldown;
                    let updateSlowestWeapon = () => {
                        const weapons = this.board.items.filter(i=>i.tags.includes("Weapon"));
                        if (weapons.length > 0) {
                            slowestWeapon = weapons.reduce((a,b)=>{if(a.cooldown>b.cooldown) return a; return b;});
                            slowestWeaponCooldown = slowestWeapon.cooldown||Infinity;
                        } else {
                            slowestWeapon = null;
                            slowestWeaponCooldown = Infinity;
                        }
                    }
                    updateSlowestWeapon();
                    this.board.itemTriggers.set(this.id,(item)=>{
                        if(item.tags.includes("Weapon")) {
                            updateSlowestWeapon();
                            if(item.cooldown >= slowestWeaponCooldown) { 
                                    ntimesFunction(item);                                                           
                                    if(slowestWeaponCount++==numTimes) {
                                        this.board.itemTriggers.delete(this.id);
                                    }
                            }
                        }
                    });
                    this.board.itemDestroyedTriggers.set(this.id,(item)=>{
                        if(item.tags.includes("Weapon")) {
                            updateSlowestWeapon();
                        }
                    });
                    return;
                case "you use an item":
                    let itemCount = 0;
                    this.board.itemTriggers.set(this.id,(item)=>{
                        if(itemCount<numTimes) {
                            itemCount++;
                            ntimesFunction(item);
                        }
                    });
                    return;
                case "you use a potion":
                    let potionCount = 0;
                    this.whenItemTagTriggers("Potion",(item)=>{
                        if(potionCount<numTimes) {
                            ntimesFunction(item);
                            potionCount++;
                            if(potionCount==numTimes) {
                                this.board.itemTriggers.delete(this.id);
                            }
                        }
                    });
                    return;
                case "you use an aquatic item":
                    let aquaticItemCount = 0;
                    this.board.itemTriggers.set(this.id,(item)=>{
                        if(item.tags.includes("Aquatic")) {
                            ntimesFunction(item);
                            aquaticItemCount++;
                            if(aquaticItemCount==numTimes) {
                                this.board.itemTriggers.delete(this.id);
                            }
                        }
                    });
                    return;
                case "you use your leftmost item":
                    let leftmostItemCount = 0;
                    const leftmostItem = this.board.items[0];
                    this.board.itemTriggers.set(this.id,(item)=>{
                        if(item.id==leftmostItem.id) {
                            ntimesFunction(item);
                            leftmostItemCount++;
                            if(leftmostItemCount == numTimes) {
                                this.board.itemTriggers.delete(this.id);
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
                            rightmostItemCount++;
                            if(rightmostItemCount == numTimes) {
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
                    this.board.freezeTriggers.set(this.id,(item)=>{
                        if(freezeCount++<=numTimes) {
                            ntimesFunction(item);
                            if(freezeCount==numTimes) {
                                this.board.player.hostileTarget.board.freezeTriggers.delete(this.id);
                            }
                        }
                    });
                    return;
                case "you burn":
                    let burnCount = 0;
                    this.board.burnTriggers.set(this.id,(item)=>{
                        if(burnCount++<=numTimes) {
                            ntimesFunction(item);
                            if(burnCount==numTimes) {
                                this.board.burnTriggers.delete(this.id);
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
                case "your enemy falls below half health":
                    let enemyHealthBelowHalfCount = 0;
                    this.board.player.hostileTarget.healthBelowHalfTriggers.set(this.id,(item)=>{
                        if(enemyHealthBelowHalfCount++<=numTimes) {
                            ntimesFunction(item);
                            if(enemyHealthBelowHalfCount>=numTimes) {
                                this.board.player.hostileTarget.healthBelowHalfTriggers.delete(this.id);
                            }
                        }
                    });
                    return;
                case "you fall below 50% health":
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
                    this.board.poisonTriggers.set(this.id+"_"+ntimesFunction.text,(item)=>{
                        if(poisonCount++<=numTimes) {
                            ntimesFunction(item);
                            if(poisonCount>=numTimes) {
                                this.board.poisonTriggers.delete(this.id);
                            }
                        } 
                    });
                    return;
                case 'you use a tool':
                    let toolCount = 0;
                    this.board.itemTriggers.set(this.id,(item)=>{
                        if(item.tags.includes("Tool") && toolCount++<=numTimes) {
                            ntimesFunction(item);
                            if(toolCount==numTimes) {
                                this.board.itemTriggers.delete(this.id);
                            }
                        }
                    });
                    return;
                case 'your enemy uses a weapon':
                    let enemyWeaponCount = 0;
                    this.board.player.hostileTarget.board.itemTriggers.set(this.id,(item)=>{
                        if(item.tags.includes("Weapon") && enemyWeaponCount++<=numTimes) {
                            ntimesFunction(item);
                            if(enemyWeaponCount==numTimes) {
                                this.board.player.hostileTarget.board.itemTriggers.delete(this.id);
                            }
                        }
                    });
                    return;
                case 'you use a weapon': // from Venomous Blade
                    let weaponCount = 0;
                    this.board.itemTriggers.set(this.id,(item)=>{
                        if(item.tags.includes("Weapon") && weaponCount++<=numTimes) {
                            ntimesFunction(item);
                            if(weaponCount==numTimes) {
                                this.board.itemTriggers.delete(this.id);
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
                case "you use this":
                    let thisItemCount = 0;
                    this.board.itemTriggers.set(this.id,(item)=>{
                        if(item.id==this.id && thisItemCount++<=numTimes) {
                            ntimesFunction(item);
                            if(thisItemCount>=numTimes) {
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
       
        //When any item gains freeze, ...
        regex = /^\s*When any item gains freeze, (.*)/i;
        match = text.match(regex);
        if(match) {
            const f = this.getTriggerFunctionFromText(match[1]);
            this.board.freezeTriggers.set(this.id+"_anyitemgainsfreeze",(item,source)=>{
                    f(item);
            });
            this.board.player.hostileTarget.board.freezeTriggers.set(this.id+"_anyitemgainsfreeze",(item,source)=>{
                f(item);
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
         //This has +1 Multicast if it is adjacent to a Friend. from Soldering Gun
         regex = /^(.*) if it is adjacent to a ([^\s^\.]+)\.?$/i;
         match = text.match(regex);
         if(match) {
            const tagToMatch = Item.getTagFromText(match[2]);
            const f = this.getUndoableFunctionFromText(match[1],()=>{
                return this.adjacentItems.some(item => item.tags.includes(tagToMatch));
            });
            this.board.itemDestroyedTriggers.set(f,f);
            return;
         }
         //This has +1 Multicast if you have more health than your enemy. from Jaballian Longbow 
         regex = /^(.*) if you have more health than your enemy\.?$/i;
         match = text.match(regex);
         if(match) {
            const f = this.getUndoableFunctionFromText(match[1],()=>{
                return this.board.player.health > this.board.player.hostileTarget.health;
            });
            this.board.player.healthChanged(f);
            this.board.player.hostileTarget.healthChanged(f);
            return;
         }
         //If you have a Vehicle or Large item,
         regex = /^If you have a(nother)? ([^\s]+) (?:or ([^\s]+))? item, (.*)$/i
         match = text.match(regex);
         if(match) {
            const another = match[1] ? true : false;
            const tagToMatch = Item.getTagFromText(match[2]);
            const tagToMatch2 = Item.getTagFromText(match[3]);
            const comparisonFunction = () => this.board.activeItems.some(item => 
                (!another || item.id!=this.id) && (
                    item.tags.includes(tagToMatch) || 
                    (tagToMatch2 && item.tags.includes(tagToMatch2))
                )
            );
            this.board.itemDestroyedTriggers.set(comparisonFunction,this.getUndoableFunctionFromText(match[4], comparisonFunction));
            return;
        }

        this.triggerFunctions.push(this.getTriggerFunctionFromText(text));
        return null;
    }
    
    /*
    When an item with a tag is used, trigger the given function
    tag can be a string or an array of strings
    */
    whenItemTagTriggers(tag, func, board=this.board, excludeitem=null) {
        const tags = Array.isArray(tag) ? tag : [tag];
        board.itemTriggers.set(func,(item) => {            
            if (tag =="Item" || tags.some(t => item.tags.includes(t)) && item != excludeitem) {
                board.critPossible=false;
                func(item);
                board.critPossible=true;
            }
        });
    }
        
    /*
    When an item with a tag is used, trigger the given function
    tag can be a string or an array of strings
    */
    whenNonItemTagTriggers(tag, func, board=this.board, excludeitem=null) {
        board.itemTriggers.set(func,(item) => {
            // Handle both string and array cases
            if(!item.tags.includes(tag) && item != excludeitem) {
                board.critPossible=false;
                func(item);
                board.critPossible=true;
            }
        });
    }

    chargeBy(seconds, source) {
        //calculate time to next trigger
        if(source) {
            this.log(source.name + " charged " + this.name + " for " + seconds + " second(s)");
        }
        const timeToNextTrigger = this.cooldown - (this.effectiveBattleTime % this.cooldown);
        if(timeToNextTrigger > seconds*1000) {
            this.effectiveBattleTime += seconds*1000;
            return;
        }
        if(timeToNextTrigger<=0) {
            this.pendingCharges.push({seconds:seconds,source:source});
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
   
        //charge your Busy Bees 2 second(s).
        regex = /^\s*charge your ([^0-9|and]+?)s?\s*(?:and\s+(\w+)\s+)?(?:items?\s+)?(\([^)]+\)|\d+) second\(?s?\)?\.?/i;   
        match = text.match(regex);
        if(match) {
            this.charge = getRarityValue(match[3], this.rarity);
            const itemsToCharge = this.board.items.filter(item => item.name.toLowerCase()==match[1].toLowerCase()||item.tags.includes(Item.getTagFromText(match[1])));
            if(match[2]) {
                itemsToCharge.push(...this.board.items.filter(item => item.tags.includes(Item.getTagFromText(match[2]))));
            }
            return () => {
                itemsToCharge.forEach(item=>{
                    this.applyChargeTo(item);
                });
            }
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

        //parse charge the item to the right of this for (1/2) second(s). from Charging Station
        //Charge the item to the (left|right) of this ( 1 » 2 » 3 » 4 ) second(s).
        regex = /^\s*Charge the ([\w]+)?\s*item to the (left|right)(?: of this)?(?: for)? (?:\(([^)]+)\)|(\d+)) second\(?s?\)?/i;
        match = text.match(regex);
        if(match) {
            this.charge = parseInt(match[3] ? getRarityValue(match[3], this.rarity) : match[4]);
            const tagToMatch = match[1] ? Item.getTagFromText(match[1]) : undefined;
            return () => {
                const itemToCharge = match[2]=='left'?this.getItemToTheLeft():this.getItemToTheRight();
                if(itemToCharge && (tagToMatch==undefined||itemToCharge.tags.includes(tagToMatch))) {
                    this.applyChargeTo(itemToCharge);
                }

            }
        }

        //all your items lose 10% crit chance for the fight. from First Strike
        regex = /^\s*all your items lose 10% crit chance for the fight\.?/i;
        match = text.match(regex);
        if(match) {
            return () => {
                this.board.items.forEach(item => item.gain(-10,'crit'));
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
                            f(item);
                        }
                    });
                }
            });
            return () => {};
        }
        //Charge 1 item 1 second(s). into a trigger function.
        //Charge 1 Weapon 1 second(s). into a trigger function.
        regex = /^\s*Charge (\([^\)]+\)|\d+|a|your)? ([^\s^(]+)\(?s?\)?(?: or ([^\s]+))? (?:item)?\s*(?:for)?\s*(?:by)?\s*(\([^)]+\)|\d+) second\(?s?\)?\.?/i;
        match = text.match(regex);
        if(match) {
            const numItemsToCharge = match[1]=='a'?1:match[1]=='your'?Infinity:getRarityValue(match[1], this.rarity);
            const tagToCharge = match[2]=='leftmost'?'left':match[2]=='rightmost'?'right':Item.getTagFromText(match[2]);
            const tagToCharge2 = match[3]=='leftmost'?'left':match[3]=='rightmost'?'right':Item.getTagFromText(match[3]);
            this.charge = getRarityValue(match[4], this.rarity);
            return () => {
                let validTargets = this.board.items.filter(item => item.isChargeTargetable());
                if(tagToCharge=='leftmost'&&validTargets.length>0) validTargets = [validTargets[0]];
                else if(tagToCharge=='rightmost'&&validTargets.length>0) validTargets = [validTargets[validTargets.length-1]];
                else if(tagToCharge!='item') validTargets = validTargets.filter(item => item.tags.includes(tagToCharge));
                if(tagToCharge2) {
                    validTargets.push(...this.board.activeItems.filter(item => !validTargets.includes(item)&&item.tags.includes(tagToCharge2)));
                }
                this.pickRandom(validTargets,numItemsToCharge).forEach(item=>{
                    this.applyChargeTo(item);
                });
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
        regex = /^\s*(?:Deal )?(Burn|Poison|Heal|Shield|Damage) equal to ((\d+)% of|half of|[\d]+|\([^)]+\))(?: times)? (?:this item's ([^\s^\.]+)|the value of your items)\.?/i;
        match = text.match(regex);
        if(match) {
            const whatToGain = Item.getTagFromText(match[1]);
            const whatToGainLowercase = whatToGain.toLowerCase();
            const multiplier = match[3]?parseInt(match[3])/100:match[2]=='half of'?0.5:getRarityValue(match[2], this.rarity);
            const whatToCheck = match[4]?match[4].toLowerCase() : 'value of your items';
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
                this["apply"+whatToGain]();
            };
        }

        //Double the Burn of an item for the fight.
        regex = /^\s*Double the Burn of an item for the fight\.?/i;
        match = text.match(regex);
        if(match) {
            return () => {
                const target = this.pickRandom(this.board.items.filter(item => item.tags.includes("Burn")));
                if(target) {
                    target.gain(target.burn,'burn');
                    this.log(this.name + " doubled the Burn of " + target.name);
                }
            }
        }
        
        //When this or an adjacent item gains Freeze, remove it.
        regex = /^\s*When this or an adjacent item gains Freeze, remove it\.?/i;
        match = text.match(regex);
        if(match) {
            this.board.freezeTriggers.set(this.id,(item, source)=>{
                if(item.id==this.id||this.adjacentItems.some(i=>i.id==item.id)) {
                    item.removeFreeze(this);
                }
            });
            return () => {};
        }
        //When this or an adjacent item Slows, ...
        regex = /^\s*When this or an adjacent item Slows, (.*)?/i;
        match = text.match(regex);
        if(match) {
            const f = this.getTriggerFunctionFromText(match[1]);
            this.board.slowTriggers.set(this.id,(item, source)=>{
                if(source.id==this.id||this.adjacentItems.some(i=>i.id==source.id)) {
                    f(this);
                }
            });
            return () => {};
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
                this.log(this.name + " removed Freeze and Slow from "+this.board.player.name+"'s items and Cleansed half their Burn and Poison");
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
                this.log(this.name + " added " + shieldGain + " shield to " + this.board.player.name);
            }

        }
        
        
      
        //Destroy a small item.
        regex = /^\s*Destroy an? ([^\s]+)?(?: enemy)?\s?item(?: for the fight)?\.?/i;
        match = text.match(regex);
        if(match) {
            const tagToMatch = Item.getTagFromText(match[1]);
            return () => {
                let targets = this.board.player.hostileTarget.board.activeItems;
                if(tagToMatch && tagToMatch!='Enemy') targets = targets.filter(item => item.tags.includes(tagToMatch));
                if(targets.length>0) {
                    this.pickRandom(targets).destroy(this);
                }
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
                    this.log(this.name + " reduced " + item.name + " cooldown by 5%");
                }
            }
        }
        
        //reduce this item's cooldown by 50%
        //Reduce this item's cooldown by ( 10% » 20% ) for the fight.
        regex = /^reduce this item's cooldown by (\([^)]+\)|\d+)( second| seconds)?(?: for the fight)?\.?/i;
        match = text.match(regex);

        if(match) {          
            const cooldownReduction = getRarityValue(match[1], this.rarity);
            return () => {
                if(match[2]) {
                    this.gain(-cooldownReduction*1000,'cooldown');
                } else {
                    this.gain(this.cooldown * (1-cooldownReduction/100)-this.cooldown,'cooldown');
                }
            }
        }

        //Use a property. From Keychain
        regex = /^\s*Use a property\.?/i;
        match = text.match(regex);
        if(match) {
            return () => {
                const targets = this.board.items.filter(item => item.tags.includes("Property") && item.isChargeTargetable());
                if(targets.length>0) {
                    const target = this.pickRandom(targets);                    
                    this.log(this.name + " used " + target.name);
                    target.trigger();                    
                    target.pendingMulticasts+=parseInt(target.multicast);
                }
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
                        this.log(this.name + " caused " + item.name + " to lose " + lossAmount + " " + match[4]);
                    }
                });
            }

        }
        
        //your Burn items have their cooldowns reduced by 50% for the fight. from Living Flame
        regex = /^\s*your ([^\s]+) items have their cooldowns reduced by 50% for the fight\.?/i;
        match = text.match(regex);
        if(match) {
            const tagToMatch = Item.getTagFromText(match[1]);
            return () => {
                this.board.items.forEach(item => {
                    if(item.tags.includes(tagToMatch)) {
                        item.gain(-item.cooldown*0.5,'cooldown');
                    }
                });
            }
        }


        //Destroy another small item on each player's board for the fight. from Virus
        regex = /^\s*Destroy another small item on each player's board for the fight\.?/i;
        match = text.match(regex);
        if(match) {
            return () => {
               let targets = this.board.player.hostileTarget.board.items.filter(item => item.size==1);
               let target = this.pickRandom(targets);
               if(target) {
                    target.destroy(this);
               }
               targets = this.board.items.filter(item => item.size==1 && item.id!=this.id);
               target = this.pickRandom(targets);
               if(target) {
                    target.destroy(this);
               }
            }
        }

        //an item gains (3%/5%) Crit Chance for the fight. from Combat Medic
        regex = /^\s*an item gains (\([^)]+\)|\d+) Crit Chance for the fight\.?/i;
        match = text.match(regex);
        if(match) {
            const critChance = getRarityValue(match[1], this.rarity);
            return (i) => {
                const item = this.pickRandom(this.board.items);
                if(item) {
                    item.gain(critChance,'crit',this);
                }
            }
        }

        //enemy Weapons lose (2/4) damage. from Corrosive Toxins
        regex = /^\s*enemy Weapons lose (\([^)]+\)|\d+) damage\.?/i;
        match = text.match(regex);
        if(match) {
            const damage = getRarityValue(match[1], this.rarity);
            return (i) => {
                this.board.player.hostileTarget.board.items.forEach(item => {
                    if(item.tags.includes("Weapon")) {
                        item.gain(-damage,'damage',i||this);
                    }
                });
            }
        }
        
        //that item gains (1/2) Burn for the fight. from Conflagration
        regex = /^\s*that item gains (\([^)]+\)|\d+) Burn for the fight\.?/i;
        match = text.match(regex);
        if(match) {
            const burn = getRarityValue(match[1], this.rarity);
            return (i) => {
                i.gain(burn,'burn',this);
            }
        }
        
        //Reduce the cooldown of your aquatic items by (  10%  » 20%   ). barnacle crusted vs seashadow
        regex = /^\s*Reduce the cooldown of your ([^\s]+) items by (\([^)]+\)|\+?\d+%)( for (?:the|this) fight)?\.?/i
        match = text.match(regex);

        if(match) {
            const cooldownReduction = getRarityValue(match[2], this.rarity);
            const tagToMatch = Item.getTagFromText(match[1]);
            const isForFight = match[3] ? true : false;
            const f = ()=>{
                this.board.activeItems.filter(item => tagToMatch=='Other'?item!=this:item.tags.includes(tagToMatch)).forEach(item => {
                    item.gain(item.cooldown * (1-cooldownReduction/100) - item.cooldown,'cooldown');
                });
            }
            if(isForFight) return f; 
            f();             
            return () => {};
        }


        //This deals double Crit damage
        regex = /^\s*This (?:deals|has) double Crit damage\.?$/i;
        match = text.match(regex);
        if(match) {
            this.gain(100,'critMultiplier');
            return () => {};
        }
        //Reload this
        regex = /^\s*Reload this/i;
        match = text.match(regex);
        if(match) {
            return (source) => {
                this.reload(source);
            }
        }
        //Your other Friends' cooldowns are reduced by (10%/20%/30%). from Bill Dozer
        regex = /^\s*Your (other )?(\w+)s?'?(?: items)?(?: have their cooldowns| cooldowns are)? (reduced|increased) by (\([^)]+\)|\d+%)( second\(?s?\)?)?\./i;
        match = text.match(regex);
        if(match) {
            const other = match[1] ? true : false;
            const tagToMatch = Item.getTagFromText(match[2]);
            const cooldownReduction = getRarityValue(match[4], this.rarity);
            const isReduced = match[3] == "reduced" ? true : false;
            const isSeconds = match[5] ? true : false;
            this.board.items.forEach(item => {  
                if(item.id !== this.id && item.tags.includes(tagToMatch)) {
                    if(isSeconds) {
                        item.gain((isReduced?-1:1)*cooldownReduction*1000,'cooldown');
                    } else {
                        item.gain((isReduced?-1:1)*item.cooldown * (cooldownReduction/100),'cooldown');
                    }
                }
            });
            return () => {};
        }
        //Reload a Weapon 1 ammo. from Ice Bullets
        regex = /^\s*Reload a Weapon 1 ammo\.?/i;
        match = text.match(regex);
        if(match) {
            return () => {
                const weapon = this.pickRandom(this.board.items.filter(item => item.tags.includes("Ammo") && item.tags.includes("Weapon")));
                if(weapon) {
                    weapon.gain(1,'ammo',this);
                }
            }
        }
        //Shield equal to (2/3/4) times the Burn on your opponent. from Burning Shield
        regex = /^\s*Shield equal to (\([^)]+\)|\d+) times the Burn on your opponent\.?/i;
        match = text.match(regex);
        if(match) {
            const multiplier = getRarityValue(match[1], this.rarity);
            return () => {
                this.applyShield(this.board.player.hostileTarget.burn*multiplier);
            }
        }
        //gain Shield equal to (1x/2x) that item's Burn. from Heat Shield
        regex = /^\s*gain Shield equal to (\([^)]+\)|\d+) that item's Burn\.?/i;
        match = text.match(regex);
        if(match) {
            const multiplier = getRarityValue(match[1], this.rarity);
            return (i) => {
                this.board.player.applyShield(i.burn*multiplier,this);
            }
        }
        //gain ( 10 » 20 » 40 ) Max Health for the fight.
        regex = /^\s*gain (\([^)]+\)|\d+) Max Health for the fight\.?/i;
        match = text.match(regex);
        if(match) {
            const maxHealth = getRarityValue(match[1], this.rarity);
            return () => {
                this.board.player.maxHealth += maxHealth;
            };
        }
        //destroy an item on each player's board for the fight
        regex = /^\s*destroy an item on each player's board for the fight\.?/i;
        match = text.match(regex);
        if(match) {
            return () => {
                let target = this.pickRandom(this.board.player.hostileTarget.board.items);
                if(target) {
                    target.destroy(this);
                }
                target = this.pickRandom(this.board.items);
                if(target) {
                    target.destroy(this);
                }
            }
        }
        //Slow 1 the slowest enemy item for (3/4/5/6) second(s). from Sleeping Potion
        regex = /^\s*(Slow|Freeze) the slowest enemy item for (\([^)]+\)|\d+) second\(?s\)?\.?$/i;
        match = text.match(regex);
        if(match) {
            const whatToDo = Item.getTagFromText(match[1]);
            const duration = getRarityValue(match[2], this.rarity);
            this.gain(duration,whatToDo.toLowerCase());
            return () => {
                this.board.player.hostileTarget.board.items.sort((a,b)=>b.cooldown-a.cooldown).slice(0,1).forEach(item=>{ 
                    this["apply"+whatToDo+"To"](item);
                });
            }
        }


        //Shield ( 5 » 10 » 20 » 40 ) for each small item you have (including Stash). from Cargo Shorts                                                            
        regex = /^\s*Shield (\([^)]+\)|\d+) for each small item you have \(including Stash\)\.?/i;
        match = text.match(regex);
        if(match) {
            const shield = getRarityValue(match[1], this.rarity);
            return () => {
               const numItems = this.board.items.reduce((acc,item)=>{
                    if(item.tags.includes("Small")) {
                        acc += 1;
                    }
                    return acc;
                },0);
                this.applyShield(shield*numItems);
            }
        }
        //your enemy loses (5/10) Max Health for the fight. from Toxic Exposure
        regex = /^\s*your enemy loses (\([^)]+\)|\d+) Max Health for the fight\.?/i;
        match = text.match(regex);
        if(match) {
            const maxHealth = getRarityValue(match[1], this.rarity);
            return () => {
                this.board.player.hostileTarget.maxHealth -= maxHealth;
                this.log(this.name + " caused " + this.board.player.hostileTarget.name + " to lose " + maxHealth + " Max Health");
            }
        }
        
        //this and the weapon to the left gains ( 20 » 25 ) damage for the fight. from Claw Arm
        regex = /^\s*this and the weapon to the left of this gains (\([^)]+\)|\d+) damage for the fight\.?/i;   
        match = text.match(regex);
        if(match) {
            const damage = getRarityValue(match[1], this.rarity);
            return ()=>{
                this.gain(damage,'damage');
                const leftItem = this.getItemToTheLeft();
                if(leftItem && leftItem.tags.includes("Weapon")) leftItem.gain(damage,'damage');
            };
        }
        //You have Regeneration equal to half the (Poison|Burn) on your enemy. from Venomous Vitality
        regex = /^\s*You have \+?Regen(?:eration)? equal to half the (Poison|Burn) on your enemy\.?/i;
        match = text.match(regex);
        if(match) {
            const whichToTrack = match[1].toLowerCase();
            this.board.player.hostileTarget[whichToTrack+"Changed"]((newAmount,oldAmount)=>{
                this.board.player.regen+=(newAmount-oldAmount)/2;
            });
            return () => {};
        }
        //Your weapons have + Damage equal to (50/75/100) of the Poison on your enemy. from Poppy Field
        regex = /^\s*Your ([^\s]+)s?(?: items)? have \+ (\w+) equal to (\([^)]+\)|\d+%?) of the (\w+) on your enemy\.?/i;
        match = text.match(regex);
        if(match) {            
            const tagToMatch = Item.getTagFromText(match[1]);
            const whatToGain = match[2];
            const multiplier = getRarityValue(match[3], this.rarity)/100;
            const whatToTrack = match[4];
            const targetItems = tagToMatch=='Items'?this.board.items:this.board.items.filter(item =>item.tags.includes(tagToMatch));
            this.board.player.hostileTarget[whatToTrack.toLowerCase()+"Changed"]((newAmount,oldAmount)=>{
                targetItems.forEach(item => {
                    item.gain((newAmount-oldAmount)*multiplier,whatToGain);
                });
            });
            return () => {};
        }
        

        //Shield equal to (2/3/4) times the Poison on your opponent. from Toxic Shield
        regex = /^\s*(Shield|Heal) equal to (\([^)]+\)|\d+) times the Poison on your opponent\.?/i;
        match = text.match(regex);
        if(match) {
            const whatToDo = match[1];
            const multiplier = getRarityValue(match[2], this.rarity);
            let amountGained = 0;
            this.board.player.hostileTarget.poisonChanged((newAmount,oldAmount)=>{
                this.gain(newAmount*multiplier-amountGained,whatToDo.toLowerCase());
                amountGained = newAmount*multiplier;
            });
            return () => {
                this["apply"+whatToDo]();
            };
        }

        //If you have another (Apparel|Vehicle) item in play, this item's cooldown is reduced by 50%. from Cargo Shorts   
        regex = /^\s*If you have another ([^\s]+)(?: item in play)?, (?:this item's cooldown is reduced|reduce this item's cooldown) by (\([^)]+\)|\d+)%\.?/i;
        match = text.match(regex);
        if(match) {
            const tagToMatch = Item.getTagFromText(match[1]);
            const cooldownReduction = getRarityValue(match[2], this.rarity);
            const reduceBy = this.cooldown*(100-cooldownReduction)/100;
            let cooldownReduced = false;
            const f = ()=>{
                const itemsInPlay = this.board.activeItems.filter(item => item.id != this.id && item.tags.includes(tagToMatch));
                if(!cooldownReduced && itemsInPlay.length>0) {
                    this.gain(reduceBy - this.cooldown,'cooldown');
                    cooldownReduced = true;
                } else if(cooldownReduced && itemsInPlay.length==0) {
                    this.gain(reduceBy,'cooldown');
                }
            };
            f();
            this.board.itemDestroyedTriggers.set(this.id,(item)=>{
                f();
            });
            return ()=>{};
        }

        //Reload the item to the left of it (1/2/3) Ammo. from Jury Rigger
        regex = /^\s*Reload the item to the left of it (\([^)]+\)|\d+) Ammo\.?/i;
        match = text.match(regex);
        if(match) {
            const ammo = getRarityValue(match[1], this.rarity);
            return (item) => {
                const leftItem = item.getItemToTheLeft();   
                if(leftItem) {
                    leftItem.gain(ammo,'ammo',this);
                }
            }
        }

        //use your Friends. from Intrusion Countermeasures
        regex = /^\s*use your Friends\.?/i;
        match = text.match(regex);
        if(match) {
            return () => {
                this.board.items.forEach(item => {
                    if(item.tags.includes("Friend")) {
                        item.trigger();
                    }
                });
            }
        }
        
        

        //you have (+500/+1000/+2000) Max Health. from Large Appetites
        regex = /^\s*you have \(([^)]+)\) Max Health\.?/i;
        match = text.match(regex);
        if(match) {
            const maxHealth = getRarityValue(match[1], this.rarity);
            this.board.player.maxHealth += maxHealth;
            return () => {};
        }

        //Every 50 you spend (skip this for now)
        regex = /^\s*Every (\d+) you spend/i;
        match = text.match(regex);
        if(match) {
            return () => {}
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
                    rightItem.gain(ammo,'ammo',this);
                }
            }
        }

        //Your items have (+1/+2/+3) Max Ammo. from Gunner
        regex = /^\s*Your (\w+)(?: item)?s? have (\([^)]+\)|\d+) (?:Max )?Ammo\.?/i;
        match = text.match(regex);
        if(match) {
            const maxAmmo = getRarityValue(match[2], this.rarity);
            const tag = Item.getTagFromText(match[1]);
            this.board.items.forEach(item => {
                if(item.tags.includes("Ammo") && (tag=="Item"||item.tags.includes(tag))) {
                    item.gain(maxAmmo,'maxAmmo');
                }
            });
            return () => {};
        }
        
        //The potion to the left of this has (+1/+2/+3/+4) Ammo. from Tazidian Dagger
        regex = /^\s*The potion to the left of this has (\([^)]+\)|\d+) Ammo\.?/i;
        match = text.match(regex);
        if(match) {
            const ammo = getRarityValue(match[1], this.rarity);
            const leftItem = this.getItemToTheLeft();
            if(leftItem&&leftItem.tags.includes("Potion")) {
                leftItem.gain(ammo,'maxAmmo');
            }
            return () => {};
        }

        //Adjacent items have ( +1 » +2 » +3 » +4 ) Max Ammo
        regex = /^\s*Adjacent items have (\([^)]+\)|\d+) (?:Max )?Ammo\.?/i;
        match = text.match(regex);
        if(match) {
            const maxAmmo = getRarityValue(match[1], this.rarity);
            this.adjacentItems.forEach(item => {
                if(item.tags.includes("Ammo")) {
                    item.gain(maxAmmo,'maxAmmo');
                }
            });
            return () => {};
        }

        //Reload adjacent Ammo items ( 1 » 2 » 3 ) Ammo. from Ramrod
        regex = /^\s*Reload adjacent (?:Ammo )?items(?: (\([^)]+\)|\d+) Ammo)?\./i;
        match = text.match(regex);
        if(match) {
            const ammo = match[1] ? getRarityValue(match[1], this.rarity) : null;
            return () => {
                this.adjacentItems.forEach(item => {
                    let ammoToGain = ammo?ammo:item.maxAmmo;
                    item.gain(ammoToGain,'ammo',this);
                });
            };
        }
        //Reload adjacent Potions. from Boiling Flask
        regex = /^\s*Reload adjacent Potions\.?/i;
        match = text.match(regex);
        if(match) {
            return () => {
                this.adjacentItems.forEach(item => {
                    if(item.tags.includes("Potion")) {
                        item.reload(this);
                    }
                });
            }
        }

        //remove freeze from your items
        regex = /^\s*remove freeze from your items/i;
        match = text.match(regex) ;
        if(match) {
            return () => {
                this.board.items.forEach(i => i.removeFreeze(this));
            }
        }
        

        //This has + Multicast equal to its ammo. from Dive Weights 
        regex = /^\s*This has \+ Multicast equal to its ammo\.?/i;
        match = text.match(regex);
        if(match) {
            this.gain(this.ammo,'multicast');
            this.ammoChanged((newAmount,oldAmount)=>{
                this.gain(newAmount-oldAmount,'multicast');
            });
            return () => {};
        }

        // Adjacent items are Aquatic. from Diving Helmet 
        regex = /^\s*Adjacent items are ([^\.]+)\.?/i;
        match = text.match(regex);
        if(match) {
            const tagToGain = Item.getTagFromText(match[1]);
            this.adjacentItems.forEach(i => i.tags.push(tagToGain));
            return () => {};
        }
       
        //your items gain ( +2% » +4% » +6% » +8% ) Crit chance for the fight.
        //or: your items gain +20% Crit chance for the fight.
        regex = /your\s?([^\s]+)? items (?:gain|get) (\([^)]+\)|\d+) Crit chance(?: for the fight)?/i;
        match = text.match(regex);
        if(match) {
            const tagToMatch = match[1] ? Item.getTagFromText(match[1]) : null;
            const critGain = getRarityValue(match[2], this.rarity);
            return () => {
                this.board.items.forEach(i => {
                    if(tagToMatch ? i.tags.includes(tagToMatch) : true) {
                        i.gain(critGain,'crit');
                    }
                });
            }
        }

        //Destroy a small enemy item for the fight.
        regex = /^Destroy a small enemy item for the fight\.?$/i;
        match = text.match(regex);
        if(match) {
            return () => {
                const target = this.pickRandom(this.board.player.hostileTarget.board.items.filter(item => item.size==1));
                if(target) {
                    target.destroy(this);
                }
            };
        }
        
        regex = /^Gain (?:\(([^)]+)\)|(\d+)) gold/i;
        match = text.match(regex);
        if(match) {            
            return () => {
                this.board.player.addGold(match[1] ? getRarityValue(match[1], this.rarity) : parseInt(match[2]));
                this.log(this.name + " gave " + this.board.player.gold + " gold to " + this.board.player.name);
            }
        }

        //this reloads 1 ammo. from Grapeshot
        regex = /^this reloads 1 ammo\.?/i;
        match = text.match(regex);
        if(match) {
            return () => {
                this.gain(1,'ammo');
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
            if(this.board.items.length>0) {
                for(let i=this.board.items.indexOf(this);i<this.board.items.length;i++) {
                    this.board.items[i].gain(gainAmount,whatToGain.toLowerCase());
                }
            }
            return () => {};
        }
        //The weapon to the right of this has (+15%/+20%/+25%) Crit Chance. from Custom Scope
        regex = /^\s*The weapon to the right of this has (\([^)]+\)|\+?(\d+)%?) Crit Chance\.?/i;
        match = text.match(regex);
        if(match) {
            const gainAmount = getRarityValue(match[1], this.rarity);
            const rightItem = this.getItemToTheRight();
            if(rightItem&&rightItem.tags.includes("Weapon")) {
                rightItem.gain(gainAmount,'crit');
            }
            return () => {};
        }
        //Heal to full.
        regex = /^\s*Heal to full\.?/i;
        match = text.match(regex);
        if(match) {
            return () => {
                this.applyHeal({amount:this.board.player.maxHealth-this.board.player.health, source:this});
            }
        }

        //This has +1 Multicast for each adjacent Property.
        //For each adjacent Vehicle, this has +1 Multicast. from Sirens
        regex = /^\s*(?:This has \+1 Multicast for each adjacent ([\w]+)(?: or ([\w]+))?|For each adjacent ([\w]+)(?: or ([\w]+))?, this has \+1 Multicast)\.?/i;
        match = text.match(regex);
        if(match) {
            const [_,tag1,tag2,tag3,tag4] = match;
            const tagsToMatch = [Item.getTagFromText(tag1),Item.getTagFromText(tag2),Item.getTagFromText(tag3),Item.getTagFromText(tag4)];
            this.adjacentItems.forEach(item => {
                if(tagsToMatch.some(tag=>tag&&item.tags.includes(tag))) {
                    this.gain(1,'multicast');
                }
            });
            return () => {};
        }
        //This has +1 Multicast. (from shiny)
        regex = /^\s*(?:This has )?(\([^\)]+\)|\+?\d+) Multicast\.?$/i;
        match = text.match(regex);
        if(match) {
            this.gain(getRarityValue(match[1], this.rarity),'multicast');
            return () => {};
        }

        //Multicast 2
        regex = /^Multicast (\([^\)]+\)|\+?\d+)\.?$/i;
        match = text.match(regex);
        if(match) {
            const multicast = getRarityValue(match[1], this.rarity);
            this.gain(multicast-1,'multicast');
            return () => {};
        }
        //Adjacent Toys have +1 Multicast.
        regex = /^\s*Adjacent ([^\s]+)s? have \+1 Multicast\.?/i;
        match = text.match(regex);
        if(match) {
            const tagToMatch = Item.getTagFromText(match[1]);
            this.adjacentItems.forEach(item => {
                if(item.tags.includes(tagToMatch)) {
                    item.gain(1,'multicast');
                }
            });
            return () => {};
        }

        //charge it ( 1 » 2 ) second(s). Belleista, Solar Farm, etc
        regex = /^\s*charge (it|this)(?: for)? (\([^)]+\)|\d+) second\(?s?\)?\.?(?: and (.*))?/i;
        match = text.match(regex);
        if(match) {
            const it = match[1]=='it';
            this.charge = getRarityValue(match[2], this.rarity);
            const andFunction = match[3]?this.getTriggerFunctionFromText(match[3]):null;
            
            return (item) => {
                this.applyChargeTo(it?item:this);
                if(andFunction) andFunction(item||this);
            };
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
        //Your non-weapon items' cooldowns are decreased by (1/2) second(s). from Library
        regex = /^\s*Your non-([^\s]+) items' cooldowns are decreased by (\([^)]+\)|\d+) second\(?s\)?\.?/i;
        match = text.match(regex);
        if(match) {
            const tag = Item.getTagFromText(match[1]);
            const cooldownDecrease = getRarityValue(match[2], this.rarity);
            this.board.items.forEach(item => {
                if(!item.tags.includes(tag)) {
                    item.gain(-cooldownDecrease*1000,'cooldown');
                }
            });
            return () => {};
        }
        //ALL Weapon cooldowns are increased by (+1/+2) second(s). from Library 
        regex = /^\s*ALL ([^\s]+) cooldowns are increased by (\([^)]+\)|\d+) second\(?s\)?\.?/i;
        match = text.match(regex);
        if(match) {
            const tag = Item.getTagFromText(match[1]);
            const cooldownIncrease = getRarityValue(match[2], this.rarity);
            [...this.board.items,...this.board.player.hostileTarget.board.items].forEach(item => {
                if(item.tags.includes(tag)) {
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
                this.log(this.name + " reduced " + leftmostItem.name + " cooldown by " + cooldownReduction + "%");
            };
        }

        //This has +1 Multicast for each of its Types.
        regex = /^\s*This has \+1 Multicast for each of its Types\.?/i;
        match = text.match(regex);
        if(match) {
            this.gain(this.tags.filter(t=>Board.uniqueTypeTags.includes(t)).length,'multicast');
            return () => {};
        }

        //This has +1 Multicast for each Property you have.
        regex = /^\s*This has (\([^\)]+\)|\+?\d+) (Multicast|Max Ammo) for each (other )?([^\s^\.]+)(?: item)? you have(?: in play)?(?: with ([^\s]+) over (\([^\)]+\)|\d+))?\.?$/i;
        match = text.match(regex);
        if(match) {
            const tagToMatch = Item.getTagFromText(match[4]);
            const other = match[3] ? true : false;
            const amount = getRarityValue(match[1], this.rarity);
            const overCheckThing = match[5] ? match[5].toLowerCase() : null;
            const overCheckAmount = match[6] ? getRarityValue(match[6], this.rarity) : null;
            let f;

            if(match[2] == "Multicast") {
                f = (i) => {                    
                    if(overCheckThing) {
                        let gained=0;
                        if(i[overCheckThing] > overCheckAmount) {
                            this.gain(amount,'multicast',i);
                            gained=true;
                        }
                        i[overCheckThing+"Changed"]((newValue)=>{
                            if(newValue>overCheckAmount&&!gained) {
                                this.gain(amount,'multicast');
                                gained=true;
                            } else if(newValue<=overCheckAmount&&gained) {
                                this.gain(-amount,'multicast');
                                gained=false;
                            }
                        });
                    } else {
                        this.gain(amount,'multicast',i);
                    }

                }
            } else {
                f = (i) => this.gain(amount,'maxAmmo',i);
            }
            this.board.items.filter(item => {
                if(other && item.id == this.id) return false;
                if(tagToMatch=='Item' || item.tags.includes(tagToMatch)) return true;
                return false;
            }).forEach(f);
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
        regex = /^\s*Your other tools have their cooldowns reduced by (\([^)]+\)|\d+%?)\s*\.?$/i;
        match = text.match(regex);
        if(match) {
            const cooldownReduction = getRarityValue(match[1], this.rarity);
            this.board.items.forEach(item => {
                if(item.id != this.id && item.tags.includes("Tool")) {
                    item.gain(-item.cooldown * (cooldownReduction/100),'cooldown');
                }
            });
            return () => {};
        }

        //Slow all your opponent's items for (  3  » 5  » 7   ) second(s).
        regex = /^\s*Slow all your opponent's items for (\([^)]+\)|\d+) second\(?s?\)?\.?$/i;
        match = text.match(regex);
        if(match) {
            this.slow+=getRarityValue(match[1], this.rarity);
            return () => {
                this.board.player.hostileTarget.board.items.forEach(item => {   
                    this.applySlowTo(item);
                });
            };
        }
        
        //You have ( +1 » +2 » +3 ) Regeneration
        regex = /^\s*You have (\([^)]+\)|\d+) Regen(?:eration)?\.?/i;
        match = text.match(regex);
        if(match) {
            const regeneration = getRarityValue(match[1], this.rarity);
            this.board.player.regen += regeneration;
            this.board.updateHealthElement();
            return () => {};
        }

        //Poison equal to your Regeneration.
        regex = /^\s*(Poison|Burn|Shield) equal to your Regen(?:eration)?\.?/i;
        match = text.match(regex);
        if(match) {            
            const whatToGain = match[1].toLowerCase();
            const whatToGainTag = Item.getTagFromText(match[1]);
            this.gain(this.board.player.regen||0,whatToGain);
            this.board.player.regenChanged((newValue,oldValue)=>{
                this.gain(newValue-oldValue,whatToGain);
            });
            return () => {
                this["apply"+whatToGainTag](this.board.player.regen||0);
            };
        }

        //Gain Regen(?:eration)? for the fight equal to this item's damage
        regex = /^\s*Gain (Shield|Regen(?:eration)?) (?:for the fight )?equal to this item's (damage|poison|burn)\.?/i;
        match = text.match(regex);
        if(match) {
            const whatToGain = match[1];
            const whatToGainTag = match[2].toLowerCase();
            this.gain(this[whatToGainTag],whatToGain);
            this[whatToGainTag+"Changed"]((newValue,oldValue)=>{
                this[whatToGain.toLowerCase()]+=newValue-oldValue;
            });
            return () => {
                this["apply"+whatToGain]();
            };
        }   

        //Heal equal to your opponent's Poison.
        regex = /^\s*(Heal|Burn|Shield|Poison) equal to your enemy's (Poison|Burn|Shield|Regen(?:eration)?)\.?/i;
        match = text.match(regex);
        if(match) {
            const whatToGain = match[1];
            const whatToGain2 = match[2].toLowerCase();
            this.board.player.hostileTarget[whatToGain2+"Changed"]((newValue,oldValue)=>{
                this.gain(newValue-oldValue,whatToGain.toLowerCase());
            });
            return () => {
                this["apply"+whatToGain]();
            };
        }

        //Charge your other non-weapon items ( 1 » 2 ) second(s).
        regex = /^\s*Charge your other non-weapon items (\([^)]+\)|\d+) second\(?s?\)?\.?$/i;
        match = text.match(regex);
        if(match) {
            this.charge =  getRarityValue(match[1], this.rarity);
           
            return () => {
                this.board.items.forEach(item => {
                    if(item.id != this.id && item.cooldown>0 && !item.tags.includes("Weapon")) {
                        this.applyChargeTo(item);
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
                    this.log(this.name + " increased " + targetItem.name + " cooldown by " + cooldownIncrease + " seconds");
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
                this.log(this.name + " gained " + dmgGain + " damage");
            };
        }*/

        //Your Lifesteal weapons have +100% Crit Chance. from Runic Great Axe
        regex = /^\s*Your Lifesteal weapons have \+?(\([^\)]+\)|\+?\d+%?) Crit Chance\.?/i;
        match = text.match(regex);
        if(match) {
            const critChance = getRarityValue(match[1], this.rarity);
            this.board.items.forEach(item => {
                if(item.lifesteal && item.tags.includes("Weapon")) {
                    item.gain(critChance,'crit');
                }
                item.lifestealChanged((newValue,oldValue)=>{
                    if(!oldValue && newValue) {
                        item.gain(critChance,'crit');
                    } else if(oldValue && !newValue) {
                        item.gain(-critChance,'crit');
                    }
                });
            });
            return () => {};
        }

        //Your Lifesteal weapons have their cooldowns reduced by 1 second. from Crimson Dash
        regex = /^\s*Your Lifesteal weapons have their cooldowns reduced by 1 second\.?/i;
        match = text.match(regex);
        if(match) {
            this.board.items.forEach(item => {
                if((item.text.some(t=>t=="Lifesteal")||item.lifesteal) && item.tags.includes("Weapon")) {
                    item.gain(-1000,'cooldown');
                }
                item.lifestealChanged((newValue,oldValue)=>{
                    if(!oldValue && newValue) {
                        item.gain(-1000,'cooldown');
                    } else if(oldValue && !newValue) {
                        item.gain(1000,'cooldown');
                    }
                });
            });
            return () => {};
        }   
        
        //Give the weapon to the left of this ( +10 » +20 » +30 ) damage for the fight
        regex = /^(?:Give )?the weapon to the left of this(?: gains)? (\([^)]+\)|\+\d+) damage for the fight\.?/i;
        match = text.match(regex);
        if(match) {
            const dmgGain = getRarityValue(match[1], this.rarity);
            const leftItem = this.getItemToTheLeft();
            return () => {
                if(leftItem) {
                    leftItem.damage += dmgGain;
                    this.log(this.name+" gave " + leftItem.name + " " + dmgGain + " damage");
                }
            }
        }
        
        //Your other Slow items have +1 Slow.
        regex = /^Your other ([^\s]+) items have (\([^\)]+\)|\+\d+) (Slow|Haste|Shield|Burn|Poison|Heal)\.?/i;
        match = text.match(regex);
        if(match) {
            const value = getRarityValue(match[2], this.rarity);
            this.board.items.forEach(item => {
                if(item.id == this.id) return;
                if(item.tags.includes(match[1])) {
                    switch(match[3]) {
                        case "Slow":    
                            item.slowBonus += value;
                            break;
                        case "Haste":
                            item.hasteBonus += value;
                            break;                            
                        default:
                            item.gain(value,match[3].toLowerCase());
                    }
                }
            });

            return () => {};            
        }

        // You take ( 20% » 30% » 40% ) less damage.
        regex = /^\s*You take (\([^)]+\)|\d+) less damage\.?/i;
        match = text.match(regex);
        if(match) {
            const damageReduction = getRarityValue(match[1], this.rarity);
            this.board.player.damageReduction += damageReduction;
            return () => {};
        }

        //Freeze 1 small? item for ( 1 » 2 ) second(s)
        regex = /^\s*Freeze (?:(\([^)]+\)|\d+)|an|a) ([^\s]+)?(?: or ([^\s]+))?\s*item\(?s?\)?\s+(?:with a cooldown of (\d+) seconds or less )?(?:for )?(\([^)]+\)|[\d\.]+)\s+second\(?s?\)?\.?/i;
        match = text.match(regex);        
        if(match) {
            this.freeze += getRarityValue(match[5], this.rarity);
            const cdrRequirement = match[4] ? parseInt(match[4]) : null;
            const tagToMatch = match[2] ? Item.getTagFromText(match[2]) : null;
            const tagToMatch2 = match[3] ? Item.getTagFromText(match[3]) : null;
            let numToFreeze = match[1] ? getRarityValue(match[1], this.rarity) : 1;
            return () => {
                let itemsToFreeze = this.board.player.hostileTarget.board.activeItems;
                if(cdrRequirement) {
                    itemsToFreeze = itemsToFreeze.filter(item => item.cooldown>0 && item.cooldown<=cdrRequirement*1000);
                }
                if(tagToMatch) {
                    itemsToFreeze = itemsToFreeze.filter(item => 
                        item.tags.includes(tagToMatch) || 
                        (tagToMatch2 && item.tags.includes(tagToMatch2))
                    );
                }
                itemsToFreeze = itemsToFreeze.filter(item => item.isFreezeTargetable());
                const numToFreezeNow = Math.min(numToFreeze, itemsToFreeze.length);
                for(let i=0;i<numToFreezeNow;i++) {
                    const itemToFreeze = this.pickRandom(itemsToFreeze);
                    if(itemToFreeze) this.applyFreezeTo(itemToFreeze);
                    else {
                        this.log(this.name + " tried to freeze " + numToFreezeNow + " item(s) but there were no items to freeze");
                    }
                }

            };
        }
        //items adjacent to it gain (  3%  » 6%  » 9%   ) Crit chance.
        regex = /^items adjacent to it gain (?:\(([^)]+)\)|\+?(\d+)%?) ([^\s]+)(?: chance)?/i;
        match = text.match(regex);
        if(match) {
            const gainAmount = parseInt(match[1] ? getRarityValue(match[1], this.rarity) : match[2]);
            const gainType = match[3].toLowerCase();
            return (item)=>{
                item.adjacentItems.forEach(i => i.gain(gainAmount,gainType));
            };
        }

        //Adjacent items have ( +15% » +30% » +50% ) Crit Chance. from Sextant
        //Adjacent items have ( +3% » +6% » +9% » +12% ) Crit chance
        regex = /^Adjacent items have (?:\(([^)]+)\)|\+?(\d+)%?) Crit chance\.?/i;
        match = text.match(regex);
        if(match) {
            const critGain = parseInt(match[1] ? getRarityValue(match[1], this.rarity) : match[2]);
            this.adjacentItems.forEach(item => {
                item.gain(critGain,'crit');
            });
            return ()=>{};
        }
        //it also gains ( 5% » 10% » 15% » 20% ) Crit Chance for the fight. from Hakurvian Launche
        regex = /^it also gains (\([^)]+\)|\d+) Crit Chance for the fight\.?$/i;
        match = text.match(regex);
        if(match) {
            const critGain = getRarityValue(match[1], this.rarity);
            return (item)=>{
                if(item) {
                    item.gain(critGain,'crit');
                } else { 
                    this.gain(critGain,'crit');
                }
            };
        }
        //Adjacent Weapons have ( +5 » +10 » +20 » +40 ) damage. from Exoskeleton 
        regex = /^Adjacent (.+)?(?: item)?s have (\([^)]+\)|\+?\d+) damage\.?$/i;
        match = text.match(regex);
        if(match) {
            const tagToMatch = match[1].toLowerCase();
            const damageGain = getRarityValue(match[2], this.rarity);
            this.adjacentItems.forEach(item => {
                if(tagToMatch=='item'||item.tags.includes(Item.getTagFromText(tagToMatch))) {
                    item.gain(damageGain,'damage');
                }
            });
            return ()=>{};
        }

        //Adjacent Vehicles have their cooldowns reduced by ( 5% » 10% » 15% » 20% ). from Fuel Rod
        //Adjacent items have their cooldown reduced by ( 10% » 15% » 20% » 25% ).
        regex = /^Adjacent (.+)?(?: item)?s have their cooldowns? reduced by (\([^)]+\)|\d+%)\.?$/i;
        match = text.match(regex);
        if(match) {
            const cooldownReduction = getRarityValue(match[2], this.rarity);
            const tagToMatch = match[1].toLowerCase();
            this.adjacentItems.forEach(item => {
                if(tagToMatch=='item'||item.tags.includes(Item.getTagFromText(tagToMatch))) {
                    item.gain((item.cooldown*(100-cooldownReduction)/100)-item.cooldown,'cooldown');
                }
            });
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

        //If both adjacent items are food, this has +1 Multicast. from Skillet
        regex = /^If both adjacent items are ([^\s]+), (.*)$/i;
        match = text.match(regex);
        if(match) {
            const tagToMatch = Item.getTagFromText(match[1]);
            const adjacentItems = this.adjacentItems;
            if(adjacentItems.length==2 && adjacentItems.every(item => item.tags.includes(tagToMatch))) {
                this.setupTextFunctions(match[2]);
            }
            return () => {};
        }

        //Your Heal items gain Heal equal to your weakest Heal item's Heal for the fight. from Spices 
        //Your Poison items gain Poison equal to your weakest Poison item's Poison for the fight. from Spices
         //Your weapons gain damage equal to your weakest weapon's damage for the fight. [0]
         regex = /^Your ([^\s]+)(?: item)?s gain ([^\s]+) equal to your weakest ([^\s]+)(?: item)?'s ([^\s]+) for the fight.*?$/i;
         match = text.match(regex);
         if(match) {
            const tagGaining = Item.getTagFromText(match[1]);
            const whatGaining = match[2].toLowerCase();
            const tagToMatch = Item.getTagFromText(match[3]);
            const whatToCheck = match[4];
            return () => {                
                const weakestSomething = this.board.activeItems
                .filter(item => item.tags.includes(tagToMatch) &&  item[whatToCheck.toLowerCase()]>0)
                .reduce((min, item) => Math.min(min, item[whatToCheck.toLowerCase()]), Infinity);
                if(weakestSomething==Infinity) { return; }
                this.board.activeItems.forEach(item => {
                    if(item.tags.includes(tagGaining)) {
                        item.gain(weakestSomething,whatGaining.toLowerCase());
                    }
                });
            }
         }
        //Charge all items to the right of this 1 second(s).
        regex = /^Charge all items to the right of this (?:\(([^)]+)\)|(\d+)) second\(?s?\)?\.?/i;
        match = text.match(regex);
        if(match) {
            this.charge = match[1] ? getRarityValue(match[1], this.rarity) : parseInt(match[2]);
            return () => {
                this.board.items.filter(item => item.startIndex>this.startIndex).forEach(item => {
                    this.applyChargeTo(item);
                });
            };
        }
        //Charge adjacent Small items ( 1 » 2 » 3 » 4 ) second(s).
        regex = /^Charge adjacent\s*([^\s]+)? items (?:\(([^)]+)\)|(\d+)) second\(?s?\)?\.?/i;
        match = text.match(regex);
        if(match) {
            this.charge = match[2] ? getRarityValue(match[2], this.rarity) : parseInt(match[3]);
            const tagToMatch = Item.getTagFromText(match[1]);            
            return () => {
                const itemsToCharge = tagToMatch ? this.adjacentItems.filter(item => item.tags.includes(tagToMatch)) : this.adjacentItems;
                itemsToCharge.forEach(item => {
                    if(item.cooldown>0) {
                        this.applyChargeTo(item);
                    }
                });
            };


        }

        //Burn items to the right of this gain ( 1 » 2 » 3 » 4 ) Burn for the fight

        regex = /^(This and )?(?:the )?([^\s]+)(?: item)?s? to the right of this gains? (\([^)]+\)|\+?\d+) ([^\s]+).*/i;
        match = text.match(regex);

        if(match) {
            const thisAnd = match[1] ? true : false;
            const tagToMatch = Item.getTagFromText(match[2]);
            const gainAmount = getRarityValue(match[3], this.rarity);
            const whatToGain = match[4].toLowerCase();
            return () => {
                if(thisAnd) {
                    this.gain(gainAmount,whatToGain,this);
                }
                this.board.items.filter(item => item.startIndex>this.startIndex && item.tags.includes(tagToMatch)).forEach(item => {
                    item.gain(gainAmount,whatToGain,this);
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
                    this.log(this.name + " gave " + item.name + " " + gainAmount + " " + match[4]);
                });
            };
        }

        //For each adjacent Aquatic item, reduce this item's cooldown by 1 second.
        regex = /^For each adjacent ([^\s]+)(?: item)?(?: or ([^\s]+))?, (.*)$/i;
        match = text.match(regex);
        if(match) {
            const tagToMatch = Item.getTagFromText(match[1]);
            const tagToMatch2 = Item.getTagFromText(match[2]);
            const functionToRun = this.getTriggerFunctionFromText(match[3]);
            this.adjacentItems.forEach(item => {
                if(item.tags.includes(tagToMatch) || item.tags.includes(tagToMatch2)) {
                    functionToRun(this);
                }
            });
            return ()=>{};
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
                this.log(this.name + " gained " + item.value + " Shield");
            };
        }
        //This has double damage.
        regex = /^\s*This (?:has|deals) double (damage|poison|burn|shield|heal|ammo|charge|regen)\.?$/i;
        match = text.match(regex);
        if(match) {
            let whatToGain = match[1].toLowerCase();
            if(whatToGain=="ammo") {
                whatToGain = "maxAmmo";
            }
            this[whatToGain+"pauseChanged"] = true;
            const oldMultiplier = this[whatToGain+"_multiplier"];
            this[whatToGain+"_multiplier"] =1;
            this.gain(this[whatToGain],whatToGain);
            this[whatToGain+"pauseChanged"] = false;
            this[whatToGain+"_multiplier"] = oldMultiplier*2;

            return ()=>{};
        }
        //Double this item's damage for the fight. from Atlas Stone
        regex = /^\s*Double this item's damage for the fight\.?$/i;
        match = text.match(regex);
        if(match) {
            return () => {
               this.gain(this.damage,'damage');
            }
        }
        //Your items have 100% less crit chance. from Building Crescendo
        regex = /^\s*Your items have 100% less crit chance\.?$/i;
        match = text.match(regex);
        if(match) {
            this.board.items.forEach(item => {
                item.crit=0;
                item.crit_multiplier = 0;
                
            });
            this.board.startOfFightTriggers.set(this.id,() => {
                this.board.items.forEach(item => {
                    item.crit_multiplier = 1;
                });
            });
            return () => {};
        }
        //Cleanse half your Burn and Poison
        regex = /^\s*Cleanse half your Burn and Poison\.?$/i;
        match = text.match(regex);
        if(match) {
            return () => {
                if(this.board.player.burn>0) this.board.player.burn /= 2;
                if(this.board.player.poison>0) this.board.player.poison /= 2;
                this.log(this.name + " cleansed half "+this.board.player.name+"'s Burn and Poison");
            }
        }
        //Cleanse half your Burn.
        regex = /^\s*Cleanse half your Burn\.?$/i;
        match = text.match(regex);
        if(match) {
            return () => {
                this.board.player.burn /= 2;
                this.log(this.name + " cleansed half "+this.board.player.name+"'s Burn");
            }
        }
        //Heal for 30% of your Max Health and Cleanse half your Burn and Poison. from Healthy Heart
        regex = /^\s*Heal for 30% of your Max Health\.?$/i;
        match = text.match(regex);
        if(match) {
            return () => {
                const healAmount = this.board.player.maxHealth*0.3;
                this.applyHeal({amount:healAmount, source:this});
            }
        }
       
        //reload 2 Ammo
        regex = /^\s*reload (\d+) Ammo/i;
        match = text.match(regex);
        if(match) {
            return (item) => {
                this.gain(parseInt(match[1]),'ammo',item||this);
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
        regex = /^\s*Use a Core\.?$/i;
        match = text.match(regex);
        if(match) {
            return () => {
                const coreItems = this.board.activeItems.filter(item=>item.tags.includes("Core"));
                const coreItem = this.pickRandom(coreItems);
                if(coreItem) {
                    coreItem.trigger();
                }
            }
        }
        //Haste the Core for 2 second(s). from Letting off Steam
        regex = /^\s*Haste the Core for (\([^)]+\)|\d+) second\(?s?\)\.?$/i;
        match = text.match(regex);
        if(match) {
            this.haste += getRarityValue(match[1], this.rarity);
            return (i) => {
                this.board.items.forEach(item=>{
                    if(item.tags.includes("Core")) {
                        if(i) {
                            i.applyHasteTo(item);
                        } else {
                            this.applyHasteTo(item);
                        }
                    }
                });
            }
        }

        //this gains ( 1 » 2 » 3 » 4 ) (tag)
        regex = /^\s*this (?:permanently )?gains (\([^)]+\)|\d+) ([^\s^\.]+)(?: and (\([^)]+\)|\d+) ([^\s^\.]+))?(?: for the fight)?\.?$/i;
        match = text.match(regex);
        if(match) {
            const isPercentageBased = match[1].includes("%");
            const gainAmount = getRarityValue(match[1].replace("%",""), this.rarity);            
            const whatToGain = match[2].toLowerCase();
            const whatToGain2 = match[4] ? match[4].toLowerCase() : null;
            const gainAmount2 = getRarityValue(match[3],this.rarity);
            if(isPercentageBased) {
                return (i) => {
                    this.gain(this[whatToGain]*gainAmount/100,whatToGain,i||this);
                    if(whatToGain2) {
                        this.gain(gainAmount2,whatToGain2,i||this);
                    }
                }
            } else {
                return (i) => {
                    this.gain(gainAmount,whatToGain,i||this);
                    if(whatToGain2) {
                        this.gain(gainAmount2,whatToGain2,i||this);
                    }
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
        regex = /^your (non-)?([^\s]+)(?:s)? (?:items)?\s*have (\([^\)]+\)|\+?\d+%?) ([^\s]+)\s*(?:chance)?\s*(?:(?:for each|per) ([^\s]+|unique type) (?:item )?you have)?\.$/i;
        match = text.match(regex);

        if(match) {
            const non = match[1];
            const tagToMatch = Item.getTagFromText(match[2]);
            const gainAmount = parseInt(getRarityValue(match[3], this.rarity));
            const whatToGain = match[4].toLowerCase();
            let multiplier = 1;
            if(match[4]=="unique type") {                
                multiplier = this.board.uniqueTypes;
            } else if(match[5]) {
                multiplier = this.board.items.filter(item=>item.tags.includes(Item.getTagFromText(match[5]))).length;
            }
            this.board.items.forEach(item => {
                if(tagToMatch=='Item' || non?(!item.tags.includes(tagToMatch)):item.tags.includes(tagToMatch)) {
                    item.gain(gainAmount*multiplier,whatToGain);
                }
            });
            return ()=>{};
        }
        //Your leftmost item with Ammo has (  +1  » +2  » +3  » +4   ) Max Ammo.
        regex = /^Your leftmost (?:item with Ammo|Ammo item) has (?:\(([^)]+)\)|(\d+)) Max Ammo\.?$/i;
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
        // (deal)? (anyWord) equal to ( 1 » 2 » 3 ) times your gold.
        regex = /^(?:deal )?([^ ]+) equal to (\([^)]+\)|\d+)(?: times)? your gold\.?$/i;
        match = text.match(regex);
        if(match) {
            const tag = Item.getTagFromText(match[1]);
            const multiplier = getRarityValue(match[2], this.rarity);
            this.board.player.goldChanged((newValue, oldValue)=>{
                this.gain(multiplier*(newValue-oldValue), tag);
            });
            this.gain(this.board.player.gold * multiplier, tag);
            return () => {
                this['apply'+tag](this[tag.toLowerCase()]);
            };
        }
        //Your weapons have + damage equal to this item's value. from Lockbox
        regex = /^Your ([^\s]+)s?(?: items)? have \+?\s?(damage|shield) equal to this item's value\.?$/i;
        match = text.match(regex);
        if(match) {
            const tag = Item.getTagFromText(match[1]);
            const whatToGain = match[2].toLowerCase();
            this.board.items.forEach(item => {
                if(item.tags.includes(tag)) {
                    item.gain(this.value,whatToGain);
                }
            });
            this.valueChanged((newvalue,oldvalue) => {
                this.board.items.forEach(item => {
                    if(item.tags.includes(tag)) {
                        item.gain(newvalue-oldvalue,whatToGain);
                    }
                });
            });
            return ()=>{};
        }
        //Your Weapons have double Crit damage.
        regex = /^Your Weapons have double Crit damage\.?$/i;
        match = text.match(regex);
        if(match) {
            const items = this.board.items.filter(item => item.tags.includes("Weapon"));
            items.forEach(item => {
                item.gain(item.critMultiplier,'critMultiplier');
            });
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
        
        //Your leftmost Weapon deals (  +20  » +30  » +40  » +50   ) Damage.
        //Your leftmost Poison item has (  +3  » +6  » +9  » +12   ) Poison.
        regex = /^Your (leftmost|rightmost) ([^\s]+)(?: item)? (?:has|deals|gains)\s*\+?(\([^)]+\)|\d+)\s*([^\s^\.]+)\.?.*/i;
        match = text.match(regex);
        if(match) {
            const gainAmount = getRarityValue(match[3], this.rarity);
            const tagToMatch = match[2]=="item" ? null:Item.getTagFromText(match[2]);
            const whatToGain = match[4].toLowerCase();
            let itemGained = null;

            let f = (itemDestroyed) => {
                let matchingItems = tagToMatch?this.board.activeItems.filter(item => item.tags.includes(tagToMatch)):this.board.items;                
                switch(whatToGain) 
                {
                    case "crit":
                        matchingItems = matchingItems.filter(item => Item.allowedGainMap['crit'].some(tag => item.tags.includes(tag)));
                    break;                    
                }
                let matchingItem = match[1] == "leftmost" ?matchingItems[0]:matchingItems[matchingItems.length-1];
                if(matchingItem && matchingItem!=itemGained) {
                    if(itemDestroyed != itemGained) {
                        itemGained.gain(-gainAmount, whatToGain);
                    }
                    matchingItem.gain(gainAmount, whatToGain);
                    itemGained = matchingItem;
                }
            }
            f(null);
            this.board.itemDestroyedTriggers.set(this.id,f);

            return ()=>{};
        }

        //This has double value gain.
        regex = /^(?:This has )?double value(?: gain)?\.?$/i;
        match = text.match(regex);
        if(match) {
            this.value_multiplier+=1;
            return ()=>{};
        }
        //...and Enchant the item with
        regex = /^\.\.\.and Enchant.*$/i;
        match = text.match(regex);
        if(match) {
            return () => {
                console.log("Not currently parsing: " + text);
            };
        }

        //This has double
        regex = /^This has double (.*) bonus\.?$/i;
        match = text.match(regex);
        if(match) {            
         return () => {
            console.log("Not currently parsing: " + text);
         };
        }

        //This has double Haste duration.
        regex = /^This has double (Haste|Slow|Freeze) duration\.?$/i;
        match = text.match(regex);
        if(match) {
            const whatToGain = Item.getTagFromText(match[1]);
            this["hasDouble"+whatToGain+"Duration"] = true;
            return ()=>{};
        }       


        //Reload an adjacent item. from Retool
        regex = /^Reload an( adjacent)? item\.?$/i;
        match = text.match(regex);
        if(match) {
            return (item)=>{
                let matchingItems = [];
                if(match[1]) {
                    matchingItems = (item||this).adjacentItems;
                } else {
                    matchingItems = this.board.items;
                }
                matchingItems = matchingItems.filter(i=>i.tags.includes("Ammo"));

                if(matchingItems.length>0) {
                    const randomItem = this.pickRandom(matchingItems);
                    randomItem.gain(randomItem.maxAmmo-randomItem.ammo,'ammo',this);
                }
            }
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
        //For each adjacent Tool or Food item, this gains +1 Multicast. from Butter
        regex = /^For each adjacent ([^\s]+) or ([^\s]+) item, this gains \+1 Multicast\.?$/i;
        match = text.match(regex);
        if(match) {
            const tagToMatch = Item.getTagFromText(match[1]);
            const tagToMatch2 = Item.getTagFromText(match[2]);
            
            const adjacentItems = this.adjacentItems;
            const toolOrFoodItems = adjacentItems.filter(item => item.tags.includes(tagToMatch) || item.tags.includes(tagToMatch2));
            this.gain(toolOrFoodItems.length,'multicast');
            this.board.itemDestroyedTriggers.set(this.id,(item)=>{
                if(adjacentItems.includes(item)) {
                    if(item.tags.includes(tagToMatch) || item.tags.includes(tagToMatch2)) {
                        this.gain(-1,'multicast');
                    }
                }
            });
            return ()=>{};
        }

        //a random Potion gains +1 Multicast for the fight. from Brewmaster
        regex = /^a random Potion gains \+1 Multicast for the fight\.?$/i;
        match = text.match(regex);
        if(match) {
            return ()=>{
                const potions = this.board.activeItems.filter(item => item.tags.includes("Potion"));
                if(potions.length>0) {
                    const randomPotion = this.pickRandom(potions);
                    randomPotion.gain(1,'multicast');
                }
            }
        }

        //your other items gain Value equal to this item's Value for the fight.
        regex = /^your other items (?:gain|get) Value equal to this item's Value for the fight\.?$/i;
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
 
        //Weapons adjacent to it gain (+3/+6/+9) damage for the fight. from The Best Defense
        regex = /^Weapons adjacent to it gain \(([^)]+)\) damage for the fight\.?$/i;
        match = text.match(regex);
        if(match) {
            const gainAmount = getRarityValue(match[1], this.rarity);
            return (item)=>{
                (item||this).adjacentItems.forEach(item => {
                    if(item.tags.includes("Weapon")) {  
                        item.gain(gainAmount,'damage',this);
                    }
                });
            };
        }


        //double your enemy's Poison. from Biohazard
        regex = /^double your enemy's Poison\.?$/i;
        match = text.match(regex);
        if(match) {            
            return ()=>{
                const oldPoison = this.board.player.hostileTarget.poison;
                this.board.player.hostileTarget.poison *= 2;
                this.log(this.name + " doubled enemy's Poison from " + oldPoison + " to " + this.board.player.hostileTarget.poison);
            };
        }
        

        //Your weapons gain Damage equal to this item's value for the fight.
        regex = /^Your weapons gain Damage equal to this item's value for the fight\.?$/i;
        match = text.match(regex);

        if(match) {
            return ()=>{
                this.board.items.forEach(item => {
                    if(item.tags.includes("Weapon")) {  
                        item.gain(this.value,'damage',this);
                    }
                });
            };
        }
        //Freeze ALL other items for 4 seconds. from Private Hot Springs
        regex = /^Freeze ALL other items for (\d+) seconds\.?$/i;
        match = text.match(regex);
        if(match) {
            this.freeze += parseInt(match[1]);
            return ()=>{
                this.board.items.forEach(item => {
                    if(item.id!=this.id) {
                       this.applyFreezeTo(item);
                    }
                });
                this.board.player.hostileTarget.board.items.forEach(item => {
                       this.applyFreezeTo(item);
                });
            }
        }

        //This has the Types of items you have. from Beast of Burden
        regex = /^This has the Types of items you have\.?$/i;
        match = text.match(regex);
        if(match) {
            this.tags.push( ...this.board.uniqueTypeTags.filter(type => !this.tags.includes(type)) );
            return ()=>{};
        }              


        //Freeze all non-weapon items for (  2  » 3   ) second(s).
        regex = /^Freeze all non-weapon items for (?:\(([^)]+)\)|(\d+)) second\(?s?\)?\.?$/i;
        match = text.match(regex);
        if(match) {
            this.freeze += parseFloat(match[1] ? getRarityValue(match[1], this.rarity) : match[2]);
            return ()=>{
                this.board.items.forEach(item => {
                    if(!item.tags.includes("Weapon")) {
                        this.applyFreezeTo(item);
                    }
                });
                this.board.player.hostileTarget.board.items.forEach(item => {
                    if(!item.tags.includes("Weapon")) {
                        this.applyFreezeTo(item);
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
        
    //Reload (2/4/6/8) items. from Panic
    regex = /^Reload (\([^)]+\)|\d+) items\.?$/i;
    match = text.match(regex);
    if(match) {
        const reloadAmount = getRarityValue(match[1], this.rarity);
        return (item) => {
            const targets = this.pickRandom(this.board.activeItems.filter(i=>i.tags.includes("Ammo")),reloadAmount);
            targets.forEach(target => {
                target.reload(item||this);
            });
        }
    }
    //double all your items' Crit Chance for the fight. from Focused Rage
    regex = /^double all your items' Crit Chance for the fight\.?$/i;
    match = text.match(regex);
    if(match) {
        return ()=>{
            this.board.items.forEach(item => {
                item.gain(item.crit,'crit');
            });
        }
    }
    //Reload another item 1 ammo. from Flashy Reload
    regex = /^Reload another item (\d+) ammo\.?$/i;
    match = text.match(regex);
    if(match) {
        const amount = parseInt(match[1]);
        return (item)=>{            
            const targets = this.pickRandom(this.board.activeItems.filter(i=>i.tags.includes("Ammo")),amount);
            targets.forEach(target => {
                target.reload(item||this);
            });
        }
    }
    //your Heal and Regeneration items have their cooldowns reduced by (5%/10%/15%). from Rapid Relief
    //your Weapons have their cooldowns reduced by (  5%  » 10%  » 20%   ).
    //Your Potions have their cooldowns reduced by 1 second. from Alchemical Precision
    regex = /^your ([^\s]+)s?(?: and ([^\s]+))?(?: items)? have their cooldowns reduced by (\([^)]+\)|(\d+)%?)( seconds?)?\.$/i;    
    match = text.match(regex);
    if(match) {
        const tagToMatch = Item.getTagFromText(match[1]);
        const tagToMatch2 = Item.getTagFromText(match[2]);
        const isSeconds = match[4] ? true : false;
        const cooldownReduction = getRarityValue(match[3], this.rarity);
        this.board.items.forEach(item => {
            if(item.tags.includes(tagToMatch) || (tagToMatch2 && item.tags.includes(tagToMatch2))) {
                if(isSeconds) {
                    item.gain(-cooldownReduction*1000,'cooldown');
                } else {
                    item.gain(-item.cooldown * cooldownReduction/100, "cooldown");
                }
            }
        });
        return ()=>{};
    }

    //your items have their cooldowns reduced by 50% for the fight. from Reel 'Em In 
        regex = /^your items have their cooldowns reduced by (\([^)]+\)|\d+%?) for the fight\.?$/i;
        match = text.match(regex);
        if(match) {
            const cooldownReduction = getRarityValue(match[1], this.rarity);
            return ()=>{
                this.board.items.forEach(item => {
                    item.gain(-item.cooldown*(cooldownReduction/100),'cooldown');
                });
            }
        }


        //Your Medium Poison items have (+2/+4/+6/+8) Poison. from Standardized Toxins
        regex = /^Your (small|medium|large) ([^\s]+) items have \(([^)]+)\) ([^\.]+)\.?$/i;
        match = text.match(regex);
        if(match) {
            const size = Item.getTagFromText(match[1]);
            const tagToMatch = Item.getTagFromText(match[2]);
            const amount = getRarityValue(match[3], this.rarity);
            const whatToGain = match[4].toLowerCase();
            this.board.items.forEach(item => {
                if(item.tags.includes(tagToMatch) && item.tags.includes(size)) {
                    item.gain(amount,whatToGain);
                }
            });
            return ()=>{};
        }



        // If you have 5 or more unique Types, reduce this item's cooldown by 50%. from Rowboat
        regex = /^If you have 5 or more unique Types, reduce this item's cooldown by 50%\.?$/i;
        match = text.match(regex);
        if(match) {
            if(this.board.uniqueTypes>=5) {
                this.cooldown *= 0.5;
            }
            let removedCDR = false;
            this.board.itemDestroyedTriggers.set(this.id,()=>{
                if(this.board.uniqueTypes<5 && !removedCDR) {
                    this.cooldown *= 2;
                    removedCDR = true;
                }
            });
            return ()=>{};
        }

        //Lifesteal
        regex = /^Lifesteal\.?$/i;
        match = text.match(regex);
        if(match) {
            this.lifesteal = 100;
            return ()=>{};
        }
       
        //Your Weapons have + Damage equal to (  1x  » 2x  » 3x   ) your income.
        regex = /^Your ([^\s]+)(?: items)? have \+ ([^\s]+) equal to (\([^)]+\)|\d+)x? your income\.?$/i;
        match = text.match(regex);
        if(match) {
            const tagToMatch = Item.getTagFromText(match[1]);
            const whatToGain = match[2].toLowerCase();
            const gainAmount = getRarityValue(match[3], this.rarity) * this.board.player.income;
            this.board.items.forEach(item => {
                if(item.tags.includes(tagToMatch)) {
                    item.gain(gainAmount,whatToGain);
                }
            });
            return ()=>{};
        }
        //Adjacent Potions have +1 Ammo. from Tazidian Dagger
        regex = /^Adjacent ([^\s]+)s? have \+1 Ammo\.?$/i;
        match = text.match(regex);
        if(match) {
            const tagToMatch = Item.getTagFromText(match[1]);
            this.adjacentItems.forEach(item => {
                if(item.tags.includes(tagToMatch)) {
                    item.maxAmmo+=1;
                    item.ammo+=1;
                }
            });
            return ()=>{};
        }
        regex = /^(?:Reload )?a potion\.?$/i;
        match = text.match(regex);
        if(match) {
            return (item) => {
                const potions = this.board.activeItems.filter(item => item.tags.includes("Potion"));
                if(potions.length > 0) {
                    const randomPotion = this.pickRandom(potions);
                    randomPotion.reload(item||this);
                }
            };
        }
        //gain ( 2 » 4 ) Regen(?:eration)? for the fight.
        regex = /^gain (\([^)]+\)|\d+) Regen(?:eration)? for the fight\.?$/i;
        match = text.match(regex);
        if(match) {
            const gainAmount = getRarityValue(match[1], this.rarity);
            this.gain(gainAmount,'regen');
           return ()=>{
            this.applyRegeneration(this.regen);
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

        //You have (  2  » 4  » 6   ) Regen(?:eration)? for each item with Ammo you have.
        regex = /^You have (?:\(([^)]+)\)|(\d+)) Regen(?:eration)? for each ([^\s]+) item you have.*$/i;
        match = text.match(regex);
        if(match) {
            const regenToAdd = match[1] ? getRarityValue(match[1], this.rarity) : parseInt(match[2]);
            const itemCount = this.board.items.filter(item => item.tags.includes(Item.getTagFromText(match[3]))).length;
            this.board.player.gainRegen(regenToAdd * itemCount);
            this.board.updateHealthElement();
            this.log(this.name + " added " + regenToAdd * itemCount + " Regen");
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

        //the other adjacent item gains 25% Crit Chance.
        regex = /^the other adjacent item gains 25% Crit Chance\.?$/i;
        match = text.match(regex);
        if(match) {
            return (item) => {
                const otherAdjacentItem = this.adjacentItems.filter(i => i.id != item.id);
                if(otherAdjacentItem.length > 0) {
                    otherAdjacentItem[0].gain(25,'crit');
                }
            }
        }

        return null;
    }

    executeSpecificItemFunction() {
        const [strippedName] = Item.stripEnchantFromName(this.name);
        const f = ItemFunction.items.get(strippedName);
        if(f) { f(this); return true; }
        return false;
    }

    getCommaTriggerFunctionFromText(text) {      
        let regex = /^([^,]+), (?:and )?(.*)$/i;
        let match = text.match(regex);
        if(match) {
            const f1 = this.getTriggerFunctionFromText(match[1]+".");
            const f2 = this.getTriggerFunctionFromText(match[2]);
            return () => {
                f1();
                f2();
            }
        }
        regex = /^([^,]*?)(?:(?: and\s*|\. ))(.*)$/i;
        match = text.match(regex);
        if(match) {
            const f1 = this.getTriggerFunctionFromText(match[1]+".");
            const f2 = this.getTriggerFunctionFromText(match[2]);
            return () => {
                f1();
                f2();
            }
        }
        return null;
    }
    

    getTriggerFunctionFromText(text) {
        const f = TextMatcher.getTriggerFunctionFromText(text,this) ||
        this.getWeaponTriggerFunction(text) ||
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
        this.getCommaTriggerFunctionFromText(text) ||
        (() => { console.log("Could not parse "+ text+ " from "+this.name); return ()=>{};})();
        if(f) {
            f.text=text;
            return f;
        }
        return null;
    }
    static getTagFromText(text) {
        if (!text) return null;
        if(text.match(/Regeneration/i)) {
            return "Regen";
        }
        text = text.replace(/s$/, ''); // Remove trailing 's' if present
        return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
    }

    getUndoableFunctionFromText(text, comparisonFunction,checkComparison=true, item) {
        //reduce this item's cooldown by 50%
        let regex = /^reduce this item's cooldown by (\d+)%.*/i;
        let match = text.match(regex);
        let doIt,undoIt;
        let didIt = false;
        if(match) {
            const cooldownReduction = parseInt(match[1]);
            doIt = () => {
                this.cooldown *= (1-cooldownReduction/100);
            };
            undoIt = () => {
                this.cooldown /= (1-cooldownReduction/100);
            };
        }

        //its cooldown is reduced by (5%/10%/15%) from Temporal Strike
        regex = /^its cooldown is reduced by (\([^)]+\)|\d+)%?$/i; 
        match = text.match(regex);
        if(match) {
            const cooldownReduction = getRarityValue(match[1], this.rarity);
            let cooldownReducedBy = 0;
            doIt = (item) => {
                const oldCooldown = item.cooldown;
                cooldownReducedBy = cooldownReduction*oldCooldown/100;
                item.gain(-cooldownReducedBy,'cooldown');
                cooldownReducedBy = oldCooldown - item.cooldown;
            };
            undoIt = (item) => {
                item.gain(cooldownReducedBy,'cooldown');
                cooldownReducedBy = 0;
            };
        }
        
        //this has (+50%/+100%) Crit Chance. from Basilisk Fang
        regex = /^this has (\([^)]+\)|\d+)%? Crit Chance\.?$/i;
        match = text.match(regex);
        if(match) {
            const critChance = getRarityValue(match[1], this.rarity);
            doIt = () => {
                this.gain(critChance,'crit');
            }
            undoIt = () => {
                this.gain(-critChance,'crit');
            }
        }
        regex = /^\s*when you Crit with it charge a non-weapon item (\([^)]+\)|\d+) second\(s\)\.?$/i;
        match = text.match(regex);
        if(match) {
            this.charge = getRarityValue(match[1], this.rarity);
            doIt = (it) => {
                this.board.critTriggers.set(this.id+"undoablefunction",(i)=>{
                    if(i.id==it.target.id) {
                        this.applyChargeTo(this.pickRandom(this.board.items.filter(item => !item.tags.includes("Weapon") && item.cooldown>0)));
                    }
                });
            }
            undoIt = (it) => {
                this.board.critTriggers.delete(this.id+"undoablefunction");
            }
        }
        
        //your weapons have (  +5  » +10  » +20   ) damage.
        //your items have (  +5%  » +10%  » +20%   ) Crit Chance.
        regex = /^your ([^s]+)s?(?: items)? have (?:\(([^)]+)\)|\+?(\d+)%?) ([^\s^\.]+)\s*(?:Chance)?\.?$/i;
        match = text.match(regex);
        if(match) {
            const gainAmount = parseInt(match[2] ? getRarityValue(match[2], this.rarity) : match[3]);
            const whatToGain = match[4].toLowerCase();
            const whichItems = (match[1]&&match[1]!='item') ? this.board.items.filter(item => item.tags.includes(Item.getTagFromText(match[1]))) : this.board.items;
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

        //your Heal and Regeneration items have their cooldowns reduced by (5%/10%/15%). from Rapid Relief
        //Your Weapons' cooldowns are reduced by (5%/10%/15%) from Frozen Shot
        //your Weapons have their cooldowns reduced by (  5%  » 10%  » 20%   ).
        regex = /^your ([^\s]+?)s?'?(?: and ([^\s]+)s?)?(?: items)? (?:have their cooldowns|cooldowns are) (increased|reduced) by (\([^)]+\)|\d+%?)( second\(?s?\)?)?\.?$/i;    
        match = text.match(regex);
        if(match) {
            const cooldownReduction = getRarityValue(match[4], this.rarity);
            const tagToMatch = Item.getTagFromText(match[1]);
            const tagToMatch2 = Item.getTagFromText(match[2]);
            const isSeconds = match[5] ? true : false;
            const isReduced = match[3] == "reduced" ? true : false;
            let cooldownReducedBy = 0;
            doIt = () => {
                this.board.items.forEach(item => {
                    if(item.tags.includes(tagToMatch) || (tagToMatch2 && item.tags.includes(tagToMatch2))) {
                        if(isSeconds) {
                            item.gain((isReduced?-1:1)*cooldownReduction*1000,'cooldown');
                        } else {
                            cooldownReducedBy = item.cooldown * cooldownReduction/100;
                            item.gain((isReduced?-1:1)*cooldownReducedBy, "cooldown");
                        }
                    }
                });
            };

            undoIt = () => {
                this.board.items.forEach(item => {
                    if(item.tags.includes(tagToMatch) || (tagToMatch2 && item.tags.includes(tagToMatch2))) {
                        if(isSeconds) {
                            item.gain((isReduced?1:-1)*cooldownReduction*1000,'cooldown');
                        } else {
                            item.gain((isReduced?1:-1)*cooldownReducedBy, "cooldown");
                        }
                    }
                });
            };
        }


        if(!doIt) {
            console.log("Could not parse "+ text+ " from "+this.name);
            return null;
        }


        if(checkComparison && comparisonFunction()) {
            didIt=true;
            doIt(item||this);
        } 
        return (...args)=>{
            if(didIt && !comparisonFunction(...args)) {
                undoIt(...args);
                didIt=false;
            } else if(!didIt && comparisonFunction(...args)) {
                doIt(...args);
                didIt=true;
            }
        };
    }
    addTemporaryEnchant(enchant) {
        if(this.enchant) { return; } // maybe later remove enchant first, for now skip.
        this.enchant = enchant||this.pickRandom(Object.keys(this.enchants));       
        this.enchantIsTemporary = true;
        this.resetEnchant();
        if(this.enchant!='Radiant') {
            this.setupTextFunctions(this.enchants[this.enchant]);
        }         
    }
    removeTemporaryEnchant() {
        if(this.enchantIsTemporary) {
            this.enchant=null;
            this.tags = structuredClone(this.startItemData.tags);
            this.enchantIsTemporary = false;
        }
    }
}