import React, { Component } from 'react';
import { connect } from 'react-redux';
import { randomWord } from './HangmanWord.js';
import { updateMiniGameScore, updateMiniScore } from '../store/game';

// hangman images
let step0 = './0.png';
let step1 = './1.png';
let step2 = './2.png';
let step3 = './3.png';
let step4 = './4.png';
let step5 = './5.png';
let step6 = './6.png';

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
      finished: false,
      gameOver: false,
      isWinner: false,
    };
  }

  componentDidUpdate() {
    if (this.state.isWinner === true) {
      console.log(this.state.score);
      // this.props.updateMiniGameScore(this.props.game.mini_score);
    }
  }

  guessedWord() {
    return this.state.answer
      .split('')
      .map((letter) => (this.state.guessed.has(letter) ? letter : '_'));
  }

  //using arrow function to avoid binding
  handleGuess = (e) => {
    e.preventDefault();
    let letter = e.target.value;
    this.setState((state) => ({
      guessed: state.guessed.add(letter),
      mistake: state.mistake + (state.answer.includes(letter) ? 0 : 1),
      gameOver: this.state.mistake == this.props.maxTry ? true : false,
      isWinner: this.guessedWord().join('') === this.state.answer,
    }));
  };

  // maps over the keyboard displaying every single character as a button
  generateButtons() {
    return 'abcdefghijklmnopqrstuvwxyz'.split('').map((letter) => (
      <button
        key={letter}
        className='btn btn-lg btn-primary m-2'
        value={letter}
        onClick={this.handleGuess}
        disabled={this.state.guessed.has(letter)}
      >
        {letter}
      </button>
    ));
  }

  // resets the entire game
  resetButton = () => {
    this.setState({
      mistake: 0,
      guessed: new Set([]),
      answer: randomWord(),
    });
  };

  render() {
    // const gameOver = this.state.mistake >= this.props.maxTry;

    let gameStat = this.generateButtons();

    if (this.state.isWinner) {
      gameStat = 'You won!';
      this.state.score += 1;
    }

    if (this.state.gameOver) {
      gameStat = 'You Lost!';
    }

    // console.log(this.state.score);
    return (
      <div className='hangman-container'>
        <h1 className='text-center'>Hangman</h1>
        <div className='float-left'>
          Wrong Guesses: {this.state.mistake} of {this.props.maxTry}
        </div>
        <div className='text-center'>
          <img src={this.props.images[this.state.mistake]} alt='' />
        </div>
        <div className='text-center'>
          <p>Guess The Food Category</p>
          <p>{this.state.answer}</p>
          <p>{!this.state.gameOver ? this.guessedWord() : this.state.answer}</p>
          <p>{gameStat}</p>
          <button className='btn btn-info' onClick={this.resetButton}>
            Reset
          </button>
        </div>
      </div>
    );
  }
}

const mapDispatch = {
  updateMiniGameScore,
};

export default connect((state) => state, mapDispatch)(Hangman);