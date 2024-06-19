import { getParam, setLocalStorage, loadHeaderFooter } from "./utils.mjs";
import { loginRequest } from "./externalServices.mjs";

loadHeaderFooter();
let redirect = getParam("redirect");


const form = document.forms[0];

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
        if (redirect==null) {
            redirect = "/";
        }
        login(email, password, redirect);

    }
  });
}
async function login(email, password, redirect = "/") {
const credentials = { email: email , password: password };
const response = await loginRequest(credentials);
setLocalStorage("so_token", response);
window.location = redirect;
}
