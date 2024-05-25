import { findProductById } from "./productData.mjs";
import { setLocalStorage, getLocalStorage, calculateDiscount } from "./utils.mjs";
import { displayTotalCartItems } from "./totalCartItems";

let product = {};

export default async function productDetails(productId, productQuantity = 1) {
  // get the details for the current product. findProductById will return a promise! use await or .then() to process it
  product = await findProductById(productId);
  // Reference on how to add new key value pair to JSON:
  // https://stackoverflow.com/questions/41712178/how-to-add-a-new-key-value-pair-in-existing-json-object-using-javascript 
  // Reference on how to convert strings to numbers using Number():
  // https://www.w3schools.com/js/js_type_conversion.asp
  product.Quantity = Number(productQuantity);
  // once we have the product details we can render out the HTML
  renderProductDetails(productId, productQuantity);

  // once the HTML is rendered we can add a listener to Add to Cart button
  // Reference for setTimeout(): https://www.w3schools.com/jsref/met_win_settimeout.asp
  // If the cursor is still in the input box with the initial value of 1 when the button is clicked, 
  // the quantity is not updated correctly without using setTimeout().
  document.getElementById("addToCart").addEventListener("click", () => setTimeout(addToCart, 100));
  //document.getElementById("addToCart").addEventListener("click", addToCart);
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
    console.log(currentProduct);
    
    let productQuantitySelector = document.querySelector("#productQuantity");
    currentProduct.Quantity = Number(productQuantitySelector.value);
    // currentProduct.Quantity += 1;
  }
  else{
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
  if (productQuantity == 1) {
    if (product) {
      const productDiscountPercentage = calculateDiscount(product.FinalPrice, product.ListPrice);

      document.querySelector("#productName").innerText = product.Brand.Name;
      document.querySelector("#productNameWithoutBrand").innerText = product.NameWithoutBrand;
      document.querySelector("#productImage").src = product.Image;
      document.querySelector("#productImage").alt = product.Name;

      document.querySelector("#productQuantity").value = productQuantity;
      document.querySelector("#productFinalPrice").innerText = `$${product.FinalPrice}`;
      document.querySelector("#discountPercentage").innerText = `SAVE ${productDiscountPercentage}`;
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
  else {
    // Reference to format to 2 decimal places using toFixed(2):
    // https://stackoverflow.com/questions/6134039/format-number-to-always-show-2-decimal-places
    document.querySelector("#total").innerHTML = `<b>Total:</b> $${product.FinalPrice} X ${productQuantity} = $${(product.FinalPrice * productQuantity).toFixed(2)}<br><br>`; 
  }
}