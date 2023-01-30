// Script to hide/show How To Play
// TODO: Move to a separate UI / nav script file
var howToPlayToggle = document.querySelector(".how-to-play-toggle");
var howToPlayContent = document.querySelector(".how-to-play-content");
howToPlayToggle.addEventListener("click", function (event) {
  if (howToPlayContent.style.display == "") {
    howToPlayContent.style.display = "none";
  } else {
    howToPlayContent.style.display = "";
  }
});

//
function getISODate() {
  return new Date().toISOString().split('T')[0];
}

// UTILITY COOKIE FUNCTIONS
function getCookie(name) {
  var v = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
  return v ? v[2] : null;
}
function setCookie(name, value, days) {
  var d = new Date;
  d.setTime(d.getTime() + 24*60*60*1000*days);
  document.cookie = name + "=" + value + ";path=/;expires=" + d.toGMTString();
}
function deleteCookie(name) { setCookie(name, '', -1); }