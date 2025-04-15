export class Run {
    constructor({day, lastEncounter, losses, wins, t, id}) {
        this.day = day;
        this.lastEncounter = lastEncounter;
        this.losses = losses;
        this.wins = wins;
        this.t = t;
        this.id = id;
    }
    async loadEncounters() { // Add a method to load encounters on demand
        await firebase.database()
            .ref(`/users/${window.user.uid}/runs/${this.id}`)
            .child('encounters')
            .once('value')
            .then(encountersSnap => {
                this.encounters = encountersSnap.val();
            });
    }    

    async getHtml() {
        if (!this.encounters) {
            await this.loadEncounters();
        }

        return `
            <div class="run">
                <h3>Run from ${new Date(this.t).toLocaleString()}</h3>
                <p>Day: ${this.day}</p>
                <p>Wins: ${this.wins} | Losses: ${this.losses}</p>
                <p>Encounters: ${this.encounters.length}</p>
            </div>
        `;
    }
} 