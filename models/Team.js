const mongoose = require('mongoose');
const { Schema } = mongoose;

const TeamSchema = new Schema({
  name: String,
  city: {
    type: Schema.Types.ObjectId,
    ref: 'cities'
  },
  competitions: [{
    type: Schema.Types.ObjectId,
    ref: 'competitions'
  }],
  dvIds: [String]
});

const Team = mongoose.model('teams', TeamSchema);
module.exports = Team;
