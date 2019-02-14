const mongoose = require('mongoose');
const Schema   = mongoose.Schema;   
const mongoosePaginate = require('mongoose-paginate');

const messagesSchema = new Schema({
    fullname  : {type : String},
    email     : {type : String},
    message   : {type : String},
    seen      : {type : Boolean , default : false}
} , { timestamps : true });
messagesSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Messages', messagesSchema);