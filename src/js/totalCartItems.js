import { getLocalStorage } from "./utils.mjs";

export function displayTotalCartItems() {
  const cartItems = getLocalStorage("so-cart");
  let totalItems = 0;

  if (cartItems) {
    totalItems = cartItems.length;
  }

  document.querySelector("#cart-items").textContent = totalItems.toString();
}

displayTotalCartItems();
