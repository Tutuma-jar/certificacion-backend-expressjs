import { Router } from "express";

import {
  findStudents,
  saveStudent,
  findStudentByPosition,
} from "../controllers/studentController.js";

const studentRoutes = Router();

studentRoutes.get("/", findStudents);

studentRoutes.post("/", saveStudent);

studentRoutes.get("/:pos", findStudentByPosition);

export default studentRoutes;