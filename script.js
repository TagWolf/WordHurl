// Main WordHurl script

// TODO
// * Animate hit or miss and store set miss on the guess tile MAPPED to the selected wordtile only
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
// * React?? switch to sqlite for wordlist and archive tracking (see wordhurl-junkfiles for wordhurl.sqlite3 file)
// * Rename script files to more meaningful names. E.g. wordhurlLoader.js,
// * To prevent cheating, change this to server side by having the python script generate one randomWord and scrambleWord at midnight

// Next TODO Items
// TODO: Load word and scrambled tiles from data\words.py
// TODO: From words.py Pick word and scrambled from array in order based on date
// DONE: Check guessTile vs selected wordTile as an index of randomWord
// TODO: Enhance guess function to handle comparing guessTile clicked or typed against word
// TODO: To increase fun and risk, add a maximum number of guesses per game based on word length. E.g. 3 guesses for 3 letter words, 4 guesses for 4 letter words, etc.
// TODO: Handle scoring on hits / miss
// POSSIBLE TODO: In the future, enhance WordHurl by using server side sqlite database for handling words, scores, etc.

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
