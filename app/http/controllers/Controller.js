const autoBind = require('auto-bind');
const axios = require('axios');
const {validationResult} = require('express-validator/check');
const isMongoId = require('validator/lib/isMongoId');
const isEmpty = require('is-empty');
const Manifest = require('../../../public/dist/manifest.json');
const Jimp = require('jimp');
// Models
const Admins = require('app/models/Admins');
const Messages = require('app/models/Messages');
const Social = require('app/models/Social');
const Contact = require('app/models/Contact');
const Testimonial = require('app/models/Testimonial');
const Experiences = require('app/models/Experiences');
const Education = require('app/models/Education');
const Home = require('app/models/Home');
const About = require('app/models/About');
const Service = require('app/models/Service');
const Skills = require('app/models/Skills');
const SEO = require('app/models/SEO');
const Info = require('app/models/Info');
const Dev = require('app/models/Dev');

module.exports = class Controller {
    constructor() {
        autoBind(this);
        this.isEmpty = isEmpty;
        this.Manifest = Manifest;
        this.models = {
            Admins,
            Messages,
            Social,
            Contact,
            Testimonial,
            Experiences,
            Education,
            Home,
            About,
            Service,
            Skills,
            SEO,
            Info,
            Dev
        }
    }
    error(msg , Stcode = 500 , next) {
        try {
            let error = new Error(msg);
            error.statusCode = Stcode;
            throw error;
        } catch (error) {
            next(error);
        }
    }
    ajaxError(msg , Stcode , error , res) {
        res.json({
            status : 'error',
            data : {
                type : 'ajax',
                msg,
                Stcode,
                stack : error.stack,
                debug : true
            }
        })
    }
    async verifyRecaptcha(req) {
        let data = await axios({
            method: 'post',
            url: `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRETKEY}&response=${req.body.recaptcha}`,
        })
        if(!isEmpty(data.data['error-codes']) && data.data['error-codes'] == 'timeout-or-duplicate') {
            return true;
        } else if(data.data.success) {
            return true;
        } else {
            return false
        }

    }
    async validationData(req) {
        const result = validationResult(req);
        if(!result.isEmpty()) {
                const errors  = result.array();
                const messages = [];
                errors.forEach(err => messages.push(err.msg));
                req.flash('errors' , messages);
                return false;
            } else {
                return true;
        }
    }
    izitoastMessage(msg,method,res) {
        try {
            res.json({
                status : 'error',
                data   : {
                    type:'izitoast',
                    msg,
                    method
                }
            });
        } catch (error) {
            return this.ajaxError('Error in izitoastMessage Method at Controller.js', 500, error, res);
        }
    }
    swal(title,text,icon,button,location,res) {
        try {
            res.json({
                status : 'error',
                data   : {
                    type:'swal',
                    title,
                    text,
                    icon,
                    button,
                    location
                }
            });
        } catch (error) {
            return this.ajaxError('Error in swal Method at Controller.js', 500, error, res);
        }
    }
    redirectWithMessage(msg, method, href, res) {
        try {
            res.json({
                status : 'error',
                data : {
                    type:'redirect',
                    msg,
                    method,
                    href
                }
            });
        } catch (error) {
            return this.error('Error in redirectWithMessage Method at Controller.js', 500, error, res);
        }
    }
    fieldMessage(msg , form , res) {
        try {
            res.json({
                status : 'error',
                data   : {
                    type:'field',
                    msg,
                    form
                }
            });
        } catch (error) {
            return this.ajaxError('Error in fieldMessage Method at Controller.js', 500 , error , res);
        }
    }
    async isMongoId(paramId) {
        if(! isMongoId(paramId)) {
            return false;
        } else {
            return true;
        }
    }
    deleteObj(msg, method, objId , actionDel , res) {
        res.json({
            status : 'error',
            data: {
                type : 'deleteObj',
                msg,
                method,
                objId,
                actionDel
            }
        })
    }
    async unseenMessage() {
        return await Messages.find({ seen : false } , (err , message) => {
            if(err) console.log(err);
            return message;
        });
    }
    addressImage(image) {
        return this.getUrlImage(`${image.destination}/${image.filename}`);
    }
    getUrlImage(dir) {
        return dir.substring(8);
    }
    imageResize(imagePath) {
        Jimp.read(imagePath , (err , image) => {
          if(err) console.log(err);
          image
            .resize(480 , Jimp.AUTO)
            .quality(70)
            .writeAsync(imagePath);
        })
    }
    imageResize2(imagePath) {
        Jimp.read(imagePath , (err , image) => {
          if(err) console.log(err);
          image
            .resize(1080 , Jimp.AUTO)
            .quality(90)
            .writeAsync(imagePath);
        })
    }
    back(req , res) {
        return res.redirect(req.header('Referer') || '/');
    }
}