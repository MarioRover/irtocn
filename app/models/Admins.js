const mongoose = require('mongoose');
const Schema   = mongoose.Schema;   
const uniqueString = require('unique-string');
const passwordHash = require('password-hash');

const adminSchema = Schema({
    name     : { type : String , default : 'User'},
    email    : { type : String},
    phone    : { type : String},
    password : { type : String},
    superadmin    : { type : Boolean  , default : false},
    developer    : { type : Boolean , default : false},
    profileImage    : { type : Object , default : ''},
    rememberToken : { type : String , default : '' }
  }, { timestamps : true });

adminSchema.pre('save', function (next) {
  let hash = passwordHash.generate(this.password);
  this.password = hash;
  next();
});

adminSchema.methods.comparePassword = function (password) {
  return passwordHash.verify(password , this.password);
}

adminSchema.methods.updatePassword = function (newPass) {
  let hash = passwordHash.generate(newPass);
  this.update({ password : hash } , error => {
    if(error) console.log(error);
  });
}

adminSchema.methods.setRememberToken = function (res) {
  const token = uniqueString();
  res.cookie('remember_shams_web', token, {
    maxAge: 1000 * 60 * 60 * 24 * 30 ,
    httpOnly: true,
    signed: true
  });
  this.update({ rememberToken : token } , error => {
    if(error) console.log(error);
  });
}

module.exports = mongoose.model('Admins' , adminSchema);