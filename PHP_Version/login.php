<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <title>Login</title>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@400;600;700&display=swap"> 
        <link rel="stylesheet" href="./styles/header.css" >
        <link rel="stylesheet" href="./styles/login.css" >
        <link rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/boxicons@latest/css/boxicons.min.css">
        <meta name="viewport" content="width=device-width, initial-scale=1">

    </head>

    <body>
      
      <header>
        <a href="#" class="logo">
          <i class='bx bxs-car' ></i>APa
        </a>
        <div class="bx bx-menu" id="menu-icon"></div>
        
        <ul class="navbar">
            <li><a href="#"><i class='bx bx-question-mark'></i>About</a></li>
              <li><a href="#"><i class='bx bxs-contact' ></i>Contact</a></li>
            <li><a href="#"><i class='bx bx-cog' ></i>Security and Policy</a></li>
            <li><a href="#" ><i class='bx bx-stats' ></i>Statistics</a></li>
        </ul>
          <a href="#" class="btn">
            Log in <i class='bx bxs-user-detail' ></i>
          </a>
      </header>
      
          <div class="content">
            <form method="post" action="api/login-system.php">
              <div class="box">
                  <div class="img">
                      <img src="./resources/logo_car.png" alt="Car Icon" style="width:33%; height:25%">
                  </div>
      
                  <h1>LOG IN</h1>
      
                  <div class="container">
                      <label for="username">Username</label><br>
                      <input type="text" id="username" placeholder="Enter username" name="username"><br><br>
      
                      <label for="password">Password</label><br>
                      <input type="password" id="password" placeholder="Enter password" name="password"><br><br>
      
                      <button type="submit">Login</button>
                  </div>
              </div>
            </form>
          </div>

          <script src="./script.js"></script>
          <script src="./scripts/main.js"></script>

    </body>
</html>