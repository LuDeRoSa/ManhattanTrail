const Sequelize = require('sequelize')
const db = require('../db')
const axios = require('axios');

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
    restaurant_id: {
        type: Sequelize.INTEGER,
    },
    question_id: {
        type: Sequelize.INTEGER,
    },
    date_time: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
    },
    question_one_points: {
        type: Sequelize.INTEGER,
    },
    question_two_points: {
        type: Sequelize.INTEGER,
    },
    question_three_points: {
        type: Sequelize.INTEGER,
    },
    question_four_points: {
        type: Sequelize.INTEGER,
    },
    question_five_points: {
        type: Sequelize.INTEGER,
    }
  })
  
  module.exports = User_Responses;