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
    
        // Initialize players
        window.topPlayer = new Player("Top Player");
        window.bottomPlayer = new Player("Bottom Player");
        topPlayer.hostileTarget = bottomPlayer;
        bottomPlayer.hostileTarget = topPlayer;
        
        topPlayer.initialize('inventory-board', 'topPlayerSkills', 1000);
        bottomPlayer.initialize('bottom-board', 'bottomPlayerSkills', 1000);
  //      initializeMonsterSearch();
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
    const items = Array.from(board.element.querySelectorAll('.merged-slot')).map(slot => ({
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

const battleButton = document.querySelector('.battle-button');

var battleInterval = undefined;
var startBattleTime;
function log(s) {
    combatLog.val(combatLog.val() + "\n" + s);
    combatLog[0].scrollTop = combatLog[0].scrollHeight;
}


function battleFunction() {
    if(topPlayer.health<=0) {
        clearInterval(battleInterval);
        alert("you win");
        return;
    }
    if(bottomPlayer.health <=0) {
        clearInterval(battleInterval);
        alert("you lose");
        return;
    }
    battleTimeDiff += 100;
    topPlayer.updateCombat(100);
    bottomPlayer.updateCombat(100);
    
  if(battleTimeDiff>30000) {
    let sandstormDmg = Math.floor(sandstormValue);
    log("Sandstorm deals "+ sandstormDmg + " damage to both players.");
    topPlayer.takeDamage(sandstormDmg);
    bottomPlayer.takeDamage(sandstormDmg);
    sandstormValue+=sandstormIncrement;
  }

 
}

function resetBattle() {
    if(battleInterval)
    clearInterval(battleInterval);
    isPaused=0;
    sandstormValue=1;
    battleInterval = null; // Clear the interval reference
    topPlayer.reset();
    bottomPlayer.reset();
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

let battleRNG = null;

function startBattle() {
    if(isPaused) {
        unpauseBattle();
        return;
    } else if (battleInterval && !isPaused) {
        pauseBattle();
        return;
    }
    
    // Generate a random seed (32 characters)
    // Using ASCII printable characters (33-126)
    const battleSeed = [...crypto.getRandomValues(new Uint8Array(32))]
        .reduce((acc, x) => acc + String.fromCharCode(33 + (x % 94)), '');
    
    // Initialize the RNG with the seed
    battleRNG = new Math.seedrandom(battleSeed);
    
    combatLog.val("Battle Started\nBattle Seed: " + battleSeed);
    
    topPlayer.board.startBattle();
    bottomPlayer.board.startBattle();
    
    battleTimeDiff = 0;

    battleInterval = setInterval(battleFunction, 100);

    // Update button
    battleButton.textContent = 'Pause Battle';
    battleButton.classList.add('pause-battle');
}


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


function loadMonsterBoard(monsterData, boardId = 'inventory-board') {
    const board = Board.getBoardFromId(boardId);
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

// Helper function to get random numbers during battle
function battleRandom() {
    if (!battleRNG) {
        console.error('Battle RNG not initialized!');
        return Math.random(); // Fallback to regular random
    }
    return battleRNG();
}