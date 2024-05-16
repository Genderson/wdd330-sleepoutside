import { getLocalStorage } from "./utils.mjs";
import { displayTotalCartItems } from "./totalCartItems";

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart") || [];
  const productList = document.querySelector(".product-list");
  //const htmlItems = cartItems.map((item) => cartItemTemplate(item));

  productList.innerHTML = ""; // Clear existing content

  // Process Each item from localStorage, calling the template funtion
  // and appending to the main document
  cartItems.forEach(item => {
    const cartItem = cartItemTemplate(item);
    productList.appendChild(cartItem);

  })
  //document.querySelector(".product-list").appendChild(htmlItems);

  sumTotalItems(cartItems); // Update Item count
  displayTotalCartItems(); // Update cart total
}

function sumTotalItems(cartItems) {
  const cartTotal = document.querySelector("#cart-total"); // moved to work for whole function
  if (cartItems.length) {
    const total = cartItems.reduce(
      (sum, item) => sum + (item.FinalPrice || 0),
      0
    );

    
    cartTotal.textContent = `Total: $${total}`;

    cartTotal.classList.remove("hide");
  } else { // added else clause to hide when nothing was in cart
    cartTotal.textContent = '';
    cartTotal.classList.add("hide");
  }
}

function cartItemTemplate(item) {
  // update to work in ul element and remove button addition
  // Create li element and define class, attributes, and html
  const cartItem = document.createElement("li");
  cartItem.classList.add("cart-item");
  cartItem.dataset.id = item.Id;
  cartItem.innerHTML = `
  <button class="remove-item"><span id=${item.Id}>❎</span></button>
  <a href="/product_pages/index.html?product=${item.Id}" class="cart-card__image">
    <img
      src="${item.Image}"
      alt="${item.Name}"
    />
  </a>
  <a href="/product_pages/index.html?product=${item.Id}">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
  `;

  return cartItem;
}

document.addEventListener("DOMContentLoaded", ()=> {
  // Add event listening to dom
  const productList = document.querySelector(".product-list");
  // When button is clicked, looks for the closest button to click
  // then loks for the closest item to the button
  productList.addEventListener("click", (event) => {
      if (event.target.closest(".remove-item")) {
        const cartItem = event.target.closest(".cart-item");
        const itemId = cartItem.dataset.id; // Use 'id' in lowercase
  
        removeFromCart(itemId); // Function to remove item from local storage
        cartItem.remove(); // Remove the item from the DOM directly
        sumTotalItems(getLocalStorage("so-cart") || []); // Update the total
      }
    });
  

  function removeFromCart(itemId) {
    // Get Cart items from local storage
    let cart = getLocalStorage("so-cart") || [];
    
    //Find the item in the index
    const itemIndex = cart.findIndex(item => item.Id === itemId);

    // Remove from array
    if (itemIndex !== -1) {
      cart.splice(itemIndex, 1);
      // update localStorage
      localStorage.setItem("so-cart", JSON.stringify(cart));
    }
    displayTotalCartItems();
    sumTotalItems(getLocalStorage("so-cart") || []); // Update the total
  }
  renderCartContents();
});



renderCartContents();
