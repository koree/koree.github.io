function getLocation()
  {
  if (navigator.geolocation)
    {
    navigator.geolocation.getCurrentPosition(initialize);
    }
  else{alert("Geolocation is not supported by this browser.");}
  }
  function initialize(position) {
        var mapOptions = {
          center: new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
          zoom: 15
        };
        var map = new google.maps.Map(document.getElementById("map-canvas"),
            mapOptions);
      }
window.onload = loadScript;  