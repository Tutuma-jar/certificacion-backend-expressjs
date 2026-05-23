import { getOrders } from "./sandbox.js";

function test1() {
  console.log("Starting test1");

  getOrders(-1)
    .then(orders => {
      console.log("Orders fetched:", orders);
    })
    .catch(error => {
      console.error("Error in test1:", error);
    });

  console.log("Finish test1");
}

async function test2() {
  console.log("Starting test2");

  try {
    const orders = await getOrders(-1);
    console.log("Orders fetched:", orders);
  } catch (error) {
    console.error("Error in test2:", error);
  }

  console.log("Finish test2");
}

test1();
test2();