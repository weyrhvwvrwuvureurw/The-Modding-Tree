addLayer("p", {
    name: "prestige", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "P", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#A9CCD1",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "prestige points", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(2)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "p", description: "P: Reset for prestige points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},
    upgrades: {
        11: {
    title: "Double your points gain.",
    description: "Double your points gain.",
    cost: new Decimal(1),
    },
        12: {
    title: "Synergy.",
    description: "Boost points based on prestige points.",
    cost: new Decimal(2),
    effect() {
        return player[this.layer].points.add(1).pow(0.5)
    },
    effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
    },
    13: {
        title: "Better Synergy.",
        description: "Boost points based on prestige points again.",
        cost: new Decimal(5),
        effect() {
            return player[this.layer].points.add(1).pow(0.75)
        },
        effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
        },
        14: {
            title: "Raise points to the 1.25th power.",
            description: "Self explanatory.",
            cost: new Decimal(10),
        },
        21: {
            title: "Self-Synergy.",
            description: "Points boost themselves.",
            cost: new Decimal(30),
        },
        effect() {
            return player.points.add(1).log(2).add(1).pow(2)
        },
}})
        

addLayer("i", {
    name: "insanity", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "I", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},
    color: "#FFA600",
    requires: new Decimal(1e8), // Can be a function that takes requirement increases into account
    resource: "insanity", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.3, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(6)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1.012)
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "i", description: "I: Reset for insanity.", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true}
})