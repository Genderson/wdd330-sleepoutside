import { loadHeaderFooter } from "./utils.mjs";
import { checkLogin } from "./auth.mjs";
import { currentOrders } from "./currentOrders.mjs";

loadHeaderFooter();

const token = checkLogin();
const tokenString = JSON.stringify(token);

currentOrders("#orders", tokenString);
