const express = require('express');
const { body, param, query, validationResult } = require('express-validator');
const mongoose = require('mongoose');
const controller = require('../controllers/studentsController');
const { scheduleOptions } = require('../validators/studentValidators');

const router = express.Router();

const idValidator = param('id').custom(value => mongoose.Types.ObjectId.isValid(value)).withMessage('Invalid id');

function handleValidation(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  next();
}

const createValidators = [
  body('name').isString().withMessage('name must be a string').notEmpty().withMessage('name is required'),
  body('degree').isString().withMessage('degree must be a string').notEmpty().withMessage('degree is required'),
  body('lecturer').isString().withMessage('lecturer must be a string').notEmpty().withMessage('lecturer is required'),
  body('schedule').isIn(scheduleOptions).withMessage(`schedule must be one of: ${scheduleOptions.join(', ')}`),
  body('credits').isInt({ min: 1, max: 10 }).withMessage('credits must be integer between 1 and 10'),
  body('active').isBoolean().withMessage('active must be boolean'),
  handleValidation
];

const patchValidators = [
  body().custom(value => {
    if (!value || typeof value !== 'object' || Object.keys(value).length === 0) throw new Error('Request body must contain at least one field');
    const allowed = ['name','degree','lecturer','schedule','credits','active'];
    for (const k of Object.keys(value)) if (!allowed.includes(k)) throw new Error(`Invalid field: ${k}`);
    return true;
  }),
  body('name').optional().isString().withMessage('name must be a string'),
  body('degree').optional().isString().withMessage('degree must be a string'),
  body('lecturer').optional().isString().withMessage('lecturer must be a string'),
  body('schedule').optional().isIn(scheduleOptions).withMessage(`schedule must be one of: ${scheduleOptions.join(', ')}`),
  body('credits').optional().isInt({ min:1, max:10 }).withMessage('credits must be integer between 1 and 10'),
  body('active').optional().isBoolean().withMessage('active must be boolean'),
  handleValidation
];

const filterValidators = [
  query('schedule').optional().isIn(scheduleOptions).withMessage('invalid schedule'),
  query('credits').optional().isInt({ min:1, max:10 }).withMessage('invalid credits'),
  query('active').optional().isBoolean().withMessage('invalid active'),
  handleValidation
];

// Routes
router.get('/', filterValidators, controller.getAllStudents);
router.post('/', createValidators, controller.createStudent);
router.put('/schedule', controller.validateSchedule);
router.put('/:id', idValidator, createValidators, controller.updateStudentPut);
router.patch('/:id', idValidator, patchValidators, controller.patchStudent);
router.get('/:id', idValidator, handleValidation, controller.getStudentById);
router.delete('/:id', idValidator, handleValidation, controller.deleteStudent);

module.exports = router;
