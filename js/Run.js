import { Board } from './Board.js';
import { Player } from './Player.js';
import { Battle } from './Battle.js';
import { loadFromUrl } from './utils.js';
export class Run {
    static proxyBattle;
    static proxyTopPlayer;
    static proxyBottomPlayer;
    constructor({t, id}) {
        this.t = t;
        this.id = id;
    }
    async loadData() { // Add a method to load encounters on demand
        await firebase.database()
            .ref(`/users/${window.user.uid}/runs/${this.id}`)
            .once('value')
            .then(runSnap => {
                Object.assign(this, runSnap.val());
                this.t = parseInt(this.t);
                this.dateString = new Date(this.t).toLocaleString();
                this.element = document.createElement('div');
                this.element.id = `run-${this.id}`;
                this.element.innerHTML = `
                    <h3>Run from ${this.dateString}</h3>
                    <select id="encounter-selector"><option value="" disabled selected>${this.encounters.length} Encounters</option>
                    ${this.encounters.map((e,i)=>`<option style="background-color: ${e.v=="0"?"#aa4444":"#44aa44"};" value="${i}">${e.v=="0"?"Loss":"Win"} - ${e.name}</option>`).join('')}
                    </select> <button id="load-encounter-in-sim-button">Load in Sim</button>
                    <div style="display:flex;flex-direction:row;margin-bottom:50px;">
                    <p>${this.day} Days with ${this.wins} Wins and ${this.losses} Losses</p>
                    </div>
                    <div id="runBoard-${this.id}" class="board"></div>`;
                this.element.querySelector('#encounter-selector').onchange = (e) => {
                    this.loadEncounter(this.encounters[e.target.value]);
                };                
                this.element.querySelector('#load-encounter-in-sim-button').onclick = (e) => {
                    let encounterIndex = this.element.querySelector('#encounter-selector').value;
                    if(!encounterIndex) encounterIndex = this.lastEncounter;
                    window.location.href = "#"+this.encounters[encounterIndex].d;
                    showSection('simulator');
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
} 