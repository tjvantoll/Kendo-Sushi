spec(function() {

	var surveyCheck = [
		web.executeScript(
			"targetElement.classList.contains( 'km-view' )",
			{ id: "survey" },
			function( result ) {
				assert( result ).equals( true );
			}
		)
	];

	var stepRepository = {
		"Given the app is running": {
			ios: [
				ios.launch( "restaurantapp://" ),
				ios.wait( 4000 )
			],
			android: [
				android.launch( "com.telerik.RestaurantApp" ),
				android.wait( 4000 )
			]
		},
		"Then the survey view should display" : {
			ios: surveyCheck,
			android: surveyCheck
		}
	};

	describe( "Restaurant App", function() {
		test( "Starting screen is survey", function() {
			step( "Given the app is running" );
			step( "Then the survey view should display" );
		});
	}, stepRepository );
});
