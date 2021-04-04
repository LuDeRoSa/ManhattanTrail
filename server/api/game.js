const router = require('express').Router();
const {
  models: { User, Game, Scores, Path },
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
      include: Scores,
    });
    if (!game) {
      res.status(204);
    }
    res.send(game);
  } catch (err) {
    next(err);
  }
});
router.post('/path', async (req, res, next) => {
  try {
    const user = await User.findByToken(req.headers.authorization);
    const game = await Game.createGame(user.id, req.body.path_name);
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
    game.stage_completed = false;
    await game.save();
    res.send(game);
  } catch (err) {
    next(err);
  }
});
router.get('/pastgames', async (req, res, next) => {
  try {
    const user = await User.findByToken(req.headers.authorization);
    const pastgames = await Game.getPastGames(user.id);
    res.send(pastgames);
  } catch (err) {
    next(err);
  }
});
router.post('/addScores', async (req, res, next) => {
  try {
    const user = await User.findByToken(req.headers.authorization);
    res.send(await Scores.addScores(user.id, req.body.points));
  } catch (err) {
    next(err);
  }
});
//  Track the last completed stage played to avoid multiple score updates to the same mini game after refreshes
router.post('/trackMiniGameStatus', async (req, res, next) => {
  try {
    const user = await User.findByToken(req.headers.authorization);
    res.send(await Game.updateMiniGameStatus(user.id))
  } catch (err) {
    next(err);
  }
});
// Get the current mini game for the mini game completion status
router.get('/miniGameStatus', async (req, res, next) => {
  try {
    const user = await User.findByToken(req.headers.authorization);
    // Find the game we are in and return - we will pull the status when we actually use it
    let game = await Game.findOne({
      where: {
        userId: user.id,
        status: 'ingame',
      },
    });
    res.send(game);
  } catch (err) {
    next(err);
  }
});
// this is an opportunity to use socket.io for live updates
router.get('/leadership', async (req, res, next) => {
  try {
    res.send(await Game.getLeadership());
  } catch (err) {
    next(err);
  }
});