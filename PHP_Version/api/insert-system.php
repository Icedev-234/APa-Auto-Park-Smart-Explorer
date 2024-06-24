<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "apa2";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
if ($_SERVER["REQUEST_METHOD"] == "POST") {
$value1 = $_POST['value1'];
$value2 = $_POST['value2'];
$value3 = $_POST['value3'];
$value4 = $_POST['value4'];
$value5 = $_POST['value5'];
$value6 = $_POST['value6'];
$value7 = $_POST['value7'];

$stmt = $conn->prepare("INSERT INTO data (JUDET, CATEGORIE_NATIONALA, CATEGORIA_COMUNITARA, MARCA, DESCRIERE_COMERCIALA, TOTAL, AN) VALUES (?, ?, ?, ?, ?, ?, ?)");
$stmt->bind_param("sssssss", $value1, $value2, $value3, $value4, $value5, $value6, $value7);
if ($stmt->execute()) {
    $id = $stmt->insert_id;
    echo json_encode(["id" => $id,"value1" => $value1,"value2" => $value2,"value3" => $value3,"value4" => $value4,"value5" => $value5,"value7"=>$value7]);
    
} else {
    echo "Error: " . $stmt->error;
}


}
?>