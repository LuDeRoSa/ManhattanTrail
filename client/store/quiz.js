import axios from 'axios'

/**
 * ACTION TYPES
 */
const SET_QUIZ = 'SET_QUIZ'

/**
 * ACTION CREATORS
 */
export const setQuiz = (quiz) => {
 return {
   type: SET_QUIZ,
   quiz
 }
}

/* AXIOS CALL */
export const pullQuiz = () => {
  return axios.get("/api/quiz/")
}

/**
 * THUNK CREATORS
 */

export const fetchQuiz = () =>  {
  return function(dispatch){
    return pullQuiz().then(result => dispatch(setQuiz(result.data)))
  }

};


/**
 * REDUCER
 */
export default function (state = [], action) {
  switch (action.type) {
    case SET_QUIZ:
      return action.quiz;
    default:
      return state;
  }
}
