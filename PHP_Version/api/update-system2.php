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
$value1 = $_POST['value1'];
$value2 = $_POST['value2'];
$value3 = $_POST['value3'];
$value4 = $_POST['value4'];
$value5 = $_POST['value5'];

// Update the database
$stmt = $pdo->prepare("UPDATE data2 SET JUDET, CATEGORIE_NATIONALA, CATEGORIA_COMUNITARA, MARCA, DESCRIERE_COMERCIALA = :value1 :value2 :value3 :value4 :value5 WHERE id = :id");
$stmt->bindParam(':value1', $value1);
$stmt->bindParam(':value2', $value2);
$stmt->bindParam(':value3', $value3);
$stmt->bindParam(':value4', $value4);
$stmt->bindParam(':value5', $value5);
$stmt->bindParam(':id', $id, PDO::PARAM_INT);

if ($stmt->execute()) {
    echo 'Update successful';
} else {
    echo 'Update failed';
}
?>