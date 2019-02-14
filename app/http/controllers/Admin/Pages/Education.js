const Controller = require('../../Controller');
const fs = require('fs');

module.exports = new class Education extends Controller {
    async index(req , res , next) {
        try {
            let unseen = (await this.unseenMessage()).length;
            let education = await this.models.Education.find({}).populate({
                path : 'updatedBy',
                select : 'name'   
            }).exec();
            if(this.isEmpty(education)) {
                education = 'undefined';
            } else {
                education = education[0];
            }
            res.render('panel/pages/education' , {
                layout : 'panel/master',
                title : 'Education of Shams',
                activeRow : 'pages',
                manifest : this.Manifest,
                unseen,
                education
            })
        } catch (error) {
            this.error('error in index method in EducationCT' , 500 , next);  
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
            let education = await this.models.Education.find({});

            if(this.isEmpty(education)) {

                if(!this.isEmpty(image.path)) {
                    contentObj['image'] = {
                        destination: image.destination,
                        originalname: image.originalname,
                        path: image.path
                    }
                }
                let newEducation = new this.models.Education({ ...contentObj });
                newEducation.save(err => {
                    if(err) return this.ajaxError('Error in save education',500,err,res);
                    return this.swal(
                        "Education Section Updated",
                        "Your Education section has been successfully updated",
                        "success",
                        'OK',
                        '/admin/dashboard',
                        res
                    );
                }) 
            } else {
                // Check Image
                if(!this.isEmpty(image.path)) {
                    if (education[0].image.originalname == image.originalname) {
                        await fs.unlinkSync(image.path)
                    } else {
                        if (await fs.existsSync(education[0].image.path)) await fs.unlinkSync(education[0].image.path);
                        contentObj['image'] = {
                            destination: image.destination,
                            originalname: image.originalname,
                            path: image.path
                        }
                    }

                }
                // Update DB
                let objId = education[0]._id;
                await this.models.Education.findByIdAndUpdate(objId , {
                    $set: { ...contentObj,...contentObj }
                });
                return this.swal(
                    "Education Section Updated",
                    "Your Education section has been successfully updated",
                    "success",
                    'OK',
                    '/admin/dashboard',
                    res
                );
            }

        } catch (error) {
            this.error('error in update method in EducationCT' , 500 , next);  
        }
    }
} 