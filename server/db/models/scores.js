const Sequelize = require('sequelize');
const db = require('../db');

const Scores = db.define('scores', {
  // game_id: {
  //   type: Sequelize.INTEGER,
  //   primaryKey: true,
  // },
  //commented out because sequelize relationships will assign a gameId anyway
  // user_id: {
  //   type: Sequelize.INTEGER,
  // },
  //commented out because Game already has information about userId
  total_score: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
  },
  date_time: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW,
  },
});

module.exports = Scores;
