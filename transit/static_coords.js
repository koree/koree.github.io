var lat = 0;
var lng = 0;
var scheduleData = null;
var myOptions = {
                                        center: new google.maps.LatLng (lat , lng),
                                        zoom: 11
                                };
var map;
var request;

red = new Object



function initialize(){
        map = new google.maps.Map(document.getElementById("map-canvas"), myOptions);
        getMyLocation();
        parse();
}

function getMyLocation() {
        if (navigator.geolocation)
        {
                navigator.geolocation.getCurrentPosition(function(position) {
                lat = position.coords.latitude;
                lng = position.coords.longitude;
                renderMap();
                });
    }
    else
    {
            alert("Geolocation is not supported by your web browser.  What a shame!");
        }


}

function renderMap()
{
        me = new google.maps.LatLng(lat, lng);
        map.setCenter(me, 12);

}


function parse()
{
        request = new XMLHttpRequest();
        request.open("get", "http://mbtamap.herokuapp.com/mapper/rodeo.json", true);
        request.onreadystatechange = dataReady;
        request.send(null);

}
function dataReady() {
        scheduleData =JSON.parse(request.responseText);
        if(request.status == 200) {
                scheduleData =JSON.parse(request.responseText);
                console.log('yay');

        }
        else if (request.status == 500)
        {
                console.log('uh oh');
        }

}