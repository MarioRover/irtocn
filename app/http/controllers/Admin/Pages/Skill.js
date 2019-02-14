const Controller = require('../../Controller');

module.exports = new class Skill extends Controller {
    async index(req , res , next) {
        try {
            let unseen = (await this.unseenMessage()).length;
            let skills = await this.models.Skills.find({}).populate({
                path : 'updatedBy',
                select : 'name'   
            }).exec();
            res.render('panel/pages/skills/skills' , {
                layout : 'panel/master',
                title : 'Skills of Shams',
                activeRow : 'pages',
                manifest : this.Manifest,
                unseen,
                skills
            });
        } catch (error) {
            this.error('error in index method in skillsCT' , 500 , next);  
        }
    }
    async add(req , res , next) {
        try {
            let validation = await this.validationData(req);
            if(!validation) return this.fieldMessage(req.flash('errors') , req.body.form , res);
            const {skillEN,skillCN,skillFA,skillPercent} = req.body;
            let contentObj = {skillEN,skillCN,skillFA,skillPercent,updatedBy : req.user._id};
            // Check Skill
            let skillDuplicate = {
                skillEN : await this.models.Skills.find({ skillEN: skillEN } , (error , skill) => {
                  if (error) return this.ajaxError('error in find dublicate skill  in skillCT' , 500 , error , res);
                  return skill;
                }),
                skillCN : await this.models.Skills.find({ skillCN: skillCN } , (error , skill) => {
                    if (error) return this.ajaxError('error in find dublicate skill  in skillCT' , 500 , error , res);
                    return skill;
                }),
                skillFA : await this.models.Skills.find({ skillFA: skillFA } , (error , skill) => {
                    if (error) return this.ajaxError('error in find dublicate skill  in skillCT' , 500 , error , res);
                    return skill;
                }),
            }
            let message = [];
            if (!this.isEmpty(skillDuplicate.skillEN)) message.push('This English Skill is already registered');
            if (!this.isEmpty(skillDuplicate.skillCN)) message.push('This China Skill is already registered');
            if (!this.isEmpty(skillDuplicate.skillFA)) message.push('This Persian Skill is already registered');
            if(!this.isEmpty(message)) {
                return this.fieldMessage(message , req.body.form , res);
            } else {
                // Add Skill
                let newSkill = new this.models.Skills({ ...contentObj });
                newSkill.save(err => {
                    if(err) return this.ajaxError('Error in save skill',500,err,res);
                    return this.swal(
                        "New Skill Added",
                        "Your new skill has been successfully added",
                        "success",
                        'OK',
                        '/admin/pages/skills',
                        res
                    );
                }) 
            }

            
        } catch (error) {
            this.error('error in update method in SkillCT' , 500 , next);  
        }
    }
    async editPage(req , res , next) {
        try {
            let unseen = (await this.unseenMessage()).length;
            let skill = await this.models.Skills.findById(req.params.skill).populate({
                path : 'updatedBy',
                select : 'name'   
            }).exec();
            if(this.isEmpty(skill)) this.error('error in find skill in skillsCT' , 404 , next);  
            res.render('panel/pages/skills/skill' , {
                layout : 'panel/master',
                title : `${skill.skillEN} Skill of Shams`,
                activeRow : 'pages',
                manifest : this.Manifest,
                unseen,
                skill
            });
        } catch (error) {
            this.error('error in editPage method in skillsCT' , 500 , next);  
        }
    }
    async edit(req , res , next) {
        try {
            let validation = await this.validationData(req);
            if(!validation) return this.fieldMessage(req.flash('errors') , req.body.form , res);
            const {skillEN,skillCN,skillFA,skillPercent,skillId} = req.body;
            let contentObj = {skillEN,skillCN,skillFA,skillPercent,updatedBy : req.user._id};
            let thisSkill = await this.models.Skills.findById(skillId);
            // Check Skill
            let skillDuplicate = {
                skillEN : await this.models.Skills.find({ skillEN: skillEN } , (error , skill) => {
                  if (error) return this.ajaxError('error in find dublicate skill  in skillCT' , 500 , error , res);
                  return skill;
                }),
                skillCN : await this.models.Skills.find({ skillCN: skillCN } , (error , skill) => {
                    if (error) return this.ajaxError('error in find dublicate skill  in skillCT' , 500 , error , res);
                    return skill;
                }),
                skillFA : await this.models.Skills.find({ skillFA: skillFA } , (error , skill) => {
                    if (error) return this.ajaxError('error in find dublicate skill  in skillCT' , 500 , error , res);
                    return skill;
                }),
            }
            let message = [];
            if (!this.isEmpty(skillDuplicate.skillEN)) {
                if (String(skillDuplicate.skillEN[0].skillEN) !== String(thisSkill.skillEN)) {
                    message.push('This English Skill is already registered');
                }
            } 
            if (!this.isEmpty(skillDuplicate.skillCN)) {
                if (String(skillDuplicate.skillCN[0].skillCN) !== String(thisSkill.skillCN)) {
                    message.push('This China Skill is already registered');
                }
            } 
            if (!this.isEmpty(skillDuplicate.skillFA)) {
                if (String(skillDuplicate.skillFA[0].skillFA) !== String(thisSkill.skillFA)) {
                    message.push('This Persian Skill is already registered');
                }
            } 

            if(!this.isEmpty(message)) {
                return this.fieldMessage(message , req.body.form , res);
            } else {
                // Update Skill
                await this.models.Skills.findByIdAndUpdate(skillId , {
                    $set: { ...contentObj,...contentObj }
                });
                return this.swal(
                    "Your Skill Updated",
                    "Your skill has been successfully updated",
                    "success",
                    'OK',
                    '/admin/pages/skills',
                    res
                );
            }

            
        } catch (error) {
            this.error('error in edit method in SkillCT' , 500 , next);  
        }
    }
    async delete(req , res , next) {
        try {
            let result = await this.isMongoId(req.body.skill);
            if(! result ) {
                return console.log('MongoId is not valid');
            }
            await this.models.Skills.findById(req.body.skill, (error, skill) => {
                if (error) return this.ajaxError('Error in find skill in delete method at SkillCT.js', 500, error, res);
                if (!skill) return this.ajaxError('not found skill in delete method at SkillCT.js', 404, error, res);
                skill.remove();
                return this.deleteObj(['Skill Successfully Deleted'], 'success', req.body.skill , 'row' , res);
            });
        } catch (error) {
            this.error('error in delete method in SkillCT' , 500 , next);  
        }
    }
} 