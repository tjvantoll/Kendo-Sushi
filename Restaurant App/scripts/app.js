(function() {
    var el, app;

    function setupEvents() {
        $( "#rating" ).on( "change", function() {
            $( "#rating-output" ).text( this.value );
        }).trigger( "change" );
        
        $( "form" ).on( "submit", function( event ) {
            event.preventDefault();

            var data = {
                location: $( this.location ).val(),
                appetizer: $(this.appetizer ).val() == "yes",
                rating: $( this.rating ).val()
            };
            Everlive.$.data( "Ratings" ).create( data,
                function( data ){
                    $( "form" ).html( "<p>Thank you. Your survey was successfully processed.</p>" );
                    analytics.Monitor().TrackFeature( "Rating.Submitted" );
                },
                function(error){
                    alert( "Unfortunately an error occurred processing your survey. Please try again later." );
                }                         
            );
        });
    };
    
    document.addEventListener( "deviceready", function () {
        navigator.splashscreen.hide();
        new kendo.mobile.Application( document.body, {
            layout: "tabstrip-layout",
            skin: "flat",
            initial: "tabstrip-survey"
        });
        el = new Everlive({ apiKey: "eVKxNui85A6TopjR" });
        setupEvents();
        analytics.Start();
    });
}());

