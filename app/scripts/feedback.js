(function() {
	var modal;

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
		feedback.initialize( "e8f59c50-c0de-11e3-a9b5-bbca8f4cc89b" );
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
	};

	document.addEventListener( "deviceready", setupEvents );
}());