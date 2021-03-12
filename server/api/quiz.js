const Sequelize = require("sequelize");
const router = require('express').Router();
const {
  models: {Quiz}
} = require("../db");


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



router.post('/:id', async (req, res, next) => {
  try {
    //await - wait for the hook - hook will do its thing-- and send it back ot us
    //post is the bridge to our database
    const id = req.params.id;
    // const quiz
    console.log(req.body);

  } catch (err) {
    next(err);
  }
});

