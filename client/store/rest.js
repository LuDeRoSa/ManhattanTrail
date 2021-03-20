import axios from 'axios';
const getToken = () => window.localStorage.getItem('token');

/**
 * ACTION TYPES
 */
const SET_RESTS = 'SET_RESTS';
/**
 * ACTION CREATORS
 */
const _setRests = (rests) => ({ type: SET_RESTS, rests });
// const _setGameTypes = (gameType) => ({ type: SET_GAME_TYPES, gameType });
/**
 * THUNK CREATORS
 */

export const setRests = (pathId) => async (dispatch) => {
  const rests = (await axios.get(`/api/path/${pathId}/restaurants`)).data;
  return dispatch(_setRests(rests));
};

/**
 * REDUCER
 */
const initState = {
  rests: [],
};
export default function (state = initState, action) {
  switch (action.type) {
    case SET_RESTS:
      return { ...state, rests: action.rests };
    default:
      return state;
  }
}
