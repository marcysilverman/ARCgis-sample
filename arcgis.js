
require([
  "esri/Map",
  "esri/views/MapView",
  "esri/widgets/BasemapGallery",
  "esri/layers/FeatureLayer",
  // "esri/views/SceneView"
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

var trailheadsRenderer = {
  "type": "simple",
  "symbol": {
    "type": "picture-marker",
    "url": "http://static.arcgis.com/images/Symbols/NPS/npsPictograph_0231b.png",
    "width": "18px",
    "height": "18px"
  }
}
var trailheadsLabels = {
  symbol: {
    type: "text",
    color: "#FFFFFF",
    haloColor: "#5E8D74",
    haloSize: "2px",
    font: {
      size: "12px",
      family: "noto-sans",
      style: "italic",
      weight: "normal"
    }
  },
  labelPlacement: "above-center",
  labelExpressionInfo: {
    expression: "$feature.TRL_NAME"
  }
};

var trailheads = new FeatureLayer({
  url:
    "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Trailheads/FeatureServer/0",
  renderer: trailheadsRenderer,
  labelingInfo: [trailheadsLabels]
});

map.add(trailheads);

// map.add(featureLayer);
// view.ui.add(basemapGallery, "top-right");
//   var featureLayer = new FeatureLayer({
//   url: "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Trailheads/FeatureServer/0"
// });

// map.add(trailheads);

// var view = new SceneView({
//   container: "viewDiv",
//   map: map,
//   center: [-118.71511,34.09042],
//   zoom: 15,
//   camera: {
//     tilt: 65,
//     position: {
//       x: -118.71,
//       y: 33.75,
//       z: 25000 // meters
//     }
//   }
// });
});
