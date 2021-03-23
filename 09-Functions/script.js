/// FUNCTIONS ///
'use strict';

//////////////////////////
/// Default Parameter ///

const bookings = [];
const flights = function (flightNum, numPassangger = '7A', price = 650) {
  const booking = {
    flightNum,
    numPassangger,
    price,
  };
  bookings.push(booking);
};
flights('ID1997', '12B', 600);
flights('ID1603');
flights('ID1012', undefined, 700);
console.log(bookings);

////////////////////////////////////
/// How Passing Arguments Works /// value vs. reference

const flight = 'ID1603';
const dita = {
  name: 'Dita Larasati',
  passport: '123999',
};

const checkIn = function (flight, person) {
  flight = 'JP1997';
  person.name = `Ms. + ${person.name}`;
  // if (person.passport === '123999') alert('Check In!');
  // else alert('Wrong Passport!');
};
checkIn(flight, dita);
console.log(flight);
console.log(dita);

const newPassport = function (person) {
  person.passport = Math.trunc(Math.random() * 1000000);
};
newPassport(dita);
checkIn(flight, dita);

// JS is always PASSING VALUES, that means passing is as copying the stack
// primitive value is copied. object reference is copied but the object value is not copied, it will changes

/////////////////////////////////////
/// Accepting Callback Functions ///

// Callback or Low-Level Functions
const oneWord = function (str) {
  return str.split(' ').join('');
};
const upperFirstWord = function (str) {
  const [first, ...others] = str.split(' ');
  return [first.toUpperCase(), ...others].join(' ');
};

// Higher-Order Function
const transformer = function (str, fn) {
  console.log(`Original text: ${str}`);
  console.log(`Transformed text: ${fn(str)}`);
  console.log(`Transformed by ${fn.name}`);
};
transformer('This is JavaScript', upperFirstWord);
transformer('This is JavaScript', oneWord);

// Callback Function in built-in Functions
const say = function () {
  console.log('Hi!');
};
['Dita', 'Noni', 'Mala'].forEach(say);

////////////////////////////
/// Returning Functions ///

const greet = function (greeting) {
  return function (name) {
    console.log(`${greeting} ${name}`);
  };
};
// Arrow function version
// const greet = greeting => name => console.log(`${greeting} ${name}`);
greet('Hallo!');
const greeterHey = greet('Hey!');
greeterHey('Dita!');
greet('Hi!')('Dude!');

//////////////////////////////////////////
/// The Call, Apply, and Bind Methods ///

const garuda = {
  airline: 'Garuda Indonesia',
  airlineCode: 'GA',
  bookingList: [],
  // bookings: function () {}
  bookings(flightNumber, passanggerName) {
    const isBooked = `${this.airlineCode}${flightNumber} has ${passanggerName}`;
    this.bookingList.push(isBooked);
    console.log(this);
  },
};
garuda.bookings(123, 'Dita Larasati');

// MUST Storing a function (NOT method) into a variable
const book = garuda.bookings;
console.log(book);
// book(234, 'Liam Neeson'); // does NOT work

const citilink = {
  airline: 'Citilink Indonesia',
  airlineCode: 'CT',
  bookingList: [],
};

// CALL method: calls an object's function from "this" object
// storedFunctionName.call(this, arguments)
// this = another object name
// arguments = arguments that fit into stored-function
book.call(citilink, 221, 'Sherlock Holmes');
book.call(garuda, 999, 'Liam Neeson');

const batik = {
  airline: 'Batik Air Indonesia',
  airlineCode: 'BA',
  bookingList: [],
};

// APPLY method: passes an Array in function of "this" objects
// storedFunctionName.apply(this, arguments)
const order = [509, 'Ganang Wahyu'];
// book.apply(batik, order);
// Use modern operators instead of Apply
book.call(batik, ...order);

// BIND method: creates a NEW function inside "this" that copying from another object
// newFunctionName = storedFunctionName.bind(this)
const bookGA = book.bind(garuda);
const bookCT = book.bind(citilink);
const bookBA = book.bind(batik);
bookGA(163, 'Hadhry Hafizhul');
bookCT(787, 'Halsey');
bookBA(898, 'Jung Hoseok');

// PARTIAL APPLICATION: preset partial argument
// newFunctionName = storedFunctionName.bind(this, argument1)
const bookGA111 = book.bind(garuda, 111);
bookGA111('Noni Monica');

// Practice
garuda.planes = 300;
garuda.buyPlane = function () {
  this.planes++;
  console.log(this.planes);
};
// garuda.buyPlane();
document
  .querySelector('.buy')
  .addEventListener('click', garuda.buyPlane.bind(garuda));

// General function
const addTax = (rate, value) => value + value * rate;
console.log(addTax(0.15, 600));
// New Spesific function
const addVAT = addTax.bind(null, 0.1); // null due to no THIS inside addTax function
// addVAT = value => value + value * 0.1;
console.log(addVAT(700));

// Returning function version
function addTax2(rate, value) {
  console.log(value + value * rate);
  return function addVAT2(rate, value) {
    console.log(value + value * rate);
  };
}
addTax2(0.15, 600)(0.1, 700);

//////////////////////////
/// CODING CHALLANGE 1 /// Build A Simple Poll App

// 1.1) Poll object
const poll = {
  question: 'What is your favorite programming language?',
  options: ['0: C++', '1: Python', '2: Java', '3: JavaScript'],
  answers: new Array(4).fill(0), // [0,0,0,0]

  // 1.2) Poll
  registerNewAnswer() {
    const answer = Number(
      prompt(
        `${this.question} \n${this.options.join('\n')} \n(Write option number))`
      )
    );
    // console.log(answer, typeof answer, this.answers);
    if (answer >= 0 && answer < this.answers.length) this.answers[answer]++;

    //  Call method that passing an Array due to poll.answers is an Array
    //  this.displayResults('array');
    //  this.displayResults();
    // },

    //  Display method, based on data type of argument, Array as default
    // displayResults(type = 'array') {
    //  if (type == 'array') console.log(this.answers);
    //  else if (type == 'string')
    //    console.log(`Poll results are ${this.answers.join(', ')}`);
    // },
    // };

    // Input dara from outside w/out changing the poll.answers
    // poll.displayResults.call({ answers: [5, 2, 3] }, 'string');
    // poll.displayResults.call({ answers: [1, 5, 3, 9, 6, 1] }, 'array');

    // 4) Display poll result
    return this.displayResults(this.answers);
  },

  // 3) Display
  displayResults(type) {
    if (typeof type == 'object') console.log(type);
    else if (typeof type == 'string')
      console.log(`Poll results are ${type.split('').join(', ')}`);
  },
};

// 5) Data outside object
poll.displayResults([5, 2, 3]);
poll.displayResults('153961');

// 2) Handler
document
  .querySelector('.poll')
  .addEventListener('click', poll.registerNewAnswer.bind(poll));

////////////////////////////////////////////////
/// Immediately Invoked Function Expression ///

(function () {
  console.log('This is called once');
  const isPrivate = 404;
})();
// console.log(isPrivate);

(() => console.log('This runs once either'))();

{
  const alsoIsPfrivate = 404;
  var isAccessible = 200;
  function privateFunction() {
    console.log('This function is encapsulated');
  }
}
// console.log(alsoIsPrivate);
console.log(isAccessible);
// privateFunction();

/////////////////
/// Closures ///

const secureBooking = function () {
  let passangerCount = 0;
  return function () {
    passangerCount++;
    console.log(`${passangerCount} passangers`);
  };
};

const booker = secureBooking; // passangerCount is closured
booker();
booker();
booker();

console.dir(booker);

// EXAMPLE 1 - global variable
let f;
const g = function () {
  const a = 11;
  f = function () {
    console.log(10 * a);
  };
};
const h = function () {
  const b = 12345;
  f = function () {
    console.log(100 * b);
  };
};

g(); // a is closured, f is assigned as function
f(); // calls f => 110
console.dir(f); // check [[Scopes]]

h(); // b is closured, f is RE-assigned as function
f(); // calls f => 1234500
console.dir(f); // check [[Scopes]]

// EXAMPLE 2 - arguments
const boardPassangers = function (n, wait) {
  const perGroup = n / 3;

  // setTimeout(function(), time in milisecond)
  setTimeout(function () {
    console.log(`We are now boarding all ${n} passangers`);
    console.log(`There are 3 groups, each with ${perGroup} passangers`);
  }, wait * 1000);

  console.log(`Will start boarding in ${wait} seconds`);
};

const perGroup = 999;
// Even after the boarPassangers EC destroyed,
// setTimeout can access perGroup, it is closured

boardPassangers(99, 3); // n amd wait are also closured

// Closure happens unconciously, chill

///////////////////////////
/// CODING CHALLANGE 2 ///

(function () {
  const header = document.querySelector('h1');
  header.style.color = 'red';

  document.querySelector('body').addEventListener('click', function () {
    header.style.color = 'purple';
  });
})();

// It is a typical function expression but immediately invoked, no need to give it a name
// After invoked, header is made and the color style will change
// Function in it, will invoked when 'click' is done
// After 'click', header will be called
// Header has been closed over
