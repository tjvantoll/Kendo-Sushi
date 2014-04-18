spec(function() {

	var aboutCheck = [
		web.executeScript(
			"targetElement.classList.contains( 'km-view' )",
			{ id: "about" },
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
		"Then the about view should display" : {
			ios: aboutCheck,
			android: aboutCheck
		}
	};

	describe( "Restaurant App", function() {
		test( "Starting screen is about", function() {
			step( "Given the app is running" );
			step( "Then the about view should display" );
		});
	}, stepRepository );
});
