const emptyDragImage = new Image();
emptyDragImage.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
emptyDragImage.style.position = 'absolute';
emptyDragImage.style.top = '-9999px';
emptyDragImage.style.opacity = '0';
document.body.appendChild(emptyDragImage);

const deleteZone = document.createElement('div');
deleteZone.className = 'delete-zone';
deleteZone.textContent = 'Drop here to delete';
document.querySelector('.board-container:last-child').appendChild(deleteZone);

function saveBoards() {
    const topBoard = document.getElementById('inventory-board');
    const bottomBoard = document.getElementById('bottom-board');
    
    // Get all items from both boards
    const topItems = Array.from(topBoard.querySelectorAll('.merged-slot')).map(slot => ({
        item: JSON.parse(slot.getAttribute('data-item')),
        startIndex: parseInt(slot.dataset.startIndex),
        size: parseInt(slot.dataset.size)
    }));
    
    const bottomItems = Array.from(bottomBoard.querySelectorAll('.merged-slot')).map(slot => ({
        item: JSON.parse(slot.getAttribute('data-item')),
        startIndex: parseInt(slot.dataset.startIndex),
        size: parseInt(slot.dataset.size)
    }));
    
    // Save to localStorage
    localStorage.setItem('savedTopBoard', JSON.stringify(topItems));
    localStorage.setItem('savedBottomBoard', JSON.stringify(bottomItems));
    
    alert('Boards saved successfully!');
}

function loadTopBoard() {
    const savedTop = localStorage.getItem('savedTopBoard');
    if (!savedTop) {
        alert('No saved top board found!');
        return;
    }
    
    // Clear current board
    initializeBoard('inventory-board');
    
    // Load saved items
    const items = JSON.parse(savedTop);
    items.forEach(({item, startIndex, size}) => {
        placeItem(startIndex, size, item, 'inventory-board');
    });
}

function loadBottomBoard() {
    
    const savedBottom = localStorage.getItem('savedBottomBoard');
    if (!savedBottom) {
        alert('No saved bottom board found!');
        return;
    }
    
    // Clear current board
    initializeBoard('bottom-board');
    
    // Load saved items
    const items = JSON.parse(savedBottom);
    items.forEach(({item, startIndex, size}) => {
        placeItem(startIndex, size, item, 'bottom-board');
    });
} 
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCrDTf9_S8PURED8DZBDbbEsJuMA1poduw",
  authDomain: "bazaarplanner.firebaseapp.com",
  databaseURL: "https://bazaarplanner-default-rtdb.firebaseio.com",
  projectId: "bazaarplanner",
  storageBucket: "bazaarplanner.firebasestorage.app",
  messagingSenderId: "785099543393",
  appId: "1:785099543393:web:64f446c9ff8b0a34086b20",
  measurementId: "G-PPXK7672LC"
};

// Initialize Firebase
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
const database = firebase.database();

function showSection(sectionId) {
    document.querySelectorAll('.section').forEach(section => {
        section.style.display = 'none';
    });
    document.getElementById(sectionId).style.display = 'block';
    
    document.querySelectorAll('#Menu button').forEach(button => {
        button.classList.remove('selected');
    });
    document.querySelector(`button[onclick="showSection('${sectionId}')"]`).classList.add('selected');
}

function createTooltip(data) {
    let tooltipContent = '';
    
    // Add text if it exists
    if (data.text) {
        tooltipContent += data.text;
    }
    
    // Add bottomText if it exists
    if (data.bottomText) {
        tooltipContent += '\n' + data.bottomText;
    }
    
    return tooltipContent;
}

function createListItem(data) {
    const item = document.createElement('div');
    item.className = 'list-item';
    item.draggable = true;
    item.setAttribute('data-name', data.name);
    item.setAttribute('data-item', JSON.stringify(data));
    item.setAttribute('data-tooltip', createTooltip(data));
    
    if (data.icon) {
        const icon = document.createElement('img');
        icon.src = data.icon;
        icon.style.marginRight = '10px';
        item.appendChild(icon);
    }
    
    const text = document.createElement('span');
    text.textContent = data.name;
    item.appendChild(text);
    
    item.addEventListener('dragstart', handleDragStart);
    item.addEventListener('dragend', handleDragEnd);
    
    return item;
}

function search(searchString, section = 'all') {
    searchString = searchString.toLowerCase();
    
    // Determine which section we're searching in based on which section is visible
    const simulatorSection = document.getElementById('simulator');
    const isSimulator = simulatorSection && simulatorSection.style.display !== 'none';
    
    const containers = {
        monsters: document.getElementById('monstersList'),
        items: document.getElementById('itemsList'),
        skills: document.getElementById('skillsList'),
        simulator: document.getElementById('simulator-itemsList')
    };

    let containersToSearch = [];
    if (isSimulator) {
        containersToSearch = [containers.simulator];
    } else {
        containersToSearch = [containers.monsters, containers.items, containers.skills];
    }

    containersToSearch.forEach(container => {
        if (!container) return;
        
        const items = container.querySelectorAll('.list-item');
        items.forEach(item => {
            const itemName = item.getAttribute('data-name') || '';
            const itemText = item.textContent || '';
            
            if (itemName.toLowerCase().includes(searchString) || 
                itemText.toLowerCase().includes(searchString)) {
                item.style.display = '';
            } else {
                item.style.display = 'none';
            }
        });
    });
}

function getSizeValue(size) {
    switch(size?.toLowerCase()) {
        case 'tiny': return 0;
        case 'small': return 1;
        case 'medium': return 2;
        case 'large': return 3;
        case 'huge': return 4;
        default: return 1;
    }
}

function initializeBoard(boardId) {
    const board = document.getElementById(boardId);
    board.innerHTML = '';
    
    for (let i = 0; i < 10; i++) {
        const slot = document.createElement('div');
        slot.className = 'board-slot';
        slot.style.left = `${i * 10}%`;
        slot.dataset.index = i;
        
        slot.addEventListener('dragover', handleDragOver);
        slot.addEventListener('drop', handleDrop);
        
        board.appendChild(slot);
    }
}

function setupBoardEventListeners(board) {
    board.addEventListener('dragover', e => {
        e.preventDefault();
        updateDropPreview(e);
    });
    
    board.addEventListener('dragleave', e => {
        if (!e.target.closest('.board')) {
            clearDropPreview();
        }
    });
    
    board.addEventListener('drop', handleDrop);
}

function updateDropPreview(e) {
    const slot = e.target.closest('.board-slot');
    if (!slot) return;

    try {
        const data = JSON.parse(e.dataTransfer.getData('text/plain'));
        const startIndex = parseInt(slot.dataset.index);
        const size = getSizeValue(data.size);
        const board = slot.closest('.board');
        
        if (isValidPlacement(startIndex, size, board.id)) {
            slot.classList.add('valid-drop');
            slot.classList.remove('invalid-drop');
        } else {
            slot.classList.add('invalid-drop');
            slot.classList.remove('valid-drop');
        }
    } catch (error) {
        console.error('Error updating drop preview:', error);
    }
}

function clearDropPreview() {
    document.querySelectorAll('.board-slot').forEach(slot => {
        slot.classList.remove('valid-drop', 'invalid-drop');
    });
}

function handleDrop(e) {
    e.preventDefault();
    clearDropPreview();
    
    try {
        const data = JSON.parse(e.dataTransfer.getData('text/plain'));
        const slot = e.target.closest('.board-slot');
        if (!slot) return;
        
        const board = e.target.closest('.board');
        const startIndex = parseInt(slot.dataset.index);
        const size = data.size || getSizeValue(data.item.size);
        
        if (isValidPlacement(startIndex, size, board.id)) {
            const sourceElement = document.querySelector('.merged-slot.dragging');
            if (sourceElement) {
                sourceElement.style.left = `${startIndex * 10}%`;
                sourceElement.dataset.startIndex = startIndex;
                board.appendChild(sourceElement);
            } else {
                placeItem(startIndex, size, data.item, board.id);
            }
        }
    } catch (error) {
        console.error('Error handling drop:', error);
    }
}

function isValidPlacement(startIndex, size, boardId) {
    // Check if item would extend beyond board
    if (startIndex + size > 10 || startIndex < 0) return false;
    
    // Check for overlapping items only in the current board
    const currentBoard = document.getElementById(boardId);
    const existingSlots = Array.from(currentBoard.querySelectorAll('.merged-slot'));
    const draggingSlot = currentBoard.querySelector('.merged-slot.dragging');
    
    // Filter out the currently dragging slot from overlap checks
    const slotsToCheck = existingSlots.filter(slot => slot !== draggingSlot);
    
    // Check each position the new item would occupy
    for (let i = startIndex; i < startIndex + size; i++) {
        // Check against each existing slot
        for (const slot of slotsToCheck) {
            const slotStart = parseInt(slot.dataset.startIndex);
            const slotSize = parseInt(slot.dataset.size);
            
            // Check if current position overlaps with existing item
            if (i >= slotStart && i < slotStart + slotSize) {
                return false;
            }
        }
    }
    
    return true;
}

function placeItem(startIndex, size, itemData, boardId = 'inventory-board') {
    const board = document.getElementById(boardId);
    const mergedSlot = document.createElement('div');
    mergedSlot.className = 'merged-slot';
    mergedSlot.style.width = `${size * 10}%`;
    mergedSlot.style.left = `${startIndex * 10}%`;
    mergedSlot.dataset.startIndex = startIndex;
    mergedSlot.dataset.size = size;
    mergedSlot.setAttribute('data-item', JSON.stringify(itemData));
    mergedSlot.itemData = itemData; 
    mergedSlot.setAttribute('data-tooltip', createTooltip(itemData));
    mergedSlot.draggable = true;
    
    if (itemData.icon) {
        const icon = document.createElement('img');
        icon.src = itemData.icon;
        icon.draggable = false;
        mergedSlot.appendChild(icon);
    }

    mergedSlot.addEventListener('dragstart', handleDragStart);
    mergedSlot.addEventListener('dragend', handleDragEnd);

    board.appendChild(mergedSlot);
}

function createGhostElement(itemData, size = 1) {
    const ghost = document.createElement('div');
    ghost.className = 'drag-ghost';
    ghost.setAttribute('data-tooltip', createTooltip(itemData));
    ghost.style.width = `${size * 100}px`; // Adjust width based on item size
    
    if (itemData.icon) {
        const icon = document.createElement('img');
        icon.src = itemData.icon;
        ghost.appendChild(icon);
    }
    
    return ghost;
}

// Initialize database listener
database.ref().on('value', (snapshot) => {
    window.data = snapshot.val();
    
    try {
        // Populate monsters
        if (data?.monsters) {
            const monstersList = document.getElementById('monstersList');
            monstersList.innerHTML = '';
            Object.entries(data.monsters).forEach(([id, monster]) => {
                const item = createListItem(monster);
                monstersList.appendChild(item);
            });
        }
        
        // Populate items
        if (data?.items) {
            const itemsList = document.getElementById('itemsList');
            const simulatorItemsList = document.getElementById('simulator-itemsList');
            
            itemsList.innerHTML = '';
            simulatorItemsList.innerHTML = '';
            
            Object.entries(data.items).forEach(([id, item]) => {
                const listItem = createListItem(item);
                itemsList.appendChild(listItem.cloneNode(true));
                simulatorItemsList.appendChild(listItem);
            });
        }
        
        // Populate skills
        if (data?.skills) {
            const skillsList = document.getElementById('skillsList');
            skillsList.innerHTML = '';
            Object.entries(data.skills).forEach(([id, skill]) => {
                const item = createListItem(skill);
                skillsList.appendChild(item);
            });
        }

        populateSearchSuggestions(data);
    } catch (error) {
        console.error('Error populating items:', error);
    }
}, (error) => {
    console.error('Database error:', error);
});

// Initialize board when page loads
document.addEventListener('DOMContentLoaded', () => {
    initializeBoard('inventory-board');
    initializeBoard('bottom-board');
});

function populateSearchSuggestions(data) {
    const suggestions = new Set();
    
    if (data.monsters) {
        Object.values(data.monsters).forEach(monster => {
            suggestions.add(monster.name);
        });
    }
    
    if (data.items) {
        Object.values(data.items).forEach(item => {
            suggestions.add(item.name);
        });
    }
    
    if (data.skills) {
        Object.values(data.skills).forEach(skill => {
            suggestions.add(skill.name);
        });
    }
    
    const datalists = document.querySelectorAll('datalist');
    datalists.forEach(datalist => {
        datalist.innerHTML = '';
        suggestions.forEach(suggestion => {
            const option = document.createElement('option');
            option.value = suggestion;
            datalist.appendChild(option);
        });
    });
}

function saveBoard(boardId) {
    const board = document.getElementById(boardId);
    
    // Get all items from the board
    const items = Array.from(board.querySelectorAll('.merged-slot')).map(slot => ({
        item: JSON.parse(slot.getAttribute('data-item')),
        startIndex: parseInt(slot.dataset.startIndex),
        size: parseInt(slot.dataset.size)
    }));
    
    // Save to localStorage with board-specific key
    localStorage.setItem(`saved_${boardId}`, JSON.stringify(items));
    
    // Show small notification instead of alert
    const notification = document.createElement('div');
    notification.textContent = 'Saved!';
    notification.style.position = 'absolute';
    notification.style.right = '0';
    notification.style.bottom = '-50px';
    notification.style.background = '#4CAF50';
    notification.style.color = 'white';
    notification.style.padding = '4px 8px';
    notification.style.borderRadius = '4px';
    notification.style.fontSize = '12px';
    notification.style.opacity = '0';
    notification.style.transition = 'opacity 0.3s';
    
    board.parentElement.appendChild(notification);
    setTimeout(() => notification.style.opacity = '1', 10);
    setTimeout(() => {
        notification.style.opacity = '0';
        setTimeout(() => notification.remove(), 300);
    }, 1500);
}


var topPlayerHealth = 1000;
var bottomPlayerHealth = 1000;
const battleButton = document.querySelector('.battle-button');

function resetHealth() {
    topPlayerHealth = 1000;
    bottomPlayerHealth = 1000;
    $("#topPlayerHealth").html(topPlayerHealth);
    $("#bottomPlayerHealth").html(bottomPlayerHealth);
}

var battleInterval = undefined;
var startBattleTime;
function log(s) {
    combatLog.val(combatLog.val() + "\n" + s);
    combatLog[0].scrollTop = combatLog[0].scrollHeight;
}

function triggerItem(item) {
    let itemData = item.itemData;
    log('triggered item ', itemData.name);
    if(itemData.tags.weapon==1) {
        let damage = itemData.damage;
        let crit="";
        // Handle critical hits using itemData.crit (0-100) instead of critChance
        if (itemData.crit && Math.random() < (itemData.crit / 100)) {
            damage *= 2;
            crit =" critically strikes and";
        }
        
        if(item.parentElement.id == 'bottom-board') {
            topPlayerHealth -= damage;
            log("Bottom player's "+itemData.name + 
                        crit +
                        " deals "+ damage+" damage.");
        } else {
            bottomPlayerHealth -= damage;
            log("Top player's "+itemData.name + 
                        crit+
                        " deals "+ damage+" damage.");
        }
    }
}

function battleFunction() {
    let currentTime = Date.now();
    let scaleBy = 1;
    let timeDiff = currentTime - startBattleTime - pauseTime;

    //advance all the cooldowns by appropriate amounts
    const progressBars = document.querySelectorAll('.battleItemProgressBar');
    progressBars.forEach(bar => {
        const cooldown = parseInt(bar.dataset.cooldown) * 1000;        
        let heightPercent = 100*((timeDiff) % cooldown ) / cooldown;
        let bottomstyle = 'calc('+heightPercent+'% - 5px)';
        bar.style.bottom = bottomstyle;
        let numTriggers = Math.floor(timeDiff/cooldown);
        let count = 0;
        while(bar.dataset.numTriggers != numTriggers && count++<100) {
            bar.dataset.numTriggers++;
            triggerItem(bar.parentElement);
        }

    });

    $("#topPlayerHealth").html(topPlayerHealth);
    $("#bottomPlayerHealth").html(bottomPlayerHealth);

  if(topPlayerHealth<=0) {
    clearInterval(battleInterval);
    alert("you win");
    resetBattle();
  }
  if(bottomPlayerHealth <=0) {
    clearInterval(battleInterval);
    resetBattle();
    alert("you lose");
  }
}

function resetBattle() {
    clearInterval(battleInterval);
    isPaused=0;
    battleInterval = null; // Clear the interval reference
    resetHealth();
    
    // Remove progress bars
    document.querySelectorAll('.battleItemProgressBar').forEach(bar => {
        bar.remove();
    });
    
    // Reset button
    battleButton.textContent = 'Start Battle';
    battleButton.classList.remove('pause-battle');
}

function pauseBattle() {    
    clearInterval(battleInterval);
    pauseStartTime = Date.now();
    isPaused=1;
    battleButton.textContent = 'Unpause Battle';
    battleButton.classList.remove('pause-battle');
}

function unpauseBattle() {
    isPaused = 0;
    pauseTime += Date.now() - pauseStartTime;
    battleInterval = setInterval(battleFunction, 100);
    // Update button
    battleButton.textContent = 'Pause Battle';
    battleButton.classList.add('pause-battle');
}
var combatLog = $("#combat-log");
var isPaused = 0;
var pauseTime = 0;
function startBattle() {
    if(isPaused) {
        unpauseBattle();
    } else if (battleInterval && !isPaused) {
        pauseBattle();
        return;
    }
    
    combatLog.val("Battle Started");
    
    // Start new battle
    startBattleTime = Date.now();
    
    // Get all items from all boards
    const items = document.querySelectorAll('.merged-slot');
    items.forEach(item => {
        const itemData = JSON.parse(item.getAttribute('data-item'));
        const cooldown = itemData.cooldown || 0; // Default to 0 if no cooldown specified
        if(cooldown==0) return;
        const progressBar = document.createElement('div');
        progressBar.className = 'battleItemProgressBar';
        progressBar.dataset.cooldown = cooldown;
        progressBar.dataset.numTriggers = 0;
        
        item.appendChild(progressBar);
    });
    
    battleInterval = setInterval(battleFunction, 100);

    // Update button
    battleButton.textContent = 'Pause Battle';
    battleButton.classList.add('pause-battle');
}

function editItem(item) {
    const itemData = JSON.parse(item.getAttribute('data-item'));
    
    const popup = document.createElement('div');
    popup.className = 'item-edit-popup';
    popup.innerHTML = `
        <h3>Edit ${itemData.name}</h3>
        <div class="form-group">
            <label>Damage:</label>
            <input type="number" id="edit-damage" value="${itemData.damage || 0}">
        </div>
        <div class="form-group">
            <label>Cooldown (seconds):</label>
            <input type="number" id="edit-cooldown" value="${itemData.cooldown || 0}">
        </div>
        <div class="form-group">
            <label>Crit Chance (0-100):</label>
            <input type="number" min="0" max="100" id="edit-crit" value="${itemData.crit || 0}">
        </div>
        <div class="button-group">
            <button class="save-edit">Save</button>
            <button class="cancel-edit">Cancel</button>
        </div>
    `;
    
    document.body.appendChild(popup);
    
    popup.querySelector('.save-edit').addEventListener('click', () => {
        itemData.damage = parseFloat(popup.querySelector('#edit-damage').value) || 0;
        itemData.cooldown = parseFloat(popup.querySelector('#edit-cooldown').value) || 0;
        itemData.crit = parseFloat(popup.querySelector('#edit-crit').value) || 0;
        
        item.setAttribute('data-item', JSON.stringify(itemData));
        item.itemData = itemData;
        popup.remove();
    });
    
    popup.querySelector('.cancel-edit').addEventListener('click', () => {
        popup.remove();
    });
}

// Add click handler to merged slots
document.addEventListener('click', (e) => {
    const mergedSlot = e.target.closest('.merged-slot');
    if (mergedSlot) {
        editItem(mergedSlot);
    }
});

function saveToFile(boardId) {
    const board = document.getElementById(boardId);
    const items = Array.from(board.querySelectorAll('.merged-slot')).map(slot => ({
        item: JSON.parse(slot.getAttribute('data-item')),
        startIndex: parseInt(slot.dataset.startIndex),
        size: parseInt(slot.dataset.size)
    }));
    
    const blob = new Blob([JSON.stringify(items, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${boardId}.json`;
    a.click();
    URL.revokeObjectURL(url);
}

function loadFromFile(boardId) {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    
    input.onchange = e => {
        const file = e.target.files[0];
        const reader = new FileReader();
        
        reader.onload = event => {
            try {
                const items = JSON.parse(event.target.result);
                initializeBoard(boardId);
                items.forEach(({item, startIndex, size}) => {
                    placeItem(startIndex, size, item, boardId);
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

// Update the board controls to use file-based save/load
function updateBoardControls() {
    document.querySelectorAll('.board-controls').forEach(controls => {
        const boardId = controls.closest('.board-container').querySelector('.board').id;
        controls.innerHTML = `
            <button onclick="saveToFile('${boardId}')">Save</button>
            <button onclick="loadFromFile('${boardId}')">Load</button>
        `;
    });
}

// Call this when the page loads
document.addEventListener('DOMContentLoaded', () => {
    initializeBoard('inventory-board');
    initializeBoard('bottom-board');
    updateBoardControls();
});

function loadBoard(boardId) {
    const savedItems = localStorage.getItem(`saved_${boardId}`);
    if (!savedItems) {
        const notification = document.createElement('div');
        notification.textContent = 'No saved board found';
        notification.style.position = 'absolute';
        notification.style.right = '0';
        notification.style.bottom = '-50px';
        notification.style.background = '#f44336';
        notification.style.color = 'white';
        notification.style.padding = '4px 8px';
        notification.style.borderRadius = '4px';
        notification.style.fontSize = '12px';
        notification.style.opacity = '0';
        notification.style.transition = 'opacity 0.3s';
        
        document.getElementById(boardId).parentElement.appendChild(notification);
        setTimeout(() => notification.style.opacity = '1', 10);
        setTimeout(() => {
            notification.style.opacity = '0';
            setTimeout(() => notification.remove(), 300);
        }, 1500);
        return;
    }
    
    // Clear current board
    initializeBoard(boardId);
    
    // Load saved items
    const items = JSON.parse(savedItems);
    items.forEach(({item, startIndex, size}) => {
        placeItem(startIndex, size, item, boardId);
    });
}

function isValidDrop(startIndex, size, boardId, draggingElement = null) {
    const board = document.getElementById(boardId);
    const endIndex = startIndex + size - 1;
    
    // Check if item fits on board
    if (endIndex >= 10) return false;
    
    // Check for overlapping items
    const existingItems = board.querySelectorAll('.merged-slot');
    for (const item of existingItems) {
        // Skip the item being dragged
        if (item === draggingElement || item.classList.contains('dragging')) continue;
        
        const itemStart = parseInt(item.dataset.startIndex);
        const itemSize = parseInt(item.dataset.size);
        const itemEnd = itemStart + itemSize - 1;
        
        // Check if there's any overlap
        if (!(endIndex < itemStart || startIndex > itemEnd)) {
            return false;
        }
    }
    
    return true;
}

function handleDragStart(e) {
    e.target.classList.add('dragging');
    deleteZone.style.display = 'flex';
    
    // Create and show ghost
    const ghost = document.createElement('div');
    ghost.className = 'drag-ghost';
    const itemData = JSON.parse(e.target.getAttribute('data-item'));
    ghost.setAttribute('data-tooltip', createTooltip(itemData));
    
    if (itemData.icon) {
        const ghostIcon = document.createElement('img');
        ghostIcon.src = itemData.icon;
        ghost.appendChild(ghostIcon);
    }
    
    document.body.appendChild(ghost);
    e.dataTransfer.setDragImage(emptyDragImage, 0, 0);
    e.dataTransfer.setData('text/plain', e.target.getAttribute('data-item'));

    // Update ghost position during drag
    const moveGhost = (e) => {
        ghost.style.left = e.clientX - ghost.offsetWidth / 2 + 'px';
        ghost.style.top = e.clientY - ghost.offsetHeight / 2 + 'px';
    };
    
    document.addEventListener('dragover', moveGhost);
    
    // Store the ghost element for cleanup
    e.target.ghostElement = ghost;
}

function handleDragEnd(e) {
    e.target.classList.remove('dragging');
    deleteZone.style.display = 'none';
    deleteZone.classList.remove('active');
    
    // Remove the ghost element
    if (e.target.ghostElement) {
        e.target.ghostElement.remove();
        delete e.target.ghostElement;
    }
    
    // Remove any lingering visual feedback
    document.querySelectorAll('.valid-drop, .invalid-drop').forEach(element => {
        element.classList.remove('valid-drop', 'invalid-drop');
    });
}

function handleDragOver(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    
    const slot = e.target.closest('.board-slot');
    if (!slot) return;
    
    const draggingElement = document.querySelector('.dragging');
    if (!draggingElement) return;
    
    const itemData = JSON.parse(draggingElement.getAttribute('data-item'));
    const size = getSizeValue(itemData.size);
    const startIndex = parseInt(slot.dataset.index);
    
    // Pass the dragging element to isValidDrop
    if (isValidDrop(startIndex, size, slot.closest('.board').id, draggingElement)) {
        slot.classList.add('valid-drop');
        slot.classList.remove('invalid-drop');
    } else {
        slot.classList.add('invalid-drop');
        slot.classList.remove('valid-drop');
    }
}

function handleDrop(e) {
    e.preventDefault();
    const slot = e.target.closest('.board-slot');
    if (!slot) return;
    
    const board = slot.closest('.board');
    const startIndex = parseInt(slot.dataset.index);
    const itemData = JSON.parse(e.dataTransfer.getData('text/plain'));
    const size = getSizeValue(itemData.size);
    
    const draggingElement = document.querySelector('.dragging');
    // Pass the dragging element to isValidDrop
    if (isValidDrop(startIndex, size, board.id, draggingElement)) {
        if (draggingElement) {
            if (draggingElement.classList.contains('merged-slot')) {
                draggingElement.remove();
            }
            draggingElement.classList.remove('dragging');
        }
        placeItem(startIndex, size, itemData, board.id);
    }
    
    slot.classList.remove('valid-drop', 'invalid-drop');
    deleteZone.style.display = 'none';
}

function handleDeleteDrop(e) {
    e.preventDefault();
    const draggingElement = document.querySelector('.dragging');
    if (draggingElement.classList.contains('merged-slot')) {
        draggingElement.classList.add('removing');
        setTimeout(() => draggingElement.remove(), 500);
    }
    deleteZone.classList.remove('active');
    deleteZone.style.display = 'none';
}

// Add dragover and drop handlers for delete zone
deleteZone.addEventListener('dragover', (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    deleteZone.classList.add('active');
});

deleteZone.addEventListener('dragleave', () => {
    deleteZone.classList.remove('active');
});

deleteZone.addEventListener('drop', (e) => {
    e.preventDefault();
    const draggingElement = document.querySelector('.dragging');
    if (draggingElement) {
        draggingElement.classList.add('removing');
        setTimeout(() => {
            draggingElement.remove();
            // Clean up any ghost elements
            const ghost = document.querySelector('.drag-ghost');
            if (ghost) ghost.remove();
        }, 500);
    }
    deleteZone.classList.remove('active');
    deleteZone.style.display = 'none';
}); 