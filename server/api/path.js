const router = require('express').Router();
const {
  models: {Restaurant, Path, Quiz},
} = require("../db");


module.exports = router;

router.get('/:id/restaurants', async (req, res, next) => {
  try {
    const id = req.params.id;
    const restaurant = await Restaurant.findByPk(id);
    const quiz = await Quiz.findAll();

    const dataReturn = {
      restaurant,
      quiz,
    };

    // res.send("testing this path to see if it exists!")
    res.send(dataReturn);

  } catch (err) {
    next(err);
  }
});



// router.get('/:id/restaurants', async (req, res, next) => {
//   try {
//     const id = req.params.id;
//     const restaurant = await Restaurant.findbyPk(id);
//     const quiz = await Quiz.findbyPk(id);


//   } catch (err) {
//     next(err);
//   }
// });
