addLayer("s", {
    name: "singularity", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "S", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#1F1F1F",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "singularities", // Name of prestige currency
    baseResource: "g", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.6, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        mult = mult.times(tmp.u.effect)
        if (hasUpgrade('s', 12)) mult = mult.times(1.6);
        mult = mult.times(buyableEffect('s', 12));
        mult = mult.times(buyableEffect('u', 11));
        mult = mult.times(buyableEffect('u', 12));
        mult = mult.times(buyableEffect('u', 13));
        mult = mult.times(buyableEffect('u', 21));
        mult = mult.times(buyableEffect('u', 22));
        mult = mult.times(buyableEffect('u', 23));
        mult = mult.times(buyableEffect('u', 31));
        mult = mult.times(buyableEffect('u', 32));
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "s", description: "S: Reset for Singularity", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},
    effect() {
     let eff = player.s.points.add(1).pow(1.25).div(3).add(1);
     if (hasUpgrade('s', 11)) eff = eff.times(3);
     return eff;
    },
    tabFormat: ["main-display",
			"prestige-button",
			"blank",
			["display-text",
				function() {return 'You have ' + format(player.s.points) + ' Singularities, which boosts mass generation by '+format(tmp.s.effect)+'x'},
					{}],
                    "upgrades", "blank", "buyables", "blank", "blank", "challenges",
],
    upgrades: {
        11: {
            title: "Upgrade your black hole",
            description: "Triple the layer effect.",
            cost: new Decimal(1),
        },
        12: {
            title: "Suck a planet in",
            description: "x1.6 Singularity.",
            cost: new Decimal(10),
        },
        13: {
            title: "Supermassive",
            description: "Boost singularities based on themselves.",
            cost: new Decimal(75),
            effect() {
                 let eff = player.s.points.add(1).div(2.3).times(1.8).pow(0.3).add(1);
                 return eff;
            },
            effectDisplay() {return format(upgradeEffect('s', 13)) + "x"},
        },
    },
    buyables: {
        11: {
            cost(x) { return new Decimal(1.5).pow(x.div(60)).times(x.div(40).add(1)) },
            title: "Mass Increase",
            canAfford() { return player[this.layer].points.gte(this.cost()) },
            buy() {
                player[this.layer].points = player[this.layer].points.minus(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            display() 
         { // Everything else displayed in the buyable button after the title
           let data = tmp[this.layer].buyables[this.id]
           return "Cost: " + format(data.cost) + " Singularities\n\
           Amount: " + player[this.layer].buyables[this.id] + " \n\
           x" + format(data.effect) + " boost to Mass";
         },
         effect() {
           let eff = player[this.layer].buyables[this.id].add(1).pow(1.055).div(3.5).times(1.1).add(1);
           if (inChallenge('s', 11)) eff = eff.pow(0.9);
           return eff;    
         },
        },
        12: {
            cost(x) { return new Decimal(1.5).pow(x.div(30)).times(x.div(20).add(1)) },
            title: "Black Hole",
            canAfford() { return player[this.layer].points.gte(this.cost()) },
            buy() {
                player[this.layer].points = player[this.layer].points.minus(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            display() 
         { // Everything else displayed in the buyable button after the title
           let data = tmp[this.layer].buyables[this.id]
           return "Cost: " + format(data.cost) + " Singularities\n\
           Amount: " + player[this.layer].buyables[this.id] + " \n\
           x" + format(data.effect) + " boost to Singularities";
         },
         effect() {
           let eff = player[this.layer].buyables[this.id].add(1).times(1.3).div(25).add(1);
           if (inChallenge('s', 11)) eff = eff.pow(0.9);
           if (hasChallenge('s', 11)) eff = eff.pow(1.1);
           return eff;    
         },
        },
    },
    challenges: {
        rows: 1,
        cols: 1,
        11: {
            name: "Matter Desert",
            completionLimit: "1",
            challengeDescription: "All the Buyables' effect is raised to the power of 0.9.",
            goalDescription: "Get 1e10g.",
            canComplete: function() { return player.points.gte(1e10)},
            currencyDisplayName: "points",
            currencyInternalName: "points",
            rewardDescription: "Unlock Universe, and the Black Hole effect is raised to the power of 1.1.",
            },
        },
})
addLayer("u", {
    name: "universe", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "U", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		    points: new Decimal(0),
        dimmult: new Decimal(1),
    }},
    color: "#0403A0",
    requires: new Decimal(1e12), // Can be a function that takes requirement increases into account
    resource: "universes", // Name of prestige currency
    baseResource: "g", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.2, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "u", description: "U: Reset for Universe", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return (hasChallenge('s', 11))},
    effect() {
           let eff = player.u.points.add(1).pow(1.03).div(2).add(1);
           return eff;
    },
    eff2() {
      player.u.dimmult = player.u.dimmult.times(player.u.buyables[33].effect); 
    },
    canBuyMax() {
         return true;
    },
    buyables: {
      rows: 3,
      cols: 3,
        11: {
            cost(x) { return new Decimal(3).pow(x.div(2)).times(x.div(1.5).add(1)) },
            title: "Dimension 1",
            canAfford() { return player[this.layer].points.gte(this.cost()) },
            buy() {
                player[this.layer].points = player[this.layer].points.minus(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            display() 
         { // Everything else displayed in the buyable button after the title
           let data = tmp[this.layer].buyables[this.id]
           return "Cost: " + format(data.cost) + " Universes\n\
           Amount: " + player[this.layer].buyables[this.id] + " \n\
           x" + format(data.effect) + " boost to Singularities";
         },
         effect() {
           let eff = player[this.layer].buyables[this.id].add(1).pow(1.1).div(1.5).times(1.25).add(2).times(player.u.dimmult);
           return eff;    
         },
        },
        12: {
            cost(x) { return new Decimal(5).pow(x.div(1.5)).times(x.add(1)) },
            title: "Dimension 2",
            canAfford() { return player[this.layer].points.gte(this.cost()) },
            buy() {
                player[this.layer].points = player[this.layer].points.minus(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            display() 
         { // Everything else displayed in the buyable button after the title
           let data = tmp[this.layer].buyables[this.id]
           return "Cost: " + format(data.cost) + " Universes\n\
           Amount: " + player[this.layer].buyables[this.id] + " \n\
           x" + format(data.effect) + " boost to Singularities";
         },
         effect() {
           let eff = player[this.layer].buyables[this.id].add(1).pow(1.125).div(1.4).times(1.3).add(2).times(player.u.dimmult);
           return eff;    
         },
        },
        13: {
            cost(x) { return new Decimal(8).pow(x.div(1.2)).times(x.times(1.1).add(1)) },
            title: "Dimension 3",
            canAfford() { return player[this.layer].points.gte(this.cost()) },
            buy() {
                player[this.layer].points = player[this.layer].points.minus(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            display() 
         { // Everything else displayed in the buyable button after the title
           let data = tmp[this.layer].buyables[this.id]
           return "Cost: " + format(data.cost) + " Universes\n\
           Amount: " + player[this.layer].buyables[this.id] + " \n\
           x" + format(data.effect) + " boost to Singularities";
         },
         effect() {
           let eff = player[this.layer].buyables[this.id].add(1).pow(1.15).div(1.25).times(1.5).add(2).times(player.u.dimmult);
           return eff;    
         },
        },
        21: {
            cost(x) { return new Decimal(12).pow(x).times(x.times(1.6).add(1)) },
            title: "Dimension 4",
            canAfford() { return player[this.layer].points.gte(this.cost()) },
            buy() {
                player[this.layer].points = player[this.layer].points.minus(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            display() 
         { // Everything else displayed in the buyable button after the title
           let data = tmp[this.layer].buyables[this.id]
           return "Cost: " + format(data.cost) + " Universes\n\
           Amount: " + player[this.layer].buyables[this.id] + " \n\
           x" + format(data.effect) + " boost to Singularities";
         },
         effect() {
           let eff = player[this.layer].buyables[this.id].add(1).pow(1.2).times(1.1).add(2).times(player.u.dimmult);
           return eff;    
         },
        },
        22: {
            cost(x) { return new Decimal(20).pow(x.times(1.25)).times(x.times(2).add(1)) },
            title: "Dimension 5",
            canAfford() { return player[this.layer].points.gte(this.cost()) },
            buy() {
                player[this.layer].points = player[this.layer].points.minus(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            display() 
         { // Everything else displayed in the buyable button after the title
           let data = tmp[this.layer].buyables[this.id]
           return "Cost: " + format(data.cost) + " Universes\n\
           Amount: " + player[this.layer].buyables[this.id] + " \n\
           x" + format(data.effect) + " boost to Singularities";
         },
         effect() {
           let eff = player[this.layer].buyables[this.id].add(1).pow(1.25).times(1.5).add(2).times(player.u.dimmult);
           return eff;    
         },
        },
        23: {
            cost(x) { return new Decimal(35).pow(x.times(1.35)).times(x.times(3).add(1)) },
            title: "Dimension 6",
            canAfford() { return player[this.layer].points.gte(this.cost()) },
            buy() {
                player[this.layer].points = player[this.layer].points.minus(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            display() 
         { // Everything else displayed in the buyable button after the title
           let data = tmp[this.layer].buyables[this.id]
           return "Cost: " + format(data.cost) + " Universes\n\
           Amount: " + player[this.layer].buyables[this.id] + " \n\
           x" + format(data.effect) + " boost to Singularities";
         },
         effect() {
           let eff = player[this.layer].buyables[this.id].add(1).pow(1.3).times(3).add(2).times(player.u.dimmult);
           return eff;    
         },
        },
        31: {
            cost(x) { return new Decimal(60).pow(x.times(1.5)).times(x.times(5).add(1)) },
            title: "Dimension 7",
            canAfford() { return player[this.layer].points.gte(this.cost()) },
            buy() {
                player[this.layer].points = player[this.layer].points.minus(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            display() 
         { // Everything else displayed in the buyable button after the title
           let data = tmp[this.layer].buyables[this.id]
           return "Cost: " + format(data.cost) + " Universes\n\
           Amount: " + player[this.layer].buyables[this.id] + " \n\
           x" + format(data.effect) + " boost to Singularities";
         },
         effect() {
           return player[this.layer].buyables[this.id].add(1).pow(1.35).times(5).add(2).times(player.u.dimmult); 
         },
        },
        32: {
            cost(x) { return new Decimal(100).pow(x.times(1.75)).times(x.times(15).add(1)) },
            title: "Dimension 8",
            canAfford() { return player[this.layer].points.gte(this.cost()) },
            buy() {
                player[this.layer].points = player[this.layer].points.minus(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            display() 
         { // Everything else displayed in the buyable button after the title
           let data = tmp[this.layer].buyables[this.id]
           return "Cost: " + format(data.cost) + " Universes\n\
           Amount: " + player[this.layer].buyables[this.id] + " \n\
           x" + format(data.effect) + " boost to Singularities";
         },
         effect() {
           let eff = player[this.layer].buyables[this.id].add(1).pow(1.4).times(7.5).add(2).times(player.u.dimmult);
           return eff;    
         },
        },
        33: {
          cost(x) { return new Decimal(1000).times(Decimal.pow(10, player[this.layer].buyables[this.id].add(1)).times(x)) },
          title: "Dimension Boost",
          canAfford() { return player[this.layer].points.gte(this.cost()) },
          buy() {
              player[this.layer].points = player[this.layer].points.minus(this.cost())
              setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
          },
          display() 
       { // Everything else displayed in the buyable button after the title
         let data = tmp[this.layer].buyables[this.id]
         return "Cost: " + format(data.cost) + " Universes\n\
         Amount: " + player[this.layer].buyables[this.id] + " \n\
         x" + format(data.effect) + " boost to Dimension multi.";
       },
       effect() {
         let eff = Decimal.dOne.times(Decimal.pow(10, player[this.layer].buyables[this.id]));
         return eff;    
       },
      },
    },
    tabFormat: {
      "Main": {
        content: [ "main-display",
			"prestige-button",
			"blank",
			["display-text",
				function() {return 'You have ' + format(player.u.points) + ' Universes, which boosts mass generation by '+format(tmp.u.effect)+'x'},
					{}], 
          "blank", "buyables",
      ],
    },
  },
},
)