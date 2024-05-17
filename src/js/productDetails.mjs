import { findProductById } from "./productData.mjs";
import { setLocalStorage, getLocalStorage } from "./utils.mjs";
import { displayTotalCartItems } from "./totalCartItems";

let product = {};

export default async function productDetails(productId) {
  // get the details for the current product. findProductById will return a promise! use await or .then() to process it
  product = await findProductById(productId);
  // once we have the product details we can render out the HTML
  renderProductDetails(productId);
  // once the HTML is rendered we can add a listener to Add to Cart button
  document.getElementById("addToCart").addEventListener("click", addToCart);
}
function addToCart() {
  let cartItems = getLocalStorage("so-cart") || [];

  if(!Array.isArray(cartItems)){
    const item = cartItems;
    cartItems = [];
    cartItems.push(item);
  }
  cartItems.push(product);

  setLocalStorage("so-cart", cartItems);
  displayTotalCartItems();
}

function renderProductDetails(productId) {
  if (product) {
    // DEMO: Add a 10% discount to the product price
    const discount = 10; // 10% discount for example
    const discountedPrice = addDiscount(product, discount);

    document.querySelector("#productName").innerText = product.Brand.Name;
    document.querySelector("#productNameWithoutBrand").innerText = product.NameWithoutBrand;
    document.querySelector("#productImage").src = product.Image;
    document.querySelector("#productImage").alt = product.Name;
    document.querySelector("#originalPrice").innerText = `$${product.SuggestedRetailPrice.toFixed(2)}`;
    //added to display the discount percentage
    document.querySelector("#discountPercentage").innerText = `${discount}% off`;
    //added to display the final price after discount
    document.querySelector("#productFinalPrice").innerText = `$${discountedPrice.toFixed(2)}`;
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

// Function: add discount to the product price and return the final price of the product after discount is applied 
function addDiscount(product, discount) {
  // Ensure discount is a valid percentage
  if (discount < 0 || discount > 100) {
    throw new Error("Discount must be a percentage between 0 and 100");
  }

  const discountAmount = product.SuggestedRetailPrice * (discount / 100);
  const finalPriceAfterDiscount = product.SuggestedRetailPrice - discountAmount;
  return finalPriceAfterDiscount;
}