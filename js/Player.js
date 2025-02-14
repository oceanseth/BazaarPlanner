import { Board } from './Board.js';
import { updateUrlState, setupChangeListeners } from './utils.js';

export class Player {
    hostileTarget = null;
    static possibleChangeAttributes = ['health','shield','gold','maxHealth','burn'];
    constructor(startPlayerData) {
        setupChangeListeners(this, Player.possibleChangeAttributes );
        this.startPlayerData = startPlayerData;
        if(!startPlayerData.maxHealth) startPlayerData.maxHealth = 1000;
        if(!startPlayerData.income) startPlayerData.income = 5;
        if(!startPlayerData.level) startPlayerData.level = 1;
        if(!startPlayerData.gold) startPlayerData.gold = 0;
        if(!startPlayerData.regen) startPlayerData.regen = 0;
        Object.assign(this, startPlayerData);
    }

    initialize(boardId, skillsContainer, maxHealth) {
        this.maxHealth = maxHealth;
        
        const board = new Board(boardId, this);
        this.board = board;
        this.reset();
    }

    heal(healAmount) {
        if(this.health+healAmount>this.maxHealth) {
            healAmount = this.maxHealth-this.health;
            this.overhealTriggers.forEach(func => func(healAmount));
        }
        this.healTriggers.forEach(func => func(healAmount));
        this.health += healAmount;
        if(this.poison > 0) this.poison--; //cleanse 1 poison when a heal occurs
        if(this.burn > 0) this.burn--; //cleanse 1 burn when a heal occurs
    }

    openEditor() {
        if(this.editorElement) {
            this.editorElement.style.display = "block";
            return;
        }
        this.editorElement = document.createElement("div");
        this.editorElement.className = "editor";
        this.editorElement.innerHTML = `
            <h1>Edit Player</h1>

            <div class="form-row">
                <label for="player-name">Name:</label>
                <input type="text" id="player-name" value="${this.name}"/>
            </div>
            <div class="form-row">
                <label for="player-max-health">Health:</label>
                <input type="number" id="player-max-health" value="${this.maxHealth}"/>
            </div>
            <div class="form-row">
                <label for="player-income">Income:</label>
                <input type="number" id="player-income" value="${this.income}"/>
            </div>
            <div class="form-row">
                <label for="player-gold">Gold:</label>
                <input type="number" id="player-gold" value="${this.gold}"/>
            </div>
            <div class="form-row">
                <label for="player-regen">Regeneration:</label>
                <input type="number" id="player-regen" value="${this.regen}"/>
            </div>
            <div class="form-row">
                <label for="player-level">Level:</label>
                <input type="number" id="player-level" value="${this.level}"/>
            </div>
            <button id="save-player">Save</button>
        `;
        document.body.appendChild(this.editorElement);


        this.editorElement.querySelector("#save-player").addEventListener("click", () => {
            this.startPlayerData.name = this.editorElement.querySelector("#player-name").value;
            this.startPlayerData.maxHealth = parseInt(this.editorElement.querySelector("#player-max-health").value);
            this.startPlayerData.income = parseInt(this.editorElement.querySelector("#player-income").value);
            this.startPlayerData.level = parseInt(this.editorElement.querySelector("#player-level").value);
            this.startPlayerData.gold = parseInt(this.editorElement.querySelector("#player-gold").value);
            this.startPlayerData.regen = parseInt(this.editorElement.querySelector("#player-regen").value);

            this.editorElement.style.display = "none";
            Board.resetBoards();
            updateUrlState();
        });
    }

    takeDamage(damage, shieldScalar = 1, ignoreShield = false) {        
        if(ignoreShield || this.shield <= 0) {
            this.health -= damage;
            return damage;
        }

        let shieldDamage = damage*shieldScalar;
        if(this.shield >= shieldDamage) {
            this.shield -= shieldDamage;
            this.lostShieldTriggers.forEach(func => func(shieldDamage));
            return shieldDamage;
        }
        else {
            let healthDamage = (damage - this.shield/shieldScalar);
            let damageTaken = this.shield + healthDamage;
            this.health -= healthDamage;
            this.shield = 0;
            this.lostShieldTriggers.forEach(func => func(shieldDamage));
            return damageTaken;
        }
    }

    applyShield(shieldAmount) {
        this.shield += shieldAmount;
    }

    applyBurn(burnAmount) {
        this.burn += burnAmount;
    }   

    applyPoison(poisonAmount) {
        this.poison = this.poison + poisonAmount;
    }

    applyHeal(healAmount) {
        this.heal(healAmount);
    }

    gainRegen(regenAmount) {
        this.regen += regenAmount;
    }

    updateBattle(timeDiff) {
        this.battleTime += timeDiff;
        let dmg = 0;
        if(this.battleTime%500==0 && this.burn > 0) { // Burn damage every 500ms

            dmg = this.takeDamage(this.burn, .5, true);
            log( this.name + " has "+this.burn.toFixed(0)+" burn and burns for " + dmg.toFixed(0));
            this.burn--;
        }
        if(this.battleTime%1000==0 && this.poison > 0) { // Poison damage every 1000ms  
            this.takeDamage(this.poison, 1, true);
            log( this.name + " takes " + this.poison.toFixed(0) + " damage from poison.");
        }

        if(this.battleTime%1000==0 && this.regen > 0) { // Regen health every 1000ms
            this.health += this.regen;
            log( this.name + " regens " + this.regen.toFixed(0) + " health.");
        }

        if(this.fellBelowHalfHealth && this.health >= this.maxHealth/2) {            
            this.healthAboveHalfTriggers.forEach(func => func());
            this.fellBelowHalfHealth = false;
        } else if(this.health < this.maxHealth/2 && !this.fellBelowHalfHealth) {
            this.fellBelowHalfHealth = true;
            this.healthBelowHalfTriggers.forEach(func => func());
        }
        if(this.health <= 0) {
            this.dieTriggers.forEach(func => func());
        }
        this.board.updateHealthElement();
        this.board.updateDPSElement();
    }




    reset() {
        setupChangeListeners(this, Player.possibleChangeAttributes );
        Object.assign(this, this.startPlayerData);
        this.health = this.maxHealth;
        this.battleTime = 0;
        this.burn = 0;
        this.poison = 0;
        this.burn = 0;
        this.poison = 0;

        this.fellBelowHalfHealth = false;
        this.diedOnce = false;

        // Trigger arrays for various effects
        this.lostShieldTriggers = new Map();
        this.healthBelowHalfTriggers = new Map();
        this.healthAboveHalfTriggers = new Map();
        this.dieTriggers = new Map();
        this.overhealTriggers = new Map();
        this.healTriggers = new Map();

        this.board.reset();
    }
    setup() {
        this.board.setup();
    }
    setIncome(income) {
        this.income = income;
        this.board.updateIncomeElement();
    }
    addGold(goldAmount) {
        this.gold += goldAmount;
        this.board.updateGoldElement();
    }
    addIncome(incomeAmount) {
        this.income += incomeAmount;
        this.board.updateIncomeElement();
    }



} 