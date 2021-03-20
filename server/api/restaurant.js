const router = require("express").Router();
const {
  models: { Restaurant },
} = require("../db");

module.exports = router;

router.get("/", async (req, res, next) => {
  try {
    const restaurants = await Restaurant.findAll();
    res.send(restaurants);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const restaurant = await Restaurant.findOne({
      where: {
        id: req.params.id,
      }
    });
    res.send(restaurant);
  } catch (err) {
    next(err);
  }
});


