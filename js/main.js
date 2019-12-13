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
            onEachFeature: showInfoMarker,
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

function showInfoMarker(feature, layer) {
    layer.bindPopup(createDivMarker(feature));
}

function createDivMarker(object) {
    let divPrincipal = document.createElement("div");
    let cabecera = document.createElement("div");
    cabecera.classList.add("table-head");
    cabecera.innerHTML = object.properties.titulo;
    divPrincipal.append(cabecera);
    /* -------- */
    row = document.createElement("div");
    row.classList.add("table-row")
    izquierda = document.createElement("div");
    izquierda.classList.add("table-cell");
    izquierda.innerHTML = "Descripcion";
    derecha = document.createElement("div");
    derecha.classList.add("table-cell");
    derecha.innerHTML = object.properties.descripcion;
    row.append(izquierda);
    row.append(derecha);
    divPrincipal.append(row);
    /* -------- */
    row = document.createElement("div");
    row.classList.add("table-row")
    izquierda = document.createElement("div");
    izquierda.classList.add("table-cell");
    izquierda.innerHTML = "Categoria";
    derecha = document.createElement("div");
    derecha.classList.add("table-cell");
    derecha.innerHTML = object.properties.categoria;
    row.append(izquierda);
    row.append(derecha);
    divPrincipal.append(row);

    return divPrincipal;
}