'use strict';

// Selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

// Declaring variables
let scores, currentScore, activePlayer, playing;

// Starting condition
const init = function () {
  // Initalizing the variables
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};

// run the function initally (when the browser loads)
init();

// Switching player functions
const switchPlayer = function () {
  // Switch to the next player
  // If the activeplayer is 0, then we want the new active player to be 1.
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent =
    currentScore;
  activePlayer = activePlayer === 0 ? 1 : 0;

  // Toggle the active CSS background
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

// Rolling dice functionality
btnRoll.addEventListener('click', function () {
  // if playing, then do all this
  if (playing) {
    //1. Generating a random number (dice roll)
    const diceNum = Math.trunc(Math.random() * 6 + 1);

    //2. Display the rice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${diceNum}.png`;

    //3. Check for rolled 1: if true, switch to next player.
    if (diceNum !== 1) {
      // Add to current score of current player
      currentScore += diceNum;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // call the switch player function
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    // 1. Add current score to active player's total score.
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // 2. Check if score >= 100
    if (scores[activePlayer] >= 100) {
      // Finish the game
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');

      // Remove the dice png once the player wins
      diceEl.classList.add('hidden');
    } else {
      // 3. Switch to next player.
      switchPlayer();
    }
  }
});

// Reset Game Button
btnNew.addEventListener('click', init);
