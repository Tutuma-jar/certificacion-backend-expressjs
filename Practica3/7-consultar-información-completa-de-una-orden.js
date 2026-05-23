import { getUser, getOrders, getPaymentStatus, getShippingInfo } from "./sandbox.js";

async function printOrderSummary(userId, orderId) {
  console.log("Starting backend");

  try {
    const user = await getUser(userId);
    console.log("User fetched:", user);

    const orders = await getOrders(userId);
    const order = orders.find(o => o.id === orderId);
 
    if (!order) {
      throw new Error("Order not found");
    }

    const [payment, shipping] = await Promise.all([
      getPaymentStatus(orderId),
      getShippingInfo(orderId)
    ]);

    console.log("Order summary:");
    console.log(`User: ${user.name}`);
    console.log(`Order: ${order.product} - ${order.price}`);
    console.log(`Payment status: ${payment.status}`);
    console.log(`Shipping status: ${shipping.status}`);
    console.log(`Shipping company: ${shipping.company}`);

  } catch (error) {
    console.error("Error:", error.message || error);
  }

  console.log("Finish process");
}

printOrderSummary(1, 1);   
printOrderSummary(1, 99);  
printOrderSummary(-1, 1);  