addLayer("s", {
    name: "stardust", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "S", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
        mass: new Decimal(0.08),
        radius: new Decimal(0.09),
        luminosity: new Decimal(0.003)
    }},
    color: "#00008b",
    requires: new Decimal(5), // Can be a function that takes requirement increases into account
    resource: "prestige points", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
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
    starMgainingEff() {
        let eff = player.s.mass.pow(0.001).add(player.s.radius.div(15))
        return eff;
    },
    starRgainingEff() {
        let eff = player.s.radius.pow(0.0022).add(player.s.mass.div(20))
        return eff;
    },
    starLgainingEff() {
        let eff = player.s.radius.times(player.s.mass).pow(0.0016)
        return eff;
    },
    tabFormat: {
        "Main": {
           content:  ["main-display",
                "prestige-button",
                "blank",
                ["display-text",
                    function() {return 'Your star is ' + format(player.s.mass) + ' solar mass and  ' + format(player.s.radius) + ' solar radius and as bright as ' + format(player.s.luminosity) + ' suns.'},
                        {}],
            ],
        },
    }, 
    upgrades: {
      11: {
        title: "Clumping Hydrogen",
        description: "Double stardust gain rate.",
        cost: new Decimal(5),
      },
      12: {
        title: "First Star",
        description: "Form a star that boosts itself.",
        cost: new Decimal(25),
        effect() {
            let eff = player.s.mass.add(player.s.radius).pow(player.s.luminosity).times(100e3);
            return eff;
         },
         effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
    },
    }
})