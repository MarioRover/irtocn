const express = require('express');
const router = express.Router();
const i18n = require('i18n');
const lang = i18n.getLocale();
// Controller
const Home = require('app/http/controllers/User/Home');
// Validator
const MessageValid = require('app/http/validators/MessageValid');

router.get('/' , Home.index);
router.post('/message' , MessageValid.handle() , Home.message);

module.exports = router;