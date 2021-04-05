/// Exporting MODULE ///

// 1. declare script type as module
// 2. default strict
// 3. default private
// 4. if want to make it public, do export
// 5. export can work only for top level code
// 6. import module is always hoisted
// 7. import must be in the top level code
// 8. Having mixed (named n default) im/export is unusual thing
// 9. Having im/export > 1 is unusual thing
// 10. Import is not a copy to export

console.log('Exporting module');

// 3. Top level variable is default private
export const cart = [];
const shippingCost = 10;

// 4. Exporting the top level code
export const addToCart = function (product, quantity) {
  cart.push({ product, quantity });
  console.log(`${quantity} ${product} added to cart 🛒`);
};

if (shippingCost > 100) {
  // 5. Can NOT export code inside another code
  //   export const totalShippingCost = shippingCost - 10;
  console.log(totalShippingCost);
}

const totalPrice = 123;
const totalQuantity = 12;

// Export multiple variable
export { totalPrice, totalQuantity as tq };

// 8. Defauls export
export default function (product, quantity) {
  cart.push({ product, quantity });
  console.log(`${quantity} ${product} added to cart 🛒`);
}
