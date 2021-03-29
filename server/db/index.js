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
      restaurant_name: 'Restaurant One',
      restaurant_longitude: -73.989308,
      restaurant_latitude: 40.741895,
    }),
    Restaurant.create({
      restaurant_name: 'Restaurant Two',
      restaurant_longitude: -73.9699967,
      restaurant_latitude: 40.7580445,
    }),
    Restaurant.create({
      restaurant_name: 'Restaurant Three',
      restaurant_longitude: -73.9561132,
      restaurant_latitude: 40.77152,
    }),
    Restaurant.create({
      restaurant_name: 'Restaurant Four',
      restaurant_longitude: -73.3,
      restaurant_latitude: 40.78,
    }),
    Restaurant.create({
      restaurant_name: 'Restaurant Five',
      restaurant_longitude: -73.3,
      restaurant_latitude: 40.5,
    }),
    Restaurant.create({
      restaurant_name: 'Don Antonio',
      restaurant_longitude: -73.98664,
      restaurant_latitude: 40.76269,
    }),
    Restaurant.create({
      restaurant_name: 'Little Beet',
      restaurant_longitude: -73.98248,
      restaurant_latitude: 40.76089,
    }),
    Restaurant.create({
      restaurant_name: 'Erin McKenna/s Bakery NYC',
      restaurant_longitude: -73.98971,
      restaurant_latitude: 40.71807,
    }),
  ]);

  // console.log(restaurants[5].restaurant_name); this is a test to see whether arrdata is more consistent

  //hardcoding first path:
  const paths = await Promise.all([
    Path.create({ path_name: 1, restaurantId: 1, stage: 1 }),
    Path.create({ path_name: 1, restaurantId: 2, stage: 2 }),
    Path.create({ path_name: 1, restaurantId: 3, stage: 3 }),
    Path.create({ path_name: 1, restaurantId: 4, stage: 4 }),
    Path.create({ path_name: 1, restaurantId: 5, stage: 5 }),
    Path.create({ path_name: 2, restaurantId: 4, stage: 1 }),
    Path.create({ path_name: 2, restaurantId: 5, stage: 2 }),
    Path.create({
      path_name: 'gluten-free',
      restaurantId: restaurants[5].id,
      stage: 1,
    }),
    Path.create({
      path_name: 'gluten-free',
      restaurantId: restaurants[6].id,
      stage: 2,
    }),
    Path.create({
      path_name: 'gluten-free',
      restaurantId: restaurants[7].id,
      stage: 3,
      game_type: 'quiz',
    }),
  ]);

  const quizzes = await Promise.all([
    Quiz.create({
      restaurantId: 1,
    }),
    Quiz.create({
      restaurantId: restaurants[7].id,
    }),
  ]);

  const questions = await Promise.all([
    Question.create(
      {
        question: 'What is the most expensive spice in the world by weight?',
        quizId: quizzes[0].id,
        answers: [
          {
            answer: 'Saffron',
            isCorrect: true,
          },
          {
            answer: 'Vanilla',
          },
          {
            answer: 'Cinnamon',
          },
          {
            answer: 'Cardamom',
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
        quizId: quizzes[0].id,
        answers: [
          {
            answer: 'Burrito',
            isCorrect: true,
          },
          {
            answer: 'Enchiladas',
          },
          {
            answer: 'Tostada',
          },
          {
            answer: 'Tamale',
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
        quizId: quizzes[0].id,
        answers: [
          {
            answer: 'Cheese',
            isCorrect: true,
          },
          {
            answer: 'Crackers',
          },
          {
            answer: 'Tomato',
          },
          {
            answer: 'Pasta',
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
        quizId: quizzes[0].id,
        answers: [
          {
            answer: 'Vitamin C',
            isCorrect: true,
          },
          {
            answer: 'Vitamin A',
          },
          {
            answer: 'Vitamin V12',
          },
          {
            answer: 'Vitamin K',
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
        quizId: quizzes[0].id,
        answers: [
          {
            answer: 'Honey',
            isCorrect: true,
          },
          {
            answer: 'Pork',
          },
          {
            answer: 'Beef',
          },
          {
            answer: 'Beef Jerky',
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
        quizId: quizzes[0].id,
        answers: [
          {
            answer: 'Mango',
            isCorrect: true,
          },
          {
            answer: 'Apple',
          },
          {
            answer: 'Banana',
          },
          {
            answer: 'Orange',
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
        quizId: quizzes[0].id,
        answers: [
          {
            answer: 'Pineapple',
            isCorrect: true,
          },
          {
            answer: 'Watermelon',
          },
          {
            answer: 'Pines',
          },
          {
            answer: 'Durian',
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
        quizId: quizzes[0].id,
        answers: [
          {
            answer: 'United States',
            isCorrect: true,
          },
          {
            answer: 'Italy',
          },
          {
            answer: 'Mexico',
          },
          {
            answer: 'Japan',
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
        quizId: quizzes[0].id,
        answers: [
          {
            answer: 'Panera Bread',
            isCorrect: true,
          },
          {
            answer: 'Taco Bell',
          },
          {
            answer: 'Chipotle',
          },
          {
            answer: 'Subway',
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
        quizId: quizzes[0].id,
        answers: [
          {
            answer: 'Paprika',
            isCorrect: true,
          },
          {
            answer: 'Nutmeg',
          },
          {
            answer: 'Turmeric',
          },
          {
            answer: 'Saffron',
          },
        ],
      },
      {
        include: Answer,
      }
    ),
    Question.create(
      {
        question: 'True or False?: Gluten is only found in wheat',
        quizId: quizzes[1].id,
        answers: [
          {
            answer: 'False',
            isCorrect: true,
          },
          {
            answer: 'True',
          },
        ],
      },
      {
        include: Answer,
      }
    ),
    Question.create(
      {
        question: 'Which flour has gluten?',
        quizId: quizzes[1].id,
        answers: [
          {
            answer: 'Rye',
            isCorrect: true,
          },
          {
            answer: 'Rice',
          },

          {
            answer: 'Buckwheat',
          },
          {
            answer: 'Potato',
          },
        ],
      },
      {
        include: Answer,
      }
    ),
    Question.create(
      {
        question: 'True or False?: Gluten is only found in food products',
        quizId: quizzes[1].id,
        answers: [
          {
            answer: 'True',
          },
          {
            answer: 'False',
            isCorrect: true,
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
