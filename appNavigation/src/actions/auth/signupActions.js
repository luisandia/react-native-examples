import { SERVER_URL } from "../../constants/url";
import * as types from "../../actionTypes";
import { Navigation } from "react-native-navigation";
import { Alert } from "react-native";

export const signup = (data, componentId) => {
  return (dispatch, getState) => {
    dispatch({ type: types.SIGNUP_REQUEST });
    fetch(`${SERVER_URL}users/register`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(response => {
        if (response.status === 200) {
          dispatch({ type: types.SIGNUP_SUCCESS, payload: data });
          Navigation.push(componentId, {
            component: {
              name: "Congratulation",
              options: {
                statusBar: {
                  style: "light"
                },
                topBar: {
                  visible: false,
                  drawBehind: true
                }
              }
            }
          });
        } else {
          dispatch({ type: types.SIGNUP_FAIL });
          Alert.alert(
            "Sign up",
            "Sign up failed, Please check if you are using the same email id for signing up."
          );
        }
      })
      .catch(err => {
        Alert.alert("Error", "Something went wrong. Please try again later.");
        dispatch({ type: types.SIGNUP_FAIL });
      });
  };
};
export const forgotPassword = (data, componentId) => {
  return (dispatch, getState) => {
    dispatch({ type: types.FORGOTPASS_REQUEST });
    fetch(`${SERVER_URL}users/forgotPassword`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(response => {
        if (response.status === 200) {
          dispatch({ type: types.FORGOTPASS_SUCCESS });
          Navigation.push(componentId, {
            component: {
              name: "DetailsSent",
              options: {
                statusBar: {
                  style: "light"
                },
                topBar: {
                  visible: false,
                  drawBehind: true
                }
              }
            }
          });
        } else {
          dispatch({ type: types.FORGOTPASS_FAIL });
          Alert.alert(
            "Forgot password",
            "Sorry. We cannot find any account associated with this email."
          );
        }
      })
      .catch(err => {
        apiError();
        dispatch({ type: types.FORGOTPASS_FAIL });
      });
  };
};
