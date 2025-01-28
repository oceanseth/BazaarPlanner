class Player {
    hostileTarget = null;
    constructor(name) {
        this.name = name;
        this.combatTime = 0;
        this.skills = [];
        this.maxHealth = 1000;
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
        this.board.updateHealthElement();
    }

    takeDamage(damage, shieldScalar = 1, ignoreShield = false) {        
        if(ignoreShield || this.shield <= 0) {
            this.health -= damage;
            this.board.updateHealthElement();
            return damage;
        }

        let shieldDamage = damage*shieldScalar;
        if(this.shield >= shieldDamage) {
            this.shield -= shieldDamage;
            this.lostShieldTriggers.forEach(func => func(shieldDamage));
            this.board.updateHealthElement();
            return shieldDamage;
        }
        else {
            let healthDamage = (damage - this.shield/shieldScalar);
            let damageTaken = this.shield + healthDamage;
            this.health -= healthDamage;
            this.shield = 0;
            this.lostShieldTriggers.forEach(func => func(shieldDamage));
            this.board.updateHealthElement();
            return damageTaken;
        }
    }

    applyShield(shieldAmount) {
        this.shield += shieldAmount;
        this.board.updateHealthElement();
    }
    applyBurn(burnAmount) {
        this.burn += burnAmount;
        this.board.updateHealthElement();
    }   
    applyPoison(poisonAmount) {
        this.poison += poisonAmount;
        this.board.updateHealthElement();
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
        this.gold = 0;
        
        // Trigger arrays for various effects
        this.lostShieldTriggers = new Map();

        this.board.reset();
    }
   
} 