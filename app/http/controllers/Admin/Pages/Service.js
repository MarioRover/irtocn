const Controller = require('../../Controller');
const fs = require('fs');

module.exports = new class Experiences extends Controller {
    async index(req , res , next) {
        try {
            let unseen = (await this.unseenMessage()).length;
            let service = await this.models.Service.find({}).populate({
                path : 'updatedBy',
                select : 'name'   
            }).exec();
            if(this.isEmpty(service)) {
                service = 'undefined';
            } else {
                service = service[0];
            }
            res.render('panel/pages/service' , {
                layout : 'panel/master',
                title : 'Service of Shams',
                activeRow : 'pages',
                manifest : this.Manifest,
                unseen,
                service
            })
        } catch (error) {
            this.error('error in index method in serviceCT' , 500 , next);  
        }
    }
    async update(req , res , next) {
        try {
            let validation = await this.validationData(req);
            if(!validation) return this.fieldMessage(req.flash('errors') , req.body.form , res);
            const {
                serviceHeader1EN,desc1EN,serviceHeader1CN,desc1CN,serviceHeader1FA,desc1FA,icon1,
                serviceHeader2EN,desc2EN,serviceHeader2CN,desc2CN,serviceHeader2FA,desc2FA,icon2,
                serviceHeader3EN,desc3EN,serviceHeader3CN,desc3CN,serviceHeader3FA,desc3FA,icon3,
                serviceHeader4EN,desc4EN,serviceHeader4CN,desc4CN,serviceHeader4FA,desc4FA,icon4,
            } = req.body;
            let contentObj = {
                serviceHeader1EN,desc1EN,serviceHeader1CN,desc1CN,serviceHeader1FA,desc1FA,icon1,
                serviceHeader2EN,desc2EN,serviceHeader2CN,desc2CN,serviceHeader2FA,desc2FA,icon2,
                serviceHeader3EN,desc3EN,serviceHeader3CN,desc3CN,serviceHeader3FA,desc3FA,icon3,
                serviceHeader4EN,desc4EN,serviceHeader4CN,desc4CN,serviceHeader4FA,desc4FA,icon4,
                updatedBy : req.user._id
            };
            let services = await this.models.Service.find({});

            if(this.isEmpty(services)) {

                let newServices = new this.models.Service({ ...contentObj });
                newServices.save(err => {
                    if(err) return this.ajaxError('Error in save services',500,err,res);
                    return this.swal(
                        "Services Section Updated",
                        "Your Services section has been successfully updated",
                        "success",
                        'OK',
                        '/admin/dashboard',
                        res
                    );
                }) 
            } else {
                // Update DB
                let objId = services[0]._id;
                await this.models.Service.findByIdAndUpdate(objId , {
                    $set: { ...contentObj,...contentObj }
                });
                return this.swal(
                    "Services Section Updated",
                    "Your Service section has been successfully updated",
                    "success",
                    'OK',
                    '/admin/dashboard',
                    res
                );
            }

        } catch (error) {
            this.error('error in update method in ServiceCT' , 500 , next);  
        }
    }
    
} 