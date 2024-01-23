'use strict';

// Geo-Location API

class Workout {
  date = new Date();
  id = (Date.now() + '').slice(-10);
  clicks = 0;

  constructor(coords, distance, duration) {
    this.coords = coords; // [lat, lng]
    this.distance = distance; // in km
    this.duration = duration; // in min
    this.marker = null;
  }

  _setDescription() {
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];

    this.description = `${this.type[0].toUpperCase()}${this.type.slice(1)} on ${
      months[this.date.getMonth()]
    } ${this.date.getDate()}`;
  }

  setMarker(marker) {
    this.marker = marker;
  }

  click() {
    this.clicks++;
  }
}

class Running extends Workout {
  type = 'running';
  constructor(coords, distance, duration, cadence, id = null) {
    super(coords, distance, duration);
    this.cadence = cadence;
    this.calcPace();
    this._setDescription();

    if (id) this.id = id;
  }

  calcPace() {
    // minutes/km
    this.pace = this.duration / this.distance;
    return this.pace;
  }
}
class Cycling extends Workout {
  type = 'cycling';
  constructor(coords, distance, duration, elevationGain, id = null) {
    super(coords, distance, duration);
    this.elevationGain = elevationGain;
    this.calcSpeed();
    this._setDescription();

    if (id) this.id = id;
  }

  calcSpeed() {
    //km/h
    this.speed = this.distance / (this.duration / 60);
    return this.speed;
  }
}

// const run1 = new Running([39, -12], 5.2, 24, 178);

// const cycle1 = new Cycling([39, -12], 27, 94, 523);

// console.log(run1, cycle1);

////////////////////////////////////////////////////
// Application Architecture

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');
const deleteAll = document.querySelector('.reset__workouts');
const editWorkouts = document.querySelector('.edit__workouts');
const deleteWorkout = document.querySelector('.workouts');
const lis = document.querySelectorAll('.workouts');
console.log(deleteWorkout);

class App {
  #map;
  #mapZoomLevel = 13;
  #mapEvent;
  #workouts = [];

  constructor() {
    // Get data from local storage
    this._getLocalStorage();

    // Get users positions
    this._getPosition();

    // Attach event handlers
    form.addEventListener('submit', this._newWorkout.bind(this));
    inputType.addEventListener('change', this._toggleElevationField);
    containerWorkouts.addEventListener('click', this._moveToPopup.bind(this));
    deleteAll.addEventListener('click', function (e) {
      e.preventDefault();
      app.reset();
    });
    editWorkouts.addEventListener('click', function (e) {
      app.editWorkout();
    });
  }
  _getPosition() {
    if (navigator.geolocation)
      navigator.geolocation.getCurrentPosition(
        this._loadMap.bind(this),
        function () {
          alert('Could not get your position');
        }
      );
  }

  _loadMap(position) {
    //   const latitude = position.coords.latitude
    const { latitude } = position.coords;
    const { longitude } = position.coords;
    console.log(`https://www.google.com/maps/@${latitude},${longitude}`);

    const coords = [latitude, longitude];

    this.#map = L.map('map').setView(coords, this.#mapZoomLevel);
    //   console.log(map);

    L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.#map);

    // Handling clicks on map

    this.#map.on('click', this._showForm.bind(this));

    this.#workouts.forEach(workout => {
      this._renderWorkout(workout);
      this._renderWorkoutMarker(workout);
    });

    console.log('here');
  }

  _showForm(mapE) {
    this.#mapEvent = mapE;
    inputCadence.closest('.form__row').classList.remove('form__row--hidden');
    inputElevation.closest('.form__row').classList.add('form__row--hidden');
    form.classList.remove('hidden');
    inputDistance.focus();
    inputType.selectedIndex = 0;
  }

  _hideForm() {
    // Empty inputs
    inputDistance.value =
      inputDuration.value =
      inputCadence.value =
      inputElevation.value =
      inputType.value =
        '';
    form.style.display = 'none';
    form.classList.add('hidden');
    setTimeout(() => (form.style.display = 'grid'), 1000);
  }

  // Method to edit existing workout
  editWorkout() {
    // inputCadence.closest('.form__row').classList.remove('form__row--hidden');
    // inputElevation.closest('.form__row').classList.add('form__row--hidden');
    form.classList.remove('hidden');
    inputDistance.focus();
    inputType.selectedIndex = 0;
  }

  _toggleElevationField() {
    inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
    inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
  }

  _newWorkout(e) {
    const validInputs = (...inputs) =>
      inputs.every(inp => Number.isFinite(inp));

    const allPositive = (...inputs) => inputs.every(inp => inp > 0);

    e.preventDefault();

    // Get data from the form
    const type = inputType.value;
    const distance = +inputDistance.value;
    const duration = +inputDuration.value;
    const { lat, lng } = this.#mapEvent.latlng;
    let workout;

    // If workout running, create running object
    if (type === 'running') {
      const cadence = +inputCadence.value;
      // Check if data is valid
      if (
        !validInputs(distance, duration, cadence) ||
        !allPositive(distance, duration, cadence)
      )
        return alert('Inputs have to be positive numbers');

      workout = new Running([lat, lng], distance, duration, cadence);
    }

    // If workout is cycling, create a cycling object
    if (type === 'cycling') {
      const elevation = +inputElevation.value;

      if (
        !validInputs(distance, duration, elevation) ||
        !allPositive(distance, duration)
      )
        return alert('Inputs have to be positive numbers');

      workout = new Cycling([lat, lng], distance, duration, elevation);
    }

    // Add new object to workout array
    this.#workouts.push(workout);
    // Render workout on map as a marker
    this._renderWorkoutMarker(workout);
    // Render the new workout on the list
    this._renderWorkout(workout);
    // Hide form and clear input field
    this._hideForm();
    // Set local storage to all workouts
    this._setLocalStorage();
  }

  _renderWorkoutMarker(workout) {
    const marker = L.marker(workout.coords);

    marker
      .addTo(this.#map)
      .bindPopup(
        L.popup({
          maxWidth: 250,
          minWidth: 100,
          autoClose: false,
          closeOnClick: false,
          className: `${workout.type}-popup`,
        })
      )
      .setPopupContent(
        `${workout.type === 'runnning' ? '🏃‍♂️' : '🚴‍♀️'} ${workout.description}`
      )
      .openPopup();

    //debugger;

    //this.#map.removeLayer(marker);
    //L.remove(marker);
    workout.setMarker(marker);
  }

  _renderWorkout(workout) {
    let html = `
<li class="workout workout--${workout.type}" data-id="${workout.id}">
<h2 class="workout__title">${workout.description}</h2>
<button class="delete__workout">&times;</button>
 
          <div class="workout__details">
<span class="workout__icon">${workout.type === 'running' ? '🏃‍♂️' : '🚴‍♀️'}</span>
<span class="workout__value">${workout.distance}</span>
<span class="workout__unit">km</span>
</div>
<div class="workout__details">
<span class="workout__icon">⏱</span>
<span class="workout__value">${workout.duration}</span>
<span class="workout__unit">min</span>
</div>
    `;

    if (workout.type === 'running')
      html += `
<div class="workout__details">
<span class="workout__icon">⚡️</span>
<span class="workout__value">${workout.pace.toFixed(1)}</span>
<span class="workout__unit">min/km</span>
</div>
<div class="workout__details">
<span class="workout__icon">🦶🏼</span>
<span class="workout__value">${workout.cadence}</span>
<span class="workout__unit">spm</span>
</div>
</li>`;
    if (workout.type === 'cycling')
      html += `
<div class="workout__details">
<span class="workout__icon">⚡️</span>
<span class="workout__value">${workout.speed.toFixed(1)}</span>
<span class="workout__unit">km/h</span>
</div>
<div class="workout__details">
<span class="workout__icon">🗻</span>
<span class="workout__value">${workout.elevationGain}</span>
<span class="workout__unit">m</span>
</div>
</li> `;

    form.insertAdjacentHTML('afterend', html);
  }

  _moveToPopup(e) {
    const workoutEl = e.target.closest('.workout');

    if (!workoutEl) return;

    const workout = this.#workouts.find(
      work => work.id === workoutEl.dataset.id
    );

    if (!workout) return;

    this.#map.setView(workout.coords, this.#mapZoomLevel, {
      animate: true,
      pan: {
        duration: 1,
      },
    });
  }

  _setLocalStorage() {
    localStorage.setItem(
      'workouts',
      JSON.stringify(
        this.#workouts.map(item => {
          if (item.type.toLowerCase() == 'running') {
            const { id, coords, distance, duration, type, cadence } = item;
            return {
              id,
              coords,
              distance,
              duration,
              type,
              cadence,
            };
          }

          const { id, coords, distance, duration, type, elevationGain } = item;
          return {
            id,
            coords,
            distance,
            duration,
            type,
            elevationGain,
          };
        })
      )
    );
    //localStorage.setItem('workouts', JSON.stringify(this.#workouts));
  }

  _getLocalStorage() {
    const data = JSON.parse(localStorage.getItem('workouts'));

    if (!data) return;

    data.forEach(work => {
      const workout =
        work.type.toLowerCase() == 'running'
          ? new Running(
              work.coords,
              work.distance,
              work.duration,
              work.cadence,
              work.id
            )
          : new Cycling(
              work.coords,
              work.distance,
              work.duration,
              work.elevationGain,
              work.id
            );
      this.#workouts.push(workout);
    });

    // this.#workouts = data;

    // this.#workouts.forEach(work => {
    //   this._renderWorkout(work);
    // });
  }
  reset() {
    localStorage.removeItem('workouts');
    location.reload();
  }
  // delete = () => {
  //   while (deleteWorkout.firstChild) {
  //     deleteWorkout.removeChild(deleteWorkout.firstChild);
  //   }

  _removeWorkoutFromMap(workout) {
    this.#map.removeLayer(workout.marker);
  }

  delete(el) {
    if (!el?.parentNode) return;

    // const workout = this.#workouts.find(
    //   work => work.id === workoutEl.dataset.id
    // );

    for (let i = 0; i < this.#workouts.length; i++) {
      if (this.#workouts[i].id == el.dataset.id) {
        this._removeWorkoutFromMap(this.#workouts[i]);
        this.#workouts.splice(i, 1);
        this._setLocalStorage();
        break;
      }
    }

    deleteWorkout.removeChild(el);
    //el.dataset.id
  }
}

deleteWorkout.addEventListener('click', function (e) {
  //console.log(e.target);
  //if (!e.target.classList.contains('delete__workout')) return;
  // app.delete(e.target.closest('li'));
  app.delete(e.target.closest('li'));
});

const app = new App();

/* 
      <!-- Overlay for edit workout -->
      <div class="overlay hidden">
        <div class="overlay__content">
          <h2 class="overlay__title">Edit your workout</h2>
          <form class="form form--edit">
            <div class="form__row">
              <label class="form__label">Type</label>
              <select class="form__input form__input--type">
                <option value="running">Running</option>
                <option value="cycling">Cycling</option>
              </select>
            </div>
            <div class="form__row">
              <label class="form__label">Distance</label>
              <input
                class="form__input form__input--distance"
                placeholder="mi"
              />
            </div>
            <div class="form__row">
              <label class="form__label">Duration</label>
              <input
                class="form__input form__input--duration"
                placeholder="min"
              />
            </div>
            <div class="form__row">
              <label class="form__label">Cadence</label>
              <input
                class="form__input form__input--cadence"
                placeholder="step/min"
              />
            </div>
            <div class="form__row form__row--hidden">
              <label class="form__label">Elev Gain</label>
              <input
                class="form__input form__input--elevation"
                placeholder="feet"
              />
            </div>
            <button class="form__btn">OK</button>
          </form>
        </div>
      </div>
      */

/*       <section class="section-edit--workout" id="cta">
        <div class="container">
          <div class="cta">
            <div class="cta-text-box">
              <h2 class="heading-secondary">Edit your workout</h2>

              <form class="cta-form" method="post" name="sign-up">
                <input type="hidden" name="form-name" value="sign-up" />
                <div>
                  <label for="full-name">Full name</label>
                  <input
                    id="full-name"
                    type="text"
                    placeholder="John Smith"
                    name="full-name"
                    autocomplete="name"
                    required
                  />
                </div>

                <div>
                  <label for="email">Email Address</label>
                  <input
                    id="email"
                    type="email"
                    placeholder="me@example.com"
                    name="email"
                    autocomplete="email"
                    required
                  />
                </div>

                <div>
                  <label for="select-where">Where did you hear from us?</label>
                  <select id="select-where" name="select-where" required>
                    <option value="">Please choose one option:</option>
                    <option value="F&F">Friends and Family</option>
                    <option value="youtube">YouTube</option>
                    <option value="podcast">Podcast</option>
                    <option value="ad">Facebook Ad</option>
                    <option value="others">Others</option>
                  </select>
                </div>
                <button class="btn btn--form">Sign up now</button>
              </form>
            </div>
            <div
              class="cta-img-box"
              role="img"
              aria-label="Woman enjoying food"
            ></div>
          </div>
        </div>
      </section>
*/
