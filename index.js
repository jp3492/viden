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
const server = require('http').createServer(app);
const io = require('socket.io').listen(server);

server.use(bodyParser.json({limit: '1mb' }));
server.use(
  cookieSession({
      maxAge: 10 * 2 * 60 * 60 * 1000,
      keys: [keys.cookieKey]
  })
);
server.use(passport.initialize());
server.use(passport.session());

if (process.env.NODE_ENV === 'production') {
  server.use(express.static('client/build'));
  const path = require('path');
  server.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

io.set("transports", ["xhr-polling"]);
io.set("polling duration", 10);

require('./routes/authRoutes')(app);
require('./routes/dataRoutes')(app, io);

const PORT = process.env.PORT || 5000;
server.listen(PORT);
