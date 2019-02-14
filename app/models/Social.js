const mongoose = require('mongoose');
const Schema   = mongoose.Schema;   

const socialSchema = new Schema({
    updatedBy   : { type : Schema.Types.ObjectId , ref : 'Admins'},
    name  : {type : String , default : ''},
    link  : {type : String , default : ''},
    icon  : {type : String , default : ''},
} , { timestamps : true });

module.exports = mongoose.model('Social', socialSchema);