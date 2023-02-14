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
    exponent: 0.04, // Prestige currency exponent
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
description: "Boost points!",
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
    return player[this.layer].points.add(1).pow(0.92)
},
effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
},
15: {
    title: "coolest upgrade ever.",
description: "Boost points based on themselves",
cost: new Decimal(18),
effect() {
    return player.points.max(Decimal.dOne).log2().add(Decimal.dOne).pow(0.0565)
},
effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
},
16: {
    title: "i am so happy!!!",
description: "Boost points again!",
cost: new Decimal(25),
effect() {
    return player.points.add(1).pow(0.00093)
},
effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
},
21: {
    title: "funni",
description: "Boost points based on insanity.",
cost: new Decimal(35),
effect() {
    return player[this.layer].points.max(Decimal.dOne).log2().add(Decimal.dOne).pow(0.000002)
},
effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
},
22: {
    title: "funi",
description: "Boost points once again",
cost: new Decimal(50),
effect() {
    return player[this.layer].points.add(1).pow(0.0028)
},
effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
},
23: {
    title: "Very very nice!",
description: "Boost points ONCE AGAIN.",
cost: new Decimal(75),
effect() {
    return player[this.layer].points.add(1).pow(0.0002)
},
effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
},
24: {
    title: "31",
description: "The three ones!",
cost: new Decimal(111),
effect() {
    return player[this.layer].points.add(1).pow(0.000111)
},
effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
},
    }})
    addLayer("inf", {
        name: "infinity", // This is optional, only used in a few places, If absent it just uses the layer id.
        symbol: "∞", // This appears on the layer's node. Default is the id with the first letter capitalized
        position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
        startData() { return {
            unlocked: false,
            points: new Decimal(0),
        }},
        color: "#FF9800",
        requires: new Decimal("1e65"), // Can be a function that takes requirement increases into account
        resource: "infinity points", // Name of prestige currency
        baseResource: "points", // Name of resource prestige is based on
        baseAmount() {return player.points}, // Get the current amount of baseResource
        type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
        exponent: 0.05, // Prestige currency exponent
        gainMult() { // Calculate the multiplier for main currency from bonuses
            mult = new Decimal(9)
            return mult
        },
        gainExp() { // Calculate the exponent on main currency from bonuses
            return new Decimal(1.02)
        },
        row: 1, // Row the layer is in on the tree (0 is the first row)
        hotkeys: [
            {key: "i", description: "I: Reset for insanity.", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
        ],
        layerShown(){return true},
        
        upgrades: {
            11: {
                title: "Booster be like",
            description: "Boost points based on IP.",
            cost: new Decimal(1),
            effect() {
                return player[this.layer].points.add(1).pow(2)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
        },
        12: {
            title: "Generator be like.",
            description: "Boost points based on IP lol.",
        cost: new Decimal(2),
        effect() {
            return player[this.layer].points.add(1).pow(0.00059)
        },
        effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"^" },
    },
    13: {
        title: "PT:C be like",
        description: "Boost points based on IP but better.",
    cost: new Decimal(3),
    effect() {
        return player[this.layer].points.add(1).pow(0.001)
    },
    effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"^" },
},
14: {
    title: "PT:R be like",
    description: "Boost points based on IP but balanced.",
cost: new Decimal(5),
effect() {
    return player[this.layer].points.add(1).pow(0.000666)
},
effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"^" },
},
15: {
    title: "AD be like",
    description: "Boost points based on IP but balanced.",
cost: new Decimal(8),
effect() {
    return player[this.layer].points.max(Decimal.dOne).log2().add(Decimal.dOne).pow(0.425)
},
effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
},
21: {
    title: "TI alpha like",
    description: "Boost points based on IP but UNbalanced.",
cost: new Decimal(13),
effect() {
    return player[this.layer].points.max(Decimal.dOne).log2().add(Decimal.dOne).pow(0.2855)
},
effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"^" },
},
22: {
    title: "TI beta like",
    description: "Boost points based on IP but a bit more balanced.",
cost: new Decimal(20),
effect() {
    return player[this.layer].points.max(Decimal.dOne).log2().add(Decimal.dOne).pow(0.28497225)
},
effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"^" },
},
23: {
    title: "TI gamma like",
    description: "Boost points based on IP but very balanced.",
cost: new Decimal(30),
effect() {
    return player[this.layer].points.max(Decimal.dOne).log2().add(Decimal.dOne).pow(0.28519874724285)
},
effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"^" },
},
24: {
    title: "TI DELTA like",
    description: "Boost points based on IP but very very balanced.",
cost: new Decimal(50),
effect() {
    return player[this.layer].points.max(Decimal.dOne).log2().add(Decimal.dOne).pow(0.2852002083791095)
},
effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"^" },
},
    },
    challenges: {
        11: {
            name: "Infinity Challenge 1",
            challengeDescription: "^0.5 points.",
            canComplete: function() {return player.points.gte(1e40)},
            goalDescription: "Reach 1e40 pts.",
            rewardDescription: "^1.11 points."
        },
        12: {
            name: "Infinity Challenge 2",
            challengeDescription: "/1e25 points.",
            canComplete: function() {return player.points.gte(1e50)},
            goalDescription: "Reach 1e50 pts.",
            rewardDescription: "x1e100 points."
        },
        21: {
            name: "Infinity Challenge 3",
            challengeDescription: "log2 points.",
            canComplete: function() {return player.points.gte(1e45)},
            goalDescription: "Reach 1e45 pts.",
            rewardDescription: "^1.095 points."
        },
        22: {
            name: "Infinity Challenge 4",
            challengeDescription: "^0.4 points.",
            canComplete: function() {return player.points.gte(1e55)},
            goalDescription: "Reach 1e55 pts.",
            rewardDescription: "^1.0975 points."
        },
        31: {
            name: "Infinity Challenge 5",
            challengeDescription: "/1e35 points.",
            canComplete: function() {return player.points.gte(3.16e50)},
            goalDescription: "Reach 3.16e50 pts.",
            rewardDescription: "x1e125 points."
        },
        32: {
            name: "Infinity Challenge 6",
            challengeDescription: "log2 points and ^0.8 points.",
            canComplete: function() {return player.points.gte(1e40)},
            goalDescription: "Reach 1e40 pts.",
            rewardDescription: "^1.09 points.",
            completionLimit: "5"
        },
    },       
        milestones: {
            0: {
                requirementDescription: "Reach 100 IP.",
                effectDescription: "x1e9 points.",
                done() { return player[this.layer].points.gte(100) },
                unlocked() { true }
            },
            1: {
                requirementDescription: "Reach 500 IP.",
                effectDescription: "x1e15 points.",
                done() { return player[this.layer].points.gte(500) },
                unlocked() { true }
            },
            2: {
                requirementDescription: "Reach 10000 IP.",
                effectDescription: "x1e35 points.",
                done() { return player[this.layer].points.gte(10000) },
                unlocked() { true }
            },
            3: {
                requirementDescription: "Reach 1e6 IP.",
                effectDescription: "^1.1 points.",
                done() { return player[this.layer].points.gte(1e6) },
                unlocked() { true }
            },
        },
    })
    addLayer("e", {
        name: "eternity", // This is optional, only used in a few places, If absent it just uses the layer id.
        symbol: "Ω", // This appears on the layer's node. Default is the id with the first letter capitalized
        position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
        startData() { return {
            unlocked: false,
            points: new Decimal(0),
        }},
        color: "#B341E0",
        requires: new Decimal("1.79769e308"), // Can be a function that takes requirement increases into account
        resource: "eternity points", // Name of prestige currency
        baseResource: "infinity points", // Name of resource prestige is based on
        baseAmount() {return player.inf.points}, // Get the current amount of baseResource
        type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
        exponent: 0.0215, // Prestige currency exponent
        gainMult() { // Calculate the multiplier for main currency from bonuses
            mult = new Decimal(6)
            return mult
        },
        gainExp() { // Calculate the exponent on main currency from bonuses
            return new Decimal(1.012)
        },
        row: 2, // Row the layer is in on the tree (0 is the first row)
        hotkeys: [
            {key: "i", description: "I: Reset for insanity.", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
        ],
        layerShown(){return true},
        effect(){
            return Decimal.pow(1.25, player[this.layer].points)
            /*
              you should use this.layer instead of <layerID>
              Decimal.pow(num1, num2) is an easier way to do
              num1.pow(num2)
            */
          },
          effectDescription(){
            return "multiplying point gain by " + format(tmp[this.layer].effect)
            /*
              use format(num) whenever displaying a number
            */
          },
        upgrades: {
            11: {
                title: "Eternity be like",
            description: "Boost points based on EP.",
            cost: new Decimal(1),
            effect() {
                return player[this.layer].points.add(1).pow(0.15)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
        },
        12: {
                title: "Early TS's be like",
            description: "Boost points based on EP again.",
            cost: new Decimal(2),
            effect() {
                return player[this.layer].points.add(1).pow(0.150525)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
        },
        13: {
                title: "TD1, 2, 3, 4 be like",
            description: "Boost points based on themselves AGAIN.",
            cost: new Decimal(3),
            effect() {
                return player.points.max(Decimal.dOne).log2().add(Decimal.dOne).pow(0.0564)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
        },
        14: {
                title: "Oh wow.",
            description: "EP boosts point's exponent.",
            cost: new Decimal(5),
            effect() {
                return player[this.layer].points.add(1).pow(0.072).log2()
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"^" },
        },
        15: {
                title: "Nicenicenice.",
            description: "x696969 points.",
            cost: new Decimal(8),
        },
        16: {
                title: "Nice go brrrr",
            description: "x6.9 * 10 ^ 69 points.",
            cost: new Decimal(12),       
        },
        21: {
                title: "Very cool I guess.",
            description: "EP boosts point exponent again.",
            cost: new Decimal(18),
            effect() {
                return player[this.layer].points.add(1).log().pow(0.1)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"^" },
        },
        22: {
                title: "VERY NICE UPGRADES",
            description: "Boost points even more.",
            cost: new Decimal(30),
            effect() {
                return player[this.layer].points.add(1).log2(player[this.layer].points).pow(0.06)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"^" },
        },
        23: {
                title: "Oh, TIMEWALLS",
            description: "Boost points based on EP.",
            cost: new Decimal(65),
            effect() {
                return player[this.layer].points.add(1).pow(0.119)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
        },
        24: {
                title: "Bruh",
            description: "Boost points based on EP more.",
            cost: new Decimal(90),
            effect() {
                return player[this.layer].points.add(1).pow(0.13)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
        },
        },
        challenges: {
            11: {
                name: "Eternity Challenge 1",
                challengeDescription: "^0.3 points.",
                canComplete: function() {return player.e.points.gte(1)},
                goalDescription: "Reach 1EP.",
                rewardDescription: "+0.2 point exponent."
            },
            12: {
                name: "Eternity Challenge 2",
                challengeDescription: "/1e125 points.",
                canComplete: function() {return player.e.points.gte(1)},
                goalDescription: "Reach 1EP.",
                rewardDescription: "x1e200 points."
            },
            21: {
                name: "Eternity Challenge 3",
                challengeDescription: "log e points.",
                canComplete: function() {return player.e.points.gte(1)},
                goalDescription: "Reach 1EP.",
                rewardDescription: "^1.1 points."
            },
            22: {
                name: "Eternity Challenge 4",
                challengeDescription: "IU15 is disabled.",
                canComplete: function() {return player.e.points.gte(1)},
                goalDescription: "Reach 1EP.",
                rewardDescription: "+0.16 point's exponent."
            },
            31: {
                name: "Eternity Challenge 5",
                challengeDescription: "log2 and ^0.5 points.",
                canComplete: function() {return player.e.points.gte(1)},
                goalDescription: "Reach 1EP.",
                rewardDescription: "x1e500 points."
            },
            32: {
                name: "Eternity Challenge 6",
                challengeDescription: "IU14 is disabled.",
                canComplete: function() {return player.e.points.gte(1)},
                goalDescription: "Reach 1EP.",
                rewardDescription: "^1.111 points.",
            },
        },
    })