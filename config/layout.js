const path = require('path');
const expressLayouts = require('express-ejs-layouts'); 

module.exports = {
  public_dir: 'public',
  view_dir: path.resolve('./pages'),
  view_engine: 'ejs',
  locales_directory : path.resolve('./pages/lang'),
  ejs: {
    expressLayouts,
    extractScripts: true,
    extractStyles: true,
    master: 'home/master'
  }
}