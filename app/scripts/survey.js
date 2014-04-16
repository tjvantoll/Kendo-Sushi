(function() {
	var survey = kendo.observable({
		rating: 1,
		location: "North",
		locations: [ "North", "South", "East", "West" ],
		appetizer: null
	});
	window.app.models = {
		survey: survey
	};

	function setupEvents() {
		$( ".submit" ).on( "click", function( event ) {
			event.preventDefault();

			var data = {
				location: survey.location.toLowerCase(),
				appetizer: survey.appetizer === true,
				rating: survey.rating
			};
			Everlive.$.data( "Ratings" ).create( data,
				function( data ) {
					$( "form" ).html( "<p>Thank you. Your survey was successfully processed.</p>" );
					analytics.Monitor().TrackFeature( "Rating.Submitted" );
				},
				function( error ){
					navigator.notification.alert(
					  "Unfortunately an error occurred processing your survey. Please try again later." );
				}
			);
		});
	};

	document.addEventListener( "deviceready", setupEvents );
}());