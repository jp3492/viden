const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const axios = require('axios');

const keys = require('./config/keys');

const PORT = process.env.PORT || 5000;
const INDEX = path.resolve(__dirname, 'client', 'build', 'index.html');

require('./models/User');
require('./models/Highlights');
require('./services/passport');

mongoose.connect(keys.mongoURI);

const server = express()
  .use((req, res) => res.sendFile(INDEX) )
  .listen(PORT, () => console.log(`Listening on ${ PORT }`));

const io = socketIO(server);

io.on('connection', (socket) => {
  console.log('Client connected');
  socket.on('disconnect', () => console.log('Client disconnected'));
});
// app.use(bodyParser.json({limit: '1mb' }));
// app.use(
//   cookieSession({
//       maxAge: 10 * 2 * 60 * 60 * 1000,
//       keys: [keys.cookieKey]
//   })
// );
// app.use(passport.initialize());
// app.use(passport.session());

// if (process.env.NODE_ENV === 'production') {
//   app.use(express.static('client/build'));
//   const path = require('path');
//   app.get('*', (req, res) => {
//     res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
//   });
// }

require('./routes/authRoutes')(server);
require('./routes/dataRoutes')(server, io);
//
// server.listen(PORT);
