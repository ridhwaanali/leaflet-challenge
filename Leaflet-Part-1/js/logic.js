var queryUrl= "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_hour.geojson";

d3.json(queryUrl).then(function (data) {
    console.log(data);
     createFeatures(data.features);
   });
   function markerSize(magnitude) {
    return magnitude * 2000;
  };
  function chooseColor(depth) {
    switch(true) {
      case depth > 90:
        return "blue";
      case depth > 70:
        return "red";
      case depth > 50:
        return "yellow";
      case depth > 30:
        return "green";
      case depth > 10:
        return "purple";
      default:
        return "orange";
    }
  }
  function createFeatures(eq_data) {
    function onEachFeature(feature, layer) {
        layer.bindPopup(`<h3>Location: ${feature.properties.place}</h3><hr><p>Date: ${new Date(feature.properties.time)}</p><p>Magnitude: ${feature.properties.mag}</p><p>Depth: ${feature.geometry.coordinates[2]}</p>`);
      }
      var earthquakes = L.geoJSON(earthquakeData, {
        onEachFeature: onEachFeature,
        pointToLayer: function(feature, latlng) {
            var markers = {
                radius: markerSize(feature.properties.mag),
                  fillColor: chooseColor(feature.geometry.coordinates[2]),
                  fillOpacity: 0.10,
                  color: "black",
                  stroke: true,
                  weight: 0.8
              }
              return L.circle(latlng,markers);
            }
          });
