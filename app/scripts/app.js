(function() {

	function showAlert( message, title, callback ) {
		window.alert( message, callback || function () {}, title, "OK" );
	};
	function showError( message ) {
		showAlert( message, "Error occurred" );
	};
	window.addEventListener( "error", function ( e ) {
		e.preventDefault();
		var message = e.message + "' from " + e.filename + ":" + e.lineno;
		showAlert( message, "Error occurred" );
		return true;
	});

	window.app = {};
	document.addEventListener( "deviceready", function () {
		window.el = new Everlive({ apiKey: "eVKxNui85A6TopjR" });
		new kendo.mobile.Application( document.body, {
			layout: "tabstrip-layout",
			initial: "locations",
			skin: "flat"
		});
		feedback.initialize( "e8f59c50-c0de-11e3-a9b5-bbca8f4cc89b" );
		navigator.splashscreen.hide();
		analytics.Start();
	});
}());
