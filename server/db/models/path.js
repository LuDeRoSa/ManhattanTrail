const Sequelize = require('sequelize');
const db = require('../db');

const Path = db.define('path', {
  path_id: {
    type: Sequelize.INTEGER,
  },
  stage: {
    type: Sequelize.INTEGER,
  },
});

module.exports = Path;
