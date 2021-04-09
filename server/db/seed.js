//this is the access point for all things database related!

const db = require('./db');
const Path = require('./models/path');
const Quiz = require('./models/quiz');
const Restaurant = require('./models/restaurant');
const Question = require('./models/Question');
const Answer = require('./models/Answer');

const syncAndSeed = async () => {
  await db.sync({ force: true });

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
    Restaurant.create({
      restaurant_name: 'Bengal Tiger',
      restaurant_longitude: -73.989308,
      restaurant_latitude: 40.741895,
    }),
    Restaurant.create({
      restaurant_name: 'The Drunken Monkey',
      restaurant_longitude: -73.9475594,
      restaurant_latitude: 40.7809852,
    }),
    Restaurant.create({
      restaurant_name: 'Tamarind Tribeca',
      restaurant_longitude: -74.0089165,
      restaurant_latitude: 40.719086,
    }),
    Restaurant.create({
      restaurant_name: 'Mala Project',
      restaurant_longitude: -73.989308,
      restaurant_latitude: 40.741895,
    }),
    Restaurant.create({
      restaurant_name: 'Szechuan Mountain House',
      restaurant_longitude: -73.9879662,
      restaurant_latitude: 40.7288338,
    }),
    Restaurant.create({
      restaurant_name: 'Café China',
      restaurant_longitude: -73.9821195,
      restaurant_latitude: 40.7500524,
    }),
  ]);

  //hardcoding first path:
  const paths = await Promise.all([
    Path.create({
      path_name: 'italian',
      restaurantId: restaurants[0].id,
      stage: 1,
      game_type: 'quiz',
    }),
    Path.create({
      path_name: 'italian',
      restaurantId: restaurants[1].id,
      stage: 2,
      game_type: 'hangman',
    }),
    Path.create({
      path_name: 'italian',
      restaurantId: restaurants[2].id,
      stage: 3,
      game_type: 'snake',
    }),
    Path.create({
      path_name: 'italian',
      restaurantId: restaurants[3].id,
      stage: 4,
      game_type: 'flappy',
    }),
    Path.create({
      path_name: 'italian',
      restaurantId: restaurants[4].id,
      stage: 5,
      game_type: 'sortfruits',
    }),
    Path.create({
      path_name: 'gluten-free',
      restaurantId: restaurants[5].id,
      stage: 1,
      game_type: 'flappy',
    }),
    Path.create({
      path_name: 'gluten-free',
      restaurantId: restaurants[6].id,
      game_type: 'snake',
      stage: 2,
    }),
    Path.create({
      path_name: 'gluten-free',
      restaurantId: restaurants[7].id,
      stage: 3,
      game_type: 'quiz',
    }),
    Path.create({
      path_name: 'indian',
      restaurantId: restaurants[8].id,
      stage: 1,
      game_type: 'quiz',
    }),
    Path.create({
      path_name: 'indian',
      restaurantId: restaurants[9].id,
      stage: 2,
      game_type: 'snake',
    }),
    Path.create({
      path_name: 'indian',
      restaurantId: restaurants[10].id,
      stage: 3,
      game_type: 'flappy',
    }),
    Path.create({
      path_name: 'chinese',
      restaurantId: restaurants[11].id,
      stage: 1,
      game_type: 'quiz',
    }),
    Path.create({
      path_name: 'chinese',
      restaurantId: restaurants[12].id,
      stage: 2,
      game_type: 'snake',
    }),
    Path.create({
      path_name: 'chinese',
      restaurantId: restaurants[13].id,
      stage: 3,
      game_type: 'hangman',
    }),
  ]);

  const quizzes = await Promise.all([
    Quiz.create({
      restaurantId: restaurants[0].id, //italian "Restaraunt One"
    }),
    Quiz.create({
      restaurantId: restaurants[7].id, //points to little beet but can be rerouted into another path if needed
    }),
    Quiz.create({
      restaurantId: restaurants[8].id, //indian Bengal Tiger
    }),
    Quiz.create({
      restaurantId: restaurants[6].id, //gluten free erin mckenna
    }),
    Quiz.create({
      restaurantId: restaurants[11].id, //chinese "Mala Project"
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
        quizId: quizzes[3].id,
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
        quizId: quizzes[3].id,
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
        quizId: quizzes[3].id,
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
        quizId: quizzes[3].id,
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
        quizId: quizzes[3].id,
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
        quizId: quizzes[3].id,
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
    Question.create(
      {
        question: 'there are over how many different types of indian desserts?',
        quizId: quizzes[2].id,
        answers: [
          {
            answer: '200',
            isCorrect: true,
          },
          {
            answer: '100',
          },

          {
            answer: ' 300',
          },
          {
            answer: '50',
          },
        ],
      },
      {
        include: Answer,
      }
    ),
    Question.create(
      {
        question: 'The chicken tikka masala was invented in?',
        quizId: quizzes[2].id,
        answers: [
          {
            answer: 'Glasgow, Scotland',
            isCorrect: true,
          },
          {
            answer: 'Mumbai, India',
          },

          {
            answer: 'Delhi, India',
          },
          {
            answer: 'London, England',
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
          'True or False?: Tomatoes, potatatos, and chilies do not have origins in India and were brought by foreign traders in the 15th century?',
        quizId: quizzes[2].id,
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
    Question.create(
      {
        question: 'What is extra-firm tofu made from?',
        quizId: quizzes[4].id,
        answers: [
          {
            answer: 'Soy Beans',
            isCorrect: true,
          },
          {
            answer: 'Recycled Cardboard',
          },

          {
            answer: 'Egg Whites And Cream',
          },
          {
            answer: 'Processed Potato Peel',
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
          'What collection of small dishes, often including dumplings, is served for snack or lunch in China?',
        quizId: quizzes[4].id,
        answers: [
          {
            answer: 'Dim Sum',
            isCorrect: true,
          },
          {
            answer: 'Egg Roll',
          },

          {
            answer: 'Thai Chi',
          },
          {
            answer: 'Bahn Mi',
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
          'Which of these vegetables are least likely to be found in a Chinese food recipe?',
        quizId: quizzes[4].id,
        answers: [
          {
            answer: 'Artichokes',
            isCorrect: true,
          },
          {
            answer: 'Bok Choy',
          },

          {
            answer: 'Water Chestnuts',
          },
          {
            answer: 'Brocolli',
          },
        ],
      },
      {
        include: Answer,
      }
    ),
  ]);
};

module.exports = syncAndSeed;
