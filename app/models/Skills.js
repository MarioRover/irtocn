const mongoose = require('mongoose');
const Schema   = mongoose.Schema;   

const skillsSchema = new Schema({
    updatedBy   : { type : Schema.Types.ObjectId , ref : 'Admins'},
    skillEN  : {type : String , default : ''},
    skillCN  : {type : String , default : ''},
    skillFA  : {type : String , default : ''},
    skillPercent  : {type : Number , default : 0},

} , { timestamps : true });

module.exports = mongoose.model('Skills', skillsSchema);