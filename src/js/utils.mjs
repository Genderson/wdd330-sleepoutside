import { displayTotalCartItems } from "./totalCartItems.mjs";

// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}
//return a value from the url,
export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const product = urlParams.get(param) 
  return product; 
}

export function renderListWithTemplate(templateFn, parentElement, list, position = "afterbegin", clear = true) {
  if (clear){
    parentElement.innerHtml = "";
  }
  const htmlStrings =  list.map(templateFn);
  parentElement.insertAdjacentHTML(position, htmlStrings.join(''));
}

export function calculateDiscount(finalPrice, listPrice){
  const productDiscountPercentage = `${(
    100 *
    (1 - finalPrice / listPrice)
  ).toFixed(0)}%`;

  return productDiscountPercentage;
}

export async function renderWithTemplate(templateFn, parentElement, data, callback, position = "afterbegin", clear = true) {
  if (clear){
    parentElement.innerHtml = "";
  }

  const html = await templateFn();

  parentElement.insertAdjacentHTML(position, html);
  if (callback) {
    callback(data);
  }
}

function loadTemplate(path) {
  // this is called currying
  return async function() {
    const res = await fetch(path);
    if (res.ok) {
      const html = await res.text();
      return html;
    }
  };
}

export async function loadHeaderFooter() {
  const headerTemplateFn = loadTemplate("/partials/header.html");
  const footerTemplateFn = loadTemplate("/partials/footer.html");
  let mainHeader = document.querySelector("header");
  let mainFooter = document.querySelector("footer");

  await renderWithTemplate(headerTemplateFn, mainHeader);
  await renderWithTemplate(footerTemplateFn, mainFooter);

  addAnimationCartButton();
  displayTotalCartItems();
}

function addAnimationCartButton(){
  const addButton = document.querySelector("#addToCart"); // load the button
  const cart = document.querySelector(".cart"); // the cart icon
  if (addButton !== null) {
    // Logic to see if the button exists and if so run the animation
    addButton.addEventListener("click", () => {
      cart.classList.add("animate");
      setTimeout(() => {
        cart.classList.remove("animate");
      }, 300);
    });
  }
}

export function alertMessage(messages, scroll=true) {
  let response = document.querySelector("#checkout-response");
  for (let index = 0; index < Object.keys(messages).length; index++) {
      const error = Object.values(messages)[index];
      const p = document.createElement("p");
      p.innerText = `${error}`;
      response.appendChild(p);
  }
}