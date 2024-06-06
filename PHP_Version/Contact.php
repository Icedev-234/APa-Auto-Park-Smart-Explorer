<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <title>Contact</title>
    <link rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/boxicons@latest/css/boxicons.min.css">
  <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="./styles/header.css">
    <link rel="stylesheet" href="./styles/contact.css">

    <!-- Pune iconitele la header-->
    <link rel="stylesheet"
    href="https://cdn.jsdelivr.net/npm/boxicons@latest/css/boxicons.min.css">

    <meta name="viewport" content="width=device-width, initial-scale=1">

</head>

<body style="background-image: url('./resources/back_ground.png')">
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
if (!isset($_SESSION['user_id'])&& !isset($_COOKIE['user_id'])) {
    header("Location: login.php");
    exit;
}

echo $_SESSION['username'];
?> <i class='bx bxs-user-detail' ></i>
      </a>
    </header>

    <div class="content">
        <form method="post">
            <div class="box">
                <div class="img">
                    <img src="./resources/logo_car.png" alt="Logo" style="width:29%; height:19%">
                </div>

                <h1>Contact Us</h1>

                <div class="container">
                    <label>Rosca Victor</label><br>
                    <a  href="https://github.com/Icedev-234/APa-Auto-Park-Smart-Explorer"> roscavictor2000@gmail.com </a><br><br>
                    
                    <label>Rotaru Alex</label><br>
                    <a href="https://github.com/Icedev-234/APa-Auto-Park-Smart-Explorer"> Alexrotari740@gmail.com </a><br><br>
                </div>
            </div>
        </form><br><br>
    </div>
    <script src="./scripts/main.js"></script>
</body>

</html>