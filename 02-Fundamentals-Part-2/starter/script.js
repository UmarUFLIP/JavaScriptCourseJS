"use strict";

// **************************
//        Strict Mode
// **************************

// let hasDriversLicense = false;
// const passTest = true;

// if (passTest) hasDriversLicense = true;
// if (hasDriversLicense) console.log("I can drive.");

// **************************
//       Functions
// **************************
// function logger() {
//   console.log("My name is Jonas");
// }

// logger();
// logger();
// logger();

// function fruitProcessor(apples, oranges) {
//   const juice = `Juice with ${apples} apples and ${oranges} oranges.`;
//   return juice;
// }

// console.log(fruitProcessor(3, 5));
// console.log(fruitProcessor(2, 4));

// **Function Declaration**
// function calcAge(birthYear) {
//   return 2023 - birthYear;
// }
// console.log(calcAge(1958));

// // **Function Expression**
// const calcAge2 = function (birthYear) {
//   return 2023 - birthYear;
// };
// console.log(calcAge2(2000));

// ** Arrow Functions **
// (birthYear) => 2023 - birthYear;

// const yearsUntilRetirement = (birthYear, firstName) => {
//   // calculate age based on birthYear
//   const age = 2023 - birthYear;
//   //  years until retirement
//   const retirement = 65 - age;
//   // return retirement;
//   return `${firstName} retires in ${retirement} years.`;
// };

// console.log(yearsUntilRetirement(2002, "Umar"));
// console.log(yearsUntilRetirement(1958, "Pops"));

// ** Function Call Functions **

// function cutFruitPieces(fruit) {
//   return fruit * 4;
// }

// function fruitProcessor(apples, orange) {
//   const applePieces = cutFruitPieces(apples);
//   const orangePieces = cutFruitPieces(orange);
//   const juice = `Juice with ${applePieces} apple pieces and ${orangePieces} orange pieces`;
//   return juice;
// }

// console.log(fruitProcessor(2, 3));

// const calcAverage = (score1, score2, score3) => (score1 + score2 + score3) / 3;

// const scoreDolphins = calcAverage(85, 54, 41);
// const scoreKoalas = calcAverage(23, 34, 27);

// function checkWinner(avgDolphins, avgKoalas) {
//   if (avgDolphins > avgKoalas * 2) {
//     console.log(`Dolphins win (${avgDolphins} vs. ${avgKoalas})`);
//   } else if (avgKoalas > avgDolphins * 2) {
//     console.log(`Koalas win (${avgKoalas} vs. ${avgDolphins})`);
//   } else {
//     console.log("No team wins...");
//   }
// }

// checkWinner(scoreDolphins, scoreKoalas);

// **************************
//  Dot vs Bracket Notation
// **************************

// const jonas = {
//   firstName: "Jonas",
//   lastName: "Sche",
//   age: 2023 - 1991,
//   job: "teacher",
//   friends: ["Michael", "Peter", "Steven"],
// };

// // console.log(jonas);

// // const nameKey = "Name";
// // console.log(jonas["first" + nameKey]);
// // console.log(jonas["last" + nameKey]);

// // const interestedIn = prompt(
// //   "What do you want to know about Jonas? Choose between firstName, lastName, age, job, and friends"
// // );

// // if (jonas[interestedIn]) {
// //   console.log(jonas[interestedIn]);
// // } else {
// //   console.log(
// //     `This '${interestedIn}'locat property does not exist. Choose between firstName, lastName, age, job, and friends"`
// //   );
// // }

// jonas.location = "Portugal";
// jonas["twitter"] = "@jonasSche";

// // Challenge
// // Write "Jonas has 3 friends, and his best friend is called Michael"
// console.log(
//   // you can also do ${jonas["firstName"]}
//   `${jonas["firstName"]} has ${jonas.friends.length} friends, and his best friend is called ${jonas.friends[0]}`
// );

// **************************
//    Object Methods
// **************************

// const jonas = {
//   firstName: "Jonas",
//   lastName: "Sche",
//   birthYear: 1991,
//   job: "teacher",
//   friends: ["Michael", "Peter", "Steven"],
//   hasDriverLicense: false,

//   // we can now use this keyword to store new property.
//   calcAge: function () {
//     this.age = 2023 - this.birthYear;
//     return this.age;
//   },

//   getSummary: function () {
//     return `${this.firstName} is a ${this.calcAge()} years old ${
//       this.job
//     }, and he has ${this.hasDriverLicense ? "a" : "no"} driver's license.`;
//   },
// };

// // Challenge
// // "Jonas is a 36 years old teacher, and he has a driver license."
// //console.log(jonas.calcAge());
// console.log(jonas.getSummary());

/* Write your code below. Good luck! 🙂 */

// const mark = {
//   fullName: "Mark Miller",
//   mass: 78,
//   height: 1.69,

//   calcBMI: function () {
//     this.bmi = this.mass / (this.height * this.height);
//     return this.bmi;
//   },
// };

// const john = {
//   fullName: "John Smith",
//   mass: 92,
//   height: 1.95,

//   calcBMI: function () {
//     this.bmi = this.mass / (this.height * this.height);
//     return this.bmi;
//   },
// };

// // must it to create property?
// mark.calcBMI();
// john.calcBMI();

// if (john.bmi > mark.bmi) {
//   console.log(
//     `${john.fullName}'s BMI (${john.bmi}) is higher than ${mark.fullName}'s (${mark.bmi})!`
//   );
// } else {
//   console.log(
//     `${mark.fullName}'s BMI (${mark.bmi}) is higher than ${john.fullName}'s (${john.bmi})!`
//   );
// }

// **************************
//        Loops
// **************************

// for (let rep = 1; rep <= 10; rep++) {
//   console.log("Lifting weights repetition " + rep);
// }

// **************************
//     Section 47
// **************************
// const jonasArray = [
//   "Jonas",
//   "Sche",
//   2023 - 1991,
//   "teacher",
//   ["Michael", "Peter", "Steven"],
// ];

// for (let i = 0; i < jonasArray.length; i++) {
//   console.log(jonasArray[i]);
// }

// // exercise
// const types = [];
// for (let i = 0; i < jonasArray.length; i++) {
//   types[i] = typeof jonasArray[i];
// }

// console.log(types);

// const years = [1991, 2007, 1969, 2002, 2007, 2020];
// const ages = [];

// for (let i = 0; i < years.length; i++) {
//   ages[i] = 2023 - years[i];
// }

// console.log(ages);

// for (let i = 0; i < jonasArray.length; i++) {
//   if (typeof jonasArray[i] !== "string") continue;

//   console.log(jonasArray[i]);
// }

// console.log("--- Break with Number ---");
// for (let i = 0; i < jonasArray.length; i++) {
//   if (typeof jonasArray[i] === "number") break;

//   console.log(jonasArray[i]);
// }

// **************************
// Backward Loops and Loop in Loops
// **************************

// const jonas = [
//   "Jonas",
//   "Sche",
//   2023 - 1991,
//   "teacher",
//   ["Michael", "Peter", "Steven"],
// ];

// for (let i = jonas.length - 1; i >= 0; i--) {
//   console.log(jonas[i]);
// }

// // Example of Exercises 15 reps 5 sets
// for (let i = 1; i <= 3; i++) {
//   console.log("Set " + i);
//   for (let j = 1; j <= 12; j++) {
//     console.log("Set: " + i + " Repetition " + j);
//   }
// }

// **************************
//        While loop
// **************************
// let rep = 1;
// while (rep <= 10) {
//   console.log("Lifiting weights " + rep);
//   rep++;
// }

// let dice = Math.random() * 6;
// need to get rid of decimal part we this trunc
// let dice = Math.trunc(Math.random() * 6) + 1;

// while (dice !== 6) {
//   console.log(`You rolled a ${dice}`);
//   dice = Math.trunc(Math.random() * 6) + 1;
// }


