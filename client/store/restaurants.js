import axios from "axios";
/**
 * ACTION TYPES
 */
const SET_RESTAURANTS = "SET_RESTAURANTS";
/**
 * ACTION CREATORS
 */
const _setRest = (rests) => ({ type: SET_RESTAURANTS, rests });
/**
 * THUNK CREATORS
 */
export const setRest = () => async (dispatch) => {
  const res = await axios.get("/api/1/restaurants");
  return dispatch(_setRest(res.data));
};
/**
 * REDUCER
 */
const initState = {
  restaurants: [],
};
export default function (state = initState, action) {
  switch (action.type) {
    case SET_RESTAURANTS:
      return action.rests;
    default:
      return state;
  }
}
