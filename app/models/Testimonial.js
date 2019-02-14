const mongoose = require('mongoose');
const Schema   = mongoose.Schema;   

const testimonialSchema = new Schema({
    updatedBy   : { type : Schema.Types.ObjectId , ref : 'Admins'},
    headerEN  : {type : String , default : ''},
    headerCN  : {type : String , default : ''},
    headerFA  : {type : String , default : ''},
    descEN  : {type : String , default : ''},
    descCN  : {type : String , default : ''},
    descFA  : {type : String , default : ''},
    logo    : {type : String , default : ''},
    image   : {type : Object , default : ''}
} , { timestamps : true });

module.exports = mongoose.model('Testimonial', testimonialSchema);