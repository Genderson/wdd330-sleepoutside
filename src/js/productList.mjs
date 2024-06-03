import { getData } from "./productData.mjs";
import { renderListWithTemplate, calculateDiscount, getParam } from "./utils.mjs";

export async function productList(selector, sortOption, displayLimit) {
    // get the element we will insert the list into from the selector
  const search = getParam("search");
  const category = getParam("category");
    // get the list of products 
  
  if (search){
    const fullList = await getAllItems();
    const searchedArray = searchArray(fullList,search);
    const sortSearch = sortArray(searchedArray, sortOption);
    //console.table(searchedArray); testing
    renderListWithTemplate(productCardTemplate,selector,sortSearch);
  } else if (category){
    const productList = await getData(category);
    const sortProduct = sortArray(productList, sortOption);
    if (displayLimit) {
      const filteredList = sortProduct.slice(0,displayLimit);
    // render out the product list to the element
    renderListWithTemplate(productCardTemplate, selector, filteredList);
    } else {
      renderListWithTemplate(productCardTemplate, selector,sortProduct);
    }
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
  if (category) {
    categoryType.textContent = category.charAt(0).toUpperCase() + category.slice(1);
  }  
}

export async function getAllItems() {
  const tentList = await getData("tents");
  const packList = await getData("backpacks");
  const bagList = await getData("sleeping-bags");
  const mocklist = await getData("hammocks");
  const fullList = tentList.concat(packList,bagList,mocklist);
  //console.table(fullList); testing
  return fullList;
}

export function searchArray(array, terms) {
  // array for seach results
  const searchedArray = [];
  for (let index = 0; index < array.length; index++) {
    // iterate through array
    const elementFiltered = array[index];
    const isName = elementFiltered.Name.toLowerCase().includes(terms); // Checks if terms exist in Name
    const isID = elementFiltered.Id.toLowerCase().includes(terms); // Checks if terms exist in ID
    const isDesc =
      elementFiltered.DescriptionHtmlSimple.toLowerCase().includes(terms); // Checks if terms exist in Desc
    const isColor = elementFiltered.Colors[0].ColorName.toLowerCase().includes(terms);
    if (isName || isID || isDesc || isColor) {
      //If any term is present, add to results array
      searchedArray.push(elementFiltered);
    }
  }
  return searchedArray;
}

export function sortArray(array, sortOption) {
  let sortedArray;
  
  if (sortOption === "nameasc"){ // Sort by Name Ascending
    sortedArray = array.slice().sort(function(a,b) {
      const nameA = a.Name.toLowerCase();
      const nameB = b.Name.toLowerCase();
      if (nameA > nameB) {
        return -1;
      } else if (nameA < nameB) {
        return 1;
      } else {
        return 0;
      }
    });
  } else if (sortOption === "namedesc") { // Sort by Name Descending
    sortedArray = array.slice().sort(function(a,b) {
      const nameA = a.Name.toLowerCase();
      const nameB = b.Name.toLowerCase();
      if (nameA > nameB) {
        return -1;
      } else if (nameA < nameB) {
        return 1;
      } else {
        return 0;
      }
    });
    sortedArray.reverse();
  } else if (sortOption === "priceasc") { // Sort by Price Ascending
    sortedArray = array.slice().sort((a,b) => a.FinalPrice - b.FinalPrice)
  } else if (sortOption === "pricedesc") { // Sory by Price Descending
    sortedArray = array.slice().sort((a,b) => a.FinalPrice - b.FinalPrice)
    sortedArray.reverse();
  }
  return sortedArray;
}