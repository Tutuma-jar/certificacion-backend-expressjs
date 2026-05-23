import { getUser, getProductList } from "./sandbox.js";

function getData(id) {
  console.log("Starting backend");

  Promise.all([getUser(id), getProductList()])
    .then(([user, products]) => {
      console.log("User fetched:", user);
      console.log("Product list fetched:", products);
    })
    .catch(error => {
      console.error("Error:", error);
    });

  console.log("Finish process");
}

getData(1);
getData(-1);
