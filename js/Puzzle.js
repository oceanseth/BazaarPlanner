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
        if(Puzzle.puzzleId && window.user) {
            firebase.database().ref(`puzzles/${Puzzle.puzzleId}/votes/${window.user.uid}`).once('value').then(snapshot =>{                        
                Puzzle.solved = snapshot.val()!=null;
                if(Puzzle.solved) {
                    Puzzle.guess = snapshot.val();
                    document.getElementById("puzzle-content").innerHTML = '';
                    showResults();
                }
                Puzzle.isLoading = false;                
            });                           
        }
        Puzzle.loadPuzzleBoards(); 
    }
    static loadInSim() {
        if(Puzzle.battle!=null) {
            Puzzle.battle.resetBattle();
        }
        Puzzle.battle = new Battle([Puzzle.topPlayer, Puzzle.bottomPlayer], ()=>{},$("#puzzle-combatlog"));
        window.location.hash = "#"+Puzzle.puzzleData.d;
        window.showSection("simulator")
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
            Puzzle.topPlayer = new Player({},"puzzle-top",false);
            Puzzle.bottomPlayer = new Player({},"puzzle-bottom",false);
            Puzzle.topPlayer.hostileTarget = Puzzle.bottomPlayer;
            Puzzle.bottomPlayer.hostileTarget = Puzzle.topPlayer;
            Puzzle.battle = new Battle([Puzzle.topPlayer, Puzzle.bottomPlayer], ()=>{},$("#puzzle-combatlog"));
            window.isLoadingFromUrl = false;            
        }
        firebase.database().ref(`puzzles/${Puzzle.puzzleId}/data`).once('value').then(snapshot => {
            const data = snapshot.val();
            Puzzle.puzzleData = data;
            document.getElementById("puzzle-content").innerHTML = Puzzle.initialContent;
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
            document.getElementById("puzzle-slider-container").style.display = "none";
            document.getElementById("puzzle-select-container").style.display = "none";
            let html = "";
            if(data.vod) {
                html += getVodHTML(data.vod,true);
            }
            switch(data.type) {
                case 'vod':
                    html +=`
            The two boards below are from a real player twitch vod sumission.<br/>
            Afer voting, we will reveal the answer, simulate the battle, and link to the vod.<br>
            If you guess within 10 of the correct answer, you will gain a point, be added to the leaderboard, and given the chance to submit your own puzzle!<br/><br/>
            <b>In 100 battles, how many times does the bottom board win?</b>`;
            document.getElementById("puzzle-slider-container").style.display = "flex";
                    break;
                case 'sim':
                    html +=`
            The two boards below were created in the simulator.
            Afer gussing, we will reveal the answer and simulate the battle.
            If you guess within 10 of the correct answer, you will gain a point, be added to the leaderboard, and given the chance to submit your own puzzle!<br/><br/>
            <b>In 100 battles, how many times does the bottom board win?</b>`;
            document.getElementById("puzzle-slider-container").style.display = "flex";
                    break;
                case 'select':
                    html += data.desc+`<br/><br/><select id="puzzle-select-options"><option value="" disabled selected>Select one</option>
                        ${data.options.map(option => `<option value="${option}">${option}</option>`).join('')}
                    </select>`;
                    document.getElementById("puzzle-select-container").style.display = "flex";
                    break;
            }
           

            const descriptionElement = document.getElementById("puzzle-description");
            if(descriptionElement) descriptionElement.innerHTML = html;
        });
    }

    static submitGuess() {
        if(!window.user) {
            window.showLogin();
            return;
        }
        if(Puzzle.isLoading) return;
        if(Puzzle.puzzleData.type == 'select') {
            Puzzle.guess = document.getElementById("puzzle-select-options").value;
        } else {
            Puzzle.guess = document.getElementById("puzzle-guess-slider").value;
        }
        firebase.database().ref(`puzzles/${Puzzle.puzzleId}/votes/${window.user.uid}`).set(Puzzle.guess).then(()=>{
            Puzzle.solved = true;
            showResults();
        });
    }
    static runBattle() {
        Puzzle.battle.resetBattle();
        Puzzle.battle.startBattle();
        Puzzle.bottomPlayer.board.winRateElement.innerHTML = Puzzle.result.b + "%";
        Puzzle.topPlayer.board.winRateElement.innerHTML = Puzzle.result.t + "%";
        Puzzle.bottomPlayer.board.winRateElement.style.display = "block";
        Puzzle.topPlayer.board.winRateElement.style.display = "block";
    }
    static submitPuzzle() {
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
    static submitPuzzleForm(event) {
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
};

function showResults() {
    firebase.database().ref(`puzzles/${Puzzle.puzzleId}/result`).once('value').then(snapshot => {
        const result = snapshot.val();
        Puzzle.result = result;
        let win = false;
        if(Puzzle.puzzleData.type == 'select') {
            win = Puzzle.guess == result.answer;
        } else {
            win = Math.abs(Puzzle.guess -result.b)<=10;
        }
        let html = `<div class="puzzle-results"><div class="puzzle-results-left ${win?'puzzle-results-win':'puzzle-results-loss'}">
                        <h1>Puzzle ${Puzzle.puzzleId}</h1>
                        <p>${Puzzle.puzzleData.title} : submitted by ${Puzzle.puzzleData.by}</p>
                        <p>Your guess: ${Puzzle.guess}</p>
                        <p>Correct answer: ${result.answer || result.b}</p>
                    `;
                
 
        if(win) {
            html += `<p>You guessed correctly!<br/>
            You have been awarded a point! (tracking and leaderboards will be updated soon)<br/>
            You are now eligible to <a href="javascript:Puzzle.submitPuzzle()">submit your own puzzle!</a></p>
            `;
        } else {
            html += `<p>You did not guess correctly.</p>`;
        }    
        html+="</div>";
        if(result.vod) {
            html+=getVodHTML(result.vod);
            if(result.desc) {
                html+=`<div style="margin: 0 auto; width: 70%; background-color:rgba(0,0,0,.3); padding: 10px; border-radius: 10px;"><p><b>Analysis: </b> ${result.desc}</p></div>`;
            }
        }   else {
            if(result.desc) {
                html+= `<div style="justify-content: center; width: 70%; background-color:rgba(0,0,0,.3); padding: 10px; border-radius: 10px;"><p><b>Analysis: </b> ${result.desc}</p></div>`;
            }
            html+="</div>";
        }
        html+= `<div style="display: flex; justify-content: center; gap: 10px;"><button onclick="Puzzle.runBattle()">Re-run Battle</button> `;
        html+= `<button onclick="Puzzle.loadInSim()">Load in Simulator</button></div>`;
        
        document.getElementById("puzzle-content").innerHTML = html;
        Puzzle.runBattle();
    });
}


function getVodHTML(vodSlug,autoplay=false) {
    let html = "";
    if(vodSlug.includes("youtube.com")) {
        html+= `<div style="width: 100%;">
        <iframe width="560" height="315" src="${vodSlug}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
        </div></div>`;
    } else {
    html+= `<div style="width: 100%;">
    <iframe src="https://clips.twitch.tv/embed?clip=${vodSlug}&muted=false&parent=`+window.location.hostname+`${autoplay ? "&autoplay=true" : ""}"
    height="400"
    width="100%"
    allowfullscreen
    >
    </iframe></div></div>`;
    }
    return html;
}