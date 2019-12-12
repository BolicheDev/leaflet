<?php
$conn = new mysqli('localhost', 'root', '', 'test_evento');
mysqli_set_charset($conn, "utf8");

if ($conn->connect_errno) {
    print("Error: $conn->connect_error");
    die();
}
if (!$stmt = $conn->prepare("select * from eventos")) {
    print "Error al preparar la consulta {$conn->error}";
}

if (!$stmt->execute()) {
    print "Error al ejecutar la consulta {$stmt->error}";
}

$result = $stmt->get_result();
$conn->close();
$arr_eventos = array();
$texto = array('type' => 'FeatureCollection');
$objeto = array('type' => 'Feature', 'properties' => array('nombre' => '','descripcion' => '', 'categoria' => ''), 'geometry' => array('type' => 'Point', 'coordinates' => []));

while ($evento = $result->fetch_assoc()) {
    $objetoCopia = $objeto;
    $objetoCopia['properties']['nombre'] = $evento['nombre'];
    $objetoCopia['properties']['categoria'] = $evento['categoria'];
    $objetoCopia['properties']['descripcion'] = $evento['descripcion'];
    $objetoCopia['geometry']['coordinates'] = [$evento['lng'], $evento['lat']];
    $texto['features'][] = $objetoCopia;
    //$arr_eventos[] = $evento;
}
print json_encode($texto);
