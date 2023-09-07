let modInfo = {
	name: "Create STARS",
	id: "cs",
	author: "me",
	pointsName: "stardust",
	modFiles: ["layers.js", "tree.js"],

	discordName: "",
	discordLink: "https://discord.gg/ySEkYU7eku",
	initialStartPoints: new Decimal (10), // Used for hard resets and new players
	offlineLimit: 100000000000,  // In hours
}

// Set your version in num and name
let VERSION = {
	num: "0.1.3",
	name: "Dilation CUBED!!??!",
}

let changelog = `<h1>Changelog:</h1><br>
<h3>v0.1.3</h3><br>
		- Added more upgrades, 3 challenges and fixed balancing issues.<br>
		- Bumped Endgame to ~5000 RG.<br>
		- Note: game is finished!
<h3>v0.1.2</h3><br>
		- Added REALITY!!!<br>
		- Bumped Endgame to ~500 RG.<br>
<h3>v0.1.1</h3><br>
		- Added 6 more ECs and 5 milestones.<br>
<h3>v0.1</h3><br>
		- Added 6 ECs.<br>
<h3>v0.0.4</h3><br>
		- Added tons of upgrades.<br>
<h3>v0.0.3</h3><br>
		- Added Eternity, 3 challenges and an upgrade.<br>
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
		if(hasUpgrade('s', 11)) gain = gain.times(2);
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
	return player.s.points.gte(new Decimal("12000"))
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