const _ = require('lodash');
const mongoose = require('mongoose');
const User = mongoose.model('users');
const Highlights = mongoose.model('highlights');

module.exports = (app, io) => {
  io.on('connection', (client) => {
    io.set("transports", ['websocket',
                  'flashsocket',
                  'htmlfile',
                  'xhr-polling',
                  'jsonp-polling',
                  'polling']);
    console.log("connected and set");
    let res, regex;
    client.on('answerRequest', async data => {
      const { me, type, target, user, confirm } = data;
      if (type === "friend") {
        if (confirm === true) {
          await User.update({ _id: me, "friends._id": user }, { $set: { "friends.$.status": "confirmed" } });
          await User.update({ _id: user, "friends._id": me }, { $set: { "friends.$.status": "confirmed" } });
        } else {
          await User.update({ _id: me }, { $pull: { friends: { _id: user } } });
          await User.update({ _id: user }, { $pull: { friends: { _id: me } } });
        }
      } else {
        if (confirm === true) {
          await User.update({ _id: me, "access.target": target }, { $set: { "access.$.status": "confirmed" } });
          await User.update({ _id: user, "access.target": target }, { $set: { "access.$.status": "confirmed" } });
        } else {
          await User.update({ _id: me }, { $pull: { access: { target, user } } });
          await User.update({ _id: user }, { $pull: { access: { target, user: me } } });
        }
      }
      io.emit('answerRequest', data);
    });

    client.on('request', async data => {
      const { me, type, target, user } = data;
      if (type === "friend") {
        const newFriend = { _id: user, status: "requestSent", parent: null };
        const newRequest = { _id: me, status: "requested", parent: null };
        await User.update({ _id: me }, { $push: { friends: newFriend } });
        await User.update({ _id: user }, { $push: { friends: newRequest } });
      } else {
        const newAccess = { user: user, status: "requestSent", type, target };
        const newInvite = { user: me, status: "requested", type, target };
        await User.update({ _id: me }, { $push: {access: newAccess } });
        await User.update({ _id: user }, { $push: { access: newInvite } });
      }
      io.emit('request', data);
    });

    client.on('deleteHighlight', async data => {
      const { project, highlight } = data;
      await Highlights.update(
        { _id: project }, { $pull: { highlights: { _id: highlight } } });
      io.emit('deleteHighlight', data);
    });

    client.on('updateHighlight', async data => {
      const { project, highlight, start, stop, comment } = data;
      await Highlights.update(
        { "_id": project, "highlights._id": highlight },
        { $set: { "highlights.$.start" : start, "highlights.$.stop": stop, "highlights.$.comment": comment } });
      io.emit('updateHighlight', data);
    });

    client.on('submitHighlight', async data => {
      const { project, video, start, stop, comment } = data;
      const highlight = { start, stop, comment, video };
      await Highlights.update({ _id: project }, { $push: { highlights: highlight } } );
      const highlights = await Highlights.findOne({ _id: project });
      res = highlights.highlights.filter( h => {
        return (Number(h.start) === Number(start) && Number(h.stop) === Number(stop) && h.comment === comment && h.video === video);
      });
      io.emit('submitHighlight', res[0]);
    });

    client.on('search', async data => {
      const { type, term, _id } = data;
      regex = new RegExp("^" + term.toLowerCase(), "i");
      switch (type) {
        case "projects":
          res = await Highlights.find({ title: regex });
          break;
        case "people":
          const usersF = await User.find({ firstName: regex });
          const usersL = await User.find({ lastName: regex });
          const usersE = await User.find({ email: regex });
          let users = usersF.concat(usersL, usersE);
          res = _.uniqBy(users, 'email');
          res = res.filter( u => { return u._id.toString() !== _id.toString()});
          break;
      }
      io.emit('search', res);
    });

    client.on('remove', async data => {
      const { _id, obj } = data;
      switch (obj.type) {
        case "folder":  await User.update({ _id }, { $pull: { folders: { _id: obj._id } } }); break;
        case "group":   await User.update({ _id }, { $pull: { groups: { _id: obj._id } } }); break;
        case "project":
          if (obj._uid === _id) {
            await Highlights.remove({ _id: obj._id });
          } else {
            await User.update({ _id }, { $pull: { access: { target: obj._id } } });
            const project = await Highlights.findById(obj._id);
            await User.update({ _id: project._uid }, { $pull: { access: { target: obj._id } } });
          }
          break;
        case "user":
          await User.update({ _id: obj._id }, { $pull: { friends: { _id } } });
          await User.update({ _id }, { $pull: { friends: { _id: obj._id } } }); break;
      }
      io.emit('remove', obj._id);
    });

    client.on('post', async data => {
      const { update, create, _id } = data;
      if (update) {
        switch (create.type) {
          case "folder":
            await User.update({ _id, "folders._id": create._id }, { $set: { "folders.$": create }});
            res = { type: "folder", data: create };
            break;
          case "group":
            await User.update({ _id, "groups._id": create._id }, { $set: { "groups.$": create }});
            res = { type: "group", data: create };
            break;
          case "project":
            await Highlights.update({ _id: create._id }, { $set: { title: create.title, description: create.description, videos: create.videos, privacy: create.privacy, parent: create.parent }});
            res = { type: "project", data: create };
            break;
          case "user":
            await User.update({ _id, "friends._id": create._id }, { $set: { "friends.$.parent": create.parent } });
            res = { type: "user", data: create };
            break;
        }
      } else {
        switch (create.type) {
          case "project":
            const newProject = new Highlights({ title: create.title, description: create.description, videos: create.videos, parent: create.parent, privacy: create.privacy, _uid: _id });
            await newProject.save();
            res = { type: "project", data: newProject };
            break;
          case "folder":
            const folder = { name: create.name, description: create.description, privacy: create.privacy, parent: create.parent };
            await User.update({ _id }, { $push: { folders: folder } } );
            user = await User.findById(_id);
            const newFolder = user.folders.filter( f => { return f.name === create.name && f.parent === create.parent });
            res = { type: "folder", data: newFolder[0] };
            break;
          case "group":
            const group = { name: create.name, description: create.description, privacy: create.privacy, parent: create.parent };
            await User.update({ _id }, { $push: { groups: group } } );
            user = await User.findById(_id);
            const newGroup = user.groups.filter( g => { return g.name === create.name && g.parent === create.parent });
            res =  { type: "group", data: newGroup[0] };
            break;
        }
      }
      io.emit('post', res);
    });
  });
};
