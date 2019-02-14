const Middleware = require('./Middleware');
const Dev = require('app/models/Dev');
const isEmpty = require('is-empty');

module.exports = new class ErrorHandler extends Middleware {
    error404(req , res , next) {
        let error = new Error('صفحه مورد نظر یافت نشد');
        error.statusCode = 404;
        throw error;
    }
    async handler(err , req , res , next) {
        let dev = await Dev.find({});
        const statusCode = err.statusCode || 500;
        const message = err.message || '';
        const stack = err.stack || '';
        let debug = false;
        if(!isEmpty(dev)) {
            debug = dev[0].debug;
        }
        if(!debug) {
            res.render(`error/${statusCode}`, {
                title: `Error ${statusCode}`,
                message,
                statusCode,
                homeSeo : 'Error',
              });
          } else {
            res.render('error/index' , {
                message,
                stack,
                statusCode,
                title : 'Error',
                homeSeo : 'Error',
            });  
        }
    }
}