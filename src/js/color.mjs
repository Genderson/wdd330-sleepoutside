document.addEventListener("DOMContentLoaded", () => { // Script is running before the other scripts finish
    const colorSwatches = getSwatches();
    const selectedColorDisplay = document.getElementById("productColorName");
    const selectedColorInput = document.getElementById("selectedColor");

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

export async function getColor() {
    await Promise.all
    const color = swatch.getAttribute("alt");
    return color
}

export async function getId() {
    await Promise.all
    const id = swatch.getAttribute("id")
    return id
}

export async function getSwatches() {
    await Promise.all;
    const colorSwatches = document.querySelectorAll(".color-swatch");
    return colorSwatches;
}