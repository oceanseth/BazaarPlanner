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
    constructor() {
    }
    static loadPuzzle(date=new Date()) {
        if(Puzzle.battle!=null) {
            Puzzle.battle.resetBattle();
            return;
        }
        firebase.database().ref(`puzzles/current`).once('value').then(snapshot => {
            Puzzle.puzzleId = snapshot.val();
            if(Puzzle.puzzleId) {
                firebase.database().ref(`puzzles/${Puzzle.puzzleId}/votes/${window.user.uid}`).once('value').then(snapshot =>{                        
                    Puzzle.solved = snapshot.val()!=null;
                    if(Puzzle.solved) {
                        Puzzle.guess = snapshot.val();
                        document.getElementById("puzzle-content").innerHTML = '';
                        showResults();
                    }
                    Puzzle.isLoading = false;
                    
                }); 
                Puzzle.loadPuzzleBoards();               
            }
        });
        
    }
    static loadPuzzleBoards() {
        if(Puzzle.battle == null) {
            const puzzleTopPlayer = new Player();
            const puzzleBottomPlayer = new Player();
            puzzleTopPlayer.hostileTarget = puzzleBottomPlayer;
            puzzleBottomPlayer.hostileTarget = puzzleTopPlayer;
            if(Board.getBoardFromId("puzzle-top")) Board.getBoardFromId("puzzle-top").clear();
            if(Board.getBoardFromId("puzzle-bottom")) Board.getBoardFromId("puzzle-bottom").clear();
            const topBoard = new Board("puzzle-top",puzzleTopPlayer,false);
            const bottomBoard = new Board("puzzle-bottom",puzzleBottomPlayer,false);
            Puzzle.battle = new Battle([puzzleTopPlayer, puzzleBottomPlayer], ()=>{},$("#puzzle-combatlog"));
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
        let html = `
                        <h1>Puzzle ${Puzzle.puzzleId} Solved already!</h1>
                        <p>${Puzzle.puzzleData.title} : submitted by ${Puzzle.puzzleData.by}</p>
                        <p>Your guess: Bottom win rate ${Puzzle.guess}%.</p>
                        <div>
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
        html+= `<p>Watch the fight below and the vod on twitch: <a href='${result.vod}' target='_blank'>${result.vod}</a></p>
        <button onclick="Puzzle.battle.resetBattle();Puzzle.battle.startBattle()">Run Battle</button>`;
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


