var myLat = 0;
var myLng = 0;
/*var lineData = null;
var me = new google.maps.LatLng(myLat, myLng)
var map;

var marker;
var	places;// "..." is stuff you have to fill in
*/
var map;
var request;
var myOptions = {

			center: new google.maps.LatLng(myLat, myLng),
			zoom: 11 
			//mapTypeId: google.maps.MapTypeId.ROADMAP
		};
function initialize() {
		
		map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
		getMyLocation();
//		parse();
	}

function getMyLocation() {
				console.log ('hi');
				if (navigator.geolocation) { // the navigator.geolocation object is supported on your browser
					navigator.geolocation.getCurrentPosition(function(position) {
						myLat = position.coords.latitude;
						myLng = position.coords.longitude;
						console.log ('nope');
						console.log(myLat, myLng);
						

						renderMap();
						
					});
					
				}
				else {
					alert("Geolocation is not supported by your web browser.  What a shame!");
				}
			}

function renderMap() {
 me = new google.maps.LatLng(myLat, myLng);
 	map.setCenter(me,12);



}

function parse() {

	request = new XMLHttpRequest();
	request.open("get", "http://mbtamap.herokuapp.com/mapper/rodeo.json", true);
	request.onreadystatechange = dataReady;
	request.send(null);
}

	lineData = JSON.parse(request.responseText)
