import axios from 'axios'

/**
 * ACTION TYPES
 */
const SET_QUIZ = 'SET_QUIZ'

/**
 * ACTION CREATORS
 */
const setQuiz = (quiz) => {
 return {
   type: SET_QUIZ,
   quiz
 }
}

/**
 * THUNK CREATORS
 */

export const fetchQuiz = () => async (dispatch) => {
  const quizReturn = (await axios.get(`/api/quiz/`)).data;
  console.log("this is the axios call return!!!!!!!",quizReturn);
  return dispatch(setQuiz(quizReturn));
};


/**
 * REDUCER
 */
export default function (state = {}, action) {
  switch (action.type) {
    case SET_QUIZ:
      return action.quiz;
    default:
      return state;
  }
}
