import { getParam } from "./utils.mjs";
import productDetails from "./productDetails.mjs";

const productId = getParam("product");

productDetails(productId);

document.addEventListener("DOMContentLoaded", () => { // Script is running before the other scripts finish
    const colorSwatches = document.querySelectorAll(".color-swatch");
    const selectedColorDisplay = document.getElementById("productColorName");
    const selectedColorInput = document.getElementById("selectedColor");
  
    colorSwatches.forEach(swatch => {
        swatch.addEventListener("click", () => {
            // Remove Selected class from all
            colorSwatches.forEach(s => s.classList.remove("selected"));
  
            // Add the selected class to clicked swatch
            swatch.classList.add("selected");
  
            //get the color for attributes
            const color = swatch.getAttribute("alt");
            const id = swatch.getAttribute("id");
  
            // Update the selected color display
            selectedColorDisplay.textContent = `Color: ${color}`;
  
            //update the hidden input value
            selectedColorInput.value = id
        })
    })
  })
  
  document.addEventListener("DOMContentLoaded", () => { // Script is running before the other scripts finish
    const colorSwatches = document.querySelectorAll(".color-swatch");
    const selectedColorDisplay = document.getElementById("productColorName");
    const selectedColorInput = document.getElementById("selectedColor");
  
    colorSwatches.forEach(swatch => {
        swatch.addEventListener("click", () => {
            // Remove Selected class from all
            colorSwatches.forEach(s => s.classList.remove("selected"));
  
            // Add the selected class to clicked swatch
            swatch.classList.add("selected");
  
            //get the color for attributes
            const color = swatch.getAttribute("alt");
            const id = swatch.getAttribute("id");
  
            // Update the selected color display
            selectedColorDisplay.textContent = `Color: ${color}`;
  
            //update the hidden input value
            selectedColorInput.value = id
        })
    })
  })