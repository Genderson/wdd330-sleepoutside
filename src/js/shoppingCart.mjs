
import { getLocalStorage, renderListWithTemplate } from "./utils.mjs";

export function shoppingCart() {   
    const cartItems = getLocalStorage("so-cart");
    const outputEl = document.querySelector(".product-list-cart");
    renderListWithTemplate(cartItemTemplate, outputEl, cartItems);
}

export function cartItemTemplate(item) {
  var imageSizeUrl = "";
  // Reference for window.screen.width: https://developer.mozilla.org/en-US/docs/Web/API/Screen/width
  if (window.screen.width >= 300) {
    imageSizeUrl = item.Images.PrimaryLarge;
  }
  else {
    imageSizeUrl = item.Images.PrimaryMedium;
  }

  //Reference for window.addEventListener and resize: https://developer.mozilla.org/en-US/docs/Web/API/Window/resize_event
  window.addEventListener("resize", () => {
    if (window.screen.width >= 300) {
      imageSizeUrl = item.Images.PrimaryLarge;
    }
    else {
      imageSizeUrl = item.Images.PrimaryMedium;
    }   
  });
  //console.log(item); for testing
  //console.log(item.SelectedColor[0].ColorName) for testing
  const cartItem = `<li class="cart-item" data-id=${item.Id}>
  <button class="remove-item"><span id=${item.Id}>❎</span></button>
  <button class="save-item"><span id=${item.Id}-save-move>Save for later</span></button>
  <a href="/product_pages/index.html?product=${item.Id}" class="cart-card__image">
    <img id=${item.Id}-image
      src="${imageSizeUrl}"
      alt="${item.Name}"
    />
  </a>
  <a href="/product_pages/index.html?product=${item.Id}">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <div>
    <p class="cart-card__color">${item.SelectedColor[0].ColorName}</p>
    <img src=${item.SelectedColor[0].ColorChipImageSrc} alt=${item.SelectedColor[0].ColorName}>
  </div>
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