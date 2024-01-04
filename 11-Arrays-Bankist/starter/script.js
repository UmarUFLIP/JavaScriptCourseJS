'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const account5 = {
  owner: 'Umar Mian',
  movements: [10200, 1000, -45, -230, -167, 170, 320, 32, 450, -630],
  interestRate: 0.5,
  pin: 5555,
};

const accounts = [account1, account2, account3, account4, account5];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const displayMovements = function (movements) {
  // Fixes the problem where the old 'stub' data was still on the page. The deposit of 4,000€ and withdrawal of 378€
  containerMovements.innerHTML = '';
  movements.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const html = `
    <div class="movements__row">
          <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
          <div class="movements__value">${mov}€</div>
        </div>
    `;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};
// displayMovements(account1.movements);  // Want to call this when logged in

/* Calculate and display the balance. The top right right now is 0000€. Calulating it and using DOM manipulation to display it.*/
const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, currVal) => acc + currVal, 0); // created property called balance so we can retrieve it later.
  labelBalance.textContent = `${acc.balance}€`;
};
// calcDisplayBalance(account1.movements);  // Want to call this when logged in

/* 
  Lecture: Chaining Methods 
  Using different array methods to manipulate and update the text contents on the bottom left of the page.
*/
const calcDisplaySummary = function (acct) {
  const incomes = acct.movements
    .filter(mov => mov > 0) // filter only those that are above 0 (deposits)
    .reduce((acc, mov) => acc + mov, 0); // Add all those deposits you have made
  labelSumIn.textContent = `${incomes}€`; // Display it bottom left of page for the "IN" text content.

  const out = acct.movements
    .filter(mov => mov < 0) // filter out the negative values (withdrawals)
    .reduce((acc, mov) => acc + mov, 0); // Add them up
  labelSumOut.textContent = `${Math.abs(out)}€`; // Display it on bottom left for "OUT" text.

  // Say the bank charges 1.2% interest each deposit (not real world example)
  const interest = acct.movements
    .filter(mov => mov > 0) // filter out only positive values (deposits)
    .map(deposit => (deposit * acct.interestRate) / 100) // Add 1.2% of interest to all deposits
    .filter((int, i, arr) => int >= 1) // Filter out the values that are below 1€ because the bank does not add it to interest if value is below 1 (ex)
    .reduce((acc, interestMoney) => acc + interestMoney, 0); // Calculate the total interest.

  labelSumInterest.textContent = `${interest}€`;
};
// calcDisplaySummary(account1.movements); // Want to call this when logged in

// Events Handler
let currentAccount; // Need this outside so we can keep track of which account money transfer out of (later on in this section)

btnLogin.addEventListener('click', function (e) {
  // Prevents form from submitting
  e.preventDefault(); // Forms are nice because hitting enter in either of the 2 input fields will trigger the click event.

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  console.log(currentAccount);

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // DISPLAY UI and welcome message
    labelWelcome.textContent = `Welcome Back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;

    // Clear input fields and lose its focus
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    // Update the UI
    updateUI(currentAccount);
  }
});

// Convert to lowercase and split it up
// const username = user.toLowerCase().split(' ');
/* Splitting it up will put it into an array. Now we need to loop over array
  Take the first letter in each array and join those letters and put into the new array of logins/usernames
*/
/* 
  We looped over the accounts array, and in each iteration manipulated the current account object, and added/edited a username based on the account owner + all the transformation
*/
const createUsernames = function (accts) {
  accts.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};

createUsernames(accounts);

const updateUI = function (acc) {
  // Display movements
  displayMovements(acc.movements);

  // Display balance
  calcDisplayBalance(acc);

  // Display Summary
  calcDisplaySummary(acc);
};

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault(); // this is a form so prevent the default behavior of refreshing page
  const amount = Number(inputTransferAmount.value);
  const recieverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );

  // Clear input fields and lose its focus
  inputTransferAmount.value = inputTransferTo.value = '';
  if (
    amount > 0 &&
    recieverAcc &&
    currentAccount.balance >= amount &&
    recieverAcc?.username !== currentAccount.username
  ) {
    currentAccount.movements.push(-amount);
    recieverAcc.movements.push(amount);

    // Update the UI
    updateUI(currentAccount);
  }
});
/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////
//                LECTURES:
