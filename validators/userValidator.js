const { body } = require('express-validator');


//validations for users
exports.validateUser = [
  body('firstName').notEmpty().withMessage('First name is required'),

  body('lastName').notEmpty().withMessage('Last name is required'),

  body('email').isEmail().withMessage('Valid email is required'),

  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  body('mobile').isMobilePhone().withMessage('Valid mobile number is required'),
  body('city').notEmpty().withMessage('City is required'),
];


//validation for title
exports.validateMoment = [
  body('title').notEmpty().withMessage('Title is required'),

  body('userId').isInt().withMessage('Valid userId is required'),
];
