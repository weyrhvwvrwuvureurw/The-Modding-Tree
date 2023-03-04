let modInfo = {
	name: "The Small Tree",
	id: "tstr",
	author: "me",
	pointsName: "points",
	modFiles: ["layers.js", "tree.js"],

	discordName: "",
	discordLink: "https://discord.gg/ySEkYU7eku",
	initialStartPoints: new Decimal (1), // Used for hard resets and new players
	offlineLimit: 100000000000,  // In hours
}

// Set your version in num and name
let VERSION = {
	num: "0.007",
	name: "Noice.",
}

let changelog = `<h1>Changelog:</h1><br>
<h3>v0.007</h3><br>
		- Added Time and Space.<br>
<h3>v0.006</h3><br>
		- Added 3 milestones and 2 upgrades on each layer.<br>
<h3>v0.005</h3><br>
		- Added 2 layers.<br>
<h3>v0.004</h3><br>
		- Added 3 more upgrades and a milestone.<br>
<h3>v0.003</h3><br>
		- Added tons of stuff.<br>
<h3>v0.002</h3><br>
		- Added 4 more upgrades.<br>
		- Added a challenge and a milestone.<br>
<h3>v0.001</h3><br>
		- Added 4 upgrades.<br>
		- Added a challenge.`

		

let winText = `Congratulations! You have reached the end and beaten this game, but only for now...`

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
	let gain = new Decimal(0.001)
	if (hasUpgrade('s', 13)) gain = gain.times(2);
	if (hasUpgrade('s', 14)) gain = gain.times(upgradeEffect('s', 14));
	if (inChallenge('s', 11)) gain = gain.times(Decimal.pow(0.3, challengeCompletions('s', 11)));
	if (inChallenge('s', 12)) gain = gain.times(Decimal.pow(0.1, challengeCompletions('s', 12)));
	if (hasChallenge('s', 12)) gain = gain.times(Decimal.pow(1.1, challengeCompletions('s', 12)));
	if (hasUpgrade('s', 16)) gain = gain.times(upgradeEffect('s', 16));
	if (hasUpgrade('s', 21)) gain = gain.times(5);
	if (hasMilestone('s', 1)) gain = gain.times(3);
	if (hasUpgrade('s', 22)) gain = gain.times(upgradeEffect('s', 22));
	if (hasUpgrade('p', 11)) gain = gain.times(upgradeEffect('p', 11));
    gain = gain.times(tmp.b.effect);
	if (hasMilestone('b', 2)) gain = gain.times(1e7);
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
	return player.t.points.gte(new Decimal("1"))
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