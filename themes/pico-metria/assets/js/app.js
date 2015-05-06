var map;

$(window).resize(function() {
  //sizeLayerControl();
});


$("#sidebar-toggle-btn").click(function() {
  $("#sidebar").toggle();
  map.invalidateSize();
  return false;
});

$("#sidebar-hide-btn").click(function() {
  $('#sidebar').hide();
  map.invalidateSize();
});


// Start location
var southWest = new L.LatLng(54.7, 9.4);
var northEast = new L.LatLng(69.3, 26.0);
// Map settings
self.wmsUrl = "http://butiken.metria.se/wms/ehandel";
self.scale = function(zoom) {
		return (1 / self.settings.resolution[zoom]);
	};
self.settings = {
			mapUrl : self.wmsUrl,
			format : 'image/jpg',
			restrictBounds : new L.LatLngBounds(southWest, northEast),
			resolution : [ 1600, 800, 400, 200, 100, 50, 20, 10, 4, 2, 1 ],
			startLat : 57.592643,
			startLon : 11.951237,
			startZoomLevel : 10,
			mapAttribut : "Kartor &copy; Metria AB 2015",
			metriaColor : "#e37222",
			crs : new L.CRS
					.proj4js(
							'EPSG:3006',
							'+proj=utm +zone=33 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs',
							new L.Transformation(1, -218128.7031, -1,
									6126002.9379)),
			detectRetina : true,
			continuousWorld : true
		};
self.mapLayers = [ new L.TileLayer.WMS(self.settings.mapUrl, {
			layers : 'sverigekartan',
			format : self.settings.format,
			detectRetina : self.settings.detectRetina,
			continuousWorld : self.settings.continuousWorld,
			minZoom : 1,
			maxZoom : 3
		}),new L.TileLayer.WMS(self.settings.mapUrl, {
			layers : 'oversiktskartan',
			format : self.settings.format,
			detectRetina : self.settings.detectRetina,
			continuousWorld : self.settings.continuousWorld,
			minZoom : 4,
			maxZoom : 5
		}),new L.TileLayer.WMS(self.settings.mapUrl, {
			layers : 'vagkartan',
			format : self.settings.format,
			detectRetina : self.settings.detectRetina,
			continuousWorld : self.settings.continuousWorld,
			minZoom : 6,
			maxZoom : 6
		}), new L.TileLayer.WMS(self.settings.mapUrl, {
			layers : 'fastighetskartan_adm',
			format : self.settings.format,
			detectRetina : self.settings.detectRetina,
			continuousWorld : self.settings.continuousWorld,
			minZoom : 7,
			maxZoom : 10
		}) ];
/* Basemap Layers */
var mapquestOSM = L.tileLayer("http://{s}.mqcdn.com/tiles/1.0.0/osm/{z}/{x}/{y}.png", {
  maxZoom: 19,
  subdomains: ["otile1", "otile2", "otile3", "otile4"],
  attribution: 'Tiles courtesy of <a href="http://www.mapquest.com/" target="_blank">MapQuest</a> <img src="http://developer.mapquest.com/content/osm/mq_logo.png">. Map data (c) <a href="http://www.openstreetmap.org/" target="_blank">OpenStreetMap</a> contributors, CC-BY-SA.'
});
var mapquestOAM = L.tileLayer("http://{s}.mqcdn.com/tiles/1.0.0/sat/{z}/{x}/{y}.jpg", {
  maxZoom: 18,
  subdomains: ["oatile1", "oatile2", "oatile3", "oatile4"],
  attribution: 'Tiles courtesy of <a href="http://www.mapquest.com/" target="_blank">MapQuest</a>. Portions Courtesy NASA/JPL-Caltech and U.S. Depart. of Agriculture, Farm Service Agency'
});
var mapquestHYB = L.layerGroup([L.tileLayer("http://{s}.mqcdn.com/tiles/1.0.0/sat/{z}/{x}/{y}.jpg", {
  maxZoom: 18,
  subdomains: ["oatile1", "oatile2", "oatile3", "oatile4"]
}), L.tileLayer("http://{s}.mqcdn.com/tiles/1.0.0/hyb/{z}/{x}/{y}.png", {
  maxZoom: 19,
  subdomains: ["oatile1", "oatile2", "oatile3", "oatile4"],
  attribution: 'Labels courtesy of <a href="http://www.mapquest.com/" target="_blank">MapQuest</a> <img src="http://developer.mapquest.com/content/osm/mq_logo.png">. Map data (c) <a href="http://www.openstreetmap.org/" target="_blank">OpenStreetMap</a> contributors, CC-BY-SA. Portions Courtesy NASA/JPL-Caltech and U.S. Depart. of Agriculture, Farm Service Agency'
})]);

map = new L.Map('map', {
			crs : self.settings.crs,
			continuousWorld : self.settings.continuousWorld,
			maxBounds : self.settings.restrictBounds,
			minZoom : 1,
			maxZoom : self.settings.resolution.length - 1,
			layers : self.mapLayers,
            zoomControl:false
    
		});


map.options.crs.scale = self.scale; // required by Leaflet 0.4

map.setView(new L.LatLng(self.settings.startLat,
					self.settings.startLon), self.settings.startZoomLevel - 1);

var zoomControl = L.control.zoom({
  position: "bottomright"
}).addTo(map);

/* GPS enabled geolocation control set to follow the user's location */
var locateControl = L.control.locate({
  position: "bottomright",
  drawCircle: true,
  follow: true,
  setView: true,
  keepCurrentZoomLevel: true,
  markerStyle: {
    weight: 1,
    opacity: 0.8,
    fillOpacity: 0.8
  },
  circleStyle: {
    weight: 1,
    clickable: false
  },
  icon: "icon-direction",
  metric: false,
  strings: {
    title: "My location",
    popup: "You are within {distance} {unit} from this point",
    outsideMapBoundsMsg: "You seem located outside the boundaries of the map"
  },
  locateOptions: {
    maxZoom: 18,
    watch: true,
    enableHighAccuracy: true,
    maximumAge: 10000,
    timeout: 10000
  }
}).addTo(map);

/* Larger screens get expanded layer control and visible sidebar */
if (document.body.clientWidth <= 767) {
  var isCollapsed = true;
} else {
  var isCollapsed = false;
}

var baseLayers = {
  "Street Map": mapquestOSM,
  "Aerial Imagery": mapquestOAM,
  "Imagery with Streets": mapquestHYB
};