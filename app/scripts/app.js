(function() {
	window.app = {};
	window.el = new Everlive({ apiKey: "eVKxNui85A6TopjR" });
	document.addEventListener( "deviceready", function () {
		new kendo.mobile.Application( document.body, {
			layout: "tabstrip-layout",
			skin: "flat"
		});
		navigator.splashscreen.hide();
	});
}());
