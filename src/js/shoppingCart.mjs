
import { getLocalStorage, renderListWithTemplate } from "./utils.mjs";

export function shoppingCart() {   
    const cartItems = getLocalStorage("so-cart");
    const outputEl = document.querySelector(".product-list-cart");
    renderListWithTemplate(cartItemTemplate, outputEl, cartItems);
}

export function cartItemTemplate(item) {
    const cartItem = `<li class="cart-item" data-id=${item.Id}>
    <button class="remove-item"><span id=${item.Id}>❎</span></button>
    <a href="/product_pages/index.html?product=${item.Id}" class="cart-card__image">
      <img
        src="${item.Images.PrimaryLarge}"
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
  
      cartTotal.textContent = `Total: $${total}`;
  
      cartTotal.classList.remove("hide");
    } else {
      // added else clause to hide when nothing was in cart
      cartTotal.textContent = "";
      cartTotal.classList.add("hide");
    }
}