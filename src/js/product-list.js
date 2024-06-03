import { productList, getCategoryType } from "./productList.mjs";
import { setClick } from "./utils.mjs";

const element = document.querySelector(".product-list");
const sortOptions = document.getElementById("sortOptions");

// initial display
if (element) {
  productList(element, "nameasc");
  getCategoryType();
}

sortOptions.addEventListener("change", function(){
  const sortOrder = this.value;
  productList(element, sortOrder);
});