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
Forever - Algorithmic Composition - Client side UI lib
Wrriten by juniorxsound (http://phenomenalabs.com)
*/

//Function for fading in & out the sound on tab focus and blur
window.onblur = function(){

	masterVolume(0, 0.5);

};

window.onfocus = function(){

	masterVolume(1.0, 0.5);

};

function initInterface(){

	$(document).ready(function(){

		assumeScale();

		//It's a desktop
		if(!window.mobileAndTabletcheck()){

			system = 'desktop';

				$('#info-bar').addClass('portrait');

		//Player hover&click effect
		$('#userIcon').click(function(){

			if(playerClick === false){

				playerClick = true;

				$('#userIcon').css({opacity: 1});

			} else {

				playerClick = false;

				$('#userIcon').css({opacity: 0.5});

			}

		});

		$('#userIcon').mouseenter(function(){

			$('#userCount').fadeIn(250);

			defaultCursor();

		});

		$('#userIcon').mouseleave(function(){

			$('#userCount').fadeOut(250);

		});

		//Scale hover effect
		$('#scaleIcon').click(function(){

			if(scaleClick === false){

				scaleClick = true;

				$('#scaleIcon').css({opacity: 1});

			} else {

				scaleClick = false;

				$('#scaleIcon').css({opacity: 0.5});

			}

		});

		$('#scaleIcon').mouseenter(function(){			

				$('#currentScale').fadeIn(250);

				defaultCursor();

		});

		$('#scaleIcon').mouseleave(function(){

			$('#currentScale').fadeOut(250);

		});
		//It's a mobile
		} else {
			// $('#main-interface').hide();
			system = 'mobile';

			//Change the menu bar to landscape

					$('#info-bar').addClass('portrait');

		}
	});

}

function assumeScale(){

	if(currentScale == pentaFreq){

		// console.log('pentatonic C');
		$('#currentScale').html("The current scale is Pentatonic C");

	}
	//Add other conditionals for other scales
}

function assumeUsers(){
	if(users == 1){
		$('#userCount').html("You are all alone, invite some friends");
	} else if(users > 1){
		$('#userCount').html("There are currently " + users + " players connected");
	}
}