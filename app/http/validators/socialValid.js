const validator = require('./validator');
const {check} = require('express-validator/check');
const isURL = require('validator/lib/isURL');

module.exports = new class socialValid extends validator {
    handle() {
        return [
            check('name')
                .not().isEmpty()
                .withMessage('Name field can not be empty'),
            check('icon')
                .custom(async (value, {req}) => {
                    if(value) {
                        if(!value.includes("</i>")) {
                            throw new Error('The imported Icon Tag is not correct !');
                        }
                    } else {
                        throw new Error('Icon field can not be empty');
                    }
                }),
            check('link')
                .custom(async (value , {req}) => {
                    if (!value) throw new Error('Link field can not be empty');
                    if (!isURL(value)) throw new Error('The entered link format is not correct');
                }),    
        ]
    }
}