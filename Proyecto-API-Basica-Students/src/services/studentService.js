import { studentList, Student } from "../data/students.js";

export async function getAllStudents(){
    return await Student.find({ active: true });
}

export async function getFilteredStudents(pass,site){
    const filter = { active: true };

    if(pass !== undefined){
        const passAsBoolean = pass === "true";
        if(passAsBoolean){
            filter.grade = { $gte: 60 };
        }
        else{
            filter.grade = { $lt: 60 };
        }
    }

    if(site !== undefined){
        filter.site = site;
    }

    return await Student.find(filter);
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

export function getStudentById(id){
    const foundStudents = studentList.filter ( student => student.id === id);
    if(foundStudents.length == 0){
        return null;
    }
    else{
        return foundStudents[0];
    }
}

export function replaceStudentById(studentId, student){
    let pos = -1;
    for(let i=0;i<studentList.length;i++){
        if(studentList[i].id == studentId){
            pos = i;
            break;
        }
    }
    studentList[pos] = student;
    return pos != -1;
}

export function updateStudentById(studentId,body){
    let pos = -1;
    for(let i=0;i<studentList.length;i++){
        if(studentList[i].id == studentId){
            pos = i;
            break;
        }
    }
    if(pos == -1){
        return {
            success: false,
            message: `Not found student with id ${studentId} to update`
        };
    }
    let newStudentInfo = {
        id: studentId,
        name: body.name ?? studentList[pos].name,
        site: body.site ?? studentList[pos].site,
        grade: body.grade ?? studentList[pos].grade,
        active: body.active ?? studentList[pos].active
    };
    studentList[pos] = newStudentInfo;
    return {
        success: true,
        data: newStudentInfo
    };
}

export function deleteStudentLogicallyById(studentId){
    let pos = -1;
    for(let i=0;i<studentList.length;i++){
        if(studentList[i].id == studentId){
            pos = i;
            break;
        }
    }
    if(pos == -1){
        return {
            success: false,
            message: `Not found student with id ${studentId} to update`
        };
    }
    studentList[pos].active = 0;
    return {
        success: true,
        data: studentList[pos]
    };
}