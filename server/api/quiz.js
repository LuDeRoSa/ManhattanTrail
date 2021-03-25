const Sequelize = require('sequelize');
const router = require('express').Router();
const {
  models: { Restaurant, Path, Quiz, User, Game, Scores },
} = require('../db');

module.exports = router;

//generate 5 random questions and return it
router.get('/:id', async (req, res, next) => {
  try {
    const quiz = await Quiz.findOne({
      where: {
        restaurantId: req.params.id,
      },
      include: {
        all: true,
        nested: true,
      },
    });
    //magic - eager loading of every nested model
    res.send(quiz);
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
