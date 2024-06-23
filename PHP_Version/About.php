<!DOCTYPE html>
<html lang="en">
  <head>
    <title>About</title>
    <link rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/boxicons@latest/css/boxicons.min.css">
  <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@400;600;700&display=swap"> 
    <link rel="stylesheet" href="styles/about.css" >
    <link rel="stylesheet" href="styles/header.css" >
    <!--<link rel="stylesheet" href="styles/footer.css" > -->
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
  
    <div class="content">
        
            <div class="main">
            <h2>Welcome to Auto Park Smart Explorer</h2>
            <p>APa - Auto Park Smart Explorer is an online application for users who want to easily find detailed information about auto parks in Romania using public data provided by DATA.GOV via an API REST/GraphQL. Statistics as well as generated visualizations will be exportable in CSV, WebP, and SVG formats.</p>
            <h3>Features:</h3>
            <ul>
                <li>Visualize and compare data about auto parks</li>
                <li>Use public data from DATA.PHP via API REST/GraphQL</li>
                <li>Statistics and comparisons based on multiple criteria</li>
                <li>Generate at least three types of visualizations</li>
                <li>Export visualizations in CSV, WebP and SVG formats</li>
            </ul>
            <h3>Technologies Used:</h3>
            <ul>
                <li>HTML</li>
                <li>CSS</li>
                <li>PHP/Python</li>
                <li>REST/GraphQL API</li>
                <li>Formats:CSV, WebP, and SVG</li>
            </ul>
            </div>
        
    </div>

    <script src="./script.js"></script>
    <script src="./navbar/main.js"></script>
        
  </body>
</html>