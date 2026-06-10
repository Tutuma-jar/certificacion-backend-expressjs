const mongoose = require('mongoose');

const scheduleEnum = ['A+', 'B+', 'A', 'B', 'C', 'D', 'E', 'Z'];

const StudentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  degree: { type: String, required: true },
  lecturer: { type: String, required: true },
  schedule: { type: String, enum: scheduleEnum, required: true },
  credits: { type: Number, required: true, min: 1, max: 10 },
  active: { type: Boolean, required: true }
}, { versionKey: false });

module.exports = mongoose.model('Student', StudentSchema);
