const router = require('express').Router();
const {
  models: { User, Favorite },
} = require('../db');

module.exports = router;

router.post('/addFave', async (req, res, next) => {
  try {
    const user = await User.findByToken(req.headers.authorization);
    let fave = await Favorite.findOne({
      where: {
        restaurantId: req.body.restId,
      },
    });
    if (!fave) {
      fave = await Favorite.create({
        restaurantId: req.body.restId,
        userId: user.id,
      });
    }
    res.send(fave);
  } catch (err) {
    next(err);
  }
});

router.get('/:id', async (req, res, next) => {
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
    // console.log('api', fave);
  } catch (err) {
    next(err);
  }
});
