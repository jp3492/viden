const mongoose = require('mongoose');
const { Schema } = mongoose;

const CitySchema = new Schema({
  name: String,
  country: {
    type: Schema.Types.ObjectId,
    ref: 'countries'
  }
});

const City = mongoose.model('cities', CitySchema);
module.exports = City;
