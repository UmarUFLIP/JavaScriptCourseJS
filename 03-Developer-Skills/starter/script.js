// Remember, we're gonna use strict mode in all scripts now!
"use strict";

// Debugging using Debugger

// const measureKelvin = function () {
//   const measurement = {
//     type: "temp",
//     unit: "celsius",
//     value: Number(prompt("Degree celsius:")),
//   };
//   console.table(measurement);
//   const kelvin = measurement.value + 273;
//   return kelvin;
// };

// // A) Idenify bug:
// console.log(measureKelvin(10));

// JS Challenge Section 62)

// Test data
const arr1 = [17, 21, 23];
const arr2 = [12, 5, -5, 0, 4];

// Function takes in an array and prints the temps
const printForecast = function (arr) {
  // String that will be outputted.
  let str = "... ";

  // Iterate through the array and grab the temp and day corresponding to it.
  // Temperature at index 0 will be Day 1, so for the day just add + 1.
  for (let i = 0; i < arr.length; i++) {
    // TempStr that will be concatenated to str to form the string.
    const tempStr = `${arr[i]}°C in ${i + 1} days ... `;

    // Concentate each of the modified tempStr to str.
    str += tempStr;
  }
  // Output to console.
  console.log(str);
};

printForecast(arr1);
printForecast(arr2);
