const mongoose = require('mongoose');
const Schema   = mongoose.Schema;   

const seoSchema = new Schema({
    updatedBy   : { type : Schema.Types.ObjectId , ref : 'Admins'},
    name       : { type : String , default : ''},
    descTags       : { type : String , default : ''},
    keyTags       : { type : String , default : ''}
} , { timestamps : true });

module.exports = mongoose.model('SEO', seoSchema);