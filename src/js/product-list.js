import { productList, getCategoryType } from "./productList.mjs";

const element = document.querySelector(".product-list");

if (element) {
  productList(element);
  getCategoryType();
}
