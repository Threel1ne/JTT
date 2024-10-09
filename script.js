// Initialize the map
var map = L.map('map', {
    center: [35.682839, 139.759455], // Center on Tokyo
    zoom: 7,
    maxBounds: [
        [47.294134, 151.514928],
        [22.938160, 122.316188],
    ],
    minZoom: 6,
    maxBoundsViscocity: 0,
});

// Add base map layer
L.tileLayer(
    `https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png`,
    { maxZoom: 24 }
).addTo(map);

// Add railway map layer
L.tileLayer(
    `http://{s}.tiles.openrailwaymap.org/standard/{z}/{x}/{y}.png`,
    { maxZoom: 24 }
).addTo(map);

// Dummy function to get train route (this simulates an API call)
async function getTrainRoute(destination) {
    // For demo purposes, we're simulating the response for a route to Sapporo Station.
    return {
        startStation: 'Tokyo',
        endStation: destination,
        stops: [
            { station: 'Shinagawa', latlng: [35.6284, 139.7385] },
            { station: 'Yokohama', latlng: [35.4656, 139.6227] },
            { station: destination, latlng: [43.0687, 141.3508] }, // Example lat/lng for Sapporo
        ],
        instructions: [
            'Board train at Tokyo Station.',
            'Stop at Shinagawa Station.',
            'Change trains at Yokohama Station.',
            'Arrive at Sapporo Station.'
        ]
    };
}

// Function to handle route finding
async function findRoute() {
    const destination = document.getElementById('stationInput').value;
    if (!destination) {
        alert('Please enter a destination station.');
        return;
    }

    const route = await getTrainRoute(destination);

    // Clear any existing markers and route lines
    map.eachLayer(layer => {
        if (layer.options && layer.options.pane !== 'tilePane') {
            map.removeLayer(layer);
        }
    });

    // Add base and railway map layers again
    L.tileLayer(
        `https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png`,
        { maxZoom: 24 }
    ).addTo(map);

    L.tileLayer(
        `http://{s}.tiles.openrailwaymap.org/standard/{z}/{x}/{y}.png`,
        { maxZoom: 24 }
    ).addTo(map);

    // Add markers for each stop and plot the route line
    const latlngs = route.stops.map(stop => {
        const marker = L.marker(stop.latlng).addTo(map)
            .bindPopup(`${stop.station} Station`).openPopup();
        return stop.latlng;
    });

    // Draw a polyline connecting the stations
    L.polyline(latlngs, { color: 'blue' }).addTo(map);

    // Center the map on the route
    map.fitBounds(latlngs);

    // Display route instructions
    const instructionsDiv = document.getElementById('routeInstructions');
    instructionsDiv.innerHTML = `<h3>Route Instructions</h3><ol>${route.instructions.map(i => `<li>${i}</li>`).join('')}</ol>`;
}

// Add event listener for the "Find Route" button
document.getElementById('findRouteButton').addEventListener('click', findRoute);
