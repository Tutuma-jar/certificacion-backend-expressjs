import { Course } from "../data/courses.js";

export async function getAllCourses(){
  return await Course.find();
}

export async function getFilteredCourses(schedule, credits, active){
  const filter = {};
  if(schedule !== undefined){
    filter.schedule = schedule;
  }
  if(credits !== undefined){
    const creditsNumber = Number(credits);
    if(!Number.isNaN(creditsNumber)){
      filter.credits = creditsNumber;
    }
  }
  if(active !== undefined){
    if(active === "true" || active === true){
      filter.active = true;
    }
    else if(active === "false" || active === false){
      filter.active = false;
    }
  }
  return await Course.find(filter);
}

export async function createCourse(course){
  return await Course.create(course);
}

export async function getCourseById(id){
  return await Course.findById(id);
}

export async function updateCourseById(id, body){
  return await Course.findByIdAndUpdate(id, body, { new: true });
}

export async function deleteCourseLogicallyById(id){
  return await Course.findByIdAndUpdate(id, { active: false }, { new: true });
}

export async function getCoursesByIds(ids){
  return await Course.find({ _id: { $in: ids } });
}
