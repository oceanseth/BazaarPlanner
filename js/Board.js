class Board {
    player = null; //Will be set when a player is initialized and they create a board
    static boards = [];
    static getBoardFromId(boardId) {
        if(Board.boards[boardId]) return Board.boards[boardId];
        console.log("Board not found: " + boardId);
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
        // Create slots
        for (let i = 0; i < 10; i++) {
            const slot = document.createElement('div');
            slot.className = 'board-slot';
            slot.style.left = `${i * 10}%`;
            slot.dataset.index = i;
            
            slot.addEventListener('dragover', (e) => this.handleSlotDragOver(e, this));
            slot.addEventListener('drop', (e) => this.handleSlotDrop(e, this));
            
            this.element.appendChild(slot);
            this.slots.push(slot);
        }
    }
    startBattle() {
        this.items.forEach(item => item.progressBar.style.display = 'block');
    }

    updateCombat(timeDiff) {
        this.items.forEach(item => item.updateCombat(timeDiff));
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

    handleSlotDrop(e, board) {
        e.preventDefault();
        clearDropPreview();
        
        const slot = e.target.closest('.board-slot');
        if (!slot) return;
        let itemData;
        const startIndex = parseInt(slot.dataset.index);
        
        const draggingElement = document.querySelector('.dragging');
        const alreadyOnBoard = draggingElement.classList.contains('merged-slot');
        let size=1;
        if(alreadyOnBoard) {
            let boardItems = Board.getBoardFromId(draggingElement.closest('.board')?.id).items;
            size = boardItems.find(item => item.element === draggingElement).size;
        } else {
            itemData = JSON.parse(draggingElement.getAttribute('data-item'));
            size = getSizeValue(itemData.tags.find(tag => ['Small', 'Medium', 'Large'].includes(tag)) || 'Small');
        }

        const boardElement = slot.closest('.board');
        const targetBoard = Board.getBoardFromId(boardElement.id);
        const sourceBoard = Board.getBoardFromId(draggingElement.closest('.board')?.id);

        if (board.isValidPlacement(startIndex, draggingElement)) {
            if (alreadyOnBoard) {
                const foundItem = sourceBoard.items.find(item => item.element === draggingElement);    
                if(targetBoard==sourceBoard) {
                    foundItem.setIndex(startIndex);
                } else {
                    targetBoard.addItem(foundItem);
                    foundItem.setIndex(startIndex);
                    sourceBoard.removeItem(foundItem);
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
    }

    removeItem(item) {
        this.items = this.items.filter(i => i !== item);
    }

    clear() {
        this.items = [];
        this.initialize();
    }

    save() {        
        localStorage.setItem(`saved_${this.boardId}`, JSON.stringify(this.items));
    }

    load() {
        const savedItems = localStorage.getItem(`saved_${this.boardId}`);
        if (!savedItems) return false;
        
        this.clear();
        const items = JSON.parse(savedItems);
        items.forEach((itemData) => {
            new Item(itemData, this);
        });
        return true;
    }

    reset() {
        this.resetItems();
    }

    resetItems() {
        this.items.forEach(item => item.reset());
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
        let startIndex = 0;
        // Load monster items to the board
        monsterData.items.forEach(item => {                    
            let newItem = new Item(Item.getDataFromName(item), this);
            newItem.setIndex(startIndex);
            startIndex += newItem.size;
        });
        

        $('#topPlayerSkills').empty();
        monsterData.skills.forEach(skill => {
            let newSkill = new Skill(skills[skill]);
            $('#topPlayerSkills').append(newSkill.element);
        });
        this.player.maxHealth = monsterData.health;
        $("#topPlayerHealth").html(topPlayerHealth);
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