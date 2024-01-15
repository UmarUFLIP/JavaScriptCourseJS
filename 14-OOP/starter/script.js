'use strict';

// Use contructr function to create a new object
const Person = function (firstName, birthYear) {
  // Instance properties
  this.firstName = firstName;
  this.birthYear = birthYear;
};

const jonas = new Person('Jonas', 1991);
console.log(jonas);

const matilda = new Person('Matilda', 2017);
const jack = new Person('Jack', 1975);
console.log(matilda, jack);

console.log(jonas instanceof Person); // true

// Prototypes
console.log(Person.prototype);
Person.prototype.calcAge = function () {
  console.log(2037 - this.birthYear);
  // this keyword will point to the object that is calling the method (jonas, matilda, jack)
}; // Now all the objects created from Person will have access to this method

jonas.calcAge(); // 46
matilda.calcAge(); // 20
jack.calcAge(); // 62

// The calcAge method is not in the Person object, but in the prototype of the Person object (Person.prototype) and we can access it because of the prototype inheritance.

console.log(jonas.__proto__); // Person.prototype
console.log(jonas.__proto__ === Person.prototype); // true
console.log(Person.prototype.isPrototypeOf(jonas)); // true
console.log(Person.prototype.isPrototypeOf(matilda)); // true
console.log(Person.prototype.isPrototypeOf(Person)); // false
// Person.prototype is the prototype of all the objects created from Person (jonas, matilda, jack) and not the prototype of the Person object itself

//  .prototypeOfLinkedObjects

Person.prototype.species = ' Homo Sapiens';
console.log(jonas.species, matilda.species); // prints Homo Sapiens Homo Sapiens

console.log(jonas.hasOwnProperty('firstName')); // true
console.log(jonas.hasOwnProperty('species')); // false
