const mongoose = require('mongoose');
const { Schema } = mongoose;

const CountrySchema = new Schema({
  name: String
});

const Country = mongoose.model('countries', CountrySchema);
module.exports = Country;
