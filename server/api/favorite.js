const router = require('express').Router();
const {
  models: { User, Favorite },
} = require('../db');

module.exports = router;

router.post('/addFavorite', async (req, res, next) => {
  try {
    const user = await User.findByToken(req.headers.authorization);
    let favorite = await Favorite.findOne({
      where: {
        restaurantId: req.body.restId,
      },
    });
    if (!favorite) {
      favorite = await Favorite.create({
        restaurantId: req.body.restId,
        userId: user.id,
      });
    }
    res.send(favorite);
  } catch (err) {
    next(err);
  }
});

router.get('/', async (req, res, next) => {
  try {
    const user = await User.findByToken(req.headers.authorization);
    let favorites = await Favorite.findAll({
      where: {
        userId: user.id,
      },
      include: {
        all: true,
        nested: true,
      },
    });
    res.send(favorites);
  } catch (err) {
    next(err);
  }
});
