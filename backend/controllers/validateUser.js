const { body, validationResult } = require("express-validator");

exports.validateUserSignup = [
    body('name')
        .notEmpty().withMessage('Name is required').bail()
        .matches(/^[A-Za-z\s]+$/).withMessage('Name should only contain letters').bail()
        .isLength({ min: 3 }).withMessage('Name must be at least 3 characters long'),

    body('email')
        .notEmpty().withMessage('Email is required').bail()
        .isEmail().withMessage('Invalid email format'),

    body('age')
        .notEmpty().withMessage('Age is required').bail()
        .isInt({ min: 18, max: 120 }).withMessage('Age must be a number between 18 and 120'),

    body('password')
        .notEmpty().withMessage('Password is required').bail()
        .isLength({ min: 8 }).withMessage('Password must be at least 8 characters long').bail()
        .matches(/(?=.*[!@#$%^&*])/).withMessage('Password must contain at least one special character'),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }

]

exports.validateUserLogin = [
    body('email')
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Invalid email format'),

    body('password')
        .notEmpty().withMessage('Password is required'),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }

]