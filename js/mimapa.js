'use strict'

window.onload = init;

var arrayGlobales = {
    'categorias': {
        'Arte': [],
        'Gastronomia': [],
        'Folklore': [],
        'F. Patronales': [],
        'Exposiciones': [],
        'Teatro': [],
        'Cine': []
    },
    'mapa': '',
    'popup': L.popup(),
    'eventos': {}
}

var iconos = {
    'colores': {
        'Arte': 'amarillo',
        'Gastronomia': 'azul',
        'Folklore': 'naranja',
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
    loadJson();
    loadMap();
    addEventButton();
}

function addEventButton() {
    document.getElementById("arte").addEventListener("click", arte);
    document.getElementById("gastronomia").addEventListener("click", gastronomia);
    document.getElementById("forklore").addEventListener("click", folklore);
}

function loadMap() {
    arrayGlobales.mapa = L.map('mapa', {
        center: [39.38859722916341, -3.21028234629],
        zoom: 12
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attibution: '&copy;<a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(arrayGlobales.mapa);

    arrayGlobales.mapa.on('click', onMapClick);
}

function loadDate() {
    for (let categoria in arrayGlobales.categorias) {
        let elementos = L.geoJSON(arrayGlobales.eventos, {
            filter: function(feature, layer) {
                return feature.properties.categoria == categoria;
            },
            onEachFeature: verMisPunto,
            pointToLayer: function(feature, latlng) {
                return L.marker(latlng, { icon: iconos.icono(categoria) });
            }
        })
        arrayGlobales.categorias[categoria].push(elementos);
    }
}

function arte() {
    clearMap();
    arrayGlobales.categorias['Arte'].forEach(element => {
        arrayGlobales.mapa.addLayer(element);
        console.log(element);
    });
}

function gastronomia() {
    clearMap();
    arrayGlobales.categorias['Gastronomia'].forEach(element => {
        arrayGlobales.mapa.addLayer(element);
        console.log(element);
    });
}

function folklore() {
    clearMap();
    arrayGlobales.categorias['Folklore'].forEach(element => {
        arrayGlobales.mapa.addLayer(element);
        console.log(element);
    });
}

function clearMap() {
    for (let categoria in arrayGlobales.categorias) {
        if (arrayGlobales.categorias[categoria].length > 0) {
            arrayGlobales.categorias[categoria].forEach(element => {
                arrayGlobales.mapa.removeLayer(element);
            });
        }
    }
}

function onMapClick(e) {
    // arrayGlobales.popup
    //     .setLatLng(e.latlng)
    //     .setContent("You clicked the map at " + e.latlng.toString())
    //     .openOn(arrayGlobales.mapa);
    L.marker([e.latlng.lat, e.latlng.lng], { icon: iconos.icono('Cine') }).addTo(arrayGlobales.mapa);
    console.log(e.latlng);
}

function loadJson() {
    $.ajax({
        url: 'php/cargar.php',
        cache: false,
        method: 'POST',
        type: 'json',
        beforeSend: function() {
            arrayGlobales.eventos = {};
        },
        success: function(result) {
            var resultado = JSON.parse(result);
            arrayGlobales.eventos = resultado;
            loadDate();
        },
        error: function(jqXHR, textStatus, errorThrown) {
            alert("error " + jqXHR.status + " " + errorThrown);
        }
    });
}

function verMisPunto(feature, layer) {
    layer.bindPopup("<div style='texto-aling:center'><h3>" +
        feature.properties.descripcion +
        "</h3></div>");
}