//**************************************/
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

//**************************************/


// Definition User Schema 
const userSchema = new Schema({
  firstName : String,
  lastName : String,
  dateOfBirth : Date,
  email : { type: String , unique: true },
  password : { type: String ,required: true },
  confirmationCode : { type: String },
  resetPasswordToken : { type: String },
  isActive : { type: Boolean , default: false},
  gender : { type: String }
})

userSchema.pre('save', function (next) {
  let user = this;
  if (!user.isModified('password')) return next();

  bcrypt.genSalt(10, (err, salt) => {
    if (err) return next(err);
    bcrypt.hash(user.password, salt, null, (err, hash) => {
      if (err) return next(err);
      user.password = hash;
      next();
    });
  });
});

module.exports = mongoose.model('User',userSchema)