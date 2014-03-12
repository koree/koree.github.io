var myLat = 0;
var myLng = 0;
var lineData = null;

function initialize() {
		var myOptions = {

			center: new google.maps.LatLng(0,0),
			zoom: 11 };
		// "..." is stuff you have to fill in

		
	
		var map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
		getMyLocation();
		parse();
	}
	//google.map.event.addDomListen(window,'load', initialize);
function getMyLocation() 
			{
				if (navigator.geolocation) { // the navigator.geolocation object is supported on your browser
					navigator.geolocation.getCurrentPosition(function(position) {
						myLat = position.coords.latitude;
						myLng = position.coords.longitude;
						renderMap();
					});
				}
				else {
					alert("Geolocation is not supported by your web browser.  What a shame!");
				}
			}

function rendermap() {
me = new google.maps.LatLng(myLat, myLng)
map.setCenter(me,12)
zoom:11 	
}

function parse() {

	request = new XMLHttpRequest();
	request.open("get", "http://mbtamap.herokuapp.com/mapper/rodeo.json", true);
	request.onreadystatechange = dataReady;
	request.send(null);
}

	lineData = JSON.parse(reqest.responseText)
