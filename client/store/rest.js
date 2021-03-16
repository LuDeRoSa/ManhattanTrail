import axios from 'axios';

/*
* NUMBER OF STOPS IN A PATH
*/
const NUM_RESTS = 5;
/*
* CHOOSING A GAME RANDOMLY
*/
const GAME_OPTIONS = ["quiz","cake"];

function generateGameType() {
  let gameIndex = Math.floor(Math.random()*GAME_OPTIONS.length);
  return GAME_OPTIONS[gameIndex];
}
/**
 * ACTION TYPES
 */
const SET_RESTS = 'SET_RESTS';
const SET_GAME_TYPES = 'SET_GAME_TYPES';
/**
 * ACTION CREATORS
 */
const _setRests = (rests) => ({ type: SET_RESTS, rests });
const _setGameTypes = (gameType) => ({ type: SET_GAME_TYPES, gameType }); //TBD
/**
 * THUNK CREATORS
 */
export const setRests = (pathId) => async (dispatch) => {
  const rests = (await axios.get(`/api/path/${pathId}/restaurants`)).data;
  return dispatch(_setRests(rests));
};

export const setGameTypes = (pathId) => async (dispatch) => {
  
  // for (let i = 1; i < NUM_RESTS+1; i++) {
    let game_type = generateGameType();
    let rest = await axios.put(`/api/path/${pathId}/1`, game_type);
    console.log('game-type',{rest});
    dispatch(_setGameTypes(rest));

  // 
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


