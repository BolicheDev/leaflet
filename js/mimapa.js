'use strict'

window.onload = init;

//map.getZoom()

function init() {
    loadJson();
    loadMap();
    addEventButton();
}

function addEventButton() {
    document.getElementById("searchByCategories").addEventListener("click", searchByCategories);
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

function searchByCategories() {
    clearMap();
    updateMarkerMap();
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

function updateMarkerMap() {
    let categorias = document.getElementsByName("categoria");
    categorias.forEach(categoria => {
        if (categoria.checked) {
            categoria = categoria.value;
            if (arrayGlobales.categorias[categoria].length > 0) {
                arrayGlobales.categorias[categoria].forEach(element => {
                    arrayGlobales.mapa.addLayer(element);
                });
            }
        }
    })
}

function onMapClick(e) {
    if (arrayGlobales.oldMarket != '') {
        arrayGlobales.mapa.removeLayer(arrayGlobales.oldMarket);
    }
    // arrayGlobales.popup
    //     .setLatLng(e.latlng)
    //     .setContent("You clicked the map at " + e.latlng.toString())
    //     .openOn(arrayGlobales.mapa);
    arrayGlobales.oldMarket = L.marker([e.latlng.lat, e.latlng.lng], { icon: iconos.icono('Cine') });
    arrayGlobales.oldMarket.addTo(arrayGlobales.mapa);
    document.getElementById("lat").value = e.latlng.lat;
    document.getElementById("lng").value = e.latlng.lng;
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