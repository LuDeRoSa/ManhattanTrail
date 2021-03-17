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

    let rests = [];
    for (let i = 0; i < path.length; i++) {
      rests[i] = path[i].restaurant;
      rests[i].dataValues.game_type = path[i].game_type;
    }
    res.send(rests);
  } catch (err) {
    next(err);
  }
});

router.get("/:id/:stageId", async (req, res, next) => {
  try {
    const path = await Path.findOne({
      where: {
        path_id: req.params.id,
        stage: req.params.stageId
      }
    });
    res.send(path);
  } catch (err) {
    next(err);
  }
});

//updating game type per stage in the path
router.put('/:id/:stageId', async (req, res, next) => {
  try {
    const path = await Path.findOne({
      where: {
        path_id: req.params.id,
        stage: req.params.stageId
      }
    });
    path.game_type = req.body.game_type;
    console.log(path)
    await path.save();
    res.sendStatus(201);
  } catch (err) {
    next(err);
  }
});




