const mongoose = require('mongoose');
const Schema   = mongoose.Schema;   

const infoSchema = new Schema({
    updatedBy   : { type : Schema.Types.ObjectId , ref : 'Admins'},
    title       : { type : String , default : ''},
    siteName       : { type : String , default : ''}
} , { timestamps : true });

module.exports = mongoose.model('Info', infoSchema);