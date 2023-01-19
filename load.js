// This script file is for loading the initial animations and setting up the game playfield.
// It is called by the index.html file.

const wordTilesContainer = document.querySelector('#wordtiles');
const guessTilesContainer = document.querySelector('#guesstiles');

// Get today's date
const today = new Date();
const day = today.getDate();
const month = today.getMonth() + 1;
const year = today.getFullYear();
// Get random number based on today's date
const randomNum = (day * month * year) % 1000;
// Get random word from words.js based on today's date
const randomWord = words[randomNum]; // This is the random word
console.log('randomWord', randomWord);

// Scramble characters of randomWord
function getRandomInt(n) {
  return Math.floor(Math.random() * n);
}
function shuffle(s) {
  var arr = s.split(''); // Convert String to array
  var n = arr.length; // Length of the array

  for (var i = 0; i < n - 1; ++i) {
    var j = getRandomInt(n); // Get random of [0, n-1]

    var temp = arr[i]; // Swap arr[i] and arr[j]
    arr[i] = arr[j];
    arr[j] = temp;
  }

  s = arr.join(''); // Convert Array to string
  return s; // Return shuffled string
}

console.log(randomNum);
scrambledWord = shuffle(randomWord);
console.log(scrambledWord);

scrambledWord.split('').forEach((letter, i) => {
  const wordTile = document.createElement('button');
  wordTile.classList.add('wordtile', 'hidden');
  wordTile.dataset.guesses = '';
  wordTile.dataset.index = i;
  if (i === 0) {
    wordTile.classList.add('selected');
  }
  wordTilesContainer.append(wordTile);

  const guessTile = document.createElement('button');
  guessTile.classList.add('guesstile', 'hidden');
  guessTile.dataset.index = i;
  guessTile.dataset.letter = letter;
  guessTile.innerText = letter;
  guessTilesContainer.append(guessTile);
});

window.addEventListener('load', function () {
  const wordTiles = document.querySelectorAll('.wordtile');
  const guessTiles = document.querySelectorAll('.guesstile');

  this.setTimeout(() => {
    wordTiles.forEach((wordTile, i) => {
      setTimeout(() => {
        wordTile.classList.remove('hidden');
      }, 200 * i);
    });
  }, 1000);
  this.setTimeout(() => {
    guessTiles.forEach((guessTile, i) => {
      setTimeout(() => {
        guessTile.classList.remove('hidden');
      }, 200 * i);
    });
  }, 3000);
});
