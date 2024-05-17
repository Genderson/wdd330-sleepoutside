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

const addButton = document.querySelector("#addToCart"); // load the button
const cart = document.querySelector(".cart"); // the cart icon
if (addButton !== null) {
  // Logic to see if the button exists and if so run the animation
  addButton.addEventListener("click", () => {
    cart.classList.add("animate");
    setTimeout(() => {
      cart.classList.remove("animate");
    }, 300);
  });
}
