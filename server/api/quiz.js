const Sequelize = require('sequelize');
const router = require('express').Router();
const {
  models: { Restaurant, Path, Quiz, User, Game, Scores },
} = require('../db');

module.exports = router;

//generate 5 random questions and return it
router.get('/', async (req, res, next) => {
  try {
    const randomQuestions = await Quiz.findAll({
      limit: 5,
      order: Sequelize.literal('random()'),
    });

    res.send(randomQuestions);
  } catch (err) {
    next(err);
  }
});

///THE OJBECT WE WILL GET BACK FROM QUIZ
/*

{
  QUESTION 1: ANSWER : CORRECT/NOT CORRECT,
  Q2: ANSWER,
  Q3: ANSWER,
  ETC.
  USERID:
}
*/

//NEED SOME WAY TO ACCOUNT FOR ONLY THE CORRECT ANSWERS
//NEED TO PARSE THRU THIS OBJECT
//AND THEN UPDATE THE USER SCORE

router.post('/addScores', async (req, res, next) => {
  try {
    // console.log('the req.body! ', req.body);
    const points = req.body.points;
    //need to update the scores model!

    const user = await User.findByToken(req.headers.authorization);
    // console.log(user);
    let game = await Game.findOne({
      where: {
        userId: user.id,
        status: 'ingame',
      },
      include: Scores,
    });
    // console.log('this is the game data associated to user', game);

    let scoreMatch = await Scores.findOne({
      where: {
        gameId: game.id
      }
    })


    // console.log('we should edit the scores model of this id', scoreMatch);
    // // const score = await Scores.findByPk(game.scoreId);
    // console.log('this is the score found', scoreMatch);
    scoreMatch.total_score = points;
    await scoreMatch.save();

    //or eager load game with the score and send that.
    res.send(scoreMatch);
  } catch (err) {
    next(err);
  }
});
