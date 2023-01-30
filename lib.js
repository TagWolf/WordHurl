// General library and UI functions for WordHurl

//
function getISODate() {
  return new Date().toISOString().split("T")[0];
}

// UTILITY COOKIE FUNCTIONS
function getCookie(name) {
  var v = document.cookie.match("(^|;) ?" + name + "=([^;]*)(;|$)");
  return v ? v[2] : null;
}
function setCookie(name, value, days) {
  var d = new Date();
  d.setTime(d.getTime() + 24 * 60 * 60 * 1000 * days);
  document.cookie = name + "=" + value + ";path=/;expires=" + d.toGMTString();
}
function deleteCookie(name) {
  setCookie(name, "", -1);
}

// MODAL FUNCTIONS
// TODO: Create modal for How To Play
// Get the modals
var gameOverModal = document.getElementById("gameover-modal");
var howToPlayModal = document.getElementById("howtoplay-modal");

// Get the <span> element that closes the modal
var modalClose = document.getElementsByClassName("modal-close")[0];

// Open Modal Buttons
// How to Play Button
howToPlayModalButton = document.getElementById("howtoplay-modal-button");
howToPlayModalButton.onclick = function () {
  howToPlayModal.style.display = "block";
};

gameOverModalButton = document.getElementById("gameover-modal-button");
gameOverModalButton.onclick = function () {
  gameOverModal.style.display = "block";
};

// When the user clicks on <span> (x), close modals
modalClose.onclick = function () {
  howToPlayModal.style.display = "none";
  gameOverModal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == gameOverModal || event.target == howToPlayModal) {
    howToPlayModal.style.display = "none";
    gameOverModal.style.display = "none";
  }
};
