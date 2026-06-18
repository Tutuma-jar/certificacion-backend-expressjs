import {
  getAllStudents,
  createStudent,
  getStudentById,
  replaceStudentById,
  getFilteredStudents,
  updateStudentById,
  deleteStudentById,
  paginateStudentList,
  sortStudentsByField
} from "../services/studentService.js";

import { validateStudentBody } from "../utils/studentValidator.js";

export async function findStudents(req, res, next) {
  const { pass, site, page, limit, sortBy, order } = req.query;

  if (pass !== undefined && pass !== "true" && pass !== "false") {
    const error = Error("Query parameter 'pass' must be 'true' or 'false'");
    error.statusCode = 400;
    return next(error);
  }

  if (site !== undefined && site !== "LP" && site !== "CB" && site !== "SC"){
    const error = Error("Query parameter 'site' must be 'LP' or 'CB' or 'SC'");
    error.statusCode = 400;
    return next(error);
  }

  const pageNumber = Number(page) || 1;
  const limitNumber = Number(limit) || 1;
  
  if(pageNumber<=0 || limitNumber<=0){
    const error = Error("Pagination parameters are invalid");
    error.statusCode = 400;
    return next(error);
  }

  let studentList = await getFilteredStudents(pass,site);

  if(sortBy !== undefined && order !== undefined){
    studentList = sortStudentsByField(studentList,sortBy, order);
  }

  if(page !== undefined && limit !== undefined){
    studentList = paginateStudentList(studentList,page,limit);
  }

  return res.success(200,`Filtered students by pass = ${pass} and site = ${site}`,studentList);
}

export async function saveStudent(req, res, next) {

  /*const studentValidator = validateStudentBody(req.body,true,true);

  if(!studentValidator.validation){
    const error = Error(studentValidator.message);
    error.statusCode = 400;
    return next(error);
  }*/
  
  const newStudent = await createStudent({
    name: req.body.name,
    grade: req.body.grade,
    site: req.body.site,
    active: req.body.active
  });
  return res.success(201,"Student created succesfully", newStudent);
}

export async function findStudentById(req, res, next) {
  const id = req.params.id;

  console.log(`Retrieving information for student with id ${id}.`);

  const student = await getStudentById(id);

  if (!student) {
    const error = Error("Student not found");
    error.statusCode = 404;
    return next(error);
  }

  return res.success(200,`Student with id ${id} succesfully retrieved`,student);
}

export async function replaceStudent(req, res, next){

  const studentValidator = validateStudentBody(req.body,true,true);

  if(!studentValidator.validation){
    const error = Error(studentValidator.message);
    error.statusCode = 400;
    return next(error);
  }

  const studentId = req.body.id;
  const newStudent = {
    name: req.body.name,
    grade: req.body.grade,
    site: req.body.site,
    active: req.body.active
  };
  const replacedStudent = await replaceStudentById(studentId, newStudent);
  if(replaceStudent){
    return res.success(200,`Student with id ${studentId} succesfully totally updated`,newStudent);
  }
  else{
    const error = Error(`Student with id ${studentId} in body was not found`);
    error.statusCode = 404;
    return next(error);
  }
}

export async function updateStudent(req, res, next){
  const studentValidator = validateStudentBody(req.body,false,false);
  if(!studentValidator.validation){
    const error = Error(studentValidator.message);
    error.statusCode = 400;
    return next(error);
  }
  const id = req.params.id;
  const updateStudentResponse = await updateStudentById(id,req.body);
  if(updateStudentResponse){
    return res.success(200, `Student with id ${id} was updated succesfully`, updateStudentResponse);
  }
  else{
    const error = Error("Id not found for update");
    error.statusCode = 404;
    return next(error);
  }
}

export async function deleteStudent(req, res, next){
  const id = req.params.id;
  const deleteStudentReponse = await deleteStudentById(id);
  if(deleteStudentReponse){
    return res.success(200, `Student with id ${id} was deleted succesfully`, deleteStudentReponse);
  }
  else{
    const error = Error("id not found for delete");
    error.statusCode = 404;
    return next(error);
  }
}