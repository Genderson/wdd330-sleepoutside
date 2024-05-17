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
  const product = urlParams.get('product') 
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