const Controller = require('../../Controller');
const fs = require('fs');

module.exports = new class About extends Controller {
    async index(req , res , next) {
        try {
            let unseen = (await this.unseenMessage()).length;
            let about = await this.models.About.find({}).populate({
                path : 'updatedBy',
                select : 'name'   
            }).exec();
            if(this.isEmpty(about)) {
                about = 'undefined';
            } else {
                about = about[0];
            }
            res.render('panel/pages/about' , {
                layout : 'panel/master',
                title : 'About of Shams',
                activeRow : 'pages',
                manifest : this.Manifest,
                unseen,
                about
            })
        } catch (error) {
            this.error('error in index method in AboutCT' , 500 , next);  
        }
    }
    async update(req , res , next) {
        try {
            const {descEN,descCN,descFA,image} = req.body;
            let contentObj = {descEN,descCN,descFA,updatedBy : req.user._id};

            let about = await this.models.About.find({});

            if(this.isEmpty(about)) {

                if(!this.isEmpty(image.path)) {
                    contentObj['image'] = {
                        destination: image.destination,
                        originalname: image.originalname,
                        path: image.path
                    }
                }
                let newEAbout = new this.models.About({ ...contentObj });
                newEAbout.save(err => {
                    if(err) return this.ajaxError('Error in save about',500,err,res);
                    return this.swal(
                        "About Section Updated",
                        "Your About section has been successfully updated",
                        "success",
                        'OK',
                        '/admin/dashboard',
                        res
                    );
                }) 
            } else {
                // Check Image
                if(!this.isEmpty(image.path)) {
                    if (about[0].image.originalname == image.originalname) {
                        await fs.unlinkSync(image.path)
                    } else {
                        if (await fs.existsSync(about[0].image.path)) await fs.unlinkSync(about[0].image.path);
                        contentObj['image'] = {
                            destination: image.destination,
                            originalname: image.originalname,
                            path: image.path
                        }
                    }

                }
                // Update DB
                let objId = about[0]._id;
                await this.models.About.findByIdAndUpdate(objId , {
                    $set: { ...contentObj,...contentObj }
                });
                return this.swal(
                    "About Section Updated",
                    "Your About section has been successfully updated",
                    "success",
                    'OK',
                    '/admin/dashboard',
                    res
                );
            }

        } catch (error) {
            this.error('error in update method in AboutCT' , 500 , next);  
        }
    }
} 