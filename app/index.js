// Module
const express = require('express');
const app = express();
const helmet = require('helmet');
const http = require('http');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const validator = require('express-validator');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');
const passport = require('passport');
const i18n = require('i18n');
const Helpers = require('./helper');
//Middleware
const RememberLogin = require('app/http/middleware/RememberLogin');
// Application
module.exports = class Aplication {
  constructor() {
    this.setupExpress();
    this.setMongoConnection();
    this.setConfig();
    this.setRouters();
  }
  setupExpress() {
    const server = http.createServer(app);
    server.listen(config.port , () => {console.log(`> Ready on http://localhost:${config.port}`)});
  }
  setMongoConnection() {
    mongoose.Promise = global.Promise;
    mongoose.connect(config.database.url, {
      useNewUrlParser: true
    });
  }
  setConfig() {
    // Passport
    require('app/passport/passport-admin');
    // security
    app.enable('trust proxy');
    app.use(helmet());
    // i18n
    i18n.configure({
      locales:['en', 'cn' ,'fa'],
      directory: config.layout.locales_directory,
      defaultLocale : 'en',
      cookie : 'lang',
      objectNotation : true
    });
    app.use(i18n.init);
    // Layout & Views Config
    app.use(express.static(config.layout.public_dir));
    app.set('view engine', config.layout.view_engine);
    app.set('views', config.layout.view_dir);
    app.use(config.layout.ejs.expressLayouts);
    app.set("layout extractScripts", config.layout.ejs.extractScripts);
    app.set("layout extractStyles", config.layout.ejs.extractStyles);
    app.set('layout', config.layout.ejs.master);
    // Body Parser Config
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
      extended: true
    }));
    app.use(validator());
    app.use(session({ ...config.session}));
    app.use(cookieParser(process.env.COOKIE_SECRETKEY));
    app.use(flash());
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(RememberLogin.handle);
    app.use((req, res, next) => {
      app.locals = new Helpers(req, res).getObjects();
      next(); 
    });
  }
  setRouters() {
    app.use(require('app/routes/web'));
  }
}