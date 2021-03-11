const Sequelize = require('sequelize');
const db = require('../db');
const Path = require('./path');
const Game = db.define('game', {
  stage: {
    type: Sequelize.INTEGER,
    defaultValue: 1,
  },
  status: {
    type: Sequelize.INTEGER,
    type: Sequelize.ENUM('ingame', 'finished'),
    defaultValue: 'ingame',
  },
});

Game.addHook('beforeValidate', async (game, options) => {
  const path = await Path.findAll({
    where: {
      path_id: game.pathId,
    },
  });
  const gamelength = path.length;
  if (game.stage > gamelength) {
    game.status = 'finished';
    game.stage = gamelength;
    await game.save(); //do we need this?
  }
});

module.exports = Game;
