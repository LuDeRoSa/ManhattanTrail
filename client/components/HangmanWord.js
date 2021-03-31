// var programming_languages = [
//   'phyton',
//   'javascipt',
//   'mongodb',
//   'json',
//   'java',
//   'html',
//   'css',
//   'c',
//   'csharp',
//   'golang',
//   'kotlin',
//   'php',
//   'sql',
//   'ruby',
// ];

var food_category = ['italian', 'chinese', 'indian'];

// returns a random word from the array
function randomWord() {
  return food_category[Math.floor(Math.random() * food_category.length)];
}

export { randomWord };
