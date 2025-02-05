import { Board } from './Board.js';
import { updateUrlState } from './utils.js';
export class Player {
    hostileTarget = null;
    constructor(name) {
        this.name = name;
        this.combatTime = 0;
        this.skills = [];
        this.maxHealth = 1000;
        this.income = 5;
        this.level = 1;
    }

    initialize(boardId, skillsContainer, maxHealth) {
        this.maxHealth = maxHealth;
        this.health = maxHealth;
        
        const board = new Board(boardId);
        board.player = this;
        this.board = board;
        
        // Get skills from skills container
        const skillsDiv = document.getElementById(skillsContainer);
        if (skillsDiv) {
            this.skills = Array.from(skillsDiv.querySelectorAll('.skill-icon')).map(skill => ({
                element: skill,
                data: JSON.parse(skill.getAttribute('data-skill')),
                lastTrigger: 0
            }));
        }
        this.reset();
    }

    heal(healAmount) {
        this.health += healAmount;
        if(this.poison > 0) this.poison--; //cleanse 1 poison when a heal occurs
        if(this.health > this.maxHealth) this.health = this.maxHealth;
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

                <label for="player-level">Level:</label>
                <input type="number" id="player-level" value="${this.level}"/>
            </div>
            <button id="save-player">Save</button>
        `;
        document.body.appendChild(this.editorElement);


        this.editorElement.querySelector("#save-player").addEventListener("click", () => {
            this.name = this.editorElement.querySelector("#player-name").value;
            this.maxHealth = parseInt(this.editorElement.querySelector("#player-max-health").value);
            this.income = parseInt(this.editorElement.querySelector("#player-income").value);
            this.health = this.maxHealth;
            this.level = parseInt(this.editorElement.querySelector("#player-level").value);
            this.gold = parseInt(this.editorElement.querySelector("#player-gold").value);
            
            this.editorElement.style.display = "none";
            this.board.player.reset();
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
        this.poison += poisonAmount;
    }
    gainRegen(regenAmount) {
        this.regen += regenAmount;
    }



    updateCombat(timeDiff) {
        this.combatTime += timeDiff;
        this.board.updateCombat(timeDiff);
        let dmg = 0;
        if(this.combatTime%500==0 && this.burn > 0) { // Burn damage every 500ms
            dmg = this.takeDamage(this.burn, .5, true);
            log( this.name + " has "+this.burn+" burn and burns for " + dmg);
            this.burn--;
        }
        if(this.combatTime%1000==0 && this.poison > 0) { // Poison damage every 1000ms  
            this.takeDamage(this.poison, 1, true);
            log( this.name + " takes " + this.poison + " damage from poison.");
        }
        if(this.combatTime%1000==0 && this.regen > 0) { // Regen health every 1000ms
            this.health += this.regen;
            log( this.name + " regens " + this.regen + " health.");
        }
        if(this.fellBelowHalfHealth && this.health >= this.maxHealth/2) {            
            this.healthAboveHalfTriggers.forEach(func => func());
            this.fellBelowHalfHealth = false;
        } else if(this.health < this.maxHealth/2 && !this.fellBelowHalfHealth) {
            this.fellBelowHalfHealth = true;
            this.healthBelowHalfTriggers.forEach(func => func());
        }
        this.board.updateHealthElement();
    }



    reset() {
        this.combatTime = 0;
        this.burn = 0;
        this.poison = 0;
        this.shield = 0;
        this.health = this.maxHealth;
        this.burn = 0;
        this.poison = 0;
        this.shield = 0;
        this.regen = 0;
        if(this.gold==undefined) this.gold = 0;
        if(this.income==undefined) this.income = 5;
        this.fellBelowHalfHealth = false;
        this.diedOnce = false;
 
        // Trigger arrays for various effects
        this.lostShieldTriggers = new Map();
        this.healthBelowHalfTriggers = new Map();
        this.healthAboveHalfTriggers = new Map();
        this.dieTriggers = new Map();


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