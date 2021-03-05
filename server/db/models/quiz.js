const Sequelize = require('sequelize')
const db = require('../db')
const axios = require('axios');

const Quiz = db.define('quiz', {
    question_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
    },
    question: {
        type: Sequelize.TEXT,
    },
    choice_correct_answer: {
        type: Sequelize.TEXT,
    },
    choice_a: {
        type: Sequelize.TEXT,
    },
    choice_b: {
        type: Sequelize.TEXT,
    },
    choice_c: {
        type: Sequelize.TEXT,
    }
  })
  
  module.exports = Quiz;