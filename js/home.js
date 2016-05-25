$(document).ready(function(){
	loadSlider();
})
$(window).load(function(){
	loadMap();
})
function loadMap(){

	var mapOptions = {
      center: new google.maps.LatLng(30,70),
      zoom: 5,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    var map;
    map = new google.maps.Map(document.getElementById("map-canvas"),
        mapOptions);
    $('#map-holder #map-canvas').fadeIn(500);

    var locations = [
    {name:"Lahore",latlng:new google.maps.LatLng(31.5758,74.3269)},
    {name:"Bahawalpur",latlng:new google.maps.LatLng(29.3948897, 71.68516850000003)},
    {name:"Bahawalnagar",latlng:new google.maps.LatLng(29.9980969, 73.2507124)},
    {name:"Rahim Yar Khan",latlng:new google.maps.LatLng(28.871913,70.898154)},
    {name:"Sheikhupura",latlng:new google.maps.LatLng(31.7139890,73.9842680)}
    ];


    for (var i=0; i<locations.length;i++)
    {
      if(!locations[i].latlng)
      {
        //find via geocode
        //log to console
      }
      else
      {
        setMarker(map,locations[i]);
      }
    }

}
function setMarker(map,location)
{
  var marker = new google.maps.Marker({
    position:location.latlng,
    title:location.name
  });
  marker.setMap(map);
  var contentString = '<div><h3>'+ location.name +'</h3></div>';
  var info = new google.maps.InfoWindow({
    content:contentString
  });
  google.maps.event.addListener(marker, 'click', function() {
    info.open(map,marker);
  });

}
function loadSlider()
{
	$(".box_skitter_large").skitter({
			theme: "minimalist", 
 			focus: false, 			 
 			navigation:true,
 			numbers:false,
 			controls:false,
 			enable_navigation_keys: true,
 			animation:"glassBlock",
 			auto_play:true
	});
}
