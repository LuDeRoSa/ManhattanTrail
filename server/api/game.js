const router = require('express').Router();
const {
  models: { Restaurant, Path, Quiz, User, Game },
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
        pathId: req.body.pathId || 1,
      });
    }
    res.send(game);
  } catch (err) {
    next(err);
  }
});
