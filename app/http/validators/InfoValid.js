const validator = require('./validator');
const {check} = require('express-validator/check');

module.exports = new class InfoValid extends validator {
    handle() {
        return [
            check('title')
                .not().isEmpty()
                .withMessage('Title of website field can not be empty'),
            check('siteName')
                .not().isEmpty()
                .withMessage('Name of website field can not be empty'), 
        ]
    }
}