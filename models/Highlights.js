const mongoose = require('mongoose');
const { Schema } = mongoose;

const AccessSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  status: String
});

const CommentSchema = new Schema({
  comment: String,
  _uid: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  }
});

const HighlightSchema = new Schema({
  index: Number,
  start: Number,
  stop: Number,
  comment: String,
  video: Number,
  _opid: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  _ohid: String,
  comments: [CommentSchema]
});

const HighlightsSchema = new Schema({
  _uid: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  title: String,
  description: String,
  privacy: String,
  parent: String,
  type: String,
  videos: [String],
  highlights: [HighlightSchema],
  sort: String,
  access: [AccessSchema]
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

const Highlights = mongoose.model('highlights', HighlightsSchema);
module.exports = Highlights;
