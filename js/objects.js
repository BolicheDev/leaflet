'use strict'

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
    'eventos': {},
    'oldMarket': ''
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