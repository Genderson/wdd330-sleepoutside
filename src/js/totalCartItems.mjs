import { getLocalStorage } from "./utils.mjs";

export function displayTotalCartItems() {
  const cartItems = getLocalStorage("so-cart");
  let totalItems = 0;

  if (cartItems) {
    totalItems = cartItems.reduce(
      (sum, item) => sum + (item.Quantity || 0),
      0
    );
  }

  const cartIcon = document.querySelector("#cart-items");
  if(cartIcon){
    cartIcon.textContent = totalItems.toString();
  }  
}


