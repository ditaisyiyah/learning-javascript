/// Fundamentals-1 ///

///////////////////////////
/// CODING CHALLANGE 1 ///

// BMI = mass / height ** 2
// BMI = mass / (height * height)
// mass in kg, height in meter.

// data1
const markWeight = 78;
const markTall = 1.69;
const johnWeight = 92;
const johnTall = 1.95;

const markBMI = markWeight / markTall ** 2;
const johnBMI = johnWeight / johnTall ** 2;
let markHigherBMI = markBMI > johnBMI;

console.log("Data 1");
console.log("Mark : " + markBMI);
console.log("John : " + johnBMI);
console.log("Mark's BMI is higher than John's? " + markHigherBMI);

// data2
const markWeight2 = 95;
const markTall2 = 1.88;
const johnWeight2 = 85;
const johnTall2 = 1.76;

const markBMI2 = markWeight2 / (markTall2 * markTall2);
const johnBMI2 = johnWeight2 / (johnTall2 * johnTall2);
let markHigherBMI2 = markBMI2 > johnBMI2;

console.log("Data 2");
console.log("Mark : " + markBMI2);
console.log("John : " + johnBMI2);
console.log("Mark's BMI is higher than John's? " + markHigherBMI2);

/////////////////////////////////////////
/// CODING CHALLANGE 2 (using DATA2) ///

// nicer output to the console

if (markBMI2 > johnBMI2) {
  console.log(`Mark's BMI (${markBMI2}) is higher than John's (${johnBMI2})!`);
} else {
  console.log(`Mark's BMI (${markBMI2}) is lower than John's (${johnBMI2})!`);
}

///////////////////////////
/// CODING CHALLANGE 3 ///

// fgure out the winner from the highest average score
// do not forget it could be a draw

// Data 1
const dScore1 = 96;
const dScore2 = 108;
const dScore3 = 89;
const dAverage = (dScore1 + dScore2 + dScore3) / 3;

const kScore1 = 88;
const kScore2 = 91;
const kScore3 = 110;
const kAverage = (kScore1 + kScore2 + kScore3) / 3;

console.log(dAverage, kAverage);

if (dAverage > kAverage) {
  console.log(`Dolphins wins the trophy with score ${dAverage}!`);
} else if (dAverage < kAverage) {
  console.log(`Koalas wins the trophy with score ${kAverage}!`);
} else if (dAverage === kAverage) {
  console.log(`Both win the trophy with even score (${dAverage})!`);
}

// Data 2
// apply minimal score for the winner candidate

const scoreDolphins = (100 + 102 + 80) / 3;
const scoreKoalas = (100 + 102 + 90) / 3;
console.log(scoreDolphins, scoreKoalas);

if (scoreDolphins > scoreKoalas && scoreDolphins >= 100) {
  console.log(`Dolphins wins the trophy with score ${scoreDolphins}!`);
} else if (scoreDolphins < scoreKoalas && scoreKoalas >= 100) {
  console.log(`Koalas wins the trophy with score ${scoreKoalas}!`);
} else if (
  scoreDolphins === scoreKoalas &&
  scoreDolphins >= 100 &&
  scoreKoalas >= 100
) {
  console.log(`Both win the trophy with even score ${scoreKoalas})!`);
} else {
  console.log(`No one win the trophy :(`);
}

///////////////////////////
/// CODING CHALLANGE 4 ///

// simple calculator for tip from bill
// and total must be paid

const bill = 50; // 275, 40, 430
let tip;
let finalTip =
  bill > 50 && bill < 300 ? (tip = 0.2 * bill) : (tip = 0.15 * bill);
console.log(
  `The bill was ${bill}, the tip was ${finalTip}, and the total value was ${
    bill + tip
  }.`
);
console.log(
  `The bill was ${bill}, the tip was ${
    bill > 50 && bill < 300 ? (tip = 0.2 * bill) : (tip = 0.15 * bill)
  }, and the total value was ${bill + tip}.`
);
