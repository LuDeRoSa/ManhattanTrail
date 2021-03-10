const Sequelize = require('sequelize');
const db = require('../db');

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

module.exports = Game;
