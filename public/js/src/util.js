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

  users = count;

  	//Get the users paragraph and print the user to it
  	document.getElementById("userCount").innerHTML = count;


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

}

function initGui(){
      // DatGui Stuff
    window.onload = function(){

      masterVolume(0);

      guiParams = new initGuiParams();

      var gui = new dat.GUI();

      var mapping = gui.addFolder('Mapping');

      mapping.add(guiParams, 'Xscaler', 500, 2000);

      mapping.add(guiParams, 'Yscaler', 500, 2000);

      var playback = gui.addFolder('Playback');

      playback.add(guiParams, 'playSpeed', 0, 10);

      dat.GUI.toggleHide();

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

      //Instead of using the mapbox API to draw the users I amp these locations with p5.js and draw the users in the draw function
      // mapboxmap.addLayer({
      //     "id": "drone",
      //     "type": "symbol",
      //     "source": "drone",
      //     "layout": {
      //         "icon-image": "rocket-15"
      //     }
      // });
  });

}

function initOscilator(){

    pentaFreq = [];

    for(var i = 0; i < pentatonicMin.length; i++){

      pentaFreq.push(midiToFreq(pentatonicMin[i]));
      
    }

    //Reverbs
    var reverb1 = new p5.Reverb();
    var reverb2 = new p5.Reverb();

    //Delays
    var delay1 = new p5.Delay();
    delay1.setType("pingPong");
    var delay2 = new p5.Delay();
    delay2.setType("pingpong");

    //Envelope
    env1 = new p5.Env(0.1, 0.2, 0.2, 0.1);
    env1.setRange(0.6, 0);

    env2 = new p5.Env(0.1, 0.2, 0.2, 0.1);
    env2.setRange(1.0, 0);

    //Oscilator
    SQRosc = new p5.Oscillator('square');

    SNosc = new p5.Oscillator('sine');

    DRONEosc = new p5.Oscillator('sawtooth');

    muteOscilators();

    //Processing chains and parameters
    reverb1.process(SQRosc, 5, 7, true);
    // delay1.process(reverb1, 0.12, 0.3, 1500);

    reverb2.process(SNosc, 5, 7);
    // delay2.process(reverb2, 0.12, 0.5, 1500, true);

    //Init

    SQRosc.start();

    SNosc.start();

    // DRONEosc.start();

}

function changeNote(){

    muteOscilators();

    var frequenci = 0;

    currentScale = pentaFreq;

    //Everytime a new user batch comes in assume the current scale
    assumeScale();

    //Iterate over all the users pixel position to determine note height
    for(var z = 0; z < canvasLocations.length; z++){

      var xy = canvasLocations[z];

      //Only console log the Y position of the current note
      if(parseInt(transportLine) == parseInt(xy[0])){

          if(xy[1] > 0 && xy[1] < height/5){
            console.log('1st Area');

            frequenci = pentaFreq[round(random(12, 14))];

            SQRosc.freq(frequenci, 0.01);
            SNosc.freq(frequenci, 0.01);


          } else if (xy[1] > height/5 && xy[1] < (height/5)*2){
            console.log('2nd Area');

            frequenci = pentaFreq[round(random(9, 11))];

            SQRosc.freq(frequenci, 0.01);
            SNosc.freq(frequenci, 0.01);

          } else if (xy[1] > (height/5)*2 && xy[1] < (height/5)*3){
            console.log('3rd Area');

            frequenci = pentaFreq[round(random(6, 8))];

            SQRosc.freq(frequenci, 0.01);
            SNosc.freq(frequenci, 0.01);


          } else if (xy[1] > (height/5)*3 && xy[1] < (height/5)*4){
            console.log('4th Area');

            frequenci = pentaFreq[round(random(3, 5))];

            SQRosc.freq(frequenci, 0.01);
            SNosc.freq(frequenci, 0.01);


          } else if (xy[1] > (height/5)*4 && xy[1] < height){
            console.log('5th Area');

            frequenci = pentaFreq[round(random(0, 2))];

            SQRosc.freq(frequenci, 0.01);
            SNosc.freq(frequenci, 0.01);


          } else {
            console.log('You are currently not in the map, sorry');
          }

            // console.log(Math.round(xy[1]));

      }

    }

}

function hitNote(){

  env1.play(SQRosc);
  env2.play(SNosc);

}

function muteOscilators(){
      SQRosc.amp(0);
      SNosc.amp(0);
}

function isOdd(num) { 
  return num % 2;
}

window.mobileAndTabletcheck = function() {
  var check = false;
  (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
  return check;
};

function defaultCursor() {
document.body.style.cursor = 'default';
}
function dragCursor(){
document.body.style.cursor = 'col-resize';
}