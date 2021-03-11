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
  console.log('HOOK SEES THIS GAME STAGE', game.stage);
  const path = await Path.findAll({
    where: {
      path_id: game.pathId,
    },
  });
  const gamelength = path.length;
  console.log(gamelength);
  if (game.stage > gamelength) {
    game.status = 'finished';
    // await game.save();
  }
});

module.exports = Game;
