const { body } = require('express-validator');

exports.registrationValidation = () => {
    return [
        body('email', 'Please enter a valid email').isEmail(),
        body('password', 'Please enter a valid password of minimum 5 characters').isLength({ min: 5 })
    ];
}