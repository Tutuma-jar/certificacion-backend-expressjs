import mongoose from "mongoose";

export const studentList = [];

const studentSchema = new mongoose.Schema({
  name: String,
  grade: Number,
  site: String,
  active: Boolean
});

export const Student = mongoose.model("Student", studentSchema);