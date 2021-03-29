const router = require('express').Router();
const {
  models: { Restaurant, Path },
} = require('../db');

module.exports = router;

router.get('/:id/restaurants', async (req, res, next) => {
  try {
    const path_name = req.params.id;

    const path = await Path.findAll({
      where: { path_name },
      include: Restaurant,
      order: [['stage', 'ASC']],
    });

    const rests = path.map((path) => {
      let rest = path.restaurant;
      rest.dataValues.game_type = path.game_type;
      return rest;
    });

    res.send(rests);
  } catch (err) {
    next(err);
  }
});
