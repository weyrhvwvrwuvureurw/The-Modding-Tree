addLayer("m", {
    name: "m", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "M", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#FF0000",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "multiplier", // Name of prestige currency
    baseResource: "cash", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        mult = mult.times(tmp.r.effect);
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    layerShown(){return true},
    effect() {
      let eff = player.m.points.add(1);
      return eff;
    },
    tabFormat: {
        "Main": {
            content: [
                "main-display",
                "prestige-button",
                "blank",
                ["display-text",
                    function() {return 'Your multiplier is giving a x' + format(tmp.m.effect)+' boost to Cash.'},
                        {}],
            ],
        },
    }
})
addLayer("r", {
    name: "r", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "R", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},
    color: "#000088",
    requires: new Decimal(1000), // Can be a function that takes requirement increases into account
    resource: "rebirths", // Name of prestige currency
    baseResource: "multiplier", // Name of resource prestige is based on
    baseAmount() {return player.m.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.4, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        mult = mult.times(tmp.s.effect);
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    layerShown(){return player.m.points.gte(1000)},
    effect() {
      let eff = player.r.points.times(2).add(1);
      return eff;
    },
    tabFormat: {
        "Main": {
            content: [
                "main-display",
                "prestige-button",
                "blank",
                ["display-text",
                    function() {return 'Your rebirths are giving a x' + format(tmp.r.effect)+' boost to Multiplier.'},
                        {}],
            ],
        },
    }
})
addLayer("s", {
    name: "s", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "S", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},
    color: "#000088",
    requires: new Decimal(50), // Can be a function that takes requirement increases into account
    resource: "stone", // Name of prestige currency
    baseResource: "rebirths", // Name of resource prestige is based on
    baseAmount() {return player.r.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.0075, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 2, // Row the layer is in on the tree (0 is the first row)
    layerShown(){return player.r.points.gte(50)},
    effect() {
      let eff = player.s.points.times(1.5).add(1);
      return eff;
    },
    Casheffect() {
        let eff = player.s.points.times(1.75).add(1);
        return eff;
      },
    tabFormat: {
        "Main": {
            content: [
                "main-display",
                "prestige-button",
                "blank",
                ["display-text",
                    function() {return 'Your stones are giving a x' + format(tmp.s.effect)+' boost to rebirths and a x' + format(tmp.s.Casheffect) + ' boost to Cash.'},
                        {}],
            ],
        },
    }
})