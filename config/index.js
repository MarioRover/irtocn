const database = require('./database');
const layout = require('./layout');
const session = require('./session');
const service = require('./service');

module.exports = {
    port : process.env.PORT,
    database,
    layout,
    session,
    service,
    siteurl: process.env.WEBSITE_URL,
    jwt : {
      secret_key : 'GGK$%#125)0(KJUA%&#250ASX'
    }
  }