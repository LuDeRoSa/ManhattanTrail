import axios from 'axios';
// const TOKEN = 'token';
import history from '../history';
// import getToken from './index';
const getToken = () => window.localStorage.getItem('token');
/**
 * ACTION TYPES
 */
const SET_GAME = 'SET_GAME';
const NEXT_STAGE = 'NEXT_STAGE';
/**
 * ACTION CREATORS
 */
const _setGame = (game) => ({ type: SET_GAME, game });
const _nextStage = (game) => ({ type: NEXT_STAGE, game }); //double check what action data is
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
    default:
      return state;
  }
}
