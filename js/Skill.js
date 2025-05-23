import { colorTextArray, updateUrlState } from './utils.js';
import { Item } from './Item.js';


export class Skill {
    constructor(skillData,board=null,editable=true) {
        Object.assign(this, skillData);
        if(this.tier) {
            this.rarity = Item.rarityLevels[parseInt(this.tier)];
        } else if(this.rarity) {
            this.tier = Item.rarityLevels.indexOf(this.rarity);
        }
        this.editable = editable;
        this.itemProxy = new Item(skillData);
        this.itemProxy.isSkill = true;
        this.itemProxy.board = board;
        this.board = board;


        const skillElement = document.createElement('div');
        skillElement.className = 'skill-icon';
        skillElement.classList.add('editorOpener');
     
        skillElement.style.position = 'relative';
        skillElement.dataset.skill = JSON.stringify(skillData);
        

        const imgElement = document.createElement('img');
        imgElement.src = '/images/items/'+Item.cleanName(this.name)+'.avif';
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
        if(this.editable) {
            skillElement.addEventListener('click', () => {
                this.showEditor();
            });
        }
        this.reset();
    }
    static fromName(name, board=null) {
        if(!skills[name]) {
            console.log("Skill not found: " + name);
            return null;
        }
        const skillData = skills[name];
        skillData.name = name;
        return new Skill(skillData, board);
    }
    reset() {
        this.element.classList.remove(...Item.rarityLevels);
        if(this.rarity) {
            this.element.classList.add(this.rarity);
            this.itemProxy.rarity = this.rarity;
        }
        this.itemProxy.reset();
    }


    setup() {
        this.itemProxy.board=this.board;
        this.itemProxy.rarity = this.rarity;
        this.itemProxy.setup();
        this.text = this.itemProxy.text;
    }
    _myBoard = null;
    set board(board) {
        this._myBoard = board;
        this.itemProxy.board = board;
    }
    get board() {
        return this._myBoard;
    }
    clone(newBoard) {
        const skillData = skills[this.name];
        skillData.tier = this.tier;
        skillData.name = this.name;
        skillData.text = this.text;
        const newSkill= new Skill(skillData);
        newSkill.board = newBoard;
        return newSkill;
    }
    static getDataFromName(name) {
        if(!skills[name]) {
            console.log("Skill not found: " + name);

            return null;
        }
        return structuredClone(skills[name]);
    }
    showEditor() {
        if(this.editor) {
            this.editor.style.display = 'block';
            return;
        }
        this.editor = document.createElement('div');
        this.editor.className = 'editor';
        this.editor.innerHTML = `
            <div class="editor-header">
                <h3>${this.name}</h3>
            </div>
            <div class="editor-body">
                <div class="form-group">
                    <label>Rarity:</label>
                    <select id="editor-rarity">
                        ${Item.rarityLevels.map((r,i) => 
                            `<option value="${i}" ${i==this.tier?'selected':''}>${r}</option>`
                        ).join('')}
                    </select>
                </div>
                <div class="form-group">
                    <label>Text:</label>
                    <textarea id="editor-text" style="width: 220px; height: 75px;">${this.text.join('\n')}</textarea>
                </div>
            </div>
            <div class="editor-footer">
                <button id="editor-apply-text">Apply</button>
                <button class="editor-delete">Remove</button>
            </div>


        `;
        document.body.appendChild(this.editor);

        this.editor.querySelector('#editor-rarity').addEventListener('change',()=>{
            const oldTier = this.tier;
            this.tier = this.editor.querySelector('#editor-rarity').value;
            this.rarity = Item.rarityLevels[parseInt(this.tier)];
            if(oldTier!=this.tier) {
                this.board.player.battle.resetBattle();
                updateUrlState();
            }
            this.editor.style.display = 'none';
        }); 

        this.editor.querySelector('#editor-apply-text').onclick = () => {
            this.text = this.editor.querySelector('#editor-text').value
                .split('.')
                .filter(s => s.trim())
                .map(s => s.trim() + '.');
            this.itemProxy.startItemData.text = this.text;
            this.editor.style.display = 'none';
            this.board.player.battle.resetBattle();
            updateUrlState();
        };
       

        this.editor.querySelector('.editor-delete').onclick = () => {
            this.editor.style.display = 'none';
            this.board.removeSkill(this);
        };
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
                    <div class="tooltip-main-text">${colorTextArray(this.text,rarityIndex)}</div>
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