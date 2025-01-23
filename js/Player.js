class Player {
    hostileTarget = null;
    constructor(name) {
        this.name = name;
        this.combatTime = 0;
        this.items = [];
        this.skills = [];
        this.maxHealth = 1000;
        this.health = 1000;
        this.burn = 0;
        this.poison = 0;
        this.shield = 0;
        
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
    }

    initialize(boardId, skillsContainer, maxHealth) {
        this.maxHealth = maxHealth;
        this.health = maxHealth;
        
        // Get items from board
        const board = new Board(boardId);
        board.player = this;
        this.board = board;
        this.items = Array.from(board.element.querySelectorAll('.merged-slot')).map(slot => ({
            element: slot,
            data: JSON.parse(slot.getAttribute('data-item')),
            lastTrigger: 0
        }));
        
        // Get skills from skills container
        const skillsDiv = document.getElementById(skillsContainer);
        if (skillsDiv) {
            this.skills = Array.from(skillsDiv.querySelectorAll('.skill-icon')).map(skill => ({
                element: skill,
                data: JSON.parse(skill.getAttribute('data-skill')),
                lastTrigger: 0
            }));
        }
        
    }
    takeDamage(damage, shieldScalar = 1, ignoreShield = false) {
        
        if(ignoreShield || this.shield <= 0) {
            this.health -= damage;
            return damage;
        }

        let shieldDamage = damage*shieldScalar;
        if(this.shield > shieldDamage) {
            this.shield -= shieldDamage;
            return shieldDamage;
        }
        else {
            this.health -= damage - this.shield;
            this.shield = 0;
            return damage;
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
    }
    reset() {
        this.combatTime = 0;
        this.burn = 0;
        this.poison = 0;
        this.shield = 0;
        this.health = this.maxHealth;
        this.board.reset();
    }
    smallItemTriggered() {
        this.smallItemTriggers.forEach(func => func());
    }
    mediumItemTriggered() {
        this.mediumItemTriggers.forEach(func => func());
    }
    largeItemTriggered() {
        this.largeItemTriggers.forEach(func => func());
    }
} 