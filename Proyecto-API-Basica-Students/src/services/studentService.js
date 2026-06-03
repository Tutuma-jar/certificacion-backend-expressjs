import { studentList } from "../data/students.js";

export function getAllStudents(){
    return studentList;
}

export function getStudentsByPassStatus(pass){
    return studentList.filter( (student) => {
        const hasPassed = student.grade >= 60;
        return hasPassed === pass;
    })
}

export function createStudent(student){
    studentList.push(student);
    return student;
}

export function getStudentByPosition(pos){
    return studentList[pos] ?? null;
}