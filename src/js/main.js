import { productList } from "./productList.mjs";
import { loadHeaderFooter } from "./utils.mjs";
import { displayTotalCartItems } from "./totalCartItems.mjs";

await loadHeaderFooter();

const element = document.querySelector(".product-list");

if (element) {
    productList("tents", element);
}

displayTotalCartItems();