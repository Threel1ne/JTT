// Initialize the map without attribution control and zoom control
var map = L.map("map", {
  attributionControl: false,
  zoomControl: false,
}).setView([38.27580019289316, 140.48290782120196], 5);

// cartocdn tiles cdn
L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
  maxZoom: 19,
}).addTo(map);

//