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
    },
    "text": "Shield equal to ( 1x » 2x ) the value of the adjacent items."
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
    "cooldown": null,
    "enchants": {
      "Shiny": "Double Crit Chance"
    },
    "text": "Adjacent items have ( +3% » +6% » +9% » +12% ) Crit chance.",
    "bottomtext": "When you sell this, give your items ( +1% » +2% » +3% » +4% ) Crit Chance."
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
    },
    "text": "Deal ( 5 » 10 » 15 ) damage.",
    "bottomtext": "When you use the Core or another Ray, your Weapons gain ( +3 » +4 » +5 ) Damage for the fight."
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
    },
    "text": "Slow ( 1 » 2 » 3 ) items for 3 second(s).",
    "bottomtext": "Your other Slow items have +1 Slow."
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
    },
    "text": "Heal equal to ( 1x » 2x » 3x » 4x ) this item's value.",
    "bottomtext": "When you buy another Aquatic item, this gains ( 1 » 2 » 3 » 4 ) Value."
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
    },
    "text": "Deal damage equal to ( 20% » 30% ) of your enemy's Max Health.",
    "bottomtext": "When you use an adjacent item, this gains Haste for ( 2 » 4 ) second(s)."
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
    },
    "text": "Deal 10 damage.",
    "bottomtext": "When you lose Shield, this gains damage equal to ( 10% » 20% » 40% ) of the Shield lost."
  },
  "Antimatter Chamber": {
    "name": "Antimatter Chamber",
    "icon": "images/items/AntimatterChamber.avif",
    "tier": "Diamond",
    "tags": [
      "Dooley",
      "Large"
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
    },
    "text": "Destroy this and 3 small enemy items for the fight."
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
    },
    "text": "Shield ( 30 » 60 ).",
    "bottomtext": "When you Shield, adjacent weapons gain ( 10 » 20 ) damage for the fight."
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
    },
    "text": "Deal 100 damage.",
    "bottomtext": "When you Haste, this gains ( 25 » 50 » 100 ) damage for the fight."
  },
  "Arken's Ring": {
    "name": "Arken's Ring",
    "icon": "images/items/ArkensRing.avif",
    "tier": "Diamond",
    "tags": [
      "Common",
      "Small"
    ],
    "cooldown": null,
    "enchants": {},
    "text": "When you sell this, recover 5 Prestige."
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
    },
    "text": "Shield ( 15 » 45 » 90 » 150 ).",
    "bottomtext": "When you use any item to the left of this, Charge this 1 second(s)."
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
    },
    "text": "Shield ( 15 » 30 » 50 ).",
    "bottomtext": "When you use a non-weapon item, it and this gains Haste ( 1 » 2 » 3 ) second(s)."
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
    },
    "text": "Burn ( 2 » 4 » 6 » 8 ).",
    "bottomtext": "Reload your Potions."
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
    },
    "text": "Deal 1 damage.",
    "bottomtext": "Double this item's damage for the fight."
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
    },
    "text": "Deal ( 20 » 40 » 60 » 80 ) damage.",
    "bottomtext": "This item's cooldown is reduced by 1% for every 2 damage it has."
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
    },
    "text": "Gain Shield equal to ( 1x » 2x » 3x » 4x ) your Income.",
    "bottomtext": "When you buy this, you gain ( 1 » 2 » 3 » 5 ) Income."
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
    },
    "text": "Increase a random enemy item's cooldown by ( 1 » 2 » 3 ) seconds for the fight."
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
    "cooldown": null,
    "enchants": {},
    "text": "Sells for gold"
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
    },
    "text": "The Property to the left of this has double value in combat and has its cooldown reduced by ( 10% » 20% » 30% )."
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
    },
    "text": "Deal ( 75 » 150 ) damage.",
    "bottomtext": "When you use an ammo item, this gains ( 1 » 2 ) Multicast for the fight."
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
    },
    "text": "When you use the weapon to the right of this, this gains ( 10 » 20 » 40 ) Shield for the fight.",
    "bottomtext": "Shield 10."
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
    },
    "text": "Heal ( 5 » 10 » 15 » 20 ).",
    "bottomtext": "Shield ( 5 » 10 » 15 » 20 )."
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
    "cooldown": null,
    "enchants": {},
    "text": "Sells for gold"
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
    },
    "text": "Deal 10 damage.",
    "bottomtext": "When you Shield, this gains ( 5 » 10 » 20 ) Damage for the fight."
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
    },
    "text": "Shield 10.",
    "bottomtext": "When you use a non-weapon item, this gains ( 10 » 20 » 30 ) Shield for the fight."
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
    },
    "text": "Lifesteal 100",
    "bottomtext": "When you Poison, this gains ( 10% » 20% ) Crit Chance for the fight."
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
    },
    "text": "Charge the item to the left of this ( 1 » 2 » 3 » 4 ) second(s)."
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
    },
    "text": "When you use the Weapon to the left of this, deal ( 5 » 15 » 30 » 50 ) damage."
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
    },
    "text": "Haste ( 1 » 2 » 3 » 4 ) Aquatic item(s) for 2 second(s)."
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
    },
    "text": "Deal 10 damage.",
    "bottomtext": "When you buy another item, this gains ( 10 » 20 » 40 » 80 ) damage."
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
    "cooldown": null,
    "enchants": {
      "Golden": "When you buy a property, gain 1 Gold."
    },
    "text": "When your enemy uses an item, use a Busy Bees.",
    "bottomtext": "When you buy a Property, get a Busy Bee and give your Busy Bees ( +5 » +10 » +15 ) damage."
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
    },
    "text": "Deal 20 damage.",
    "bottomtext": "When this gains Haste, this gains ( 10 » 20 » 40 ) damage for the fight."
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
    "cooldown": null,
    "enchants": {},
    "text": "You have ( +50% » +75% » +100% ) Max Health."
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
    },
    "text": "Freeze 1 small item for ( 1 » 2 » 3 » 4 ) second(s).",
    "bottomtext": "When you use the Core or another Ray, give this Haste for ( 1 » 2 » 3 » 4 ) second(s)."
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
    },
    "text": "Deal 20 damage.",
    "bottomtext": "Your other Friends' cooldowns are reduced by ( 10% » 20% » 30% )."
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
    "cooldown": null,
    "enchants": {
      "Golden": "Double Value",
      "Deadly": "Double Crit Chance"
    },
    "text": "Your Properties have ( +25% » +50% ) Crit Chance.",
    "bottomtext": "Your other items have ( +1 » +2 ) value."
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
    },
    "text": "Multicast 2",
    "bottomtext": "Charge adjacent items ( 1 » 1 » 2 » 3 ) second(s)."
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
    },
    "text": "Heal ( 15 » 30 » 50 ).",
    "bottomtext": "When you Poison, charge this ( 1 » 1 » 2 ) second(s)."
  },
  "Blast Doors": {
    "name": "Blast Doors",
    "icon": "images/items/BlastDoors.avif",
    "tier": "Bronze",
    "tags": [
      "Dooley",
      "Medium",
      "Shield"
    ],
    "cooldown": null,
    "enchants": {
      "Heavy": "Slow 2 items for 4 second(s).",
      "Icy": "Freeze 1 item for 4 second(s).",
      "Turbo": "Haste 2 items for 4 second(s).",
      "Shielded": "Double Shield",
      "Restorative": "Heal 165.",
      "Toxic": "Poison 11.",
      "Fiery": "Burn 16.",
      "Shiny": "+1 Multicast",
      "Deadly": "+50% Crit Chance"
    },
    "text": "Shield ( 20 » 60 » 120 » 200 ).",
    "bottomtext": "This has + Shield equal to your Shield."
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
    },
    "text": "Burn ( 2 » 4 » 6 » 8 )."
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
    },
    "text": "Deal 2 damage.",
    "bottomtext": "Poison equal to this item's damage."
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
    "cooldown": null,
    "enchants": {},
    "text": "When you sell this, give your items ( +1% » +2% » +3% » +4% ) Crit Chance."
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
    "cooldown": 3,
    "enchants": {},
    "text": "The item to the left of this gains ( 4% » 8% » 12% » 16% ) Crit Chance for the fight."
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
    "cooldown": 3,
    "enchants": {},
    "text": "Adjacent items gain ( 2% » 4% » 6% » 8% ) Crit Chance for the fight."
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
    "cooldown": 3,
    "enchants": {},
    "text": "Give your items ( +1% » +2% » +3% » +4% ) Crit Chance for the fight."
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
    },
    "text": "Heal ( 10 » 30 » 60 » 100 ).",
    "bottomtext": "When you sell this, gain ( 20 » 60 » 120 » 200 ) Max Health."
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
    },
    "text": "Deal ( 50 » 100 ) damage.",
    "bottomtext": "When you Burn, charge this ( 1 » 2 ) second(s)."
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
    },
    "text": "Deal ( 20 » 60 » 120 » 200 ) damage.",
    "bottomtext": "Slow 1 item for ( 2 » 3 » 4 » 5 ) second(s)."
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
    },
    "text": "Burn ( 2 » 4 » 6 » 8 ).",
    "bottomtext": "When you use an adjacent friend, this gains Haste for ( 2 » 3 » 4 » 5 ) second(s)."
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
    },
    "text": "When you use a Property, Freeze an item ( 1 » 2 » 3 ) second(s)."
  },
  "Bootstraps": {
    "name": "Bootstraps",
    "icon": "images/items/Bootstraps.avif",
    "tier": "Silver",
    "tags": [
      "Pygmalien",
      "Medium"
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
    },
    "text": "Every 50 you spend, upgrade a random item of a lower tier. [Gold Spent: 0]"
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
    },
    "text": "Deal ( 25 » 75 » 150 » 250 ) damage.",
    "bottomtext": "Burn ( 4 » 6 » 8 » 10 )."
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
    },
    "text": "Deal ( 5 » 15 » 30 » 50 ) damage.",
    "bottomtext": "This has double damage."
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
    },
    "text": "Shield ( 10 » 30 » 60 » 100 ).",
    "bottomtext": "When you use an adjacent Friend, this gains ( 5 » 15 » 30 » 50 ) Shield for the fight."
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
    },
    "text": "Deal ( 10 » 30 » 60 » 100 ) damage.",
    "bottomtext": "When you sell this, get 2 Spare Change."
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
    },
    "text": "Your weapons gain ( 2 » 4 » 8 ) damage for the fight.",
    "bottomtext": "When you use a Weapon, charge this 1 second(s)."
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
    "cooldown": null,
    "enchants": {},
    "text": "Farai will return for this"
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
    "cooldown": null,
    "enchants": {
      "Heavy": "At the start of each fight, Slow 4 enemy items for 4 second(s).",
      "Icy": "At the start of each fight, Freeze 2 item for 4 second(s).",
      "Turbo": "At the start of each fight, Haste 4 items for 4 second(s).",
      "Shielded": "At the start of each fight, shield 0.",
      "Restorative": "You have +18 Regeneration.",
      "Toxic": "At the start of each fight, poison 18.",
      "Fiery": "At the start of each fight, burn 24."
    },
    "text": "When you take damage, Shield equal to ( 30% » 40% » 50% ) of the damage dealt."
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
    },
    "text": "Heal 10.",
    "bottomtext": "When you Heal, Shield ( 10 » 20 » 30 » 40 )."
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
    "cooldown": null,
    "enchants": {
      "Golden": "Double Value",
      "Shiny": "This has +2 value gain."
    },
    "text": "When you visit a Merchant, this gains ( 1 » 2 » 3 ) value.",
    "bottomtext": "For every 5 Merchants you visit, upgrade this. [Merchants Visited: 0]"
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
    "cooldown": 8,
    "enchants": {},
    "text": "Deal ( 5 » 10 » 15 ) damage."
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
    },
    "text": "Adjacent Food and Tools gain Haste for 3 second(s)."
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
    },
    "text": "Multicast ( 2 » 3 » 4 )",
    "bottomtext": "Deal 5 damage."
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
    },
    "text": "When your enemy uses an item, deal 1 damage."
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
    "cooldown": 4,
    "enchants": {},
    "text": "Adjacent Shield items permanently gain ( +1 » +2 » +3 » +4 ) Shield.",
    "bottomtext": "This permanently loses 1 Max Ammo."
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
    },
    "text": "Deal ( 25 » 75 » 150 » 250 ) damage.",
    "bottomtext": "Burn ( 3 » 6 » 9 » 12 )."
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
    },
    "text": "When you use a weapon, deal ( 50 » 100 ) damage."
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
    },
    "text": "Adjacent items have ( +1 » +2 » +3 » +4 ) Ammo."
  },
  "Capacitor": {
    "name": "Capacitor",
    "icon": "images/items/Capacitor.avif",
    "tier": "Bronze",
    "tags": [
      "Dooley",
      "Small",
      "Cooldown"
    ],
    "cooldown": null,
    "enchants": {
      "Heavy": "Slow 1 item for 3 second(s).",
      "Icy": "Freeze 1 item for 1 second(s).",
      "Turbo": "Haste 1 item for 3 second(s).",
      "Shielded": "Shield 45.",
      "Restorative": "Heal 70.",
      "Toxic": "Poison 4.",
      "Fiery": "Burn 7.",
      "Shiny": "+1 Multicast",
      "Deadly": "Adjacent items have +25% Crit Chance."
    },
    "text": "Charge adjacent items 1 second(s)."
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
    },
    "text": "Haste adjacent items for ( 1 » 2 » 3 ) second(s).",
    "bottomtext": "When you use a large item, use this."
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
    "cooldown": null,
    "enchants": {
      "Golden": "Get 2 Gumballs and Spare Change instead.",
      "Shiny": "Get 2 Gumballs and Spare Change instead."
    },
    "text": "When you buy, sell or upgrade this, get 1 Candy and 1 Spare Change."
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
    },
    "text": "Deal 20 damage.",
    "bottomtext": "When you gain gold, permanently give this + damage equal to ( 1x » 2x » 3x ) the amount of gold gained."
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
    "cooldown": null,
    "enchants": {
      "Golden": "You have +3 Income.",
      "Shiny": "At the start of each hour, get an additional 2 Spare Change."
    },
    "text": "At the start of each day, get 3 Spare Change."
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
    },
    "text": "When you use the item to the left of this, haste the item to the right of this for ( 1 » 2 » 3 ) second(s)."
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
    },
    "text": "Poison ( 1 » 2 » 3 » 4 ).",
    "bottomtext": "When this gains Haste, give it ( +1 » +2 » +3 » +4 ) Poison for the fight."
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
    },
    "text": "Burn ( 2 » 4 » 6 ).",
    "bottomtext": "Poison ( 1 » 2 » 3 )."
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
    },
    "text": "Burn ( 1 » 2 » 3 ).",
    "bottomtext": "When you use another friend, this gains ( 1 » 2 » 3 ) Burn for the fight."
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
    },
    "text": "When you use the item to the left of this, charge the item to the right for ( 1 » 2 ) second(s).",
    "bottomtext": "When you use the Core, give it ( +20 » +40 ) damage for the fight."
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
    },
    "text": "Slow 1 item for ( 1 » 2 » 3 » 4 ) second(s).",
    "bottomtext": "When you slow, Poison ( 1 » 2 » 3 » 5 )."
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
    "cooldown": null,
    "enchants": {},
    "text": "When you sell this, gain ( 10 » 20 » 30 » 40 ) Max Health."
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
    },
    "text": "Deal ( 5 » 10 » 20 » 40 ) damage.",
    "bottomtext": "Shield ( 5 » 10 » 20 » 40 )."
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
    },
    "text": "Shield ( 50 » 100 ).",
    "bottomtext": "Enemy cooldowns are increased by ( 1 » 2 ) second(s)."
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
    },
    "text": "Your Aquatic items gain ( 2% » 3% » 4% » 5% ) Crit Chance for the fight.",
    "bottomtext": "When you buy this, get a Piranha."
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
    "cooldown": null,
    "enchants": {},
    "text": "When you sell this, your leftmost Burn item gains ( +1 » +2 » +3 » +4 ) Burn."
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
    "cooldown": null,
    "enchants": {},
    "text": "When you sell this, gain ( 1 » 2 » 3 » 4 ) Regeneration."
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
    },
    "text": "Slow ( 1 » 2 » 3 » 4 ) item(s) for ( 1 » 1 » 1 » 2 ) second(s).",
    "bottomtext": "At the start of each fight, use this."
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
    },
    "text": "Deal 10 damage.",
    "bottomtext": "When this gains Haste, this and the weapon to the left gains ( 5 » 10 ) damage for the fight."
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
    },
    "text": "Deal 10 damage.",
    "bottomtext": "When you use a Friend, this gains ( 10 » 20 » 40 ) damage for the fight."
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
    },
    "text": "Deal ( 8 » 24 » 48 » 100 ) Damage.",
    "bottomtext": "This deals double Crit damage."
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
    },
    "text": "Deal ( 10 » 30 » 60 » 100 ) damage.",
    "bottomtext": "When you sell this, reduce your items' cooldown by ( 1% » 2% » 3% » 4% )."
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
    "cooldown": null,
    "enchants": {
      "Golden": "You have +3 Income.",
      "Shiny": "You have additional Regeneration equal to the value of adjacent properties.",
      "Deadly": "Adjacent properties have +50% Crit Chance."
    },
    "text": "You have Regeneration equal to ( 1x » 2x ) adjacent properties' values. [0]"
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
    "cooldown": null,
    "enchants": {},
    "text": "When you sell this, gain ( 10 » 20 » 30 » 40 ) Max Health."
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
    },
    "text": "Haste an adjacent item for ( 1 » 2 » 3 ) second(s)."
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
    },
    "text": "Deal ( 50 » 100 » 150 ) damage.",
    "bottomtext": "When you sell this, gain 2 Icicles."
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
    },
    "text": "Deal 25 damage.",
    "bottomtext": "When you use any item to the right of this, this gains ( 10 » 25 » 50 ) Shield for the fight."
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
    },
    "text": "Haste your other friends ( 1 » 2 » 3 » 4 ) second(s).",
    "bottomtext": "When you use another Friend, Charge this 1 second(s)."
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
    },
    "text": "Deal ( 12 » 24 » 40 ) damage.",
    "bottomtext": "Gain ( 1 » 2 » 3 ) gold."
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
    "cooldown": 5,
    "enchants": {},
    "text": "When you sell this, you lose ( 10 » 20 » 30 » 40 ) Max Health.",
    "bottomtext": "When you sell this, gain ( 1 » 2 » 3 » 4 ) Regeneration."
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
    },
    "text": "Slow 1 item for ( 1 » 2 » 3 » 4 ) second(s).",
    "bottomtext": "When you use the Core, slow an item for ( 1 » 2 » 3 » 4 ) second(s)."
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
    },
    "text": "Freeze 1 item for ( 1 » 2 » 3 » 4 ) second(s).",
    "bottomtext": "Cleanse half your Burn."
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
    },
    "text": "Give the Core ( +5% » +10% » +15% ) Crit Chance for the fight.",
    "bottomtext": "While you have Burn, reduce this item's cooldown by 50%."
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
    },
    "text": "Poison ( 1 » 2 » 3 » 4 ).",
    "bottomtext": "Gain ( 5 » 10 » 15 » 20 ) shield."
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
    },
    "text": "Heal 10.",
    "bottomtext": "When you buy an Aquatic item, this gains Heal ( 5 » 10 » 15 » 20 )."
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
    },
    "text": "Shield 10.",
    "bottomtext": "When you buy an Aquatic item, this gains ( 10 » 20 » 30 » 50 ) Shield."
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
    },
    "text": "Shield ( 50 » 100 ).",
    "bottomtext": "When this gains haste, give your items ( +3% » +5% ) crit chance for the fight."
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
    },
    "text": "Your Shield items gain ( 4 » 8 » 12 ) shield and your Weapons ( +4 » +8 » +12 ) damage for the fight.",
    "bottomtext": "When you crit, charge this 1 second(s)."
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
    },
    "text": "Shield equal to ( 1x » 2x » 3x » 4x ) this item's value.",
    "bottomtext": "When you sell an item, this gains ( 1 » 1 » 1 » 2 ) value."
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
    },
    "text": "Deal ( 100 » 200 ) damage.",
    "bottomtext": "When you use an adjacent Medium item, this gains ( 20% » 40% ) damage for the fight."
  },
  "Critical Core": {
    "name": "Critical Core",
    "icon": "images/items/CriticalCore.avif",
    "tier": "Bronze",
    "tags": [
      "Dooley",
      "Medium",
      "Active",
      "Charge",
      "Core",
      "Crit",
      "Damage",
      "Unsellable",
      "Weapon"
    ],
    "cooldown": null,
    "enchants": {
      "Heavy": "Slow 2 items for 3 second(s).",
      "Icy": "Freeze 1 item for 3 second(s).",
      "Turbo": "Haste 2 items for 3 second(s).",
      "Shielded": "Shield 80.",
      "Restorative": "Heal 120.",
      "Toxic": "Poison 8.",
      "Fiery": "Burn 12.",
      "Shiny": "+1 Multicast",
      "Deadly": "This has +50% Crit Chance.",
      "Obsidian": "Lifesteal"
    },
    "text": "Deal ( 10 » 30 » 60 » 100 ) damage.",
    "bottomtext": "When you Crit with any item, Charge this 1 second(s)."
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
    "cooldown": 5,
    "enchants": {
      "Shielded": "Your Shield items have +10 Shield for each Medium item you have.",
      "Restorative": "Your Heal items have +15 Heal for each Medium item you have.",
      "Toxic": "Your Poison items have +2 Poison for each Medium item you have.",
      "Fiery": "Your Burn items have +3 Burn for each Medium item you have.",
      "Deadly": "Your items have +10% Crit Chance for each Medium item you have.",
      "Obsidian": "Lifesteal"
    },
    "text": "Deal ( 10 » 20 » 40 ) damage.",
    "bottomtext": "Your Weapons have ( +10 » +20 » +40 ) Damage for each Medium item you have."
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
    },
    "text": "Your weapons have ( +25% » +50% » +75% » +100% ) Crit Chance.",
    "bottomtext": "If you have exactly one weapon, that Weapon has lifesteal."
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
    },
    "text": "Your Shield items gain ( 2 » 4 » 6 » 8 ) Shield for the fight.",
    "bottomtext": "Deal damage equal to the highest shield value of items you have."
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
    },
    "text": "Freeze this for 2 second(s).",
    "bottomtext": "When ANY item gains Freeze, Shield ( 15 » 30 » 45 » 60 )."
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
    },
    "text": "Freeze all items other than The Core for ( 2 » 3 ) second(s)."
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
    "cooldown": null,
    "enchants": {
      "Golden": "Double Value",
      "Shiny": "Double Value"
    },
    "text": "At the start of each hour, set this item's value to a number between 0 and ( 5 » 10 » 20 » 40 )."
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
    },
    "text": "Heal equal to ( 1x » 2x » 3x » 4x ) this item's value.",
    "bottomtext": "When you lose a fight with Crystal Bonsai, this item loses all of its value."
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
    },
    "text": "Burn ( 4 » 6 » 8 ).",
    "bottomtext": "Charge another small item ( 3 » 4 » 5 ) second(s)."
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
    },
    "text": "Deal ( 6 » 18 » 36 » 60 ) damage.",
    "bottomtext": "This deals double Crit damage."
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
    },
    "text": "Deal 20 damage for each Weapon you have.",
    "bottomtext": "This deals ( double » triple » quadruple ) damage if it is your only friend."
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
    },
    "text": "Destroy this, all enemy small items for the fight and slow all enemy medium items for 10 second(s).",
    "bottomtext": "When you use another Aquatic item, charge this 1 second(s)."
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
    },
    "text": "Poison ( 1 » 2 ).",
    "bottomtext": "Increase the poison of your items by ( 1 » 2 ) for the fight."
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
    "cooldown": null,
    "enchants": {
      "Golden": "This has double value.",
      "Shiny": "Double Value"
    },
    "text": "When you sell a Large item, this gains ( 2 » 4 » 6 ) Sell Value.",
    "bottomtext": "Your items have double value in combat."
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
    },
    "text": "Deal 40 damage.",
    "bottomtext": "When you destroy an item during combat, your Dinosaurs permanently gain ( 10 » 20 » 40 ) damage."
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
    },
    "text": "When you buy this, get a non-Vanessa item.",
    "bottomtext": "Your items from other Heroes have ( +15% » +30% » +50% ) Crit Chance."
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
    },
    "text": "Haste your tools for ( 1 » 2 » 3 » 4 ) second(s).",
    "bottomtext": "Your weapons gain ( 10 » 20 » 40 » 80 ) damage for the fight."
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
    },
    "text": "Haste your Friends for ( 1 » 2 » 3 ) second(s).",
    "bottomtext": "When you buy this, get 3 Nanobots."
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
    },
    "text": "Slow ( 2 » 3 » 4 ) item(s) for 3 second(s)."
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
    },
    "text": "Deal 10 Damage",
    "bottomtext": "When you sell a small item, this gains ( 3 » 6 » 9 » 12 ) damage."
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
    },
    "text": "Shield ( 20 » 40 » 60 ).",
    "bottomtext": "When this or an adjacent item gains Freeze, Shield ( 20 » 40 » 60 ) and remove Freeze from it."
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
    },
    "text": "Multicast 2",
    "bottomtext": "Deal ( 15 » 45 » 90 » 180 ) damage."
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
    },
    "text": "Multicast 2",
    "bottomtext": "Deal damage equal to ( 10% » 15% » 20% ) of your Max Health."
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
    },
    "text": "Deal ( 10 » 20 ) damage.",
    "bottomtext": "At the start of each fight with Dragon Tooth, spend 3 gold and your weapons permanently gain ( 5 » 10 ) damage."
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
    },
    "text": "Deal ( 1 » 2 » 3 ) damage.",
    "bottomtext": "Burn equal to this item's damage."
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
    },
    "text": "Slow 1 item for ( 1 » 2 » 3 » 4 ) second(s).",
    "bottomtext": "When you use an adjacent item, Shield ( 5 » 10 » 15 » 20 )."
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
    "cooldown": null,
    "enchants": {},
    "text": "When you sell this, your leftmost item gains ( 5% » 10% » 15% » 20% ) Crit Chance."
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
    },
    "text": "Slow 1 item for ( 1 » 2 » 3 ) second(s).",
    "bottomtext": "When you slow, permanently gain ( 1 » 2 » 3 ) Max Health."
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
    },
    "text": "Poison ( 1 » 2 » 3 ).",
    "bottomtext": "Heal equal to your opponent's Poison."
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
    },
    "text": "When your enemy uses a Weapon, deal ( 5 » 10 » 20 ) damage.",
    "bottomtext": "When your enemy uses a non-Weapon item, Slow it for ( 1 » 2 » 3 ) second(s)."
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
    },
    "text": "Poison ( 1 » 2 » 3 ).",
    "bottomtext": "Increase your other items' Poison by 1."
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
    },
    "text": "Haste your items for ( 2 » 4 » 6 » 8 ) second(s)."
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
    "cooldown": 4,
    "enchants": {},
    "text": "Adjacent Weapons permanently gain ( +1 » +2 » +3 » +4 ) Damage.",
    "bottomtext": "This permanently loses 1 Max Ammo."
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
    "cooldown": null,
    "enchants": {
      "Shiny": "DamageAmount0",
      "Deadly": "+50% Crit Chance"
    },
    "text": "Adjacent Weapons have ( +5 » +15 » +30 » +50 ) damage.",
    "bottomtext": "When you sell this, your weapons gain ( 2 » 4 » 6 » 8 ) damage."
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
    "cooldown": null,
    "enchants": {},
    "text": "When you sell this, your leftmost Poison item gains ( +1 » +2 » +3 » +4 ) Poison."
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
    },
    "text": "Destroy an enemy item for the fight.",
    "bottomtext": "When you use an adjacent item, charge this 1 second(s)."
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
    },
    "text": "Deal ( 3 » 9 » 18 » 30 ) damage."
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
    "cooldown": null,
    "enchants": {},
    "text": "When you sell this, reduce your leftmost item's cooldown by ( 4% » 8% » 12% » 16% )."
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
    },
    "text": "When you use your leftmost item, charge your rightmost item ( 1 » 2 ) second(s)."
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
    },
    "text": "Aquatic items to the left of this have their cooldowns reduced by ( 10% » 20% » 30% ).",
    "bottomtext": "Weapons to the right of this have ( +25 » +50 » +100 ) damage."
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
    },
    "text": "Burn ( 3 » 6 » 9 » 12 ).",
    "bottomtext": "This has + Burn equal to the Burn of your other items. [0]"
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
    },
    "text": "Burn ( 6 » 9 » 12 » 15 )."
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
    },
    "text": "Haste 1 item for ( 1 » 2 » 3 ) second(s).",
    "bottomtext": "When you Haste, Heal ( 5 » 10 » 15 )."
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
    },
    "text": "Slow ( 1 » 2 » 3 » 4 ) item for 3 second(s).",
    "bottomtext": "At the start of each day, get a Piranha."
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
    },
    "text": "Give another Aquatic item Haste for ( 2 » 3 » 4 » 5 ) second(s).",
    "bottomtext": "At the start of each day, get a Small aquatic item."
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
    },
    "text": "Shield equal to ( 1x » 2x » 3x » 4x ) this item's value.",
    "bottomtext": "At the start of each day, upgrade this."
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
    },
    "text": "Deal ( 25 » 50 » 75 ) damage.",
    "bottomtext": "If you have another Tool, Ammo, Property or Friend this has +1 Multicast for each."
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
    },
    "text": "Multicast 3",
    "bottomtext": "Deal ( 5 » 15 » 30 » 50 ) damage."
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
    },
    "text": "Deal 200 damage.",
    "bottomtext": "This deals quadruple crit damage."
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
    },
    "text": "Deal ( 2 » 4 ) damage.",
    "bottomtext": "Burn equal to ( 2x » 3x ) this item's damage."
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
    },
    "text": "Slow all enemy items for ( 3 » 4 » 5 ) second(s)."
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
    },
    "text": "Shield ( 10 » 30 » 60 » 100 ).",
    "bottomtext": "Deal damage equal to your shield."
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
    },
    "text": "Deal ( 50 » 100 ) damage for each item to the left of this.",
    "bottomtext": "Haste this and the items on the right of this for ( 2 » 4 ) second(s)."
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
    },
    "text": "When you use an item, Shield ( 10 » 20 ).",
    "bottomtext": "Enemy item cooldowns are increased by ( 1 » 2 )."
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
    },
    "text": "Deal ( 200 » 400 ) damage.",
    "bottomtext": "When you Slow, charge this ( 1 » 2 ) second(s)."
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
    },
    "text": "Freeze ( 1 » 2 » 3 » 4 ) item(s) for 2 second(s)."
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
    },
    "text": "Deal ( 10 » 30 » 60 » 100 ) damage.",
    "bottomtext": "When you freeze an item, your weapons gain ( 4 » 6 » 8 » 10 ) damage for the fight."
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
    },
    "text": "Poison ( 3 » 4 ).",
    "bottomtext": "When you use the Core or another Ray, this gains ( 3 » 4 ) Poison for the fight."
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
    },
    "text": "Adjacent weapons gain ( 5 » 10 » 15 » 20 ) Damage for the fight.",
    "bottomtext": "Adjacent Shield items gain ( 5 » 10 » 15 » 20 ) Shield for the fight."
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
    },
    "text": "Deal ( 10 » 20 ) damage.",
    "bottomtext": "Reduce this item's cooldown by ( 10% » 20% ) for the fight."
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
    },
    "text": "Deal ( 500 » 1000 ) damage to the player with less health."
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
    },
    "text": "Shield ( 20 » 40 » 60 » 80 ).",
    "bottomtext": "When you sell a Tool, this gains 1 Max Ammo."
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
    "cooldown": null,
    "enchants": {},
    "text": "When you sell this, gain access to the genie Rit."
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
    },
    "text": "Deal ( 500 » 1000 ) damage.",
    "bottomtext": "When any item gains Freeze, charge this ( 1 » 2 ) second(s)."
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
    "cooldown": null,
    "enchants": {},
    "text": "When you sell this, gain ( 2 » 4 » 6 » 8 ) Regeneration."
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
    },
    "text": "At the start of each day, gain ( 100 » 200 » 300 ) Max Health."
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
    },
    "text": "Shield ( 10 » 30 » 60 » 100 ).",
    "bottomtext": "When this gains Haste, give your items ( +2% » +4% » +6% » +8% ) Crit chance for the fight."
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
    },
    "text": "Deal 20 damage.",
    "bottomtext": "When you Heal, this gains ( 10 » 20 » 30 » 40 ) damage for the fight."
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
    },
    "text": "Haste the Core for ( 1 » 2 » 3 » 4 ) second(s)."
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
    },
    "text": "Deal ( 15 » 30 » 50 ) damage.",
    "bottomtext": "When you use another ammo item, this reloads 1 ammo."
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
    },
    "text": "Deal ( 10 » 20 » 30 ) damage.",
    "bottomtext": "Slow 1 item for ( 3 » 4 » 5 ) second(s)."
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
    "cooldown": null,
    "enchants": {},
    "text": "When you sell this, gain ( 10 » 20 » 30 » 40 ) Max Health."
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
    },
    "text": "Crit Chance 25%",
    "bottomtext": "Deal ( 40 » 80 » 150 » 300 ) damage."
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
    },
    "text": "Give the weapon to the left of this ( +10 » +20 » +30 ) damage for the fight."
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
    },
    "text": "Shield ( 10 » 20 » 30 ).",
    "bottomtext": "At the start of each hour, spend 2 gold to get a Gumball."
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
    "cooldown": null,
    "enchants": {},
    "text": "When you sell this, your leftmost Ammo item gains ( 1 » 2 » 3 ) Max Ammo."
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
    },
    "text": "Deal ( 25 » 50 ) damage.",
    "bottomtext": "The first time you use this each fight, destroy a small enemy item for the fight."
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
    },
    "text": "Deal ( 50 » 150 » 300 » 500 ) damage.",
    "bottomtext": "When this gains Haste, it also gains ( 5% » 10% » 15% » 20% ) Crit Chance for the fight."
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
    },
    "text": "Multicast 2",
    "bottomtext": "Deal ( 3 » 9 » 18 » 30 ) damage."
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
    },
    "text": "Deal ( 20 » 40 » 80 ) damage.",
    "bottomtext": "When you Level Up, if you have at least 3 tools, upgrade the item to the left of this."
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
    },
    "text": "Deal ( 15 » 30 » 45 ) damage.",
    "bottomtext": "When you Slow, charge this ( 1 » 1 » 2 ) second(s)."
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
    },
    "text": "Heal ( 100 » 200 ).",
    "bottomtext": "This item's cooldown is reduced by 5 seconds for each adjacent large item."
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
    },
    "text": "Deal ( 5 » 15 » 30 » 50 ) damage.",
    "bottomtext": "Your weapons have ( +3 » +6 » +9 » +15 ) damage."
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
    },
    "text": "Shield ( 10 » 30 » 60 » 100 ).",
    "bottomtext": "When you Shield, deal damage equal to this item's Shield."
  },
  "Harpoon": {
    "name": "Harpoon",
    "icon": "images/items/Harpoon.avif",
    "tier": "Bronze",
    "tags": [
      "Vanessa",
      "Medium",
      "Ammo",
      "Aquatic"
    ],
    "cooldown": null,
    "enchants": {
      "Heavy": "Slow 2 items for 4 second(s).",
      "Icy": "Freeze 1 item for 4 second(s).",
      "Turbo": "Haste 2 items for 4 second(s).",
      "Shielded": "Shield 60.",
      "Restorative": "Heal 90.",
      "Toxic": "Poison 6.",
      "Fiery": "Burn 9.",
      "Shiny": "+1 Multicast"
    },
    "text": "Destroy a small item."
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
    },
    "text": "Deal ( 5 » 15 » 30 » 50 ) damage.",
    "bottomtext": "When you buy this, get a Spare Change."
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
    },
    "text": "Poison ( 2 » 3 » 4 » 5 )."
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
    },
    "text": "Heal equal to ( 4% » 8% » 12% ) of your Max Health.",
    "bottomtext": "When you Heal, gain ( 5 » 15 » 30 ) Max Health for the fight."
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
    "cooldown": null,
    "enchants": {
      "Heavy": "At the start of each fight, Slow small enemy items for 2 second(s).",
      "Icy": "At the start of each fight, Freeze 1 item for 4 second(s).",
      "Turbo": "Double Haste",
      "Shielded": "At the start of each fight, Shield 60.",
      "Toxic": "At the start of each fight, poison 3.",
      "Fiery": "At the start of each fight, burn 3.",
      "Deadly": "Your Small items have +20% Crit Chance."
    },
    "text": "At the start of each fight, your Small items gain Haste for ( 1 » 2 » 3 ) second(s)."
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
    },
    "text": "Give the weapon to the right of this ( +5 » +10 » +15 » +20 ) damage for the fight."
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
    },
    "text": "Heal ( 20 » 60 » 120 » 200 ).",
    "bottomtext": "When you sell this, your Heal items gain ( 10 » 20 » 30 » 40 ) Heal."
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
    },
    "text": "Deal ( 26 » 39 » 59 ) damage.",
    "bottomtext": "When you use a Tool, your weapons gain ( 2 » 4 ) damage for the fight."
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
    },
    "text": "Freeze 1 item for ( 1 » 2 » 3 ) second(s).",
    "bottomtext": "When you Freeze, Poison ( 1 » 2 » 3 )."
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
    },
    "text": "Freeze 1 item for ( 1 » 2 » 4 ) second(s).",
    "bottomtext": "When you use another non-weapon item, charge this 1 second(s)."
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
    },
    "text": "Freeze 3 small items for ( 1 » 2 ) second(s)."
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
    },
    "text": "Deal 20 damage.",
    "bottomtext": "When you Freeze, this gains ( 5 » 10 » 20 ) damage for the fight."
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
    "cooldown": null,
    "enchants": {
      "Heavy": "When your enemy uses an item, slow 1 item for 3 second(s).",
      "Icy": "Double Freeze",
      "Turbo": "When your enemy uses an item, haste 1 item for 3 second(s).",
      "Shielded": "When your enemy uses an item, shield 30.",
      "Restorative": "When your enemy uses an item, heal 45.",
      "Toxic": "When your enemy uses an item, poison 3.",
      "Fiery": "When your enemy uses an item, burn 4."
    },
    "text": "When your enemy uses an item, Freeze it for 1 second(s)."
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
    },
    "text": "Deal ( 40 » 80 » 120 ) damage.",
    "bottomtext": "When this item gains Freeze, remove Freeze from it."
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
    },
    "text": "At the start of each fight, freeze 1 item for ( 3 » 4 » 5 » 6 ) second(s)."
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
    },
    "text": "Freeze 1 item for ( 2 » 3 » 4 ) second(s).",
    "bottomtext": "When you Freeze, Shield ( 20 » 30 » 40 )."
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
    },
    "text": "Burn ( 4 » 8 » 12 » 16 ).",
    "bottomtext": "When you use any item to the left of this, Charge this 1 second(s)."
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
    },
    "text": "Slow 1 item for ( 1 » 2 » 3 » 4 ) second(s).",
    "bottomtext": "For each adjacent Friend, this gains 1 Multicast."
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
    },
    "text": "Deal ( 20 » 60 » 120 » 200 ) damage.",
    "bottomtext": "When you sell this, your leftmost Slow item gains ( +1 » +2 » +3 » +4 ) Slow."
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
    },
    "text": "When you use an adjacent item, Burn 2.",
    "bottomtext": "Adjacent items have +1 ammo."
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
    },
    "text": "Slow 1 item for ( 4 » 5 » 6 ) second(s).",
    "bottomtext": "When you Slow, Heal ( 16 » 24 » 32 )."
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
    },
    "text": "Shield ( 40 » 80 ).",
    "bottomtext": "Slow your adjacent items for 1 second(s)."
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
    },
    "text": "Deal 2 damage.",
    "bottomtext": "This item gains + Damage for the fight equal to your enemy's Burn."
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
    "cooldown": null,
    "enchants": {},
    "text": "When you sell this, reduce your items' cooldowns by ( 3% » 6% » 9% » 12% )."
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
    },
    "text": "Freeze 1 item for ( 1 » 2 » 3 ) second(s)."
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
    },
    "text": "When you use a weapon, your weapons gain ( 1 » 2 » 3 ) Damage for the fight.",
    "bottomtext": "When you use a Weapon, Haste it for ( 1 » 2 » 3 ) second(s)."
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
    },
    "text": "Multicast 2",
    "bottomtext": "This has +1 Multicast if you have more health than your enemy."
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
    },
    "text": "Deal ( 75 » 150 » 300 ) damage.",
    "bottomtext": "When you Haste, Reload this 1 Ammo."
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
    },
    "text": "Poison ( 1 » 2 » 3 » 4 ).",
    "bottomtext": "When you use another Aquatic item, this gains Haste for ( 1 » 2 » 3 » 4 ) second(s)."
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
    },
    "text": "Shield equal to ( 1x » 2x » 3x » 4x ) this item's value."
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
    },
    "text": "Deal 10 damage.",
    "bottomtext": "When you slow, this gains ( 5 » 10 » 20 ) damage for the fight."
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
    },
    "text": "Deal ( 25 » 50 » 75 ) damage.",
    "bottomtext": "Poison ( 4 » 6 » 8 )"
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
    },
    "text": "Deal ( 20 » 60 » 120 » 200 ) damage.",
    "bottomtext": "When you sell this, your weapons gain ( 4 » 6 » 8 » 10 ) damage."
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
    },
    "text": "Deal ( 15 » 30 » 50 » 100 ) damage for each Small item you have (including Stash)."
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
    },
    "text": "Heal ( 20 » 60 » 120 » 200 ).",
    "bottomtext": "When you sell this, give your leftmost Heal item ( +5 » +15 » +30 » +50 ) Heal."
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
    },
    "text": "Deal ( 4 » 12 » 24 » 40 ) damage."
  },
  "Keychain": {
    "name": "Keychain",
    "icon": "images/items/Keychain.avif",
    "tier": "Gold",
    "tags": [
      "Pygmalien",
      "Small"
    ],
    "cooldown": null,
    "enchants": {
      "Heavy": "Use a slow item.",
      "Icy": "Use a Freeze item.",
      "Turbo": "Use a Haste item.",
      "Shielded": "Use a Shield item.",
      "Restorative": "Use a Heal item.",
      "Toxic": "Use a Poison item.",
      "Fiery": "Use a Burn item.",
      "Shiny": "+1 Multicast"
    },
    "text": "Use a property."
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
    },
    "text": "Deal 100 damage.",
    "bottomtext": "When you use a Small item, give this ( 10 » 20 » 40 ) damage for the fight."
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
    "cooldown": null,
    "enchants": {},
    "text": "If this is on your board at the start of each day, gain ( 100 » 200 » 300 » 400 ) Max Health.",
    "bottomtext": "The cooldown of your items are increased by 1 second(s)."
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
    },
    "text": "Deal ( 5 » 15 » 30 » 50 ) damage.",
    "bottomtext": "When you use a weapon, deal ( 5 » 15 » 30 » 50 ) damage."
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
    },
    "text": "Deal 10 damage.",
    "bottomtext": "When you heal, this gains ( 10 » 20 » 30 ) damage for the fight."
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
    },
    "text": "When you use an item, Shield equal to ( 1x » 2x » 3x ) this item's value.",
    "bottomtext": "At the start of each hour, this gains ( 1 » 1 » 2 ) value."
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
    },
    "text": "Deal 25 damage.",
    "bottomtext": "When you win a fight with Langxian, this gains ( 25 » 50 » 75 » 100 ) damage."
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
    },
    "text": "Deal ( 10 » 30 » 60 » 100 ) damage."
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
    },
    "text": "Deal 10 damage.",
    "bottomtext": "When any Property is used, this gains ( 10 » 20 » 30 » 50 ) damage for the fight."
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
    },
    "text": "Lifesteal 100",
    "bottomtext": "When you poison, this gains ( 5 » 10 » 15 ) damage for the fight."
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
    },
    "text": "Heal equal to ( 5% » 10% » 15% ) of your Max Health.",
    "bottomtext": "When you sell a Small item, gain ( 10 » 20 » 40 ) Max Health."
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
    },
    "text": "Give the core ( +5 » +10 ) damage for the fight.",
    "bottomtext": "When this gains haste, charge it ( 1 » 2 ) second(s)."
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
    },
    "text": "Shield ( 10 » 30 » 60 » 100 ).",
    "bottomtext": "The first time you would die each fight, Heal ( 200 » 600 » 1200 » 2000 )."
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
    },
    "text": "Your weapons gain ( 1 » 2 » 3 » 4 ) damage for the fight.",
    "bottomtext": "When you sell this, your weapons gain ( 3 » 6 » 9 » 12 ) damage."
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
    },
    "text": "Adjacent items gain ( 2% » 4% » 6% » 8% ) Crit chance for the fight."
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
    },
    "text": "Burn ( 1 » 2 » 3 » 5 )."
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
    },
    "text": "When you Slow, Burn ( 3 » 5 )."
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
    },
    "text": "Deal ( 10 » 20 ) damage.",
    "bottomtext": "When any player uses an item, this gains ( 10 » 20 ) damage and ( 10 » 20 ) shield for the fight."
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
    },
    "text": "Deal damage equal to ( 10% » 20% ) of your Max Health.",
    "bottomtext": "When you Level Up, gain ( 100 » 200 ) Max Health."
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
    },
    "text": "When you win a fight, this gains ( 1 » 2 » 3 ) value.",
    "bottomtext": "Your weapons have + damage equal to this item's value. ( [4] » [8] » [16] )"
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
    "cooldown": null,
    "enchants": {
      "Golden": "Your small items have +1 value"
    },
    "text": "Your Small items have ( +1 » +2 ) sell value."
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
    },
    "text": "Multicast 2",
    "bottomtext": "Your weapons gain ( 3 » 6 » 10 ) damage for the fight."
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
    },
    "text": "The first time you would die each fight, Heal for ( 25% » 50% ) of your Max Health.",
    "bottomtext": "Your Heal items have +1 Multicast."
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
    },
    "text": "Crit Chance ( 10% » 20% » 35% » 50% )",
    "bottomtext": "When you Crit, this gains ( 4 » 12 » 24 » 40 ) damage for the fight."
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
    "cooldown": null,
    "enchants": {
      "Deadly": "+50% Crit Chance"
    },
    "text": "When you sell this, upgrade your leftmost item."
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
    "cooldown": null,
    "enchants": {
      "Heavy": "At the start of each fight, slow 2 item for 4 second(s).",
      "Icy": "At the start of each fight, Freeze 2 items for 2 second(s).",
      "Turbo": "At the start of each fight, haste 2 item for 4 second(s).",
      "Shielded": "At the start of each fight, shield 60%.",
      "Restorative": "At the start of each fight, gain 6 Regeneration for the fight.",
      "Toxic": "At the start of each fight, poison 6",
      "Fiery": "Double Burn"
    },
    "text": "At the start of each fight, Burn ( 6 » 9 » 12 » 15 )."
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
    },
    "text": "Deal ( 5 » 15 » 30 » 50 ) damage.",
    "bottomtext": "When you sell this, give your leftmost weapon ( +5 » +15 » +30 » +50 ) damage."
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
    },
    "text": "Slow 1 items for ( 1 » 2 » 3 » 4 ) second(s).",
    "bottomtext": "When you sell this, your leftmost Slow item gains ( 1 » 2 » 3 » 4 ) second to Slow."
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
    },
    "text": "Shield ( 20 » 60 » 120 » 200 ).",
    "bottomtext": "When you sell this, your Shield items gain ( 3 » 6 » 9 » 12 ) Shield."
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
    },
    "text": "When you use an adjacent Small item, slow ( 1 » 2 » 3 » 4 ) item for ( 1 » 2 » 3 » 4 ) second(s)."
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
    "cooldown": null,
    "enchants": {
      "Golden": "This has double value.",
      "Shiny": "This has +2 value gain."
    },
    "text": "At the start of each hour, this gains ( 1 » 2 » 3 ) value."
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
    },
    "text": "When you use a non-weapon item, Burn ( 1 » 2 » 4 )."
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
    },
    "text": "Deal ( 25 » 50 » 100 ) damage.",
    "bottomtext": "When this gains Haste, your Shield items gain ( 2 » 3 » 4 ) shield the fight."
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
    "cooldown": null,
    "enchants": {},
    "text": "When you sell this, your leftmost Heal item gains ( 5 » 10 » 15 » 20 ) Heal."
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
    },
    "text": "This gains 1 Value.",
    "bottomtext": "When you sell this, give The Core + Damage equal to ( 1x » 2x » 3x » 4x ) this item's value. ( 1 » 4 » 12 » 32 )"
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
    },
    "text": "When you use an adjacent item, give the other adjacent item haste for ( 1 » 2 » 3 ) second(s)."
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
    },
    "text": "Burn ( 3 » 6 » 9 » 12 ).",
    "bottomtext": "When you use a small item, charge this 1 second(s)."
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
    },
    "text": "Multicast 2",
    "bottomtext": "When you use the Core, reload this."
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
    },
    "text": "When you use an adjacent item, Shield ( 10 » 20 » 40 » 80 )."
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
    },
    "text": "Deal 120 damage.",
    "bottomtext": "When you destroy an item during combat, your Dinosaurs permanently gain ( 40 » 80 ) damage."
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
    },
    "text": "Heal 10.",
    "bottomtext": "When you sell a Spare Change, this gains ( 10 » 20 » 30 » 40 ) Heal."
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
    },
    "text": "Haste 1 item for ( 1 » 2 » 3 » 4 ) second(s).",
    "bottomtext": "When you Haste, Poison ( 1 » 2 » 3 » 5 )."
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
    },
    "text": "Shield equal to ( 1x » 2x » 3x ) your gold."
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
    },
    "text": "Deal ( 120 » 200 ) damage.",
    "bottomtext": "The weapon to the left of this has lifesteal."
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
    },
    "text": "Give your Lifesteal Weapons ( +5 » +10 » +15 » +20 ) damage for the fight.",
    "bottomtext": "The weapon on the right has Lifesteal."
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
    },
    "text": "Haste the Core for ( 2 » 3 » 4 ) second(s).",
    "bottomtext": "When the Core gains Haste, give it ( +10 » +20 » +30 ) damage the fight."
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
    },
    "text": "Haste another item for ( 1 » 2 » 3 » 4 ) second(s).",
    "bottomtext": "Slow 1 item for ( 1 » 2 » 3 » 4 ) second(s)."
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
    },
    "text": "Crit Chance 100%",
    "bottomtext": "When you Burn, reload this 1 ammo."
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
    },
    "text": "Crit Chance ( 5% » 10% » 15% » 20% )",
    "bottomtext": "Heal ( 10 » 30 » 60 » 100 )."
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
    "cooldown": 6,
    "enchants": {},
    "text": "Deal ( 5 » 15 » 30 » 50 ) damage for each Small Friend you have."
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
    },
    "text": "Deal ( 4 » 12 » 24 » 40 ) damage."
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
    "cooldown": null,
    "enchants": {
      "Heavy": "When a non-weapon item is used, Slow 1 item for 2 second(s).",
      "Icy": "When a non-weapon item is used, Freeze 1 item for 1 second(s).",
      "Turbo": "When a non-weapon item is used, Haste 1 item for 2 second(s).",
      "Shielded": "When a non-weapon item is used, shield 15.",
      "Restorative": "When a non-weapon item is used, heal 20.",
      "Toxic": "Double Poison",
      "Fiery": "When a non-weapon item is used, burn 2."
    },
    "text": "When ANY non-weapon item is used, Poison 3 and gain 1 Regen for the fight.",
    "bottomtext": "Your items have their cooldowns increased by 1 second(s)."
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
    },
    "text": "Shield equal to this item's Ammo.",
    "bottomtext": "At the start of each day, this gains ( 1 » 2 » 3 ) Max Ammo."
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
    },
    "text": "When you use an adjacent weapon, slow 1 item for ( 1 » 2 » 3 ) second(s)."
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
    },
    "text": "Poison ( 1 » 2 » 3 » 4 ).",
    "bottomtext": "Heal ( 10 » 20 » 30 » 40 )."
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
    },
    "text": "Burn both players ( 4 » 6 » 8 ).",
    "bottomtext": "Charge an item ( 1 » 2 » 3 ) second(s)."
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
    },
    "text": "Deal 25 damage.",
    "bottomtext": "When you freeze an item, this gains ( 25 » 50 ) damage for the fight."
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
    },
    "text": "Poison both players ( 4 » 6 » 8 » 10 )."
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
    },
    "text": "Multicast 8",
    "bottomtext": "Deal 8 damage."
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
    },
    "text": "Heal equal to ( 1x » 2x » 3x ) your gold."
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
    },
    "text": "Deal ( 5 » 15 » 30 » 50 ) damage.",
    "bottomtext": "When you sell this, give your leftmost weapon ( +4 » +6 » +8 » +10 ) Damage."
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
    },
    "text": "Burn ( 2 » 4 » 6 ).",
    "bottomtext": "When you use the Core or another Ray, your Burn items gain ( 1 » 2 » 4 ) Burn for the fight."
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
    "cooldown": null,
    "enchants": {
      "Golden": "Adjacent properties have double value.",
      "Shiny": "This has double Damage and Shield bonus.",
      "Deadly": "Shield Properties adjacent to this have + Crit Chance equal to the value of your highest value item. [0]"
    },
    "text": "Weapon Properties adjacent to this have + Damage equal to ( 1x » 2x ) the value of your highest value item. [0]",
    "bottomtext": "Shield Properties adjacent to this have + Shield equal to ( 1x » 2x ) the value of your highest value item. [0]"
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
    },
    "text": "Adjacent items gain ( 5 » 10 ) Damage for the fight.",
    "bottomtext": "Adjacent items gain ( 5 » 10 ) Shield for the fight."
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
    },
    "text": "Poison ( 4 » 6 ).",
    "bottomtext": "When you Poison, gain ( +1 » +2 ) Regeneration for the fight."
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
    },
    "text": "When you burn, Shield ( 5 » 10 » 15 ).",
    "bottomtext": "When you Burn, Haste an item for ( 1 » 2 » 3 ) second(s)."
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
    },
    "text": "Your items have ( +20% » +40% ) Crit Chance.",
    "bottomtext": "When you Crit with an item, reduce their cooldown by 10% for the fight."
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
    "cooldown": null,
    "enchants": {
      "Golden": "Double Value",
      "Shielded": "Your Shield items have + Shield equal to this item's value.",
      "Restorative": "Your Heal items have + Heal equal to this item's value.",
      "Toxic": "Your Poison items have + Poison equal to 10% of this item's value.",
      "Fiery": "Your Burn items have + Burn equal to 15% of this item's value.",
      "Shiny": "Double Health Max",
      "Deadly": "Your items have Crit Chance equal to this item's value."
    },
    "text": "When you sell an item, this gains ( 1 » 2 » 3 ) value.",
    "bottomtext": "You have increased max health equal to ( 10 » 15 » 20 ) times this item's value. ( [60] » [180] » [480] )"
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
    },
    "text": "When you use an Aquatic item, Shield ( 10 » 20 )."
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
    "cooldown": null,
    "enchants": {},
    "text": "Sells for gold"
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
    },
    "text": "Adjacent items have ( +15% » +20% » +25% » +30% ) Crit Chance.",
    "bottomtext": "When you Crit, Haste an item for ( 1 » 2 » 3 » 4 ) second(s)."
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
    },
    "text": "Deal ( 5 » 15 » 30 » 50 ) damage.",
    "bottomtext": "The first time you fall below half health each fight, slow all enemy items for ( 1 » 2 » 3 » 4 ) second(s)."
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
    },
    "text": "Burn ( 4 » 6 ).",
    "bottomtext": "For each adjacent Friend or Property, this gains ( +4 » +8 ) Burn."
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
    },
    "text": "Deal ( 5 » 15 » 30 » 50 ) damage.",
    "bottomtext": "If this is your only friend, your items have ( +5% » +10% » +15% » +20% ) Crit Chance."
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
    },
    "text": "The item to the left of this has its cooldown reduced by ( 25% » 50% )."
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
    },
    "text": "Burn ( 5 » 10 ).",
    "bottomtext": "When you Burn, this gains ( 5 » 10 ) Burn for the fight."
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
    },
    "text": "Freeze 1 item for 1 second(s).",
    "bottomtext": "When you use the Core, Freeze an item for 1 second(s)."
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
    },
    "text": "Charge adjacent Small items ( 1 » 2 » 3 » 4 ) second(s).",
    "bottomtext": "When you win a fight, get a Piggle."
  },
  "Pinata": {
    "name": "Pinata",
    "icon": "images/items/Pinata.avif",
    "tier": "Bronze",
    "tags": [
      "Pygmalien",
      "Medium"
    ],
    "cooldown": null,
    "enchants": {},
    "text": "When you sell this, get 3 Chocolate Bars."
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
    },
    "text": "Deal ( 5 » 15 » 30 » 50 ) damage.",
    "bottomtext": "This deals double Crit damage."
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
    },
    "text": "Deal ( 15 » 30 ) damage.",
    "bottomtext": "When you use an ammo item, deal ( 15 » 30 ) damage."
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
    },
    "text": "Burn both players ( 5 » 10 » 15 ).",
    "bottomtext": "Slow enemy items for ( 1 » 2 » 3 ) second(s)."
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
    },
    "text": "Deal ( 50 » 100 » 150 ) damage.",
    "bottomtext": "When you Burn, this gains ( 25 » 50 » 75 ) damage for the fight."
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
    },
    "text": "Burn ( 4 » 6 » 8 » 10 )."
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
    },
    "text": "Poison ( 3 » 6 » 9 » 12 ).",
    "bottomtext": "If you have no weapons, your items have their cooldowns reduced by ( 5% » 10% » 15% » 20% )."
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
    },
    "text": "Reload all your items ( 1 » 2 » 3 ) Ammo and charge them 1 second(s).",
    "bottomtext": "At the start of each day, get a small Ammo item from any Hero."
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
    },
    "text": "Reload the item to the right of this ( 1 » 2 » 3 » 4 ) Ammo."
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
    },
    "text": "Deal damage equal to ( 30% » 40% » 50% ) of your enemy's Max Health and destroy this.",
    "bottomtext": "When you Burn, charge this 1 second(s)."
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
    },
    "text": "Deal ( 20 » 40 » 80 » 160 ) damage.",
    "bottomtext": "When you Haste, Slow, Freeze, Burn or Poison, charge this ( 1 » 1 » 1 » 2 ) second(s)."
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
    },
    "text": "adjacent weapons gain ( 3 » 6 » 9 » 12 ) damage for the fight.",
    "bottomtext": "adjacent Shield items gain ( 3 » 6 » 9 » 12 ) Shield for the fight."
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
    },
    "text": "When you slow, deal ( 3 » 6 » 9 » 12 ) damage."
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
    },
    "text": "Haste your Vehicles for ( 2 » 3 » 5 ) second(s).",
    "bottomtext": "When you use a Vehicle, Burn ( 2 » 3 » 5 )."
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
    },
    "text": "When you Haste, Poison ( 1 » 2 » 4 » 8 )."
  },
  "Pulse Rifle": {
    "name": "Pulse Rifle",
    "icon": "images/items/PulseRifle.avif",
    "tier": "Bronze",
    "tags": [
      "Dooley",
      "Medium",
      "Damage",
      "Weapon"
    ],
    "cooldown": null,
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
    },
    "text": "Deal ( 10 » 30 » 60 » 100 ) damage.",
    "bottomtext": "This has +1 Multicast if it is adjacent to a Friend. Double this if it is your only Friend."
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
    },
    "text": "Your weapons gain Damage equal to this item's value for the fight.",
    "bottomtext": "When you buy a weapon, this gains ( 1 » 2 » 3 ) value and you gain ( 20 » 50 » 100 ) max health."
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
    },
    "text": "Deal damage equal to ( 1x » 2x ) this item's value.",
    "bottomtext": "When you sell an item, give this ( 1 » 2 ) value."
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
    },
    "text": "Slow 1 item for ( 1 » 2 » 3 ) second(s).",
    "bottomtext": "When you Slow, Haste an item for ( 1 » 2 » 3 ) second(s)."
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
    },
    "text": "Shield ( 75 » 150 ).",
    "bottomtext": "When you gain Burn, this gains Haste for ( 2 » 4 ) second(s)."
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
    },
    "text": "Haste 1 item for ( 1 » 2 » 3 ) second(s).",
    "bottomtext": "When you Haste, deal ( 10 » 20 » 30 ) damage."
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
    },
    "text": "Multicast 2",
    "bottomtext": "When you use the Core, charge this ( 1 » 2 ) second(s)."
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
    },
    "text": "Burn ( 4 » 6 ).",
    "bottomtext": "Slow 1 item for ( 4 » 6 ) second(s)."
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
    },
    "text": "Reload adjacent Ammo items ( 1 » 2 » 3 ) Ammo and Haste them ( 1 » 2 » 3 ) second(s)."
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
    "cooldown": null,
    "enchants": {},
    "text": "When you sell this, your weapons gain ( 1 » 2 » 3 » 4 ) damage."
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
    "cooldown": 3,
    "enchants": {},
    "text": "Give your adjacent weapons ( +3 » +6 » +9 » +12 ) damage for the fight."
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
    "cooldown": 3,
    "enchants": {},
    "text": "Give your weapon to the left of this ( +4 » +8 » +12 » +16 ) damage for the fight."
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
    "cooldown": 3,
    "enchants": {},
    "text": "Give your weapon to the right of this ( +4 » +8 » +12 » +16 ) damage for the fight."
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
    "cooldown": 3,
    "enchants": {},
    "text": "Your weapons gain ( 1 » 2 » 3 » 4 ) damage for the fight."
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
    },
    "text": "Deal 20 damage.",
    "bottomtext": "When you Slow, Freeze, Burn or Poison, this gains ( 10 » 20 » 30 ) damage for the fight."
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
    },
    "text": "Deal 10 damage.",
    "bottomtext": "When you sell a Weapon, this gains ( 10 » 20 » 40 » 80 ) damage."
  },
  "Remote Control": {
    "name": "Remote Control",
    "icon": "images/items/RemoteControl.avif",
    "tier": "Silver",
    "tags": [
      "Dooley",
      "Small",
      "Tool"
    ],
    "cooldown": null,
    "enchants": {
      "Heavy": "Slow 1 item for 2 second(s).",
      "Icy": "Freeze 1 item for 1 second(s).",
      "Turbo": "Haste 1 item for 2 second(s).",
      "Shielded": "Shield 40.",
      "Restorative": "Heal 60.",
      "Toxic": "Poison 4.",
      "Fiery": "Burn 6.",
      "Shiny": "+1 Multicast",
      "Deadly": "The Core has +50% Crit Chance."
    },
    "text": "Use the Core."
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
    },
    "text": "Deal ( 25 » 50 » 100 ) damage.",
    "bottomtext": "When you use another Ammo item, use this."
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
    },
    "text": "Crit Chance 20%",
    "bottomtext": "When you Crit, fully reload this."
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
    "cooldown": null,
    "enchants": {
      "Golden": "Double Value",
      "Shiny": "Double Value"
    },
    "text": "When you visit a Merchant, this and the item to the left of this gains ( 1 » 2 » 3 » 4 ) value."
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
    },
    "text": "Deal ( 5 » 15 » 30 » 50 ) damage.",
    "bottomtext": "When you use this, reload this 1 Ammo if it is your only weapon."
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
    },
    "text": "Lifesteal 100",
    "bottomtext": "Deal ( 14 » 20 » 28 » 40 ) damage."
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
    },
    "text": "Deal ( 10 » 20 » 30 ) Damage.",
    "bottomtext": "When you use the item to the right of this, Charge the item to the left of this ( 1 » 1 » 2 ) second(s)."
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
    },
    "text": "Shield ( 5 » 10 » 15 ).",
    "bottomtext": "When you Shield, your Shield items gain ( 1 » 2 » 3 ) Shield for the fight."
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
    "cooldown": null,
    "enchants": {
      "Shiny": "+1 Multicast"
    },
    "text": "Your Friends have +1 Multicast."
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
    },
    "text": "Haste adjacent items for ( 1 » 2 » 3 » 4 ) second(s).",
    "bottomtext": "When you sell this, give your leftmost Haste item ( +1 » +2 » +3 » +4 ) Haste."
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
    },
    "text": "Multicast 3",
    "bottomtext": "While your enemy has Burn, this has double damage."
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
    },
    "text": "Deal ( 15 » 45 » 90 » 150 ) Damage",
    "bottomtext": "When this gains haste, give it ( +5 » +10 » +20 » +30 ) damage for the fight."
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
    },
    "text": "Haste your Small items for ( 1 » 2 ) second(s).",
    "bottomtext": "When you use an adjacent Aquatic item, Haste this ( 1 » 2 ) second(s)."
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
    },
    "text": "Burn ( 4 » 6 » 8 ).",
    "bottomtext": "Increase your other items' Burn by 2."
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
    },
    "text": "Deal ( 10 » 30 » 60 » 100 ) damage.",
    "bottomtext": "When you sell this, your weapons gain ( 1 » 2 » 3 » 4 ) Damage."
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
    },
    "text": "Multicast 2",
    "bottomtext": "This deals double Crit damage."
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
    },
    "text": "Lifesteal 100",
    "bottomtext": "Your Weapons with lifesteal gain ( +10 » +30 » +60 » +100 ) damage for the fight."
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
    "cooldown": null,
    "enchants": {},
    "text": "When you sell this, get 3 Spare Change."
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
    },
    "text": "Burn ( 4 » 6 » 8 » 10 ).",
    "bottomtext": "When you sell this, your leftmost Burn item gains ( +3 » +4 » +5 » +6 ) Burn."
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
    },
    "text": "Freeze 1 item for ( 3 » 4 » 5 ) second(s).",
    "bottomtext": "Increase your other items' Freeze by 1 second(s)."
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
    },
    "text": "Reload a potion.",
    "bottomtext": "When you buy a Potion, increase the Regeneration this item gives by ( 1 » 2 » 3 » 3 )."
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
    "cooldown": null,
    "enchants": {
      "Golden": "Double Value",
      "Shiny": "This gains double value when an item is upgraded.",
      "Deadly": "Double Crit Chance"
    },
    "text": "When you upgrade an item, this gains ( 1 » 2 » 3 » 4 ) value.",
    "bottomtext": "Your items have + Crit Chance equal to this item's value."
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
    "cooldown": null,
    "enchants": {},
    "text": "When you sell this, give your leftmost Shield item ( +4 » +8 » +12 » +16 ) Shield."
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
    },
    "text": "When you sell this, upgrade The Core. ( » and reduce its cooldown by 1 second(s ).)"
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
    },
    "text": "Deal damage equal to a third of your enemy's max health."
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
    },
    "text": "Shield ( 5 » 15 » 30 » 50 ) for each aquatic item you have."
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
    },
    "text": "Heal 10.",
    "bottomtext": "When you use an Aquatic item, this gains ( 10 » 15 » 20 ) Heal for the fight."
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
    },
    "text": "Shield ( 20 » 40 » 80 » 120 ).",
    "bottomtext": "Your Shield items have ( +20% » +30% » +40% » +50% ) Crit Chance."
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
    },
    "text": "When you Crit, Haste an item for ( 1 » 2 » 3 ) second(s).",
    "bottomtext": "Adjacent items have ( +15% » +30% » +50% ) Crit Chance."
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
    "cooldown": null,
    "enchants": {
      "Heavy": "When you use the item to the right of this, Slow 1 item for 3 second(s).",
      "Icy": "When you use the item to the right of this, Freeze 1 item for 1 second(s).",
      "Turbo": "Double Haste",
      "Shielded": "When you use the item to the right of this, shield 20.",
      "Restorative": "When you use the item to the right of this, heal 30.",
      "Toxic": "When you use the item to the right of this, poison 2.",
      "Fiery": "When you use the item to the right of this, burn 3."
    },
    "text": "When you use the item to the right of this, Haste it for ( 1 » 2 » 3 » 4 ) second(s). If it is a weapon, it also gains ( +3 » +5 » +7 » +9 ) damage for the fight."
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
    },
    "text": "Deal ( 5 » 15 » 10 » 15 ) damage.",
    "bottomtext": "Your weapons gain ( 3 » 6 » 10 » 20 ) damage for the fight."
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
    },
    "text": "Deal 25 damage.",
    "bottomtext": "When you Haste, this gains ( 25 » 50 ) damage for the fight."
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
    "cooldown": null,
    "enchants": {},
    "text": "When you sell this, your leftmost Weapon gains ( 3 » 6 » 9 » 12 ) Damage."
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
    },
    "text": "Shield ( 40 » 80 » 150 » 300 )."
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
    "cooldown": null,
    "enchants": {},
    "text": "When you sell this, get 3 Small items from any hero.",
    "bottomtext": "This item has no base Value."
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
    },
    "text": "Your Aquatic items have +1 Multicast."
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
    },
    "text": "Crit Chance ( 15% » 30% » 50% » 100% )",
    "bottomtext": "Deal ( 10 » 30 » 60 » 100 ) damage."
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
    },
    "text": "Deal ( 10 » 30 » 60 » 100 ) damage.",
    "bottomtext": "At the start of each day, get a small item from any hero."
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
    "cooldown": null,
    "enchants": {
      "Golden": "Double Income",
      "Shiny": "Double Health Max"
    },
    "text": "At the start of each hour, gain ( 10 » 20 » 30 ) Max Health.",
    "bottomtext": "You have ( +1 » +2 » +3 ) Income."
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
    },
    "text": "The weapon to the left of this has ( +10 » +20 » +30 » +50 ) damage.",
    "bottomtext": "If you have exactly one weapon, reduce its cooldown by ( 10% » 20% » 30% » 40% )."
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
    },
    "text": "Shield 10.",
    "bottomtext": "When you sell another non-weapon item, this gains Shield ( 5 » 10 » 15 » 20 )."
  },
  "Singularity": {
    "name": "Singularity",
    "icon": "images/items/Singularity.avif",
    "tier": "Legendary",
    "tags": [
      "Common",
      "Small"
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
    },
    "text": "Destroy a small enemy item for the fight."
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
    },
    "text": "Slow 1 item for ( 2 » 4 » 6 ) second(s).",
    "bottomtext": "When you slow, Haste a Vehicle for ( 2 » 4 » 6 ) second(s)."
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
    },
    "text": "Deal damage equal to 3 times the value of your items.",
    "bottomtext": "If you have 4 or fewer items in-play, this has +1 Multicast."
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
    },
    "text": "Slow 2 items for ( 4 » 6 » 8 » 10 ) second(s)."
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
    },
    "text": "Deal ( 10 » 30 » 60 » 100 ) damage.",
    "bottomtext": "This has ( +1 » +2 » +3 » +4 ) Max Ammo for each small item you have. [0]"
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
    },
    "text": "Deal 100 damage.",
    "bottomtext": "This deals ( 3 » 5 » 10 ) times more damage if it is your only weapon."
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
    },
    "text": "Freeze 1 item for ( 1 » 2 » 3 ) second(s).",
    "bottomtext": "This has +1 Multicast for each adjacent to a Property."
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
    "cooldown": null,
    "enchants": {},
    "text": "When you sell this, your leftmost Freeze item gains 1 second to Freeze."
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
    },
    "text": "Give your other items Haste for ( 2 » 3 » 4 ) second(s).",
    "bottomtext": "While you or your enemy have Burn, reduce this item's cooldown by 50%."
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
    },
    "text": "Burn ( 1 » 2 » 3 ).",
    "bottomtext": "This has +1 Multicast if it is adjacent to a Tool."
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
    },
    "text": "Shield equal to your current Health.",
    "bottomtext": "Deal damage equal to your shield."
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
    },
    "text": "Poison equal to your Regeneration.",
    "bottomtext": "You have ( +1 » +2 » +3 ) Regeneration."
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
    },
    "text": "Shield equal to ( 2 » 3 ) times the value of your items.",
    "bottomtext": "This has triple value in combat."
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
    "cooldown": null,
    "enchants": {},
    "text": "Sells for gold"
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
    },
    "text": "Your weapons gain damage equal to your weakest weapon's damage for the fight. [0]"
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
    },
    "text": "Deal ( 10 » 30 » 60 » 100 ) damage.",
    "bottomtext": "When you sell this, your leftmost item gains ( +4 » +5 » +6 » +7 ) Damage if it is a Weapon and ( +4 » +5 » +6 » +7 ) Shield if it is a Shield item."
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
    },
    "text": "Shield ( 5 » 15 » 30 » 50 ).",
    "bottomtext": "Deal damage equal to your shield."
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
    },
    "text": "Adjacent items have ( +25% » +50% ) Crit Chance.",
    "bottomtext": "At the start of each fight, a random enemy item has its cooldown increased by ( 3 » 6 ) second(s)."
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
    "cooldown": null,
    "enchants": {
      "Golden": "Double Value",
      "Shiny": "Double Value"
    },
    "text": "When you win a fight with Stained Glass Window, your Properties gain ( 4 » 6 ) value.",
    "bottomtext": "If you have 4 or fewer items in-play, their cooldowns are reduced ( 10% » 20% )."
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
    },
    "text": "Adjacent items have ( +10% » +15% » +20% » +25% ) Crit Chance.",
    "bottomtext": "Adjacent items have their cooldown reduced by ( 10% » 15% » 20% » 25% )."
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
    },
    "text": "Lifesteal 100",
    "bottomtext": "Slow 1 item for ( 1 » 2 » 3 » 4 ) second(s)."
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
    },
    "text": "Freeze both players' items for ( 1 » 2 ) second(s)."
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
    },
    "text": "Deal ( 30 » 60 » 100 ) damage.",
    "bottomtext": "Gain Shield equal to this item's damage."
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
    },
    "text": "Heal equal to ( 4 » 6 ) times the value of your items.",
    "bottomtext": "Your other items gain +value equal to this item's value in combat."
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
    },
    "text": "Heal ( 1 » 2 » 3 » 4 ).",
    "bottomtext": "This permanently gains ( 1 » 2 » 3 » 4 ) Heal."
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
    },
    "text": "Deal ( 5 » 15 » 30 » 50 ) damage.",
    "bottomtext": "Your enemy's Shield items lose ( 2 » 4 » 6 » 8 ) Shield for the fight."
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
    },
    "text": "Heal ( 30 » 60 » 120 ).",
    "bottomtext": "When you Heal, this gains ( 2 » 4 » 6 ) Burn for the fight."
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
    "cooldown": 4,
    "enchants": {},
    "text": "Adjacent items permanently gain ( 1% » 2% » 3% » 4% ) Crit chance.",
    "bottomtext": "This permanently loses 1 Max Ammo."
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
    "cooldown": null,
    "enchants": {
      "Shiny": "This has double damage, shield and heal bonus.",
      "Deadly": "This has double Crit Chance bonus."
    },
    "text": "Adjacent items have ( +25% » +50% ) Crit Chance.",
    "bottomtext": "Adjacent items have bonus damage, heal, or shield equal to their Crit Chance."
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
    },
    "text": "Deal ( 10 » 30 » 60 » 100 ) damage.",
    "bottomtext": "When you use an adjacent Weapon, give it ( +2 » +4 » +6 » +10 ) damage for the fight."
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
    },
    "text": "Deal ( 5 » 10 » 15 » 20 ) damage.",
    "bottomtext": "Adjacent Potions have +1 Ammo."
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
    },
    "text": "Heal equal to ( 4% » 8% ) of your Max Health.",
    "bottomtext": "When you use a non-weapon item, permanently gain ( +2 » +4 ) Max Health."
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
    },
    "text": "Multicast 2",
    "bottomtext": "When you take damage, this gains 5% Crit Chance for the fight."
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
    },
    "text": "Shield 30.",
    "bottomtext": "When you sell a Small item, this gains ( 5 » 10 » 15 » 20 ) Shield."
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
    },
    "text": "Deal ( 10 » 20 » 30 ) damage.",
    "bottomtext": "When you use an adjacent item, deal ( 10 » 20 » 30 ) damage."
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
    },
    "text": "Shield ( 10 » 30 » 60 » 100 ).",
    "bottomtext": "Heal equal to your Shield."
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
    },
    "text": "Deal damage equal to your enemy's max health."
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
    },
    "text": "Deal ( 10 » 30 » 60 » 100 ) damage.",
    "bottomtext": "When you use any item to the left of this, Charge this 1 second(s)."
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
    },
    "text": "Use all your other items.",
    "bottomtext": "When you use an item, deal 40 damage."
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
    },
    "text": "Burn 7.",
    "bottomtext": "When this gains Haste, this gains ( 1 » 2 ) Burn for the fight."
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
    "cooldown": null,
    "enchants": {},
    "text": "When you sell this, gain access to the Thieves Guild."
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
    },
    "text": "Deal ( 15 » 45 » 90 » 150 ) damage.",
    "bottomtext": "When you Crit with another item, use this."
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
    },
    "text": "Deal ( 5 » 10 » 15 ) damage.",
    "bottomtext": "Your Weapons gain ( 2 » 3 » 4 ) damage for the fight and your opponent's Weapons lose ( 2 » 3 » 4 ) damage for the fight."
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
    },
    "text": "Burn both players ( 2 » 3 » 4 » 5 ).",
    "bottomtext": "Adjacent items have their cooldowns reduced by ( 6% » 9% » 12% » 15% )."
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
    },
    "text": "Gain ( 2 » 4 » 6 ) Regeneration for the fight.",
    "bottomtext": "When you gain Regeneration, Burn ( 2 » 3 » 4 )."
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
    "cooldown": 5,
    "enchants": {},
    "text": "Deal ( 10 » 20 » 30 » 40 ) damage.",
    "bottomtext": "This deals double Crit damage."
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
    },
    "text": "Deal damage equal to this item's ammo."
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
    },
    "text": "Shield ( 10 » 30 » 50 » 100 ).",
    "bottomtext": "Your other tools have their cooldowns reduced by ( 5% » 10% » 15% » 20% )."
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
    },
    "text": "Deal 60 damage.",
    "bottomtext": "If the item is Large, Reload 1 Ammo."
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
    },
    "text": "Shield ( 20 » 60 » 120 » 200 ).",
    "bottomtext": "When you sell this, give your items ( +1 » +2 » +3 » +4 ) value."
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
    },
    "text": "Poison ( 1 » 2 » 3 » 4 ).",
    "bottomtext": "When you sell this, your leftmost Poison item gains ( +1 » +2 » +3 » +4 ) Poison."
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
    },
    "text": "Burn ( 8 » 10 » 12 » 20 ).",
    "bottomtext": "When you Burn, haste an item for ( 1 » 2 » 3 » 4 ) second(s)."
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
    },
    "text": "When your enemy uses an item, Slow it for 1 second(s)."
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
    },
    "text": "When you Slow, gain ( 2 » 4 ) Regeneration for the fight.",
    "bottomtext": "At the start of each hour, get a Coconut or Citrus."
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
    },
    "text": "Give your items ( +3 » +5 » +10 ) Shield for the fight.",
    "bottomtext": "When you use another non-weapon, Shield ( 10 » 20 » 30 )."
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
    },
    "text": "Multicast 2",
    "bottomtext": "Shield ( 5 » 15 » 30 » 50 )."
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
    "cooldown": null,
    "enchants": {},
    "text": "When you sell this, upgrade your leftmost item."
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
    },
    "text": "Heal ( 10 » 30 » 60 » 100 ).",
    "bottomtext": "This has +1 Multicast for each Property you have. [0]"
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
    },
    "text": "Deal ( 2 » 6 » 12 » 20 ) damage."
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
    },
    "text": "Your items have ( +10% » +20% » +30% » +40% ) Crit Chance."
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
    "cooldown": null,
    "enchants": {
      "Golden": "Your Chocolate Bars and Spare Change have +1 value."
    },
    "text": "At the start of each day, get 3 Chocolate Bars or Spare Changes."
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
    "cooldown": null,
    "enchants": {
      "Heavy": "When you use an adjacent weapon, Slow 1 item for 1 second(s).",
      "Icy": "When you use an adjacent weapon, Freeze 1 item for 1 second(s).",
      "Turbo": "When you use an adjacent weapon, Haste 1 item for 1 second(s).",
      "Shielded": "When you use an adjacent weapon, Shield 10.",
      "Restorative": "When you use an adjacent weapon, Heal 15.",
      "Toxic": "Double Poison",
      "Fiery": "When you use an adjacent weapon, Burn 1."
    },
    "text": "When you use an adjacent weapon, poison ( 1 » 2 » 3 )."
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
    },
    "text": "Poison ( 1 » 2 ).",
    "bottomtext": "When you use the item to the left of this, gain ( 1 » 2 ) Regeneration for the fight."
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
    "cooldown": null,
    "enchants": {},
    "text": "When you sell this, gain ( 1 » 2 » 3 » 4 ) XP."
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
    "cooldown": null,
    "enchants": {
      "Heavy": "When you use an item, Slow 1 item for 2 second(s).",
      "Icy": "When you use an item, Freeze 1 item for 1 second(s).",
      "Turbo": "When you use an item, Haste 1 item for 2 second(s).",
      "Shielded": "When you use an item, Shield 10.",
      "Restorative": "Double Heal",
      "Toxic": "When you use an item, Poison 1.",
      "Fiery": "When you use an item, Burn 2."
    },
    "text": "When you use an item, Heal equal to ( 1x » 2x » 3x ) this item's value.",
    "bottomtext": "At the start of each hour, this gains ( 1 » 1 » 2 ) value."
  },
  "Virus": {
    "name": "Virus",
    "icon": "images/items/Virus.avif",
    "tier": "Silver",
    "tags": [
      "Dooley",
      "Small",
      "Poison"
    ],
    "cooldown": null,
    "enchants": {
      "Heavy": "Slow 1 item for 4 second(s).",
      "Icy": "Freeze 1 item for 2 second(s).",
      "Turbo": "Haste 1 item for 4 second(s).",
      "Shielded": "Shield 60.",
      "Restorative": "Heal 90.",
      "Toxic": "Double Poison",
      "Fiery": "Burn 9.",
      "Shiny": "+1 Multicast",
      "Deadly": "+50% Crit Chance"
    },
    "text": "Poison ( 1 » 2 » 3 ).",
    "bottomtext": "When you destroy an item, this gains ( 5 » 10 » 15 ) Poison for the fight."
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
    },
    "text": "Multicast 2",
    "bottomtext": "When you Shield, this gains ( 1 » 2 ) Burn for the fight."
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
    },
    "text": "Gain Shield equal to your enemy's burn.",
    "bottomtext": "When your enemy uses an item, Burn 1."
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
    },
    "text": "Shield ( 5 » 10 » 15 » 20 ).",
    "bottomtext": "This gains ( 5 » 10 » 15 » 20 ) Shield for the fight."
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
    },
    "text": "Permanently gain ( 5 » 10 » 15 » 20 ) Max Health.",
    "bottomtext": "When you use an adjacent friend, charge this ( 1 » 1 » 1 » 2 ) second(s)."
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
    },
    "text": "Charge your other non-weapon items ( 1 » 2 ) second(s)."
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
    },
    "text": "When you win a fight against a player, gain ( 1 » 2 » 3 ) XP. If you had Wanted Poster on your board, gain 1 additional XP.",
    "bottomtext": "Your items have ( 10% » 20% » 30% ) Crit Chance."
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
    },
    "text": "Haste your other items ( 1 » 2 » 3 ) second(s).",
    "bottomtext": "When you use another Aquatic item, Haste this ( 1 » 2 » 3 ) second(s)."
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
    },
    "text": "Your weapons gain ( 3 » 6 » 9 » 12 ) damage for the fight.",
    "bottomtext": "When you slow, charge this ( 1 » 2 » 3 » 4 ) second(s)."
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
    },
    "text": "Deal ( 10 » 30 » 60 » 100 ) damage.",
    "bottomtext": "When you use any item to the left of this, Charge this 1 second(s)."
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
    },
    "text": "Burn ( 4 » 6 » 8 ).",
    "bottomtext": "If you have another item with Burn, Poison, Slow, or Freeze, this has +1 Multicast for each."
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
    },
    "text": "Burn ( 2 » 3 ).",
    "bottomtext": "Slow 1 item for ( 1 » 3 ) second(s)."
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
    },
    "text": "Your weapons gain ( 5 » 10 » 15 » 20 ) Damage and your Heal gain ( 5 » 10 » 15 » 20 ) Heal for the fight.",
    "bottomtext": "When you heal while at max health, charge this ( 1 » 1 » 1 » 2 ) second(s)."
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
    },
    "text": "Shield ( 5 » 15 » 30 » 50 ).",
    "bottomtext": "Burn ( 1 » 2 » 3 » 4 )."
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
    },
    "text": "Burn ( 4 » 6 » 8 ).",
    "bottomtext": "When you Shield, this gains Haste for ( 1 » 2 » 3 ) second(s)."
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
    },
    "text": "When you use an item, charge another item +1 second(s)."
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
    },
    "text": "Deal ( 5 » 10 » 15 ) damage.",
    "bottomtext": "At the start of each day, upgrade a tool."
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
    "cooldown": null,
    "enchants": {},
    "text": "When you sell this, your Shield items gain ( 1 » 2 » 3 » 4 ) Shield."
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
    "cooldown": 3,
    "enchants": {},
    "text": "Give your adjacent Shield items ( +2 » +4 » +6 » +8 ) Shield for the fight."
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
    "cooldown": 3,
    "enchants": {},
    "text": "Give your Shield item to the left of this ( +4 » +8 » +12 » +16 ) Shield for the fight."
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
    "cooldown": 3,
    "enchants": {},
    "text": "Give your Shield item to the right of this ( +4 » +8 » +12 » +16 ) Shield for the fight."
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
    "cooldown": 3,
    "enchants": {},
    "text": "Your Shield items gain ( 1 » 2 » 3 » 4 ) Shield for the fight."
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
    },
    "text": "Deal ( 1 » 5 » 10 » 15 ) damage.",
    "bottomtext": "When you use an adjacent item, use this."
  }
};