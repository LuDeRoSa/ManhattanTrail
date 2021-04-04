const db = require('./db');
const Path = require('./models/path');
const Quiz = require('./models/quiz');
const Restaurant = require('./models/restaurant');
const Scores = require('./models/scores');
const User = require('./models/User');
const Game = require('./models/Game');
const Question = require('./models/Question');
const Answer = require('./models/Answer');
const Favorite = require('./models/Favorite');
const syncAndSeed = require('./seed');
// Associations go here!
Path.belongsTo(Restaurant);
Restaurant.hasMany(Path);
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
User.hasMany(Favorite);
Favorite.belongsTo(User);
Restaurant.hasMany(Favorite);
Favorite.belongsTo(Restaurant);
// Model Methods
Game.createGame = async function (userId, path_name) {
  let game = await Game.create({
    path_name,
    userId,
  });
  await Scores.create({
    gameId: game.id,
  });
  game = await Game.findOne({
    where: {
      userId,
      status: 'ingame',
    },
    include: Scores,
  });
  return game;
};
Game.getLeadership = function () {
  return Game.findAll({
    where: {
      status: 'finished',
    },
    include: [Scores, User],
    order: [[{ model: Scores }, 'total_score', 'DESC']],
    limit: 10,
  });
};
Game.getPastGames = function (userId) {
  return Game.findAll({
    where: {
      userId,
      status: 'finished',
    },
    include: [Scores, User],
  });
};
Scores.addScores = async function (userId, points) {
  let game = await Game.findOne({
    where: {
      userId,
      status: 'ingame',
    },
    include: Scores,
  });
  let scoreMatch = await Scores.findOne({
    where: {
      gameId: game.id,
    },
  });
  scoreMatch.total_score += points;
  await scoreMatch.save();
  return scoreMatch;
};
/**
 * Tracks mini game status and if it has already been played or not
 */
Game.updateMiniGameStatus = async function (userId) {
  // First, find the game stage we are in from the game table
  let game = await Game.findOne({
    where: {
      userId,
      status: 'ingame',
    },
  });
  // Update that stage's game completion status in the game table to be true
  game.stage_completed = true;
  await game.save();
  return game;
};
Path.getRestaurants = async function (path_name) {
  const path = await Path.findAll({
    where: { path_name },
    include: Restaurant,
    order: [['stage', 'ASC']],
  });
  return path.map((path) => {
    let rest = path.restaurant;
    rest.dataValues.game_type = path.game_type;
    return rest;
  });
};
module.exports = {
  db,
  syncAndSeed,
  models: {
    User,
    Path,
    Quiz,
    Restaurant,
    Scores,
    Game,
    Question,
    Answer,
    Favorite,
  },
};