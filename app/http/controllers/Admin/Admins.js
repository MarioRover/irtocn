const Controller = require('../Controller');
const fs = require('fs');

module.exports = new class Admins extends Controller {
    async index(req , res , next) {
        try {
            let unseen = (await this.unseenMessage()).length;
            let admins = await this.models.Admins.find({developer : false});
            res.render('panel/admins' , {
                layout : 'panel/master',
                title : 'Admins of Shams',
                activeRow : 'Admins',
                manifest : this.Manifest,
                unseen,
                admins
            })
        } catch (error) {
            this.error('error in index method in AdminsCT' , 500 , next);
        }
    }
    async newAdminPage(req , res , next) {
        try {
            let unseen = (await this.unseenMessage()).length;
            res.render('panel/admins/new' , {
                layout : 'panel/master',
                title : 'Admins of Shams',
                activeRow : 'Admins',
                manifest : this.Manifest,
                unseen
            })
        } catch (error) {
            this.error('error in newAdminPage method in AdminsCT' , 500 , next);
        }
    }
    async newAdmin(req , res , next) {
        try {
            let validation = await this.validationData(req);
            if(!validation) return this.fieldMessage(req.flash('errors') , req.body.form , res);
            if(req.body.password !== req.body.CPassword) return this.fieldMessage(['Passwords do not match'] , req.body.form , res);
            const {name,email,password,superadmin,image} = req.body;
            let contentObj = {name,email,password,superadmin};

            if(!this.isEmpty(image.path)) {
                this.imageResize(image.path);
                contentObj['profileImage'] = {
                    destination: image.destination,
                    originalname: image.originalname,
                    path: image.path
                }
            }

            let adminDuplicate = {
                oldAdmin : await this.models.Admins.find({ email: email } , (error , admin) => {
                  if (error) return this.ajaxError('error in find dublicate admin in AdminsCT' , 500 , error , res);
                  return admin;
                }),
            }
            let message = [];
            if (!this.isEmpty(adminDuplicate.oldAdmin)) message.push('This Admin is already registered');
            if(!this.isEmpty(message)) {
                return this.fieldMessage(message , req.body.form , res);
            } else {
                let newAdmin = new this.models.Admins({ ...contentObj });
                newAdmin.save(err => {
                    if(err) return this.ajaxError('Error in save admin',500,err,res);
                    return this.swal(
                        "New Admin Created",
                        "New Admin of Shmas has been successfully Created",
                        "success",
                        'OK',
                        '/admin/admins',
                        res
                    );
                });
            }
        } catch (error) {
            this.ajaxError('error in newAdmin method in AdminsCT' , 500 , error , res);
        }
    }
    async updateAdminPage(req , res , next) {
        try {
            let unseen = (await this.unseenMessage()).length;
            let admin = await this.models.Admins.findById(req.params.admin).populate({
                path : 'updatedBy',
                select : 'name'   
            }).exec();
            res.render('panel/admins/update' , {
                layout : 'panel/master',
                title : `${admin.name}`,
                activeRow : 'Admins',
                manifest : this.Manifest,
                unseen,
                admin
            })
        } catch (error) {
            this.error('error in updateAdminPage method in AdminsCT' , 500 , next);
        }
    }
    async updateAdmin(req , res , next) {
        try {
            let result = await this.isMongoId(req.body.adminId);
            if(! result ) {
                return console.log('MongoId is not valid');
            }
            let validation = await this.validationData(req);
            if(!validation) return this.fieldMessage(req.flash('errors') , req.body.form , res);
            if(req.body.password !== req.body.CPassword) return this.fieldMessage(['Passwords do not match'] , req.body.form , res);
            const {name,email,password,superadmin,adminId,image} = req.body;
            let contentObj = {name,email,superadmin};
            // Check Admin Duplicate
            let thisAdmin = await this.models.Admins.findById(adminId);
            let adminDuplicate = {
                oldAdmin : await this.models.Admins.find({ email: email } , (error , admin) => {
                  if (error) return this.ajaxError('error in find dublicate admin in AdminsCT' , 500 , error , res);
                  return admin;
                }),
            }
            let message = [];
            if (!this.isEmpty(adminDuplicate.oldAdmin)) {
                if (String(adminDuplicate.oldAdmin[0].email) !== String(thisAdmin.email)) {
                    message.push('This Admin is already registered');
                }
            } 
            if(!this.isEmpty(message)) {
                return this.fieldMessage(message , req.body.form , res);
            } else {
                // Reset Password
                if(!this.isEmpty(password)) thisAdmin.updatePassword(password);
                // 
                // Get Image
                if(!this.isEmpty(image.path)) {
                    if (thisAdmin.profileImage.originalname == image.originalname) {
                        await fs.unlinkSync(image.path)
                    } else {
                        if (await fs.existsSync(thisAdmin.profileImage.path)) await fs.unlinkSync(thisAdmin.profileImage.path);
                        this.imageResize(image.path);
                        contentObj['profileImage'] = {
                            destination: image.destination,
                            originalname: image.originalname,
                            path: image.path
                        }
                    }
                }
                // Update Admin
                await this.models.Admins.findByIdAndUpdate(adminId , {
                    $set: { ...contentObj,...contentObj }
                });
                return this.swal(
                    "Admin information Updated",
                    "Admin Information has been successfully updated",
                    "success",
                    'OK',
                    '/admin/admins',
                    res
                );
            }    

        } catch (error) {
            this.error('error in updateAdmin method in AdminsCT' , 500 , next);
        }
    }
    async delete(req , res , next) {
        try {
            let result = await this.isMongoId(req.body.admin);
            if(! result ) {
                return console.log('MongoId is not valid');
            }
            await this.models.Admins.findById(req.body.admin, (error, admin) => {
                if (error) return this.ajaxError('Error in find admin in delete method at SkillCT.js', 500, error, res);
                if (!admin) return this.ajaxError('not found skill in delete method at SkillCT.js', 404, error, res);
                fs.unlinkSync(admin.profileImage.path);
                admin.remove();
                return this.deleteObj(['Admin Successfully Deleted'], 'success', req.body.admin , 'row' , res);
            });
        } catch (error) {
            this.error('error in delete method in SkillCT' , 500 , next);  
        }
    }
}