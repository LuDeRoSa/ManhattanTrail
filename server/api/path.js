const router = require('express').Router();
const {
  models: { Restaurant, Path },
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

router.get('/:id/:stageId', async (req, res, next) => {
  try {
    const path = await Path.findOne({
      where: {
        path_id: req.params.id,
        stage: req.params.stageId,
      },
    });
    res.send(path);
  } catch (err) {
    next(err);
  }
});
