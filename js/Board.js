class Board {
    static getBoardFromId(boardId) {
        return boardId === 'inventory-board' ? inventoryBoard : bottomBoard;
    }

    constructor(boardId) {
        this.boardId = boardId;
        this.element = document.getElementById(boardId);
        this.initialize();
    }

    initialize() {
        this.element.innerHTML = '';
        this.slots = [];
        this.items = new Set();
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
        // First check if the item would extend beyond the board
        if (startIndex + size > 10 || startIndex < 0) return false;
        
        const existingItems = Array.from(this.items);
        
        // Filter out the item being dragged from the check
        const itemsToCheck = existingItems.filter(item => {
            const itemElement = item.element || item;  // Handle both object and direct element storage
            return itemElement !== draggingElement;
        });
        
        // Check each slot that would be occupied by the new item
        for (let i = startIndex; i < startIndex + size; i++) {
            // Check if any existing item overlaps with this slot
            for (const item of itemsToCheck) {
                const itemElement = item.element || item;
                const slotStart = parseInt(itemElement.dataset.startIndex);
                const slotSize = parseInt(itemElement.dataset.size);
                
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

    handleDragOver(e) {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
        
        const slot = e.target.closest('.board-slot');
        if (!slot) return;
        
        const draggingElement = document.querySelector('.dragging');
        if (!draggingElement) return;
        
        const itemData = JSON.parse(draggingElement.getAttribute('data-item'));
        const size = getSizeValue(itemData.tags.find(tag => ['Small', 'Medium', 'Large'].includes(tag)) || 'Small');
        const startIndex = parseInt(slot.dataset.index);
        
        // Get the correct board instance for the slot being hovered over
        const boardElement = slot.closest('.board');
        const targetBoard = Board.getBoardFromId(boardElement.id);
        
        targetBoard.updateDropPreview(slot, startIndex, size, draggingElement);
    }

    updateDropPreview(slot, startIndex, size, draggingElement) {
        // Clear all preview classes first
        document.querySelectorAll('.valid-drop, .invalid-drop').forEach(element => {
            element.classList.remove('valid-drop', 'invalid-drop');
        });
        
        if (this.isValidPlacement(startIndex, size, draggingElement)) {
            // Add valid-drop class to all affected slots
            for (let i = 0; i < size; i++) {
                const targetSlot = this.slots[startIndex + i];
                if (targetSlot) {
                    targetSlot.classList.add('valid-drop');
                }
            }
        } else {
            slot.classList.add('invalid-drop');
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
        
        const size = getSizeValue(itemData.tags.find(tag => ['Small', 'Medium', 'Large'].includes(tag)) || 'Small');
        const draggingElement = document.querySelector('.dragging');
        const boardElement = slot.closest('.board');
        const targetBoard = Board.getBoardFromId(boardElement.id);
        const sourceBoard = Board.getBoardFromId(draggingElement.closest('.board')?.id);

        if (targetBoard.isValidPlacement(startIndex, size, draggingElement)) {
            if (draggingElement?.classList.contains('merged-slot')) {
                draggingElement.style.left = `${startIndex * 10}%`;
                draggingElement.dataset.startIndex = startIndex;
                targetBoard.element.appendChild(draggingElement);
                targetBoard.items.add({
                    element: draggingElement,
                    startIndex: startIndex,
                    size: size
                });
                const itemToRemove = Array.from(sourceBoard.items).find(item => item.element === draggingElement);
                if (itemToRemove) {
                    sourceBoard.items.delete(itemToRemove);
                }
            } else {
                const newItem = targetBoard.placeItem(startIndex, size, itemData);
                targetBoard.items.add({element: newItem, startIndex: startIndex, size: size});
            }
        }
        document.querySelectorAll('.valid-drop, .invalid-drop, .dragging').forEach(element => {
            element.classList.remove('valid-drop', 'invalid-drop', 'dragging');
        });
    
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
        e.dataTransfer.setDragImage(draggedElement, 0, draggedElement.offsetHeight / 2);
        e.dataTransfer.setData('text/plain', itemData);
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

        // Get the board that originally contained this element
        const sourceBoard = Board.getBoardFromId(draggedElement.closest('.board')?.id);
        if (sourceBoard) {
            // Remove the item from the board's tracking
            sourceBoard.items.delete(draggedElement);
        }
        
        // Re-enable tooltip functionality after drag ends
        document.querySelectorAll('.tooltip').forEach(tooltip => {
            tooltip.style.display = 'none';
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