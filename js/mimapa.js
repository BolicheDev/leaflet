'use strict'

window.onload = init;


var map, iglesia, colegio;

var customIcon = new L.Icon({
    iconUrl: 'images/elogo.png',
    iconSize: [30, 45],
    iconAnchor: [15, 45]
});



function init() {
    document.getElementById("borrar").addEventListener("click", borrar);
    cargarDatos();
}

function cargarDatos() {
    map = L.map('mapa', {
        center: [39.38859722916341, -3.21028234629],
        zoom: 14
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attibution: '&copy;<a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    var puntosInteres = L.layerGroup().addTo(map);

    var prueba = L.AwesomeMarkers.icon({
        markerColor: 'red', // see colors above
        icon: 'coffee' //http://fortawesome.github.io/Font-Awesome/icons/
    });

    iglesia = L.geoJSON(geoJson, {
        //onEachFeature: verMisPunto,
        filter: function(feature, layer) {
            return feature.properties.tipo == "iglesia";
        },
        pointToLayer: function(feature, latlng) {
            return L.marker(latlng, {
                icon: prueba
            }).on('mouseover', function() {
                this.bindPopup(feature.properties.Name).openPopup();
            });
        }
    })

    colegio = L.geoJSON(geoJson, {
        //onEachFeature: verMisPunto,
        filter: function(feature, layer) {
            return feature.properties.tipo == "colegio";
        }
    })

    puntosInteres.addLayer(iglesia);
}

function verMisPunto(feature, layer) {
    layer.bindPopup("<div style='texto-aling:center'><h3>" +
        feature.properties.nombre +
        "</h3></div>");
    console.log(feature);
    //L.marker([feature.geometry.coordinates[1], feature.geometry.coordinates[0]], { icon: customIcon }).addTo(map);
}

function borrar() {
    map.removeLayer(iglesia);
    map.addLayer(colegio);
}