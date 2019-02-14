const Middleware = require('./Middleware');
const i18n = require('i18n');
const Controller = require('../controllers/Controller');
let newController = new Controller();

module.exports = new class SetLocale extends Middleware {
    handle(req , res , next) {
        let lang = req.params.lang;
        if(i18n.getLocales().includes(lang)) {
            res.cookie('lang' , lang , {
                maxAge : 1000 * 60 * 60 * 24 * 90 , signed : true
            });
            req.setLocale(lang);
            next();
        } else {
            req.setLocale(i18n.getLocale());
            newController.error('Lang not found',404,next);
        }
    }
}