const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
  googleId: String,
  firstName: String,
  lastName: String,
  email: String,
  approved: Boolean
});

const User = mongoose.model('users', UserSchema);
module.exports = User;
