const Sequelize = require('sequelize')
const db = require('../db')
const axios = require('axios');

const Path = db.define('path', {
    path_id: {
        type: Sequelize.INTEGER,
    },
    restaurant_id: {
        type: Sequelize.INTEGER,
    },
    restaurant_order: {
        type: Sequelize.INTEGER,
    },
  })
  
  module.exports = Path;