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

		// DatGui Stuff
		window.onload = function(){

		  guiParams = new initGuiParams();

		  var gui = new dat.GUI();

		  gui.add(guiParams, 'p5add');

		  gui.add(guiParams, 'addUser');

		  var mapping = gui.addFolder('Mapping');

		  mapping.add(guiParams, 'Xscaler', 500, 2000);

		  mapping.add(guiParams, 'Yscaler', 500, 2000);

		  var playback = gui.addFolder('Playback');

		  playback.add(guiParams, 'playSpeed', 0, 10);

		}
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

	});



	function preload(){};

	function setup(){

		//Setting up a canvas
		createCanvas(windowWidth, windowHeight);

		initOscilator();

	};



	function draw(){
		clear();

		//Don't start before the server sends off gps data
		if(start == true){
			//Transport courser increment
			transportLine = transportLine + guiParams.playSpeed;
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

			//DatGui control for addons
			if(p5Addons === true){

				//Draw a rect for each user
				rect(locations[0], locations[1], 5, 5);

			}

			//If the courser reaches a user trigger the synth
			if(parseInt(transportLine) == Math.floor(locations[0])){

				//Make sure to change the frequncy
				changeNote();
				
				//"Oops I did it again..."
				hitNote();

			}

		}

	};

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