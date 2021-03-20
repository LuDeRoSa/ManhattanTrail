const Sequelize = require('sequelize');
const db = require('../db');

const Path = db.define('path', {
  path_id: {
    type: Sequelize.INTEGER,
  },
  stage: {
    type: Sequelize.INTEGER,
  },
  game_type: {
    type: Sequelize.ENUM('quiz', 'cake'),
    defaultValue: 'quiz',
  },
});

module.exports = Path;
