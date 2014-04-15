(function() {
	var list,
		userLatitude,
		userLongitude;

	// Haversine formula: http://en.wikipedia.org/wiki/Haversine_formula
	// JavaScript algorithm from http://www.movable-type.co.uk/scripts/latlong.html.
	function getDistanceFromLatLonInMi(lat1,lon1,lat2,lon2) {
		var R = 6371; // Radius of the earth in km
		var dLat = deg2rad(lat2-lat1);  // deg2rad below
		var dLon = deg2rad(lon2-lon1); 
		var a = 
			Math.sin(dLat/2) * Math.sin(dLat/2) +
			Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
			Math.sin(dLon/2) * Math.sin(dLon/2);
		var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
		var d = R * c; // Distance in km
		return d * 0.62137; // Distance in mi
	};
	function deg2rad(deg) {
		return deg * (Math.PI/180)
	}

	function getStores( latitude, longitude ) {
		var data = el.data( "Stores" ),
			query = new Everlive.Query();

		query.where().nearSphere( "Location",
			new Everlive.GeoPoint( longitude, latitude ) );

		data.get( query ).then( templateStores );
	};

	function templateStores( data ) {
		if ( userLatitude ) {
			data.result.forEach(function( location ) {
				location.Distance = getDistanceFromLatLonInMi(
					userLatitude,
					userLongitude,
					location.Location.latitude,
					location.Location.longitude
				);
			});
		}
		list.data( "kendoMobileListView" ).setDataSource(
			new kendo.data.DataSource({ data: data.result })
		);
	};

	function load() {
		navigator.geolocation.getCurrentPosition(
			function( position ) {
				userLatitude = position.coords.latitude;
				userLongitude = position.coords.longitude;
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

	function init() {
		list = $( "#location-list" ).kendoMobileListView({
			template: kendo.template( $( "#location-template" ).html() )
		});
	};

	app.locations = {
		load: load,
		init: init
	};
}());