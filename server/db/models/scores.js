const Sequelize = require('sequelize');
const db = require('../db');
const Game = require('./Game');
const User = require('./User');

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

Scores.addScores = async function (userId, points) {
  let game = await Game.findOne({
    where: {
      userId,
      status: 'ingame',
    },
    include: Scores,
  });

  let scoreMatch = await Scores.findOne({
    where: {
      gameId: game.id,
    },
  });

  scoreMatch.total_score += points;
  await scoreMatch.save();
  return scoreMatch;
};

module.exports = Scores;
