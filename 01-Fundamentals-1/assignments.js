/// Fundamentals-1 ///

/// Values and Variables ///

let country = "Indonesia";
let continent = "Asia";
let population = 273;

console.log(country);
console.log(continent);
console.log(population);

/// Data Types ////

let isIsland = false; // Country=!Island
let language;
console.log(typeof isIsland);
console.log(typeof population);
console.log(typeof country);
console.log(typeof language);

/// let, const, and var ///

language = "Bahasa";
const myLanguage = language; // Unprotected
console.log(typeof myLanguage);

const myCountry = "Indonesia"; // Protected
const myContinent = "Asia"; // Protected
console.log(typeof myCountry);
console.log(typeof myContinent);

/// Basic Operators ///

population /= 2; // population = population / 2
population *= 2; // it also could be **, +, -
population++; // population = populatioN + 1
population--;

console.log(population);

// Comparison operator >, <, >=, <=
console.log(population > 6);
console.log(population < 33);

// Concatenation, using (+) in Strings
let description =
  myCountry +
  " is in " +
  myContinent +
  ", and its " +
  population +
  " million people speak " +
  myLanguage +
  ".";
console.log(description);

/// Strings and Template Literal ///

description = `${myCountry} is in ${myContinent},
and its ${population} million people speak ${myLanguage}.`;
console.log(description);

// multiple lines
console.log("we can make multiple lines \n\
by use slash + n + slash.");
console.log("or..");
console.log(`using a template literal,
devil eyes quote.`);

/// Taking Decisions: if else Statements ///

const average = 33;
// population = 10;
if (population > average) {
  console.log(`${myCountry}'s population is above average.`);
} else {
  console.log(
    `${myCountry}'s population is ${average - population} below average.`
  );
}

/// Type Conversion and Coersion ///

// Coersion is auto conversion by JS
// instead Conversion, manually by coder
console.log("9" - "5"); // 4 in Number
console.log("19" - "13" + "17"); // 617 in String
console.log("19" - "13" + 17); // 23 in Number
console.log("123" < 57); // false in boolean
console.log(5 + 6 + "4" + 9 - 4 - 2); // 11 + '4' + 2 = 1143 in String
console.log(typeof (5 + 6 + "4" + 9 - 4 - 2)); // why Number?
// 5+6 = 11 in Number
// 11 + '4' = 114 in String
// '114' + 3 = 1143 in Number

// In Boolean
// 5 FALSY values
console.log(Boolean(0, "", undefined, null, NaN));
// Otherwise, will be TRUSY values
console.log(Boolean({}, " "));
// in if condition we can take benefit from falsy trusy values

/// Equality Operators: == vs. === ///

let numNeighbours = prompt(
  "How many neighbour countries does your country have?"
);
console.log(typeof numNeighbours);
// loose
if (numNeighbours == 1) {
  console.log("Only 1 border!");
} else if (numNeighbours > 1) {
  console.log("More than 1 border");
} else if (numNeighbours == 0) {
  console.log("No borders");
} else {
  console.log("Your input is not in integer!");
}
// strict
// numNeighbours = Number(numNeighbours);
console.log(typeof numNeighbours);
if (numNeighbours === 1) {
  console.log("Only 1 border!");
} else if (numNeighbours > 1) {
  console.log("More than 1 border");
} else if (numNeighbours === 0) {
  console.log("No borders");
} else {
  console.log(`Your input is not in integer or Number!
Please make sure your number not in negative or converted in Number.`);
}

/// Logical Operators ///

const myCountry = "Indonesia";
const myLanguage = "Bahasa";
const myPopulation = 273;

const englishCountry;
const lessthan50Population;

if (myLanguage == "English") {
  englishCountry = true;
} else {
  englishCountry = false;
}

if (myPopulation < 50) {
  lessthan50Population = true;
} else {
  lessthan50Population = false;
}

let sarahCouldLive;
if (englishCountry && lessthan50Population) {
  sarahCouldLive = true;
}

if (sarahCouldLive) {
  console.log(`You should live in ${myCountry} :)`);
} else {
  console.log(`${myCountry} does not meet you criteria :(`);
}

/// The Switch Statement ///

const language = "hindi";
switch (language) {
  case "chinese": //language ==== "chinese"
  case "mandarin":
    console.log("MOST number of native speakers!");
    break;
  case "spanish":
    console.log("2nd place in number of native speakers");
    break;
  case "english":
    console.log("3rd place");
    break;
  case "hindi":
    console.log("Number 4");
    break;
  case "arabic":
    console.log("5th most spoken language");
    break;
  default:
    console.log("Great language too :D");
}
// in the form of if-else Statement
if (language === ("chinese" || "mandarin")) {
  // if (language === 'chinese' || 'mandarin') {
  // the condition will be always true and excecute the then below
  // false || true = true
  console.log("MOST number of native speakers!");
} else if (language === "spanish") {
  console.log("2nd place in number in native speakers");
} else if (language === "english") {
  console.log("3rd place");
} else if (language === "hindi") {
  console.log("Number 4");
} else if (language === "arabic") {
  console.log("5th most spoken language");
} else {
  console.log("Great language too :D");
}

/// Statement and Expression ///

const myPopulation = 274;
// in wholly, below is statement
let summary =
  myPopulation >= 33
    ? "Indonesia's population is above average!"
    : "Indonesia's population is below average!";
console.log(summary);
// expression in statement
console.log(
  `Indonesia's population is ${myPopulation >= 33 ? "above" : "below"} average!`
);
