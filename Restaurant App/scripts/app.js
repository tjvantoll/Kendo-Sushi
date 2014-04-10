(function() {
	var el, survey;

	function setupEvents() {
		$( ".submit" ).on( "click", function( event ) {
			event.preventDefault();

			var data = {
				location: survey.location.toLowerCase(),
				appetizer: survey.appetizer === true,
				rating: survey.rating
			};
			Everlive.$.data( "Ratings" ).create( data,
				function( data ){
					$( "form" ).html( "<p>Thank you. Your survey was successfully processed.</p>" );
					analytics.Monitor().TrackFeature( "Rating.Submitted" );
				},
				function(error){
					alert( "Unfortunately an error occurred processing your survey. Please try again later." );
				}                         
			);
		});
	};

	survey = kendo.observable({
		rating: 1,
		location: "North",
		locations: [ "North", "South", "East", "West" ],
		appetizer: null
	});
	new kendo.mobile.Application( document.body, {
		layout: "tabstrip-layout",
		initial: "survey"
	});
	window.app = {};
	window.app.models = {
		survey: survey
	};
	el = new Everlive({ apiKey: "eVKxNui85A6TopjR" });
	
	document.addEventListener( "deviceready", function () {
		navigator.splashscreen.hide();
		setupEvents();
		analytics.Start();
	});
}());
