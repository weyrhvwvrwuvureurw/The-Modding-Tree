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
            title: "DA GAS (kinda).",
            description: "Raise points to the 1.05th power.",
            cost: new Decimal(305),
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
    requires: new Decimal("1e9"), // Can be a function that takes requirement increases into account
    resource: "insanity", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.125, // Prestige currency exponent
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
    layerShown(){return true},
    upgrades: {
        11: {
            title: "WOW",
        description: "Boost points based on insanity for the 1st time.",
        cost: new Decimal(5),
        effect() {
            return player[this.layer].points.add(1).pow(0.1)
        },
        effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
      },
      12: {
        title: "MORE WOW",
    description: "Boost points based on insanity.",
    cost: new Decimal(8),
    effect() {
        return player[this.layer].points.add(1).pow(0.025)
    },
    effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"^" },
  },
  13: {
    title: "hm...",
description: "Boost insanity based on points.",
cost: new Decimal(12),
effect() {
    return player.points.add(1).pow(0.00275)
},
effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
},
14: {
    title: "more nice :D",
description: "MULTIPLY points by how much insanity you have.",
cost: new Decimal(15),
effect() {
    return player[this.layer].points.add(1).pow(15.2575)
},
effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
},
15: {
    title: "coolest upgrade ever.",
description: "Boost points based on themselves",
cost: new Decimal(18),
effect() {
    return player.points.max(Decimal.dOne).log2().add(Decimal.dOne).pow(Decimal.dTwo)
},
effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
},
16: {
    title: "i am so happy!!!",
description: "Boost insanity again!",
cost: new Decimal(25),
effect() {
    return player.points.add(1).pow(0.002775)
},
effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
},
21: {
    title: "funni",
description: "Boost insanity based on themselves.",
cost: new Decimal(35),
effect() {
    return player[this.layer].points.max(Decimal.dOne).log2().add(Decimal.dOne).pow(1.1)
},
effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
},
22: {
    title: "funi",
description: "Boost insanity once again",
cost: new Decimal(50),
effect() {
    return player.points.add(1).pow(0.0028)
},
effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
},
23: {
    title: "Very very nice!",
description: "Boost points ONCE AGAIN.",
cost: new Decimal(75),
effect() {
    return player[this.layer].points.add(1).pow(0.02)
},
effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
},
24: {
    title: "31",
description: "The three ones!",
cost: new Decimal(111),
effect() {
    return player[this.layer].points.add(1).pow(0.03)
},
effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
},
    }})
