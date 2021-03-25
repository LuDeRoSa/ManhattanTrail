const Sequelize = require('sequelize');
const db = require('../db');

const User_Responses = db.define('user_responses', {
  user_id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
  },
  game_id: {
    type: Sequelize.INTEGER,
  },
  path_id: {
    type: Sequelize.INTEGER,
  },
  restaurant_id: {
    type: Sequelize.INTEGER,
  },
  question_id: {
    type: Sequelize.INTEGER,
  },
  date_time: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW,
  },
  question_points: {
    type: Sequelize.INTEGER,
  },
});

module.exports = User_Responses;
