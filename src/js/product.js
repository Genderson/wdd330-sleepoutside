import { getParam } from "./utils.mjs";
import productDetails from "./productDetails.mjs";

const productId = getParam("product");

productDetails(productId);

let productQuantitySelector = document.querySelector("#productQuantity");

// Reference of how to use addEventListener with arrow function:
// https://www.30secondsofcode.org/js/s/arrow-function-event-listeners/
productQuantitySelector.addEventListener("focusout", () => {
  let productQuantity = productQuantitySelector.value;
  productDetails(productId, productQuantity);
});
