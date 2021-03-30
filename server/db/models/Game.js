const Sequelize = require('sequelize');
const db = require('../db');
const Path = require('./path');
const Scores = require('./scores');
const User = require('./User');

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

// Game.createGame = async function (userId, path_name) {
//   let game = await Game.create({
//     path_name,
//     userId,
//   });
//   await Scores.create({
//     gameId: game.id,
//   });

//   game = await Game.findOne({
//     where: {
//       userId: user.id,
//       status: 'ingame',
//     },
//     include: Scores,
//   });
//   return game;
// };

Game.getLeadership = function () {
  const leadership = Game.findAll({
    where: {
      status: 'finished',
    },
    include: [Scores, User],
    order: [[{ model: Scores }, 'total_score', 'DESC']],
    limit: 10,
  });
  return leadership;
};

module.exports = Game;
