const Controller = require('../../Controller');
const fs = require('fs');

module.exports = new class Home extends Controller {
    async index(req , res , next) {
        try {
            let unseen = (await this.unseenMessage()).length;
            let home = await this.models.Home.find({}).populate({
                path : 'updatedBy',
                select : 'name'   
            }).exec();
            if(this.isEmpty(home)) {
                home = 'undefined';
            } else {
                home = home[0];
            }
            res.render('panel/pages/home' , {
                layout : 'panel/master',
                title : 'Home of Shams',
                activeRow : 'pages',
                manifest : this.Manifest,
                unseen,
                home
            })
        } catch (error) {
            this.error('error in index method in homeCT' , 500 , next);  
        }
    }
    async update(req , res , next) {
        try {
            const {descEN,descCN,descFA,image} = req.body;
            let contentObj = {descEN,descCN,descFA,updatedBy : req.user._id};
            let home = await this.models.Home.find({});

            if(this.isEmpty(home)) {

                if(!this.isEmpty(image.path)) {
                    contentObj['image'] = {
                        destination: image.destination,
                        originalname: image.originalname,
                        path: image.path
                    }
                }
                let newHome = new this.models.Home({ ...contentObj });
                newHome.save(err => {
                    if(err) return this.ajaxError('Error in save home',500,err,res);
                    return this.swal(
                        "Home Section Updated",
                        "Your Home section has been successfully updated",
                        "success",
                        'OK',
                        '/admin/dashboard',
                        res
                    );
                }) 
            } else {
                // Check Image
                if(!this.isEmpty(image.path)) {
                    if (home[0].image.originalname == image.originalname) {
                        await fs.unlinkSync(image.path)
                    } else {
                        if (await fs.existsSync(home[0].image.path)) await fs.unlinkSync(home[0].image.path);
                        contentObj['image'] = {
                            destination: image.destination,
                            originalname: image.originalname,
                            path: image.path
                        }
                    }

                }
                // Update DB
                let objId = home[0]._id;
                await this.models.Home.findByIdAndUpdate(objId , {
                    $set: { ...contentObj,...contentObj }
                });
                return this.swal(
                    "Home Section Updated",
                    "Your Home section has been successfully updated",
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