const validator = require('./validator');
const {check} = require('express-validator/check');
const isEmail = require('validator/lib/isEmail');
const isLength = require('validator/lib/isLength');

module.exports = new class registerValid extends validator {
    handle() {
      return [
        check('email')
          .custom(async (value , {req}) => {
            if (!value) throw new Error('Email field can not be empty');
            if (!isEmail(value)) throw new Error('The entered email format is not correct');
          }),
        check('phone')
          .not().isEmpty()
          .withMessage('Phone Number field can not be empty'),
        check('phone')
          .isMobilePhone("fa-IR")
          .withMessage('Mobile phone number format is not correct'),  
        check('password') 
          .custom(async (value , {req}) => {
            if (!value) throw new Error('Password field can not be empty');
            if (!isLength(value , { min : 8 })) throw new Error('The password field can not be less than 8 digits');
          }),
        check('CPassword')
          .not().isEmpty()
          .withMessage('Confirm Password field can not be empty'),  
      ]
    }
  }