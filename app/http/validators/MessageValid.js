const validator = require('./validator');
const {check} = require('express-validator/check');
const isEmail = require('validator/lib/isEmail');


module.exports = new class MessageValid extends validator {
    handle() {
      return [
        check('fullname')
          .custom(async (value , {req}) => {
            let lang = req.getLocale();
            if (!value) {
              if (lang == 'en') throw new Error('Name field can not be empty');
              if (lang == 'cn') throw new Error('名称字段不能为空');
              if (lang == 'fa') throw new Error('فیلد نام نمیتواند خالی باشد');
            } 
          }),
        check('email')
          .custom(async (value , {req}) => {
            let lang = req.getLocale();
            if (!value) {
              if (lang == 'en') throw new Error('Email field can not be empty');
              if (lang == 'cn') throw new Error('电子邮件字段不能为空');
              if (lang == 'fa') throw new Error('فیلد ایمیل نمیتواند خالی باشد');
            } 
            if (!isEmail(value)) {
              if (lang == 'en') throw new Error('The entered email format is not correct');
              if (lang == 'cn') throw new Error('输入的电子邮件格式不正确');
              if (lang == 'fa') throw new Error('فرمت ایمیل وارد شده صحیح نیست');
            } 
          }),
        check('message')
          .custom(async (value , {req}) => {
            let lang = req.getLocale();
            if (!value) {
              if (lang == 'en') throw new Error('Message field can not be empty');
              if (lang == 'cn') throw new Error('消息字段不能为空');
              if (lang == 'fa') throw new Error('فیلد پیام نمیتواند خالی باشد');
            } 
          }),
      ]
    }
  }