const router = require('express').Router();
const {
  models: { Restaurant, Path, Quiz, User },
} = require('../db');

module.exports = router;

router.get('/:id/restaurants', async (req, res, next) => {
  try {
    const path_id = req.params.id;

    const path = await Path.findAll({
      where: { path_id },
      include: Restaurant,
      order: [['stage', 'ASC']],
    });
    const rests = path.map((p) => p.restaurant);
    res.send(rests);
  } catch (err) {
    next(err);
  }
});
