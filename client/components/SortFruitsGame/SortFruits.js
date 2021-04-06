import React from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { CATEGORIES, FOODS } from './SortFruitsData';
import SortFruitsDropzone from './SortFruitsDropzone';
// import SortFruitsDropzone from '../SortFruitsGame/SortFruitsDropzone.js';
import { connect } from 'react-redux';
import { updateMiniGameScore } from '../../store/game';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

/**
 * Enums for representing the game play state
 */
export const GAME_STATE = {
  READY: 'ready',
  PLAYING: 'playing',
  DONE: 'done',
};
const initialState = {
  // Initialize
  unsorted: FOODS,
  [CATEGORIES.GOOD]: [],
  [CATEGORIES.BAD]: [],
  gameState: GAME_STATE.READY,
  score: 0,
};
class SortFruits extends React.Component {
  state = initialState;
  startGame = () => {
    this.setState({
      gameState: GAME_STATE.PLAYING,
    });
  };
  endGame = () => {
    this.setState({
      gameState: GAME_STATE.DONE,
    });
    // Calculate final user score
    let score = getCalculatedScore(
      this.state[CATEGORIES.GOOD],
      this.state[CATEGORIES.BAD]
    );
    this.state.score = score;
    this.props.updateMiniGameScore(this.state.score);
  };
  onDragEnd = ({ source, destination }) => {
    // If the destination is not found, return
    if (!destination) {
      return;
    }
    this.setState((state) => {
      return move(state, source, destination);
    });
  };
  render() {
    const { gameState, unsorted, score } = this.state;
    const isDropDisabled = gameState === GAME_STATE.DONE;
    return (
      <>
        {(this.state.gameState === GAME_STATE.PLAYING ||
          this.state.gameState === GAME_STATE.DONE) && (
          <DragDropContext onDragEnd={this.onDragEnd}>
            <Grid
              container
              direction="row"
              alignItems="flex-start"
              justify="center"
              spacing={1}
            >
              <Grid item xs={4}>
                <SortFruitsDropzone
                  id={CATEGORIES.GOOD}
                  foods={this.state[CATEGORIES.GOOD]}
                  isDropDisabled={isDropDisabled}
                />
              </Grid>
              <Grid item xs={4}>
                <SortFruitsDropzone
                  id="unsorted"
                  foods={unsorted}
                  isDropDisabled={isDropDisabled}
                />
              </Grid>
              <Grid item xs={4}>
                <SortFruitsDropzone
                  id={CATEGORIES.BAD}
                  foods={this.state[CATEGORIES.BAD]}
                  isDropDisabled={isDropDisabled}
                />
              </Grid>
            </Grid>
          </DragDropContext>
        )}
        <br />
        {this.state.gameState === GAME_STATE.DONE ? (
          <div id="sort-fruits-score">
            <p> Score: {score}</p>
          </div>
        ) : (
          <Button id="end-sort-fruit" onClick={this.endGame}>
            I'm done!
          </Button>
        )}
      </>
    );
  }
  componentDidMount() {
    this.startGame();
  }
}
// Some constants and helper functions
/**
 * Helps handle movement between lists
 */
export const move = (state, source, destination) => {
  const srcListClone = [...state[source.droppableId]];
  const destListClone =
    source.droppableId === destination.droppableId
      ? srcListClone
      : [...state[destination.droppableId]];
  const [movedElement] = srcListClone.splice(source.index, 1);
  destListClone.splice(destination.index, 0, movedElement);
  return {
    [source.droppableId]: srcListClone,
    ...(source.droppableId === destination.droppableId
      ? {}
      : {
          [destination.droppableId]: destListClone,
        }),
  };
};
/**
 * Calculate user score by compare what they have listed as good and bad compared to
 * actual good and bad arrays. Add a point for each correct answer to get the
 * total possible max of 12 (5 good + 7 bad)
 */
export const getCalculatedScore = (goodFoodUserAnswers, badFoodUserAnswers) => {
  let score = 0;
  // Get good and bad correct answers
  let goodFoods = [];
  let badFoods = [];
  for (let i = 0; i < FOODS.length; i++) {
    if (FOODS[i].categories === 'good') {
      goodFoods.push(FOODS[i].name);
    } else {
      badFoods.push(FOODS[i].name);
    }
  }
  // Compare the user's good and bad answers
  // If the user's answer is in the correct answer array, increase the score by 1 point
  score += getComparedAnswerScore(goodFoodUserAnswers, goodFoods);
  score += getComparedAnswerScore(badFoodUserAnswers, badFoods);
  return score;
};
function getComparedAnswerScore(userArray, correctArray) {
  let score = 0;
  for (let i = 0; i < userArray.length; i++) {
    if (correctArray.includes(userArray[i].name)) {
      score++;
    }
  }
  return score;
}
const mapStateToProps = (state) => {
  return {
    state,
  };
};
const mapDispatchToProps = {
  updateMiniGameScore,
};
export default connect(mapStateToProps, mapDispatchToProps)(SortFruits);
