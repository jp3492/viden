const mongoose = require('mongoose');
const { Schema } = mongoose;

const StatSchema = new Schema({
  home: Boolean,
  player: Number,
  action: String,
  type: String,
  quality: Number,
  s: Number,
  s_h: Number,
  s_v: Number,
  p_h: Number,
  p_v: Number,
  index: Number
});

const ReportSchema = new Schema({
  result: [{
    set: Number,
    home: Number,
    visit: Number,
    time: Number
  }],
  players: {
    home:[{
      _id: {
        type: Schema.Types.ObjectId,
        ref: 'players'
      },
      firstName: String,
      lastName: String,
      number: Number,
      position: Number
    }],
    visit:[{
      _id: {
        type: Schema.Types.ObjectId,
        ref: 'players'
      },
      firstName: String,
      lastName: String,
      number: Number,
      position: Number
    }]
  },
  stats: [StatSchema]
});

const ScoutSchema = new Schema({
  name: String,
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  game: {
    type: Schema.Types.ObjectId,
    ref: 'games'
  },
  report: ReportSchema
});

const Scout = mongoose.model('scouts', ScoutSchema);
module.exports = Scout;
