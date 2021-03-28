const Sequelize = require('sequelize');
const db = require('../db');

const GAME_OPTIONS = ['quiz', 'cake', 'galaga'];

const Path = db.define('path', {
  path_name: {
    type: Sequelize.STRING,
  },
  stage: {
    type: Sequelize.INTEGER,
  },
  game_type: {
    type: Sequelize.ENUM(...GAME_OPTIONS),
    defaultValue: 'quiz',
  },
});

Path.addHook('afterCreate', async (path, options) => {
  // const gameIndex = Math.floor(Math.random() * GAME_OPTIONS.length);
  const gameIndex = (path.id - 1) % GAME_OPTIONS.length;
  path.game_type = GAME_OPTIONS[gameIndex];
  await path.save();
});

module.exports = Path;
