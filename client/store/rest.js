import axios from 'axios';
const getToken = () => window.localStorage.getItem('token');

/*
 * NUMBER OF STOPS IN A PATH
 */
const NUM_RESTS = 5;
/*
 * CHOOSING A GAME RANDOMLY
 */
const GAME_OPTIONS = ['quiz', 'cake'];

function generateGameType() {
  let gameIndex = Math.floor(Math.random() * GAME_OPTIONS.length);
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
const _setGameTypes = (gameType) => ({ type: SET_GAME_TYPES, gameType });
/**
 * THUNK CREATORS
 */

export const setGameTypes = (pathId) => async (dispatch) => {
  const token = getToken();
  let promises = [];

  for (let i = 1; i <= NUM_RESTS; i++) {
    let game_type = generateGameType();
    console.log('game-type', game_type);
    await promises.push(
      axios.put(
        `/api/path/${pathId}/${i}`,
        { game_type },
        { headers: { authorization: token } }
      )
    );
  }
  Promise.all(promises).then(function (results) {
    results.forEach((result) => {
      dispatch(_setGameTypes(result));
    });
  });
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
  game_type: '',
};
export default function (state = initState, action) {
  switch (action.type) {
    case SET_RESTS:
      return { ...state, rests: action.rests };
    // case SET_GAME_TYPES:
    //   return { ...state, game_type: action.game_type }; //i don't think i've done this the way Luisa intended yet
    default:
      return state;
  }
}
