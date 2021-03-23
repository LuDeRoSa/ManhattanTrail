const Sequelize = require('sequelize');
const db = require('../db');

const GAME_OPTIONS = ['quiz', 'cake'];

const Path = db.define('path', {
  path_id: {
    type: Sequelize.INTEGER,
  },
  stage: {
    type: Sequelize.INTEGER,
  },
  game_type: {
    type: Sequelize.ENUM(...GAME_OPTIONS),
    defaultValue: 'quiz',
  },
});

Path.addHook('beforeSave', (path, options) => {
  const gameIndex = Math.floor(Math.random() * GAME_OPTIONS.length);
  path.game_type = GAME_OPTIONS[gameIndex];
});

module.exports = Path;
