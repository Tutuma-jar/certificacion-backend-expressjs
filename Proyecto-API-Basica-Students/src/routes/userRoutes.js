import { Router } from "express";

import { registerUser, loginUser } from "../controllers/userController.js";

const userRoutes = Router();

userRoutes.post("/register",registerUser);
userRoutes.post("/login",loginUser);

export default userRoutes;