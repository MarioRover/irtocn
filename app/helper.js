const path = require('path');
const autoBind = require('auto-bind');
const moment = require('moment');
const isEmpty = require('is-empty');

module.exports = class Helpers {
    constructor(req , res) {
        autoBind(this);
        this.req = req;
        this.res = res;
    }
    getObjects() {
        return {
            viewPath : this.viewPath,
            date : this.date,
            unseenMessage : this.unseenMessage,
            req : this.req,
            isEmpty
        }
    }
    viewPath(dir) {
        return path.resolve(config.layout.view_dir + '/' + dir);
    }
    date(time) {
        return moment(time);
    }
}