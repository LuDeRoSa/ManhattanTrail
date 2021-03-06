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


