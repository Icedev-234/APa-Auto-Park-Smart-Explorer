<?php
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

if (isset($_POST['id']) && isset($_POST['field']) && isset($_POST['value'])) {
    $id = intval($_POST['id']);
    $field = $_POST['field'];
    $value = $_POST['value'];
    $sql = "UPDATE your_table SET $field = '$value' WHERE id = $id";
    if ($conn->query($sql) === TRUE) {
        echo json_encode(["status" => "success"]);
    } else {
        echo json_encode(["status" => "error", "message" => $conn->error]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "Invalid parameters"]);
}

$conn->close();
?>
