import { Board } from './Board.js';
import { Player } from './Player.js';
import { Battle } from './Battle.js';
import { loadFromUrl } from './utils.js';
export class Run {
    static proxyBattle;
    static proxyTopPlayer;
    static proxyBottomPlayer;
    static cachedRuns = {};
    constructor({t, id, uid}) {
        this.t = t;
        this.id = id;
        this.uid = uid;
    }
    async loadData() { // Add a method to load encounters on demand
        await firebase.database()
            .ref(`/users/${window.user.uid}/runs/${this.id}`)
            .once('value')
            .then(runSnap => {
                Object.assign(this, runSnap.val());
                Run.cachedRuns[this.id] = this;
                this.t = parseInt(this.t);
                this.dateString = new Date(this.t).toLocaleString();
                this.element = document.createElement('div');
                this.element.id = `run-${this.id}`;
                this.totalWins = this.encounters.filter(e=>e.v=="1").length;
                this.totalLosses = this.encounters.filter(e=>e.v=="0").length;
                this.wins = this.encounters.filter(e=>e.v=="1" && e.name.match(/^Day [\d]+ - PvE/)==undefined).length;
                this.losses = this.encounters.filter(e=>e.v=="0" && e.name.match(/^Day [\d]+ - PvE/)==undefined).length;
                this.element.innerHTML = `
                    <h3>Run from ${this.dateString}</h3>
                    <select id="encounter-selector"><option value="" disabled selected>${this.encounters.length} Encounters</option>
                    ${this.encounters.map((e,i)=>`<option style="background-color: ${e.v=="0"?"#aa4444":"#44aa44"};" value="${i}">${e.v=="0"?"Loss":"Win"} - ${e.name}</option>`).join('')}
                    </select> <button id="load-encounter-in-sim-button">Load in Sim</button>
                    <div style="display:flex;flex-direction:row;margin-bottom:50px;">
                    <p>${this.day} Days with ${this.totalWins} Wins and ${this.totalLosses} Losses (${this.wins} Wins and ${this.losses} Losses to players)</p>
                    </div>
                    <div id="runBoard-${this.id}" class="board"></div>`;
                this.element.querySelector('#encounter-selector').onchange = (e) => {
                    this.loadEncounter(this.encounters[e.target.value]);
                };                
                this.element.querySelector('#load-encounter-in-sim-button').onclick = (e) => {
                    let encounterIndex = this.element.querySelector('#encounter-selector').value;
                    if(!encounterIndex) encounterIndex = this.lastEncounter;
                    window.location.href = Run.getRunUrl(this.id, encounterIndex, this.uid);
                };
            });
    }    
    //assume that the div with id runBoard-${this.id} exists
    //Board constructor(boardId, player, options={editable:true, skills: true}) {
    async loadEncounter(encounter=this.encounters[this.lastEncounter]) {
        if(Board.proxyBattle==null) {            
            Board.proxyTopPlayer = new Player();
            Board.proxyBottomPlayer = new Player();
            Board.proxyTopPlayer.hostileTarget = Board.proxyBottomPlayer;
            Board.proxyBottomPlayer.hostileTarget = Board.proxyTopPlayer;
            Board.proxyBattle = new Battle([Board.proxyTopPlayer,Board.proxyBottomPlayer]);
            new Board('runBoard-proxy', Board.proxyTopPlayer,{editable:false});
        }
        if(this.board) {
            Board.boards.delete(this.board.boardId);            
        }
        this.board = new Board(`runBoard-${this.id}`, Board.proxyBottomPlayer,{editable:false});
        this.boardStateStringBottomBoardOnly = Board.transformBoardIds(encounter.d, {'t':null, 'b':'runBoard-'+this.id});
        loadFromUrl(this.boardStateStringBottomBoardOnly);
        this.board.reset();
        this.board.setup();
    }
    static loadRunInSim(runId, encounterIndex, uid) {
        let run = Run.cachedRuns[runId];
        const f = () => {
            showSection('simulator');
            bottomPlayer.board.loadFullRun(run);
            $("#sim-encounter-select").val(encounterIndex).trigger('change');
        };
        if(!run) {
            firebase.database().ref(`/users/${uid}/runs/${runId}`).once('value').then(runSnap => {
                const runData = runSnap.val();
                runData.id = runId;
                run = new Run({t:runData.t, id:runData.id, uid:uid});
                Object.assign(run, runData);
                Run.cachedRuns[runId] = run;
                f();
            });
        } else {
            f();
        }        
    }
    static getRunUrl(runId, encounterIndex, uid) {
        return `#run=${runId}&e=${encounterIndex}&u=${uid}`;
    }
} 