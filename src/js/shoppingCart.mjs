
import { getLocalStorage, renderListWithTemplate } from "./utils.mjs";

export function shoppingCart() {   
    const cartItems = getLocalStorage("so-cart");
    const outputEl = document.querySelector(".product-list-cart");
    renderListWithTemplate(cartItemTemplate, outputEl, cartItems);
}

export function cartItemTemplate(item) {
  var imageSizeUrl = "";
  // Reference for window.screen.width: https://developer.mozilla.org/en-US/docs/Web/API/Screen/width
  if (window.screen.width >= 300 && item.Images) {
    imageSizeUrl = item.Images.PrimaryLarge;
  }
  else if (window.screen.width < 300 && item.Images){ //RA-Added additional logic to determine if the "Images" property existed
    imageSizeUrl = item.Images.PrimaryMedium;
  } else {
    imageSizeUrl = item.Image; //RA-Tents does not contain the "Images" property rather it has "Image"
  }

  //Reference for window.addEventListener and resize: https://developer.mozilla.org/en-US/docs/Web/API/Window/resize_event
  window.addEventListener("resize", () => {
    if (window.screen.width >= 300 && item.Images) {
      imageSizeUrl = item.Images.PrimaryLarge;
    }
    else if (window.screen.width < 300 && item.Images){ //RA-Added additional logic to determine if the "Images" property existed
      imageSizeUrl = item.Images.PrimaryMedium;
    } else {
      imageSizeUrl = item.Image; //RA-Tents does not contain the "Images" property rather it has "Image"
    }});

  const cartItem = `<li class="cart-item" data-id=${item.Id}>
  <button class="remove-item"><span id=${item.Id}>❎</span></button>
  <a href="/product_pages/index.html?product=${item.Id}" class="cart-card__image">
    <img
      src="${imageSizeUrl}"
      alt="${item.Name}"
    />
  </a>
  <a href="/product_pages/index.html?product=${item.Id}">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p>
    <span class="cart-card__quantity">${item.Quantity} x </span>
    <span class="cart-card__price">$${item.FinalPrice}</span>
    <span>= $${(item.Quantity * item.FinalPrice).toFixed(2)}</span>
  </p>
  </li>`;

  return cartItem;
}

export function sumTotalItems(cartItems) {
    const cartTotal = document.querySelector("#cart-total"); // moved to work for whole function
    if (cartItems.length) {
      const total = cartItems.reduce(
        (sum, item) => sum + (item.FinalPrice * item.Quantity || 0),
        0
      );
  
      // Reference to format to 2 decimal places using toFixed(2):
      // https://stackoverflow.com/questions/6134039/format-number-to-always-show-2-decimal-places
      cartTotal.textContent = `Total: $${total.toFixed(2)}`;
  
      cartTotal.classList.remove("hide");
    } else {
      // added else clause to hide when nothing was in cart
      cartTotal.textContent = "";
      cartTotal.classList.add("hide");
    }
}