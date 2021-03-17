'use strict';

////////////////////
/// BANKIST APP ///

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

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

// LOGIN account
let currentAccount;
btnLogin.addEventListener('click', function (e) {
  e.preventDefault(); // Prevent form from submitting

  // Get current account
  currentAccount = accounts.find(
    acc => acc.username == inputLoginUsername.value
  );
  // console.log(currentAccount);

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // console.log('LOGIN')

    // Clear all input fields
    clearFields();
    inputLoginPin.blur();

    // Display UI and Message
    labelWelcome.textContent = `Welcome, ${
      currentAccount.owner.split(' ')[0]
    }!`;
    containerApp.style.opacity = 100;

    // Update UI
    updateUI(currentAccount);
  }
});

// CLEAR ALL INPUT FIELDS
const clearFields = function () {
  inputLoginUsername.value = inputLoginPin.value = '';
  inputTransferTo.value = inputTransferAmount.value = '';
  inputLoanAmount.value = '';
  inputCloseUsername.value = inputClosePin.value = '';
};

// UPDATE UI
const updateUI = function (account) {
  // Display Movements
  displayMovements(account.movements);
  // Balance
  calcDisplayBalance(account);
  // Summaries
  calcDisplaySummary(account);
};

// DISPLAY movements
const displayMovements = function (movements, sort = false) {
  // console.log(containerMovements.innerHTML);
  containerMovements.innerHTML = '';

  const movs = sort
    ? movements
        .slice() // create a copy
        .sort((a, b) => a - b) // ascending bottom up
    : movements;

  movs.forEach(function (mov) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    const html = `
    <div class="movements__row">
    <div class="movements__type movements__type--${type}">${type}</div>
    <div class="movements__date"></div>
    <div class="movements__value">${mov}€</div>
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
  labelBalance.textContent = `${account.balance}€`;
};

// SUMMARIES
const calcDisplaySummary = function (account) {
  const income = account.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${income}€`;

  const outcome = account.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + Math.abs(mov), 0);
  labelSumOut.textContent = `${outcome}€`;

  const interest = account.movements
    .filter(mov => mov > 0)
    .map(income => (income * account.interestRate) / 100)
    .filter(int => int > 1)
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${interest}€`;
};

// TRANSFER
btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Number(inputTransferAmount.value);
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

    // Sender account
    currentAccount.movements.push(-amount);

    // Update UI
    updateUI(currentAccount);
  }
});

// LOAN
btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amtLoan = Number(inputLoanAmount.value);

  // Check
  if (
    amtLoan > 0 &&
    currentAccount.movements.some(mov => mov >= amtLoan * 0.1)
  ) {
    // Clear input fields
    inputLoanAmount.value = '';

    // Push movement
    currentAccount.movements.push(amtLoan);

    // Update UI
    updateUI(currentAccount);
  }
});

// CLOSE
btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  // Check
  if (
    currentAccount.username === inputCloseUsername.value &&
    currentAccount.pin === Number(inputClosePin.value)
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
let sorted;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();

  if (!sorted) {
    // initial condition
    sorted = true;
    displayMovements(currentAccount.movements, sorted);
  } else {
    sorted = false;
    displayMovements(currentAccount.movements, sorted);
  }
});

///////////////
/// LECTURE ///
///////////////

//////////////////////////////
/// Simple Arrays Methods ///
/*
// SLICE (get)
// method(start index, end index - 1)
let arr = ['l', 'a', 'r', 'a', 's', 'a', 't', 'i'];
console.log(arr.slice(1)); // arasati
console.log(arr.slice(1, 3)); // ar
console.log(arr.slice(-1)); // i]
console.log(arr.slice(-3, -1)); // at
console.log(arr.slice(-2, 3)); //
console.log(arr.slice(2, -2)); // rasa
console.log(arr.slice(1, -3)); // aras
// console.log(arr);

// SPLICE (delete) - MUTATE
// method(start index, delete count)
console.log(arr.splice(1, 3)); // ara
console.log(arr); // lasati
console.log(arr.splice(-2)); // ti
console.log(arr); // lasa
console.log(arr.splice(1)); // asa
console.log(arr); // l

// REVERSE - MUTATE
arr = ['d', 'i', 't', 'a'];
console.log(arr.reverse());
console.log(arr);

// CONCAT
let arr2 = [1, 2, 3, 4];
console.log(arr.concat(arr2));
console.log([...arr, ...arr2]);
// console.log(arr, arr2);

// jOIN
console.log(arr.join(' <- '));
// console.log(arr);

/////////////////////////////////
/// Looping Arrays: FOR-EACH ///

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// FOR-OF
for (const [i, mov] of movements.entries()) {
  if (mov > 0) {
    // continue;
    // break;
    console.log(`Movement ${i + 1}: You deposited ${mov}`);
  } else console.log(`Movement ${i + 1}: You withdrew ${Math.abs(mov)}`);
}

// FOR-EACH
console.log('----forEach----');
movements.forEach(function (mov, i, arr) {
  if (mov > 0) {
    // Illegal statements:
    // continue;
    // break;
    console.log(`Movement ${i + 1}: You deposited ${mov}`);
  } else console.log(`Movement ${i + 1}: You withdrew ${Math.abs(mov)}`);
});

// FOR-EACH with Maps
const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);
currencies.forEach(function (value, key, map) {
  console.log(`${key}: ${value}`);
});

// FOR-EACH with Sets
const currenciesUnique = new Set(['USD', 'IDR', 'USD', 'EUR']);
currenciesUnique.forEach(function (value, _) {
  console.log(`${value}: ${value}`);
});

///////////////////////////
/// CODING CHALLANGE 1 ///

// Data of dog's age
const dogsJulia = [3, 5, 2, 12, 7];
const dogsKate = [4, 1, 15, 8, 3];

// the first and last two are NOT Julia's dogs
const dogsJuliaReal = dogsJulia.slice(1, -2);

const checkDogs = function (dogArray) {
  dogArray.forEach(function (age, number) {
    const type = age >= 3 ? 'adult ' : 'puppy 🐶';
    const desc = `Dog number ${
      number + 1
    } is an ${type}, and is ${age} years old`;
    console.log(desc);
  });
};

checkDogs(dogsJuliaReal);
console.log("----Kate's Dog----");
checkDogs(dogsKate);

///////////////////
/// MAP Method ///
/// return a new array from computed elements of ori array

const euroToUsd = 1.1;
let movementsUSD = movements.map(mov => mov * euroToUsd);
console.log(movements);
console.log(movementsUSD);

const movDesc = movements.map(
  (mov, i) =>
    `Movement ${i + 1}: You ${
      mov > 0 ? 'deposited 🙂' : 'withdrew 🙁'
    } ${Math.abs(mov)}`
);
console.log(movDesc);

// FOR-EACH
movementsUSD = [];
movements.forEach(function (mov) {
  movementsUSD.push(mov * euroToUsd);
});
// console.log(movementsUSD);

// FOR-OF
movementsUSD = [];
for (const mov of movements) movementsUSD.push(mov * euroToUsd);
// console.log(movementsUSD);

//////////////////////
/// FILTER Method ///
/// return a new array from filtered elements of ori array

let deposits = movements.filter(mov => mov > 0);
console.log(movements);
console.log(deposits);

let withdrawals = movements.filter(mov => mov < 0);
console.log(withdrawals);

// FOR-EACH
deposits = [];
withdrawals = [];
movements.forEach(function (mov) {
  if (mov > 0) deposits.push(mov);
  else if (mov < 0) withdrawals.push(mov);
});
// console.log(deposits);
// console.log(withdrawals);

// FOR-OF
deposits = [];
withdrawals = [];
for (const mov of movements) {
  if (mov > 0) deposits.push(mov);
  else if (mov < 0) withdrawals.push(mov);
}
// console.log(deposits);
// console.log(withdrawals);

//////////////////////
/// REDUCE Method ///
/// return single value from accumulation of elements

let balance = movements.reduce((acc, mov, ind, arr) => acc + mov, 0);
console.log(movements);
console.log(balance);

// FOR-EACH
balance = 0;
movements.forEach(function (mov) {
  return (balance += mov);
});
// console.log(balance);

// FOR-OF
balance = 0;
for (const mov of movements) balance += mov;
// console.log(balance);

// GETTING MAX value
const max = movements.reduce((accum, mov) => {
  if (accum > mov) return accum;
  else return mov;
}, movements[0]);
console.log(max);

///////////////////////////
/// CODING CHALLANGE 2 ///

// CONVERT dog ages to human ages
// CALCULATE the average age of dogs

const data = [5, 2, 4, 1, 15, 8, 3];

let calcAverageHumanAge = function (ages) {
  const humanAges = ages.map(age => (age <= 2 ? 2 * age : 16 + age * 4));
  // console.log(humanAges);
  const adultDogs = humanAges.filter(humAge => humAge >= 18);
  // console.log(adultDogs);
  const aveAge =
    adultDogs.reduce((acc, age) => acc + age, 0) / adultDogs.length; // return((),0)/x;
  // console.log(aveAge);
  return aveAge;
};
console.log(calcAverageHumanAge(data));

// SUMMARY
// FOR-LOOP, FOR-OF, and FOR-EACH are void and used to be only iteration any iterable objects

// CHAINING and PIPELINE
let pipeline = movements
  .filter(dt => dt > 0)
  .map(dt => dt * 2)
  .reduce((ac, dt) => ac + dt, 0);
console.log(movements);
console.log(pipeline);

pipeline = movements
  .filter((value, index, array) => {
    // console.log(array);
    return value > 0;
  })
  .map((value, index, array) => {
    // console.log(array);
    return value * 2;
  })
  .reduce((accumulator, value, index, array) => {
    // console.log(array);
    return accumulator + value;
  }, 0);
// console.log(pipeline);

// Do NOT over chaining and NOT include mutate method in

///////////////////////////
/// CODING CHALLANGE 3 ///

// adapted from cc 2
// RE-WRITE with using arrow function and chaining

calcAverageHumanAge = ages =>
  ages
    .map(age => (age <= 2 ? 2 * age : 16 + age * 4))
    .filter(humAge => humAge >= 18)
    .reduce((acc, age, _, arr) => acc + age / arr.length, 0); // return (()/x),0
console.log(calcAverageHumanAge(data));

// average = (data[0] + data [1]) / 2
// average = data[0]/2 + data[1]/2

/// OTHER METHODS
/////////////////////

// FIND, return single value (element)
const firstDeposit = movements.find(mov => mov > 0);
console.log(movements);
console.log(firstDeposit);

// FIND INDEX, return single value (index)
const firstIndexWithdrawal = movements.findIndex(mov => mov > 0);
console.log(firstIndexWithdrawal);

// SOME: check CONDITION, return boolean
const anyDeposit = movements.some(mov => mov > 0);
console.log(anyDeposit);

// INCLUDES: check EQUALITY, return boolean
const isThere = movements.includes(-130);
console.log(isThere);

// EVERY: check EVERY elements, return boolean
const getValues = movements.every(mov => mov > 0);
console.log(getValues);

// FLAT, return a new array from elements of ori array
let array = [[[1, 2], 3], [4, [5, 6]], 7, 8];
console.log(array.flat()); // level 1 deep
console.log(array.flat(2)); // level 2 deep

// FLATMAP = map + flat method
let newArray = array.flatMap(arr => arr); // auto level 1 deep
console.log(newArray);
newArray = array.map(arr => arr).flat(2);
console.log(newArray);

//SORT, MUTATE, auto Ascending, for String
let str = ['Hi', 'My', 'name', 'is', 'Dita'];
console.log(str.sort()); // Ascending
console.log(str); // Mutated

let num = [-200, 340, 32, 100, 0, 90];
console.log(num.sort()); // not for Number

// instead, do this below
num.sort(function (a, b) {
  if (a > b) return 1;
  else if (a < b) return -1;
});
// Ascending
console.log(num.sort((a, b) => a - b));
// Descending
console.log(num.sort((a, b) => b - a));

// FILL, MUTATE
arr = new Array(7);
console.log(arr);
// console.log(arr.map(()=> 5));
arr.fill(1);
console.log(arr);
arr.fill(3, 2, 4);
console.log(arr);

// FROM
// Array.from(array-like objects, callback())

// String
console.log(Array.from('foo'));
// Object
let x = Array.from({ length: 7 }, () => 1);
let y = Array.from({ length: 7 }, (_, i) => i + 1);
console.log(x, y);
// NodeList
labelBalance.addEventListener('click', function () {
  const movsInUI = Array.from(
    document.querySelectorAll('.movements__value'),
    el => el.textContent.replace('€', '')
  )
    .map(val => Number(val))
    .reduce((acc, val) => acc + val);

  console.log(movsInUI);

  // const firstStep = Array.from(document.querySelectorAll('.movements__value'));
  // const secondStep = firstStep.map(el => el.textContent.replace('€', '')).map((val=> Number(val)));
  // const thirdStep = secondStep.reduce((acc, val) => acc + val);
});

///////////////////////////////
/// ARRAY METHODS PRACTOCE ///

// 1)
const bankDepositSum = accounts
  .flatMap(acc => acc.movements)
  .filter(val => val > 0)
  .reduce((sum, val) => sum + val, 0);
console.log(bankDepositSum);

// 2)
const numDeposits1000 = accounts
  .flatMap(acc => acc.movements)
  .reduce((count, val) => (val >= 1000 ? ++count : count), 0);
console.log(numDeposits1000);

// 3)
// const sums = accounts
const { depos, withs } = accounts
  .flatMap(acc => acc.movements)
  .reduce(
    (sums, val) => {
      // val > 0 ? (sums.deposits += val) : (sums.withdrawals += val);
      sums[val > 0 ? 'depos' : 'withs'] += val;
      return sums;
    },
    { depos: 0, withs: 0 }
    // the initial value at the first iteration
  );
// console.log(sums);
console.log(depos, withs);

// 4) title case
const toTitleCase = function (string) {
  const capitalize = str => str[0].toUpperCase() + str.slice(1);

  const exceptions = ['a', 'or', 'the', 'and', 'but', 'also'];

  const converted = string
    .toLowerCase()
    .split(' ')
    .map(word => (exceptions.includes(word) ? word : capitalize(word)))
    .join(' ');
  return capitalize(converted);
};
console.log(toTitleCase('this Is a title CASE function'));
console.log(toTitleCase('alsO this Has been converted too'));
console.log(toTitleCase('but this is not too LONG functION'));
console.log(toTitleCase('and you gOt this, or not'));

///////////////////////////
/// CODING CHALLANGE 4 ///

const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] },
];
// right amount of curFood is 10% above and 10% below the recommendatiuon

//  1) Add recommended food PROPERTY of each dog
dogs.forEach(dog => (dog.recFood = Math.trunc(dog.weight ** 0.75 * 28)));
console.log(dogs);

// 2) Is curFood of Sarah's dogs greater or lower than recFood?
const dogSarah = dogs.find(dog => dog.owners.includes('Sarah'));
console.log(dogSarah);
console.log(
  `Sarah's dog(s) is eating too ${
    dogSarah.curFood > dogSarah.recFood ? 'much' : 'little'
  }`
);

// 3) Create a new array of owners name based on curFood condition
const ownersEatTooLittle = dogs
  .filter(dog => dog.curFood < dog.recFood)
  .flatMap(dog => dog.owners);
console.log(ownersEatTooLittle);

const ownersEatTooMuch = dogs
  .filter(dog => dog.curFood > dog.recFood)
  .flatMap(dog => dog.owners);
console.log(ownersEatTooMuch);

// 4) Description of both arrays above
console.log(
  `${ownersEatTooLittle.flat().join(' and ')}'s dogs eat too little!`
);
console.log(`${ownersEatTooMuch.flat().join(' and ')}'s dogs eat too much!`);

// 5) Is there any dog's curFood = recFood?
console.log(dogs.some(dog => dog.curFood === dog.recFood));

// 6) Is there any dog's curFood in range below?
// curFood > 0.9*recFood && curFood < 1.1*recFood
const eatOkay = dog =>
  dog.curFood > 0.9 * dog.recFood && dog.curFood < 1.1 * dog.recFood
    ? true
    : false;
console.log(dogs.some(dog => eatOkay(dog)));

// 7) Create a new array of that dogs with condition above
const dogOkay = dogs.filter(
  dog => dog.curFood > 0.9 * dog.recFood && dog.curFood < 1.1 * dog.recFood
);
console.log(dogOkay);

// 8) Create a new array with ascending recFood
const sortedDogs = dogs.slice().sort((a, b) => a.recFood - b.recFood);
console.log(sortedDogs);
*/
