import LZString from 'lz-string';
import {loadFromUrl} from './utils.js';
import { Player } from './Player.js';
import { Board } from './Board.js';
import { Battle } from './Battle.js';

export class Puzzle {
    static firstPuzzleDate = new Date("Feb 28 2025");
    static solved=false;
    static isLoading=true;
    static puzzleId=0;
    static puzzleGuess=0;
    static puzzleData=null;
    static battle=null;
    static initialContent = "";
    constructor() {
    }
    static loadPuzzle() {
        Puzzle.initialContent = document.getElementById("puzzle-content").innerHTML;
        firebase.database().ref(`puzzles/current`).once('value').then(snapshot => {
            Puzzle.currentPuzzleId = snapshot.val();
            Puzzle.puzzleId = Puzzle.currentPuzzleId;
            Puzzle.loadPuzzleById(Puzzle.puzzleId);
            Puzzle.updateSelect();
        });        
    }
    static loadPuzzleById(puzzleId) {
        if(Puzzle.battle!=null) {
            Puzzle.battle.resetBattle();
        }
        Puzzle.puzzleId = puzzleId;
        if(Puzzle.puzzleId) {
            firebase.database().ref(`puzzles/${Puzzle.puzzleId}/votes/${window.user.uid}`).once('value').then(snapshot =>{                        
                Puzzle.solved = snapshot.val()!=null;
                if(Puzzle.solved) {
                    Puzzle.guess = snapshot.val();
                    document.getElementById("puzzle-content").innerHTML = '';
                    showResults();
                } else {
                    document.getElementById("puzzle-content").innerHTML = Puzzle.initialContent;
                }
                Puzzle.isLoading = false;
                
            }); 
            Puzzle.loadPuzzleBoards();               
        }
    }
    static updateSelect() {
        if(!Puzzle.puzzleId) { return; }
        if(!Puzzle.selectElement) {
            Puzzle.selectElement = document.createElement("select");
            Puzzle.selectElement.id = "puzzle-select";
            for(let i = Puzzle.currentPuzzleId; i > 0; i--) {
                const option = document.createElement("option");
                option.value = i;
                option.innerHTML = `Puzzle ${i}`;
                Puzzle.selectElement.appendChild(option);
            }
            Puzzle.selectElement.addEventListener("change", (event) => {
                Puzzle.puzzleId = event.target.value;
                Puzzle.loadPuzzleById(Puzzle.puzzleId);
            });
            document.getElementById("puzzle").appendChild(Puzzle.selectElement);
        }
        Puzzle.selectElement.value = Puzzle.puzzleId;
        
    }
    static loadPuzzleBoards() {
        if(Puzzle.battle == null) {
            window.isLoadingFromUrl = true;
            const puzzleTopPlayer = new Player({},"puzzle-top",false);
            const puzzleBottomPlayer = new Player({},"puzzle-bottom",false);
            puzzleTopPlayer.hostileTarget = puzzleBottomPlayer;
            puzzleBottomPlayer.hostileTarget = puzzleTopPlayer;
            Puzzle.battle = new Battle([puzzleTopPlayer, puzzleBottomPlayer], ()=>{},$("#puzzle-combatlog"));
            window.isLoadingFromUrl = false;            
        }
        firebase.database().ref(`puzzles/${Puzzle.puzzleId}/data`).once('value').then(snapshot => {
            const data = snapshot.val();
            Puzzle.puzzleData = data;
            const titleElement = document.getElementById("puzzle-title");
            if(titleElement) titleElement.innerHTML = `Puzzle ${Puzzle.puzzleId}: ${data.title}`;
            let boardState = null;
            if(data && data.d) {
                boardState = JSON.parse(LZString.decompressFromEncodedURIComponent(data.d));
                
                boardState.forEach(item => {  
                    if(item.name=='_b_t') {
                        item.name = '_b_puzzle-top';
                        return;
                    }
                    if(item.name=='_b_b') {
                        item.name = '_b_puzzle-bottom';
                        return;
                    }
                    if(item.board=='t') {
                        item.board='puzzle-top';
                        return;
                    }
                    if(item.board=='b') {
                        item.board='puzzle-bottom';
                        return;
                    }
                });
            } else {
                alert("No puzzle for this date")
            }
            const stateStr = LZString.compressToEncodedURIComponent(JSON.stringify(boardState));
            loadFromUrl(stateStr);   
            let html = "";
            switch(data.type) {
                case 'vod':
                    html =`
            The two boards below are from a real player twitch vod sumission.<br/>
            Afer voting, we will reveal the answer, simulate the battle, and link to the vod.<br>
            If you guess within 10 of the correct answer, you will gain a point, be added to the leaderboard, and given the chance to submit your own puzzle!<br/><br/>
            <b>In 100 battles, how many times does the bottom board win?</b>`;
                    break;
                case 'sim':
                    html =`
            The two boards below were created in the simulator.
            Afer voting, we will reveal the answer and simulate the battle.
            If you guess within 10 of the correct answer, you will gain a point, be added to the leaderboard, and given the chance to submit your own puzzle!<br/><br/>
            <b>In 100 battles, how many times does the bottom board win?</b>`;
                    break;
            }
            const descriptionElement = document.getElementById("puzzle-description");
            if(descriptionElement) descriptionElement.innerHTML = html;
        });
    }

    static submitGuess() {
        if(Puzzle.isLoading) return;
        Puzzle.guess = document.getElementById("puzzle-guess-slider").value;
        firebase.database().ref(`puzzles/${Puzzle.puzzleId}/votes/${window.user.uid}`).set(Puzzle.guess);
        Puzzle.solved = true;
        showResults();
    }

};

function showResults() {
    firebase.database().ref(`puzzles/${Puzzle.puzzleId}/result`).once('value').then(snapshot => {
        const result = snapshot.val();
        let html = `<div style="display: flex; flex-direction: row; align-items: center; justify-content: center; gap: 20px;"><div>
                        <h1>Puzzle ${Puzzle.puzzleId} Solved!</h1>
                        <p>${Puzzle.puzzleData.title} : submitted by ${Puzzle.puzzleData.by}</p>
                        <p>Your guess: Bottom win rate ${Puzzle.guess}%.</p>
                        
                        <p>The bottom player will win or tie ${result.b} times out of 100.</p>
                        <p>The top player will win or tie ${result.t} times out of 100.</p>
                    `;
        if(Math.abs(Puzzle.guess -result.b)<=10) {
            html += `<p>You guessed within 10 points of the actual result!<br/>
            You have been awarded a point! (tracking and leaderboards will be updated soon)<br/>
            You are now eligible to <a href="javascript:Puzzle.submitPuzzle()">submit your own puzzle!</a></p>
            `;
        } else {
            html += `<p>You did not guess within 10 points of the actual result!<br/><br/>
            Better luck tomorrow!</p>`;
        }
        html+= `<button onclick="Puzzle.battle.resetBattle();Puzzle.battle.startBattle()">Run Battle</button>`;
        html+="</div>";
        if(result.vod) {
            html+= `<div style="width: 100%;"><iframe
    src="https://clips.twitch.tv/embed?clip=${result.vod}&parent=`+window.location.hostname+`"
    height="400"
    width="100%"
    allowfullscreen>
</iframe></div></div>
`;
        } 
        
        document.getElementById("puzzle-content").innerHTML = html;
        Puzzle.battle.startBattle();
    });
}

Puzzle.submitPuzzle = function() {
    let html = `
        <h1>Submit your own puzzle!</h1>
        Coming soon!
        <!--
        <form onsubmit="Puzzle.submitPuzzleForm(event)">
            <label>Title:</label> <input type="text" id="puzzle-title" placeholder="Title"><br/>
            <label>Description:</label> <textarea id="puzzle-description" placeholder="Description"></textarea><br/>
            <label>Vod URL:</label> <input type="text" id="puzzle-vod-url" placeholder="Vod URL"><br/>
            <label>BazaarPlanner URL:</label> <input type="text" id="puzzle-bazaarplanner-url" placeholder="BazaarPlanner URL"><br/>
            <button type="submit">Submit</button>
        </form>
        -->
    `;
    document.getElementById("puzzle-content").innerHTML = html;
}

Puzzle.submitPuzzleForm = function(event) {
    event.preventDefault();
    const title = document.getElementById("puzzle-title").value;
    const description = document.getElementById("puzzle-description").value;
    const vodUrl = document.getElementById("puzzle-vod-url").value;
    const bazaarplannerUrl = document.getElementById("puzzle-bazaarplanner-url").value;
    const puzzle = { title, description, vodUrl, d:bazaarplannerUrl, by: window.user.displayName, byUID: window.user.uid };
    firebase.database().ref(`puzzles/submissions`).push(puzzle).then(() => {
        document.getElementById("puzzle-content").innerHTML = `
            <h1>Puzzle submitted successfully!</h1>
            <p>Your puzzle will be reviewed by the admins and selected at random to be used as a puzzle.</p>
        `;
    });
}


