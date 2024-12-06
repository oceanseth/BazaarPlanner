class Player {
    constructor() {
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
    }

    initialize(boardId, skillsContainer, maxHealth) {
        this.maxHealth = maxHealth;
        this.health = maxHealth;
        
        // Get items from board
        const board = document.getElementById(boardId);
        this.items = Array.from(board.querySelectorAll('.merged-slot')).map(slot => ({
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
} 