import {Fetch2} from '../panel/js/fetch';

$('.Message').submit((e) => {
    e.preventDefault();
    let fullname = $('.Message input[name = "fullname"]');
    let email = $('.Message input[name = "email"]');
    let message = $('.Message textarea[name = "message"]');
    let recaptcha = $('.Message input[name = "recaptcha"]');
  
    const body = {
        form : '.Message',
        fullname: fullname.val(),
        email: email.val(),
        message: message.val(),
        recaptcha: recaptcha.val(),
    };
    let lang = window.location.pathname.split('/')[1];
    Fetch2(`/${lang}/home/message`, 'POST', body);
});