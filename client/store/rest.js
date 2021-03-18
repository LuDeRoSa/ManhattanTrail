import axios from 'axios';
const getToken = () => window.localStorage.getItem('token');

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

export const setGameTypes = (pathId) => async (dispatch) => {
  const token = getToken();

  // for (let i = 1; i <= NUM_RESTS; i++) {
  //    let game_type = generateGameType();
  //     await axios.put(
  //     `/api/path/${pathId}/${i}`,
  //     {game_type},
  //     {headers: { authorization: token } }
  //     )
  // }

  for (let i = 1; i <= NUM_RESTS; i++) {
     let game_type = generateGameType();
     console.log('game-type',game_type)
       await axios.put(
        `/api/path/${pathId}/${i}`,
        {game_type},
        {headers: { authorization: token } }
        )
  }

            // dispatch(_setGameTypes(results));

  //  return dispatch(_setGameTypes(rest));
};

export const setRests = (pathId) => async (dispatch) => {
  const rests = (await axios.get(`/api/path/${pathId}/restaurants`)).data;
  return dispatch(_setRests(rests));
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


