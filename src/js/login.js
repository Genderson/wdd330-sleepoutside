import { getParam, setLocalStorage, loadHeaderFooter } from "./utils.mjs";
import { loginRequest, register } from "./externalServices.mjs";

loadHeaderFooter();
let redirect = getParam("redirect");

const form = document.forms[0];

const registerForm = document.forms[1];

if (form != null) {
  // this is how it would look if we listen for the submit on the form
  form.loginButton.addEventListener("click", (e) => {
    e.preventDefault();
    // e.target would contain our form in this case
    var chk_status = form.checkValidity();
    form.reportValidity();
    if (chk_status) {
      const email = form.email.value;
      const password = form.password.value;
      if (redirect == null) {
        redirect = "/";
      }
      login(email, password, redirect);
    }
  });
}

async function login(email, password, redirectParameter = "/") {
  const credentials = { email: email, password: password };
  const response = await loginRequest(credentials);
  setLocalStorage("so_token", response);
  window.location = redirectParameter;
}

if (registerForm != null) {
  registerForm.loginButton.addEventListener("click", (e) => {
    e.preventDefault();
    // e.target would contain our form in this case
    var chk_status = registerForm.checkValidity();
    registerForm.reportValidity();
    if (chk_status) {
      const fname = registerForm.firstName.value;
      const lname = registerForm.lastName.value;
      const address = registerForm.address.value;
      const city = registerForm.city.value;
      const state = registerForm.state.value;
      const zip = registerForm.zip.value;
      const country = registerForm.country.value;
      const email = registerForm.email.value;
      //const password = registerForm.password.value;

      const fullName = `${fname} ${lname}`;
      const fullAddress = `${address} ${city} ${state} ${zip} ${country}`

      const info = {
        "name" : fullName,
        "address" : fullAddress,
        "email" : email
      }

      response = register(info);

      console.log(response);
    }
  });
}