import { productRecommendedList } from "./productList.mjs";

const element = document.querySelector(".product-list-filter");

if (element) {
    productRecommendedList(element, 3);
}
