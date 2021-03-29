import axios from 'axios';
const getToken = () => window.localStorage.getItem('token');

/**
 * ACTION TYPES
 */

const ADD_FAVORITE = 'ADD_FAVORITE';
const GET_FAVORITES = 'GET_FAVORITES';
/**
 * ACTION CREATORS
 */

const _addFavorite = (rest) => ({ type: ADD_FAVORITE, rest });
const _getFavorites = (favorites) => ({ type: GET_FAVORITES, favorites });

/**
 * THUNK CREATORS
 */

export const addFavorite = (restId) => async (dispatch) => {
  const token = getToken();
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
  return dispatch(_addFavorite(rest));
};

export const getFavorites = () => async (dispatch) => {
  const token = getToken();
  const favorites = (
    await axios.get(`/api/favorite/`, {
      headers: {
        authorization: token,
      },
    })
  ).data;
  return dispatch(_getFavorites(favorites));
};
/*
 * REDUCER
 */
const initState = {
  favorites: [],
};
export default function (state = initState, action) {
  switch (action.type) {
    case ADD_FAVORITE:
      return { ...state, rests: action.rests };
    case GET_FAVORITES:
      return { ...state, favorites: action.favorites };
    default:
      return state;
  }
}
