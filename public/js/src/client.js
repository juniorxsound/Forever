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

	//Init the geo watch
	getGeoPosition(false, 'location');

	//Get the map bounderies, only called once and then called by window resize
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

		analyseServerGeoData(geodata);

	});