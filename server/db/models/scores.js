const Sequelize = require('sequelize');
const db = require('../db');

const Scores = db.define('scores', {
  // game_id: {
  //   type: Sequelize.INTEGER,
  //   primaryKey: true,
  // },
  //commented out because sequelize relationships will assign a gameId anyway
  user_id: {
    type: Sequelize.INTEGER,
  },
  //commented out because Game already has information about userId
  //we commented this back so we can update user score from the quiz
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
