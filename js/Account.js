export class Account {
    constructor() {
    }
    static updateDisplayName() {
        const displayName = document.getElementById("update-account-display-name").value;
        if(!window.user) {
            alert("Please sign in to update your display name");
            return;
        }
        firebase.database().ref(`usernames/${displayName}`).once('value').then(ss=>{
            if(ss.exists() && ss.val() !== window.user.displayName) {
                alert("Display name already taken");
                return;
            }
            firebase.database().ref(`usernames/${displayName}`).set(window.user.uid).then(()=>{
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
};

