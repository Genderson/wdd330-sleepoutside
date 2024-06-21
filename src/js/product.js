import { getParam , setClick } from "./utils.mjs";
import { productDetails } from "./productDetails.mjs"
import { displayColor } from "./color.mjs";

const productId = getParam("product");

productDetails(productId,displayColor);



