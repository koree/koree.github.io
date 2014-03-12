
function getMyLocation() {
				console.log ('hi');
				if (navigator.geolocation) { 
					navigator.geolocation.getCurrentPosition(initialize);}
					else {
					alert("No geolocation on this browser");
				}
			}

function initialize(position){
var myLat= position.coords.latitude;
var myLng= position.coords.longitude;

var me= new google.maps.LatLng(myLat, myLng);
var myOptions {
    center: me,
    zoom:11
};
var map = new google.maps.Map(document.getElementById)("map_canvas"), myOptions);
var marker = new google.maps.Marker({
    position: me,
    title: "Work damn you"
});
marker.setMap(map);
infoWindow = new google.maps.infoWindow();
google.maps.event.addListener(marker, 'click', function(){
    infoWindow.setContent(marker.title);
    infoWindow.open(map, marker);
});

}







