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

    $stmt = $conn->prepare("SELECT id, password FROM users WHERE username = ? and password = ?");
    $stmt->bind_param("ss", $username, $password);
    $stmt->execute();
    $stmt->store_result();
    $stmt->bind_result($id, $hashed_password);
    $stmt->fetch();

    if ($stmt->num_rows == 1) {
        $_SESSION['user_id'] = $id;
        $_SESSION['username'] = $username;
        $cookie_name = "user_id";
        $cookie_value = session_id();
        $cookie_expiration = time() + (86400 * 2); // 2 days
        $cookie_path = "/";

        setcookie($cookie_name, $cookie_value, $cookie_expiration, $cookie_path); // 86400 = 1 day
        if ($username=='Admin'){
            header("Location: ../admin.php");
        } else {
        header("Location: ../statistics.php");
        }
        exit();
    } else {
        echo "$username with $password";
        echo "Invalid username or password.";
    }

    $stmt->close();
    $conn->close();
}


?>