const validator = require('./validator');
const {check} = require('express-validator/check');
const isEmail = require('validator/lib/isEmail');

module.exports = new class AdminsUpdateValid extends validator {
    handle() {
      return [
        check('email')
          .custom(async (value , {req}) => {
            if (!value) throw new Error('Email field can not be empty');
            if (!isEmail(value)) throw new Error('The entered email format is not correct');
          }),
        check('name')
          .not().isEmpty()
          .withMessage('Name field can not be empty') 
      ]
    }
  }