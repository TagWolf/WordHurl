// Main WordHurl script

// IMPORTANT Next TODO Items
// =========================
//
// DEVELOPMENT PHASE I - MUST BE COMPLETED BEFORE 01/30/2023
//

// TODO: When a wordTile is selected, show stored hits and misses unique to that wordTile only
// TODO: To increase fun and risk, add a maximum number of guesses per game based on word length. E.g. 3 guesses for 3 letter words, 4 guesses for 4 letter words, etc.
// TODO: Track remaining misses and update "Misses Remaining" UI and CSS
// TODO: Check if all guesstiles are correct (Win Condition)
// TODO: Countdown to next game (Midnight localtime) unlock on score window/modal (see wordle)
// TODO: Reset / New game / reload button in win modal when new game available (timer at 00:00)
// TODO: Check if player has already played today and show previously solved game & score if so (must survive browser close / reload)
//
// DEVELOPMENT PHASE II - MUST BE COMPLETED BEFORE 02/01/2023
//
// TODO: Add modifier variable to add or subtract from maximum number of misses
// TODO: Allow guessTile selection via keyboard (A-Z). If multiple guessTiles of same letter, choose the first available
// TODO: Code cleanup, make everything a function where possible.
// TODO: Ensure good comments throughout code and all functions
// TODO: Track score (number of guesses, number of misses, number of hits, number of correct guesses, word length, etc.)
// TODO: Animate hits and misses (color fade in with increased saturation/alpha and then lower to final color and scale/bounce on hit, shake on miss?)
// TODO: Animate miss remaining count with scale and fade (or whatever looks good)
// TODO: Show quick shake / error animation if guesstile is clicked before a wordtile is selected
// TODO: Don't show selection marquee on guesstiles if a wordtile isn't selected
// TODO: Animate Win (wave pattern from left to right scaling up and down on completed word tiles)
// TODO: Ensure random word selection based on day is working and won't duplicate words picked any time soon
// TODO: Rename script files to more meaningful names.
// TODO: Fix UI scaling. Needs to factor in height more than width for scaling purposes.
// TODO: Display score modal and new game countdown timer on win (see wordle as example)
// TODO: Admin page to show upcoming words and scrambled tiles for next X days with ability to delete word from rotation
//
// DEVELOPMENT PHASE III
//
// TODO: Track history
// TODO: Animate history, prev history should slide down, then deal new history row like page load does
// TODO: Possily scramble words.js (especially scrambled tiles) to make it harder to cheat (or just use a server side database)
// TODO: Add configuration variables for things like selecting the first tile by default on load, colors, animation types/rates, and other ui/ux things that would be likely to tweek
// TODO: Day/Night Theme based on time of day. E.g. Day theme is light colors, night theme is dark colors (current)
//
// DEVELOPMENT PHASE IIII
//
// TODO: To prevent cheating, change this to server side by having the python script generate one randomWord and scrambleWord at midnight
// TODO: In the future, enhance WordHurl by using server side sqlite database for handling words, scores, etc.
// TODO: Create score graph
// TODO: Display score graph window/modal on win
// TODO: 508 Compliance (Alt text for misses remaining, etc.)
// TODO: Better phone browser support and UI scaling
// TODO: Add support for other languages
// TODO: Admin portal
//
// COMPLETED DEVELOPMENT ITEMS
//
// DONE: When a wordTile is matched, the next wordTile to the right should be selected automatically
// DONE: When a guessTile hits (matches), it should prevent additional guesses on it
// DONE: When a guessTile misses, it should become disabled ONLY in the context of the selected wordTile to prevent additional guesses on it while that wordTile is selected
// DONE: Load word and scrambled tiles from data\words.py
// DONE: From words.py Pick word and scrambled from array in order based on date
// DONE: Check guessTile vs selected wordTile as an index of randomWord
// DONE: Store hits and misses mapped from guessTile to wordTile
// DONE: Allow wordTile selection via arrow keys (and number keys?)
// DONE: Fix first tile "deal" animation not showing due to its' automatic selection on load

const GUESS_TILE_CLASS = 'guesstile';
const GUESS_TILE_MATCHED_CLASS = 'matched';

const WORD_TILE_CLASS = 'wordtile';
const WORD_TILE_MATCHED_CLASS = 'matched';
const WORD_TILE_SELECTED_CLASS = 'selected';

// Word tile selection
wordTilesContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains(WORD_TILE_CLASS)) {
    const isUnselected = !e.target.classList.contains(WORD_TILE_SELECTED_CLASS);

    unselectWordTile();
    if (isUnselected) {
      selectWordTile(e.target);
    }
  }
});

// Guess tile selection
guessTilesContainer.addEventListener("click", (e) => {
  const classList = e.target.classList;
  const selectedWordTile = getSelectedWordTile();
  if (
    !classList.contains(GUESS_TILE_CLASS) ||
    classList.contains(GUESS_TILE_MATCHED_CLASS) ||
    classList.contains("miss") ||
    !selectedWordTile
  ) {
    return;
  }

  // Check guess hit / miss
  const { index } = selectedWordTile.dataset;
  const { letter } = e.target.dataset;
  console.log("clicked on:", letter, index);
  if (letter === randomWord[index]) {
    e.target.classList.add(GUESS_TILE_MATCHED_CLASS);
    selectedWordTile.classList.add(WORD_TILE_MATCHED_CLASS);
    selectedWordTile.innerText = letter;

    // TODO: check win condition

    // if not (win) 
    selectNextAvailableTile();
  } else {
    addGuessToWordTile(selectedWordTile, letter);
    e.target.classList.add("miss");
  }
});

// If click is not on a wordtile or guess tile then remove the selected class from all word tiles
document.addEventListener("click", (e) => {
  if (
    !e.target.classList.contains(WORD_TILE_CLASS) &&
    !e.target.classList.contains(GUESS_TILE_CLASS)
  ) {
    unselectWordTile();
  }
});

document.addEventListener('keydown', ({ key }) => {
  switch (key) {
    case 'ArrowRight':
      selectNextAvailableTile();
      break;
    case 'ArrowLeft':
      selectPreviousAvailableTile();
      break;
    default:
      if (key.match(/[a-z]/i)) { guessLetter(key.toUpperCase()); }
      break;
  }
});

// Track guess mapping to word tile
function addGuessToWordTile(tile, letter) {
  const { guesses } = tile.dataset;
  tile.dataset.guesses = !guesses ? letter : `${guesses},${letter}`;
}

function getWordTiles() {
  return wordTilesContainer.querySelectorAll(`.${WORD_TILE_CLASS}`);
}

function getSelectedWordTile() {
  return wordTilesContainer.querySelector(`.${WORD_TILE_SELECTED_CLASS}`);
}

function wasLetterAlreadyGuessed(tile, letter) {
  return tile.dataset.guesses.split(",").includes(letter);
}

function selectWordTile(tile) {
  const { guesses } = tile.dataset;
  tile.classList.add(WORD_TILE_SELECTED_CLASS);
  const previousGuesses = guesses.split(",");
  const letters = guessTilesContainer.querySelectorAll(`.${GUESS_TILE_CLASS}`);

  [].forEach.call(letters, (el) => {
    if (previousGuesses.includes(el.dataset.letter)) {
      el.classList.add("disallowed");
    }
  });
}

function unselectWordTile() {
  const tile = getSelectedWordTile();
  if (tile) {
    tile.classList.remove(WORD_TILE_SELECTED_CLASS);
    const disallowed = guessTilesContainer.querySelectorAll(".disallowed");
    [].forEach.call(disallowed, (letter) =>
      letter.classList.remove("disallowed")
    );
  }
}

function selectNextAvailableTile() {
  const allWordTiles = [...getWordTiles()];
  const selectedWordTile = getSelectedWordTile();
  const dataset = selectedWordTile?.dataset;
  unselectWordTile();

  // check for a word tile still available to select
  if (!allWordTiles.some((tile) => !tile.classList.contains(WORD_TILE_MATCHED_CLASS))) {
    console.log('no letter available to selectNextAvailableTile');
    return;
  }

  let indexToCheck = (Number(dataset?.index) + 1) % allWordTiles.length;
  if (isNaN(indexToCheck)) { indexToCheck = 0; }
  for (let i = 0; i < allWordTiles.length; i++) {
    if (!allWordTiles[indexToCheck].classList.contains(WORD_TILE_MATCHED_CLASS)) {
      selectWordTile(allWordTiles[indexToCheck]);
      return;
    }
    indexToCheck++;
    if (indexToCheck === allWordTiles.length) {
      indexToCheck = 0;
    };
  }
}

function selectPreviousAvailableTile() {
  const allWordTiles = [...getWordTiles()];
  const selectedWordTile = getSelectedWordTile();
  const dataset = selectedWordTile?.dataset;
  unselectWordTile();

  // check for a word tile still available to select
  if (!allWordTiles.some((tile) => !tile.classList.contains(WORD_TILE_MATCHED_CLASS))) {
    console.log('no letter available to selectPreviousAvailableTile');
    return;
  }

  let indexToCheck = Number(dataset?.index) - 1;
  if (isNaN(indexToCheck) || indexToCheck === -1) { indexToCheck = allWordTiles.length - 1; }
  for (let i = 0; i < allWordTiles.length; i++) {
    if (!allWordTiles[indexToCheck].classList.contains(WORD_TILE_MATCHED_CLASS)) {
      selectWordTile(allWordTiles[indexToCheck]);
      return;
    }
    indexToCheck--;
    if (indexToCheck < 0) {
      indexToCheck = allWordTiles.length - 1;
    };
  }
}

function guessLetter(letter) {
  console.log('guessLetter', letter);
}