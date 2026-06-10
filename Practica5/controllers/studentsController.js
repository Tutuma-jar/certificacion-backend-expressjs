const studentService = require('../services/studentService');
const { scheduleOptions } = require('../validators/studentValidators');

exports.getAllStudents = async (req, res, next) => {
  try {
    const { schedule, credits, active } = req.query;
    const filters = {};
    if (schedule) {
      if (!scheduleOptions.includes(schedule)) return res.status(400).json({ message: 'Invalid schedule filter' });
      filters.schedule = schedule;
    }
    if (credits) {
      const num = parseInt(credits, 10);
      if (Number.isNaN(num)) return res.status(400).json({ message: 'Invalid credits filter' });
      filters.credits = num;
    }
    if (active !== undefined) {
      if (active === 'true' || active === 'false') filters.active = active === 'true';
      else return res.status(400).json({ message: 'Invalid active filter' });
    }
    const students = await studentService.getAll(filters);
    res.json(students);
  } catch (err) {
    next(err);
  }
};

exports.getStudentById = async (req, res, next) => {
  try {
    const student = await studentService.findById(req.params.id);
    if (!student) return res.status(404).json({ message: 'Not found' });
    res.json(student);
  } catch (err) {
    next(err);
  }
};

exports.createStudent = async (req, res, next) => {
  try {
    const student = await studentService.createStudent(req.body);
    res.status(201).json(student);
  } catch (err) {
    next(err);
  }
};

exports.updateStudentPut = async (req, res, next) => {
  try {
    const student = await studentService.updateStudent(req.params.id, req.body, { new: true, runValidators: true });
    if (!student) return res.status(404).json({ message: 'Not found' });
    res.json(student);
  } catch (err) {
    next(err);
  }
};

exports.patchStudent = async (req, res, next) => {
  try {
    const updates = req.body;
    const student = await studentService.updateStudent(req.params.id, updates, { new: true, runValidators: true });
    if (!student) return res.status(404).json({ message: 'Not found' });
    res.json(student);
  } catch (err) {
    next(err);
  }
};

exports.deleteStudent = async (req, res, next) => {
  try {
    const student = await studentService.setActiveFalse(req.params.id);
    if (!student) return res.status(404).json({ message: 'Not found' });
    res.json(student);
  } catch (err) {
    next(err);
  }
};

exports.validateSchedule = async (req, res, next) => {
  try {
    const ids = Array.isArray(req.body) ? req.body : req.body.ids;
    if (!Array.isArray(ids) || ids.length === 0) return res.status(400).json({ message: 'ids array is required in body' });

    const students = await studentService.getStudentsByIds(ids);

    const foundIds = students.map(c => c._id.toString());
    const missing = ids.filter(id => !foundIds.includes(id));
    if (missing.length > 0) return res.status(404).json({ message: 'Some student ids not found', missing });

    const scheduleMap = {};
    for (const s of students) {
      const sc = s.schedule;
      if (!scheduleMap[sc]) scheduleMap[sc] = [];
      scheduleMap[sc].push(s);
    }

    const collisions = [];
    for (const [sched, arr] of Object.entries(scheduleMap)) {
      if (arr.length > 1) {
        collisions.push({ type: 'duplicate', schedule: sched, students: arr.map(x => ({ id: x._id, name: x.name })) });
      }
    }

    const crossPairs = [['A', 'A+'], ['B', 'B+']];
    for (const [a, b] of crossPairs) {
      if (scheduleMap[a] && scheduleMap[b]) {
        collisions.push({ type: 'cross', pair: `${a}/${b}`, students: [...scheduleMap[a], ...scheduleMap[b]].map(x => ({ id: x._id, name: x.name, schedule: x.schedule })) });
      }
    }

    if (collisions.length > 0) return res.json({ valid: false, collisions });

    return res.json({ valid: true, students });
  } catch (err) {
    next(err);
  }
};
