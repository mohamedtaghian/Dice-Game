'use strict';

// Select roll button
const rollButton = document.querySelector('.btn--roll');
// Select hold button
const holdButton = document.querySelector('.btn--hold');
// Select reset button
const resetButton = document.querySelector('.btn--new');
// Select dice image
const diceImage = document.querySelector('.dice');
// Select first player
const firstPlayer = document.querySelector('.player--0');
// Select second player
const secondPlayer = document.querySelector('.player--1');
// Select first player current score
const firstPlayerCurrentScore = document.querySelector('#current--0');
// Select second player current score
const secondPlayerCurrentScore = document.querySelector('#current--1');
// Select first player total score
const firstPlayerTotalScore = document.querySelector('#score--0');
// Select second player total score
const secondPlayerTotalScore = document.querySelector('#score--1');

// Declare randomNumber
let randomNumber;
// Declare current score
let currentScore;
// Declare total score
let scores;
// Hold active player
let activePlayer;
// Game state
let playing;

// initialization function
const init = function () {
  currentScore = 0;
  scores = [0, 0];
  activePlayer = 0;
  playing = true;

  diceImage.style.display = 'none';
  firstPlayer.classList.remove('player--winner');
  secondPlayer.classList.remove('player--winner');
  secondPlayer.classList.remove('player--active');
  firstPlayer.classList.add('player--active');

  firstPlayerTotalScore.textContent = currentScore;
  secondPlayerTotalScore.textContent = currentScore;
  firstPlayerCurrentScore.textContent = currentScore;
  secondPlayerCurrentScore.textContent = currentScore;
};
init();

// Switch player function
const switchPlayer = function () {
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent =
    currentScore;
  activePlayer = activePlayer === 0 ? 1 : 0;
  firstPlayer.classList.toggle('player--active');
  secondPlayer.classList.toggle('player--active');
};

// Add click event to roll button
rollButton.addEventListener('click', function () {
  if (playing) {
    // 1-Generating a random dice roll
    randomNumber = Math.trunc(Math.random() * 6 + 1);

    // 2- Display dice
    diceImage.style.display = 'block';
    diceImage.src = `dice-${randomNumber}.png`;

    // 3- Check for rolled 1 => if true, switch to next player
    if (randomNumber !== 1) {
      currentScore += randomNumber;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // Switch to the next player
      switchPlayer();
    }
  }
});

// Hold button event handler
holdButton.addEventListener('click', function () {
  if (playing) {
    // 1- Add current score to active player score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // 2- Check if player score is >= 100, if true finish the game, if not continue
    if (scores[activePlayer] >= 100) {
      // Finish the game
      playing = false;
      diceImage.style.display = 'none';
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      // Switch player
      switchPlayer();
    }
  }
});

// Add event to new button
resetButton.addEventListener('click', init);
