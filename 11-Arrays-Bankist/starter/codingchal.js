/* 
Julia and Kate are doing a study on dogs. So each of them asked 5 dog owners
about their dog's age, and stored the data into an array (one array for each). For
now, they are just interested in knowing whether a dog is an adult or a puppy.
A dog is an adult if it is at least 3 years old, and it's a puppy if it's less than 3 years
old.

Your tasks:
1. Create a function 'checkDogs', which accepts 2 arrays of dog's ages
   ('dogsJulia' and 'dogsKate'), and does the following things:
   a. Julia found out that the owners of the first and the last two dogs actually have
      cats, not dogs! So create a shallow copy of Julia's array, and remove the cat
      ages from that copied array (because it's a bad practice to mutate function
      parameters)
   b. Create an array with both Julia's (corrected) and Kate's data
   c. For each remaining dog, log to the console whether it's an adult ("Dog number 1
      is an adult, and is 5 years old") or a puppy ("Dog number 2 is still a puppy
      🐶 ")
2. Run the function for both test datasets

Test data:
1. Julia's data [3, 5, 2, 12, 7], Kate's data [4, 1, 15, 8, 3]
2. Julia's data [9, 16, 6, 8, 3], Kate's data [10, 5, 6, 1, 4]

Hints: Use tools from all lectures in this section so far 😉
GOOD LUCK 😀
*/

// *** Jonas Solution ***

const checkDogs = function (dogsJulia, dogsKate) {
  const dogsJuliaCorrected = dogsJulia.slice();
  dogsJuliaCorrected.splice(0, 1);
  dogsJuliaCorrected.splice(-2);

  // You can use spread operator but he did this since we are in the array section.
  const dogs = dogsJuliaCorrected.concat(dogsKate);
  dogs.forEach(function (age, i) {
    if (age >= 3) {
      console.log(`Dog number ${i + 1} is an adult, and is ${age} years old`);
    } else {
      console.log(`Dog number ${i + 1} is still a puppy`);
    }
  });
};

// checkDogs([3, 5, 2, 12, 7], [4, 1, 15, 8, 3]);

/*
The Complete JavaScript Course 24
Coding Challenge #2
Let's go back to Julia and Kate's study about dogs. This time, they want to convert
dog ages to human ages and calculate the average age of the dogs in their study.

Your tasks:
1. Create a function 'calcAverageHumanAge', which accepts an array of dog's
   ages ('ages'), and does the following things in order:
   a. Calculate the dog age in human years using the following formula: if the dog is
      <= 2 years old, humanAge = 2 * dogAge. If the dog is > 2 years old,
      humanAge = 16 + dogAge * 4
   b. Exclude all dogs that are less than 18 human years old (which is the same as
      keeping dogs that are at least 18 years old)
   c. Calculate the average human age of all adult dogs (you should already know
      from other challenges how we calculate averages 😉)
2. Run the function for both test datasets

Test data:
1. [5, 2, 4, 1, 15, 8, 3]
2. [16, 6, 10, 5, 6, 1, 4]

GOOD LUCK 😀
*/
// Takes in dog ages
const calcAverageHumanAge = function (ages) {
  // want to create humanAges
  const humanAges = ages.map(age => (age <= 2 ? 2 * age : 16 + age * 4)); // Arrow function, if age is <= 2 then return 2 * age else return 16 + age * 4. The return is implicit in arrow functions

  // Filtering dog ages who are over 18 years in human ages.
  const adults = humanAges.filter(age => age >= 18);
  console.log(humanAges, adults);

  // Calculating the average
  //   const average = adults.reduce((acc, age) => acc + age, 0) / adults.length; // You can do (2+3) / 2 = 2.5 which is the same as 2/2 + 3/2 = 2.5.
  // So instead of above, we can do:
  const average = adults.reduce(
    (acc, age, i, arr) => acc + age / arr.length, // We are immediately dividing the age by the length of the array.
    0
  );

  return average;
};
// console.log(calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]));
// console.log(calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]));

/*
Coding Challenge #3
Rewrite the 'calcAverageHumanAge' function from Challenge #2, but this time
as an arrow function, and using chaining!

Test data:
1. [5, 2, 4, 1, 15, 8, 3]
2. [16, 6, 10, 5, 6, 1, 4]

GOOD LUCK 😀
*/

// Jonas's solution
const calcAverageHumanAge2 = ages =>
  ages
    .map(age => (age <= 2 ? 2 * age : 16 + age * 4))
    .filter(age => age >= 18)
    .reduce((acc, age, i, arr) => acc + age / arr.length, 0); // We need to take the length from the arr parameter, recall we did not store the result of filter in some variable and therefore cannot call .length on it.

console.log(calcAverageHumanAge2([5, 2, 4, 1, 15, 8, 3]));
console.log(calcAverageHumanAge2([16, 6, 10, 5, 6, 1, 4]));

/*
Coding Challenge #4
Julia and Kate are still studying dogs, and this time they are studying if dogs are
eating too much or too little.
Eating too much means the dog's current food portion is larger than the
recommended portion, and eating too little is the opposite.
Eating an okay amount means the dog's current food portion is within a range 10%
above and 10% below the recommended portion (see hint).

Your tasks:
1. Loop over the 'dogs' array containing dog objects, and for each dog, calculate
   the recommended food portion and add it to the object as a new property. Do
   not create a new array, simply loop over the array. Formula:
   recommendedFood = weight ** 0.75 * 28. (The result is in grams of
   food, and the weight needs to be in kg)
2. Find Sarah's dog and log to the console whether it's eating too much or too
   little. Hint: Some dogs have multiple owners, so you first need to find Sarah in
   the owners array, and so this one is a bit tricky (on purpose) 🤓
3. Create an array containing all owners of dogs who eat too much
   ('ownersEatTooMuch') and an array with all owners of dogs who eat too little
   ('ownersEatTooLittle').
4. Log a string to the console for each array created in 3., like this: "Matilda and
   Alice and Bob's dogs eat too much!" and "Sarah and John and Michael's dogs eat
   too little!"
5. Log to the console whether there is any dog eating exactly the amount of food
   that is recommended (just true or false)
6. Log to the console whether there is any dog eating an okay amount of food
   (just true or false)
7. Create an array containing the dogs that are eating an okay amount of food (try
   to reuse the condition used in 6.)
8. Create a shallow copy of the 'dogs' array and sort it by recommended food
   portion in an ascending order (keep in mind that the portions are inside the
   array's objects 😉)

The Complete JavaScript Course 26
Hints:
§ Use many different tools to solve these challenges; you can use the summary
   lecture to choose between them 😉
§ Being within a range 10% above and below the recommended portion means:
   current > (recommended * 0.90) && current < (recommended *
   1.10). Basically, the current portion should be between 90% and 110% of the
   recommended portion. */

// // // Test Data:
// const dogs = [
//   { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
//   { weight: 8, curFood: 200, owners: ['Matilda'] },
//   { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
//   { weight: 32, curFood: 340, owners: ['Michael'] },
// ];
