const _ = require('lodash');
const mongoose = require('mongoose');
const User = mongoose.model('users');
const Highlights = mongoose.model('highlights');

module.exports = app => {
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
  app.get(`/api/search/:term`, async(req, res) => {                         const { term } = req.params;
                                                                            const byName = await Highlights.find({ "title": { "$regex": term, "$options": "i" } });
                                                                            res.send(byName);
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
                                                                              return { _id: h._id, title: h.title, videos: h.videos, _uid: h._uid };
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
                                                                              return { _id: h._id, title: h.title, description: h.description, videos: h.videos, _uid: h._uid };
                                                                            });
                                                                            res.send(highlights);
                                                                          });
  app.post('/api/highlights', async (req, res) => {                         const { title, description, videos } = req.body;
                                                                            const { id } = req.user;
                                                                            const newHighlights = new Highlights({ title, description, videos, _uid: id });
                                                                            await newHighlights.save();

                                                                            res.send(newHighlights);
                                                                          });
};
