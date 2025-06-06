// Add structuredClone polyfill
global.structuredClone = obj => JSON.parse(JSON.stringify(obj));

// Create a mock board instance
const mockBoardInstance = {
    addItem: () => {},
    updateIncomeElement: () => {},
    items: [],
    activeItems: [],
    options: {
        editable: true,
    },
    itemTriggers: new Map(),
    hasteTriggers: new Map(),
    slowTriggers: new Map(),
    burnTriggers: new Map(),
    poisonTriggers: new Map(),
    shieldTriggers: new Map(),
    critTriggers: new Map(),
    freezeTriggers: new Map(),
    shieldValuesChangedTriggers: new Map(),
    itemValuesChangedTriggers: new Map(),
    startOfFightTriggers: new Map(),
    itemDestroyedTriggers: new Map(),
    transformTriggers: new Map(),
    reloadTriggers: new Map(),
    uniqueTypeTags: [],
    hasSlowedItemChanged: () => {},
    hasHastedItemChanged: () => {},
    hasFrozenItemChanged: () => {},
    updateHealthElement: () => {},
    player: {
        healthChanged: () => {},
        maxHealthChanged: () => {},
        shieldChanged: () => {},
        goldChanged: () => {},
        poisonChanged: () => {},
        regenChanged: () => {},
        burnChanged: () => {},
        incomeChanged: () => {},
        destroyTriggers: new Map(),
        overhealTriggers: new Map(),
        healTriggers: new Map(),
        itemTriggers: new Map(),
        useFriendTriggers: new Map(),
        useAnotherTechTriggers: new Map(),
        healthBelowHalfTriggers: new Map(),
        poisonTriggers: new Map(),
        critTriggers: new Map(),
        hasteTriggers: new Map(),
        slowTriggers: new Map(),
        burnTriggers: new Map(),
        dieTriggers: new Map(),
        lostShieldTriggers: new Map(),    
        overhealTriggers: new Map(),
        damageReduction:0,
        health:0,
        maxHealth:0,
        burn:0,
        poison:0,
        shield:0,
        gold:0,
        income:0,
        shield:0,
    }
};
mockBoardInstance.player.board = mockBoardInstance;
mockBoardInstance.player.hostileTarget = mockBoardInstance.player;
mockBoardInstance.player.battle = {
    log: () => {},
    battleRandom: () => {},
    pickRandom: () => {},
    sandstormTriggers: new Map(),
};

// Mock Board class
const mockBoard = {
    Board: class {
        constructor() {
            return mockBoardInstance;
        }
        static resetBoards = () => {};
        static handleDragStart = () => {};
        static handleDragEnd = () => {};
        static handleTouchStart = () => {};
        static handleTouchEnd = () => {};
    }
};

// Use dynamic import.meta.jest for mocking in ES modules
await import.meta.jest.mock('../js/Board.js', () => mockBoard);

global.log = () => {}; // Mock the log function if it exists

// Import your items data and Item class
import { items } from '../items.js';
import { skills } from '../skills.js';
import { Item } from '../js/Item.js';
import { Skill } from '../js/Skill.js';
import { ItemFunction } from '../js/ItemFunction.js';

// Store original console.log
const originalConsoleLog = console.log;
let consoleLogCount = 0;
global.items = items;
global.Item = Item;
global.skills = skills;

describe('Item Text Parser Tests', () => {
    beforeAll(() => {
        // Replace console.log with our capturing function
        console.log = (...args) => {
            consoleLogCount++;
            originalConsoleLog(...args);
        };
    });

    afterAll(() => {
        // Restore original console.log
        console.log = originalConsoleLog;
    });

    beforeEach(() => {
        // Clear console output before each test
        consoleLogCount = 0;
    });

    test('Parse all item text patterns', () => {
        // Process each item
        Object.entries(items).forEach(([itemName, itemData]) => {
            if(ItemFunction.doNothingItemNames.includes(itemName)) return;
            if(ItemFunction.items.get(itemName)) return;
            let oldConsoleLogCount = consoleLogCount;
            try {
                const item = new Item(itemData, mockBoardInstance); // Use mockBoardInstance here                

                // If the item has text, process each text line
                if (item.text && Array.isArray(item.text)) {
                    item.text.forEach(textLine => {
                        item.setupTextFunctions(textLine);
                    });

                }
            } catch (error) {
                console.log(`Error processing item ${itemName}:`, error);
            }
            if(consoleLogCount>oldConsoleLogCount) {
                console.log(`Error processing item ${itemName}:`);
            }
        });

        // If there were any console.log messages about unhandled cases, the test will show them
            expect(consoleLogCount).toBe(0);

        // Optional: Make the test fail if there are any unhandled cases
        // expect(consoleOutput.filter(output => output.includes("No code yet written for this case!"))).toHaveLength(0);
    });
    /*
    test('Parse all item enchant text patterns', () => {
        // Process each item
        Object.entries(items).forEach(([itemName, itemData]) => {
            if(ItemFunction.doNothingItemNames.includes(itemName)) return;
            try {
                const item = new Item(itemData, mockBoardInstance); // Use mockBoardInstance here                
                Object.entries(item.enchants).forEach(([enchantName, enchantData]) => {
                    if(enchantName=='Radiant') return;
                    item.setupTextFunctions(enchantData);
                });
            } catch (error) {
                console.log(`Error processing item ${itemName}:`, error);
            }
        });

        // If there were any console.log messages about unhandled cases, the test will show them
            expect(consoleLogCount).toBe(0);

        // Optional: Make the test fail if there are any unhandled cases
        // expect(consoleOutput.filter(output => output.includes("No code yet written for this case!"))).toHaveLength(0);
    });
    */
    test('Parse all skill text patterns', () => {
        // Process each skill
        Object.entries(skills).forEach(([skillName, skillData]) => {
            if(ItemFunction.items.get(skillName)) return;
            try {
                const skill = Skill.fromName(skillName, mockBoardInstance);
                skill.setup();
            } catch (error) {
                console.log(`Error processing skill ${skillName}:`, error);
            }

        });
        
        expect(consoleLogCount).toBe(0);
    });
});

export default {}; 