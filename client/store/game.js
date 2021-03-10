import axios from 'axios';
const TOKEN = 'token';
/**
 * ACTION TYPES
 */
const SET_GAME = 'SET_GAME';
/**
 * ACTION CREATORS
 */
const _setGame = (game) => ({ type: SET_GAME, game });
/**
 * THUNK CREATORS
 */
export const setGame = (userId) => async (dispatch) => {
  const token = window.localStorage.getItem(TOKEN);
  console.log('store reducer sees userid,', userId);
  const game = (
    await axios.get('/api/game', {
      headers: {
        authorization: token,
      },
    })
  ).data;
  console.log(game);
  return dispatch(_setGame(game));
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
    default:
      return state;
  }
}
