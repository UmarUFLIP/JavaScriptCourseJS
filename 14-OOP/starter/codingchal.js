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

The Complete JavaScript Course 28

Coding Challenge #2

Your tasks:
1. Recreate Challenge #1, using an ES6 class called 'CarCl'.
2. Add a getter called 'speedUS' that returns the current speed in mi/h (divide by 1.6).
3. Add a setter called 'speedUS' that sets the current speed in mi/h (converts to km/h before storing the value by multiplying the input by 1.6).
4. Create a new car and experiment with the 'accelerate' and 'brake' methods, and with the getter and setter.

Test data:
- Car 1: 'Ford' going at 120 km/h

Coding Challenge #3

Your tasks:
1. Use a constructor function to implement an Electric Car ('EV') as a child class of 'Car'. In addition to make and current speed, 'EV' also has the current battery charge in % ('charge' property).
2. Implement a 'chargeBattery' method that takes an argument 'chargeTo' and sets the battery charge to 'chargeTo'.
3. Implement an 'accelerate' method that increases the car's speed by 20 and decreases the charge by 1%. Log a message like this: 'Tesla going at 140 km/h, with a charge of 22%'.
4. Create an electric car object and experiment with calling 'accelerate', 'brake', and 'chargeBattery' (charge to 90%). Notice what happens when you 'accelerate'!

Test data:
- Car 1: 'Tesla' going at 120 km/h, with a charge of 23%

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
