export const _updateScore = (cake) => {
    return {
      type: UPDATE_SCORE,
    };
  };

export const updateScore = (points) => async (dispatch) => {
    // console.log("the updateQuiz thunk received these points", points);
    const token = getToken();
    const result = (
      await axios.post(
        "/api/game/addScores",
        { points },
        {
          headers: {
            authorization: token,
          },
        }
      )
    ).data;
    return dispatch(_updateScore(result));
  };