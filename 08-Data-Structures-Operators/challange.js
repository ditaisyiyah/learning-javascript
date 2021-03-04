/// Data Sturtures, Modern Operators, and Strings ///
'use strict';

/// MODERN OPERATORS
//////////////////////////
/// CODING CHALLANGE 1 ///

const game = {
  team1: 'Bayern Munich',
  team2: 'Borrussia Dortmund',
  players: [
    [
      'Neuer',
      'Pavard',
      'Martinez',
      'Alaba',
      'Davies',
      'Kimmich',
      'Goretzka',
      'Coman',
      'Muller',
      'Gnarby',
      'Lewandowski',
    ],
    [
      'Burki',
      'Schulz',
      'Hummels',
      'Akanji',
      'Hakimi',
      'Weigl',
      'Witsel',
      'Hazard',
      'Brandt',
      'Sancho',
      'Gotze',
    ],
  ],
  score: '4:0',
  scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
  date: 'Nov 9th, 2037',
  odds: {
    team1: 1.33,
    x: 3.25,
    team2: 6.5,
  },
};

// 1) Making arrays from value of property
const [player1, player2] = game.players;
console.log(player1, player2);

// 2) Making new data types from array
const [gk, ...fieldPlayers] = player1;
console.log(gk, fieldPlayers);

// 3) Merging two arrays
const allPlayers = [...player1, ...player2];
console.log(allPlayers);

// 4) Pushing three elements and storing in a new array
const players1Final = [...player1, 'Thiago', 'Coutinho', 'Perisic'];
console.log(players1Final);

// 5) Copying object in object and changing the property name
const { team1, x: draw, team2 } = game.odds;
console.log(team1, draw, team2);

// 6) Passing rest-ed argument
let arr = [[], []];
function printGoals(...players) {
  let point = 0;
  for (let i = 0; i < players.length; i++) {
    for (let j = 0; j < game.scored.length; j++) {
      if (players[i] === game.scored[j]) {
        point++;
      }
    }
    console.log(players[i], point);
    point = 0;
  }
}
printGoals('Davies', 'Muller', 'Lewandowski', 'Kimmich');
printGoals(...game.scored);

//7 Using modern operator to decide
team1 < team2 && console.log('Team 1 is more likely to win');
team1 > team2 && console.log('Team 2 is more likely to win');

/// MODERN OPERATORS
//////////////////////////
/// CODING CHALLANGE 2 ///

// 1) Looping game.scored
for (const [i, name] of game.scored.entries()) {
  console.log(`Goal ${i + 1}: ${name}`);
}

// 2) Calculating the average of game.odds
let odds = Object.values(game.odds);
let ave = 0;
for (const odd of odds) ave += odd;
ave /= odds.length;
console.log(ave);

// 3) Printing three odds
for (const [team, score] of Object.entries(game.odds)) {
  const teamName = team === 'x' ? 'draw' : `victory ${team}`;
  console.log(`Odd of ${teamName}: ${score}`);
}

// 4) BONUS: Printing scorers: number of goals
const scorers = {
  // Gnarby: 1,
  // Hummels: 1,
  // Lewandowski: 2,
};

// SOLUTION
for (let player of game.scored) {
  scorers[player] ? scorers[player]++ : (scorers[player] = 1);
}
console.log(scorers);
/*
// Array of pLayers who create scores
function simScored(players) {
  let tempScored = [];
  for (let i = 0; i < players.length; i++) {
    if (!tempScored.includes(players[i])) tempScored[i] = players[i];
  }
  return tempScored;
}
const finalScored = simScored(game.scored);
console.log(finalScored);
finalScored.splice(2, 1);
console.log(finalScored);

// Array for occurance goals from each of them
function simOccurance(players) {
  let occ = 0;
  let tempOccurance = [];
  for (let i = 0; i < players.length; i++) {
    for (let j = 0; j < game.scored.length; j++) {
      if (players[i] === game.scored[j]) occ++;
    }
    tempOccurance[i] = occ;
    occ = 0;
  }
  return tempOccurance;
}
const finalOccurance = simOccurance(finalScored);
console.log(finalOccurance);

// Adding property names and values to the object
function addProperty(scored, occurance) {
  for (let i = 0; i < scored.length; i++) {
    scorers[scored[i]] = occurance[i];
  }
}
addProperty(finalScored, finalOccurance);
console.log(scorers);
*/
/// DATA STRUCTURES
//////////////////////////
/// CODING CHALLANGE 3 ///

const gameEvents = new Map([
  [17, '⚽️ GOAL'],
  [36, '🔁 Substitution'],
  [47, '⚽️ GOAL'],
  [61, '🔁 Substitution'],
  [64, '🔶 Yellow card'],
  [69, '🔴 Red card'],
  [70, '🔁 Substitution'],
  [72, '🔁 Substitution'],
  [76, '⚽️ GOAL'],
  [80, '⚽️ GOAL'],
  [92, '🔶 Yellow card'],
]);

// 1) make a sets, with value of maps
let events = [...new Set(gameEvents.values())];
console.log(events);

// 2) remove key 64
gameEvents.delete(64);
console.log(gameEvents);

// 3)
// An event happened, on average, every 9 minutes
// ...every ${average} minutes
// average = 90/size
for (const [key, value] of gameEvents) {
  if (key > 90) gameEvents.delete(key);
}
console.log(
  `An event happened, on average, every ${90 / gameEvents.size} minutes`
);

// 4) loop over map
// [FIRST HALF] 17: ⚽️ GOAL
// [${conditional}] ${key}: ${value}
for (const [key, value] of gameEvents) {
  const conditional = key < 45 && value === '⚽️ GOAL' ? 'FIRST' : 'SECOND';
  console.log(`[${conditional} HALF] ${key}: ${value}`);
}

/// STRINGS
///////////////////////////
/// CODING DHALLANGE 4 ///

document.body.append(document.createElement('textarea'));
document.body.append(document.createElement('button'));

// Input text below into DOM
/*
underscore_case
 first_name
Some_Variable
  calculate_AGE
delayed_departure
*/
// 1. Produce 5 seperate consolo.logs outputs
/*
underscoreCase      ✅
firstName           ✅✅
someVariable        ✅✅✅
calculateAge        ✅✅✅✅
delayedDeparture    ✅✅✅✅✅
*/

// 2. The input will come from a textarea inserted into a DOM, and conversion will happen when the button is pressed.

// SOLUTION
document.querySelector('button').addEventListener('click', function () {
  // 1) Convert
  const getStr = String(document.querySelector('textarea').value);

  // 2) Split 1, to become iterable, ordered substring
  let oneArr = getStr.split('\n'); // become array

  for (let [i, word] of oneArr.entries()) {
    word = word.trim().toLowerCase().split('_');

    let [firstWord, secondWord] = word;
    // console.log(firstWord, secondWord, word);
    let newSecondWord = secondWord.replace(
      secondWord[0],
      secondWord[0].toUpperCase()
    );

    let newLine = [firstWord, newSecondWord].join('');

    let finalLine = newLine.padEnd(20, ' ');

    console.log(`${finalLine}${'✅'.repeat(i + 1)}`);
  }

  /*
  // 3) Loop, to trim, lowercase, and split 2
  let twoArr = [];
  for (let line of oneArr) {
    line = line.trim().toLowerCase();
    line = line.split('_'); // become array
    twoArr.push(line); // get 2D array
  }

  // 4) Map, pass the 2D array
  let firstMap = new Map(twoArr);
  let secondMap = new Map();

  //5) Loop, to upperCase the char[0] at [i][1]
  for (let [firstWord, secondWord] of firstMap) {
    secondWord = secondWord.replace(secondWord[0], secondWord[0].toUpperCase());
    // 6) set into a new map
    secondMap.set(firstWord, secondWord);
  }

  // 7) Convert back to 2D array
  let backTo2D = [...secondMap.entries()]; // 2D arrays

  // 8) Loop, to get 1D array
  let backTo1D = [];
  for (let i of backTo2D) {
    i = i.join(''); // get rid of j index
    backTo1D.push(i);
  }
  // console.log(backTo1D);

  // 9) Add padding
  let finalArr = [];
  for (let i = 0; i < backTo1D.length; i++) {
    backTo1D[i] = backTo1D[i].padEnd(20, ' ');
    backTo1D[i] = backTo1D[i].padEnd(backTo1D[i].length + i + 1, '✅');
    finalArr.push(backTo1D[i]);
  }

  // 10) Final String in Array
  console.log(finalArr);

  // 11) Ultimate String
  let ultimateStr = backTo1D.join('\n');
  console.log(ultimateStr);
  */
});
