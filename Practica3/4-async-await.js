import { getUser, getOrders } from "./sandbox.js";

async function printOrdersByUser(id) {
  console.log("Starting backend");

  try {
    const user = await getUser(id);
    console.log("User fetched:", user);

    const orders = await getOrders(user.id);
    console.log("Orders fetched:", orders);
  } catch (error) {
    console.error("Error:", error);
  }

  console.log("Finish process");
}

printOrdersByUser(-5);
printOrdersByUser(1);