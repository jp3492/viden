const mongoose = require('mongoose');
const { Schema } = mongoose;

const HighlightSchema = new Schema({
  start: Number,
  stop: Number,
  comment: String,
  videoId: String
});

const VideoSchema = new Schema({
  type: String,
  videoId: String
})

const HighlightsSchema = new Schema({
  _uid: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  title: String,
  videos: [VideoSchema],
  highlights: [HighlightSchema]
});

const Highlights = mongoose.model('highlights', HighlightsSchema);
module.exports = Highlights;
