const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const axios = require('axios');

const keys = require('./config/keys');

require('./models/User');
require('./models/Highlights');
require('./services/passport');

mongoose.connect(keys.mongoURI);

const app = express();
const io = require('socket.io')();

app.use(bodyParser.json({limit: '1mb' }));
app.use(
  cookieSession({
      maxAge: 10 * 2 * 60 * 60 * 1000,
      keys: [keys.cookieKey]
  })
);
app.use(passport.initialize());
app.use(passport.session());

io.configure(function () {
  io.set("transports", ["xhr-polling"]);
  io.set("polling duration", 10);
});

require('./routes/authRoutes')(app);
require('./routes/dataRoutes')(app, io);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;
const port = 8000;
io.listen(port);
app.listen(PORT);
