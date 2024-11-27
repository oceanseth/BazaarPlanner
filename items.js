const items = {
  "Abacus": {
    "name": "Abacus",
    "icon": "images/items/Abacus.avif",
    "tier": "Gold",
    "tags": [
      "Pygmalien",
      "Small",
      "Economy",
      "Shield",
      "Tool"
    ],
    "description": [
      "Cooldown 4 seconds",
      "Shield equal to ( 1x » 2x ) the value of the adjacent items."
    ],
    "cooldown": 4,
    "enchants": {
      "Heavy": "Slow 1 item for 1 second(s).",
      "Golden": "Adjacent items have +50% Value.",
      "Icy": "Freeze 1 item for 1 second(s).",
      "Turbo": "Haste 1 item for 1 second(s).",
      "Shielded": "Double Shield",
      "Restorative": "Heal equal to the value of adjacent items.",
      "Toxic": "Poison 2.",
      "Fiery": "Burn 3.",
      "Shiny": "+1 Multicast",
      "Deadly": "+50% Crit Chance"
    }
  },
  "Agility Boots": {
    "name": "Agility Boots",
    "icon": "images/items/AgilityBoots.avif",
    "tier": "Bronze",
    "tags": [
      "Common",
      "Small",
      "Crit"
    ],
    "description": [
      "Adjacent items have ( +3% » +6% » +9% » +12% ) Crit chance.",
      "When you sell this, give your items ( +1% » +2% » +3% » +4% ) Crit Chance."
    ],
    "cooldown": null,
    "enchants": {
      "Shiny": "Double Crit Chance"
    }
  },
  "Alpha Ray": {
    "name": "Alpha Ray",
    "icon": "images/items/AlphaRay.avif",
    "tier": "Silver",
    "tags": [
      "Dooley",
      "Small",
      "Damage",
      "Weapon"
    ],
    "description": [
      "Cooldown 5 seconds",
      "Deal ( 5 » 10 » 15 ) damage.",
      "When you use the Core or another Ray, your Weapons gain ( +3 » +4 » +5 ) Damage for the fight."
    ],
    "cooldown": 5,
    "enchants": {
      "Heavy": "Slow 1 item for 1 second(s).",
      "Icy": "Freeze 1 item for 1 second(s).",
      "Turbo": "Haste 1 item for 1 second(s).",
      "Shielded": "Shield 20.",
      "Restorative": "Heal 30.",
      "Toxic": "Poison 2.",
      "Fiery": "Burn 4.",
      "Shiny": "+1 Multicast",
      "Deadly": "+50% Crit Chance",
      "Obsidian": "Lifesteal"
    }
  },
  "Amber": {
    "name": "Amber",
    "icon": "images/items/Amber.avif",
    "tier": "Silver",
    "tags": [
      "Mak",
      "Small",
      "Slow"
    ],
    "description": [
      "Cooldown 5 seconds",
      "Slow ( 1 » 2 » 3 ) items for 3 second(s).",
      "Your other Slow items have +1 Slow."
    ],
    "cooldown": 5,
    "enchants": {
      "Heavy": "Double Slow",
      "Icy": "Freeze 1 item for 1 second(s).",
      "Turbo": "Haste 1 item for 1 second(s).",
      "Shielded": "Shield 25.",
      "Restorative": "Heal 40.",
      "Toxic": "Poison 2.",
      "Fiery": "Burn 4.",
      "Shiny": "+1 Multicast"
    }
  },
  "Ambergris": {
    "name": "Ambergris",
    "icon": "images/items/Ambergris.avif",
    "tier": "Bronze",
    "tags": [
      "Vanessa",
      "Small",
      "Aquatic",
      "Economy",
      "Heal",
      "Value"
    ],
    "description": [
      "Cooldown 6 seconds",
      "Heal equal to ( 1x » 2x » 3x » 4x ) this item's value.",
      "When you buy another Aquatic item, this gains ( 1 » 2 » 3 » 4 ) Value."
    ],
    "cooldown": 6,
    "enchants": {
      "Heavy": "Slow 1 item for 1 second(s).",
      "Golden": "Double Value",
      "Icy": "Freeze 1 item for 1 second(s).",
      "Turbo": "Haste 1 item for 1 second(s).",
      "Shielded": "Shield equal to triple this item's value.",
      "Restorative": "Double Heal",
      "Toxic": "Poison 1.",
      "Fiery": "Burn 1.",
      "Shiny": "+1 Multicast",
      "Deadly": "+50% Crit Chance"
    }
  },
  "Anchor": {
    "name": "Anchor",
    "icon": "images/items/Anchor.avif",
    "tier": "Gold",
    "tags": [
      "Vanessa",
      "Medium",
      "Aquatic",
      "Damage",
      "Haste",
      "Weapon"
    ],
    "description": [
      "Cooldown 12 seconds",
      "Deal damage equal to ( 20% » 30% ) of your enemy's Max Health.",
      "When you use an adjacent item, this gains Haste for ( 2 » 4 ) second(s)."
    ],
    "cooldown": 12,
    "enchants": {
      "Heavy": "Slow 2 items for 4 second(s).",
      "Icy": "Freeze 1 item for 4 second(s).",
      "Turbo": "Haste 1 item for 2 second(s).",
      "Shielded": "Shield 120.",
      "Restorative": "Heal 180.",
      "Toxic": "Poison 12.",
      "Fiery": "Burn 18.",
      "Shiny": "+1 Multicast",
      "Deadly": "+50% Crit Chance",
      "Obsidian": "Lifesteal"
    }
  },
  "Angry Balloon Bot": {
    "name": "Angry Balloon Bot",
    "icon": "images/items/AngryBalloonBot.avif",
    "tier": "Silver",
    "tags": [
      "Dooley",
      "Medium",
      "Damage",
      "Friend",
      "Shield",
      "Weapon"
    ],
    "description": [
      "Cooldown 3 seconds",
      "Deal 10 damage.",
      "When you lose Shield, this gains damage equal to ( 10% » 20% » 40% ) of the Shield lost."
    ],
    "cooldown": 3,
    "enchants": {
      "Heavy": "Slow 2 items for 1 second(s).",
      "Icy": "Freeze 1 item for 1 second(s).",
      "Turbo": "Haste 2 items for 1 second(s).",
      "Shielded": "Shield 40.",
      "Restorative": "Heal 60.",
      "Toxic": "Poison 4.",
      "Fiery": "Burn 6.",
      "Shiny": "+1 Multicast",
      "Deadly": "+50% Crit Chance",
      "Obsidian": "Lifesteal"
    }
  },
  "Antimatter Chamber": {
    "name": "Antimatter Chamber",
    "icon": "images/items/AntimatterChamber.avif",
    "tier": "Diamond",
    "tags": [
      "Dooley",
      "Large"
    ],
    "description": [
      "Cooldown 10 seconds",
      "Destroy this and 3 small enemy items for the fight."
    ],
    "cooldown": 10,
    "enchants": {
      "Heavy": "Slow 3 items for 3 second(s).",
      "Icy": "Freeze 1 item for 4 second(s).",
      "Turbo": "Haste 3 items for 3 second(s).",
      "Shielded": "Shield 150.",
      "Restorative": "Heal 225.",
      "Toxic": "Poison 15.",
      "Fiery": "Burn 22.",
      "Shiny": "+1 Multicast"
    }
  },
  "Apropos Chapeau": {
    "name": "Apropos Chapeau",
    "icon": "images/items/AproposChapeau.avif",
    "tier": "Gold",
    "tags": [
      "Pygmalien",
      "Medium",
      "Damage",
      "Shield"
    ],
    "description": [
      "Cooldown 5 seconds",
      "Shield ( 30 » 60 ).",
      "When you Shield, adjacent weapons gain ( 10 » 20 ) damage for the fight."
    ],
    "cooldown": 5,
    "enchants": {
      "Heavy": "Slow 2 items for 2 second(s).",
      "Icy": "Freeze 1 item for 2 second(s).",
      "Turbo": "Haste 2 items for 2 second(s).",
      "Shielded": "Double Shield",
      "Restorative": "Heal 75.",
      "Toxic": "Poison 5.",
      "Fiery": "Burn 7.",
      "Shiny": "+1 Multicast",
      "Deadly": "+50% Crit Chance"
    }
  },
  "Arbalest": {
    "name": "Arbalest",
    "icon": "images/items/Arbalest.avif",
    "tier": "Silver",
    "tags": [
      "Vanessa",
      "Medium",
      "Damage",
      "Haste",
      "Weapon"
    ],
    "description": [
      "Cooldown 8 seconds",
      "Ammo Max 1",
      "Deal 100 damage.",
      "When you Haste, this gains ( 25 » 50 » 100 ) damage for the fight."
    ],
    "cooldown": 8,
    "enchants": {
      "Heavy": "Slow 2 items for 3 second(s).",
      "Icy": "Freeze 1 item for 3 second(s).",
      "Turbo": "Haste 2 items for 3 second(s).",
      "Shielded": "Shield 80.",
      "Restorative": "Heal 120.",
      "Toxic": "Poison 8.",
      "Fiery": "Burn 12.",
      "Shiny": "+1 Multicast",
      "Deadly": "+50% Crit Chance",
      "Obsidian": "Lifesteal"
    }
  },
  "Arken's Ring": {
    "name": "Arken's Ring",
    "icon": "images/items/ArkensRing.avif",
    "tier": "Diamond",
    "tags": [
      "Common",
      "Small"
    ],
    "description": [
      "When you sell this, recover 5 Prestige."
    ],
    "cooldown": null,
    "enchants": {}
  },
  "Armored Core": {
    "name": "Armored Core",
    "icon": "images/items/ArmoredCore.avif",
    "tier": "Bronze",
    "tags": [
      "Dooley",
      "Medium",
      "Charge",
      "Core",
      "Shield",
      "Unsellable"
    ],
    "description": [
      "Cooldown 7 seconds",
      "Shield ( 15 » 45 » 90 » 150 ).",
      "Give Shield items to the right of this ( +5 » +10 » +20 » +40 ) Shield for the fight.",
      "When you use any item to the left of this, Charge this 1 second(s)."
    ],
    "cooldown": 7,
    "enchants": {
      "Heavy": "Slow 2 items for 3 second(s).",
      "Icy": "Freeze 1 item for 3 second(s).",
      "Turbo": "Haste 2 items for 3 second(s).",
      "Shielded": "Double Shield",
      "Restorative": "Heal 120.",
      "Toxic": "Poison 8.",
      "Fiery": "Burn 12.",
      "Shiny": "+1 Multicast",
      "Deadly": "+50% Crit Chance"
    }
  },
  "Astrolabe": {
    "name": "Astrolabe",
    "icon": "images/items/Astrolabe.avif",
    "tier": "Silver",
    "tags": [
      "Vanessa",
      "Medium",
      "Haste",
      "Shield",
      "Tool"
    ],
    "description": [
      "Cooldown 4 seconds",
      "Shield ( 15 » 30 » 50 ).",
      "When you use a non-weapon item, it and this gains Haste ( 1 » 2 » 3 ) second(s)."
    ],
    "cooldown": 4,
    "enchants": {
      "Heavy": "Slow 2 items for 3 second(s).",
      "Icy": "Freeze 1 item for 3 second(s).",
      "Turbo": "Double Haste",
      "Shielded": "Double Shield",
      "Restorative": "Heal 60.",
      "Toxic": "Poison 4.",
      "Fiery": "Burn 6.",
      "Shiny": "+1 Multicast",
      "Deadly": "+50% Crit Chance"
    }
  },
  "Athanor": {
    "name": "Athanor",
    "icon": "images/items/Athanor.avif",
    "tier": "Bronze",
    "tags": [
      "Mak",
      "Large",
      "Burn",
      "Poison",
      "Property"
    ],
    "description": [
      "Cooldown 5 seconds",
      "Burn ( 2 » 4 » 6 » 8 ).",
      "Poison ( 1 » 2 » 3 » 4 ).",
      "Reload your Potions."
    ],
    "cooldown": 5,
    "enchants": {
      "Heavy": "Slow 3 items for 2 second(s).",
      "Icy": "Freeze 1 item for 3 second(s).",
      "Turbo": "Haste 3 items for 2 second(s).",
      "Shielded": "Shield 75.",
      "Restorative": "Heal 110.",
      "Toxic": "Double Poison",
      "Fiery": "Double Burn",
      "Shiny": "+1 Multicast",
      "Deadly": "+50% Crit Chance"
    }
  },
  "Atlas Stone": {
    "name": "Atlas Stone",
    "icon": "images/items/AtlasStone.avif",
    "tier": "Diamond",
    "tags": [
      "Pygmalien",
      "Medium",
      "Damage",
      "Weapon"
    ],
    "description": [
      "Cooldown 8 seconds",
      "Deal 1 damage.",
      "Double this item's damage for the fight."
    ],
    "cooldown": 8,
    "enchants": {
      "Heavy": "Slow 2 items for 3 second(s).",
      "Icy": "Freeze 1 item for 3 second(s).",
      "Turbo": "Haste 2 items for 3 second(s).",
      "Shielded": "Shield 1 double this item's shield for the fight",
      "Restorative": "Heal 1 double this item's healing for the fight",
      "Toxic": "Poison 1 double this item's poison for the fight",
      "Fiery": "Burn 1 double this item's burn for the fight",
      "Shiny": "+1 Multicast",
      "Deadly": "+50% Crit Chance",
      "Obsidian": "Lifesteal"
    }
  },
  "Atlatl": {
    "name": "Atlatl",
    "icon": "images/items/Atlatl.avif",
    "tier": "Bronze",
    "tags": [
      "Pygmalien",
      "Medium",
      "Cooldown",
      "Damage",
      "Weapon"
    ],
    "description": [
      "Cooldown 10 seconds",
      "Deal ( 20 » 40 » 60 » 80 ) damage.",
      "This item's cooldown is reduced by 1% for every 2 damage it has."
    ],
    "cooldown": 10,
    "enchants": {
      "Heavy": "Slow 2 items for 2 second(s).",
      "Icy": "Freeze 1 item for 2 second(s).",
      "Turbo": "Haste 2 items for 2 second(s).",
      "Shielded": "Shield 30.",
      "Restorative": "Heal 45.",
      "Toxic": "Poison 3.",
      "Fiery": "Burn 4.",
      "Shiny": "+1 Multicast",
      "Deadly": "+50% Crit Chance",
      "Obsidian": "Lifesteal"
    }
  },
  "ATM": {
    "name": "ATM",
    "icon": "images/items/ATM.avif",
    "tier": "Bronze",
    "tags": [
      "Pygmalien",
      "Medium",
      "Economy",
      "Income",
      "Property",
      "Shield"
    ],
    "description": [
      "Cooldown 3 seconds",
      "Gain Shield equal to ( 1x » 2x » 3x » 4x ) your Income.",
      "When you buy this, you gain ( 1 » 2 » 3 » 5 ) Income."
    ],
    "cooldown": 3,
    "enchants": {
      "Heavy": "Slow 2 items for 1 second(s).",
      "Golden": "This has double income bonus.",
      "Icy": "Freeze 1 item for 1 second(s).",
      "Turbo": "Haste 2 items for 1 second(s).",
      "Shielded": "Double Shield",
      "Restorative": "Heal 45.",
      "Toxic": "Poison 3.",
      "Fiery": "Burn 4.",
      "Shiny": "+1 Multicast",
      "Deadly": "+50% Crit Chance"
    }
  },
  "Atomic Clock": {
    "name": "Atomic Clock",
    "icon": "images/items/AtomicClock.avif",
    "tier": "Silver",
    "tags": [
      "Dooley",
      "Medium",
      "Tool"
    ],
    "description": [
      "Cooldown 1 seconds",
      "Ammo Max 3",
      "Increase a random enemy item's cooldown by ( 1 » 2 » 3 ) seconds for the fight."
    ],
    "cooldown": 1,
    "enchants": {
      "Heavy": "Slow 2 items for 2 second(s).",
      "Icy": "Freeze 1 item for 2 second(s).",
      "Turbo": "Haste 2 items for 2 second(s).",
      "Shielded": "Shield 60.",
      "Restorative": "Heal 90.",
      "Toxic": "Poison 6.",
      "Fiery": "Burn 9.",
      "Shiny": "+1 Multicast"
    }
  },
  "Bag of Jewels": {
    "name": "Bag of Jewels",
    "icon": "images/items/BagofJewels.avif",
    "tier": "Bronze",
    "tags": [
      "Common",
      "Small",
      "NonWeapon",
      "Passive"
    ],
    "description": [
      "Sells for gold"
    ],
    "cooldown": null,
    "enchants": {}
  },
  "Balcony": {
    "name": "Balcony",
    "icon": "images/items/Balcony.avif",
    "tier": "Silver",
    "tags": [
      "Pygmalien",
      "Medium",
      "Cooldown",
      "Property",
      "Value"
    ],
    "description": [
      "The Property to the left of this has double value in combat and has its cooldown reduced by ( 10% » 20% » 30% )."
    ],
    "cooldown": null,
    "enchants": {
      "Golden": "The Property to the left of this has triple value.",
      "Heavy": "When you use the property to the left of this, Slow 2 item for 2 second(s).",
      "Icy": "When you use the property to the left of this, Freeze 1 item for 2 second(s).",
      "Turbo": "When you use the property to the left of this, Haste 2 items for 2 second(s).",
      "Shielded": "When you use the property to the left of this, shield 20.",
      "Restorative": "When you use the property to the left of this, heal 30.",
      "Toxic": "When you use the property to the left of this, poison 2.",
      "Fiery": "When you use the property to the left of this, burn 3.",
      "Shiny": "The Property to the left has +1 Multicast.",
      "Deadly": "The Property to the left has +50% Crit Chance."
    }
  },
  "Ballista": {
    "name": "Ballista",
    "icon": "images/items/Ballista.avif",
    "tier": "Gold",
    "tags": [
      "Vanessa",
      "Large",
      "Ammo",
      "Damage",
      "Weapon"
    ],
    "description": [
      "Cooldown 10 seconds",
      "Ammo Max 2",
      "Deal ( 75 » 150 ) damage.",
      "When you use an ammo item, this gains ( 1 » 2 ) Multicast for the fight."
    ],
    "cooldown": 10,
    "enchants": {
      "Heavy": "Slow 3 items for 6 second(s).",
      "Icy": "Freeze 1 item for 9 second(s).",
      "Turbo": "Haste 3 items for 4 second(s).",
      "Shielded": "Shield 160.",
      "Restorative": "Heal 240.",
      "Toxic": "Poison 16.",
      "Fiery": "Burn 24.",
      "Shiny": "",
      "Deadly": "+50% Crit Chance",
      "Obsidian": "Lifesteal"
    }
  },
  "Balloon Bot": {
    "name": "Balloon Bot",
    "icon": "images/items/BalloonBot.avif",
    "tier": "Silver",
    "tags": [
      "Dooley",
      "Medium",
      "Friend",
      "Shield"
    ],
    "description": [
      "Cooldown 3 seconds",
      "When you use the weapon to the right of this, this gains ( 10 » 20 » 40 ) Shield for the fight.",
      "Shield 10."
    ],
    "cooldown": 3,
    "enchants": {
      "Heavy": "Slow 2 items for 1 second(s).",
      "Icy": "Freeze 1 item for 1 second(s).",
      "Turbo": "Haste 2 items for 1 second(s).",
      "Shielded": "Double Shield",
      "Restorative": "Heal 45.",
      "Toxic": "Poison 3.",
      "Fiery": "Burn 4.",
      "Shiny": "+1 Multicast",
      "Deadly": "+50% Crit Chance"
    }
  },
  "Bandages": {
    "name": "Bandages",
    "icon": "images/items/Bandages.avif",
    "tier": "Bronze",
    "tags": [
      "Pygmalien",
      "Small",
      "Heal",
      "Shield"
    ],
    "description": [
      "Cooldown 4 seconds",
      "Heal ( 5 » 10 » 15 » 20 ).",
      "Shield ( 5 » 10 » 15 » 20 )."
    ],
    "cooldown": 4,
    "enchants": {
      "Heavy": "Slow 1 item for 1 second(s).",
      "Icy": "Freeze 1 item for 1 second(s).",
      "Turbo": "Haste 1 item for 1 second(s).",
      "Shielded": "Double Shield",
      "Restorative": "Double Heal",
      "Toxic": "Poison 2.",
      "Fiery": "Burn 3.",
      "Shiny": "+1 Multicast",
      "Deadly": "+50% Crit Chance"
    }
  },
  "Bar of Gold": {
    "name": "Bar of Gold",
    "icon": "images/items/BarofGold.avif",
    "tier": "Bronze",
    "tags": [
      "Common",
      "Small",
      "NonWeapon",
      "Passive"
    ],
    "description": [
      "Sells for gold"
    ],
    "cooldown": null,
    "enchants": {}
  },
  "Barbed Wire": {
    "name": "Barbed Wire",
    "icon": "images/items/BarbedWire.avif",
    "tier": "Silver",
    "tags": [
      "Dooley",
      "Small",
      "Damage",
      "Shield",
      "Weapon"
    ],
    "description": [
      "Cooldown 4 seconds",
      "Deal 10 damage.",
      "When you Shield, this gains ( 5 » 10 » 20 ) Damage for the fight."
    ],
    "cooldown": 4,
    "enchants": {
      "Heavy": "Slow 1 item for 1 second(s).",
      "Icy": "Freeze 1 item for 1 second(s).",
      "Turbo": "Haste 1 item for 1 second(s).",
      "Shielded": "Shield 20.",
      "Restorative": "Heal 30.",
      "Toxic": "Poison 2.",
      "Fiery": "Burn 3.",
      "Shiny": "+1 Multicast",
      "Deadly": "+50% Crit Chance",
      "Obsidian": "Lifesteal"
    }
  },
  "Barrel": {
    "name": "Barrel",
    "icon": "images/items/Barrel.avif",
    "tier": "Silver",
    "tags": [
      "Vanessa",
      "Medium",
      "Shield"
    ],
    "description": [
      "Cooldown 4 seconds",
      "Shield 10.",
      "When you use a non-weapon item, this gains ( 10 » 20 » 30 ) Shield for the fight."
    ],
    "cooldown": 4,
    "enchants": {
      "Heavy": "Slow 2 items for 1 second(s).",
      "Icy": "Freeze 1 item for 1 second(s).",
      "Turbo": "Haste 2 items for 1 second(s).",
      "Shielded": "Double Shield",
      "Restorative": "Heal 60.",
      "Toxic": "Poison 4.",
      "Fiery": "Burn 6.",
      "Shiny": "+1 Multicast",
      "Deadly": "+50% Crit Chance"
    }
  },
  "Basilisk Fang": {
    "name": "Basilisk Fang",
    "icon": "images/items/BasiliskFang.avif",
    "tier": "Gold",
    "tags": [
      "Mak",
      "Small",
      "Crit",
      "Damage",
      "Poison",
      "Weapon"
    ],
    "description": [
      "Cooldown 3 seconds",
      "Lifesteal 100",
      "Deal ( 10 » 20 ) damage.",
      "When you Poison, this gains ( 10% » 20% ) Crit Chance for the fight."
    ],
    "cooldown": 3,
    "enchants": {
      "Heavy": "Slow 1 item for 1 second(s).",
      "Icy": "Freeze 1 item for 1 second(s).",
      "Turbo": "Haste 1 item for 1 second(s).",
      "Shielded": "Shield 15.",
      "Restorative": "Heal 20.",
      "Toxic": "Poison 1.",
      "Fiery": "Burn 2.",
      "Shiny": "+1 Multicast",
      "Deadly": "+50% Crit Chance"
    }
  },
  "Battery": {
    "name": "Battery",
    "icon": "images/items/Battery.avif",
    "tier": "Bronze",
    "tags": [
      "Dooley",
      "Small",
      "Ammo",
      "Charge",
      "Tool"
    ],
    "description": [
      "Cooldown 4 seconds",
      "Ammo Max 4",
      "Charge the item to the left of this ( 1 » 2 » 3 » 4 ) second(s)."
    ],
    "cooldown": 4,
    "enchants": {
      "Heavy": "Slow 1 item for 2 second(s).",
      "Icy": "Freeze 1 item for 1 second(s).",
      "Turbo": "Haste 1 item for 2 second(s).",
      "Shielded": "Shield 30.",
      "Restorative": "Heal 45.",
      "Toxic": "Poison 3.",
      "Fiery": "Burn 4.",
      "Shiny": "+1 Multicast",
      "Deadly": "Give the item to the left +25% Crit Chance for the fight."
    }
  },
  "Bayonet": {
    "name": "Bayonet",
    "icon": "images/items/Bayonet.avif",
    "tier": "Bronze",
    "tags": [
      "Vanessa",
      "Small",
      "Damage",
      "Weapon"
    ],
    "description": [
      "When you use the Weapon to the left of this, deal ( 5 » 15 » 30 » 50 ) damage."
    ],
    "cooldown": null,
    "enchants": {
      "Heavy": "When you use the weapon to the left of this, slow 1 items for 2 second(s).",
      "Icy": "When you use the weapon to the left of this, Freeze 1 item for 1 second(s).",
      "Turbo": "When you use the weapon to the left of this, Haste it for 2 second(s).",
      "Shielded": "When you use the weapon to the left of this, Shield 15.",
      "Restorative": "When you use the weapon to the left of this, Heal 20.",
      "Toxic": "When you use the weapon to the left of this, Poison 1.",
      "Fiery": "When you use the weapon to the left of this, burn 2.",
      "Shiny": "Double Damage",
      "Obsidian": "Lifesteal",
      "Deadly": "The weapon to the left has +50% Crit Chance."
    }
  },
  "Beach Ball": {
    "name": "Beach Ball",
    "icon": "images/items/BeachBall.avif",
    "tier": "Bronze",
    "tags": [
      "Vanessa",
      "Medium",
      "Aquatic",
      "Haste"
    ],
    "description": [
      "Cooldown 4 seconds",
      "Haste ( 1 » 2 » 3 » 4 ) Aquatic item(s) for 2 second(s)."
    ],
    "cooldown": 4,
    "enchants": {
      "Heavy": "Slow 2 items for 1 second(s).",
      "Icy": "Freeze 1 item for 1 second(s).",
      "Turbo": "Double Haste",
      "Shielded": "Shield 40.",
      "Restorative": "Heal 60.",
      "Toxic": "Poison 4.",
      "Fiery": "Burn 6.",
      "Shiny": "+1 Multicast",
      "Deadly": "Your Aquatic items gain +10% Crit Chance for the fight."
    }
  },
  "Beast of Burden": {
    "name": "Beast of Burden",
    "icon": "images/items/BeastofBurden.avif",
    "tier": "Bronze",
    "tags": [
      "Pygmalien",
      "Large",
      "Damage",
      "Friend",
      "Weapon"
    ],
    "description": [
      "Cooldown 10 seconds",
      "Deal 10 damage.",
      "When you buy another item, this gains ( 10 » 20 » 40 » 80 ) damage."
    ],
    "cooldown": 10,
    "enchants": {
      "Heavy": "Slow 3 items for 3 second(s).",
      "Golden": "When you buy an item, gain 1 Gold.",
      "Icy": "Freeze 1 item for 4 second(s).",
      "Turbo": "Haste 3 items for 3 second(s).",
      "Shielded": "Shield 150.",
      "Restorative": "Heal 225.",
      "Toxic": "Poison 15.",
      "Fiery": "Burn 22.",
      "Shiny": "+1 Multicast",
      "Deadly": "+50% Crit Chance",
      "Obsidian": "Lifesteal"
    }
  },
  "Beehive": {
    "name": "Beehive",
    "icon": "images/items/Beehive.avif",
    "tier": "Silver",
    "tags": [
      "Pygmalien",
      "Medium",
      "Damage",
      "Property"
    ],
    "description": [
      "When your enemy uses an item, use a Busy Bees.",
      "When you buy a Property, get a Busy Bee and give your Busy Bees ( +5 » +10 » +15 ) damage."
    ],
    "cooldown": null,
    "enchants": {
      "Golden": "When you buy a property, gain 1 Gold."
    }
  },
  "Bellelista": {
    "name": "Bellelista",
    "icon": "images/items/Bellelista.avif",
    "tier": "Silver",
    "tags": [
      "Dooley",
      "Medium",
      "Damage",
      "Friend",
      "Haste",
      "Weapon"
    ],
    "description": [
      "Cooldown 5 seconds",
      "Deal 20 damage.",
      "When this gains Haste, this gains ( 10 » 20 » 40 ) damage for the fight."
    ],
    "cooldown": 5,
    "enchants": {
      "Heavy": "Slow 2 items for 2 second(s).",
      "Icy": "Freeze 1 item for 2 second(s).",
      "Turbo": "Haste 2 items for 2 second(s).",
      "Shielded": "Shield 80.",
      "Restorative": "Heal 120.",
      "Toxic": "Poison 8.",
      "Fiery": "Burn 12.",
      "Shiny": "+1 Multicast",
      "Deadly": "+50% Crit Chance",
      "Obsidian": "Lifesteal"
    }
  },
  "Belt": {
    "name": "Belt",
    "icon": "images/items/Belt.avif",
    "tier": "Silver",
    "tags": [
      "Pygmalien",
      "Medium",
      "Health"
    ],
    "description": [
      "You have ( +50% » +75% » +100% ) Max Health."
    ],
    "cooldown": null,
    "enchants": {}
  },
  "Beta Ray": {
    "name": "Beta Ray",
    "icon": "images/items/BetaRay.avif",
    "tier": "Bronze",
    "tags": [
      "Dooley",
      "Small",
      "Freeze",
      "Haste"
    ],
    "description": [
      "Cooldown 6 seconds",
      "Freeze 1 small item for ( 1 » 2 » 3 » 4 ) second(s).",
      "When you use the Core or another Ray, give this Haste for ( 1 » 2 » 3 » 4 ) second(s)."
    ],
    "cooldown": 6,
    "enchants": {
      "Heavy": "Slow 1 item for 2 second(s).",
      "Icy": "Double Freeze",
      "Turbo": "Haste 1 item for 1 second(s).",
      "Shielded": "Shield 30.",
      "Restorative": "Heal 45.",
      "Toxic": "Poison 3.",
      "Fiery": "Burn 4.",
      "Shiny": "+1 Multicast"
    }
  },
  "Bill Dozer": {
    "name": "Bill Dozer",
    "icon": "images/items/BillDozer.avif",
    "tier": "Silver",
    "tags": [
      "Dooley",
      "Large",
      "Cooldown",
      "Damage",
      "Friend",
      "Vehicle",
      "Weapon"
    ],
    "description": [
      "Cooldown 5 seconds",
      "Deal 20 damage.",
      "When you use another Friend, this gains ( 10 » 20 » 30 ) damage for the fight.",
      "Your other Friends' cooldowns are reduced by ( 10% » 20% » 30% )."
    ],
    "cooldown": 5,
    "enchants": {
      "Heavy": "Slow 3 items for 2 second(s).",
      "Icy": "Freeze 1 item for 3 second(s).",
      "Turbo": "Haste 3 items for 2 second(s).",
      "Shielded": "Shield 75.",
      "Restorative": "Heal 110.",
      "Toxic": "Poison 7.",
      "Fiery": "Burn 11.",
      "Shiny": "+1 Multicast",
      "Deadly": "+50% Crit Chance",
      "Obsidian": "Lifesteal"
    }
  },
  "Billboard": {
    "name": "Billboard",
    "icon": "images/items/Billboard.avif",
    "tier": "Gold",
    "tags": [
      "Pygmalien",
      "Large",
      "Crit",
      "Economy",
      "Property",
      "Value"
    ],
    "description": [
      "Your Properties have ( +25% » +50% ) Crit Chance.",
      "Your other items have ( +1 » +2 ) value."
    ],
    "cooldown": null,
    "enchants": {
      "Golden": "Double Value",
      "Deadly": "Double Crit Chance"
    }
  },
  "Black Pepper": {
    "name": "Black Pepper",
    "icon": "images/items/BlackPepper.avif",
    "tier": "Bronze",
    "tags": [
      "Jules",
      "Small",
      "Burn",
      "Charge",
      "Food",
      "Multicast"
    ],
    "description": [
      "Cooldown 7 seconds",
      "Multicast 2",
      "Burn ( 1 » 2 » 3 » 4 ).",
      "Charge adjacent items ( 1 » 1 » 2 » 3 ) second(s)."
    ],
    "cooldown": 7,
    "enchants": {
      "Heavy": "Slow 1 item for 1 second(s).",
      "Icy": "Freeze 1 item for 1 second(s).",
      "Turbo": "Haste 1 item for 1 second(s).",
      "Shielded": "Shield 15.",
      "Restorative": "Heal 20.",
      "Toxic": "Poison 1.",
      "Fiery": "Double Burn",
      "Shiny": "+1 Multicast",
      "Deadly": "+50% Crit Chance"
    }
  },
  "Black Rose": {
    "name": "Black Rose",
    "icon": "images/items/BlackRose.avif",
    "tier": "Silver",
    "tags": [
      "Mak",
      "Small",
      "Heal",
      "Poison"
    ],
    "description": [
      "Cooldown 6 seconds",
      "Heal ( 15 » 30 » 50 ).",
      "When you Poison, charge this ( 1 » 1 » 2 ) second(s)."
    ],
    "cooldown": 6,
    "enchants": {
      "Heavy": "Slow 1 item for 2 second(s).",
      "Icy": "Freeze 1 item for 1 second(s).",
      "Turbo": "Haste 1 item for 2 second(s).",
      "Shielded": "Shield 30.",
      "Restorative": "Double Heal",
      "Toxic": "Poison 3.",
      "Fiery": "Burn 4.",
      "Shiny": "+1 Multicast",
      "Deadly": "+50% Crit Chance"
    }
  },
  "Blow Torch": {
    "name": "Blow Torch",
    "icon": "images/items/BlowTorch.avif",
    "tier": "Bronze",
    "tags": [
      "Stelle",
      "Small",
      "Burn",
      "Tool"
    ],
    "description": [
      "Cooldown 6 seconds",
      "Burn ( 2 » 4 » 6 » 8 )."
    ],
    "cooldown": 6,
    "enchants": {
      "Heavy": "Slow 1 item for 2 second(s).",
      "Icy": "Freeze 1 item for 1 second(s).",
      "Turbo": "Haste 1 item for 2 second(s).",
      "Shielded": "Shield 30.",
      "Restorative": "Heal 45.",
      "Toxic": "Poison 3.",
      "Fiery": "Double Burn",
      "Shiny": "+1 Multicast",
      "Deadly": "+50% Crit Chance"
    }
  },
  "Blowgun": {
    "name": "Blowgun",
    "icon": "images/items/Blowgun.avif",
    "tier": "Diamond",
    "tags": [
      "Vanessa",
      "Small",
      "Damage",
      "Poison",
      "Weapon"
    ],
    "description": [
      "Cooldown 6 seconds",
      "Deal 2 damage.",
      "Poison equal to this item's damage."
    ],
    "cooldown": 6,
    "enchants": {
      "Heavy": "Slow 1 item for 2 second(s).",
      "Icy": "Freeze 1 item for 1 second(s).",
      "Turbo": "Haste 1 item for 2 second(s).",
      "Shielded": "Shield equal to triple this item's damage.",
      "Restorative": "Heal equal to triple this item's damage.",
      "Toxic": "Double Poison",
      "Fiery": "Burn equal to the item's damage.",
      "Shiny": "+1 Multicast",
      "Deadly": "+50% Crit Chance",
      "Obsidian": "Lifesteal"
    }
  },
  "Blue Gumball": {
    "name": "Blue Gumball",
    "icon": "images/items/BlueGumball.avif",
    "tier": "Bronze",
    "tags": [
      "Common",
      "Small",
      "Crit",
      "NonWeapon",
      "Passive"
    ],
    "description": [
      "When you sell this, give your items ( +1% » +2% » +3% » +4% ) Crit Chance."
    ],
    "cooldown": null,
    "enchants": {}
  },
  "Blue Piggles L": {
    "name": "Blue Piggles L",
    "icon": "images/items/BluePigglesL.avif",
    "tier": "Bronze",
    "tags": [
      "Pygmalien",
      "Small",
      "Crit"
    ],
    "description": [
      "Cooldown 3 seconds",
      "The item to the left of this gains ( 4% » 8% » 12% » 16% ) Crit Chance for the fight."
    ],
    "cooldown": 3,
    "enchants": {}
  },
  "Blue Piggles R": {
    "name": "Blue Piggles R",
    "icon": "images/items/BluePigglesR.avif",
    "tier": "Bronze",
    "tags": [
      "Pygmalien",
      "Small",
      "Crit"
    ],
    "description": [
      "Cooldown 3 seconds",
      "Adjacent items gain ( 2% » 4% » 6% » 8% ) Crit Chance for the fight."
    ],
    "cooldown": 3,
    "enchants": {}
  },
  "Blue Piggles X": {
    "name": "Blue Piggles X",
    "icon": "images/items/BluePigglesX.avif",
    "tier": "Bronze",
    "tags": [
      "Pygmalien",
      "Small",
      "Crit"
    ],
    "description": [
      "Cooldown 3 seconds",
      "Give your items ( +1% » +2% » +3% » +4% ) Crit Chance for the fight."
    ],
    "cooldown": 3,
    "enchants": {}
  },
  "Bluenanas": {
    "name": "Bluenanas",
    "icon": "images/items/Bluenanas.avif",
    "tier": "Bronze",
    "tags": [
      "Common",
      "Small",
      "Food",
      "Heal",
      "Health"
    ],
    "description": [
      "Cooldown 9 seconds",
      "Heal ( 10 » 30 » 60 » 100 ).",
      "When you sell this, gain ( 20 » 60 » 120 » 200 ) Max Health."
    ],
    "cooldown": 9,
    "enchants": {
      "Heavy": "Slow 1 item for 3 second(s).",
      "Icy": "Freeze 1 item for 1 second(s).",
      "Turbo": "Haste 1 item for 3 second(s).",
      "Shielded": "Shield 45.",
      "Restorative": "Double Heal",
      "Toxic": "Poison 4.",
      "Fiery": "Burn 7.",
      "Shiny": "+1 Multicast",
      "Deadly": "+50% Crit Chance"
    }
  },
  "Blunderbuss": {
    "name": "Blunderbuss",
    "icon": "images/items/Blunderbuss.avif",
    "tier": "Gold",
    "tags": [
      "Vanessa",
      "Medium",
      "Ammo",
      "Burn",
      "Charge",
      "Damage",
      "Weapon"
    ],
    "description": [
      "Cooldown 4 seconds",
      "Ammo Max 6",
      "Deal ( 50 » 100 ) damage.",
      "When you Burn, charge this ( 1 » 2 ) second(s)."
    ],
    "cooldown": 4,
    "enchants": {
      "Heavy": "Slow 2 items for 1 second(s).",
      "Icy": "Freeze 1 item for 1 second(s).",
      "Turbo": "Haste 2 items for 1 second(s).",
      "Shielded": "Shield 40.",
      "Restorative": "Heal 60.",
      "Toxic": "Poison 4.",
      "Fiery": "Burn 6.",
      "Shiny": "+1 Multicast",
      "Deadly": "+50% Crit Chance",
      "Obsidian": "Lifesteal"
    }
  },
  "Bolas": {
    "name": "Bolas",
    "icon": "images/items/Bolas.avif",
    "tier": "Bronze",
    "tags": [
      "Vanessa",
      "Small",
      "Ammo",
      "Damage",
      "Slow",
      "Weapon"
    ],
    "description": [
      "Cooldown 4 seconds",
      "Ammo Max 2",
      "Deal ( 20 » 60 » 120 » 200 ) damage.",
      "Slow 1 item for ( 2 » 3 » 4 » 5 ) second(s)."
    ],
    "cooldown": 4,
    "enchants": {
      "Heavy": "+1 Slow Targets",
      "Icy": "Freeze 1 item for 1 second(s).",
      "Turbo": "Haste 1 item for 2 second(s).",
      "Shielded": "Shield 80.",
      "Restorative": "Heal 120.",
      "Toxic": "Poison 8.",
      "Fiery": "Burn 12.",
      "Shiny": "+1 Multicast",
      "Deadly": "+50% Crit Chance",
      "Obsidian": "Lifesteal"
    }
  },
  "Bomb Squad": {
    "name": "Bomb Squad",
    "icon": "images/items/BombSquad.avif",
    "tier": "Bronze",
    "tags": [
      "Dooley",
      "Small",
      "Burn",
      "Friend",
      "Haste"
    ],
    "description": [
      "Cooldown 7 seconds",
      "Burn ( 2 » 4 » 6 » 8 ).",
      "When you use an adjacent friend, this gains Haste for ( 2 » 3 » 4 » 5 ) second(s)."
    ],
    "cooldown": 7,
    "enchants": {
      "Heavy": "Slow 1 item for 2 second(s).",
      "Icy": "Freeze 1 item for 1 second(s).",
      "Turbo": "Haste 1 item for 2 second(s).",
      "Shielded": "Shield 30.",
      "Restorative": "Heal 45.",
      "Toxic": "Poison 3.",
      "Fiery": "Double Burn",
      "Shiny": "+1 Multicast",
      "Deadly": "+50% Crit Chance"
    }
  },
  "Booby Trap": {
    "name": "Booby Trap",
    "icon": "images/items/BoobyTrap.avif",
    "tier": "Silver",
    "tags": [
      "Pygmalien",
      "Medium",
      "Freeze"
    ],
    "description": [
      "When you use a Property, Freeze an item ( 1 » 2 » 3 ) second(s)."
    ],
    "cooldown": null,
    "enchants": {
      "Heavy": "When you use a Property, Slow 2 items for 2 second(s).",
      "Icy": "This has +1 second to Freeze.",
      "Turbo": "When you use a Property, Haste 2 items for 2 second(s).",
      "Shielded": "When you use a Property, Shield 20.",
      "Restorative": "When you use a Property, Heal 30.",
      "Toxic": "When you use a Property, Poison 3.",
      "Fiery": "When you use a Property, Burn 4.",
      "Deadly": "When you use a Property, your items gain 20% Crit Chance for the fight."
    }
  },
  "Bootstraps": {
    "name": "Bootstraps",
    "icon": "images/items/Bootstraps.avif",
    "tier": "Silver",
    "tags": [
      "Pygmalien",
      "Medium"
    ],
    "description": [
      "Every 50 you spend, upgrade a random item of a lower tier. [Gold Spent: 0]"
    ],
    "cooldown": null,
    "enchants": {
      "Heavy": "And make the item Heavy if able.",
      "Icy": "And make the item Icy if able.",
      "Turbo": "And make the item Turbo if able.",
      "Shielded": "And make the item Shielded if able.",
      "Restorative": "And make the item Restorative if able.",
      "Toxic": "And make the item Toxic if able.",
      "Fiery": "And make the item Fiery if able.",
      "Shiny": "And make the item Shiny if able.",
      "Deadly": "And make the item Deadly if able.",
      "Radiant": "And make the item Radiant if able.",
      "Obsidian": "And make the item Obsidian if able."
    }
  },
  "Bottled Lightning": {
    "name": "Bottled Lightning",
    "icon": "images/items/BottledLightning.avif",
    "tier": "Bronze",
    "tags": [
      "Mak",
      "Small",
      "Ammo",
      "Burn",
      "Damage",
      "Potion",
      "Weapon"
    ],
    "description": [
      "Cooldown 5 seconds",
      "Ammo Max 1",
      "Deal ( 25 » 75 » 150 » 250 ) damage.",
      "Burn ( 4 » 6 » 8 » 10 )."
    ],
    "cooldown": 5,
    "enchants": {
      "Heavy": "Slow 1 item for 1 second(s).",
      "Icy": "Freeze 1 item for 1 second(s).",
      "Turbo": "Haste 1 item for 1 second(s).",
      "Shielded": "Shield 25.",
      "Restorative": "Heal 40.",
      "Toxic": "Poison 2.",
      "Fiery": "Double Burn",
      "Shiny": "+1 Multicast",
      "Deadly": "+50% Crit Chance",
      "Obsidian": "Lifesteal"
    }
  },
  "Brass Knuckles": {
    "name": "Brass Knuckles",
    "icon": "images/items/BrassKnuckles.avif",
    "tier": "Bronze",
    "tags": [
      "Pygmalien",
      "Small",
      "Damage",
      "Weapon"
    ],
    "description": [
      "Cooldown 8 seconds",
      "Deal ( 5 » 15 » 30 » 50 ) damage.",
      "This has double damage."
    ],
    "cooldown": 8,
    "enchants": {
      "Heavy": "Slow 1 item for 2 second(s).",
      "Icy": "Freeze 1 item for 1 second(s).",
      "Turbo": "Haste 1 item for 2 second(s).",
      "Shielded": "Shield 40.",
      "Restorative": "Heal 60.",
      "Toxic": "Poison 4.",
      "Fiery": "Burn 6.",
      "Shiny": "+1 Multicast",
      "Deadly": "+50% Crit Chance",
      "Obsidian": "Lifesteal"
    }
  },
  "Brick Buddy": {
    "name": "Brick Buddy",
    "icon": "images/items/BrickBuddy.avif",
    "tier": "Bronze",
    "tags": [
      "Dooley",
      "Medium",
      "Friend",
      "Shield",
      "Vehicle"
    ],
    "description": [
      "Cooldown 5 seconds",
      "Shield ( 10 » 30 » 60 » 100 ).",
      "When you use an adjacent Friend, this gains ( 5 » 15 » 30 » 50 ) Shield for the fight."
    ],
    "cooldown": 5,
    "enchants": {
      "Heavy": "Slow 2 items for 2 second(s).",
      "Icy": "Freeze 1 item for 2 second(s).",
      "Turbo": "Haste 2 items for 2 second(s).",
      "Shielded": "Double Shield",
      "Restorative": "Heal 75.",
      "Toxic": "Poison 5.",
      "Fiery": "Burn 7.",
      "Shiny": "+1 Multicast",
      "Deadly": "+50% Crit Chance"
    }
  },
  "Briefcase": {
    "name": "Briefcase",
    "icon": "images/items/Briefcase.avif",
    "tier": "Bronze",
    "tags": [
      "Pygmalien",
      "Medium",
      "Damage",
      "Economy",
      "Weapon"
    ],
    "description": [
      "Cooldown 4 seconds",
      "Deal ( 10 » 30 » 60 » 100 ) damage.",
      "When you sell this, get 2 Spare Change."
    ],
    "cooldown": 4,
    "enchants": {
      "Heavy": "Slow 2 items for 1 second(s).",
      "Golden": "When you sell this, fill your board and stash with spare change instead.",
      "Icy": "Freeze 1 item for 1 second(s).",
      "Turbo": "Haste 2 items for 1 second(s).",
      "Shielded": "Shield 40.",
      "Restorative": "Heal 60.",
      "Toxic": "Poison 4.",
      "Fiery": "Burn 6.",
      "Shiny": "+1 Multicast",
      "Deadly": "+50% Crit Chance",
      "Obsidian": "Lifesteal"
    }
  },
  "Broken Shackles": {
    "name": "Broken Shackles",
    "icon": "images/items/BrokenShackles.avif",
    "tier": "Silver",
    "tags": [
      "Common",
      "Small",
      "Cooldown",
      "Damage"
    ],
    "description": [
      "Cooldown 6 seconds",
      "Your weapons gain ( 2 » 4 » 8 ) damage for the fight.",
      "When you use a Weapon, charge this 1 second(s)."
    ],
    "cooldown": 6,
    "enchants": {
      "Heavy": "Slow 1 item for 1 second(s).",
      "Icy": "Freeze 1 item for 1 second(s).",
      "Turbo": "Haste 1 item for 1 second(s).",
      "Shielded": "Shield 20.",
      "Restorative": "Heal 30.",
      "Toxic": "Poison 2.",
      "Fiery": "Burn 3.",
      "Shiny": "+1 Multicast",
      "Deadly": "Your weapons gain 10% Crit Chance for the fight."
    }
  },
  "Bulky Package": {
    "name": "Bulky Package",
    "icon": "images/items/BulkyPackage.avif",
    "tier": "Bronze",
    "tags": [
      "Common",
      "Medium",
      "Active",
      "NonWeapon",
      "Unsellable"
    ],
    "description": [
      "Farai will return for this"
    ],
    "cooldown": null,
    "enchants": {}
  },
  "Bunker": {
    "name": "Bunker",
    "icon": "images/items/Bunker.avif",
    "tier": "Silver",
    "tags": [
      "Dooley",
      "Large",
      "Crit",
      "Property",
      "Shield"
    ],
    "description": [
      "When you take damage, Shield equal to ( 30% » 40% » 50% ) of the damage dealt."
    ],
    "cooldown": null,
    "enchants": {
      "Heavy": "At the start of each fight, Slow 4 enemy items for 4 second(s).",
      "Icy": "At the start of each fight, Freeze 2 item for 4 second(s).",
      "Turbo": "At the start of each fight, Haste 4 items for 4 second(s).",
      "Shielded": "At the start of each fight, shield 0.",
      "Restorative": "You have +18 Regeneration.",
      "Toxic": "At the start of each fight, poison 18.",
      "Fiery": "At the start of each fight, burn 24."
    }
  },
  "Bushel": {
    "name": "Bushel",
    "icon": "images/items/Bushel.avif",
    "tier": "Bronze",
    "tags": [
      "Pygmalien",
      "Medium",
      "Heal",
      "Shield"
    ],
    "description": [
      "Cooldown 5 seconds",
      "Heal 10.",
      "When you Heal, Shield ( 10 » 20 » 30 » 40 )."
    ],
    "cooldown": 5,
    "enchants": {
      "Heavy": "When you Heal, Slow 1 item for 2 second(s).",
      "Icy": "When you Heal, Freeze 1 item for 1 second(s).",
      "Turbo": "When you Heal, Haste 1 item for 2 second(s).",
      "Shielded": "Double Shield",
      "Restorative": "Double Heal",
      "Toxic": "When you Heal, Poison 1.",
      "Fiery": "When you Heal, Burn 2.",
      "Shiny": "+1 Multicast",
      "Deadly": "+50% Crit Chance"
    }
  },
  "Business Card": {
    "name": "Business Card",
    "icon": "images/items/BusinessCard.avif",
    "tier": "Silver",
    "tags": [
      "Pygmalien",
      "Small",
      "Value"
    ],
    "description": [
      "When you visit a Merchant, this gains ( 1 » 2 » 3 ) value.",
      "For every 5 Merchants you visit, upgrade this. [Merchants Visited: 0]"
    ],
    "cooldown": null,
    "enchants": {
      "Golden": "Double Value",
      "Shiny": "This has +2 value gain."
    }
  },
  "Busy Bee": {
    "name": "Busy Bee",
    "icon": "images/items/BusyBee.avif",
    "tier": "Silver",
    "tags": [
      "Common",
      "Small",
      "Active",
      "Damage",
      "Friend",
      "Weapon"
    ],
    "description": [
      "Cooldown 8 seconds",
      "Deal ( 5 » 10 » 15 ) damage."
    ],
    "cooldown": 8,
    "enchants": {}
  },
  "Butter": {
    "name": "Butter",
    "icon": "images/items/Butter.avif",
    "tier": "Bronze",
    "tags": [
      "Jules",
      "Small",
      "Food",
      "Haste"
    ],
    "description": [
      "Cooldown 6 seconds",
      "Adjacent Food and Tools gain Haste for 3 second(s)."
    ],
    "cooldown": 6,
    "enchants": {
      "Heavy": "Slow 1 item for 2 second(s).",
      "Icy": "Freeze 1 item for 1 second(s).",
      "Turbo": "Double Haste",
      "Shielded": "Shield 30.",
      "Restorative": "Heal 45.",
      "Toxic": "Poison 3.",
      "Fiery": "Burn 4.",
      "Shiny": "+1 Multicast",
      "Deadly": "Your Food and Tools gain 20% Crit Chance for the fight."
    }
  },
  "Butterfly Swords": {
    "name": "Butterfly Swords",
    "icon": "images/items/ButterflySwords.avif",
    "tier": "Silver",
    "tags": [
      "Vanessa",
      "Small",
      "Damage",
      "Weapon"
    ],
    "description": [
      "Cooldown 7 seconds",
      "Multicast ( 2 » 3 » 4 )",
      "Deal 5 damage."
    ],
    "cooldown": 7,
    "enchants": {
      "Heavy": "Slow 1 item for 1 second(s).",
      "Icy": "Freeze 1 item for 1 second(s).",
      "Turbo": "Haste 1 item for 1 second(s).",
      "Shielded": "Shield 6.",
      "Restorative": "Heal 9.",
      "Toxic": "Poison 1.",
      "Fiery": "Burn 1.",
      "Shiny": "+1 Multicast",
      "Deadly": "+50% Crit Chance",
      "Obsidian": "Lifesteal"
    }
  },
  "Caltrops": {
    "name": "Caltrops",
    "icon": "images/items/Caltrops.avif",
    "tier": "Diamond",
    "tags": [
      "Pygmalien",
      "Medium",
      "Damage",
      "Weapon"
    ],
    "description": [
      "When your enemy uses an item, deal 1 damage."
    ],
    "cooldown": null,
    "enchants": {
      "Heavy": "When your enemy uses an item, Slow 1 item for 2 second(s).",
      "Icy": "When your enemy uses an item, Freeze 1 item for 1 second(s).",
      "Turbo": "When your enemy uses an item, Haste 1 item for 2 second(s).",
      "Shielded": "When your enemy uses an item, Shield 15.",
      "Restorative": "When your enemy uses an item, Heal 20.",
      "Toxic": "When your enemy uses an item, Poison 1.",
      "Fiery": "When your enemy uses an item, Burn 2.",
      "Deadly": "When your enemy uses an item, your items gain 5% Crit Chance for the fight.",
      "Obsidian": "Lifesteal"
    }
  },
  "Candy Mail": {
    "name": "Candy Mail",
    "icon": "images/items/CandyMail.avif",
    "tier": "Bronze",
    "tags": [
      "Common",
      "Medium",
      "Ammo",
      "Food",
      "Shield"
    ],
    "description": [
      "Cooldown 4 seconds",
      "Ammo Max 10",
      "Adjacent Shield items permanently gain ( +1 » +2 » +3 » +4 ) Shield.",
      "This permanently loses 1 Max Ammo."
    ],
    "cooldown": 4,
    "enchants": {}
  },
  "Cannon": {
    "name": "Cannon",
    "icon": "images/items/Cannon.avif",
    "tier": "Bronze",
    "tags": [
      "Vanessa",
      "Medium",
      "Ammo",
      "Burn",
      "Damage",
      "Weapon"
    ],
    "description": [
      "Cooldown 4 seconds",
      "Ammo Max 2",
      "Deal ( 25 » 75 » 150 » 250 ) damage.",
      "Burn ( 3 » 6 » 9 » 12 )."
    ],
    "cooldown": 4,
    "enchants": {
      "Heavy": "Slow 2 items for 6 second(s).",
      "Icy": "Freeze 1 item for 6 second(s).",
      "Turbo": "Haste 2 items for 6 second(s).",
      "Shielded": "Shield 100.",
      "Restorative": "Heal 150.",
      "Toxic": "Poison 10.",
      "Fiery": "Double Burn",
      "Shiny": "+1 Multicast",
      "Deadly": "+50% Crit Chance",
      "Obsidian": "Lifesteal"
    }
  },
  "Cannonade": {
    "name": "Cannonade",
    "icon": "images/items/Cannonade.avif",
    "tier": "Gold",
    "tags": [
      "Vanessa",
      "Large",
      "Damage",
      "Weapon"
    ],
    "description": [
      "When you use a weapon, deal ( 50 » 100 ) damage."
    ],
    "cooldown": null,
    "enchants": {
      "Heavy": "When you use a weapon, slow 1 item for 3 second(s).",
      "Icy": "When you use a weapon, freeze 1 item for 1 second(s).",
      "Turbo": "When you use a weapon, haste 1 item for 3 second(s).",
      "Shielded": "When you use a weapon, shield 30.",
      "Restorative": "When you use a weapon, heal 45.",
      "Toxic": "When you use a weapon, poison 3.",
      "Fiery": "When you use a weapon, burn 4.",
      "Shiny": "Double Damage",
      "Obsidian": "Lifesteal",
      "Deadly": "When you use a weapon, it gains 10% Crit Chance for the fight."
    }
  },
  "Cannonball": {
    "name": "Cannonball",
    "icon": "images/items/Cannonball.avif",
    "tier": "Bronze",
    "tags": [
      "Vanessa",
      "Small",
      "Ammo"
    ],
    "description": [
      "Adjacent items have ( +1 » +2 » +3 » +4 ) Ammo."
    ],
    "cooldown": null,
    "enchants": {
      "Heavy": "At the start of the fight, Slow 2 items for 4 second(s).",
      "Icy": "At the start of each fight, Freeze 1 item for 4 second(s).",
      "Turbo": "At the start of the fight, Haste adjacent items for 3 second(s).",
      "Shielded": "Adjacent Shield items have +20 Shield.",
      "Restorative": "Adjacent items have +30 Heal.",
      "Toxic": "Adjacent Poison items have +3 Poison.",
      "Fiery": "Adjacent Burn items have +2 Burn.",
      "Shiny": "This has double Ammo bonus.",
      "Deadly": "Adjacent ammo items have +25% Crit Chance."
    }
  },
  "Captain's Wheel": {
    "name": "Captain's Wheel",
    "icon": "images/items/CaptainsWheel.avif",
    "tier": "Silver",
    "tags": [
      "Vanessa",
      "Medium",
      "Aquatic",
      "Haste",
      "Tool"
    ],
    "description": [
      "Cooldown 4 seconds",
      "Haste adjacent items for ( 1 » 2 » 3 ) second(s).",
      "When you use a large item, use this."
    ],
    "cooldown": 4,
    "enchants": {
      "Heavy": "Slow 2 items for 1 second(s).",
      "Icy": "Freeze 1 item for 1 second(s).",
      "Turbo": "Double Haste",
      "Shielded": "Shield 40.",
      "Restorative": "Heal 60.",
      "Toxic": "Poison 4.",
      "Fiery": "Burn 6.",
      "Shiny": "+1 Multicast"
    }
  },
  "Cargo Shorts": {
    "name": "Cargo Shorts",
    "icon": "images/items/CargoShorts.avif",
    "tier": "Silver",
    "tags": [
      "Pygmalien",
      "Medium",
      "Economy"
    ],
    "description": [
      "When you buy, sell or upgrade this, get 1 Candy and 1 Spare Change."
    ],
    "cooldown": null,
    "enchants": {
      "Golden": "Get 2 Gumballs and Spare Change instead.",
      "Shiny": "Get 2 Gumballs and Spare Change instead."
    }
  },
  "Cash Cannon": {
    "name": "Cash Cannon",
    "icon": "images/items/CashCannon.avif",
    "tier": "Silver",
    "tags": [
      "Pygmalien",
      "Medium",
      "Damage",
      "Economy",
      "Weapon"
    ],
    "description": [
      "Cooldown 6 seconds",
      "Deal 20 damage.",
      "When you gain gold, permanently give this + damage equal to ( 1x » 2x » 3x ) the amount of gold gained."
    ],
    "cooldown": 6,
    "enchants": {
      "Heavy": "Slow 2 items for 2 second(s).",
      "Golden": "This gains additional damage equal equal to value of the gold gained.",
      "Icy": "Freeze 1 item for 2 second(s).",
      "Turbo": "Haste 2 items for 2 second(s).",
      "Shielded": "Shield equal to this item's damage.",
      "Restorative": "Heal equal to this item's damage.",
      "Toxic": "Poison 4.",
      "Fiery": "Burn 6.",
      "Shiny": "+1 Multicast",
      "Deadly": "+50% Crit Chance",
      "Obsidian": "Lifesteal"
    }
  },
  "Cash Register": {
    "name": "Cash Register",
    "icon": "images/items/CashRegister.avif",
    "tier": "Bronze",
    "tags": [
      "Pygmalien",
      "Medium",
      "Economy",
      "Tool"
    ],
    "description": [
      "At the start of each day, get 3 Spare Change."
    ],
    "cooldown": null,
    "enchants": {
      "Golden": "You have +3 Income.",
      "Shiny": "At the start of each hour, get an additional 2 Spare Change."
    }
  },
  "Catalyst": {
    "name": "Catalyst",
    "icon": "images/items/Catalyst.avif",
    "tier": "Silver",
    "tags": [
      "Mak",
      "Small",
      "Haste"
    ],
    "description": [
      "When you use the item to the left of this, haste the item to the right of this for ( 1 » 2 » 3 ) second(s)."
    ],
    "cooldown": null,
    "enchants": {
      "Heavy": "When you use the item to the left of this, Slow 1 item for 2 second(s).",
      "Icy": "When you use the item to the left of this, Freeze 1 item for 1 second(s).",
      "Turbo": "Double Haste",
      "Shielded": "When you use the item to the left of this, Shield 15.",
      "Restorative": "When you use the item to the left of this, Heal 20.",
      "Toxic": "When you use the item to the left of this, Poison 1.",
      "Fiery": "When you use the item to the left of this, Burn 2.",
      "Deadly": "When you use the item to the left of this, the item to the right of this gains 20% Crit Chance for the fight."
    }
  },
  "Catfish": {
    "name": "Catfish",
    "icon": "images/items/Catfish.avif",
    "tier": "Bronze",
    "tags": [
      "Vanessa",
      "Small",
      "Aquatic",
      "Friend",
      "Haste",
      "Poison"
    ],
    "description": [
      "Cooldown 6 seconds",
      "Poison ( 1 » 2 » 3 » 4 ).",
      "When this gains Haste, give it ( +1 » +2 » +3 » +4 ) Poison for the fight."
    ],
    "cooldown": 6,
    "enchants": {
      "Heavy": "Slow 1 item for 2 second(s).",
      "Icy": "Freeze 1 item for 1 second(s).",
      "Turbo": "Haste 1 item for 2 second(s).",
      "Shielded": "Shield 30.",
      "Restorative": "Heal 45.",
      "Toxic": "Double Poison",
      "Fiery": "Burn 4.",
      "Shiny": "+1 Multicast",
      "Deadly": "+50% Crit Chance"
    }
  },
  "Cauldron": {
    "name": "Cauldron",
    "icon": "images/items/Cauldron.avif",
    "tier": "Silver",
    "tags": [
      "Mak",
      "Medium",
      "Burn",
      "Poison",
      "Tool"
    ],
    "description": [
      "Cooldown 4 seconds",
      "Burn ( 2 » 4 » 6 ).",
      "Poison ( 1 » 2 » 3 )."
    ],
    "cooldown": 4,
    "enchants": {
      "Heavy": "Slow 2 items for 1 second(s).",
      "Icy": "Freeze 1 item for 1 second(s).",
      "Turbo": "Haste 2 items for 1 second(s).",
      "Shielded": "Shield 40.",
      "Restorative": "Heal 60.",
      "Toxic": "Double Poison",
      "Fiery": "Double Burn",
      "Shiny": "+1 Multicast",
      "Deadly": "+50% Crit Chance"
    }
  },
  "Char Cole": {
    "name": "Char Cole",
    "icon": "images/items/CharCole.avif",
    "tier": "Silver",
    "tags": [
      "Dooley",
      "Small",
      "Burn",
      "Friend"
    ],
    "description": [
      "Cooldown 8 seconds",
      "Burn ( 1 » 2 » 3 ).",
      "When you use another friend, this gains ( 1 » 2 » 3 ) Burn for the fight."
    ],
    "cooldown": 8,
    "enchants": {
      "Heavy": "Slow 1 item for 2 second(s).",
      "Icy": "Freeze 1 item for 1 second(s).",
      "Turbo": "Haste 1 item for 2 second(s).",
      "Shielded": "Shield 40.",
      "Restorative": "Heal 60.",
      "Toxic": "Poison 4.",
      "Fiery": "Double Burn",
      "Shiny": "+1 Multicast",
      "Deadly": "+50% Crit Chance"
    }
  },
  "Charging Station": {
    "name": "Charging Station",
    "icon": "images/items/ChargingStation.avif",
    "tier": "Gold",
    "tags": [
      "Dooley",
      "Medium",
      "Charge",
      "Damage",
      "Tool"
    ],
    "description": [
      "When you use the item to the left of this, charge the item to the right for ( 1 » 2 ) second(s).",
      "When you use the Core, give it ( +20 » +40 ) damage for the fight."
    ],
    "cooldown": null,
    "enchants": {
      "Heavy": "When you use the Core, slow 1 item for 4 second(s).",
      "Icy": "When you use the core, Freeze 1 item for 2 second(s).",
      "Turbo": "When you use the core, Haste 1 item for 4 second(s).",
      "Shielded": "When you use the core, shield 40.",
      "Restorative": "When you use the core, heal 60.",
      "Toxic": "When you use the core, poison 4.",
      "Fiery": "When you use the core, burn 6.",
      "Shiny": "Double Charge"
    }
  },
  "Chemsnail": {
    "name": "Chemsnail",
    "icon": "images/items/Chemsnail.avif",
    "tier": "Bronze",
    "tags": [
      "Dooley",
      "Medium",
      "Friend",
      "Poison",
      "Slow"
    ],
    "description": [
      "Cooldown 6 seconds",
      "Slow 1 item for ( 1 » 2 » 3 » 4 ) second(s).",
      "When you slow, Poison ( 1 » 2 » 3 » 5 )."
    ],
    "cooldown": 6,
    "enchants": {
      "Heavy": "This has +1 Slow targets.",
      "Icy": "When you Slow, Freeze 1 item for 1 second(s).",
      "Turbo": "When you Slow, Haste 1 items for 2 second(s).",
      "Shielded": "When you Slow, Shield 15.",
      "Restorative": "When you Slow, Heal 20.",
      "Toxic": "Double Poison",
      "Fiery": "When you Slow, Burn 2.",
      "Deadly": "When you Slow, your items gain +6% Crit Chance for the fight."
    }
  },
  "Chocolate Bar": {
    "name": "Chocolate Bar",
    "icon": "images/items/ChocolateBar.avif",
    "tier": "Bronze",
    "tags": [
      "Common",
      "Small",
      "Food",
      "Health",
      "NonWeapon",
      "Passive"
    ],
    "description": [
      "When you sell this, gain ( 10 » 20 » 30 » 40 ) Max Health."
    ],
    "cooldown": null,
    "enchants": {}
  },
  "Chris Army Knife": {
    "name": "Chris Army Knife",
    "icon": "images/items/ChrisArmyKnife.avif",
    "tier": "Bronze",
    "tags": [
      "Dooley",
      "Small",
      "Damage",
      "Friend",
      "Shield",
      "Tool",
      "Weapon"
    ],
    "description": [
      "Cooldown 5 seconds",
      "Deal ( 5 » 10 » 20 » 40 ) damage.",
      "Shield ( 5 » 10 » 20 » 40 )."
    ],
    "cooldown": 5,
    "enchants": {
      "Heavy": "Slow 1 item for 2 second(s).",
      "Icy": "Freeze 1 item for 1 second(s).",
      "Turbo": "Haste 1 item for 2 second(s).",
      "Shielded": "Double Shield",
      "Restorative": "Heal 45.",
      "Toxic": "Poison 3.",
      "Fiery": "Burn 4.",
      "Shiny": "+1 Multicast",
      "Deadly": "+50% Crit Chance",
      "Obsidian": "Lifesteal"
    }
  },
  "Chronobarrier": {
    "name": "Chronobarrier",
    "icon": "images/items/Chronobarrier.avif",
    "tier": "Gold",
    "tags": [
      "Dooley",
      "Medium",
      "Cooldown",
      "Shield"
    ],
    "description": [
      "Cooldown 6 seconds",
      "Shield ( 50 » 100 ).",
      "Enemy cooldowns are increased by ( 1 » 2 ) second(s)."
    ],
    "cooldown": 6,
    "enchants": {
      "Heavy": "Slow 2 items for 2 second(s).",
      "Icy": "Freeze 1 item for 2 second(s).",
      "Turbo": "Haste 2 items for 2 second(s).",
      "Shielded": "Double Shield",
      "Restorative": "Heal 90.",
      "Toxic": "Poison 6.",
      "Fiery": "Burn 9.",
      "Shiny": "+1 Multicast",
      "Deadly": "+50% Crit Chance"
    }
  },
  "Chum": {
    "name": "Chum",
    "icon": "images/items/Chum.avif",
    "tier": "Bronze",
    "tags": [
      "Vanessa",
      "Small",
      "Aquatic",
      "Crit"
    ],
    "description": [
      "Cooldown 4 seconds",
      "Your Aquatic items gain ( 2% » 3% » 4% » 5% ) Crit Chance for the fight.",
      "When you buy this, get a Piranha."
    ],
    "cooldown": 4,
    "enchants": {
      "Heavy": "Slow 1 item for 1 second(s).",
      "Icy": "Freeze 1 item for 1 second(s).",
      "Turbo": "Haste 1 item for 1 second(s).",
      "Shielded": "Shield 20.",
      "Restorative": "Heal 30.",
      "Toxic": "Poison 2.",
      "Fiery": "Burn 3.",
      "Shiny": "+1 Multicast",
      "Deadly": "Double Crit Chance"
    }
  },
  "Cinders": {
    "name": "Cinders",
    "icon": "images/items/Cinders.avif",
    "tier": "Bronze",
    "tags": [
      "Common",
      "Small",
      "NonWeapon",
      "Passive"
    ],
    "description": [
      "When you sell this, your leftmost Burn item gains ( +1 » +2 » +3 » +4 ) Burn."
    ],
    "cooldown": null,
    "enchants": {}
  },
  "Citrus": {
    "name": "Citrus",
    "icon": "images/items/Citrus.avif",
    "tier": "Bronze",
    "tags": [
      "Common",
      "Small",
      "Cooldown",
      "NonWeapon",
      "Passive"
    ],
    "description": [
      "When you sell this, gain ( 1 » 2 » 3 » 4 ) Regeneration."
    ],
    "cooldown": null,
    "enchants": {}
  },
  "Clamera": {
    "name": "Clamera",
    "icon": "images/items/Clamera.avif",
    "tier": "Bronze",
    "tags": [
      "Vanessa",
      "Small",
      "Aquatic",
      "Slow",
      "Tool"
    ],
    "description": [
      "Cooldown 9 seconds",
      "Slow ( 1 » 2 » 3 » 4 ) item(s) for ( 1 » 1 » 1 » 2 ) second(s).",
      "At the start of each fight, use this."
    ],
    "cooldown": 9,
    "enchants": {
      "Heavy": "This has +1 Slow targets.",
      "Icy": "Freeze 1 item for 1 second(s).",
      "Turbo": "Haste 1 item for 2 second(s).",
      "Shielded": "Shield 30.",
      "Restorative": "Heal 45.",
      "Toxic": "Poison 3.",
      "Fiery": "Burn 4.",
      "Shiny": "+1 Multicast"
    }
  },
  "Claw Arm": {
    "name": "Claw Arm",
    "icon": "images/items/ClawArm.avif",
    "tier": "Gold",
    "tags": [
      "Dooley",
      "Medium",
      "Damage",
      "Haste",
      "Weapon"
    ],
    "description": [
      "Cooldown 4 seconds",
      "Deal 10 damage.",
      "When this gains Haste, this and the weapon to the left gains ( 5 » 10 ) damage for the fight."
    ],
    "cooldown": 4,
    "enchants": {
      "Heavy": "Slow 2 items for 1 second(s).",
      "Icy": "Freeze 1 item for 1 second(s).",
      "Turbo": "Haste 2 items for 1 second(s).",
      "Shielded": "Shield 40.",
      "Restorative": "Heal 60.",
      "Toxic": "Poison 4.",
      "Fiery": "Burn 6.",
      "Shiny": "+1 Multicast",
      "Deadly": "+50% Crit Chance",
      "Obsidian": "Lifesteal"
    }
  },
  "Clawrence": {
    "name": "Clawrence",
    "icon": "images/items/Clawrence.avif",
    "tier": "Silver",
    "tags": [
      "Dooley",
      "Medium",
      "Damage",
      "Friend",
      "Weapon"
    ],
    "description": [
      "Cooldown 5 seconds",
      "Deal 10 damage.",
      "When you use a Friend, this gains ( 10 » 20 » 40 ) damage for the fight."
    ],
    "cooldown": 5,
    "enchants": {
      "Heavy": "Slow 2 items for 2 second(s).",
      "Icy": "Freeze 1 item for 2 second(s).",
      "Turbo": "Haste 2 items for 2 second(s).",
      "Shielded": "Shield 50.",
      "Restorative": "Heal 75.",
      "Toxic": "Poison 5.",
      "Fiery": "Burn 7.",
      "Shiny": "+1 Multicast",
      "Deadly": "+50% Crit Chance",
      "Obsidian": "Lifesteal"
    }
  },
  "Claws": {
    "name": "Claws",
    "icon": "images/items/Claws.avif",
    "tier": "Bronze",
    "tags": [
      "Common",
      "Small",
      "Crit",
      "Damage",
      "Weapon"
    ],
    "description": [
      "Cooldown 4 seconds",
      "Deal ( 8 » 24 » 48 » 100 ) Damage.",
      "This deals double Crit damage."
    ],
    "cooldown": 4,
    "enchants": {
      "Heavy": "Slow 1 items for 1 second(s).",
      "Icy": "Freeze 1 item for 1 second(s).",
      "Turbo": "Haste 1 items for 1 second(s).",
      "Shielded": "Shield 20.",
      "Restorative": "Heal 30.",
      "Toxic": "Poison 2.",
      "Fiery": "Burn 3.",
      "Shiny": "+1 Multicast",
      "Deadly": "+50% Crit Chance",
      "Obsidian": "Lifesteal"
    }
  },
  "Clockwork Blades": {
    "name": "Clockwork Blades",
    "icon": "images/items/ClockworkBlades.avif",
    "tier": "Bronze",
    "tags": [
      "Common",
      "Medium",
      "Cooldown",
      "Damage",
      "Weapon"
    ],
    "description": [
      "Cooldown 6 seconds",
      "Deal ( 10 » 30 » 60 » 100 ) damage.",
      "When you sell this, reduce your items' cooldown by ( 1% » 2% » 3% » 4% )."
    ],
    "cooldown": 6,
    "enchants": {
      "Heavy": "Slow 2 items for 2 second(s).",
      "Icy": "Freeze 1 item for 2 second(s).",
      "Turbo": "Haste 2 items for 2 second(s).",
      "Shielded": "Shield 60.",
      "Restorative": "Heal 90.",
      "Toxic": "Poison 6.",
      "Fiery": "Burn 9.",
      "Shiny": "+1 Multicast",
      "Deadly": "+50% Crit Chance",
      "Obsidian": "Lifesteal"
    }
  },
  "Closed Sign": {
    "name": "Closed Sign",
    "icon": "images/items/ClosedSign.avif",
    "tier": "Gold",
    "tags": [
      "Pygmalien",
      "Medium",
      "Economy",
      "Regen"
    ],
    "description": [
      "You have Regeneration equal to ( 1x » 2x ) adjacent properties' values. [0]"
    ],
    "cooldown": null,
    "enchants": {
      "Golden": "You have +3 Income.",
      "Shiny": "You have additional Regeneration equal to the value of adjacent properties.",
      "Deadly": "Adjacent properties have +50% Crit Chance."
    }
  },
  "Coconut": {
    "name": "Coconut",
    "icon": "images/items/Coconut.avif",
    "tier": "Bronze",
    "tags": [
      "Common",
      "Small",
      "Health",
      "NonWeapon",
      "Passive"
    ],
    "description": [
      "When you sell this, gain ( 10 » 20 » 30 » 40 ) Max Health."
    ],
    "cooldown": null,
    "enchants": {}
  },
  "Cog": {
    "name": "Cog",
    "icon": "images/items/Cog.avif",
    "tier": "Silver",
    "tags": [
      "Dooley",
      "Small",
      "Haste",
      "Tool"
    ],
    "description": [
      "Cooldown 4 seconds",
      "Haste an adjacent item for ( 1 » 2 » 3 ) second(s)."
    ],
    "cooldown": 4,
    "enchants": {
      "Heavy": "Slow 1 item for 1 second(s).",
      "Icy": "Freeze 1 item for 1 second(s).",
      "Turbo": "Double Haste",
      "Shielded": "Shield 20.",
      "Restorative": "Heal 30.",
      "Toxic": "Poison 2.",
      "Fiery": "Burn 3.",
      "Shiny": "+1 Multicast",
      "Deadly": "An adjacent item gains 20% Crit Chance for the fight."
    }
  },
  "Colossal Popsicle": {
    "name": "Colossal Popsicle",
    "icon": "images/items/ColossalPopsicle.avif",
    "tier": "Silver",
    "tags": [
      "Common",
      "Large",
      "Damage",
      "Food",
      "Freeze",
      "Weapon"
    ],
    "description": [
      "Cooldown 8 seconds",
      "Deal ( 50 » 100 » 150 ) damage.",
      "Freeze 2 items for ( 1 » 2 » 3 ) second(s).",
      "When you sell this, gain 2 Icicles."
    ],
    "cooldown": 8,
    "enchants": {
      "Heavy": "Slow 3 items for 3 second(s).",
      "Icy": "Double Freeze",
      "Turbo": "Haste 3 items for 3 second(s).",
      "Shielded": "Shield 120.",
      "Restorative": "Heal 180.",
      "Toxic": "Poison 12.",
      "Fiery": "Burn 18.",
      "Shiny": "+1 Multicast",
      "Deadly": "+50% Crit Chance",
      "Obsidian": "Lifesteal"
    }
  },
  "Combat Core": {
    "name": "Combat Core",
    "icon": "images/items/CombatCore.avif",
    "tier": "Silver",
    "tags": [
      "Dooley",
      "Large",
      "Core",
      "Damage",
      "Shield",
      "Vehicle",
      "Weapon"
    ],
    "description": [
      "Cooldown 4 seconds",
      "Deal 25 damage.",
      "Shield 25.",
      "When you use any item to the left of this, this gains ( 10 » 25 » 50 ) Damage for the fight.",
      "When you use any item to the right of this, this gains ( 10 » 25 » 50 ) Shield for the fight."
    ],
    "cooldown": 4,
    "enchants": {
      "Heavy": "Slow 3 items for 1 second(s).",
      "Icy": "Freeze 1 item for 2 second(s).",
      "Turbo": "Haste 3 item for 1 second(s).",
      "Shielded": "Double Shield",
      "Restorative": "Heal 60.",
      "Toxic": "Poison 6.",
      "Fiery": "Burn 9.",
      "Shiny": "+1 Multicast",
      "Deadly": "+50% Crit Chance",
      "Obsidian": "Lifesteal"
    }
  },
  "Companion Core": {
    "name": "Companion Core",
    "icon": "images/items/CompanionCore.avif",
    "tier": "Bronze",
    "tags": [
      "Dooley",
      "Medium",
      "Charge",
      "Core",
      "Friend",
      "Haste",
      "Unsellable"
    ],
    "description": [
      "Cooldown 7 seconds",
      "Haste your other friends ( 1 » 2 » 3 » 4 ) second(s).",
      "When you use another Friend, Charge this 1 second(s)."
    ],
    "cooldown": 7,
    "enchants": {
      "Heavy": "Slow 2 items for 3 second(s).",
      "Icy": "Freeze 1 item for 3 second(s).",
      "Turbo": "Double Haste",
      "Shielded": "Shield 80.",
      "Restorative": "Heal 120.",
      "Toxic": "Poison 8.",
      "Fiery": "Burn 12.",
      "Shiny": "+1 Multicast",
      "Deadly": "Your friends gain +10% Crit Chance for the fight."
    }
  },
  "Concealed Dagger": {
    "name": "Concealed Dagger",
    "icon": "images/items/ConcealedDagger.avif",
    "tier": "Silver",
    "tags": [
      "Vanessa",
      "Small",
      "Damage",
      "Gold",
      "Weapon"
    ],
    "description": [
      "Cooldown 8 seconds",
      "Deal ( 12 » 24 » 40 ) damage.",
      "Gain ( 1 » 2 » 3 ) gold."
    ],
    "cooldown": 8,
    "enchants": {
      "Golden": "Double Gold",
      "Heavy": "Slow 1 item for 2 second(s).",
      "Icy": "Freeze 1 item for 1 second(s).",
      "Turbo": "Haste 1 item for 2 second(s).",
      "Shielded": "Shield 40.",
      "Restorative": "Heal 60.",
      "Toxic": "Poison 4.",
      "Fiery": "Burn 5.",
      "Shiny": "+1 Multicast",
      "Deadly": "+50% Crit Chance",
      "Obsidian": "Lifesteal"
    }
  },
  "Cookies": {
    "name": "Cookies",
    "icon": "images/items/Cookies.avif",
    "tier": "Bronze",
    "tags": [
      "Jules",
      "Small",
      "Food",
      "NonWeapon",
      "Passive"
    ],
    "description": [
      "Cooldown 5 seconds",
      "When you sell this, you lose ( 10 » 20 » 30 » 40 ) Max Health.",
      "When you sell this, gain ( 1 » 2 » 3 » 4 ) Regeneration."
    ],
    "cooldown": 5,
    "enchants": {}
  },
  "Cool LEDs": {
    "name": "Cool LEDs",
    "icon": "images/items/CoolLEDs.avif",
    "tier": "Bronze",
    "tags": [
      "Dooley",
      "Small",
      "Slow"
    ],
    "description": [
      "Cooldown 4 seconds",
      "Slow 1 item for ( 1 » 2 » 3 » 4 ) second(s).",
      "When you use the Core, slow an item for ( 1 » 2 » 3 » 4 ) second(s)."
    ],
    "cooldown": 4,
    "enchants": {
      "Heavy": "+1 Slow Targets",
      "Icy": "Freeze 1 item for 1 second(s).",
      "Turbo": "Haste 1 item for 1 second(s).",
      "Shielded": "Shield 20.",
      "Restorative": "Heal 30.",
      "Toxic": "Poison 2.",
      "Fiery": "Burn 3.",
      "Shiny": "+1 Multicast"
    }
  },
  "Coolant": {
    "name": "Coolant",
    "icon": "images/items/Coolant.avif",
    "tier": "Bronze",
    "tags": [
      "Dooley",
      "Small",
      "Burn",
      "Freeze"
    ],
    "description": [
      "Cooldown 6 seconds",
      "Freeze 1 item for ( 1 » 2 » 3 » 4 ) second(s).",
      "Cleanse half your Burn."
    ],
    "cooldown": 6,
    "enchants": {
      "Heavy": "Slow 1 item for 2 second(s).",
      "Icy": "+1 Freeze Targets",
      "Turbo": "Haste 1 item for 2 second(s).",
      "Shielded": "Shield 30.",
      "Restorative": "Heal 45.",
      "Toxic": "Poison 3.",
      "Fiery": "Burn 4.",
      "Shiny": "+1 Multicast"
    }
  },
  "Cooling Fan": {
    "name": "Cooling Fan",
    "icon": "images/items/CoolingFan.avif",
    "tier": "Silver",
    "tags": [
      "Dooley",
      "Small",
      "Haste"
    ],
    "description": [
      "Cooldown 5 seconds",
      "Give the Core ( +5% » +10% » +15% ) Crit Chance for the fight.",
      "While you have Burn, reduce this item's cooldown by 50%."
    ],
    "cooldown": 5,
    "enchants": {
      "Heavy": "Slow 1 item for 1 second(s).",
      "Icy": "Freeze 1 item for 1 second(s).",
      "Turbo": "Haste 1 item for 1 second(s).",
      "Shielded": "Shield 25.",
      "Restorative": "Heal 40.",
      "Toxic": "Poison 2.",
      "Fiery": "Burn 4.",
      "Shiny": "+1 Multicast",
      "Deadly": "Give an item gain 20% Crit Chance for the fight."
    }
  },
  "Copper Ed": {
    "name": "Copper Ed",
    "icon": "images/items/CopperEd.avif",
    "tier": "Bronze",
    "tags": [
      "Dooley",
      "Small",
      "Friend",
      "Poison",
      "Shield"
    ],
    "description": [
      "Cooldown 6 seconds",
      "Poison ( 1 » 2 » 3 » 4 ).",
      "Gain ( 5 » 10 » 15 » 20 ) shield."
    ],
    "cooldown": 6,
    "enchants": {
      "Heavy": "Slow 1 item for 2 second(s).",
      "Icy": "Freeze 1 item for 1 second(s).",
      "Turbo": "Haste 1 item for 2 second(s).",
      "Shielded": "Double Shield",
      "Restorative": "Heal 45.",
      "Toxic": "Double Poison",
      "Fiery": "Burn 4.",
      "Shiny": "+1 Multicast",
      "Deadly": "+50% Crit Chance"
    }
  },
  "Coral": {
    "name": "Coral",
    "icon": "images/items/Coral.avif",
    "tier": "Bronze",
    "tags": [
      "Vanessa",
      "Small",
      "Aquatic",
      "Heal"
    ],
    "description": [
      "Cooldown 4 seconds",
      "Heal 10.",
      "When you buy an Aquatic item, this gains Heal ( 5 » 10 » 15 » 20 )."
    ],
    "cooldown": 4,
    "enchants": {
      "Heavy": "Slow 1 item for 1 second(s).",
      "Icy": "Freeze 1 item for 1 second(s).",
      "Turbo": "Haste 1 item for 1 second(s).",
      "Shielded": "Shield 20.",
      "Restorative": "Double Heal",
      "Toxic": "Poison 2.",
      "Fiery": "Burn 3.",
      "Shiny": "+1 Multicast",
      "Deadly": "+50% Crit Chance"
    }
  },
  "Coral Armor": {
    "name": "Coral Armor",
    "icon": "images/items/CoralArmor.avif",
    "tier": "Bronze",
    "tags": [
      "Vanessa",
      "Medium",
      "Aquatic",
      "Shield"
    ],
    "description": [
      "Cooldown 6 seconds",
      "Shield 10.",
      "When you buy an Aquatic item, this gains ( 10 » 20 » 30 » 50 ) Shield."
    ],
    "cooldown": 6,
    "enchants": {
      "Heavy": "Slow 2 items for 2 second(s).",
      "Icy": "Freeze 1 item for 2 second(s).",
      "Turbo": "Haste 2 items for 2 second(s).",
      "Shielded": "Double Shield",
      "Restorative": "Heal 60.",
      "Toxic": "Poison 6.",
      "Fiery": "Burn 9.",
      "Shiny": "+1 Multicast",
      "Deadly": "+50% Crit Chance"
    }
  },
  "Cosmic Amulet": {
    "name": "Cosmic Amulet",
    "icon": "images/items/CosmicAmulet.avif",
    "tier": "Gold",
    "tags": [
      "Common",
      "Small",
      "Crit",
      "Haste",
      "Shield"
    ],
    "description": [
      "Cooldown 8 seconds",
      "Shield ( 50 » 100 ).",
      "When this gains haste, give your items ( +3% » +5% ) crit chance for the fight."
    ],
    "cooldown": 8,
    "enchants": {
      "Heavy": "Slow 1 item for 2 second(s).",
      "Icy": "Freeze 1 item for 1 second(s).",
      "Turbo": "Haste 1 item for 2 second(s).",
      "Shielded": "Double Shield",
      "Restorative": "Heal 16.",
      "Toxic": "Poison 2.",
      "Fiery": "Burn 4.",
      "Shiny": "+1 Multicast",
      "Deadly": "+50% Crit Chance"
    }
  },
  "Cosmic Plumage": {
    "name": "Cosmic Plumage",
    "icon": "images/items/CosmicPlumage.avif",
    "tier": "Silver",
    "tags": [
      "Common",
      "Medium",
      "Charge",
      "Crit",
      "Damage",
      "Shield"
    ],
    "description": [
      "Cooldown 6 seconds",
      "Your Shield items gain ( 4 » 8 » 12 ) shield and your Weapons ( +4 » +8 » +12 ) damage for the fight.",
      "When you crit, charge this 1 second(s)."
    ],
    "cooldown": 6,
    "enchants": {
      "Heavy": "Slow 2 items for 2 second(s).",
      "Icy": "Freeze 1 item for 2 second(s).",
      "Turbo": "Haste 2 items for 2 second(s).",
      "Shielded": "Shield 60.",
      "Restorative": "Heal 90.",
      "Toxic": "Poison 6.",
      "Fiery": "Burn 9.",
      "Shiny": "+1 Multicast",
      "Deadly": "+50% Crit Chance"
    }
  },
  "Cove": {
    "name": "Cove",
    "icon": "images/items/Cove.avif",
    "tier": "Bronze",
    "tags": [
      "Vanessa",
      "Large",
      "Aquatic",
      "Economy",
      "Property",
      "Shield",
      "Value"
    ],
    "description": [
      "Cooldown 3 seconds",
      "Shield equal to ( 1x » 2x » 3x » 4x ) this item's value.",
      "When you sell an item, this gains ( 1 » 1 » 1 » 2 ) value."
    ],
    "cooldown": 3,
    "enchants": {
      "Golden": "Double Value",
      "Heavy": "Slow 3 items for 1 second(s).",
      "Icy": "Freeze 1 item for 2 second(s).",
      "Turbo": "Haste 3 items for 1 second(s).",
      "Shielded": "Double Shield",
      "Restorative": "Heal equal to triple this item's value.",
      "Toxic": "Poison 4.",
      "Fiery": "Burn 7.",
      "Shiny": "+1 Multicast",
      "Deadly": "+50% Crit Chance"
    }
  },
  "Crane": {
    "name": "Crane",
    "icon": "images/items/Crane.avif",
    "tier": "Gold",
    "tags": [
      "Dooley",
      "Large",
      "Damage",
      "Tool",
      "Vehicle",
      "Weapon"
    ],
    "description": [
      "Cooldown 10 seconds",
      "Deal ( 100 » 200 ) damage.",
      "When you use an adjacent Large item, this gains ( 30% » 60% ) damage for the fight.",
      "When you use an adjacent Medium item, this gains ( 20% » 40% ) damage for the fight."
    ],
    "cooldown": 10,
    "enchants": {
      "Heavy": "Slow 3 items for 3 second(s).",
      "Icy": "Freeze 1 item for 4 second(s).",
      "Turbo": "Haste 3 items for 3 second(s).",
      "Shielded": "Shield 150.",
      "Restorative": "Heal 225.",
      "Toxic": "Poison 15.",
      "Fiery": "Burn 22.",
      "Shiny": "+1 Multicast",
      "Deadly": "+50% Crit Chance",
      "Obsidian": "Lifesteal"
    }
  },
  "Crook": {
    "name": "Crook",
    "icon": "images/items/Crook.avif",
    "tier": "Silver",
    "tags": [
      "Pygmalien",
      "Medium",
      "Damage",
      "Tool",
      "Weapon"
    ],
    "description": [
      "Cooldown 5 seconds",
      "Deal ( 10 » 20 » 40 ) damage.",
      "Your Weapons have ( +10 » +20 » +40 ) Damage for each Medium item you have."
    ],
    "cooldown": 5,
    "enchants": {
      "Shielded": "Your Shield items have +10 Shield for each Medium item you have.",
      "Restorative": "Your Heal items have +15 Heal for each Medium item you have.",
      "Toxic": "Your Poison items have +2 Poison for each Medium item you have.",
      "Fiery": "Your Burn items have +3 Burn for each Medium item you have.",
      "Deadly": "Your items have +10% Crit Chance for each Medium item you have.",
      "Obsidian": "Lifesteal"
    }
  },
  "Crow's Nest": {
    "name": "Crow's Nest",
    "icon": "images/items/CrowsNest.avif",
    "tier": "Bronze",
    "tags": [
      "Vanessa",
      "Large",
      "Aquatic",
      "Crit",
      "Property"
    ],
    "description": [
      "Your weapons have ( +25% » +50% » +75% » +100% ) Crit Chance.",
      "If you have exactly one weapon, that Weapon has lifesteal."
    ],
    "cooldown": null,
    "enchants": {
      "Heavy": "When you crit with a Weapon, slow 1 item for 4 second(s).",
      "Icy": "When you crit with a weapon, Freeze 1 item for 2 second(s).",
      "Turbo": "When you crit with a weapon, haste 1 item for 4 second(s).",
      "Shielded": "When you crit with a weapon, shield 40.",
      "Restorative": "When you crit with a Weapon, Heal 60.",
      "Toxic": "When you crit with a weapon, poison 4",
      "Fiery": "When you crit with a weapon, burn 6",
      "Deadly": "Your Weapons have double Crit damage.",
      "Shiny": "If you have two or fewer weapons, they have Lifesteal."
    }
  },
  "Crusher Claw": {
    "name": "Crusher Claw",
    "icon": "images/items/CrusherClaw.avif",
    "tier": "Bronze",
    "tags": [
      "Common",
      "Medium",
      "Aquatic",
      "Damage",
      "Economy",
      "Shield",
      "Weapon"
    ],
    "description": [
      "Cooldown 8 seconds",
      "Your Shield items gain ( 2 » 4 » 6 » 8 ) Shield for the fight.",
      "Deal damage equal to the highest shield value of items you have."
    ],
    "cooldown": 8,
    "enchants": {
      "Heavy": "Slow 2 items for 3 second(s).",
      "Icy": "Freeze 1 item for 3 second(s).",
      "Turbo": "Haste 2 items for 3 second(s).",
      "Shielded": "Shield 80.",
      "Restorative": "Heal 120.",
      "Toxic": "Poison 8.",
      "Fiery": "Burn 12.",
      "Shiny": "+1 Multicast",
      "Deadly": "+50% Crit Chance",
      "Obsidian": "Lifesteal"
    }
  },
  "Cryosleeve": {
    "name": "Cryosleeve",
    "icon": "images/items/Cryosleeve.avif",
    "tier": "Bronze",
    "tags": [
      "Common",
      "Medium",
      "Freeze",
      "Shield"
    ],
    "description": [
      "Cooldown 3 seconds",
      "Freeze this for 2 second(s).",
      "When ANY item gains Freeze, Shield ( 15 » 30 » 45 » 60 )."
    ],
    "cooldown": 3,
    "enchants": {
      "Heavy": "Slow 2 items for 1 second(s).",
      "Icy": "Double Freeze",
      "Turbo": "Haste 2 items for 1 second(s).",
      "Shielded": "Double Shield",
      "Restorative": "Heal 45.",
      "Toxic": "Poison 3.",
      "Fiery": "Burn 4.",
      "Shiny": "+1 Multicast"
    }
  },
  "Cryosphere": {
    "name": "Cryosphere",
    "icon": "images/items/Cryosphere.avif",
    "tier": "Gold",
    "tags": [
      "Dooley",
      "Medium",
      "Freeze",
      "Tool"
    ],
    "description": [
      "Cooldown 10 seconds",
      "Freeze all items other than The Core for ( 2 » 3 ) second(s)."
    ],
    "cooldown": 10,
    "enchants": {
      "Heavy": "Slow 10 items for 4 second(s).",
      "Icy": "Double Freeze",
      "Turbo": "Haste 2 items for 3 second(s).",
      "Shielded": "Shield 100.",
      "Restorative": "Heal 150.",
      "Toxic": "Poison 10.",
      "Fiery": "Burn 15.",
      "Shiny": "+1 Multicast"
    }
  },
  "Crypto": {
    "name": "Crypto",
    "icon": "images/items/Crypto.avif",
    "tier": "Bronze",
    "tags": [
      "Dooley",
      "Small",
      "Value"
    ],
    "description": [
      "At the start of each hour, set this item's value to a number between 0 and ( 5 » 10 » 20 » 40 )."
    ],
    "cooldown": null,
    "enchants": {
      "Golden": "Double Value",
      "Shiny": "Double Value"
    }
  },
  "Crystal Bonsai": {
    "name": "Crystal Bonsai",
    "icon": "images/items/CrystalBonsai.avif",
    "tier": "Bronze",
    "tags": [
      "Pygmalien",
      "Small",
      "Economy",
      "Heal",
      "Value"
    ],
    "description": [
      "Cooldown 4 seconds",
      "Heal equal to ( 1x » 2x » 3x » 4x ) this item's value.",
      "At the start of each fight with Crystal Bonsai, this gains ( 2 » 4 » 6 » 8 ) value.",
      "When you lose a fight with Crystal Bonsai, this item loses all of its value."
    ],
    "cooldown": 4,
    "enchants": {
      "Heavy": "Slow 1 item for 1 second(s).",
      "Golden": "Double Value",
      "Icy": "Freeze 1 item for 1 second(s).",
      "Turbo": "Haste 1 item for 1 second(s).",
      "Shielded": "Shield equal to triple this item's value.",
      "Restorative": "Double Heal",
      "Toxic": "Poison 2.",
      "Fiery": "Burn 3.",
      "Shiny": "+1 Multicast",
      "Deadly": "+50% Crit Chance"
    }
  },
  "Curry": {
    "name": "Curry",
    "icon": "images/items/Curry.avif",
    "tier": "Silver",
    "tags": [
      "Jules",
      "Small",
      "Burn",
      "Charge",
      "Food"
    ],
    "description": [
      "Cooldown 8 seconds",
      "Burn ( 4 » 6 » 8 ).",
      "Charge another small item ( 3 » 4 » 5 ) second(s)."
    ],
    "cooldown": 8,
    "enchants": {
      "Heavy": "Slow 1 item for 2 second(s).",
      "Icy": "Freeze 1 item for 1 second(s).",
      "Turbo": "Haste 1 item for 2 second(s).",
      "Shielded": "Shield 40.",
      "Restorative": "Heal 60.",
      "Toxic": "Poison 4.",
      "Fiery": "Double Burn",
      "Shiny": "+1 Multicast",
      "Deadly": "+50% Crit Chance"
    }
  },
  "Cutlass": {
    "name": "Cutlass",
    "icon": "images/items/Cutlass.avif",
    "tier": "Bronze",
    "tags": [
      "Vanessa",
      "Medium",
      "Crit",
      "Damage",
      "Weapon"
    ],
    "description": [
      "Cooldown 5 seconds",
      "Deal ( 6 » 18 » 36 » 60 ) damage.",
      "This deals double Crit damage."
    ],
    "cooldown": 5,
    "enchants": {
      "Heavy": "Slow 2 items for 1 second(s).",
      "Icy": "Freeze 1 item for 1 second(s).",
      "Turbo": "Haste 2 items for 1 second(s).",
      "Shielded": "Shield 20.",
      "Restorative": "Heal 30.",
      "Toxic": "Poison 2.",
      "Fiery": "Burn 3.",
      "Shiny": "+1 Multicast",
      "Deadly": "+50% Crit Chance",
      "Obsidian": "Lifesteal"
    }
  },
  "Cybersecurity": {
    "name": "Cybersecurity",
    "icon": "images/items/Cybersecurity.avif",
    "tier": "Silver",
    "tags": [
      "Dooley",
      "Medium",
      "Damage",
      "Friend",
      "Weapon"
    ],
    "description": [
      "Cooldown 12 seconds",
      "Deal 20 damage for each Weapon you have.",
      "This deals ( double » triple » quadruple ) damage if it is your only friend."
    ],
    "cooldown": 12,
    "enchants": {
      "Heavy": "Slow 2 items for 4 second(s).",
      "Icy": "Freeze 1 item for 4 second(s).",
      "Turbo": "Haste 2 items for 4 second(s).",
      "Shielded": "Shield 120.",
      "Restorative": "Heal 180.",
      "Toxic": "Poison 12.",
      "Fiery": "Burn 18.",
      "Shiny": "+1 Multicast",
      "Deadly": "+50% Crit Chance",
      "Obsidian": "Lifesteal"
    }
  },
  "Dam": {
    "name": "Dam",
    "icon": "images/items/Dam.avif",
    "tier": "Diamond",
    "tags": [
      "Vanessa",
      "Large",
      "Aquatic",
      "Charge",
      "Property"
    ],
    "description": [
      "Cooldown 20 seconds",
      "Destroy this, all enemy small items for the fight and slow all enemy medium items for 10 second(s).",
      "When you use another Aquatic item, charge this 1 second(s)."
    ],
    "cooldown": 20,
    "enchants": {
      "Heavy": "Slow 99 items for 10 second(s).",
      "Icy": "Freeze 1 item for 12 second(s).",
      "Turbo": "Haste 3 items for 8 second(s).",
      "Shielded": "Shield 300.",
      "Restorative": "Heal 450.",
      "Toxic": "Poison 30.",
      "Fiery": "Burn 45.",
      "Shiny": "Double Charge"
    }
  },
  "Death Caps": {
    "name": "Death Caps",
    "icon": "images/items/DeathCaps.avif",
    "tier": "Gold",
    "tags": [
      "Mak",
      "Medium",
      "Poison"
    ],
    "description": [
      "Cooldown 5 seconds",
      "Poison ( 1 » 2 ).",
      "Increase the poison of your items by ( 1 » 2 ) for the fight."
    ],
    "cooldown": 5,
    "enchants": {
      "Heavy": "Slow 2 items for 2 second(s).",
      "Icy": "Freeze 1 item for 2 second(s).",
      "Turbo": "Haste 2 items for 2 second(s).",
      "Shielded": "Shield 50.",
      "Restorative": "Heal 75.",
      "Toxic": "Double Poison",
      "Fiery": "Burn 7.",
      "Shiny": "+1 Multicast",
      "Deadly": "+50% Crit Chance"
    }
  },
  "Deed": {
    "name": "Deed",
    "icon": "images/items/Deed.avif",
    "tier": "Silver",
    "tags": [
      "Pygmalien",
      "Medium",
      "Value"
    ],
    "description": [
      "When you sell a Large item, this gains ( 2 » 4 » 6 ) Sell Value.",
      "Your items have double value in combat."
    ],
    "cooldown": null,
    "enchants": {
      "Golden": "This has double value.",
      "Shiny": "Double Value"
    }
  },
  "Diana-Saur": {
    "name": "Diana-Saur",
    "icon": "images/items/DianaSaur.avif",
    "tier": "Silver",
    "tags": [
      "Dooley",
      "Medium",
      "Damage",
      "Friend",
      "Weapon"
    ],
    "description": [
      "Cooldown 8 seconds",
      "Deal 40 damage.",
      "If your enemy has at least ( 6 » 5 » 4 ) items, destroy a small enemy item for the fight.",
      "When you destroy an item during combat, your Dinosaurs permanently gain ( 10 » 20 » 40 ) damage."
    ],
    "cooldown": 8,
    "enchants": {
      "Heavy": "Slow 2 items for 3 second(s).",
      "Icy": "Freeze 1 item for 3 second(s).",
      "Turbo": "Haste 2 items for 3 second(s).",
      "Shielded": "Shield 80.",
      "Restorative": "Heal 120.",
      "Toxic": "Poison 8.",
      "Fiery": "Burn 12.",
      "Shiny": "+1 Multicast",
      "Deadly": "+50% Crit Chance",
      "Obsidian": "Lifesteal"
    }
  },
  "Disguise": {
    "name": "Disguise",
    "icon": "images/items/Disguise.avif",
    "tier": "Silver",
    "tags": [
      "Vanessa",
      "Medium",
      "Crit"
    ],
    "description": [
      "When you buy this, get a non-Vanessa item.",
      "Your items from other Heroes have ( +15% » +30% » +50% ) Crit Chance."
    ],
    "cooldown": null,
    "enchants": {
      "Heavy": "When you use an item from another hero, Slow 1 item for 3 second(s).",
      "Icy": "When you use an item from another hero, Freeze 1 item for 1 second(s).",
      "Turbo": "When you use an item from another hero, haste it for 3 second(s).",
      "Shielded": "When you use an item from another hero, shield 20.",
      "Restorative": "When you use an item from another hero, heal 30.",
      "Toxic": "When you use an item from another hero, poison 2.",
      "Fiery": "When you use an item from another hero, burn 3.",
      "Deadly": "Double Crit Chance"
    }
  },
  "Dishwasher": {
    "name": "Dishwasher",
    "icon": "images/items/Dishwasher.avif",
    "tier": "Bronze",
    "tags": [
      "Jules",
      "Large",
      "Damage",
      "Haste",
      "Tool"
    ],
    "description": [
      "Cooldown 8 seconds",
      "Haste your tools for ( 1 » 2 » 3 » 4 ) second(s).",
      "Your weapons gain ( 10 » 20 » 40 » 80 ) damage for the fight."
    ],
    "cooldown": 8,
    "enchants": {
      "Heavy": "Slow 3 items for 3 second(s).",
      "Icy": "Freeze 1 item for 4 second(s).",
      "Turbo": "Double Haste",
      "Shielded": "Shield 120.",
      "Restorative": "Heal 180.",
      "Toxic": "Poison 12.",
      "Fiery": "Burn 18.",
      "Shiny": "+1 Multicast",
      "Deadly": "Your weapons and tools gain 25% Crit Chance for the fight."
    }
  },
  "DJ Rob0t": {
    "name": "DJ Rob0t",
    "icon": "images/items/DJRob0t.avif",
    "tier": "Silver",
    "tags": [
      "Dooley",
      "Medium",
      "Friend",
      "Haste"
    ],
    "description": [
      "Cooldown 10 seconds",
      "Haste your Friends for ( 1 » 2 » 3 ) second(s).",
      "When you buy this, get 3 Nanobots."
    ],
    "cooldown": 10,
    "enchants": {
      "Heavy": "Slow 2 items for 3 second(s).",
      "Icy": "Freeze 1 item for 3 second(s).",
      "Turbo": "Double Haste",
      "Shielded": "Shield 100.",
      "Restorative": "Heal 150.",
      "Toxic": "Poison 10.",
      "Fiery": "Burn 15.",
      "Shiny": "+1 Multicast"
    }
  },
  "Dock Lines": {
    "name": "Dock Lines",
    "icon": "images/items/DockLines.avif",
    "tier": "Bronze",
    "tags": [
      "Vanessa",
      "Medium",
      "Aquatic",
      "Slow",
      "Tool"
    ],
    "description": [
      "Cooldown 4 seconds",
      "Slow ( 1 » 2 » 3 » 4 ) item(s) for ( 4 » 4 » 4 » 3 ) second(s)."
    ],
    "cooldown": 4,
    "enchants": {
      "Heavy": "Double Slow",
      "Icy": "Freeze 1 item for 1 second(s).",
      "Turbo": "Haste 2 items for 1 second(s).",
      "Shielded": "Shield 40.",
      "Restorative": "Heal 60.",
      "Toxic": "Poison 4.",
      "Fiery": "Burn 6.",
      "Shiny": "+1 Multicast"
    }
  },
  "Dog": {
    "name": "Dog",
    "icon": "images/items/Dog.avif",
    "tier": "Bronze",
    "tags": [
      "Pygmalien",
      "Medium",
      "Damage",
      "Friend",
      "Weapon"
    ],
    "description": [
      "Cooldown 6 seconds",
      "Deal 10 Damage",
      "When you sell a small item, this gains ( 3 » 6 » 9 » 12 ) damage."
    ],
    "cooldown": 6,
    "enchants": {
      "Golden": "Your Small items have +1 value.",
      "Heavy": "Slow 2 items for 2 second(s).",
      "Icy": "Freeze 1 item for 2 second(s).",
      "Turbo": "Haste 2 items for 2 second(s).",
      "Shielded": "Shield 60.",
      "Restorative": "Heal 90.",
      "Toxic": "Poison 6.",
      "Fiery": "Burn 9.",
      "Shiny": "+1 Multicast",
      "Deadly": "+50% Crit Chance",
      "Obsidian": "Lifesteal"
    }
  },
  "Dooley's Scarf": {
    "name": "Dooley's Scarf",
    "icon": "images/items/DooleysScarf.avif",
    "tier": "Silver",
    "tags": [
      "Dooley",
      "Medium",
      "Freeze",
      "Shield"
    ],
    "description": [
      "Cooldown 4 seconds",
      "Shield ( 20 » 40 » 60 ).",
      "When this or an adjacent item gains Freeze, Shield ( 20 » 40 » 60 ) and remove Freeze from it."
    ],
    "cooldown": 4,
    "enchants": {
      "Heavy": "Slow 2 items for 1 second(s).",
      "Icy": "Freeze 1 item for 1 second(s).",
      "Turbo": "Haste 2 items for 1 second(s).",
      "Shielded": "Double Shield",
      "Restorative": "Heal 60.",
      "Toxic": "Poison 4.",
      "Fiery": "Burn 6.",
      "Shiny": "+1 Multicast",
      "Deadly": "+50% Crit Chance"
    }
  },
  "Double Barrel": {
    "name": "Double Barrel",
    "icon": "images/items/DoubleBarrel.avif",
    "tier": "Bronze",
    "tags": [
      "Vanessa",
      "Medium",
      "Ammo",
      "Damage",
      "Weapon"
    ],
    "description": [
      "Cooldown 3 seconds",
      "Ammo Max 2",
      "Multicast 2",
      "Deal ( 15 » 45 » 90 » 180 ) damage."
    ],
    "cooldown": 3,
    "enchants": {
      "Heavy": "Slow 2 items for 1 second(s).",
      "Icy": "Freeze 1 item for 1 second(s).",
      "Turbo": "Haste 2 items for 1 second(s).",
      "Shielded": "Shield 60",
      "Restorative": "Heal 90.",
      "Toxic": "Poison 6.",
      "Fiery": "Burn 9.",
      "Shiny": "+1 Multicast",
      "Deadly": "+50% Crit Chance",
      "Obsidian": "Lifesteal"
    }
  },
  "Double Whammy": {
    "name": "Double Whammy",
    "icon": "images/items/DoubleWhammy.avif",
    "tier": "Silver",
    "tags": [
      "Pygmalien",
      "Large",
      "Damage",
      "Health",
      "Weapon"
    ],
    "description": [
      "Cooldown 12 seconds",
      "Multicast 2",
      "Deal damage equal to ( 10% » 15% » 20% ) of your Max Health."
    ],
    "cooldown": 12,
    "enchants": {
      "Heavy": "Slow 3 items for 2 second(s).",
      "Icy": "Freeze 1 item for 3 second(s).",
      "Turbo": "Haste 3 items for 2 second(s).",
      "Shielded": "Shield equal to 15% of your Max Health.",
      "Restorative": "Heal equal to 15% of your Max Health.",
      "Toxic": "Poison 9.",
      "Fiery": "Burn 13.",
      "Shiny": "+1 Multicast",
      "Deadly": "+50% Crit Chance",
      "Obsidian": "Lifesteal"
    }
  },
  "Dragon Tooth": {
    "name": "Dragon Tooth",
    "icon": "images/items/DragonTooth.avif",
    "tier": "Gold",
    "tags": [
      "Pygmalien",
      "Small",
      "Damage",
      "Gold",
      "Weapon"
    ],
    "description": [
      "Cooldown 9 seconds",
      "Deal ( 10 » 20 ) damage.",
      "At the start of each fight with Dragon Tooth, spend 3 gold and your weapons permanently gain ( 5 » 10 ) damage."
    ],
    "cooldown": 9,
    "enchants": {
      "Heavy": "Slow 1 item for 1 second(s).",
      "Golden": "+1 Damage",
      "Icy": "Freeze 1 item for 1 second(s).",
      "Turbo": "Haste 1 item for 1 second(s).",
      "Shielded": "Shield 20.",
      "Restorative": "Heal 30.",
      "Toxic": "Poison 2.",
      "Fiery": "Burn 3.",
      "Shiny": "+1 Multicast",
      "Deadly": "+50% Crit Chance",
      "Obsidian": "Lifesteal"
    }
  },
  "Dragon Whelp": {
    "name": "Dragon Whelp",
    "icon": "images/items/DragonWhelp.avif",
    "tier": "Silver",
    "tags": [
      "Common",
      "Small",
      "Burn",
      "Damage",
      "Friend",
      "Weapon"
    ],
    "description": [
      "Cooldown 9 seconds",
      "Deal ( 1 » 2 » 3 ) damage.",
      "Burn equal to this item's damage."
    ],
    "cooldown": 9,
    "enchants": {
      "Heavy": "Slow 1 item for 3 second(s).",
      "Icy": "Freeze 1 item for 1 second(s).",
      "Turbo": "Haste 1 item for 3 second(s).",
      "Shielded": "Shield 45.",
      "Restorative": "Heal equal to this item's damage.",
      "Toxic": "Poison equal to this item's damage.",
      "Fiery": "Double Burn",
      "Shiny": "+1 Multicast",
      "Deadly": "+50% Crit Chance",
      "Obsidian": "Lifesteal"
    }
  },
  "Duct Tape": {
    "name": "Duct Tape",
    "icon": "images/items/DuctTape.avif",
    "tier": "Bronze",
    "tags": [
      "Dooley",
      "Small",
      "Shield",
      "Slow",
      "Tool"
    ],
    "description": [
      "Cooldown 6 seconds",
      "Slow 1 item for ( 1 » 2 » 3 » 4 ) second(s).",
      "When you use an adjacent item, Shield ( 5 » 10 » 15 » 20 )."
    ],
    "cooldown": 6,
    "enchants": {
      "Heavy": "+1 Slow Targets",
      "Icy": "Freeze 1 item for 1 second(s).",
      "Turbo": "Haste 1 item for 2 second(s).",
      "Shielded": "Double Shield",
      "Restorative": "Heal 45.",
      "Toxic": "Poison 3.",
      "Fiery": "Burn 4.",
      "Shiny": "+1 Multicast"
    }
  },
  "Eagle Talisman": {
    "name": "Eagle Talisman",
    "icon": "images/items/EagleTalisman.avif",
    "tier": "Bronze",
    "tags": [
      "Common",
      "Small",
      "Damage"
    ],
    "description": [
      "When you sell this, your leftmost item gains ( 5% » 10% » 15% » 20% ) Crit Chance."
    ],
    "cooldown": null,
    "enchants": {}
  },
  "Earrings": {
    "name": "Earrings",
    "icon": "images/items/Earrings.avif",
    "tier": "Silver",
    "tags": [
      "Mak",
      "Small",
      "Health",
      "Slow"
    ],
    "description": [
      "Cooldown 5 seconds",
      "Slow 1 item for ( 1 » 2 » 3 ) second(s).",
      "When you slow, permanently gain ( 1 » 2 » 3 ) Max Health."
    ],
    "cooldown": 5,
    "enchants": {
      "Heavy": "+1 Slow Targets",
      "Icy": "When you Slow, Freeze 1 item for 1 second(s).",
      "Turbo": "When you Slow, Haste 1 item for 1 second(s).",
      "Shielded": "When you Slow, Shield 10.",
      "Restorative": "When you Slow, Heal 15.",
      "Toxic": "When you Slow, Poison 1.",
      "Fiery": "When you Slow, Burn 1.",
      "Shiny": "+1 Multicast",
      "Deadly": "When you Slow, your items gain 3% Crit Chance."
    }
  },
  "Ectoplasm": {
    "name": "Ectoplasm",
    "icon": "images/items/Ectoplasm.avif",
    "tier": "Silver",
    "tags": [
      "Common",
      "Small",
      "Heal",
      "Poison"
    ],
    "description": [
      "Cooldown 6 seconds",
      "Poison ( 1 » 2 » 3 ).",
      "Heal equal to your opponent's Poison."
    ],
    "cooldown": 6,
    "enchants": {
      "Heavy": "Slow 1 item for 2 second(s).",
      "Icy": "Freeze 1 item for 1 second(s).",
      "Turbo": "Haste 1 item for 2 second(s).",
      "Shielded": "Shield equal to your opponent's Poison.",
      "Restorative": "Double Heal",
      "Toxic": "Double Poison",
      "Fiery": "Burn 4.",
      "Shiny": "+1 Multicast",
      "Deadly": "+50% Crit Chance"
    }
  },
  "Electric Eels": {
    "name": "Electric Eels",
    "icon": "images/items/ElectricEels.avif",
    "tier": "Silver",
    "tags": [
      "Vanessa",
      "Large",
      "Aquatic",
      "Damage",
      "Friend",
      "Slow",
      "Weapon"
    ],
    "description": [
      "When your enemy uses a Weapon, deal ( 5 » 10 » 20 ) damage.",
      "When your enemy uses a non-Weapon item, Slow it for ( 1 » 2 » 3 ) second(s)."
    ],
    "cooldown": null,
    "enchants": {
      "Heavy": "Double Slow",
      "Icy": "When your enemy uses a non-Weapon item, freeze it for 1 second(s).",
      "Turbo": "When your enemy uses a Weapon, haste 1 item for 3 second(s).",
      "Shielded": "When your enemy uses a non-Weapon item, shield 30.",
      "Restorative": "When your enemy uses a non-Weapon item, heal 45.",
      "Toxic": "When your enemy uses a Weapon, poison 3.",
      "Fiery": "When your enemy uses a Weapon, burn 4.",
      "Shiny": "Double Damage",
      "Obsidian": "Lifesteal"
    }
  },
  "Emerald": {
    "name": "Emerald",
    "icon": "images/items/Emerald.avif",
    "tier": "Silver",
    "tags": [
      "Mak",
      "Small",
      "Poison"
    ],
    "description": [
      "Cooldown 6 seconds",
      "Poison ( 1 » 2 » 3 ).",
      "Increase your other items' Poison by 1."
    ],
    "cooldown": 6,
    "enchants": {
      "Heavy": "Slow 1 item for 2 second(s).",
      "Icy": "Freeze 1 item for 1 second(s).",
      "Turbo": "Haste 1 item for 2 second(s).",
      "Shielded": "Shield 30.",
      "Restorative": "Heal 45.",
      "Toxic": "Double Poison",
      "Fiery": "Burn 4.",
      "Shiny": "+1 Multicast",
      "Deadly": "+50% Crit Chance"
    }
  },
  "Energy Potion": {
    "name": "Energy Potion",
    "icon": "images/items/EnergyPotion.avif",
    "tier": "Bronze",
    "tags": [
      "Mak",
      "Small",
      "Ammo",
      "Haste",
      "Potion"
    ],
    "description": [
      "Cooldown 4 seconds",
      "Ammo Max 1",
      "Haste your items for ( 2 » 4 » 6 » 8 ) second(s)."
    ],
    "cooldown": 4,
    "enchants": {
      "Heavy": "Slow 1 item for 2 second(s).",
      "Icy": "Freeze 1 item for 1 second(s).",
      "Turbo": "Double Haste",
      "Shielded": "Shield 40.",
      "Restorative": "Heal 60.",
      "Toxic": "Poison 4.",
      "Fiery": "Burn 6.",
      "Shiny": "+1 Multicast"
    }
  },
  "Epicurean Chocolate": {
    "name": "Epicurean Chocolate",
    "icon": "images/items/EpicureanChocolate.avif",
    "tier": "Bronze",
    "tags": [
      "Common",
      "Medium",
      "Ammo",
      "Damage",
      "Food"
    ],
    "description": [
      "Cooldown 4 seconds",
      "Ammo Max 10",
      "Adjacent Weapons permanently gain ( +1 » +2 » +3 » +4 ) Damage.",
      "This permanently loses 1 Max Ammo."
    ],
    "cooldown": 4,
    "enchants": {}
  },
  "Exoskeleton": {
    "name": "Exoskeleton",
    "icon": "images/items/Exoskeleton.avif",
    "tier": "Bronze",
    "tags": [
      "Common",
      "Medium",
      "Damage"
    ],
    "description": [
      "Adjacent Weapons have ( +5 » +15 » +30 » +50 ) damage.",
      "When you sell this, your weapons gain ( 2 » 4 » 6 » 8 ) damage."
    ],
    "cooldown": null,
    "enchants": {
      "Shiny": "DamageAmount0",
      "Deadly": "+50% Crit Chance"
    }
  },
  "Extract": {
    "name": "Extract",
    "icon": "images/items/Extract.avif",
    "tier": "Bronze",
    "tags": [
      "Common",
      "Small",
      "NonWeapon",
      "Passive"
    ],
    "description": [
      "When you sell this, your leftmost Poison item gains ( +1 » +2 » +3 » +4 ) Poison."
    ],
    "cooldown": null,
    "enchants": {}
  },
  "Eye of the Colossus": {
    "name": "Eye of the Colossus",
    "icon": "images/items/EyeoftheColossus.avif",
    "tier": "Legendary",
    "tags": [
      "Common",
      "Large",
      "Charge",
      "Tool"
    ],
    "description": [
      "Cooldown 30 seconds",
      "Destroy an enemy item for the fight.",
      "When you use an adjacent item, charge this 1 second(s)."
    ],
    "cooldown": 30,
    "enchants": {
      "Heavy": "When you use an adjacent item, Slow 1 item for 3 second(s).",
      "Icy": "When you use an adjacent item, Freeze 1 item for 1 second(s).",
      "Turbo": "When you use an adjacent item, Haste 1 item for 3 second(s).",
      "Shielded": "When you use an adjacent item, Shield 30.",
      "Restorative": "When you use an adjacent item, Heal 45.",
      "Toxic": "When you use an adjacent item, Poison 3.",
      "Fiery": "When you use an adjacent item, Burn 4.",
      "Shiny": "+1 Multicast"
    }
  },
  "Fang": {
    "name": "Fang",
    "icon": "images/items/Fang.avif",
    "tier": "Bronze",
    "tags": [
      "Common",
      "Small",
      "Damage",
      "Weapon"
    ],
    "description": [
      "Cooldown 4 seconds",
      "Deal ( 3 » 9 » 18 » 30 ) damage."
    ],
    "cooldown": 4,
    "enchants": {
      "Heavy": "Slow 1 item for 1 second(s).",
      "Icy": "Freeze 1 item for 1 second(s).",
      "Turbo": "Haste 1 item for 1 second(s).",
      "Shielded": "Shield 20.",
      "Restorative": "Heal 30.",
      "Toxic": "Poison 2.",
      "Fiery": "Burn 3.",
      "Shiny": "+1 Multicast",
      "Deadly": "+50% Crit Chance",
      "Obsidian": "Lifesteal"
    }
  },
  "Feather": {
    "name": "Feather",
    "icon": "images/items/Feather.avif",
    "tier": "Bronze",
    "tags": [
      "Common",
      "Small",
      "Cooldown"
    ],
    "description": [
      "When you sell this, reduce your leftmost item's cooldown by ( 4% » 8% » 12% » 16% )."
    ],
    "cooldown": null,
    "enchants": {}
  },
  "Fiber Optics": {
    "name": "Fiber Optics",
    "icon": "images/items/FiberOptics.avif",
    "tier": "Gold",
    "tags": [
      "Dooley",
      "Small",
      "Charge"
    ],
    "description": [
      "When you use your leftmost item, charge your rightmost item ( 1 » 2 ) second(s)."
    ],
    "cooldown": null,
    "enchants": {
      "Heavy": "When you use your leftmost item, Slow 1 item 2 second(s).",
      "Icy": "When you use your leftmost item, Freeze 1 item 1 second(s).",
      "Turbo": "When you use your leftmost item, Haste your rightmost item 1 second(s).",
      "Shielded": "When you use your leftmost item, Shield 15.",
      "Restorative": "When you use your leftmost item, Heal 20.",
      "Toxic": "When you use your leftmost item, Poison 1.",
      "Fiery": "When you use your leftmost item, Burn 2.",
      "Shiny": "Double Charge",
      "Deadly": "When you use the leftmost item, the rightmost item gains +25% Crit Chance for the fight."
    }
  },
  "Figurehead": {
    "name": "Figurehead",
    "icon": "images/items/Figurehead.avif",
    "tier": "Silver",
    "tags": [
      "Vanessa",
      "Medium",
      "Aquatic",
      "Cooldown",
      "Damage"
    ],
    "description": [
      "Aquatic items to the left of this have their cooldowns reduced by ( 10% » 20% » 30% ).",
      "Weapons to the right of this have ( +25 » +50 » +100 ) damage."
    ],
    "cooldown": null,
    "enchants": {
      "Heavy": "When you use an adjacent item, slow 1 item for 3 second(s).",
      "Icy": "When you use an adjacent item, freeze 1 item for 1 second(s).",
      "Turbo": "When you use an adjacent item, haste 1 item for 3 second(s).",
      "Shielded": "When you use an adjacent item, shield 20.",
      "Restorative": "When you use an adjacent item, heal 30.",
      "Toxic": "When you use an adjacent item, poison 2.",
      "Fiery": "When you use an adjacent item, burn 3.",
      "Shiny": "Double Cooldown Reduction",
      "Deadly": "Your items have +25% Crit Chance."
    }
  },
  "Fire Claw": {
    "name": "Fire Claw",
    "icon": "images/items/FireClaw.avif",
    "tier": "Bronze",
    "tags": [
      "Mak",
      "Medium",
      "Burn"
    ],
    "description": [
      "Cooldown 6 seconds",
      "Burn ( 3 » 6 » 9 » 12 ).",
      "This has + Burn equal to the Burn of your other items. [0]"
    ],
    "cooldown": 6,
    "enchants": {
      "Heavy": "Slow 2 items for 2 second(s).",
      "Icy": "Freeze 1 item for 2 second(s).",
      "Turbo": "Haste 2 items for 2 second(s).",
      "Shielded": "Shield 60.",
      "Restorative": "Heal 90.",
      "Toxic": "Poison 6.",
      "Fiery": "Double Burn",
      "Shiny": "+1 Multicast",
      "Deadly": "+50% Crit Chance"
    }
  },
  "Fire Potion": {
    "name": "Fire Potion",
    "icon": "images/items/FirePotion.avif",
    "tier": "Bronze",
    "tags": [
      "Mak",
      "Small",
      "Ammo",
      "Burn",
      "Potion"
    ],
    "description": [
      "Cooldown 5 seconds",
      "Ammo Max 1",
      "Burn ( 6 » 9 » 12 » 15 )."
    ],
    "cooldown": 5,
    "enchants": {
      "Heavy": "Slow 1 item for 3 second(s).",
      "Icy": "Freeze 1 item for 1 second(s).",
      "Turbo": "Haste 1 item for 3 second(s).",
      "Shielded": "Shield 50.",
      "Restorative": "Heal 75.",
      "Toxic": "Poison 5.",
      "Fiery": "Double Burn",
      "Shiny": "+1 Multicast",
      "Deadly": "+50% Crit Chance"
    }
  },
  "First Aiden": {
    "name": "First Aiden",
    "icon": "images/items/FirstAiden.avif",
    "tier": "Silver",
    "tags": [
      "Dooley",
      "Small",
      "Friend",
      "Haste",
      "Heal"
    ],
    "description": [
      "Cooldown 4 seconds",
      "Haste 1 item for ( 1 » 2 » 3 ) second(s).",
      "When you Haste, Heal ( 5 » 10 » 15 )."
    ],
    "cooldown": 4,
    "enchants": {
      "Heavy": "When you Haste, Slow 1 item for 1 second(s).",
      "Icy": "When you Haste, Freeze 1 item for 1 second(s).",
      "Turbo": "Double Haste",
      "Shielded": "When you Haste, Shield 6.",
      "Restorative": "Double Heal",
      "Toxic": "When you Haste, Poison 1.",
      "Fiery": "When you Haste, Burn 1.",
      "Shiny": "+1 Multicast",
      "Deadly": "When you Haste, your items gain +3% Crit Chance for the fight."
    }
  },
  "Fishing Net": {
    "name": "Fishing Net",
    "icon": "images/items/FishingNet.avif",
    "tier": "Bronze",
    "tags": [
      "Vanessa",
      "Medium",
      "Aquatic",
      "Slow",
      "Tool"
    ],
    "description": [
      "Cooldown 8 seconds",
      "Slow ( 1 » 2 » 3 » 4 ) item for 3 second(s).",
      "At the start of each day, get a Piranha."
    ],
    "cooldown": 8,
    "enchants": {
      "Heavy": "Double Slow",
      "Icy": "Freeze 1 item for 3 second(s).",
      "Turbo": "Haste 2 items for 3 second(s).",
      "Shielded": "Shield 80.",
      "Restorative": "Heal 120.",
      "Toxic": "Poison 8.",
      "Fiery": "Burn 12.",
      "Shiny": "+1 Multicast",
      "Deadly": "Your Piranhas have +50% Crit Chance."
    }
  },
  "Fishing Rod": {
    "name": "Fishing Rod",
    "icon": "images/items/FishingRod.avif",
    "tier": "Bronze",
    "tags": [
      "Vanessa",
      "Medium",
      "Aquatic",
      "Haste",
      "Tool"
    ],
    "description": [
      "Cooldown 8 seconds",
      "Give another Aquatic item Haste for ( 2 » 3 » 4 » 5 ) second(s).",
      "At the start of each day, get a Small aquatic item."
    ],
    "cooldown": 8,
    "enchants": {
      "Heavy": "Slow 2 items for 3 second(s).",
      "Icy": "Freeze 1 item for 3 second(s).",
      "Turbo": "+2 Haste Targets",
      "Shielded": "Shield 80.",
      "Restorative": "Heal 120.",
      "Toxic": "Poison 8.",
      "Fiery": "Burn 12.",
      "Shiny": "+1 Multicast",
      "Deadly": "Your Aquatic items have +25% Crit Chance."
    }
  },
  "Fixer Upper": {
    "name": "Fixer Upper",
    "icon": "images/items/FixerUpper.avif",
    "tier": "Bronze",
    "tags": [
      "Pygmalien",
      "Large",
      "Economy",
      "NonWeapon",
      "Property",
      "Shield"
    ],
    "description": [
      "Cooldown 3 seconds",
      "Shield equal to ( 1x » 2x » 3x » 4x ) this item's value.",
      "At the start of each day, upgrade this."
    ],
    "cooldown": 3,
    "enchants": {
      "Heavy": "Slow 3 items for 1 second(s).",
      "Golden": "Double Value",
      "Icy": "Freeze 1 item for 1 second(s).",
      "Turbo": "Haste 3 items for 1 second(s).",
      "Shielded": "Double Shield",
      "Restorative": "Heal equal to triple this item's value.",
      "Toxic": "Poison 4.",
      "Fiery": "Burn 7.",
      "Shiny": "+1 Multicast",
      "Deadly": "+50% Crit Chance"
    }
  },
  "Flagship": {
    "name": "Flagship",
    "icon": "images/items/Flagship.avif",
    "tier": "Silver",
    "tags": [
      "Vanessa",
      "Large",
      "Ammo",
      "Aquatic",
      "Damage",
      "Vehicle",
      "Weapon"
    ],
    "description": [
      "Cooldown 6 seconds",
      "Deal ( 25 » 50 » 75 ) damage.",
      "If you have another Tool, Ammo, Property or Friend this has +1 Multicast for each."
    ],
    "cooldown": 6,
    "enchants": {
      "Heavy": "Slow 1 item for 2 second(s).",
      "Icy": "Freeze 1 item for 1 second(s).",
      "Turbo": "Haste 1 item for 2 second(s).",
      "Shielded": "Shield 35.",
      "Restorative": "Heal 50.",
      "Toxic": "Poison 3.",
      "Fiery": "Burn 5.",
      "Shiny": "+1 Multicast",
      "Deadly": "+50% Crit Chance",
      "Obsidian": "Lifesteal"
    }
  },
  "Flail": {
    "name": "Flail",
    "icon": "images/items/Flail.avif",
    "tier": "Bronze",
    "tags": [
      "Pygmalien",
      "Medium",
      "Damage",
      "Weapon"
    ],
    "description": [
      "Cooldown 6 seconds",
      "Multicast 3",
      "Deal ( 5 » 15 » 30 » 50 ) damage."
    ],
    "cooldown": 6,
    "enchants": {
      "Heavy": "Slow 2 items for 2 second(s).",
      "Icy": "Freeze 1 item for 2 second(s).",
      "Turbo": "Haste 2 items for 2 second(s).",
      "Shielded": "Shield 20.",
      "Restorative": "Heal 30.",
      "Toxic": "Poison 4.",
      "Fiery": "Burn 6.",
      "Shiny": "+1 Multicast",
      "Deadly": "+50% Crit Chance",
      "Obsidian": "Lifesteal"
    }
  },
  "Flamberge": {
    "name": "Flamberge",
    "icon": "images/items/Flamberge.avif",
    "tier": "Legendary",
    "tags": [
      "Common",
      "Large",
      "Crit",
      "Damage",
      "Weapon"
    ],
    "description": [
      "Cooldown 8 seconds",
      "Deal 200 damage.",
      "This deals quadruple crit damage."
    ],
    "cooldown": 8,
    "enchants": {
      "Heavy": "Slow 3 items for 3 second(s).",
      "Icy": "Freeze 1 item for 4 second(s).",
      "Turbo": "Haste 3 items for 3 second(s).",
      "Shielded": "Shield 120.",
      "Restorative": "Heal 180.",
      "Toxic": "Poison 12.",
      "Fiery": "Burn 18.",
      "Shiny": "+1 Multicast",
      "Deadly": "+50% Crit Chance",
      "Obsidian": "Lifesteal"
    }
  },
  "Flamethrower": {
    "name": "Flamethrower",
    "icon": "images/items/Flamethrower.avif",
    "tier": "Gold",
    "tags": [
      "Dooley",
      "Medium",
      "Burn",
      "Damage",
      "Tool",
      "Weapon"
    ],
    "description": [
      "Cooldown 6 seconds",
      "Deal ( 2 » 4 ) damage.",
      "Burn equal to ( 2x » 3x ) this item's damage."
    ],
    "cooldown": 6,
    "enchants": {
      "Heavy": "Slow 2 items for 2 second(s).",
      "Icy": "Freeze 1 item for 2 second(s).",
      "Turbo": "Haste 2 items for 2 second(s).",
      "Shielded": "Shield 60.",
      "Restorative": "Heal 90.",
      "Toxic": "Poison equal to double this item's damage.",
      "Fiery": "Double Burn",
      "Shiny": "+1 Multicast",
      "Deadly": "+50% Crit Chance",
      "Obsidian": "Lifesteal"
    }
  },
  "Flashbang": {
    "name": "Flashbang",
    "icon": "images/items/Flashbang.avif",
    "tier": "Silver",
    "tags": [
      "Stelle",
      "Small",
      "Ammo",
      "Slow"
    ],
    "description": [
      "Cooldown 6 seconds",
      "Ammo Max 1",
      "Slow all enemy items for ( 3 » 4 » 5 ) second(s)."
    ],
    "cooldown": 6,
    "enchants": {
      "Heavy": "Double Slow",
      "Icy": "Freeze 1 item for 1 second(s).",
      "Turbo": "Haste 1 item for 3 second(s).",
      "Shielded": "Shield 45.",
      "Restorative": "Heal 70.",
      "Toxic": "Poison 4.",
      "Fiery": "Burn 7.",
      "Shiny": "+1 Multicast"
    }
  },
  "Force Field": {
    "name": "Force Field",
    "icon": "images/items/ForceField.avif",
    "tier": "Bronze",
    "tags": [
      "Dooley",
      "Large",
      "Damage",
      "Shield",
      "Weapon"
    ],
    "description": [
      "Cooldown 4 seconds",
      "Shield ( 10 » 30 » 60 » 100 ).",
      "Deal damage equal to your shield."
    ],
    "cooldown": 4,
    "enchants": {
      "Heavy": "Slow 3 items for 1 second(s).",
      "Icy": "Freeze 1 item for 2 second(s).",
      "Turbo": "Haste 3 items for 1 second(s).",
      "Shielded": "Double Shield",
      "Restorative": "Heal equal to your shield.",
      "Toxic": "Poison 6.",
      "Fiery": "Burn 9.",
      "Shiny": "+1 Multicast",
      "Deadly": "+50% Crit Chance",
      "Obsidian": "Lifesteal"
    }
  },
  "Fork Lift": {
    "name": "Fork Lift",
    "icon": "images/items/ForkLift.avif",
    "tier": "Gold",
    "tags": [
      "Dooley",
      "Large",
      "Damage",
      "Haste",
      "Tool",
      "Vehicle",
      "Weapon"
    ],
    "description": [
      "Cooldown 10 seconds",
      "Deal ( 50 » 100 ) damage for each item to the left of this.",
      "Haste this and the items on the right of this for ( 2 » 4 ) second(s)."
    ],
    "cooldown": 10,
    "enchants": {
      "Heavy": "Slow 3 items for 3 second(s).",
      "Icy": "Freeze 1 item for 4 second(s).",
      "Turbo": "Double Haste",
      "Shielded": "Shield 150.",
      "Restorative": "Heal 225.",
      "Toxic": "Poison 15.",
      "Fiery": "Burn 22.",
      "Shiny": "+1 Multicast",
      "Deadly": "+50% Crit Chance",
      "Obsidian": "Lifesteal"
    }
  },
  "Fort": {
    "name": "Fort",
    "icon": "images/items/Fort.avif",
    "tier": "Gold",
    "tags": [
      "Pygmalien",
      "Large",
      "Cooldown",
      "Property",
      "Shield"
    ],
    "description": [
      "When you use an item, Shield ( 10 » 20 ).",
      "Enemy item cooldowns are increased by ( 1 » 2 )."
    ],
    "cooldown": null,
    "enchants": {
      "Heavy": "When you use an item, slow 1 item for 2 second(s).",
      "Icy": "When you use an item freeze 1 item for 1 second(s).",
      "Turbo": "When you use an item haste 1 item for 2 second(s).",
      "Shielded": "Double Shield",
      "Restorative": "When you use an item, Heal 15.",
      "Toxic": "When you use an item poison 1",
      "Fiery": "When you use an item burn 2",
      "Shiny": "+1 Multicast",
      "Deadly": "Enemy items have -100% Crit Chance."
    }
  },
  "Fossilized Femur": {
    "name": "Fossilized Femur",
    "icon": "images/items/FossilizedFemur.avif",
    "tier": "Gold",
    "tags": [
      "Mak",
      "Large",
      "Charge",
      "Damage",
      "Slow",
      "Weapon"
    ],
    "description": [
      "Cooldown 12 seconds",
      "Deal ( 200 » 400 ) damage.",
      "When you Slow, charge this ( 1 » 2 ) second(s)."
    ],
    "cooldown": 12,
    "enchants": {
      "Heavy": "Slow 3 items for 4 second(s).",
      "Icy": "Freeze 1 item for 6 second(s).",
      "Turbo": "Haste 3 items for 4 second(s).",
      "Shielded": "Shield 200.",
      "Restorative": "Heal 300.",
      "Toxic": "Poison 20.",
      "Fiery": "Burn 30.",
      "Shiny": "+1 Multicast",
      "Deadly": "+50% Crit Chance",
      "Obsidian": "Lifesteal"
    }
  },
  "Frost Potion": {
    "name": "Frost Potion",
    "icon": "images/items/FrostPotion.avif",
    "tier": "Bronze",
    "tags": [
      "Mak",
      "Small",
      "Ammo",
      "Freeze",
      "Potion"
    ],
    "description": [
      "Cooldown 5 seconds",
      "Ammo Max 1",
      "Freeze ( 1 » 2 » 3 » 4 ) item(s) for 2 second(s)."
    ],
    "cooldown": 5,
    "enchants": {
      "Heavy": "Slow 1 item for 3 second(s).",
      "Icy": "Double Freeze",
      "Turbo": "Haste 1 item for 3 second(s).",
      "Shielded": "Shield 50.",
      "Restorative": "Heal 75.",
      "Toxic": "Poison 5.",
      "Fiery": "Burn 7.",
      "Shiny": "+1 Multicast"
    }
  },
  "Frozen Bludgeon": {
    "name": "Frozen Bludgeon",
    "icon": "images/items/FrozenBludgeon.avif",
    "tier": "Bronze",
    "tags": [
      "Common",
      "Medium",
      "Damage",
      "Freeze",
      "Weapon"
    ],
    "description": [
      "Cooldown 12 seconds",
      "Deal ( 10 » 30 » 60 » 100 ) damage.",
      "Freeze 1 item for ( 1 » 2 » 3 » 4 ) second(s).",
      "When you freeze an item, your weapons gain ( 4 » 6 » 8 » 10 ) damage for the fight."
    ],
    "cooldown": 12,
    "enchants": {
      "Heavy": "Slow 3 items for 4 second(s).",
      "Icy": "+1 Freeze Targets",
      "Turbo": "Haste 3 items for 4 second(s).",
      "Shielded": "Shield 180.",
      "Restorative": "Heal 270.",
      "Toxic": "Poison 18.",
      "Fiery": "Burn 27.",
      "Shiny": "+1 Multicast",
      "Deadly": "+50% Crit Chance",
      "Obsidian": "Lifesteal"
    }
  },
  "Gamma Ray": {
    "name": "Gamma Ray",
    "icon": "images/items/GammaRay.avif",
    "tier": "Gold",
    "tags": [
      "Dooley",
      "Small",
      "Poison"
    ],
    "description": [
      "Cooldown 4 seconds",
      "Poison ( 3 » 4 ).",
      "When you use the Core or another Ray, this gains ( 3 » 4 ) Poison for the fight."
    ],
    "cooldown": 4,
    "enchants": {
      "Heavy": "Slow 1 item for 1 second(s).",
      "Icy": "Freeze 1 item for 1 second(s).",
      "Turbo": "Haste 1 item for 1 second(s).",
      "Shielded": "Shield 20.",
      "Restorative": "Heal 30.",
      "Toxic": "Double Poison",
      "Fiery": "Burn 3.",
      "Shiny": "+1 Multicast",
      "Deadly": "+50% Crit Chance"
    }
  },
  "Ganjo": {
    "name": "Ganjo",
    "icon": "images/items/Ganjo.avif",
    "tier": "Bronze",
    "tags": [
      "Pygmalien",
      "Medium",
      "Damage",
      "Heal",
      "Shield"
    ],
    "description": [
      "Cooldown 4 seconds",
      "Adjacent weapons gain ( 5 » 10 » 15 » 20 ) Damage for the fight.",
      "Adjacent Heal items gain ( 5 » 10 » 15 » 20 ) Heal for the fight.",
      "Adjacent Shield items gain ( 5 » 10 » 15 » 20 ) Shield for the fight."
    ],
    "cooldown": 4,
    "enchants": {
      "Heavy": "Slow 2 items for 2 second(s).",
      "Icy": "Freeze 1 item for 2 second(s).",
      "Turbo": "Haste 2 items for 2 second(s).",
      "Shielded": "Double Shield",
      "Toxic": "Adjacent Poison items gain 1 Poison for the fight.",
      "Fiery": "Adjacent Burn items gain 1 burn for the fight.",
      "Shiny": "+1 Multicast",
      "Deadly": "Adjacent items gain 10% Crit Chance for the fight."
    }
  },
  "Gatling Gun": {
    "name": "Gatling Gun",
    "icon": "images/items/GatlingGun.avif",
    "tier": "Gold",
    "tags": [
      "Stelle",
      "Medium",
      "Cooldown",
      "Damage",
      "Weapon"
    ],
    "description": [
      "Cooldown 4 seconds",
      "Deal ( 10 » 20 ) damage.",
      "Reduce this item's cooldown by ( 10% » 20% ) for the fight."
    ],
    "cooldown": 4,
    "enchants": {
      "Heavy": "Slow 2 items for 1 second(s).",
      "Icy": "Freeze 1 item for 1 second(s).",
      "Turbo": "Haste 2 items for 1 second(s).",
      "Shielded": "Shield 20.",
      "Restorative": "Heal 30.",
      "Toxic": "Poison 2.",
      "Fiery": "Burn 3.",
      "Shiny": "+1 Multicast",
      "Deadly": "+50% Crit Chance",
      "Obsidian": "Lifesteal"
    }
  },
  "Gavel": {
    "name": "Gavel",
    "icon": "images/items/Gavel.avif",
    "tier": "Gold",
    "tags": [
      "Pygmalien",
      "Small",
      "Charge",
      "Damage",
      "Health",
      "Weapon"
    ],
    "description": [
      "Cooldown 8 seconds",
      "Deal ( 500 » 1000 ) damage to the player with less health."
    ],
    "cooldown": 8,
    "enchants": {
      "Heavy": "Slow 1 item for 2 second(s).",
      "Icy": "Freeze 1 item for 1 second(s).",
      "Turbo": "Haste 1 item for 2 second(s).",
      "Shielded": "Shield 500 to the player with the most health.",
      "Restorative": "Heal 500 to the player with the most health.",
      "Toxic": "Poison 50 to the player with the lowest health.",
      "Fiery": "Burn 50 to the player with the lowest health.",
      "Deadly": "+50% Crit Chance",
      "Shiny": "+1 Multicast",
      "Obsidian": "Lifesteal"
    }
  },
  "Gearnola Bar": {
    "name": "Gearnola Bar",
    "icon": "images/items/GearnolaBar.avif",
    "tier": "Bronze",
    "tags": [
      "Dooley",
      "Small",
      "Ammo",
      "Shield"
    ],
    "description": [
      "Cooldown 4 seconds",
      "Ammo Max 2",
      "Shield ( 20 » 40 » 60 » 80 ).",
      "When you sell a Tool, this gains 1 Max Ammo."
    ],
    "cooldown": 4,
    "enchants": {
      "Heavy": "Slow 1 item for 2 second(s).",
      "Icy": "Freeze 1 item for 1 second(s).",
      "Turbo": "Haste 1 item for 2 second(s).",
      "Shielded": "Double Shield",
      "Restorative": "Heal 60.",
      "Toxic": "Poison 4.",
      "Fiery": "Burn 6.",
      "Shiny": "+1 Multicast",
      "Deadly": "+50% Crit Chance"
    }
  },
  "Genie Lamp": {
    "name": "Genie Lamp",
    "icon": "images/items/GenieLamp.avif",
    "tier": "Diamond",
    "tags": [
      "Common",
      "Small",
      "NonWeapon",
      "Passive"
    ],
    "description": [
      "When you sell this, gain access to the genie Rit."
    ],
    "cooldown": null,
    "enchants": {}
  },
  "Giant Ice Club": {
    "name": "Giant Ice Club",
    "icon": "images/items/GiantIceClub.avif",
    "tier": "Gold",
    "tags": [
      "Pygmalien",
      "Large",
      "Damage",
      "Freeze",
      "Weapon"
    ],
    "description": [
      "Cooldown 9 seconds",
      "Deal ( 500 » 1000 ) damage.",
      "The first time you fall below half health each fight, Freeze 1 item for 100 second(s).",
      "When any item gains Freeze, charge this ( 1 » 2 ) second(s)."
    ],
    "cooldown": 9,
    "enchants": {
      "Heavy": "Slow 3 items for 3 second(s).",
      "Icy": "Double Freeze Targets",
      "Turbo": "Haste 3 items for 4 second(s).",
      "Shielded": "Shield 200.",
      "Restorative": "Heal 300.",
      "Toxic": "Poison 20.",
      "Fiery": "Burn 30.",
      "Shiny": "+1 Multicast",
      "Deadly": "+50% Crit Chance",
      "Obsidian": "Lifesteal"
    }
  },
  "Gland": {
    "name": "Gland",
    "icon": "images/items/Gland.avif",
    "tier": "Bronze",
    "tags": [
      "Common",
      "Small",
      "NonWeapon",
      "Passive"
    ],
    "description": [
      "When you sell this, gain ( 2 » 4 » 6 » 8 ) Regeneration."
    ],
    "cooldown": null,
    "enchants": {}
  },
  "Globe": {
    "name": "Globe",
    "icon": "images/items/Globe.avif",
    "tier": "Silver",
    "tags": [
      "Pygmalien",
      "Medium",
      "Health",
      "Tool"
    ],
    "description": [
      "At the start of each day, gain ( 100 » 200 » 300 ) Max Health."
    ],
    "cooldown": null,
    "enchants": {
      "Heavy": "At the start of the fight, Slow 3 items for 5 second(s).",
      "Icy": "At the start of the fight, Freeze 2 item for 4 second(s).",
      "Turbo": "At the start of the fight, Haste 3 items for 5 second(s).",
      "Shielded": "At the start of each fight, Shield 120.",
      "Restorative": "You have +12 Regeneration.",
      "Toxic": "At the start of the fight, poison 12.",
      "Fiery": "At the start of the fight, burn 16.",
      "Shiny": "Double Health Max",
      "Deadly": "At the start of each day, your items gain 10% Crit Chance."
    }
  },
  "Goggles": {
    "name": "Goggles",
    "icon": "images/items/Goggles.avif",
    "tier": "Bronze",
    "tags": [
      "Stelle",
      "Small",
      "Crit",
      "Haste",
      "Shield",
      "Tool"
    ],
    "description": [
      "Cooldown 7 seconds",
      "Shield ( 10 » 30 » 60 » 100 ).",
      "When this gains Haste, give your items ( +2% » +4% » +6% » +8% ) Crit chance for the fight."
    ],
    "cooldown": 7,
    "enchants": {
      "Heavy": "Slow 1 item for 2 second(s).",
      "Icy": "Freeze 1 item for 1 second(s).",
      "Turbo": "Haste 1 item for 2 second(s).",
      "Shielded": "Double Shield",
      "Restorative": "Heal 60.",
      "Toxic": "Poison 4.",
      "Fiery": "Burn 6.",
      "Shiny": "+1 Multicast",
      "Deadly": "+50% Crit Chance"
    }
  },
  "Golf Clubs": {
    "name": "Golf Clubs",
    "icon": "images/items/GolfClubs.avif",
    "tier": "Bronze",
    "tags": [
      "Pygmalien",
      "Medium",
      "Damage",
      "Heal",
      "Weapon"
    ],
    "description": [
      "Cooldown 7 seconds",
      "Deal 20 damage.",
      "When you Heal, this gains ( 10 » 20 » 30 » 40 ) damage for the fight."
    ],
    "cooldown": 7,
    "enchants": {
      "Heavy": "Slow 2 items for 2 second(s).",
      "Icy": "Freeze 1 item for 2 second(s).",
      "Turbo": "Haste 2 items for 2 second(s).",
      "Shielded": "Shield 60.",
      "Restorative": "Heal 90.",
      "Toxic": "Poison 6.",
      "Fiery": "Burn 9.",
      "Shiny": "+1 Multicast",
      "Deadly": "+50% Crit Chance",
      "Obsidian": "Lifesteal"
    }
  },
  "GPU": {
    "name": "GPU",
    "icon": "images/items/GPU.avif",
    "tier": "Bronze",
    "tags": [
      "Dooley",
      "Small",
      "Haste"
    ],
    "description": [
      "Cooldown 4 seconds",
      "Haste the Core for ( 1 » 2 » 3 » 4 ) second(s)."
    ],
    "cooldown": 4,
    "enchants": {
      "Heavy": "Slow 1 item for 1 second(s).",
      "Icy": "Freeze 1 item for 1 second(s).",
      "Turbo": "Double Haste",
      "Shielded": "Shield 20.",
      "Restorative": "Heal 30.",
      "Toxic": "Poison 2.",
      "Fiery": "Burn 3.",
      "Shiny": "+1 Multicast"
    }
  },
  "Grapeshot": {
    "name": "Grapeshot",
    "icon": "images/items/Grapeshot.avif",
    "tier": "Silver",
    "tags": [
      "Vanessa",
      "Small",
      "Ammo",
      "Damage",
      "Weapon"
    ],
    "description": [
      "Cooldown 3 seconds",
      "Ammo Max 2",
      "Deal ( 15 » 30 » 50 ) damage.",
      "When you use another ammo item, this reloads 1 ammo."
    ],
    "cooldown": 3,
    "enchants": {
      "Heavy": "Slow 1 item for 1 second(s).",
      "Icy": "Freeze 1 item for 1 second(s).",
      "Turbo": "Haste 1 item for 1 second(s).",
      "Shielded": "Shield 20.",
      "Restorative": "Heal 30.",
      "Toxic": "Poison 2.",
      "Fiery": "Burn 3.",
      "Shiny": "+1 Multicast",
      "Deadly": "+50% Crit Chance",
      "Obsidian": "Lifesteal"
    }
  },
  "Grappling Hook": {
    "name": "Grappling Hook",
    "icon": "images/items/GrapplingHook.avif",
    "tier": "Silver",
    "tags": [
      "Vanessa",
      "Small",
      "Damage",
      "Slow",
      "Tool",
      "Weapon"
    ],
    "description": [
      "Cooldown 7 seconds",
      "Deal ( 10 » 20 » 30 ) damage.",
      "Slow 1 item for ( 3 » 4 » 5 ) second(s)."
    ],
    "cooldown": 7,
    "enchants": {
      "Heavy": "+2 Slow Targets",
      "Icy": "Freeze 1 item for 1 second(s).",
      "Turbo": "Haste 1 item for 2 second(s).",
      "Shielded": "Shield 35.",
      "Restorative": "Heal 50.",
      "Toxic": "Poison 3.",
      "Fiery": "Burn 5.",
      "Shiny": "+1 Multicast",
      "Deadly": "+50% Crit Chance",
      "Obsidian": "Lifesteal"
    }
  },
  "Green Gumball": {
    "name": "Green Gumball",
    "icon": "images/items/GreenGumball.avif",
    "tier": "Bronze",
    "tags": [
      "Common",
      "Small",
      "Health",
      "NonWeapon",
      "Passive"
    ],
    "description": [
      "When you sell this, gain ( 10 » 20 » 30 » 40 ) Max Health."
    ],
    "cooldown": null,
    "enchants": {}
  },
  "Grenade": {
    "name": "Grenade",
    "icon": "images/items/Grenade.avif",
    "tier": "Bronze",
    "tags": [
      "Vanessa",
      "Small",
      "Ammo",
      "Damage",
      "Weapon"
    ],
    "description": [
      "Cooldown 4 seconds",
      "Ammo Max 1",
      "Crit Chance 25%",
      "Deal ( 40 » 80 » 150 » 300 ) damage."
    ],
    "cooldown": 4,
    "enchants": {
      "Heavy": "Slow 1 item for 6 second(s).",
      "Icy": "Freeze 1 item for 3 second(s).",
      "Turbo": "Haste 1 item for 2 second(s).",
      "Shielded": "Shield 160.",
      "Restorative": "Heal 240.",
      "Toxic": "Poison 16.",
      "Fiery": "Burn 24.",
      "Shiny": "+1 Multicast",
      "Deadly": "This has double Crit Damage.",
      "Obsidian": "Lifesteal"
    }
  },
  "Grindstone": {
    "name": "Grindstone",
    "icon": "images/items/Grindstone.avif",
    "tier": "Silver",
    "tags": [
      "Pygmalien",
      "Medium",
      "Damage",
      "Tool"
    ],
    "description": [
      "Cooldown 3 seconds",
      "Give the weapon to the left of this ( +10 » +20 » +30 ) damage for the fight."
    ],
    "cooldown": 3,
    "enchants": {
      "Heavy": "Slow 2 items for 1 second(s).",
      "Icy": "Freeze 1 item for 1 second(s).",
      "Turbo": "Haste 2 items for 1 second(s).",
      "Shielded": "The Shield item to the left of this gains 20 Shield for the fight.",
      "Restorative": "The Heal item to the left of this gains 30 Heal for the fight.",
      "Toxic": "The Poison item to the left of this gains 2 Poison for the fight.",
      "Fiery": "The Burn item to the left of this gains 3 burn for the fight.",
      "Shiny": "+1 Multicast",
      "Deadly": "The item to the left of this gains +20% Crit Chance for the fight."
    }
  },
  "Gumball Machine": {
    "name": "Gumball Machine",
    "icon": "images/items/GumballMachine.avif",
    "tier": "Silver",
    "tags": [
      "Pygmalien",
      "Medium",
      "Gold",
      "Shield"
    ],
    "description": [
      "Cooldown 5 seconds",
      "Shield ( 10 » 20 » 30 ).",
      "At the start of each hour, spend 2 gold to get a Gumball."
    ],
    "cooldown": 5,
    "enchants": {
      "Golden": "The Gumball is now free!",
      "Heavy": "Slow 2 items for 2 second(s).",
      "Icy": "Freeze 1 item for 2 second(s).",
      "Turbo": "Haste 2 items for 2 second(s).",
      "Shielded": "Double Shield",
      "Restorative": "Heal 60.",
      "Toxic": "Poison 4.",
      "Fiery": "Burn 6.",
      "Shiny": "+1 Multicast",
      "Deadly": "+50% Crit Chance"
    }
  },
  "Gunpowder": {
    "name": "Gunpowder",
    "icon": "images/items/Gunpowder.avif",
    "tier": "Silver",
    "tags": [
      "Common",
      "Small",
      "NonWeapon",
      "Passive"
    ],
    "description": [
      "When you sell this, your leftmost Ammo item gains ( 1 » 2 » 3 ) Max Ammo."
    ],
    "cooldown": null,
    "enchants": {}
  },
  "Hacksaw": {
    "name": "Hacksaw",
    "icon": "images/items/Hacksaw.avif",
    "tier": "Gold",
    "tags": [
      "Dooley",
      "Medium",
      "Damage",
      "Tool",
      "Weapon"
    ],
    "description": [
      "Cooldown 6 seconds",
      "Deal ( 25 » 50 ) damage.",
      "The first time you use this each fight, destroy a small enemy item for the fight."
    ],
    "cooldown": 6,
    "enchants": {
      "Heavy": "Slow 2 items for 2 second(s).",
      "Icy": "Freeze 1 item for 2 second(s).",
      "Turbo": "Haste 2 items for 2 second(s).",
      "Shielded": "Shield 60.",
      "Restorative": "Heal 90.",
      "Toxic": "Poison 6.",
      "Fiery": "Burn 9.",
      "Shiny": "+1 Multicast",
      "Deadly": "+50% Crit Chance"
    }
  },
  "Hakurvian Launcher": {
    "name": "Hakurvian Launcher",
    "icon": "images/items/HakurvianLauncher.avif",
    "tier": "Bronze",
    "tags": [
      "Common",
      "Large",
      "Haste"
    ],
    "description": [
      "Cooldown 8 seconds",
      "Ammo Max 2",
      "Deal ( 50 » 150 » 300 » 500 ) damage.",
      "When this gains Haste, it also gains ( 5% » 10% » 15% » 20% ) Crit Chance for the fight."
    ],
    "cooldown": 8,
    "enchants": {
      "Heavy": "Slow 3 items for 4 second(s).",
      "Icy": "Freeze 1 item for 6 second(s).",
      "Turbo": "Haste 3 items for 4 second(s).",
      "Shielded": "Shield 180.",
      "Restorative": "Heal 270.",
      "Toxic": "Poison 18.",
      "Fiery": "Burn 27.",
      "Shiny": "+1 Multicast",
      "Deadly": "+50% Crit Chance",
      "Obsidian": "Lifesteal"
    }
  },
  "Haladie": {
    "name": "Haladie",
    "icon": "images/items/Haladie.avif",
    "tier": "Bronze",
    "tags": [
      "Pygmalien",
      "Small",
      "Damage",
      "Weapon"
    ],
    "description": [
      "Cooldown 6 seconds",
      "Multicast 2",
      "Deal ( 3 » 9 » 18 » 30 ) damage."
    ],
    "cooldown": 6,
    "enchants": {
      "Heavy": "Slow 1 item for 1 second(s).",
      "Icy": "Freeze 1 item for 1 second(s).",
      "Turbo": "Haste 1 item for 1 second(s).",
      "Shielded": "Shield 15.",
      "Restorative": "Heal 20.",
      "Toxic": "Poison 1.",
      "Fiery": "Burn 2.",
      "Shiny": "+1 Multicast",
      "Deadly": "+50% Crit Chance",
      "Obsidian": "Lifesteal"
    }
  },
  "Hammer": {
    "name": "Hammer",
    "icon": "images/items/Hammer.avif",
    "tier": "Silver",
    "tags": [
      "Stelle",
      "Small",
      "Damage",
      "Tool",
      "Weapon"
    ],
    "description": [
      "Cooldown 9 seconds",
      "Deal ( 20 » 40 » 80 ) damage.",
      "When you Level Up, if you have at least 3 tools, upgrade the item to the left of this."
    ],
    "cooldown": 9,
    "enchants": {
      "Heavy": "And make the item Heavy if able.",
      "Icy": "And make the item Icy if able.",
      "Turbo": "And make the item Turbo if able.",
      "Shielded": "And make the item Shielded if able.",
      "Restorative": "And make the item Restorative if able.",
      "Toxic": "And make the item Toxic if able.",
      "Fiery": "And make the item Fiery if able.",
      "Shiny": "And make the item Shiny if able.",
      "Deadly": "And make the item Deadly if able.",
      "Radiant": "And make the item Radiant if able.",
      "Obsidian": "And make the item Obsidian if able."
    }
  },
  "Hammlet": {
    "name": "Hammlet",
    "icon": "images/items/Hammlet.avif",
    "tier": "Silver",
    "tags": [
      "Dooley",
      "Small",
      "Charge",
      "Damage",
      "Friend",
      "Slow",
      "Tool",
      "Weapon"
    ],
    "description": [
      "Cooldown 9 seconds",
      "Deal ( 15 » 30 » 45 ) damage.",
      "When you Slow, charge this ( 1 » 1 » 2 ) second(s)."
    ],
    "cooldown": 9,
    "enchants": {
      "Heavy": "Slow 1 item for 3 second(s).",
      "Icy": "Freeze 1 item for 1 second(s).",
      "Turbo": "Haste 1 item for 3 second(s).",
      "Shielded": "Shield 45.",
      "Restorative": "Heal 70.",
      "Toxic": "Poison 4.",
      "Fiery": "Burn 7.",
      "Shiny": "+1 Multicast",
      "Deadly": "+50% Crit Chance",
      "Obsidian": "Lifesteal"
    }
  },
  "Hammock": {
    "name": "Hammock",
    "icon": "images/items/Hammock.avif",
    "tier": "Gold",
    "tags": [
      "Pygmalien",
      "Medium",
      "Cooldown",
      "Heal"
    ],
    "description": [
      "Cooldown 12 seconds",
      "Heal ( 100 » 200 ).",
      "This item's cooldown is reduced by 5 seconds for each adjacent large item."
    ],
    "cooldown": 12,
    "enchants": {
      "Heavy": "Slow 2 items for 1 second(s).",
      "Icy": "Freeze 1 item for 1 second(s).",
      "Turbo": "Haste 2 items for 1 second(s).",
      "Shielded": "Shield 40.",
      "Restorative": "Double Heal",
      "Toxic": "Poison 4.",
      "Fiery": "Burn 6.",
      "Shiny": "+1 Multicast",
      "Deadly": "+50% Crit Chance"
    }
  },
  "Handaxe": {
    "name": "Handaxe",
    "icon": "images/items/Handaxe.avif",
    "tier": "Bronze",
    "tags": [
      "Vanessa",
      "Small",
      "Damage",
      "Weapon"
    ],
    "description": [
      "Cooldown 7 seconds",
      "Deal ( 5 » 15 » 30 » 50 ) damage.",
      "Your weapons have ( +3 » +6 » +9 » +15 ) damage."
    ],
    "cooldown": 7,
    "enchants": {
      "Heavy": "Slow 1 item for 2 second(s).",
      "Icy": "Freeze 1 item for 1 second(s).",
      "Turbo": "Haste 1 item for 2 second(s).",
      "Shielded": "Shield 35.",
      "Restorative": "Heal 50.",
      "Toxic": "Poison 3.",
      "Fiery": "Burn 5.",
      "Shiny": "+1 Multicast",
      "Deadly": "+50% Crit Chance",
      "Obsidian": "Lifesteal"
    }
  },
  "Harmadillo": {
    "name": "Harmadillo",
    "icon": "images/items/Harmadillo.avif",
    "tier": "Bronze",
    "tags": [
      "Dooley",
      "Medium",
      "Damage",
      "Friend",
      "Shield",
      "Weapon"
    ],
    "description": [
      "Cooldown 8 seconds",
      "Shield ( 10 » 30 » 60 » 100 ).",
      "When you Shield, deal damage equal to this item's Shield."
    ],
    "cooldown": 8,
    "enchants": {
      "Heavy": "When you Shield, Slow 1 items for 2 second(s).",
      "Icy": "When you Shield, Freeze 1 item for 1 second(s).",
      "Turbo": "When you Shield, Haste 1 items for 2 second(s).",
      "Shielded": "Double Shield",
      "Restorative": "When you Shield, Heal equal to this item's damage.",
      "Toxic": "When you Shield, Poison 1.",
      "Fiery": "When you Shield, Burn 2.",
      "Shiny": "+1 Multicast",
      "Deadly": "When you Shield, your items gain 6% Crit Chance for the fight.",
      "Obsidian": "Lifesteal"
    }
  },
  "Hatchet": {
    "name": "Hatchet",
    "icon": "images/items/Hatchet.avif",
    "tier": "Bronze",
    "tags": [
      "Pygmalien",
      "Small",
      "Damage",
      "Economy",
      "Tool",
      "Weapon"
    ],
    "description": [
      "Cooldown 5 seconds",
      "Deal ( 5 » 15 » 30 » 50 ) damage.",
      "When you buy this, get a Spare Change."
    ],
    "cooldown": 5,
    "enchants": {
      "Heavy": "Slow 1 item for 2 second(s).",
      "Icy": "Freeze 1 item for 1 second(s).",
      "Turbo": "Haste 1 item for 2 second(s).",
      "Shielded": "Shield 35.",
      "Restorative": "Heal 50.",
      "Toxic": "Poison 3.",
      "Fiery": "Burn 5.",
      "Shiny": "+1 Multicast",
      "Deadly": "+50% Crit Chance",
      "Obsidian": "Lifesteal"
    }
  },
  "Hemlock": {
    "name": "Hemlock",
    "icon": "images/items/Hemlock.avif",
    "tier": "Bronze",
    "tags": [
      "Mak",
      "Small",
      "Poison"
    ],
    "description": [
      "Cooldown 6 seconds",
      "Poison ( 2 » 3 » 4 » 5 )."
    ],
    "cooldown": 6,
    "enchants": {
      "Heavy": "Slow 1 item for 2 second(s).",
      "Icy": "Freeze 1 item for 1 second(s).",
      "Turbo": "Haste 1 item for 2 second(s).",
      "Shielded": "Shield 30.",
      "Restorative": "Heal 45.",
      "Toxic": "Double Poison",
      "Fiery": "Burn 4.",
      "Shiny": "+1 Multicast",
      "Deadly": "+50% Crit Chance"
    }
  },
  "Hogwash": {
    "name": "Hogwash",
    "icon": "images/items/Hogwash.avif",
    "tier": "Silver",
    "tags": [
      "Pygmalien",
      "Large",
      "Economy",
      "Heal",
      "Property"
    ],
    "description": [
      "Cooldown 4 seconds",
      "Heal equal to ( 4% » 8% » 12% ) of your Max Health.",
      "When you Heal, gain ( 5 » 15 » 30 ) Max Health for the fight."
    ],
    "cooldown": 4,
    "enchants": {
      "Heavy": "When you Heal, Slow 1 items for 3 second(s).",
      "Icy": "When you Heal, Freeze 1 item for 1 second(s).",
      "Turbo": "When you Heal, Haste 1 items for 3 second(s).",
      "Shielded": "When you Heal, Shield 30.",
      "Restorative": "Double Heal",
      "Toxic": "When you Heal, Poison 3.",
      "Fiery": "When you Heal, Burn 4.",
      "Shiny": "+1 Multicast",
      "Deadly": "When you Heal, your items gain +10% Crit Chance for the fight."
    }
  },
  "Holsters": {
    "name": "Holsters",
    "icon": "images/items/Holsters.avif",
    "tier": "Silver",
    "tags": [
      "Vanessa",
      "Small",
      "Haste"
    ],
    "description": [
      "At the start of each fight, your Small items gain Haste for ( 1 » 2 » 3 ) second(s)."
    ],
    "cooldown": null,
    "enchants": {
      "Heavy": "At the start of each fight, Slow small enemy items for 2 second(s).",
      "Icy": "At the start of each fight, Freeze 1 item for 4 second(s).",
      "Turbo": "Double Haste",
      "Shielded": "At the start of each fight, Shield 60.",
      "Toxic": "At the start of each fight, poison 3.",
      "Fiery": "At the start of each fight, burn 3.",
      "Deadly": "Your Small items have +20% Crit Chance."
    }
  },
  "Honing Steel": {
    "name": "Honing Steel",
    "icon": "images/items/HoningSteel.avif",
    "tier": "Bronze",
    "tags": [
      "Vanessa",
      "Small",
      "Damage",
      "Tool"
    ],
    "description": [
      "Cooldown 4 seconds",
      "Give the weapon to the right of this ( +5 » +10 » +15 » +20 ) damage for the fight."
    ],
    "cooldown": 4,
    "enchants": {
      "Heavy": "Slow 1 item for 1 second(s).",
      "Icy": "Freeze 1 item for 1 second(s).",
      "Turbo": "Haste the Weapon to the right for 1 second(s).",
      "Shielded": "Shield 20.",
      "Restorative": "Heal 30.",
      "Toxic": "Poison 2.",
      "Fiery": "Burn 3.",
      "Shiny": "+1 Multicast",
      "Deadly": "Give the Weapon to the right of this +20% Crit Chance for the fight."
    }
  },
  "Hot Springs": {
    "name": "Hot Springs",
    "icon": "images/items/HotSprings.avif",
    "tier": "Bronze",
    "tags": [
      "Common",
      "Large",
      "Heal"
    ],
    "description": [
      "Cooldown 5 seconds",
      "Heal ( 20 » 60 » 120 » 200 ).",
      "When you sell this, your Heal items gain ( 10 » 20 » 30 » 40 ) Heal."
    ],
    "cooldown": 5,
    "enchants": {
      "Heavy": "Slow 3 items for 2 second(s).",
      "Icy": "Freeze 1 item for 3 second(s).",
      "Turbo": "Haste 3 items for 2 second(s).",
      "Shielded": "Shield 75.",
      "Restorative": "Double Heal",
      "Toxic": "Poison 7.",
      "Fiery": "Burn 11.",
      "Shiny": "+1 Multicast",
      "Deadly": "+50% Crit Chance"
    }
  },
  "Hydraulic Squeezer": {
    "name": "Hydraulic Squeezer",
    "icon": "images/items/HydraulicSqueezer.avif",
    "tier": "Silver",
    "tags": [
      "Stelle",
      "Medium",
      "Damage",
      "Tool",
      "Weapon"
    ],
    "description": [
      "Cooldown 9 seconds",
      "Deal ( 26 » 39 » 59 ) damage.",
      "When you use a Tool, your weapons gain ( 2 » 4 ) damage for the fight."
    ],
    "cooldown": 9,
    "enchants": {
      "Heavy": "Slow 2 items for 3 second(s).",
      "Icy": "Freeze 1 item for 3 second(s).",
      "Turbo": "Haste 2 items for 3 second(s).",
      "Shielded": "Shield 90.",
      "Restorative": "Heal 135.",
      "Toxic": "Poison 9.",
      "Fiery": "Burn 13.",
      "Shiny": "+1 Multicast",
      "Deadly": "+50% Crit Chance",
      "Obsidian": "Lifesteal"
    }
  },
  "Ice 9000": {
    "name": "Ice 9000",
    "icon": "images/items/Ice9000.avif",
    "tier": "Silver",
    "tags": [
      "Dooley",
      "Medium",
      "Freeze",
      "Friend",
      "Poison"
    ],
    "description": [
      "Cooldown 8 seconds",
      "Freeze 1 item for ( 1 » 2 » 3 ) second(s).",
      "When you Freeze, Poison ( 1 » 2 » 3 )."
    ],
    "cooldown": 8,
    "enchants": {
      "Heavy": "When you Freeze, Slow 1 item for 3 second(s).",
      "Icy": "Double Freeze",
      "Turbo": "When you Freeze, Haste 1 items for 3 second(s).",
      "Shielded": "When you Freeze, Shield 20.",
      "Restorative": "When you Freeze, Heal 30.",
      "Toxic": "This has double Poison.",
      "Fiery": "When you Freeze, Burn 3.",
      "Shiny": "+1 Multicast",
      "Deadly": "When you Freeze, an item gains +25% Crit Chance for the fight."
    }
  },
  "Ice Cream Truck": {
    "name": "Ice Cream Truck",
    "icon": "images/items/IceCreamTruck.avif",
    "tier": "Silver",
    "tags": [
      "Pygmalien",
      "Large",
      "Charge",
      "Freeze",
      "Vehicle"
    ],
    "description": [
      "Cooldown 6 seconds",
      "Freeze 1 item for ( 1 » 2 » 4 ) second(s).",
      "When you use another non-weapon item, charge this 1 second(s)."
    ],
    "cooldown": 6,
    "enchants": {
      "Heavy": "Slow 3 items for 2 second(s).",
      "Icy": "Double Freeze",
      "Turbo": "Haste 3 items for 2 second(s).",
      "Shielded": "Shield 90.",
      "Restorative": "Heal 135.",
      "Toxic": "Poison 9.",
      "Fiery": "Burn 13.",
      "Shiny": "+1 Multicast"
    }
  },
  "Ice Cubes": {
    "name": "Ice Cubes",
    "icon": "images/items/IceCubes.avif",
    "tier": "Gold",
    "tags": [
      "Jules",
      "Small",
      "Food",
      "Freeze"
    ],
    "description": [
      "Cooldown 9 seconds",
      "Freeze 3 small items for ( 1 » 2 ) second(s)."
    ],
    "cooldown": 9,
    "enchants": {
      "Heavy": "Slow 1 item for 4 second(s).",
      "Icy": "+1 Freeze",
      "Turbo": "Haste 1 item for 4 second(s).",
      "Shielded": "Shield 60.",
      "Restorative": "Heal 90.",
      "Toxic": "Poison 6.",
      "Fiery": "Burn 9.",
      "Shiny": "+1 Multicast"
    }
  },
  "Ice Pick": {
    "name": "Ice Pick",
    "icon": "images/items/IcePick.avif",
    "tier": "Silver",
    "tags": [
      "Vanessa",
      "Small",
      "Damage",
      "Freeze",
      "Weapon"
    ],
    "description": [
      "Cooldown 7 seconds",
      "Deal 20 damage.",
      "Freeze 1 item for ( 1 » 2 » 3 ) second(s).",
      "When you Freeze, this gains ( 5 » 10 » 20 ) damage for the fight."
    ],
    "cooldown": 7,
    "enchants": {
      "Heavy": "Slow 1 item for 2 second(s).",
      "Icy": "Double Freeze",
      "Turbo": "Haste 1 item for 2 second(s).",
      "Shielded": "Shield 35.",
      "Restorative": "Heal 50.",
      "Toxic": "Poison 3.",
      "Fiery": "Burn 5.",
      "Shiny": "+1 Multicast",
      "Deadly": "+50% Crit Chance",
      "Obsidian": "Lifesteal"
    }
  },
  "Iceberg": {
    "name": "Iceberg",
    "icon": "images/items/Iceberg.avif",
    "tier": "Diamond",
    "tags": [
      "Vanessa",
      "Large",
      "Aquatic",
      "Freeze",
      "Property"
    ],
    "description": [
      "When your enemy uses an item, Freeze it for 1 second(s)."
    ],
    "cooldown": null,
    "enchants": {
      "Heavy": "When your enemy uses an item, slow 1 item for 3 second(s).",
      "Icy": "Double Freeze",
      "Turbo": "When your enemy uses an item, haste 1 item for 3 second(s).",
      "Shielded": "When your enemy uses an item, shield 30.",
      "Restorative": "When your enemy uses an item, heal 45.",
      "Toxic": "When your enemy uses an item, poison 3.",
      "Fiery": "When your enemy uses an item, burn 4."
    }
  },
  "Icebreaker": {
    "name": "Icebreaker",
    "icon": "images/items/Icebreaker.avif",
    "tier": "Silver",
    "tags": [
      "Common",
      "Medium",
      "Damage",
      "Freeze",
      "Tool",
      "Weapon"
    ],
    "description": [
      "Cooldown 6 seconds",
      "Deal ( 40 » 80 » 120 ) damage.",
      "Remove Freeze from your items.",
      "When any item gains freeze, charge this ( +1 » +2 » +3 ) second(s).",
      "When this item gains Freeze, remove Freeze from it."
    ],
    "cooldown": 6,
    "enchants": {
      "Heavy": "Slow 2 items for 2 second(s).",
      "Icy": "Freeze 1 item for 100 second(s).",
      "Turbo": "Haste 2 items for 2 second(s).",
      "Shielded": "Shield 60.",
      "Restorative": "Heal 90.",
      "Toxic": "Poison 6.",
      "Fiery": "Burn 9.",
      "Shiny": "+1 Multicast",
      "Deadly": "+50% Crit Chance",
      "Obsidian": "Lifesteal"
    }
  },
  "Icicle": {
    "name": "Icicle",
    "icon": "images/items/Icicle.avif",
    "tier": "Bronze",
    "tags": [
      "Common",
      "Small",
      "Freeze",
      "NonWeapon",
      "Passive"
    ],
    "description": [
      "At the start of each fight, freeze 1 item for ( 3 » 4 » 5 » 6 ) second(s)."
    ],
    "cooldown": null,
    "enchants": {
      "Heavy": "At the start of each fight, slow 2 item for 4 second(s).",
      "Icy": "Double Freeze",
      "Turbo": "At the start of each fight, haste 2 items for 4 second(s).",
      "Shielded": "At the start of each fight, shield 60.",
      "Restorative": "At the start of each fight, gain 6 Regeneration for the fight.",
      "Toxic": "At the start of each fight, poison 6",
      "Fiery": "At the start of each fight, Burn 8.",
      "Shiny": "+1 Freeze Targets"
    }
  },
  "Igloo": {
    "name": "Igloo",
    "icon": "images/items/Igloo.avif",
    "tier": "Silver",
    "tags": [
      "Pygmalien",
      "Large",
      "Freeze",
      "Property",
      "Shield"
    ],
    "description": [
      "Cooldown 6 seconds",
      "Freeze 1 item for ( 2 » 3 » 4 ) second(s).",
      "When you Freeze, Shield ( 20 » 30 » 40 )."
    ],
    "cooldown": 6,
    "enchants": {
      "Heavy": "Slow 1 items for 4 second(s).",
      "Icy": "+1 Freeze Targets",
      "Turbo": "When you freeze, Haste 1 items for 4 second(s).",
      "Shielded": "Double Shield",
      "Restorative": "When you freeze, heal 60.",
      "Toxic": "When you freeze, poison 4.",
      "Fiery": "When you freeze, burn 6.",
      "Shiny": "+1 Multicast"
    }
  },
  "Ignition Core": {
    "name": "Ignition Core",
    "icon": "images/items/IgnitionCore.avif",
    "tier": "Bronze",
    "tags": [
      "Dooley",
      "Medium",
      "Burn",
      "Charge",
      "Core",
      "Unsellable"
    ],
    "description": [
      "Cooldown 7 seconds",
      "Burn ( 4 » 8 » 12 » 16 ).",
      "Burn items to the right of this gain ( 1 » 2 » 3 » 4 ) Burn for the fight.",
      "When you use any item to the left of this, Charge this 1 second(s)."
    ],
    "cooldown": 7,
    "enchants": {
      "Heavy": "Slow 2 items for 3 second(s).",
      "Icy": "Freeze 1 item for 3 second(s).",
      "Turbo": "Haste 2 items for 3 second(s).",
      "Shielded": "Shield 80.",
      "Restorative": "Heal 120.",
      "Toxic": "Poison 8.",
      "Fiery": "Double Burn",
      "Shiny": "+1 Multicast",
      "Deadly": "+50% Crit Chance"
    }
  },
  "IllusoRay": {
    "name": "IllusoRay",
    "icon": "images/items/IllusoRay.avif",
    "tier": "Bronze",
    "tags": [
      "Vanessa",
      "Small",
      "Aquatic",
      "Friend",
      "Slow"
    ],
    "description": [
      "Cooldown 7 seconds",
      "Slow 1 item for ( 1 » 2 » 3 » 4 ) second(s).",
      "For each adjacent Friend, this gains 1 Multicast."
    ],
    "cooldown": 7,
    "enchants": {
      "Heavy": "+2 Slow Targets",
      "Icy": "Freeze 1 item for 1 second(s).",
      "Turbo": "Haste 1 item for 2 second(s).",
      "Shielded": "Shield 35.",
      "Restorative": "Heal 50.",
      "Toxic": "Poison 3.",
      "Fiery": "Burn 5.",
      "Shiny": "+1 Multicast"
    }
  },
  "Improvised Bludgeon": {
    "name": "Improvised Bludgeon",
    "icon": "images/items/ImprovisedBludgeon.avif",
    "tier": "Bronze",
    "tags": [
      "Common",
      "Medium",
      "Damage",
      "Slow",
      "Weapon"
    ],
    "description": [
      "Cooldown 7 seconds",
      "Deal ( 20 » 60 » 120 » 200 ) damage.",
      "Slow 2 items for ( 3 » 4 » 5 » 6 ) second(s).",
      "When you sell this, your leftmost Slow item gains ( +1 » +2 » +3 » +4 ) Slow."
    ],
    "cooldown": 7,
    "enchants": {
      "Heavy": "Double Slow",
      "Icy": "Freeze 1 item for 2 second(s).",
      "Turbo": "Haste 2 items for 2 second(s).",
      "Shielded": "Shield 70.",
      "Restorative": "Heal 105.",
      "Toxic": "Poison 7.",
      "Fiery": "Burn 10.",
      "Shiny": "+1 Multicast",
      "Deadly": "+50% Crit Chance",
      "Obsidian": "Lifesteal"
    }
  },
  "Incendiary Rounds": {
    "name": "Incendiary Rounds",
    "icon": "images/items/IncendiaryRounds.avif",
    "tier": "Diamond",
    "tags": [
      "Vanessa",
      "Small",
      "Ammo",
      "Burn"
    ],
    "description": [
      "When you use an adjacent item, Burn 2.",
      "Adjacent items have +1 ammo."
    ],
    "cooldown": null,
    "enchants": {
      "Heavy": "When you use an adjacent item, slow 1 item for 2 second(s).",
      "Icy": "When you use an adjacent item, freeze 1 item for 1 second(s).",
      "Turbo": "When you use an adjacent item, haste it for 2 second(s).",
      "Shielded": "When you use an adjacent item, shield 10.",
      "Restorative": "When you use an adjacent item, heal 15.",
      "Toxic": "When you use an adjacent item, poison 1.",
      "Fiery": "Double Burn",
      "Shiny": "Double Ammo Max",
      "Deadly": "Adjacent items have +25% Crit Chance."
    }
  },
  "Incense": {
    "name": "Incense",
    "icon": "images/items/Incense.avif",
    "tier": "Silver",
    "tags": [
      "Mak",
      "Small",
      "Heal",
      "Slow"
    ],
    "description": [
      "Cooldown 10 seconds",
      "Slow 1 item for ( 4 » 5 » 6 ) second(s).",
      "When you Slow, Heal ( 16 » 24 » 32 )."
    ],
    "cooldown": 10,
    "enchants": {
      "Heavy": "+1 Slow Targets",
      "Icy": "When you Slow, Freeze 1 item for 1 second(s).",
      "Turbo": "When you Slow, Haste 1 item for 1 second(s).",
      "Shielded": "When you Slow, Shield 10.",
      "Restorative": "Double Heal",
      "Toxic": "When you Slow, Poison 1.",
      "Fiery": "When you Slow, Burn 1.",
      "Shiny": "+1 Multicast",
      "Deadly": "When you Slow, your items gain 5% Crit Chance for the fight."
    }
  },
  "Induction Aegis": {
    "name": "Induction Aegis",
    "icon": "images/items/InductionAegis.avif",
    "tier": "Gold",
    "tags": [
      "Dooley",
      "Small",
      "Burn",
      "Shield",
      "Slow"
    ],
    "description": [
      "Cooldown 4 seconds",
      "Shield ( 40 » 80 ).",
      "Burn ( 4 » 6 ).",
      "Slow your adjacent items for 1 second(s)."
    ],
    "cooldown": 4,
    "enchants": {
      "Heavy": "Slow 1 item for 1 second(s).",
      "Icy": "Freeze 1 item for 1 second(s).",
      "Turbo": "Haste 1 item for 2 second(s).",
      "Shielded": "Double Shield",
      "Restorative": "Heal 45.",
      "Toxic": "Poison 3.",
      "Fiery": "Double Burn",
      "Shiny": "+1 Multicast",
      "Deadly": "+50% Crit Chance"
    }
  },
  "Infernal Greatsword": {
    "name": "Infernal Greatsword",
    "icon": "images/items/InfernalGreatsword.avif",
    "tier": "Legendary",
    "tags": [
      "Common",
      "Large",
      "Burn",
      "Damage",
      "Weapon"
    ],
    "description": [
      "Cooldown 8 seconds",
      "Deal 2 damage.",
      "Burn equal to this item's damage.",
      "This item gains + Damage for the fight equal to your enemy's Burn."
    ],
    "cooldown": 8,
    "enchants": {
      "Heavy": "Slow 3 items for 3 second(s).",
      "Icy": "Freeze 1 item for 4 second(s).",
      "Turbo": "Haste 3 items for 3 second(s).",
      "Shielded": "Shield 120.",
      "Restorative": "Heal 180.",
      "Toxic": "Poison equal to this item's damage.",
      "Fiery": "Double Burn",
      "Shiny": "+1 Multicast",
      "Deadly": "+50% Crit Chance",
      "Obsidian": "Lifesteal"
    }
  },
  "Insect Wing": {
    "name": "Insect Wing",
    "icon": "images/items/InsectWing.avif",
    "tier": "Bronze",
    "tags": [
      "Common",
      "Small",
      "NonWeapon",
      "Passive"
    ],
    "description": [
      "When you sell this, reduce your items' cooldowns by ( 3% » 6% » 9% » 12% )."
    ],
    "cooldown": null,
    "enchants": {}
  },
  "Isochoric Freezer": {
    "name": "Isochoric Freezer",
    "icon": "images/items/IsochoricFreezer.avif",
    "tier": "Silver",
    "tags": [
      "Dooley",
      "Small",
      "Freeze"
    ],
    "description": [
      "Cooldown 7 seconds",
      "Freeze 1 item for ( 1 » 2 » 3 ) second(s)."
    ],
    "cooldown": 7,
    "enchants": {
      "Heavy": "Slow 1 item for 2 second(s).",
      "Icy": "Double Freeze",
      "Turbo": "Haste 1 item for 2 second(s).",
      "Shielded": "Shield 35.",
      "Restorative": "Heal 50.",
      "Toxic": "Poison 3.",
      "Fiery": "Burn 5.",
      "Shiny": "+1 Multicast"
    }
  },
  "Jaballian Drum": {
    "name": "Jaballian Drum",
    "icon": "images/items/JaballianDrum.avif",
    "tier": "Silver",
    "tags": [
      "Pygmalien",
      "Large",
      "Damage",
      "Haste"
    ],
    "description": [
      "When you use a weapon, your weapons gain ( 1 » 2 » 3 ) Damage for the fight.",
      "When you use a Weapon, Haste it for ( 1 » 2 » 3 ) second(s)."
    ],
    "cooldown": null,
    "enchants": {
      "Heavy": "When you use a weapon, slow 1 item for 3 second(s).",
      "Icy": "When you use a weapon, freeze 1 item for 1 second(s).",
      "Turbo": "Double Haste",
      "Shielded": "When you use a weapon, shield 30.",
      "Restorative": "When you use a weapon, heal 45.",
      "Toxic": "When you use a weapon, poison 3.",
      "Fiery": "When you use a weapon, burn 4.",
      "Shiny": "Double Damage",
      "Deadly": "When your enemy uses an item, your items gain +10% Crit Chance for the fight."
    }
  },
  "Jaballian Longbow": {
    "name": "Jaballian Longbow",
    "icon": "images/items/JaballianLongbow.avif",
    "tier": "Bronze",
    "tags": [
      "Pygmalien",
      "Medium",
      "Damage",
      "Health",
      "Weapon"
    ],
    "description": [
      "Cooldown 8 seconds",
      "Multicast 2",
      "Deal ( 20 » 60 » 120 » 200 ) damage.",
      "This has +1 Multicast if you have more health than your enemy."
    ],
    "cooldown": 8,
    "enchants": {
      "Heavy": "Slow 2 items for 1 second(s).",
      "Icy": "Freeze 1 item for 1 second(s).",
      "Turbo": "Haste 2 items for 1 second(s).",
      "Shielded": "Shield 30.",
      "Restorative": "Heal 45.",
      "Toxic": "Poison 3.",
      "Fiery": "Burn 4.",
      "Shiny": "+1 Multicast",
      "Deadly": "+50% Crit Chance",
      "Obsidian": "Lifesteal"
    }
  },
  "Javelin": {
    "name": "Javelin",
    "icon": "images/items/Javelin.avif",
    "tier": "Silver",
    "tags": [
      "Vanessa",
      "Medium",
      "Ammo",
      "Damage",
      "Haste",
      "Weapon"
    ],
    "description": [
      "Cooldown 5 seconds",
      "Ammo Max 2",
      "Deal ( 75 » 150 » 300 ) damage.",
      "When you Haste, Reload this 1 Ammo."
    ],
    "cooldown": 5,
    "enchants": {
      "Heavy": "Slow 2 items for 2 second(s).",
      "Icy": "Freeze 1 item for 2 second(s).",
      "Turbo": "Haste 2 items for 2 second(s).",
      "Shielded": "Shield 60.",
      "Restorative": "Heal 90.",
      "Toxic": "Poison 6.",
      "Fiery": "Burn 9.",
      "Shiny": "+1 Multicast",
      "Deadly": "+50% Crit Chance",
      "Obsidian": "Lifesteal"
    }
  },
  "Jellyfish": {
    "name": "Jellyfish",
    "icon": "images/items/Jellyfish.avif",
    "tier": "Bronze",
    "tags": [
      "Vanessa",
      "Small",
      "Aquatic",
      "Friend",
      "Haste",
      "Poison"
    ],
    "description": [
      "Cooldown 8 seconds",
      "Poison ( 1 » 2 » 3 » 4 ).",
      "When you use another Aquatic item, this gains Haste for ( 1 » 2 » 3 » 4 ) second(s)."
    ],
    "cooldown": 8,
    "enchants": {
      "Heavy": "Slow 1 item for 2 second(s).",
      "Icy": "Freeze 1 item for 1 second(s).",
      "Turbo": "Double Haste",
      "Shielded": "Shield 40.",
      "Restorative": "Heal 60.",
      "Toxic": "Double Poison",
      "Fiery": "Burn 5.",
      "Shiny": "+1 Multicast",
      "Deadly": "+50% Crit Chance"
    }
  },
  "Jewelry": {
    "name": "Jewelry",
    "icon": "images/items/Jewelry.avif",
    "tier": "Bronze",
    "tags": [
      "Pygmalien",
      "Small",
      "Economy",
      "Shield"
    ],
    "description": [
      "Cooldown 3 seconds",
      "Shield equal to ( 1x » 2x » 3x » 4x ) this item's value."
    ],
    "cooldown": 3,
    "enchants": {
      "Golden": "Double Value",
      "Heavy": "Slow 1 item for 1 second(s).",
      "Icy": "Freeze 1 item for 1 second(s).",
      "Turbo": "Haste 1 item for 1 second(s).",
      "Shielded": "Double Shield",
      "Restorative": "Heal equal to triple this item's value.",
      "Toxic": "Poison 2.",
      "Fiery": "Burn 3.",
      "Shiny": "+1 Multicast",
      "Deadly": "+50% Crit Chance"
    }
  },
  "Jitte": {
    "name": "Jitte",
    "icon": "images/items/Jitte.avif",
    "tier": "Silver",
    "tags": [
      "Vanessa",
      "Small",
      "Damage",
      "Slow",
      "Weapon"
    ],
    "description": [
      "Cooldown 5 seconds",
      "Deal 10 damage.",
      "Slow 1 item for ( 1 » 2 » 3 ) second(s).",
      "When you slow, this gains ( 5 » 10 » 20 ) damage for the fight."
    ],
    "cooldown": 5,
    "enchants": {
      "Heavy": "+1 Slow Targets",
      "Icy": "Freeze 1 item for 1 second(s).",
      "Turbo": "Haste 1 item for 1 second(s).",
      "Shielded": "Shield 25.",
      "Restorative": "Heal 40.",
      "Toxic": "Poison 2.",
      "Fiery": "Burn 4.",
      "Shiny": "+1 Multicast",
      "Deadly": "+50% Crit Chance",
      "Obsidian": "Lifesteal"
    }
  },
  "Junkyard Catapult": {
    "name": "Junkyard Catapult",
    "icon": "images/items/JunkyardCatapult.avif",
    "tier": "Silver",
    "tags": [
      "Common",
      "Large",
      "Burn",
      "Damage",
      "Poison",
      "Weapon"
    ],
    "description": [
      "Cooldown 6 seconds",
      "Ammo Max 1",
      "Deal ( 25 » 50 » 75 ) damage.",
      "Burn ( 6 » 8 » 10 ).",
      "Poison ( 4 » 6 » 8 )"
    ],
    "cooldown": 6,
    "enchants": {
      "Heavy": "Slow 3 items for 2 second(s).",
      "Icy": "Freeze 1 item for 3 second(s).",
      "Turbo": "Haste 3 items for 2 second(s).",
      "Shielded": "Shield 90.",
      "Restorative": "Heal 135.",
      "Toxic": "Double Poison",
      "Fiery": "Double Burn",
      "Shiny": "+1 Multicast",
      "Deadly": "+50% Crit Chance",
      "Obsidian": "Lifesteal"
    }
  },
  "Junkyard Club": {
    "name": "Junkyard Club",
    "icon": "images/items/JunkyardClub.avif",
    "tier": "Bronze",
    "tags": [
      "Common",
      "Medium",
      "Active",
      "Damage",
      "Weapon"
    ],
    "description": [
      "Cooldown 10 seconds",
      "Deal ( 20 » 60 » 120 » 200 ) damage.",
      "When you sell this, your weapons gain ( 4 » 6 » 8 » 10 ) damage."
    ],
    "cooldown": 10,
    "enchants": {
      "Heavy": "Slow 2 items for 3 second(s).",
      "Icy": "Freeze 1 item for 3 second(s).",
      "Turbo": "Haste 2 items for 3 second(s).",
      "Shielded": "Shield 100.",
      "Restorative": "Heal 150.",
      "Toxic": "Poison 10.",
      "Fiery": "Burn 15.",
      "Shiny": "+1 Multicast",
      "Deadly": "+50% Crit Chance",
      "Obsidian": "Lifesteal"
    }
  },
  "Junkyard Lance": {
    "name": "Junkyard Lance",
    "icon": "images/items/JunkyardLance.avif",
    "tier": "Bronze",
    "tags": [
      "Common",
      "Large",
      "Damage",
      "Weapon"
    ],
    "description": [
      "Cooldown 10 seconds",
      "Deal ( 15 » 30 » 50 » 100 ) damage for each Small item you have (including Stash)."
    ],
    "cooldown": 10,
    "enchants": {
      "Heavy": "Slow 3 items for 3 second(s).",
      "Icy": "Freeze 1 item for 4 second(s).",
      "Turbo": "Haste 3 items for 3 second(s).",
      "Shielded": "Shield 150.",
      "Restorative": "Heal 225.",
      "Toxic": "Poison 15.",
      "Fiery": "Burn 22.",
      "Shiny": "+1 Multicast",
      "Deadly": "+50% Crit Chance",
      "Obsidian": "Lifesteal"
    }
  },
  "Junkyard Repairbot": {
    "name": "Junkyard Repairbot",
    "icon": "images/items/JunkyardRepairbot.avif",
    "tier": "Bronze",
    "tags": [
      "Common",
      "Medium",
      "Damage",
      "Friend",
      "Heal"
    ],
    "description": [
      "Cooldown 7 seconds",
      "Heal ( 20 » 60 » 120 » 200 ).",
      "When you sell this, give your leftmost Heal item ( +5 » +15 » +30 » +50 ) Heal."
    ],
    "cooldown": 7,
    "enchants": {
      "Heavy": "Slow 2 items for 2 second(s).",
      "Icy": "Freeze 1 item for 2 second(s).",
      "Turbo": "Haste 2 items for 2 second(s).",
      "Shielded": "Shield 70.",
      "Restorative": "Double Heal",
      "Toxic": "Poison 7.",
      "Fiery": "Burn 11.",
      "Shiny": "+1 Multicast",
      "Deadly": "+50% Crit Chance"
    }
  },
  "Katana": {
    "name": "Katana",
    "icon": "images/items/Katana.avif",
    "tier": "Bronze",
    "tags": [
      "Vanessa",
      "Medium",
      "Damage",
      "Weapon"
    ],
    "description": [
      "Cooldown 2 seconds",
      "Deal ( 4 » 12 » 24 » 40 ) damage."
    ],
    "cooldown": 2,
    "enchants": {
      "Heavy": "Slow 2 items for 1 second(s).",
      "Icy": "Freeze 1 item for 1 second(s).",
      "Turbo": "Haste 2 items for 1 second(s).",
      "Shielded": "Shield 20.",
      "Restorative": "Heal 30.",
      "Toxic": "Poison 2.",
      "Fiery": "Burn 3.",
      "Shiny": "+1 Multicast",
      "Deadly": "+50% Crit Chance",
      "Obsidian": "Lifesteal"
    }
  },
  "Kinetic Cannon": {
    "name": "Kinetic Cannon",
    "icon": "images/items/KineticCannon.avif",
    "tier": "Silver",
    "tags": [
      "Dooley",
      "Large",
      "Damage",
      "Weapon"
    ],
    "description": [
      "Cooldown 10 seconds",
      "Deal 100 damage.",
      "When you use a Small item, give this ( 10 » 20 » 40 ) damage for the fight."
    ],
    "cooldown": 10,
    "enchants": {
      "Heavy": "Slow 3 items for 4 second(s).",
      "Icy": "Freeze 1 item for 6 second(s).",
      "Turbo": "Haste 3 items for 4 second(s).",
      "Shielded": "Shield 150.",
      "Restorative": "Heal 225.",
      "Toxic": "Poison 15.",
      "Fiery": "Burn 22.",
      "Shiny": "+1 Multicast",
      "Deadly": "+50% Crit Chance",
      "Obsidian": "Lifesteal"
    }
  },
  "Knee Brace": {
    "name": "Knee Brace",
    "icon": "images/items/KneeBrace.avif",
    "tier": "Bronze",
    "tags": [
      "Common",
      "Small",
      "Health"
    ],
    "description": [
      "If this is on your board at the start of each day, gain ( 100 » 200 » 300 » 400 ) Max Health.",
      "The cooldown of your items are increased by 1 second(s)."
    ],
    "cooldown": null,
    "enchants": {}
  },
  "Knife Set": {
    "name": "Knife Set",
    "icon": "images/items/KnifeSet.avif",
    "tier": "Bronze",
    "tags": [
      "Jules",
      "Medium",
      "Damage",
      "Tool",
      "Weapon"
    ],
    "description": [
      "Cooldown 6 seconds",
      "Deal ( 5 » 15 » 30 » 50 ) damage.",
      "When you use a weapon, deal ( 5 » 15 » 30 » 50 ) damage."
    ],
    "cooldown": 6,
    "enchants": {
      "Heavy": "Slow 2 items for 2 second(s).",
      "Icy": "Freeze 1 item for 2 second(s).",
      "Turbo": "Haste 2 items for 2 second(s).",
      "Shielded": "Shield 50.",
      "Restorative": "Heal 75.",
      "Toxic": "Poison 5.",
      "Fiery": "Burn 7.",
      "Shiny": "+1 Multicast",
      "Deadly": "+50% Crit Chance",
      "Obsidian": "Lifesteal"
    }
  },
  "Kukri": {
    "name": "Kukri",
    "icon": "images/items/Kukri.avif",
    "tier": "Silver",
    "tags": [
      "Pygmalien",
      "Small",
      "Damage",
      "Heal",
      "Weapon"
    ],
    "description": [
      "Cooldown 8 seconds",
      "Deal 10 damage.",
      "When you heal, this gains ( 10 » 20 » 30 ) damage for the fight."
    ],
    "cooldown": 8,
    "enchants": {
      "Heavy": "Slow 1 item for 2 second(s).",
      "Icy": "Freeze 1 item for 1 second(s).",
      "Turbo": "Haste 1 item for 2 second(s).",
      "Shielded": "Shield 40.",
      "Restorative": "Heal 60.",
      "Toxic": "Poison 4.",
      "Fiery": "Burn 6.",
      "Shiny": "+1 Multicast",
      "Deadly": "+50% Crit Chance",
      "Obsidian": "Lifesteal"
    }
  },
  "Landscraper": {
    "name": "Landscraper",
    "icon": "images/items/Landscraper.avif",
    "tier": "Silver",
    "tags": [
      "Pygmalien",
      "Large",
      "Property",
      "Shield"
    ],
    "description": [
      "When you use an item, Shield equal to ( 1x » 2x » 3x ) this item's value.",
      "At the start of each hour, this gains ( 1 » 1 » 2 ) value."
    ],
    "cooldown": null,
    "enchants": {
      "Heavy": "When you use an item, Slow 1 item for 3 second(s).",
      "Icy": "When you use an item, Freeze 1 item for 1 second(s).",
      "Turbo": "When you use an item, Haste 1 item for 3 second(s).",
      "Shielded": "Double Shield",
      "Restorative": "When you use an item, Heal 45.",
      "Toxic": "When you use an item, Poison 3.",
      "Fiery": "When you use an item, Burn 4.",
      "Shiny": "+1 Multicast",
      "Deadly": "+50% Crit Chance"
    }
  },
  "Langxian": {
    "name": "Langxian",
    "icon": "images/items/Langxian.avif",
    "tier": "Bronze",
    "tags": [
      "Vanessa",
      "Medium",
      "Damage",
      "Weapon"
    ],
    "description": [
      "Cooldown 10 seconds",
      "Deal 25 damage.",
      "When you win a fight with Langxian, this gains ( 25 » 50 » 75 » 100 ) damage."
    ],
    "cooldown": 10,
    "enchants": {
      "Heavy": "Slow 2 items for 3 second(s).",
      "Icy": "Freeze 1 item for 3 second(s).",
      "Turbo": "Haste 2 items for 3 second(s).",
      "Shielded": "Shield 100.",
      "Restorative": "Heal 150.",
      "Toxic": "Poison 10.",
      "Fiery": "Burn 15.",
      "Shiny": "+1 Multicast",
      "Deadly": "+50% Crit Chance",
      "Obsidian": "Lifesteal"
    }
  },
  "Laser Pistol": {
    "name": "Laser Pistol",
    "icon": "images/items/LaserPistol.avif",
    "tier": "Bronze",
    "tags": [
      "Dooley",
      "Small",
      "Damage",
      "Weapon"
    ],
    "description": [
      "Cooldown 5 seconds",
      "Deal ( 10 » 30 » 60 » 100 ) damage."
    ],
    "cooldown": 5,
    "enchants": {
      "Heavy": "Slow 1 item for 1 second(s).",
      "Icy": "Freeze 1 item for 1 second(s).",
      "Turbo": "Haste 1 item for 1 second(s).",
      "Shielded": "Shield 25.",
      "Restorative": "Heal 40.",
      "Toxic": "Poison 2.",
      "Fiery": "Burn 4.",
      "Shiny": "+1 Multicast",
      "Deadly": "+50% Crit Chance",
      "Obsidian": "Lifesteal"
    }
  },
  "Laser Security System": {
    "name": "Laser Security System",
    "icon": "images/items/LaserSecuritySystem.avif",
    "tier": "Bronze",
    "tags": [
      "Pygmalien",
      "Small",
      "Damage",
      "Weapon"
    ],
    "description": [
      "Cooldown 8 seconds",
      "Deal 10 damage.",
      "When any Property is used, this gains ( 10 » 20 » 30 » 50 ) damage for the fight."
    ],
    "cooldown": 8,
    "enchants": {
      "Heavy": "Slow 1 item for 2 second(s).",
      "Icy": "Freeze 1 item for 1 second(s).",
      "Turbo": "Haste 1 item for 2 second(s).",
      "Shielded": "Shield 40.",
      "Restorative": "Heal 60.",
      "Toxic": "Poison 4.",
      "Fiery": "Burn 6.",
      "Shiny": "+1 Multicast",
      "Deadly": "+50% Crit Chance",
      "Obsidian": "Lifesteal"
    }
  },
  "Leeches": {
    "name": "Leeches",
    "icon": "images/items/Leeches.avif",
    "tier": "Silver",
    "tags": [
      "Mak",
      "Medium",
      "Damage",
      "Friend",
      "Poison",
      "Weapon"
    ],
    "description": [
      "Cooldown 6 seconds",
      "Lifesteal 100",
      "Deal 10 Damage.",
      "When you poison, this gains ( 5 » 10 » 15 ) damage for the fight."
    ],
    "cooldown": 6,
    "enchants": {
      "Heavy": "Slow 2 items for 2 second(s).",
      "Icy": "Freeze 1 item for 2 second(s).",
      "Turbo": "Haste 2 items for 2 second(s).",
      "Shielded": "Shield 60.",
      "Restorative": "Heal 90.",
      "Toxic": "Poison 6.",
      "Fiery": "Burn 9.",
      "Shiny": "+1 Multicast",
      "Deadly": "+50% Crit Chance"
    }
  },
  "Lemonade Stand": {
    "name": "Lemonade Stand",
    "icon": "images/items/LemonadeStand.avif",
    "tier": "Silver",
    "tags": [
      "Pygmalien",
      "Large",
      "Heal",
      "Health",
      "Property"
    ],
    "description": [
      "Cooldown 5 seconds",
      "Heal equal to ( 5% » 10% » 15% ) of your Max Health.",
      "When you sell a Small item, gain ( 10 » 20 » 40 ) Max Health."
    ],
    "cooldown": 5,
    "enchants": {
      "Golden": "Your small items have +1 value",
      "Heavy": "Slow 3 items for 2 second(s).",
      "Icy": "Freeze 1 item for 3 second(s).",
      "Turbo": "Haste 3 items for 2 second(s).",
      "Shielded": "Shield equal to 10% of your Max Health.",
      "Restorative": "Double Heal",
      "Toxic": "Poison 9.",
      "Fiery": "Burn 13.",
      "Shiny": "+1 Multicast",
      "Deadly": "+50% Crit Chance"
    }
  },
  "Lens": {
    "name": "Lens",
    "icon": "images/items/Lens.avif",
    "tier": "Gold",
    "tags": [
      "Dooley",
      "Small",
      "Charge",
      "Damage",
      "Haste"
    ],
    "description": [
      "Cooldown 6 seconds",
      "Give the core ( +5 » +10 ) damage for the fight.",
      "When this gains haste, charge it ( 1 » 2 ) second(s)."
    ],
    "cooldown": 6,
    "enchants": {
      "Heavy": "Slow 1 item for 2 second(s).",
      "Icy": "Freeze 1 item for 1 second(s).",
      "Turbo": "Haste 1 item for 2 second(s).",
      "Shielded": "Shield 30.",
      "Restorative": "Heal 45.",
      "Toxic": "Poison 3.",
      "Fiery": "Burn 4.",
      "Shiny": "+1 Multicast"
    }
  },
  "Life Preserver": {
    "name": "Life Preserver",
    "icon": "images/items/LifePreserver.avif",
    "tier": "Bronze",
    "tags": [
      "Vanessa",
      "Medium",
      "Aquatic",
      "Heal",
      "Shield"
    ],
    "description": [
      "Cooldown 6 seconds",
      "Shield ( 10 » 30 » 60 » 100 ).",
      "The first time you would die each fight, Heal ( 200 » 600 » 1200 » 2000 )."
    ],
    "cooldown": 6,
    "enchants": {
      "Heavy": "Slow 2 items for 2 second(s).",
      "Icy": "Freeze 1 item for 2 second(s).",
      "Turbo": "Haste 2 items for 2 second(s).",
      "Shielded": "Double Shield",
      "Restorative": "Double Heal",
      "Toxic": "Poison 4.",
      "Fiery": "Burn 6.",
      "Shiny": "+1 Multicast",
      "Deadly": "+50% Crit Chance"
    }
  },
  "Lifting Gloves": {
    "name": "Lifting Gloves",
    "icon": "images/items/LiftingGloves.avif",
    "tier": "Bronze",
    "tags": [
      "Common",
      "Small",
      "Damage",
      "Tool"
    ],
    "description": [
      "Cooldown 4 seconds",
      "Your weapons gain ( 1 » 2 » 3 » 4 ) damage for the fight.",
      "When you sell this, your weapons gain ( 3 » 6 » 9 » 12 ) damage."
    ],
    "cooldown": 4,
    "enchants": {
      "Heavy": "Slow 1 item for 1 second(s).",
      "Icy": "Freeze 1 item for 1 second(s).",
      "Turbo": "Haste 1 item for 1 second(s).",
      "Shielded": "Shield 20.",
      "Restorative": "Heal 30.",
      "Toxic": "Poison 2.",
      "Fiery": "Burn 3.",
      "Shiny": "+1 Multicast"
    }
  },
  "Lightbulb": {
    "name": "Lightbulb",
    "icon": "images/items/Lightbulb.avif",
    "tier": "Bronze",
    "tags": [
      "Dooley",
      "Small",
      "Crit"
    ],
    "description": [
      "Cooldown 3 seconds",
      "Adjacent items gain ( 2% » 4% » 6% » 8% ) Crit chance for the fight."
    ],
    "cooldown": 3,
    "enchants": {
      "Heavy": "Slow 1 item for 1 second(s).",
      "Icy": "Freeze 1 item for 1 second(s).",
      "Turbo": "Haste 1 item for 1 second(s).",
      "Shielded": "Shield 15.",
      "Restorative": "Heal 20.",
      "Toxic": "Poison 1.",
      "Fiery": "Burn 2.",
      "Shiny": "+1 Multicast",
      "Deadly": "Double Crit Chance"
    }
  },
  "Lighter": {
    "name": "Lighter",
    "icon": "images/items/Lighter.avif",
    "tier": "Bronze",
    "tags": [
      "Vanessa",
      "Small",
      "Burn",
      "Tool"
    ],
    "description": [
      "Cooldown 3 seconds",
      "Burn ( 1 » 2 » 3 » 5 )."
    ],
    "cooldown": 3,
    "enchants": {
      "Heavy": "Slow 1 item for 1 second(s).",
      "Icy": "Freeze 1 item for 1 second(s).",
      "Turbo": "Haste 1 item for 1 second(s).",
      "Shielded": "Shield 15.",
      "Restorative": "Heal 20.",
      "Toxic": "Poison 1.",
      "Fiery": "Double Burn",
      "Shiny": "+1 Multicast",
      "Deadly": "+50% Crit Chance"
    }
  },
  "Lighthouse": {
    "name": "Lighthouse",
    "icon": "images/items/Lighthouse.avif",
    "tier": "Gold",
    "tags": [
      "Vanessa",
      "Large",
      "Aquatic",
      "Burn",
      "Property",
      "Slow"
    ],
    "description": [
      "When you Slow, Burn ( 3 » 5 )."
    ],
    "cooldown": null,
    "enchants": {
      "Heavy": "At the start of each fight, Slow 2 enemy items for 4 second(s).",
      "Icy": "When you slow, freeze 1 item for 1 second(s).",
      "Turbo": "When you slow, haste 1 item for 1 second(s).",
      "Shielded": "When you slow, shield 30.",
      "Restorative": "When you slow, heal 45.",
      "Toxic": "When you slow, poison 3.",
      "Fiery": "Double Burn",
      "Shiny": "+1 Multicast",
      "Deadly": "When you Slow, your items gain 10% Crit Chance for the fight."
    }
  },
  "Lightning Rod": {
    "name": "Lightning Rod",
    "icon": "images/items/LightningRod.avif",
    "tier": "Gold",
    "tags": [
      "Stelle",
      "Large",
      "Damage",
      "Shield",
      "Weapon"
    ],
    "description": [
      "Cooldown 10 seconds",
      "Deal ( 10 » 20 ) damage.",
      "Shield ( 10 » 20 ).",
      "When any player uses an item, this gains ( 10 » 20 ) damage and ( 10 » 20 ) shield for the fight."
    ],
    "cooldown": 10,
    "enchants": {
      "Heavy": "Slow 3 items for 3 second(s).",
      "Icy": "Freeze 1 item for 4 second(s).",
      "Turbo": "Haste 3 items for 3 second(s).",
      "Shielded": "Double Shield",
      "Restorative": "Heal 225.",
      "Toxic": "Poison 15.",
      "Fiery": "Burn 22.",
      "Shiny": "+1 Multicast",
      "Deadly": "+50% Crit Chance",
      "Obsidian": "Lifesteal"
    }
  },
  "Lion Cane": {
    "name": "Lion Cane",
    "icon": "images/items/LionCane.avif",
    "tier": "Gold",
    "tags": [
      "Pygmalien",
      "Medium",
      "Damage",
      "Health",
      "Weapon"
    ],
    "description": [
      "Cooldown 6 seconds",
      "Deal damage equal to ( 10% » 20% ) of your Max Health.",
      "When you Level Up, gain ( 100 » 200 ) Max Health."
    ],
    "cooldown": 6,
    "enchants": {
      "Heavy": "Slow 2 items for 4 second(s).",
      "Icy": "Freeze 1 item for 4 second(s).",
      "Turbo": "Haste 2 items for 4 second(s).",
      "Shielded": "Shield 120.",
      "Restorative": "Heal 180.",
      "Toxic": "Poison 12.",
      "Fiery": "Burn 18.",
      "Shiny": "+1 Multicast",
      "Deadly": "+50% Crit Chance",
      "Obsidian": "Lifesteal"
    }
  },
  "Lockbox": {
    "name": "Lockbox",
    "icon": "images/items/Lockbox.avif",
    "tier": "Silver",
    "tags": [
      "Vanessa",
      "Medium",
      "Damage",
      "Economy",
      "Value"
    ],
    "description": [
      "When you win a fight, this gains ( 1 » 2 » 3 ) value.",
      "Your weapons have + damage equal to this item's value. ( [4] » [8] » [16] )"
    ],
    "cooldown": null,
    "enchants": {
      "Golden": "Double Value",
      "Heavy": "At the start of each fight, Slow 3 items for 4 second(s).",
      "Icy": "At the start of each fight, Freeze 2 item for 4 second(s).",
      "Turbo": "At the start of each fight, Haste 3 items for 4 second(s).",
      "Shielded": "Your Shield items have + Shield equal to this item's value.",
      "Restorative": "You have +Regeneration equal to this item's value.",
      "Toxic": "At the start of each fight, poison 12.",
      "Fiery": "At the start of each fight, burn 16.",
      "Shiny": "Double Value",
      "Deadly": "Your weapons have + Crit Chance % equal to this item's value."
    }
  },
  "Loupe": {
    "name": "Loupe",
    "icon": "images/items/Loupe.avif",
    "tier": "Gold",
    "tags": [
      "Pygmalien",
      "Small",
      "Tool",
      "Value"
    ],
    "description": [
      "Your Small items have ( +1 » +2 ) sell value."
    ],
    "cooldown": null,
    "enchants": {
      "Golden": "Your small items have +1 value"
    }
  },
  "Lumboars": {
    "name": "Lumboars",
    "icon": "images/items/Lumboars.avif",
    "tier": "Silver",
    "tags": [
      "Pygmalien",
      "Medium",
      "Damage",
      "Weapon"
    ],
    "description": [
      "Cooldown 8 seconds",
      "Multicast 2",
      "Deal ( 10 » 20 » 30 ) damage.",
      "Your weapons gain ( 3 » 6 » 10 ) damage for the fight."
    ],
    "cooldown": 8,
    "enchants": {
      "Heavy": "Slow 2 items for 3 second(s).",
      "Icy": "Freeze 1 item for 3 second(s).",
      "Turbo": "Haste 2 items for 3 second(s).",
      "Shielded": "Your Shield items gain +3 Shield for the fight.",
      "Restorative": "Your Heal items gain +4 Heal for the fight.",
      "Toxic": "Your Poison items gain +1 Poison for the fight.",
      "Fiery": "Your Burn items gain +1 Burn for the fight.",
      "Shiny": "+1 Multicast",
      "Deadly": "+50% Crit Chance",
      "Obsidian": "Lifesteal"
    }
  },
  "Luxury Tents": {
    "name": "Luxury Tents",
    "icon": "images/items/LuxuryTents.avif",
    "tier": "Gold",
    "tags": [
      "Pygmalien",
      "Large",
      "Heal",
      "Health",
      "Property"
    ],
    "description": [
      "The first time you would die each fight, Heal for ( 25% » 50% ) of your Max Health.",
      "Your Heal items have +1 Multicast."
    ],
    "cooldown": null,
    "enchants": {
      "Heavy": "The first time you would die each fight, slow all your opponent's items for 6 second(s).",
      "Icy": "The first time you would die each fight, freeze all enemy items for 3 second(s).",
      "Turbo": "The first time you would die each fight, haste all your items for 6 second(s).",
      "Shielded": "The first time you would die each fight, shield equal to 25% of your max health.",
      "Restorative": "The first time you would die each fight, cleanse all Burn and Poison and gain 20 Regeneration for the fight.",
      "Toxic": "The first time you would die each fight, poison equal to 2% of your max health.",
      "Fiery": "The first time you would die each fight, burn equal to 2% of your max health.",
      "Shiny": "+1 Multicast",
      "Deadly": "+50% Crit Chance"
    }
  },
  "Magic Carpet": {
    "name": "Magic Carpet",
    "icon": "images/items/MagicCarpet.avif",
    "tier": "Bronze",
    "tags": [
      "Mak",
      "Medium",
      "Crit",
      "Damage",
      "Weapon"
    ],
    "description": [
      "Cooldown 4 seconds",
      "Crit Chance ( 10% » 20% » 35% » 50% )",
      "Deal ( 4 » 12 » 24 » 40 ).",
      "When you Crit, this gains ( 4 » 12 » 24 » 40 ) damage for the fight."
    ],
    "cooldown": 4,
    "enchants": {
      "Heavy": "Slow 2 items for 1 second(s).",
      "Icy": "Freeze 1 item for 1 second(s).",
      "Turbo": "Haste 2 items for 1 second(s).",
      "Shielded": "Shield 40.",
      "Restorative": "Heal 60.",
      "Toxic": "Poison 4.",
      "Fiery": "Burn 6.",
      "Shiny": "+1 Multicast",
      "Deadly": "+50% Crit Chance",
      "Obsidian": "Lifesteal"
    }
  },
  "Magician's Top Hat": {
    "name": "Magician's Top Hat",
    "icon": "images/items/MagiciansTopHat.avif",
    "tier": "Diamond",
    "tags": [
      "Common",
      "Medium",
      "NonWeapon",
      "Passive"
    ],
    "description": [
      "When you sell this, upgrade your leftmost item."
    ],
    "cooldown": null,
    "enchants": {
      "Deadly": "+50% Crit Chance"
    }
  },
  "Magma Core": {
    "name": "Magma Core",
    "icon": "images/items/MagmaCore.avif",
    "tier": "Bronze",
    "tags": [
      "Common",
      "Small",
      "Burn"
    ],
    "description": [
      "At the start of each fight, Burn ( 6 » 9 » 12 » 15 )."
    ],
    "cooldown": null,
    "enchants": {
      "Heavy": "At the start of each fight, slow 2 item for 4 second(s).",
      "Icy": "At the start of each fight, Freeze 2 items for 2 second(s).",
      "Turbo": "At the start of each fight, haste 2 item for 4 second(s).",
      "Shielded": "At the start of each fight, shield 60%.",
      "Restorative": "At the start of each fight, gain 6 Regeneration for the fight.",
      "Toxic": "At the start of each fight, poison 6",
      "Fiery": "Double Burn"
    }
  },
  "Magnifying Glass": {
    "name": "Magnifying Glass",
    "icon": "images/items/MagnifyingGlass.avif",
    "tier": "Bronze",
    "tags": [
      "Common",
      "Small",
      "Active",
      "Damage",
      "Tool",
      "Weapon"
    ],
    "description": [
      "Cooldown 5 seconds",
      "Deal ( 5 » 15 » 30 » 50 ) damage.",
      "When you sell this, give your leftmost weapon ( +5 » +15 » +30 » +50 ) damage."
    ],
    "cooldown": 5,
    "enchants": {
      "Heavy": "Slow 1 item for 1 second(s).",
      "Icy": "Freeze 1 item for 1 second(s).",
      "Turbo": "Haste 1 item for 1 second(s).",
      "Shielded": "Shield 25.",
      "Restorative": "Heal 40.",
      "Toxic": "Poison 2.",
      "Fiery": "Burn 4.",
      "Shiny": "+1 Multicast",
      "Deadly": "+50% Crit Chance",
      "Obsidian": "Lifesteal"
    }
  },
  "Makeshift Barricade": {
    "name": "Makeshift Barricade",
    "icon": "images/items/MakeshiftBarricade.avif",
    "tier": "Bronze",
    "tags": [
      "Common",
      "Medium",
      "Slow"
    ],
    "description": [
      "Cooldown 6 seconds",
      "Slow 1 items for ( 1 » 2 » 3 » 4 ) second(s).",
      "When you sell this, your leftmost Slow item gains ( 1 » 2 » 3 » 4 ) second to Slow."
    ],
    "cooldown": 6,
    "enchants": {
      "Heavy": "+1 Slow Targets",
      "Icy": "Freeze 1 item for 2 second(s).",
      "Turbo": "Haste 2 item for 2 second(s).",
      "Shielded": "Shield 60.",
      "Restorative": "Heal 90.",
      "Toxic": "Poison 6.",
      "Fiery": "Burn 9.",
      "Shiny": "+1 Multicast"
    }
  },
  "Marble Scalemail": {
    "name": "Marble Scalemail",
    "icon": "images/items/MarbleScalemail.avif",
    "tier": "Bronze",
    "tags": [
      "Common",
      "Medium",
      "Shield"
    ],
    "description": [
      "Cooldown 8 seconds",
      "Shield ( 20 » 60 » 120 » 200 ).",
      "When you sell this, your Shield items gain ( 3 » 6 » 9 » 12 ) Shield."
    ],
    "cooldown": 8,
    "enchants": {
      "Heavy": "Slow 2 items for 3 second(s).",
      "Icy": "Freeze 1 item for 3 second(s).",
      "Turbo": "Haste 2 items for 3 second(s).",
      "Shielded": "Double Shield",
      "Restorative": "Heal 120.",
      "Toxic": "Poison 8.",
      "Fiery": "Burn 12.",
      "Shiny": "+1 Multicast",
      "Deadly": "+50% Crit Chance"
    }
  },
  "Marbles": {
    "name": "Marbles",
    "icon": "images/items/Marbles.avif",
    "tier": "Bronze",
    "tags": [
      "Pygmalien",
      "Small",
      "Slow"
    ],
    "description": [
      "When you use an adjacent Small item, slow ( 1 » 2 » 3 » 4 ) item for ( 1 » 2 » 3 » 4 ) second(s)."
    ],
    "cooldown": null,
    "enchants": {
      "Heavy": "Double Slow",
      "Icy": "When you use an adjacent small item, freeze 1 item for 1 second(s).",
      "Turbo": "When you use an adjacent small item, haste 1 item for 2 second(s).",
      "Shielded": "When you use an adjacent small item, shield 15.",
      "Restorative": "When you use an adjacent small item, heal 20.",
      "Toxic": "When you use an adjacent small item, poison 1.",
      "Fiery": "When you use an adjacent small item, burn 2.",
      "Shiny": "+1 Slow Targets",
      "Deadly": "When you use an adjacent Small item, your Small items gain +6% Crit Chance for the fight."
    }
  },
  "Masterpiece": {
    "name": "Masterpiece",
    "icon": "images/items/Masterpiece.avif",
    "tier": "Silver",
    "tags": [
      "Pygmalien",
      "Medium",
      "Value"
    ],
    "description": [
      "At the start of each hour, this gains ( 1 » 2 » 3 ) value."
    ],
    "cooldown": null,
    "enchants": {
      "Golden": "This has double value.",
      "Shiny": "This has +2 value gain."
    }
  },
  "Matchbox": {
    "name": "Matchbox",
    "icon": "images/items/Matchbox.avif",
    "tier": "Silver",
    "tags": [
      "Pygmalien",
      "Small",
      "Burn"
    ],
    "description": [
      "When you use a non-weapon item, Burn ( 1 » 2 » 4 )."
    ],
    "cooldown": null,
    "enchants": {
      "Heavy": "When you use a non-weapon item, slow 1 item for 1 second(s).",
      "Icy": "When you use a non-weapon item, freeze 1 item for 1 second(s).",
      "Turbo": "When you use a non-weapon item, haste 1 item for 1 second(s).",
      "Shielded": "When you use a non-weapon item, shield 10.",
      "Restorative": "When you use a non-weapon item, heal 15.",
      "Toxic": "When you use a non-weapon item, poison 1.",
      "Fiery": "Double Burn",
      "Shiny": "Double Burn",
      "Deadly": "When you use a non-weapon item, your items gain +3% Crit Chance for the fight."
    }
  },
  "Mech-Moles": {
    "name": "Mech-Moles",
    "icon": "images/items/MechMoles.avif",
    "tier": "Silver",
    "tags": [
      "Dooley",
      "Medium",
      "Damage",
      "Friend",
      "Haste",
      "Weapon"
    ],
    "description": [
      "Cooldown 6 seconds",
      "Deal ( 25 » 50 » 100 ) damage.",
      "When this gains Haste, your weapons gain ( 2 » 3 » 4 ) damage the fight.",
      "When this gains Haste, your Shield items gain ( 2 » 3 » 4 ) shield the fight."
    ],
    "cooldown": 6,
    "enchants": {
      "Heavy": "Slow 2 items for 2 second(s).",
      "Icy": "Freeze 1 item for 2 second(s).",
      "Turbo": "Haste 2 items for 2 second(s).",
      "Shielded": "Double Shield",
      "Restorative": "When this gains Haste, your Heal items gain 5 Heal for the fight.",
      "Toxic": "When this gains Haste, your Poison items gain 1 Poison for the fight.",
      "Fiery": "When this gains Haste, your Burn items gain 1 Burn for the fight.",
      "Shiny": "+1 Multicast",
      "Deadly": "+50% Crit Chance",
      "Obsidian": "Lifesteal"
    }
  },
  "Medkit": {
    "name": "Medkit",
    "icon": "images/items/Medkit.avif",
    "tier": "Bronze",
    "tags": [
      "Common",
      "Small",
      "Damage"
    ],
    "description": [
      "When you sell this, your leftmost Heal item gains ( 5 » 10 » 15 » 20 ) Heal."
    ],
    "cooldown": null,
    "enchants": {}
  },
  "Memory Card": {
    "name": "Memory Card",
    "icon": "images/items/MemoryCard.avif",
    "tier": "Bronze",
    "tags": [
      "Dooley",
      "Small",
      "Damage",
      "Value"
    ],
    "description": [
      "Cooldown 12 seconds",
      "This gains 1 Value.",
      "When you sell this, give The Core + Damage equal to ( 1x » 2x » 3x » 4x ) this item's value. ( 1 » 4 » 12 » 32 )"
    ],
    "cooldown": 12,
    "enchants": {
      "Golden": "Double Value",
      "Heavy": "Slow 1 item for 4 second(s).",
      "Icy": "Freeze 1 item for 2 second(s).",
      "Turbo": "Haste 1 item for 4 second(s).",
      "Shielded": "Shield 60.",
      "Restorative": "Heal 90.",
      "Toxic": "Poison 6.",
      "Fiery": "Burn 9.",
      "Shiny": "+1 Multicast",
      "Deadly": "When you sell this, the Core gains Crit Chance equal to this item's value. 1"
    }
  },
  "Metronome": {
    "name": "Metronome",
    "icon": "images/items/Metronome.avif",
    "tier": "Silver",
    "tags": [
      "Dooley",
      "Small",
      "Haste"
    ],
    "description": [
      "When you use an adjacent item, give the other adjacent item haste for ( 1 » 2 » 3 ) second(s)."
    ],
    "cooldown": null,
    "enchants": {
      "Heavy": "When you use an adjacent item, Slow 1 item for 1 second(s).",
      "Icy": "When you use an adjacent item, Freeze 1 item for 1 second(s).",
      "Turbo": "Double Haste",
      "Shielded": "When you use an adjacent item, Shield 10.",
      "Restorative": "When you use an adjacent item, Heal 15.",
      "Toxic": "When you use an adjacent item, Poison 1.",
      "Fiery": "When you use an adjacent item, Poison 1.",
      "Shiny": "Double Haste",
      "Deadly": "When you use an adjacent item, the other adjacent item gains 25% Crit Chance."
    }
  },
  "Micro Dave": {
    "name": "Micro Dave",
    "icon": "images/items/MicroDave.avif",
    "tier": "Bronze",
    "tags": [
      "Dooley",
      "Medium",
      "Burn",
      "Charge",
      "Friend"
    ],
    "description": [
      "Cooldown 6 seconds",
      "Burn ( 3 » 6 » 9 » 12 ).",
      "When you use a small item, charge this 1 second(s)."
    ],
    "cooldown": 6,
    "enchants": {
      "Heavy": "Slow 1 item for 2 second(s).",
      "Icy": "Freeze 1 item for 1 second(s).",
      "Turbo": "Haste 1 item for 2 second(s).",
      "Shielded": "Shield 60.",
      "Restorative": "Heal 90.",
      "Toxic": "Poison 6.",
      "Fiery": "Double Burn",
      "Shiny": "+1 Multicast",
      "Deadly": "+50% Crit Chance"
    }
  },
  "Miss Isles": {
    "name": "Miss Isles",
    "icon": "images/items/MissIsles.avif",
    "tier": "Silver",
    "tags": [
      "Dooley",
      "Medium",
      "Ammo",
      "Damage",
      "Friend",
      "Weapon"
    ],
    "description": [
      "Cooldown 3 seconds",
      "Ammo Max 3",
      "Multicast 2",
      "Deal ( 10 » 20 » 40 ) damage.",
      "When you use the Core, reload this."
    ],
    "cooldown": 3,
    "enchants": {
      "Heavy": "Slow 2 items for 1 second(s).",
      "Icy": "Freeze 1 item for 1 second(s).",
      "Turbo": "Haste 2 items for 1 second(s).",
      "Shielded": "Shield 20.",
      "Restorative": "Heal 30.",
      "Toxic": "Poison 2.",
      "Fiery": "Burn 3.",
      "Shiny": "+1 Multicast",
      "Deadly": "When you Haste, your items gain +6% Crit Chance for the fight.",
      "Obsidian": "Lifesteal"
    }
  },
  "Model Ship": {
    "name": "Model Ship",
    "icon": "images/items/ModelShip.avif",
    "tier": "Bronze",
    "tags": [
      "Pygmalien",
      "Medium",
      "Shield"
    ],
    "description": [
      "When you use an adjacent item, Shield ( 10 » 20 » 40 » 80 )."
    ],
    "cooldown": null,
    "enchants": {
      "Heavy": "When you use an adjacent item, slow 1 item for 2 second(s).",
      "Icy": "When you use an adjacent item, freeze 1 item for 1 second(s).",
      "Turbo": "When you use an adjacent item, haste 1 item for 2 second(s).",
      "Shielded": "Double Shield",
      "Restorative": "When you use an adjacent item, heal 30.",
      "Toxic": "When you use an adjacent item, poison 3.",
      "Fiery": "When you use an adjacent item, burn 4.",
      "Shiny": "+1 Multicast",
      "Deadly": "When you use an adjacent item, it gains 20% Crit Chance for the fight."
    }
  },
  "Momma-Saur": {
    "name": "Momma-Saur",
    "icon": "images/items/MommaSaur.avif",
    "tier": "Gold",
    "tags": [
      "Dooley",
      "Large",
      "Damage",
      "Friend",
      "Weapon"
    ],
    "description": [
      "Cooldown 8 seconds",
      "Deal 120 damage.",
      "If your enemy has at least ( 5 » 4 ) items, destroy a small or medium enemy item for the fight.",
      "When you destroy an item during combat, your Dinosaurs permanently gain ( 40 » 80 ) damage."
    ],
    "cooldown": 8,
    "enchants": {
      "Heavy": "Slow 3 items for 3 second(s).",
      "Icy": "Freeze 1 item for 4 second(s).",
      "Turbo": "Haste 3 items for 3 second(s).",
      "Shielded": "Shield 120.",
      "Restorative": "Heal 180.",
      "Toxic": "Poison 12.",
      "Fiery": "Burn 18.",
      "Shiny": "+1 Multicast",
      "Deadly": "+50% Crit Chance",
      "Obsidian": "Lifesteal"
    }
  },
  "Money Tree": {
    "name": "Money Tree",
    "icon": "images/items/MoneyTree.avif",
    "tier": "Bronze",
    "tags": [
      "Pygmalien",
      "Large",
      "Economy",
      "Heal",
      "Property"
    ],
    "description": [
      "Cooldown 5 seconds",
      "Heal 10.",
      "When you Level Up, get a Spare Change.",
      "When you sell a Spare Change, this gains ( 10 » 20 » 30 » 40 ) Heal."
    ],
    "cooldown": 5,
    "enchants": {
      "Golden": "Your spare change have +1 value.",
      "Heavy": "Slow 3 items for 2 second(s).",
      "Icy": "Freeze 1 item for 3 second(s).",
      "Turbo": "Haste 3 items for 2 second(s).",
      "Shielded": "Shield equal to this item's Heal.",
      "Restorative": "Double Heal",
      "Toxic": "Poison 7.",
      "Fiery": "Burn 11.",
      "Shiny": "+1 Multicast",
      "Deadly": "+50% Crit Chance"
    }
  },
  "Monitor Lizard": {
    "name": "Monitor Lizard",
    "icon": "images/items/MonitorLizard.avif",
    "tier": "Bronze",
    "tags": [
      "Dooley",
      "Medium",
      "Friend",
      "Haste",
      "Poison"
    ],
    "description": [
      "Cooldown 6 seconds",
      "Haste 1 item for ( 1 » 2 » 3 » 4 ) second(s).",
      "When you Haste, Poison ( 1 » 2 » 3 » 5 )."
    ],
    "cooldown": 6,
    "enchants": {
      "Heavy": "When you Haste, Slow 1 items for 2 second(s).",
      "Icy": "When you Haste, Freeze 1 item for 1 second(s).",
      "Turbo": "+1 Haste Targets",
      "Shielded": "When you Haste, Shield 15.",
      "Restorative": "When you Haste, Heal 20.",
      "Toxic": "Double Poison",
      "Fiery": "When you Haste, Burn 2.",
      "Shiny": "+1 Multicast"
    }
  },
  "Monocle": {
    "name": "Monocle",
    "icon": "images/items/Monocle.avif",
    "tier": "Silver",
    "tags": [
      "Pygmalien",
      "Small",
      "Economy",
      "Shield",
      "Tool"
    ],
    "description": [
      "Cooldown 6 seconds",
      "Shield equal to ( 1x » 2x » 3x ) your gold."
    ],
    "cooldown": 6,
    "enchants": {
      "Heavy": "Slow 1 item for 2 second(s).",
      "Golden": "You have +3 Income.",
      "Icy": "Freeze 1 item for 1 second(s).",
      "Turbo": "Haste 1 item for 2 second(s).",
      "Shielded": "Double Shield",
      "Restorative": "Heal equal to double your Gold.",
      "Toxic": "Poison 3.",
      "Fiery": "Burn 4.",
      "Shiny": "+1 Multicast",
      "Deadly": "+50% Crit Chance"
    }
  },
  "Mortal Coil": {
    "name": "Mortal Coil",
    "icon": "images/items/MortalCoil.avif",
    "tier": "Gold",
    "tags": [
      "Common",
      "Medium",
      "Damage",
      "Tool",
      "Weapon"
    ],
    "description": [
      "Cooldown 8 seconds",
      "Deal ( 120 » 200 ) damage.",
      "The weapon to the left of this has lifesteal."
    ],
    "cooldown": 8,
    "enchants": {
      "Heavy": "Slow 2 items for 3 second(s).",
      "Icy": "Freeze 1 item for 3 second(s).",
      "Turbo": "Haste 2 items for 3 second(s).",
      "Shielded": "Shield 80.",
      "Restorative": "Heal 120.",
      "Toxic": "Poison 8.",
      "Fiery": "Burn 12.",
      "Shiny": "+1 Multicast",
      "Deadly": "+50% Crit Chance"
    }
  },
  "Mortar & Pestle": {
    "name": "Mortar & Pestle",
    "icon": "images/items/MortarPestle.avif",
    "tier": "Bronze",
    "tags": [
      "Mak",
      "Medium",
      "Damage",
      "Lifesteal",
      "Tool"
    ],
    "description": [
      "Cooldown 8 seconds",
      "Give your Lifesteal Weapons ( +5 » +10 » +15 » +20 ) damage for the fight.",
      "The weapon on the right has Lifesteal."
    ],
    "cooldown": 8,
    "enchants": {
      "Heavy": "Slow 2 items for 3 second(s).",
      "Icy": "Freeze 1 item for 3 second(s).",
      "Turbo": "Haste 2 items for 3 second(s).",
      "Shielded": "Shield 80.",
      "Restorative": "Heal 120.",
      "Toxic": "Poison 8.",
      "Fiery": "Burn 12.",
      "Shiny": "+1 Multicast",
      "Deadly": "Your Lifesteal Weapons have +50% Crit Chance."
    }
  },
  "Motherboard": {
    "name": "Motherboard",
    "icon": "images/items/Motherboard.avif",
    "tier": "Silver",
    "tags": [
      "Dooley",
      "Medium",
      "Damage",
      "Haste"
    ],
    "description": [
      "Cooldown 5 seconds",
      "Haste the Core for ( 2 » 3 » 4 ) second(s).",
      "When the Core gains Haste, give it ( +10 » +20 » +30 ) damage the fight."
    ],
    "cooldown": 5,
    "enchants": {
      "Heavy": "Slow 2 items for 2 second(s).",
      "Icy": "Freeze 1 item for 2 second(s).",
      "Turbo": "Double Haste",
      "Shielded": "Shield 50.",
      "Restorative": "Heal 75.",
      "Toxic": "Poison 5.",
      "Fiery": "Burn 7.",
      "Shiny": "+1 Multicast",
      "Deadly": "+50% Crit Chance"
    }
  },
  "Multitool": {
    "name": "Multitool",
    "icon": "images/items/Multitool.avif",
    "tier": "Bronze",
    "tags": [
      "Stelle",
      "Small",
      "Haste",
      "Slow",
      "Tool"
    ],
    "description": [
      "Cooldown 4 seconds",
      "Haste another item for ( 1 » 2 » 3 » 4 ) second(s).",
      "Slow 1 item for ( 1 » 2 » 3 » 4 ) second(s)."
    ],
    "cooldown": 4,
    "enchants": {
      "Heavy": "+2 Slow",
      "Icy": "Freeze 1 item for 1 second(s).",
      "Turbo": "+2 Haste",
      "Shielded": "Shield 6.",
      "Restorative": "Heal 8.",
      "Toxic": "Poison 1.",
      "Fiery": "Burn 2.",
      "Shiny": "+1 Multicast",
      "Deadly": "+50% Crit Chance"
    }
  },
  "Musket": {
    "name": "Musket",
    "icon": "images/items/Musket.avif",
    "tier": "Silver",
    "tags": [
      "Vanessa",
      "Medium",
      "Ammo",
      "Burn",
      "Damage",
      "Weapon"
    ],
    "description": [
      "Cooldown 5 seconds",
      "Ammo Max 1",
      "Crit Chance 100%",
      "Deal ( 60 » 120 » 240 ) damage.",
      "When you Burn, reload this 1 ammo."
    ],
    "cooldown": 5,
    "enchants": {
      "Heavy": "Slow 2 items for 6 second(s).",
      "Icy": "Freeze 1 item for 6 second(s).",
      "Turbo": "Haste 2 items for 6 second(s).",
      "Shielded": "Shield 180.",
      "Restorative": "Heal 240.",
      "Toxic": "Poison 18.",
      "Fiery": "Burn 24.",
      "Shiny": "+1 Multicast",
      "Deadly": "This has double Crit Damage.",
      "Obsidian": "Lifesteal"
    }
  },
  "Myrrh": {
    "name": "Myrrh",
    "icon": "images/items/Myrrh.avif",
    "tier": "Bronze",
    "tags": [
      "Mak",
      "Small",
      "Heal"
    ],
    "description": [
      "Cooldown 5 seconds",
      "Crit Chance ( 5% » 10% » 15% » 20% )",
      "Heal ( 10 » 30 » 60 » 100 )."
    ],
    "cooldown": 5,
    "enchants": {
      "Heavy": "Slow 1 item for 1 second(s).",
      "Icy": "Freeze 1 item for 1 second(s).",
      "Turbo": "Haste 1 item for 1 second(s).",
      "Shielded": "Shield 25.",
      "Restorative": "Double Heal",
      "Toxic": "Poison 2.",
      "Fiery": "Burn 4.",
      "Shiny": "+1 Multicast",
      "Deadly": "+50% Crit Chance"
    }
  },
  "Nanobots": {
    "name": "Nanobots",
    "icon": "images/items/Nanobots.avif",
    "tier": "Bronze",
    "tags": [
      "Common",
      "Small",
      "Active",
      "Damage",
      "Friend",
      "Weapon"
    ],
    "description": [
      "Cooldown 6 seconds",
      "Deal ( 5 » 15 » 30 » 50 ) damage for each Small Friend you have."
    ],
    "cooldown": 6,
    "enchants": {}
  },
  "Narwhal": {
    "name": "Narwhal",
    "icon": "images/items/Narwhal.avif",
    "tier": "Bronze",
    "tags": [
      "Vanessa",
      "Small",
      "Aquatic",
      "Damage",
      "Friend",
      "Weapon"
    ],
    "description": [
      "Cooldown 4 seconds",
      "Deal ( 4 » 12 » 24 » 40 ) damage."
    ],
    "cooldown": 4,
    "enchants": {
      "Heavy": "Slow 1 item for 1 second(s).",
      "Icy": "Freeze 1 item for 1 second(s).",
      "Turbo": "Haste 1 item for 1 second(s).",
      "Shielded": "Shield 20.",
      "Restorative": "Heal 30.",
      "Toxic": "Poison 2.",
      "Fiery": "Burn 3.",
      "Shiny": "+1 Multicast",
      "Deadly": "This has +50% Crit Chance.",
      "Obsidian": "Lifesteal"
    }
  },
  "Necronomicon": {
    "name": "Necronomicon",
    "icon": "images/items/Necronomicon.avif",
    "tier": "Legendary",
    "tags": [
      "Common",
      "Medium",
      "Poison",
      "Regen"
    ],
    "description": [
      "When ANY non-weapon item is used, Poison 3 and gain 1 Regen for the fight.",
      "Your items have their cooldowns increased by 1 second(s)."
    ],
    "cooldown": null,
    "enchants": {
      "Heavy": "When a non-weapon item is used, Slow 1 item for 2 second(s).",
      "Icy": "When a non-weapon item is used, Freeze 1 item for 1 second(s).",
      "Turbo": "When a non-weapon item is used, Haste 1 item for 2 second(s).",
      "Shielded": "When a non-weapon item is used, shield 15.",
      "Restorative": "When a non-weapon item is used, heal 20.",
      "Toxic": "Double Poison",
      "Fiery": "When a non-weapon item is used, burn 2."
    }
  },
  "Nesting Doll": {
    "name": "Nesting Doll",
    "icon": "images/items/NestingDoll.avif",
    "tier": "Silver",
    "tags": [
      "Vanessa",
      "Small",
      "Ammo",
      "Shield"
    ],
    "description": [
      "Cooldown 2 seconds",
      "Ammo Max 8",
      "Shield equal to this item's Ammo.",
      "At the start of each day, this gains ( 1 » 2 » 3 ) Max Ammo."
    ],
    "cooldown": 2,
    "enchants": {
      "Heavy": "Slow 1 item for 1 second(s).",
      "Icy": "Freeze 1 item for 1 second(s).",
      "Turbo": "Haste 1 item for 1 second(s).",
      "Shielded": "Double Shield",
      "Restorative": "Heal equal to this item's Ammo.",
      "Toxic": "Poison 1.",
      "Fiery": "Burn 1.",
      "Shiny": "+1 Multicast",
      "Deadly": "+50% Crit Chance"
    }
  },
  "Neural Toxin": {
    "name": "Neural Toxin",
    "icon": "images/items/NeuralToxin.avif",
    "tier": "Silver",
    "tags": [
      "Common",
      "Small",
      "Slow"
    ],
    "description": [
      "When you use an adjacent weapon, slow 1 item for ( 1 » 2 » 3 ) second(s)."
    ],
    "cooldown": null,
    "enchants": {
      "Heavy": "+1 Slow Targets",
      "Icy": "When you use an adjacent weapon, freeze 1 item for 1 second(s).",
      "Turbo": "When you use an adjacent weapon, haste 1 item for 1 second(s).",
      "Shielded": "When you use an adjacent weapon, shield 10",
      "Restorative": "When you use an adjacent weapon, heal 15",
      "Toxic": "When you use an adjacent weapon, poison 1",
      "Fiery": "When you use an adjacent weapon, burn 1",
      "Shiny": "+1 Slow Targets"
    }
  },
  "Nightshade": {
    "name": "Nightshade",
    "icon": "images/items/Nightshade.avif",
    "tier": "Bronze",
    "tags": [
      "Mak",
      "Medium",
      "Heal",
      "Poison"
    ],
    "description": [
      "Cooldown 4 seconds",
      "Poison ( 1 » 2 » 3 » 4 ).",
      "Heal ( 10 » 20 » 30 » 40 )."
    ],
    "cooldown": 4,
    "enchants": {
      "Heavy": "Slow 2 items for 1 second(s).",
      "Icy": "Freeze 1 item for 1 second(s).",
      "Turbo": "Haste 2 items for 1 second(s).",
      "Shielded": "Shield 40.",
      "Restorative": "Double Heal",
      "Toxic": "Double Poison",
      "Fiery": "Burn 6.",
      "Shiny": "+1 Multicast",
      "Deadly": "+50% Crit Chance"
    }
  },
  "Nitro": {
    "name": "Nitro",
    "icon": "images/items/Nitro.avif",
    "tier": "Silver",
    "tags": [
      "Dooley",
      "Small",
      "Burn",
      "Charge"
    ],
    "description": [
      "Cooldown 4 seconds",
      "Burn both players ( 4 » 6 » 8 ).",
      "Charge an item ( 1 » 2 » 3 ) second(s)."
    ],
    "cooldown": 4,
    "enchants": {
      "Heavy": "Slow 1 item for 1 second(s).",
      "Icy": "Freeze 1 item for 1 second(s).",
      "Turbo": "Haste 1 item for 1 second(s).",
      "Shielded": "Shield 20.",
      "Restorative": "Heal 30.",
      "Toxic": "Poison 2.",
      "Fiery": "Double Burn",
      "Shiny": "+1 Multicast",
      "Deadly": "+50% Crit Chance"
    }
  },
  "Nitrogen Hammer": {
    "name": "Nitrogen Hammer",
    "icon": "images/items/NitrogenHammer.avif",
    "tier": "Gold",
    "tags": [
      "Dooley",
      "Medium",
      "Damage",
      "Freeze",
      "Weapon"
    ],
    "description": [
      "Cooldown 8 seconds",
      "Deal 25 damage.",
      "Freeze 1 item for ( 1 » 2 ) second(s).",
      "When you freeze an item, this gains ( 25 » 50 ) damage for the fight."
    ],
    "cooldown": 8,
    "enchants": {
      "Heavy": "Slow 2 items for 3 second(s).",
      "Icy": "Double Freeze",
      "Turbo": "Haste 2 items for 3 second(s).",
      "Shielded": "Shield 80.",
      "Restorative": "Heal 120.",
      "Toxic": "Poison 8.",
      "Fiery": "Burn 12.",
      "Shiny": "+1 Multicast",
      "Deadly": "+50% Crit Chance",
      "Obsidian": "Lifesteal"
    }
  },
  "Noxious Potion": {
    "name": "Noxious Potion",
    "icon": "images/items/NoxiousPotion.avif",
    "tier": "Bronze",
    "tags": [
      "Mak",
      "Small",
      "Ammo",
      "Poison",
      "Potion"
    ],
    "description": [
      "Cooldown 3 seconds",
      "Ammo Max 1",
      "Poison both players ( 4 » 6 » 8 » 10 )."
    ],
    "cooldown": 3,
    "enchants": {
      "Heavy": "Slow 1 item for 2 second(s).",
      "Icy": "Freeze 1 item for 1 second(s).",
      "Turbo": "Haste 1 item for 2 second(s).",
      "Shielded": "Shield 30.",
      "Restorative": "Heal 45.",
      "Toxic": "Double Poison",
      "Fiery": "Burn 4.",
      "Shiny": "+1 Multicast",
      "Deadly": "+50% Crit Chance"
    }
  },
  "Octopus": {
    "name": "Octopus",
    "icon": "images/items/Octopus.avif",
    "tier": "Legendary",
    "tags": [
      "Common",
      "Medium",
      "Aquatic",
      "Damage",
      "Friend",
      "Weapon"
    ],
    "description": [
      "Cooldown 8 seconds",
      "Multicast 8",
      "Deal 8 damage."
    ],
    "cooldown": 8,
    "enchants": {
      "Heavy": "Slow 1 item for 1 second(s).",
      "Icy": "Freeze 1 item for 1 second",
      "Turbo": "Haste 1 item for 1 second(s).",
      "Shielded": "Shield 10.",
      "Restorative": "Heal 15.",
      "Toxic": "Poison 1.",
      "Fiery": "Burn 1.",
      "Shiny": "+1 Multicast",
      "Deadly": "+50% Crit Chance",
      "Obsidian": "Lifesteal"
    }
  },
  "Oinkment": {
    "name": "Oinkment",
    "icon": "images/items/Oinkment.avif",
    "tier": "Silver",
    "tags": [
      "Pygmalien",
      "Small",
      "Economy",
      "Heal"
    ],
    "description": [
      "Cooldown 5 seconds",
      "Heal equal to ( 1x » 2x » 3x ) your gold."
    ],
    "cooldown": 5,
    "enchants": {
      "Heavy": "Slow 1 item for 2 second(s).",
      "Icy": "Freeze 1 item for 1 second(s).",
      "Turbo": "Haste 1 item for 2 second(s).",
      "Shielded": "Shield equal to double your gold.",
      "Restorative": "Double Heal",
      "Toxic": "Poison 3.",
      "Fiery": "Burn 4.",
      "Shiny": "+1 Multicast",
      "Deadly": "+50% Crit Chance"
    }
  },
  "Old Sword": {
    "name": "Old Sword",
    "icon": "images/items/OldSword.avif",
    "tier": "Bronze",
    "tags": [
      "Common",
      "Small",
      "Damage",
      "Weapon"
    ],
    "description": [
      "Cooldown 4 seconds",
      "Deal ( 5 » 15 » 30 » 50 ) damage.",
      "When you sell this, give your leftmost weapon ( +4 » +6 » +8 » +10 ) Damage."
    ],
    "cooldown": 4,
    "enchants": {
      "Heavy": "Slow 1 item for 1 second(s).",
      "Icy": "Freeze 1 item for 1 second(s).",
      "Turbo": "Haste 1 item for 1 second(s).",
      "Shielded": "Shield 20.",
      "Restorative": "Heal 30.",
      "Toxic": "Poison 2.",
      "Fiery": "Burn 3.",
      "Shiny": "+1 Multicast",
      "Deadly": "+50% Crit Chance",
      "Obsidian": "Lifesteal"
    }
  },
  "Omega Ray": {
    "name": "Omega Ray",
    "icon": "images/items/OmegaRay.avif",
    "tier": "Silver",
    "tags": [
      "Dooley",
      "Small",
      "Burn"
    ],
    "description": [
      "Cooldown 6 seconds",
      "Burn ( 2 » 4 » 6 ).",
      "When you use the Core or another Ray, your Burn items gain ( 1 » 2 » 4 ) Burn for the fight."
    ],
    "cooldown": 6,
    "enchants": {
      "Heavy": "Slow 1 item for 2 second(s).",
      "Icy": "Freeze 1 item for 1 second(s).",
      "Turbo": "Haste 1 item for 2 second(s).",
      "Shielded": "Shield 30.",
      "Restorative": "Heal 45.",
      "Toxic": "Poison 3.",
      "Fiery": "Double Burn",
      "Shiny": "+1 Multicast",
      "Deadly": "+50% Crit Chance"
    }
  },
  "Open Sign": {
    "name": "Open Sign",
    "icon": "images/items/OpenSign.avif",
    "tier": "Gold",
    "tags": [
      "Pygmalien",
      "Medium",
      "Damage",
      "Economy",
      "Shield"
    ],
    "description": [
      "Weapon Properties adjacent to this have + Damage equal to ( 1x » 2x ) the value of your highest value item. [0]",
      "Shield Properties adjacent to this have + Shield equal to ( 1x » 2x ) the value of your highest value item. [0]"
    ],
    "cooldown": null,
    "enchants": {
      "Golden": "Adjacent properties have double value.",
      "Shiny": "This has double Damage and Shield bonus.",
      "Deadly": "Shield Properties adjacent to this have + Crit Chance equal to the value of your highest value item. [0]"
    }
  },
  "Orbital Polisher": {
    "name": "Orbital Polisher",
    "icon": "images/items/OrbitalPolisher.avif",
    "tier": "Gold",
    "tags": [
      "Stelle",
      "Small",
      "Damage",
      "Shield",
      "Tool"
    ],
    "description": [
      "Cooldown 7 seconds",
      "Adjacent items gain ( 5 » 10 ) Damage for the fight.",
      "Adjacent items gain ( 5 » 10 ) Shield for the fight."
    ],
    "cooldown": 7,
    "enchants": {
      "Heavy": "Slow 1 item for 2 second(s).",
      "Icy": "Freeze 1 item for 1 second(s).",
      "Turbo": "Haste 1 item for 2 second(s).",
      "Shielded": "Shield 35.",
      "Restorative": "Heal 50.",
      "Toxic": "Poison 3.",
      "Fiery": "Burn 5.",
      "Deadly": "Adjacent items gain 10% Crit Chance for the fight."
    }
  },
  "Ouroboros Statue": {
    "name": "Ouroboros Statue",
    "icon": "images/items/OuroborosStatue.avif",
    "tier": "Gold",
    "tags": [
      "Mak",
      "Medium",
      "Poison",
      "Regen"
    ],
    "description": [
      "Cooldown 9 seconds",
      "Poison ( 4 » 6 ).",
      "When you Poison, gain ( +1 » +2 ) Regeneration for the fight."
    ],
    "cooldown": 9,
    "enchants": {
      "Heavy": "When you Poison, Slow 1 item for 2 second(s).",
      "Icy": "When you Poison, Freeze 1 item for 1 second(s).",
      "Turbo": "When you Poison, Haste 1 item for 2 second(s).",
      "Shielded": "When you Poison, Shield 15.",
      "Restorative": "When you Poison, Heal 20.",
      "Toxic": "Double Poison",
      "Fiery": "When you Poison, Burn 2.",
      "Shiny": "+1 Multicast",
      "Deadly": "+50% Crit Chance"
    }
  },
  "Oven Mitts": {
    "name": "Oven Mitts",
    "icon": "images/items/OvenMitts.avif",
    "tier": "Silver",
    "tags": [
      "Jules",
      "Medium",
      "Burn",
      "Haste",
      "Shield"
    ],
    "description": [
      "When you burn, Shield ( 5 » 10 » 15 ).",
      "When you Burn, Haste an item for ( 1 » 2 » 3 ) second(s)."
    ],
    "cooldown": null,
    "enchants": {
      "Heavy": "When you Burn, Slow 1 items for 2 second(s).",
      "Icy": "When you Burn, Freeze 1 item for 1 second(s).",
      "Turbo": "+1 Haste Targets",
      "Shielded": "Double Shield",
      "Restorative": "When you Burn, Heal 20.",
      "Toxic": "When you Burn, Poison 2.",
      "Fiery": "At the start of each fight, Burn 12.",
      "Shiny": "+1 Multicast",
      "Deadly": "When you Burn, your items gain 6% Crit Chance."
    }
  },
  "Palanquin": {
    "name": "Palanquin",
    "icon": "images/items/Palanquin.avif",
    "tier": "Gold",
    "tags": [
      "Mak",
      "Large",
      "Cooldown",
      "Crit",
      "Vehicle"
    ],
    "description": [
      "Your items have ( +20% » +40% ) Crit Chance.",
      "When you Crit with an item, reduce their cooldown by 10% for the fight."
    ],
    "cooldown": null,
    "enchants": {
      "Heavy": "When you Crit, Slow 1 items for 3 second(s).",
      "Icy": "When you Crit, Freeze 1 item for 1 second(s).",
      "Turbo": "When you Crit, Haste 1 items for 3 second(s).",
      "Shielded": "When you Crit, Shield 30.",
      "Restorative": "When you Crit, Heal 45.",
      "Toxic": "When you Crit, Poison 3.",
      "Fiery": "When you Crit, Burn 4.",
      "Obsidian": "Lifesteal",
      "Deadly": "Double Crit Chance"
    }
  },
  "Pawn Shop": {
    "name": "Pawn Shop",
    "icon": "images/items/PawnShop.avif",
    "tier": "Silver",
    "tags": [
      "Pygmalien",
      "Large",
      "Economy",
      "Health",
      "Property",
      "Value"
    ],
    "description": [
      "When you sell an item, this gains ( 1 » 2 » 3 ) value.",
      "You have increased max health equal to ( 10 » 15 » 20 ) times this item's value. ( [60] » [180] » [480] )"
    ],
    "cooldown": null,
    "enchants": {
      "Golden": "Double Value",
      "Shielded": "Your Shield items have + Shield equal to this item's value.",
      "Restorative": "Your Heal items have + Heal equal to this item's value.",
      "Toxic": "Your Poison items have + Poison equal to 10% of this item's value.",
      "Fiery": "Your Burn items have + Burn equal to 15% of this item's value.",
      "Shiny": "Double Health Max",
      "Deadly": "Your items have Crit Chance equal to this item's value."
    }
  },
  "Pearl": {
    "name": "Pearl",
    "icon": "images/items/Pearl.avif",
    "tier": "Gold",
    "tags": [
      "Vanessa",
      "Small",
      "Aquatic",
      "Shield"
    ],
    "description": [
      "When you use an Aquatic item, Shield ( 10 » 20 )."
    ],
    "cooldown": null,
    "enchants": {
      "Heavy": "When you use an Aquatic item, Slow 1 item for 1 second(s).",
      "Icy": "When you use an Aquatic item, Freeze 1 item for 1 second(s).",
      "Turbo": "When you use an Aquatic item, Haste 1 item for 1 second(s).",
      "Shielded": "Double Shield",
      "Restorative": "When you use an Aquatic item, Heal 15.",
      "Toxic": "When you use an Aquatic item, Poison 1.",
      "Fiery": "When you use an Aquatic item, Burn 2.",
      "Shiny": "+1 Multicast",
      "Deadly": "When you use an Aquatic item, give your items +3% Crit for this fight."
    }
  },
  "Pelt": {
    "name": "Pelt",
    "icon": "images/items/Pelt.avif",
    "tier": "Bronze",
    "tags": [
      "Common",
      "Small",
      "NonWeapon",
      "Passive"
    ],
    "description": [
      "Sells for gold"
    ],
    "cooldown": null,
    "enchants": {}
  },
  "Pendulum": {
    "name": "Pendulum",
    "icon": "images/items/Pendulum.avif",
    "tier": "Bronze",
    "tags": [
      "Mak",
      "Medium",
      "Crit",
      "Haste",
      "Tool"
    ],
    "description": [
      "Cooldown 6 seconds",
      "Adjacent items have ( +15% » +20% » +25% » +30% ) Crit Chance.",
      "When you Crit, Haste an item for ( 1 » 2 » 3 » 4 ) second(s)."
    ],
    "cooldown": 6,
    "enchants": {
      "Heavy": "When you Crit, Slow 1 item for 2 second(s).",
      "Icy": "When you Crit, Freeze 1 item for 1 second(s).",
      "Turbo": "+1 Haste Targets",
      "Shielded": "When you Crit, Shield 15.",
      "Restorative": "When you Crit, Heal 20.",
      "Toxic": "When you Crit, Poison 1.",
      "Fiery": "When you Crit, Burn 2.",
      "Deadly": "Double Crit Chance"
    }
  },
  "Pepper Spray": {
    "name": "Pepper Spray",
    "icon": "images/items/PepperSpray.avif",
    "tier": "Bronze",
    "tags": [
      "Pygmalien",
      "Small",
      "Damage",
      "Slow",
      "Weapon"
    ],
    "description": [
      "Cooldown 5 seconds",
      "Deal ( 5 » 15 » 30 » 50 ) damage.",
      "The first time you fall below half health each fight, slow all enemy items for ( 1 » 2 » 3 » 4 ) second(s)."
    ],
    "cooldown": 5,
    "enchants": {
      "Heavy": "Double Slow",
      "Icy": "The first time you fall below half health each fight, Freeze 1 item for 4 second(s).",
      "Turbo": "The time you fall below half health, 2 haste all your items for 4 second(s).",
      "Shielded": "The first time you fall below half health each fight, Shield 60.",
      "Restorative": "The first time you fall below half health each fight, Heal 90.",
      "Toxic": "The first time you fall below half health each fight, Poison 6.",
      "Fiery": "The first time you fall below half health each fight, Burn 9.",
      "Shiny": "+1 Multicast",
      "Deadly": "The first time you fall below half health each fight, your items gain 25% Crit Chance.",
      "Obsidian": "Lifesteal"
    }
  },
  "Pesky Pete": {
    "name": "Pesky Pete",
    "icon": "images/items/PeskyPete.avif",
    "tier": "Gold",
    "tags": [
      "Vanessa",
      "Small",
      "Burn",
      "Friend"
    ],
    "description": [
      "Cooldown 6 seconds",
      "Burn ( 4 » 6 ).",
      "For each adjacent Friend or Property, this gains ( +4 » +8 ) Burn."
    ],
    "cooldown": 6,
    "enchants": {
      "Heavy": "Slow 1 item for 2 second(s).",
      "Icy": "Freeze 1 item for 1 second(s).",
      "Turbo": "Haste 1 item for 2 second(s).",
      "Shielded": "Shield 30.",
      "Restorative": "Heal 45.",
      "Toxic": "Poison 3.",
      "Fiery": "Double Burn",
      "Shiny": "+1 Multicast",
      "Deadly": "+50% Crit Chance"
    }
  },
  "Pet Rock": {
    "name": "Pet Rock",
    "icon": "images/items/PetRock.avif",
    "tier": "Bronze",
    "tags": [
      "Vanessa",
      "Small",
      "Crit",
      "Damage",
      "Friend",
      "Weapon"
    ],
    "description": [
      "Cooldown 5 seconds",
      "Deal ( 5 » 15 » 30 » 50 ) damage.",
      "If this is your only friend, your items have ( +5% » +10% » +15% » +20% ) Crit Chance."
    ],
    "cooldown": 5,
    "enchants": {
      "Heavy": "Slow 1 item for 1 second(s).",
      "Icy": "Freeze 1 item for 1 second(s).",
      "Turbo": "Haste 1 item for 1 second(s).",
      "Shielded": "Shield 25.",
      "Restorative": "Heal 40.",
      "Toxic": "Poison 2.",
      "Fiery": "Burn 4.",
      "Shiny": "+1 Multicast",
      "Deadly": "Double Crit Chance",
      "Obsidian": "Lifesteal"
    }
  },
  "Phonograph": {
    "name": "Phonograph",
    "icon": "images/items/Phonograph.avif",
    "tier": "Gold",
    "tags": [
      "Pygmalien",
      "Medium",
      "Cooldown"
    ],
    "description": [
      "The item to the left of this has its cooldown reduced by ( 25% » 50% )."
    ],
    "cooldown": null,
    "enchants": {
      "Heavy": "When you use the item to the left of this, slow 1 item for 3 second(s).",
      "Icy": "When you use the item to the left of this, Freeze 1 item for 1 second(s).",
      "Turbo": "When you use the item to the left of this, haste 1 item for 3 second(s).",
      "Shielded": "When you use the item to the left of this, shield 20",
      "Restorative": "When you use the item to the left of this, heal 30",
      "Toxic": "When you use the item to the left of this, poison 2",
      "Fiery": "When you use the item to the left of this, burn 3",
      "Shiny": "The item to the Right of this has its cooldown reduced by 25%.",
      "Deadly": "The item to the left of this has +50% Crit Chance."
    }
  },
  "Pickled Peppers": {
    "name": "Pickled Peppers",
    "icon": "images/items/PickledPeppers.avif",
    "tier": "Gold",
    "tags": [
      "Jules",
      "Medium",
      "Burn",
      "Food"
    ],
    "description": [
      "Cooldown 10 seconds",
      "Burn ( 5 » 10 ).",
      "When you Burn, this gains ( 5 » 10 ) Burn for the fight."
    ],
    "cooldown": 10,
    "enchants": {
      "Heavy": "Slow 2 items for 3 second(s).",
      "Icy": "Freeze 1 item for 3 second(s).",
      "Turbo": "Haste 2 items for 3 second(s).",
      "Shielded": "Shield 100.",
      "Restorative": "Heal 150.",
      "Toxic": "Poison 10.",
      "Fiery": "Double Burn",
      "Shiny": "+1 Multicast",
      "Deadly": "+50% Crit Chance"
    }
  },
  "Pierre Conditioner": {
    "name": "Pierre Conditioner",
    "icon": "images/items/PierreConditioner.avif",
    "tier": "Diamond",
    "tags": [
      "Dooley",
      "Medium",
      "Freeze",
      "Friend"
    ],
    "description": [
      "Cooldown 5 seconds",
      "Freeze 1 item for 1 second(s).",
      "When you use the Core, Freeze an item for 1 second(s)."
    ],
    "cooldown": 5,
    "enchants": {
      "Heavy": "When you use the Core, Slow 1 items for 3 second(s).",
      "Icy": "Double Freeze",
      "Turbo": "When you use the Core, Haste 1 items for 3 second(s).",
      "Shielded": "When you use the Core, Shield 20.",
      "Restorative": "When you use the Core, Heal 30.",
      "Toxic": "When you use the Core, Poison 2.",
      "Fiery": "When you use the Core, Burn 3.",
      "Shiny": "+1 Multicast"
    }
  },
  "Piggles": {
    "name": "Piggles",
    "icon": "images/items/Piggles.avif",
    "tier": "Bronze",
    "tags": [
      "Pygmalien",
      "Small",
      "Charge"
    ],
    "description": [
      "Cooldown 7 seconds",
      "Charge adjacent Small items ( 1 » 2 » 3 » 4 ) second(s).",
      "When you win a fight, get a Piggle."
    ],
    "cooldown": 7,
    "enchants": {
      "Heavy": "Slow 1 item for 2 second(s).",
      "Icy": "Freeze 1 item for 1 second(s).",
      "Turbo": "Haste 1 item for 2 second(s).",
      "Shielded": "Shield 35.",
      "Restorative": "Heal 50.",
      "Toxic": "Poison 3.",
      "Fiery": "Burn 5.",
      "Shiny": "+1 Multicast",
      "Deadly": "Your Piggles have -1 cooldown."
    }
  },
  "Pinata": {
    "name": "Pinata",
    "icon": "images/items/Pinata.avif",
    "tier": "Bronze",
    "tags": [
      "Pygmalien",
      "Medium"
    ],
    "description": [
      "When you sell this, get 3 Chocolate Bars."
    ],
    "cooldown": null,
    "enchants": {}
  },
  "Piranha": {
    "name": "Piranha",
    "icon": "images/items/Piranha.avif",
    "tier": "Bronze",
    "tags": [
      "Vanessa",
      "Small",
      "Aquatic",
      "Crit",
      "Damage",
      "Weapon"
    ],
    "description": [
      "Cooldown 5 seconds",
      "Deal ( 5 » 15 » 30 » 50 ) damage.",
      "This deals double Crit damage."
    ],
    "cooldown": 5,
    "enchants": {
      "Heavy": "Slow 1 item for 1 second(s).",
      "Icy": "Freeze 1 item for 2 second(s).",
      "Turbo": "Haste 1 item for 1 second(s).",
      "Shielded": "Shield 25.",
      "Restorative": "Heal 40.",
      "Toxic": "Poison 2.",
      "Fiery": "Burn 4.",
      "Shiny": "+1 Multicast",
      "Deadly": "+50% Crit Chance",
      "Obsidian": "Lifesteal"
    }
  },
  "Pistol Sword": {
    "name": "Pistol Sword",
    "icon": "images/items/PistolSword.avif",
    "tier": "Gold",
    "tags": [
      "Vanessa",
      "Medium",
      "Ammo",
      "Damage",
      "Weapon"
    ],
    "description": [
      "Cooldown 3 seconds",
      "Ammo Max 3",
      "Deal ( 15 » 30 ) damage.",
      "When you use an ammo item, deal ( 15 » 30 ) damage."
    ],
    "cooldown": 3,
    "enchants": {
      "Heavy": "When you use an Ammo item, Slow 1 item for 2 second(s).",
      "Icy": "When you use an Ammo item, Freeze 1 item for 1 second(s).",
      "Turbo": "When you use an Ammo item, Haste 1 items for 2 second(s).",
      "Shielded": "When you use an Ammo item, Shield 15.",
      "Restorative": "When you use an Ammo item, Heal 20.",
      "Toxic": "When you use an Ammo item, Poison 1.",
      "Fiery": "When you use an Ammo item, Burn 2.",
      "Shiny": "+1 Multicast",
      "Deadly": "When you use an Ammo item, give your items +50% Crit Chance for this fight.",
      "Obsidian": "Lifesteal"
    }
  },
  "Plasma Grenade": {
    "name": "Plasma Grenade",
    "icon": "images/items/PlasmaGrenade.avif",
    "tier": "Silver",
    "tags": [
      "Dooley",
      "Small",
      "Ammo",
      "Burn",
      "Slow"
    ],
    "description": [
      "Cooldown 4 seconds",
      "Ammo Max 1",
      "Burn both players ( 5 » 10 » 15 ).",
      "Slow enemy items for ( 1 » 2 » 3 ) second(s)."
    ],
    "cooldown": 4,
    "enchants": {
      "Heavy": "Double Slow",
      "Icy": "Freeze all enemy items for 1 second(s).",
      "Turbo": "Haste your items for 5 second(s).",
      "Shielded": "Shield 160.",
      "Restorative": "Heal 240.",
      "Toxic": "Poison 16.",
      "Fiery": "Double Burn",
      "Shiny": "+1 Multicast",
      "Deadly": "Your items gain +25% Crit Chance for the fight."
    }
  },
  "Plasma Rifle": {
    "name": "Plasma Rifle",
    "icon": "images/items/PlasmaRifle.avif",
    "tier": "Silver",
    "tags": [
      "Dooley",
      "Medium",
      "Burn",
      "Damage",
      "Weapon"
    ],
    "description": [
      "Cooldown 8 seconds",
      "Deal ( 50 » 100 » 150 ) damage.",
      "When you Burn, this gains ( 25 » 50 » 75 ) damage for the fight."
    ],
    "cooldown": 8,
    "enchants": {
      "Heavy": "Slow 1 item for 2 second(s).",
      "Icy": "Freeze 1 item for 1 second(s).",
      "Turbo": "Haste 1 item for 2 second(s).",
      "Shielded": "Shield 80.",
      "Restorative": "Heal 120.",
      "Toxic": "Poison 8.",
      "Fiery": "Burn 12.",
      "Shiny": "+1 Multicast",
      "Deadly": "+50% Crit Chance",
      "Obsidian": "Lifesteal"
    }
  },
  "Pop Snappers": {
    "name": "Pop Snappers",
    "icon": "images/items/PopSnappers.avif",
    "tier": "Bronze",
    "tags": [
      "Vanessa",
      "Small",
      "Ammo",
      "Burn"
    ],
    "description": [
      "Cooldown 3 seconds",
      "Ammo Max 3",
      "Burn ( 4 » 6 » 8 » 10 )."
    ],
    "cooldown": 3,
    "enchants": {
      "Heavy": "Slow 1 item for 1 second(s).",
      "Icy": "Freeze 1 item for 1 second(s).",
      "Turbo": "Haste 1 item for 1 second(s).",
      "Shielded": "Shield 15.",
      "Restorative": "Heal 20.",
      "Toxic": "Poison 1.",
      "Fiery": "Double Burn",
      "Shiny": "+1 Multicast",
      "Deadly": "+50% Crit Chance"
    }
  },
  "Poppy Field": {
    "name": "Poppy Field",
    "icon": "images/items/PoppyField.avif",
    "tier": "Bronze",
    "tags": [
      "Mak",
      "Large",
      "Cooldown",
      "Poison",
      "Property"
    ],
    "description": [
      "Cooldown 6 seconds",
      "Poison ( 3 » 6 » 9 » 12 ).",
      "If you have no weapons, your items have their cooldowns reduced by ( 5% » 10% » 15% » 20% )."
    ],
    "cooldown": 6,
    "enchants": {
      "Heavy": "Slow 3 items for 3 second(s).",
      "Icy": "Freeze 1 item for 4 second(s).",
      "Turbo": "Haste 3 items for 3 second(s).",
      "Shielded": "Shield 135.",
      "Restorative": "Heal 200.",
      "Toxic": "Double Poison",
      "Fiery": "Burn 20.",
      "Shiny": "+1 Multicast",
      "Deadly": "+50% Crit Chance"
    }
  },
  "Port": {
    "name": "Port",
    "icon": "images/items/Port.avif",
    "tier": "Silver",
    "tags": [
      "Vanessa",
      "Large",
      "Ammo",
      "Aquatic",
      "Property"
    ],
    "description": [
      "Cooldown 6 seconds",
      "Reload all your items ( 1 » 2 » 3 ) Ammo and charge them 1 second(s).",
      "Your items have ( +1 » +2 » +3 ) Max Ammo.",
      "At the start of each day, get a small Ammo item from any Hero."
    ],
    "cooldown": 6,
    "enchants": {
      "Heavy": "Slow 3 items for 2 second(s).",
      "Icy": "Freeze 1 item for 3 second(s).",
      "Turbo": "Haste 3 items for 2 second(s).",
      "Shielded": "Shield 90.",
      "Restorative": "Heal 135.",
      "Toxic": "Poison 9.",
      "Fiery": "Burn 13.",
      "Shiny": "+2 Reload",
      "Deadly": "Your Ammo items have +20% Crit Chance."
    }
  },
  "Powder Flask": {
    "name": "Powder Flask",
    "icon": "images/items/PowderFlask.avif",
    "tier": "Bronze",
    "tags": [
      "Vanessa",
      "Small",
      "Ammo",
      "Tool"
    ],
    "description": [
      "Cooldown 4 seconds",
      "Reload the item to the right of this ( 1 » 2 » 3 » 4 ) Ammo."
    ],
    "cooldown": 4,
    "enchants": {
      "Heavy": "Slow 1 item for 1 second(s).",
      "Icy": "Freeze 1 item for 1 second(s).",
      "Turbo": "Haste 1 item for 1 second(s).",
      "Shielded": "Shield 20.",
      "Restorative": "Heal 30.",
      "Toxic": "Poison 2.",
      "Fiery": "Burn 3.",
      "Shiny": "+1 Multicast",
      "Deadly": "Give the Ammo item to the right of this +20% Crit Chance for the fight."
    }
  },
  "Powder Keg": {
    "name": "Powder Keg",
    "icon": "images/items/PowderKeg.avif",
    "tier": "Silver",
    "tags": [
      "Vanessa",
      "Medium",
      "Burn",
      "Damage",
      "Health",
      "Weapon"
    ],
    "description": [
      "Cooldown 20 seconds",
      "Deal damage equal to ( 30% » 40% » 50% ) of your enemy's Max Health and destroy this.",
      "When you Burn, charge this 1 second(s)."
    ],
    "cooldown": 20,
    "enchants": {
      "Heavy": "Slow 2 items for 10 second(s).",
      "Icy": "Freeze 1 item for 10 second(s).",
      "Turbo": "Haste 2 items for 10 second(s).",
      "Shielded": "Shield 500.",
      "Restorative": "Heal 750.",
      "Toxic": "Poison 50.",
      "Fiery": "Burn 75.",
      "Shiny": "+1 Multicast",
      "Deadly": "+50% Crit Chance",
      "Obsidian": "Lifesteal"
    }
  },
  "Power Drill": {
    "name": "Power Drill",
    "icon": "images/items/PowerDrill.avif",
    "tier": "Bronze",
    "tags": [
      "Dooley",
      "Medium",
      "Burn",
      "Cooldown",
      "Damage",
      "Haste",
      "Tool",
      "Weapon"
    ],
    "description": [
      "Cooldown 10 seconds",
      "Deal ( 20 » 40 » 80 » 160 ) damage.",
      "When you Haste, Slow, Freeze, Burn or Poison, charge this ( 1 » 1 » 1 » 2 ) second(s)."
    ],
    "cooldown": 10,
    "enchants": {
      "Heavy": "Slow 2 items for 2 second(s).",
      "Icy": "Freeze 1 item for 2 second(s).",
      "Turbo": "Haste 2 items for 2 second(s).",
      "Shielded": "Shield 100.",
      "Restorative": "Heal 150.",
      "Toxic": "Poison 10.",
      "Fiery": "Burn 15.",
      "Shiny": "+1 Multicast",
      "Deadly": "+50% Crit Chance",
      "Obsidian": "Lifesteal"
    }
  },
  "Power Sander": {
    "name": "Power Sander",
    "icon": "images/items/PowerSander.avif",
    "tier": "Bronze",
    "tags": [
      "Dooley",
      "Small",
      "Damage",
      "Shield",
      "Tool"
    ],
    "description": [
      "Cooldown 4 seconds",
      "adjacent weapons gain ( 3 » 6 » 9 » 12 ) damage for the fight.",
      "adjacent Shield items gain ( 3 » 6 » 9 » 12 ) Shield for the fight."
    ],
    "cooldown": 4,
    "enchants": {
      "Heavy": "Slow 1 item for 1 second(s).",
      "Icy": "Freeze 1 item for 1 second(s).",
      "Turbo": "Haste 1 item for 1 second(s).",
      "Shielded": "Shield 20.",
      "Restorative": "Heal 30.",
      "Toxic": "Poison 2.",
      "Fiery": "Burn 3.",
      "Shiny": "+1 Multicast",
      "Deadly": "Adjacent items gain 10% Crit chance for the fight."
    }
  },
  "Proboscis": {
    "name": "Proboscis",
    "icon": "images/items/Proboscis.avif",
    "tier": "Bronze",
    "tags": [
      "Common",
      "Small",
      "Damage",
      "Slow",
      "Weapon"
    ],
    "description": [
      "When you slow, deal ( 3 » 6 » 9 » 12 ) damage."
    ],
    "cooldown": null,
    "enchants": {
      "Heavy": "SlowAmount0",
      "Icy": "When you slow, Freeze 1 item for 1 second(s).",
      "Turbo": "When you slow, haste 1 item for 1 second(s).",
      "Shielded": "When you slow, shield 10.",
      "Restorative": "When you slow, heal 15.",
      "Toxic": "When you slow, poison 1.",
      "Fiery": "When you slow, burn 1.",
      "Shiny": "Double Damage",
      "Obsidian": "Lifesteal"
    }
  },
  "Propane Tank": {
    "name": "Propane Tank",
    "icon": "images/items/PropaneTank.avif",
    "tier": "Silver",
    "tags": [
      "Stelle",
      "Medium",
      "Burn",
      "Haste",
      "Tool"
    ],
    "description": [
      "Cooldown 9 seconds",
      "Haste your Vehicles for ( 2 » 3 » 5 ) second(s).",
      "When you use a Vehicle, Burn ( 2 » 3 » 5 )."
    ],
    "cooldown": 9,
    "enchants": {
      "Heavy": "When you use a Vehicle, Slow 2 items for 3 second(s).",
      "Icy": "When you use a Vehicle, Freeze 1 item for 3 second(s).",
      "Turbo": "Double Haste",
      "Shielded": "When you use a Vehicle, Shield 60.",
      "Restorative": "When you use a Vehicle, Heal 90.",
      "Toxic": "When you use a Vehicle, Poison 6.",
      "Fiery": "Double Burn",
      "Shiny": "+1 Multicast",
      "Deadly": "Your Vehicles have +50% Crit Chance."
    }
  },
  "Pufferfish": {
    "name": "Pufferfish",
    "icon": "images/items/Pufferfish.avif",
    "tier": "Bronze",
    "tags": [
      "Vanessa",
      "Medium",
      "Aquatic",
      "Friend",
      "Haste",
      "Poison"
    ],
    "description": [
      "When you Haste, Poison ( 1 » 2 » 4 » 8 )."
    ],
    "cooldown": null,
    "enchants": {
      "Heavy": "When you Haste, Slow 1 item for 2 second(s).",
      "Icy": "When you Haste, Freeze 1 item for 1 second(s).",
      "Turbo": "At the start of each fight, Haste 2 item for 2 second(s).",
      "Shielded": "When you Haste, Shield 15.",
      "Restorative": "When you Haste, Heal 20.",
      "Toxic": "Double Poison",
      "Fiery": "When you Haste, Burn 2.",
      "Shiny": "Double Poison",
      "Deadly": "When you Haste, your items gain +5% Crit Chance for the fight."
    }
  },
  "Pyg's Gym": {
    "name": "Pyg's Gym",
    "icon": "images/items/PygsGym.avif",
    "tier": "Silver",
    "tags": [
      "Pygmalien",
      "Large",
      "Damage",
      "Economy",
      "Health",
      "Property",
      "Value"
    ],
    "description": [
      "Cooldown 5 seconds",
      "Your weapons gain Damage equal to this item's value for the fight.",
      "When you buy a weapon, this gains ( 1 » 2 » 3 ) value and you gain ( 20 » 50 » 100 ) max health."
    ],
    "cooldown": 5,
    "enchants": {
      "Golden": "This has double value.",
      "Heavy": "Slow 3 items for 2 second(s).",
      "Icy": "Freeze 1 item for 3 second(s).",
      "Turbo": "Haste 3 items for 2 second(s).",
      "Shielded": "Your Shield items gain Shield equal to this item's value for the fight.",
      "Restorative": "Your Heal items gain Heal equal to this item's value for the fight.",
      "Toxic": "Your Poison items gain Poison equal to 10% of this item's value for the fight.",
      "Fiery": "Your Burn items gain Burn equal to 15% of this item's value for the fight.",
      "Shiny": "+1 Multicast",
      "Deadly": "Your items gain Crit Chance equal to this item's value for the fight."
    }
  },
  "Pygmalien's Dagger": {
    "name": "Pygmalien's Dagger",
    "icon": "images/items/PygmaliensDagger.avif",
    "tier": "Gold",
    "tags": [
      "Pygmalien",
      "Medium",
      "Damage",
      "Economy",
      "Value",
      "Weapon"
    ],
    "description": [
      "Cooldown 4 seconds",
      "Deal damage equal to ( 1x » 2x ) this item's value.",
      "When you sell an item, give this ( 1 » 2 ) value."
    ],
    "cooldown": 4,
    "enchants": {
      "Golden": "Double Value",
      "Heavy": "Slow 2 items for 1 second(s).",
      "Icy": "Freeze 1 item for 1 second(s).",
      "Turbo": "Haste 2 items for 1 second(s).",
      "Shielded": "Shield equal to this item's value.",
      "Restorative": "Heal equal to this item's value.",
      "Toxic": "Poison 4.",
      "Fiery": "Burn 6.",
      "Shiny": "+1 Multicast",
      "Deadly": "+50% Crit Chance",
      "Obsidian": "Lifesteal"
    }
  },
  "Pylon": {
    "name": "Pylon",
    "icon": "images/items/Pylon.avif",
    "tier": "Silver",
    "tags": [
      "Dooley",
      "Large",
      "Haste",
      "Property",
      "Slow"
    ],
    "description": [
      "Cooldown 3 seconds",
      "Slow 1 item for ( 1 » 2 » 3 ) second(s).",
      "When you Slow, Haste an item for ( 1 » 2 » 3 ) second(s)."
    ],
    "cooldown": 3,
    "enchants": {
      "Heavy": "+1 Slow Targets",
      "Icy": "When you Slow, Freeze 1 item for 1 second(s).",
      "Turbo": "Double Haste",
      "Shielded": "When you Slow, Shield 30.",
      "Restorative": "When you Slow, Heal 45.",
      "Toxic": "When you Slow, Poison 3.",
      "Fiery": "When you Slow, Burn 4.",
      "Shiny": "+1 Multicast",
      "Deadly": "When you Slow, your items gain +10% Crit Chance for the fight."
    }
  },
  "Pyrocarbon": {
    "name": "Pyrocarbon",
    "icon": "images/items/Pyrocarbon.avif",
    "tier": "Gold",
    "tags": [
      "Dooley",
      "Medium",
      "Burn",
      "Shield"
    ],
    "description": [
      "Cooldown 6 seconds",
      "Shield ( 75 » 150 ).",
      "When you gain Burn, this gains Haste for ( 2 » 4 ) second(s)."
    ],
    "cooldown": 6,
    "enchants": {
      "Heavy": "Slow 2 items for 2 second(s).",
      "Icy": "Freeze 1 item for 2 second(s).",
      "Turbo": "Haste 1 items for 2 second(s).",
      "Shielded": "Double Shield",
      "Restorative": "Heal 90.",
      "Toxic": "Poison 6.",
      "Fiery": "Burn 9.",
      "Shiny": "+1 Multicast",
      "Deadly": "+50% Crit Chance"
    }
  },
  "Race Carl": {
    "name": "Race Carl",
    "icon": "images/items/RaceCarl.avif",
    "tier": "Silver",
    "tags": [
      "Dooley",
      "Medium",
      "Damage",
      "Friend",
      "Haste",
      "Vehicle",
      "Weapon"
    ],
    "description": [
      "Cooldown 8 seconds",
      "Haste 1 item for ( 1 » 2 » 3 ) second(s).",
      "When you Haste, deal ( 10 » 20 » 30 ) damage."
    ],
    "cooldown": 8,
    "enchants": {
      "Heavy": "When you Haste, Slow 1 items for 1 second(s).",
      "Icy": "When you Haste, Freeze 1 item for 1 second(s).",
      "Turbo": "Double Haste",
      "Shielded": "When you Haste, Shield 10.",
      "Restorative": "When you Haste, Heal 20.",
      "Toxic": "When you Haste, Poison 1.",
      "Fiery": "When you Haste, Burn 2.",
      "Shiny": "+1 Multicast",
      "Deadly": "When you Haste, your items gain 6% Crit Chance for the fight.",
      "Obsidian": "Lifesteal"
    }
  },
  "Railgun": {
    "name": "Railgun",
    "icon": "images/items/Railgun.avif",
    "tier": "Gold",
    "tags": [
      "Dooley",
      "Large",
      "Charge",
      "Damage",
      "Weapon"
    ],
    "description": [
      "Cooldown 10 seconds",
      "Multicast 2",
      "Deal ( 100 » 200 ) damage.",
      "When you use the Core, charge this ( 1 » 2 ) second(s)."
    ],
    "cooldown": 10,
    "enchants": {
      "Heavy": "Slow 3 items for 2 second(s).",
      "Icy": "Freeze 1 item for 3 second(s).",
      "Turbo": "Haste 3 items for 2 second(s).",
      "Shielded": "Shield 75.",
      "Restorative": "Heal 110.",
      "Toxic": "Poison 7.",
      "Fiery": "Burn 11.",
      "Shiny": "+1 Multicast",
      "Deadly": "+50% Crit Chance",
      "Obsidian": "Lifesteal"
    }
  },
  "Rainbow Potion": {
    "name": "Rainbow Potion",
    "icon": "images/items/RainbowPotion.avif",
    "tier": "Gold",
    "tags": [
      "Mak",
      "Small",
      "Ammo",
      "Burn",
      "Freeze",
      "Poison",
      "Potion",
      "Slow"
    ],
    "description": [
      "Cooldown 7 seconds",
      "Ammo Max 1",
      "Burn ( 4 » 6 ).",
      "Poison ( 2 » 3 ).",
      "Freeze 1 item for ( 2 » 3 ) second(s).",
      "Slow 1 item for ( 4 » 6 ) second(s)."
    ],
    "cooldown": 7,
    "enchants": {
      "Heavy": "+1 Slow Targets",
      "Icy": "+1 Freeze Targets",
      "Shielded": "Shield 70.",
      "Restorative": "Heal 105.",
      "Toxic": "Double Poison",
      "Fiery": "Double Burn",
      "Shiny": "+1 Multicast",
      "Deadly": "+50% Crit Chance"
    }
  },
  "Ramrod": {
    "name": "Ramrod",
    "icon": "images/items/Ramrod.avif",
    "tier": "Silver",
    "tags": [
      "Vanessa",
      "Medium",
      "Ammo",
      "Tool"
    ],
    "description": [
      "Cooldown 8 seconds",
      "Reload adjacent Ammo items ( 1 » 2 » 3 ) Ammo and Haste them ( 1 » 2 » 3 ) second(s)."
    ],
    "cooldown": 8,
    "enchants": {
      "Heavy": "Slow 2 items for 1 second(s).",
      "Icy": "Freeze 1 item for 2 second(s).",
      "Turbo": "Double Haste",
      "Shielded": "Shield 40.",
      "Restorative": "Heal 60.",
      "Toxic": "Poison 4.",
      "Fiery": "Burn 6.",
      "Shiny": "+1 Multicast",
      "Deadly": "Adjacent Ammo items have +25% Crit Chance."
    }
  },
  "Red Gumball": {
    "name": "Red Gumball",
    "icon": "images/items/RedGumball.avif",
    "tier": "Bronze",
    "tags": [
      "Common",
      "Small",
      "Damage",
      "NonWeapon",
      "Passive"
    ],
    "description": [
      "When you sell this, your weapons gain ( 1 » 2 » 3 » 4 ) damage."
    ],
    "cooldown": null,
    "enchants": {}
  },
  "Red Piggles A": {
    "name": "Red Piggles A",
    "icon": "images/items/RedPigglesA.avif",
    "tier": "Bronze",
    "tags": [
      "Pygmalien",
      "Small",
      "Damage"
    ],
    "description": [
      "Cooldown 3 seconds",
      "Give your adjacent weapons ( +3 » +6 » +9 » +12 ) damage for the fight."
    ],
    "cooldown": 3,
    "enchants": {}
  },
  "Red Piggles L": {
    "name": "Red Piggles L",
    "icon": "images/items/RedPigglesL.avif",
    "tier": "Bronze",
    "tags": [
      "Pygmalien",
      "Small",
      "Damage"
    ],
    "description": [
      "Cooldown 3 seconds",
      "Give your weapon to the left of this ( +4 » +8 » +12 » +16 ) damage for the fight."
    ],
    "cooldown": 3,
    "enchants": {}
  },
  "Red Piggles R": {
    "name": "Red Piggles R",
    "icon": "images/items/RedPigglesR.avif",
    "tier": "Bronze",
    "tags": [
      "Pygmalien",
      "Small",
      "Damage"
    ],
    "description": [
      "Cooldown 3 seconds",
      "Give your weapon to the right of this ( +4 » +8 » +12 » +16 ) damage for the fight."
    ],
    "cooldown": 3,
    "enchants": {}
  },
  "Red Piggles X": {
    "name": "Red Piggles X",
    "icon": "images/items/RedPigglesX.avif",
    "tier": "Bronze",
    "tags": [
      "Pygmalien",
      "Small",
      "Damage"
    ],
    "description": [
      "Cooldown 3 seconds",
      "Your weapons gain ( 1 » 2 » 3 » 4 ) damage for the fight."
    ],
    "cooldown": 3,
    "enchants": {}
  },
  "Refractor": {
    "name": "Refractor",
    "icon": "images/items/Refractor.avif",
    "tier": "Silver",
    "tags": [
      "Mak",
      "Medium",
      "Burn",
      "Damage",
      "Freeze",
      "Poison",
      "Slow",
      "Weapon"
    ],
    "description": [
      "Cooldown 7 seconds",
      "Deal 20 damage.",
      "When you Slow, Freeze, Burn or Poison, this gains ( 10 » 20 » 30 ) damage for the fight."
    ],
    "cooldown": 7,
    "enchants": {
      "Heavy": "Slow 2 items for 2 second(s).",
      "Icy": "Freeze 1 item for 2 second(s).",
      "Turbo": "Haste 2 items for 2 second(s).",
      "Shielded": "Shield 70.",
      "Restorative": "Heal 105.",
      "Toxic": "Poison 7.",
      "Fiery": "Burn 10.",
      "Shiny": "+1 Multicast",
      "Deadly": "+50% Crit Chance",
      "Obsidian": "Lifesteal"
    }
  },
  "Regal Blade": {
    "name": "Regal Blade",
    "icon": "images/items/RegalBlade.avif",
    "tier": "Bronze",
    "tags": [
      "Pygmalien",
      "Medium",
      "Damage",
      "Weapon"
    ],
    "description": [
      "Cooldown 6 seconds",
      "Deal 10 damage.",
      "When you sell a Weapon, this gains ( 10 » 20 » 40 » 80 ) damage."
    ],
    "cooldown": 6,
    "enchants": {
      "Golden": "Your weapons have +1 value.",
      "Heavy": "Slow 2 items for 2 second(s).",
      "Icy": "Freeze 1 item for 2 second(s).",
      "Turbo": "Haste 2 items for 2 second(s).",
      "Shielded": "Shield 60.",
      "Restorative": "Heal 90.",
      "Toxic": "Poison 6.",
      "Fiery": "Burn 9.",
      "Shiny": "+1 Multicast",
      "Deadly": "+50% Crit Chance",
      "Obsidian": "Lifesteal"
    }
  },
  "Repeater": {
    "name": "Repeater",
    "icon": "images/items/Repeater.avif",
    "tier": "Silver",
    "tags": [
      "Vanessa",
      "Medium",
      "Ammo",
      "Damage",
      "Weapon"
    ],
    "description": [
      "Cooldown 6 seconds",
      "Ammo Max 6",
      "Deal ( 25 » 50 » 100 ) damage.",
      "When you use another Ammo item, use this."
    ],
    "cooldown": 6,
    "enchants": {
      "Heavy": "Slow 2 items for 2 second(s).",
      "Icy": "Freeze 1 item for 2 second(s).",
      "Turbo": "Haste 2 items for 2 second(s).",
      "Shielded": "Shield 60.",
      "Restorative": "Heal 90.",
      "Toxic": "Poison 6.",
      "Fiery": "Burn 9.",
      "Shiny": "+1 Multicast",
      "Deadly": "+50% Crit Chance",
      "Obsidian": "Lifesteal"
    }
  },
  "Revolver": {
    "name": "Revolver",
    "icon": "images/items/Revolver.avif",
    "tier": "Bronze",
    "tags": [
      "Vanessa",
      "Small",
      "Ammo",
      "Crit",
      "Damage",
      "Weapon"
    ],
    "description": [
      "Cooldown 4 seconds",
      "Ammo Max 6",
      "Crit Chance 20%",
      "Deal ( 5 » 15 » 30 » 50 ) damage.",
      "When you Crit, fully reload this."
    ],
    "cooldown": 4,
    "enchants": {
      "Heavy": "Slow 1 item for 1 second(s).",
      "Icy": "Freeze 1 item for 1 second(s).",
      "Turbo": "Haste 1 item for 1 second(s).",
      "Shielded": "Shield 20.",
      "Restorative": "Heal 30.",
      "Toxic": "Poison 2.",
      "Fiery": "Burn 3.",
      "Shiny": "+1 Multicast",
      "Deadly": "+50% Crit Chance",
      "Obsidian": "Lifesteal"
    }
  },
  "Rewards Card": {
    "name": "Rewards Card",
    "icon": "images/items/RewardsCard.avif",
    "tier": "Bronze",
    "tags": [
      "Pygmalien",
      "Small",
      "Value"
    ],
    "description": [
      "When you visit a Merchant, this and the item to the left of this gains ( 1 » 2 » 3 » 4 ) value."
    ],
    "cooldown": null,
    "enchants": {
      "Golden": "Double Value",
      "Shiny": "Double Value"
    }
  },
  "Rifle": {
    "name": "Rifle",
    "icon": "images/items/Rifle.avif",
    "tier": "Bronze",
    "tags": [
      "Vanessa",
      "Medium",
      "Ammo",
      "Damage",
      "Weapon"
    ],
    "description": [
      "Cooldown 2 seconds",
      "Ammo Max 1",
      "Deal ( 5 » 15 » 30 » 50 ) damage.",
      "When you use this, reload this 1 Ammo if it is your only weapon."
    ],
    "cooldown": 2,
    "enchants": {
      "Heavy": "Slow 2 items for 1 second(s).",
      "Icy": "Freeze 1 item for 1 second(s).",
      "Turbo": "Haste 2 items for 1 second(s).",
      "Shielded": "Shield 20.",
      "Restorative": "Heal 30.",
      "Toxic": "Poison 2.",
      "Fiery": "Burn 3.",
      "Shiny": "+1 Multicast",
      "Deadly": "+50% Crit Chance",
      "Obsidian": "Lifesteal"
    }
  },
  "Ritual Dagger": {
    "name": "Ritual Dagger",
    "icon": "images/items/RitualDagger.avif",
    "tier": "Bronze",
    "tags": [
      "Mak",
      "Small",
      "Active",
      "Damage",
      "Weapon"
    ],
    "description": [
      "Cooldown 4 seconds",
      "Lifesteal 100",
      "Deal ( 14 » 20 » 28 » 40 ) damage."
    ],
    "cooldown": 4,
    "enchants": {
      "Heavy": "Slow 1 item for 2 second(s).",
      "Icy": "Freeze 1 item for 2 second(s).",
      "Turbo": "Haste 1 item for 2 second(s).",
      "Shielded": "Shield 9.",
      "Restorative": "Heal 12.",
      "Toxic": "Poison 2.",
      "Fiery": "Burn 3.",
      "Shiny": "+1 Multicast",
      "Deadly": "+50% Crit Chance"
    }
  },
  "Rivet Gun": {
    "name": "Rivet Gun",
    "icon": "images/items/RivetGun.avif",
    "tier": "Silver",
    "tags": [
      "Stelle",
      "Small",
      "Charge",
      "Damage",
      "Tool",
      "Weapon"
    ],
    "description": [
      "Cooldown 9 seconds",
      "Deal ( 10 » 20 » 30 ) Damage.",
      "When you use the item to the right of this, Charge the item to the left of this ( 1 » 1 » 2 ) second(s)."
    ],
    "cooldown": 9,
    "enchants": {
      "Heavy": "When you use the item to the right of this, Slow 1 item for 2 second(s).",
      "Icy": "When you use the item to the right of this, Freeze 1 item for 1 second(s).",
      "Turbo": "When you use the item to the right of this, Haste 1 item for 2 second(s).",
      "Shielded": "When you use the item to the right of this, Shield 15.",
      "Restorative": "When you use the item to the right of this, Heal 20.",
      "Toxic": "When you use the item to the right of this, Poison 1.",
      "Fiery": "When you use the item to the right of this, Burn 2.",
      "Deadly": "When you use the item to the right of this, the item to the left of this gains 20% Crit Chance for the fight."
    }
  },
  "Robe": {
    "name": "Robe",
    "icon": "images/items/Robe.avif",
    "tier": "Silver",
    "tags": [
      "Pygmalien",
      "Medium",
      "Shield"
    ],
    "description": [
      "Cooldown 6 seconds",
      "Shield ( 5 » 10 » 15 ).",
      "When you Shield, your Shield items gain ( 1 » 2 » 3 ) Shield for the fight."
    ],
    "cooldown": 6,
    "enchants": {
      "Heavy": "Slow 2 items for 2 second(s).",
      "Icy": "Freeze 1 item for 2 second(s).",
      "Turbo": "Haste 2 items for 2 second(s).",
      "Shielded": "Double Shield",
      "Restorative": "When you Shield, your Heal items gain 2 Heal for the fight.",
      "Toxic": "When you Shield, your Poison items gain 1 Poison for the fight.",
      "Fiery": "When you Shield, your Burn items gain 1 Burn for the fight.",
      "Shiny": "+1 Multicast",
      "Deadly": "When you Shield, your items gain +6% Crit Chance for the fight."
    }
  },
  "Robotic Factory": {
    "name": "Robotic Factory",
    "icon": "images/items/RoboticFactory.avif",
    "tier": "Diamond",
    "tags": [
      "Dooley",
      "Large",
      "Property"
    ],
    "description": [
      "Your Friends have +1 Multicast."
    ],
    "cooldown": null,
    "enchants": {
      "Shiny": "+1 Multicast"
    }
  },
  "Rocket Boots": {
    "name": "Rocket Boots",
    "icon": "images/items/RocketBoots.avif",
    "tier": "Bronze",
    "tags": [
      "Common",
      "Medium",
      "Haste",
      "Tool"
    ],
    "description": [
      "Cooldown 4 seconds",
      "Haste adjacent items for ( 1 » 2 » 3 » 4 ) second(s).",
      "When you sell this, give your leftmost Haste item ( +1 » +2 » +3 » +4 ) Haste."
    ],
    "cooldown": 4,
    "enchants": {
      "Heavy": "Slow 2 items for 1 second(s).",
      "Icy": "Freeze 1 item for 1 second(s).",
      "Turbo": "Double Haste",
      "Shielded": "Shield 40.",
      "Restorative": "Heal 60.",
      "Toxic": "Poison 4.",
      "Fiery": "Burn 6.",
      "Shiny": "+1 Multicast",
      "Deadly": "+50% Crit Chance"
    }
  },
  "Rocket Launcher": {
    "name": "Rocket Launcher",
    "icon": "images/items/RocketLauncher.avif",
    "tier": "Silver",
    "tags": [
      "Dooley",
      "Medium",
      "Burn",
      "Damage",
      "Weapon"
    ],
    "description": [
      "Cooldown 6 seconds",
      "Multicast 3",
      "Deal ( 10 » 20 » 30 ) damage.",
      "Burn ( 2 » 4 » 6 ).",
      "While your enemy has Burn, this has double damage."
    ],
    "cooldown": 6,
    "enchants": {
      "Heavy": "Slow 2 items for 1 second(s).",
      "Icy": "Freeze 1 item for 1 second(s).",
      "Turbo": "Haste 2 items for 1 second(s).",
      "Shielded": "Shield 20.",
      "Restorative": "Heal 30.",
      "Toxic": "Poison 2.",
      "Fiery": "Double Burn",
      "Shiny": "+1 Multicast",
      "Deadly": "+50% Crit Chance",
      "Obsidian": "Lifesteal"
    }
  },
  "Rolling Pin": {
    "name": "Rolling Pin",
    "icon": "images/items/RollingPin.avif",
    "tier": "Bronze",
    "tags": [
      "Jules",
      "Medium",
      "Damage",
      "Haste",
      "Tool",
      "Weapon"
    ],
    "description": [
      "Cooldown 10 seconds",
      "Deal ( 15 » 45 » 90 » 150 ) Damage",
      "When this gains haste, give it ( +5 » +10 » +20 » +30 ) damage for the fight."
    ],
    "cooldown": 10,
    "enchants": {
      "Heavy": "Slow 2 items for 3 second(s).",
      "Icy": "Freeze 1 item for 3 second(s).",
      "Turbo": "Haste 2 items for 3 second(s).",
      "Shielded": "Shield 100.",
      "Restorative": "Heal 150.",
      "Toxic": "Poison 10.",
      "Fiery": "Burn 15.",
      "Shiny": "+1 Multicast",
      "Deadly": "+50% Crit Chance",
      "Obsidian": "Lifesteal"
    }
  },
  "Rowboat": {
    "name": "Rowboat",
    "icon": "images/items/Rowboat.avif",
    "tier": "Gold",
    "tags": [
      "Vanessa",
      "Medium",
      "Aquatic",
      "Haste",
      "Vehicle"
    ],
    "description": [
      "Cooldown 10 seconds",
      "Haste your Small items for ( 1 » 2 ) second(s).",
      "When you use an adjacent Aquatic item, Haste this ( 1 » 2 ) second(s)."
    ],
    "cooldown": 10,
    "enchants": {
      "Heavy": "Slow 2 items for 3 second(s).",
      "Icy": "Freeze 1 item for 3 second(s).",
      "Turbo": "Double Haste",
      "Shielded": "Shield 100.",
      "Restorative": "Heal 150.",
      "Toxic": "Poison 10.",
      "Fiery": "Burn 15.",
      "Shiny": "+1 Multicast",
      "Deadly": "Your small items have +20% Crit Chance."
    }
  },
  "Ruby": {
    "name": "Ruby",
    "icon": "images/items/Ruby.avif",
    "tier": "Silver",
    "tags": [
      "Mak",
      "Small",
      "Burn"
    ],
    "description": [
      "Cooldown 10 seconds",
      "Burn ( 4 » 6 » 8 ).",
      "Increase your other items' Burn by 2."
    ],
    "cooldown": 10,
    "enchants": {
      "Heavy": "Slow 1 item for 3 second(s).",
      "Icy": "Freeze 1 item for 1 second(s).",
      "Turbo": "Haste 1 item for 3 second(s).",
      "Shielded": "Shield 50.",
      "Restorative": "Heal 75.",
      "Toxic": "Poison 5.",
      "Fiery": "Double Burn",
      "Shiny": "+1 Multicast",
      "Deadly": "+50% Crit Chance"
    }
  },
  "Rune Axe": {
    "name": "Rune Axe",
    "icon": "images/items/RuneAxe.avif",
    "tier": "Bronze",
    "tags": [
      "Common",
      "Small",
      "Damage",
      "Weapon"
    ],
    "description": [
      "Cooldown 7 seconds",
      "Deal ( 10 » 30 » 60 » 100 ) damage.",
      "When you sell this, your weapons gain ( 1 » 2 » 3 » 4 ) Damage."
    ],
    "cooldown": 7,
    "enchants": {
      "Heavy": "Slow 1 item for 2 second(s).",
      "Icy": "Freeze 1 item for 1 second(s).",
      "Turbo": "Haste 1 item for 2 second(s).",
      "Shielded": "Shield 35.",
      "Restorative": "Heal 50.",
      "Toxic": "Poison 3.",
      "Fiery": "Burn 5.",
      "Shiny": "+1 Multicast",
      "Deadly": "+50% Crit Chance",
      "Obsidian": "Lifesteal"
    }
  },
  "Runic Double Bow": {
    "name": "Runic Double Bow",
    "icon": "images/items/RunicDoubleBow.avif",
    "tier": "Bronze",
    "tags": [
      "Mak",
      "Medium",
      "Damage",
      "Lifesteal",
      "Weapon"
    ],
    "description": [
      "Cooldown 6 seconds",
      "Multicast 2",
      "Lifesteal 100",
      "Deal ( 10 » 30 » 60 » 100 ) Damage.",
      "This deals double Crit damage."
    ],
    "cooldown": 6,
    "enchants": {
      "Heavy": "Slow 2 items for 1 second(s).",
      "Icy": "Freeze 1 item for 1 second(s).",
      "Turbo": "Haste 2 items for 1 second(s).",
      "Shielded": "Shield 30.",
      "Restorative": "Heal 45.",
      "Toxic": "Poison 3.",
      "Fiery": "Burn 4.",
      "Shiny": "+1 Multicast",
      "Deadly": "+50% Crit Chance"
    }
  },
  "Runic Great Axe": {
    "name": "Runic Great Axe",
    "icon": "images/items/RunicGreatAxe.avif",
    "tier": "Bronze",
    "tags": [
      "Mak",
      "Large",
      "Damage",
      "Lifesteal",
      "Weapon"
    ],
    "description": [
      "Cooldown 10 seconds",
      "Lifesteal 100",
      "Deal ( 10 » 30 » 60 » 100 ) damage.",
      "Your Weapons with lifesteal gain ( +10 » +30 » +60 » +100 ) damage for the fight."
    ],
    "cooldown": 10,
    "enchants": {
      "Heavy": "Slow 3 items for 3 second(s).",
      "Icy": "Freeze 1 item for 4 second(s).",
      "Turbo": "Haste 3 items for 3 second(s).",
      "Shielded": "Shield 150.",
      "Restorative": "Heal 225.",
      "Toxic": "Poison 15.",
      "Fiery": "Burn 22.",
      "Shiny": "+1 Multicast",
      "Deadly": "+50% Crit Chance"
    }
  },
  "Safe": {
    "name": "Safe",
    "icon": "images/items/Safe.avif",
    "tier": "Bronze",
    "tags": [
      "Pygmalien",
      "Medium",
      "Economy"
    ],
    "description": [
      "When you sell this, get 3 Spare Change."
    ],
    "cooldown": null,
    "enchants": {}
  },
  "Salamander Pup": {
    "name": "Salamander Pup",
    "icon": "images/items/SalamanderPup.avif",
    "tier": "Bronze",
    "tags": [
      "Common",
      "Medium",
      "Burn",
      "Friend"
    ],
    "description": [
      "Cooldown 8 seconds",
      "Burn ( 4 » 6 » 8 » 10 ).",
      "When you sell this, your leftmost Burn item gains ( +3 » +4 » +5 » +6 ) Burn."
    ],
    "cooldown": 8,
    "enchants": {
      "Heavy": "Slow 2 items for 3 second(s).",
      "Icy": "Freeze 1 item for 3 second(s).",
      "Turbo": "Haste 2 items for 3 second(s).",
      "Shielded": "Shield 80.",
      "Restorative": "Heal 120.",
      "Toxic": "Poison 8.",
      "Fiery": "Double Burn",
      "Shiny": "+1 Multicast",
      "Deadly": "+50% Crit Chance"
    }
  },
  "Sapphire": {
    "name": "Sapphire",
    "icon": "images/items/Sapphire.avif",
    "tier": "Silver",
    "tags": [
      "Mak",
      "Small",
      "Freeze"
    ],
    "description": [
      "Cooldown 8 seconds",
      "Freeze 1 item for ( 3 » 4 » 5 ) second(s).",
      "Increase your other items' Freeze by 1 second(s)."
    ],
    "cooldown": 8,
    "enchants": {
      "Heavy": "Slow 1 item for 2 second(s).",
      "Icy": "+1 Freeze Targets",
      "Turbo": "Haste 1 item for 2 second(s).",
      "Shielded": "Shield 40.",
      "Restorative": "Heal 60.",
      "Toxic": "Poison 4.",
      "Fiery": "Burn 6.",
      "Shiny": "+1 Multicast"
    }
  },
  "Satchel": {
    "name": "Satchel",
    "icon": "images/items/Satchel.avif",
    "tier": "Bronze",
    "tags": [
      "Mak",
      "Medium",
      "Ammo",
      "Regen",
      "Tool"
    ],
    "description": [
      "Cooldown 8 seconds",
      "Reload a potion.",
      "You have ( 4 » 8 » 12 » 12 ) Regeneration.",
      "When you buy a Potion, increase the Regeneration this item gives by ( 1 » 2 » 3 » 3 )."
    ],
    "cooldown": 8,
    "enchants": {
      "Heavy": "Slow 2 items for 2 second(s).",
      "Icy": "Freeze 1 item for 2 second(s).",
      "Turbo": "Haste 2 items for 2 second(s).",
      "Shielded": "Shield 70.",
      "Restorative": "Heal 105.",
      "Toxic": "Poison 7.",
      "Fiery": "Burn 10.",
      "Shiny": "+1 Multicast",
      "Deadly": "+50% Crit Chance"
    }
  },
  "Schematics": {
    "name": "Schematics",
    "icon": "images/items/Schematics.avif",
    "tier": "Bronze",
    "tags": [
      "Dooley",
      "Medium",
      "Crit",
      "Economy",
      "Value"
    ],
    "description": [
      "When you upgrade an item, this gains ( 1 » 2 » 3 » 4 ) value.",
      "When you sell this, give the Core + Crit Chance equal to this item's value.",
      "Your items have + Crit Chance equal to this item's value."
    ],
    "cooldown": null,
    "enchants": {
      "Golden": "Double Value",
      "Shiny": "This gains double value when an item is upgraded.",
      "Deadly": "Double Crit Chance"
    }
  },
  "Scrap": {
    "name": "Scrap",
    "icon": "images/items/Scrap.avif",
    "tier": "Bronze",
    "tags": [
      "Common",
      "Small",
      "Toughness"
    ],
    "description": [
      "When you sell this, give your leftmost Shield item ( +4 » +8 » +12 » +16 ) Shield."
    ],
    "cooldown": null,
    "enchants": {}
  },
  "Scrap Metal": {
    "name": "Scrap Metal",
    "icon": "images/items/ScrapMetal.avif",
    "tier": "Gold",
    "tags": [
      "Dooley",
      "Medium",
      "Cooldown"
    ],
    "description": [
      "When you sell this, upgrade The Core. ( » and reduce its cooldown by 1 second(s ).)"
    ],
    "cooldown": null,
    "enchants": {
      "Heavy": "And make the item Heavy if able.",
      "Icy": "And make the item Icy if able.",
      "Turbo": "And make the item Turbo if able.",
      "Shielded": "And make the item Shielded if able.",
      "Restorative": "And make the item Restorative if able.",
      "Toxic": "And make the item Toxic if able.",
      "Fiery": "And make the item Fiery if able.",
      "Shiny": "And make the item Shiny if able.",
      "Deadly": "And make the item Deadly if able.",
      "Radiant": "And make the item Radiant if able.",
      "Obsidian": "And make the item Obsidian if able."
    }
  },
  "Scythe": {
    "name": "Scythe",
    "icon": "images/items/Scythe.avif",
    "tier": "Legendary",
    "tags": [
      "Common",
      "Medium",
      "Damage",
      "Weapon"
    ],
    "description": [
      "Cooldown 10 seconds",
      "Deal damage equal to a third of your enemy's max health."
    ],
    "cooldown": 10,
    "enchants": {
      "Heavy": "Slow 2 items for 2 second(s).",
      "Icy": "Freeze 1 item for 2 second(s).",
      "Turbo": "Haste 2 items for 2 second(s).",
      "Shielded": "Shield equal to a third of your enemy's max health..",
      "Restorative": "Heal equal to a third of your enemy's max health.",
      "Toxic": "Poison 6.",
      "Fiery": "Burn 9.",
      "Shiny": "+1 Multicast",
      "Deadly": "+50% Crit Chance",
      "Obsidian": "Lifesteal"
    }
  },
  "Sea Shell": {
    "name": "Sea Shell",
    "icon": "images/items/SeaShell.avif",
    "tier": "Bronze",
    "tags": [
      "Vanessa",
      "Small",
      "Aquatic",
      "Shield"
    ],
    "description": [
      "Cooldown 5 seconds",
      "Shield ( 5 » 15 » 30 » 50 ) for each aquatic item you have."
    ],
    "cooldown": 5,
    "enchants": {
      "Heavy": "Slow 1 item for 1 second(s).",
      "Icy": "Freeze 1 item for 1 second(s).",
      "Turbo": "Haste 1 item for 1 second(s).",
      "Shielded": "Double Shield",
      "Restorative": "Heal 30 for each Aquatic item you have.",
      "Toxic": "Poison 1 for each Aquatic item you have.",
      "Fiery": "Burn 2 for each Aquatic item you have.",
      "Shiny": "+1 Multicast",
      "Deadly": "+50% Crit Chance"
    }
  },
  "Seaweed": {
    "name": "Seaweed",
    "icon": "images/items/Seaweed.avif",
    "tier": "Silver",
    "tags": [
      "Vanessa",
      "Small",
      "Aquatic",
      "Heal"
    ],
    "description": [
      "Cooldown 6 seconds",
      "Heal 10.",
      "When you use an Aquatic item, this gains ( 10 » 15 » 20 ) Heal for the fight."
    ],
    "cooldown": 6,
    "enchants": {
      "Heavy": "Slow 1 item for 2 second(s).",
      "Icy": "Freeze 1 item for 1 second(s).",
      "Turbo": "Haste 1 item for 2 second(s).",
      "Shielded": "Shield 30.",
      "Restorative": "Double Heal",
      "Toxic": "Poison 3.",
      "Fiery": "Burn 4.",
      "Shiny": "+1 Multicast",
      "Deadly": "+50% Crit Chance"
    }
  },
  "Security Camera": {
    "name": "Security Camera",
    "icon": "images/items/SecurityCamera.avif",
    "tier": "Bronze",
    "tags": [
      "Dooley",
      "Medium",
      "Crit",
      "Shield"
    ],
    "description": [
      "Cooldown 8 seconds",
      "Shield ( 20 » 40 » 80 » 120 ).",
      "Your Shield items have ( +20% » +30% » +40% » +50% ) Crit Chance."
    ],
    "cooldown": 8,
    "enchants": {
      "Heavy": "Slow 2 items for 3 second(s).",
      "Icy": "Freeze 1 item for 3 second(s).",
      "Turbo": "Haste 2 items for 3 second(s).",
      "Shielded": "Double Shield",
      "Restorative": "Heal 120.",
      "Toxic": "Poison 8.",
      "Fiery": "Burn 12.",
      "Shiny": "+1 Multicast",
      "Deadly": "+50% Crit Chance"
    }
  },
  "Sextant": {
    "name": "Sextant",
    "icon": "images/items/Sextant.avif",
    "tier": "Silver",
    "tags": [
      "Vanessa",
      "Medium",
      "Aquatic",
      "Crit",
      "Haste",
      "Tool"
    ],
    "description": [
      "When you Crit, Haste an item for ( 1 » 2 » 3 ) second(s).",
      "Adjacent items have ( +15% » +30% » +50% ) Crit Chance."
    ],
    "cooldown": null,
    "enchants": {
      "Heavy": "When you Crit, Slow 1 items for 2 second(s).",
      "Icy": "When you Crit, Freeze 1 item for 1 second(s).",
      "Turbo": "Double Haste",
      "Shielded": "When you Crit, Shield 15.",
      "Restorative": "When you Crit, Heal 20.",
      "Toxic": "When you Crit, Poison 1.",
      "Fiery": "When you Crit, Burn 2.",
      "Shiny": "This has double Crit Chance bonus and Haste duration.",
      "Deadly": "Adjacent items have an additional +25% Crit Chance"
    }
  },
  "Shadowed Cloak": {
    "name": "Shadowed Cloak",
    "icon": "images/items/ShadowedCloak.avif",
    "tier": "Bronze",
    "tags": [
      "Common",
      "Medium",
      "Damage",
      "Haste"
    ],
    "description": [
      "When you use the item to the right of this, Haste it for ( 1 » 2 » 3 » 4 ) second(s). If it is a weapon, it also gains ( +3 » +5 » +7 » +9 ) damage for the fight."
    ],
    "cooldown": null,
    "enchants": {
      "Heavy": "When you use the item to the right of this, Slow 1 item for 3 second(s).",
      "Icy": "When you use the item to the right of this, Freeze 1 item for 1 second(s).",
      "Turbo": "Double Haste",
      "Shielded": "When you use the item to the right of this, shield 20.",
      "Restorative": "When you use the item to the right of this, heal 30.",
      "Toxic": "When you use the item to the right of this, poison 2.",
      "Fiery": "When you use the item to the right of this, burn 3."
    }
  },
  "Sharkclaws": {
    "name": "Sharkclaws",
    "icon": "images/items/Sharkclaws.avif",
    "tier": "Bronze",
    "tags": [
      "Vanessa",
      "Medium",
      "Aquatic",
      "Damage",
      "Weapon"
    ],
    "description": [
      "Cooldown 4 seconds",
      "Deal ( 5 » 15 » 10 » 15 ) damage.",
      "Your weapons gain ( 3 » 6 » 10 » 20 ) damage for the fight."
    ],
    "cooldown": 4,
    "enchants": {
      "Heavy": "Slow 2 items for 1 second(s).",
      "Icy": "Freeze 1 item for 1 second(s).",
      "Turbo": "Haste 2 items for 1 second(s).",
      "Shielded": "Shield 40.",
      "Restorative": "Heal 60.",
      "Toxic": "Poison 4.",
      "Fiery": "Burn 6.",
      "Shiny": "+1 Multicast",
      "Deadly": "+50% Crit Chance",
      "Obsidian": "Lifesteal"
    }
  },
  "Sharkray": {
    "name": "Sharkray",
    "icon": "images/items/Sharkray.avif",
    "tier": "Gold",
    "tags": [
      "Vanessa",
      "Medium",
      "Aquatic",
      "Damage",
      "Friend",
      "Haste",
      "Weapon"
    ],
    "description": [
      "Cooldown 7 seconds",
      "Deal 25 damage.",
      "When you Haste, this gains ( 25 » 50 ) damage for the fight."
    ],
    "cooldown": 7,
    "enchants": {
      "Heavy": "Slow 2 items for 2 second(s).",
      "Icy": "Freeze 1 item for 2 second(s).",
      "Turbo": "Haste 2 items for 2 second(s).",
      "Shielded": "Shield 70.",
      "Restorative": "Heal 105.",
      "Toxic": "Poison 7.",
      "Fiery": "Burn 10.",
      "Shiny": "+1 Multicast",
      "Deadly": "+50% Crit Chance",
      "Obsidian": "Lifesteal"
    }
  },
  "Sharpening Stone": {
    "name": "Sharpening Stone",
    "icon": "images/items/SharpeningStone.avif",
    "tier": "Bronze",
    "tags": [
      "Common",
      "Small",
      "Damage"
    ],
    "description": [
      "When you sell this, your leftmost Weapon gains ( 3 » 6 » 9 » 12 ) Damage."
    ],
    "cooldown": null,
    "enchants": {}
  },
  "Shield Potion": {
    "name": "Shield Potion",
    "icon": "images/items/ShieldPotion.avif",
    "tier": "Bronze",
    "tags": [
      "Mak",
      "Small",
      "Ammo",
      "Potion",
      "Shield"
    ],
    "description": [
      "Cooldown 4 seconds",
      "Ammo Max 1",
      "Shield ( 40 » 80 » 150 » 300 )."
    ],
    "cooldown": 4,
    "enchants": {
      "Heavy": "Slow 1 item for 2 second(s).",
      "Icy": "Freeze 1 item for 1 second(s).",
      "Turbo": "Haste 1 item for 2 second(s).",
      "Shielded": "Double Shield",
      "Restorative": "Heal 60.",
      "Toxic": "Poison 4.",
      "Fiery": "Burn 6.",
      "Shiny": "+1 Multicast",
      "Deadly": "+50% Crit Chance"
    }
  },
  "Shipment": {
    "name": "Shipment",
    "icon": "images/items/Shipment.avif",
    "tier": "Silver",
    "tags": [
      "Pygmalien",
      "Large",
      "Economy"
    ],
    "description": [
      "When you sell this, get 3 Small items from any hero.",
      "This item has no base Value."
    ],
    "cooldown": null,
    "enchants": {}
  },
  "Shipwreck": {
    "name": "Shipwreck",
    "icon": "images/items/Shipwreck.avif",
    "tier": "Diamond",
    "tags": [
      "Vanessa",
      "Large",
      "Aquatic",
      "Vehicle"
    ],
    "description": [
      "Your Aquatic items have +1 Multicast."
    ],
    "cooldown": null,
    "enchants": {
      "Heavy": "When you use an aquatic item, slow 1 item for 3 second(s).",
      "Icy": "When you use an aquatic item, freeze 1 item for 1 second(s).",
      "Turbo": "When you use an aquatic item, Haste 1 for 3 second(s).",
      "Shielded": "When you use an aquatic item, shield 20.",
      "Restorative": "When you use an aquatic item, heal 30.",
      "Toxic": "When you use an aquatic item, poison 2.",
      "Fiery": "When you use an aquatic item, burn 3.",
      "Shiny": "+1 Multicast",
      "Deadly": "Your Aquatic items have +10% Crit Chance.",
      "Radiant": "-1000 Freeze"
    }
  },
  "Shoe Blade": {
    "name": "Shoe Blade",
    "icon": "images/items/ShoeBlade.avif",
    "tier": "Bronze",
    "tags": [
      "Vanessa",
      "Small",
      "Damage",
      "Weapon"
    ],
    "description": [
      "Cooldown 6 seconds",
      "Crit Chance ( 15% » 30% » 50% » 100% )",
      "Deal ( 10 » 30 » 60 » 100 ) damage."
    ],
    "cooldown": 6,
    "enchants": {
      "Heavy": "Slow 1 item for 2 second(s).",
      "Icy": "Freeze 1 item for 1 second(s).",
      "Turbo": "Haste 1 item for 2 second(s).",
      "Shielded": "Shield 30.",
      "Restorative": "Heal 45.",
      "Toxic": "Poison 3.",
      "Fiery": "Burn 4.",
      "Shiny": "+1 Multicast",
      "Deadly": "+100 Damage Crit",
      "Obsidian": "Lifesteal"
    }
  },
  "Shovel": {
    "name": "Shovel",
    "icon": "images/items/Shovel.avif",
    "tier": "Bronze",
    "tags": [
      "Vanessa",
      "Medium",
      "Damage",
      "Tool",
      "Weapon"
    ],
    "description": [
      "Cooldown 10 seconds",
      "Deal ( 10 » 30 » 60 » 100 ) damage.",
      "At the start of each day, get a small item from any hero."
    ],
    "cooldown": 10,
    "enchants": {
      "Heavy": "Slow 2 items for 3 second(s).",
      "Icy": "Freeze 1 item for 3 second(s).",
      "Turbo": "Haste 2 items for 3 second(s).",
      "Shielded": "Shield 100.",
      "Restorative": "Heal 150.",
      "Toxic": "Poison 10.",
      "Fiery": "Burn 15.",
      "Shiny": "+1 Multicast",
      "Deadly": "+50% Crit Chance",
      "Obsidian": "Lifesteal"
    }
  },
  "Signet Ring": {
    "name": "Signet Ring",
    "icon": "images/items/SignetRing.avif",
    "tier": "Gold",
    "tags": [
      "Pygmalien",
      "Small",
      "Health",
      "Income"
    ],
    "description": [
      "At the start of each hour, gain ( 10 » 20 » 30 ) Max Health.",
      "You have ( +1 » +2 » +3 ) Income."
    ],
    "cooldown": null,
    "enchants": {
      "Golden": "Double Income",
      "Shiny": "Double Health Max"
    }
  },
  "Silencer": {
    "name": "Silencer",
    "icon": "images/items/Silencer.avif",
    "tier": "Bronze",
    "tags": [
      "Vanessa",
      "Small",
      "Cooldown",
      "Damage"
    ],
    "description": [
      "The weapon to the left of this has ( +10 » +20 » +30 » +50 ) damage.",
      "If you have exactly one weapon, reduce its cooldown by ( 10% » 20% » 30% » 40% )."
    ],
    "cooldown": null,
    "enchants": {
      "Heavy": "When you use the weapon to the left, Slow 1 item for 1 second(s).",
      "Icy": "When you use the weapon to the left, Freeze 1 item for 1 second(s).",
      "Turbo": "When you use the weapon to the left, haste it for 2 second(s).",
      "Shielded": "When you use the weapon to the left, shield 8.",
      "Restorative": "When you use the weapon to the left, heal 10.",
      "Toxic": "When you use the weapon to the left, poison 1.",
      "Fiery": "When you use the weapon to the left, burn 2.",
      "Shiny": "Double Damage",
      "Deadly": "The Weapon to the left of this has +50% Crit Chance."
    }
  },
  "Silk": {
    "name": "Silk",
    "icon": "images/items/Silk.avif",
    "tier": "Bronze",
    "tags": [
      "Pygmalien",
      "Medium",
      "Shield"
    ],
    "description": [
      "Cooldown 7 seconds",
      "Shield 10.",
      "When you sell another non-weapon item, this gains Shield ( 5 » 10 » 15 » 20 )."
    ],
    "cooldown": 7,
    "enchants": {
      "Golden": "Your non-weapon items have +1 value.",
      "Heavy": "Slow 2 items for 3 second(s).",
      "Icy": "Freeze 1 item for 4 second(s).",
      "Turbo": "Haste 2 items for 3 second(s).",
      "Shielded": "Double Shield",
      "Restorative": "Heal 105.",
      "Toxic": "Poison 7.",
      "Fiery": "Burn 10.",
      "Shiny": "+1 Multicast",
      "Deadly": "+50% Crit Chance"
    }
  },
  "Singularity": {
    "name": "Singularity",
    "icon": "images/items/Singularity.avif",
    "tier": "Legendary",
    "tags": [
      "Common",
      "Small"
    ],
    "description": [
      "Cooldown 15 seconds",
      "Destroy a small enemy item for the fight."
    ],
    "cooldown": 15,
    "enchants": {
      "Heavy": "Slow 1 item for 4 second(s).",
      "Icy": "Freeze 1 item for 2 second(s).",
      "Turbo": "Haste 1 item for 4 second(s).",
      "Shielded": "Shield 60.",
      "Restorative": "Heal 90.",
      "Toxic": "Poison 6.",
      "Fiery": "Burn 9.",
      "Shiny": "+1 Multicast"
    }
  },
  "Sirens": {
    "name": "Sirens",
    "icon": "images/items/Sirens.avif",
    "tier": "Silver",
    "tags": [
      "Stelle",
      "Medium",
      "Haste",
      "Slow"
    ],
    "description": [
      "Cooldown 7 seconds",
      "Slow 1 item for ( 2 » 4 » 6 ) second(s).",
      "When you slow, Haste a Vehicle for ( 2 » 4 » 6 ) second(s)."
    ],
    "cooldown": 7,
    "enchants": {
      "Heavy": "+1 Slow Targets",
      "Icy": "Freeze 1 item for 2 second(s).",
      "Turbo": "Double Haste",
      "Shielded": "Shield 70.",
      "Restorative": "Heal 105.",
      "Toxic": "Poison 7.",
      "Fiery": "Burn 10.",
      "Shiny": "+1 Multicast",
      "Deadly": "Your Vehicles have +50% Crit Chance."
    }
  },
  "Skyscraper": {
    "name": "Skyscraper",
    "icon": "images/items/Skyscraper.avif",
    "tier": "Diamond",
    "tags": [
      "Pygmalien",
      "Large",
      "Damage",
      "Economy",
      "Property",
      "Value",
      "Weapon"
    ],
    "description": [
      "Cooldown 6 seconds",
      "Deal damage equal to 3 times the value of your items.",
      "This has double value in combat.",
      "If you have 4 or fewer items in-play, this has +1 Multicast."
    ],
    "cooldown": 6,
    "enchants": {
      "Heavy": "Slow 3 items for 2 second(s).",
      "Icy": "Freeze 1 item for 3 second(s).",
      "Turbo": "Haste 3 items for 2 second(s).",
      "Shielded": "Shield 0.",
      "Restorative": "Heal equal to triple the value of your items.",
      "Toxic": "Poison 7.",
      "Fiery": "Burn 11.",
      "Shiny": "+1 Multicast",
      "Deadly": "+50% Crit Chance",
      "Obsidian": "Lifesteal"
    }
  },
  "Sleeping Potion": {
    "name": "Sleeping Potion",
    "icon": "images/items/SleepingPotion.avif",
    "tier": "Bronze",
    "tags": [
      "Mak",
      "Small",
      "Ammo",
      "Potion",
      "Slow"
    ],
    "description": [
      "Cooldown 5 seconds",
      "Ammo Max 1",
      "Slow 2 items for ( 4 » 6 » 8 » 10 ) second(s)."
    ],
    "cooldown": 5,
    "enchants": {
      "Heavy": "+1 Slow Targets",
      "Icy": "Freeze 1 item for 1 second(s).",
      "Turbo": "Haste 1 item for 3 second(s).",
      "Shielded": "Shield 50.",
      "Restorative": "Heal 75.",
      "Toxic": "Poison 5.",
      "Fiery": "Burn 7.",
      "Shiny": "+1 Multicast"
    }
  },
  "Slingshot": {
    "name": "Slingshot",
    "icon": "images/items/Slingshot.avif",
    "tier": "Bronze",
    "tags": [
      "Pygmalien",
      "Small",
      "Ammo",
      "Damage",
      "Weapon"
    ],
    "description": [
      "Cooldown 3 seconds",
      "Deal ( 10 » 30 » 60 » 100 ) damage.",
      "This has ( +1 » +2 » +3 » +4 ) Max Ammo for each small item you have. [0]"
    ],
    "cooldown": 3,
    "enchants": {
      "Golden": "This has double value.",
      "Heavy": "Slow 1 item for 2 second(s).",
      "Icy": "Freeze 1 item for 1 second(s).",
      "Turbo": "Haste 1 item for 2 second(s).",
      "Shielded": "Shield 40.",
      "Restorative": "Heal 60.",
      "Toxic": "Poison 4.",
      "Fiery": "Burn 6.",
      "Shiny": "+1 Multicast",
      "Deadly": "+50% Crit Chance",
      "Obsidian": "Lifesteal"
    }
  },
  "Sniper Rifle": {
    "name": "Sniper Rifle",
    "icon": "images/items/SniperRifle.avif",
    "tier": "Silver",
    "tags": [
      "Vanessa",
      "Medium",
      "Damage",
      "Weapon"
    ],
    "description": [
      "Cooldown 10 seconds",
      "Deal 100 damage.",
      "This deals ( 3 » 5 » 10 ) times more damage if it is your only weapon."
    ],
    "cooldown": 10,
    "enchants": {
      "Heavy": "Slow 2 items for 3 second(s).",
      "Icy": "Freeze 1 item for 3 second(s).",
      "Turbo": "Haste 2 items for 3 second(s).",
      "Shielded": "Shield 100.",
      "Restorative": "Heal 150.",
      "Toxic": "Poison 10.",
      "Fiery": "Burn 15.",
      "Shiny": "+1 Multicast",
      "Deadly": "+50% Crit Chance",
      "Obsidian": "Lifesteal"
    }
  },
  "Snow Globe": {
    "name": "Snow Globe",
    "icon": "images/items/SnowGlobe.avif",
    "tier": "Silver",
    "tags": [
      "Pygmalien",
      "Medium",
      "Freeze",
      "Property"
    ],
    "description": [
      "Cooldown 6 seconds",
      "Freeze 1 item for ( 1 » 2 » 3 ) second(s).",
      "This has +1 Multicast for each adjacent to a Property."
    ],
    "cooldown": 6,
    "enchants": {
      "Heavy": "Slow 2 items for 1 second(s).",
      "Icy": "Double Freeze",
      "Turbo": "Haste 2 items for 1 second(s).",
      "Shielded": "Shield 30.",
      "Restorative": "Heal 45.",
      "Toxic": "Poison 3.",
      "Fiery": "Burn 4.",
      "Shiny": "+1 Multicast",
      "Deadly": "Adjacent properties have +25% Crit Chance."
    }
  },
  "Snowflake": {
    "name": "Snowflake",
    "icon": "images/items/Snowflake.avif",
    "tier": "Diamond",
    "tags": [
      "Common",
      "Small",
      "Freeze",
      "NonWeapon",
      "Passive"
    ],
    "description": [
      "When you sell this, your leftmost Freeze item gains 1 second to Freeze."
    ],
    "cooldown": null,
    "enchants": {}
  },
  "Solar Farm": {
    "name": "Solar Farm",
    "icon": "images/items/SolarFarm.avif",
    "tier": "Silver",
    "tags": [
      "Dooley",
      "Large",
      "Burn",
      "Cooldown",
      "Haste",
      "Property"
    ],
    "description": [
      "Cooldown 8 seconds",
      "Give your other items Haste for ( 2 » 3 » 4 ) second(s).",
      "While you or your enemy have Burn, reduce this item's cooldown by 50%."
    ],
    "cooldown": 8,
    "enchants": {
      "Heavy": "Slow 3 items for 3 second(s).",
      "Icy": "Freeze 1 item for 4 second(s).",
      "Turbo": "Double Haste",
      "Shielded": "Shield 120.",
      "Restorative": "Heal 180.",
      "Toxic": "Poison 12.",
      "Fiery": "Burn 18.",
      "Shiny": "+1 Multicast",
      "Deadly": "Your items gain +10% Crit Chance for the fight."
    }
  },
  "Soldering Gun": {
    "name": "Soldering Gun",
    "icon": "images/items/SolderingGun.avif",
    "tier": "Silver",
    "tags": [
      "Dooley",
      "Small",
      "Burn",
      "Tool"
    ],
    "description": [
      "Cooldown 5 seconds",
      "Burn ( 1 » 2 » 3 ).",
      "This has +1 Multicast if it is adjacent to a Friend.",
      "This has +1 Multicast if it is adjacent to a Tool."
    ],
    "cooldown": 5,
    "enchants": {
      "Heavy": "Slow 1 item for 1 second(s).",
      "Icy": "Freeze 1 item for 1 second(s).",
      "Turbo": "Haste 1 item for 1 second(s).",
      "Shielded": "Shield 15.",
      "Restorative": "Heal 20.",
      "Toxic": "Poison 1.",
      "Fiery": "Double Burn",
      "Shiny": "+1 Multicast",
      "Deadly": "+50% Crit Chance"
    }
  },
  "Soul of the District": {
    "name": "Soul of the District",
    "icon": "images/items/SouloftheDistrict.avif",
    "tier": "Legendary",
    "tags": [
      "Common",
      "Medium",
      "Damage",
      "Health",
      "Shield",
      "Weapon"
    ],
    "description": [
      "Cooldown 12 seconds",
      "Shield equal to your current Health.",
      "Deal damage equal to your shield."
    ],
    "cooldown": 12,
    "enchants": {
      "Heavy": "Slow 2 items for 4 second(s).",
      "Icy": "Freeze 1 item for 4 second(s).",
      "Turbo": "Haste 2 items for 4 second(s).",
      "Shielded": "Double Shield",
      "Restorative": "Heal equal to your current Shield.",
      "Toxic": "Poison 12.",
      "Fiery": "Burn 18.",
      "Shiny": "+1 Multicast",
      "Deadly": "+50% Crit Chance",
      "Obsidian": "Lifesteal"
    }
  },
  "Soul Ring": {
    "name": "Soul Ring",
    "icon": "images/items/SoulRing.avif",
    "tier": "Silver",
    "tags": [
      "Mak",
      "Small",
      "Poison",
      "Regen"
    ],
    "description": [
      "Cooldown 8 seconds",
      "Poison equal to your Regeneration.",
      "You have ( +1 » +2 » +3 ) Regeneration."
    ],
    "cooldown": 8,
    "enchants": {
      "Heavy": "Slow 1 item for 2 second(s).",
      "Icy": "Freeze 1 item for 1 second(s).",
      "Turbo": "Haste 1 item for 2 second(s).",
      "Shielded": "Shield 40.",
      "Restorative": "Heal 60.",
      "Toxic": "Double Poison",
      "Fiery": "Burn equal to your Regeneration.",
      "Shiny": "+1 Multicast",
      "Deadly": "+50% Crit Chance"
    }
  },
  "Spacescraper": {
    "name": "Spacescraper",
    "icon": "images/items/Spacescraper.avif",
    "tier": "Gold",
    "tags": [
      "Pygmalien",
      "Large",
      "Economy",
      "Property",
      "Shield",
      "Value"
    ],
    "description": [
      "Cooldown 6 seconds",
      "Shield equal to ( 2 » 3 ) times the value of your items.",
      "This has triple value in combat."
    ],
    "cooldown": 6,
    "enchants": {
      "Heavy": "Slow 3 items for 2 second(s).",
      "Icy": "Freeze 1 item for 3 second(s).",
      "Turbo": "Haste 3 items for 2 second(s).",
      "Shielded": "Double Shield",
      "Restorative": "Heal equal to triple the value of your items.",
      "Toxic": "Poison 6.",
      "Fiery": "Burn 9.",
      "Shiny": "+1 Multicast",
      "Deadly": "+50% Crit Chance"
    }
  },
  "Spare Change": {
    "name": "Spare Change",
    "icon": "images/items/SpareChange.avif",
    "tier": "Bronze",
    "tags": [
      "Common",
      "Small",
      "NonWeapon",
      "Passive"
    ],
    "description": [
      "Sells for gold"
    ],
    "cooldown": null,
    "enchants": {}
  },
  "Spices": {
    "name": "Spices",
    "icon": "images/items/Spices.avif",
    "tier": "Diamond",
    "tags": [
      "Pygmalien",
      "Small",
      "Ammo",
      "Damage"
    ],
    "description": [
      "Cooldown 8 seconds",
      "Ammo Max 1",
      "Your weapons gain damage equal to your weakest weapon's damage for the fight. [0]"
    ],
    "cooldown": 8,
    "enchants": {
      "Heavy": "Slow 2 item for 6 second(s).",
      "Icy": "Freeze 1 item for 6 second(s).",
      "Turbo": "Haste 2 items for 6 second(s).",
      "Shielded": "Your Shield items gain shield equal to your weakest Shield item's Shield for the fight.",
      "Restorative": "Your Heal items gain Heal equal to your weakest Heal item's Heal for the fight.",
      "Toxic": "Your Poison items gain Poison equal to your weakest Poison item's Poison for the fight.",
      "Fiery": "Your Burn items gain damage equal to your weakest Burn item's Burn for the fight.",
      "Shiny": "+1 Multicast",
      "Deadly": "Your items gain +25% Crit Chance for the fight."
    }
  },
  "Spiked Buckler": {
    "name": "Spiked Buckler",
    "icon": "images/items/SpikedBuckler.avif",
    "tier": "Bronze",
    "tags": [
      "Common",
      "Medium",
      "Damage",
      "Shield",
      "Tool",
      "Weapon"
    ],
    "description": [
      "Cooldown 8 seconds",
      "Deal ( 10 » 30 » 60 » 100 ) damage.",
      "Shield ( 10 » 30 » 60 » 100 ).",
      "When you sell this, your leftmost item gains ( +4 » +5 » +6 » +7 ) Damage if it is a Weapon and ( +4 » +5 » +6 » +7 ) Shield if it is a Shield item."
    ],
    "cooldown": 8,
    "enchants": {
      "Heavy": "Slow 2 items for 3 second(s).",
      "Icy": "Freeze 1 item for 3 second(s).",
      "Turbo": "Haste 2 items for 3 second(s).",
      "Shielded": "Double Shield",
      "Restorative": "Heal 120.",
      "Toxic": "Poison 8.",
      "Fiery": "Burn 12.",
      "Shiny": "+1 Multicast",
      "Deadly": "+50% Crit Chance",
      "Obsidian": "Lifesteal"
    }
  },
  "Spiky Shield": {
    "name": "Spiky Shield",
    "icon": "images/items/SpikyShield.avif",
    "tier": "Bronze",
    "tags": [
      "Pygmalien",
      "Medium",
      "Damage",
      "Shield",
      "Weapon"
    ],
    "description": [
      "Cooldown 8 seconds",
      "Shield ( 5 » 15 » 30 » 50 ).",
      "Deal damage equal to your shield."
    ],
    "cooldown": 8,
    "enchants": {
      "Heavy": "Slow 2 items for 3 second(s).",
      "Icy": "Freeze 1 item for 3 second(s).",
      "Turbo": "Haste 2 items for 3 second(s).",
      "Shielded": "Double Shield",
      "Restorative": "Heal equal to your Shield.",
      "Toxic": "Poison 8.",
      "Fiery": "Burn 12.",
      "Shiny": "+1 Multicast",
      "Deadly": "+50% Crit Chance",
      "Obsidian": "Lifesteal"
    }
  },
  "Spyglass": {
    "name": "Spyglass",
    "icon": "images/items/Spyglass.avif",
    "tier": "Gold",
    "tags": [
      "Vanessa",
      "Medium",
      "Cooldown",
      "Crit",
      "Tool"
    ],
    "description": [
      "Adjacent items have ( +25% » +50% ) Crit Chance.",
      "At the start of each fight, a random enemy item has its cooldown increased by ( 3 » 6 ) second(s)."
    ],
    "cooldown": null,
    "enchants": {
      "Heavy": "When you crit with an adjacent item, Slow 1 item for 3 second(s).",
      "Icy": "When you crit with an adjacent item, Freeze 1 item for 1 second(s).",
      "Turbo": "When you crit with an adjacent item, haste 1 item for 3 second(s).",
      "Shielded": "When you crit with an adjacent item, shield 20.",
      "Restorative": "When you crit with an adjacent item, heal 30.",
      "Toxic": "When you crit with an adjacent item, poison 2.",
      "Fiery": "When you crit with an adjacent item, burn 3.",
      "Shiny": "Double Crit Chance",
      "Deadly": "Double Crit Chance"
    }
  },
  "Stained Glass Window": {
    "name": "Stained Glass Window",
    "icon": "images/items/StainedGlassWindow.avif",
    "tier": "Gold",
    "tags": [
      "Pygmalien",
      "Medium",
      "Property",
      "Value"
    ],
    "description": [
      "When you win a fight with Stained Glass Window, your Properties gain ( 4 » 6 ) value.",
      "When you lose a fight with Stained Glass Window, your Properties lose 2 value.",
      "The Property to the right of this has double value in combat.",
      "If you have 4 or fewer items in-play, their cooldowns are reduced ( 10% » 20% )."
    ],
    "cooldown": null,
    "enchants": {
      "Golden": "Double Value",
      "Shiny": "Double Value"
    }
  },
  "Star Chart": {
    "name": "Star Chart",
    "icon": "images/items/StarChart.avif",
    "tier": "Bronze",
    "tags": [
      "Vanessa",
      "Medium",
      "Cooldown",
      "Crit",
      "Tool"
    ],
    "description": [
      "Adjacent items have ( +10% » +15% » +20% » +25% ) Crit Chance.",
      "Adjacent items have their cooldown reduced by ( 10% » 15% » 20% » 25% )."
    ],
    "cooldown": null,
    "enchants": {
      "Heavy": "At the start of each fight, Slow 3 items for 4 second(s).",
      "Icy": "At the start of each fight, Freeze 2 items for 4 second(s).",
      "Turbo": "At the start of each fight, Haste 3 items for 4 second(s).",
      "Shielded": "At the start of each fight, Shield 120.",
      "Restorative": "You have +12 Regeneration.",
      "Toxic": "At the start of each fight, poison 12.",
      "Fiery": "At the start of each fight, burn 16.",
      "Shiny": "Double Crit Chance",
      "Deadly": "Double Crit Chance"
    }
  },
  "Stinger": {
    "name": "Stinger",
    "icon": "images/items/Stinger.avif",
    "tier": "Bronze",
    "tags": [
      "Common",
      "Small",
      "Damage",
      "Slow",
      "Weapon"
    ],
    "description": [
      "Cooldown 9 seconds",
      "Lifesteal 100",
      "Deal ( 5 » 15 » 30 » 50 ) damage.",
      "Slow 1 item for ( 1 » 2 » 3 » 4 ) second(s)."
    ],
    "cooldown": 9,
    "enchants": {
      "Heavy": "+1 Slow Targets",
      "Icy": "Freeze 1 item for 1 second(s).",
      "Turbo": "Haste 1 item for 2 second(s).",
      "Shielded": "Shield 30.",
      "Restorative": "Heal 45.",
      "Toxic": "Poison 3.",
      "Fiery": "Burn 4.",
      "Shiny": "+1 Multicast",
      "Deadly": "+50% Crit Chance"
    }
  },
  "Stopwatch": {
    "name": "Stopwatch",
    "icon": "images/items/Stopwatch.avif",
    "tier": "Gold",
    "tags": [
      "Pygmalien",
      "Small",
      "Freeze",
      "Tool"
    ],
    "description": [
      "Cooldown 10 seconds",
      "Freeze both players' items for ( 1 » 2 ) second(s)."
    ],
    "cooldown": 10,
    "enchants": {
      "Heavy": "Slow both players' items for 3 second(s).",
      "Icy": "Double Freeze",
      "Turbo": "Haste both players' items for 3 second(s).",
      "Shielded": "Shield 50.",
      "Restorative": "Heal 75.",
      "Toxic": "Poison 5.",
      "Fiery": "Burn 7.",
      "Shiny": "+1 Multicast"
    }
  },
  "Submarine": {
    "name": "Submarine",
    "icon": "images/items/Submarine.avif",
    "tier": "Silver",
    "tags": [
      "Vanessa",
      "Large",
      "Aquatic",
      "Damage",
      "Shield",
      "Vehicle",
      "Weapon"
    ],
    "description": [
      "Cooldown 3 seconds",
      "Deal ( 30 » 60 » 100 ) damage.",
      "Gain Shield equal to this item's damage."
    ],
    "cooldown": 3,
    "enchants": {
      "Heavy": "Slow 3 items for 1 second(s).",
      "Icy": "Freeze 1 item for 2 second(s).",
      "Turbo": "Haste 3 items for 1 second(s).",
      "Shielded": "Double Shield",
      "Restorative": "Heal equal to this item's damage.",
      "Toxic": "Poison 3.",
      "Fiery": "Burn 5.",
      "Shiny": "+1 Multicast",
      "Deadly": "+50% Crit Chance",
      "Obsidian": "Lifesteal"
    }
  },
  "Subscraper": {
    "name": "Subscraper",
    "icon": "images/items/Subscraper.avif",
    "tier": "Gold",
    "tags": [
      "Pygmalien",
      "Large",
      "Economy",
      "Heal",
      "Property",
      "Value"
    ],
    "description": [
      "Cooldown 4 seconds",
      "Heal equal to ( 4 » 6 ) times the value of your items.",
      "Your other items gain +value equal to this item's value in combat."
    ],
    "cooldown": 4,
    "enchants": {
      "Golden": "Double Value",
      "Heavy": "Slow 3 items for 4 second(s).",
      "Icy": "Freeze 1 item for 6 second(s).",
      "Turbo": "Haste 3 items for 4 second(s).",
      "Shielded": "Shield equal the value of your items.",
      "Restorative": "Double Heal",
      "Toxic": "Poison 6.",
      "Fiery": "Burn 9.",
      "Shiny": "+1 Multicast",
      "Deadly": "+50% Crit Chance"
    }
  },
  "Succulents": {
    "name": "Succulents",
    "icon": "images/items/Succulents.avif",
    "tier": "Bronze",
    "tags": [
      "Pygmalien",
      "Small",
      "Heal"
    ],
    "description": [
      "Cooldown 4 seconds",
      "Heal ( 1 » 2 » 3 » 4 ).",
      "This permanently gains ( 1 » 2 » 3 » 4 ) Heal."
    ],
    "cooldown": 4,
    "enchants": {
      "Heavy": "Slow 1 item for 1 second(s).",
      "Icy": "Freeze 1 item for 1 second(s).",
      "Turbo": "Haste 1 item for 1 second(s).",
      "Shielded": "Shield 20.",
      "Restorative": "Double Heal",
      "Toxic": "Poison 2.",
      "Fiery": "Burn 3.",
      "Shiny": "+1 Multicast",
      "Deadly": "+50% Crit Chance"
    }
  },
  "Sunderer": {
    "name": "Sunderer",
    "icon": "images/items/Sunderer.avif",
    "tier": "Bronze",
    "tags": [
      "Common",
      "Small",
      "Damage",
      "Weapon"
    ],
    "description": [
      "Cooldown 4 seconds",
      "Deal ( 5 » 15 » 30 » 50 ) damage.",
      "Your enemy's Shield items lose ( 2 » 4 » 6 » 8 ) Shield for the fight."
    ],
    "cooldown": 4,
    "enchants": {
      "Heavy": "Slow 1 item for 1 second(s).",
      "Icy": "Freeze 1 item for 1 second(s).",
      "Turbo": "Haste 1 item for 1 second(s).",
      "Shielded": "Shield 20.",
      "Restorative": "Heal 30.",
      "Toxic": "Poison 2.",
      "Fiery": "Burn 3.",
      "Shiny": "+1 Multicast",
      "Deadly": "+50% Crit Chance",
      "Obsidian": "Lifesteal"
    }
  },
  "Sunlight Spear": {
    "name": "Sunlight Spear",
    "icon": "images/items/SunlightSpear.avif",
    "tier": "Silver",
    "tags": [
      "Mak",
      "Medium",
      "Burn",
      "Heal"
    ],
    "description": [
      "Cooldown 6 seconds",
      "Heal ( 30 » 60 » 120 ).",
      "Burn 1.",
      "When you Heal, this gains ( 2 » 4 » 6 ) Burn for the fight."
    ],
    "cooldown": 6,
    "enchants": {
      "Heavy": "Slow 2 items for 2 second(s).",
      "Icy": "Freeze 1 item for 2 second(s).",
      "Turbo": "Haste 2 items for 2 second(s).",
      "Shielded": "Shield 50.",
      "Restorative": "Double Heal",
      "Toxic": "Poison 5.",
      "Fiery": "Double Burn",
      "Shiny": "+1 Multicast",
      "Deadly": "+50% Crit Chance"
    }
  },
  "Super Syrup": {
    "name": "Super Syrup",
    "icon": "images/items/SuperSyrup.avif",
    "tier": "Bronze",
    "tags": [
      "Common",
      "Medium",
      "Ammo",
      "Crit",
      "Food"
    ],
    "description": [
      "Cooldown 4 seconds",
      "Ammo Max 10",
      "Adjacent items permanently gain ( 1% » 2% » 3% » 4% ) Crit chance.",
      "This permanently loses 1 Max Ammo."
    ],
    "cooldown": 4,
    "enchants": {}
  },
  "Swash Buckle": {
    "name": "Swash Buckle",
    "icon": "images/items/SwashBuckle.avif",
    "tier": "Gold",
    "tags": [
      "Vanessa",
      "Medium",
      "Crit",
      "Damage",
      "Heal",
      "Shield"
    ],
    "description": [
      "Adjacent items have ( +25% » +50% ) Crit Chance.",
      "Adjacent items have bonus damage, heal, or shield equal to their Crit Chance."
    ],
    "cooldown": null,
    "enchants": {
      "Shiny": "This has double damage, shield and heal bonus.",
      "Deadly": "This has double Crit Chance bonus."
    }
  },
  "Switchblade": {
    "name": "Switchblade",
    "icon": "images/items/Switchblade.avif",
    "tier": "Bronze",
    "tags": [
      "Vanessa",
      "Small",
      "Damage",
      "Weapon"
    ],
    "description": [
      "Cooldown 8 seconds",
      "Deal ( 10 » 30 » 60 » 100 ) damage.",
      "When you use an adjacent Weapon, give it ( +2 » +4 » +6 » +10 ) damage for the fight."
    ],
    "cooldown": 8,
    "enchants": {
      "Heavy": "Slow 1 item for 2 second(s).",
      "Icy": "Freeze 1 item for 1 second(s).",
      "Turbo": "Haste 1 item for 2 second(s).",
      "Shielded": "Shield 40.",
      "Restorative": "Heal 60.",
      "Toxic": "Poison 4.",
      "Fiery": "Burn 5.",
      "Shiny": "+1 Multicast",
      "Deadly": "+50% Crit Chance",
      "Obsidian": "Lifesteal"
    }
  },
  "Tazidian Dagger": {
    "name": "Tazidian Dagger",
    "icon": "images/items/TazidianDagger.avif",
    "tier": "Bronze",
    "tags": [
      "Mak",
      "Small",
      "Ammo",
      "Damage",
      "Weapon"
    ],
    "description": [
      "Cooldown 4 seconds",
      "Deal ( 5 » 10 » 15 » 20 ) damage.",
      "Adjacent Potions have +1 Ammo."
    ],
    "cooldown": 4,
    "enchants": {
      "Heavy": "Slow 1 item for 1 second(s).",
      "Icy": "Freeze 1 item for 1 second(s).",
      "Turbo": "Haste 1 item for 1 second(s).",
      "Shielded": "Shield 20.",
      "Restorative": "Heal 30.",
      "Toxic": "Poison 2.",
      "Fiery": "Burn 3.",
      "Shiny": "+1 Multicast",
      "Deadly": "+50% Crit Chance",
      "Obsidian": "Lifesteal"
    }
  },
  "Tea Set": {
    "name": "Tea Set",
    "icon": "images/items/TeaSet.avif",
    "tier": "Gold",
    "tags": [
      "Pygmalien",
      "Medium",
      "Heal",
      "Health"
    ],
    "description": [
      "Cooldown 6 seconds",
      "Heal equal to ( 4% » 8% ) of your Max Health.",
      "When you use a non-weapon item, permanently gain ( +2 » +4 ) Max Health."
    ],
    "cooldown": 6,
    "enchants": {
      "Heavy": "Slow 1 item for 4 second(s).",
      "Icy": "Freeze 1 item for 2 second(s).",
      "Turbo": "Haste 1 item for 4 second(s).",
      "Shielded": "Shield equal to 4% of your Max Health.",
      "Restorative": "Double Heal",
      "Toxic": "Poison 6.",
      "Fiery": "Burn 9.",
      "Shiny": "+1 Multicast",
      "Deadly": "+50% Crit Chance"
    }
  },
  "Teddy": {
    "name": "Teddy",
    "icon": "images/items/Teddy.avif",
    "tier": "Legendary",
    "tags": [
      "Common",
      "Medium",
      "Damage",
      "Friend",
      "Weapon"
    ],
    "description": [
      "Cooldown 10 seconds",
      "Multicast 2",
      "Deal 100 damage.",
      "When you use an adjacent Friend or Ammo item, charge this 1 second(s).",
      "When you take damage, this gains 5% Crit Chance for the fight."
    ],
    "cooldown": 10,
    "enchants": {
      "Heavy": "Slow 2 items for 3 second(s).",
      "Icy": "Freeze 1 item for 3 second(s).",
      "Turbo": "Haste 2 items for 3 second(s).",
      "Shielded": "Shield 100.",
      "Restorative": "Heal 150.",
      "Toxic": "Poison 10.",
      "Fiery": "Burn 15.",
      "Shiny": "+1 Multicast",
      "Deadly": "+50% Crit Chance",
      "Obsidian": "Lifesteal"
    }
  },
  "Temporary Shelter": {
    "name": "Temporary Shelter",
    "icon": "images/items/TemporaryShelter.avif",
    "tier": "Bronze",
    "tags": [
      "Common",
      "Large",
      "Property",
      "Shield"
    ],
    "description": [
      "Cooldown 6 seconds",
      "Shield 30.",
      "When you sell a Small item, this gains ( 5 » 10 » 15 » 20 ) Shield."
    ],
    "cooldown": 6,
    "enchants": {
      "Heavy": "Slow 3 items for 2 second(s).",
      "Icy": "Freeze 1 item for 3 second(s).",
      "Turbo": "Haste 3 items for 2 second(s).",
      "Shielded": "Double Shield",
      "Restorative": "Heal 135.",
      "Toxic": "Poison 9.",
      "Fiery": "Burn 13.",
      "Shiny": "+1 Multicast",
      "Deadly": "+50% Crit Chance"
    }
  },
  "Tesla Coil": {
    "name": "Tesla Coil",
    "icon": "images/items/TeslaCoil.avif",
    "tier": "Silver",
    "tags": [
      "Dooley",
      "Medium",
      "Damage",
      "Weapon"
    ],
    "description": [
      "Cooldown 5 seconds",
      "Deal ( 10 » 20 » 30 ) damage.",
      "When you use an adjacent item, deal ( 10 » 20 » 30 ) damage."
    ],
    "cooldown": 5,
    "enchants": {
      "Heavy": "When you use an adjacent item, Slow 1 item for 2 second(s).",
      "Icy": "When you use an adjacent item, Freeze 1 item for 1 second(s).",
      "Turbo": "When you use an adjacent item, Haste 1 item for 2 second(s).",
      "Shielded": "When you use an adjacent item, Shield 15.",
      "Restorative": "When you use an adjacent item, Heal 20.",
      "Toxic": "When you use an adjacent item, Poison 1.",
      "Fiery": "When you use an adjacent item, Burn 2.",
      "Shiny": "+1 Multicast",
      "Deadly": "+50% Crit Chance",
      "Obsidian": "Lifesteal"
    }
  },
  "Textiles": {
    "name": "Textiles",
    "icon": "images/items/Textiles.avif",
    "tier": "Bronze",
    "tags": [
      "Pygmalien",
      "Medium",
      "Heal",
      "Shield"
    ],
    "description": [
      "Cooldown 5 seconds",
      "Shield ( 10 » 30 » 60 » 100 ).",
      "Heal equal to your Shield."
    ],
    "cooldown": 5,
    "enchants": {
      "Heavy": "Slow 2 items for 2 second(s).",
      "Icy": "Freeze 1 item for 2 second(s).",
      "Turbo": "Haste 2 items for 2 second(s).",
      "Shielded": "Double Shield",
      "Restorative": "Double Heal",
      "Toxic": "Poison 5.",
      "Fiery": "Burn 7.",
      "Shiny": "+1 Multicast",
      "Deadly": "+50% Crit Chance"
    }
  },
  "The Boulder": {
    "name": "The Boulder",
    "icon": "images/items/TheBoulder.avif",
    "tier": "Diamond",
    "tags": [
      "Vanessa",
      "Large",
      "Ammo",
      "Damage",
      "Weapon"
    ],
    "description": [
      "Cooldown 24 seconds",
      "Ammo Max 1",
      "Deal damage equal to your enemy's max health."
    ],
    "cooldown": 24,
    "enchants": {
      "Heavy": "Slow 3 items for 10 second(s).",
      "Icy": "Freeze 1 item for 15 second(s).",
      "Turbo": "Haste 3 items for 10 second(s).",
      "Shielded": "Shield equal to your Max Health.",
      "Restorative": "Heal equal to your Max Health.",
      "Toxic": "Poison 100.",
      "Fiery": "Burn 50.",
      "Shiny": "+1 Multicast",
      "Deadly": "+50% Crit Chance",
      "Obsidian": "Lifesteal"
    }
  },
  "The Core": {
    "name": "The Core",
    "icon": "images/items/TheCore.avif",
    "tier": "Bronze",
    "tags": [
      "Dooley",
      "Medium",
      "Charge",
      "Core",
      "Damage",
      "Unsellable",
      "Weapon"
    ],
    "description": [
      "Cooldown 7 seconds",
      "Deal ( 10 » 30 » 60 » 100 ) damage.",
      "Charge all items to the right of this 1 second(s).",
      "When you use any item to the left of this, Charge this 1 second(s)."
    ],
    "cooldown": 7,
    "enchants": {
      "Heavy": "Slow 2 items for 3 second(s).",
      "Icy": "Freeze 1 item for 3 second(s).",
      "Turbo": "Haste 2 items for 3 second(s).",
      "Shielded": "Shield 80.",
      "Restorative": "Heal 120.",
      "Toxic": "Poison 8.",
      "Fiery": "Burn 12.",
      "Shiny": "+1 Multicast",
      "Deadly": "+50% Crit Chance",
      "Obsidian": "Lifesteal"
    }
  },
  "The Eclipse": {
    "name": "The Eclipse",
    "icon": "images/items/TheEclipse.avif",
    "tier": "Legendary",
    "tags": [
      "Common",
      "Large",
      "Damage",
      "Vehicle",
      "Weapon"
    ],
    "description": [
      "Cooldown 15 seconds",
      "Use all your other items.",
      "When you use an item, deal 40 damage."
    ],
    "cooldown": 15,
    "enchants": {
      "Heavy": "Slow 3 items for 5 second(s).",
      "Icy": "Freeze 2 item for 3 second(s).",
      "Turbo": "Haste 3 items for 5 second(s).",
      "Shielded": "Shield 240.",
      "Restorative": "Heal 360.",
      "Toxic": "Poison 24.",
      "Fiery": "Burn 36.",
      "Shiny": "+1 Multicast",
      "Obsidian": "Lifesteal"
    }
  },
  "Thermal Lance": {
    "name": "Thermal Lance",
    "icon": "images/items/ThermalLance.avif",
    "tier": "Gold",
    "tags": [
      "Dooley",
      "Medium",
      "Burn",
      "Haste"
    ],
    "description": [
      "Cooldown 7 seconds",
      "Burn 7.",
      "When this gains Haste, this gains ( 1 » 2 ) Burn for the fight."
    ],
    "cooldown": 7,
    "enchants": {
      "Heavy": "Slow 2 items for 2 second(s).",
      "Icy": "Freeze 1 item for 2 second(s).",
      "Turbo": "Haste 2 items for 2 second(s).",
      "Shielded": "Shield 70.",
      "Restorative": "Heal 105.",
      "Toxic": "Poison 7.",
      "Fiery": "This has double Burn.",
      "Shiny": "+1 Multicast",
      "Deadly": "+50% Crit Chance"
    }
  },
  "Thieves Guild Medallion": {
    "name": "Thieves Guild Medallion",
    "icon": "images/items/ThievesGuildMedallion.avif",
    "tier": "Diamond",
    "tags": [
      "Common",
      "Small",
      "NonWeapon",
      "Passive"
    ],
    "description": [
      "When you sell this, gain access to the Thieves Guild."
    ],
    "cooldown": null,
    "enchants": {}
  },
  "Throwing Knives": {
    "name": "Throwing Knives",
    "icon": "images/items/ThrowingKnives.avif",
    "tier": "Bronze",
    "tags": [
      "Vanessa",
      "Small",
      "Ammo",
      "Crit",
      "Damage",
      "Weapon"
    ],
    "description": [
      "Cooldown 3 seconds",
      "Ammo Max 3",
      "Deal ( 15 » 45 » 90 » 150 ) damage.",
      "When you Crit with another item, use this."
    ],
    "cooldown": 3,
    "enchants": {
      "Heavy": "Slow 1 item for 1 second(s).",
      "Icy": "Freeze 1 item for 1 second(s).",
      "Turbo": "Haste 1 item for 1 second(s).",
      "Shielded": "Shield 8.",
      "Restorative": "Heal 10.",
      "Toxic": "Poison 1.",
      "Fiery": "Burn 3.",
      "Shiny": "+1 Multicast",
      "Deadly": "+50% Crit Chance",
      "Obsidian": "Lifesteal"
    }
  },
  "Thrown Net": {
    "name": "Thrown Net",
    "icon": "images/items/ThrownNet.avif",
    "tier": "Silver",
    "tags": [
      "Mak",
      "Medium",
      "Damage",
      "Weapon"
    ],
    "description": [
      "Cooldown 5 seconds",
      "Deal ( 5 » 10 » 15 ) damage.",
      "Your Weapons gain ( 2 » 3 » 4 ) damage for the fight and your opponent's Weapons lose ( 2 » 3 » 4 ) damage for the fight."
    ],
    "cooldown": 5,
    "enchants": {
      "Heavy": "Slow 2 items for 2 second(s).",
      "Icy": "Freeze 1 item for 2 second(s).",
      "Turbo": "Haste 2 items for 2 second(s).",
      "Shielded": "Shield 50.",
      "Restorative": "Heal 75.",
      "Toxic": "Poison 5.",
      "Fiery": "Burn 7.",
      "Shiny": "+1 Multicast",
      "Deadly": "+50% Crit Chance",
      "Obsidian": "Lifesteal"
    }
  },
  "Thrusters": {
    "name": "Thrusters",
    "icon": "images/items/Thrusters.avif",
    "tier": "Bronze",
    "tags": [
      "Dooley",
      "Small",
      "Burn",
      "Cooldown"
    ],
    "description": [
      "Cooldown 6 seconds",
      "Burn both players ( 2 » 3 » 4 » 5 ).",
      "Adjacent items have their cooldowns reduced by ( 6% » 9% » 12% » 15% )."
    ],
    "cooldown": 6,
    "enchants": {
      "Heavy": "Slow 1 item for 2 second(s).",
      "Icy": "Freeze 1 item for 1 second(s).",
      "Turbo": "Haste 1 item for 2 second(s).",
      "Shielded": "Shield 30.",
      "Restorative": "Heal 45.",
      "Toxic": "Poison 3.",
      "Fiery": "Double Burn",
      "Shiny": "+1 Multicast",
      "Deadly": "+50% Crit Chance"
    }
  },
  "Thurible": {
    "name": "Thurible",
    "icon": "images/items/Thurible.avif",
    "tier": "Silver",
    "tags": [
      "Mak",
      "Small",
      "Burn",
      "Regen",
      "Tool"
    ],
    "description": [
      "Cooldown 8 seconds",
      "Gain ( 2 » 4 » 6 ) Regeneration for the fight.",
      "When you gain Regeneration, Burn ( 2 » 3 » 4 )."
    ],
    "cooldown": 8,
    "enchants": {
      "Heavy": "When you gain Regeneration, Slow 1 item for 2 second(s).",
      "Icy": "When you gain Regeneration, Freeze 1 item for 1 second(s).",
      "Turbo": "When you gain Regeneration, Haste 1 item for 2 second(s).",
      "Shielded": "When you gain Regeneration, Shield 15.",
      "Restorative": "When you gain Regeneration, Heal 20.",
      "Toxic": "When you gain Regeneration, Poison 1.",
      "Fiery": "Double Burn",
      "Shiny": "+1 Multicast",
      "Deadly": "+50% Crit Chance"
    }
  },
  "Tiny Cutlass": {
    "name": "Tiny Cutlass",
    "icon": "images/items/TinyCutlass.avif",
    "tier": "Bronze",
    "tags": [
      "Vanessa",
      "Small",
      "Crit",
      "Damage",
      "Weapon"
    ],
    "description": [
      "Cooldown 5 seconds",
      "Deal ( 10 » 20 » 30 » 40 ) damage.",
      "This deals double Crit damage."
    ],
    "cooldown": 5,
    "enchants": {}
  },
  "Tommoo Gun": {
    "name": "Tommoo Gun",
    "icon": "images/items/TommooGun.avif",
    "tier": "Diamond",
    "tags": [
      "Common",
      "Small",
      "Ammo",
      "Damage",
      "Weapon"
    ],
    "description": [
      "Cooldown 2 seconds",
      "Ammo Max 50",
      "Deal damage equal to this item's ammo."
    ],
    "cooldown": 2,
    "enchants": {
      "Heavy": "Slow 1 item for 1 second(s).",
      "Icy": "Freeze 1 item for 1 second(s).",
      "Turbo": "Haste 1 item for 1 second(s).",
      "Shielded": "Shield equal to this item's ammo.",
      "Restorative": "Heal equal to this item's ammo.",
      "Toxic": "Poison 1.",
      "Fiery": "Burn 1.",
      "Shiny": "+1 Multicast",
      "Deadly": "+50% Crit Chance",
      "Obsidian": "Lifesteal"
    }
  },
  "Toolbox": {
    "name": "Toolbox",
    "icon": "images/items/Toolbox.avif",
    "tier": "Bronze",
    "tags": [
      "Stelle",
      "Medium",
      "Cooldown",
      "Shield",
      "Tool"
    ],
    "description": [
      "Cooldown 6 seconds",
      "Shield ( 10 » 30 » 50 » 100 ).",
      "Your other tools have their cooldowns reduced by ( 5% » 10% » 15% » 20% )."
    ],
    "cooldown": 6,
    "enchants": {
      "Heavy": "Slow 2 items for 2 second(s).",
      "Icy": "Freeze 1 item for 2 second(s).",
      "Turbo": "Haste 2 items for 2 second(s).",
      "Shielded": "Double Shield",
      "Restorative": "Heal 90.",
      "Toxic": "Poison 6.",
      "Fiery": "Burn 9.",
      "Shiny": "+1 Multicast",
      "Deadly": "Your Tools have +20% Crit Chance."
    }
  },
  "Torpedo": {
    "name": "Torpedo",
    "icon": "images/items/Torpedo.avif",
    "tier": "Silver",
    "tags": [
      "Vanessa",
      "Medium",
      "Ammo",
      "Aquatic",
      "Damage",
      "Weapon"
    ],
    "description": [
      "Cooldown 10 seconds",
      "Ammo Max 1",
      "Deal 60 damage.",
      "When you use another Aquatic or Ammo item, this gains ( 30 » 60 » 90 ) damage for the fight.",
      "If the item is Large, Reload 1 Ammo."
    ],
    "cooldown": 10,
    "enchants": {
      "Heavy": "Slow 2 items for 6 second(s).",
      "Icy": "Freeze 1 item for 6 second(s).",
      "Turbo": "Haste 2 items for 6 second(s).",
      "Shielded": "Shield 120.",
      "Restorative": "Heal 180.",
      "Toxic": "Poison 12.",
      "Fiery": "Burn 18.",
      "Shiny": "+1 Multicast",
      "Deadly": "+50% Crit Chance",
      "Obsidian": "Lifesteal"
    }
  },
  "Tourist Chariot": {
    "name": "Tourist Chariot",
    "icon": "images/items/TouristChariot.avif",
    "tier": "Bronze",
    "tags": [
      "Common",
      "Large",
      "Shield",
      "Value",
      "Vehicle"
    ],
    "description": [
      "Cooldown 4 seconds",
      "Shield ( 20 » 60 » 120 » 200 ).",
      "When you sell this, give your items ( +1 » +2 » +3 » +4 ) value."
    ],
    "cooldown": 4,
    "enchants": {
      "Heavy": "Slow 3 items for 1 second(s).",
      "Icy": "Freeze 1 item for 2 second(s).",
      "Turbo": "Haste 3 items for 1 second(s).",
      "Shielded": "Double Shield",
      "Restorative": "Heal 90.",
      "Toxic": "Poison 6.",
      "Fiery": "Burn 9.",
      "Shiny": "+1 Multicast",
      "Deadly": "+50% Crit Chance"
    }
  },
  "Trained Spider": {
    "name": "Trained Spider",
    "icon": "images/items/TrainedSpider.avif",
    "tier": "Bronze",
    "tags": [
      "Common",
      "Small",
      "Friend",
      "Poison"
    ],
    "description": [
      "Cooldown 5 seconds",
      "Poison ( 1 » 2 » 3 » 4 ).",
      "When you sell this, your leftmost Poison item gains ( +1 » +2 » +3 » +4 ) Poison."
    ],
    "cooldown": 5,
    "enchants": {
      "Heavy": "Slow 1 item for 1 second(s).",
      "Icy": "Freeze 1 item for 1 second(s).",
      "Turbo": "Haste 1 item for 1 second(s).",
      "Shielded": "Shield 25.",
      "Restorative": "Heal 40.",
      "Toxic": "Double Poison",
      "Fiery": "Burn 4.",
      "Shiny": "+1 Multicast",
      "Deadly": "+50% Crit Chance"
    }
  },
  "Trebuchet": {
    "name": "Trebuchet",
    "icon": "images/items/Trebuchet.avif",
    "tier": "Bronze",
    "tags": [
      "Vanessa",
      "Large",
      "Burn",
      "Damage",
      "Haste",
      "Weapon"
    ],
    "description": [
      "Cooldown 8 seconds",
      "Burn ( 8 » 10 » 12 » 20 ).",
      "Deal ( 10 » 30 » 50 » 100 ) damage.",
      "When you Burn, haste an item for ( 1 » 2 » 3 » 4 ) second(s)."
    ],
    "cooldown": 8,
    "enchants": {
      "Heavy": "Slow 3 items for 3 second(s).",
      "Icy": "Freeze 1 item for 4 second(s).",
      "Turbo": "Double Haste",
      "Shielded": "Shield 120.",
      "Restorative": "Heal 180.",
      "Toxic": "Poison 12.",
      "Fiery": "Double Burn",
      "Shiny": "+1 Multicast",
      "Deadly": "+50% Crit Chance",
      "Obsidian": "Lifesteal"
    }
  },
  "Tripwire": {
    "name": "Tripwire",
    "icon": "images/items/Tripwire.avif",
    "tier": "Diamond",
    "tags": [
      "Vanessa",
      "Medium",
      "Slow"
    ],
    "description": [
      "When your enemy uses an item, Slow it for 1 second(s)."
    ],
    "cooldown": null,
    "enchants": {
      "Heavy": "Double Slow",
      "Icy": "When your enemy uses an item, freeze it for 1 second(s).",
      "Turbo": "When your enemy uses an item, haste 1 item for 2 second(s).",
      "Shielded": "When your enemy uses an item, shield 15.",
      "Restorative": "When your enemy uses an item, heal 20.",
      "Toxic": "When your enemy uses an item, poison 1.",
      "Fiery": "When your enemy uses an item, burn 2.",
      "Shiny": "Double Slow"
    }
  },
  "Tropical Island": {
    "name": "Tropical Island",
    "icon": "images/items/TropicalIsland.avif",
    "tier": "Gold",
    "tags": [
      "Vanessa",
      "Large",
      "Aquatic",
      "Property",
      "Regen",
      "Slow"
    ],
    "description": [
      "When you Slow, gain ( 2 » 4 ) Regeneration for the fight.",
      "At the start of each hour, get a Coconut or Citrus."
    ],
    "cooldown": null,
    "enchants": {
      "Heavy": "At the start of each fight, Slow 2 items for 4 second(s).",
      "Icy": "When you slow, freeze 1 item for 1 second(s).",
      "Turbo": "When you slow, haste 1 item for 1 second(s).",
      "Shielded": "When you slow, shield 30.",
      "Restorative": "When you slow, heal 45.",
      "Toxic": "When you slow, poison 3.",
      "Fiery": "When you slow, burn 5.",
      "Shiny": "This has double Regeneration gain."
    }
  },
  "Turtle Shell": {
    "name": "Turtle Shell",
    "icon": "images/items/TurtleShell.avif",
    "tier": "Silver",
    "tags": [
      "Vanessa",
      "Medium",
      "Aquatic",
      "Shield"
    ],
    "description": [
      "Cooldown 5 seconds",
      "Give your items ( +3 » +5 » +10 ) Shield for the fight.",
      "When you use another non-weapon, Shield ( 10 » 20 » 30 )."
    ],
    "cooldown": 5,
    "enchants": {
      "Heavy": "Slow 2 items for 2 second(s).",
      "Icy": "Freeze 1 item for 2 second(s).",
      "Turbo": "Haste 2 items for 2 second(s).",
      "Shielded": "Double Shield",
      "Restorative": "Heal 75.",
      "Toxic": "Poison 5.",
      "Fiery": "Burn 7.",
      "Shiny": "+1 Multicast",
      "Deadly": "+50% Crit Chance"
    }
  },
  "Tusked Helm": {
    "name": "Tusked Helm",
    "icon": "images/items/TuskedHelm.avif",
    "tier": "Bronze",
    "tags": [
      "Pygmalien",
      "Small",
      "Damage",
      "Shield",
      "Weapon"
    ],
    "description": [
      "Cooldown 10 seconds",
      "Multicast 2",
      "Deal ( 5 » 15 » 30 » 50 ) damage.",
      "Shield ( 5 » 15 » 30 » 50 )."
    ],
    "cooldown": 10,
    "enchants": {
      "Heavy": "Slow 1 item for 3 second(s).",
      "Icy": "Freeze 1 item for 1 second(s).",
      "Turbo": "Haste 1 item for 3 second(s).",
      "Shielded": "Double Shield",
      "Restorative": "Heal 75.",
      "Toxic": "Poison 5.",
      "Fiery": "Burn 7.",
      "Shiny": "+1 Multicast",
      "Deadly": "+50% Crit Chance",
      "Obsidian": "Lifesteal"
    }
  },
  "Upgrade Hammer": {
    "name": "Upgrade Hammer",
    "icon": "images/items/UpgradeHammer.avif",
    "tier": "Diamond",
    "tags": [
      "Common",
      "Small",
      "Damage"
    ],
    "description": [
      "When you sell this, upgrade your leftmost item."
    ],
    "cooldown": null,
    "enchants": {}
  },
  "Uwashiwali Bird": {
    "name": "Uwashiwali Bird",
    "icon": "images/items/UwashiwaliBird.avif",
    "tier": "Bronze",
    "tags": [
      "Pygmalien",
      "Small",
      "Friend",
      "Heal"
    ],
    "description": [
      "Cooldown 4 seconds",
      "Heal ( 10 » 30 » 60 » 100 ).",
      "This has +1 Multicast for each Property you have. [0]"
    ],
    "cooldown": 4,
    "enchants": {
      "Heavy": "Slow 1 item for 1 second(s).",
      "Icy": "Freeze 1 item for 1 second(s).",
      "Turbo": "Haste 1 item for 1 second(s).",
      "Shielded": "Shield 10.",
      "Restorative": "Double Heal",
      "Toxic": "Poison 1.",
      "Fiery": "Burn 1.",
      "Shiny": "+0 MISSING",
      "Deadly": "+50% Crit Chance"
    }
  },
  "Uzi": {
    "name": "Uzi",
    "icon": "images/items/Uzi.avif",
    "tier": "Bronze",
    "tags": [
      "Dooley",
      "Small",
      "Ammo",
      "Damage",
      "Weapon"
    ],
    "description": [
      "Cooldown 2 seconds",
      "Ammo Max 12",
      "Deal ( 2 » 6 » 12 » 20 ) damage."
    ],
    "cooldown": 2,
    "enchants": {
      "Heavy": "Slow 1 item for 1 second(s).",
      "Icy": "Freeze 1 item for 1 second(s).",
      "Turbo": "Haste 1 item for 1 second(s).",
      "Shielded": "Shield 10.",
      "Restorative": "Heal 15.",
      "Toxic": "Poison 1.",
      "Fiery": "Burn 1.",
      "Shiny": "+1 Multicast",
      "Deadly": "+50% Crit Chance",
      "Obsidian": "Lifesteal"
    }
  },
  "Vanessa's Amulet": {
    "name": "Vanessa's Amulet",
    "icon": "images/items/VanessasAmulet.avif",
    "tier": "Bronze",
    "tags": [
      "Vanessa",
      "Small",
      "Crit"
    ],
    "description": [
      "Your items have ( +10% » +20% » +30% » +40% ) Crit Chance."
    ],
    "cooldown": null,
    "enchants": {
      "Heavy": "At the start of the fight, Slow 2 items for 4 second(s).",
      "Icy": "At the start of the fight, Freeze 1 item for 4 second(s).",
      "Turbo": "At the start of the fight, Haste 2 items for 4 second(s).",
      "Shielded": "At the start of each fight, Shield 60.",
      "Restorative": "You have +6 Regeneration.",
      "Toxic": "At the start of the fight, poison 6.",
      "Fiery": "At the start of the fight, burn 8.",
      "Shiny": "Double Crit Chance",
      "Deadly": "Double Crit Chance"
    }
  },
  "Vending Machine": {
    "name": "Vending Machine",
    "icon": "images/items/VendingMachine.avif",
    "tier": "Silver",
    "tags": [
      "Pygmalien",
      "Medium",
      "Property"
    ],
    "description": [
      "At the start of each day, get 3 Chocolate Bars or Spare Changes."
    ],
    "cooldown": null,
    "enchants": {
      "Golden": "Your Chocolate Bars and Spare Change have +1 value."
    }
  },
  "Venom": {
    "name": "Venom",
    "icon": "images/items/Venom.avif",
    "tier": "Silver",
    "tags": [
      "Mak",
      "Small",
      "Poison"
    ],
    "description": [
      "When you use an adjacent weapon, poison ( 1 » 2 » 3 )."
    ],
    "cooldown": null,
    "enchants": {
      "Heavy": "When you use an adjacent weapon, Slow 1 item for 1 second(s).",
      "Icy": "When you use an adjacent weapon, Freeze 1 item for 1 second(s).",
      "Turbo": "When you use an adjacent weapon, Haste 1 item for 1 second(s).",
      "Shielded": "When you use an adjacent weapon, Shield 10.",
      "Restorative": "When you use an adjacent weapon, Heal 15.",
      "Toxic": "Double Poison",
      "Fiery": "When you use an adjacent weapon, Burn 1."
    }
  },
  "Venomander": {
    "name": "Venomander",
    "icon": "images/items/Venomander.avif",
    "tier": "Gold",
    "tags": [
      "Mak",
      "Small",
      "Friend",
      "Poison",
      "Regen"
    ],
    "description": [
      "Cooldown 8 seconds",
      "Poison ( 1 » 2 ).",
      "When you use the item to the left of this, gain ( 1 » 2 ) Regeneration for the fight."
    ],
    "cooldown": 8,
    "enchants": {
      "Heavy": "When you use the left to the left of this, Slow 1 item for 2 second(s).",
      "Icy": "When you use the left to the left of this, Freeze 1 item for 1 second(s).",
      "Turbo": "When you use the left to the left of this, Haste 1 item for 2 second(s).",
      "Shielded": "When you use the left to the left of this, Shield 15.",
      "Restorative": "When you use the left to the left of this, Heal 20.",
      "Toxic": "Double Poison",
      "Fiery": "When you use the left to the left of this, Burn 1.",
      "Shiny": "+1 Multicast",
      "Deadly": "+50% Crit Chance"
    }
  },
  "Vial of Blood": {
    "name": "Vial of Blood",
    "icon": "images/items/VialofBlood.avif",
    "tier": "Bronze",
    "tags": [
      "Common",
      "Small",
      "NonWeapon",
      "Passive"
    ],
    "description": [
      "When you sell this, gain ( 1 » 2 » 3 » 4 ) XP."
    ],
    "cooldown": null,
    "enchants": {}
  },
  "Vineyard": {
    "name": "Vineyard",
    "icon": "images/items/Vineyard.avif",
    "tier": "Silver",
    "tags": [
      "Pygmalien",
      "Large",
      "Damage",
      "Heal",
      "Property"
    ],
    "description": [
      "When you use an item, Heal equal to ( 1x » 2x » 3x ) this item's value.",
      "At the start of each hour, this gains ( 1 » 1 » 2 ) value."
    ],
    "cooldown": null,
    "enchants": {
      "Heavy": "When you use an item, Slow 1 item for 2 second(s).",
      "Icy": "When you use an item, Freeze 1 item for 1 second(s).",
      "Turbo": "When you use an item, Haste 1 item for 2 second(s).",
      "Shielded": "When you use an item, Shield 10.",
      "Restorative": "Double Heal",
      "Toxic": "When you use an item, Poison 1.",
      "Fiery": "When you use an item, Burn 2."
    }
  },
  "Void Ray": {
    "name": "Void Ray",
    "icon": "images/items/VoidRay.avif",
    "tier": "Gold",
    "tags": [
      "Common",
      "Medium",
      "Burn",
      "Shield"
    ],
    "description": [
      "Cooldown 6 seconds",
      "Multicast 2",
      "Burn ( 4 » 6 ).",
      "When you Shield, this gains ( 1 » 2 ) Burn for the fight."
    ],
    "cooldown": 6,
    "enchants": {
      "Heavy": "Slow 2 items for 2 second(s).",
      "Icy": "Freeze 1 item for 2 second(s).",
      "Turbo": "Haste 2 items for 2 second(s).",
      "Shielded": "Shield 60.",
      "Restorative": "Heal 90.",
      "Toxic": "Poison 6.",
      "Fiery": "Double Burn",
      "Shiny": "+1 Multicast",
      "Deadly": "+50% Crit Chance"
    }
  },
  "Void Shield": {
    "name": "Void Shield",
    "icon": "images/items/VoidShield.avif",
    "tier": "Diamond",
    "tags": [
      "Common",
      "Medium",
      "Burn",
      "Shield"
    ],
    "description": [
      "Cooldown 7 seconds",
      "Gain Shield equal to your enemy's burn.",
      "When your enemy uses an item, Burn 1."
    ],
    "cooldown": 7,
    "enchants": {
      "Heavy": "Slow 2 items for 2 second(s).",
      "Icy": "Freeze 1 item for 2 second(s).",
      "Turbo": "Haste 2 items for 2 second(s).",
      "Shielded": "Double Shield",
      "Restorative": "Heal equal to your enemy's Burn.",
      "Toxic": "Poison 7.",
      "Fiery": "Double Burn",
      "Shiny": "+1 Multicast",
      "Deadly": "+50% Crit Chance"
    }
  },
  "Wallace": {
    "name": "Wallace",
    "icon": "images/items/Wallace.avif",
    "tier": "Bronze",
    "tags": [
      "Dooley",
      "Small",
      "Friend",
      "Shield"
    ],
    "description": [
      "Cooldown 6 seconds",
      "Shield ( 5 » 10 » 15 » 20 ).",
      "This gains ( 5 » 10 » 15 » 20 ) Shield for the fight."
    ],
    "cooldown": 6,
    "enchants": {
      "Heavy": "Slow 1 item for 2 second(s).",
      "Icy": "Freeze 1 item for 1 second(s).",
      "Turbo": "Haste 1 item for 2 second(s).",
      "Shielded": "Double Shield",
      "Restorative": "Heal 15.",
      "Toxic": "Poison 2.",
      "Fiery": "Burn 3.",
      "Shiny": "+1 Multicast",
      "Deadly": "+50% Crit Chance"
    }
  },
  "Walter Cooler": {
    "name": "Walter Cooler",
    "icon": "images/items/WalterCooler.avif",
    "tier": "Bronze",
    "tags": [
      "Dooley",
      "Small",
      "Charge",
      "Friend",
      "Health"
    ],
    "description": [
      "Cooldown 10 seconds",
      "Permanently gain ( 5 » 10 » 15 » 20 ) Max Health.",
      "When you use an adjacent friend, charge this ( 1 » 1 » 1 » 2 ) second(s)."
    ],
    "cooldown": 10,
    "enchants": {
      "Heavy": "Slow 1 item for 3 second(s).",
      "Icy": "Freeze 1 item for 1 second(s).",
      "Turbo": "Haste 1 item for 3 second(s).",
      "Shielded": "Shield 50.",
      "Restorative": "Heal 75.",
      "Toxic": "Poison 5.",
      "Fiery": "Burn 7.",
      "Shiny": "+1 Multicast"
    }
  },
  "Wand": {
    "name": "Wand",
    "icon": "images/items/Wand.avif",
    "tier": "Gold",
    "tags": [
      "Common",
      "Small",
      "Charge"
    ],
    "description": [
      "Cooldown 5 seconds",
      "Charge your other non-weapon items ( 1 » 2 ) second(s)."
    ],
    "cooldown": 5,
    "enchants": {
      "Heavy": "Slow 1 item for 1 second(s).",
      "Icy": "Freeze 1 item for 1 second(s).",
      "Turbo": "Haste 1 item for 1 second(s).",
      "Shielded": "Shield 25.",
      "Restorative": "Heal 40.",
      "Toxic": "Poison 2.",
      "Fiery": "Burn 4.",
      "Shiny": "+1 Multicast"
    }
  },
  "Wanted Poster": {
    "name": "Wanted Poster",
    "icon": "images/items/WantedPoster.avif",
    "tier": "Silver",
    "tags": [
      "Vanessa",
      "Medium",
      "Crit",
      "Experience"
    ],
    "description": [
      "When you win a fight against a player, gain ( 1 » 2 » 3 ) XP. If you had Wanted Poster on your board, gain 1 additional XP.",
      "Your items have ( 10% » 20% » 30% ) Crit Chance."
    ],
    "cooldown": null,
    "enchants": {
      "Heavy": "At the start of the fight, Slow 3 items for 4 second(s).",
      "Icy": "At the start of the fight, Freeze 2 item for 4 second(s).",
      "Turbo": "At the start of the fight, Haste 3 items for 4 second(s).",
      "Shielded": "At the start of each fight, Shield 120.",
      "Restorative": "You have +12 Regeneration.",
      "Toxic": "At the start of the fight, poison 12.",
      "Fiery": "At the start of the fight, burn 16.",
      "Shiny": "Double Experience",
      "Deadly": "Double Experience"
    }
  },
  "Waterwheel": {
    "name": "Waterwheel",
    "icon": "images/items/Waterwheel.avif",
    "tier": "Silver",
    "tags": [
      "Vanessa",
      "Large",
      "Aquatic",
      "Haste",
      "Property"
    ],
    "description": [
      "Cooldown 6 seconds",
      "Haste your other items ( 1 » 2 » 3 ) second(s).",
      "When you use another Aquatic item, Haste this ( 1 » 2 » 3 ) second(s)."
    ],
    "cooldown": 6,
    "enchants": {
      "Heavy": "Slow 3 items for 2 second(s).",
      "Icy": "Freeze 1 item for 3 second(s).",
      "Turbo": "Double Haste",
      "Shielded": "Shield 90.",
      "Restorative": "Heal 135.",
      "Toxic": "Poison 9.",
      "Fiery": "Burn 13.",
      "Shiny": "+1 Multicast",
      "Deadly": "Your items have +10% Crit Chance."
    }
  },
  "Weakpoint Detector": {
    "name": "Weakpoint Detector",
    "icon": "images/items/WeakpointDetector.avif",
    "tier": "Bronze",
    "tags": [
      "Dooley",
      "Medium",
      "Charge",
      "Damage",
      "Slow",
      "Tool"
    ],
    "description": [
      "Cooldown 6 seconds",
      "Your weapons gain ( 3 » 6 » 9 » 12 ) damage for the fight.",
      "When you slow, charge this ( 1 » 2 » 3 » 4 ) second(s)."
    ],
    "cooldown": 6,
    "enchants": {
      "Heavy": "Slow 1 item for 3 second(s).",
      "Icy": "Freeze 1 item for 2 second(s).",
      "Turbo": "Haste 2 items for 2 second(s).",
      "Shielded": "Shield 60.",
      "Restorative": "Heal 90.",
      "Toxic": "Poison 6.",
      "Fiery": "Burn 9.",
      "Shiny": "+1 Multicast",
      "Deadly": "Your items gain 10% Crit Chance for the fight."
    }
  },
  "Weaponized Core": {
    "name": "Weaponized Core",
    "icon": "images/items/WeaponizedCore.avif",
    "tier": "Bronze",
    "tags": [
      "Dooley",
      "Medium",
      "Charge",
      "Core",
      "Damage",
      "Unsellable",
      "Weapon"
    ],
    "description": [
      "Cooldown 7 seconds",
      "Deal ( 10 » 30 » 60 » 100 ) damage.",
      "Give Weapons to the right of this ( +5 » +10 » +15 » +20 ) damage for the fight.",
      "When you use any item to the left of this, Charge this 1 second(s)."
    ],
    "cooldown": 7,
    "enchants": {
      "Heavy": "Slow 2 items for 3 second(s).",
      "Icy": "Freeze 1 item for 3 second(s).",
      "Turbo": "Haste 2 items for 3 second(s).",
      "Shielded": "Shield 80.",
      "Restorative": "Heal 120.",
      "Toxic": "Poison 8.",
      "Fiery": "Burn 12.",
      "Shiny": "+1 Multicast",
      "Deadly": "this weapon deals double damage on critical hits.",
      "Obsidian": "Lifesteal"
    }
  },
  "Weather Glass": {
    "name": "Weather Glass",
    "icon": "images/items/WeatherGlass.avif",
    "tier": "Silver",
    "tags": [
      "Vanessa",
      "Medium",
      "Burn",
      "Freeze",
      "Poison",
      "Slow",
      "Tool"
    ],
    "description": [
      "Cooldown 6 seconds",
      "Burn ( 4 » 6 » 8 ).",
      "Poison ( 2 » 3 » 4 ).",
      "If you have another item with Burn, Poison, Slow, or Freeze, this has +1 Multicast for each."
    ],
    "cooldown": 6,
    "enchants": {
      "Heavy": "Slow 2 items for 2 second(s).",
      "Icy": "Freeze 1 item for 2 second(s).",
      "Turbo": "Haste 2 items for 2 second(s).",
      "Shielded": "Shield 20.",
      "Restorative": "Heal 30.",
      "Toxic": "Double Poison",
      "Fiery": "Double Burn",
      "Shiny": "+1 Multicast",
      "Deadly": "+50% Crit Chance"
    }
  },
  "Weather Machine": {
    "name": "Weather Machine",
    "icon": "images/items/WeatherMachine.avif",
    "tier": "Gold",
    "tags": [
      "Stelle",
      "Large",
      "Burn",
      "Freeze",
      "Property",
      "Slow",
      "Tool",
      "Vehicle"
    ],
    "description": [
      "Cooldown 3 seconds",
      "Burn ( 2 » 3 ).",
      "Freeze 1 item for 2 second(s).",
      "Slow 1 item for ( 1 » 3 ) second(s)."
    ],
    "cooldown": 3,
    "enchants": {
      "Heavy": "+1 Slow Targets",
      "Icy": "+1 Freeze Targets",
      "Turbo": "Haste 3 items for 1 second(s).",
      "Shielded": "Shield 45.",
      "Restorative": "Heal 70.",
      "Toxic": "Poison 4.",
      "Fiery": "Double Burn",
      "Shiny": "+1 Multicast"
    }
  },
  "Weights": {
    "name": "Weights",
    "icon": "images/items/Weights.avif",
    "tier": "Bronze",
    "tags": [
      "Pygmalien",
      "Medium",
      "Damage",
      "Heal",
      "Tool"
    ],
    "description": [
      "Cooldown 5 seconds",
      "Your weapons gain ( 5 » 10 » 15 » 20 ) Damage and your Heal gain ( 5 » 10 » 15 » 20 ) Heal for the fight.",
      "When you heal while at max health, charge this ( 1 » 1 » 1 » 2 ) second(s)."
    ],
    "cooldown": 5,
    "enchants": {
      "Heavy": "Slow 2 items for 2 second(s).",
      "Icy": "Freeze 1 item for 4 second(s).",
      "Turbo": "Haste 2 items for 2 second(s).",
      "Shielded": "Your Shield items gain +15 shield for the fight.",
      "Restorative": "Double Heal",
      "Toxic": "Your Poison items gain +2 poison for the fight.",
      "Fiery": "Your Burn items gain +3 burn for the fight.",
      "Shiny": "+1 Multicast",
      "Deadly": "Your items gain +20% Crit Chance for the fight."
    }
  },
  "Welding Helmet": {
    "name": "Welding Helmet",
    "icon": "images/items/WeldingHelmet.avif",
    "tier": "Bronze",
    "tags": [
      "Dooley",
      "Medium",
      "Burn",
      "Shield"
    ],
    "description": [
      "Cooldown 3 seconds",
      "Shield ( 5 » 15 » 30 » 50 ).",
      "Burn ( 1 » 2 » 3 » 4 )."
    ],
    "cooldown": 3,
    "enchants": {
      "Heavy": "Slow 2 items for 1 second(s).",
      "Icy": "Freeze 1 item for 1 second(s).",
      "Turbo": "Haste 2 items for 1 second(s).",
      "Shielded": "Double Shield",
      "Restorative": "Heal 45.",
      "Toxic": "Poison 3.",
      "Fiery": "Double Burn",
      "Shiny": "+1 Multicast",
      "Deadly": "+50% Crit Chance"
    }
  },
  "Welding Torch": {
    "name": "Welding Torch",
    "icon": "images/items/WeldingTorch.avif",
    "tier": "Silver",
    "tags": [
      "Dooley",
      "Medium",
      "Burn",
      "Haste",
      "Shield",
      "Tool"
    ],
    "description": [
      "Cooldown 5 seconds",
      "Burn ( 4 » 6 » 8 ).",
      "When you Shield, this gains Haste for ( 1 » 2 » 3 ) second(s)."
    ],
    "cooldown": 5,
    "enchants": {
      "Heavy": "Slow 2 items for 2 second(s).",
      "Icy": "Freeze 1 item for 2 second(s).",
      "Turbo": "Haste 1 items for 1 second(s).",
      "Shielded": "Shield 50.",
      "Restorative": "Heal 75.",
      "Toxic": "Poison 5.",
      "Fiery": "Double Burn",
      "Shiny": "+1 Multicast",
      "Deadly": "+50% Crit Chance"
    }
  },
  "Windmill": {
    "name": "Windmill",
    "icon": "images/items/Windmill.avif",
    "tier": "Diamond",
    "tags": [
      "Pygmalien",
      "Large",
      "Charge",
      "Property"
    ],
    "description": [
      "When you use an item, charge another item +1 second(s)."
    ],
    "cooldown": null,
    "enchants": {
      "Heavy": "When you use an item, slow an item for 1 second(s).",
      "Icy": "When you use an item, freeze 1 item for 1 second(s).",
      "Turbo": "When you use an item, haste 1 item for 1 second(s).",
      "Shielded": "When you use an item, Shield 30.",
      "Restorative": "When you use an item, Heal 45.",
      "Toxic": "When you use an item, Poison 3.",
      "Fiery": "When you use an item, Burn 2.",
      "Shiny": "Double Charge",
      "Deadly": "+10% Crit Chance"
    }
  },
  "Wrench": {
    "name": "Wrench",
    "icon": "images/items/Wrench.avif",
    "tier": "Silver",
    "tags": [
      "Stelle",
      "Small",
      "Damage",
      "Tool",
      "Weapon"
    ],
    "description": [
      "Cooldown 3 seconds",
      "Deal ( 5 » 10 » 15 ) damage.",
      "At the start of each day, upgrade a tool."
    ],
    "cooldown": 3,
    "enchants": {
      "Heavy": "And make the item Heavy if able.",
      "Icy": "And make the item Icy if able.",
      "Turbo": "And make the item Turbo if able.",
      "Shielded": "And make the item Shielded if able.",
      "Restorative": "And make the item Restorative if able.",
      "Toxic": "And make the item Toxic if able.",
      "Fiery": "And make the item Fiery if able.",
      "Shiny": "And make the item Shiny if able.",
      "Deadly": "And make the item Deadly if able.",
      "Radiant": "And make the item Radiant if able.",
      "Obsidian": "And make the item Obsidian if able."
    }
  },
  "Yellow Gumball": {
    "name": "Yellow Gumball",
    "icon": "images/items/YellowGumball.avif",
    "tier": "Bronze",
    "tags": [
      "Common",
      "Small",
      "NonWeapon",
      "Passive",
      "Toughness"
    ],
    "description": [
      "When you sell this, your Shield items gain ( 1 » 2 » 3 » 4 ) Shield."
    ],
    "cooldown": null,
    "enchants": {}
  },
  "Yellow Piggles A": {
    "name": "Yellow Piggles A",
    "icon": "images/items/YellowPigglesA.avif",
    "tier": "Bronze",
    "tags": [
      "Pygmalien",
      "Small",
      "Shield"
    ],
    "description": [
      "Cooldown 3 seconds",
      "Give your adjacent Shield items ( +2 » +4 » +6 » +8 ) Shield for the fight."
    ],
    "cooldown": 3,
    "enchants": {}
  },
  "Yellow Piggles L": {
    "name": "Yellow Piggles L",
    "icon": "images/items/YellowPigglesL.avif",
    "tier": "Bronze",
    "tags": [
      "Pygmalien",
      "Small",
      "Shield"
    ],
    "description": [
      "Cooldown 3 seconds",
      "Give your Shield item to the left of this ( +4 » +8 » +12 » +16 ) Shield for the fight."
    ],
    "cooldown": 3,
    "enchants": {}
  },
  "Yellow Piggles R": {
    "name": "Yellow Piggles R",
    "icon": "images/items/YellowPigglesR.avif",
    "tier": "Bronze",
    "tags": [
      "Pygmalien",
      "Small",
      "Shield"
    ],
    "description": [
      "Cooldown 3 seconds",
      "Give your Shield item to the right of this ( +4 » +8 » +12 » +16 ) Shield for the fight."
    ],
    "cooldown": 3,
    "enchants": {}
  },
  "Yellow Piggles X": {
    "name": "Yellow Piggles X",
    "icon": "images/items/YellowPigglesX.avif",
    "tier": "Bronze",
    "tags": [
      "Pygmalien",
      "Small",
      "Shield"
    ],
    "description": [
      "Cooldown 3 seconds",
      "Your Shield items gain ( 1 » 2 » 3 » 4 ) Shield for the fight."
    ],
    "cooldown": 3,
    "enchants": {}
  },
  "Yo-Yo": {
    "name": "Yo-Yo",
    "icon": "images/items/YoYo.avif",
    "tier": "Bronze",
    "tags": [
      "Pygmalien",
      "Small",
      "Damage",
      "Weapon"
    ],
    "description": [
      "Cooldown 8 seconds",
      "Deal ( 1 » 5 » 10 » 15 ) damage.",
      "When you use an adjacent item, use this."
    ],
    "cooldown": 8,
    "enchants": {
      "Heavy": "Slow 1 item for 1 second(s).",
      "Icy": "Freeze 1 item for 1 second(s).",
      "Turbo": "Haste 1 item for 1 second(s).",
      "Shielded": "Shield 10.",
      "Restorative": "Heal 15.",
      "Toxic": "Poison 1.",
      "Fiery": "Burn 1.",
      "Shiny": "+1 Multicast",
      "Deadly": "+50% Crit Chance",
      "Obsidian": "Lifesteal"
    }
  }
};