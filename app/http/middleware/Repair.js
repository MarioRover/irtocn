const Middleware = require('./Middleware');
const Dev = require('app/models/Dev');
const isEmpty = require('is-empty');

module.exports = new class Repair extends Middleware {

    async handle(req , res , next) {
        let dev = await Dev.find({});
        if(isEmpty(dev)) {
            dev = 'undefined'
        } else {
            dev = dev[0]
        }
        if(dev != 'undefined') {
            if(dev.repair) {
                res.render('error/repair' , {
                    title : 'Shams',
                    homeSeo : 'Repair'
                });
            } else {
                next();
            }
        } else {
            next();
        }
    }
}