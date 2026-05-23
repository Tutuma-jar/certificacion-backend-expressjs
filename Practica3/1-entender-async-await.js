import { getUser } from "./sandbox.js";


async function main(){
    console.log("Starting backend")
    try{
        const user = await getUser(-1); 
        console.log("User fetched:", user);
    }catch(error){
        console.error("Error fetching user:", error);
    }
}

main();
console.log("Finish process");