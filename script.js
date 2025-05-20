//header for page
document.addEventListener('DOMContentLoaded', function (event) {

  function writetext(text = '      All My Projects') {
    var charIndex = 0;
    document.getElementById('writetext').innerHTML = '';
    function displayNextChar() {
      if (charIndex < text.length) {
        var writetext = document.getElementById('writetext');
        writetext.appendChild(document.createTextNode(text[charIndex]));
        charIndex += 1;
        var randomInterval = Math.floor(Math.random() * (20 - 5 + 9)) + 90; // Random interval between 50ms and 200ms
        setTimeout(displayNextChar, randomInterval);
      }
    }
    displayNextChar();
  };
  writetext();
});


// buttons  for Calender Quest
document.getElementById("calenderbutton1").onclick = function () {
  window.open("https://batman22-22.github.io/Calender-Quest/Capstone/welcome/");
};

document.getElementById("calenderbutton2").onclick = function () {
  window.open("https://github.com/Batman22-22/Calender-Quest.git");
};

$("#hideCalender").click(function () {
  $("#calender").hide();
  $("#showCalender").css("display", "");
});

$("#showCalender").click(function () {
  $("#calender").show();
  $("#showCalender").css("display", "none");
});



// buttons for Candle Climber
document.getElementById("candlebutton1").onclick = function () {
  window.open("https://blank.page/");
};

document.getElementById("candlebutton2").onclick = function () {
  window.open("https://blank.page/");
};

$("#hideCandle").click(function () {
  $("#candle").hide();
  $("#showCandle").css("display", "");
});

$("#showCandle").click(function () {
  $("#candle").show();
  $("#showCandle").css("display", "none");
});

