// This script file is for loading the initial animations and setting up the game playfield.
// It is called by the index.html file.

const wordTiles = document.querySelectorAll(".wordtile");
const guessTiles = document.querySelectorAll(".guesstile");

window.addEventListener("load", function () {
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
