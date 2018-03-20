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

const User = mongoose.model('users');
const Highlights = mongoose.model('highlights');

const http = require('http');
const app = express();
const socketIo = require('socket.io');

const PORT = process.env.PORT || 5000;

const server = http.createServer(app);
const io = socketIo().listen(server);

app.use(bodyParser.json({limit: '1mb' }));
app.use(
  cookieSession({
      maxAge: 10 * 2 * 60 * 60 * 1000,
      keys: [keys.cookieKey]
  })
);
app.use(passport.initialize());
app.use(passport.session());

server.listen(PORT);

io.on('connection', socket => {
  console.log("client connected");
  socket.on('disconnect', () => console.log("disconnected"));
});

app.get('/auth/google', passport.authenticate('google', {
  scope: ['profile', 'email']
}));

app.get(
  '/auth/google/callback',
  passport.authenticate('google'),
  (req, res) => {
    res.redirect('/');
  }
);

app.get('/api/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

app.get('/api/current_user', async (req, res) => {
  const { _id } = req.user;
  let projects = await Highlights.find({ _uid: _id });
  let user = req.user._doc;
  let foreignProjects = user.access.filter( a => { return (a.type === "project" && a.status === "confirmed") });
  foreignProjects = await Promise.all(foreignProjects.map( async p => {
    const project = await Highlights.findById(p.target);
    return project;
  }));
  foreignProjects = foreignProjects.filter( p => { return p._uid.toString() !== id.toString() });
  projects = projects.concat(foreignProjects);
  user = { ...req.user._doc, projects };
  const friends = await Promise.all(user.friends.map( async f => {
    const reqUser = await User.findById(f._id);
    return { ...f._doc, firstName: reqUser.firstName, lastName: reqUser.lastName };
  }));
  const access = await Promise.all(user.access.map( async a => {
    const reqUser = await User.findById(a.user);
    let reqTarget;
    if (a.type === "project") {
      reqTarget = await Highlights.findById(a.target);
      reqTarget = reqTarget.title;
    } else {
      reqTarget = reqUser.folders.filter( f => { return f._id === a.target });
      reqTarget = reqTarget.name;
    }
    return { ...a._doc, firstName: reqUser.firstName, lastName: reqUser.lastName, name: reqTarget };
  }));
  user = { ...user, friends, access };
  res.send(user);
});

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

// require('./routes/authRoutes')(app);
// require('./routes/dataRoutes')(app, io);
