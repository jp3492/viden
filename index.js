const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const axios = require('axios');

const keys = require('./config/keys');
require('./models/User');
require('./models/Country');
require('./models/City');
require('./models/League');
require('./models/Competition');
require('./models/Game');
require('./models/Team');
require('./models/Player');
require('./models/Scout');
require('./services/passport');

mongoose.connect(keys.mongoURI);

const app = express();

app.use(bodyParser.json({limit: '1mb' }));
app.use(
  cookieSession({
      maxAge: 1 * 2 * 60 * 60 * 1000,
      keys: [keys.cookieKey]
  })
);
app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);
require('./routes/dataRoutes')(app);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT);

// if (process.env.NODE_ENV === 'production') {
//   setInterval(function() {
//       axios.get("https://aqueous-bastion-77302.herokuapp.com/");
//   }, 30000);
// }