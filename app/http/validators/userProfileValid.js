const validator = require('./validator');
const {check} = require('express-validator/check');
const isLength = require('validator/lib/isLength');

module.exports = new class userProfileValid extends validator {
    handle() {
      return [
        check('name')
          .not().isEmpty()
          .withMessage('name field can not be empty'),
        check('password') 
          .custom(async (value , {req}) => {
            if (value && !isLength(value , { min : 8 })) throw new Error('The password field can not be less than 8 digits');
          }),
      ]
    }
  }