export function userList() {
  return (dispatch, getstate) => {
    //eslint-disable-line
    dispatch({ type: "LIST_GET_REQUEST" });
    //If we want to make use of access token while calling an API the we can get that from REDUX state directly
    // ${getstate().appstate.access_token

    fetch(`${getstate().appConfig.serverUrl}api/users?page=2`)
      .then(response => response.json())
      .then(responseJson => {
        dispatch({
          type: "LIST_GET_SUCCESS",
          payload: responseJson
        });
      })
      .catch(error => {
        if (error) {
          dispatch({ type: "LIST_GET_REQUEST_FAIL" });
        }
      });
  };
}
