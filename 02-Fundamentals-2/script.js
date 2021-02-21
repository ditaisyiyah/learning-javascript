/// Fundamentals-2 ///
"use strict";

///////////////////////////
/// CODING CHALLANGE 1 ///

// adapted from cc3 jf1
// figure out the winner from the average score
// the winner have to at least double

const calcAverage = function (team, score1, score2, score3) {
  const aveTeam = (score1 + score2 + score3) / 3;
  console.log(`${team}'s average score is ${aveTeam}.`);
  return aveTeam;
};
const checkWinner = function (team1, ds1, ds2, ds3, team2, ks1, ks2, ks3) {
  const aveTeam1 = calcAverage(team1, ds1, ds2, ds3);
  const aveTeam2 = calcAverage(team2, ks1, ks2, ks3);

  if (aveTeam1 >= 2 * aveTeam2) {
    return `${team1} win (${aveTeam1} vs. ${aveTeam2})!`;
  } else if (aveTeam2 >= 2 * aveTeam1) {
    return `${team2} win (${aveTeam2} vs. ${aveTeam1})!`;
  } else {
    return `No one win 🏆`;
  }
};
console.log(checkWinner("Dolphins", 44, 23, 71, "Koalas", 65, 54, 49));
console.log(checkWinner("Dolphins", 85, 54, 41, "Koalas", 23, 34, 27));

///////////////////////////
/// CODING CHALLANGE 2 ///

// adapted from cc4 jf1
// use an arrow function

const calcTip = (bill) => (bill > 50 && bill < 300 ? 0.2 * bill : 0.15 * bill);

const bills = [125, 555, 44];
console.log(bills);

const tips = new Array(3);
tips[0] = calcTip(bills[0]);
tips[1] = calcTip(bills[1]);
tips[2] = calcTip(bills[2]);
console.log(tips);

const totals = [bills[0] + tips[0], bills[1] + tips[1], bills[2] + tips[2]];
console.log(totals);

//////////////////////////
/// CODING CHALLAGE 3 ///

// adapted from cc1 jf1
// use an object

const mark = {
  firstName: "Mark",
  lastName: "Miller",
  mass: 78,
  height: 1.69,
  calcBMI: function () {
    return this.mass / this.height ** 2;
  },
};
const john = {
  firstName: "John",
  lastName: "Smith",
  mass: 92,
  height: 1.95,
  calcBMI: function () {
    return this.mass / this.height ** 2;
  },
};
console.log(mark.calcBMI(), john.calcBMI());
console.log(
  `John's BMI (${john.calcBMI()}) is ${
    mark.calcBMI() > john.calcBMI() ? "lower" : "higher"
  } than Mark's (${mark.calcBMI()})!`
);

///////////////////////////
/// CODING CHALLANGE 4 ///

// adapted from cc2
// use and array

// arrays
const bills = [22, 295, 176, 440, 37, 105, 10, 1100, 86, 52];
const tips = [];
const totals = [];
// make arrow (expression) function
const calcTip = (bill) => (bill > 50 && bill < 300 ? 0.2 * bill : 0.5 * bill);
// make for loop
for (let i = 0; i < bills.length; i++) {
  tips.push(calcTip(bills[i]));
  totals.push(bills[i] + tips[i]);
  console.log(bills[i], tips[i], totals[i]);
}
// bonus (average of total)
const calcAverage = function (arr) {
  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    sum += arr[i];
  }
  return sum / arr.length;
};
console.log(calcAverage(bills));
console.log(calcAverage(tips));
console.log(calcAverage(totals));
console.log(calcAverage([3, 4, 5]));

