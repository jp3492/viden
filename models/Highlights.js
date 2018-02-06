const mongoose = require('mongoose');
const { Schema } = mongoose;

const HighlightSchema = new Schema({
  start: Number,
  stop: Number,
  comment: String
});

const HighlightsSchema = new Schema({
  _uid: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  title: String,
  videoId: String,
  highlights: [HighlightSchema]
});

const Highlights = mongoose.model('highlights', HighlightsSchema);
module.exports = Highlights;
