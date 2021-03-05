const Sequelize = require('sequelize')
const db = require('../db')
const bcrypt = require('bcrypt');
const axios = require('axios');

const Restaurant = db.define('restaurant', {
    restaurant_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
    },
    restaurant_name: {
      type: Sequelize.STRING,
    },
    restaurant_longitude: {
      type: Sequelize.FLOAT,
    },
    restaurant_latitude: {
        type: Sequelize.FLOAT,
      },
  })
  
  module.exports = Restaurant;