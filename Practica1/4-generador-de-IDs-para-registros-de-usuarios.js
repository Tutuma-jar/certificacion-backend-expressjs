function createIdGenerator(prefix, start = 0) {
  let counter = start;

  return function () {
    counter++;
    return prefix + "-" + counter;
  };
}

const generateUserId = createIdGenerator("USR");
console.log(generateUserId());
console.log(generateUserId());
console.log(generateUserId());

const generateProductId = createIdGenerator("PROD");
console.log(generateProductId());
console.log(generateProductId());

const generateFrom100 = createIdGenerator("USR", 100);
console.log(generateFrom100());
console.log(generateFrom100());
console.log(generateFrom100());