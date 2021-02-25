/// DOM and Events Fundamentals ///
'use strict';

///////////////
// Pig Game //
// 0) player activation
//  - has auto greyish background color
// 1) buttons: roll, hold, and new game
// 2) display: current score, score, dice
// 3) roll => dice is randomly displayed
//  - if dice displays 1 => hold
//  - else => adding current score by number showed by the dice
// 3) hold => score is added by current score
//  - if score >= 100 => WIN
//  - else => current score is set to 0
//         => change player
// 4) new game => reset (back to the initial)
//  - current score = 0
//  - score = 0
//  - dice image is hidden
//  - player 1 as starting player

// Code Problem, how to:
// - Set initial condition
// - Switch the active player
// - Know which playes is active
// - Make Math random formula for rolling the dice
// - Get the number from the displayed dice image
// - Activate the WIN mode

// store the elements
// buttons
const newGame = document.querySelector('.btn--new');
const rollDice = document.querySelector('.btn--roll');
const holdScore = document.querySelector('.btn--hold');
// displays
let curScore0 = document.querySelector('#current--0');
let curScore1 = document.getElementById('current--1');
let score0 = document.getElementById('score--0');
let score1 = document.getElementById('score--1');
let disDice = document.querySelector('.dice');
// players
let player0 = document.querySelector('.player--0');
let player1 = document.querySelector('.player--1');

// initial condition
const init = function () {
  curScore0.textContent = 0;
  curScore1.textContent = 0;
  // let score = document.querySelector('.score');
  // score.textContent = 0; => works only for player0
  score0.textContent = 0;
  score1.textContent = 0;
  disDice.classList.add('hidden'); // make .hidden style
  player0.classList.add('player--active');
  player1.classList.remove('player--active');
};
init();

// switch player
const switchPlayer = function () {
  curScore = 0;
  document.getElementById(`current--${statusPlayer()}`).textContent = curScore;
  // toggle for checking the parameter..
  // if exist, the parameter will be added. otherwise, do vice versa
  player0.classList.toggle('player--active');
  player1.classList.toggle('player--active');
  /*
  if (player0.classList.contains('player-active')){
    player0.classList.remove('player--active');
    player1.classList.add('player--active');
  }else if (player1.classList.contains('player-active')){
      player1.classList.remove('player--active');
      player0.classList.add('player--active');
  }
  */
};

// player status
const statusPlayer = function () {
  let numPlayer = player0.classList.contains('player--active') ? 0 : 1;
  return numPlayer;
  /*
  if (player0.classList.contains('player--active')) {
    return 0;
  } else if (player1.classList.contains('player--active')) {
    return 1;
  }
  */
};

let playing = true;

// roll dice
let curScore = 0;
rollDice.addEventListener('click', function () {
  if (playing) {
    // generate random dice number
    const dice = Math.trunc(Math.random() * 6) + 1;
    // displays the dice image
    if (disDice.classList.contains('hidden')) {
      disDice.classList.remove('hidden');
    }
    disDice.src = `dice-${dice}.png`;
    //adds dice number into curScore active player?
    if (dice !== 1) {
      curScore += dice;
      document.getElementById(
        `current--${statusPlayer()}`
      ).textContent = curScore;
      /*
    if (statusPlayer() === 0) {
        curScore0.textContent = curScore;
    } else if (statusPlayer() === 1) {
      curScore1.textContent = curScore;
    }
    */
    } else if (dice === 1) {
      switchPlayer();
      /*
    document.getElementById(
      `current--${statusPlayer()}`
    ).textContent = curScore;
    */
    }
  }
});

// hold current score
let score = [0, 0];
holdScore.addEventListener('click', function () {
  if (playing) {
    // adding curscore into score active player
    score[statusPlayer()] += curScore;
    document.getElementById(`score--${statusPlayer()}`).textContent =
      score[statusPlayer()];
    if (score[statusPlayer()] < 20) {
      switchPlayer();
      /*
      curScore = 0;
      document.getElementById(`current--${statusPlayer()}`).textContent = curScore;
      */
    } else {
      // WIN
      playing = false;
      disDice.classList.add('hidden');
      document.getElementById(`name--${statusPlayer()}`).textContent =
        '🎊 YOU WON!';
      document
        .querySelector(`.player--${statusPlayer()}`)
        .classList.add('player--winner');
    }
  }
});

// new game
newGame.addEventListener('click', function () {
  document.getElementById(`name--${statusPlayer()}`).textContent = `PLAYER ${
    statusPlayer() === 0 ? '1' : '2'
  }`;
  document
    .querySelector(`.player--${statusPlayer()}`)
    .classList.remove('player--winner');
  playing = true;
  curScore = 0;
  score = [0, 0];
  init();
});
