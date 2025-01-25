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
        
        // Trigger arrays for various effects
        this.burnTriggers = [];
        this.hasteTriggers = [];
        this.poisonTriggers = [];
        this.healTriggers = [];
        this.shieldTriggers = [];
        this.critTriggers = [];
        this.ammoTriggers = [];
        this.largeItemTriggers = [];
        this.mediumItemTriggers = [];
        this.smallItemTriggers = [];
        this.lostShieldTriggers = new Map();
        this.board.reset();
    }
    smallItemTriggered(item) {
        this.smallItemTriggers.forEach(func => func(item));
    }
    mediumItemTriggered(item) {
        this.mediumItemTriggers.forEach(func => func(item));
    }
    largeItemTriggered(item) {
        this.largeItemTriggers.forEach(func => func(item));
    }
} 