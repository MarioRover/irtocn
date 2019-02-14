const Middleware = require('./Middleware');
const Admins = require('app/models/Admins');

module.exports = new class RememberLogin extends Middleware {
    handle(req , res , next) {
      if (!req.isAuthenticated()) {
        const rememberToken = req.signedCookies.remember_shams_web;
        if (rememberToken) return this.adminFind(rememberToken, req, next);
      }
      next();
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