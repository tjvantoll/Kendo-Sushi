(function() {
	var survey, modal;

	function sendFeedback() {
		var feedbackObj = {
			uid: "TJ VanToll",
			text: modal.find( "input" ).val()
		};
		modal.kendoMobileModalView( "close" );
		setTimeout(function() {
			feedback.postFeedback( feedbackObj, function ( result ) {
				navigator.notification.alert( "Thank you for your feedback",
				  $.noop, "Thanks!" );
			}, function ( error ) {
				navigator.notification.alert(
				  "Sorry, an error occurred sending your feedback." );
			});
		}, 1000 );
	};

	function setupEvents() {
		modal = $( "#feedback-modal" ).kendoMobileModalView({ width: 320 });
		$( "#feedback-cancel" ).on( "click", function() {
			modal.kendoMobileModalView( "close" );
		});
		$( "#feedback-submit" ).on( "click", function() {
			sendFeedback();
		});
		$( window ).on( "shake", function() {
			modal.kendoMobileModalView( "open" );
		});

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

	survey = kendo.observable({
		rating: 1,
		location: "North",
		locations: [ "North", "South", "East", "West" ],
		appetizer: null
	});
	window.app.models = {
		survey: survey
	};

	document.addEventListener( "deviceready", setupEvents );
}());