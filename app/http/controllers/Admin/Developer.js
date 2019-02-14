const Controller = require('../Controller');

module.exports = new class Developer extends Controller {
    async index(req , res , next) {
        try {
            let unseen = (await this.unseenMessage()).length;
            let dev = await this.models.Dev.find({}).populate({
                path : 'updatedBy',
                select : 'name'   
            }).exec();
            if(this.isEmpty(dev)) {
                dev = 'undefined';
            } else {
                dev = dev[0];
            }
            res.render('panel/developer' , {
                layout : 'panel/master',
                title : 'Developer Tools of Shams',
                activeRow : 'developer',
                manifest : this.Manifest,
                unseen,
                dev
            })
        } catch (error) {
            this.error('error in index method in DeveloperCT' , 500 , next);
        }
    }
    async set(req , res , next) {
        try {
            let contentObj = {
                debug : req.body.debug,
                repair : req.body.repair,
                updatedBy: req.user._id
            };
            let Dev = await this.models.Dev.find({});
            if(this.isEmpty(Dev)) {
                let newDev = new this.models.Dev({ ...contentObj });
                newDev.save(err => {
                    if(err) return this.ajaxError('Error in save Dev',500,err,res);
                    return this.swal(
                        "Developer Options Updated",
                        `Developer Options has been successfully updated`,
                        "success",
                        'OK',
                        '/admin/dashboard',
                        res
                    );
                }); 
            } else {
                let objId = Dev[0]._id;
                await this.models.Dev.findByIdAndUpdate(objId , {
                    $set: { ...contentObj,...contentObj }
                });
                return this.swal(
                    "Developer Options Updated",
                    `Developer Options has been successfully updated`,
                    "success",
                    'OK',
                    '/admin/dashboard',
                    res
                );
            }
        } catch (error) {
            this.ajaxError('error in set method in DeveloperCT',500,error,res);
        }
    }
}