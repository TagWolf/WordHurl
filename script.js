// Main WordHurl script

// TODO
//
// * Update the word tile buttons based on today's word
// * Fix randomization based on today's date
// * Create a scrambled set of guess tiles from today's word and based on todays date's seed
// * Check if selected wordtile matches clicked guesstiles OR typed guesstile letter
// * Animate hit or miss and store set miss on the guess tile MAPPED to the selected wordtile only
// * If guesstile is right, indicate that and disable that tile from future selection
// * If hit / correct, automatically move selection to next wordtile on the right (allows typing solution)
// * show animation if guesstile is clicked before a wordtile is selected
// * don't show marquee from guesstiles if wordtile isn't selected
// * Check if all guesstiles are correct
// * track score (number of guesses, number of misses, number of hits, number of correct guesses, word lenght, etc.)
// * create score gph
// * track history
// * animate history, prev history should slide down, then deal new history row like page load does
// * slide animate history below playfield
// * Animate win
// * display score and graphs on win
// * countdown to next game unlock (see wordle)
// * reset / new game
// * WHEN POSSIBLE, MAKE EVERYTHING A FUNCTION
// * Also ensure tab switches between wordtiles
// * Add customization for random word selection (min/max of common letters/word difficulty, min/max # of repeating characters, min/max # of vowels, min/max # of consonants, etc.)
// * optimize javascript and reduce wordlist size
// * React?? switch to sqlite for wordlist and archive tracking (see wordhurl-junkfiles for wordhurl.sqlite3 file)
// * Rename script files to more meaningful names. E.g. wordhurlLoader.js,

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

// TODO: Create random seed function
// Resource: https://github.com/davidbau/seedrandom
// Resource: https://stackoverflow.com/questions/521295/seeding-the-random-number-generator-in-javascript

// TODO: Use randomSeed to pick a randomWord from words based on today's date

// TODO: Use randomSeed to scramble randomWord to generate guessTiles

// TODO: Add guessTile button with characters from randomWord

// TODO: Enhance guess function to handle comparing guessTile clicked or typed with today's word

// TODO: Handle scoring on hits / miss

// POSSIBLE TODO: In the future, enhance WordHurl by using server side sqlite database for handling words, scores, etc.

// TODO: Add parameters to picking the word (See todo items at top of this script)

// Word tile selection
wordTilesContainer.addEventListener('click', (e) => {
  if (e.target.classList.contains('wordtile')) {
    if (e.target.classList.contains('selected')) {
      e.target.classList.remove('selected');
    } else {
      wordTilesContainer
        .querySelector('.selected')
        ?.classList.remove('selected');
      e.target.classList.add('selected');
    }
  }
});

guessTilesContainer.addEventListener('click', (e) => {
  const classList = e.target.classList;
  const selectedWordTile = wordTilesContainer.querySelector('.selected');
  if (
    !classList.contains('guesstile') ||
    classList.contains('matched') ||
    classList.contains('miss') ||
    !selectedWordTile
  ) {
    return;
  }

  const { index } = selectedWordTile.dataset;
  const { letter } = e.target.dataset;
  console.log('clicked on:', letter, index);
  if (letter === randomWord[index]) {
    // TODO: Change to function calls
    e.target.classList.add('matched');
    selectedWordTile.classList.add('matched');
    selectedWordTile.innerText = letter;
  } else {
    e.target.classList.add('miss');
  }
  selectedWordTile.classList.remove('selected');
});

// If click is not on a wordtile or guess tile then remove the selected class from all word tiles
document.addEventListener('click', (e) => {
  if (
    !e.target.classList.contains('wordtile') &&
    !e.target.classList.contains('guesstile')
  ) {
    wordTiles.forEach((wordTile) => {
      wordTile.classList.remove('selected');
    });
  }
});
