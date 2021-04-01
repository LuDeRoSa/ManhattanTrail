var food_category = ['italian', 'chinese', 'indian', 'american', 'turkish'];

// returns a random word from the array
function randomWord() {
  return food_category[Math.floor(Math.random() * food_category.length)];
}

export { randomWord };
