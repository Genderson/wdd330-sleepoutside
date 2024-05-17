import { findProductById } from "./productData.mjs";
import { productList } from "./productList.mjs";

// Reference to get href:
// https://stackoverflow.com/questions/15439853/get-local-href-value-from-anchor-a-tag
// Reference to write for loop:
// https://www.w3schools.com/js/js_loop_for.asp
// Reference on how to use querySelector with nth-of-type:
// https://stackoverflow.com/questions/41848550/how-to-select-nth-element-of-the-same-type

productList("tents");

/*loadingPrices(); -- Dallin's code moved to productCardTemplate

async function loadingPrices() {
  for (let i = 1; i < 5; i++) {
    let productHref = document.querySelector(
      ".product-card:nth-of-type(" + i + ") a"
    ).href;
    let productId = getProductKey(productHref);

    let product = await findProductById(productId);

    let productCardPrice = document.querySelector(
      ".product-card:nth-of-type(" + i + ") p"
    );
    productCardPrice.innerText = "";
    // Reference on how to create a new span element:
    // https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement
    let finalPriceSpan = document.createElement("span");
    finalPriceSpan.innerText = `$${product.FinalPrice}`;
    productCardPrice.append(finalPriceSpan);

    let discountPercentageSpan = document.createElement("span");
    // Reference on how to change DOM style:
    // https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/style
    discountPercentageSpan.style.margin = "0 4px";
    discountPercentageSpan.style.padding = "0 1px";
    discountPercentageSpan.style.backgroundColor = "red";
    discountPercentageSpan.style.color = "#fff";
    discountPercentageSpan.style.borderRadius = "8px";
    // Example reference: https://oboloo.com/blog/what-is-list-price-definition/#:~:text=In%20short%2C%20list%20price%20is,list%20price%20would%20be%20%24125.
    // "If a company is selling a product for $100 with a 20% discount, the list price would be $125."
    // 100% * (1 - $100/$125) = 20%
    // Reference for Template Literals: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals
    // Reference for toFixed: https://stackoverflow.com/questions/661562/how-to-format-a-float-in-javascript
    let productDiscountPercentage = `${(
      100 *
      (1 - product.FinalPrice / product.ListPrice)
    ).toFixed(0)}%`;
    discountPercentageSpan.innerText = `SAVE ${productDiscountPercentage}`;
    productCardPrice.append(discountPercentageSpan);

    let listPriceSpan = document.createElement("span");
    // Reference for CSS line-through: https://www.w3schools.com/cssref/pr_text_text-decoration.php
    listPriceSpan.style.textDecoration = "line-through";
    listPriceSpan.innerText = `$${product.ListPrice}`;
    productCardPrice.append(listPriceSpan);
  }
}
// return a product key from the href
// References used to write function getProductKey:
// https://www.w3schools.com/jsref/jsref_slice_string.asp
// https://stackoverflow.com/questions/25639365/get-the-text-after-a-specific-word
function getProductKey(productHref) {
  let productKey = productHref.slice(
    productHref.indexOf("product=") + 8,
    productHref.length
  );
  return productKey;
}*/