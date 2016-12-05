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
Forever - Algorithmic Composition - Client side app
Wrriten by juniorxsound (http://phenomenalabs.com)
*/
	// Init debugging dat.GUI
	initGui();

	// Init graphical interface
	initInterface();

	// Mapbox Setup
	initMap();

	bBox = mapboxmap.getBounds();

	//Decale a new socket connection
	socket = io();

	//Once your connected log it
 	socket.on('connect', function(){

 		introduction(socket, 'player');

  	});

	//Wait for a new user from the server save it to a local server
	socket.on('user', function(count){

		userCounter(false, count, 'usr');

		assumeUsers();

	});

	//When the server sends everybody's data back
	socket.on('serverGeoData', function(geodata){

		//Clean the array anytime the server sends over data
		canvasLocations = [];

		mapboxusers.features = [];

		//Assign this data globally
		serverGeo = geodata;

		//Dont start the transport before data has arrived and wait a little just to be safe
		if(serverGeo != 0 && start === false){

			setTimeout(function(){

				start = true;

			}, 2000);

		}

		//Iterate over the amount of clients and map the values to canvas
		for(var i = 0; i < Object.keys(geodata).length; i++){

			var latlong = serverGeo[Object.keys(serverGeo)[i]];

			//Map the boundbox LatLong to pixel space
			var mappedY = map(latlong[0], bBox._sw.lat, 
bBox._ne.lat, height, 0);
			var mappedX = map(latlong[1], bBox._sw.lng, bBox._ne.lng, 0, width);
			
			//Store user pixel location for p5
			canvasLocations.push([mappedX, mappedY]);

			//Store user location for MapBox
			var userGeoJson = {
				"type": "Feature",
				"geometry": {
			        "type": "Point",
			        "coordinates": [latlong[1], latlong[0]]
      			}
			}

			//Add mapbox users
			mapboxusers.features.push(userGeoJson);

		}
		if (start != true){
			changeNote();
		}

	});

	var diameter = 20;
	var angle = 0;

	function preload(){};

	function setup(){

		//Setting up a canvas
		createCanvas(window.innerWidth, window.innerHeight);

		initOscilator();

	};



	function draw(){
		//Yes it means clear
		clear();
		
		//Don't start before the server sends off gps data
		if(start == true){
			//Transport courser increment
			transportLine = transportLine + guiParams.playSpeed;
		}

		// fade the main output in only once to avoid oscilator errors on init
		if(transportLine == 101 && cycleCounter == 0){

			masterVolume(1.0, 1, 1);

		}


		//Courser
		stroke(255, 255, 255);
		line(transportLine, height, transportLine, 0);

		//Make it repeat and count cycles
		if(parseInt(transportLine) == width){

			transportLine = 0;

			cycleCounter++;

		}

		//Iterate over the array that stores users pixel postions
		for(var i = 0; i < canvasLocations.length; i++){

			var locations = canvasLocations[i];

			//Draw a rect for each user
			noStroke();
			fill(255);
			ellipse(locations[0], locations[1], 10, 10);

			if(playerHover === true){
				fill(255,255,255, 100);
				ellipse(locations[0], locations[1], 20 + (sin(angle) * diameter/2) + diameter/2, 20 + (sin(angle) * diameter/2) + diameter/2);
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
			  angle += 0.02;
			}

			//If the courser reaches a user trigger the synth
			if(round(transportLine) == round(locations[0])){

				//Make sure to change the frequncy
				changeNote();
				
				//"Oops I did it again..."
				hitNote();

			}

		}


	};

	//Functionality for moving the transport line during playback
	function mouseMoved(){
		if(winMouseX <= transportLine + 100 && winMouseX >= transportLine - 100){

			dragCursor();
 
		} else {

	  		defaultCursor();

		}

	}

	function touchStarted(){

	//Clamp the selection area to 200px around the transport line
		if(touchX <= transportLine + 100 && touchX >= transportLine - 100){

			transportLine = transportLine;

		}

		// prevent default
		return false;

	}

	function touchMoved() {

		//Clamp the selection area to 200px around the transport line
		if(touchX <= transportLine + 100 && touchX >= transportLine - 100){

			transportLine = touchX;

		}

		  // prevent default
		  return false;

	}

	function touchEnded() {

	  transportLine = transportLine + guiParams.playSpeed;

	  // prevent default
	  return false;

	}

	//Resize Canvas to Fit the Screen
	window.onresize = function() {

	  var w = window.innerWidth;

	  var h = window.innerHeight

	  resizeCanvas(w,h);

	  //Get the new bounding box for the map
	  bBox = mapboxmap.getBounds();

	}

	//Never give up pushing the data!
  	setInterval(function(){

  		//1st Argument is wheter to appand the value to the DOM second is the div
	  	var geodata = getGeoPosition(false, 'location');

  	}, 1000);