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
    else if (event.target.closest(".save-item")) {
      const cartItem = event.target.closest(".cart-item");
      const itemId = cartItem.dataset.id; // Use 'id' in lowercase
      wishList.append(cartItem);
      document.getElementById(itemId).textContent = "Delete";
      document.getElementById(`${itemId}-save-move`).textContent = "Move to cart";
      // Get Cart item from local storage
      let cart = getLocalStorage("so-cart");
      console.log(cart);

      //Find the item in the index
      const itemIndex = cart.findIndex((item) => item.Id === itemId);
      // Reference to change DOM image src: https://www.w3schools.com/jsref/prop_img_src.asp
      document.getElementById(`${itemId}-image`).src = cart[itemIndex].Images.PrimarySmall;
      saveForLater(cart[itemIndex], wishList);
      removeFromCart(itemId); // Function to remove item from local storage

      document.getElementById(itemId).addEventListener("click", () => {
        const cartItem = event.target.closest(".cart-item");
        cartItem.remove(); // Remove the item from the DOM directly
        removeFromSaveForLater(itemId); // Function to remove item from local storage
      });
    }    
  });

  function removeFromCart(itemId) {
    // Get Cart items from local storage
    let cart = getLocalStorage("so-cart") || [];

    //Find the item in the index
    const itemIndex = cart.findIndex((item) => item.Id === itemId);
    console.log(itemIndex);

    // Remove from array
    if (itemIndex !== -1) {
      cart.splice(itemIndex, 1);
      // update localStorage
      localStorage.setItem("so-cart", JSON.stringify(cart));
    }
    displayTotalCartItems();
    sumTotalItems(getLocalStorage("so-cart") || []); // Update the total
  }
  const wishList = document.querySelector("#wish-list");
  let saveForLaterHTML = localStorage.getItem("save-for-later-html");
  if (saveForLaterHTML != null) {
    wishList.innerHTML = saveForLaterHTML;
  }

});

shoppingCart();
displayTotalCartItems();
sumTotalItems(getLocalStorage("so-cart") || []);

function saveForLater(item, wishList) {
  let saveForLaterItems = getLocalStorage("save-for-later-cart") || [];
  console.log(saveForLaterItems);
  saveForLaterItems.push(item);

  localStorage.setItem("save-for-later-cart", JSON.stringify(saveForLaterItems));
  // Reference to store an html element in localStorage: https://stackoverflow.com/questions/48239869/how-to-store-a-complete-div-in-localstorage
  localStorage.setItem("save-for-later-html", wishList.innerHTML);
}

function removeFromSaveForLater(itemId) {
  // Get Cart items from local storage
  let cart = getLocalStorage("save-for-later-cart") || [];

  //Find the item in the index
  const itemIndex = cart.findIndex((item) => item.Id === itemId);

  // Remove from array
  if (itemIndex !== -1) {
    cart.splice(itemIndex, 1);
    // update localStorage
    localStorage.setItem("save-for-later-cart", JSON.stringify(cart));
  }
}
