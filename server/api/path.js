const router = require('express').Router();
const {
  models: { Restaurant, Path, Quiz, User },
} = require('../db');

module.exports = router;

router.get('/:id/restaurants', async (req, res, next) => {
  try {
    const id = req.params.id;

    const restaurant = await Restaurant.findByPk(id);
    // console.log(restaurant)
    // const quiz = await Quiz.findByPk(restaurant.restaurant_id);
    // const user = await User.findByPk(id);

    const dataReturn = {
      restaurant,
      // quiz,
      // user,
    };

    // res.send("testing this path to see if it exists!")
    res.send(dataReturn);
  } catch (err) {
    next(err);
  }
});
