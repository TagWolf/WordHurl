// This script file is for loading the initial animations and setting up the game playfield.
// It is called by the index.html file.

const wordTilesContainer = document.querySelector("#wordtiles");
const guessTilesContainer = document.querySelector("#guesstiles");

// Select randomWord based on date
const date = new Date();
const day = date.getDate();
const month = date.getMonth();
const year = date.getFullYear();
const randomIndex = (day + month + year) % words.length;

console.log("words.length", words.length);
console.log("randomIndex", randomIndex);

const randomWord = words.at(randomIndex)[1][0]; // This is the random word
const scrambledWord = words.at(randomIndex)[2][0]; // This is the scrambled word

console.log("randomWord", randomWord);
console.log("scrambledWord", scrambledWord);

scrambledWord.split("").forEach((letter, i) => {
  const wordTile = document.createElement("button");
  wordTile.classList.add("wordtile", "hidden");
  wordTile.dataset.guesses = "";
  wordTile.dataset.index = i;
  if (i === 0) {
    wordTile.classList.add("selected");
  }
  wordTilesContainer.append(wordTile);

  const guessTile = document.createElement("button");
  guessTile.classList.add("guesstile", "hidden");
  guessTile.dataset.index = i;
  guessTile.dataset.letter = letter;
  guessTile.innerText = letter;
  guessTilesContainer.append(guessTile);
});

window.addEventListener("load", function () {
  const wordTiles = document.querySelectorAll(".wordtile");
  const guessTiles = document.querySelectorAll(".guesstile");

  this.setTimeout(() => {
    wordTiles.forEach((wordTile, i) => {
      setTimeout(() => {
        wordTile.classList.remove("hidden");
      }, 200 * i);
    });
  }, 1000);
  this.setTimeout(() => {
    guessTiles.forEach((guessTile, i) => {
      setTimeout(() => {
        guessTile.classList.remove("hidden");
      }, 200 * i);
    });
  }, 3000);
});
