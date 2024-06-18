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
        
        
          <a href="login.php" class="btn">
            Log in <i class='bx bxs-user-detail' ></i>
          </a>
      </header>
      
          <div class="content">
            <form method="post" id="registerForm">
              <div class="box">
                  <div class="img">
                      <img src="./resources/logo_car.png" alt="Car Icon" style="width:33%; height:25%">
                  </div>
      
                  <h1>REGISTER</h1>
      
                  <div class="container">
                      <label for="username">Username</label><br>
                      <input type="text" id="username" placeholder="Enter username" name="username"><br><br>
      
                      <label for="password">Password</label><br>
                      <input type="password" id="password" placeholder="Enter password" name="password"><br><br>
      
                      <button type="submit">Register</button><br><br>
                      <h2>If you already have an account <a href="login.php">Log In Here</a></h2>
                  </div>
              </div>
            </form>
          </div>

          <script src="./scripts/register.js"></script>
          <script src="./scripts/main.js"></script>

    </body>
</html>