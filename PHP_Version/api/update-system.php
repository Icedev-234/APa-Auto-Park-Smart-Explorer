<?php
header('Content-Type: application/json');

$input = json_decode(file_get_contents('php://input'), true);

if (isset($input['id']) && isset($input['name'])) {
    $id = $input['id'];
    $name = $input['name'];

    // Database connection
    $servername = "localhost";
$username = "root";
$password = "";
$dbname = "apa";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

    if ($conn->connect_error) {
        die(json_encode(['success' => false, 'error' => $conn->connect_error]));
    }

    $stmt = $conn->prepare('UPDATE table_name SET name = ? WHERE id = ?');
    $stmt->bind_param('si', $name, $id);

    if ($stmt->execute()) {
        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['success' => false, 'error' => $stmt->error]);
    }

    $stmt->close();
    $conn->close();
} else {
    echo json_encode(['success' => false, 'error' => 'Invalid input']);
}
?>