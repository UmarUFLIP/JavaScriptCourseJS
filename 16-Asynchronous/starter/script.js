'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////

const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
  countriesContainer.style.opacity = 1;
};

const renderCountry = function (data, className = '') {
  const { currencies } = data;
  const result = Object.entries(currencies);

  const lang = Object.values(data.languages);

  const html = `
  <article class="country ${className}">
  <img class="country__img" src="${data.flags.svg}" />
  <div class="country__data">
    <h3 class="country__name">${data.name.common}</h3>
    <h4 class="country__region">${data.region}</h4>
    <p class="country__row"><span>👫</span>${(
      +data.population / 1_000_000
    ).toFixed(1)} million</p>
    <p class="country__row"><span>🗣️</span>${lang[0]}</p>
    <p class="country__row"><span>💰</span>${result[0][1].name}</p>
  </div>
</article>
`;
  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
};

/*
const getCountryAndNeighbor = function (country) {
  // AJAX Call Country 1
  const request = new XMLHttpRequest();
  request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
  request.send();

  request.addEventListener('load', function () {
    const [data] = JSON.parse(this.responseText);
    console.log(data);

    // Render country 1
    renderCountry(data);

    // Get neighbor countries
    const neighbor = data.borders?.[0];
    console.log(neighbor);

    const request2 = new XMLHttpRequest();
    request2.open('GET', `https://restcountries.com/v3.1/alpha/${neighbor}`);
    request2.send();

    request2.addEventListener('load', function () {
      // this second AJAX call is dependent on the 1st one. We are basically firing the 2nd AJAX call in the callback function of the first function.
      const [data2] = JSON.parse(this.responseText);
      console.log(data2);

      renderCountry(data2, 'neighbour');
    });
  });
};
*/

// const request = new XMLHttpRequest();
// request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
// request.send();

// const getJSON = function (url, errorMsg = 'Something went wrong!') {
//   return fetch(url).then(response => {
//     // console.log(response);
//     if (!response.ok) throw new Error(`${errorMsg} (${response.status})`);

//     return response.json();
//   });
// };

// const getCountryData = function (country) {
//   // Country 1:
//   getJSON(`https://restcountries.com/v3.1/name/${country}`, 'Country not found')
//     .then(data => {
//       renderCountry(data[0]);
//       // console.log(data[0]?.borders[0]);
//       const neighbour = data[0].borders[0];
//       // const neighbour = 'dasdf';

//       if (!neighbour) throw new Error('No neighbour found!');

//       // Country 2
//       return getJSON(
//         `https://restcountries.com/v3.1/alpha/${neighbour}`,
//         'Country not found'
//       );
//     })
//     .then(data => renderCountry(data[0], 'neighbour'))
//     .catch(err => {
//       console.error(`${err} 🔥`);
//       renderError(`Something went wrong 🔥 ${err.message}. Try again!`);
//     })
//     .finally(() => {
//       countriesContainer.style.opacity = 1;
//     });
// };

// Only call this function when the user clicks a button
// btn.addEventListener('click', function () {
//   getCountryData('usa');
// });

/*
LECTURE: BUILDING A SIMPLE PROMISE

const lotteryPromise = new Promise(function (resolve, reject) {
  console.log('Lottery draw is happening...');
  setTimeout(() => {
    // Setting the condition that will return a successful promise
    if (Math.random() >= 0.5) {
      resolve('You WIN 💰'); // The value to be returned that will be handled in the .then method
    } else {
      reject(new Error('You lost your money 🤒')); // THe error message that will be available in the catch method.
    }
  }, 2000);
});

lotteryPromise.then(res => console.log(res)).catch(err => console.error(err));

// Promisifying setTimeout
const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};

// Wanting to execute code/promise after 2 seconds.
wait(2)
  .then(() => {
    console.log('I waited 2 seconds.');
    return wait(1);
  })
  .then(() => console.log('I waited for 1 second (3 secs total)'));
*/

// Promisify a callaback based API to a promised based API.
// const getPosition = function () {
//   return new Promise(function (resolve, reject) {
//     // navigator.geolocation.getCurrentPosition(
//     //   position => resolve(position),
//     //   err => reject(err)
//     // );
//     navigator.geolocation.getCurrentPosition(resolve, reject);
//   });
// };

// getPosition().then(pos => console.log(pos));

// const whereAmI = function () {
//   getPosition()
//     .then(pos => {
//       const { latitude: lat, longitude: lng } = pos.coords;

//       return fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
//     })
//     .then(res => {
//       if (!res.ok) throw new Error(`Problem with geocoding ${res.status}`);
//       console.log(res);
//       return res.json();
//     })
//     .then(data => {
//       console.log(`You are in ${data.city}, ${data.country}`);

//       return fetch(`https://restcountries.com/v3.1/name/${data.country}`);
//     })
//     .then(response => {
//       if (!response.ok)
//         throw new Error(`Country not found (${response.status})`);

//       return response.json();
//     })
//     .then(data => renderCountry(data[0]))
//     .catch(err => console.error(`${err.message} 🔥`))
//     .finally(() => (countriesContainer.style.opacity = 1));
// };

// btn.addEventListener('click', whereAmI);

// Async function is a function that will keep running in the background while performing code that's inside of it and automatically returns promise

const getPosition = function () {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

const whereAmI = async function () {
  try {
    // Geolocation
    const pos = await getPosition();
    const { latitude: lat, longitude: lng } = pos.coords;

    // Reverse geocoding
    const resGeo = await fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
    if (!resGeo.ok) throw new Error('Problem getting location'); // Error handling for rejected promise for resGeo fetch

    const dataGeo = await resGeo.json();
    // console.log(dataGeo);

    // Country data
    const res = await fetch(
      `https://restcountries.com/v3.1/name/${dataGeo.country}`
    );
    if (!res.ok) throw new Error('Problem getting country'); // Error handling for rejected promise for res fetch

    const data = await res.json();
    // console.log(data);
    renderCountry(data[0]);

    return `You are in ${dataGeo.city}, ${dataGeo.country}`;
  } catch (err) {
    // Error handling for getting geoPosition (try / catch)
    console.error(err);
    renderError(`🔥 ${err.message}`);

    // Reject promise returned from async function
    throw err;
  }
};

whereAmI()
  .then(res => console.log(res))
  .catch(err => console.error(`${err} 🔴`));

const getJSON = function (url, errorMsg = 'Something went wrong!') {
  return fetch(url).then(response => {
    // console.log(response);
    if (!response.ok) throw new Error(`${errorMsg} (${response.status})`);

    return response.json();
  });
};

// const get3Countries = async function (c1, c2, c3) {
//   try {
//     // const [data1] = await getJSON(`https://restcountries.com/v3.1/name/${c1}`);
//     // const [data2] = await getJSON(`https://restcountries.com/v3.1/name/${c2}`);
//     // const [data3] = await getJSON(`https://restcountries.com/v3.1/name/${c3}`);

//     // console.log([...data1.capital, ...data2.capital, ...data3.capital]);

//     // This runs in paralell (not sequentially)
//     // If one promise rejects, then all promise reject (for Promise.all)
//     const data = await Promise.all([
//       getJSON(`https://restcountries.com/v3.1/name/${c1}`),
//       getJSON(`https://restcountries.com/v3.1/name/${c2}`),
//       getJSON(`https://restcountries.com/v3.1/name/${c3}`),
//     ]);
//     console.log(data);

//     // Returns an array with the capital cities.
//     console.log(data.map(d => d[0].capital));
//   } catch (err) {
//     console.error(err);
//   }
// };

// get3Countries('usa', 'pakistan', 'germany');

// Promise.race
// Recieves an array of promises and returns a promise (the first promise that settles wins the "race")
(async function () {
  const res = await Promise.race([
    getJSON(`https://restcountries.com/v3.1/name/egypt`),
    getJSON(`https://restcountries.com/v3.1/name/palestine`),
    getJSON(`https://restcountries.com/v3.1/name/qatar`),
  ]);
  console.log(res[0]);
})();

// Promise will reject after a certain time has passed (for slow internet cases)
const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(() => {
      reject(new Error('Request took too long!'));
    }, s * 1000);
  });
};

Promise.race([getJSON(`https://restcountries.com/v3.1/name/qatar`), timeout(1)])
  .then(res => console.log(res[0]))
  .catch(err => console.error(err));

// Promise.allSettled
// Takes in an array of promises and returns array of promises but it will even return the rejected promises (unlike all which will shortcircuit when one promise rejects)
Promise.allSettled([
  Promise.resolve('Success'),
  Promise.reject('ERORR'),
  Promise.resolve('Another success'),
]).then(res => console.log(res));

// Promise.any
