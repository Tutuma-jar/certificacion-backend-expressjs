import mongoose from "mongoose";
import {
  getAllCourses,
  getFilteredCourses,
  createCourse,
  getCourseById,
  updateCourseById,
  deleteCourseLogicallyById,
  getCoursesByIds
} from "../services/courseService.js";

import { validateCourseBody } from "../utils/courseValidator.js";

export async function findCourses(req, res, next) {
  try {
    const { schedule, credits, active } = req.query;

    if (schedule === undefined && credits === undefined && active === undefined) {
      const courses = await getAllCourses();
      return res.success(200, "All courses retrieved", courses);
    }

    if (active !== undefined && active !== "true" && active !== "false") {
      const error = Error("Query parameter 'active' must be 'true' or 'false'");
      error.statusCode = 400;
      return next(error);
    }

    const courses = await getFilteredCourses(schedule, credits, active);
    return res.success(200, "Filtered courses retrieved", courses);
  } catch (err) {
    return next(err);
  }
}

export async function saveCourse(req, res, next) {
  try {
    const validator = validateCourseBody(req.body, false, true);
    if(!validator.validation){
      const error = Error(validator.message);
      error.statusCode = 400;
      return next(error);
    }
    const newCourse = await createCourse({
      name: req.body.name,
      degree: req.body.degree,
      lecturer: req.body.lecturer,
      schedule: req.body.schedule,
      credits: Number(req.body.credits),
      active: req.body.active
    });
    return res.success(201, "Course created successfully", newCourse);
  } catch (err) {
    return next(err);
  }
}

export async function findCourseById(req, res, next) {
  try {
    const id = req.params.id;
    if(!mongoose.Types.ObjectId.isValid(id)){
      const error = Error("Id must be a valid Mongo ObjectId");
      error.statusCode = 400;
      return next(error);
    }
    const course = await getCourseById(id);
    if(!course){
      const error = Error("Course not found");
      error.statusCode = 404;
      return next(error);
    }
    return res.success(200, `Course with id ${id} retrieved`, course);
  } catch (err) {
    return next(err);
  }
}

export async function updateCourse(req, res, next){
  try{
    const validator = validateCourseBody(req.body, false, false);
    if(!validator.validation){
      const error = Error(validator.message);
      error.statusCode = 400;
      return next(error);
    }
    const id = req.params.id;
    if(!mongoose.Types.ObjectId.isValid(id)){
      const error = Error("Id must be a valid Mongo ObjectId");
      error.statusCode = 400;
      return next(error);
    }
    const updated = await updateCourseById(id, req.body);
    if(!updated){
      const error = Error("Course not found");
      error.statusCode = 404;
      return next(error);
    }
    return res.success(200, `Course with id ${id} updated`, updated);
  } catch(err){
    return next(err);
  }
}

export async function deleteCourse(req, res, next){
  try{
    const id = req.params.id;
    if(!mongoose.Types.ObjectId.isValid(id)){
      const error = Error("Id must be a valid Mongo ObjectId");
      error.statusCode = 400;
      return next(error);
    }
    const deleted = await deleteCourseLogicallyById(id);
    if(!deleted){
      const error = Error("Course not found");
      error.statusCode = 404;
      return next(error);
    }
    return res.success(200, `Course with id ${id} deleted (active=false)`, deleted);
  } catch(err){
    return next(err);
  }
}

export async function checkSchedule(req, res, next){
  try{
    let ids = [];
    if(Array.isArray(req.body)){
      ids = req.body;
    } else if(Array.isArray(req.body.ids)){
      ids = req.body.ids;
    } else {
      const error = Error("Body must be an array of course ids or { ids: [] }");
      error.statusCode = 400;
      return next(error);
    }

    if(ids.length === 0){
      const error = Error("No ids provided");
      error.statusCode = 400;
      return next(error);
    }

    for(const id of ids){
      if(!mongoose.Types.ObjectId.isValid(id)){
        const error = Error(`Invalid id: ${id}`);
        error.statusCode = 400;
        return next(error);
      }
    }

    const courses = await getCoursesByIds(ids);
    if(courses.length !== ids.length){
      const foundIds = courses.map(c => c._id.toString());
      const missing = ids.filter(i => !foundIds.includes(i));
      const error = Error(`Some courses not found: ${missing.join(", ")}`);
      error.statusCode = 404;
      return next(error);
    }

    const allowed = ["A+","B+","A","B","C","D","E","Z"];
    // normalize schedule by removing +
    const counts = {};
    const scheduleMap = {};
    for(const c of courses){
      if(!allowed.includes(c.schedule)){
        const error = Error(`Invalid schedule value for course ${c._id}: ${c.schedule}`);
        error.statusCode = 400;
        return next(error);
      }
      const norm = c.schedule.replace("+", "");
      counts[norm] = (counts[norm] || 0) + 1;
      if(!scheduleMap[norm]) scheduleMap[norm] = [];
      scheduleMap[norm].push({ id: c._id, name: c.name, schedule: c.schedule });
    }

    const conflicts = [];
    for(const norm in counts){
      if(counts[norm] > 1){
        conflicts.push({ group: norm, courses: scheduleMap[norm] });
      }
    }

    if(conflicts.length > 0){
      return res.success(200, "Schedule conflicts detected", conflicts);
    }

    return res.success(200, "Schedule is valid", courses);
  } catch(err){
    return next(err);
  }
}
