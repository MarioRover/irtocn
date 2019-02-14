const mongoose = require('mongoose');
const Schema   = mongoose.Schema;   

const educationSchema = new Schema({
    updatedBy   : { type : Schema.Types.ObjectId , ref : 'Admins'},

    headerEN  : {type : String , default : ''},
    headerCN  : {type : String , default : ''},
    headerFA  : {type : String , default : ''},
    
    desc1EN  : {type : String , default : ''},
    desc1CN  : {type : String , default : ''},
    desc1FA  : {type : String , default : ''},
    icon1    : {type : String , default : ''},

    desc2EN  : {type : String , default : ''},
    desc2CN  : {type : String , default : ''},
    desc2FA  : {type : String , default : ''},
    icon2    : {type : String , default : ''},

    desc3EN  : {type : String , default : ''},
    desc3CN  : {type : String , default : ''},
    desc3FA  : {type : String , default : ''},
    icon3    : {type : String , default : ''},

    desc4EN  : {type : String , default : ''},
    desc4CN  : {type : String , default : ''},
    desc4FA  : {type : String , default : ''},
    icon4    : {type : String , default : ''},

    image   : {type : Object , default : ''},
} , { timestamps : true });

module.exports = mongoose.model('Education', educationSchema);