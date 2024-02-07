const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: [true,  "Username Not provided"],
    minLength: [6, "Enter username with more than 6 characters"]
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    required: [true, "Email not provided"],
    validate: {
      validator: function (v) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
      },
      message: '{Value} is not a valid email!'
    }
  },
  password: {
    type: String, 
    required: [true, "password Not provided"],
    minLength: [6, "Enter minimum 6 character password"]
  }
});

userSchema.pre('save', async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
})

userSchema.statics.login = async function(username, password) {
  const user = await this.findOne({username});
  if(user) {
    const auth = await bcrypt.compare(password, user.password);
    if(auth) {
      return user;
    }
    throw Error('Invalid Password');
  }
  throw Error('Invalid username');
}

/**
 * User Registration Model
 * @param {String} username
 * @param {String} password
 */

module.exports = mongoose.model('User', userSchema)
