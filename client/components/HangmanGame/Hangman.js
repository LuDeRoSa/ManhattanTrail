import React, { Component } from 'react';
import { connect } from 'react-redux';
import { randomWord } from '../HangmanGame/HangmanWord.js';
import { updateMiniGameScore } from '../../store/game';

import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';

import '../Style/Hangman.css';
// hangman images
let step0 = './img/hangman/0.png';
let step1 = './img/hangman/1.png';
let step2 = './img/hangman/2.png';
let step3 = './img/hangman/3.png';
let step4 = './img/hangman/4.png';
let step5 = './img/hangman/5.png';
let step6 = './img/hangman/6.png';

const styles = {
  hangmanContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  Button: {
    margin: '0.5rem',
  },
};
class Hangman extends Component {
  static defaultProps = {
    maxTry: 6,
    images: [step0, step1, step2, step3, step4, step5, step6],
  };
  constructor(props) {
    super(props);
    this.state = {
      score: 0,
      mistake: 0,
      guessed: new Set([]),
      answer: randomWord(),
      gameOver: false,
      isWinner: false,
    };
    this.onKey = this.onKey.bind(this);
  }
  componentDidMount() {
    document.addEventListener('keydown', this.onKey);
  }
  componentWillUnmount() {
    document.removeEventListener('keydown', this.onKey);
  }
  onKey(e) {
    if (e.code >= 'A' && e.code <= 'z' && !this.gameOver) {
      this.handleGuess(e);
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (!prevState.gameOver && this.state.gameOver) {
      this.props.updateMiniGameScore(1);
      this.setState({
        score: 1,
      });
    }
  }
  guessedWord() {
    return this.state.answer
      .split('')
      .map((letter) => (this.state.guessed.has(letter) ? letter : '_'));
  }
  //using arrow function to avoid binding
  handleGuess = (e) => {
    let letter;
    if (e.target.tagName === 'BUTTON') {
      letter = e.target.value;
    } else if (e.target.tagName === 'SPAN') {
      letter = e.target.innerHTML;
    } else {
      letter = e.code.substr(e.code.length - 1).toLowerCase();
    }
    this.setState((state) => ({
      guessed: state.guessed.add(letter),
      mistake: state.mistake + (state.answer.includes(letter) ? 0 : 1),
      gameOver: this.state.mistake + 1 == this.props.maxTry ? true : false,
      isWinner:
        this.guessedWord().join('') === this.state.answer ? true : false,
    }));
  };
  // maps over the keyboard displaying every single character as a button
  generateButtons() {
    return 'abcdefghijklmnopqrstuvwxyz'.split('').map((letter) => (
      <Button
        variant="outlined"
        key={letter}
        value={letter}
        size="small"
        onClick={this.handleGuess}
        disabled={this.state.guessed.has(letter)}
        color={this.state.guessed.has(letter) ? 'inherit' : 'primary'}
        style={styles.Button}
      >
        {letter}
      </Button>
    ));
  }
  render() {
    let gameStat = this.generateButtons();
    if (this.state.isWinner) {
      gameStat = 'Congratus, you saved him!';
    }
    if (this.state.gameOver) {
      gameStat = 'Uh-oh...You failed to save him!';
    }
    return (
      <Paper style={styles.hangmanContainer}>
        <div id="instructions">Hint: The word is a category of food</div>
        <div>
          **Guesses Remaining: {this.props.maxTry - this.state.mistake}**
        </div>
        <div>
          <img src={this.props.images[this.state.mistake]} alt="" />
        </div>
        <div>
          <p>{!this.state.gameOver ? this.guessedWord() : this.state.answer}</p>
          <>{gameStat}</>
        </div>
      </Paper>
    );
  }
}
const mapDispatch = {
  updateMiniGameScore,
};
export default connect((state) => state, mapDispatch)(Hangman);
