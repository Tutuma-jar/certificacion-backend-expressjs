import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  degree: { type: String, required: true },
  lecturer: { type: String, required: true },
  schedule: { type: String, enum: ["A+","B+","A","B","C","D","E","Z"], required: true },
  credits: { type: Number, required: true, min: 1, max: 10 },
  active: { type: Boolean, default: true }
});

export const Course = mongoose.model("Course", courseSchema);
