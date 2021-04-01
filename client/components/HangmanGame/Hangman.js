import React, { Component } from 'react';
import { connect } from 'react-redux';
import { randomWord } from '../HangmanGame/HangmanWord.js';
import { updateMiniGameScore } from '../../store/game';

// hangman images
let step0 = './img/hangman/0.png';
let step1 = './img/hangman/1.png';
let step2 = './img/hangman/2.png';
let step3 = './img/hangman/3.png';
let step4 = './img/hangman/4.png';
let step5 = './img/hangman/5.png';
let step6 = './img/hangman/6.png';

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
  }
  componentDidMount() {
    document.addEventListener('keydown', (e) => {
      if (e.code >= 'A' && e.code <= 'z') {
        this.handleGuess(e);
      }
    });
  }
  componentDidUpdate(prevProps, prevState) {
    if (!prevState.isWinner && this.state.isWinner) {
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
    } else {
      letter = e.code.substr(e.code.length - 1).toLowerCase();
    }
    this.setState((state) => ({
      guessed: state.guessed.add(letter),
      mistake: state.mistake + (state.answer.includes(letter) ? 0 : 1),
      gameOver: this.state.mistake == this.props.maxTry ? true : false,
      isWinner:
        this.guessedWord().join('') === this.state.answer ? true : false,
    }));
  };

  // maps over the keyboard displaying every single character as a button
  generateButtons() {
    return 'abcdefghijklmnopqrstuvwxyz'.split('').map((letter) => (
      <button
        key={letter}
        className="btn btn-lg btn-primary m-2"
        value={letter}
        onClick={this.handleGuess}
        disabled={this.state.guessed.has(letter)}
      >
        {letter}
      </button>
    ));
  }

  render() {
    let gameStat = this.generateButtons();
    if (this.state.isWinner) {
      gameStat = 'You won!';
    }
    if (this.state.gameOver) {
      gameStat = 'You Lost!';
    }
    return (
      <div className="hangman-container">
        <h1 className="text-center">Hangman</h1>
        <div className="float-left">
          Wrong Guesses: {this.state.mistake} of {this.props.maxTry}
        </div>
        <div className="text-center">
          <img src={this.props.images[this.state.mistake]} alt="" />
        </div>
        <div className="text-center">
          <p>Guess The Food Category</p>
          <p>{!this.state.gameOver ? this.guessedWord() : this.state.answer}</p>
          <p>{gameStat}</p>
        </div>
      </div>
    );
  }
}

const mapDispatch = {
  updateMiniGameScore,
};

export default connect((state) => state, mapDispatch)(Hangman);