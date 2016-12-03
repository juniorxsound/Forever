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

 		console.log('Error, user type not defined you are not connected to the server');

 	}

}

function userCounter(print, count, div){

  console.log('There are currently ' + count + ' users connected');

  if( print === true ){

      users = count;

  		//Get the users paragraph and print the user to it
  		document.getElementById(div).innerHTML = count;

  }

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

	    document.getElementById('error').innerHTML = "Oops, Sorry but it seems your browser doesn't support Geo location, download Chrome?"

	}

}

function changeFreq(){

  var selector = random(0, pentatonicMin.length);

  freq = midiToFreq(pentatonicMin[selector]);

  osc.freq(freq);

}

function deg2rad(deg) {

   var rad = deg * Math.PI/180;

   return Math.tan(rad);

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

  //P5 ADDONS
  this.p5add = function(){
    if(p5Addons === true){
      p5Addons = false;
    } else {
      p5Addons = true;
    }
  }

    //Add fake users
  this.addUser = function(){
    
    socket.emit('addUser', 'makefakeuserplease');

  }

}

function initMap(){
    //Mapbox API token
    mapboxgl.accessToken = 'pk.eyJ1IjoianVuaW9yeHNvdW5kIiwiYSI6ImNpdnlyMG9hZjAyamwydHRhNGRqZ3BhZGQifQ.hIDvif6XFSretP-RSqBtHQ';

    //Create a new map object
    mapboxmap = new mapboxgl.Map({
      container: 'map', // container id
      style: 'mapbox://styles/juniorxsound/ciw3v1jb300292jr1pf3y40c5', //stylesheet location
      center: [-73.98, 40.74278],
      zoom: 11, // starting zoom
      zoomControl: false
    });

    //Setup event listeners and invterval to refetch the users
    mapboxmap.on('load', function () {
      window.setInterval(function() {
          mapboxmap.getSource('drone').setData(mapboxusers);
      }, 2000);

      //Add the users layer to the map
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

function initOscilator(){

    pentaFreq = [];

    for(var i = 0; i < pentatonicMin.length; i++){

      pentaFreq.push(midiToFreq(pentatonicMin[i]));
      
    }

    var attackLevel = 1.0;
    var releaseLevel = 0;

    var attackTime = 3.0;
    var decayTime = 0.5;
    var susPercent = 0.2;
    var releaseTime = 5.0;

    reverb = new p5.Reverb();
    reverb.set(3, 500, true);

    env = new p5.Env();

    env.disconnect(); // so we'll only hear reverb...

    // connect soundFile to reverb, process w/
    // 3 second reverbTime, decayRate of 2%
    reverb.process(env, 4, 5);

    // env.connect(reverb);

    env.setADSR(attackTime, decayTime, susPercent, releaseTime);
    env.setRange(attackLevel, releaseLevel);

    osc = new p5.Oscillator('sine');
    osc.amp(env);
    // osc.connect(reverb);
    osc.start();

}

function hitNote(){

    //Iterate over all the users pixel position to determine note height
    for(var i = 0; i < canvasLocations.length; i++){

      var xy = canvasLocations[i];

      //Only console log the Y position of the current note
      if(parseInt(transportLine) == parseInt(xy[0])){

      if(xy[1] > 0 && xy[1] < height/5){
        console.log('1st Area');

        var frequenci = pentaFreq[random(12, 14)];


      } else if (xy[1] > height/5 && xy[1] < (height/5)*2){
        console.log('2nd Area');

        var frequenci = pentaFreq[random(9, 11)];

      } else if (xy[1] > (height/5)*2 && xy[1] < (height/5)*3){
        console.log('3rd Area');

        var frequenci = pentaFreq[random(6, 8)];


      } else if (xy[1] > (height/5)*3 && xy[1] < (height/5)*4){
        console.log('4th Area');

        var frequenci = pentaFreq[random(3, 5)];


      } else if (xy[1] > (height/5)*4 && xy[1] < height){
        console.log('5th Area');

        var frequenci = pentaFreq[random(0, 2)];


      } else {
        console.log('You are currently not in the map, sorry');
      }

        // console.log(Math.round(xy[1]));

      }

    }

    osc.freq(frequenci, 0.1);

    env.play();

    console.log('The note ' + pentatonicMin[selector] + ' was played');

}