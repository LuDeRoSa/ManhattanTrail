const Sequelize = require('sequelize');
const db = require('../db');

const Restaurant = db.define('restaurant', {
  restaurant_name: {
    type: Sequelize.STRING,
  },
  restaurant_longitude: {
    type: Sequelize.FLOAT,
  },
  restaurant_latitude: {
    type: Sequelize.FLOAT,
  },
});

module.exports = Restaurant;
