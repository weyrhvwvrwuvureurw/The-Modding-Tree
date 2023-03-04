
  addLayer("p", {
    name: "prestige", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "P", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#31AEB0",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "prestige points", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.3,
       gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        if (hasUpgrade('p', 21)) mult = mult.times(3);
        if (hasUpgrade('p', 32)) mult = mult.times(10);
        mult = mult.times(tmp.g.effect);
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        mult = new Decimal(1)
        if (hasUpgrade('g', 12)) mult = mult.times(1.2);
        return mult
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    layerShown(){return true},
    upgrades: {
    11: {
        title: "Prestige Boost",
        description: "PP boosts point gen.",
        cost: new Decimal(1),
        effect() {
           let eff = player.p.points.plus(2).pow(0.5);
           if (hasUpgrade("p", 12)) eff = eff.pow(2);
           if (hasUpgrade("p", 22)) eff = eff.times(3);
           return eff;
        },
        effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
    },
    12: {
        title: "Prestigious Insanity",
        description: "<b>Prestige boost</b>'s effect is squared and unlock a milestone.",
        cost: new Decimal(3),
    },
    13: {
        title: "PP > SP",
        description: "PP boosts SP.",
        cost: new Decimal(35),
        effect() {
            let eff = player.p.points.plus(1).pow(0.6);
            return eff;
         },
         effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
    },
    21: {
        title: "MORE and More",
        description: "Triple PP.",
        cost: new Decimal(7),
    },
    22: {
        title: "MORE MORE!!!",
        description: "Triple the <b>Prestige boost</b>'s effect and unlock another milestone & unlock an upgrade.",
        cost: new Decimal(15),
    },
    23: {
        title: "SP > PP",
        description: "SP boosts PP.",
        cost: new Decimal(75),
        effect() {
            let eff = player.s.points.plus(1).pow(0.05);
            return eff;
         },
         effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
         unlocked() { return hasUpgrade('p', 13)},
    },
   31: {
        title: "SP go brrr",
        description: "Gain 100% of SP on prestige every second.",
        cost: new Decimal(145),
         unlocked() { return hasUpgrade('p', 23)},
         32: {
            title: "PP go brrr",
            description: "x10 PP.",
            cost: new Decimal(250),
             unlocked() { return hasUpgrade('p', 31)},
         },
             33: {
                title: "Boosters & Generators!??!?!?!",
                description: "Unlock 2 new layers.",
                cost: new Decimal(500),
                 unlocked() { return hasUpgrade('p', 32)},
             },
            
}}})
addLayer("b", {
    name: "boosters", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "B", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},
    color: "#6E64C4",
    requires: new Decimal(600), // Can be a function that takes requirement increases into account
    resource: "boosters", // Name of prestige currency
    baseResource: "prestige points", // Name of resource prestige is based on
    baseAmount() {return player.p.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.25,
       gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 2, // Row the layer is in on the tree (0 is the first row)
    layerShown(){return hasUpgrade('p', 33)},
    effect() {
        let eff = Decimal.pow(this.effBase, player.b.points)
        return eff;
       },
       effectDescription(){
           return "multiplying point gain by " + format(tmp[this.layer].effect)
         },
         upgrades: {
           11: {
               title: "Booster",
               description: "Add 0.05 to the Booster eff base",
               cost: new Decimal(8),
           },
           12: {
               title: "Booster^2",
               description: "^1.2 SP",
               cost: new Decimal(15),
           },
         },
         milestones: {
           1: {
               requirementDescription: "Get 2 Boosters. (1)",
               effectDescription: "x1000 SP.",
               done() { return player[this.layer].points.gte(2) },
               unlocked() { return player.g.unlocked },
           },
           2: {
               requirementDescription: "Get 3 Boosters. (2)",
               effectDescription: "x10000000 points.",
               done() { return player[this.layer].points.gte(3) },
               unlocked() { return hasMilestone('b', 1) },
           },
           3: {
               requirementDescription: "Get 5 Boosters. (3)",
               effectDescription: "Increase Booster eff base by 0.1.",
               done() { return player[this.layer].points.gte(5) },
               unlocked() { return hasMilestone('b', 2) },
           },
       },
       effBase() {
           let base = new Decimal(1.5);
           if (hasMilestone('g', 3)) base = base.add(0.1);
           if (hasUpgrade('b', 11)) base = base.add(0.05);
           base = base.add(tmp.s.effect)
           return base;
       },
    })
addLayer("g", {
    name: "generators", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "G", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},
    color: "#A3D9A5",
    requires: new Decimal(600), // Can be a function that takes requirement increases into account
    resource: "generators", // Name of prestige currency
    baseResource: "prestige points", // Name of resource prestige is based on
    baseAmount() {return player.p.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.25,
       gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 2, // Row the layer is in on the tree (0 is the first row)
    layerShown(){return hasUpgrade('p', 33)},
effect() {
 let eff = Decimal.pow(this.effBase, player.g.points)
 return eff;
},
effectDescription(){
    return "multiplying prestige point gain by " + format(tmp[this.layer].effect)
  },
  upgrades: {
    11: {
        title: "Generator",
        description: "Add 0.05 to the Gen eff base",
        cost: new Decimal(8),
    },
    12: {
        title: "Generator^2",
        description: "^1.015 PP",
        cost: new Decimal(15),
    },
  },
  milestones: {
    1: {
        requirementDescription: "Get 2 Generators. (1)",
        effectDescription: "Increase Gen eff base by 0.1.",
        done() { return player[this.layer].points.gte(2) },
        unlocked() { return player.g.unlocked },
    },
    2: {
        requirementDescription: "Get 3 Generators. (2)",
        effectDescription: "^1.01 PP.",
        done() { return player[this.layer].points.gte(3) },
        unlocked() { return hasMilestone('g', 1) },
    },
    3: {
        requirementDescription: "Get 5 Generators. (3)",
        effectDescription: "Increase Gen eff base by another 0.1.",
        done() { return player[this.layer].points.gte(5) },
        unlocked() { return hasMilestone('g', 2) },
    },
},
effBase() {
    let base = new Decimal(1.5);
    if (hasMilestone('g', 1)) base = base.add(0.1);
    if (hasMilestone('g', 3)) base = base.add(0.1);
    if (hasUpgrade('g', 11)) base = base.add(0.05);
    base = base.add(tmp.t.effect)
    return base;
},
})
addLayer("t", {
    name: "time", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "T", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},
    color: "#006609",
    requires() { return new Decimal(1e120) }, // Can be a function that takes requirement increases into account
    resource: "time capsules", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.2,
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 3, // Row the layer is in on the tree (0 is the first row)
    layerShown(){return player.b.unlocked},
    effect() {
        let eff = Decimal.pow(this.effBase, player.t.points).pow(0.5)
        return eff;
       },
       effectDescription(){
           return "adding to the Gen eff base by " + format(tmp[this.layer].effect)
         },
         effBase() {
            let base = new Decimal(1.65);
            return base;
        },
})
addLayer("s", {
    name: "space", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "S", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},
    color: "#dfdfdf",
    requires() { return new Decimal(1e120) }, // Can be a function that takes requirement increases into account
    resource: "space energy", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.2,
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 3, // Row the layer is in on the tree (0 is the first row)
    layerShown(){return player.g.unlocked},
    effect() {
        let eff = Decimal.pow(this.effBase, player.t.points).pow(0.5)
        return eff;
       },
       effectDescription(){
           return "adding to the Booster eff base by " + format(tmp[this.layer].effect)
         },
         effBase() {
            let base = new Decimal(1.65);
            return base;
        },
})
