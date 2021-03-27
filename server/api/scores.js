const router = require('express').Router();
const {
  models: { Game, Scores },
} = require('../db');
module.exports = router;

//GET route to grab score

router.get('/:id', async (req, res, next) => {
  try {
    const score = await Game.findOne({
      where: {
        status: 'ingame',
        userId: req.params.id,
      },
      include: [Scores],
    });
    res.send(score);
  } catch (err) {
    next(err);
  }
});

// Variable for number of questions per quiz (in case we change)
let numQuestions = 5;

// POST /scores/user_id/game_id
router.post('/:user_id/:game_id', async (req, res, next) => {
  try {
    const newScore = await Scores.create({
      user_id: req.params.user_id,
      game_id: req.params.game_id,
      total_score: 0,
    });
    res.status(201).send(newScore);
  } catch (err) {
    next(err);
  }
});
