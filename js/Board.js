class Board {
    static getBoardFromId(boardId) {
        return boardId === 'inventory-board' ? inventoryBoard : bottomBoard;
    }

    constructor(boardId) {
        this.boardId = boardId;
        this.element = document.getElementById(boardId);
        this.slots = [];
        this.items = new Set();
        this.initialize();
    }

    initialize() {
        this.element.innerHTML = '';
        
        // Create slots
        for (let i = 0; i < 10; i++) {
            const slot = document.createElement('div');
            slot.className = 'board-slot';
            slot.style.left = `${i * 10}%`;
            slot.dataset.index = i;
            
            slot.addEventListener('dragover', (e) => this.handleDragOver(e));
            slot.addEventListener('drop', (e) => this.handleDrop(e));
            
            this.element.appendChild(slot);
            this.slots.push(slot);
        }
    }

    isValidPlacement(startIndex, size, draggingElement = null) {
        if (startIndex + size > 10 || startIndex < 0) return false;
        
        const existingItems = Array.from(this.items);
        const draggingSlot = document.querySelector('.merged-slot.dragging');
        
        const itemsToCheck = existingItems.filter(item => 
            item && 
            item.dataset && 
            item !== draggingSlot
        );
        
        for (let i = startIndex; i < startIndex + size; i++) {
            for (const item of itemsToCheck) {
                const slotStart = parseInt(item.dataset.startIndex);
                const slotSize = parseInt(item.dataset.size);
                
                if (!isNaN(slotStart) && !isNaN(slotSize)) {
                    if (i >= slotStart && i < slotStart + slotSize) {
                        return false;
                    }
                }
            }
        }
        
        return true;
    }

    handleDragOver(e) {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
        
        const slot = e.target.closest('.board-slot');
        if (!slot) return;
        
        const draggingElement = document.querySelector('.dragging');
        if (!draggingElement) return;
        
        const itemData = JSON.parse(draggingElement.getAttribute('data-item'));
        const size = getSizeValue(itemData.size);
        const startIndex = parseInt(slot.dataset.index);
        
        // Get the correct board instance for the slot being hovered over
        const boardElement = slot.closest('.board');
        const targetBoard = Board.getBoardFromId(boardElement.id);
        
        targetBoard.updateDropPreview(slot, startIndex, size, draggingElement);
    }

    updateDropPreview(slot, startIndex, size, draggingElement) {
        document.querySelectorAll('.valid-drop, .invalid-drop').forEach(element => {
            element.classList.remove('valid-drop', 'invalid-drop');
        });
        
        if (this.isValidPlacement(startIndex, size, draggingElement)) {
            slot.classList.add('valid-drop');
            slot.classList.remove('invalid-drop');
        } else {
            slot.classList.add('invalid-drop');
            slot.classList.remove('valid-drop');
        }
    }

    handleDrop(e) {
        e.preventDefault();
        clearDropPreview();
        
        const slot = e.target.closest('.board-slot');
        if (!slot) return;
        
        const startIndex = parseInt(slot.dataset.index);
        let itemData;
        
        try {
            itemData = JSON.parse(e.dataTransfer.getData('text/plain'));
        } catch (error) {
            console.error('Invalid JSON data in drag and drop:', error);
            return;
        }
        
        if (!itemData) return;
        
        const size = getSizeValue(itemData.size);
        const draggingElement = document.querySelector('.dragging');
        const boardElement = slot.closest('.board');
        const targetBoard = Board.getBoardFromId(boardElement.id);
        
        if (targetBoard.isValidPlacement(startIndex, size, draggingElement)) {
            if (draggingElement?.classList.contains('merged-slot')) {
                draggingElement.style.left = `${startIndex * 10}%`;
                draggingElement.dataset.startIndex = startIndex;
                targetBoard.element.appendChild(draggingElement);
                targetBoard.items.add(draggingElement);
            } else {
                const newItem = targetBoard.placeItem(startIndex, size, itemData);
                targetBoard.items.add(newItem);
            }
        }
        
        slot.classList.remove('valid-drop', 'invalid-drop');
        deleteZone.style.display = 'none';
    }

    removeItem(item) {
        this.items.delete(item);
        item.remove();
    }

    clear() {
        this.items.clear();
        this.initialize();
    }

    save() {
        const items = Array.from(this.items).map(slot => ({
            item: JSON.parse(slot.getAttribute('data-item')),
            startIndex: parseInt(slot.dataset.startIndex),
            size: parseInt(slot.dataset.size)
        }));
        
        localStorage.setItem(`saved_${this.boardId}`, JSON.stringify(items));
    }

    load() {
        const savedItems = localStorage.getItem(`saved_${this.boardId}`);
        if (!savedItems) return false;
        
        this.clear();
        const items = JSON.parse(savedItems);
        items.forEach(({item, startIndex, size}) => {
            const newItem = this.placeItem(startIndex, size, item);
            this.items.add(newItem);
        });
        return true;
    }
    
    placeItem(startIndex, size, itemData) {
        const mergedSlot = document.createElement('div');
        mergedSlot.className = 'merged-slot';
        
        // Add classes for each tag
        if (itemData.tags && Array.isArray(itemData.tags)) {
            itemData.tags.forEach(tag => {
                mergedSlot.classList.add(`tag-${tag.toLowerCase()}`);
            });
        }
        
        mergedSlot.style.width = `${size * 10}%`;
        mergedSlot.style.left = `${startIndex * 10}%`;
        mergedSlot.dataset.startIndex = startIndex;
        mergedSlot.dataset.size = size;
        mergedSlot.setAttribute('data-item', JSON.stringify(itemData));
        mergedSlot.itemData = itemData; 
        mergedSlot.draggable = true;
        
        if (itemData.icon) {
            const icon = document.createElement('img');
            icon.src = itemData.icon;
            icon.draggable = false;
            mergedSlot.appendChild(icon);
        }

        mergedSlot.addEventListener('dragstart', Board.handleDragStart);
        mergedSlot.addEventListener('dragend', Board.handleDragEnd);

        attachTooltipListeners(mergedSlot);
        
        document.getElementById(this.boardId).appendChild(mergedSlot);
        return mergedSlot;
    }

    static handleDragStart(e) {
        const draggedElement = e.currentTarget;
        const itemData = draggedElement.getAttribute('data-item');
        if (!itemData) {
            console.error('No item data found on dragged element');
            return;
        }
        e.dataTransfer.setData('text/plain', itemData);
        draggedElement.classList.add('dragging');
        
        // Hide all tooltips when starting to drag
        document.querySelectorAll('.tooltip').forEach(tooltip => {
            tooltip.style.display = 'none';
        });
        
        deleteZone.style.display = 'block';
    }

    static handleDragEnd(e) {
        const draggedElement = e.currentTarget;
        draggedElement.classList.remove('dragging');
        deleteZone.style.display = 'none';
        
        // Re-enable tooltip functionality after drag ends
        document.querySelectorAll('.tooltip').forEach(tooltip => {
            tooltip.style.display = 'none';  // Reset to none, will show on next mouseenter
        });
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