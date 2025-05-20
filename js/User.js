export class User {
    static userIdMap = {};
    static userDisplayNameMap = {};

    constructor(id) {
        this.id = id;
        this.displayName = null;
        this.isDonor = false;
        this.isLoaded = false;
        this._loadPromise = null;
    }

    load() {
        if (this.isLoaded) {
            return Promise.resolve(this);
        }
        if (this._loadPromise) {
            return this._loadPromise;
        }

        this._loadPromise = firebase.database()
            .ref(`users/${this.id}`)
            .once('value')
            .then(snapshot => {
                const userData = snapshot.val() || {};
                this.displayName = userData.displayName || null;
                this.isDonor = userData.isDonor || false;
                this.isLoaded = true;
                User.userIdMap[this.id] = this;
                User.userDisplayNameMap[this.displayName] = this.id;
                return this;
            });

        return this._loadPromise;
    }

    static updateUserPresence() {
        if(!window.user) {
            return;
        }
        firebase.database().ref(`usersonline`).child(window.user.uid).set(firebase.database.ServerValue.TIMESTAMP);
    }
    static updateDisplayName() {
        const displayName = document.getElementById("update-user-display-name").value.replace(/[^0-9a-zA-Z]/g, '');
        if(!window.user) {
            alert("Please sign in to update your display name");
            return;
        }
        firebase.database().ref(`usernames/${displayName.trim().toLowerCase()}`).once('value').then(ss=>{
            if(ss.exists() && ss.val() !== window.user.uid) {
                alert("Display name already taken");
                return;
            }
            firebase.database().ref(`usernames/${displayName.trim().toLowerCase()}`).set(window.user.uid).then(()=>{
                firebase.database().ref(`users/${window.user.uid}/displayName`).set(displayName);
            });
                
            window.user.updateProfile({
                displayName: displayName,
            }).then(() => {
                window.user.reload();
                updateUserInfo(window.user);
            }).catch((error) => {
                alert("Error updating display name: " + error.message);
            });      
        });
    }
    static _activeUserCache = null;
    static _activeUsersPromise = null;
    static _lastCacheTime = null;
    static get activeUsers() {
        const CACHE_DURATION = 60*1000*5; // 5 minutes in milliseconds
        const now = Date.now();
        
        // Clear cache if it's older than 5 minutes
        if(User._lastCacheTime && (now - User._lastCacheTime > CACHE_DURATION)) {
            User._activeUserCache = null;
        }
        
        if(User._activeUserCache) {
            return Promise.resolve(User._activeUserCache);
        }
        if(User._activeUsersPromise) {
            return User._activeUsersPromise;
        }
        User._activeUsersPromise = firebase.database().ref(`usersonline`).orderByValue().limitToLast(100).once('value')
            .then(snapshot => {
                const users = [];
                snapshot.forEach(childSnapshot => {
                    const timestamp = childSnapshot.val();
                    if (now - timestamp > CACHE_DURATION) {
                        childSnapshot.ref.remove();
                    } else {
                        const user = new User(childSnapshot.key);
                        // Wait for user data to load before adding to array
                        users.push(user.load());
                    }
                });
                // Wait for all user loads to complete
                return Promise.all(users).then(loadedUsers => {
                    User._activeUserCache = loadedUsers;
                    User._lastCacheTime = now;
                    User._activeUsersPromise = null;
                    return User._activeUserCache;
                });
            });
        return User._activeUsersPromise;
    }
    static followUserById(uid) {
        window.bottomPlayer.board.follow = uid;
        const followBtn = document.querySelector('#followBtn-b');
        followBtn.classList.add('following-button');
        followBtn.innerHTML = 'Unfollow';
        showSection('simulator');
    }
    static followUserByName(name) {
        name = name.trim().toLowerCase();
        const uid = User.userDisplayNameMap[name];
        if(uid) {
            User.followUserById(uid);
            return;
        }
        firebase.database().ref(`usernames/${name}`).once('value').then(ss=>{
            if(ss.exists()) {
                User.followUserById(ss.val());
            } else {
                alert("User not found");
            }
        });
    }
};

