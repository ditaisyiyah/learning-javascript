/// Data Sturtures, Modern Operators, and Strings ///
'use strict';

// Data needed for first part of the section
const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],

  openingHours: {
    thu: {
      open: 12,
      close: 22,
    },
    fri: {
      open: 11,
      close: 23,
    },
    sat: {
      open: 0, // Open 24 hours
      close: 24,
    },
  },
};

/// MODERN OPERATORS
//////////////////////////
/// Array Destruction ///
/*
// Destructing values
let arr = [2, 3];
let [a, b] = arr;
// let a = arr[0];
// let b = arr[1];
console.log(a, b); // 2 3

// Switch values
[a, b] = [b, a];
// a = b;
// b = a;
console.log(a, b); // 3 2

// what if
[b] = arr;
console.log(b); // 2
let [c, d, e] = arr;
console.log(c, d, e); // 2 3 undefined

// Default value instead get undefined
[c = 1, d = 1, e = 1] = arr;
// let temp = new Array(3);
// for (let i = 0; i < temp.length; i++) {
//   if (!arr[i]); arr[i] = 1;
//   temp.push(arr[i]);
// }
// let [c, d, e] = arr;
console.log(c, d, e); // 2 3 1

// Destructing array in array
arr = [2, 3, [4, 5]];
let [f, g, h, i] = arr;
console.log(f, g, h); // 2 3 [4, 5] undefined
[f, g, [h, i]];
console.log(f, g, h, i); // 2 3 4 5
[f, , [, g]];
console.log(f, g); // 2 5

// Method, destruct the return
restaurant.order = function (starterIndex, mainIndex) {
  return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
};
let [myStarter, myMain] = restaurant.order(2, 2);
console.log(myStarter, myMain);
// console.log(restaurant.order(2, 2));

///////////////////////////
/// Object Destruction ///

// Destructing object
const { name, categories } = restaurant;
// const name = restaurant.name;
// const categories = restaurant.categories;
console.log(name, categories);

// Change the property name
const { name: nama, categories: kategori } = restaurant;
// const nama = restaurant.name;
// const kategori = restaurant.categories;
console.log(nama, kategori);

// Default value
const { menu = [], starterMenu: starters = [] } = restaurant;
console.log(menu, starters);

// Mutate variable
let x = 11;
let y = 99;
const obj = { x: 2, y: 3, z: 4 };
({ x, y } = obj);
// { x, y } = obj;
console.log(x, y);

// Nested object
const { open: buka, close: tutup } = restaurant.openingHours.fri;
// const {
//   openingHours: {
//     fri: { open: buka, close: tutup },
//   },
// } = restaurant;
console.log(buka, tutup);

// Method, return defaul value
restaurant.orderDelivery = function ({
  name = 'anonymous',
  location = 'unknown location',
  categoriesIndex = 0,
  starterMenuIndex = 0,
  mainMenuIndex = 0,
}) {
  // console.log(this);
  console.log(`
  ${name} at ${location} ordered: 
  ${this.categories[categoriesIndex]},
  ${this.starterMenu[starterMenuIndex]}, and
  ${this.mainMenu[mainMenuIndex]}.
  `);
};
restaurant.orderDelivery({
  name: 'Dita Larasati',
  location: 'Jakarta',
  categoriesIndex: 2,
  starterMenuIndex: 3,
  mainMenuIndex: 2,
});
restaurant.orderDelivery({});
restaurant.orderDelivery({
  name: 'Doi',
  location: 'Not in my heart',
});

// as initialiizing object, we use
// : to set the value inside that variable
// as distructing object, we use
// : to change the variable/property name
// = to set default value for that variable

//////////////////////////////////
/// The Spread Operator (...) /// for ITERABLE objects:
// String, Array, Maps, Sets. NOT OBJECT

// String
let str = 'Dita';
let newStr = [...str]; // assigned into an array
console.log(...str, newStr);
// console.log(`${...str} Larasati`); // unexpected token
// let strNew = ...str + 'H'; // unexpected token

// Array
arr = [5, 6, 7];
// let newArr = [4, arr[0], arr[1], arr[2], 8];
let newArr = [4, ...arr, 8]; // assigned into an new array
console.log(...arr, newArr);

// Adding new element of an array of the object
let updateMenu = [...restaurant.mainMenu, 'Gnocci'];
console.log(...restaurant.mainMenu);

// Merging array properties of the object
let allMenu = [...restaurant.mainMenu, ...restaurant.starterMenu];
console.log(allMenu);

// Adding properties to an object
let copyRestaurant = {
  founder: 'Dita Larasati',
  ...restaurant, // spread operator is applied to object
  established: 1997,
};
// let newRestaurant = {...restaurant};
// newRestaurant.founder = 'Dita Larasati';
// newRestaurant.established = 1997;
console.log(copyRestaurant);
// console.log(...copyRestaurant); // NON-CALLABLE

// Passing arguments with SPREAD
restaurant.orderPasta = function (ing1, ing2, ing3) {
  return `You ordered pasta with ingridients ${ing1}, ${ing2}, and ${ing3}.`;
};
// const ingridient1 = prompt('Order pasta? Inset your ingridient 1:');
// const ingridient2 = prompt('Ingridient 2:');
// const ingridient3 = prompt('Ingridient 3:');
// const ingridients = [ingridient1, ingridient2, ingridient3];
// console.log(restaurant.orderPasta(...ingridients));

//////////////////////
/// Rest Operator /// for ARRAY or OBJECT

// Destruction, to unpackage values and be treated seperately
// Spread, to unpackage values and be treated in unity
// Rest, to package the rest values of an array into new array

// SPREAD, right side, in seperating values
[a, b, c] = [3, ...[4, 5]];
console.log(a, b, c);
// REST, left side, in seperating variable
[a, ...newArr] = [6, 7, 8];
console.log(a, ...newArr);
// [a, ...newArr, b, c] = [1, 2, 3, 4, 5];
// console.log(a, ...newArr);

// Storing array values into a new array
let [starter1, ...otherStarter] = restaurant.starterMenu;
console.log(starter1, otherStarter);
// console.log(...otherStarter);

// Storing object properties into an new object
let { sat: weekend, ...weekdays } = restaurant.openingHours;
console.log(weekend, weekdays);
// [sat, ...weekdays] = restaurant.openingHours;
// console.log(sat, weekdays);

// Passing arguments with REST
function add(...numbers) {
  // console.log(numbers);
  let sum = 0;
  for (let i = 0; i < numbers.length; i++) {
    sum += numbers[i];
  }
  console.log(sum);
}
add(2, 3);
add(4, 5, 6);
// arr = [1, 2];
// add(...arr);

restaurant.orderPizza = function (mainIngridient, ...otherIngridients) {
  console.log(mainIngridient);
  console.log(otherIngridients);
};
restaurant.orderPizza('mushrooms', 'spinach', 'seafoods');

/////////////////////////////////////
/// Short Circuiting (&& and ||) /// NOT return BOOLEAN

// OR ||
console.log('-----OR------');

console.log('Dita' || ''); // Dita
console.log(0 || 'Dita'); // Dita

console.log(null || undefined); // null
console.log(0 || null); // null

console.log(null || 0 || 'Dita' || 3); // Dita

// AND &&
console.log('-----AND-----');

console.log(0 && 'Dita'); // 0
console.log(7 && 'Dita'); // Dita

console.log(0 && null); // 0
console.log(7 && null); // null

console.log(2 && 'Dita' && 0 && null); // 0

// Practical example
restaurant.orderPizza && restaurant.orderPizza('mushroom', 'vegetables');
// if (restaurant.orderPizza) {
//   restaurant.orderPizza('mushroom', 'vegetables');
// }

// || for set a default value if the first operand is false
// && for make second operand code if the first operand is true

/////////////////////////////////////////////
/// The Nullish Coalescing Operator (??) /// check NULLISH:
// NULL or UNDEFINED (NOT 0 or '')

restaurant.mainMenu = 0;
let check = restaurant.mainMenu ?? 'Pasta';
console.log(check);

let check2 = restaurant.dessert ?? 'Ice Cream';
console.log(check2); // if dessert is nullish, logs ice cream

////////////////////////
/// The for-of Loop /// for ITERABLE objects:
// String, Array, Maps, Sets. NOT OBJECT

for (const item of allMenu) console.log(item);
// for (const [item] of allMenu) console.log(item);

// Array.entries() to log each item includes its index in array
for (const item of allMenu.entries()) console.log(item);
// console.log(...allMenu.entries());

// Computing the elements of colomn
for (const [number, item] of allMenu.entries())
  console.log(`${number + 1}: ${item}`);
// for (const item of allMenu.entries()) console.log(`${item[0] + 1}: ${item[1]}`);

////////////////////////////////
/// Enhanced Object Literal ///
*/
const days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];

// 1) Creating object in object outside
const fasting = {
  // 2) Changing property name as creating
  [days[0]]: {
    start: 0,
    stop: 12,
  },
  // 2) ..computed property name is always using []
  // [`day${1 + 3}`]: {
  [days[3]]: {
    start: 12,
    stop: 0,
  },
};

const myObj = {
  name: 'Dita',
  // 1)
  fasting, // must be initialized before

  // fasting: {
  //   mon: {
  //     start: 0,
  //     stop: 12,
  //   },
  //   thu:{
  //     start: 12,
  //     stop: 0,
  //   }
  // },

  //  3) Simplifing function syntax
  fiberIntake(foods) {
    if (foods == 'vegetable') console.log(200);
  },

  // fiberIntake: function (foods) {
  //   if(foods=='vegetable') console.log(200);
  // },
};

console.log(myObj);

///////////////////////////////
/// Optional Chaining (?.) /// for FUNCTION or OBJECT

console.log(myObj.fasting.sat?.start); // undefined
// if (myObj.fasting? && myObj.fasting.sat.start) console.log(myObj.fasting.sat.start);  // error

// Object
for (const day of days) {
  // const start = myObj.fasting[day]?.start;
  // const start = myObj.fasting[day]?.start || 4;
  const start = myObj.fasting[day]?.start ?? 4;

  // let start = 0;
  // if (myObj.fasting[day]) start = myObj.fasting[day].start;
  // else start = 4;

  console.log(`On ${day}, fasting begin at ${start} `);
}

// Method
console.log(myObj.fiberIntake?.('meat') ?? "Method deosn't exist");

// Array
arr = [{ name: 'Dita', country: 'Indonesia' }];
console.log(arr[0]?.country ?? 'Array is empty');

/// DATA STRUCTURES
//////////////////////////////////////////////////////////
/// Looping Objects: Object Keys, Values, and Entries /// return in ARRAY
/// Allow Object become ITERABLE

// KEYS or property's names
const inWeek = Object.keys(myObj.fasting);
console.log(inWeek); // [name,]

let desc = `Dita's fasting is on ${inWeek.length} day(s): `;
for (const day of inWeek) {
  let cription;
  if (day === inWeek[inWeek.length - 1]) cription = `${day}.`;
  else cription = `${day}, `;
  desc += cription;
}
console.log(desc);

// VALUES or property's values
const values = Object.values(myObj.fasting);
console.log(values); // [value,]

// ENTRIES or property's names and values 
const entries = Object.entries(myObj.fasting);
console.log(entries); // [name[value,value],]

// Practical example
for (const [day, { start, stop }] of entries) {
  console.log(
    `On ${day}, Dita starts fasting at ${start} and stops at ${stop}.`
  );
}
/*
/////////////
/// Sets /// unique version of Array
/// Ignores duplicates and easy to compute size

let mySet = new Set(['Pizza', 'Pasta', 'Risotto', 'Pasta', 'Pasta', 'Pizza']);
console.log(mySet, mySet.size);

let data = 'larasati';
mySet = new Set(data);
console.log(mySet);

// Storing into an array
let myArr = [...mySet];
console.log(myArr);
myArr = [...new Set('Dita')];
console.log(myArr);

// Built-ins
console.log(mySet.has('d'));
console.log(mySet.has('z'));
mySet.add(3);
console.log(mySet);
mySet.delete(3);
console.log(mySet);
mySet.clear();
console.log(mySet, mySet.size);

/////////////////////////////////////////
/// Maps: Fundamentals and Iteration ///
/// As an Object but easy to iterate, compute size, and the key could be any data type
/// Use this when you need the Keys that are not String
/// Use Object when you need to include a Funtion (Method)

/// FUNDAMENTALS

let myMap = new Map();
console.log(myMap);

// Adding entries with .set(key, value)
myMap.set('name', 'Dita Larasti');
console.log(myMap);

// Multiple set
myMap
  .set('favorites', ['you', 'you', 'still you'])
  .set(true, 'that i miss you')
  .set([10, 12], 'is my birthday');
console.log(myMap);

// Built-ins
console.log(myMap.get('you')); // undefined
console.log(myMap.get(true));

console.log(myMap.has('you')); // false
console.log(myMap.has(0)); // false
console.log(myMap.has([10, 12])); // false instead of true
arr = [10, 12];
myMap.set(arr);
console.log(myMap.has(arr)); // true

myMap.delete(arr);
console.log(myMap);
myMap.delete('her');
console.log(myMap); // no changes
// myMap.clear();
// console.log(myMap, myMap.size);

// Practical example
console.log(
  myMap.get(
    myMap.get('favorites').length > 0 && myMap.get('favorites').includes('you')
  )
);

console.log(myMap.set(document.querySelector('h1'), 'this section is about'));

/// ITERATION

// Practical example
const question = new Map([
  ['question', 'What is the best programming language in the world?'],
  [1, 'C'],
  [2, 'Java'],
  [3, 'JavaScript'],
  ['correct', 3],
  [true, 'Correct 🎉'],
  [false, 'Try Again!'],
]);
console.log(question);

// let answer = prompt(question.get('question'));
// console.log(
//   question.get(answer == question.get(3) || answer == question.get('correct'))
// );

// Running in for-of loop
for (const [key, value] of question) {
  if (typeof key === 'number') console.log(`Answer ${key}: ${value}`);
}

// Converting object to array, Object.entries(object)
console.log(Object.entries(myObj.fasting));

// Converting object to map
let fastingMap = new Map(Object.entries(myObj.fasting));
console.log(fastingMap);

// Converting map to array, as object does
console.log([...question.entries()]);
// because map passes array argument, just do this below
console.log([...question]);

console.log([...question.keys()]);
console.log([...question.values()]);
*/
// EXPECTED: understand the discrepancies of: Arrays, Sets, Objects, and Maps

/// STRINGS
///////////////////////////////
/// Working with Strings 1 ///

const airline = 'Batik Air Indonesia';
const plane = 'ID6884';

console.log(plane[0]); // I
console.log(airline[5]); // space
console.log('Dita'[1]); // D

console.log(airline.length); // 19
console.log('Dita'.length); // 4

console.log(airline.indexOf('a')); // 1
console.log(airline.lastIndexOf('a')); // 18
console.log(airline.indexOf('Air')); // 6

console.log(airline.slice(6)); // a
//start, end before
console.log(airline.slice(6, 9)); // Air

console.log(airline.slice(airline.indexOf(' ') + 1, airline.lastIndexOf(' ')));
// (5+1,9) Air

console.log(airline.slice(-2)); // ia
console.log(airline.slice(-2, 1)); // no console
console.log(airline.slice(1, -1)); // atik Air Indonesi

// Practical example
const checkMiddleSeat = function (seat) {
  // B and E are middle seats
  const letter = seat.slice(-1);
  if (letter === 'B' || letter === 'E') console.log('Your got the middle seat');
  else console.log('You got lucky!');
};
checkMiddleSeat('20B');
checkMiddleSeat('1A');

// WHY?
console.log(new String('Dita'));
console.log(typeof new String('Dita')); // coercion, boxing
console.log(typeof new String('Dita').slice(0)); // String

///////////////////////////////
/// Working with Strings 2 ///

const address = ' ditalara19@gmail.com \n';
const realAddress = 'ditalara19@gmail.com';

// Case sensitive
console.log(address.toUpperCase().toLowerCase().trim()); // realAddress
// console.log(address.toUpperCase());
// console.log(address.toLowerCase());
// console.log(address.trim());

// Replace char or string
console.log(airline.replace(' ', ','));
console.log(airline.replaceAll(' ', ','));
console.log(airline.replace('Air', 'Water'));

// Booleans in return
console.log(realAddress.includes('@'));
console.log(realAddress.startsWith('dita'));
console.log(realAddress.endsWith('.com'));

// Practical example
if (realAddress.endsWith('@gmail.com')) {
  console.log('Thank you for using Google service!');
}

const checkBaggage = function (items) {
  const forbiden = 'knife';
  items.toLowerCase();
  if (!items.includes(forbiden)) console.log('Enjoy your flight!');
  else console.log(`You can't bring ${forbiden} into the airplane.`);
};
checkBaggage('I bring a knife for my safety');

///////////////////////////////
/// Working with Strings 3 ///

// Split and join
console.log('dita_larasati'.split('_'));
console.log(airline.split(' '));

arr = [1, 2, 3, 4];
console.log(arr.join(', '));

const [firstName, lastName] = 'Dita Larasati'.split(' ');
const fullName = ['Mrs.', firstName, lastName.toUpperCase()].join(' ');
console.log(fullName, typeof fullName);

// Practical example
const capitalizeName = function (name) {
  let arrName = [];
  for (let n of name.split(' ')) {
    arrName.push(n.replace(n[0], n[0].toUpperCase()));
  }
  console.log(arrName.join(' '));
  // console.log(...arrName);
};
capitalizeName('dita aisyiyah larasati');

// Padding
console.log('dita'.padStart(8, '-').padEnd(12, '-'));
console.log('dita'.padEnd(6, '💜'));

// Practical example
const encryption = function (numbers) {
  const number = String(numbers);
  const encrypted = number.slice(0, -4).padEnd(number.length, 'X');
  return encrypted;
};
console.log(encryption(10121997));
console.log(encryption('iloveyou'));

////////////////////////////////
/// String Methods Practice ///

const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

// 🔴 Delayed Departure from FAO to TXL (11h25)
//              Arrival from BRU to FAO (11h45)
//   🔴 Delayed Arrival from HEL to FAO (12h05)
//            Departure from FAO to LIS (12h30)

for (let flight of flights.split('+')) {
  const [type, from, to, time] = flight.split(';');

  const output = `${type.includes('Delayed') ? '🔴' : ' '} ${type.replaceAll(
    '_',
    ' '
  )} from ${from.slice(0, 3).toUpperCase()} to ${to
    .slice(0, 3)
    .toUpperCase()} (${time.replace(':', 'h')})`.padStart(60, ' ');

  console.log(output);
}
