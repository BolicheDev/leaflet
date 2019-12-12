'use strict'

window.onload = init;


var map, iglesia, colegio;

var iconoBase = L.Icon.extend({
    options: {
        shadowUrl: 'images/base4.png',
        iconSize: [30, 45],
        iconAnchor: [15, 45],
        shadowSize: [40, 10],
        shadowAnchor: [20, 2],
        popupAnchor: [0, -45],
    }
});

var customIcon = new iconoBase({ iconUrl: 'images/elogosolo2.png' });

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

    iglesia = L.geoJSON(geoJson, {
        //onEachFeature: verMisPunto,
        filter: function(feature, layer) {
            return feature.properties.tipo == "iglesia";
        },
        pointToLayer: function(feature, latlng) {
            var smallIcon = customIcon;
            return L.marker(latlng, { icon: smallIcon });
        }
    })

    colegio = L.geoJSON(geoJson, {
        filter: function(feature, layer) {
            return feature.properties.tipo == "colegio";
        },
        onEachFeature: verMisPunto,
        pointToLayer: function(feature, latlng) {
            var smallIcon = customIcon;
            return L.marker(latlng, { icon: smallIcon });
        }
    })

    puntosInteres.addLayer(iglesia);
}

function verMisPunto(feature, layer) {
    layer.bindPopup("<div style='texto-aling:center'><h3>" +
        feature.properties.nombre +
        "</h3></div>");
    //console.log(feature);
}

function borrar() {
    map.removeLayer(iglesia);
    map.addLayer(colegio);
}