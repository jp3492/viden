const mongoose = require('mongoose');
const { Schema } = mongoose;

const LeagueSchema = new Schema({
  name: String,
  country: {
    type: Schema.Types.ObjectId,
    ref: 'countries'
  }
});

const League = mongoose.model('leagues', LeagueSchema);
module.exports = League;
