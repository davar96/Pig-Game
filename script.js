'use strict';

const score1El = document.getElementById('score--0');
const score2El = document.getElementById('score--1');
const currentScoreEl1 = document.getElementById('current-score--0');
const currentScoreEl2 = document.getElementById('current-score--1');
const player1El = document.querySelector('.player--0');
const player2El = document.querySelector('.player--1');
const diceEl = document.querySelector('.dice');
const rollDiceBtn = document.querySelector('.btn--roll');
const holdBtn = document.querySelector('.btn--hold');
const resetGameBtn = document.querySelector('.btn--reset');

let currentScore, scores, activePlayer, playing;

diceEl.classList.add('hidden');

const init = function() {
    playing = true;
    activePlayer = 0;
    currentScore = 0;
    scores = [0, 0];

    score1El.textContent = 0;
    score2El.textContent = 0;
    currentScoreEl1.textContent = 0;
    currentScoreEl2.textContent = 0;

    diceEl.classList.add('hidden');
    player1El.classList.remove('player--winner');
    player2El.classList.remove('player--winner');
    player1El.classList.add('player--active');
    player2El.classList.remove('player--active');
};

const switchPlayer = function() {
    document.getElementById(`current-score--${activePlayer}`).textContent = 0;
    currentScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    player1El.classList.toggle('player--active');
    player2El.classList.toggle('player--active');
};

init();

rollDiceBtn.addEventListener('click', function() {
    if (playing) {
        const diceRoll = Math.trunc(Math.random() * 6) + 1;

        diceEl.classList.remove('hidden');

        diceEl.src = `Images/dice-${diceRoll}.png`;

        if (diceRoll !== 1) {
            currentScore += diceRoll;
            document.getElementById(`current-score--${activePlayer}`).textContent =
                currentScore;
        } else {
            switchPlayer();
        }
    }
});

holdBtn.addEventListener('click', function() {
    if (playing) {
        scores[activePlayer] += currentScore;
        document.getElementById(`score--${activePlayer}`).textContent =
            scores[activePlayer];

        if (scores[activePlayer] >= 100) {
            playing = false;
            diceEl.classList.add('hidden');
            document
                .querySelector(`.player--${activePlayer}`)
                .classList.add('player--winner');
            document
                .querySelector(`.player--${activePlayer}`)
                .classList.remove('player--active');
        } else {
            switchPlayer();
        }
    }
});

resetGameBtn.addEventListener('click', init);