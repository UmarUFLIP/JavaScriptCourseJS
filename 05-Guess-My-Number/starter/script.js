'use strict';

/*
console.log(document.querySelector('.message').textContent);

document.querySelector('.message').textContent = 'Correct Number';

document.querySelector('.number').textContent = 13;
document.querySelector('.score').textContent = 10;

console.log(document.querySelector('.guess').value);
document.querySelector('.guess').value = 23;
*/

// Generate a random number by using these functions
let secretNumber = Math.trunc(Math.random() * 20) + 1;
// this is how many guesses it took them to guess the number.
let score = 20;
// To keep track of the high score
let highScore = 0;

const displayMessage = function (message) {
  document.querySelector('.message').textContent = message;
};

document.querySelector('.check').addEventListener('click', function () {
  // we want to compare the guess number to a random generated number.
  // we need the Number function to convert back to Number (so we can compare)
  const guess = Number(document.querySelector('.guess').value);
  console.log(guess, typeof guess);

  // Since input is empty and we click 'check' btn we get 0 and 0 is falsy value.
  // So if guess is 0 (false) then we want this code to execute.
  if (!guess) {
    displayMessage('No number! ❌');
  }
  // When the player wins
  else if (guess === secretNumber) {
    document.querySelector('.message').textContent = 'Correct Number! 🎉';
    document.querySelector('.number').textContent = secretNumber;

    document.querySelector('body').style.backgroundColor = '#60b347';
    document.querySelector('.number').style.width = '30rem';

    if (score > highScore) {
      highScore = score;
      document.querySelector('.highscore').textContent = highScore;
    }
  }
  // When guess is wrong
  else if (guess !== secretNumber) {
    if (score > 1) {
      displayMessage(guess > secretNumber ? 'Too High! 📈' : 'Too Low! 📉');
      // If the guess is wrong, decrease the score
      score--;
      document.querySelector('.score').textContent = score;
    }
    // If out of score (guesses)
    else {
      displayMessage('You lost the game! ☹️');
      document.querySelector('.score').textContent = 0;
    }
  }
});

// Challenge: Implement the game reset functionality.
document.querySelector('.again').addEventListener('click', function () {
  score = 20;
  secretNumber = Math.trunc(Math.random() * 20) + 1;

  displayMessage('Start guessing...');
  document.querySelector('.score').textContent = score;
  document.querySelector('.number').textContent = '?';

  // The value of the input HTML element is a string.
  document.querySelector('.guess').value = '';
  document.querySelector('body').style.backgroundColor = '#222';
  document.querySelector('.number').style.width = '15rem';
});
