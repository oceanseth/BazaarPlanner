export class Account {
    constructor() {
    }
    static updateDisplayName() {
        if(!window.user) {
            alert("Please sign in to update your display name");
            return;
        }
        window.user.updateProfile({
            displayName: document.getElementById("update-account-display-name").value,
        }).then(() => {
            window.user.reload();
            updateUserInfo(window.user);
        }).catch((error) => {
            alert("Error updating display name: " + error.message);
        });      
    }
};

