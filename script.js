// Main WordHurl script

// IMPORTANT Next TODO Items
// =========================
//
// DEVELOPMENT PHASE I - MUST BE COMPLETED BEFORE 02/01/2023
//
// TODO: When a wordTile is selected, show stored hits and misses unique to that wordTile only
// TODO: When a wordTile is matched, the next wordTile to the right should be selected automatically
// TODO: Allow guessTile selection via keyboard (A-Z). If multiple guessTiles of same letter, choose the first available
// TODO: Allow wordTile selection via arrow keys (and number keys?)
// TODO: To increase fun and risk, add a maximum number of guesses per game based on word length. E.g. 3 guesses for 3 letter words, 4 guesses for 4 letter words, etc.
// TODO: Add modifier variable to add or subtract from maximum number of misses
// TODO: Track remaining misses and update "Misses Remaining" UI and CSS
// TODO: Check if all guesstiles are correct (Win Condition)
// TODO: Countdown to next game unlock on score window/modal (see wordle)
// TODO: Reset / New game / reload button when new game available
// TODO: Check if player has already played today and show previously solved game if so (must survive browser close / reload)
// TODO: Ensure random word selection based on day is working and won't duplicate words picked any time soon
//
// DEVELOPMENT PHASE II - MUST BE COMPLETED BEFORE 02/01/2023
//
// TODO: Code cleanup, make everything a function where possible.
// TODO: Animate hits and misses (color fade in with increased saturation/alpha and then lower to final color and scale/bounce on hit, shake on miss?)
// TODO: Animate miss remaining count with scale and fade (or whatever looks good)
// TODO: Show quick shake / error animation if guesstile is clicked before a wordtile is selected
// TODO: Don't show selection marquee on guesstiles if a wordtile isn't selected
// TODO: Animate Win (wave pattern from left to right scaling up and down on completed word tiles)
// TODO: Fix first tile "deal" animation not showing due to its' automatic selection on load
// TODO: Rename script files to more meaningful names. E.g. wordhurlLoader.js,
// TODO: Fix UI scaling. Needs to factor in height more than width for scaling purposes.
// TODO: Track score (number of guesses, number of misses, number of hits, number of correct guesses, word length, etc.)
// TODO: Create score graph
// TODO: Display score and graphs window/modal on win
//
// DEVELOPMENT PHASE III
//
// TODO: Track history
// TODO: Animate history, prev history should slide down, then deal new history row like page load does
// TODO: Add configuration variables for things like selecting the first tile by default on load, colors, animation types/rates, and other ui/ux things that would be likely to tweek
//
// DEVELOPMENT PHASE IIII
//
// TODO To prevent cheating, change this to server side by having the python script generate one randomWord and scrambleWord at midnight
// TODO: In the future, enhance WordHurl by using server side sqlite database for handling words, scores, etc.
//
// COMPLETED DEVELOPMENT ITEMS
//
// DONE: When a guessTile hits (matches), it should prevent additional guesses on it
// DONE: When a guessTile misses, it should become disabled ONLY in the context of the selected wordTile to prevent additional guesses on it while that wordTile is selected
// DONE: Load word and scrambled tiles from data\words.py
// DONE: From words.py Pick word and scrambled from array in order based on date
// DONE: Check guessTile vs selected wordTile as an index of randomWord
// DONE: Store hits and misses mapped from guessTile to wordTile

// Word tile selection
wordTilesContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("wordtile")) {
    const isUnselected = !e.target.classList.contains("selected");

    unselectWordTile();
    if (isUnselected) {
      selectWordTile(e.target);
    }
  }
});

// Guess tile selection
guessTilesContainer.addEventListener("click", (e) => {
  const classList = e.target.classList;
  const selectedWordTile = wordTilesContainer.querySelector(".selected");
  if (
    !classList.contains("guesstile") ||
    classList.contains("matched") ||
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
    // TODO: Change to function calls
    e.target.classList.add("matched");
    selectedWordTile.classList.add("matched");
    selectedWordTile.innerText = letter;
  } else {
    addGuessToWordTile(selectedWordTile, letter);
    e.target.classList.add("miss");
  }
  unselectWordTile();
});

// If click is not on a wordtile or guess tile then remove the selected class from all word tiles
document.addEventListener("click", (e) => {
  if (
    !e.target.classList.contains("wordtile") &&
    !e.target.classList.contains("guesstile")
  ) {
    unselectWordTile();
  }
});

// Track guess mapping to word tile
function addGuessToWordTile(tile, letter) {
  const { guesses } = tile.dataset;
  tile.dataset.guesses = !guesses ? letter : `${guesses},${letter}`;
}

function wasLetterAlreadyGuessed(tile, letter) {
  return tile.dataset.guesses.split(",").includes(letter);
}

function selectWordTile(tile) {
  const { guesses } = tile.dataset;
  tile.classList.add("selected");
  const previousGuesses = guesses.split(",");
  const letters = guessTilesContainer.querySelectorAll(".guesstile");

  [].forEach.call(letters, (el) => {
    if (previousGuesses.includes(el.dataset.letter)) {
      el.classList.add("disallowed");
    }
  });
}

function unselectWordTile() {
  const tile = wordTilesContainer.querySelector(".selected");
  if (tile) {
    tile.classList.remove("selected");
    const disallowed = guessTilesContainer.querySelectorAll(".disallowed");
    [].forEach.call(disallowed, (letter) =>
      letter.classList.remove("disallowed")
    );
  }
}
