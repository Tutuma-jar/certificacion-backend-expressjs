import { getUser, getOrders } from "./sandbox.js";

function printOrdersByUser(id) {
  console.log("Starting backend");

  getUser(id)
    .then(user => {
      console.log("User fetched:", user);
      return getOrders(user.id);
    })
    .then(orders => {
      console.log("Orders fetched:", orders);
    })
    .catch(error => {
      console.error("Error:", error);
    });

  console.log("Finish process");
}

printOrdersByUser(-5);
printOrdersByUser(1);