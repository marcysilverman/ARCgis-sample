
require([
  "esri/Map",
  "esri/views/MapView",
  "esri/widgets/BasemapGallery",
  "esri/layers/FeatureLayer"
], function(Map, MapView, BasemapGallery, FeatureLayer) {

var map = new Map({
  basemap: "topo-vector"
});

var view = new MapView({
  container: "viewDiv",
  map: map,
  center: [-118.71511,34.09042],
  zoom: 8,
});

var basemapGallery = new BasemapGallery({
  view: view,
  source: {
    portal: {
      url: "https://www.arcgis.com",
      useVectorBasemaps: false // Load vector tile basemaps
    }
  }
});

var featureLayer = new FeatureLayer({
  url: "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Trailheads/FeatureServer/0"
});

map.add(featureLayer);
view.ui.add(basemapGallery, "top-right");
  var featureLayer = new FeatureLayer({
  url: "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Trailheads/FeatureServer/0"
});

map.add(featureLayer);
});
