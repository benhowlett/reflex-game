//Variables for timing the delay between spawn and click
var spawnTime; var clickDelay;

// Variables for moving the box around the gameField
var xpos; var ypos;
var fieldWidth = document.getElementById("gameField").clientWidth;

//Arrays for randomly changing the shape and colour of the box
var shapes = ["0%", "50%"];
//var colours = ["#AF8D57", "#3D7B5C", "#AF6C57", "#3E5673"]

//Highscore holder
var bestTime = 0;

//timeout ID variable
var timer;

//Make gameField "flash" when the shape is clicked
function flash() {
	//Get gameField and box background colours
	var gameFieldColour = document.getElementById("gameField").style.backgroundColor;
	var boxColour = document.getElementById("box").style.backgroundColor;

	//Swap gameField and box background colours
	document.getElementById("gameField").style.backgroundColor = boxColour;
	document.getElementById("box").style.backgroundColor = gameFieldColour;

	//Wait 0.075 seconds and switch the background colours back to their original values.
	setTimeout(function() {

			document.getElementById("gameField").style.backgroundColor = gameFieldColour;
			document.getElementById("box").style.backgroundColor = boxColour;
		}, 75);

}

//Random colour generator
function randomColor() {
	var letters = "0123456789ABCDEF".split("");
	var color = "#";
	for (var i = 0; i < 6; i++) {
		color += letters[Math.floor(Math.random()*16)];
	}
	return color;
}

//Main game logic
document.getElementById("startButton").onclick = function() {

	//Function to make the box visible
	function showBox () {

		//timeout to randomize when the box appears (1s-5s)
		timer = setTimeout(function() {

			//Calculate random distance to move along x-axis
			xpos = (Math.floor(Math.random()*90)/100)*fieldWidth;
			document.getElementById("box").style.left = xpos + "px";

			//Calculate random distance to move along y-axis
			ypos = (Math.floor(Math.random()*90)/100)*fieldWidth;
			document.getElementById("box").style.top = ypos + "px";

			//Randomly make the box a circle
			document.getElementById("box").style.borderRadius = shapes[Math.floor(Math.random()*2)] 

			//Randomly change the colour of the box
			document.getElementById("box").style.backgroundColor = randomColor();

			//This actually makes it visible
			document.getElementById("box").style.display="block";

			//Mark the spawn time
			spawnTime = Date.now();

		}, Math.random()*5000);
		
	}

	//Show the box initially
	showBox();

	//Function to make the box disappear when clicked and to calculate click delay
	document.getElementById("box").onclick = function () {
		
		//Call my fancy flash function (purely aesthetic)
		flash();

		//Make the box disappear
		this.style.display='none';

		//Calculate click delay in seconds (0.01s accuracy)		
		clickDelay = Math.floor((Date.now() - spawnTime) / 10) / 100;

		//Record high score
		if (bestTime == 0) {
			bestTime = clickDelay;
		} else if (clickDelay < bestTime) {
			bestTime = clickDelay;
		}
		
		//Update result span
		document.getElementById("result").innerHTML = clickDelay;

		//Update highScoreResult span
		document.getElementById("highScoreResult").innerHTML = bestTime;
		
		//Rinse and repeat
		showBox();
	}
	
	//Stop the game
	document.getElementById("endButton").onclick = function() {

		clearTimeout(timer);

		document.getElementById("box").style.display = "none";

	}

	
}

//Reset scores
document.getElementById("resetButton").onclick	= function() {

	document.getElementById("result").innerHTML = "0.00";
	document.getElementById("highScoreResult").innerHTML = "0.00";

}