const Sequelize = require("sequelize");
const db = require("../db");

const Question = db.define("question", {
  // question_id: {
  //   type: Sequelize.INTEGER,
  //   primaryKey: true,
  // },
  question: {
    type: Sequelize.TEXT,
  },
  // restaurant_id: {
  //   type: Sequelize.INTEGER,
  //   foreignKey: true,
  // },
});

module.exports = Question;
