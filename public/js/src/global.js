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
var SQRosc;
var transportLine = 0;
var cycleCounter = 0;
var start = false;
var frequency;

var diameter = 20;
var angle = 0;

var playerHover = false;
var scaleHover = false;

var env;

var freq;
var mapboxmap;
var mapboxusers = {
	"type": "FeatureCollection",
	"features": []
};
var guiParams;
var bBox;

//Musical Scales
var currentScale;
var pentatonicMin = [70, 73, 75, 77, 79, 80, 83, 85, 87, 89, 90, 93, 95, 97, 99];
var pentaFreq;







