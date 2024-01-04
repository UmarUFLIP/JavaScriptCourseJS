'use strict';

let f;

const g = function () {
  const a = 23;
  f = function () {
    console.log(a * 2);
  };
};

const h = function () {
  const b = 777;
  f = function () {
    console.log(b * 2);
  };
};

g();
f();
h(); // the f variable is now assigned to the function inside h.
f(); // prints 1554

/* 
  The f variable closed over the h functioned so when you call f again. It did 777*2 which is 1554. 
*/

console.dir(f);

// Example 2 | Timer
const boardPassengers = function (n, waitTime) {
  const perGroup = n / 3;

  // Let use timer (learn more about them later)
  // needs two parameters: setTimeout(function, inTime in ms)
  // The function will be exuted after 1000ms (1 second)
  setTimeout(function () {
    console.log(`We are now boarding all ${n} passengers`);
    console.log(`There are 3 groups, each with ${perGroup} passengers`);
  }, waitTime * 1000);
  // Multiply by 1000 for seconds.

  console.log(`Will start boarding in ${waitTime} seconds`);
};

boardPassengers(180, 3);

/* 
  The callback (setTimeout) was executed independently but it was still able to use all the variables that were in the variable environment in which it was created. This is a clear sign of a closure being created. 
*/
