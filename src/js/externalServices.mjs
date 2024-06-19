import { alertMessage } from "./utils.mjs";

const baseURL = import.meta.env.VITE_SERVER_URL;

async function convertToJson(res) {
  const jsonResponse = await res.json();
  
  if (res.ok) {
    return jsonResponse;
  } else {
    console.log("test " + jsonResponse);
    //throw { name: "servicesError", message: jsonResponse };
    alertMessage(jsonResponse);
  }
}


export async function getProductsByCategory(category) {
  const response = await fetch(baseURL + `/products/search/${category}`);
  const data = await convertToJson(response);
  //console.log(data); // for testing
  return data.Result;
}

export async function findProductById(id) {
  const response = await fetch(baseURL + `/product/${id}`);
  const data = await convertToJson(response);
  return data.Result;
}

export async function checkout(payload) {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  };
  return await fetch(baseURL + "/checkout", options).then(convertToJson);
}

export async function loginRequest(creds) {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(creds),
  };
  return await fetch(baseURL + "/login", options).then(convertToJson);
}

export async function getOrdersRequest(token) {
  const options = {
    method: "GET",
  headers: {
  'Authorization': `Bearer ${token}`
  }
  };
  return await fetch(baseURL + "/orders", options).then(convertToJson);
}