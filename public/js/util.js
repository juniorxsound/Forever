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
Forever - Algorithmic Composition - Client side Util lib
Wrriten by juniorxsound (http://phenomenalabs.com)
*/

function introduction(socket, who){

	if(who == 'player'){

 		socket.emit('introduction', 'player');

 		console.log('Hi Player, you are connected to the server');

 	} else if (who == 'conductor'){

 		socket.emit('introduction', 'conductor');

 		console.log('Hi Conductor, you are connected to the server');

 	} else {

 		console.log('Error, user type not defined');

 	}

}

function userCounter(count, div){

		//Get the users paragraph and print the user to it
		document.getElementById(div).innerHTML = count;

		console.log('There are currently ' + count + ' users connected');

}

function getGeoPosition(print, div){

	if (navigator.geolocation) {

	    navigator.geolocation.getCurrentPosition(function ( pos ) {

	    		socket.emit('geolocation', pos.coords.latitude + "," + pos.coords.longitude);

                if(print){

                	document.getElementById(div).innerHTML = 'Lat: ' + pos.coords.latitude + ' Long: ' + pos.coords.longitude;

                }
    	});

	} else {

	    document.getElementById('error').innerHTML = "Oops Sorry, your device doesn't support Geo position"

	}

}