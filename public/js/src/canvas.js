/*
      ___          ___          ___          ___         ___          ___          ___     
     /\  \        /\  \        /\  \        /\  \       /\__\        /\  \        /\  \    
    /::\  \      /::\  \      /::\  \      /::\  \     /:/  /       /::\  \      /::\  \   
   /:/\:\  \    /:/\:\  \    /:/\:\  \    /:/\:\  \   /:/  /       /:/\:\  \    /:/\:\  \  
  /::\~\:\  \  /:/  \:\  \  /::\~\:\  \  /::\~\:\  \ /:/__/  ___  /::\~\:\  \  /::\~\:\  \ 
 /:/\:\ \:\__\/:/__/ \:\__\/:/\:\ \:\__\/:/\:\ \:\__\|:|  | /\__\/:/\:\ \:\__\/:/\:\ \:\__\
 \/__\:\ \/__/\:\  \ /:/  /\/_|::\/:/  /\:\~\:\ \/__/|:|  |/:/  /\:\~\:\ \/__/\/_|::\/:/  /
      \:\__\   \:\  /:/  /    |:|::/  /  \:\ \:\__\  |:|__/:/  /  \:\ \:\__\     |:|::/  / 
       \/__/    \:\/:/  /     |:|\/__/    \:\ \/__/   \::::/__/    \:\ \/__/     |:|\/__/  
                 \::/  /      |:|  |       \:\__\      ~~~~         \:\__\       |:|  |    
                  \/__/        \|__|        \/__/                    \/__/        \|__|    
Forever - Algorithmic Composition - Client side p5 canvas lib
Wrriten by juniorxsound (http://phenomenalabs.com)
*/

//Setup the canvas
function preload(){};

function setup(){

		//Setting up a canvas
		createCanvas(window.innerWidth, window.innerHeight);

		//Build frequncey arrays for all scales
		buildScales();

		//Initialise the oscillators used
		initOscilator();

		//Set the relative bounds on init
		initStartEnd(0, width);

		console.log('p5 Canvas Initialised');

};

function draw(){

		//Yes it means clear
		clear();
		
		//Move, count and control the white cursor	
		cursorController();

		//Logic for drawing and controlling the users
		drawUsers();

		controlFilter();

};

//Draw users
function drawUsers(){

		//Iterate over the array that stores users pixel postions
		for(var i = 0; i < canvasLocations.length; i++){

			var locations = canvasLocations[i];

			//Draw a rect for each user
			noStroke();
			fill(255);
			ellipse(locations[0], locations[1], 10, 10);

			//If you hover over the user icon
			if(playerClick === true){
				fill(255,255,255, 25);
				ellipse(locations[0], locations[1], 50 + (sin(angle) * diameter/2) + diameter/2, 50 + (sin(angle) * diameter/2) + diameter/2);
				noFill();
				strokeWeight(2);
				stroke(255);
				ellipse(locations[0], locations[1], 18, 18);
				noStroke();
				fill(255);
				if(isOdd(i+1) == true){
					text(i + 1, locations[0] - 15, locations[1] - 15);
				} else {
					text(i + 1, locations[0] + 15, locations[1] - 15);
				}
			  
			}

			//If you hover over the scale icon
			if(scaleClick === true){
			  var colorMult = 200;
				for(var scaleSqr = 0; scaleSqr <= height; scaleSqr += height/5){
					colorMult -= 25;
					stroke(255,255,255,100);
					strokeWeight(1)
					fill(colorMult,colorMult,colorMult, 50);
					rect(0,scaleSqr - height/5, width, scaleSqr);
				}

			}

		}

	angle += 0.01;

	// console.log((sin(angle) * diameter/2) + diameter/2);
}

//Functionality for moving the transport line during playback
	function mouseMoved(){
		if(winMouseX <= transportLine + 50 && winMouseX >= transportLine - 50){

			dragCursor();
 
		} else {

	  		defaultCursor();

		}

	};

	function touchStarted(){

	//Clamp the selection area to 200px around the transport line
		if(touchX <= transportLine + 50 && touchX >= transportLine - 50){

			transportLine = transportLine;

		}

		// prevent default
		return false;

	};

	function touchMoved() {

		//Clamp the selection area to 200px around the transport line
		if(touchX <= transportLine + 50 && touchX >= transportLine - 50){

			transportLine = touchX;

		}

		  // prevent default
		  return false;

	};

	function touchEnded() {

	  transportLine = transportLine + guiParams.playSpeed;

	  // prevent default
	  return false;

	};

	//Resize Canvas to Fit the Screen
	window.onresize = function() {

	  var w = window.innerWidth;

	  var h = window.innerHeight

	  resizeCanvas(w,h);

	  //Get the new bounding box for the map
	  bBox = mapboxmap.getBounds();

	};
