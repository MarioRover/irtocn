const Controller = require('../../Controller');

module.exports = new class Info extends Controller {
    async index(req , res , next) {
        try {
            let unseen = (await this.unseenMessage()).length;
            let info = await this.models.Info.find({}).populate({
                path : 'updatedBy',
                select : 'name'   
            }).exec();
            if(this.isEmpty(info)) {
                info = 'undefined';
            } else {
                info = info[0];
            }
            res.render('panel/setting/info' , {
                layout : 'panel/master',
                title : 'Information of Shams',
                activeRow : 'Setting',
                manifest : this.Manifest,
                unseen,
                info
            })
        } catch (error) {
            console.log(error);
            this.error('error in index method in InfoCT' , 500 , next);
        }
    }
    async set(req , res , next) {
        try {
            let contentObj = {
                title : req.body.title,
                siteName : req.body.siteName,
                updatedBy: req.user._id
            };
            let info = await this.models.Info.find({});
            if(this.isEmpty(info)) {
                let newInfo = new this.models.Info({ ...contentObj });
                newInfo.save(err => {
                    if(err) return this.ajaxError('Error in save info',500,err,res);
                    return this.swal(
                        "Information of Website Updated",
                        "Information of Website has been successfully updated",
                        "success",
                        'OK',
                        '/admin/dashboard',
                        res
                    );
                }); 
            } else {
                let objId = info[0]._id;
                await this.models.Info.findByIdAndUpdate(objId , {
                    $set: { ...contentObj,...contentObj }
                });
                return this.swal(
                    "Information of Website Updated",
                    "Information of Website has been successfully updated",
                    "success",
                    'OK',
                    '/admin/dashboard',
                    res
                );
            }
        } catch (error) {
            this.ajaxError('error in set method in InfoCT',500,error,res);
        }
    }
}