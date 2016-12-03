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
Forever - Algorithmic Composition - Global Variables
Wrriten by juniorxsound (http://phenomenalabs.com)
*/

//Global Variables
var socket;
var users; 
var id; 
var userGeoPosition; 
var serverGeo;
var selector;
var canvasLocations = [];
var locations;
var osc = {};
var transportLine = 0;
var cycleCounter = 0;
var start = false;
var frequency;
var pentaFreq;
var env;
var pentatonicMin = [50, 53, 55, 57, 59, 60, 63, 65, 67, 69, 70, 73, 75, 77, 79];
var freq;
var reverb;
var mapboxmap;
var mapboxusers = {
	"type": "FeatureCollection",
	"features": []
};
var guiParams;
var bBox;
var p5Addons = false;








