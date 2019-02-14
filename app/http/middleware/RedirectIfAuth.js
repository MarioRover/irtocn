const Middleware = require('./Middleware');
const Admins = require('app/models/Admins');

module.exports = new class RedirectIfAuth extends Middleware {

    ReTo404(req , res , next) {
        if(!req.isAuthenticated()) {
          const rememberToken = req.signedCookies.remember_shams_web;
          if (rememberToken) return this.adminFind(rememberToken, req, next);
          let error = new Error('صفحه مورد نظر یافت نشد');
          error.statusCode = 404;
          throw error;
        } else {
            next();
        }
    }

    ReToDashboard(req , res , next) {
        if(req.isAuthenticated()) {
          res.redirect('/admin/dashboard');
        } else {
          let error = new Error('صفحه مورد نظر یافت نشد');
          error.statusCode = 404;
          throw error;
        }
    }

    async adminFind(rememberToken , req , next) {
      await Admins.findOne({ rememberToken } , (error , admin) => {
        if(admin) {
          req.logIn(admin , (error) => {
            if(error) next(error);
            next();
          })
        } else {
          next();
        }
      })
    }
    
}