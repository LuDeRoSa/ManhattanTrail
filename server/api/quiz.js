const Sequelize = require('sequelize');
const router = require('express').Router();
const {
  models: { Quiz, User, Scores },
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

    console.log('the req.body! ', req.body);
    const points = req.body.points;
    //need to update the scores model!

    const user = await User.findByToken(req.headers.authorization);
    console.log(user);




    res.sendStatus(200);
  } catch (err) {
    next(err);
  }
});

