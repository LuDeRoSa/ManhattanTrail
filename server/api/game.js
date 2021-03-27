const router = require('express').Router();
const {
  models: { User, Game, Scores },
} = require('../db');

module.exports = router;

router.get('/', async (req, res, next) => {
  try {
    const user = await User.findByToken(req.headers.authorization);
    let game = await Game.findOne({
      where: {
        userId: user.id,
        status: 'ingame',
      },
    });
    if (!game) {
      //create game
      game = await Game.create({
        pathId: req.body.pathId || 1, //category definition can happen here
        userId: user.id,
      });
      const score = await Scores.create({
        gameId: game.id,
      });
    }

    game = await Game.findOne({
      where: {
        userId: user.id,
        status: 'ingame',
      },
      include: Scores,
    });
    res.send(game);
  } catch (err) {
    next(err);
  }
});

router.put('/next', async (req, res, next) => {
  try {
    const user = await User.findByToken(req.headers.authorization);
    let game = await Game.findOne({
      where: {
        userId: user.id,
        status: 'ingame',
      },
    });
    game.stage++;
    await game.save();
    res.send(game);
  } catch (err) {
    next(err);
  }
});

router.get('/pastgames', async (req, res, next) => {
  try {
    const user = await User.findByToken(req.headers.authorization);
    //TODO: fetch user name in place of userId
    const pastgames = await Game.findAll({
      where: {
        userId: user.id,
        status: 'finished',
      },
      include: [Scores, User],
    });
    res.send(pastgames);
  } catch (err) {
    next(err);
  }
});

router.post('/addScores', async (req, res, next) => {
  try {
    const points = req.body.points;
    const user = await User.findByToken(req.headers.authorization);
    let game = await Game.findOne({
      where: {
        userId: user.id,
        status: 'ingame',
      },
      include: Scores,
    });

    let scoreMatch = await Scores.findOne({
      where: {
        gameId: game.id,
      },
    });

    scoreMatch.total_score += points;
    await scoreMatch.save();
    res.send(scoreMatch);
  } catch (err) {
    next(err);
  }
});

//this is an opportunity to use socket.io for live updates
router.get('/leadership', async (req, res, next) => {
  try {
    //TODO: fetch user name in place of userId
    const leadership = await Game.findAll({
      where: {
        status: 'finished',
      },
      include: [Scores, User],
      order: [[{ model: Scores }, 'total_score', 'DESC']],
      limit: 10,
    });
    res.send(leadership);
  } catch (err) {
    next(err);
  }
});
