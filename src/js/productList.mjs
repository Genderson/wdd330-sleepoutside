import { getData } from "./productData.mjs";
import { renderListWithTemplate, calculateDiscount } from "./utils.mjs";

export async function productList(catagory, selector) {
    // get the element we will insert the list into from the selector

    // get the list of products 
    const productList = await getData(catagory);

    const filteredList = productList.slice(0,4);
    // render out the product list to the element
    renderListWithTemplate(productCardTemplate, selector, filteredList);
}

export function productCardTemplate(product) {
  const productDiscountPercentage = calculateDiscount(product.FinalPrice, product.ListPrice);

  return `<li class="product-card">
  <a href="product_pages/index.html?product=${product.Id}">
  <img
    src="${product.Image}"
    alt="Image of ${product.Name}"
  />
  <h3 class="card__brand">${product.Brand.Name}</h3>
  <h2 class="card__name">${product.NameWithoutBrand}</h2>
  <p class="product-card__price">Final Price: $${product.FinalPrice}</p>
  <span class="discount">SAVE ${productDiscountPercentage}</span>
  <p class="list-price">Original Price: $${product.ListPrice}</p></a>
  </li>`;
}