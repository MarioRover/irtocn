const Controller = require('../../Controller');
const fs = require('fs');

module.exports = new class Contact extends Controller {
    async index(req , res , next) {
        try {
            let unseen = (await this.unseenMessage()).length;
            let contact = await this.models.Contact.find({}).populate({
                path : 'updatedBy',
                select : 'name'   
            }).exec();
            if(this.isEmpty(contact)) {
                contact = 'undefined';
            } else {
                contact = contact[0];
            }
            res.render('panel/pages/contact' , {
                layout : 'panel/master',
                title : 'Contact of Shams',
                activeRow : 'pages',
                manifest : this.Manifest,
                unseen,
                contact
            })
        } catch (error) {
            this.error('error in index method in ContactCT' , 500 , next);  
        }
    }
    async update(req , res , next) {
        try {
            const {descEN,descCN,descFA,headerEN,headerCN,headerFA,image} = req.body;
            let contentObj = {descEN,descCN,descFA,headerEN,headerCN,headerFA,updatedBy : req.user._id};
            let contact = await this.models.Contact.find({});
            if(this.isEmpty(contact)) {

                if(!this.isEmpty(image.path)) {
                    contentObj['image'] = {
                        destination: image.destination,
                        originalname: image.originalname,
                        path: image.path
                    }
                }

                let newContact = new this.models.Contact({ ...contentObj });
                newContact.save(err => {
                    if(err) return this.ajaxError('Error in save contact',500,err,res);
                    return this.swal(
                        "Contact Section Updated",
                        "Your contact section has been successfully updated",
                        "success",
                        'OK',
                        '/admin/dashboard',
                        res
                    );
                }) 
            } else {
                if(!this.isEmpty(image.path)) {

                    if (contact[0].image.originalname == image.originalname) {
                        await fs.unlinkSync(image.path)
                    } else {
                        if (await fs.existsSync(contact[0].image.path)) await fs.unlinkSync(contact[0].image.path);
                        contentObj['image'] = {
                            destination: image.destination,
                            originalname: image.originalname,
                            path: image.path
                        }
                    }

                }    
                let objId = contact[0]._id;
                await this.models.Contact.findByIdAndUpdate(objId , {
                    $set: { ...contentObj,...contentObj }
                });
                return this.swal(
                    "Contact Section Updated",
                    "Your contact section has been successfully updated",
                    "success",
                    'OK',
                    '/admin/dashboard',
                    res
                );
            }
        } catch (error) {
            this.error('error in update method in ContactCT' , 500 , next);  
        }
    }
    
} 