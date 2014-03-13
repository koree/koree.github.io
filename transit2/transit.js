var map;
var me;
var color;
var bubble = new google.maps.InfoWindow();
var marker;
var m = [];


function getMyLocation() {
				
				if (navigator.geolocation) { 
					navigator.geolocation.getCurrentPosition(initialize);}
					else {
					alert("No geolocation on this browser");
				}
			}

function initialize(position){
    var myLat= position.coords.latitude;
    var myLng= position.coords.longitude;


    me = new google.maps.LatLng(myLat, myLng);
    var myOptions = {
        center: me,
        zoom:11
    };
    map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);

    marker = new google.maps.Marker({
        position: me,
        title: "Here you are!"
    });
    marker.setMap(map);
  
    google.maps.event.addListener(marker, 'click', function(){
        bubble.setContent(marker.title);
        bubble.open(map, marker);
    });

    parse();
    console.log(myLat, myLng); // program has gotten this far... still no map
}

function parse() {
str = '[{"line":"blue","stations":[{"station_name":"Airport", "latitude":"42.374262", "longitude":"-71.030395"}, {"station_name":"Aquarium", "latitude":"42.359784", "longitude":"-71.051652"}, {"station_name":"Beachmont", "latitude":"42.39754234", "longitude":"-70.99231944"}, {"station_name":"Bowdoin", "latitude":"42.361365", "longitude":"-71.062037"}, {"station_name":"Government Center", "latitude":"42.359705", "longitude":"-71.059215"}, {"station_name":"Maverick", "latitude":"42.36911856", "longitude":"-71.03952958"}, {"station_name":"Orient Heights", "latitude":"42.386867", "longitude":"-71.004736"}, {"station_name":"Revere Beach", "latitude":"42.40784254", "longitude":"-70.99253321"}, {"station_name":"State Street", "latitude":"42.358978", "longitude":"-71.057598"}, {"station_name":"Suffolk Downs", "latitude":"42.39050067", "longitude":"-70.99712259"}, {"station_name":"Wonderland", "latitude":"42.41342", "longitude":"-70.991648"}, {"station_name":"Wood Island", "latitude":"42.3796403", "longitude":"-71.02286539"}]}, {"line":"red","stations":[{"station_name":"Alewife", "latitude":"42.395428", "longitude":"-71.142483"}, {"station_name":"Andrew", "latitude":"42.330154", "longitude":"-71.057655"}, {"station_name":"Ashmont", "latitude":"42.284652", "longitude":"-71.064489"}, {"station_name":"Braintree", "latitude":"42.2078543", "longitude":"-71.0011385"}, {"station_name":"Broadway", "latitude":"42.342622", "longitude":"-71.056967"}, {"station_name":"Central Square", "latitude":"42.365486", "longitude":"-71.103802"}, {"station_name":"Charles/MGH", "latitude":"42.361166", "longitude":"-71.070628"}, {"station_name":"Davis", "latitude":"42.39674", "longitude":"-71.121815"}, {"station_name":"Downtown Crossing", "latitude":"42.355518", "longitude":"-71.060225"}, {"station_name":"Fields Corner", "latitude":"42.300093", "longitude":"-71.061667"}, {"station_name":"Harvard Square", "latitude":"42.373362", "longitude":"-71.118956"}, {"station_name":"JFK/UMass", "latitude":"42.320685", "longitude":"-71.052391"}, {"station_name":"Kendall/MIT", "latitude":"42.36249079", "longitude":"-71.08617653"}, {"station_name":"North Quincy", "latitude":"42.275275", "longitude":"-71.029583"}, {"station_name":"Park Street", "latitude":"42.35639457", "longitude":"-71.0624242"}, {"station_name":"Porter Square", "latitude":"42.3884", "longitude":"-71.119149"}, {"station_name":"Quincy Adams", "latitude":"42.233391", "longitude":"-71.007153"}, {"station_name":"Quincy Center", "latitude":"42.251809", "longitude":"-71.005409"}, {"station_name":"Savin Hill", "latitude":"42.31129", "longitude":"-71.053331"}, {"station_name":"Shawmut", "latitude":"42.29312583", "longitude":"-71.06573796"}, {"station_name":"South Station", "latitude":"42.352271", "longitude":"-71.055242"}, {"station_name":"Wollaston", "latitude":"42.2665139", "longitude":"-71.0203369"}]}, {"line":"orange", "stations":[{"station_name":"Back Bay", "latitude":"42.34735", "longitude":"-71.075727"}, {"station_name":"Chinatown", "latitude":"42.352547", "longitude":"-71.062752"}, {"station_name":"Community College", "latitude":"42.373622", "longitude":"-71.069533"}, {"station_name":"Downtown Crossing", "latitude":"42.355518", "longitude":"-71.060225"}, {"station_name":"Forest Hills", "latitude":"42.300523", "longitude":"-71.113686"}, {"station_name":"Green Street", "latitude":"42.310525", "longitude":"-71.107414"}, {"station_name":"Haymarket", "latitude":"42.363021", "longitude":"-71.05829"}, {"station_name":"Jackson Square", "latitude":"42.323132", "longitude":"-71.099592"}, {"station_name":"Malden Center", "latitude":"42.426632", "longitude":"-71.07411"}, {"station_name":"Mass Ave", "latitude":"42.341512", "longitude":"-71.083423"}, {"station_name":"North Station", "latitude":"42.365577", "longitude":"-71.06129"}, {"station_name":"Oak Grove", "latitude":"42.43668", "longitude":"-71.071097"}, {"station_name":"Roxbury Crossing", "latitude":"42.331397", "longitude":"-71.095451"}, {"station_name":"Ruggles", "latitude":"42.336377", "longitude":"-71.088961"}, {"station_name":"State Street", "latitude":"42.358978", "longitude":"-71.057598"}, {"station_name":"Stony Brook", "latitude":"42.317062", "longitude":"-71.104248"}, {"station_name":"Sullivan", "latitude":"42.383975", "longitude":"-71.076994"}, {"station_name":"Tufts Medical", "latitude":"42.349662", "longitude":"-71.063917"}, {"station_name":"Wellington", "latitude":"42.40237", "longitude":"-71.077082"}]}]';
    parsed = JSON.parse(str);
    var request = new XMLHttpRequest();
    request.open("get", "http://mbtamap.herokuapp.com/mapper/rodeo.json", true);
    request.onreadystatechange = function () {
        if (request.status ==200 && request.readyState ==4){
            lineinfo = JSON.parse(request.responseText);
            color = lineinfo["line"];
            console.log(color);
            mapinfo();
        }else if(request.status == 500 && request.readyState==4){
            alert ("unable to get MBTA info at this time");
        }
    }
    request.send(null);

}

var locations = [];

function mapinfo(){

    var shortest = 4000;
    var shortname;

    for (var i =0; i < 3; i++){

        if (parsed[i]["line"] == color){ 
            
            console.log('come on already');

            for (var j = 0; parsed[i]["stations"][j] != null; ++j){
                t_coords = new google.maps.LatLng(parsed[i]["stations"][j]["latitude"],
                parsed[i]["stations"][j]["longitude"]);
                //console.log(parsed[i]["stations"][j]["station_name"]);
                var iconBase = 'https://maps.google.com/mapfiles/kml/shapes/';
                    
                if (color == 'red'){
                            
                    m[j] = new google.maps.Marker({
                        position: t_coords, 
                        title: parsed[i]["stations"][j]["station_name"],
                        map: map,
                        icon: iconBase + 'schools_maps.png'
                        
                    });
                }else {
                    m[j] = new google.maps.Marker({
                        position: t_coords, 
                        title: parsed[i]["stations"][j]["station_name"],
                        map: map,
                    });
                }
                

                var length = distance(m[j]); //distance function
                if (length < shortest){
                    shortest = length;
                    shortname = m[j].title;
                }


                google.maps.event.addListener(m[j], 'click', function(){
                    temp = this;
                    var mess = this.title + ", " distance(this) + " miles away";
                    bubble.setContent(mess);
                    bubble.open(map, temp);
                });              
            }
        }
    }
    alert(shortname + " is closest to you, just" + shortest + " miles away!");
}
    

function distance (m){
Number.prototype.toRad = function(){
               return this * Math.PI / 180; 
           }

            var lat2 = m.position.lat(); 
            var lng2 = m.position.lng();
            var lat1 = marker.position.lat();
            var lng1 = marker.position.lng();

            var R = 3959; //miles radius
            var x1 = lat2-lat1;
            var dLat = x1.toRad();
            var x2 = lng2-lng1;
            var dLon = x2.toRad();
            var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
                        Math.cos(lat1.toRad()) * Math.cos(lat2.toRad()) *
                        Math.sin(dLon/2) * Math.sin(dLon/2); 
            var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
            var d = R * c;

            return d;


}


