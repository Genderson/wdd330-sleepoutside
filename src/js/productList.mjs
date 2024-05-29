import { getData } from "./productData.mjs";
import { renderListWithTemplate, calculateDiscount, getParam } from "./utils.mjs";

export async function productList(selector, displayLimit) {
    // get the element we will insert the list into from the selector

    const category = getParam("category");
    // get the list of products 
    const productList = await getData(category);

    if (displayLimit) {
      const filteredList = productList.slice(0,displayLimit);
    // render out the product list to the element
    renderListWithTemplate(productCardTemplate, selector, filteredList);
    } else {
      renderListWithTemplate(productCardTemplate, selector,productList)
    }
    
}

export function productCardTemplate(product) {
  const productDiscountPercentage = calculateDiscount(product.FinalPrice, product.ListPrice);

  return `<li class="product-card">
  <a href="/product_pages/index.html?product=${product.Id}">
  <img
    src="${product.Images.PrimaryMedium}"
    alt="Image of ${product.Name}"
  />
  <h3 class="card__brand">${product.Brand.Name}</h3>
  <h2 class="card__name">${product.NameWithoutBrand}</h2>
  <p class="product-card__price">Final Price: $${product.FinalPrice}</p>
  <span class="discount">SAVE ${productDiscountPercentage}</span>
  <p class="list-price">Original Price: $${product.ListPrice}</p></a>
  </li>`;
}

export function getCategoryType(){
  const category = getParam('category');
  const categoryType = document.querySelector("#category-type");
  categoryType.textContent = category.charAt(0).toUpperCase() + category.slice(1);
}