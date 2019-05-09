
require([
  "esri/Map",
  "esri/views/MapView",
  "esri/widgets/BasemapGallery",
  "esri/layers/FeatureLayer",
  // "esri/views/SceneView",
  "esri/Basemap",
  "esri/layers/VectorTileLayer"
], function(Map, MapView, BasemapGallery, FeatureLayer, Basemap, VectorTileLayer) {

  var basemap = new Basemap({
    baseLayers: [
      new VectorTileLayer({
        portalItem: {
          id: "d2ff12395aeb45998c1b154e25d680e5" // Forest and Parks Canvas
        }
      })
    ]
  });

  var map = new Map({
    //*** ADD ***//
    // basemap: "topo-vector",
    basemap: basemap
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

var popupTrailheads = {
  "title": "Trailhead",
  "content": "<b>Trail:</b> {TRL_NAME}<br><b>City:</b> {CITY_JUR}<br><b>Cross Street:</b> {X_STREET}<br><b>Parking:</b> {PARKING}<br><b>Elevation:</b> {ELEV_FT} ft"
}

// Create the layer and set the popup
var trailheads = new FeatureLayer({
  url: "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Trailheads_Styled/FeatureServer/0",
  outFields: ["TRL_NAME","CITY_JUR","X_STREET","PARKING","ELEV_FT"],
  popupTemplate: popupTrailheads
});
    
// Add the layer
map.add(trailheads);


// Define a popup for Trails
var popupTrails = {
  "title": "Trail Information",
  "content": function(){
     return "This is {TRL_NAME} with {ELEV_GAIN} ft of climbing."; 
  }
}
    
// Create the layer and set the renderer
var trails = new FeatureLayer({
  url: "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Trails_Styled/FeatureServer/0",
  outFields: ["TRL_NAME","ELEV_GAIN"],
  popupTemplate: popupTrails
});

// Add the layer
map.add(trails,0);


// Define popup for Parks and Open Spaces
var popupOpenspaces = {
  "title": "{PARK_NAME}",
  "content": [{
    "type": "fields",
    "fieldInfos": [
      {
        "fieldName": "AGNCY_NAME",
        "label": "Agency",
        "isEditable": true,
        "tooltip": "",
        "visible": true,
        "format": null,
        "stringFieldOption": "textbox"
      },
      {
        "fieldName": "TYPE",
        "label": "Type",
        "isEditable": true,
        "tooltip": "",
        "visible": true,
        "format": null,
        "stringFieldOption": "textbox"
      },
      {
        "fieldName": "ACCESS_TYP",
        "label": "Access",
        "isEditable": true,
        "tooltip": "",
        "visible": true,
        "format": null,
        "stringFieldOption": "textbox"
      },
      {
        "fieldName": "GIS_ACRES",
        "label": "Acres",
        "isEditable": true,
        "tooltip": "",
        "visible": true,
        "format": {
          "places": 2,
          "digitSeparator": true
        },
        "stringFieldOption": "textbox"
      }
    ]
  }]
}

var openspaces = new FeatureLayer({
  url: "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Parks_and_Open_Space_Styled/FeatureServer/0",
  outFields: ["TYPE","PARK_NAME", "AGNCY_NAME","ACCESS_TYP","GIS_ACRES","TRLS_MI","TOTAL_GOOD","TOTAL_FAIR", "TOTAL_POOR"],
  popupTemplate: popupOpenspaces
});

// Add the layer
map.add(openspaces,0);

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
