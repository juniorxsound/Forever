
function initInterface(){

	$(document).ready(function(){

		assumeScale();

		if(!window.mobileAndTabletcheck()){

				if($('#info-bar').hasClass('landscape') === true){

					$('#info-bar').removeClass('landscape');

				}

				$('#info-bar').addClass('portrait');

		//Player hover effect
		$('#userIcon').mouseenter(function(){

			playerHover = true;

			$('#userIcon').css({opacity: 1});

			$('#userCount').fadeIn(250);

		});

		$('#userIcon').mouseleave(function(){

			playerHover = false;

			$('#userIcon').css({opacity: 0.5});

			$('#userCount').fadeOut(250);

		});

		//Scale hover effect
		$('#scaleIcon').mouseenter(function(){

			$('#scaleIcon').css({opacity: 1});

			$('#currentScale').fadeIn(250);

		});

		$('#scaleIcon').mouseleave(function(){

			$('#scaleIcon').css({opacity: 0.5});

			$('#currentScale').fadeOut(250);

		});

		} else {
			// $('#main-interface').hide();

			//Change the menu bar to landscape
				if($('#info-bar').hasClass('portrait') === true){

					$('#info-bar').removeClass('portrait');

				}

				$('#info-bar').addClass('landscape');

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