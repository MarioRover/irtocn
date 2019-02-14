const mongoose = require('mongoose');
const Schema   = mongoose.Schema;   

const contactSchema = new Schema({
    updatedBy   : { type : Schema.Types.ObjectId , ref : 'Admins'},
    descEN  : {type : String , default : ''},
    descCN  : {type : String , default : ''},
    descFA  : {type : String , default : ''},
    headerEN  : {type : String , default : ''},
    headerCN  : {type : String , default : ''},
    headerFA  : {type : String , default : ''},
    image   : {type : Object , default : ''},
} , { timestamps : true });

module.exports = mongoose.model('Contact', contactSchema);