import {Fetch,Fetch2} from './fetch';

// $('.Login').submit((e) => {
//     e.preventDefault();
//     $('.error-box').empty();

//     let email = $('.Login input[name = "email"]');
//     let password = $('.Login input[name = "password"]');
//     let recaptcha = $('.Login input[name = "recaptcha"]');
//     let remember = false;
//     if ($('.Login input[name = "remember"]').is(':checked')) {
//         remember = true;
//     }

//     const body = {
//         form : '.Login',
//         email: email.val(),
//         password: password.val(),
//         recaptcha: recaptcha.val(),
//         remember,
//     };
    
//     Fetch2('/admin/login', 'POST', body);
// });

$('.Register').submit((e) => {
    e.preventDefault();
    $('.error-box').empty();

    let email = $('.Register input[name = "email"]');
    let phone = $('.Register input[name = "phone"]');
    let name = $('.Register input[name = "name"]');
    let password = $('.Register input[name = "password"]');
    let CPassword = $('.Register input[name = "CPassword"]');
    let recaptcha = $('.Register input[name = "recaptcha"]');

    const body = {
        form : '.Register',
        email: email.val(),
        phone: phone.val(),
        name: name.val(),
        password: password.val(),
        CPassword: CPassword.val(),
        recaptcha: recaptcha.val(),
    };
    Fetch2('/admin/register', 'POST', body);
});
let messages = $('.deleteMessage');
$.each(messages, function (indexInArray, message) {
    $(message).click(function (e) {
        e.preventDefault();
        let messageId = $(message).attr('value');
        let body = {
            message : messageId
        };
        Fetch2('/admin/messages', 'DELETE', body);
    });
});
////////////////User Profile///////////////////
$('.UserProfile').submit((e) => {
    e.preventDefault();

    let name = $('.UserProfile input[name = "name"]');
    let phone = $('.UserProfile input[name = "phone"]');
    let password = $('.UserProfile input[name = "password"]');
    let CPassword = $('.UserProfile input[name = "CPassword"]');
    let file = $('.UserProfile input[name = "profile"]');
    let image = {
        destination : file.siblings('.destination').text(),
        originalname : file.siblings('.originalname').text(),
        path : file.siblings('.path').text()
    }

    const body = {
        form : '.UserProfile',
        name: name.val(),
        phone: phone.val(),
        password: password.val(),
        CPassword: CPassword.val(),
        image
    };
    
    Fetch2('/admin/user/profile', 'POST', body);
});
////////////////Admins///////////////////
$('.AddAdmin').submit((e) => {
    e.preventDefault();

    let name = $('.AddAdmin input[name = "name"]');
    let email = $('.AddAdmin input[name = "email"]');
    let password = $('.AddAdmin input[name = "password"]');
    let CPassword = $('.AddAdmin input[name = "CPassword"]');
    let file = $('.AddAdmin input[name = "profile"]');
    let image = {
        destination : file.siblings('.destination').text(),
        originalname : file.siblings('.originalname').text(),
        path : file.siblings('.path').text()
    }
    let superadmin = false;
    if ($('.AddAdmin input[name = "superadmin"]').is(':checked')) {
        superadmin = true;
    }

    const body = {
        form : '.AddAdmin',
        name: name.val(),
        email: email.val(),
        password: password.val(),
        CPassword: CPassword.val(),
        image,
        superadmin
    };
    
    Fetch2('/admin/admins/new', 'POST', body);
});
$('.UpdateAdmin').submit((e) => {
    e.preventDefault();

    let name = $('.UpdateAdmin input[name = "name"]');
    let email = $('.UpdateAdmin input[name = "email"]');
    let password = $('.UpdateAdmin input[name = "password"]');
    let CPassword = $('.UpdateAdmin input[name = "CPassword"]');
    let file = $('.UpdateAdmin input[name = "profile"]');
    let image = {
        destination : file.siblings('.destination').text(),
        originalname : file.siblings('.originalname').text(),
        path : file.siblings('.path').text()
    }
    let superadmin = false;
    if ($('.UpdateAdmin input[name = "superadmin"]').is(':checked')) {
        superadmin = true;
    }
    let adminId = $('.UpdateAdmin input[name = "adminId"]');

    const body = {
        form : '.UpdateAdmin',
        adminId : adminId.val(),
        name: name.val(),
        email: email.val(),
        password: password.val(),
        CPassword: CPassword.val(),
        image,
        superadmin
    };
    
    Fetch2('/admin/admins', 'PUT', body);
});
let admins = $('.deleteAdmin');
$.each(admins, function (indexInArray, admin) {
    $(admin).click(function (e) {
        e.preventDefault();
        let adminId = $(admin).attr('value');
        let body = {
            admin : adminId
        };
        Fetch2('/admin/admins', 'DELETE', body);
    });
});
/////////////Pages////////////////
///////////Home///////////
$('.Home').submit((e) => {
    e.preventDefault();
    let descEN = CKEDITOR.instances.desc1.getData();
    let descCN = CKEDITOR.instances.desc2.getData();
    let descFA = CKEDITOR.instances.desc3.getData();
    let file = $('.Home input[name = "image"]');
    let image = {
        destination : file.siblings('.destination').text(),
        originalname : file.siblings('.originalname').text(),
        path : file.siblings('.path').text()
    }

    const body = {
        form : '.Home',
        descEN,
        descCN,
        descFA,
        image
    };
    
    Fetch2('/admin/pages/home', 'POST', body);
});
///////////Skills///////////
$('.AddSkill').submit((e) => {
    e.preventDefault();
    let skillEN = $('.AddSkill input[name = "skillEN"]');
    let skillCN = $('.AddSkill input[name = "skillCN"]');
    let skillFA = $('.AddSkill input[name = "skillFA"]');
    let skillPercent = $('.AddSkill input[name = "skillPercent"]');

    const body = {
        form : '.AddSkill',
        skillEN : skillEN.val(),
        skillCN : skillCN.val(),
        skillFA : skillFA.val(),
        skillPercent : skillPercent.val(),
    };
    
    Fetch2('/admin/pages/skills', 'POST', body);
});
$('.EditSkill').submit((e) => {
    e.preventDefault();
    let skillId = $('.EditSkill input[name = "skillId"]');
    let skillEN = $('.EditSkill input[name = "skillEN"]');
    let skillCN = $('.EditSkill input[name = "skillCN"]');
    let skillFA = $('.EditSkill input[name = "skillFA"]');
    let skillPercent = $('.EditSkill input[name = "skillPercent"]');

    const body = {
        form : '.EditSkill',
        skillId : skillId.val(),
        skillEN : skillEN.val(),
        skillCN : skillCN.val(),
        skillFA : skillFA.val(),
        skillPercent : skillPercent.val(),
    };
    
    Fetch2('/admin/pages/skills', 'PUT', body);
});
let skills = $('.deleteSkill');
$.each(skills, function (indexInArray, skill) {
    $(skill).click(function (e) {
        e.preventDefault();
        let skillId = $(skill).attr('value');
        let body = {
            skill : skillId
        };
        Fetch2('/admin/pages/skills', 'DELETE', body);
    });
});
///////////Service///////////
$('.Service').submit((e) => {
    e.preventDefault();
    let serviceHeader1EN = $('.Service input[name = "serviceHeader1EN"]');
    let desc1EN = $('.Service input[name = "desc1EN"]');
    let serviceHeader1CN = $('.Service input[name = "serviceHeader1CN"]');
    let desc1CN = $('.Service input[name = "desc1CN"]');
    let serviceHeader1FA = $('.Service input[name = "serviceHeader1FA"]');
    let desc1FA = $('.Service input[name = "desc1FA"]');
    let icon1 = $('.Service input[name = "icon1"]');

    let serviceHeader2EN = $('.Service input[name = "serviceHeader2EN"]');
    let desc2EN = $('.Service input[name = "desc2EN"]');
    let serviceHeader2CN = $('.Service input[name = "serviceHeader2CN"]');
    let desc2CN = $('.Service input[name = "desc2CN"]');
    let serviceHeader2FA = $('.Service input[name = "serviceHeader2FA"]');
    let desc2FA = $('.Service input[name = "desc2FA"]');
    let icon2 = $('.Service input[name = "icon2"]');

    let serviceHeader3EN = $('.Service input[name = "serviceHeader3EN"]');
    let desc3EN = $('.Service input[name = "desc3EN"]');
    let serviceHeader3CN = $('.Service input[name = "serviceHeader3CN"]');
    let desc3CN = $('.Service input[name = "desc3CN"]');
    let serviceHeader3FA = $('.Service input[name = "serviceHeader3FA"]');
    let desc3FA = $('.Service input[name = "desc3FA"]');
    let icon3 = $('.Service input[name = "icon3"]');

    let serviceHeader4EN = $('.Service input[name = "serviceHeader4EN"]');
    let desc4EN = $('.Service input[name = "desc4EN"]');
    let serviceHeader4CN = $('.Service input[name = "serviceHeader4CN"]');
    let desc4CN = $('.Service input[name = "desc4CN"]');
    let serviceHeader4FA = $('.Service input[name = "serviceHeader4FA"]');
    let desc4FA = $('.Service input[name = "desc4FA"]');
    let icon4 = $('.Service input[name = "icon4"]');

    const body = {
        form : '.Service',
        serviceHeader1EN : serviceHeader1EN.val(),
        desc1EN : desc1EN.val(),
        serviceHeader1CN : serviceHeader1CN.val(),
        desc1CN : desc1CN.val(),
        serviceHeader1FA : serviceHeader1FA.val(),
        desc1FA : desc1FA.val(),
        icon1 : icon1.val(),

        serviceHeader2EN : serviceHeader2EN.val(),
        desc2EN : desc2EN.val(),
        serviceHeader2CN : serviceHeader2CN.val(),
        desc2CN : desc2CN.val(),
        serviceHeader2FA : serviceHeader2FA.val(),
        desc2FA : desc2FA.val(),
        icon2 : icon2.val(),

        serviceHeader3EN : serviceHeader3EN.val(),
        desc3EN : desc3EN.val(),
        serviceHeader3CN : serviceHeader3CN.val(),
        desc3CN : desc3CN.val(),
        serviceHeader3FA : serviceHeader3FA.val(),
        desc3FA : desc3FA.val(),
        icon3 : icon3.val(),

        serviceHeader4EN : serviceHeader4EN.val(),
        desc4EN : desc4EN.val(),
        serviceHeader4CN : serviceHeader4CN.val(),
        desc4CN : desc4CN.val(),
        serviceHeader4FA : serviceHeader4FA.val(),
        desc4FA : desc4FA.val(),
        icon4 : icon4.val()
    };
    
    Fetch2('/admin/pages/service', 'POST', body);
});
///////////About///////////
$('.About').submit((e) => {
    e.preventDefault();
    let descEN = CKEDITOR.instances.desc1.getData();
    let descCN = CKEDITOR.instances.desc2.getData();
    let descFA = CKEDITOR.instances.desc3.getData();
    let file = $('.About input[name = "image"]');
    let image = {
        destination : file.siblings('.destination').text(),
        originalname : file.siblings('.originalname').text(),
        path : file.siblings('.path').text()
    }

    const body = {
        form : '.About',
        descEN,
        descCN,
        descFA,
        image
    };
    
    Fetch2('/admin/pages/about', 'POST', body);
});
//////////Experiences//////////////
$('.Experiences').submit((e) => {
    e.preventDefault();
    let headerEN = $('.Experiences input[name = "headerEN"]');
    let headerCN = $('.Experiences input[name = "headerCN"]');
    let headerFA = $('.Experiences input[name = "headerFA"]');

    let desc1EN = CKEDITOR.instances.desc1.getData();;
    let desc1CN = CKEDITOR.instances.desc2.getData();;
    let desc1FA = CKEDITOR.instances.desc3.getData();;
    let icon1 = $('.Experiences input[name = "icon1"]');

    let desc2EN = CKEDITOR.instances.desc4.getData();;
    let desc2CN = CKEDITOR.instances.desc5.getData();;
    let desc2FA = CKEDITOR.instances.desc6.getData();;
    let icon2 = $('.Experiences input[name = "icon2"]');

    let desc3EN = CKEDITOR.instances.desc7.getData();;
    let desc3CN = CKEDITOR.instances.desc8.getData();;
    let desc3FA = CKEDITOR.instances.desc9.getData();;
    let icon3 = $('.Experiences input[name = "icon3"]');

    let desc4EN = CKEDITOR.instances.desc10.getData();;
    let desc4CN = CKEDITOR.instances.desc11.getData();;
    let desc4FA = CKEDITOR.instances.desc12.getData();;
    let icon4 = $('.Experiences input[name = "icon4"]');
   
    let file = $('.Experiences input[name = "image"]');
    let image = {
        destination : file.siblings('.destination').text(),
        originalname : file.siblings('.originalname').text(),
        path : file.siblings('.path').text()
    }

    const body = {
        form : '.Experiences',
        headerEN : headerEN.val(),
        headerCN : headerCN.val(),
        headerFA : headerFA.val(),
        desc1EN ,
        desc1CN ,
        desc1FA ,
        icon1 : icon1.val(),
        desc2EN ,
        desc2CN ,
        desc2FA ,
        icon2 : icon2.val(),
        desc3EN ,
        desc3CN ,
        desc3FA ,
        icon3 : icon3.val(),
        desc4EN ,
        desc4CN ,
        desc4FA ,
        icon4 : icon4.val(),
        image
    };
    Fetch2('/admin/pages/experiences', 'POST', body);
});
//////////Experiences//////////////
$('.Education').submit((e) => {
    e.preventDefault();
    let headerEN = $('.Education input[name = "headerEN"]');
    let headerCN = $('.Education input[name = "headerCN"]');
    let headerFA = $('.Education input[name = "headerFA"]');

    let desc1EN = CKEDITOR.instances.desc1.getData();;
    let desc1CN = CKEDITOR.instances.desc2.getData();;
    let desc1FA = CKEDITOR.instances.desc3.getData();;
    let icon1 = $('.Education input[name = "icon1"]');

    let desc2EN = CKEDITOR.instances.desc4.getData();;
    let desc2CN = CKEDITOR.instances.desc5.getData();;
    let desc2FA = CKEDITOR.instances.desc6.getData();;
    let icon2 = $('.Education input[name = "icon2"]');

    let desc3EN = CKEDITOR.instances.desc7.getData();;
    let desc3CN = CKEDITOR.instances.desc8.getData();;
    let desc3FA = CKEDITOR.instances.desc9.getData();;
    let icon3 = $('.Education input[name = "icon3"]');

    let desc4EN = CKEDITOR.instances.desc10.getData();;
    let desc4CN = CKEDITOR.instances.desc11.getData();;
    let desc4FA = CKEDITOR.instances.desc12.getData();;
    let icon4 = $('.Experiences input[name = "icon4"]');
   
    let file = $('.Education input[name = "image"]');
    let image = {
        destination : file.siblings('.destination').text(),
        originalname : file.siblings('.originalname').text(),
        path : file.siblings('.path').text()
    }

    const body = {
        form : '.Education',
        headerEN : headerEN.val(),
        headerCN : headerCN.val(),
        headerFA : headerFA.val(),
        desc1EN ,
        desc1CN ,
        desc1FA ,
        icon1 : icon1.val(),
        desc2EN ,
        desc2CN ,
        desc2FA ,
        icon2 : icon2.val(),
        desc3EN ,
        desc3CN ,
        desc3FA ,
        icon3 : icon3.val(),
        desc4EN ,
        desc4CN ,
        desc4FA ,
        icon4 : icon4.val(),
        image
    };
    Fetch2('/admin/pages/education', 'POST', body);
});
///////////Contact///////
$('.Testimonial').submit((e) => {
    e.preventDefault();
    let headerEN = $('.Testimonial input[name = "headerEN"]');
    let headerCN = $('.Testimonial input[name = "headerCN"]');
    let headerFA = $('.Testimonial input[name = "headerFA"]');

    let descEN = $('.Testimonial input[name = "descEN"]');
    let descCN = $('.Testimonial input[name = "descCN"]');
    let descFA = $('.Testimonial input[name = "descFA"]');

    let logo = $('.Testimonial input[name = "logo"]');
   
    let imageFile = $('.Testimonial input[name = "image"]');
    let image = {
        destination : imageFile.siblings('.destination').text(),
        originalname : imageFile.siblings('.originalname').text(),
        path : imageFile.siblings('.path').text()
    }

    const body = {
        form : '.Testimonial',
        headerEN : headerEN.val(),
        headerCN : headerCN.val(),
        headerFA : headerFA.val(),
        descEN : descEN.val(),
        descCN : descCN.val(),
        descFA : descFA.val(),
        logo   : logo.val(),
        image
    };
    
    Fetch2('/admin/pages/testimonial', 'POST', body);
});
///////////Contact///////
$('.Contact').submit((e) => {
    e.preventDefault();
    let descEN = CKEDITOR.instances.desc1.getData();
    let descCN = CKEDITOR.instances.desc2.getData();
    let descFA = CKEDITOR.instances.desc3.getData();
    let headerEN = $('.Contact input[name = "headerEN"]');
    let headerCN = $('.Contact input[name = "headerCN"]');
    let headerFA = $('.Contact input[name = "headerFA"]');
    let file = $('.Contact input[name = "image"]');
    let image = {
        destination : file.siblings('.destination').text(),
        originalname : file.siblings('.originalname').text(),
        path : file.siblings('.path').text()
    }

    const body = {
        descEN,
        descCN,
        descFA,
        headerEN : headerEN.val(),
        headerCN : headerCN.val(),
        headerFA : headerFA.val(),
        image
    };
    
    Fetch2('/admin/pages/contact', 'POST', body);
});
///////////////////Settings//////////////////////////
/////////Social////////////
$('.AddSocial').submit((e) => {
    e.preventDefault();
    let name = $('.AddSocial input[name = "name"]');
    let icon = $('.AddSocial input[name = "icon"]');
    let link = $('.AddSocial input[name = "link"]');

    const body = {
        form : '.AddSocial',
        name : name.val(),
        icon : icon.val(),
        link : link.val(),
    };
    
    Fetch2('/admin/setting/social', 'POST', body);
});
$('.EditSocial').submit((e) => {
    e.preventDefault();
    let socialId = $('.EditSocial input[name = "socialId"]');
    let name = $('.EditSocial input[name = "name"]');
    let icon = $('.EditSocial input[name = "icon"]');
    let link = $('.EditSocial input[name = "link"]');

    const body = {
        form : '.EditSocial',
        socialId : socialId.val(),
        name : name.val(),
        icon : icon.val(),
        link : link.val(),
    };
    
    Fetch2('/admin/setting/social', 'PUT', body);
});
let socials = $('.deleteSocial');
$.each(socials, function (indexInArray, social) {
    $(social).click(function (e) {
        e.preventDefault();
        let socialId = $(social).attr('value');
        let body = {
            social : socialId
        };
        Fetch2('/admin/setting/social', 'DELETE', body);
    });
});
///////////////SEO/////////////////////
$('.HomeSEO').submit((e) => {
    e.preventDefault();
    let inputDescTag = $('.HomeSEO input[name = "descTags"]').siblings('tag').find('span');
    let inputKeyTag = $('.HomeSEO input[name = "keyTags"]').siblings('tag').find('span');
    let descTags = [];
    let keyTags = [];

    inputDescTag.map((index , tag) => {
        descTags.push($.trim($(tag).text()));   
    });
    inputKeyTag.map((index , tag) => {
        keyTags.push($.trim($(tag).text()));   
    });
    const body = {
        name : 'Home',
        descTags,
        keyTags 
    };
    Fetch2('/admin/setting/seo', 'POST', body);
});
///////info////////
$('.Information').submit((e) => {
    e.preventDefault();
    let title = $('.Information input[name = "title"]');
    let siteName = $('.Information input[name = "siteName"]');

    const body = {
        form : '.Information',
        title : title.val(),
        siteName : siteName.val()
    };
    
    Fetch2('/admin/setting/info', 'POST', body);
});
/////////////Develoer Tools/////////////////
$('.Developer').submit((e) => {
    e.preventDefault();
    let debug = false;
    let repair = false;
    if ($('.Developer input[name = "debug"]').is(':checked')) {
        debug = true;
    }
    if ($('.Developer input[name = "repair"]').is(':checked')) {
        repair = true;
    }

    const body = {
        form : '.Developer',
        debug,repair
    };
    
    Fetch2('/admin/dev', 'POST', body);
});