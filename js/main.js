import { monsters } from '../monsters.js';
import { skills } from '../skills.js';
import { items } from '../items.js';
import { Board, getSizeValue } from './Board.js';
import { Player } from './Player.js';
import { Item } from './Item.js';
import { getRarityValue, loadFromUrl, updateUrlState } from './utils.js';
import { Battle } from './Battle.js';
import { Puzzle } from './Puzzle.js';
import { User } from './User.js';
import { Runs } from './Runs.js';
// Make necessary functions/classes available globally
window.trackerUrl = "https://github.com/oceanseth/BazaarPlannerMod/releases/download/1.0.3/BazaarPlannerModInstaller-1.0.6.zip";
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
window.topPlayer = new Player({name:"Vanessa", maxHealth:1000}, 't');
window.bottomPlayer = new Player({name:"Dooley"}, 'b');
if(window.backpackBoard==null) {

    window.backpackPlayer = new Player({name:" ", maxHealth:1000}, 'backpack', {skills:false});
    window.backpackPlayer.hostileTarget = topPlayer;
    window.backpackTopPlayer = new Player({name:" ", maxHealth:1000}, 'tb', {skills:false});
    window.backpackTopPlayer.hostileTarget = bottomPlayer;
    topPlayer.board.stashItems = window.backpackTopPlayer.board.items;
    bottomPlayer.board.stashItems = window.backpackPlayer.board.items;
    topPlayer.board.backpack = window.backpackTopPlayer.board;
    bottomPlayer.board.backpack = window.backpackPlayer.board;
}
window.Puzzle = Puzzle;
window.User = User;
topPlayer.hostileTarget = bottomPlayer;
bottomPlayer.hostileTarget = topPlayer;

window.mainBattle = new Battle([topPlayer, bottomPlayer], (winner) => {}, $("#combat-log"));

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
    const poll = document.getElementById('poll');
    if(poll) poll.remove();
    document.getElementById('simulator').classList.remove('polling');
    /*document.getElementById('poll-results').innerHTML = 'Does BazaarPlanner harm the game? Poll Results: Yes: <span id="yesResult"></span>&nbsp;&nbsp;&nbsp; No: <span id="noResult"></span>';
    firebase.database().ref('polls/harmpoll/counts').on('value', snapshot => {
        const counts = snapshot.val() || { yes: 0, no: 0 };
        document.getElementById('yesResult').innerHTML = counts.yes;
        document.getElementById('noResult').innerHTML = counts.no;
    });
    */
}
/*
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
            setupHash()
        }
        document.getElementById('simulator-search-input').focus();
    });
}

*/
function setupHash() {
    const initialHash = window.location.hash.slice(1);
    if (initialHash) {
        // Replace the initial history entry and then immediately create a new one
        window.history.replaceState(null, '', '/'); // Clear the initial entry
        window.history.pushState({state: initialHash}, '', `#${initialHash}`);
        //loadFromUrl(initialHash);
    }
}

    // Initialize players

    function isMobileDevice() {
        return /Android|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i.test(navigator.userAgent);
      }

window.getTinyUrl = function() {
    if(!window.user) {
        alert("You must be logged in to get a tiny URL, please click login on top right of the page.");
        return;
    }
    if(!confirm("This will generate a small url which you can send to a friend to recreate both boards and skills. Continue?")) {
        return;
    }
    let url;
    if(bottomPlayer.board.fullRunData && window.user) {
        url = 'run='+bottomPlayer.board.fullRunData.id+'&e='+$("#sim-encounter-select").val()+"&u="+window.user.uid;
    } else {
     url = window.location.href.split('#')[1];
    }

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

function updateUserInfo(user) {
    if(!user) return;
    document.getElementById('account-login').style.display = 'none';
    document.getElementById('account-content').style.display = 'block';

    firebase.database()
        .ref(`users/${user.uid}`)
        .once('value').then(snapshot => {
            const userData = snapshot.val();
            if(user.displayName) delete userData.displayName;
            Object.assign(user, userData);
            if(!snapshot.val()?.isDonor) {
                user.isDonor = false;
            }
            document.getElementById('account-details').textContent = JSON.stringify({
                displayName: user.displayName,
                email: user.email,
                emailVerified: user.emailVerified,
                photoURL: user.photoURL,
                uid: user.uid,
                isDonor: user.isDonor
            }, null, '  ');
            
            if(user.isDonor) {
                // Remove explicit banner ad
                const bannerAd = document.getElementById('top-banner-ad');
                if(bannerAd) bannerAd.remove();
                
                // Remove all automatic Google ads
                const googleAds = document.querySelectorAll('ins.adsbygoogle');
                googleAds.forEach(ad => ad.remove());
                
                // Prevent future automatic ad insertion
                window.adsbygoogle = [];
                closePoll();
            }
        });
}
window.updateUserInfo = updateUserInfo;
function createCalculateBattleButton() {
    const calculateBattleButton = document.createElement('img');
    calculateBattleButton.className = 'calculate-battle-button editorOpener';
    calculateBattleButton.src = 'images/gem.png';
    calculateBattleButton.onclick = () => {
        if(window.user?.isDonor) {
            mainBattle.calculateWinRate();
        } else {
            window.showDonationRequiredAlert();
        }
        // Force a reflow to restart the animation
        void calculateBattleButton.offsetWidth;
        
        // Add the class back
        calculateBattleButton.classList.add('spinning');
        
        // Remove the class when animation ends
        calculateBattleButton.addEventListener('animationend', () => {
            calculateBattleButton.classList.remove('spinning');
        }, {once: true});
    }
    document.getElementById('b').parentElement.appendChild(calculateBattleButton);
}


function setLoggedInUser (user) {        
        if (user) {
            $(".requireLogin").show();
            $(".requireLogout").hide();
            // User is signed in
            user.getIdToken().then(function(accessToken) {
                window.user = user;
                window.isDoner = true;
                // Update status elements
                updateUserInfo(user);
                
               // pollCheck();
                setupHash();
            });
            // Hide the auth UI when signed in
            document.getElementById('auth-container').style.display = 'none';
        } else {
            $(".requireLogin").hide();
            $(".requireLogout").show();
            // User is signed out
            const signInStatus = document.getElementById('sign-in-status');
            if(signInStatus) signInStatus.textContent = '';
            const accountDetails = document.getElementById('account-details');
            if(accountDetails) accountDetails.textContent = '';              
        }
        if(window.location.hash.length>0) {
            showSection('simulator');
            loadFromUrl();            
        } else {
            showSection('puzzle');
        }
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
    searchMonsters('');

    
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
        window.showLogin = function() {
            document.getElementById('auth-container').style.display = 'block';
            window.scrollTo(0,0);
        }

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
            //pollCheck();
            setupHash();
            firebase.auth().onAuthStateChanged(setLoggedInUser);
        }
        window.login = function() {
            // Show the auth UI when signed out
            document.getElementById('firebaseui-auth-container').style.display = 'block';
            document.getElementById('twitch-auth-container').style.display = 'block';
        }
        document
        .getElementById('twitch-login-button')
        .addEventListener('click', () => {
            const clientId = 'p8hu53p18vur8yj9jakv2bg0kkacrf';
            const redirectUri = encodeURIComponent('https://www.bazaarplanner.com/twitchAuth');
            const scope = 'user:read:email';
            
            // Capture the current hash and encode it
            const originalHash = encodeURIComponent(window.location.hash);
            
            // Add it to state parameter
            const state = encodeURIComponent(JSON.stringify({ hash: originalHash }));

            const twitchAuthUrl = 
            `https://id.twitch.tv/oauth2/authorize` +
            `?client_id=${clientId}` +
            `&redirect_uri=${redirectUri}` +
            `&response_type=code` +
            `&scope=${scope}` +
            `&state=${state}`;  // Add state parameter

            window.location.href = twitchAuthUrl;
        });
    initAuth();
    initApp();

    } catch (error) {
        console.error("Firebase initialization error:", error);
    }        

    document.querySelectorAll('.faq-item').forEach(item => {
        const randomItem = items[Object.keys(items)[Math.floor(Math.random() * Object.keys(items).length)]];
        item.style.backgroundImage = "url(/images/items/"+Item.cleanName(randomItem.name)+".avif)";
    });
}

window.toggleDarkMode = () => {
    document.documentElement.classList.toggle('dark-mode');
    // Optionally save the preference
    const darkModeOff = !document.documentElement.classList.contains('dark-mode');
    if(darkModeOff) localStorage.setItem('darkModeOff', true);
    else localStorage.removeItem('darkModeOff');
}
  
  // On page load, check for saved preference
  document.addEventListener('DOMContentLoaded', () => {
    const darkModeOff = localStorage.getItem('darkModeOff') === 'true';
    if (darkModeOff) {
      document.documentElement.classList.remove('dark-mode');
    } else {
        document.documentElement.classList.add('dark-mode');
    }
    setInterval(backgroundFader,10000);
    backgroundFader();
    createCalculateBattleButton();
  });
  window.backgroundFader = function() {
    // Create container if it doesn't exist
    let container = document.querySelector('.background-container');
    if (!container) {
        container = document.createElement('div');
        container.className = 'background-container';
        document.body.appendChild(container);
        
        // Create two background elements
        container.innerHTML = `
            <div class="background-image"></div>
            <div class="background-image"></div>
        `;
    }

    const backgrounds = container.querySelectorAll('.background-image');
    if(items) {
        // Get all item names (keys)
        const itemNames = Object.keys(items);
        // Select a random item name
        const randomItemName = itemNames[Math.floor(Math.random() * itemNames.length)];
        // Get the random item
        const randomItem = items[randomItemName];
        
        if(randomItem && randomItem.id) {
            // Find inactive background
            const inactiveBackground = Array.from(backgrounds).find(bg => !bg.classList.contains('active'));
            if (inactiveBackground) {
                // Set new background
                inactiveBackground.style.backgroundImage = `url(/images/items/${Item.cleanName(randomItem.name)}.avif)`;
                // Trigger reflow
                inactiveBackground.offsetHeight;
                // Add active class to fade in
                inactiveBackground.classList.add('active');
                
                // Remove active class from other background
                backgrounds.forEach(bg => {
                    if (bg !== inactiveBackground) {
                        bg.classList.remove('active');
                    }
                });
            }
        }
    }
  }

window.logout = ()=> {
    if(!confirm("Do you want to logout?")) {
        return;
    }
    if (!firebase.auth) {
        console.error("Firebase auth is not initialized");
        return;
    }

    firebase.auth().signOut()
        .then(() => {
            console.log("Logout successful");
            window.location.reload();
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
let _currentSection = null;
window.showSection = function(sectionId) {
    const oldSection = _currentSection;
    _currentSection = sectionId;
    document.querySelectorAll('.section').forEach(section => {
        section.style.display = 'none';
    });
    document.getElementById(sectionId).style.display = 'block';
    

    document.querySelectorAll('.section-header').forEach(e => {
        if(e.id==sectionId+"-header") {
            e.classList.add('section-header-selected');
        } else {
            e.classList.remove('section-header-selected');
        }
    });

    if(sectionId=='puzzle') {
        Puzzle.loadPuzzle();
    } else if(sectionId=='runs') {
        Runs.loadRuns();
    } else if(sectionId=='about') {
        fetchTopDonors();
    }
    if(oldSection=='puzzle') {
        Puzzle.battle.resetBattle();
    }

}
function showItemPreview(e) {
    const item = e.target;
    const preview = document.createElement('div');
    preview.id = 'item-preview';
 //   preview.classList.add('tooltip');
    const itemData = items[item.getAttribute('data-name')];
    const tempItem = new Item(itemData,null);
//    preview.appendChild(tempItem.createEnchantPreviewElement());
    preview.appendChild(tempItem.createTooltipElement());
    preview.style.display = 'block';
    document.body.appendChild(preview);
}
window.showItemPreview = showItemPreview;

function createListItem(data) {
    const item = document.createElement('div');
    item.className = 'list-item draggable';
    item.draggable = true;
    item.setAttribute('data-name', data.name);
    
    const sizeString = data.tags.find(tag => ['Small', 'Medium', 'Large'].includes(tag)) || 'Small';
    if(data.tags) {
        item.setAttribute('data-size', getSizeValue(sizeString));
    }
    const icon = document.createElement('img');
    icon.src = '/images/items/'+Item.cleanName(data.name)+'.avif';
    icon.classList.add(sizeString);
    icon.style.pointerEvents = 'none';
    item.appendChild(icon);

    
    const text = document.createElement('span');
    text.textContent = data.name;
    text.style.pointerEvents = 'none';
    item.appendChild(text);
    
    item.addEventListener('dragstart', Board.handleDragStart);
    item.addEventListener('dragend', Board.handleDragEnd);    
    item.addEventListener('mouseover', showItemPreview);
    item.addEventListener('mouseout', ()=>{
        let e = document.getElementById('item-preview');
        if(e) e.remove();
    });
    
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
        
        const listItems = container.querySelectorAll('.list-item');
        listItems.forEach(item => {
            const itemName = item.getAttribute('data-name') || '';
            const itemText = items[itemName].text?items[itemName].text.join('').toLowerCase():'';
            const itemData = items[itemName]; // Get item data for tag check
            let show = true;
            
            searchStrings.forEach(searchString => {
            // Check if the search string matches the name, text, or tags
                const matchesTag = itemData.tags && itemData.tags.some(tag => tag.toLowerCase() === searchString); // Check for tag match
            
                if (itemName.toLowerCase().includes(searchString) || 
                    itemText.includes(searchString) || 
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


function loadMonsterBoard(monsterData, boardId = 't') {
    const board = Board.getBoardFromId(boardId);
    board.loadMonsterData(monsterData);    
}

function searchMonsters(query) {
    const dropdown = document.getElementById('simulator-monsterList');
    const searchInput = document.getElementById('monster-search');
    
    dropdown.innerHTML = '';
    
    // Filter monsters - if query is empty, show all monsters
    const filteredMonsters = Object.values(monsters)
        .filter(monster => !query || monster.name.toLowerCase().includes(query.toLowerCase()));
    
    if (filteredMonsters.length > 0) {
        dropdown.style.display = 'block';
        
        filteredMonsters.forEach(monster => {
            const div = document.createElement('div');  
            div.classList.add('monster-dropdown-item');
            div.onclick = () => {
                searchInput.value = monster.name;
                loadMonsterBoard(monster);
            };
            div.onmouseover = () => {
                if(document.getElementById('monster-preview-img')==null) {
                    const img = document.createElement('img');
                    img.id = 'monster-preview-img';
                    img.src = '/images/monsters/'+monster.id+'.avif';
                    img.classList.add('monster-preview-icon');
                    document.getElementById('monster-search-container').appendChild(img);
                }
            };
            div.onmouseout = () => {
                if(document.getElementById('monster-preview-img')!=null) {
                    document.getElementById('monster-preview-img').remove();
                }
            };
            
            const day = document.createElement('div');
            day.classList.add('monster-dropdown-day');
            day.textContent = monster.day;
            div.appendChild(day);
            
            const img = document.createElement('img');
            img.src = '/images/monsters/'+monster.id+'.avif';
            img.classList.add('monster-dropdown-icon');
            div.appendChild(img);

            const name = document.createElement('div');
            name.classList.add('monster-dropdown-name');
            name.textContent = monster.name;
            div.appendChild(name);

            dropdown.appendChild(div);
        });
    } else {
        dropdown.style.display = 'none';
    }
}

// Add click handler to hide dropdown when clicking outside
document.addEventListener('click', (e) => {
   
    if(e.target.closest('.editorOpener')==null && e.target.closest('.editor')==null) {
        document.querySelectorAll('.editor').forEach(editor => {
            editor.style.display = 'none';
        });
        document.getElementById('auth-container').style.display = 'none';
    }

});
document.addEventListener('keyup', (e) => {
    if(e.target!=document.body) return;
    if(e.key==' ') {
        bottomPlayer.board.toggleBackpack();
    }
});

window.showDonationRequiredAlert = () => {
    let donationDialog = document.getElementById('donation-dialog');
    if(donationDialog) {
        donationDialog.style.display = 'block';
        return;
    }
    const dialog = document.createElement('div');
    dialog.className = 'editor donation-dialog';
    dialog.id = 'donation-dialog';
    dialog.innerHTML = `
        <div class="donation-content">
            <img src="images/gem.png" class="donation-icon" alt="Donation Icon">
            <h2>Premium Feature</h2>
            <p>This feature is available to donors as a thank you for supporting BazaarPlanner.</p>
            <p>Benefits include:</p>
            <ul>
                <li>✨ Calculating win rate</li>
                <li>🚫 Remove all advertisements</li>
                <li>🚀 Speed up the battle</li>
                <li>💖 Support ongoing development</li>
            </ul>
            <button class="donate-button" onclick="if(window.user) document.getElementById('donate-button').click(); else window.showLogin();">
                Donate Any Amount
            </button>
            <div class="top-donors-section">
                <h3>Top Donors</h3>
                <div class="top-donors-list">
                    <div class="loading">Loading top donors...</div>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(dialog);
    fetchTopDonors();
};
window.fetchTopDonors = () => {

    console.log('Fetching top donors...');

    // Query the donors collection
    firebase.database().ref('topDonors')
        .orderByChild('amount')
        .limitToLast(10)
        .once('value')
        .then((snapshot) => {
            const donors = snapshot.val();
            // Clear loading message
            let html = '';

            // Display top donors
            if (donors.length > 0) {
                donors.forEach((donor, index) => {
                    const donorElement = document.createElement('div');
                    donorElement.className = 'donor-item';
                    donorElement.innerHTML = `
                        <span class="donor-rank">#${index + 1}</span>
                        <span class="donor-name">${donor.name}</span>
                        <span class="donor-amount">${donor.amount}</span>
                    `;
                    html += donorElement.outerHTML;
                });
                $('.top-donors-list').html(html);
            } 
        })
        .catch((error) => {
            console.error('Error fetching top donors:', error);
            console.error('Error code:', error.code);
            console.error('Error message:', error.message);
            topDonorsList.innerHTML = '<div class="error">Error loading top donors. Please try again later.</div>';
        });
};

window.markUserAsPaid = async (userId, amount) => {
    try {
        await firebase.database().ref(`users/${userId}`).update({
            isDonor: true,
            donationDate: firebase.database.ServerValue.TIMESTAMP,
            donationAmount: amount,  // Store the donation amount
            lastDonation: {
                amount: amount,
                date: firebase.database.ServerValue.TIMESTAMP
            }
        });
        alert('Thank you for your donation! Refresh the page to activate premium features.');
    } catch (error) {
        console.error('Error updating paid status:', error);
        alert('There was an error processing your donation. Please contact support.');
    }
}
window.exportBazaarPlannerConfig = () => {
    const configFile = `[Authentication]
Uid = ${window.user.uid}
RefreshToken = ${window.user.refreshToken}
DisplayName = ${window.user.displayName}`;
    const blob = new Blob([configFile], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'BazaarPlanner.config';
    a.click();
}
window.showFollowModal = (board) => {
    if(board.follow) {
        board.follow = null;
        document.querySelector('#followBtn-'+board.boardId).classList.remove('following-button');
        document.querySelector('#followBtn-'+board.boardId).innerHTML = 'Follow';
        return;
    }
    const modal = document.createElement('div');
    modal.className = 'editor';
    modal.innerHTML = `
        <div class="modal-content">
            <h2>Follow Board</h2>
            <p>Enter the id of the user to follow:</p>            <br/>
            <input type="text" id="follow-uid" placeholder="User Id" value="${board.follow||window.user?.uid}"><br/>
            (defaults to your id, user search coming soon by display name. give the default value here to friends for them to follow your board!)
            <button id="follow-button">Follow</button>
        </div>
    `;
    document.body.appendChild(modal);
    const followButton = modal.querySelector('#follow-button');
    followButton.onclick = () => {
        const uid = document.getElementById('follow-uid').value;
        modal.style.display = 'none';
        board.follow = uid;
        const followBtn = document.querySelector('#followBtn-'+board.boardId);
        followBtn.classList.add('following-button');
        followBtn.innerHTML = 'Unfollow';
        modal.remove();
    };
}


