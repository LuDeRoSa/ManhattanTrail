const Sequelize = require('sequelize');
const db = require('../db');

const Question = db.define('question', {
  question: {
    type: Sequelize.TEXT,
  },
});

module.exports = Question;
