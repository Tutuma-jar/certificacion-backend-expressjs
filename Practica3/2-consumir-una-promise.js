import { getUser } from "./sandbox.js";

console.log("Starting backend");

getUser(1)
  .then(user => {
    console.log("User fetched:", user);
  })
  .catch(error => {
    console.error("Error fetching user:", error);
  });

console.log("Finish process");
