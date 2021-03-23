// when new game button is pressed, put new blank row for user_responses and scores tables

const router = require('express').Router();
const {
  models: { User, User_Responses, Scores },
} = require('../db');
module.exports = router;

// Variable for number of questions per quiz (in case we change)
let numQuestions = 5;

// POST /responses/user_id/game_id
router.post('/:user_id/:path_id/:game_id', async (req, res, next) => {
  try {
    for (let i = 0; i < numQuestions; i++) {
      const newResponseRow = await User_Responses.create({
        user_id: req.params.user_id,
        game_id: req.params.game_id,
        path_id: req.params.path_id,
        question_id: i,
        question_one_points: 0,
        question_two_points: 0,
        question_three_points: 0,
        question_four_points: 0,
        question_five_points: 0,
      });
      res.status(201).send(newResponseRow);
    }
  } catch (err) {
    next(err);
  }
});

// PUT user/user_id/game_id/question_id
// (will put the question points in the req.body)
router.put('/:user_id/:game_id/:question_id', async (req, res, next) => {
  try {
    const responseToEdit = await User_Response.findOne({
      where: {
        game_id: req.params.game_id,
        question_id: req.params.question_id,
        user_id: req.params.user_id,
      },
    });
    await responseToEdit.update(req.body);
  } catch (ex) {
    next(ex);
  }
});
