// public/js/map.js
// mapboxgl.accessToken = mapToken;

// const map = new mapboxgl.Map({
//     container: 'map',
//     style: 'mapbox://styles/mapbox/satellite-streets-v12',
//     center: listing.geometry.coordinates,  // starting position [lng, lat]
//     zoom: 9
// });

// //marker
// const marker = new mapboxgl.Marker({color: 'red'})
//     .setLngLat(listing.geometry.coordinates)
//     //popup
//     .setPopup(new mapboxgl.Popup({ offset: 25 })
//     .setHTML(`<h4>${listing.location}</h4><p>Exact location will be provided after booking</p>`))
//     .addTo(map);

// Maptiler map initialization
const map = new maplibregl.Map({
    container: 'map',
    style: `https://api.maptiler.com/maps/streets-v2/style.json?key=${mapToken}`,
    center: listing.geometry.coordinates,
    zoom: 9
});

// Marker
const marker = new maplibregl.Marker({color: 'red'})
    .setLngLat(listing.geometry.coordinates)
    .setPopup(new maplibregl.Popup({ offset: 25 })
    .setHTML(`<h4>${listing.location}</h4><p>Exact location will be provided after booking</p>`))
    .addTo(map);
