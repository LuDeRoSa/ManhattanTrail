//this is the access point for all things database related!

const db = require("./db");
const Path = require("./models/path");
const Quiz = require("./models/quiz");
const Restaurant = require("./models/restaurant");
const Scores = require("./models/scores");
const User_Responses = require("./models/user_responses");
const User = require("./models/User");
const Game = require("./models/Game");
const Question = require("./models/Question");
const Answer = require("./models/Answer");

//associations could go here!
Path.belongsTo(Restaurant);
Restaurant.hasMany(Path);

User.hasMany(User_Responses);
User_Responses.belongsTo(User);

User.hasMany(Game);
Game.belongsTo(User);

Game.hasOne(Scores);
Scores.belongsTo(Game);

Question.hasMany(Answer);
Answer.belongsTo(Question);

Quiz.hasMany(Question);
Question.belongsTo(Quiz);

Restaurant.hasOne(Quiz);
Quiz.belongsTo(Restaurant);

Path.hasMany(Game);

// User_Responses.hasMany(Scores);
// Scores.belongsTo(User_Responses);

const syncAndSeed = async () => {
  await db.sync({ force: true });

  // const users = await Promise.all([
  //   User.create({user_id: 1, first_name: 'Cody', password: '123'}),
  //   User.create({user_id: 2, first_name: 'Murphy', password: '123'})
  // ])

  //hardcoding first five restaurants:
  const restaurants = await Promise.all([
    Restaurant.create({
      restaurant_id: 1,
      restaurant_name: "Restaurant One",
      restaurant_longitude: -73.989308,
      restaurant_latitude: 40.741895,
    }),
    Restaurant.create({
      restaurant_id: 2,
      restaurant_name: "Restaurant Two",
      restaurant_longitude: -73.9699967,
      restaurant_latitude: 40.7580445,
    }),
    Restaurant.create({
      restaurant_id: 3,
      restaurant_name: "Restaurant Three",
      restaurant_longitude: -73.9561132,
      restaurant_latitude: 40.77152,
    }),
    Restaurant.create({
      restaurant_id: 4,
      restaurant_name: "Restaurant Four",
      restaurant_longitude: -73.3,
      restaurant_latitude: 40.78,
    }),
    Restaurant.create({
      restaurant_id: 5,
      restaurant_name: "Restaurant Five",
      restaurant_longitude: -73.3,
      restaurant_latitude: 40.5,
    }),
  ]);

  //hardcoding first path:
  const paths = await Promise.all([
    Path.create({ path_id: 1, restaurantId: 1, stage: 1 }),
    Path.create({ path_id: 1, restaurantId: 2, stage: 2 }),
    Path.create({ path_id: 1, restaurantId: 3, stage: 3 }),
    Path.create({ path_id: 1, restaurantId: 4, stage: 4 }),
    Path.create({ path_id: 1, restaurantId: 5, stage: 5 }),
    Path.create({ path_id: 2, restaurantId: 4, stage: 1 }),
    Path.create({ path_id: 2, restaurantId: 5, stage: 2 }),
  ]);

  const quizzes = await Promise.all([
    Quiz.create({
      restaurantId: 1,
    }),
  ]);
  const questions = await Promise.all([
    Question.create({
      question: "What is the most expensive spice in the world by weight?",
      quizId: 1,
    }),
    Question.create({
      question: "What Mexican food has a name meaning 'Little Donkey'?",
      quizId: 1,
    }),
  ]);

  const answers = await Promise.all([
    Answer.create({
      answer: "Saffron",
      isCorrect: true,
      questionId: 1,
    }),
    Answer.create({
      answer: "Cinnamon",
      isCorrect: false,
      questionId: 1,
    }),
    Answer.create({
      answer: "Vanilla",
      isCorrect: false,
      questionId: 1,
    }),
    Answer.create({
      answer: "Cardamom",
      isCorrect: false,
      questionId: 1,
    }),
    Answer.create({
      answer: "Burrito",
      isCorrect: true,
      questionId: 2,
    }),
  ]);
};

//quiz questions:
// const questions = await Promise.all([
//   Quiz.create({
//     question_id: 1,
//     question: 'What is the most expensive spice in the world by weight?',
//     choice_a: 'Cinnamon',
//     choice_b: 'Vanilla',
//     choice_c: 'Cardamom',
//     choice_correct_answer: 'Saffron',
//   }),
//   Quiz.create({
//     question_id: 2,
//     question: "What Mexican food has a name meaning 'Little Donkey'?",
//     choice_a: 'Enchiladas',
//     choice_b: 'Tamale',
//     choice_c: 'Tostada',
//     choice_correct_answer: 'Burrito',
//   }),
//   Quiz.create({
//     question_id: 3,
//     question: 'What is the most stolen food in the world?',
//     choice_a: 'Chocolate',
//     choice_b: 'Truffle',
//     choice_c: 'Pasta',
//     choice_correct_answer: 'Cheese',
//   }),
//   Quiz.create({
//     question_id: 4,
//     question: "What vitamin is the only one that you won't find in an egg?",
//     choice_a: 'Vitamin A',
//     choice_b: 'Vitamin K',
//     choice_c: 'Vitamin V12',
//     choice_correct_answer: 'Vitamin C',
//   }),
//   Quiz.create({
//     question_id: 5,
//     question: 'What is the only edible food that never goes bad?',
//     choice_a: 'Cheese',
//     choice_b: 'Chocolate',
//     choice_c: 'Beef Jerky',
//     choice_correct_answer: 'Honey',
//   }),
//   Quiz.create({
//     question_id: 6,
//     question: 'What is the only edible food that never goes bad?',
//     choice_a: 'Cheese',
//     choice_b: 'Chocolate',
//     choice_c: 'Beef Jerky',
//     choice_correct_answer: 'Honey',
//   }),
//   Quiz.create({
//     question_id: 7,
//     question: 'What fruit inspired the paisley fabric pattern?',
//     choice_a: 'Dragonfruit',
//     choice_b: 'Papaya',
//     choice_c: 'Pineapple',
//     choice_correct_answer: 'Mango',
//   }),
//   Quiz.create({
//     question_id: 8,
//     question: 'What fruit was named after pine cones?',
//     choice_a: 'Cucumber',
//     choice_b: 'Dragonfruit',
//     choice_c: 'Durian',
//     choice_correct_answer: 'Pineapple',
//   }),
//   Quiz.create({
//     question_id: 9,
//     question: 'What country wastes the most food?',
//     choice_a: 'China',
//     choice_b: 'Russia',
//     choice_c: 'India',
//     choice_correct_answer: 'United States',
//   }),
//   Quiz.create({
//     question_id: 10,
//     question:
//       "What's the healthiest fast food chain in the US? (according to Health Magazine)",
//     choice_a: 'Subway',
//     choice_b: 'Chipotle',
//     choice_c: 'Taco Bell',
//     choice_correct_answer: 'Panera Bread',
//   }),
//   Quiz.create({
//     question_id: 11,
//     question:
//       'What spice prevents spider veins, inhibits hair loss, and has lots of Vitamin A?',
//     choice_a: 'Saffron',
//     choice_b: 'Turmeric',
//     choice_c: 'Nutmeg',
//     choice_correct_answer: 'Paprika',
//   }),
// ]);

//quiz questions:
// const questions = await Promise.all([
//   Quiz.create({
//     question_id: 1,
//     question: 'What is the most expensive spice in the world by weight?',
//     choice_a: 'Cinnamon',
//     choice_b: 'Vanilla',
//     choice_c: 'Cardamom',
//     choice_correct_answer: 'Saffron',
//   }),
//   Quiz.create({
//     question_id: 2,
//     question: "What Mexican food has a name meaning 'Little Donkey'?",
//     choice_a: 'Enchiladas',
//     choice_b: 'Tamale',
//     choice_c: 'Tostada',
//     choice_correct_answer: 'Burrito',
//   }),
//   Quiz.create({
//     question_id: 3,
//     question: 'What is the most stolen food in the world?',
//     choice_a: 'Chocolate',
//     choice_b: 'Truffle',
//     choice_c: 'Pasta',
//     choice_correct_answer: 'Cheese',
//   }),
//   Quiz.create({
//     question_id: 4,
//     question: "What vitamin is the only one that you won't find in an egg?",
//     choice_a: 'Vitamin A',
//     choice_b: 'Vitamin K',
//     choice_c: 'Vitamin V12',
//     choice_correct_answer: 'Vitamin C',
//   }),
//   Quiz.create({
//     question_id: 5,
//     question: 'What is the only edible food that never goes bad?',
//     choice_a: 'Cheese',
//     choice_b: 'Chocolate',
//     choice_c: 'Beef Jerky',
//     choice_correct_answer: 'Honey',
//   }),
//   Quiz.create({
//     question_id: 6,
//     question: 'What is the only edible food that never goes bad?',
//     choice_a: 'Cheese',
//     choice_b: 'Chocolate',
//     choice_c: 'Beef Jerky',
//     choice_correct_answer: 'Honey',
//   }),
//   Quiz.create({
//     question_id: 7,
//     question: 'What fruit inspired the paisley fabric pattern?',
//     choice_a: 'Dragonfruit',
//     choice_b: 'Papaya',
//     choice_c: 'Pineapple',
//     choice_correct_answer: 'Mango',
//   }),
//   Quiz.create({
//     question_id: 8,
//     question: 'What fruit was named after pine cones?',
//     choice_a: 'Cucumber',
//     choice_b: 'Dragonfruit',
//     choice_c: 'Durian',
//     choice_correct_answer: 'Pineapple',
//   }),
//   Quiz.create({
//     question_id: 9,
//     question: 'What country wastes the most food?',
//     choice_a: 'China',
//     choice_b: 'Russia',
//     choice_c: 'India',
//     choice_correct_answer: 'United States',
//   }),
//   Quiz.create({
//     question_id: 10,
//     question:
//       "What's the healthiest fast food chain in the US? (according to Health Magazine)",
//     choice_a: 'Subway',
//     choice_b: 'Chipotle',
//     choice_c: 'Taco Bell',
//     choice_correct_answer: 'Panera Bread',
//   }),
//   Quiz.create({
//     question_id: 11,
//     question:
//       'What spice prevents spider veins, inhibits hair loss, and has lots of Vitamin A?',
//     choice_a: 'Saffron',
//     choice_b: 'Turmeric',
//     choice_c: 'Nutmeg',
//     choice_correct_answer: 'Paprika',
//   }),
// ]);

// quiz questions:
// const questions = await Promise.all([
//   Quiz.create({
//     question: "What is the most expensive spice in the world by weight?",
//   }),
//   Quiz.create({
//     question: "What Mexican food has a name meaning 'Little Donkey'?",
//   }),
//   Quiz.create({
//     question: "What is the most stolen food in the world?",
//   }),
//   Quiz.create({
//     question: "What vitamin is the only one that you won't find in an egg?",
//   }),
//   Quiz.create({
//     question: "What is the only edible food that never goes bad?",
//   }),
// ]);

// Quiz.addMultipleQuestion([
//   {
//     question: "What is the most expensive spice in the world by weight?",
//   },
// ]);

// const [cody, murphy] = users;

// return {
//   users: {
//     cody,
//     murphy,
//   },
// };

//  quiz questions:

/**
 * hooks
 */

// automatically calculates user score after each user_response update
User_Responses.afterBulkUpdate((user_responses) => {
  user_responses.map(async (response) => {
    const question_one_points = response.question_one_points;
    const question_two_points = response.question_two_points;
    const question_three_points = response.question_three_points;
    const question_four_points = response.question_four_points;
    const question_five_points = response.question_five_points;
    const question_score =
      question_one_points +
      question_two_points +
      question_three_points +
      question_four_points +
      question_five_points;

    const score = Scores.findByPk(response.game_id);
    score.total_score += question_score;
    score.save();
  });
});

module.exports = {
  db,
  syncAndSeed,
  models: {
    User,
    Path,
    Quiz,
    Restaurant,
    Scores,
    User_Responses,
    Game,
    Question,
    Answer,
  },
};
