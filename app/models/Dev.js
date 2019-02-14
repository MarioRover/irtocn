const mongoose = require('mongoose');
const Schema   = mongoose.Schema;   

const devSchema = new Schema({
    updatedBy   : { type : Schema.Types.ObjectId , ref : 'Admins'},
    debug  : {type : Boolean , default : false},
    repair  : {type : Boolean , default : false},
} , { timestamps : true });

module.exports = mongoose.model('Dev', devSchema);