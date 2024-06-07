<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Montserrat&display=swap"
      rel="stylesheet"
    />
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.3.0/css/all.min.css"
      integrity="sha512-SzlrxWUlpfuzQ+pcUCosxcglQRNAq/DZjVsC0lE40xsADsfeQoEypE+enwcOiGjk/bSuGGKHEyjSoQ1zVisanQ=="
      crossorigin="anonymous"
      referrerpolicy="no-referrer"
    />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet">
    <link rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/boxicons@latest/css/boxicons.min.css">   
    <link rel="stylesheet" href="./styles/statistics.css">
    <link rel="stylesheet" href="./styles/header.css">
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <title>APa - Auto Park Smart Exporer</title>
  </head>
  <script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/canvas2svg"></script>
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
if (!isset($_SESSION['user_id'])&& !isset($_COOKIE['user_id'])) {
    header("Location: login.php");
    exit;
}

echo $_SESSION['username'];
?> <i class='bx bxs-user-detail' ></i>
      </a>
      </header>


    <div class="statistics-container">
      <div class="classroom-box">
        
        <label id="classroom-label">Tip Vehicul</label>
        <div class="select-box">
          <select id="select-classroom select-4">
            <option value="autobuz">Autobuz</option>
            <option value="autoturism">Autoturism</option>
              <option value="autovehicul">Autovehicul</option>
                <option value="remorca">Remorca</option>
                <option value="semiremorca">Semiremorca</option>
                <option value="autovehicul special">Autovehicul Special</option>
                <option value="autoutilitara">Autoutilitara</option>
                <option value="tractor">Tractor</option>
                <option value="automorcher">Automorcher</option>
                <option value="automobil mixt">Automobil Mixt</option>
          </select>
         </div>
        <label id="classroom-label">Judet</label>
        <div class="select-box">
         <select id="select-classroom select-2">
          <option value="Iasi">Iasi</option>
          <option value="Arad">Arad</option>
          <option value="Alba">Alba</option>
          <option value="Bistrita">Bistrita</option>
          <option value="Botosani">Botosani</option>
          <option value="Bacau">Bacau</option>
          <option value="Bihor">Bihor</option>
          <option value="Bucuresti">Bucuresti</option>
          <option value="Buzau">Buzau</option>
          <option value="Calarasi">Calarasi</option>
          <option value="Caras_Severin">Caras Severin</option>
          <option value="Brasov">Brasov</option>
          <option value="Cluj">Cluj</option>
          <option value="Dolj">Dolj</option>
          <option value="Galati">Galati</option>
          <option value="Giurgiu">Giurgiu</option>
         </select>
        </div>
        <label id="classroom-label">Categorie</label>
        <div class="select-box">
         <select id="select-classroom select-3">
          <option value="M1">M1</option>
          <option value="M2">M2</option>
          <option value="M3">M3</option>
          <option value="N1">N1</option>
          <option value="N2">N2</option>
          <option value="N3">N3</option>
          <option value="N2G">N2G</option>
          <option value="O1">O1</option>
          <option value="O2">O2</option>
          <option value="O3">O3</option>
          <option value="O4">O4</option>
          <option value="L1e">L1e</option>
          <option value="L3e">L3e</option>
          <option value="T1">T1</option>
          <option value="T2">T2</option>
          <option value="T3">T3</option>
          <option value="T4">T4</option>
          <option value="T5">T5</option>
         </select>
        </div>
        <div class="select-box">
          <label id="label-2">Data Visualization</label>
          <select id="select-2 vs">
            <option value="bar">Bar</option>
            <option value="doughnut">Doughnut</option>
            <option value="line">Line</option>
          </select>
        </div>
      </div>
      <div class="div-chart" id="chart-div">
        <canvas id="chart"> </canvas>
      </div>
      <div class="chart-options">
        <div class="select-box">
          <label id="label-1"><i class='bx bx-time-five'></i>Ani</label>
          <select id="select-1 years">
            <option value="2014">2014</option>
            <option value="2013">2013</option>
          </select>
        </div>
        
        <button class="results-button">Generate</button>
        <div class="export-box">
          <label id="export-label"><i class='bx bx-export'></i>Export Options</label>
          <select id="export-select">
            <option value="CSV">CSV</option>
            <option value="WebP">WEBP</option>
            <option value="SVG">SVG</option>
          </select>
        </div>
        <button class="export-button" id="export-button">Export</button>
      </div>
    </div>


    <script src="./scripts/statistics.js"></script>
    <script src="./scripts/main.js"></script>


  </body>


  
</html>
