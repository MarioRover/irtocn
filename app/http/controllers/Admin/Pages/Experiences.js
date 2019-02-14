const Controller = require('../../Controller');
const fs = require('fs');

module.exports = new class Experiences extends Controller {
    async index(req , res , next) {
        try {
            let unseen = (await this.unseenMessage()).length;
            let experiences = await this.models.Experiences.find({}).populate({
                path : 'updatedBy',
                select : 'name'   
            }).exec();
            if(this.isEmpty(experiences)) {
                experiences = 'undefined';
            } else {
                experiences = experiences[0];
            }
            res.render('panel/pages/experiences' , {
                layout : 'panel/master',
                title : 'Experiences of Shams',
                activeRow : 'pages',
                manifest : this.Manifest,
                unseen,
                experiences
            })
        } catch (error) {
            this.error('error in index method in experiencesCT' , 500 , next);  
        }
    }
    async update(req , res , next) {
        try {
            let validation = await this.validationData(req);
            if(!validation) return this.fieldMessage(req.flash('errors') , req.body.form , res);
            const {
                headerEN,headerCN,headerFA,
                desc1EN,desc1CN,desc1FA,icon1,
                desc2EN,desc2CN,desc2FA,icon2,
                desc3EN,desc3CN,desc3FA,icon3,
                desc4EN,desc4CN,desc4FA,icon4,
                image
            } = req.body;
            let contentObj = {
                headerEN,headerCN,headerFA,
                desc1EN,desc1CN,desc1FA,icon1,
                desc2EN,desc2CN,desc2FA,icon2,
                desc3EN,desc3CN,desc3FA,icon3,
                desc4EN,desc4CN,desc4FA,icon4,
                updatedBy : req.user._id
            };
            let experiences = await this.models.Experiences.find({});

            if(this.isEmpty(experiences)) {

                if(!this.isEmpty(image.path)) {
                    contentObj['image'] = {
                        destination: image.destination,
                        originalname: image.originalname,
                        path: image.path
                    }
                }
                let newExperiences = new this.models.Experiences({ ...contentObj });
                newExperiences.save(err => {
                    if(err) return this.ajaxError('Error in save experiences',500,err,res);
                    return this.swal(
                        "Experiences Section Updated",
                        "Your Experiences section has been successfully updated",
                        "success",
                        'OK',
                        '/admin/dashboard',
                        res
                    );
                }) 
            } else {
                // Check Image
                if(!this.isEmpty(image.path)) {
                    if (experiences[0].image.originalname == image.originalname) {
                        await fs.unlinkSync(image.path)
                    } else {
                        if (await fs.existsSync(experiences[0].image.path)) await fs.unlinkSync(experiences[0].image.path);
                        contentObj['image'] = {
                            destination: image.destination,
                            originalname: image.originalname,
                            path: image.path
                        }
                    }

                }
                // Update DB
                let objId = experiences[0]._id;
                await this.models.Experiences.findByIdAndUpdate(objId , {
                    $set: { ...contentObj,...contentObj }
                });
                return this.swal(
                    "Experiences Section Updated",
                    "Your Experiences section has been successfully updated",
                    "success",
                    'OK',
                    '/admin/dashboard',
                    res
                );
            }

        } catch (error) {
            this.error('error in update method in ExperiencesCT' , 500 , next);  
        }
    }
    
} 