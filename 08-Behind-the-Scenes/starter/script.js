'use strict';

// function calcAge(birthYear) {
//   const age = 2023 - birthYear;

//   function printAge() {
//     const output = `${firstName}, You are ${age}, born in ${birthYear}`;
//     console.log(output);

//     if (birthYear >= 1981 && birthYear <= 1996) {
//       var millenial = true;
//       const str = `Oh, and you're a millenial, ${firstName}`;
//       console.log(str);

//       function add(a, b) {
//         return a + b;
//       } // this add function can only be used inside this if block
//       // remember function being block scope is only true for strict mode
//     }
//     console.log(millenial); // var variables are function scoped (not block scoped)
//     // doing console.log(str) will give you an error because const and let are block scoped.

//     // calling add(2,3) here will give error
//     // not using strict mode, i think the function will become part of printAge scope (like var does) and so it can be called.
//   }
//   printAge(); // calls the function printAge

//   return age;
// }

// const firstName = 'Jonas'; // declared in the global scope.
// calcAge(1991); // calls the function calcAge

/****************/
// This keyword //
/****************/

// console.log(this); // this is in the global scope and points to window

// const calcAge = function (birthYear) {
//   console.log(2023 - birthYear);
//   console.log(this); // will point to undefined (gets it own keyword)
// };

// calcAge(1991);

// const calcAgeArrow = birthYear => {
//   console.log(2023 - birthYear);
//   console.log(this); // doesn't get its own this keyword so it takes the this keyword of parent scope and that points to window.
// };

// calcAgeArrow(2002);

// const umar = {
//   year: 2002,
//   calcAge: function () {
//     console.log(this);
//     console.log(2023 - this.year);
//   },
// };

// umar.calcAge();

// const matilda = {
//   year: 2008,
// };

// matilda.calcAge = umar.calcAge; // the calcAge function will equal (be the same) as the one in umar. This is called method borrowing.
// matilda.calcAge();

// const f = umar.calcAge; // copying a function to another variable (functions are values)

/*******************************/
// Regualr functions vs Arrow //
/*******************************/

// const jonas = {
//   firstName: 'Jonas',
//   year: 2002,
//   calcAge: function () {
//     console.log(this);
//     console.log(2023 - this.year);
//   },

//   greet: () => console.log(`Hey ${this.firstName}`), // arrow func don't get this keyword, it uses this keyword of its parent. This object is in the global scope (not a block scope)
// };
// jonas.greet(); // this keyword points to window and window.firstName is undefined (DNE)

// /* if we defined var firstName = 'Matilda' and use the jonas.greet method
//    it will point to the window object and remember var exists in window objects so it will actually print out Hey Matilda */

// const jonas1 = {
//   firstName: 'Jonas',
//   year: 2002,
//   calcAge: function () {
//     console.log(this);
//     console.log(2023 - this.year);
//   },

//   greet: function () {
//     // this is how you should define functions to use this keyword
//     console.log(`Hey ${this.firstName}`);
//   },
// };
// jonas1.greet();

// const jonas3 = {
//   firstName: 'Jonas',
//   year: 1991,
//   calcAge: function () {
//     // console.log(this);
//     console.log(2023 - this.year);

//     const isMillenial = () => {
//       console.log(this.year >= 1991 && this.year <= 1996);
//     };
//     isMillenial();
//   },

//   greet: () => console.log(`Hey ${this.firstName}`), // arrow func don't get this keyword, it uses this keyword of its parent. This object is in the global scope (not a block scope)
// };
// jonas3.greet();
// jonas3.calcAge();

// // Arguments
// const addExpr = function (a, b) {
//   console.log(arguments);
//   return a + b;
// };
// addExpr(2, 5);
// addExpr(2, 5, 8, 12); // this is valid and you can use loop to add all nums

// // However it is not possible in arrow functions
// var addArrow = (a, b) => {
//   console.log(arguments);
//   return a + b;
// };
// addArrow(2, 5, 8); // arguments is not defined (argument keyword only exists in function expression and declaration)

/*******************************/
// Primitives vs Objects
/*******************************/

// let age = 30; // age is 30
// let oldAge = age; // assigning age which is 30 to oldAge
// age = 31; // changing age (currently) 30 to now 31.
// console.log(age);
// console.log(oldAge);

// const me = {
//   name: 'Jonas',
//   age: 30,
// };

// const friend = me;
// friend.age = 27;

// console.log('Friennd', friend);
// console.log('Me', me);
// // we did friend.age = 27 but me also got changed.

let lastName = 'Williams';
let oldLastName = lastName;
lastName = 'Davis';

console.log(lastName, oldLastName);

const jessica = {
  firstName: 'Jessica',
  lastName: 'Williams',
  age: 27,
};

const marriedJessica = jessica; // holds reference to original object (hold both memory address reference)
marriedJessica.lastName = 'Davis';
console.log('Before marriage: ', jessica);
console.log('After marriage: ', marriedJessica);

// Copying objects
const jessica2 = {
  firstName: 'Jessica',
  lastName: 'Williams',
  age: 27,
  family: ['Alice', 'Bob'],
};

const jessicaCopy = Object.assign({}, jessica2);
jessicaCopy.lastName = 'Davis';
// console.log('Before marriage: ', jessica2);
// console.log('After marriage: ', jessicaCopy);

jessicaCopy.family.push('Mary');
jessicaCopy.family.push('John');

console.log('Before marriage: ', jessica2);
console.log('After marriage: ', jessicaCopy);

// deep cloning requires a external libraries.
