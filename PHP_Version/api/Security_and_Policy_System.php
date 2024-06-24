<?php
session_start();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Replace these variables with your actual database connection details
    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "apa";

    // Connect to the database
    $conn = new mysqli($servername, $username, $password, $dbname);

    // Check connection
    if ($conn->connect_error) {
        die(json_encode(['message' => 'Connection failed: ' . $conn->connect_error]));
    }

    // Retrieve POST data
    $currentPassword = $_POST['current_password'];
    $newPassword = $_POST['new_password'];
    $confirmPassword=$_POST['confirm_password'];

    // Validate the input data (basic validation, you might want to add more)
    if (empty($currentPassword) || empty($newPassword)) {
        echo 'All fields are required.';
        exit;
    }

    // Retrieve the user's current password from the database
    $userId = $_SESSION['user_id']; // Assuming user ID is stored in the session after login
    $sql = "SELECT password FROM users WHERE id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $userId);
    $stmt->execute();
    $stmt->bind_result($storedPasswordHash);
    $stmt->fetch();
    $stmt->close();

    // Verify the current password
    if (!($newPassword==$confirmPassword)) {
        echo 'Current password is incorrect.';
        exit;
    }


    // Update the password in the database
    $sql = "UPDATE users SET password = ? WHERE id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("si", $newPassword, $userId);

    if ($stmt->execute()) {
        echo 'Password successfully changed.';
    } else {
        echo 'Error updating password.';
    }
    $conn->close();
}
?>