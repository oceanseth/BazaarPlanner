class Board {
    player = null; //Will be set when a player is initialized and they create a board
    static boards = [];
    static getBoardFromId(boardId) {
        if(Board.boards[boardId]) return Board.boards[boardId];
        //console.log("Board not found: " + boardId);
        return null;
    }

    constructor(boardId) {
        this.boardId = boardId;
        this.element = document.getElementById(boardId);
        this.initialize();
        Board.boards[boardId] = this;
    }

    initialize() {
        this.element.innerHTML = '';
        this.slots = [];
        this.items = [];
        this.skills = [];
        // Create slots
        for (let i = 0; i < 10; i++) {
            const slot = document.createElement('div');
            slot.className = 'board-slot';
            slot.style.left = `${i * 82}px`;
            slot.dataset.index = i;
            
            slot.addEventListener('dragover', (e) => this.handleSlotDragOver(e, this));
            slot.addEventListener('drop', (e) => this.handleSlotDrop(e, this));
            
            this.element.appendChild(slot);
            this.slots.push(slot);
        }
        this.createHealthElement();
        this.createSkillsElement();
        this.reset();
    }
    clear() {
        this.skillsElement.innerHTML = '';
        this.items.forEach(item => item.element.remove());
        this.items = [];
        this.skills = [];
        this.reset();
    }
    reset() {
        this.itemTriggers = new Map(); //functions to call when any item on this board is triggered
        this.freezeTriggers = new Map(); //functions to call when any item on this board is frozen
        this.shieldValuesChangedTriggers = new Map(); //functions to call when shield values change
        this.hasteTriggers = new Map(); //functions to call when haste is applied to any item on this board
        this.slowTriggers = new Map(); //functions to call when slow is applied to any item on this board
        this.burnTriggers = new Map();
        this.poisonTriggers = new Map();
        this.critTriggers = new Map();
        this.startOfFightTriggers = new Map();
        this.healTriggers = [];
        this.shieldTriggers = [];
        this.ammoTriggers = [];
        this.largeItemTriggers = [];
        this.mediumItemTriggers = [];
        this.smallItemTriggers = [];
        
        this.resetItems();
        this.updateHealthElement();
    }
    itemDidCrit(item) {
        this.critTriggers.forEach(func => func(item));
    }

    shieldValuesChanged() {
        this.shieldValuesChangedTriggers.forEach(func => func());
    }
    updateHealthElement() {
        const healthPercent = (this.player?.health || 0) / (this.player?.maxHealth || 1000) * 100;
        this.healthElement.style.background = `linear-gradient(to right, 
            #44ff44 ${healthPercent}%, 
            #999999 ${healthPercent}%
        )`;
        
        this.healthElementHealth.innerHTML = this.player?.health;
        this.healthElementShield.innerHTML = this.player?.shield||"";
        this.healthElementBurn.innerHTML = this.player?.burn||"";
        this.healthElementPoison.innerHTML = this.player?.poison||"";
        this.healthElementRegen.innerHTML = this.player?.regen||"";
    }
    createHealthElement() {
        this.healthElement = document.createElement('div');
        this.healthElement.className = 'health-element';
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
    createSkillsElement() {
        this.skillsElement = document.createElement('div');
        this.skillsElement.className = 'skills-element';
        this.element.appendChild(this.skillsElement);
    }
    startBattle() {
        this.items.forEach(item => {if(item.progressBar) item.progressBar.style.display = 'block'});
        this.startOfFightTriggers.forEach(func => func());
    }

    updateCombat(timeDiff) {
        this.items.forEach(item => item.updateCombat(timeDiff));
        this.items.forEach(item => item.updateTriggerValuesElement());
        this.updateHealthElement();
        this.player.hostileTarget.board.updateHealthElement();
    }

    isValidPlacement(startIndex, draggingElement) {
        if (startIndex + parseInt(draggingElement.dataset.size) > 10 || startIndex < 0) return false;
        
        const existingItems = this.items;
        
        const itemsToCheck = existingItems.filter(someItem => {
            return someItem.element !== draggingElement;
        });
        
        // Check each slot that would be occupied by the new item
        for (let i = startIndex; i < startIndex + parseInt(draggingElement.dataset.size); i++) {
            // Check if any existing item overlaps with this slot
            for (const someItem of itemsToCheck) {
                const slotStart = someItem.startIndex;
                const slotSize = someItem.size;
                
                if (!isNaN(slotStart) && !isNaN(slotSize)) {
                    // Check if there's any overlap between the existing item and the slot we're checking
                    const itemEnd = slotStart + slotSize - 1;
                    if (i >= slotStart && i <= itemEnd) {
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
            itemData = JSON.parse(draggingElement.getAttribute('data-item'));
            size = getSizeValue(itemData.tags.find(tag => ['Small', 'Medium', 'Large'].includes(tag)) || 'Small');
        }

        const boardElement = slot.closest('.board');
        const targetBoard = Board.getBoardFromId(boardElement.id);
        const sourceBoard = Board.getBoardFromId(draggingElement.closest('.board')?.id);

        if (board.isValidPlacement(startIndex, draggingElement)) {
            if (alreadyOnBoard) {  
                if(targetBoard==sourceBoard) {
                    foundItem.setIndex(startIndex);
                } else {
                    foundItem.board = targetBoard;
                    targetBoard.addItem(foundItem);
                    foundItem.setIndex(startIndex);
                    sourceBoard.removeItem(foundItem);
                    sourceBoard.resetItems();
                }
            } else { // If it was not already on a board, create a new item on the target board
               let newItem = new Item(itemData, targetBoard);
                newItem.setIndex(startIndex);
            }
        }
        document.querySelectorAll('.valid-drop, .invalid-drop, .dragging').forEach(element => {
            element.classList.remove('valid-drop', 'invalid-drop', 'dragging');
        });
    
        deleteZone.style.display = 'none';
    }

    addItem(item) {
        this.items.push(item);
        this.element.appendChild(item.element);
        this.sortItems();
        this.resetItems();
    }
    sortItems() {
        this.items.sort(Item.compareByIndex);
    }
    removeItem(item) {
        this.items = this.items.filter(i => i !== item);
    }

    save() {        
        const name = prompt("What do you want to name this board?");
        const items = this.items.map(item => ({
            item: item.startItemData,
            startIndex: item.startIndex,
            size: item.size
        }));
        const blob = new Blob([JSON.stringify(items, null, 2)], { type: 'application/json' });
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
                    const items = JSON.parse(event.target.result);
                    items.forEach(({item, startIndex, size}) => {
                        let newItem = new Item(item, this);
                        newItem.setIndex(startIndex);
                    });
                } catch (error) {
                    console.error('Error loading file:', error);
                    alert('Invalid file format');
                }
            };
            
            reader.readAsText(file);
        };
        
        input.click();
    }

    resetItems() {
        this.items.forEach(item => item.reset());
        this.items.forEach(item => item.setup());
        this.resetSkills();
    }
    resetSkills() {
        this.skills.forEach(skill => skill.reset());
    }

    static handleDragStart(e) {
        const draggedElement = e.currentTarget;
        e.dataTransfer.setDragImage(draggedElement, 0, draggedElement.offsetHeight / 2);
        draggedElement.classList.add('dragging');
        
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
        
        deleteZone.style.display = 'block';
    }

    static handleDragEnd(e) {
        const draggedElement = e.currentTarget;
        // Restore original element properties
        draggedElement.style.opacity = '1';
        draggedElement.style.pointerEvents = '';  // Reset to default
        draggedElement.style.zIndex = '';  // Reset to default
        
        document.querySelectorAll('.valid-drop, .invalid-drop, .dragging').forEach(element => {
            element.classList.remove('valid-drop', 'invalid-drop', 'dragging');
        });
    
        
        deleteZone.style.display = 'none';

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
        let startIndex = 0;
        // Load monster items to the board
        monsterData.items.forEach(item => {                    
            let newItem = new Item(Item.getDataFromName(item), this);
            newItem.setIndex(startIndex);
            startIndex += newItem.size;
        });
        
        monsterData.skills.forEach(skill => {
            let newSkill = new Skill(skills[skill]);
            this.skills.push(newSkill);
            newSkill.board = this;
            this.skillsElement.appendChild(newSkill.element);
        });
        this.player.maxHealth = monsterData.health;
        this.player.health = this.player.maxHealth;
        this.player.name = monsterData.name;
        this.updateHealthElement();
        this.resetItems();
        this.player.hostileTarget.board.resetItems();
    }
    itemTriggered(item) {    
        this.itemTriggers.forEach(func => func(item));
    }
}

function getSizeValue(size) {
    switch(size?.toLowerCase()) {
        case 'Small': return 1;
        case 'Medium': return 2;
        case 'Large': return 3;
        default: return 1;
    }
} 