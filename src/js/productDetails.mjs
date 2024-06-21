import { findProductById } from "./externalServices.mjs";
import { setLocalStorage, getLocalStorage, calculateDiscount } from "./utils.mjs";
import { displayTotalCartItems } from "./totalCartItems";
import { loadImages } from "./carousel.mjs";

let product = {};

export async function productDetails(productId, callback) {
  // get the details for the current product. findProductById will return a promise! use await or .then() to process it
  product = await findProductById(productId);
  renderProductDetails(productId);
  // If call back function exist, execute fuction --RA 19June24
  if (callback) {
    callback();
  }
  document.getElementById("addToCart").addEventListener("click", addToCart);
}

export async function loadViewProductDetails(productId) {
  product = await findProductById(productId);
  viewProductDetails(product);
}

function addToCart() {
  const selectedColor = document.getElementById("selectedColor").value; // Get the value of selected color
  console.log(selectedColor);
  let cartItems = getLocalStorage("so-cart") || [];
  //console.log(cartItems);

  // If not an array, make it into an array and add the item into the array
  if(!Array.isArray(cartItems)){
    const item = cartItems;
    cartItems = [];
    cartItems.push(item);
  }
  product.UniqueKey = `${product.Id}-${selectedColor}`;
  // Check if the item is already in the cart (Maybe add a color comparison here)
  const productIndex = cartItems.findIndex(p => p.UniqueKey == product.UniqueKey);

  // If the item does exist in the cart update the cart total
  if(productIndex !== -1){
    let currentProduct = cartItems[productIndex];
    // console.log(currentProduct);

    // Reference on how to convert strings to numbers using Number():
    // https://www.w3schools.com/js/js_type_conversion.asp
    let productQuantityInputValue = Number(document.querySelector("#productQuantity").value);
    currentProduct.Quantity += productQuantityInputValue;
    //currentProduct.Quantity += 1;
  }
  else{ // else add the item and update quantity
    let productQuantity = document.querySelector("#productQuantity").value;
    // Reference on how to add a new key value pair to JSON object:
    // https://stackoverflow.com/questions/41712178/how-to-add-a-new-key-value-pair-in-existing-json-object-using-javascript
    product.Quantity = Number(productQuantity);
    // Add selected color to the product
    let colors = product.Colors;
    //console.log(colors);
    let filterColor = colors.filter(c => c.ColorCode === selectedColor);
    //console.log(filterColor);
    product.SelectedColor = filterColor;
    //console.log(product.SelectedColor);
    // Create unique key for comaprison
    
    cartItems.push(product);
  }
  // Push to local storage and display the cart totals
  setLocalStorage("so-cart", cartItems);
  displayTotalCartItems();
}

export async function removeDuplicateItems(){ //Updated RA 20June24

  let newProductItems = [];
  let cartItems = getLocalStorage("so-cart") || [];
  
  // Check if cartItems is an array and make it one if not
  if(!Array.isArray(cartItems)){
    const item = cartItems;
    cartItems = [];
    cartItems.push(item);
  }

  //let ids = cartItems.map(product => product.Id);
  //let distinctIds = [...new Set(ids)];
  // Create array for unique items
  let uniqueItems = [];
  let seenItems = new Set();

  /*if(ids.length > distinctIds.length) {
    console.log(newProductItems);
    cartItems = [];
    setLocalStorage("so-cart", cartItems);
  }*/

    //Iterate over the cart items pulling unique values and adding them to uniqueItems
  for (let item of cartItems) {
    let uniqueKey = item.UniqueKey;
    if (!seenItems.has(uniqueKey)) {
      seenItems.add(uniqueKey);
      uniqueItems.push(item);
    }
  }
  // if duplicates were found, update local storage
  if (uniqueItems.length < cartItems.length){
    setLocalStorage("so-cart", uniqueItems);
  }
}

export function clearViewProductDetails() {
  document.querySelector("#productCategory").innerText = "";   
  document.querySelector("#productName").innerText = "";
  document.querySelector("#productNameWithoutBrand").innerText = "";
  document.querySelector("#productImage").src = "";
  document.querySelector("#productImage").alt = "";
  document.querySelector("#productFinalPrice").innerText = "";
  document.querySelector("#discountPercentage").innerText = "";
  document.querySelector("#discountPrice").innerText = "";
  document.querySelector("#originalPrice").innerText = "";

  document.querySelector("#productColorName").innerText = "";
  document.querySelector("#productDescriptionHtmlSimple").innerHTML = "";
}

function renderProductDetails(productId, productQuantity = 1) {
  if (product) {
        document.querySelector("#productCategory").innerText = `${product.Category.charAt(0).toUpperCase()}${product.Category.slice(1)}`;   
        document.querySelector("#productName").innerText = product.Brand.Name;
        document.querySelector("#productNameWithoutBrand").innerText = product.NameWithoutBrand;
      if(product.Images.ExtraImages == null) {

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
    }
    else{
      let imageArr = [];
      imageArr.push({"Title": "PrimaryExtraLarge", "Src": product.Images.PrimaryExtraLarge});
      
      product.Images.ExtraImages.forEach((image) => {
        imageArr.push(image);
      });

      loadImages(imageArr);
    }

    const productDiscountPercentage = calculateDiscount(product.FinalPrice, product.ListPrice);
    document.querySelector("#productQuantity").value = productQuantity;
    document.querySelector("#productFinalPrice").innerText = `$${product.FinalPrice}`;
    document.querySelector("#discountPercentage").innerText = `SAVE ${productDiscountPercentage}`;
    document.querySelector("#discountPrice").innerText = `$${product.ListPrice - product.FinalPrice}`;
    document.querySelector("#originalPrice").innerText = `$${product.ListPrice}`;
    
    // Product Color
    document.querySelector("#productColorName").innerText = product.Colors[0].ColorName;
    const colorArray = product.Colors;
    //console.table(colorArray); for testing
    renderColorDetails(colorArray);
    
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

function viewProductDetails(product) {
    const productDiscountPercentage = calculateDiscount(product.FinalPrice, product.ListPrice);
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

    document.querySelector("#productFinalPrice").innerText = `$${product.FinalPrice}`;
    document.querySelector("#discountPercentage").innerText = `SAVE ${productDiscountPercentage}`;
    document.querySelector("#discountPrice").innerText = `$${product.ListPrice - product.FinalPrice}`;
    document.querySelector("#originalPrice").innerText = `$${product.ListPrice}`;

    document.querySelector("#productColorName").innerText = product.Colors[0].ColorName;
    document.querySelector("#productDescriptionHtmlSimple").innerHTML = product.DescriptionHtmlSimple;
}

function renderColorDetails(colorArray) {
  let colorImgSpan = document.querySelector("#colorImg");
  let selectedColorInput = document.getElementById("selectedColor");
  for (let index = 0; index < colorArray.length; index++) {
    const colorImg = document.createElement("img");
    colorImg.src = product.Colors[index].ColorChipImageSrc;
    colorImg.alt = product.Colors[index].ColorName;
    colorImg.id = product.Colors[index].ColorCode;
    colorImg.dataset.image = product.Colors[index].ColorPreviewImageSrc;
    colorImg.classList.add("color-swatch")
    colorImgSpan.appendChild(colorImg);
    if (index == 0) {
      selectedColorInput.value = product.Colors[index].ColorCode;
    }
  }
}
