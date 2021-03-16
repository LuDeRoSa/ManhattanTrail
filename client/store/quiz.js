import axios from "axios";
const getToken = () => window.localStorage.getItem("token");

/**
 * ACTION TYPES
 */
// const SET_QUIZ = "SET_QUIZ";
const UPDATE_QUIZ = "UPDATE_QUIZ";
const FETCH_QUIZ = "FETCH_QUIZ";
/**
 * ACTION CREATORS
 */
// export const setQuiz = (quiz) => {
//   return {
//     type: SET_QUIZ,
//     quiz,
//   };
// };

export const _updateQuiz = (quiz) => {
  return {
    type: UPDATE_QUIZ,
  };
};

/* AXIOS CALL */

export const _fetchQuiz = (quiz) => {
  return {
    type: FETCH_QUIZ,
    quiz,
  };
};

export const fetchQuiz = (id) => async (dispatch) => {
  const quiz = (await axios.get(`/api/quiz/${id}`)).data;
  // console.log(quiz);
  return dispatch(_fetchQuiz(quiz));
};

// export const pullQuiz = () => {
//   return axios.get("/api/quiz/");
// };

/**
 * THUNK CREATORS
 */

// export const fetchQuiz = () => {
//   return function (dispatch) {
//     return pullQuiz().then((result) => dispatch(setQuiz(result.data)));
//   };
// };

export const updateQuiz = (points) => async (dispatch) => {
  // console.log("the updateQuiz thunk received these points", points);
  const token = getToken();
  const result = (
    await axios.post(
      "/api/quiz/addScores",
      { points },
      {
        headers: {
          authorization: token,
        },
      }
    )
  ).data;
  return dispatch(_updateQuiz(result));
};

/**
 * REDUCER
 */
export default function (state = [], action) {
  switch (action.type) {
    // case SET_QUIZ:
    //   return action.quiz;
    case FETCH_QUIZ:
      return action.quiz;
    default:
      return state;
  }
}
