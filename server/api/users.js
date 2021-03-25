const router = require('express').Router();
const {
  models: { User, Scores },
} = require('../db');
module.exports = router;

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and username fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'username'],
    });
    res.json(users);
  } catch (err) {
    next(err);
  }
});
router.get('/:id', async (req, res, next) => {
  try {
    const userId = req.params.id;
    const user = await User.findAll({
      where: {
        id: userId,
      },
    });
    res.send(user[0]);
  } catch (err) {
    next(err);
  }
});

router.put('/:user_id/:game_id/:question_id'),
  async (req, res, next) => {
    try {
      const userId = req.params.user_id;
      const gameId = req.params.game_id;
      const questionId = req.params.question_id;

      console.log('THE PUT LOG!!!!!!!!!!!!!', userId, gameId, questionId);
      // const totalScore = await Scores.find({
      //   where: {
      //     game_id: gameId,
      //     user_id: userId,
      //     question_id: questionId
      //   }
      // })

      // const newScore = totalScore+=1;

      // totalScore.update({
      //   totalScore: newScore
      // });

      // await totalScore.save();

      // res.send(totalScore);
    } catch (ex) {
      next(ex);
    }
  };
