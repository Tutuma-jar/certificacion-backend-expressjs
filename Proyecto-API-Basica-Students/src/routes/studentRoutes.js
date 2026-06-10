import { Router } from "express";

import {
  findStudents,
  saveStudent,
  replaceStudent,
  findStudentById,
  updateStudent,
  deleteStudent
} from "../controllers/studentController.js";

const studentRoutes = Router();

studentRoutes.get("/", findStudents);

studentRoutes.post("/", saveStudent);

studentRoutes.put("/", replaceStudent);

studentRoutes.get("/:id", findStudentById);

studentRoutes.patch("/:id", updateStudent);

studentRoutes.delete("/:id", deleteStudent);

export default studentRoutes;