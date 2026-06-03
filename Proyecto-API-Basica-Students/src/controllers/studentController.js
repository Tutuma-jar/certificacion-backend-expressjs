import {
  getAllStudents,
  getStudentsByPassStatus,
  createStudent,
  getStudentByPosition,
} from "../services/studentService.js";

export function findStudents(req, res, next) {
  const { pass, site } = req.query;

  if (pass === undefined && site === undefined) {
    return res.success(200, "Get all students", getAllStudents());
  }

  let students = getAllStudents();

  if (pass !== undefined) {
    if (pass !== "true" && pass !== "false") {
      const error = Error("Query parameter 'pass' must be 'true' or 'false'");
      error.statusCode = 400;
      return next(error);
    }

    const passAsBoolean = pass === "true";
    students = getStudentsByPassStatus(passAsBoolean);
  }

  if (site !== undefined) {
    if (site !== "LP" && site !== "CB") {
      const error = Error("Query parameter 'site' must be 'LP' or 'CB'");
      error.statusCode = 400;
      return next(error);
    }

    students = students.filter((student) => student.site === site);
  }

  const filters = [];
  if (pass !== undefined) filters.push(`pass=${pass}`);
  if (site !== undefined) filters.push(`site=${site}`);
  const message = filters.length ? `Get students filtered by ${filters.join(", ")}` : "Get students";

  return res.success(200, message, students);
}

export function saveStudent(req, res, next) {
  const { id, name, grade, site, active } = req.body;

  if (id === undefined || name === undefined || grade === undefined || site === undefined || active === undefined) {
    const error = Error("Fields 'id', 'name', 'grade', 'site' and 'active' are required");
    error.statusCode = 400;
    return next(error);
  }

  if (typeof id !== "number" || Number.isNaN(id)) {
    const error = Error("Field 'id' must be a number");
    error.statusCode = 400;
    return next(error);
  }

  if (typeof name !== "string" || name.trim().length === 0) {
    const error = Error("Field 'name' must be a non-empty string");
    error.statusCode = 400;
    return next(error);
  }

  if (typeof grade !== "number" || grade < 0 || grade > 100) {
    const error = Error("Field 'grade' must be a number between 0 and 100");
    error.statusCode = 400;
    return next(error);
  }

  if (site !== "LP" && site !== "CB") {
    const error = Error("Field 'site' must be either 'LP' or 'CB'");
    error.statusCode = 400;
    return next(error);
  }

  if (active !== 0 && active !== 1) {
    const error = Error("Field 'active' must be 0 or 1");
    error.statusCode = 400;
    return next(error);
  }

  const newStudent = createStudent({
    id,
    name: name.trim(),
    grade,
    site,
    active,
  });

  return res.success(201, "Student created succesfully", newStudent);
}

export function findStudentByPosition(req, res, next) {
  const position = Number(req.params.pos);

  console.log(`Retrieving information for student in position ${position}.`);

  if (!Number.isInteger(position) || position < 0) {
    const error = Error("Position must be a valid positive integer");
    error.statusCode = 400;
    return next(error);
  }

  const student = getStudentByPosition(position);

  if (!student) {
    const error = Error("Student not found");
    error.statusCode = 404;
    return next(error);
  }

  return res.success(200,`Student in pos ${position} succesfully retrieved`,student);
}