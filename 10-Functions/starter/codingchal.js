'use strict';
// /*
// Coding Challenge #1

// Let's build a simple poll app!
// A poll has a question, an array of options from which people can choose, and an
// array with the number of replies for each option. This data is stored in the starter 'poll' object below.

// Your tasks:
//   1. Create a method called 'registerNewAnswer' on the 'poll' object. The
// method does 2 things:
//     1.1. Display a prompt window for the user to input the number of the selected option. The prompt should look like this:
//       What is your favourite programming language?
//       0: JavaScript
//       1: Python
//       2: Rust
//       3: C++
//       (Write option number)
//     1.2. Based on the input number, update the 'answers' array property. For
//     example, if the option is 3, increase the value at position 3 of the array by 1 Make sure to check if the input is a number and if the number makes sense (e.g) answer 52 wouldn't make sense, right?)

//   2. Call this method whenever the user clicks the "Answer poll" button.\

//   3. Create a method 'displayResults' which displays the poll results. The
//   method takes a string as an input (called 'type'), which can be either 'string'
//   or 'array'. If type is 'array', simply display the results array as it is, using
//   console.log(). This should be the default option. If type is 'string', display a
//   string like "Poll results are 13, 2, 4, 1".

//   4. Run the 'displayResults' method at the end of each
//   'registerNewAnswer' method call.

//   5. Bonus: Use the 'displayResults' method to display the 2 arrays in the test
//   data. Use both the 'array' and the 'string' option. Do not put the arrays in the poll object! So what should the this keyword look like in this situation?
//   The Complete JavaScript Course 21

//   Test data for bonus:
//   § Data 1: [5, 2, 3]
//   § Data 2: [1, 5, 3, 9, 6, 1]
//   Hints: Use many of the tools you learned about in this and the last section 😉
//   GOOD LUCK 😀

// */

// const poll = {
//   question: 'What is your favourite programming language?',
//   options: ['0: JavaScript', '1: Python', '2: Rust', '3: C++'],
//   // This generates [0, 0, 0, 0]. More in the next section!
//   answers: new Array(4).fill(0),
//   registerNewAnswer() {
//     // get the answer
//     const answer = Number(
//       prompt(
//         `${this.question}\n${this.options.join('\n')}\n(Write option number)`
//       )
//     );

//     // Register answer
//     // if answer is true, the && operator keeps going, if the 2nd is true, then it will keep going (or execute the last line of code). If either is false, then the && operator will short circuit.
//     typeof answer === 'number' &&
//       answer < this.answers.length &&
//       this.answers[answer]++;

//     this.displayResults();
//     this.displayResults('string');
//   },
//   // default is set to array (ES6 default parameter)
//   displayResults(type = 'array') {
//     if (type === 'array') {
//       console.log(this.answers);
//     } else if (type === 'string') {
//       // Polls result are 13, 2, 4, 1
//       console.log(`Poll results are ${this.answers.join(', ')}`);
//     }
//   },
// };

// // // this does not work because the this keyword points to the .poll element instead of the poll object.
// // document
// //   .querySelector('.poll')
// //   .addEventListener('click', poll.registerNewAnswer);

// // So we have to bind it to the poll object.
// document
//   .querySelector('.poll')
//   .addEventListener('click', poll.registerNewAnswer.bind(poll));
// //

// // [5, 2, 3]
// // [1, 5, 3, 9, 6, 1]

// // This works because the displayResult function is looking for this.answers but our array is simply out here [5, 2, 3]. We need a way to make this dot.answers = to this array. So we used the call method so that we could manually set the this keyword to a new object which has the answers properties with that new array.
// poll.displayResults.call({ answers: [1, 5, 3, 9, 6, 1] }, 'string');
// // The first argument of call method is for the 'this' keyword. Remember the taxRate and value method we created.

// **** Coding Challenge #2 *****

/* 
  Coding Challenge #2

  This is more of a thinking challenge than a coding challenge 🤓
  Your tasks:
    1. Take the IIFE below and at the end of the function, attach an event listener that changes the color of the selected h1 element ('header') to blue, each time the body element is clicked. Do not select the h1 element again!

    2. And now explain to yourself (or someone around you) why this worked! Take all the time you need. Think about when exactly the callback function is executed, and what that means for the variables involved in this example.
    
*/

// (function () {
//   const header = document.querySelector('h1');
//   header.style.color = 'red';
//   addEventListener('click', function () {
//     header.style.color = 'blue';
//   });
// })();

/* 
  My explanation: The function has header variable and the The addEventListener was created inside that function. Therefore the addEventListener has accessed to the header variable because it closed over it. The reason why its able to change color even when clicking the body is because the addEventListener is not attached to anything and therefore it is just "listening for a click" and upon that click it changes the header color to blue (and that is possible because it was closed over, or in other words, created within the function that holds the header variable.)
*/

(function () {
  const header = document.querySelector('h1');
  header.style.color = 'red';
  document.querySelector('body').addEventListener('click', function () {
    header.style.color = 'blue';
  });
})();

/* 
	Jonas's Explanation: 
*/
