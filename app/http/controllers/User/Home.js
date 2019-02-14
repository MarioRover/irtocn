const Controller = require('../Controller');

module.exports = new class Home extends Controller {
    async index(req , res , next) {
        try {
            let contact = await this.models.Contact.find({});
            let socials = await this.models.Social.find({});
            let testimonial = await this.models.Testimonial.find({});
            let experiences = await this.models.Experiences.find({});
            let education = await this.models.Education.find({});
            let home = await this.models.Home.find({});
            let about = await this.models.About.find({});
            let service = await this.models.Service.find({});
            let skills = await this.models.Skills.find({});
            let homeSeo = await this.models.SEO.find({name : 'Home'});
            let info = await this.models.Info.find({});
            if(this.isEmpty(info)) {
                info = 'undefined';
            } else {
                info = info[0];
            }
            if(this.isEmpty(homeSeo)) {
                homeSeo = 'undefined';
            } else {
                homeSeo = homeSeo[0];
            }
            if(this.isEmpty(contact)) {
                contact = 'undefined';
            } else {
                contact = contact[0];
            }
            if(this.isEmpty(socials)) {
                socials = 'undefined';
            }
            if(this.isEmpty(testimonial)) {
                testimonial = 'undefined';
            } else {
                testimonial = testimonial[0];
            }
            if(this.isEmpty(experiences)) {
                experiences = 'undefined';
            } else {
                experiences = experiences[0];
            }
            if(this.isEmpty(education)) {
                education = 'undefined';
            } else {
                education = education[0];
            }
            if(this.isEmpty(home)) {
                home = 'undefined';
            } else {
                home = home[0];
            }
            if(this.isEmpty(about)) {
                about = 'undefined';
            } else {
                about = about[0];
            }
            if(this.isEmpty(service)) {
                service = 'undefined';
            } else {
                service = service[0];
            }
            res.render('home/index' , {
                manifest : this.Manifest,
                SITEKEY : process.env.RECAPTCHA_SITEKEY,
                title : info.title,
                socials,
                contact,
                testimonial,
                experiences,
                education,
                home,
                about,
                service,
                skills,
                homeSeo,
                info
            });
        } catch (error) {
            this.error('error in index method in Home' , 500 , next);
        }
    }
    async message(req , res , next) {
        try {
            let lang = req.getLocale();
            let recaptcha = await this.verifyRecaptcha(req);
            if(!recaptcha) {
                if (lang == 'en') return this.fieldMessage(['Recaptcha Error : Please Reload Page And Try Again'] , req.body.form , res);
                if (lang == 'fa') return this.fieldMessage(['خطای Recaptcha: لطفا صفحه را مجددا بارگیری کنید و دوباره امتحان کنید'] , req.body.form , res);
                if (lang == 'cn') return this.fieldMessage(['Recaptcha Error : 请重新加载页面并重试'] , req.body.form , res);
            } 
            let validation = await this.validationData(req);
            if(!validation) return this.fieldMessage(req.flash('errors') , req.body.form , res);
            let contentObj = {
                fullname : req.body.fullname,
                email : req.body.email,
                message : req.body.message
            }
            let newMessage = new this.models.Messages({ ...contentObj });
            newMessage.save(error => {
                if (error) {
                  return this.ajaxError('Error in save message', 500, error, res);
                }
                if (lang == 'en') return this.swal('Message Send' , 'Your message has been successfully sent' , 'success', 'OK' , '/' , res);
                if (lang == 'cn') return this.swal('消息发送' , '您的留言已成功发送' , 'success' , '好', '/' , res);
                if (lang == 'fa') return this.swal('پیام ارسال شد' , 'پیام شما با موفقیت ارسال گردید' , 'success' , 'باشه' , '/' , res);
            });
        } catch (error) {
            this.error('error in message method in Home' , 500 , next);
        }
    } 
}