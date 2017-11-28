const mongoose = require('mongoose');
const { Schema } = mongoose;

const PlayerSchema = new Schema({
  firstName: String,
  lastName: String,
  nationality: {
    type: Schema.Types.ObjectId,
    ref: 'countries'
  },
  birthYear: Number,
  dvIds: [String]
});

const Player = mongoose.model('players', PlayerSchema);
module.exports = Player;
