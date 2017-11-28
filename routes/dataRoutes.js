const _ = require('lodash');
const mongoose = require('mongoose');
const User = mongoose.model('users');
const Country = mongoose.model('countries');
const City = mongoose.model('cities');
const League = mongoose.model('leagues');
const Competition = mongoose.model('competitions');
const Game = mongoose.model('games');
const Team = mongoose.model('teams');
const Player = mongoose.model('players');
const Scout = mongoose.model('scouts');

module.exports = app => {
  app.get('/api/game/:id', async (req, res) => {
    const game = await Scout.findById(req.params.id);
    res.send(game);
  });

  app.get('/api/games', async (req, res) => {
    const scouts = await Scout.find({ user: req.user.id });
    const games = scouts.map(scout => _.pick(scout, ['name', '_id']));
    res.send(games);
  });

  app.post('/api/scout/stats', async (req, res) => {
    const { stats, scout } = req.body;
    const sct = await Scout.findById( scout );
    stats.map(stat => sct.report.stats.push(stat));
    await sct.save();
    res.send(sct);
  });

  app.post('/api/scout/report', async (req, res) => {
    const { report, scout } = req.body;
    const sct = await Scout.findOneAndUpdate({ _id: scout}, { report });
    res.send(sct);
  });

  app.get('/api/scout/:game/:name', async (req, res) => {
    const { game, name } = req.params;
    const { id } = req.user;
    const scout = await Scout.find({game, name, user: id});
    if (!scout[0]) {
      const newScout = new Scout({
        game,
        name,
        user: id
      });
      await newScout.save();
      res.send(newScout);
    } else {
      res.send(scout[0]);
    }
  });

  app.get('/api/game/:competition/:home/:visit', async (req, res) => {
    const { competition, home, visit } = req.params;
    const game = await Game.find({competition, home, visit});
    if (!game[0]) {
      const newGame = new Game({
        competition,
        home,
        visit
      });
      await newGame.save();
      res.send(newGame);
    } else {
      res.send(game[0]);
    }
  });

  app.get('/api/competition/:league/:season', async (req, res) => {
    const { league, season } = req.params;
    const competition = await Competition.find({ league, season });
    if (!competition[0]) {
      const newCompetition = new Competition({
        league,
        season
      });
      await newCompetition.save();
      res.send(newCompetition);
    } else {
      res.send(competition[0]);
    }
  });

  app.get('/api/league/:name', async (req, res) => {
    const { name } = req.params;
    const league = await League.find({name});
    if (!league[0]) {
      const newLeague = new League({
        name
      });
      await newLeague.save();
      res.send(newLeague);
    } else {
      res.send(league[0]);
    }
  });

  app.get('/api/team/:name/:id', async (req, res) => {
    const { name, id } = req.params;
    const team = await Team.find({name});
    if (!team[0]) {
      const newTeam = new Team({
        name,
        dvIds: [id]
      });
      await newTeam.save();
      res.send(newTeam);
    } else {
      res.send(team[0]);
    }
  });

  app.get('/api/player/:lastName/:firstName/:id', async (req, res) => {
    const { lastName, firstName, id } = req.params;
    const player = await Player.find({firstName, lastName});
    if (!player[0]) {
      const newPlayer = new Player({
        firstName,
        lastName,
        dvIds: [id]
      });
      await newPlayer.save();
      res.send(newPlayer);
    } else {
      res.send(player[0]);
    }
  });
};
