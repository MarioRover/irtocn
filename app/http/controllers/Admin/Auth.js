const Controller = require('../Controller');
const passport = require('passport');

module.exports = new class Auth extends Controller {
    loginShow(req , res , next) {
        try {
            res.render('panel/login' , {
                title : 'Mario Rover Login',
                sitekey : process.env.RECAPTCHA_SITEKEY,
                manifest : this.Manifest,
                homeSeo : 'Login'
            })
        } catch (error) {
            this.error('error in loginShow method in loginCT' , 500 , next);
        }
    }

    registerShow(req , res , next) {
        try {
            res.render('panel/register' , {
                title : 'Mario Rover Register',
                sitekey : process.env.RECAPTCHA_SITEKEY,
                manifest : this.Manifest,
                homeSeo : 'Register'
            })
        } catch (error) {
            this.error('error in registerShow method in loginCT' , 500 , next);
        }
    }


    async register(req , res , next) {
        try {
            let recaptcha = await this.verifyRecaptcha(req);
            if(!recaptcha) return this.izitoastMessage(['Recaptcha Error : Please Reload Page And Try Again'] , 'error' , res);
            let validation = await this.validationData(req);
            if(!validation) return this.fieldMessage(req.flash('errors') , req.body.form , res);
            if(req.body.password !== req.body.CPassword) return this.fieldMessage(['Passwords do not match'] , req.body.form , res);
            this.registerProccess(req , res);
        } catch (error) {
            this.ajaxError('error in register method in loginCT' , 500 , error , res);
        }
    }

    async registerProccess(req , res , next) {
        try {
            passport.authenticate('admin.register' , async(error, newAdmin) => {
                if (error) return this.error('Error in Auth at register method', 500, error, res);
                if (!newAdmin) return this.izitoastMessage(req.flash('errors'), 'error', res);
                return this.redirectWithMessage(['Sign up successfully'] , 'success', '/' , res);
            })(req, res, next);
        } catch (error) {
            this.ajaxError('error in registerProccess method in loginCT' , 500 , error , res);
        }
    }

    async login(req , res , next) {
        try {
            let recaptcha = await this.verifyRecaptcha(req);
            if(!recaptcha) {
                req.flash('errors' , 'Recaptcha Error : Please Reload Page And Try Again');
                return this.back(req,res);
            } 
            let validation = await this.validationData(req);
            if(!validation) return this.back(req,res);
            this.loginProccess(req , res , next);
        } catch (error) {
            next(error);
        }
    }

    async loginProccess(req , res , next) {
        try {
            passport.authenticate('admin.login', (error, admin) => {
                if (error) return next(err);
                if(!admin) return this.back(req,res);
                req.logIn(admin, error => {
                    if (error) return next(error);
                    if (req.body.remember) {
                        admin.setRememberToken(res);
                    }
                  
                    return res.redirect('/admin/dashboard');
                })
              })(req, res, next);
        } catch (error) {
            next(error);
        }
    }
}