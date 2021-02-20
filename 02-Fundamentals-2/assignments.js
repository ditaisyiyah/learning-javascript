/*
/// Fundamentals-2 ///
"use strict"; // strict mode is activated

//////////////////
/// Functions ///

// simple function, no parameter and return
function noParameter() {
  console.log("HIYa hiYA");
}
noParameter();
noParameter(""); //not executed
noParameter(23); //notexecuted

// complex function
function age(birthYear) {
  console.log(2020 - birthYear);
  const inSentence = `You are ${2020 - birthYear} years old!`;
  return inSentence; //the output og function
}
// below to call / run / invoke / execute
// not specified
age(1997); // nothing happens, but excecute logged inside
// specified,
const myAge = age(1997); //stored the logged and returned values
console.log(myAge); //log them (logged and returned values)
// efficiently, just write lik below
console.log(age(1997));

// assignment 1
function describeCountry(country, population, capitalCity) {
  console.log(`${country} has ${population} million people
and its capital city is ${capitalCity}.`);
}
describeCountry("Russia", 146, "Moscow");

////////////////////////////////////////////
/// Function Declaration vs. Expression ///

// function declaration
// invoking could be define first
// console.log(usiaHafidz(1997));   //executed
function usiaHafidz(lahir) {
  return 2021 - lahir;
}
console.log(usiaHafidz(1997));

// function expression
// anonymous function
// console.log(usiaDita(1997)); // error
const usiaDita = function (cipta) {
  return 2021 - cipta;
};
console.log(usiaDita(1997));

// assignment 2
const worldPopulation = 7900;
// declaration
function percentageOfWorld1(population) {
  return `${(population / worldPopulation) * 100}%`;
}
console.log(percentageOfWorld1(1440));
// expression
const percentageOfWorld2 = function (population) {
  const country = "China";
  return `${country} has ${population} million people, so it's about ${
    (population / worldPopulation) * 100
  }% of the world population.`;
};
console.log(percentageOfWorld2(1440));

///////////////////////
/// Arrow Function ///

// assignment 3
// modified expression
const country = "Indonesia";
const percentageOfWorld3 = (population) =>
  `${country} has ${population} million people, so it's about ${
    (population / worldPopulation) * 100
  }% of the world population.`;
console.log(percentageOfWorld3(274));
// for more complex function
const percentageOfWorld4 = (population) => {
  const ratio4 = (population / worldPopulation) * 100;
  //others...
  return `${country} has ${population} million people,
so it's about ${ratio4}% of the world population.`;
};
console.log(percentageOfWorld4(274));
// arguments for 4 above ain't in var, stored value

/////////////////////////////////////////
/// Function Calling Other Functions ///

// assignment 4
// we can just use arrow function 👇
// const ratioOfWorld = population => (population / 7900) * 100;
// check what works behind Calling other function
function ratioOfWorld(population) {
  // const coba = population - 99; //not affecting
  // console.log(coba);    //logged
  return (population / 7900) * 100; //called
}
// then call the function above w/ the function below
function describePopulation(country, population) {
  // calling
  const percentageOfWorld = ratioOfWorld(population);
  return `${country} has ${population} million people,
so it's about ${percentageOfWorld}% of the world population.`;
}
console.log(describePopulation("Russia", 124));

//better to prevent use same name along any variables

///////////////
/// Arrays ///

// way 1 [round bracket] can decide the length
let tes = new Array(3); //not initialized
console.log(tes);
tes = Array(1, 2, 3); //initialized
console.log(tes);
tes[0] = 0; //change the element
console.log(tes);
tes = [2]; //length reduced
console.log(tes);
tes = [2, , , "hi", tes]; // length increased
console.log(tes);
// Arrays could store anything, including Arrays!
// supposed to write new (why???)

// way 2 [literal brackets] can't decide the length
let years = []; // not initialized
console.log(years);
years = [1990, 1993, 1995]; // initialized
console.log(years);
const age1 = 2021 - years[0];
const age2 = 2021 - years[1];
const age4 = 2021 - years[years.length - 1];
const ages = [years[2], 2021 - years[years.length - 1]];
console.log(ages);
console.log(typeof ages[0]);

// you can use const if want to add an element by element
const yuhu = new Array();
yuhu[0] = 3;
const uhuy = [];
uhuy[0] = 3;
console.log(yuhu, uhuy);

// what if operated
const coba = ages - 17; //NaN
console.log(coba);
const cobaLg = ages + 2; //Nan
console.log(coba);
// use loop for instead

const cobaLgAh = function (ageNow) {
  return ageNow + 99; // (-)=>Nan (+)=>concatination
};
console.log(cobaLgAh(ages));

// what if const
const siblings = ["aji", "ganang", "putri"];
console.log(siblings);
siblings[0] = "ari"; // element's Arrays could be mutated
console.log(siblings);
// siblings = ['a', 'b', 'c']; // Arrays wholly couldn't be mutated
// console.log(siblings);

// assignment 5
const populations = [274, 127, 1440, 7900];
console.log(populations.length === 4 ? "true" : "false");

const percentages = new Array(4);
percentages[0] = percent(populations[0]);
percentages[1] = percent(populations[1]);
percentages[2] = percent(populations[2]);
percentages[3] = percent(populations[3]);
console.log(percentages);

function percent(popul) {
  const res = (popul / 7900) * 100;
  return `${res}%`;
}

///////////////////////////////
/// Basic Array Operations ///

const alfabit = ["a", "b", "c"];
console.log(alfabit);

// add - value needed
let newLength = alfabit.unshift("z"); // first
console.log(alfabit, newLength);
newLength = alfabit.push("d"); // last
console.log(alfabit);
// remove - no value needed
let newValue = alfabit.shift(); // first
console.log(alfabit, newValue);
newValue = alfabit.pop(); // last
console.log(alfabit);

// index
const position = alfabit.indexOf("b");
console.log(position); // number
// absence
const existence = alfabit.includes("c");
console.log(existence); // boolean

// what if
console.log(alfabit.unshift()); // 3
console.log(alfabit.unshift("")); // 4

// ssignment 6
const neighbours = ["Singapore", "Malaysia", "Australia"];
console.log(neighbours);
neighbours.push("Utopia");
console.log(neighbours);
neighbours.pop();
console.log(neighbours);

if (neighbours.includes("Germany")) {
  console.log("Probably a central Europian country :D");
} else {
  console.log("Probably not a central Europian country :D");
}

neighbours[neighbours.indexOf("Malaysia")] = "China";
console.log(neighbours);

////////////////////////////////
/// Introduction to Objects ///

// assignment 7
const myCountry = {
  country: "Russia",
  capital: "Moscow",
  language: "Russian",
  population: 127,
  neighbours: ["Ukraina", "Korea", "Japan"],
};

/////////////////////////////////
/// Dot vs. Bracket Notation ///

console.log(myCountry); // logged alphabetically
//add new property
myCountry.island = "Java";
myCountry["race"] = "Javanese";
console.log(myCountry);

// Dot followed by property name
console.log(myCountry.country);
console.log(myCountry.neighbours.length); // 3
console.log(myCountry.population - 1); // 126
console.log(myCountry.empty); // undefined
// empty is not a property name

// Square followed by expression (computed)
console.log(myCountry["country"]);
console.log(myCountry["neighbours.length"]); // undefined
// neighbours.length is not a property name

// computed property name
const cb = "tal";
console.log(myCountry["capi" + cb]); //ok
// computed value of property
console.log(myCountry["capital"] + " A" + 6); // ok
console.log(myCountry["population"] - 1); // 126
console.log(typeof myCountry.population); // number

// exercise
console.log(
  `${myCountry.country} has ${myCountry.neighbours.length} neighbours, and his best friends is ${myCountry.neighbours[2]}.`
);

// assignment 8
console.log(
  `${myCountry.country} has ${myCountry.population} million ${myCountry.language}-speaking people, ${myCountry.neighbours.length} neighbouring countries and a capital called ${myCountry.capital}.`
);

myCountry.population += 2;
console.log(myCountry.population);
myCountry["population"] = myCountry["population"] - 2;
console.log(myCountry["population"]);

///////////////////////
/// Object Methods ///

const dita = {
  firstName: "Dita",
  lastName: "Larasati",
  birthYear: 1997,
  friends: ["dodi", "osa", "winda"],
  hasDriVerLisence: true,
  calcAge: function () {
    this.age = 2021 - this.birthYear;
    return this.age;
  },
  summary: function () {
    return `${this.firstName} ${this.lastName} was born in ${
      this.birthYear
    }. She has ${this.friends.length} friends: ${this.friends[0]}, ${
      this.friends[1]
    }, and ${this.friends[2]}. She is ${this.calcAge()} y.o., so ${
      this.hasDriVerLisence ? "has" : "no"
    } driver lisence.
    `;
  },
}; // how to make method outside object ???

// exercise
console.log(
  `${dita.firstName} is a ${dita["calcAge"]()}-years woman and she has ${
    dita.hasDriVerLisence ? "a" : "not"
  } driver's lisence`
);

console.log(dita.summary());

// assignment 9
const myCountry = {
  country: "Russia",
  capital: "Moscow",
  language: "Russian",
  population: 127,
  neighbours: ["Ukraina", "Korea", "Japan"],
  describe: function () {
    return `${this.country} has ${this.population} ${this.language}-speaking poeple,
    ${this.neighbours.length} neighbouring countries and a capital called ${this.capital}.`;
  },
  checkIsland: function () {
    return `${
      this.neighbours
        ? (myCountry["island"] = false)
        : (myCountry["island"] = true)
    }`;
    //simplier by Jonas
    // this.neighbours = !Boolean(this.neighbours.length);
  },
};

console.log(myCountry.describe());
console.log(myCountry.checkIsland());
console.log(myCountry); //Island Property is added.

// remember!!
// add () in function
// use this insted object name

////////////////////////////////
/// Iteration: The for loop ///

// assignment 10
for (let voter = 1; voter <= 5; voter++) {
  console.log(`Voter number ${voter} is currently voting`);
}

////////////////////////////////////////////////
/// Looping Arays, Breaking, and Continuing ///

const ditaArray = [
  "Dita",
  "Larasati",
  2021 - 1997,
  true,
  ["Dodi", "Osa", "Hafidz"],
];
for (let i = 0; i < ditaArray.length; i++) {
  console.log(ditaArray[i], typeof ditaArray[i]);
}
const simpan = [];
for (let i = 0; i < ditaArray.length; i++) {
  simpan[i] = typeof ditaArray[i];
}
console.log(simpan);
// break and continue for if statement
for (let i = 0; i < ditaArray.length; i++) {
  if (typeof ditaArray[i] !== "boolean") continue; //only log boolean type
  console.log(ditaArray[i], typeof ditaArray[i]);
}
for (let i = 0; i < ditaArray.length; i++) {
  if (typeof ditaArray[i] !== "string") break; //if not string type is found, loop will terminate
  console.log(ditaArray[i], typeof ditaArray[i]);
}

// assignment 11 (ref. 2 dan 5)
const percentages2 = new Array(4);
for (let i = 0; i < percentages2.length; i++) {
  percentages2.push(percentageOfWorld1(populations[i]));
  console.log(percentages2[i], percentages[i]);
}
for (let i = 0; i < percentages2.length; i++) {
  console.log(
    `The ${i} element of both ${
      percentages2[i] === percentages[i] ? "are even" : "are not even"
    }.`
  );
}

/////////////////////////////////////////////
/// Looping Backwards and Loops in Loops ///

// assignment 12
const listOfNeighbours = [
  ["Canada", "Mexico"], //coloum 1
  ["Spain"], //coloumn 2
  ["Norway", "Sweden", "Russia"], //clouumn 3
];
// looping backwards
for (let i = listOfNeighbours.length - 1; i >= 0; i--) {
  console.log(listOfNeighbours[i]);
}
//loops in loopps
for (let i = 0; i < listOfNeighbours.length; i++) {
  console.log(`Country: ${listOfNeighbours[i][0]}`);
  for (let j = 1; j < listOfNeighbours[i].length; j++) {
    console.log(`Neighbours: ${listOfNeighbours[i][j]}`);
  }
}

///////////////////////
/// The While Loop ///

let dice = Math.trunc(Math.random() * 6) + 1;
while (dice !== 6) {
  console.log(`You rolled a ${dice}`);
  dice = Math.trunc(Math.random() * 6) + 1;
}

// assignment 13 (11 in while loop)
const populations = [274, 127, 1440, 7900];
function percentageOfWorld1(population) {
  return `${(population / 7900) * 100}%`;
}
const percentages3 = new Array(4);
let i = 0;
while (i < percentages3.length) {
  percentages3[i] = percentageOfWorld1(populations[i]);
  console.log(percentages3[i]);
  i++;
}
console.log(percentages3);
*/
