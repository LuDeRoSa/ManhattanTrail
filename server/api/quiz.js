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
        gameId: game.id,
      },
    });

    // console.log('we should edit the scores model of this id', scoreMatch);
    // // const score = await Scores.findByPk(game.scoreId);
    // console.log('this is the score found', scoreMatch);
    scoreMatch.total_score += points;
    scoreMatch.id = user.id;
    await scoreMatch.save();

    //or eager load game with the score and send that.
    res.send(scoreMatch);
  } catch (err) {
    next(err);
  }
});
