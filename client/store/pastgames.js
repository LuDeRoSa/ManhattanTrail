import axios from "axios";
const getToken = () => window.localStorage.getItem("token");

/**
 * ACTION TYPES
 */

const SET_PAST_GAMES = 'SET_PAST_GAMES';
const SET_LEADERSHIP = 'SET_LEADERSHIP';

/**
 * ACTION CREATORS
 */
const _setPastGames = (pastgames) => ({ type: SET_PAST_GAMES, pastgames });
const _setLeadership = (leadership) => ({ type: SET_LEADERSHIP, leadership });

/**
 * THUNK CREATORS
 */
export const fetchPastGames = () => async (dispatch) => {
  const token = getToken();
  const pastgames = (
    await axios.get("/api/game/pastgames", {
      headers: {
        authorization: token,
      },
    })
  ).data;
  return dispatch(_setPastGames(pastgames));
};

//this is an opportunity to use socket.io for live updates
export const fetchLeadership = () => async (dispatch) => {
  const leadership = (await axios.get('/api/game/leadership')).data;
  return dispatch(_setLeadership(leadership));
};
/**
 * REDUCER
 */
const initState = {
  pastgames: [],
  leadership: [],
};
export default function (state = initState, action) {
  switch (action.type) {
    case SET_PAST_GAMES:
      return { ...state, pastgames: action.pastgames };
    case SET_LEADERSHIP:
      return { ...state, leadership: action.leadership };
    default:
      return state;
  }
}
