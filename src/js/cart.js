import { getLocalStorage, loadHeaderFooter } from "./utils.mjs";
import { shoppingCart, sumTotalItems } from "./shoppingCart.mjs";
import { displayTotalCartItems } from "./totalCartItems.mjs";
import { removeDuplicateItems } from "./productDetails.mjs";

loadHeaderFooter();
removeDuplicateItems();
addWishListHeader(); // This loads the header if there is anything in it when the page loads.

document.addEventListener("DOMContentLoaded", () => {
  // Add event listening to dom
  const productList = document.querySelector(".product-list-cart");
  // When button is clicked, looks for the closest button to click
  // then looks for the closest item to the button

  let cartItem = "";

  productList.addEventListener("click", (event) => {
    if (event.target.closest(".remove-item")) {
      cartItem = event.target.closest(".cart-item");
      let itemId = cartItem.dataset.id; // Use 'id' in lowercase

      removeFromCart(itemId); // Function to remove item from local storage
      cartItem.remove(); // Remove the item from the DOM directly
      addWishListHeader();
    } else if (event.target.closest(".save-item")) {
      cartItem = event.target.closest(".cart-item");
      let itemId = cartItem.dataset.id; // Use 'id' in lowercase
      wishList.append(cartItem);
      document.getElementById(itemId).textContent = "Delete";
      document.getElementById(`${itemId}-save-move`).textContent =
        "Move to cart";

      // Get Cart item from local storage
      let cart = getLocalStorage("so-cart");

      //Find the item in the index
      const itemIndex = cart.findIndex((item) => item.Id === itemId);

      // Reference to change DOM image src: https://www.w3schools.com/jsref/prop_img_src.asp
      document.getElementById(`${itemId}-image`).src =
        cart[itemIndex].Images.PrimarySmall;

      saveForLater(cart[itemIndex], wishList);
      removeFromCart(itemId); // Function to remove item from local storage

      document.getElementById(itemId).addEventListener("click", () => {
        cartItem = event.target.closest(".cart-item");
        cartItem.remove(); // Remove the item from the DOM directly
        removeFromSaveForLaterCart(itemId); // Function to remove item from local storage
        addWishListHeader();
      });
      addWishListHeader();
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
  const wishList = document.querySelector("#wish-list");
  let saveForLaterHTML = localStorage.getItem("save-for-later-html");
  if (saveForLaterHTML != null) {
    wishList.innerHTML = saveForLaterHTML;
  }

  wishList.addEventListener("click", (event) => {
    if (event.target.closest(".remove-item")) {
      cartItem = event.target.closest(".cart-item");
      let itemId = cartItem.dataset.id; // Use 'id' in lowercase

      removeFromSaveForLaterCart(itemId); // Function to remove item from local storage
      cartItem.remove(); // Remove the item from the DOM directly

      // After removing the cartItem html, save the innerHTML for wishList.
      // Reference to store an html element in localStorage: https://stackoverflow.com/questions/48239869/how-to-store-a-complete-div-in-localstorage
      localStorage.setItem("save-for-later-html", wishList.innerHTML);
      addWishListHeader();
    }
    // Move to cart
    else if (event.target.closest(".save-item")) {
      cartItem = event.target.closest(".cart-item");
      let itemId = cartItem.dataset.id; // Use 'id' in lowercase

      // Get Save For Later Cart item from local storage
      let cart = getLocalStorage("save-for-later-cart");

      //Find the item in the index
      const itemIndex = cart.findIndex((item) => item.Id === itemId);

      moveToCart(cart[itemIndex]);
      removeFromSaveForLaterCart(itemId); // Function to remove item from local storage

      cartItem.remove(); // Remove the item from the DOM directly

      // After removing the cartItem html, save the innerHTML for wishList.
      // Reference to store an html element in localStorage: https://stackoverflow.com/questions/48239869/how-to-store-a-complete-div-in-localstorage
      localStorage.setItem("save-for-later-html", wishList.innerHTML);

      productList.innerHTML = ""; // Clear the html before loading html each time.
      shoppingCart();
      displayTotalCartItems();
      sumTotalItems(getLocalStorage("so-cart") || []);
      addWishListHeader();
    }
  });
});

function saveForLater(item, wishList) {
  let saveForLaterItems = getLocalStorage("save-for-later-cart") || [];
  saveForLaterItems.push(item);

  localStorage.setItem(
    "save-for-later-cart",
    JSON.stringify(saveForLaterItems)
  );
  // Reference to store an html element in localStorage: https://stackoverflow.com/questions/48239869/how-to-store-a-complete-div-in-localstorage
  localStorage.setItem("save-for-later-html", wishList.innerHTML);
}

function removeFromSaveForLaterCart(itemId) {
  // Get Save For Later Cart item from local storage
  let cart = getLocalStorage("save-for-later-cart") || [];

  //Find the item in the index
  const itemIndex = cart.findIndex((item) => item.Id === itemId);

  // Remove from array
  if (itemIndex !== -1) {
    cart.splice(itemIndex, 1);
    //cartHTML.splice(itemIndex, 1);
    // update localStorage
    localStorage.setItem("save-for-later-cart", JSON.stringify(cart));
    //localStorage.setItem("save-for-later-html", wishList.innerHTML);
  }
  displayTotalCartItems();
  sumTotalItems(getLocalStorage("so-cart") || []); // Update the total
}

function moveToCart(item) {
  let cart = getLocalStorage("so-cart") || [];
  cart.push(item);

  localStorage.setItem("so-cart", JSON.stringify(cart));
}

// Ideas for wish list obtained from Amazon: https://www.amazon.com/gp/cart/view.html/ref=chk_cart_link_return_to_cart
function addWishListHeader() {
  // Get Save For Later Cart item from local storage
  let cart = getLocalStorage("save-for-later-cart") || [];
  const wishListHeader = document.getElementById("wish-list-header");
  wishListHeader.innerHTML = "";
  // Reference on how to create DOM element: https://developer.mozilla.org/en-US/docs/Web/API/Node/insertBefore
  let h2 = document.createElement("h2");

  if (cart.length > 1) {
    h2.textContent = `Saved for later (${cart.length} items)`;
    wishListHeader.appendChild(h2);
  } else if (cart.length == 1) {
    h2.textContent = `Saved for later (${cart.length} item)`;
    wishListHeader.appendChild(h2);
  }
}

shoppingCart();
displayTotalCartItems();
sumTotalItems(getLocalStorage("so-cart") || []);
