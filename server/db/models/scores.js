const Sequelize = require('sequelize');
const db = require('../db');

const Scores = db.define('scores', {
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
