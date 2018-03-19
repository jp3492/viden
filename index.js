const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const axios = require('axios');
const path = require('path');

const keys = require('./config/keys');

const PORT = process.env.PORT || 5000;
const port = 8000;
const INDEX = path.resolve(__dirname, 'client', 'build', 'index.html');

require('./models/User');
require('./models/Highlights');
require('./services/passport');

mongoose.connect(keys.mongoURI);

app.use(bodyParser.json({limit: '1mb' }));
app.use(
  cookieSession({
      maxAge: 10 * 2 * 60 * 60 * 1000,
      keys: [keys.cookieKey]
  })
);
app.use(passport.initialize());
app.use(passport.session());

const app = express()
  .use((req, res) => res.sendFile(INDEX) )
  .listen(PORT, () => console.log(`Listening on ${ PORT }`));
const io = require('socket.io')(app);

require('./routes/authRoutes')(app);
require('./routes/dataRoutes')(app, io);

// if (process.env.NODE_ENV === 'production') {
//   app.use(express.static('client/build'));
//   const path = require('path');
//   app.get('*', (req, res) => {
//     res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
//   });
// }
//
//
// io.listen(port);
// app.listen(PORT);
