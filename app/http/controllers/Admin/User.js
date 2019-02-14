const Controller = require('../Controller');
const fs = require('fs');

module.exports = new class User extends Controller {
    async profile(req , res , next) {
        try {
            let unseen = (await this.unseenMessage()).length;
            res.render('panel/user/profile' , {
                layout : 'panel/master',
                title : `${req.user.name}`,
                activeRow : 'dashboard',
                manifest : this.Manifest,
                unseen
            })
        } catch (error) {
            this.error('error in profile method in UserCT' , 500 , next);
        }
    }
    async updateProfile(req , res , next) {
        try {
            let validation = await this.validationData(req);
            if(!validation) return this.fieldMessage(req.flash('errors') , req.body.form , res);
            if(req.body.password !== req.body.CPassword) return this.fieldMessage(['Passwords do not match'] , req.body.form , res);

            const {name,phone,password,image} = req.body;
            let contentObj = {name,phone};
            // Reset Password
            if(!this.isEmpty(password)) req.user.updatePassword(password);
            // 
            let objId = req.user._id;
            let admin = req.user;
            if(!this.isEmpty(image.path)) {
                if (admin.profileImage.originalname == image.originalname) {
                    await fs.unlinkSync(image.path)
                } else {
                    if (await fs.existsSync(admin.profileImage.path)) await fs.unlinkSync(admin.profileImage.path);
                    this.imageResize(image.path);
                    contentObj['profileImage'] = {
                        destination: image.destination,
                        originalname: image.originalname,
                        path: image.path
                    }
                }
            }
            await this.models.Admins.findByIdAndUpdate(objId , {
                $set: { ...contentObj,...contentObj }
            });
            return this.swal(
                'Update was done',
                'User profile successfully updated',
                'success',
                'OK',
                '/admin/dashboard',
                res
            );
        } catch (error) {
            this.ajaxError('error in updateProfile method in UserCT' , 500 , error , res);
        }
    }
    async message(req , res , next) {
        try {
            let unseen = (await this.unseenMessage()).length;
            res.render('panel/user/message' , {
                layout : 'panel/master',
                title : 'User Message',
                activeRow : 'dashboard',
                manifest : this.Manifest,
                unseen
            })
        } catch (error) {
            this.error('error in message method in UserCT' , 500 , next);
        }
    }
}