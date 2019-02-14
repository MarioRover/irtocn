const validator = require('./validator');
const {check} = require('express-validator/check');
const path = require('path');

module.exports = new class fileuploaderValid extends validator {
    handle() {
        return [
            check('fileValue')
                .custom(async (value, {req}) => {
                        let fileExt = ['.png', '.jpg', '.jpeg', '.svg'];
                        if (!fileExt.includes(path.extname(value))) {
                            throw new Error('The imported image format is not correct !');
                        }
                })
        ]
    }
}