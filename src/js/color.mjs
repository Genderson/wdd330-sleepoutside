export async function displayColor () {
    const colorSwatches = await getSwatches();
    //waitForArray(colorSwatches);
    const selectedColorDisplay = document.getElementById("productColorName");
    const selectedColorInput = document.getElementById("selectedColor");
    const imageCarousel = document.getElementById("carousel");

    colorSwatches.forEach(swatch => {
        swatch.addEventListener("click", () => {
            // Remove Selected class from all
            colorSwatches.forEach(s => s.classList.remove("selected"));

            // Add the selected class to clicked swatch
            swatch.classList.add("selected");

            //get the color for attributes
            const color = swatch.getAttribute("alt");
            const id = swatch.getAttribute("id")
            const imageSrc = swatch.dataset.image;
            // console.log(imageSrc); for testing

            // create new image div
            const div = document.createElement("div");
            const image = document.createElement("img");
            image.src = imageSrc;
            image.alt = color;
            div.classList.add("carousel-slide");
            div.appendChild(image);

            // Update the selected color display
            selectedColorDisplay.textContent = ` ${color}`;

            //update the hidden input value
            selectedColorInput.value = `${id}`;

            // Remove and add image to carousel
            if (imageCarousel.firstChild) {
                imageCarousel.removeChild(imageCarousel.firstChild);
            }
            imageCarousel.prepend(div);

        })
    })
};

export async function getSwatches() {
    await Promise.all;
    const colorSwatches = document.querySelectorAll(".color-swatch");
    return colorSwatches;
}

export function updateProductColor(product,color) {
    
}