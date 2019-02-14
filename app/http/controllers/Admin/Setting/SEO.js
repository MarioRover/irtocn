const Controller = require('../../Controller');

module.exports = new class SEO extends Controller {
    async index(req , res , next) {
        try {
            let unseen = (await this.unseenMessage()).length;
            let homeSeo = await this.models.SEO.find({name : 'Home'}).populate({
                path : 'updatedBy',
                select : 'name'   
            }).exec();
            if(this.isEmpty(homeSeo)) {
                homeSeo = 'undefined';
            } else {
                homeSeo = homeSeo[0];
            }
            res.render('panel/setting/seo' , {
                layout : 'panel/master',
                title : 'SEO of Shams',
                activeRow : 'Setting',
                manifest : this.Manifest,
                unseen,
                homeSeo
            })
        } catch (error) {
            this.error('error in index method in SEOCT' , 500 , next);
        }
    }
    async set(req , res , next) {
        try {
            let contentObj = {
                name : req.body.name,
                descTags : req.body.descTags,
                keyTags  : req.body.keyTags,
                updatedBy: req.user._id
            };
            let homeSeo = await this.models.SEO.find({name : req.body.name});
            if(this.isEmpty(homeSeo)) {
                let newSeo = new this.models.SEO({ ...contentObj });
                newSeo.save(err => {
                    if(err) return this.ajaxError('Error in save tags',500,err,res);
                    return this.swal(
                        "SEO Tags Updated",
                        `SEO Tags of ${req.body.name} has been successfully updated`,
                        "success",
                        'OK',
                        '/admin/dashboard',
                        res
                    );
                }); 
            } else {
                let objId = homeSeo[0]._id;
                await this.models.SEO.findByIdAndUpdate(objId , {
                    $set: { ...contentObj,...contentObj }
                });
                return this.swal(
                    "SEO Tags Updated",
                    `SEO Tags of ${homeSeo[0].name} has been successfully updated`,
                    "success",
                    'OK',
                    '/admin/dashboard',
                    res
                );
            }
        } catch (error) {
            this.ajaxError('error in set method in SEOCT',500,error,res);
        }
    }
}