import axios from 'axios';
const getToken = () => window.localStorage.getItem('token');

/**
 * ACTION TYPES
 */
const SET_PAST_GAMES = 'SET_PAST_GAMES';
/**
 * ACTION CREATORS
 */
const _setPastGames = (pastgames) => ({ type: SET_PAST_GAMES, pastgames });
/**
 * THUNK CREATORS
 */
export const fetchPastGames = () => async (dispatch) => {
  const token = getToken();
  const pastgames = (
    await axios.get('/api/game/pastgames', {
      headers: {
        authorization: token,
      },
    })
  ).data;
  return dispatch(_setPastGames(pastgames));
};
/**
 * REDUCER
 */
const initState = {
  pastgames: [],
};
export default function (state = initState, action) {
  switch (action.type) {
    case SET_PAST_GAMES:
      return { ...state, pastgames: action.pastgames };
    default:
      return state;
  }
}
