const mongoose = require('mongoose');
const Schema   = mongoose.Schema;   

const homeSchema = new Schema({
    updatedBy   : { type : Schema.Types.ObjectId , ref : 'Admins'},

    descEN  : {type : String , default : ''},
    descCN  : {type : String , default : ''},
    descFA  : {type : String , default : ''},

    image   : {type : Object , default : ''},
} , { timestamps : true });

module.exports = mongoose.model('Home', homeSchema);