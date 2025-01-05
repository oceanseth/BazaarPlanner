// Initialize board variables at the top
let inventoryBoard;
let bottomBoard;

// Call this when the page loads
document.addEventListener('DOMContentLoaded', () => {
        const monstersList = document.getElementById('monstersList');
        monstersList.innerHTML = '';
        Object.entries(monsters).forEach(([id, monster]) => {
            const item = createListItem(monster);
            monstersList.appendChild(item);
        });
    
        const skillsList = document.getElementById('skillsList');
        skillsList.innerHTML = '';
        Object.entries(skills).forEach(([id, skill]) => {
            const item = createListItem(skill);
            skillsList.appendChild(item);
        });
        const itemsList = document.getElementById('itemsList');
        const simulatorItemsList = document.getElementById('simulator-itemsList');
        
         // Populate monster selector dropdown
    for (const key in monsters) {
        if (monsters.hasOwnProperty(key)) {  // defensive programming
            $('#monster-selector').append($('<option>', {
                value: key,
                text: key
            }));
        }
    }

        // Handle NPC selection change
        $('#monster-selector').on('change', function() {
            const selectedMonster = $(this).val();
            if (monsters[selectedMonster]) {
                loadMonsterBoard(monsters[selectedMonster]);
            }
        });


        
        Object.entries(items).forEach(([id, item]) => {
            const listItem = createListItem(item);
            itemsList.appendChild(listItem.cloneNode(true));
            simulatorItemsList.appendChild(listItem);
        });
    
        simulatorItemsList.style.height = '300px';
        simulatorItemsList.style.overflowY = 'scroll';
  //      initializeMonsterSearch();
    
    
    inventoryBoard = new Board('inventory-board');
    bottomBoard = new Board('bottom-board');
});


// Remove the duplicate DOMContentLoaded listener that initializes boards
// (the one we added in the previous code)

const emptyDragImage = new Image();
emptyDragImage.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
emptyDragImage.style.position = 'absolute';
emptyDragImage.style.top = '-9999px';
emptyDragImage.style.opacity = '0';
document.body.appendChild(emptyDragImage);
var sandstormValue = 1;
var sandstormIncrement= .25;
const deleteZone = document.createElement('div');
deleteZone.className = 'delete-zone';
deleteZone.textContent = 'Drop here to delete';
document.querySelector('.board-container:last-child').appendChild(deleteZone);

function saveBoards() {
    inventoryBoard.save();
    bottomBoard.save();
    alert('Boards saved successfully!');
}

function loadTopBoard() {
    if (!inventoryBoard.load()) {
        alert('No saved top board found!');
    }
}

function loadBottomBoard() {
    if (!bottomBoard.load()) {
        alert('No saved bottom board found!');
    }
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


function createListItem(data) {
    const item = document.createElement('div');
    item.className = 'list-item';
    item.draggable = true;
    item.setAttribute('data-name', data.name);
    item.setAttribute('data-item', JSON.stringify(data));
    if(data.tags) {
        item.setAttribute('data-size', getSizeValue(data.tags.find(tag => ['Small', 'Medium', 'Large'].includes(tag)) || 'Small'));
    }
    if (data.icon) {
        const icon = document.createElement('img');
        icon.src = data.icon;
        icon.style.marginRight = '10px';
        item.appendChild(icon);
    }
    
    const text = document.createElement('span');
    text.textContent = data.name;
    item.appendChild(text);
    
    item.addEventListener('dragstart', Board.handleDragStart);
    item.addEventListener('dragend', Board.handleDragEnd);    
    
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
            const itemText = (item.text || '')+ " " + (item.bottomtext||'');
            const itemData = JSON.parse(item.getAttribute('data-item')); // Get item data for tag check
            
            // Check if the search string matches the name, text, or tags
            const matchesTag = itemData.tags && itemData.tags.some(tag => tag.toLowerCase() === searchString); // Check for tag match
            
            if (itemName.toLowerCase().includes(searchString) || 
                itemText.toLowerCase().includes(searchString) || 
                matchesTag) { // Include tag match in the condition
                item.style.display = '';
            } else {
                item.style.display = 'none';
            }
        });
    });
}

function getSizeValue(size) {
    switch(size?.toLowerCase()) {
        case 'small': return 1;
        case 'medium': return 2;
        case 'large': return 3;
        default: return 1;
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



function createGhostElement(itemData, size = 1) {
    const ghost = document.createElement('div');
    ghost.className = 'drag-ghost';
    ghost.style.width = `${size * 100}px`; // Adjust width based on item size
    
    if (itemData.icon) {
        const icon = document.createElement('img');
        icon.src = itemData.icon;
        ghost.appendChild(icon);
    }
    
    return ghost;
}

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

function applySlowEffect(item, board) {
    // Extract slow text from the item's text property - tag is optional
    // Both item count and duration can be either a single digit or a range
    const slowRegex = /Slow (?:\(([^)]+)\)|(\d+)) (?:(\w+) )?item for (?:\(([^)]+)\)|(\d+)) second/;
    
    if (!item.text || !slowRegex.test(item.text)) return;
    
    const [_, itemsRange, singleItemCount, requiredTag, durationRange, singleDuration] = item.text.match(slowRegex);
    
    // Get the appropriate values based on item's rarity
    const numItemsToSlow = itemsRange ? 
        getRarityValue(itemsRange, item.rarity) : 
        parseInt(singleItemCount);
    const duration = durationRange ? 
        getRarityValue(durationRange, item.rarity) : 
        parseInt(singleDuration);
    
    // Find all progress bars in the same board
    let items = Array.from(board.items);
    
    // Filter by tag if one was specified
    if (requiredTag) {
        items = items.filter(i => {
            return i.tags && i.tags.includes(requiredTag);
        });
    }
    
    // Randomly select N progress bars
    const selectedItems = items
        .sort(() => Math.random() - 0.5)
        .slice(0, numItemsToSlow);
    
    // Apply slow effect to selected bars
    selectedItems.forEach(i => {
        i.slowTimeRemaining = parseInt(i.slowTimeRemaining || 0) + duration*1000;
        log(item.name + " slowed " + i.name + " for " + duration + " seconds");
    });
}

function applyHasteEffect(item, board) {
    // Extract haste text from the item's text property - tag is optional
    // Both item count and duration can be either a single digit or a range
    const hasteRegex = /Haste (?:\(([^)]+)\)|(\d+)) (?:(\w+) )?item.* for (?:\(([^)]+)\)|(\d+)) second/;

    if (!item.text || !hasteRegex.test(item.text)) return;
    
    const [_, itemsRange, singleItemCount, requiredTag, durationRange, singleDuration] = item.text.match(hasteRegex);
    
    // Get the appropriate values based on item's rarity
    const numItemsToHaste = itemsRange ? 
        getRarityValue(itemsRange, item.rarity) : 
        parseInt(singleItemCount);
    const duration = durationRange ? 
        getRarityValue(durationRange, item.rarity) : 
        parseInt(singleDuration);
    
    // Find all progress bars in the same board
    let items = Array.from(board.items);
    
    // Filter by tag if one was specified
    if (requiredTag) {
        items = items.filter(i => {
            return i.tags && i.tags.includes(requiredTag);
        });
    }
    
    // Randomly select N progress bars
    const selectedItems = items
        .sort(() => Math.random() - 0.5)
        .slice(0, numItemsToHaste);
    
    // Apply haste effect to selected bars
    selectedItems.forEach(i => {
        i.hasteTimeRemaining = parseInt(i.hasteTimeRemaining || 0) + duration*1000;
        log(item.name + " hasted " + i.name + " for " + duration + " seconds");
    });
}

function battleFunction() {
    battleTimeDiff += 100;
    inventoryBoard.updateCombat(100);
    bottomBoard.updateCombat(100);
    
    $("#topPlayerHealth").html(topPlayerHealth);
    $("#bottomPlayerHealth").html(bottomPlayerHealth);

  if(battleTimeDiff>30000) {
    let sandstormDmg = Math.floor(sandstormValue);
    log("Sandstorm deals "+ sandstormDmg + " damage to both players.");
    topPlayerHealth-=sandstormDmg;
    bottomPlayerHealth-=sandstormDmg;
    sandstormValue+=sandstormIncrement;
  }

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
    if(battleInterval)
    clearInterval(battleInterval);
    isPaused=0;
    sandstormValue=1;
    battleInterval = null; // Clear the interval reference
    resetHealth();
    
    inventoryBoard.resetItems();
    bottomBoard.resetItems();
    // Reset button
    battleButton.textContent = 'Start Battle';
    battleButton.classList.remove('pause-battle');
}

function pauseBattle() {    
    clearInterval(battleInterval);
    isPaused=1;
    battleButton.textContent = 'Unpause Battle';
    battleButton.classList.remove('pause-battle');
}

function unpauseBattle() {
    isPaused = 0;
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
        return;
    } else if (battleInterval && !isPaused) {
        pauseBattle();
        return;
    }
    
    combatLog.val("Battle Started");
    // Initialize players
    window.topPlayer = new Player();
    window.bottomPlayer = new Player();
    
    topPlayer.initialize('inventory-board', 'topPlayerSkills', topPlayerHealth);
    bottomPlayer.initialize('bottom-board', 'bottomPlayerSkills', bottomPlayerHealth);
    
    battleTimeDiff = 0;

    battleInterval = setInterval(battleFunction, 100);

    // Update button
    battleButton.textContent = 'Pause Battle';
    battleButton.classList.add('pause-battle');
}

function editItem(item) {
    const itemData = JSON.parse(item.getAttribute('data-item'));
    
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
    const enchantPrefixes = /^(Fiery|Radiant|Heavy|Golden|Icy|Turbo|Shielded|Restorative|Toxic|Shiny|Deadly)\s+/;
    const currentEnchant = enchantPrefixes.test(itemData.name) ? 
        itemData.name.match(enchantPrefixes)[1] : 'None';
    const baseName = stripEnchantFromName(itemData.name);
    
    const popup = document.createElement('div');
    popup.className = 'item-edit-popup';
    
    // Start with basic HTML
    let popupHTML = `<h3>Edit ${itemData.name}</h3>`;
    
    // Add enchantment field
    popupHTML += `
        <div class="form-group">
            <label>Enchantment:</label>
            <select id="edit-enchant">
                ${enchantments.map(e => 
                    `<option value="${e}" ${e === currentEnchant ? 'selected' : ''}>${e}</option>`
                ).join('')}
            </select>
        </div>`;
    
    // Add rarity field only if item is upgradeable (has rarity or damage)
    if (itemData.rarity || itemData.damage !== undefined) {
        popupHTML += `
            <div class="form-group">
                <label>Rarity:</label>
                <select id="edit-rarity">
                    ${rarities.map(r => 
                        `<option value="${r}" ${r === (itemData.rarity || 'Bronze') ? 'selected' : ''}>${r}</option>`
                    ).join('')}
                </select>
            </div>`;
    }
    
    // Add damage field only if item has damage
    if (itemData.damage !== undefined) {
        popupHTML += `
            <div class="form-group">
                <label>Damage:</label>
                <input type="number" id="edit-damage" value="${itemData.damage || 0}">
            </div>`;
    }
    
    // Add cooldown field only if item has cooldown
    if (itemData.cooldown !== undefined) {
        popupHTML += `
            <div class="form-group">
                <label>Cooldown (seconds):</label>
                <input type="number" id="edit-cooldown" value="${itemData.cooldown || 0}">
            </div>`;
    }
    
    // Add crit chance field only if item has damage
    if (itemData.damage !== undefined) {
        popupHTML += `
            <div class="form-group">
                <label>Crit Chance (0-100):</label>
                <input type="number" min="0" max="100" id="edit-crit" value="${itemData.crit || 0}">
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
    
    popup.querySelector('.save-edit').addEventListener('click', () => {
        const enchant = popup.querySelector('#edit-enchant').value;
        
        // Update name with enchantment
        itemData.name = enchant === 'None' ? baseName : `${enchant} ${baseName}`;
        
        // Only update fields that exist in the form
        if (popup.querySelector('#edit-rarity')) {
            itemData.rarity = popup.querySelector('#edit-rarity').value;
        }
        if (popup.querySelector('#edit-damage')) {
            itemData.damage = parseFloat(popup.querySelector('#edit-damage').value) || 0;
        }
        if (popup.querySelector('#edit-cooldown')) {
            itemData.cooldown = parseFloat(popup.querySelector('#edit-cooldown').value) || 0;
        }
        if (popup.querySelector('#edit-crit')) {
            itemData.crit = parseFloat(popup.querySelector('#edit-crit').value) || 0;
        }
        
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
                const board = Board.getBoardFromId(boardId);
                board.clear();
                items.forEach(({item, startIndex, size}) => {
                    board.placeItem(startIndex, size, item, boardId);
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
        // Get the source board and remove the item from its tracking
        const sourceBoard = Board.getBoardFromId(draggingElement.closest('.board')?.id);
        if (sourceBoard) {
            // Remove the item from the board's tracking by matching the element
            sourceBoard.items = sourceBoard.items.filter(item => item.element !== draggingElement);
        }
        
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


function stripEnchantFromName(name) {
    const enchantPrefixes = /^(Fiery|Radiant|Heavy|Golden|Icy|Turbo|Shielded|Restorative|Toxic|Shiny|Deadly)\s+/;
    if (enchantPrefixes.test(name)) {
        return name.replace(enchantPrefixes, '');
    }
    return name;
}
function loadMonsterBoard(monsterData, boardId = 'inventory-board') {
    const board = Board.getBoardFromId(boardId);
    board.clear();
    board.loadMonsterData(monsterData);    
}

function searchMonsters(query) {
    const dropdown = document.getElementById('monster-dropdown');
    const searchInput = document.getElementById('monster-search');
    
    dropdown.innerHTML = '';
    
    // Filter monsters - if query is empty, show all monsters
    const filteredMonsters = Object.values(monsters)
        .sort((a, b) => a.name.localeCompare(b.name))
        .filter(monster => !query || monster.name.toLowerCase().includes(query.toLowerCase()));
    
    if (filteredMonsters.length > 0) {
        dropdown.style.display = 'block';
        
        filteredMonsters.forEach(monster => {
            const div = document.createElement('div');
            div.textContent = monster.name;
            div.onclick = () => {
                searchInput.value = monster.name;
                loadMonsterBoard(monster);
                dropdown.style.display = 'none';
            };
            dropdown.appendChild(div);
        });
    } else {
        dropdown.style.display = 'none';
    }
}

// Add click handler to hide dropdown when clicking outside
document.addEventListener('click', (e) => {
    const dropdown = document.getElementById('monster-dropdown');
    const searchContainer = e.target.closest('.search-container');
    
    if (!searchContainer && dropdown) {
        dropdown.style.display = 'none';
    }
});

function getRarityValue(valueString, rarity) {
    // Parse values (e.g., "1 » 2 » 3 » 4" or "1 >> 2 >> 3 >> 4" into [1, 2, 3, 4])
    const values = valueString.split(/[»>]+/).map(v => parseFloat(v.trim()));
    
    // Get the appropriate value based on item's rarity
    const rarityIndex = ['Bronze', 'Silver', 'Gold', 'Diamond'].indexOf(rarity || 'Bronze');
    return values[rarityIndex] || values[0];
}
