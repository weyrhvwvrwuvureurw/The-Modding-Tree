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
        if (hasUpgrade('y', 13)) mult = mult.times(upgradeEffect('y', 13));
        if (hasChallenge('y', 11)) mult = mult.times(tmp.y.challenges[11].rewardEffect);
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    layerShown(){return true},
    passiveGeneration() { return (hasUpgrade('y', 15))},
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
       if (hasChallenge('y', 11)) eff = eff.times(tmp.y.challenges[11].rewardEffect);
       if (hasUpgrade('y', 21)) eff = eff.times(upgradeEffect('y', 21));
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
       if (hasUpgrade('y', 14)) eff = player.y.views.add(1).div(1250000).pow(1.01).add(1).pow(1.00125).times(1.15).add(1);
       return eff;
     },
     moneyEff2() {
        let eff = player.y.money.times(0).add(1);
        if (hasUpgrade('y', 11)) eff = player.y.money.add(1).div(50).add(1).times(1.12).pow(1.001).div(1.5).add(1);
        if (hasUpgrade('y', 14)) eff = player.y.money.add(1).div(35).add(1).times(1.2).pow(1.005).div(1.3).add(1);
        if (hasUpgrade('y', 22)) eff = eff.times(upgradeEffect('y', 22));
        return eff;
      },
    tabFormat: {
    "Main": {
       content:  ["main-display",
			"prestige-button",
			"blank",
			["display-text",
				function() {return 'You have ' + format(player.y.views) + ' views which are boosting videos by ' + format(tmp.y.viewEff2) + 'x'},
					{}],
			"blank",
			"blank",
            "milestones", "blank", "upgrades",
            ["display-text",
				function() {return 'You have ' + format(player.y.money) + ' dollars which are boosting subscribers by ' + format(tmp.y.moneyEff2) + 'x'},
					{}],
    ],
    }, 
    "Challenges": {
        unlocked() {return (hasUpgrade('y', 15))},
        content:  ["main-display",
             "prestige-button",
             "blank",
             "challenges",
     ],
     },
     },  
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
                effectDescription: "Make subs be boosted by view eff.",
                done() { return player.y.points.gte(5e2) },
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
            13: {
                title: "Algorithm Buff",
                description: "Boost videos based on themselves.",
                cost: new Decimal(6500),
                effect() {
                   let eff = player.y.points.add(1).pow(0.1).times(1.92).div(2.002).add(1).div(1.1).add(1).pow(1.01)
                   return eff;
                },
                effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
            },
            14: {
                title: "Youtube Update",
                description: "Buff the Money gain and boost effect.",
                cost: new Decimal(12500),
            },
            15: {
                title: "Get an Editor",
                description: "Let the Editor make videos for you.",
                cost: new Decimal(400000),
            },
            21: {
                title: "Go Viral",
                description: "Boost views based on videos.",
                cost: new Decimal(1000000),
                effect() {
                    let eff = player.y.points.add(1).pow(0.2).add(1).div(2.7).times(1.3).add(1).pow(1.12).times(2.38).pow(1.03).div(0.92)
                    return eff;
                 },
                 effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
            },
            22: {
                title: "Master at Youtube",
                description: "Buff money effect based on views.",
                cost: new Decimal(3500000),
                effect() {
                    let eff = player.y.views.add(1).pow(0.002).times(13.3).div(20.8).add(1).times(2).pow(0.934).times(1.383).add(1)
                    return eff;
                 },
                 effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
            },
        },
        challenges: {
            11: {
                name: "Algorithm Nerf",
                challengeDescription() {return "Subscribers are nerfed based on completions. " + challengeCompletions(this.layer, this.id) + "/" + this.completionLimit + " completions."},
                goalDescription: "Get 5000 Subscribers.",
                rewardDescription: "Views are buffed based on completions.",
                rewardEffect() {
                    let ret = Decimal.pow(2.83, challengeCompletions(this.layer, this.id));
                    if (hasChallenge('y', 12)) ret = ret.times(Decimal.pow(1.028, challengeCompletions(this.layer, 12)));
                    return ret;
                },
                canComplete: function() {return player.points.gte(5000)},
                completionLimit: "12",
            },
            12: {
                name: "Back To School",
                challengeDescription() {return "Subscribers and views are nerfed based on completions. " + challengeCompletions(this.layer, this.id) + "/" + this.completionLimit + " completions."},
                goalDescription: "Get 300 Videos.",
                rewardDescription: "Videos are buffed based on completions and boost Algorithm Nerf's effect.",
                rewardEffect() {
                    let ret = Decimal.pow(1.462, challengeCompletions(this.layer, this.id));
                    return ret;
                },
                canComplete: function() {return player.y.points.gte(300)},
                completionLimit: "15",
            },
        },
    })
