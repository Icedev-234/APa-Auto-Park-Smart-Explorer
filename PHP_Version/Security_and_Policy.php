<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@400;600;700&display=swap"> 
        <link rel="stylesheet" href="./styles/header.css" >
        <link rel="stylesheet" href="./styles/security_and_policy.css" >
        <link rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/boxicons@latest/css/boxicons.min.css">
  <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet">
    <title>Security and Policy</title>
</head>
<body>
    
    <header>
        <a href="#" class="logo">
          <i class='bx bxs-car' ></i>APa
        </a>
        <div class="bx bx-menu" id="menu-icon"></div>
        
          <ul class="navbar">
            <li><a href="./About.php"><i class='bx bx-question-mark'></i>About</a></li>
              <li><a href="./Contact.php"><i class='bx bxs-contact' ></i>Contact</a></li>
            <li><a href="./Security_and_Policy.php"><i class='bx bx-cog' ></i>Security and Policy</a></li>
            <li><a href="./statistics.php" ><i class='bx bx-stats' ></i>Statistics</a></li>
        </ul>
        <a href="api/logout.php" class="btn">
          <?php
include 'api/login-system.php';
if ((!isset($_SESSION['user_id'])|| ($_SESSION['username']=='Admin'))|| !isset($_COOKIE['user_id'])) {
  header("Location: login.php");
  exit;
}

echo $_SESSION['username'];
?> <i class='bx bxs-user-detail' ></i>
          </a>
      </header>
      <div class=content>
        <form method="post" action="api/Security_and_Policy_System.php">
            <div class="box">
                <h1>Change your password</h1>
                <div class="container">
                    <label for="current_password">Current Password</label><br>
                    <input type="password" id="current_password" placeholder="Enter current password" name="current_password"><br><br>

                    <label for="new_password">New Password</label><br>
                    <input type="password" id="new_password" placeholder="Enter new password" name="new_password"><br><br>

                    <label for="confirm_password">Confirm New Password</label><br>
                    <input type="password" id="confirm_password" placeholder="Confirm new password" name="confirm_password"><br><br>

                    <button type="submit">Save</button>

                    <p id="responseMessage"></p>
                </div>
            </div>
        </form>
      </div>
      <script src="./scripts/main.js"></script>
      <script src="./scripts/Security_And_Policy.js"></script>
</body>
</html>