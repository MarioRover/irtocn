const express = require('express');
const router = express.Router();
// Controller
const HomeRoute  = require('./home');
const AdminRoute = require('./admin');
// Middleware
const ErrorHandler = require('app/http/middleware/ErrorHandler');
const Repair = require('app/http/middleware/Repair');
const SetLocale = require('app/http/middleware/SetLocale');

router.get('/' , Repair.handle , (req , res) => {
    if(req.getLocale()) {
        res.redirect(`/${req.getLocale()}/home`);
    } else {
        res.redirect('/en/home');
    }
})
router.get('/en' , Repair.handle , (req , res) => res.redirect('/en/home'));
router.get('/cn' , Repair.handle , (req , res) => res.redirect('/cn/home'));
router.get('/fa' , Repair.handle , (req , res) => res.redirect('/fa/home'));
router.use('/:lang/home', Repair.handle , SetLocale.handle , HomeRoute);
router.use('/admin' , AdminRoute);

// Error Handler
router.get('/500' , (req , res) => {
    res.render('error/500');
})
router.get('/error/ajax' , (req , res) => {
    res.render('error/ajax');
});
router.all('*' , ErrorHandler.error404);
router.use(ErrorHandler.handler);

module.exports = router;