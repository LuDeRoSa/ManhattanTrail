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

//associations could go here!
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

//Model Methods
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
  const leadership = Game.findAll({
    where: {
      status: 'finished',
    },
    include: [Scores, User],
    order: [[{ model: Scores }, 'total_score', 'DESC']],
    limit: 10,
  });
  return leadership;
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
