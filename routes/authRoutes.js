const passport = require('passport');
const mongoose = require('mongoose');
const _ = require('lodash');
const User = mongoose.model('users');
const Highlights = mongoose.model('highlights');

module.exports = app => {
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
};
