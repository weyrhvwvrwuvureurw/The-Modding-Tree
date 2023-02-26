addLayer("s", {
    name: "start", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "S", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#A9CCD1",
    requires: new Decimal(0.1), // Can be a function that takes requirement increases into account
    resource: "starting points", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.4, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        if (hasUpgrade('s', 11)) mult = mult.times(1.01);
        if (hasUpgrade('s', 12)) mult = mult.times(upgradeEffect('s', 12));
        if (hasChallenge('s', 11)) mult = mult.times(Decimal.pow(1.2, challengeCompletions('s', 11)));
        if (hasChallenge('s', 12)) mult = mult.times(Decimal.pow(1.4, challengeCompletions('s', 12)));
        if (hasUpgrade('s', 15)) mult = mult.times(upgradeEffect('s', 15));
        if (hasMilestone('s', 11)) mult = mult.times(4);
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    layerShown(){return true},
    upgrades: {
        11: {
            title: "1",
            description: "x1.01 SP.",
            cost: new Decimal(1),
        },
        12: {
            title: "2",
            description: "Boost SP based on themselves.",
            cost: new Decimal(2),
            effect() {
                return player[this.layer].points.add(1).pow(0.3)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
        },
        13: {
            title: "3",
            description: "Double points.",
            cost: new Decimal(3),
        },
        14: {
            title: "4",
            description: "Boost points based on themselves and unlock a challenge.",
            cost: new Decimal(4),
            effect() {
                return player.points.add(1).pow(0.4)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
        },
        15: {
            title: "5",
            description: "Boost SP based on points.",
            cost: new Decimal(5),
            effect() {
                return player.points.add(1).pow(0.025)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
        },
        16: {
            title: "6",
            description: "Boost points based on SP and unlock a challenge.",
            cost: new Decimal(7),
            effect() {
                return player[this.layer].points.add(1).pow(0.5)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
        },
        21: {
            title: "7",
            description: "x5 points and unlock a milestone.",
            cost: new Decimal(8),
        },
    },
    challenges: {
        11: {
            name: "Ouch",
            challengeDescription() { return "x0.3 points but it is raised to the power of this challenge's completions.<br>"+challengeCompletions(this.layer, this.id) + "/" + this.completionLimit + " completions"},
            goalDescription: "Get 0.5 points.",
            canComplete: function() { return player.points.gte(0.5)},
            rewardDescription: "x1.2 SP per completion.",
            unlocked() { return hasUpgrade('s', 14)},
            completionLimit: "5",
        },
        12: {
            name: "Oof",
            challengeDescription() { return "/10 points per completion.<br>"+challengeCompletions(this.layer, this.id) + "/" + this.completionLimit + " completions"},
            goalDescription: "Get 1 point.",
            canComplete: function() { return player.points.gte(1)},
            rewardDescription: "x1.4 SP and x1.1 points per completion.",
            unlocked() { return hasUpgrade('s', 16)},
            completionLimit: "7",
        },
    },
    milestones: {
        1: {
            requirementDescription: "Get 500 SP. (1)",
            effectDescription: "Quadruple SP and triple points.",
            done() { return player[this.layer].points.gte(500) },
            unlocked() { return hasUpgrade('s', 21) },
        },
    },
  })     