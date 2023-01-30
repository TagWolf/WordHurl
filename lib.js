/*
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
*/

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
