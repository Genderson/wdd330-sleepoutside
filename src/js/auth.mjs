import { jwtDecode } from "jwt-decode";
import { getLocalStorage } from "./utils.mjs";

function login(creds, redirect) {

}
 
function isTokenValid(token) {
    // check to make sure a token was actually passed in.
    if (token) {
        // decode the token
        const decoded = jwtDecode(token);
        // get the current date
        let currentDate = new Date();
        // JWT exp is in seconds, the time from our current date will be milliseconds.
        if (decoded.exp * 1000 < currentDate.getTime()) {
        //token expiration has passed
        console.log("Token expired.");
        return false;
        } else {
        // token not expired
        console.log("Valid token");
        return true;
        }
        //no token...automatically return false.
    } else return false;
}

//import and call this function on any page we want protected.
// if there is a valid token it will be returned, otherwise we will redirect to the login page.
export function checkLogin() {
    // get the token from localStorage
    const token = getLocalStorage("so_token");
    const tokenString = JSON.stringify(token);
    // use the isTokenValid function to check the validity of our token
    const valid = isTokenValid(tokenString);
    // if the token is NOT valid
    if (!valid) {
      //remove stored token
      localStorage.removeItem("so_token");
      // redirect to login while sending the current URL along as a parameter
      // grab the current location from the browser
      const location = window.location;
      // check out what location contains
      console.log(location);
      // redirect by updating window.location =
      window.location = `/login/index.html?redirect=${location.pathname}`;
    } else return token; //if they are logged in then just return the token.
  }