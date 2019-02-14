const Middleware = require('./Middleware');

class ConvertFileToField extends Middleware {

    handle(req , res , next) {
        if(! req.file) 
            req.body.images = undefined;
        else
            req.body.images = req.file.filename;

        next();
    }
}


module.exports = new ConvertFileToField();