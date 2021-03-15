const Sequelize = require("sequelize");
const db = require("../db");

const Answer = db.define("answer", {
  // answer_id: {
  //   type: Sequelize.INTEGER,
  //   primaryKey: true,
  // },
  // choice_correct_answer: {
  //   type: Sequelize.TEXT,
  // },
  // choice_a: {
  //   type: Sequelize.TEXT,
  // },
  // choice_b: {
  //   type: Sequelize.TEXT,
  // },
  // choice_c: {
  //   type: Sequelize.TEXT,
  // },
  // restaurant_id: {
  //   type: Sequelize.INTEGER,
  //   foreignKey: true,
  // },
  answer: {
    type: Sequelize.TEXT,
  },
  isCorrect: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
});

module.exports = Answer;
