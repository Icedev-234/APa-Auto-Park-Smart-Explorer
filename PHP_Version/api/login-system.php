<?php
ob_start();
session_start();
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
    $username = $_POST['username'];
    $password = $_POST['password'];

    $stmt = $conn->prepare("SELECT id, password FROM users WHERE username = ?");
    $stmt->bind_param("s", $username);
    $stmt->execute();
    $stmt->store_result();
    $stmt->bind_result($id, $hashed_password);
    $stmt->fetch();

    if ($stmt->num_rows == 1) {
        $_SESSION['user_id'] = $id;
        $_SESSION['username'] = $username;
        $cookie_name = "user_session";
        $cookie_value = session_id();
        $cookie_expiration = time() + (86400 * 30); // 30 days
        $cookie_path = "/";

        setcookie('user_id', $user_id, time() + (86400 * 30), "/"); // 86400 = 1 day
        header("Location: statistics.php");
        exit();
    } else {
        echo "$username with $password";
        echo "Invalid username or password.";
    }

    $stmt->close();
    $conn->close();
}


?>