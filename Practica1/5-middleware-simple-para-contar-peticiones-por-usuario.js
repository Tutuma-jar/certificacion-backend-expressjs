function createRequestCounter(user, limit) {
  let counter = 0;

  return function () {
    counter++;

    if (counter <= limit) {
      return user + ": request allowed. Attempt " + counter + " of " + limit;
    } else {
      return user + ": limit exceeded. Try again later.";
    }
  };
}

const ana = createRequestCounter("Ana", 3);
const luis = createRequestCounter("Luis", 2);

console.log(ana());
console.log(ana());
console.log(luis());
console.log(ana());
console.log(luis());
console.log(luis());