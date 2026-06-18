import { Router } from "express";

import {
  findStudents,
  saveStudent,
  replaceStudent,
  findStudentById,
  updateStudent,
  deleteStudent
} from "../controllers/studentController.js";

import { authenticate } from "../middlewares/authenticationMiddleware.js";

const studentRoutes = Router();

studentRoutes.get("/", findStudents);

studentRoutes.post("/", authenticate, saveStudent);

studentRoutes.put("/", replaceStudent);

studentRoutes.get("/:id", findStudentById);

studentRoutes.patch("/:id", updateStudent);

studentRoutes.delete("/:id", deleteStudent);

export default studentRoutes;