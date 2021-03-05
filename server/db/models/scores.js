const Sequelize = require('sequelize')
const db = require('../db')
const axios = require('axios');

const Scores = db.define('scores', {
    game_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
    },
    user_id: {
        type: Sequelize.INTEGER,
    },
    total_score: {
        type: Sequelize.INTEGER,
    },
    date_time: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
    },
    status: {
        type: Sequelize.ENUM('ingame', 'finished'),
        defaultValue: 'ingame'
      },
  })

