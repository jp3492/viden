app.post('/api/friend/group', async (req, res) => {
  const { friend, group } = req.body;
  const { id } = req.user;
  await User.update({ _id: id, "friends._id": friend }, { $set: { "friends.$.parent": group }});
  const user = await User.findById(id);
  res.send("success");
});
app.delete('/api/friend/:_id', async (req, res) => {
  const { _id } = req.params;
  const { id } = req.user;
  await User.update({ _id }, { $pull: { friends: { _id: id } } });
  await User.update({ _id: id }, { $pull: { friends: { _id } } });
  res.send("success");
});
app.post('/api/group', async (req, res) => {
  const { name, description, privacy, parent, dataArray } = req.body;
  const { id } = req.user;
  const group = { name, description, privacy, parent, friends: dataArray };
  await User.update({ _id: id }, { $push: { groups: group } } );
  const user = await User.findById(id);
  const newGroup = user.groups.filter( g => { return g.name === name });
  res.send(newGroup[0]);
})
app.post('/api/folder', async (req, res) => {
  const { name, description, privacy, parent } = req.body;
  const { id }    = req.user;
  const folder = { name, description, privacy, parent };
  await User.update({ _id: id }, { $push: { folders: folder } } );
  const user = await User.findById(id);
  const newFolder = user.folders.filter( f => { return f.name === name });
  res.send(newFolder[0]);
});
app.post('/api/project', async (req, res) => {
  const { name, description, privacy, parent, dataArray } = req.body;
  const { id } = req.user;
  const newProject = new Highlights({ title: name, description, videos: dataArray, privacy, parent, _uid: id });
  await newProject.save();
  res.send(newProject);
});
io.on('connection', (client) => {
  client.on('subscribeToTimer', async (interval) => {
    const users = await User.find();
    client.emit('timer', users.length);
  });
});
app.post('/api/friend', async (req, res) => {                             const { _id } = req.body;
                                                                          const { id } = req.user;
                                                                          await User.update({ _id: id, "friends._id": _id }, { $set: { "friends.$.status" : "confirmed" } });
                                                                          await User.update({ _id, "friends._id": id }, { $set: { "friends.$.status" : "confirmed" } });
                                                                          const me = await User.findById(id);
                                                                          const you = await User.findById(_id);
                                                                          console.log(me, you);
                                                                          res.send("success");
                                                                        })
app.get('/api/friend/:_id', async (req, res) => {                         const { _id } = req.params;
                                                                          let projects = await Highlights.find({ _uid: _id });
                                                                          projects = projects.map( p => {
                                                                            return { _id: p._id, title: p.title, description: p.description, videos: p.videos, _uid: p._uid };
                                                                          });
                                                                          const user = await User.findById(_id);
                                                                          res.send({user, projects});
                                                                        })
app.post('/api/user/request', async (req, res) => {                       const { _id } = req.body;
                                                                          const { id } = req.user;
                                                                          const friend = await User.findById(_id);
                                                                          const me = await User.findById(id);
                                                                          const newFriend = { _id, status: "requestSent", firstName: friend.firstName, lastName: friend.lastName, parent: null };
                                                                          const newRequest = { _id: id, status: "requested", firstName: me.firstName, lastName: me.lastName, parent: null };
                                                                          await User.update({ _id: id }, { $push: { friends: newFriend } });
                                                                          await User.update({ _id }, { $push: { friends: newRequest } });
                                                                          res.send(newFriend);
                                                                        })
app.delete('/api/folder/:_id', async (req, res) => {                      const { _id } = req.params;
                                                                          const { id } = req.user;
                                                                          await User.update({ _id: id }, { $pull: { folders: { _id } }});
                                                                          res.send("succes");
                                                                        })
app.post('/api/folder/update', async (req, res) => {                      const { _id, name } = req.body;
                                                                          const { id } = req.user;
                                                                          await User.update({ _id: id, "folders._id": _id }, { $set: { "folders.$.name": name } });
                                                                          const user = await User.findById(id);
                                                                          res.send("success");
                                                                        })
app.post('/api/highlights/folder', async (req, res) => {                  const { pid, fid } = req.body;
                                                                          const { id } = req.user;
                                                                          await User.update({ _id: id, "folders.projects": pid}, { $pull: { "folders.$.projects": pid }})
                                                                          await User.update({ _id: id, "folders._id": fid}, { $push: { "folders.$.projects": pid } })
                                                                          const user = await User.findById(id);
                                                                          await Highlights.update({ _id: pid }, { parent: fid });
                                                                          res.send("success");
                                                                        });
app.post('/api/folder', async (req, res) => {                             const { id }    = req.user;
                                                                          const { title } = req.body;
                                                                          const folder = { name: title };
                                                                          await User.findOneAndUpdate({ _id: id }, { $push: { folders: folder } } );
                                                                          const user = await User.findById(id);
                                                                          const newFolder = user.folders.filter( f => { return f.name === title });
                                                                          res.send(newFolder[0]);
                                                                        });

app.get('/api/view/:_id', async (req, res) => {                           const { _id } = req.params;
                                                                          const high = await Highlights.findById(_id);
                                                                          res.send(high); })
app.post('/api/dv', async ( req, res ) => {                               const { title, description, videos, dv } = req.body;
                                                                          const { id } = req.user;
                                                                          const videoId = videos[0].videoId;
                                                                          let actions = dv.split("[3SCOUT]")[1].split("\n");
                                                                          let teams = dv.split("[3TEAMS]")[1].split("[3MORE]")[0].split('\n'); teams.shift(); teams.pop();
                                                                          let team_home = teams[0].split(';');
                                                                          let team_visit = teams[1].split(';');
                                                                          teams = { home: { id: team_home[0], name: team_home[1], coach: team_home[3], staff: team_home[4] },
                                                                                    visit: { id: team_visit[0], name: team_visit[1], coach: team_visit[3], staff: team_visit[4] } }
                                                                          actions.shift();
                                                                          actions.pop();
                                                                          scout = actions.map(stat => stat.split(';'));
                                                                          let clean_scout = [];
                                                                          let left_scout = [];
                                                                          scout.map(stat => {
                                                                            if (stat[0].includes('>') || stat[0].includes('$$') || stat[0].includes('z') || stat[0][1] === 'T' || stat[0].includes('c') || stat[0][1] === 'P' || stat[0].includes('s')) {
                                                                              left_scout.push(stat) } else {
                                                                              clean_scout.push(stat) } return null } );

                                                                          function alterQuality(quality) {
                                                                            switch (quality) {
                                                                              case "#": return 5; case "+": return 4; case "!": return 3; case "/": return 2; case "-": return 1; case "=": return 0; default: return null;
                                                                            }
                                                                          }
                                                                          function alterHome(home){
                                                                            if (home === "*") {
                                                                              return teams.home.name.substr(0,3).toLowerCase();
                                                                            }
                                                                            return teams.visit.name.substr(0,3).toLowerCase();
                                                                          }
                                                                          let s_h = 0, s_v = 0, p_h = 0, p_v = 0, s = 1, reset = false;
                                                                          function setScores(stat){
                                                                            if (reset === true) {
                                                                              p_h = 0;
                                                                              p_v = 0;
                                                                              reset = false;
                                                                            }
                                                                            if (stat.includes('*p')) {
                                                                              p_h++;
                                                                              const diff = p_h - p_v;
                                                                              if (p_h >= 25 && diff > 1) {
                                                                                s_h++;
                                                                                s++;
                                                                                reset = true;
                                                                              }
                                                                            } else if (stat.includes('ap')) {
                                                                              p_v++;
                                                                              const diff = p_v - p_h;
                                                                              if (p_v >= 25 && diff > 1) {
                                                                                s_v++;
                                                                                s++;
                                                                                reset = true;
                                                                              }
                                                                            }
                                                                          }

                                                                          scout = clean_scout.map(stat => {
                                                                            setScores(stat[0]);
                                                                            if (!stat[0].includes('p')) {
                                                                              let isHome;
                                                                              let quality;
                                                                              isHome = alterHome(stat[0][0]);
                                                                              quality = alterQuality(stat[0][5]);
                                                                              return { time: stat[12], home: isHome, player: Number(stat[0].substr(1,2)), action: stat[0][3], type: stat[0][4], quality, s, s_h, s_v, p_h, p_v };
                                                                            }
                                                                          });
                                                                          scout.map((stat, i) => {
                                                                            if (stat === undefined) {
                                                                              scout.splice(i, 1);
                                                                            }
                                                                          });
                                                                          scout = scout.map((stat, i) => {
                                                                            stat.index = i+1;
                                                                            return stat;
                                                                          });
                                                                          scout = scout.map( stat => {
                                                                            const stop = Number(stat.time) + 15;
                                                                            const comment = `${stat.home} - ${stat.player}: ${stat.action}, ${stat.type} -> ${stat.quality}. ${stat.s_h}:${stat.s_v}, ${stat.p_h}:${stat.p_v}`;
                                                                            return { start: Number(stat.time), stop, comment, videoId }
                                                                          })
                                                                          const newHighlights = new Highlights({ title, description, videos, _uid: id });
                                                                          await newHighlights.save();
                                                                          const _id = newHighlights._id;
                                                                          scout.map( async (highlight) => {
                                                                            await Highlights.findOneAndUpdate({ _id }, { $push: { highlights: highlight } } );
                                                                          });
                                                                          res.send(newHighlights);
                                                                        })
app.post('/api/highlights/update', async (req, res) => {                  const { id, videos, title } = req.body;
                                                                          const ids = videos.map( v => { return v.videoId } );
                                                                          const oldHigh = await Highlights.findById(id);
                                                                          highs = oldHigh.highlights.filter( h => {
                                                                            if (ids.includes(h.videoId)) {
                                                                              return true;
                                                                            }
                                                                            return false;
                                                                          });
                                                                          await Highlights.findOneAndUpdate({ _id: id}, { videos, title, highlights: highs });
                                                                          const highlights = await Highlights.findById(id);
                                                                          res.send(highlights);
                                                                        });
app.get('/api/highlights/videos/:_id', async (req, res) => {              const { _id } = req.params;
                                                                          const highlight = await Highlights.find({ _id });
                                                                          res.send(highlight[0].videos);
                                                                        });
app.get('/api/users', async (req, res) => {                               const users = await User.find({});
                                                                          res.send(users);
                                                                        });
app.get(`/api/search/:option/:term`, async(req, res) => {                 const { term, option } = req.params;
                                                                          switch (option) {
                                                                            case "projects":
                                                                              const byName = await Highlights.find({ "title": { "$regex": term, "$options": "i" } });
                                                                              res.send(byName);
                                                                            case "people":
                                                                              const usersF = await User.find({ "firstName": { "$regex": term, "$options": "i" } });
                                                                              const usersL = await User.find({ "lastName": { "$regex": term, "$options": "i" } });
                                                                              const usersE = await User.find({ "email": { "$regex": term, "$options": "i" } });
                                                                              let users = usersF.concat(usersL, usersE);
                                                                              users = _.uniqBy(users, 'email');
                                                                              users = users.filter( u => { return u.email !== req.user.email });
                                                                              res.send(users);
                                                                          }
                                                                        });
app.get(`/api/view/:_id`, async (req, res) => {                           const { _id } = req.params;
                                                                          const highlight = await Highlights.find({_id});

                                                                          res.send(highlight[0]);
                                                                        });
app.delete('/api/highlights/highlight/:_id/:id', async (req, res) => {    const { _id, id } = req.params;
                                                                          await Highlights.findOneAndUpdate(
                                                                            { _id }, { $pull: { highlights: { _id: id } } });
                                                                          res.send(id);
                                                                        });
app.delete('/api/highlights/:_id', async (req, res) => {                  const { _id } = req.params;
                                                                          await Highlights.findByIdAndRemove( _id );
                                                                          let highlights = await Highlights.find({ _uid: req.user.id });
                                                                          highlights = highlights.map( h => {
                                                                            return { _id: h._id, title: h.title, videos: h.videos, _uid: h._uid, folder: h.folder, description: h.description };
                                                                          });
                                                                          res.send(highlights);
                                                                        });
app.post('/api/highlights/highlight/:_id/:id', async (req, res) => {      const { _id, id } = req.params;
                                                                          const { start, stop, comment, videoId } = req.body;
                                                                          await Highlights.update(
                                                                            { "_id": _id, "highlights._id": id },
                                                                            { $set: { "highlights.$" : { start, stop, comment, videoId } } });
                                                                          const high = await Highlights.findById(_id);
                                                                          res.send(high.highlights);
                                                                        });
app.post('/api/highlights/:_id', async (req, res) => {                    const { _id } = req.params;
                                                                          const { start, stop, comment, videoId } = req.body;
                                                                          await Highlights.findOneAndUpdate({ _id }, { $push: { highlights: req.body } } );
                                                                          const highlights = await Highlights.findOne({ _id });
                                                                          const highlight = highlights.highlights.filter( h => {
                                                                            return (Number(h.start) === Number(start) && Number(h.stop) === Number(stop) && h.comment === comment && h.videoId === videoId);
                                                                          });
                                                                          res.send(highlight[0]);
                                                                        });
app.get('/api/highlights/:_id', async (req, res) => {                     const { _id } = req.params;
                                                                          const high = await Highlights.findById(_id);
                                                                          res.send(high.highlights);
                                                                        });
app.get('/api/highlights', async (req, res) => {                          const { id } = req.user;
                                                                          let highlights = await Highlights.find({ _uid: id });
                                                                          highlights = highlights.map( h => {
                                                                            return { _id: h._id, title: h.title, description: h.description, videos: h.videos, _uid: h._uid, parent: h.parent, privacy: h.privacy };
                                                                          });
                                                                          res.send(highlights);
                                                                        });
app.post('/api/highlights', async (req, res) => {                         const { title, description, videos, parent } = req.body;
                                                                          const { id } = req.user;
                                                                          const newHighlights = new Highlights({ title, description, videos, _uid: id, parent });
                                                                          await newHighlights.save();
                                                                          res.send(newHighlights);
                                                                        });
