'use strict'

window.onload = init;


var map, iglesia, colegio;

var arrayGlobales = {
    'categorias': {
        'iglesia': '',
        'colegio': '',
        'Forklore': '',
        'F. Patronales': '',
        'Exposiciones': '',
        'Teatro': '',
        'Cine': ''
    }
}

var iconos = {
    'colores': {
        'iglesia': 'amarillo',
        'colegio': 'azul',
        'Forklore': 'naranja',
        'Cine': 'morado',
        'F. Patronales': 'rojo',
        'Exposiciones': 'rosa',
        'Teatro': 'verde'
    },
    'icono': function(categoria) {
        return L.divIcon({
            className: 'sprite ' + this.colores[categoria],
            iconSize: [26, 45],
            iconAnchor: [13, 45],
            popupAnchor: [0, -45]
        });
    }
}

function init() {
    document.getElementById("borrar").addEventListener("click", borrar);
    loadMap();
    loadDate();
}

function loadMap() {
    map = L.map('mapa', {
        center: [39.38859722916341, -3.21028234629],
        zoom: 14
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attibution: '&copy;<a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
}

function loadDate() {
    var puntosInteres = L.layerGroup().addTo(map);

    for (let categoria in arrayGlobales.categorias) {
        let elementos = L.geoJSON(geoJson, {
            filter: function(feature, layer) {
                return feature.properties.tipo == categoria;
            },
            onEachFeature: verMisPunto,
            pointToLayer: function(feature, latlng) {
                return L.marker(latlng, { icon: iconos.icono(categoria) });
            }
        })
        arrayGlobales.categorias[categoria] = elementos;
    }
    /*
        iglesia = L.geoJSON(geoJson, {
            filter: function(feature, layer) {
                return feature.properties.tipo == "iglesia";
            },
            onEachFeature: verMisPunto,
            pointToLayer: function(feature, latlng) {
                return L.marker(latlng, { icon: iconos.icono('azul') });
            }
        })

        colegio = L.geoJSON(geoJson, {
            filter: function(feature, layer) {
                return feature.properties.tipo == "colegio";
            },
            onEachFeature: verMisPunto,
            pointToLayer: function(feature, latlng) {
                return L.marker(latlng, { icon: iconos.icono('rojo') });
            }
        })*/

    puntosInteres.addLayer(iglesia);
}

function verMisPunto(feature, layer) {
    layer.bindPopup("<div style='texto-aling:center'><h3>" +
        feature.properties.nombre +
        "</h3></div>");
}

function borrar() {
    map.removeLayer(iglesia);
    map.addLayer(colegio);
}