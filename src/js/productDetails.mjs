import { findProductById } from "./productData.mjs";
import { setLocalStorage, getLocalStorage, calculateDiscount } from "./utils.mjs";
import { displayTotalCartItems } from "./totalCartItems";

let product = {};

export default async function productDetails(productId, productQuantity = 1) {
  // get the details for the current product. findProductById will return a promise! use await or .then() to process it
  product = await findProductById(productId);
  product.Quantity = productQuantity;
  console.log(product);
  // once we have the product details we can render out the HTML
  renderProductDetails(productId, productQuantity);
  // once the HTML is rendered we can add a listener to Add to Cart button
  document.getElementById("addToCart").addEventListener("click", addToCart);
}
function addToCart() {
  let cartItems = getLocalStorage("so-cart") || [];
  console.log(cartItems);

  if(!Array.isArray(cartItems)){
    const item = cartItems;
    cartItems = [];
    cartItems.push(item);
  }
  cartItems.push(product);

  setLocalStorage("so-cart", cartItems);
  displayTotalCartItems();
}

function renderProductDetails(productId, productQuantity = 1) {
  if (product) {    
    const productDiscountPercentage = calculateDiscount(product.FinalPrice, product.ListPrice);

    document.querySelector("#productName").innerText = product.Brand.Name;
    document.querySelector("#productNameWithoutBrand").innerText = product.NameWithoutBrand;
    document.querySelector("#productImage").src = product.Image;
    document.querySelector("#productImage").alt = product.Name;

    document.querySelector("#productQuantity").value = productQuantity;
    document.querySelector("#productFinalPrice").innerText = `$${product.FinalPrice * productQuantity}`;
    document.querySelector("#discountPercentage").innerText = `SAVE ${productDiscountPercentage}`;
    document.querySelector("#originalPrice").innerText = `$${product.ListPrice * productQuantity}`;

    document.querySelector("#productColorName").innerText = product.Colors[0].ColorName;
    document.querySelector("#productDescriptionHtmlSimple").innerHTML = product.DescriptionHtmlSimple;
    document.querySelector("#addToCart").dataset.id = product.Id;

    const cartTotal = document.querySelector("#addToCart");
    cartTotal.classList.remove("hide");
  } else {
    const cartTotal = document.querySelector("#addToCart");
    cartTotal.classList.add("hide");

    const message = document.querySelector("#error-message");
    message.textContent = `Product ${productId} does not exist`;
    message.classList.remove("hide");
  }
}

export function renderProductQuantityUpdate(productId, productQuantity) {
  document.querySelector("#productFinalPrice").innerText = `$${productId.FinalPrice * productQuantity}`;
  document.querySelector("#originalPrice").innerText = `$${productId.ListPrice * productQuantity}`;
}