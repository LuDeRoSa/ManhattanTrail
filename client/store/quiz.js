import axios from 'axios';

/**
 * ACTION TYPES
 */

const FETCH_QUIZ = 'FETCH_QUIZ';
/**
 * ACTION CREATORS
 */

export const _fetchQuiz = (quiz) => {
  return {
    type: FETCH_QUIZ,
    quiz,
  };
};

/**
 * THUNK CREATORS
 */
export const fetchQuiz = (id) => async (dispatch) => {
  const quiz = (await axios.get(`/api/quiz/${id}`)).data;
  return dispatch(_fetchQuiz(quiz));
};

/**
 * REDUCER
 */
export default function (state = [], action) {
  switch (action.type) {
    case FETCH_QUIZ:
      return action.quiz;
    default:
      return state;
  }
}
