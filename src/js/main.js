import { productList } from "./productList.mjs";
import { loadHeaderFooter } from "./utils.mjs";
import { displayTotalCartItems } from "./totalCartItems.mjs";

//loadHeaderFooter();
/* 
try {
    await loadHeaderFooter();
    displayTotalCartItems();
  } catch (error) {
    console.error(error);
  }*/

(async () => {
  try {
    await loadHeaderFooter();
    displayTotalCartItems();
  } catch (error) {
    //console.error(error);
  }
})();

const element = document.querySelector(".product-list");

if (element) {
  productList("tents", element, 4);
}
