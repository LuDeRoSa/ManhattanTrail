const Sequelize = require('sequelize');
const db = require('../db');

const Answer = db.define('answer', {
  answer: {
    type: Sequelize.TEXT,
  },
  isCorrect: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
});

module.exports = Answer;
