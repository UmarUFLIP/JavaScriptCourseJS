/*
Object-Oriented Programming (OOP)

Coding Challenge #1

Your tasks:
1. Implement a 'Car' using a constructor function with 'make' and 'speed' properties. The 'speed' property represents the current speed of the car in km/h.
2. Create an 'accelerate' method that increases the car's speed by 10 and logs the new speed to the console.
3. Implement a 'brake' method that decreases the car's speed by 5 and logs the new speed to the console.
4. Create 2 'Car' objects and experiment with calling 'accelerate' and 'brake' multiple times on each of them.

Test data:
- Car 1: 'BMW' going at 120 km/h
- Car 2: 'Mercedes' going at 95 km/h
*/
const Car = function (make, speed) {
  this.make = make;
  this.speed = speed;
};

const bmw = new Car('BMW', 120);
const mercedes = new Car('Mercedes', 95);

Car.prototype.accelerate = function () {
  this.speed += 10;
  console.log(`${this.make} is going at ${this.speed} km/h`);
};

Car.prototype.brake = function () {
  this.speed -= 5;
  console.log(`${this.make} is going at ${this.speed} km/h`);
};

// bmw.accelerate();
// bmw.accelerate();
// bmw.brake();
// bmw.accelerate(); // 145 km/h
// mercedes.accelerate();
// mercedes.accelerate();
// mercedes.accelerate(); // 125 km/h

/* 
The Complete JavaScript Course 28

Coding Challenge #2

Your tasks:
1. Recreate Challenge #1, using an ES6 class called 'CarCl'.
2. Add a getter called 'speedUS' that returns the current speed in mi/h (divide by 1.6).
3. Add a setter called 'speedUS' that sets the current speed in mi/h (converts to km/h before storing the value by multiplying the input by 1.6).
4. Create a new car and experiment with the 'accelerate' and 'brake' methods, and with the getter and setter.

Test data:
- Car 1: 'Ford' going at 120 km/h
*/

class CarCl {
  constructor(make, speed) {
    this.make = make;
    this.speed = speed;
  }

  accelerate() {
    this.speed += 10;
    console.log(`${this.make} speed: ${this.speed} km/h`);
  }

  brake() {
    this.speed -= 5;
    console.log(`${this.make} slowing down: ${this.speed} km/h`);
  }

  get speedUS() {
    return this.speed / 1.6;
  }

  set speedUS(mphSpeed) {
    this.speed = mphSpeed * 1.6; // The user inputs the US speed (in mph) and we need to convert it to km/h and store it in speed.
    console.log(this.speed); // logging purposes.
  }
}

// const ford = new CarCl('Ford', 120);
// console.log(ford.speedUS);
// ford.accelerate();
// ford.brake();

// ford.speedUS = 50;
// console.log(ford);

/* 
Coding Challenge #3

Your tasks:
1. Use a constructor function to implement an Electric Car ('EV') as a child class of 'Car'. In addition to make and current speed, 'EV' also has the current battery charge in % ('charge' property).
2. Implement a 'chargeBattery' method that takes an argument 'chargeTo' and sets the battery charge to 'chargeTo'.
3. Implement an 'accelerate' method that increases the car's speed by 20 and decreases the charge by 1%. Log a message like this: 'Tesla going at 140 km/h, with a charge of 22%'.
4. Create an electric car object and experiment with calling 'accelerate', 'brake', and 'chargeBattery' (charge to 90%). Notice what happens when you 'accelerate'!

Test data:
- Car 1: 'Tesla' going at 120 km/h, with a charge of 23%
*/

const EV = function (make, speed, battery) {
  Car.call(this, make, speed);
  this.battery = battery;
};
EV.prototype = Object.create(Car.prototype);
EV.prototype.constructor = EV;

EV.prototype.chargeBattery = function (chargeTo) {
  this.battery = chargeTo;
};

EV.prototype.accelerate = function () {
  this.speed += 20;
  this.battery -= 1;

  console.log(
    `${this.make} going at ${this.speed} km/h, with a charge of ${this.battery}%` // Polym
  );
};

// const tesla = new EV('Tesla', 50, 23);
// console.log(tesla);
// tesla.chargeBattery(90);
// console.log(tesla); // battery is now 90
// tesla.accelerate(); // 'Tesla going at 70 km/h, with a charge of 89%'
// tesla.brake(); // Tesla is going at 65 km/h

/*
The Complete JavaScript Course 29

Coding Challenge #4

Your tasks:
1. Recreate Challenge #3, using ES6 classes: create an 'EVCl' child class of the 'CarCl' class.
2. Make the 'charge' property private.
3. Implement the ability to chain the 'accelerate' and 'chargeBattery' methods of this class. Also, update the 'brake' method in the 'CarCl' class. Experiment with chaining!

Test data:
- Car 1: 'Rivian' going at 120 km/h, with a charge of 23%

GOOD LUCK 😀
*/

class EVCl extends CarCl {
  #charge;
  constructor(make, speed, charge) {
    super(make, speed);
    this.#charge = charge;
  }
  accelerate() {
    this.speed += 20;
    this.#charge -= 1;

    console.log(
      `${this.make} traveling at ${this.speed} km/h, with a charge of ${
        this.#charge
      }%` // Polym
    );
    return this; // chainable
  }

  brake() {
    this.speed -= 5;
    console.log(`${this.make} slowing down: ${this.speed} km/h`);
    return this;
  }

  chargeTo(battery) {
    this.#charge = battery;
    console.log(`Battery charged to ${this.#charge}%`);
    return this;
  }
}

const rivian = new EVCl('Rivian', 100, 30);
console.log(rivian);

// Methods chaining.
rivian
  .accelerate()
  .brake()
  .chargeTo(50)
  .accelerate()
  .brake()
  .brake()
  .chargeTo(70);

console.log(rivian.speedUS); // comes from the parent class.
