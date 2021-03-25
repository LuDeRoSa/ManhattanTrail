import axios from 'axios';
import history from '../history';
import {_updateQuiz} from "./quiz";
const getToken = () => window.localStorage.getItem('token');
/**
 * ACTION TYPES
 */
const SET_GAME = 'SET_GAME';
const NEXT_STAGE = 'NEXT_STAGE';
const UPDATE_SCORE = "UPDATE_SCORE";
/**
 * ACTION CREATORS
 */
const _setGame = (game) => ({ type: SET_GAME, game });
const _nextStage = (game) => ({ type: NEXT_STAGE, game }); //double check what action data is
export const updateScore = (score) => {
  return {
    type: UPDATE_SCORE,
    score
  };
};
/**
 * THUNK CREATORS
 */
export const setGame = (userId) => async (dispatch) => {
  const token = getToken();
  const game = (
    await axios.get('/api/game', {
      headers: {
        authorization: token,
      },
    })
  ).data;
  return dispatch(_setGame(game));
};
export const nextStage = () => async (dispatch) => {
  const token = getToken();
  const game = (
    await axios.put(
      '/api/game/next',
      {},
      {
        headers: {
          authorization: token,
        },
      }
    )
  ).data;
  if (game.status === 'finished') {
    history.push('/gameover');
  }
  return dispatch(_nextStage(game));
};
// Update score for any mini-game
export const updateMiniGameScore = (points) => async (dispatch) => {
  console.log("the updateMiniGameScore thunk received these points", points);
  // const token = getToken();
  // const result = (
  //     await axios.post(
  //         "/api/quiz/addScores",
  //         { points },
  //         {
  //           headers: {
  //             authorization: token,
  //           },
  //         }
  //     )
  // ).data;
  // return dispatch(updateScore(result));
};
/**
 * REDUCER
 */
const initState = {
  pathId: 0,
  gameStage: 0,
  status: 'no-game',
};
export default function (state = initState, action) {
  switch (action.type) {
    case SET_GAME:
      return {
        pathId: action.game.pathId,
        gameStage: action.game.stage,
        status: action.game.status,
      };
    case NEXT_STAGE:
      return {
        ...state,
        gameStage: action.game.stage,
        status: action.game.status,
      };
    case UPDATE_SCORE:
      return {...state, score: action.score};
    default:
      return state;
  }
}