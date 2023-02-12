let modInfo = {
	name: "The Unbalanced Tree",
	id: "844",
	author: "nobody",
	pointsName: "points",
	modFiles: ["layers.js", "tree.js"],

	discordName: "",
	discordLink: "",
	initialStartPoints: new Decimal (10), // Used for hard resets and new players
	offlineLimit: 100000000000,  // In hours
}

// Set your version in num and name
let VERSION = {
	num: "0.0.2",
	name: "MILESTONES!!!",
}

let changelog = `<h1>Changelog:</h1><br>
<h3>v0.0.2</h3><br>
		- Added 3 challenges and 4 milestones.<br>
<h3>v0.0.1.7.1</h3><br>
		- Fixed an inflation bug.<br>
<h3>v0.0.1.7</h3><br>
		- Added 3 upgrades and a challenge.<br>
<h3>v0.0.1.6</h3><br>
		- Added tons of upgrades and fixed some bugs.<br>
<h3>v0.0.1.5.1</h3><br>
		- Added Infinity and an upgrade.<br>
<h3>v0.0.1.5</h3><br>
		- Added 4 upgrades.<br>
<h3>v0.0.1.4</h3><br>
		- Added 3 upgrades.<br>
<h3>v0.0.1.3</h3><br>
		- Added 2 upgrades.<br>
		- Fixed some bugs.<br>
<h3>v0.0.1.2.2</h3><br>
		- Added an upgrade.<br>
<h3>v0.0.1.2.1</h3><br>
		- Added a few more upgrades.<br>
<h3>v0.0.1.2</h3><br>
		- Added 1 more upgrade.<br>
	<h3>v0.0.1.1.1</h3><br>
		- Added 1 more upgrade.<br>
		<h3>v0.0.1.1</h3><br>
		- Added another upgrade.<br>
		<h3>v0.0.1</h3><br>
		- Added a few upgrades.<br>
		<h3>v0.0</h3><br>
		- Added things.<br>
		- Added stuff.`

		

let winText = `Congratulations! You have reached the end and beaten this game, but for now...`

// If you add new functions anywhere inside of a layer, and those functions have an effect when called, add them here.
// (The ones here are examples, all official functions are already taken care of)
var doNotCallTheseFunctionsEveryTick = ["blowUpEverything"]

function getStartPoints(){
    return new Decimal(modInfo.initialStartPoints)
}

// Determines if it should show points/sec
function canGenPoints(){
	return true
}

// Calculate points/sec!
function getPointGen() {
	if(!canGenPoints())
		return new Decimal(0)
	let gain = new Decimal(1)
	if (hasUpgrade('p', 11)) gain = gain.times(2);
	if (hasUpgrade('p', 12)) gain = gain.times(upgradeEffect('p', 12));
	if (hasUpgrade('p', 13)) gain = gain.times(upgradeEffect('p', 13));
	if (hasUpgrade('p', 14)) gain = gain.pow(1.25);
	if (hasUpgrade('p', 21)) gain = gain.pow(1.05);
	if (hasUpgrade('i', 11)) gain = gain.times(upgradeEffect('i', 11));
	if (hasUpgrade('i', 12)) gain = gain.pow(upgradeEffect('i', 12));
	if (hasUpgrade('i', 13)) gain = gain.times(upgradeEffect('i', 13));
	if (hasUpgrade('i', 14)) gain = gain.times(upgradeEffect('i', 14));
	if (hasUpgrade('i', 15)) gain = gain.times(upgradeEffect('i', 15));
	if (hasUpgrade('i', 16)) gain = gain.times(upgradeEffect('i', 16));
	if (hasUpgrade('i', 21)) gain = gain.times(upgradeEffect('i', 21));
	if (hasUpgrade('i', 22)) gain = gain.times(upgradeEffect('i', 22));
	if (hasUpgrade('i', 23)) gain = gain.times(upgradeEffect('i', 23));
	if (hasUpgrade('i', 24)) gain = gain.times(upgradeEffect('i', 24));
	if (hasUpgrade('inf', 11)) gain = gain.times(upgradeEffect('inf', 11));
	if (hasUpgrade('inf', 12)) gain = gain.pow(upgradeEffect('inf', 12));
	if (hasUpgrade('inf', 13)) gain = gain.pow(upgradeEffect('inf', 13));
	if (hasUpgrade('inf', 14)) gain = gain.pow(upgradeEffect('inf', 14));
	if (hasUpgrade('inf', 15)) gain = gain.times(upgradeEffect('inf', 15));
	if (hasUpgrade('inf', 21)) gain = gain.times(upgradeEffect('inf', 21));
	if (hasUpgrade('inf', 22)) gain = gain.pow(upgradeEffect('inf', 22));
	if (hasUpgrade('inf', 23)) gain = gain.pow(upgradeEffect('inf', 23));
	if (hasUpgrade('inf', 24)) gain = gain.pow(upgradeEffect('inf', 24));
	if (inChallenge('inf', 11)) gain = gain.pow(0.5)
	if (hasChallenge('inf', 11)) gain = gain.pow(1.11)
	if (hasMilestone('inf', 0)) gain = gain.times(1e9)
	if (hasMilestone('inf', 1)) gain = gain.times(1e15)
	if (hasMilestone('inf', 2)) gain = gain.times(1e35)
	if (hasMilestone('inf', 3)) gain = gain.pow(1.1)
	if (inChallenge('inf', 12)) gain = gain.div(1e25)
	if (hasChallenge('inf', 12)) gain = gain.times(1e100)
	if (inChallenge('inf', 13)) gain = log2(gain)
	if (hasChallenge('inf', 13)) gain = gain.pow(1.09)
	return gain
}
	

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
}}

// Display extra things at the top of the page
var displayThings = [
]

// Determines when the game "ends"
function isEndgame() {
	return player.points.gte(new Decimal("1e750"))
}



// Less important things beyond this point!

// Style for the background, can be a function
var backgroundStyle = {

}

// You can change this if you have things that can be messed up by long tick lengths
function maxTickLength() {
	return(3600) // Default is 1 hour which is just arbitrarily large
}

// Use this if you need to undo inflation from an older version. If the version is older than the version that fixed the issue,
// you can cap their current resources with this.
function fixOldSave(oldVersion){
}