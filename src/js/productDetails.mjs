import { findProductById } from "./externalServices.mjs";
import { setLocalStorage, getLocalStorage, calculateDiscount } from "./utils.mjs";
import { displayTotalCartItems } from "./totalCartItems";

let product = {};

export default async function productDetails(productId) {
  // get the details for the current product. findProductById will return a promise! use await or .then() to process it
  product = await findProductById(productId);
  // console.log(product);

  renderProductDetails(productId);

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

  const productIndex = cartItems.findIndex(p => p.Id == product.Id);

  if(productIndex !== -1){
    let currentProduct = cartItems[productIndex];
    // console.log(currentProduct);

    // Reference on how to convert strings to numbers using Number():
    // https://www.w3schools.com/js/js_type_conversion.asp
    let productQuantityInputValue = Number(document.querySelector("#productQuantity").value);
    currentProduct.Quantity += productQuantityInputValue;
    //currentProduct.Quantity += 1;
  }
  else{
    let productQuantity = document.querySelector("#productQuantity").value;
    product.Quantity = Number(productQuantity);
    cartItems.push(product);
  }

  setLocalStorage("so-cart", cartItems);
  displayTotalCartItems();
}

export async function removeDuplicateItems(){

  let newProductItems = [];
  let cartItems = getLocalStorage("so-cart") || [];
  if(!Array.isArray(cartItems)){
    const item = cartItems;
    cartItems = [];
    cartItems.push(item);
  }

  let ids = cartItems.map(product => product.Id);
  let distinctIds = [...new Set(ids)];

  if(ids.length > distinctIds.length) {
    console.log(newProductItems);
    cartItems = [];
    setLocalStorage("so-cart", cartItems);
  }
}

function renderProductDetails(productId, productQuantity = 1) {
  if (product) {
    const productDiscountPercentage = calculateDiscount(product.FinalPrice, product.ListPrice);

    console.log(product);
    // Reference to capitalize first letter of a string:
    // https://stackoverflow.com/questions/1026069/how-do-i-make-the-first-letter-of-a-string-uppercase-in-javascript
    document.querySelector("#productCategory").innerText = `${product.Category.charAt(0).toUpperCase()}${product.Category.slice(1)}`;   
    document.querySelector("#productName").innerText = product.Brand.Name;
    document.querySelector("#productNameWithoutBrand").innerText = product.NameWithoutBrand;

    // Reference for window.screen.width: https://developer.mozilla.org/en-US/docs/Web/API/Screen/width
    if (window.screen.width >= 500) {
      document.querySelector("#productImage").src = product.Images.PrimaryExtraLarge;
    }
    else if (window.screen.width >= 250) {
      document.querySelector("#productImage").src = product.Images.PrimaryLarge;
    }
    else {
      document.querySelector("#productImage").src = product.Images.PrimaryMedium;
    }

    // Reference for window.addEventListener and resize: https://developer.mozilla.org/en-US/docs/Web/API/Window/resize_event
    window.addEventListener("resize", () => {
      if (window.screen.width >= 500) {
        document.querySelector("#productImage").src = product.Images.PrimaryExtraLarge;
      }
      else if (window.screen.width >= 250) {
        document.querySelector("#productImage").src = product.Images.PrimaryLarge;
      }
      else {
        document.querySelector("#productImage").src = product.Images.PrimaryMedium;
      }   
    });
    
    document.querySelector("#productImage").alt = product.Name;

    document.querySelector("#productQuantity").value = productQuantity;
    document.querySelector("#productFinalPrice").innerText = `$${product.FinalPrice}`;
    document.querySelector("#discountPercentage").innerText = `SAVE ${productDiscountPercentage}`;
    document.querySelector("#discountPrice").innerText = `$${product.ListPrice - product.FinalPrice}`;
    document.querySelector("#originalPrice").innerText = `$${product.ListPrice}`;

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
