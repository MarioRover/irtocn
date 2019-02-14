const validator = require('./validator');
const {check} = require('express-validator/check');
const isNumeric = require('validator/lib/isNumeric');
const isLength = require('validator/lib/isLength');

module.exports = new class skillValid extends validator {
    handle() {
        return [
            check('skillPercent')
                .custom(async (value , {req}) => {
                    if (!value) throw new Error('Skill percentage field can not be empty');
                    if (!isNumeric(value)) throw new Error('Skill percentage field must be a number');
                    if (value > 100) throw new Error('Skill percentage field must between 0 and 100');
                })    
        ]
    }
}