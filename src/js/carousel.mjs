document.addEventListener('DOMContentLoaded', function() {

    const prevImageBtn = document.querySelector("#prevImage");
    prevImageBtn.addEventListener('click', () => {
        moveSlide(-1);
    });

    const nextImageBtn = document.querySelector("#nextImage");
    nextImageBtn.addEventListener('click', () => {
        moveSlide(1);
    });
 /*   const images = [
        'http://server-nodejs.cit.byui.edu:3000/images/sleepoutside/the-north-face-assault-tent-3-person-3-season-in-summit-gold-asphalt-grey~p~989ch_01~600.jpg',
        'http://server-nodejs.cit.byui.edu:3000/images/sleepoutside/the-north-face-assault-tent-3-person-3-season~a~989ch_2~600.1.jpg',
        'http://server-nodejs.cit.byui.edu:3000/images/sleepoutside/the-north-face-assault-tent-3-person-3-season~a~989ch_3~600.1.jpg',
        'http://server-nodejs.cit.byui.edu:3000/images/sleepoutside/the-north-face-assault-tent-3-person-3-season~a~989ch_4~600.1.jpg'
    ];

    const carousel = document.getElementById('carousel');

    images.forEach((src) => {
        const slide = document.createElement('div');
        slide.classList.add('carousel-slide');
        
        const img = document.createElement('img');
        img.src = src;
        img.alt = `Imagen ${images.indexOf(src) + 1}`;
        
        slide.appendChild(img);
        carousel.appendChild(slide);
    });
*/});



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