(function() {
	var list;

	function getStores( latitude, longitude ) {
		var data = el.data( "Stores" ),
			query = new Everlive.Query();

		query.where().nearSphere( "Location",
			new Everlive.GeoPoint( longitude, latitude ) );

		data.get( query ).then( templateStores );
	};

	function templateStores( data ) {
		list.data( "kendoMobileListView" ).setDataSource(
			new kendo.data.DataSource({ data: data.result })
		);
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