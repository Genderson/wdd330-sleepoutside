import { getOrdersRequest } from "./externalServices.mjs";

export async function currentOrders(selector, token) {
  try {
    const orders = await getOrdersRequest(token);
    const parent = document.querySelector(`${selector} tbody`);
    parent.innerHTML = orders.map(orderTemplate).join("");
  } catch (err) {
    console.log(err);
  }
}

function orderTemplate(order) {
  return `<tr><td>${order.id}</td>
  <td>${new Date(order.orderDate).toLocaleDateString("en-US")}</td>
  <td>${order.items.length}</td>
  <td>${order.orderTotal}</td></tr>`;
}