(function() {
	window.app = {};
	document.addEventListener( "deviceready", function () {
		window.el = new Everlive({ apiKey: "eVKxNui85A6TopjR" });
		new kendo.mobile.Application( document.body, {
			layout: "tabstrip-layout",
			skin: "flat"
		});
		navigator.splashscreen.hide();
	});
}());
