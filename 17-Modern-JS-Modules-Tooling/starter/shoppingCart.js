// Exporting Modules
// console.log('Exporting Modules');

// // // Blocking code
// // console.log('Start fetching users');
// // await fetch('https://jsonplaceholder.typicode.com/users');
// // console.log('Finished fetching users');

// // Scoped to the current module, we can only use them here.
// const shippingCost = 10;
// export const cart = [];

// // We have to use export to use them in other modules
// export const addToCart = function (product, quantity) {
//   cart.push({ product, quantity });
//   console.log(`${quantity}x ${product} added to cart`);
// };

// const totalPrice = 237;
// const totalQuantity = 23;

// export { totalPrice, totalQuantity as totQ }; // We can export multiple things like this.

// // We use default export when we want to export only one thing per module.
// export default function (product, quantity) {
//   cart.push({ product, quantity });
//   console.log(`${quantity}x ${product} added to cart`);
// }
