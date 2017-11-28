const mongoose = require('mongoose');
const { Schema } = mongoose;

const CompetitionSchema = new Schema({
  league: {
    type: Schema.Types.ObjectId,
    ref: 'leagues'
  },
  female: Boolean,
  season: Number
});

const Competition = mongoose.model('competitions', CompetitionSchema);
module.exports = Competition;
