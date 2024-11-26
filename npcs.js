var npcs = [];
npcs["VeteranOctopus"] =[
    {
        item: {
            name: "Tiny Cutlass",
            damage: 30,
            cooldown: 5,
            bottomText: "This deals double Crit damage",
            icon: "images/items/TinyCutlass.avif",
            size: 1,
            tags: { "weapon": 1 }
        },
        startIndex: 0,
        size: 1
    },
    {
        item: {
            name: "Tiny Cutlass",
            damage: 30,
            cooldown: 5,
            bottomText: "This deals double Crit damage",
            icon: "images/items/TinyCutlass.avif",
            size: 1,
            tags: { "weapon": 1 }
        },
        startIndex: 1,
        size: 1
    },
    {
        item: {
            name: "Tiny Cutlass",
            damage: 30,
            cooldown: 5,
            bottomText: "This deals double Crit damage", 
            icon: "images/items/TinyCutlass.avif",
            size: 1,
            tags: { "weapon": 1 }
        },
        startIndex: 2,
        size: 1
    },
    {
        item: {
            name: "Tiny Cutlass",
            damage: 30,
            cooldown: 5,
            bottomText: "This deals double Crit damage",
            icon: "images/items/TinyCutlass.avif",
            size: 1,
            tags: { "weapon": 1 }
        },
        startIndex: 3,
        size: 1
    },
    {
        item: {
            name: "Octopus",
            damage: 8,
            cooldown: 8,
            bottomText: "Multicast 8",
            icon: "images/items/Octopus.avif",
            size: 2,
            tags: { "weapon": 1 }
        },
        startIndex: 4,
        size: 2
    },
    {
        item: {
            name: "Tiny Cutlass",
            damage: 30,
            cooldown: 5,
            bottomText: "This deals double Crit damage",
            icon: "images/items/TinyCutlass.avif",
            size: 1,
            tags: { "weapon": 1 }
        },
        startIndex: 6,
        size: 1
    },
    {
        item: {
            name: "Tiny Cutlass",
            damage: 30,
            cooldown: 5,
            bottomText: "This deals double Crit damage",
            icon: "images/items/TinyCutlass.avif",
            size: 1,
            tags: { "weapon": 1 }
        },
        startIndex: 7,
        size: 1
    },
    {
        item: {
            name: "Tiny Cutlass",
            damage: 30,
            cooldown: 5,
            bottomText: "This deals double Crit damage",
            icon: "images/items/TinyCutlass.avif",
            size: 1,
            tags: { "weapon": 1 }
        },
        startIndex: 8,
        size: 1
    },
    {
        item: {
            name: "Tiny Cutlass",
            damage: 30,
            cooldown: 5,
            bottomText: "This deals double Crit damage",
            icon: "images/items/TinyCutlass.avif",
            size: 1,
            tags: { "weapon": 1 }
        },
        startIndex: 9,
        size: 1
    }
];
  $(document).ready(()=>{
    console.log("npcs is ",npcs);
    // Populate NPC selector dropdown
    for (const key in npcs) {
        if (npcs.hasOwnProperty(key)) {  // defensive programming
            $('#npc-selector').append($('<option>', {
                value: key,
                text: key
            }));
        }
    }

    // Handle NPC selection change
    $('#npc-selector').on('change', function() {
        const selectedNpc = $(this).val();
        if (npcs[selectedNpc]) {
            loadNpcBoard(npcs[selectedNpc]);
        }
    });
});

function loadNpcBoard(npcData, boardId = 'inventory-board') {
    // Clear the current board first
    initializeBoard(boardId);
    
    // Load each item from the NPC's inventory
    npcData.forEach(({item, startIndex, size}) => {
        placeItem(startIndex, size, item, boardId);
    });
}