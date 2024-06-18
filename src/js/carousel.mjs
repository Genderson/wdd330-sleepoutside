document.addEventListener('DOMContentLoaded', function() {

    const prevImageBtn = document.querySelector("#prevImage");
    if(prevImageBtn){
      prevImageBtn.addEventListener('click', () => {
        moveSlide(-1);
      });
    }

    const nextImageBtn = document.querySelector("#nextImage");
    if(nextImageBtn){
      nextImageBtn.addEventListener('click', () => {
        moveSlide(1);
      });
    }
});


export function loadImages(images) {
    const carousel = document.getElementById('carousel');

    images.forEach((image) => {
        const slide = document.createElement('div');
        slide.classList.add('carousel-slide');
        
        const img = document.createElement('img');
        img.src = image.Src;
        img.alt = image.Title;// `Imagen ${images.indexOf(src) + 1}`;
        
        slide.appendChild(img);
        carousel.appendChild(slide);
    });
}

let currentIndex = 0;

function moveSlide(direction) {
  const slides = document.querySelectorAll(".carousel-slide");
  const totalSlides = slides.length;

  currentIndex += direction;

  if (currentIndex < 0) {
    currentIndex = totalSlides - 1;
  } else if (currentIndex >= totalSlides) {
    currentIndex = 0;
  }

  const offset = -currentIndex * 100;
  document.querySelector(
    ".carousel"
  ).style.transform = `translateX(${offset}%)`;
}