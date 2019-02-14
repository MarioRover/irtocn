const mongoose = require('mongoose');
const Schema   = mongoose.Schema;   

const serviceSchema = new Schema({
    updatedBy   : { type : Schema.Types.ObjectId , ref : 'Admins'},

    icon1  : {type : String , default : ''},
    icon2  : {type : String , default : ''},
    icon3  : {type : String , default : ''},
    icon4  : {type : String , default : ''},
    
    serviceHeader1EN  : {type : String , default : ''},
    serviceHeader1CN  : {type : String , default : ''},
    serviceHeader1FA  : {type : String , default : ''},

    serviceHeader2EN  : {type : String , default : ''},
    serviceHeader2CN  : {type : String , default : ''},
    serviceHeader2FA  : {type : String , default : ''},

    serviceHeader3EN  : {type : String , default : ''},
    serviceHeader3CN  : {type : String , default : ''},
    serviceHeader3FA  : {type : String , default : ''},

    serviceHeader4EN  : {type : String , default : ''},
    serviceHeader4CN  : {type : String , default : ''},
    serviceHeader4FA  : {type : String , default : ''},

    desc1EN  : {type : String , default : ''},
    desc1CN  : {type : String , default : ''},
    desc1FA  : {type : String , default : ''},

    desc2EN  : {type : String , default : ''},
    desc2CN  : {type : String , default : ''},
    desc2FA  : {type : String , default : ''},

    desc3EN  : {type : String , default : ''},
    desc3CN  : {type : String , default : ''},
    desc3FA  : {type : String , default : ''},

    desc4EN  : {type : String , default : ''},
    desc4CN  : {type : String , default : ''},
    desc4FA  : {type : String , default : ''},

    image   : {type : Object , default : ''},
} , { timestamps : true });

module.exports = mongoose.model('Service', serviceSchema);