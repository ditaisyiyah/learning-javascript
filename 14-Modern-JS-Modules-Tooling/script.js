/// Importing MODULE ///

///////////////////////////////////////////////////////
/// Native ES6 Module ///

console.log('Importing module');

// import shoppingCart from './shoppingCart.js';
// 3. Top level variable is default private
// console.log(shippingCost);

// 6. Import is hoisted
// import { addToCart, totalPrice as tp, tq } from './shoppingCart.js';

// addToCart('Laprop', 1);
// console.log(tp, tq);

// Import an module as a namespace
// import * as ShoppingCart from './shoppingCart.js';
// ShoppingCart.addToCart('croissant', 3);
// console.log(ShoppingCart.totalPrice);

// Default import
// import add from './shoppingCart.js';

// 8. Having mixed im/export is unusual thing
import add, { addToCart, cart } from './shoppingCart.js';
add('Dark Chocolate', 2);
add('Peanut Butter', 1);
addToCart('Whole-Grain Bread', 2);

// 10. Not copy, but live connection
console.log(cart);

///////////////////////////////////////////////////////
/// Module Pattern /// encapsulate functionality
// private data (local variables)
// expose public API (return values)
/*
const ShoppingCart2 = (function () {
  const cart = [];
  const shippingCost = 20;
  const totalPrice = 300;
  const totalQuantity = 16;

  const addToCart = function (product, quantity) {
    cart.push({ product, quantity });
    console.log(
      `${quantity} ${product} added to cart 🛒 (shipping cost: ${shippingCost})`
    );
  };

  const orderStock = function (product, quantity) {
    cart.push({ product, quantity });
    console.log(`${quantity} ${product} ordered from supplier 🏪`);
  };

  // expose public API
  return {
    addToCart,
    cart,
    totalPrice,
    totalQuantity,
  };
})();

ShoppingCart2.addToCart('Grapes', 3);
ShoppingCart2.addToCart('Dragon Fruit', 5);
// Closure works
console.log(ShoppingCart2);

// Private, can NOT be accessed
// console.log(ShoppingCart2.shippingCost);
// ShoppingCart2.orderStock('Watermelon', 23);
*/
///////////////////////////////////////////////////////
/// CommonJS Module /// module system used bu NPM
// only runned in nodeJS, outside a browser
/*
export.addToCart = function (product, quantity) {
  cart.push({ product, quantity });
  console.log(
    `${quantity} ${product} added to cart 🛒 (shipping cost: ${shippingCost})`
  );
};

// Import
const {addToCart} * require{'./shoppingCart.js'}
*/

///////////////////////////////////////////////////////
/// Introduction to NPM ///
// instal leaflet and lodash

// import cloneDeep from './node_modules/lodash-es/cloneDeep.js';
import cloneDeep from 'lodash-es';
import thisNumberValue from 'es-abstract/2015/thisnumbervalue';
import { resolve } from 'q';

const state = {
  cart: [
    { item: 'banana', qty: 10 },
    { item: 'avocado', qty: 16 },
  ],
  user: { loggedIn: true },
};

const stateClone = Object.assign({}, state);
const stateCloneDeep = cloneDeep(state);

console.log(stateClone); // loggedIn: false
state.user.loggedIn = false;

console.log(stateCloneDeep); // loggedIn: true

///////////////////////////////////////////////////////
/// Bundling with Parcel and NPM Scripts ///

// ONLY Parcel understand this
// If (replacement in modules) it will automatically get injected to the browser
// without reload the whole page ✨
if (module.hot) {
  module.hot.accept();
}

///////////////////////////////////////////////////////
/// Confuguring Babel and Polyfilling ///
// Transpiling: convert syntaxes ES6 => ES5
// Polyfilling: convert features ES6 => ES5

console.log(cart.find(el => el.quantity >= 2));
Promise.resolve('TEST').then(x => console.log(x));
// check the find and promise in bundle

import 'core-js/stable';
// import 'core-js/stable/array/find';
// import 'core-js/stable/promise';

// check the find and promise in bundle
// Array.prototype.find...

// Polifilling async functions
import 'regenerator-runtime/runtime';
