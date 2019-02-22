const express = require('express');
const router = express.Router();
const upload = require('app/helpers/uploadImage');

// Controller
const Auth = require('app/http/controllers/Admin/Auth');
const Dashboard = require('app/http/controllers/Admin/Dashboard');
const Messages = require('app/http/controllers/Admin/Messages');
const User = require('app/http/controllers/Admin/User');
const Admins = require('app/http/controllers/Admin/Admins');
const Social = require('app/http/controllers/Admin/Setting/Social');
const SEO = require('app/http/controllers/Admin/Setting/SEO');
const Info = require('app/http/controllers/Admin/Setting/Info');
const Developer = require('app/http/controllers/Admin/Developer');

const Home = require('app/http/controllers/Admin/Pages/Home');
const About = require('app/http/controllers/Admin/Pages/About');
const Skill = require('app/http/controllers/Admin/Pages/Skill');
const Service = require('app/http/controllers/Admin/Pages/Service');
const Experiences = require('app/http/controllers/Admin/Pages/Experiences');
const Education = require('app/http/controllers/Admin/Pages/Education');
const Testimonial = require('app/http/controllers/Admin/Pages/Testimonial');
const Contact = require('app/http/controllers/Admin/Pages/Contact');

// Validator
const testimonialValid = require('app/http/validators/testimonialValid');
const loginValid = require('app/http/validators/loginValid');
const registerValid = require('app/http/validators/registerValid');
const fileuploaderValid = require('app/http/validators/fileuploaderValid');
const userProfileValid = require('app/http/validators/userProfileValid');
const experiencesValid = require('app/http/validators/experiencesValid');
const skillValid = require('app/http/validators/skillValid');
const AdminsValid = require('app/http/validators/AdminsValid');
const AdminsUpdateValid = require('app/http/validators/AdminsUpdateValid');
const socialValid = require('app/http/validators/socialValid');
const InfoValid = require('app/http/validators/InfoValid');
// Middleware
const RedirectIfAuth = require('app/http/middleware/RedirectIfAuth');
const ConvertFileToField = require('app/http/middleware/ConvertFileToField');
// Router
router.get('/' , RedirectIfAuth.ReToDashboard  , Dashboard.index);
router.post('/fileuploader',
    RedirectIfAuth.ReTo404,
    upload.single('file'),
    ConvertFileToField.handle,
    fileuploaderValid.handle(),
    Dashboard.fileuploader
);
router.post('/ckeditor-image' ,
    RedirectIfAuth.ReTo404,
    upload.single('upload'),
    Dashboard.ckeditorImage  
);
router.delete('/fileuploader' , RedirectIfAuth.ReTo404 , Dashboard.fileRemove);
///////////////////////Login Page///////////////////////////////
router.get(`/${process.env.PANELKEY}`, Auth.loginShow);
// router.get(`/${process.env.PANELKEY}`, Auth.registerShow);
router.post('/login', loginValid.handle() , Auth.login);
///////////////////////Register Page///////////////////////////////
router.get('/register' , Auth.registerShow);
router.post('/register', registerValid.handle() , Auth.register);
///////////////////////Log Out System///////////////////////////////
router.get('/logout' ,(req , res) => {
    req.logout();
    res.clearCookie('remember_shams_web');
    res.redirect('/');
});
//////////////////////Dashboard Panel//////////////////////////////
router.get('/dashboard' , RedirectIfAuth.ReTo404 , Dashboard.index);
router.get('/messages' , RedirectIfAuth.ReTo404 , Messages.index);
////////////Messages//////////////
router.get('/messages/:message' , RedirectIfAuth.ReTo404 , Messages.message);
router.delete('/messages' , RedirectIfAuth.ReTo404 , Messages.destroy);
//////////////User///////////////////
router.get('/user/profile' , RedirectIfAuth.ReTo404 , User.profile);
router.post('/user/profile', 
    RedirectIfAuth.ReTo404, 
    userProfileValid.handle(),
    User.updateProfile
);
router.get('/user/message' , RedirectIfAuth.ReTo404 , User.message);
//////////Admins////////////
router.get('/admins' , RedirectIfAuth.ReTo404 , Admins.index);
router.get('/admins/new', RedirectIfAuth.ReTo404 , Admins.newAdminPage);
router.post('/admins/new',
    RedirectIfAuth.ReTo404,
    AdminsValid.handle(),
    Admins.newAdmin
);
router.delete('/admins' , RedirectIfAuth.ReTo404 , Admins.delete);
router.get('/admins/:admin', RedirectIfAuth.ReTo404 , Admins.updateAdminPage);
router.put('/admins',
    RedirectIfAuth.ReTo404,
    AdminsUpdateValid.handle(),
    Admins.updateAdmin
);
//////////////Pages//////////////////////////////////////////////
///////Home//////////
router.get('/pages/home' , RedirectIfAuth.ReTo404 , Home.index);
router.post('/pages/home' , RedirectIfAuth.ReTo404 , Home.update);
///////About//////////
router.get('/pages/about' , RedirectIfAuth.ReTo404 , About.index);
router.post('/pages/about' , RedirectIfAuth.ReTo404 , About.update);
///////Skills//////////
router.get('/pages/skills' , RedirectIfAuth.ReTo404 , Skill.index);
router.post('/pages/skills',
    RedirectIfAuth.ReTo404,
    skillValid.handle(),
    Skill.add
);
router.get('/pages/skills/:skill' , RedirectIfAuth.ReTo404 , Skill.editPage);
router.put('/pages/skills',
    RedirectIfAuth.ReTo404,
    skillValid.handle(),
    Skill.edit
);
router.delete('/pages/skills' , RedirectIfAuth.ReTo404 , Skill.delete);
///////Service//////////
router.get('/pages/service' , RedirectIfAuth.ReTo404 , Service.index);
router.post('/pages/service',
    RedirectIfAuth.ReTo404,
    experiencesValid.handle(),
    Service.update
);
///////Experiences//////////
router.get('/pages/experiences' , RedirectIfAuth.ReTo404 , Experiences.index);
router.post('/pages/experiences',
    RedirectIfAuth.ReTo404,
    experiencesValid.handle(),
    Experiences.update
);
///////Education//////////
router.get('/pages/education' , RedirectIfAuth.ReTo404 , Education.index);
router.post('/pages/education',
    RedirectIfAuth.ReTo404,
    experiencesValid.handle(),
    Education.update
);
//////////Testimonial////
router.get('/pages/testimonial' , RedirectIfAuth.ReTo404 , Testimonial.index);
router.post('/pages/testimonial' ,
    RedirectIfAuth.ReTo404,
    testimonialValid.handle(),
    Testimonial.update
);
///////Contact//////////
router.get('/pages/contact' , RedirectIfAuth.ReTo404 , Contact.index);
router.post('/pages/contact' , RedirectIfAuth.ReTo404 , Contact.update);
//////////////////Settings/////////////////////////
router.get('/setting/social' , RedirectIfAuth.ReTo404 , Social.index);
router.post('/setting/social',
    RedirectIfAuth.ReTo404,
    socialValid.handle(),
    Social.new
);
router.get('/setting/social/:social' , RedirectIfAuth.ReTo404 , Social.editPage);
router.put('/setting/social',
    RedirectIfAuth.ReTo404,
    socialValid.handle(),
    Social.edit
);
router.delete('/setting/social' , RedirectIfAuth.ReTo404 , Social.delete);
//////////////////SEO////////
router.get('/setting/seo' , RedirectIfAuth.ReTo404 , SEO.index);
router.post('/setting/seo' , RedirectIfAuth.ReTo404 , SEO.set);
/////////Info////////
router.get('/setting/info' , RedirectIfAuth.ReTo404 , Info.index);
router.post('/setting/info' ,
    RedirectIfAuth.ReTo404 ,
    InfoValid.handle(),
    Info.set
);
/////////////////////Developer/////////////////////
router.get('/dev' , RedirectIfAuth.ReTo404 , Developer.index);
router.post('/dev' , RedirectIfAuth.ReTo404 , Developer.set);
///////////////////About Panel/////////////////////////
router.get('/about' , Dashboard.about);

module.exports = router;