const _ = require('lodash');
const mongoose = require('mongoose');
const User = mongoose.model('users');
const Highlights = mongoose.model('highlights');

module.exports = (app) => {
  app.post('/api/deleteMultiple', async (req, res) =>{
    await Promise.all(req.body.map( async p => {
      const project = await Highlights.findById(p);
      const user = await User.findById(project._uid);
      const admin = (project._uid.toString() === req.user._id.toString()) ? true: false;
      const access = user.access.filter( a => { return a.target === p});
      Promise.all(access.map( async a => {
        await User.update({ _id: a.user }, { $pull: { access: { target: p } } });
      }));
      await User.update({ _id: project._uid }, { $pull: { access: { target: p } } });
      if (admin === true) {
        await Highlights.remove({ _id: p });
      }
    }));
    const admins = req.body.filter( p => { return p._uid === req.user._id});
    res.send("emoved");
  });
  app.post('/api/answerRequest', async (req, res) => {
    const { me, type, target, user, confirm } = req.body;
    console.log(req.body);
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
    console.log();
    res.send(req.body);
  });
  app.post('/api/request', async (req, res) => {
    const { me, type, target, user } = req.body;
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
    res.send(req.body);
  });
  app.post('/api/deleteHighlight', async (req, res) => {
    const { project, highlight } = req.body;
    await Highlights.update(
      { _id: project }, { $pull: { highlights: { _id: highlight } } });
    res.send(req.body);
  });
  app.post('/api/updateHighlight', async (req, res) => {
    const { project, highlight, start, stop, comment } = req.body;
    await Highlights.update(
      { "_id": project, "highlights._id": highlight },
      { $set: { "highlights.$.start" : start, "highlights.$.stop": stop, "highlights.$.comment": comment } });
    res.send(req.body);
  });
  app.post('/api/submitHighlight', async (req, res) => {
    const { project, video, start, stop, comment } = req.body;
    const highlight = { start, stop, comment, video };
    await Highlights.update({ _id: project }, { $push: { highlights: highlight } } );
    const highlights = await Highlights.findOne({ _id: project });
    const response = highlights.highlights.filter( h => {
      return (Number(h.start) === Number(start) && Number(h.stop) === Number(stop) && h.comment === comment && h.video === video);
    });
    res.send(response[0]);
  });
  app.post('/api/search_global', async (req, res) => {
    const { type, term, _id } = req.body;
    let response;
    regex = new RegExp("^" + term.toLowerCase(), "i");
    switch (type) {
      case "projects":
        response = await Highlights.find({ title: regex });
        break;
      case "people":
        const usersF = await User.find({ firstName: regex });
        const usersL = await User.find({ lastName: regex });
        const usersE = await User.find({ email: regex });
        let users = usersF.concat(usersL, usersE);
        response = _.uniqBy(users, 'email');
        response = response.filter( u => { return u._id.toString() !== _id.toString()});
        break;
    }
    res.send(response);
  });
  app.post('/api/remove', async (req, res) => {
    const { _id, obj } = req.body;
    switch (obj.type) {
      case "folder":  await User.update({ _id }, { $pull: { folders: { _id: obj._id } } }); break;
      case "group":   await User.update({ _id }, { $pull: { groups: { _id: obj._id } } }); break;
      case "project": if (obj._uid === _id) { await Highlights.remove({ _id: obj._id }) }
                      else { await User.update({ _id }, { $pull: { access: { target: obj._id } } });
                             const project = await Highlights.findById(obj._id);
                             await User.update({ _id: project._uid }, { $pull: { access: { target: obj._id } } }); } break;
      case "user":    await User.update({ _id: obj._id }, { $pull: { friends: { _id } } });
                      await User.update({ _id }, { $pull: { friends: { _id: obj._id } } }); break;
    } res.send(obj._id);
  });
  app.post('/api/create_update', async (req, res) => {
    const { update, create, _id, invites } = req.body;
    let response;
    if (update) {
      switch (create.type) {
        case "folder":  await User.update({ _id, "folders._id": create._id }, { $set: { "folders.$": create }});
                        response = { type: "folder", data: create }; break;
        case "group":   await User.update({ _id, "groups._id": create._id }, { $set: { "groups.$": create }});
                        response = { type: "group", data: create }; break;
        case "project": await Highlights.update({ _id: create._id }, { $set: { title: create.title, description: create.description, videos: create.videos, privacy: create.privacy, parent: create.parent }});
                        response = { type: "project", data: create }; break;
        case "user":    await User.update({ _id, "friends._id": create._id }, { $set: { "friends.$.parent": create.parent } });
                        response = { type: "user", data: create }; break;
      }
      if (create.type === "project") {
        await Promise.all(invites.map( async i => {
          await User.update({ _id: i }, { $push: { access: { target: create._id, user: _id, type: create.type, status: "invited" } } });
          await User.update({ _id }, { $push: { access: { target: create._id, user: i, type: create.type, status: "inviteSent" } } });
        }));
      }
    } else {
      switch (create.type) {
        case "dataVolley":  const dv = create.file;
                            let actions = dv.split("[3SCOUT]")[1].split("\n");
                            let teams = dv.split("[3TEAMS]")[1].split("[3MORE]")[0].split('\n'); teams.shift(); teams.pop();
                            let team_home = teams[0].split(';'); let team_visit = teams[1].split(';');
                            teams = { home: { id: team_home[0], name: team_home[1], coach: team_home[3], staff: team_home[4] },
                                      visit: { id: team_visit[0], name: team_visit[1], coach: team_visit[3], staff: team_visit[4] } }
                            actions.shift(); actions.pop();
                            scout = actions.map(stat => stat.split(';'));
                            let clean_scout = []; let left_scout = [];
                            scout.map(stat => {
                              if (stat[0].includes('>') || stat[0].includes('$$') || stat[0].includes('z') || stat[0][1] === 'T' || stat[0].includes('c') || stat[0][1] === 'P' || stat[0].includes('s')) {
                                left_scout.push(stat) } else {
                                clean_scout.push(stat) } return null } );
                            function alterQuality(quality) { switch (quality) { case "#": return 5; case "+": return 4; case "!": return 3; case "/": return 2; case "-": return 1; case "=": return 0; default: return null; } }
                            function alterHome(home){
                              if (home === "*") { return teams.home.name.substr(0,3).toLowerCase() }
                              return teams.visit.name.substr(0,3).toLowerCase(); }
                            let s_h = 0, s_v = 0, p_h = 0, p_v = 0, s = 1, reset = false;
                            function setScores(stat){
                              if (reset === true) { p_h = 0; p_v = 0; reset = false; }
                              if (stat.includes('*p')) { p_h++; const diff = p_h - p_v;
                                if (p_h >= 25 && diff > 1) { s_h++; s++; reset = true; }
                              } else if (stat.includes('ap')) { p_v++; const diff = p_v - p_h;
                                if (p_v >= 25 && diff > 1) { s_v++; s++; reset = true; } } }
                            scout = clean_scout.map(stat => {
                              setScores(stat[0]);
                              if (!stat[0].includes('p')) { let isHome, quality; isHome = alterHome(stat[0][0]); quality = alterQuality(stat[0][5]);
                                return { time: stat[12], home: isHome, player: Number(stat[0].substr(1,2)), action: stat[0][3], type: stat[0][4], quality, s, s_h, s_v, p_h, p_v }; }
                            });
                            scout.map((stat, i) => {
                              if (stat === undefined) { scout.splice(i, 1); } });
                            scout = scout.map((stat, i) => { stat.index = i+1; return stat; });
                            scout = scout.map( stat => {
                              const stop = Number(stat.time) + 15;
                              const comment = `${stat.home},${stat.player}:${stat.action},${stat.type}=${stat.quality}.${stat.s_h}:${stat.s_v},${stat.p_h}:${stat.p_v}`;
                              return { start: Number(stat.time), stop, comment, video: 0 }
                            })
                            const newHighlights = new Highlights({ type: "dataVolley", title: create.title, description: create.description, videos: create.videos, _uid: _id, privacy: create.privacy, parent: create.parent });
                            await newHighlights.save();
                            const id = newHighlights._id;
                            await Promise.all(scout.map( async (highlight) => {
                              await Highlights.update({ _id: id }, { $push: { highlights: highlight } } );
                            }));
                            await Promise.all(invites.map( async i => {
                              await User.update({ _id: i }, { $push: { access: { target: id, user: _id, type: create.type, status: "invited" } } });
                              await User.update({ _id }, { $push: { access: { target: id, user: i, type: create.type, status: "inviteSent" } } });
                            }));
                            const newVolley = await Highlights.findById(id);
                            response = { type: "dataVolley", data: newVolley };
                            break;
        case "project":     const highlights = (create.highlights !== undefined) ? create.highlights: [];
                            const newProject = new Highlights({ highlights, title: create.title, description: create.description, videos: create.videos, parent: create.parent, privacy: create.privacy, _uid: _id });
                            await newProject.save();
                            console.log("mapping here");
                            await Promise.all(invites.map( async i => {
                              await User.update({ _id: i }, { $push: { access: { target: newProject._id, user: _id, type: create.type, status: "invited" } } });
                              await User.update({ _id }, { $push: { access: { target: newProject._id, user: i, type: create.type, status: "inviteSent" } } });
                            }));
                            console.log("mapping not working");
                            response = { type: "project", data: newProject };
                            break;
        case "folder":      const folder = { name: create.name, description: create.description, privacy: create.privacy, parent: create.parent };
                            await User.update({ _id }, { $push: { folders: folder } } );
                            user = await User.findById(_id);
                            const newFolder = user.folders.filter( f => { return f.name === create.name && f.parent === create.parent });
                            response = { type: "folder", data: newFolder[0] };
                            break;
        case "group":       const group = { name: create.name, description: create.description, privacy: create.privacy, parent: create.parent };
                            await User.update({ _id }, { $push: { groups: group } } );
                            user = await User.findById(_id);
                            const newGroup = user.groups.filter( g => { return g.name === create.name && g.parent === create.parent });
                            response =  { type: "group", data: newGroup[0] };
                            break;
      }
    }
    res.send(response);
  });
};
