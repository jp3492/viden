const _ = require('lodash');
const mongoose = require('mongoose');
const User = mongoose.model('users');
const Highlights = mongoose.model('highlights');

module.exports = app => {
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
                                                                            console.log(high);
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
                                                                              return { _id: h._id, title: h.title, videos: h.videos, _uid: h._uid };
                                                                            });
                                                                            res.send(highlights);
                                                                          });
  app.post('/api/highlights', async (req, res) => {                         const { title, videos } = req.body;
                                                                            const { id } = req.user;
                                                                            const newHighlights = new Highlights({ title, videos, _uid: id });
                                                                            await newHighlights.save();
                                                                            res.send(newHighlights);
                                                                          });
};
