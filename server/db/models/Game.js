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
  path_name: {
    type: Sequelize.STRING,
  },
});

Game.addHook('beforeValidate', async (game, options) => {
  const path = await Path.findAll({
    where: {
      path_name: game.path_name,
    },
  });
  const gamelength = path.length;
  if (game.stage > gamelength) {
    game.status = 'finished';
    game.stage = gamelength;
    await game.save();
  }
});

module.exports = Game;
