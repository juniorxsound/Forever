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

//Global Variables
var socket, users, id, userGeoPosition, serverGeo;

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

    users = count;

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

function changeFreq(){

  var selector = random(0, pentatonicMin.length);

  freq = midiToFreq(pentatonicMin[selector]);

  osc.freq(freq);

}

function deg2rad(deg) {
   var rad = deg * Math.PI/180;
   return Math.tan(rad)
}

function mercator(lat) {

  return Math.log(Math.tan(Math.PI / 4 + lat / 2));

} 

function initGuiParams() {

  //Mapping

  this.Xscaler = 1000;
  this.Yscaler = 1000;

  //Playback

  this.playSpeed = 0.5;

};

function playNote(){



            //Trigger an oscilator hit and stop
            env.play();

            osc.amp(env, 0.05);


              //Set the oscilator note off
              setTimeout(function(){

                osc.amp(0, 0.05);

              }, 1000);

      console.log('Note with the frequncey ' + freq + ' Hz played');

}

function initMap(){

    mapboxgl.accessToken = 'pk.eyJ1IjoianVuaW9yeHNvdW5kIiwiYSI6ImNpdnlyMG9hZjAyamwydHRhNGRqZ3BhZGQifQ.hIDvif6XFSretP-RSqBtHQ';

    mapboxmap = new mapboxgl.Map({
      container: 'map', // container id
      style: 'mapbox://styles/juniorxsound/ciw3v1jb300292jr1pf3y40c5', //stylesheet location
      center: [-73.98, 40.74278],
      zoom: 11, // starting zoom
      zoomControl: false
    });

    mapboxmap.on('load', function () {
      window.setInterval(function() {
          mapboxmap.getSource('drone').setData(mapboxusers);
      }, 2000);

      mapboxmap.addSource('drone', { type: 'geojson', data: mapboxusers });
      mapboxmap.addLayer({
          "id": "drone",
          "type": "symbol",
          "source": "drone",
          "layout": {
              "icon-image": "rocket-15"
          }
      });
  });

}