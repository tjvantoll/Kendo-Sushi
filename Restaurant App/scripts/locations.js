(function() {
	var locations = [];

	function getStores( latitude, longitude ) {
		var data = el.data( "Stores" ),
			query = new Everlive.Query();

		query.where().nearSphere( "Location",
			new Everlive.GeoPoint( longitude, latitude ) );

		data.get( query ).then( templateStores );
	};

	function templateStores( data ) {
		data.result.forEach(function( location ) {
			locations.push( location );
		});

		$( "#location-list" ).kendoMobileListView({
			dataSource: kendo.data.DataSource.create({
				data: locations
			}),
			template: kendo.template( $( "#location-template" ).html() )
		});
	};

	function load() {
		navigator.geolocation.getCurrentPosition(
			function( position ) {
				getStores( position.coords.latitude,
					position.coords.longitude );
			},
			function( error ) {
				// Default to locations near Manhattan
				getStores( 40.7, -73.9 );
			},
			{ timeout: 10000, maximumAge: 300000, enableHighAccuracy: true }
		);
	};

	app.locations = {
		load: load
	};
}());