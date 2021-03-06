import axios from 'axios';
/**
 * ACTION TYPES
 */
const SET_RESTS = 'SET_RESTS';
/**
 * ACTION CREATORS
 */
const _setRests = (rests) => ({ type: SET_RESTS, rests });
/**
 * THUNK CREATORS
 */
export const setRests = () => async (dispatch) => {
  const rests = (await axios.get('/api/path/1/restaurants')).data;
  console.log(rests);
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
      return { ...state, rests: [action.rests] };
    default:
      return state;
  }
}
