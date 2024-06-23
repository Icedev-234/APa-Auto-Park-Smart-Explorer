<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="preconnect" href="https://fonts.googleapis.com" >
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin >
    <link
      href="https://fonts.googleapis.com/css2?family=Montserrat&display=swap"
      rel="stylesheet"
    >
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.3.0/css/all.min.css"
      integrity="sha512-SzlrxWUlpfuzQ+pcUCosxcglQRNAq/DZjVsC0lE40xsADsfeQoEypE+enwcOiGjk/bSuGGKHEyjSoQ1zVisanQ=="
      crossorigin="anonymous"
      referrerpolicy="no-referrer"
    >
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet">
    <link rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/boxicons@latest/css/boxicons.min.css">   
    <link rel="stylesheet" href="./styles/admin.css" >
    <link rel="stylesheet" href="./styles/header.css" >
    <title>APa - Auto Park Smart Exporer</title>
</head>
<body>
  <?php 
  include 'api/login-system.php';
  if ((!isset($_SESSION['user_id'])|| ($_SESSION['username']!='Admin'))|| !isset($_COOKIE['user_id'])) {
    header("Location: login.php");
    exit();
  }
  
  ?>
    <header>
        <a href="#" class="logo">
          <i class='bx bxs-car' ></i>APa
        </a>
        <div class="bx bx-menu" id="menu-icon"></div>
        
        <ul class="navbar">
          <li><a href="./admin.php"><i class='bx bx-data' ></i>Parking Data</a></li>
          <li><a href="./admin-users.php" ><i class='bx bx-group'></i>Users Data</a></li>
      </ul>
        <a href="api/logout.php" class="btn">
          Admin <i class='bx bxs-user-detail' ></i>
        </a>
        </header>
        <div id="main">
            <div class="users-container">
              <h1>Welcome, Admin!</h1>
              <div class="table-control">
                <div class="buttons">
                <button id="int1" class="btn active" >2013-2014</button>
                <button id="int2">2015-2016</button>
                <button id="int3">2017</button>
                </div>
                </div>
              <div class="table-container">
                <table id="user-table">
                  <thead>
                    
                    <tr>
                      <th>ID</th>
                      <th>Judet</th>
                      <th>Categorie Nationala</th>
                      <th>Categorie Comunitara</th>
                      <th>Marca</th>
                      <th>Descriere Comerciala</th>
                      <th>An</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    
                  </tbody>
                </table>

                <div class="table-control">
                <button id="previous" class="btn">Previous</button>
                <div class="buttons">
                <button id="btn1" class="btn active" ></button>
                </div>
                <button id="next" class="btn">Next</button>
                </div>
              </div>
            </div>
          </div>
       <script src="./scripts/main.js"></script>
       <script src="./scripts/admin.js"></script>
</body>
</html>