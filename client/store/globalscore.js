import axios from "axios";
import thunk from 'redux-thunk';

//ACTION CREATOR

export const setScore = (score) => {
  return {
    type: "SET_SCORE",
    score
  }
};

//AXIOS CALLS

export const pullScore = (id) => {
  return axios.get(`/api/scores/${id}`)
}

//THUNK HERE
export const fetchScore = (id) => {
  return function(dispatch){
    return pullScore(id).then(result=> dispatch(setScore(result.data)))
  }
}


//REDUCER HERE

export default function scoreReducer(state=[], action){
  if (action.type === "SET_SCORE"){
    return action.score
  }
  else{
    return state;
  }
}
