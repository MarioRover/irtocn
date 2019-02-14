const validator = require('./validator');
const {check} = require('express-validator/check');

module.exports = new class testimonialValid extends validator {
    handle() {
        return [
            check('logo')
                .custom(async (value, {req}) => {
                    if(value) {
                        if(!value.includes("</i>")) {
                            throw new Error('The imported Icon Tag is not correct !');
                        }
                    }
                })
        ]
    }
}