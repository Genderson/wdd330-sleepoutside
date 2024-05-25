import { productCardTemplate } from "./productList.mjs";
import { loadHeaderFooter, getParam, renderListWithTemplate } from "./utils.mjs";
import { displayTotalCartItems } from "./totalCartItems.mjs";
import { getData } from "./productData.mjs"

const element = document.querySelector(".product-list");
const search = getParam("search");

//console.log(search); -- for testing

//productList("tents",element) -- for testing

//main function calls
displaySearchResults("tents",element,search)
loadHeaderFooter();
displayTotalCartItems();

async function displaySearchResults(catagory, selector, searchTerms) {
    // get the element we will insert the list into from the selector
    // get the list of products
    const productList = await getData(catagory);
    // Search List
    const results = searchArray(productList,searchTerms)
    // render out the product list to the element
    if (results.length === 0) { // If search returns no values then render alert
        const li = document.createElement("li")
        li.innerHTML = "<p>No results found</p>";
        selector.append(li);
    } else {
        renderListWithTemplate(productCardTemplate, selector, results);
    }
}

function searchArray(array,terms) {
    // array for seach results
    const searchedArray = [];
    for (let index = 0; index < array.length; index++) { // iterate through array
        const element = array[index];
        const isName = element.Name.toLowerCase().includes(terms); // Checks if terms exist in Name
        const isID = element.Id.toLowerCase().includes(terms); // Checks if terms exist in ID
        const isDesc = element.DescriptionHtmlSimple.toLowerCase().includes(terms); // Checks if terms exist in Desc
        if (isName || isID || isDesc) { //If any term is present, add to results array
            searchedArray.push(element);
        }
    }
    return searchedArray;
}