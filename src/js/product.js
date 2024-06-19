import { getParam } from "./utils.mjs";
import { productDetails } from "./productDetails.mjs"
import { getColor,getId,getSwatches } from "./color.mjs";

const productId = getParam("product");

productDetails(productId);

const colorSwatches = getSwatches();
const selectedColorDisplay = document.getElementById("productColorName");
const selectedColorInput = document.getElementById("selectedColor");

document.addEventListener("DOMContentLoaded", () => { // Script is running before the other scripts finish
    colorSwatches.forEach(swatch => {
        swatch.addEventListener("click", () => {
            // Remove Selected class from all
            colorSwatches.forEach(s => s.classList.remove("selected"));
  
            // Add the selected class to clicked swatch
            swatch.classList.add("selected");
  
            //get the color for attributes
            const color = getColor();
            const id = getId();
  
            // Update the selected color display
            selectedColorDisplay.textContent = `Color: ${color}`;
  
            //update the hidden input value
            selectedColorInput.value = id
        })
    })
 })