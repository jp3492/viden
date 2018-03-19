const mongoose = require('mongoose');
const { Schema } = mongoose;

const AccessSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  type: String,
  target: String,
  status: String
});

const FolderSchema = new Schema({
  name: String,
  description: String,
  parent: String,
  privacy: String,
  projects: [{
    type: Schema.Types.ObjectId,
    ref: 'highlights'
  }]
});

const FriendSchema = new Schema({
  _id: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  status: String,
  parent: String
});

const GroupSchema = new Schema({
  name: String,
  description: String,
  parent: String,
  privacy: String,
  friends: [{
    type: Schema.Types.ObjectId,
    ref: 'users'
  }]
})

const UserSchema = new Schema({
  googleId: String,
  firstName: String,
  lastName: String,
  email: String,
  approved: Boolean,
  friends: [FriendSchema],
  folders: [FolderSchema],
  groups: [GroupSchema],
  access: [AccessSchema]
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

const User = mongoose.model('users', UserSchema);
module.exports = User;
