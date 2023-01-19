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