import { getLocalStorage, loadHeaderFooter } from "./utils.mjs";
import { shoppingCart, sumTotalItems } from "./shoppingCart.mjs";
import { displayTotalCartItems } from "./totalCartItems.mjs";
import { removeDuplicateItems } from "./productDetails.mjs";

loadHeaderFooter();
removeDuplicateItems();

document.addEventListener("DOMContentLoaded", () => {
  // Add event listening to dom
  const productList = document.querySelector(".product-list-cart");
  // When button is clicked, looks for the closest button to click
  // then loks for the closest item to the button
  productList.addEventListener("click", (event) => {
    if (event.target.closest(".remove-item")) {
      const cartItem = event.target.closest(".cart-item");
      const itemId = cartItem.dataset.id; // Use 'id' in lowercase

      removeFromCart(itemId); // Function to remove item from local storage
      cartItem.remove(); // Remove the item from the DOM directly
    }
  });

  function removeFromCart(itemId) {
    // Get Cart items from local storage
    let cart = getLocalStorage("so-cart") || [];

    //Find the item in the index
    const itemIndex = cart.findIndex((item) => item.Id === itemId);

    // Remove from array
    if (itemIndex !== -1) {
      cart.splice(itemIndex, 1);
      // update localStorage
      localStorage.setItem("so-cart", JSON.stringify(cart));
    }
    displayTotalCartItems();
    sumTotalItems(getLocalStorage("so-cart") || []); // Update the total
  }
});

shoppingCart();
displayTotalCartItems();
sumTotalItems(getLocalStorage("so-cart") || []);
