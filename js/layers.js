addLayer("y", {
    name: "youtube", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "Y", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
        views: new Decimal(0),
        money: new Decimal(0),
    }},
    color: "#F30200",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "videos", // Name of prestige currency
    baseResource: "subscribers", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        mult = mult.times(tmp.y.viewEff2);
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    layerShown(){return true},
    effect() {
       let eff = player.y.points.add(1).pow(0.2).times(0.5).add(1);
       return eff;
    },
    effectDescription() {
     return "which are boosting your subscribers by " + format(tmp.y.effect) + "x and producing " + format(tmp.y.viewEff) + " views per second."
    },
    viewEff() {
       let eff = player.y.points.add(1).times(85).pow(0.95);
       if (hasMilestone('y', 1)) eff = eff.times(2);
       if (hasMilestone('y', 2)) eff = player.y.points.add(1).times(115).pow(1.05);
       return eff;
    },
    viewEff2() {
        let eff = player.y.views.add(1).pow(0.05).times(0.2).add(1).pow(0.8).div(1.05).add(1);
        if (hasMilestone('y', 3)) eff = player.y.views.add(1).pow(0.06).times(0.245).div(0.992).add(1).pow(0.83).add(1);
        return eff;
     },
     moneyEff() {
       let eff = player.y.views.times(0);
       if (hasUpgrade('y', 11)) eff = player.y.views.add(1).div(1500000).add(1).pow(1.001).times(1.1).add(1);
       return eff;
     },
    tabFormat: ["main-display",
			"prestige-button",
			"blank",
			["display-text",
				function() {return 'You have ' + format(player.y.views) + ' views which are boosting videos by ' + format(tmp.y.viewEff2) + 'x'},
					{}],
			"blank",
			"blank",
            "milestones", "blank", "blank", "upgrades",
            ["display-text",
				function() {return 'You have ' + format(player.y.money) + ' dollars.'},
					{}],
			],
    update() {
       return player.y.views = player.y.views.plus(this.viewEff().div(30));
    },
    update2() {
        return player.y.money = player.y.money.plus(this.moneyEff().div(30));
     },
    milestones: {
            1: {
                requirementDescription: "Have 1,000 views",
                effectDescription: "Double views.",
                done() { return player.y.views.gte(1000) },
            },
            2: {
                requirementDescription: "Have 100 videos",
                effectDescription: "View gain is boosted.",
                done() { return player.y.points.gte(100) },
            },
            3: {
                requirementDescription: "Have 1,000,000 views",
                effectDescription: "View effect is boosted.",
                done() { return player.y.views.gte(1e6) },
            },
            4: {
                requirementDescription: "Have 500 videos",
                effectDescription: "Make subscribers get boosted by the view effect.",
                done() { return player.y.points.gte(500) },
            },
        },
        upgrades: {
            11: {
                title: "Monetization",
                description: "Start to gain money.",
                cost: new Decimal(675),
            },
            12: {
                title: "Play Buttons",
                description: "+20% subscribers per 100$.",
                cost: new Decimal(2000),
            },
        },
    },    
)