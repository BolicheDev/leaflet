'use strict'

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