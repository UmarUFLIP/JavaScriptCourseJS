'use strict';

// Data needed for a later exercise
const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

const getCode = str => str.slice(0, 3).toUpperCase();

for (const flight of flights.split('+')) {
  const [type, from, to, time] = flight.split(';');
  const output = `${type.includes('Delayed') ? '🔴' : ''}${type.replaceAll(
    '_',
    ' '
  )} from ${getCode(from)} to ${getCode(to)} (${time.replace(
    ':',
    'h'
  )})`.padStart(50);
  console.log(output);
}

const weekdays = ['mon', 'tues', 'wed', 'thurs', 'fri', 'sat', 'sun'];
const openingHours = {
  [weekdays[3]]: {
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
};

// Data needed for first part of the section
const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],

  // ES6 Enchanced Object Literals
  openingHours,

  order: function (starterIndex, mainIndex) {
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  },

  orderDelivery: function ({ starterIndex, mainIndex, time, address }) {
    // We now have four variable names that we can use for the function code block.
    console.log(
      `Order recieved: ${this.starterMenu[starterIndex]} and ${this.mainMenu[mainIndex]} will be delivered to ${address} at ${time}`
    );
  },

  orderPasta: function (ing1, ing2, ing3) {
    console.log(`Here is your pasta with: ${ing1}, ${ing2}, ${ing3}`);
  },

  orderPizza: function (mainIng, ...otherIng) {
    console.log(mainIng, otherIng);
  },
};

// // property NAMES
// const properties = Object.keys(openingHours);
// console.log(properties); // An Array of openingHours

// // Want a string that prints on number of days the restaurant is open.
// let openStr = `We are open on ${properties.length} days`;

// for (const day of properties) {
//   openStr += ` ${day}day, `;
// }

// console.log(openStr);

// // Property VALUES
// const values = Object.values(openingHours);
// console.log(values);

// // We can do something similar like .entries() that will return the key and value

// // Entire object
// const entries = Object.entries(openingHours);
// console.log(entries);

// // We get an array of keys at index 0 and value at index 1. The value at index 1 is still an object of open and close hours.

// for (const [key, { open, close }] of entries) {
//   console.log(`On ${key} we open at ${open} and close at ${close}`);
// }

// const ordersSet = new Set([
//   'Pasta',
//   'Pizza',
//   'Pizza',
//   'Risotto',
//   'Pasta',
//   'Pizza',
// ]);

// const staff = ['Waiter', 'Chef', 'Waiter', 'Manager', 'Chef', 'Waiter'];
// const staffUnique = new Set(staff);
// console.log(staffUnique);

// // Want to put it back into an array?
// const staffUniqueArray = [...new Set(staff)];
// console.log(staffUniqueArray);

// console.log(new Set('umarmian').size);

// const rest = new Map();
// rest
//   .set('categories', ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'])
//   .set('open', 11)
//   .set('close', 23);

// const question = new Map([
//   ['question', 'What is the best programming language?'],
//   [1, 'C++'],
//   [2, 'Java'],
//   [3, 'JavaScript'],
//   [4, 'Python'],
//   ['correct', 3],
//   [true, 'Correct! :)'],
//   [false, 'Try again!'],
// ]);

// console.log(question.get('question'));
// for (const [key, value] of question) {
//   if (typeof key === 'number') console.log(`Answer ${key}: ${value}`);
// }

// // const answer = Number(prompt('Your answer'));
// const answer = 3;
// console.log(answer);

// console.log(question.get(question.get('correct') === answer));

// const [p = 1, q = 1, r = 1] = [8, 9];
// console.log(p, q, r); // prints "8 9"

// *** Split method ***
// Split: Allows us to split a string into multiple parts based on a divider string.

// console.log('A+very+nice+string'.split('+')); // Will split up the string by the '+' sign.
// It returns an array of the containing the split string.
