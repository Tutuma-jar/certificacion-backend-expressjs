import { Router } from "express";
import {
  findCourses,
  saveCourse,
  findCourseById,
  updateCourse,
  deleteCourse,
  checkSchedule
} from "../controllers/courseController.js";

const router = Router();

router.get("/", findCourses);
router.post("/", saveCourse);
router.get("/:id", findCourseById);
router.patch("/:id", updateCourse);
router.delete("/:id", deleteCourse);
router.put("/schedule", checkSchedule);

export default router;
