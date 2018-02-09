const _ = require('lodash');
const mongoose = require('mongoose');
const User = mongoose.model('users');
const Highlights = mongoose.model('highlights');

module.exports = app => {
  app.get(`/api/search/:term`, async(req, res) => {
    const { term } = req.params;
    const byName = await Highlights.find({ "title": { "$regex": term, "$options": "i" } });
    res.send(byName);
  });
  app.get(`/api/view/:_id`, async (req, res) => {
    const { _id } = req.params;
    const highlight = await Highlights.find({_id});
    res.send(highlight[0]);
  });
  //delete highlight within highlights dataset
  app.delete('/api/highlights/highlight/:_id/:id', async (req, res) => {
    const { _id, id } = req.params;
    await Highlights.findOneAndUpdate(
      { _id },
      { $pull: {
        highlights: {
          _id: id
        }
      }});
    const high = await Highlights.findById(_id);
    res.send(high.highlights);
  });
  // //delete highlights dataset
  app.delete('/api/highlights/:_id', async (req, res) => {
    const { _id } = req.params;
    await Highlights.findByIdAndRemove( _id );
    let highlights = await Highlights.find({ _uid: req.user.id });
    highlights = highlights.map( h => {
      return { _id: h._id, title: h.title, videoId: h.videoId };
    });
    res.send(highlights);
  });
  // //edit an exisiting highlight
  app.post('/api/highlights/highlight/:_id/:id', async (req, res) => {
    const { _id, id } = req.params;
    const { start, stop, comment } = req.body;
    await Highlights.update({
      "_id": _id,
      "highlights._id": id
      },{
        $set: { "highlights.$" : { start, stop, comment } }
      });
    const high = await Highlights.findById(_id);
    res.send(high.highlights);
  });
  // //Post a new highlight to highlights dataset
  app.post('/api/highlights/:_id', async (req, res) => {
    const { _id } = req.params;
    console.log(req.body);
    await Highlights.findOneAndUpdate({ _id }, { $push: { highlights: req.body } } );
    const highlights = await Highlights.findOne({ _id });
    res.send(highlights.highlights);
  });
  // get highlihts of selected highlight
  app.get('/api/highlights/:_id', async (req, res) => {
    const { _id } = req.params;
    const high = await Highlights.findById(_id);
    res.send(high.highlights);
  });
  // need to adjust: only send an object with name videoId and Id, then load the highlights of that highlightsVideo when selecting hihglight
  app.get('/api/highlights', async (req, res) => {
    const { id } = req.user;
    let highlights = await Highlights.find({ _uid: id });
    highlights = highlights.map( h => {
      return { _id: h._id, title: h.title, videos: h.videos, _uid: h._uid };
    });
    res.send(highlights);
  });
  //Post a new highlight dataset
  app.post('/api/highlights', async (req, res) => {
    const { title, videos } = req.body;
    const { id } = req.user;
    const newHighlights = new Highlights({ title, videos, _uid: id });
    await newHighlights.save();
    res.send(newHighlights);
  });
};
