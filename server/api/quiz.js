const Sequelize = require("sequelize");
const router = require('express').Router();
const {
  models: {Quiz, User}
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
    const user = await User.findByToken(req.headers.authorization);
    console.log("the req.body! ",req.body);
    const currentUserId = req.body.userId;
    let {quizObj} = req.body
    let result = checkAnswers(quizObj)
    console.log("result", result)

  } catch (err) {
    next(err);
  }
});

function checkAnswers(quizObj){
  let count = 0;
  for (let questions in quizObj){
    let currentQuestion = questions;
    let currentAnswer = quizObj[currentQuestion];
    // let correctFlag =


  }
  return count;
}
