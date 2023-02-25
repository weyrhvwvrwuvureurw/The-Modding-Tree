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
        if (hasUpgrade('s', 11)) mult = mult.times(1.01)
        if (hasUpgrade('s', 12)) mult = mult.times(upgradeEffect('s', 12))
        if (hasChallenge('s', 11)) mult = mult.times(Decimal.pow(1.2, challengeCompletions('s', 11)))
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
    },
    challenges: {
        11: {
            name: "Ouch",
            challengeDescription() { return "x0.3 points.<br>"+challengeCompletions(this.layer, this.id) + "/" + this.completionLimit + " completions"},
            goalDescription: "Get 0.5 points.",
            canComplete: function() { return player.points.gte(0.5)},
            rewardDescription: "x1.2 SP per completion.",
            unlocked() { return hasUpgrade('s', 14)},
            completionLimit: "5",
        },
    },
  })     