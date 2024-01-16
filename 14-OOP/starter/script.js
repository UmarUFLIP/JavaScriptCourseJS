'use strict';
// class PersonCl {
//   constructor(fullName, birthMonth, birthYear) {
//     this.fullName = fullName;
//     this.birthYear = birthYear;
//     this.birthMonth = birthMonth; // I made some changes
//   }

//   calcAge() {
//     const month = new Date().getMonth() + 1; // get current Month, January is 0 (so +1)
//     month >= this.birthMonth // If the current month > the birthMonth (their birthday passed)
//       ? console.log(2024 - this.birthYear)
//       : console.log(2024 - this.birthYear - 1); // -1 becuz their birthday hasn't passed.
//   }

//   greet() {
//     console.log(`Hello ${this.firstName}`);
//   }

//   get age() {
//     return 2024 - this.birthYear;
//   }

//   set fullName(name) {
//     if (name.includes(' ')) this._fullName = name;
//     else alert(`${name} is not a full name!`);
//   }

//   get fullName() {
//     return this._fullName;
//   }

//   static hey() {
//     console.log('Hey there!');
//   }
// }

// class StudentCl extends PersonCl {
//   // Extends is how you inherit
//   constructor(fullName, birthMonth, birthYear, major) {
//     // Super needs to happen first, reponsible for creating the `this` keyword.
//     super(fullName, birthMonth, birthYear); // JAVAAAAAAAAAAAA
//     this.major = major;
//   }

//   introduce() {
//     console.log(`My name is ${this.fullName} and I am studying ${this.major}`);
//   }

//   // To override a parent's class method
//   calcAge() {
//     console.log(
//       `I'm ${2024 - this.birthYear} years old. I will be ${
//         2024 - this.birthYear + 3
//       } years old when I graduate.`
//     );
//   }
// }

// const umar = new StudentCl('Umar Mian', 11, 2002, 'Computer Science');
// umar.introduce();
// umar.calcAge();

// // Object.create Inheritance
// const PersonProto = {
//   calcAge() {
//     console.log(2024 - this.birthYear);
//   },

//   init(firstName, birthYear) {
//     this.firstName = firstName;
//     this.birthYear = birthYear;
//   },
// };

// const steven = Object.create(PersonProto);
// // PersonProto is the prototype of studentProto
// const StudentProto = Object.create(PersonProto);
// StudentProto.init = function (firstName, birthYear, course) {
//   PersonProto.init.call(this, firstName, birthYear); // Calling the init function in personProto
//   this.course = course;
// };
// const jay = Object.create(StudentProto); // Creating jay object which is an instance/prototype? of StudentProto
// jay.init('Jay', 2005, 'CS'); // Initalizing Jay
// console.log(jay); // Logging Jay
// jay.calcAge(); // This works because this method exists in the PersonProto and JavaScript can look up the Prototype chain.

// 1) Public field
// 2) Private field
// 3) Public methods
// 4) Private methods
// There's also static versions of these fields and methods

class Account {
  // 1) Public field
  // These fields are on the instance of this class. They will be added to all the object/instances of the Account class.
  locale = navigator.language;

  // 2) Private fields
  #movements = []; // The # symbol makes a field private.
  #pin; // We create the private field out here and initalize it in the constructor

  constructor(owner, currency, pin) {
    this.owner = owner;
    this.currency = currency;
    this.#pin = pin;
    // this._movements = [];
    // this.locale = navigator.language;

    console.log(`Thanks for opening an account, ${owner}`);
  }

  // 3) getMovements, deposits, withdraw, requestLoan are public methods... Public Interface.
  getMovements() {
    return this.#movements;
  }

  deposit(val) {
    this.#movements.push(val);
    return this; // Makes it chainable and this method should be a method that sets a property.
  }
  withdraw(val) {
    this.#movements.push(-val);
    return this;
  }

  static helper() {
    // Example of static method, will not be able on the instances but only on the class itself.
    console.log('Static public method example');
  }

  requestLoan(val) {
    if (this.#approveLoan(val)) {
      this.deposit(val);
      console.log('loan approved');
    }
    return this;
  }
  // 4 Private methods: useful to hide implementation details and logic from the outside.
  #approveLoan(val) {
    // At the moment, no browser supports this.
    return true;
  }
}

const acc1 = new Account('Jonas', 'EUR', 1111);

// Chaining Methods
// Want to be able to do:
acc1.deposit(300).deposit(200).withdraw(35).requestLoan(2500).withdraw(4000);

console.log(acc1.getMovements());
