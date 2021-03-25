import axios from 'axios';
const getToken = () => window.localStorage.getItem('token');

/**
 * ACTION TYPES
 */

const ADD_FAV = 'ADD_FAV';
/**
 * ACTION CREATORS
 */

const _addFav = (rest) => ({ type: ADD_FAV, rest });

/**
 * THUNK CREATORS
 */

export const addFav = (restId) => async (dispatch) => {
  const token = getToken();
  console.log('store', restId);
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

/**
 * REDUCER
 */
const initState = {
  rests: [],
};
export default function (state = initState, action) {
  switch (action.type) {
    case ADD_FAVE:
      return { ...state, rests: action.rests };
    default:
      return state;
  }
}
