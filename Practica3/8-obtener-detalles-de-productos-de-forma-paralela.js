import { getProductList, getProductDetail } from "./sandbox.js";

async function printAvailableProductDetails() {
  console.log("Starting backend");

  try {
    const productList = await getProductList();
    const productDetails = await Promise.all(
      productList.map(name => getProductDetail(name))
    );

    const availableProducts = productDetails.filter(p => p.stock > 0);
    console.log("Available products:");
    availableProducts.forEach(p => {
      console.log(`${p.name} - ${p.category} - stock: ${p.stock}`);
    });

  } catch (error) {
    console.error("Error:", error.message || error);
  }

  console.log("Finish process");
}

printAvailableProductDetails();
