import { SERVER_URL } from "../../constants/url";
import * as types from "../../actionTypes";
import { Alert } from "react-native";
import { goHome, goToAuth } from "../../config/navigation";

export const loginAPI = data => {
  return (dispatch, getState) => {
    dispatch({ type: types.LOGIN_REQUEST });
    fetch(`${SERVER_URL}users/authenticate`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(res => {
        return res.json();
      })
      .then(response => {
        if (response.message) {
          Alert.alert("Login", response.message);
          dispatch({ type: types.LOGIN_FAIL });
        } else {
          dispatch({ type: types.LOGIN_SUCCESS, payload: response });
          goHome();
        }
      })
      .catch(err => {
        Alert.alert("Error", "Something went wrong. Please try again later.");
        dispatch({ type: types.LOGIN_FAIL });
      });
  };
};

export const logout = () => {
  return (dispatch, getState) => {
    dispatch({ type: "LOGOUT" });
    goToAuth();
  };
};
