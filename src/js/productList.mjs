import { getData } from "./productData.mjs";
import { renderListWithTemplate } from "./utils.mjs";

export async function productList(catagory, selector) {
    // get the element we will insert the list into from the selector

    // get the list of products 
    const productList = await getData(catagory);
    //return productList; -- testing
    const filteredList = productList.slice(0,4);
    // render out the product list to the element
    // renderList(productList);
    const element = document.querySelector(".product-list");
    renderListWithTemplate(productCardTemplate,element, filteredList);
}

export function productCardTemplate(product) {
    let productDiscountPercentage = `${(
        100 *
        (1 - product.FinalPrice / product.ListPrice)
      ).toFixed(0)}%`;
    return `<li class="product-card">
    <a href="product_pages/index.html?product=${product.Id}">
    <img
      src="${product.Image}"
      alt="Image of ${product.Name}"
    />
    <h3 class="card__brand">${product.Brand.Name}</h3>
    <h2 class="card__name">${product.NameWithoutBrand}</h2>
    <span class="product-card__price">$${product.FinalPrice}</span>
    <span class="discount">SAVE ${productDiscountPercentage}</span>
    <span class="list-price">$${product.ListPrice}</span></a>
    </li>`;
}

export function renderList(productList) {
    //console.table(productList) -- testing
    const htmlItems = productList.map(product => productCardTemplate(product))
    document.querySelector(".product-list").innerHTML = htmlItems.join("");
}