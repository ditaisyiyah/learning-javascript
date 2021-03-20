'use strict';

////////////////////
/// BANKIST APP ///

// DIFFERENT DATA! Contains movement dates, currency and locale

const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2021-03-09T17:01:17.194Z',
    '2021-03-14T23:36:17.929Z',
    '2021-03-18T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2021-03-1014:43:26.374Z',
    '2021-03-15T18:49:59.371Z',
    '2021-03-18T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

// CREATE username property in each account
const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(word => word[0])
      .join('');
  });
};
createUsernames(accounts);
// console.log(accounts);

// Intl DATE of movements
const formatMovDate = function (date, locale) {
  const calcDaysPassed = (date1, date2) =>
    Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));

  const daysPassed = calcDaysPassed(new Date(), date);

  if (daysPassed === 0) return 'Today';
  if (daysPassed === 1) return 'Yesterday';
  if (daysPassed <= 7) return `${daysPassed} days ago`;

  return new Intl.DateTimeFormat(locale).format(new Date());
};

// Intl NUMBER of values
const formatNumber = function (value, cur, locale) {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: cur,
  }).format(value);
};

// DISPLAY movements
const displayMovements = function (account, sort = false) {
  // console.log(containerMovements.innerHTML);
  containerMovements.innerHTML = '';

  const movs = sort
    ? account.movements
        .slice() // create a copy
        .sort((a, b) => a - b) // ascending bottom up
    : account.movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const occDate = new Date(account.movementsDates[i]);
    const formattedDate = formatMovDate(occDate, account.locale);

    const formattedMov = formatNumber(
      mov.toFixed(2),
      account.currency,
      account.locale
    );

    const html = `
    <div class="movements__row">
      <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
      <div class="movements__date">${formattedDate}</div>
      <div class="movements__value">${formattedMov}</div>
    </div>`;

    containerMovements.insertAdjacentHTML('afterbegin', html);
    // 'afterbegin' =>  newest will appear on the top
  });
};

// BALANCE
const calcDisplayBalance = function (account) {
  // Create Balance property
  account.balance = account.movements.reduce((accum, mov) => accum + mov, 0);

  // Display balance
  labelBalance.textContent = formatNumber(
    account.balance.toFixed(2),
    account.currency,
    account.locale
  );
};

// SUMMARIES
const calcDisplaySummary = function (account) {
  // Income
  const income = account.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);

  labelSumIn.textContent = formatNumber(
    income.toFixed(2),
    account.currency,
    account.locale
  );

  // Outcome
  const outcome = account.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);

  labelSumOut.textContent = formatNumber(
    Math.abs(outcome).toFixed(2),
    account.currency,
    account.locale
  );

  // Interest
  const interest = account.movements
    .filter(mov => mov > 0)
    .map(income => (income * account.interestRate) / 100)
    .filter(int => int > 1)
    .reduce((acc, int) => acc + int, 0);

  labelSumInterest.textContent = formatNumber(
    interest.toFixed(2),
    account.currency,
    account.locale
  );
};

// UPDATE UI - LOGIN
const updateUI = function (account) {
  // Display Movements
  displayMovements(account);
  // Balance
  calcDisplayBalance(account);
  // Summaries
  calcDisplaySummary(account);
};

// CLEAR INPUT FIELDS - LOGIN
const clearFields = function () {
  inputLoginUsername.value = inputLoginPin.value = '';
  inputTransferTo.value = inputTransferAmount.value = '';
  inputLoanAmount.value = '';
  inputCloseUsername.value = inputClosePin.value = '';
};

// TIMER
const startLogOutTimer = function () {
  // Start countdown for
  let time = 3 * 60;

  // Tick function
  const tick = function () {
    // Adjust display
    const min = String(Math.trunc(time / 60)).padStart(2, 0);
    const sec = String(Math.trunc(time % 60)).padStart(2, 0);

    // Display remaining time to UI
    labelTimer.textContent = `${min}:${sec}`;

    // Time is out
    if (time === 0) {
      // Stop timer
      clearInterval(timer);

      // Display message and Hide out
      labelWelcome.textContent = 'Log in to get started';
      // containerApp.style.opacity = 0;
    }

    // Decreasing
    time--;
  };

  // Start countdown
  tick(); // debugging slow response timer
  const timer = setInterval(tick, 1000);

  return timer; // debugging overlaped timer
};

// EVENT HANDLERS //

// LOGIN account
let currentAccount, timer;

// Fake always logged in
// currentAccount = account1;
// updateUI(currentAccount);
// containerApp.style.opacity = 100;

btnLogin.addEventListener('click', function (e) {
  e.preventDefault(); // Prevent form from submitting

  // Get current account
  currentAccount = accounts.find(
    acc => acc.username == inputLoginUsername.value
  );
  // console.log(currentAccount);

  if (currentAccount?.pin === +inputLoginPin.value) {
    // console.log('LOGIN')

    // Clear all input fields
    clearFields();
    inputLoginPin.blur();

    // Display UI and Message
    labelWelcome.textContent = `Welcome, ${
      currentAccount.owner.split(' ')[0]
    }!`;
    containerApp.style.opacity = 100;

    // Create current Date and Time
    const timeOfNow = {
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    };

    labelDate.textContent = new Intl.DateTimeFormat(
      currentAccount.locale,
      timeOfNow
    ).format(new Date());

    // Update UI
    updateUI(currentAccount);

    // Timer
    if (timer) clearInterval(timer);
    timer = startLogOutTimer();
  }
});

// TRANSFER
btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = +inputTransferAmount.value;
  // console.log(amtTransfer);
  const receiver = accounts.find(acc => acc.username === inputTransferTo.value);
  // console.log(receiver);

  // Check
  if (
    amount > 0 &&
    currentAccount.balance >= amount &&
    receiver &&
    receiver.username !== currentAccount.username
  ) {
    // console.log('TRANSFER');

    // Clear input fields
    inputTransferTo.value = inputTransferAmount.value = '';

    // Receiver account
    receiver.movements.push(amount);
    receiver.movementsDates.push(new Date().toISOString());

    // Sender account
    currentAccount.movements.push(-amount);
    currentAccount.movementsDates.push(new Date().toISOString());

    // Update UI
    updateUI(currentAccount);

    // Reset Timer
    clearInterval(timer);
    timer = startLogOutTimer();
  }
});

// LOAN
btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amtLoan = Math.floor(inputLoanAmount.value);

  // Check
  if (
    amtLoan > 0 &&
    currentAccount.movements.some(mov => mov >= amtLoan * 0.1)
  ) {
    // Set fake bank processing
    setTimeout(function () {
      // Clear input fields
      inputLoanAmount.value = '';

      // Push movement and date
      currentAccount.movements.push(amtLoan);
      currentAccount.movementsDates.push(new Date().toISOString());

      // Update UI
      updateUI(currentAccount);
    }, 3000);

    // Reset Timer
    clearInterval(timer);
    timer = startLogOutTimer();
  }
});

// CLOSE
btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  // Check
  if (
    currentAccount.username === inputCloseUsername.value &&
    currentAccount.pin === +inputClosePin.value
  ) {
    // console.log('CLOSED');
    // Clear input fields
    inputCloseUsername.value = inputClosePin.value = '';

    // Get index
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );

    // Delete account
    accounts.splice(index, 1);
    console.log(index, accounts);

    // Hide UI
    containerApp.style.opacity = 0;
  }
});

// SORT
let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();

  displayMovements(currentAccount, !sorted);
  sorted = !sorted; // set back to the default: false
});

///////////////
/// LECTURE ///
///////////////

////////////////////////////////////////
/// Converting and Checking Numbers ///
/*
// Base float type
console.log(23 === 23.0);

// Base binary number: 0 and 1
console.log(0.1 + 0.2);
console.log(0.1 + 0.2 === 0.3);

// Conversion
console.log(Number('23'));
console.log(+'23'); // start use this!

// Parsing, get a Number in a String
console.log(Number.parseInt('30px', 10));
console.log(Number.parseInt('e23', 10)); // NaN

console.log(Number.parseInt('  2.5rem'));
console.log(Number.parseFloat('  2.5rem'));

// console.log(parseFloat('  2.5rem')); // not recommended

// Check if value is NaN type
console.log(Number.isNaN(20)); // Number
console.log(Number.isNaN('20')); // String
console.log(Number.isNaN(+'20X')); // NaN because force to be converted
console.log(Number.isNaN(20 / 0)); // Infinite

// Check if value is Number type
console.log('---isFinite---');
console.log(Number.isFinite(20)); // Number
console.log(Number.isFinite(0.1 + 0.2)); // Number

console.log(Number.isFinite('20')); // String
console.log(Number.isFinite(+'20X')); // NaN because force to be parsed
console.log(Number.isFinite(20 / 0)); // Infinite

// Check if value is Integer
console.log(Number.isInteger(20));
console.log(Number.isInteger(0.1 + 0.2));
*/
//////////////////////////
/// Math and Rounding ///
/*
console.log(Math.sqrt(25));
console.log(8 ** (1 / 2));

console.log(Math.max(1, 4, 16, 5, 10));
console.log(Math.max(1, 4, '16', 5, 10)); // does coercion
console.log(Math.max(1, 4, '16m', 5, 10)); // not parsing

console.log(Math.min(1, 4, 16, 5, 10));

console.log(Math.PI * Number.parseFloat('10px') ** 2);

console.log(Math.random()); // 0 < x < 1
console.log(Math.trunc(Math.random() * 6) + 1); // 1 <= x <= 6

// Create a function instead
const randomInt = (min, max) =>
  Math.trunc(Math.random() * (max - min) + 1) + min;
// 0 < x < 1
// 0 < x < (max - min)
// 1 < x < ((max - min + 1)
// (min + 1) < x < (max + 1)
console.log(randomInt(0, 4));

// ROUNDING integers
console.log('---round---');
console.log(Math.round(16.4));
console.log(Math.round(16.5));

console.log('---ceil---');
console.log(Math.ceil(16.1));
console.log(Math.ceil(16.9));

console.log('---floor---');
console.log(Math.floor(16.1));
console.log(Math.floor(16.9));

console.log(Math.floor('16.9')); // Math. namespace does coercion

console.log('---trunc vs. floor---');
console.log(Math.trunc(-16.2));
console.log(Math.trunc(-16.9));

console.log(Math.floor(-16.2));
console.log(Math.floor(-16.9)); // start use floor!

// ROUNDING decimals
console.log((2.7).toFixed(0)); // does boxing
console.log((2.7).toFixed(3));
console.log((2.345).toFixed(2));
console.log(+(2.345).toFixed(2));

///////////////////////////
/// Remainder Operator ///
/*
console.log(7 % 2); // mod in Mathematics
console.log(6 % 2);

labelBalance.addEventListener('click', function () {
  [...document.querySelectorAll('.movements__row')].forEach(function (row, i) {
    if (i % 2 === 0) row.style.backgroundColor = 'pink';
    if (i % 3 === 0) row.style.backgroundColor = 'grey';
  });
});
*/
/////////////////////////////
/// BigInt: Big Integers ///
/*
// BigInt size is 53 bits not 64 bits
console.log(2 ** 53 - 1);
console.log(Number.MAX_SAFE_INTEGER);

console.log(2 ** 53 - 2);
console.log(2 ** 53 - 3);
console.log(2 ** 53 - 4);

console.log(BigInt(54761212));
console.log(54761212n);

// Operations
console.log(100n + 100n);
console.log(100n / 10n);

// Can NOT be mixed with other type
const huge = 9999999999999999999999n;
const num = 23;
console.log(huge * BigInt(num));

// Exceptions
console.log(20n > 15);
console.log(20n == '20'); // DOES coercion if ==

console.log(20n === 20); // does NOT coercion if ===
console.log(typeof 20n);

console.log(huge + ' is REALLY big number!');

// Divison
console.log(10n / 3n); // will be simplified
console.log(10 / 3);
*/
///////////////////////
/// Creating Dates ///
/*
const now = new Date();
console.log(now);

// FIRST way ('monthName dateNumber, yearNumber hh:mm:ss')
console.log('---1ST WAY---');
console.log(new Date('March 16, 1997'));
console.log(new Date('Mar 16 1997 16:03:00'));

console.log(new Date('February 30, 2011')); // DOES auto correction date
console.log(new Date('Feb 30 2011 16:60:60')); // does NOT auto correction time

console.log(new Date(account1.movementsDates[0]));

// SECOND way (yyyy, (MM - 1), dd, hh, mm, ss)
console.log('---2ND WAY---');
console.log(new Date(1997, 11, 10)); // Month starts at 0, Jan
console.log(new Date(1997, 11, 33, 5, 65, 16)); // DOES auto correction date and time

// THIRD way (timestamp: time in miliseconds relative to First date)
console.log('---3RD WAY---');
console.log(new Date(0)); // First date
console.log(new Date(3 * 24 * 60 * 60 * 1000)); // Timestamp for 4th day
console.log(Date.now()); // Timestamp for now

// WORKING with Date
const future = new Date(1997, 11, 10, 5, 30);
console.log(future);
// Get
console.log(future.getFullYear());
console.log(future.getMonth());
console.log(future.getDate());
console.log(future.getDay());
console.log(future.getHours());
console.log(future.getMinutes());
console.log(future.getSeconds());
// Set
future.setFullYear(2020);
console.log(future);

// Convert a date to ISO String
console.log(future.toISOString()); // 1997-12-09T22:30:00.000Z
// Convert a date to Timestamp
console.log(future.getTime()); // 881706600000
// Convert a timestamp to Date
console.log(new Date(881706600000)); // Wed Dec 10 1997 05:30:00
*/
/////////////////////////////
/// Operation With Dates ///
/*
let x = new Date('Mar 20, 2020');
let y = new Date(2020, 2, 20);
console.log(+x, +y); // Converted to timestamp (Numbers)

x = new Date(1997, 12, 10);
y = new Date(1997, 12, 17);
const daysInBetween = (y - x) / (1000 * 60 * 60 * 24);
console.log(daysInBetween);

const date = new Date();
const day = `${date.getDate()}`.padStart(2, 0);
const month = `${date.getMonth() + 1}`.padStart(2, 0);
const year = `${date.getFullYear()}`;
console.log(`${day}/${month}/${year}`);
*/
/////////////////////////////////
/// Internationalizing Dates ///
/*
const theDate = new Date();
let optional = {
  weekday: 'long',
  day: 'numeric',
  month: 'short',
  year: '2-digit',

  hour: 'numeric',
  minute: 'numeric',
};

let print = new Intl.DateTimeFormat('id-ID', optional).format(theDate);
console.log(print);

const localeFormat = navigator.language;
console.log(localeFormat);

print = new Intl.DateTimeFormat(localeFormat).format(theDate); // keyword: ISO Language Code Table
console.log(print);
*/
///////////////////////////////////
/// Internationalizing Numbers ///
/*
const num = 16031012.1997;

optional = {
  style: 'currency',
  currency: 'IDR', // NOT provided by locale par
  unit: 'celsius',
  // useGrouping: false,
};

console.log(
  'US       : ',
  new Intl.NumberFormat('en-US', optional).format(num)
);
console.log(
  'Germany  : ',
  new Intl.NumberFormat('de-DE', optional).format(num)
);
console.log(
  'Indonesia: ',
  new Intl.NumberFormat('id-ID', optional).format(num)
);
console.log(
  `${navigator.language}    : `,
  new Intl.NumberFormat(navigator.language, optional).format(num)
);
*/
///////////////////////////////////////////////
/// Timers: setTimeOut and setTimeInterval ///

// TIME OUT
setTimeout(() => console.log(`Here I am! 🖐`), 3000);
console.log('Waiting someone...');

const ingridients = ['Mushroom', 'Spinach'];
const pizzaTimer = setTimeout(
  (ing1, ing2) =>
    console.log(`Here is your special Pizza 🍕 with ${ing1} and ${ing2}! 🤤`),
  7000,
  ...ingridients
);
setTimeout(() => console.log('Waiting pizza...'), 4000);

if (ingridients.includes('Spinach')) clearTimeout(pizzaTimer);

// TIME INTERVAL
setInterval(function () {
  const now = new Date();
  // console.log(now);
}, 3000);
