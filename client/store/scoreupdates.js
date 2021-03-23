export const _updateCake = (cake) => {
    return {
      type: UPDATE_CAKE,
    };
  };

export const updateCake = (points) => async (dispatch) => {
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
    return dispatch(_updateQuiz(result));
  };