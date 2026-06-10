const Student = require('../models/Student');

exports.getAll = async (filters = {}) => {
  return Student.find(filters);
};

exports.findById = async (id) => {
  return Student.findById(id);
};

exports.createStudent = async (data) => {
  const s = new Student(data);
  return s.save();
};

exports.updateStudent = async (id, updates, options = {}) => {
  return Student.findByIdAndUpdate(id, updates, options);
};

exports.setActiveFalse = async (id) => {
  return Student.findByIdAndUpdate(id, { active: false }, { new: true });
};

exports.getStudentsByIds = async (ids) => {
  return Student.find({ _id: { $in: ids } });
};
