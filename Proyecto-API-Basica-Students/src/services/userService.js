import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../data/users.js";

export async function saveUserInDB(username, password, role){
    const hashedPassword = await bcrypt.hash(password,10);
    const newUser = await User.create({
        username,
        password: hashedPassword,
        role
    });
    const responseUser = {
        id: newUser._id,
        username: newUser.username,
        role: newUser.role
    };
    return responseUser;
}

export async function checkUserInDB(username, password) {
    const usersFound = await User.find({username});
    const userInDB = usersFound[0];
    if(userInDB == null){ // If username does not exist in DB
        return null;
    }
    // Check if passowrd match
    const isPasswordCorrect = await bcrypt.compare(password,userInDB.password);
    if(!isPasswordCorrect){
        return null;
    }
    // Generate token
    const token = jwt.sign(
        {
            id: userInDB._id,
            username: userInDB.username,
            role: userInDB.role
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "1h"
        }
    );
    return {
        username: userInDB.username,
        token
    };
}