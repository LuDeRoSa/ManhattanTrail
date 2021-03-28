//this is the access point for all things database related!

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

// Path.hasMany(Game);

User.hasMany(Favorite);
Favorite.belongsTo(User);

Restaurant.hasOne(Favorite);

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
      restaurant_name: 'Restaurant One',
      restaurant_longitude: -73.989308,
      restaurant_latitude: 40.741895,
    }),
    Restaurant.create({
      restaurant_id: 2,
      restaurant_name: 'Restaurant Two',
      restaurant_longitude: -73.9699967,
      restaurant_latitude: 40.7580445,
    }),
    Restaurant.create({
      restaurant_id: 3,
      restaurant_name: 'Restaurant Three',
      restaurant_longitude: -73.9561132,
      restaurant_latitude: 40.77152,
    }),
    Restaurant.create({
      restaurant_id: 4,
      restaurant_name: 'Restaurant Four',
      restaurant_longitude: -73.3,
      restaurant_latitude: 40.78,
    }),
    Restaurant.create({
      restaurant_id: 5,
      restaurant_name: 'Restaurant Five',
      restaurant_longitude: -73.3,
      restaurant_latitude: 40.5,
    }),
  ]);

  //hardcoding first path:
  const paths = await Promise.all([
    Path.create({ path_name: 1, restaurantId: 1, stage: 1 }),
    Path.create({ path_name: 1, restaurantId: 2, stage: 2 }),
    Path.create({ path_name: 1, restaurantId: 3, stage: 3 }),
    Path.create({ path_name: 1, restaurantId: 4, stage: 4 }),
    Path.create({ path_name: 1, restaurantId: 5, stage: 5 }),
    Path.create({ path_name: 2, restaurantId: 4, stage: 1 }),
    Path.create({ path_name: 2, restaurantId: 5, stage: 2 }),
  ]);

  const quizzes = await Promise.all([
    Quiz.create({
      restaurantId: 1,
    }),
  ]);

  const questions = await Promise.all([
    Question.create(
      {
        question: 'What is the most expensive spice in the world by weight?',
        quizId: 1,
        answers: [
          {
            answer: 'Saffron',
            isCorrect: true,
          },
          {
            answer: 'Vanilla',
            isCorrect: false,
          },
          {
            answer: 'Cinnamon',
            isCorrect: false,
          },
          {
            answer: 'Cardamom',
            isCorrect: false,
          },
        ],
      },
      {
        include: Answer,
      }
    ),
    Question.create(
      {
        question: "What Mexican food has a name meaning 'Little Donkey'?",
        quizId: 1,
        answers: [
          {
            answer: 'Burrito',
            isCorrect: true,
          },
          {
            answer: 'Enchiladas',
            isCorrect: false,
          },
          {
            answer: 'Tostada',
            isCorrect: false,
          },
          {
            answer: 'Tamale',
            isCorrect: false,
          },
        ],
      },
      {
        include: Answer,
      }
    ),
    Question.create(
      {
        question: 'What is the most stolen food in the world?',
        quizId: 1,
        answers: [
          {
            answer: 'Cheese',
            isCorrect: true,
          },
          {
            answer: 'Crackers',
            isCorrect: false,
          },
          {
            answer: 'Tomato',
            isCorrect: false,
          },
          {
            answer: 'Pasta',
            isCorrect: false,
          },
        ],
      },
      {
        include: Answer,
      }
    ),
    Question.create(
      {
        question: "What vitamin is the only one that you won't find in an egg?",
        quizId: 1,
        answers: [
          {
            answer: 'Vitamin C',
            isCorrect: true,
          },
          {
            answer: 'Vitamin A',
            isCorrect: false,
          },
          {
            answer: 'Vitamin V12',
            isCorrect: false,
          },
          {
            answer: 'Vitamin K',
            isCorrect: false,
          },
        ],
      },
      {
        include: Answer,
      }
    ),
    Question.create(
      {
        question: 'What is the only edible food that never goes bad?',
        quizId: 1,
        answers: [
          {
            answer: 'Honey',
            isCorrect: true,
          },
          {
            answer: 'Pork',
            isCorrect: false,
          },
          {
            answer: 'Beef',
            isCorrect: false,
          },
          {
            answer: 'Beef Jerky',
            isCorrect: false,
          },
        ],
      },
      {
        include: Answer,
      }
    ),

    Question.create(
      {
        question: 'What fruit inspired the paisley fabric pattern?',
        quizId: 1,
        answers: [
          {
            answer: 'Mango',
            isCorrect: true,
          },
          {
            answer: 'Apple',
            isCorrect: false,
          },
          {
            answer: 'Banana',
            isCorrect: false,
          },
          {
            answer: 'Orange',
            isCorrect: false,
          },
        ],
      },
      {
        include: Answer,
      }
    ),
    Question.create(
      {
        question: 'What fruit was named after pine cones?',
        quizId: 1,
        answers: [
          {
            answer: 'Pineapple',
            isCorrect: true,
          },
          {
            answer: 'Watermelon',
            isCorrect: false,
          },
          {
            answer: 'Pines',
            isCorrect: false,
          },
          {
            answer: 'Durian',
            isCorrect: false,
          },
        ],
      },
      {
        include: Answer,
      }
    ),
    Question.create(
      {
        question: 'What country wastes the most food?',
        quizId: 1,
        answers: [
          {
            answer: 'United States',
            isCorrect: true,
          },
          {
            answer: 'Italy',
            isCorrect: false,
          },
          {
            answer: 'Mexico',
            isCorrect: false,
          },
          {
            answer: 'Japan',
            isCorrect: false,
          },
        ],
      },
      {
        include: Answer,
      }
    ),
    Question.create(
      {
        question:
          "What's the healthiest fast food chain in the US? (according to Health Magazine)",
        quizId: 1,
        answers: [
          {
            answer: 'Panera Bread',
            isCorrect: true,
          },
          {
            answer: 'Taco Bell',
            isCorrect: false,
          },
          {
            answer: 'Chipotle',
            isCorrect: false,
          },
          {
            answer: 'Subway',
            isCorrect: false,
          },
        ],
      },
      {
        include: Answer,
      }
    ),
    Question.create(
      {
        question:
          'What spice prevents spider veins, inhibits hair loss, and has lots of Vitamin A?',
        quizId: 1,
        answers: [
          {
            answer: 'Paprika',
            isCorrect: true,
          },
          {
            answer: 'Nutmeg',
            isCorrect: false,
          },
          {
            answer: 'Turmeric',
            isCorrect: false,
          },
          {
            answer: 'Saffron',
            isCorrect: false,
          },
        ],
      },
      {
        include: Answer,
      }
    ),
  ]);
};
/**
 * hooks
 */

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
