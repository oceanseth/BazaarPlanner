class Skill {
    constructor(skillData) {
        Object.assign(this, skillData);
        
        const skillElement = $('<div>', {
            class: 'skill-icon',
            'data-skill': JSON.stringify(skillData)
        }).append($('<img>', {
            src: skillData.icon
        }));
        this.element = skillElement;

        // Create and attach tooltip
        const tooltip = this.createTooltipElement();
        skillElement.append(tooltip);

        // Add hover listeners
        skillElement.on('mouseenter', () => {
            tooltip.style.display = 'block';
        });
        
        skillElement.on('mouseleave', () => {
            tooltip.style.display = 'none';
        });
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
                        <div class="cooldown-circle">${this.cooldown}<span class="unit">SEC</span></div>
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
}