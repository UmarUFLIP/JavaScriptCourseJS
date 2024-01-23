'use strict';

class Workout {
  date = new Date();
  id = (Date.now() + ' ').slice(-10).trim(); // trimmed spaces
  clicks = 0;

  constructor(coords, distance, duration) {
    this.coords = coords; // [lat, long]
    this.distance = distance; // in miles
    this.duration = duration; // in mutes
  }

  _setDescription() {
    // prettier-ignore
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    this.description = `${this.type[0].toUpperCase()}${this.type.slice(1)} on ${
      months[this.date.getMonth()]
    } ${this.date.getDate()}`;
  }

  click() {
    this.clicks++;
    // console.log(this.clicks);
  }
}

class Running extends Workout {
  type = 'running';

  constructor(coords, distance, duration, cadence) {
    super(coords, distance, duration);
    this.cadence = cadence;
    this.calcPace();
    this._setDescription();
  }

  calcPace() {
    // minute per miles
    this.pace = this.duration / this.distance;
    return this.pace;
  }
}
class Cycling extends Workout {
  type = 'cycling';

  constructor(coords, distance, duration, elevationGain) {
    super(coords, distance, duration);
    this.elevationGain = elevationGain;
    this.calcSpeed();
    this._setDescription();
  }

  calcSpeed() {
    // miles per hour
    this.speed = this.distance / (this.duration / 60); // duration is in minutes so minutes / 60 = hours.
    return this.speed;
  }
}

//////////////////////////////////////
// APPLICATION ARCHITECTURE

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');
const editBtn = document.querySelector('.edit-btn');
const delAllBtn = document.querySelector('.del-all-btn');
class App {
  #map;
  #mapZoomLevel = 13;
  #mapEvent;
  #workouts = [];

  constructor() {
    // this get executed as soon as page laods (we dont have to do line 67)
    this._getPosition();

    // Get Data from local storage
    this._getLocalStorage();

    // Rebuild local storage
    this._rebuildLocalStorage();

    // Attach event handlers
    form.addEventListener('submit', this._newWorkout.bind(this));
    inputType.addEventListener('change', this._toggleElevationField);
    containerWorkouts.addEventListener('click', this._moveToPopup.bind(this));

    // EventListener for edit workouts
    containerWorkouts.addEventListener('click', this.editWorkout.bind(this));

    // EventListenr for delete single workout
    containerWorkouts.addEventListener('click', this.deleteWorkout.bind(this));

    // EventListener for delete all button
    delAllBtn.addEventListener('click', this.delAllWorkouts.bind(this));
  }

  _getPosition() {
    if (navigator.geolocation)
      // JavaScript will call _loadMap as soon as the position is recieved from the browser.
      navigator.geolocation.getCurrentPosition(
        this._loadMap.bind(this),
        function () {
          alert('Could not get your position');
        }
      );
  }

  _loadMap(position) {
    const { latitude } = position.coords;
    const { longitude } = position.coords;
    // console.log(`https://www.google.com/maps/@${latitude},${longitude}`);

    const coords = [latitude, longitude];

    this.#map = L.map('map').setView(coords, this.#mapZoomLevel);
    // console.log(map);

    L.tileLayer('https://tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.#map);

    // Handdling clicks on map
    this.#map.on('click', this._showForm.bind(this));

    // Render markers
    // Map is not created at the beginning of page laod
    this.#workouts.forEach(work => {
      this._renderWorkoutMarker(work);
    });
  }

  _showForm(mapE) {
    this.#mapEvent = mapE;
    form.classList.remove('hidden');
    inputDistance.focus();
  }

  _hideForm() {
    // prettier-ignore
    inputDistance.value = inputDuration.value = inputCadence.value = inputElevation.value = '';

    form.style.display = 'none'; // We have to do this so it looks like the workout replaced the form
    form.classList.add('hidden'); // Hide the form
    setTimeout(() => (form.style.display = 'grid'), 1000); // We need to add it back after hiding it because it's the css property that takes care of hiding it. Remember 'none' will stop all animations/transitions.
  }

  _toggleElevationField() {
    inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
    inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
  }

  _newWorkout(e) {
    // Helper functions to check if the inputs are numbers and > 0. Every method returns true if the condition meets for all inputs. We use the rest operator to take in any amount of inputs and on that array of inputs. We do the every method. It will return false if it does not meet the condition of isFinite and > 0.
    const validInputs = (...inputs) =>
      inputs.every(inp => Number.isFinite(inp));
    const allPositive = (...inputs) => inputs.every(inp => inp > 0);

    e.preventDefault(); // Default behavior of form refreshes the page.

    // Get data from form
    const type = inputType.value;
    const distance = +inputDistance.value;
    const duration = +inputDuration.value;
    const { lat, lng: long } = this.#mapEvent.latlng;
    let workout;

    // If workout running, create running object
    if (type === 'running') {
      const cadence = +inputCadence.value;
      // Check if data is valid
      // Guard clause
      if (
        !validInputs(distance, duration, cadence) ||
        !allPositive(distance, duration, cadence)
      )
        return alert('Input has to be positive numbers!');

      workout = new Running([lat, long], distance, duration, cadence);
    }

    // If workout cycling, create cycling object
    if (type === 'cycling') {
      const elevation = +inputElevation.value;

      // Check if data is valid
      // Every method will return false (for isFinite and > 0) and therefore we use not (!) to run the alert
      if (
        !validInputs(distance, duration, elevation) ||
        !allPositive(distance, duration)
      )
        return alert('Input has to be positive numbers!');

      workout = new Cycling([lat, long], distance, duration, elevation);
    }

    // Add new object to workout array
    this.#workouts.push(workout);

    // Render workout on map as marker
    this._renderWorkoutMarker(workout);

    // Render workout on list
    this._renderWorkoutList(workout);

    // Hide the form + clear the input fields.
    this._hideForm();

    // Set local storage to all workouts
    this._setLocalStorage();
  }

  _renderWorkoutMarker(workout) {
    L.marker(workout.coords)
      .addTo(this.#map)
      .bindPopup(
        L.popup({
          maxWidth: 250,
          minWidth: 150,
          autoClose: false,
          closeOnClick: false,
          className: `${workout.type}-popup`,
        })
      )
      .setPopupContent(
        `${workout.type === 'running' ? '🏃‍♂️' : '🚴‍♀️'} ${workout.description}`
      )
      .openPopup();
  }
  _renderWorkoutList(workout) {
    let html = `
    <li class="workout workout--${workout.type}" data-id="${workout.id}">
    <div class="workout__header">
    <h2 class="workout__title">${workout.description}</h2>
    <span class="delete--edit__icons"
              ><ion-icon class="edit-btn" name="create-outline"></ion-icon
              ><ion-icon class="delete-btn" name="trash-outline"></ion-icon
            ></span>
          </div>
    <div class="workout__details-container">
    <div class="workout__details">
      <span class="workout__icon">${
        workout.type === 'running' ? '🏃‍♂️' : '🚴‍♀️'
      }</span>
      <span class="workout__value">${workout.distance}</span>
      <span class="workout__unit">mi</span>
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
      <span class="workout__unit">ft/min</span>
      </div>
      <div class="workout__details">
      <span class="workout__icon">🦶🏼</span>
      <span class="workout__value">${workout.cadence}</span>
      <span class="workout__unit">spm</span>
      </div>
      </div>
      </li>
      `;

    if (workout.type === 'cycling')
      html += `
        <div class="workout__details">
            <span class="workout__icon">⚡️</span>
            <span class="workout__value">${workout.speed.toFixed(1)}</span>
            <span class="workout__unit">mph</span>
          </div>
          <div class="workout__details">
            <span class="workout__icon">⛰</span>
            <span class="workout__value">${workout.elevationGain}</span>
            <span class="workout__unit">mi</span>
          </div>
          </div>
        </li>
        `;

    form.insertAdjacentHTML('afterend', html);
  }

  // Move to the workout on the map when clicked on the side bar.
  _moveToPopup(e) {
    const workoutEl = e.target.closest('.workout');
    // We did this because we can get the 'data-id' and then use that to build a brige between the UI and data.

    // Guard clause (clicking outside the element gives null)
    if (!workoutEl) return;

    const workout = this.#workouts.find(
      work => work.id === workoutEl.dataset.id
    );

    this.#map.setView(workout.coords, this.#mapZoomLevel, {
      animate: true,
      pan: {
        duration: 1,
      },
    });

    // Using the public interface
    // workout.click(); disabled the functionality of click (converting from string back to obj made it lose this functionality).
    // We can try grabbing the object and converting by using object.create?

    workout.click();
  }

  _setLocalStorage() {
    localStorage.setItem('workouts', JSON.stringify(this.#workouts));
  }

  _getLocalStorage() {
    // const data = localStorage.getItem('workouts'); returns a string
    const data = JSON.parse(localStorage.getItem('workouts'));

    if (!data) return;

    // Restore the workouts from data into this.#workouts
    this.#workouts = data;

    // Render the workout in the list.
    this.#workouts.forEach(work => {
      this._renderWorkoutList(work);
    });
  }

  // to reset the localStorage
  reset() {
    localStorage.removeItem('workouts');
    location.reload();
  }

  // Rebuild the workouts array from localStorage!
  _rebuildLocalStorage() {
    if (!localStorage.getItem('workouts')) return;

    const workoutsData = JSON.parse(localStorage.getItem('workouts'));

    // Helper function to create instances of Running or Cycling
    const createWorkoutInstance = (type, data) => {
      if (type === 'running') {
        const runningInstance = new Running(
          data.coords,
          data.distance,
          data.duration,
          data.cadence
        );
        runningInstance.id = data.id; // Set the ID
        runningInstance.clicks = data.clicks;

        return runningInstance;
      } else if (type === 'cycling') {
        const cyclingInstance = new Cycling(
          data.coords,
          data.distance,
          data.duration,
          data.elevationGain
        );
        cyclingInstance.id = data.id; // Set the ID
        cyclingInstance.clicks = data.clicks;
        return cyclingInstance;
      }
      return null;
    };

    // Rebuild the data back into class of either Running or Cycling
    const rebuiltWorkouts = workoutsData.map(workout => {
      return createWorkoutInstance(workout.type, workout);
    });

    // Clear workouts
    this.#workouts = [];

    // Push unique rebuilt workouts into the #workouts array in the App class
    this.#workouts.push(...rebuiltWorkouts);

    console.log(this.#workouts);
  }

  // Edit workout function
  editWorkout(e) {
    // Only when the edit button is clicked
    const editIconEl = e.target.closest('.edit-btn');
    // Guard clause
    if (!editIconEl) return;

    const workoutEl = e.target.closest('.workout');
    console.log(workoutEl);

    const workout = this.#workouts.find(
      work => work.id === workoutEl.dataset.id
    );

    // Get the input fields
    const inputDistance = document.querySelector('.form__input--distance');
    const inputDuration = document.querySelector('.form__input--duration');
    const inputCadence = document.querySelector('.form__input--cadence');
    const inputElevation = document.querySelector('.form__input--elevation');

    // Set the input fields to the workout data
    inputDistance.value = workout.distance;
    inputDuration.value = workout.duration;
    if (workout.type === 'running') {
      inputCadence.value = workout.cadence;
      inputElevation.value = '';
    } else if (workout.type === 'cycling') {
      inputElevation.value = workout.elevationGain;
      inputCadence.value = '';
    }

    // Hide the form + clear the input fields.
    this._hideForm();
  }

  // Delete single workout method
  deleteWorkout(e) {
    // Only when the delete button is clicked
    const deleteIconEl = e.target.closest('.delete-btn');
    // Guard clause
    if (!deleteIconEl) return;

    const workoutEl = e.target.closest('.workout');

    const workout = this.#workouts.find(
      work => work.id === workoutEl.dataset.id
    );

    // Delete the workout from list
    workoutEl.remove();

    // Delete workout
    const index = this.#workouts.indexOf(workout);
    this.#workouts.splice(index, 1);

    // Set local storage to all workouts
    this._setLocalStorage();

    // Reload page to remove from map (not the best way)
    location.reload();
  }

  // Delete all workouts
  delAllWorkouts() {
    this.reset();
  }
}

const app = new App();
