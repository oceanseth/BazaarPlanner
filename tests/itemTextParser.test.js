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
    regenTriggers: new Map(),
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
global.items = items;
global.Item = Item;
global.skills = skills;

describe('Item Text Parser Tests', () => {
    beforeAll(() => {
        // Replace console.log with our capturing function
        console.log = (...args) => {
            originalConsoleLog(...args);
        };
    });

    afterAll(() => {
        // Restore original console.log
        console.log = originalConsoleLog;
    });

    // Test each item individually
    Object.entries(items).forEach(([itemName, itemData]) => {
        if(ItemFunction.doNothingItemNames.includes(itemName)) return;
        if(ItemFunction.items.get(itemName)) return;
        
        describe(`Item: ${itemName}`, () => {
            test('should parse all text patterns without errors', () => {
                const consoleOutput = [];
                const originalLog = console.log;
                
                // Capture console output
                console.log = (...args) => {
                    consoleOutput.push(args.join(' '));
                    originalLog(...args);
                };

                try {
                    const item = new Item(itemData, mockBoardInstance);

                    // If the item has text, process each text line
                    if (item.text && Array.isArray(item.text)) {
                        item.text.forEach((textLine, index) => {
                            try {
                                item.setupTextFunctions(textLine);
                            } catch (error) {
                                throw new Error(`Failed to parse text line ${index + 1}: "${textLine}" - ${error.message}`);
                            }
                        });
                    }

                    // Check for any unhandled cases
                    const unhandledCases = consoleOutput.filter(output => 
                        output.includes("No code yet written for this case!") ||
                        output.includes("Error processing item") ||
                        output.includes("Could not parse") ||
                        output.includes("Not currently parsing")
                    );

                    if (unhandledCases.length > 0) {
                        throw new Error(`Unhandled cases found:\n${unhandledCases.join('\n')}`);
                    }

                } catch (error) {
                    // Provide detailed context for AI debugging
                    const context = {
                        itemName,
                        itemData: JSON.stringify(itemData, null, 2),
                        error: error.message,
                        consoleOutput
                    };
                    
                    throw new Error(`Failed to process item "${itemName}":\n\nItem Data:\n${context.itemData}\n\nError:\n${context.error}\n\nConsole Output:\n${context.consoleOutput.join('\n')}`);
                } finally {
                    console.log = originalLog;
                }
            });

            test('should parse all enchant text patterns without errors', () => {
                if (!itemData.enchants) return;

                const consoleOutput = [];
                const originalLog = console.log;
                
                console.log = (...args) => {
                    consoleOutput.push(args.join(' '));
                    originalLog(...args);
                };

                try {
                    const item = new Item(itemData, mockBoardInstance);
                    
                    Object.entries(item.enchants).forEach(([enchantName, enchantText]) => {
                        if(enchantName === 'Radiant') return;
                        
                        try {
                            item.setupTextFunctions(enchantText);
                        } catch (error) {
                            throw new Error(`Failed to parse enchant "${enchantName}": "${enchantText}" - ${error.message}`);
                        }
                    });

                    const unhandledCases = consoleOutput.filter(output => 
                        output.includes("No code yet written for this case!") ||
                        output.includes("Error processing item")
                    );

                    if (unhandledCases.length > 0) {
                        throw new Error(`Unhandled enchant cases found:\n${unhandledCases.join('\n')}`);
                    }

                } catch (error) {
                    const context = {
                        itemName,
                        enchants: JSON.stringify(itemData.enchants, null, 2),
                        error: error.message,
                        consoleOutput
                    };
                    
                    throw new Error(`Failed to process enchants for "${itemName}":\n\nEnchants:\n${context.enchants}\n\nError:\n${context.error}\n\nConsole Output:\n${context.consoleOutput.join('\n')}`);
                } finally {
                    console.log = originalLog;
                }
            });

            test('should parse all quest text patterns without errors', () => {
                if (!itemData.quests) return;

                const consoleOutput = [];
                const originalLog = console.log;
                
                console.log = (...args) => {
                    consoleOutput.push(args.join(' '));
                    originalLog(...args);
                };

                try {
                    const item = new Item(itemData, mockBoardInstance);
                    
                    Object.entries(item.quests).forEach(([questKey, questText]) => {
                        try {
                            item.setupTextFunctions(questText);
                        } catch (error) {
                            throw new Error(`Failed to parse quest "${questKey}": "${questText}" - ${error.message}`);
                        }
                    });

                    const unhandledCases = consoleOutput.filter(output => 
                        output.includes("No code yet written for this case!") ||
                        output.includes("Error processing item")
                    );

                    if (unhandledCases.length > 0) {
                        throw new Error(`Unhandled quest cases found:\n${unhandledCases.join('\n')}`);
                    }

                } catch (error) {
                    const context = {
                        itemName,
                        quests: JSON.stringify(itemData.quests, null, 2),
                        error: error.message,
                        consoleOutput
                    };
                    
                    throw new Error(`Failed to process quests for "${itemName}":\n\nQuests:\n${context.quests}\n\nError:\n${context.error}\n\nConsole Output:\n${context.consoleOutput.join('\n')}`);
                } finally {
                    console.log = originalLog;
                }
            });
        });
    });

    // Test each skill individually
    Object.entries(skills).forEach(([skillName, skillData]) => {
        if(ItemFunction.items.get(skillName)) return;
        
        test(`Skill: ${skillName} should parse all text patterns without errors`, () => {
            const consoleOutput = [];
            const originalLog = console.log;
            
            console.log = (...args) => {
                consoleOutput.push(args.join(' '));
                originalLog(...args);
            };

            try {
                const skill = Skill.fromName(skillName, mockBoardInstance);
                skill.setup();

                const unhandledCases = consoleOutput.filter(output => 
                    output.includes("No code yet written for this case!") ||
                    output.includes("Error processing skill")
                );

                if (unhandledCases.length > 0) {
                    throw new Error(`Unhandled cases found:\n${unhandledCases.join('\n')}`);
                }

            } catch (error) {
                const context = {
                    skillName,
                    skillData: JSON.stringify(skillData, null, 2),
                    error: error.message,
                    consoleOutput
                };
                
                throw new Error(`Failed to process skill "${skillName}":\n\nSkill Data:\n${context.skillData}\n\nError:\n${context.error}\n\nConsole Output:\n${context.consoleOutput.join('\n')}`);
            } finally {
                console.log = originalLog;
            }
        });
    });
});

export default {}; 