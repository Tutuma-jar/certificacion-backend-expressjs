import { studentList, Student } from "../data/students.js";

export async function getAllStudents(){
    // Only active students
    const studentList = await Student.find();
    return studentList;
}

export async function getFilteredStudents(pass,site){
    let filteredStudentList = await getAllStudents();
    if(pass !== undefined){
        let passAsBoolean = pass === "true";
        filteredStudentList = filteredStudentList.filter( (student) => {
            const hasPassed = student.grade >= 60;
            return hasPassed === passAsBoolean;
        });
    }
    if(site !== undefined){
        filteredStudentList = filteredStudentList.filter( (student) => {
            return student.site === site;
        });
    }
    return filteredStudentList;
}

export function paginateStudentList(studentList, page, limit){
    const startIndex = (page - 1)*limit;
    const endIndex = page*limit;
    return studentList.slice(startIndex, endIndex);
}

export function sortStudentsByField(studentList, sortBy, order){
    if(order === 'asc'){
        return studentList.sort((a,b) => a[sortBy]>b[sortBy] ? 1 : -1);
    }
    if(order === 'desc'){
        return studentList.sort((a,b) => a[sortBy]<b[sortBy] ? 1 : -1);
    }
    return studentList;
}

export async function createStudent(student){
    const createdStudent = await Student.create(student);
    return createdStudent;
}

export async function getStudentById(id){
    const foundStudent = await Student.findById(id);
    return foundStudent;
}

export async function replaceStudentById(studentId, student){

    const replacedStudent = await Student.findByIdAndUpdate(studentId, student, {new: true} );
    return replacedStudent;
}

export async function updateStudentById(studentId,body){
    const updatedStudent = await Student.findByIdAndUpdate(studentId,body,{new: true});
    return updatedStudent;
}

export async function deleteStudentById(studentId){
    const deletedStudent = await Student.findByIdAndDelete(studentId);
    return deletedStudent;
}