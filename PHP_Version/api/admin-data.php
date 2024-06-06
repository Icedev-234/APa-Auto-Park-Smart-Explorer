<?php
header('Content-Type: application/json');

// Database credentials
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "apa";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// SQL query to fetch data
$sql = "SELECT ID, JUDET, CATEGORIE_NATIONALA, CATEGORIA_COMUNITARA, MARCA, DESCRIERE_COMERCIALA FROM data";
$result = $conn->query($sql);

$data = array();
if ($result->num_rows > 0) {
    // Output data of each row
    while($row = $result->fetch_assoc()) {
        $data[] = $row;
    }
} else {
    echo json_encode([]);
    exit;
}

$conn->close();

// Output data in JSON format
echo json_encode($data);
?>