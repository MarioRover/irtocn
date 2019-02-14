const Controller = require('../../Controller');

module.exports = new class Social extends Controller {
    async index(req , res , next) {
        try {
            let unseen = (await this.unseenMessage()).length;
            let socials = await this.models.Social.find({});
            res.render('panel/setting/social' , {
                layout : 'panel/master',
                title : 'Social of Shams',
                activeRow : 'Setting',
                manifest : this.Manifest,
                unseen,
                socials
            })
        } catch (error) {
            this.error('error in index method in SocialCT' , 500 , next);
        }
    }
    async new(req , res , next) {
        try {
            let validation = await this.validationData(req);
            if(!validation) return this.fieldMessage(req.flash('errors') , req.body.form , res);
            const {name,icon,link} = req.body;
            let contentObj = {name,icon,link,updatedBy : req.user._id};
            let socialDuplicate = {
                name : await this.models.Social.find({ name: name } , (error , social) => {
                  if (error) return this.ajaxError('error in find dublicate social  in SocialCT' , 500 , error , res);
                  return social;
                }),
                link : await this.models.Social.find({ link: link } , (error , social) => {
                    if (error) return this.ajaxError('error in find dublicate social  in SocialCT' , 500 , error , res);
                    return social;
                }),
            }
            let message = [];
            if (!this.isEmpty(socialDuplicate.name)) {
                message.push('This social name is already registered');
            } 
            if (!this.isEmpty(socialDuplicate.link)) {
                message.push('This social link is already registered');
            } 
            if(!this.isEmpty(message)) {
                return this.fieldMessage(message , req.body.form , res);
            } else {
                let newSocial = new this.models.Social({ ...contentObj });
                newSocial.save(err => {
                    if(err) return this.ajaxError('Error in save social',500,err,res);
                    return this.swal(
                        "New Socail Added",
                        "Your new social has been successfully added",
                        "success",
                        'OK',
                        '/admin/setting/social',
                        res
                    );
                }) 
            }
        } catch (error) {
            this.ajaxError('error in new method in SocialCT' , 500 , error , res);
        }
    }
    async editPage(req , res , next) {
        try {
            let unseen = (await this.unseenMessage()).length;
            let social = await this.models.Social.findById(req.params.social).populate({
                path : 'updatedBy',
                select : 'name'   
            }).exec();
            if(this.isEmpty(social)) this.error('error in find social in SocialCT' , 404 , next);  
            res.render('panel/setting/social/edit' , {
                layout : 'panel/master',
                title : `${social.name} Social of Shams`,
                activeRow : 'Setting',
                manifest : this.Manifest,
                unseen,
                social
            });
        } catch (error) {
            this.error('error in editPage method in SocialCT' , 500 , next);  
        }
    }
    async edit(req , res , next) {
        try {
            let validation = await this.validationData(req);
            if(!validation) return this.fieldMessage(req.flash('errors') , req.body.form , res);
            const {name,icon,link,socialId} = req.body;
            let contentObj = {name,icon,link,updatedBy : req.user._id};

            let thisSocial = await this.models.Social.findById(socialId);
            // Check Social
            let socialDuplicate = {
                name : await this.models.Social.find({ name: name } , (error , social) => {
                  if (error) return this.ajaxError('error in find dublicate social  in SocialCT' , 500 , error , res);
                  return social;
                }),
                link : await this.models.Social.find({ link: link } , (error , social) => {
                    if (error) return this.ajaxError('error in find dublicate social  in SocialCT' , 500 , error , res);
                    return social;
                }),
            }
            let message = [];
            if (!this.isEmpty(socialDuplicate.name)) {
                if (String(socialDuplicate.name[0].name) !== String(thisSocial.name)) {
                    message.push('This social name is already registered');
                }
            } 
            if (!this.isEmpty(socialDuplicate.link)) {
                if (String(socialDuplicate.link[0].link) !== String(thisSocial.link)) {
                    message.push('This social link is already registered');
                }
            } 

            if(!this.isEmpty(message)) {
                return this.fieldMessage(message , req.body.form , res);
            } else {
                // Update Skill
                await this.models.Social.findByIdAndUpdate(socialId , {
                    $set: { ...contentObj,...contentObj }
                });
                return this.swal(
                    "Your Social Updated",
                    "Your Social has been successfully updated",
                    "success",
                    'OK',
                    '/admin/pages/skills',
                    res
                );
            }

            
        } catch (error) {
            this.ajaxError('error in edit method in SocialCT' , 500 , error , res);
        }
    }
    async delete(req , res , next) {
        try {
            let result = await this.isMongoId(req.body.social);
            if(! result ) {
                return console.log('MongoId is not valid');
            }
            await this.models.Social.findById(req.body.social, (error, social) => {
                if (error) return this.ajaxError('Error in find social in delete method at SocialCT.js', 500, error, res);
                if (!social) return this.ajaxError('not found social in delete method at SocialCT', 404, error, res);
                social.remove();
                return this.deleteObj(['Social Successfully Deleted'], 'success', req.body.social , 'row' , res);
            });
        } catch (error) {
            this.ajaxError('error in delete method in SocialCT' , 500 , error , res);
        }
    }
}