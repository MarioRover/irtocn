const validator = require('./validator');
const {check} = require('express-validator/check');

module.exports = new class experiencesValid extends validator {
    handle() {
        return [
            check('icon1')
                .custom(async (value, {req}) => {
                    if(value) {
                        if(!value.includes("</i>")) {
                            throw new Error('The imported First Icon Tag is not correct !');
                        }
                    }
                }),
            check('icon2')
                .custom(async (value, {req}) => {
                    if(value) {
                        if(!value.includes("</i>")) {
                            throw new Error('The imported Second Icon Tag is not correct !');
                        }
                    }
                }),
            check('icon3')
                .custom(async (value, {req}) => {
                    if(value) {
                        if(!value.includes("</i>")) {
                            throw new Error('The imported Third Icon Tag is not correct !');
                        }
                    }
                }),
            check('icon4')
                .custom(async (value, {req}) => {
                    if(value) {
                        if(!value.includes("</i>")) {
                            throw new Error('The imported Fourth Icon Tag is not correct !');
                        }
                    }
                })            
        ]
    }
}