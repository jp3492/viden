const mongoose = require('mongoose');
const { Schema } = mongoose;

const GameSchema = new Schema({
  competition: {
    type: Schema.Types.ObjectId,
    ref: 'competitions'
  },
  home: {
    type: Schema.Types.ObjectId,
    ref: 'teams'
  },
  visit: {
    type: Schema.Types.ObjectId,
    ref: 'teams'
  }
});

const Game = mongoose.model('games', GameSchema);
module.exports = Game;
