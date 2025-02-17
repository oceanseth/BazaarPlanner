import { monsters } from '../monsters.js';
import { skills } from '../skills.js';
import { items } from '../items.js';
import { Board, getSizeValue } from './Board.js';
import { Player } from './Player.js';
import { Skill } from './Skill.js';
import { Item } from './Item.js';
import { ItemFunction } from './ItemFunction.js';
import { getRarityValue, loadFromUrl, updateUrlState } from './utils.js';
import { Battle } from './Battle.js';

// Make necessary functions/classes available globally
if(window.location.hostname == "bazaarplanner.com") {
    window.location.href = "https://www.bazaarplanner.com/"+window.location.hash;
}
window.getSizeValue = getSizeValue;
window.getRarityValue = getRarityValue;
window.loadMonsterBoard = loadMonsterBoard;
window.searchMonsters = searchMonsters;
window.search = search;
window.monsters = monsters;
window.skills = skills;
window.items = items;
window.Board = Board;
window.createListItem = createListItem;
window.search = search;
window.populateSearchSuggestions = populateSearchSuggestions;
window.topPlayer = new Player({name:"Top Player"});
window.bottomPlayer = new Player({name:"Bottom Player"});
topPlayer.hostileTarget = bottomPlayer;
bottomPlayer.hostileTarget = topPlayer;

topPlayer.initialize('t', 'topPlayerSkills', 1000);
bottomPlayer.initialize('b', 'bottomPlayerSkills', 1000);
//      initializeMonsterSearch();
window.mainBattle = new Battle([topPlayer, bottomPlayer], (winner) => {
    if(winner) {
        alert(winner.name + " wins! Total combat time was "+((topPlayer.battleTime/1000).toFixed(0))+" seconds.");
    } else {
        alert("Battle ended in a draw. Total combat time was "+((topPlayer.battleTime/1000).toFixed(0))+" seconds.");
    }
}, $("#combat-log"));

window.log = (s) => { mainBattle.log(s) };
window.lastLogTimes = new Map();
window.delayedLog = (s,id) => {
    if(window.lastLogTimes.get(id) && Date.now() - window.lastLogTimes.get(id) < 1000) {
        return;
    }
    window.lastLogTimes.set(id,Date.now());


    console.log(s);
}


window.poll = (answer) => {
    if(!window.user) {
        alert("You must be logged in to poll, please click login on top right of the page.");
        return;
    }

    const voteType = answer ? 'yes' : 'no';

    // Get current count first

    firebase.database().ref(`polls/harmpoll/counts/${voteType}`).once('value')

        .then(snapshot => {
            const currentCount = snapshot.val() || 0;
            
            // Create multi-path update
            const updates = {};
            updates[`polls/harmpoll/${voteType}/${window.user.uid}`] = {
                timestamp: firebase.database.ServerValue.TIMESTAMP
            };
            updates[`polls/harmpoll/counts/${voteType}`] = currentCount + 1;
            
            // Attempt to update both paths atomically
            return firebase.database().ref().update(updates);
        })
        .catch(error => {
            if (error.code === 'PERMISSION_DENIED') {
                alert('You have already voted!');
            } else {
                console.error('Error casting vote:', error);
            }
        }).finally(() => {
            closePoll();                                
        });
}
window.closePoll = function() {
    document.getElementById('poll').remove();
    document.getElementById('simulator').classList.remove('polling');
    document.getElementById('sign-in-status').innerHTML = 'Does BazaarPlanner harm the game? Poll Results: Yes: <span id="yesResult"></span> No: <span id="noResult"></span>';
    firebase.database().ref('polls/harmpoll/counts').on('value', snapshot => {
        const counts = snapshot.val() || { yes: 0, no: 0 };
        document.getElementById('yesResult').innerHTML = counts.yes;
        document.getElementById('noResult').innerHTML = counts.no;
    });
}
window.pollCheck = function() {
    if(!window.user) {
        document.querySelector('.poll-login').style.display = 'block';
        document.querySelector('.poll-button-group').style.display = 'none';
        return;
    }
    document.querySelector('.poll-login').style.display = 'none';
    document.querySelector('.poll-button-group').style.display = 'block';

    const userVoteChecks = Promise.all([
        firebase.database().ref(`polls/harmpoll/yes/${window.user.uid}`).once('value'),
        firebase.database().ref(`polls/harmpoll/no/${window.user.uid}`).once('value')

    ]).then(([yesSnapshot, noSnapshot]) => {
        if (yesSnapshot.exists() || noSnapshot.exists()) {
            closePoll();
            const initialHash = window.location.hash.slice(1);
            if (initialHash) {
                // Replace the initial history entry and then immediately create a new one
                window.history.replaceState(null, '', '/'); // Clear the initial entry
                window.history.pushState({state: initialHash}, '', `#${initialHash}`);
                loadFromUrl(initialHash);
            }
        }
    });
}



// Initialize delete zone globally
const deleteZone = document.createElement('div');
deleteZone.className = 'delete-zone';
deleteZone.textContent = ' Drop here to delete';
document.querySelector('.board-container:last-child').appendChild(deleteZone);
window.deleteZone = deleteZone;
    // Initialize players

    function isMobileDevice() {
        return /Android|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i.test(navigator.userAgent);
      }

window.getTinyUrl = function() {
    const url = window.location.href.split('#')[1];

    let count;
    firebase.database().ref('tinyurls/count').once('value').then(snapshot => {
        count = snapshot.val() || 0;
        const updates = {};
        count++;
        updates[""+count] = {url:url, uid:window.user.uid};
        updates['count'] = count;
        return firebase.database().ref('/tinyurls').update(updates);
    }).then(() => {
        navigator.clipboard.writeText('https://www.bazaarplanner.com/#'+count.toString(36));
        alert('Tiny URL copied to clipboard: https://www.bazaarplanner.com/#'+(count.toString(36)));        
    });
}



window.onload = () => {
     


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
    //    itemsList.appendChild(listItem.cloneNode(true));
        simulatorItemsList.appendChild(listItem);
    });



     window.firebaseConfig = {
        apiKey: "AIzaSyCrDTf9_S8PURED8DZBDbbEsJuMA1poduw",
        authDomain: window.location.hostname=="localhost"?"bazaarplanner.firebaseapp.com":"www.bazaarplanner.com",
        databaseURL: "https://bazaarplanner-default-rtdb.firebaseio.com",
        projectId: "bazaarplanner",
        storageBucket: "bazaarplanner.firebasestorage.app",
        messagingSenderId: "785099543393",
        appId: "1:785099543393:web:64f446c9ff8b0a34086b20",
        measurementId: "G-PPXK7672LC"
    };

    // Initialize Firebase with error handling
    try {
        if (!firebase.apps.length) {
            window.app = firebase.initializeApp(firebaseConfig);
        } else {
            window.app = firebase.app();
        }
        window.auth = firebase.auth();
        
        // Initialize the FirebaseUI Widget
        const ui = new firebaseui.auth.AuthUI(firebase.auth());

        // FirebaseUI config
        const uiConfig = {
            signInOptions: [
                firebase.auth.GoogleAuthProvider.PROVIDER_ID,
                firebase.auth.EmailAuthProvider.PROVIDER_ID
            ],
            callbacks: {
                signInSuccessWithAuthResult: function(authResult, redirectUrl) {
                    // User successfully signed in.
                    // Return type determines whether we continue the redirect automatically
                    // or whether we leave that to developer to handle.

                    return true;
                }
            },
            signInFlow: isMobileDevice()?'redirect':'popup',
            signInSuccessUrl: window.location.href
        };


        // Initialize the auth UI
        function initAuth() {
            if (ui.isPendingRedirect()) {
                ui.start('#firebaseui-auth-container', uiConfig);
            } else {
                ui.start('#firebaseui-auth-container', uiConfig);
            }
        }

        // Track auth state
        function initApp() {
            pollCheck();
            firebase.auth().onAuthStateChanged(function(user) {
                // Get the login button
                const loginButton = document.querySelector('button[onclick="login()"]');
                
                if (user) {
                    // User is signed in
                    user.getIdToken().then(function(accessToken) {
                        window.user = user;
                        window.isDoner = true;
                        // Update status elements
                        document.getElementById('sign-in-status').textContent = 'Signed in as ' + user.displayName;
                        document.getElementById('account-details').textContent = JSON.stringify({
                            displayName: user.displayName,
                            email: user.email,
                            emailVerified: user.emailVerified,
                            photoURL: user.photoURL,
                            uid: user.uid
                        }, null, '  ');

                        // Update login button to show logout
                        if (loginButton) {
                            loginButton.textContent = 'Logout';
                            loginButton.onclick = logout;
                        }
                        pollCheck();
                    });
                    // Hide the auth UI when signed in
                    document.getElementById('firebaseui-auth-container').style.display = 'none';
                } else {
                    // User is signed out
                    document.getElementById('sign-in-status').textContent = '';
                    document.getElementById('account-details').textContent = '';
                    
                    // Reset login button
                    if (loginButton) {
                        loginButton.textContent = 'Login';
                        loginButton.onclick = login;
                    }
                    

                }
                loadFromUrl();
            });
        }
        window.login = function() {
            // Show the auth UI when signed out
            document.getElementById('firebaseui-auth-container').style.display = 'block';
        }
    initAuth();
    initApp();

    } catch (error) {
        console.error("Firebase initialization error:", error);
    }        
}


function logout() {
    if (!firebase.auth) {
        console.error("Firebase auth is not initialized");
        return;
    }

    firebase.auth().signOut()
        .then(() => {
            console.log("Logout successful");
            // The auth state observer will handle UI updates
        })
        .catch(error => {
            console.error("Logout error:", error);
            // More detailed error information
            console.error("Error code:", error.code);
            console.error("Error message:", error.message);
        });
}

// Remove the duplicate DOMContentLoaded listener that initializes boards
// (the one we added in the previous code)


const emptyDragImage = new Image();
emptyDragImage.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
emptyDragImage.style.position = 'absolute';
emptyDragImage.style.top = '-9999px';
emptyDragImage.style.opacity = '0';
document.body.appendChild(emptyDragImage);

window.showSection = function(sectionId) {
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
    const sizeString = data.tags.find(tag => ['Small', 'Medium', 'Large'].includes(tag)) || 'Small';
    if(data.tags) {
        item.setAttribute('data-size', getSizeValue(sizeString));
    }
    if (data.icon) {
        const icon = document.createElement('img');
        icon.src = data.icon;
        icon.classList.add(sizeString);
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
    const searchStrings = searchString.split(' ');
    
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
            let show = true;
            
            searchStrings.forEach(searchString => {
            // Check if the search string matches the name, text, or tags
                const matchesTag = itemData.tags && itemData.tags.some(tag => tag.toLowerCase() === searchString); // Check for tag match
            
                if (itemName.toLowerCase().includes(searchString) || 
                    itemText.toLowerCase().includes(searchString) || 
                    matchesTag) { // Include tag match in the condition
                    show &= true;
                } else {
                    show &= false;
                }
            });
            if(show) {
                item.style.display = '';
            } else {
                item.style.display = 'none';
            }
        });
    });
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

window.battleRNG = null;

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
    Board.resetBoards();
    updateUrlState();
}); 


function loadMonsterBoard(monsterData, boardId = 't') {
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

    if(e.target.closest('.editorOpener')==null && e.target.closest('.editor')==null) {
        document.querySelectorAll('.editor').forEach(editor => {
            editor.style.display = 'none';
        });
    }




});