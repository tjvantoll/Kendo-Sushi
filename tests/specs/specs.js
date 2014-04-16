spec(function() {

	var locationsCheck = [
		web.executeScript(
			"targetElement.classList.contains( 'km-view' )",
			{ id: "locations" },
			function( result ) {
				assert( result ).equals( true );
			}
		)
	];

	var stepRepository = {
		"Given the app is running": {
			ios: [
				ios.launch( "kendosushi://" ),
				ios.wait( 4000 )
			],
			android: [
				android.launch( "com.telerik.kendosushi" ),
				android.wait( 4000 )
			]
		},
		"Then the locations view should display" : {
			ios: locationsCheck,
			android: locationsCheck
		}
	};

	describe( "Restaurant App", function() {
		test( "Starting screen is locations", function() {
			step( "Given the app is running" );
			step( "Then the locations view should display" );
		});
	}, stepRepository );
});
