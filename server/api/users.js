const router = require('express').Router();
const {
  models: { User },
} = require('../db');
module.exports = router;

router.get('/:id', async (req, res, next) => {
  try {
    const userId = req.params.id;
    const user = await User.findAll({
      where: {
        id: userId,
      },
    });
    res.send(user[0]);
  } catch (err) {
    next(err);
  }
});
