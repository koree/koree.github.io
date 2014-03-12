function initialize() {
	var myLat = 0;
			var myLng = 0;
			var request = new XMLHttpRequest();
			var me = new google.maps.LatLng(myLat, myLng);
	getMyLocation();
	navigator.geolocation.getCurrentPosition(function(position) {
			myLat = position.coords.latitude;
			myLng = position.coords.longitude;
		var myOptions = {

			center: new google.maps.LatLng(myLat,myLng),
			zoom: 11 };
		// "..." is stuff you have to fill in

		
	
		var map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
	}
	//google.map.event.addDomListen(window,'load', initialize);
function getMyLocation()
			{
	if (navigator.geolocation) { // the navigator.geolocation object is supported on your browser
		navigator.geolocation.getCurrentPosition(function(position) {
			myLat = position.coords.latitude;
			myLng = position.coords.longitude;
			//initialize();
					});
				}
				else {
					alert("Geolocation is not supported by your web browser.  What a shame!");
				}
			}