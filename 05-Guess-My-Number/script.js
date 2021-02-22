/// DOM and Events Fundamentals ///
"use strict";

/*
// log line of code of class element: message
console.log(document.querySelector('.message'));
// log (text) content of class element: message
console.log(document.querySelector('.message').textContent);

// change HTML element
document.querySelector('.message').textContent = '🖐 Zdravstvutye!';
// changes the content=>line code=>interface and console. script.js.4 is not as it was
console.log(document.querySelector('.message').textContent);
*/

//////////////////////////////
/// GAME: Guess My Number ///

// Start (initial condition) //
// 0) secretNumber is set in randomly in between -1 and 20
// 1) .message is "Start guessing..."
// 2) .label-score is 10
// 3) .label-highscore is 0
// 4) .guess is empty

// How the Game works //
// 1) .guess for inserting guess value
// 2) .check button for checking it
// 3) if (.guess === empty) => .message shows "No number"
// 4) if (.guess !== in between) => .message shows "Forbidden"
// 5) if (.guess !== false)
// - => .message shows "Too low" or "Too high"
// - => if (.score > 0) .score--
//      else .message shows "You lose"
//      .again for playing again or reload page for reseting
//      .check stops work
// 6) if (.guess === true)
// - => .message shows "Correct"
// - => some element style
// - => if (.highscore < .score) .highscore = .score
//      .again or reload
//      .check stops work
// 7) .again button for play again in condition:
// - all elements be reseted in initial condition except highscore

// set the secret number
let secretNumber = Math.trunc(Math.random() * 20);
// document.querySelector('.number').textContent = secretNumber;

// declare the value
let curScore = 10;
let curHighScore = 0;

// check button
document.querySelector(".check").addEventListener("click", function () {
  const guess = Number(document.querySelector(".guess").value);
  console.log(guess, typeof guess);

  // No guess number
  if (!guess) {
    // If the condition is true. It return false as no number input. And as guess has been converted in number. So it will return 0 instead. script.js:49
    document.querySelector(".message").textContent = "🙄 No inputed number!";

    // guess is out of range
  } else if (guess <= -1 || guess >= 20) {
    if (curScore > 0) {
      document.querySelector(".message").textContent = "😬 Forbidden Number!";
      curScore--;
      document.querySelector(".score").textContent = curScore;
    } else {
      document.querySelector(".message").textContent = "You lose the game!";
    }

    // guess is higher
  } else if (guess > secretNumber) {
    if (curScore > 0) {
      document.querySelector(".message").textContent = "Too high!!";
      curScore--;
      document.querySelector(".score").textContent = curScore;
    } else {
      document.querySelector(".message").textContent = "You lose the game!";
    }

    // guess is lower
  } else if (guess < secretNumber) {
    if (curScore > 0) {
      document.querySelector(".message").textContent = "Too low!";
      curScore--;
      document.querySelector(".score").textContent = curScore;
    } else {
      document.querySelector(".message").textContent = "You lose the game!";
    }

    // guess is correct
  } else if (guess === secretNumber) {
    document.querySelector(".message").textContent = "🎉 Correct Number!";
    document.querySelector(".number").textContent = secretNumber;

    if (curScore > curHighScore) {
      curHighScore = curScore;
      document.querySelector(".highscore").textContent = curScore;
    }
    document.querySelector("body").style.backgroundColor = "#60b347";
    document.querySelector(".number").style.width = "30rem";
  }
});

///////////////////////////
/// CODING CHALLANGE 3 ///

// again button
document.querySelector(".again").addEventListener("click", function () {
  secretNumber = Math.trunc(Math.random() * 20);
  document.querySelector(".message").textContent = "Start guessing...";
  document.querySelector(".number").textContent = "?";
  curScore = 10;
  document.querySelector(".score").textContent = curScore;
  document.querySelector(".guess").value = null;
  document.querySelector("body").style.backgroundColor = "#222";
  document.querySelector(".number").style.width = "15rem";
});
