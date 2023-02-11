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
	num: "0.0.1.2.1",
	name: "More and More Prestige!",
}

let changelog = `<h1>Changelog:</h1><br>
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
	if (hasUpgrade('p', 21)) gain = gain.pow(1.3);
	if (hasUpgrade('i', 11)) gain = gain.times(upgradeEffect('p', 11));
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
	return player.points.gte(new Decimal("1e75"))
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