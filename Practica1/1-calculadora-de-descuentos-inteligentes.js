function calculateFinalPrice(price, category, isFrequentCustomer) {
  let finalPrice = price;

  if (category === "technology") {
    finalPrice *= 0.90;
  } else if (category === "clothing") {
    finalPrice *= 0.85;
  } else {
    finalPrice *= 0.95;
  }

  if (isFrequentCustomer) {
    finalPrice *= 0.95;
  }

  if (finalPrice > 1000) {
    finalPrice -= 50;
  }

  return finalPrice;
}

console.log(calculateFinalPrice(1200, "technology", true));