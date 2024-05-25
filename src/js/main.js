import { productList } from "./productList.mjs";
import { loadHeaderFooter } from "./utils.mjs";
import { removeDuplicateItems } from "./productDetails.mjs";

loadHeaderFooter();
removeDuplicateItems();

const element = document.querySelector(".product-list");

if (element) {
  productList("tents", element);
}
