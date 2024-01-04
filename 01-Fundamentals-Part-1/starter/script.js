// *****************************
// Lecture: Values and Variables
// *****************************

// **** Challenge ****
// let country = "Pakistan";
// let continent = "Asia";
// let population = "231.4 million";

// console.log(
//   'I am from "' +
//     country +
//     '" located in "' +
//     continent +
//     '" with a current population of "' +
//     population +
//     '"'
// );
// const headerEl = document.querySelector("h1");

// headerEl.addEventListener("click", function () {
//   headerEl.textContent =
//     "I am from '" +
//     country +
//     '" located in "' +
//     continent +
//     '" with a current population of "' +
//     population +
//     '"';
//   headerEl.style.backgroundColor = "#252525";
//   headerEl.style.padding = "5rem";
//   headerEl.style.borderRadius = "100px";
// });

// ----------------------------------------------------------------------------->

// *******************
// Lecture: Data Types
// *******************

// console.log(typeof null);

// // **** Challenge ****
// let isIsland = false;

// console.log(typeof isIsland);
// console.log(typeof population);
// console.log(typeof country);

// ----------------------------------------------------------------------------->

// // ****************************
// // Lecture: let, const, and var
// // ****************************

// // **** Challenge ****
// const language = "Urdu";
// console.log(language);

// ----------------------------------------------------------------------------->

// ************************
// Lecture: Basic Operators
// ************************

// const ageUmar = 2023 - 2002;
// console.log(ageUmar);

// const firstName = "Umar";
// const lastName = "Mian";
// const space = " ";
// console.log(firstName + space + lastName);
// console.log(firstName + " " + lastName);

// let x = 10 + 5; // x is 15
// x += 10; // += means x = x + 10; so that means x = 15 (from prev x) + 10
// console.log(x);

// ****************************
// Lecture: Operators Precdence
// ****************************

// ----------------------------------------------------------------------------->

// ****************************
// Lecture: Operators Precdence
// ****************************

// const firstName = "Umar";
// const job = "software developer intern";
// const birthYear = 2002;
// const year = 2023;

// // Using quotes
// const umar =
//   "I'm " + firstName + ", a " + (year - birthYear) + " years old " + job;
// console.log(umar);

// // Using backticks ``
// const umarNew = `I'm ${firstName}, a ${year - birthYear} years old ${job}!`;
// console.log(umarNew);

// // ***Multi-line strings***
// // Old way
// console.log("String with \n multiple \n lines");

// // New and easier way
// console.log(`String
// multiple
// lines`);

// ****************************
// Lecture: Taking Decisions if / else statements
// ****************************

// const age = 15;

// if (age >= 18) {
//   console.log("Sarah can start driving 🚗");
// } else {
//   console.log("You are not old enough to drive. ❌");
// }

// const birthYear = 1991;

// let century = 20;
// if (birthYear <= 2000) {
//   century = 20;
// } else {
//   century = 21;
// }
// console.log(century);

//****************************
// Lecture: Type conversion and Coercion
// ****************************

//****************************
// Lecture: Type conversion and Coercion
// ****************************

// console.log(Boolean(0)); // false
// console.log(Boolean(undefined)); // false
// console.log(Boolean(" ")); // true

// const money = 0;
// if (money) {
//   console.log("Don't spend it all");
// } else {
//   console.log("You should get a job!");
// }

//****************************
// Lecture: Equality Operators
// ****************************

// const age = 18;
// if (age === 18) {
//   console.log("The person is now an adult.");
// }

// // prompt: asks users input
// const favorite = prompt("What's your favorite number?");
// // const favorite = Number(prompt("What's your favorite number?"));

// console.log(favorite); // input is string.
// console.log(typeof favorite);

// if (favorite == 23) {
//   console.log("Cool! 23 is a nice number!");
// }

// if (Number(favorite) === 23) {
//   console.log("True (this is using triple equals and manual type conversion)");
// }

//****************************
// Lecture: Boolean Logic and Logic Operators
// ****************************

// const hasDriverLicense = true; // A
// const hasGoodVision = false; // B

// console.log(hasDriverLicense && hasGoodVision);

// const shouldDrive = hasDriverLicense && hasGoodVision;
// if (shouldDrive) {
//   console.log("Sarah is able to drive!");
// } else {
//   console.log("Someone else should drive.");
// }

//****************************
// Lecture: Switch Statement
// ***************************

const day = "monday";

switch (day) {
  case "monday": // compare day in a strict equality way
    console.log("Plan course structure");
    console.log("Go to coding meetup");
    break;
  case "tuesday":
    console.log("Prepare theory videos");
    break;
  case "wednesday":
  case "thursday":
    console.log("Write code examples");
    break;
  case "friday":
    console.log("Record videos");
    break;
  case "saturday":
  case "sunday":
    console.log("Enjoy the weekend");
    break;
  default:
    console.log("Not a valid day!");
}

//****************************
// Lecture: Conditional Op
// ***************************

// Did the coding challenge, easy.
