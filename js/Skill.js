import { colorTextArray } from './utils.js';

export class Skill {
    constructor(skillData) {
        Object.assign(this, skillData);
        

        const skillElement = document.createElement('div');
        skillElement.className = 'skill-icon';
        if(skillData.rarity) {
            skillElement.classList.add(skillData.rarity);
        }
        skillElement.style.position = 'relative';
        skillElement.dataset.skill = JSON.stringify(skillData);
        

        const imgElement = document.createElement('img');
        imgElement.src = skillData.icon;
        skillElement.appendChild(imgElement);
        
        this.element = skillElement;
        // Add hover listeners
        skillElement.addEventListener('mouseenter', () => {
            this.tooltip = this.createTooltipElement();                        
            this.element.appendChild(this.tooltip);
        });
        
        skillElement.addEventListener('mouseleave', () => {
            this.tooltip.style.display = 'none';
            this.tooltip.remove();
            this.tooltip = null;
        });
    }
    reset() {
        let regext = "your items have \(\s*(\d+)\s*»\s*(\d+)\s*»\s*(\d+)\s*»\s*(\d+)\s*\) crit chance"
        let match = this.text.match(regext);        
        if(match) {
            let critChance = getRarityValue(`${match[1]}»${match[2]}»${match[3]}»${match[4]}`, this.rarity);
            this.board.items.forEach(item => {
                item.crit += this.critChance;
            });
        }
    }
    static getDataFromName(name) {
        if(!skills[name]) {
            console.log("Skill not found: " + name);
            return null;
        }
        return structuredClone(skills[name]);
    }

    createTooltipElement() {
        const tooltip = document.createElement('div');
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
        let rarityIndex = Item.rarityLevels.indexOf(this.rarity || 'Bronze');
        // Create HTML content with structured layout
        let tooltipContent = `
            <div class="tooltip-content">
                <div class="tooltip-tags">
                    ${tagsArray.map(tag => `<span class="tag tooltip-tag-${tag.toLowerCase()}">${tag}</span>`).join('')}
                </div>
                <div class="tooltip-name">${this.name}</div>
                <div class="tooltip-main">
                    ${this.cooldown ? `
                        <div class="cooldown-circle">${this.cooldown}<span class="unit">SEC</span></div>
                    ` : ''}
                    <div class="tooltip-main-text">${colorTextArray([this.text],rarityIndex)}</div>
                </div>



                ${this.bottomText ? `
                    <div class="tooltip-divider"></div>
                    <div class="tooltip-bottom">${this.bottomText}</div>
                ` : ''}
            </div>
        `;
        
        tooltip.innerHTML = tooltipContent;        
        return tooltip;
    }
}