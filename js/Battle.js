import { Board } from './Board.js';
export class Battle {
    static id=0;
    constructor(players,battleOverFunction,combatLogElement=null,battleIntervalSpeed=100,battleSeed=null,logging=true) { 
        this.id = Battle.id++;
        this.players = players;
        this.players.forEach(player => player.battle = this);
        this.battleOverFunction = battleOverFunction;
        this.battleInterval = undefined;
        this.battleSeed = battleSeed;
        this.logging = logging;
        this.sandstormValue = 1;
        this.sandstormIncrement = .25;
        this.battleIntervalSpeedMultiplier = 1;
        this.testBattleIntervals = [];
        this.winRateBattleCount = 100;

        this.startBattleTime = undefined;
        this.battleIntervalSpeed = battleIntervalSpeed;

        if(combatLogElement) {
            this.combatLog = combatLogElement;
            this.battleButton = document.querySelector('.battle-button');
        }
        this.isPaused = 0;
        this.pauseTime = 0;

        this.combatLogEntries = [];
    }

    updateCombatLogDisplay() {
        if(this.combatLog) {
            this.combatLog.val(this.combatLogEntries.join("\n"));
            this.combatLog[0].scrollTop = this.combatLog[0].scrollHeight;
        }
    }


    updateBattle(timeDiff) {
        let allItems = [];
        const allBoards = this.players.map(player => player.board);
        allBoards.forEach(board => {
            allItems.push(...board.items);
        });

        allItems.sort(()=>this.battleRandom() - .5);
        allItems.sort((a,b)=>b.priority-a.priority);
        allItems.forEach(item => item.updateBattle(timeDiff));
        allItems.forEach(item => item.updateTriggerValuesElement());
        allBoards.forEach(board => board.updateHealthElement());
        allBoards.forEach(board => board.player.updateBattle(timeDiff));
    }

    
    pauseBattle() {    
        clearInterval(this.battleInterval);
        this.isPaused=1;
        this.battleButton.textContent = 'Unpause Battle';
        this.battleButton.classList.remove('pause-battle');
    }


    unpauseBattle() {
        this.isPaused = 0;
        this.battleInterval = setInterval(this.battleFunction, this.battleIntervalSpeed/this.battleIntervalSpeedMultiplier);
        // Update button
        if(this.battleButton) {
            this.battleButton.textContent = 'Pause Battle';
            this.battleButton.classList.add('pause-battle');
        }
    }

    
    resetBattle() {
        if(this.battleInterval) {
            clearInterval(this.battleInterval);
        }
        this.isPaused=0;
        this.sandstormValue=1;
        this.battleInterval = null; // Clear the interval reference
        Board.resetBoards();
        // Reset button
        if(this.battleButton) {
            this.battleButton.textContent = 'Start Battle';
            this.battleButton.classList.remove('pause-battle');
        }
    }
        

    startBattle() {
        //console.log("Starting battle "+this.id);
        if(this.isPaused) {
            this.unpauseBattle();
            return;
        } else if (this.battleInterval && !this.isPaused) {
            this.pauseBattle();
            return;
        }

        this.resetBattle();
        // Generate a random seed (32 characters)
        // Using ASCII printable characters (33-126)
        this.battleSeed = [...crypto.getRandomValues(new Uint8Array(32))]
        .reduce((acc, x) => acc + String.fromCharCode(33 + (x % 94)), '');

        // Initialize the RNG with the seed
        this.battleRNG = new Math.seedrandom(this.battleSeed);
        this.combatLogEntries = [];
        this.log("Battle Started\nBattle Seed: " + this.battleSeed);
        
        this.players.forEach(player => player.board.startBattle());
        
        this.battleTimeDiff = 0;
        this.battleInterval = setInterval(this.battleFunction, this.battleIntervalSpeed/this.battleIntervalSpeedMultiplier);

        // Update button
        if(this.battleButton) {
            this.battleButton.textContent = 'Pause Battle';
            this.battleButton.classList.add('pause-battle');
        }

    }

    log(s) {
        if(this.logging) {
            this.combatLogEntries.push(this.battleTimeDiff + ": " + s);
        }
    }
    stopCalculating() {
        if(this.testBattleIntervals.length>0) {
            this.testBattleIntervals.forEach(interval => clearInterval(interval));
        }
    }
    calculateWinRate() {        
        topPlayer.board.winRateElement.style.display = "none";
        bottomPlayer.board.winRateElement.style.display = "none";
        if(!window.isPaidUser) return;
        if(this.testBattleIntervals.length>0) {
            this.stopCalculating();
        }
        let numTopPlayerWins =0;
        let numBottomPlayerWins =0;
        let numDraws = 0;
        let numBattles = this.winRateBattleCount;
        let numBattlesFinished = 0;
        this.testBattleIntervals = [];
        this.isCalculating = true;
        for(let i=0;i<numBattles;i++) {
            const testPlayers = [topPlayer,bottomPlayer].map(player => player.clone());
            testPlayers[0].hostileTarget = testPlayers[1];
            testPlayers[1].hostileTarget = testPlayers[0];
            const testBattle = new Battle(testPlayers,(winner)=>{
                if(winner==testPlayers[0]) numTopPlayerWins++;            
                else if(winner==testPlayers[1]) numBottomPlayerWins++;
                else numDraws++;
                numBattlesFinished++;
                if(numBattlesFinished==numBattles) {
                 //   console.log(testPlayers[0].name + " wins " + numTopPlayerWins + " times out of " + numBattles + " battles.");
                 //   console.log(testPlayers[1].name + " wins " + numBottomPlayerWins + " times out of " + numBattles + " battles.");
                 //   console.log("Draws: " + numDraws);
                    topPlayer.board.winRateElement.innerHTML = ((numTopPlayerWins+numDraws)/numBattles*100).toFixed(0) + "%";
                    bottomPlayer.board.winRateElement.innerHTML = ((numBottomPlayerWins+numDraws)/numBattles*100).toFixed(0) + "%";
                    topPlayer.board.winRateElement.style.display = "block";
                    bottomPlayer.board.winRateElement.style.display = "block";
                    this.isCalculating = false;
                }
            },null,100,null,false);
            testBattle.battleIntervalSpeedMultiplier = 100;
            testPlayers.forEach(player => player.battle=testBattle);
            testBattle.startBattle();
            this.testBattleIntervals.push(testBattle.battleInterval);
        }
    }
    

    battleFunction = () => {
        if(this.players.some(player => player.health <= 0)) {
            clearInterval(this.battleInterval);

            const playersWithPositiveHealth = this.players.filter(player => player.health > 0);

            this.players.forEach(player => {
                player.board.updateHealthElement();
            });

            if(playersWithPositiveHealth.length == 0) {
                this.log("Battle ended in a draw.");
                this.updateCombatLogDisplay();
                this.battleOverFunction(null);
                this.players.forEach(player => player.board.setAsWinner());
            } else {
                this.log(playersWithPositiveHealth[0].name + " wins!");
                this.updateCombatLogDisplay();
                playersWithPositiveHealth.forEach(player => player.board.setAsWinner());
                this.players.filter(player => player.health <= 0).forEach(player => player.board.setAsLoser());
                this.battleOverFunction(playersWithPositiveHealth[0]);
            }
            return;
        }
        this.battleTimeDiff += this.battleIntervalSpeed;
        
        this.updateBattle(this.battleIntervalSpeed);
    
      if(this.battleTimeDiff>30000) {
        let sandstormDmg = Math.floor(this.sandstormValue);
        this.log("Sandstorm deals "+ sandstormDmg + " damage to both players.");
        this.players.forEach(player => player.takeDamage(sandstormDmg));
        this.sandstormValue+=this.sandstormIncrement;
      }

    
      this.updateCombatLogDisplay();
    }
    battleRandom = (evaluateMe=false) =>{
        if (!this.battleRNG) {

            console.error('Battle RNG not initialized!');
            return Math.random(); // Fallback to regular random
        }
        if(evaluateMe) {
            return this.battleRNG() < evaluateMe;
        }
        return this.battleRNG();
    } 
    pickRandom = (array, count) => {
        if (array.length === 0) {
            if(count === undefined) return null;
            return [];
        }
        let theCount;
        if(count === undefined) theCount = 1;
        else if (count > array.length) theCount = array.length;   
        else theCount = count;


        // Create array of indices
        const indices = Array.from({ length: array.length }, (_, i) => i);
        const toReturn = [];
        
        // Select 'count' number of items
        for (let i = 0; i < theCount; i++) {
            const randomIndex = Math.floor(this.battleRandom() * indices.length);
            const selectedIndex = indices.splice(randomIndex, 1)[0];
            toReturn.push(array[selectedIndex]);
        }

        
        if (count === undefined) return toReturn[0];
        return toReturn;
    }   
}