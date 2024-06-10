<?php
// update.php

// Database connection settings
$host = 'localhost';
$db = 'apa';
$user = 'root';
$pass = '';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$db", $user, $pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo 'Connection failed: ' . $e->getMessage();
    exit;
}

// Retrieve the POST data
$id = $_POST['id'];
$value = $_POST['value'];

// Update the database
$stmt = $pdo->prepare("UPDATE users SET username = :value WHERE id = :id");
$stmt->bindParam(':value', $value);
$stmt->bindParam(':id', $id, PDO::PARAM_INT);

if ($stmt->execute()) {
    echo 'Update successful';
} else {
    echo 'Update failed';
}
?>