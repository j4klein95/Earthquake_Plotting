var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_month.geojson";

//Perform request to get earthquake data, the data features 4.5 magnitude quakes in the past month

d3.json(queryUrl, function(data) {
//Move the data into a seperate function to create the objects for the map
  createFeatures(data.features);
});

//create our function to create features for the map

function createFeatures(data) {
  function eachFeature(feature, layer) {
    layer.bindPopup('<h3>' + features.properties.place + "</h3><hr><p>" + new Date(feature.properties.time) + "</p>");
  }
  //create the GeoJSON layer containing the features array on the data objects
  //run the eachFeature function on each data object in the array to add popups
  var earthquakes = L.geoJSON(data, {
    eachFeature: eachFeature
  });
  //create the map, send it the earthquake geoJson data
  createMap(earthquakes);
}

//lets make a map

function createMap(earthquakes) {

  var key = "pk.eyJ1IjoiajRrbGVpbjk1IiwiYSI6ImNqY3Nha2tmbTA0MGMyem96Z21jdWV5NmQifQ._Ns_ejA2ApIAwL_eUCxf8g"

  //define our maps and layers
  var satelliteMap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/satellite-v9/tiles/256/{z}/{x}/{y}?access_token=" + key);

  //Define a baseMaps object to hold the layers
  var baseMaps = {
    "Satellite Map": satelliteMap,
  };
  var overlay = {
    Earthquakes: earthquakes
  };
  var myMap = L.map("map", {
    center: [
      37.09, -95.71
    ],
    zoom: 5,
    layers: [earthquakes]
  });

  L.control.layers(baseMaps, overlay, {
    collapsed: false
  }).addTo(myMap);
}
