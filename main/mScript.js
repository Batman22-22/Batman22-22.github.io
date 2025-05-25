//header for page
function writetext(text = "") {
      let charIndex = 0;
      const writetextDiv = document.getElementById('writetext');
      writetextDiv.innerHTML = '';

      function displayNextChar() {
        if (charIndex < text.length) {
          writetextDiv.appendChild(document.createTextNode(text[charIndex]));
          charIndex++;
          const randomInterval = Math.floor(Math.random() * (200 - 50 + 1)) + 50;
          setTimeout(displayNextChar, randomInterval);
        }
      }
      displayNextChar();
    }

    document.addEventListener('DOMContentLoaded', function () {
      const writetextDiv = document.getElementById('writetext');
      const textFromHTML = writetextDiv.getAttribute('data-text') || "";
      writetext(textFromHTML);
    });

// navbar for page
document.addEventListener("DOMContentLoaded", function () {
  const navbarHTML = `
<nav class="navbar navbar-expand-sm navbar-dark sticky-top">
  <a class="navbar-brand" href="../">
    <img src="../pictures/panlogo.jpg" id="logo" alt="">
  </a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="collapsibleNavbar">
    <ul class="navbar-nav">
      <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle text-center w-100" href="#" id="navbardrop1" data-toggle="dropdown">Home</a>
        <div class="dropdown-menu">
          <a class="dropdown-item" href="../#about">Link 1</a>
          <a class="dropdown-item" href="../#">Link 2</a>
          <a class="dropdown-item" href="../#">Link 3</a>
        </div>
      </li>
      <li class="nav-item dropdown">
      <a class="nav-link dropdown-toggle text-center w-100" href="#" id="navbardrop2" data-toggle="dropdown">Work</a>
      <div class="dropdown-menu">
      <a class="dropdown-item" href="../Work/#walmart">Walmart</a>
      <a class="dropdown-item" href="../Work/#kelly">Kelly Education</a>
          <h5 class="dropdown-header">--Volunteer work--</h5>
          <a class="dropdown-item" href="../Work/#visions">Visions of Hope</a>
        </div>
      </li>
      <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle text-center w-100" href="#" id="navbardrop3" data-toggle="dropdown">Education</a>
        <div class="dropdown-menu">
          <a class="dropdown-item" href="../school/#high">Vineland High School</a>
          <a class="dropdown-item" href="../school/#ccc">Cumberland County College</a>
          <a class="dropdown-item" href="../school/#ru">Rowan University</a>
          <a class="dropdown-item" href="../Work/#club">Clubs and Activities</a>
        </div>
      </li>
      <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle text-center w-100" href="#" id="navbardrop4" data-toggle="dropdown">Projects</a>
        <div class="dropdown-menu">
          <a class="dropdown-item" href="../Projects/index.html#Calender-Quest">Calender Quest</a>
          <a class="dropdown-item" href="../Projects/index.html#Candle-Climber">Candle Climber</a>
        </div>
      </li>
      <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle text-center w-100" href="#" id="navbardrop5" data-toggle="dropdown">Questions</a>
        <div class="dropdown-menu">
          <a class="dropdown-item" href="../Questions/#">Ask a Question</a>
          <a class="dropdown-item" href="../Questions/#">Asked Questions</a>
          <!-- <a class="dropdown-item" href="../Questions/#">Link 3</a> -->
        </div>
      </li>
    </ul>
  </div>
</nav>
  `;
  document.getElementById("navbar-placeholder").innerHTML = navbarHTML;
});

// footer
document.addEventListener("DOMContentLoaded", function () {
  const footerHTML = `
<footer>
    <a href="../"><img src="../pictures/panlogo.jpg" style="height: 5vw; border-radius: 10%;" alt=""></a>
    <a href="../">Home</a>|
    <a href="../Work/">Work</a>|
    <a href="../school/">Education</a>|
    <a href="../Projects/">Projects</a>|
    <a href="../Questions/">Questions</a>
    <!-- <a href="#">this</a> -->
    <br>
    <a href="mailto:jjfearon64@gmail.com"> <i class="far fa-envelope-open"></i> jjfearon64@gmail.com</a>
    <br>
    <a href="https://github.com/Batman22-22" target="_blank"><i class="fab fa-github-square"></i></a>
    <a href="https://www.linkedin.com/in/justinfearon64/" target="_blank"><i class="fab fa-linkedin"></i></a>
    <!-- <a href="#"><i class="fab fa-facebook"></i></a>
      <a href="#"><i class="fab fa-instagram"></i></a> -->
    <!-- <p>&copy; 2024 Calendar Quest</p> -->
  </footer>
  `;
  document.getElementById("footer-placeholder").innerHTML = footerHTML;
});



$(document).ready(function(){
  $('[data-toggle="tooltip"]').tooltip();
});

