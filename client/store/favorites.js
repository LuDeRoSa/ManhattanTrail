import axios from 'axios';
const getToken = () => window.localStorage.getItem('token');

/**
 * ACTION TYPES
 */

const ADD_FAV = 'ADD_FAV';
const GET_FAV = 'GET_FAV';
/**
 * ACTION CREATORS
 */

const _addFav = (rest) => ({ type: ADD_FAV, rest });
const _getFav = (favorites) => ({ type: GET_FAV, favorites });

/**
 * THUNK CREATORS
 */

export const addFav = (restId) => async (dispatch) => {
  const token = getToken();
  // console.log('store', restId);
  const rest = (
    await axios.post(
      `/api/favorite/addFave`,
      { restId },
      {
        headers: {
          authorization: token,
        },
      }
    )
  ).data;
  return dispatch(_addFav(rest));
};

export const getFav = (userId) => async (dispatch) => {
  const token = getToken();

  // console.log('store', userId);
  const favorites = (
    await axios.get(`/api/favorite/${userId}`, {
      headers: {
        authorization: token,
      },
    })
  ).data;
  return dispatch(_getFav(favorites));
  // console.log('store', rest);
};
/**
 * REDUCER
 */
const initState = {
  favorites: [],
};
export default function (state = initState, action) {
  switch (action.type) {
    case ADD_FAV:
      return { ...state, rests: action.rests };
    case GET_FAV:
      return { ...state, favorites: action.favorites };
    default:
      return state;
  }
}
