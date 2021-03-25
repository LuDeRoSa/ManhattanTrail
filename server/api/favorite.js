const Sequelize = require('sequelize');
const router = require('express').Router();
const {
  models: { Restaurant, Path, Quiz, User, Game, Scores, Favorite },
} = require('../db');

module.exports = router;

router.post('/addFave', async (req, res, next) => {
  try {
    const user = await User.findByToken(req.headers.authorization);
    let fave = await Favorite.create({
      restaurantId: req.body.restId,
      userId: user.id,
    });
    res.send(fave);
  } catch (err) {
    next(err);
  }
});
