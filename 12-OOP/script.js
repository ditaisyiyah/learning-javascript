/// Object-Oriented Programming ///
'use strict';

///////////////////////////////////////////////////////
/// 1. (Object) Constructor Function ///
// use regular function but NOT arrow

// Constructor functions
const Person = function (firstName, birthYear) {
  this.firstName = firstName;
  this.birthYear = birthYear;

  // NEVER do this, for performance's sake
  // this.calcAge = function () {
  //    console.log(2021 - this.birthYear);
  // };
};
console.log(Person);

// Create an object
const dita = new Person('dita', 1997);
console.log(dita);

// 1. New {} is created
// 2. () is called, this = {}
// 3. {} linked to prototype
// 4. () automatically return {}

console.log(dita instanceof Person);

// Adding a new property to existing object
dita.lastName = 'larasati';
console.log(dita);

// can NOT add a new method to object constructor
Person.calcAge = function () {
  console.log(`${this.firstName}'s age is ${2021 - this.birthYear}`);
};
// dita.calcAge();
console.log(Person.prototype);

///////////////////////////////////////////////////////
/// Protoype ///

// INSTEAD, add a new property or method into PROTOTYPE
Person.prototype.calcAge = function () {
  console.log(2021 - this.birthYear);
};
dita.calcAge();

// All JS objects inherit properties and methods from a prototype
console.log(Person.prototype);
console.log(dita.__proto__);

console.log(Person.prototype === dita.__proto__); // true
console.log(Person.prototype.isPrototypeOf(dita)); // true
console.log(Person.prototype.isPrototypeOf(Person)); // false
// protype is a property of person constructor in object form
// .prototypeOfLinkedObject

Person.prototype.species = 'Homo Sapiens';
console.log(dita.species, dita);

console.log(dita.hasOwnProperty('species'), dita); // false
console.log(dita.hasOwnProperty('firstName'), dita); // true

// Constructor did NOT changes, printed as has been typed
console.log(Person.prototype.constructor); // = console.log(Person);

///////////////////////////////////////////////////////
/// Prototypal Inheritance / Delegation ///

const arr = [3, 9, 3, 7, 8, 8]; // new Array() = []
// arr (Array) prototype
console.log(arr.__proto__);
console.log(arr.__proto__ === Array.prototype);

// Object prototype (top of prototype chain)
console.log(arr.__proto__.__proto__);
console.log(Array.prototype.__proto__);
console.log(Object.prototype);

console.log(arr.__proto__.__proto__.__proto__); // null

// Add prototype property of built-in object
Array.prototype.unique = function () {
  return [...new Set(this)];
};
console.log(arr.unique());
// NEVER do as above in practical for multiple reasons

console.dir(arr);

// Exploring the prototype chain below
const h1 = document.querySelector('h1');
console.dir(h1);
console.dir(x => x + 1); // do NOT forget, function is also an object

///////////////////////////////////////////////////////
/// CODING CHALLANGE 1 ///

const Car = function (make, speed) {
  this.make = make;
  this.speed = speed;
};

Car.prototype.accelerate = function () {
  this.speed += 10;
  console.log(`${this.make} is going at ${this.speed} km/h`);
};

Car.prototype.brake = function () {
  this.speed -= 5;
  console.log(`${this.make} is going at ${this.speed} km/h`);
};

const myCar = new Car('BMW', 120);
const ourCar = new Car('Mercedes', 95);

myCar.accelerate();
myCar.brake();
myCar.brake();

ourCar.brake();
ourCar.accelerate();
ourCar.accelerate();

///////////////////////////////////////////////////////
/// 2. ES6 Classes (Functions) ///

// Modern class concept, it seems like Java
// Still using prototypal inheritance
// Using class function that contains constructor function

// Class declaration
// const PersonCl = class {
//     construction(){...}
// ...
// }

// Class expression
class PersonCl {
  constructor(fullName, birthYear) {
    // INSTANCE fields/variables
    this.fullName = fullName;
    this.birthYear = birthYear;
  }

  // INSTANCE methods
  // will be added to .prototype property, it's outside of constructor!
  calcAge() {
    console.log(2021 - this.birthYear);
  }
  // HAD BETTER to add property or method inside the class
  greet() {
    console.log(`Hey, ${this.fullName}!`);
  }

  // ACCESSORS properties
  get age() {
    return 2021 - this.birthYear;
  }
  // validation fullName property that already exist/set
  set fullName(name) {
    // console.log(name);
    // if (name.includes(' ')) this.fullName = name;
    if (name.includes(' ')) this._fullName = name;
    else alert(`${name} is not a full name!`);
  }
  get fullName() {
    return this._fullName;
  }
}

const scofield = new PersonCl('Michael Scofield', 1972);
console.log(scofield);
scofield.calcAge();

console.log(scofield.__proto__ === PersonCl.prototype);

// Adding method outside Class
// PersonCl.prototype.greet = function () {
//   console.log(`Hey ${this.fullName}!`);
// };
scofield.greet();

///////////////////////////////////////////////////////
/// Accessor Properties: Setters and Getters ///

const account = {
  owner: 'Dita',
  movements: [233, 200, 120],

  // ACCESSOR properties
  // Getter seems as other methods and RETURN typr
  get lastest() {
    return this.movements.slice(-1).pop();
  },
  // Setters is VOID type and has parameter
  set lastest(mov) {
    this.movements.push(mov);
  },
};

console.log(account.lastest);

// account.lastest(50);
account.lastest = 50;
console.log(account.movements);

// Add accessor properties into PersonCl class

const lincoln = new PersonCl('Lincoln Burrows', 1970);

lincoln.calcAge();
console.log(lincoln.age);

console.log(lincoln.fullName);
console.log(lincoln._fullName);

console.log(lincoln);
console.log(PersonCl);

///////////////////////////////////////////////////////
/// Static Methods ///

/// 1. CONSTRUCTOR FUNCTIONS

const Person2 = function (firstName, birthYear) {
  this.firstName = firstName;
  this.birthYear = birthYear;
};

Person2.calcAge = function () {
  console.log(`${this.firstName}'s age is ${2021 - this.birthYear}`);
};

Person2.calcAge();
Person.calcAge(); // GO TO JS:36

/// 2. ES6 CLASSES (FUNCTIONS)

class PersonCl2 {
  constructor(fullName, birthYear) {
    // INSTANCE fields/variables
    this.fullName = fullName;
    this.birthYear = birthYear;
  }
  // STATIC/CLASS methods
  static thisIsStatic() {
    console.log('✅');
  }
}

const scofield2 = new PersonCl2('Michael Scofield', 1972);

// scofield2.heyStatic();
PersonCl2.thisIsStatic();

///////////////////////////////////////////////////////
/// 3. Object.create() ///

// Create an __proto__ object of objects
const PersonProto = {
  calcAge() {
    console.log(2021 - this.isBorn);
  },
  init(firstName, birthYear) {
    // as of constructor
    this.firstName = firstName;
    this.birthYear = birthYear;
  },
};

// Create an object
const hannah = Object.create(PersonProto);
console.log(hannah); // an empty object

// Only __proto__ is existed
console.log(hannah.__proto__ === PersonProto); // true

// Create properties of hannah
hannah.name = 'Hannah';
hannah.isBorn = 1990;

hannah.calcAge();

const alex = Object.create(PersonProto);
alex.init('Alex', 1992);

// calcAge() and init() IS .__proto__
// firstName, birthYear, name, and isBorn ARE properties

///////////////////////////////////////////////////////
/// CODING CHALLANGE 2 ///
// Re-create CC1 with ES6 CLASSES

class CarCl {
  constructor(make, speed) {
    // INSTANCE fields/variables
    this.make = make;
    this.speed = speed; // km/h
  }

  // INSTANCE methods
  accelerate() {
    this.speed += 10;
    console.log(`${this.make} is going at ${this.speed} km/h`);
  }
  brake() {
    this.speed -= 5;
    console.log(`${this.make} is going at ${this.speed} km/h`);
  }

  // ACCESSOR properties
  get speedUS() {
    // return this.speed/1.6;
    return `${this.make} is going at ${this.speed / 1.6} mi/h`;
  }
  set speedUS(speed) {
    this.speed = speed * 1.6; // km/h
  }
}

const ford = new CarCl('Ford', 120);
console.log(ford.speedUS);
ford.accelerate();
ford.brake();

ford.speedUS = 50;
console.log(ford.speedUS);

///////////////////////////////////////////////////////
/// Inheritance Between "Classes" ///

/// 1. CONSTRUCTOR FUNCTIONS

// Parent
const Person3 = function (firstName, birthYear) {
  this.firstName = firstName;
  this.birthYear = birthYear;
};

Person3.prototype.calcAge = function () {
  console.log(`${this.firstName}'s age is ${2021 - this.birthYear}`);
};

// Child
const Student = function (firstName, birthYear, course) {
  // this.firstName = firstName;
  // this.birthYear = birthYear;
  Person3.call(this, firstName, birthYear); // POLIMORPHISM
  this.course = course;
};

// Linking prototype, MUST be declared after constructor
Student.prototype = Object.create(Person3.prototype);
// Student.prototype = Person3.prototype;  // WRONG

Student.prototype.introduce = function () {
  console.log(`Hi, I am ${this.firstName} and I study ${this.course}`);
};

// Create and object
const hafiz = new Student('Hafiz', 1997, 'Mathematics');
hafiz.introduce();
hafiz.calcAge();

// Cheeck if they are linked each other
console.log(hafiz instanceof Student);
console.log(hafiz instanceof Person3);
console.log(hafiz instanceof Object);

console.log(hafiz.__proto__ === Student.prototype);
console.log(hafiz.__proto__.__proto__ === Person3.prototype);

// MUST do this
Student.prototype.constructor = Student;
// but why are the CONSTRUCTORS name STILL WRONG ???
console.dir(Student.prototype.constructor);
console.log(hafiz);
console.log(hafiz.__proto__);
console.log(hafiz.__proto__.__proto__);

///////////////////////////////////////////////////////
/// CODING CHALLANGE 3

const Car2 = function (make, speed) {
  this.make = make;
  this.speed = speed;
};

Car2.prototype.accelerate = function () {
  this.speed += 10;
  console.log(`${this.make} is going at ${this.speed} km/h`);
};

Car2.prototype.brake = function () {
  this.speed -= 5;
  console.log(`${this.make} is going at ${this.speed} km/h`);
};

const EV = function (make, speed, charge) {
  Car2.call(this, make, speed);
  this.charge = charge; // %
};

EV.prototype = Object.create(Car2.prototype);

EV.prototype.chargeBattery = function (chargeTo) {
  this.charge = chargeTo;
};
EV.prototype.accelerate = function () // POLIMORPHISM
{
  this.speed += 20;
  this.charge -= 1;
  console.log(
    `${this.make} is going at ${this.speed} km/h with a charge of ${this.charge}%`
  );
};

const tesla = new EV('Tesla', 120, 23);
tesla.chargeBattery(50);
tesla.accelerate();
tesla.brake();
tesla.accelerate();

/// 2. ES6 CLASSES

class PersonCl3 {
  constructor(fullName, birthYear) {
    // INSTANCE fields/variables
    this.fullName = fullName;
    this.birthYear = birthYear;
  }

  // INSTANCE methods
  calcAge() {
    console.log(2021 - this.birthYear);
  }

  // ACCESSOR properties
  // validation fullName property that already exist/set
  set fullName(name) {
    if (name.includes(' ')) this._fullName = name;
    else alert(`${name} is not a full name!`);
  }
  get fullName() {
    return this._fullName;
  }
}

class StudentCl extends PersonCl3 {
  constructor(fullName, birthYear, course) {
    // IF there is additional parameter
    // super MUST be the first
    super(fullName, birthYear);
    this.course = course;
    // OTHERWISE, let this block empty
  }

  // INSTANCE methods
  introduce() {
    console.log(`Hi, I am ${this.fullName} and I study ${this.course}`);
  }
  // OVERWRITED
  calcAge() {
    console.log(
      `I'm ${2021 - this.birthYear} years old, but I feel more like ${
        2021 - this.birthYear + 10
      }`
    );
  }
}

const tyas = new StudentCl('Almira Tyas', 1995, 'Food Technology');
tyas.introduce();
tyas.calcAge();

/// 3. OBJECT.CREATE()

const PersonProto2 = {
  calcAge() {
    console.log(2021 - this.birthYear);
  },
  init(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  },
};

// Linking
const StudentProto = Object.create(PersonProto2);

StudentProto.init = function (firstName, birthYear, course) {
  PersonProto2.init.call(this, firstName, birthYear);
  this.course = course;
};

StudentProto.introduce = function () {
  console.log(`Hi, I am ${this.firstName} and I study ${this.course}`);
};

// Its syntax as static method for constructor function

// Create an object
const justin = Object.create(StudentProto);
justin.init('Justin Foley', 1989, 'Art');
justin.calcAge();
justin.introduce();

const zach = Object.create(PersonProto2);
zach.init('Zach Dempsey', 1990, 'Art');
zach.init('Zach Dempsey', 1990);
zach.calcAge();
// zach.introduce();

// OBJECT.CREATE() is the most simple
// NO WORRY o new keyword, constructor, n prototype property
// NOT FAKING class, just DO LINKING

// IN THE END
// MY PREFERENCE is likely the ES6 CLASSES, but still
// do NOT take protoypal chaining for granted

///////////////////////////////////////////////////////
/// Advance ES6 Class Example ///

// 1. Class is syntatic sugar over constructor functions
// 2. lasses are NOT hoisted (even class is a function)
// 3. Classes are first-class citizens (class is a function tho)
// 4. Classes are executed in strict mode

class Account {
  // PUBLIC INSTANCE fields (that no need user input)
  locale = navigator.language;

  // PUBLIC STATIC/CLASS fields/variables
  static type = 'permanent account';

  // PRIVATE fields
  // #movements = [];
  // #pin;

  // NEED user input? use constructor
  constructor(owner, username, pin) {
    // PUBLIC INSTANCE fields/variables
    this.owner = owner;
    this.username = username;
    // this.locale = navigator.language;

    // PRIVATE INSTANCE fields/variable
    this._movements = [];
    // this.#pin = pin;
    this._pin = pin;

    console.log(`Welcome ${owner}!`);
  }

  // PUBLIC INSTANCE methods (Public interface)

  deposit(val) {
    // this.#movements.push(val);
    this._movements.push(val);
    return this;
  }

  withdrawal(val) {
    this.deposit(-val);
    return this;
  }

  requestLoan(val) {
    // if (this.#approveLoan(val)) {
    if (this._approveLoan(val)) {
      this.deposit(val);
      console.log('Loan approved');
      return this;
    }
  }

  getMovements() {
    // return #movements;
    return this._movements;
  }

  // PUBLIC STATIC/CLASS methods
  static printAccType() {
    console.log(`This account is ${this.type}`);
  }

  // PRIVATE INSTANCE methods

  // #approveLoan(val) {
  _approveLoan(val) {
    return true;
  }
}

const acc1 = new Account('Dita', 'dl', 2222);

// acc1._movements.push(1000)
// acc1._movements.push(-200)
acc1.deposit(1000);
acc1.withdrawal(200);

acc1.requestLoan(500);
// acc1._approveLoan(500);

// console.log(acc1.#pin);
// acc1.#movements.push(-200);
// acc1.#approveLoan(500);

console.log(acc1.getMovements());

console.log(acc1);

Account.printAccType();

// PROBLEM
// movements and pin can be accessed from the outside Class
// approveLoan must be hided from the Public interface

// SOLUTION 1 => use "#" and "static" to field and method
// 1) Public field
// 2) Public method
// 3) Private field
// 4) Private method
// (and the statoc versopn of each)

// BUT, the "#" private is still in proposal

// SOLUTION 2 => use "_" for faking it
// at least noticing other developers

// CHAINING (returned) METHODS
acc1
  .deposit(300)
  .deposit(500)
  .withdrawal(-200)
  .requestLoan(15000)
  .withdrawal(5000);
console.log(acc1.getMovements());

///////////////////////////////////////////////////////
/// CODING CHALLANGE 4 ///
// Re-create CC3 with ES6 Classes

class CarCl2 {
  constructor(make, speed) {
    this.make = make;
    this.speed = speed;
  }

  accelerate() {
    this.speed += 10;
    console.log(`${this.make} is going at ${this.speed} km/h`);
  }

  brake() {
    this.speed -= 5;
    console.log(`${this.make} is going at ${this.speed} km/h`);
    return this;
  }
}

class EVCl extends CarCl2 {
  #charge;

  constructor(make, speed, charge) {
    super(make, speed);

    this.#charge = charge; // %
  }

  chargeBattery(chargeTo) {
    this.#charge = chargeTo;
    console.log(`Charged! ${this.make}'s battery is ${this.#charge}%`);
    return this;
  }

  accelerate() {
    this.speed += 20;
    this.#charge -= 1;
    console.log(
      `${this.make} is accelerated to be ${
        this.speed
      } km/h, now the battery remains ${this.#charge}%`
    );
    return this;
  }
}

const rivian = new EVCl('Rivian', 120, 23);
// console.log(rivian.#charge);

rivian.chargeBattery(50).accelerate().brake().accelerate();
console.log(rivian.speed);
