const router = require('express').Router();
const {
  models: { Quiz },
} = require('../db');

module.exports = router;

router.get('/:id', async (req, res, next) => {
  try {
    let restaurantId = req.params.id;
    const quiz = await Quiz.findOne({
      where: {
        restaurantId,
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
