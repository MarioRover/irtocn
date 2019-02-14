const Controller = require('../../Controller');
const fs = require('fs');

module.exports = new class Contact extends Controller {
    async index(req , res , next) {
        try {
            let unseen = (await this.unseenMessage()).length;
            let testimonial = await this.models.Testimonial.find({}).populate({
                path : 'updatedBy',
                select : 'name'   
            }).exec();
            if(this.isEmpty(testimonial)) {
                testimonial = 'undefined';
            } else {
                testimonial = testimonial[0];
            }
            res.render('panel/pages/testimonial' , {
                layout : 'panel/master',
                title : 'Contact of Shams',
                activeRow : 'pages',
                manifest : this.Manifest,
                unseen,
                testimonial
            })
        } catch (error) {
            this.error('error in index method in TestimonialCT' , 500 , next);  
        }
    }
    async update(req , res , next) {
        try {
            let validation = await this.validationData(req);
            if(!validation) return this.fieldMessage(req.flash('errors') , req.body.form , res);
            const {headerEN,headerCN,headerFA,descEN,descCN,descFA,logo,image} = req.body;
            let contentObj = {headerEN,headerCN,headerFA,descEN,descCN,descFA,logo,updatedBy : req.user._id};
            let testimonial = await this.models.Testimonial.find({});

            if(this.isEmpty(testimonial)) {

                if(!this.isEmpty(image.path)) {
                    contentObj['image'] = {
                        destination: image.destination,
                        originalname: image.originalname,
                        path: image.path
                    }
                }
                let newTestimonial = new this.models.Testimonial({ ...contentObj });
                newTestimonial.save(err => {
                    if(err) return this.ajaxError('Error in save testimonial',500,err,res);
                    return this.swal(
                        "Testimonial Section Updated",
                        "Your Testimonial section has been successfully updated",
                        "success",
                        'OK',
                        '/admin/dashboard',
                        res
                    );
                }) 
            } else {
                // Check Image
                if(!this.isEmpty(image.path)) {
                    if (testimonial[0].image.originalname == image.originalname) {
                        await fs.unlinkSync(image.path)
                    } else {
                        if (await fs.existsSync(testimonial[0].image.path)) await fs.unlinkSync(testimonial[0].image.path);
                        contentObj['image'] = {
                            destination: image.destination,
                            originalname: image.originalname,
                            path: image.path
                        }
                    }

                }
                // Update DB
                let objId = testimonial[0]._id;
                await this.models.Testimonial.findByIdAndUpdate(objId , {
                    $set: { ...contentObj,...contentObj }
                });
                return this.swal(
                    "Testimonial Section Updated",
                    "Your Testimonial section has been successfully updated",
                    "success",
                    'OK',
                    '/admin/dashboard',
                    res
                );
            }

        } catch (error) {
            this.error('error in update method in TestimonialCT' , 500 , next);  
        }
    }
    
} 