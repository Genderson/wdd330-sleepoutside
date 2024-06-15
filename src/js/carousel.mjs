export function loadImages(images) {
    const carousel = document.getElementById('carousel');

    images.forEach((image) => {
        const slide = document.createElement('div');
        slide.classList.add('carousel-slide');
        
        const img = document.createElement('img');
        img.src = image.Src;
        img.alt = image.Title;
        
        slide.appendChild(img);
        carousel.appendChild(slide);
    });
}

