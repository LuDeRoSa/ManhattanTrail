const router = require('express').Router();
const {
  models: { Path },
} = require('../db');

module.exports = router;

router.get('/:id/restaurants', async (req, res, next) => {
  try {
    res.send(await Path.getRestaurants(req.params.id));
  } catch (err) {
    next(err);
  }
});
