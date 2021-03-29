const router = require('express').Router();
const {
  models: { Quiz },
} = require('../db');

module.exports = router;

router.get('/:id', async (req, res, next) => {
  try {
    //VERY TEMP CODE
    //TODO fix seeding so we have specifically designated quiz to restaurant relationships
    //restaraunts id should very specifically bring up a designated quiz in future
    let restaurantId;
    if (req.params.id === 8) {
      restaurantId = 8; //for the one seeded path of gluten-free
    } else {
      restaurantId = 1;
    }
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
