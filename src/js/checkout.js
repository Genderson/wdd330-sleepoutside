import checkoutProcess from "./checkoutProcess.mjs";

checkoutProcess.init("so-cart", ".checkout-summary");

const zip = document.querySelector("#zip");
if (zip != null) {
  zip.addEventListener(
    "blur",
    checkoutProcess.calculateOrdertotal.bind(checkoutProcess)
  );
}

const form = document.forms[0];

if (form != null) {
  // this is how it would look if we listen for the submit on the form
  form.checkoutSubmit.addEventListener("click", (e) => {
    e.preventDefault();
    // e.target would contain our form in this case
    var chk_status = form.checkValidity();
    form.reportValidity();
    if (chk_status) {
      checkoutProcess.checkout(form);
    }
  });
}
