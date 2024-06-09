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
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $current_password = $_POST['current_password'];
    $new_password = $_POST['new_password'];


    $sql = "SELECT password FROM users WHERE id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('i', $_SESSION['user_id']);
    $stmt->execute();
    $stmt->bind_result($hashed_password);
    $stmt->fetch();

    if ($stmt->num_rows == 1) {
        $sql = "UPDATE users SET password = ? WHERE id = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param('si', $new_password, $_SESSION['user_id']);
        if ($stmt->execute()) {
            echo "Password changed successfully!";
            header("Location: ../statistics.php");
        } else {
            echo "Error: " . $stmt->error;
        }
    } else {
        echo "Current password is incorrect!";
    }

    $stmt->close();
    $conn->close();
}
?>