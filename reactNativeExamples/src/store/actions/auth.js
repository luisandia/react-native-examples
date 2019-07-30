import { uiStartLoading, uiStopLoading } from "./index";
// import startMainTabs from "../../screens/MainTabs/startMainTabs";
import { TRY_AUTH, AUTH_SET_TOKEN, AUTH_REMOVE_TOKEN } from "./actionTypes";
const API_KEY = "AIzaSyD1vh5Df5G3Y6tywm1Pyc-FI-PAKJdoLvI";

export const tryAuth = (authData, authMode, navigation) => {

    return dispatch => {
        dispatch(uiStartLoading());
        let url =
            "https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=" +
            API_KEY;
        if (authMode === "signup") {
            url =
                "https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=" +
                API_KEY;
        }
        fetch(url, {
            method: "POST",
            body: JSON.stringify({
                email: authData.email,
                password: authData.password,
                returnSecureToken: true
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .catch(err => {
                console.log(err);
                alert(`${err.message}, please try again!`);
                dispatch(uiStopLoading());
            })
            .then(res => res.json())
            .then(parsedRes => {
                dispatch(uiStopLoading());
                console.log(parsedRes);
                if (!parsedRes.idToken) {
                    alert("no token, Authentication failed, please try again!");
                } else {
                    dispatch(
                        authStoreToken(
                            parsedRes.idToken,
                            parsedRes.expiresIn,
                            parsedRes.refreshToken
                        )
                    );
                    // startMainTabs();
                    navigation.navigate('LoggedIn');
                }
            });
    };
    // dispatch(authSignup(authData, navigation));
    // };
};
export const authStoreToken = (token, expiresIn, refreshToken) => {
    return dispatch => {
        const now = new Date();
        const expiryDate = now.getTime() + expiresIn * 1000;
        dispatch(authSetToken(token, expiryDate));
        AsyncStorage.setItem("ap:auth:token", token);
        AsyncStorage.setItem("ap:auth:expiryDate", expiryDate.toString());
        AsyncStorage.setItem("ap:auth:refreshToken", refreshToken);
    };
};
export const authSetToken = (token, expiryDate) => {
    return {
        type: AUTH_SET_TOKEN,
        token: token,
        expiryDate: expiryDate
    };
};

export const authSignup = (authData, navigation) => {
    return dispatch => {
        dispatch(uiStartLoading());
        fetch(
            "https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyD1vh5Df5G3Y6tywm1Pyc-FI-PAKJdoLvI",
            {
                method: "POST",
                body: JSON.stringify({
                    email: authData.email,
                    password: authData.password,
                    returnSecureToken: true
                }),
                headers: {
                    "Content-Type": "application/json"
                }
            }
        )
            .catch(err => {
                console.log(err);
                alert("Authentication failed, please try again!");
                dispatch(uiStopLoading());
            })
            .then(res => {
                if (res.ok)
                    return res.json()
                else {
                    throw new Error();
                }
            })
            .then(parsedRes => {
                dispatch(uiStopLoading());
                if (parsedRes.error) {
                    console.log(parsedRes.error)
                    alert(`${parsedRes.error.message}, please try again! `);
                } else {
                    // startMainTabs();
                    console.log("AUTENTICADO !!!")
                    dispatch(
                        authStoreToken(
                            parsedRes.idToken,
                            parsedRes.expiresIn,
                            parsedRes.refreshToken
                        )
                    );
                    navigation.navigate('LoggedIn');
                }
            });
    };
};





///////////////////////

import { AsyncStorage } from "react-native";

// export const authSetToken = (token, expiryDate) => {
//     return {
//         type: AUTH_SET_TOKEN,
//         token: token,
//         expiryDate: expiryDate
//     };
// };

export const authGetToken = () => {
    return (dispatch, getState) => {
        const promise = new Promise((resolve, reject) => {
            const token = getState().auth.token;
            const expiryDate = getState().auth.expiryDate;
            if (!token || new Date(expiryDate) <= new Date()) {
                let fetchedToken;
                AsyncStorage.getItem("ap:auth:token")
                    .catch(err => reject())
                    .then(tokenFromStorage => {
                        fetchedToken = tokenFromStorage;
                        if (!tokenFromStorage) {
                            reject();
                            return;
                        }
                        return AsyncStorage.getItem("ap:auth:expiryDate");
                    })
                    .then(expiryDate => {
                        const parsedExpiryDate = new Date(parseInt(expiryDate));
                        const now = new Date();
                        if (parsedExpiryDate > now) {
                            dispatch(authSetToken(fetchedToken));
                            resolve(fetchedToken);
                        } else {
                            reject();
                        }
                    })
                    .catch(err => reject());
            } else {
                resolve(token);
            }
        });
        return promise
            .catch(err => {
                return AsyncStorage.getItem("ap:auth:refreshToken")
                    .then(refreshToken => {
                        return fetch(
                            "https://securetoken.googleapis.com/v1/token?key=" + API_KEY,
                            {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/x-www-form-urlencoded"
                                },
                                body: "grant_type=refresh_token&refresh_token=" + refreshToken
                            }
                        );
                    })
                    .then(res => {
                        if (res.ok)
                            return res.json()
                        else {
                            throw new Error();
                        }
                    })
                    .then(parsedRes => {
                        if (parsedRes.id_token) {
                            console.log("Refresh token worked!");
                            dispatch(
                                authStoreToken(
                                    parsedRes.id_token,
                                    parsedRes.expires_in,
                                    parsedRes.refresh_token
                                )
                            );
                            return parsedRes.id_token;
                        } else {
                            dispatch(authClearStorage());
                        }
                    });
            })
            .then(token => {
                if (!token) {
                    throw new Error();
                } else {
                    return token;
                }
            });
    };
};

export const authAutoSignIn = (navigation) => {
    return dispatch => {
        dispatch(authGetToken())
            .then(token => {
                navigation.navigate('LoggedIn');

            })
            .catch(err => console.log("Failed to fetch token!"));
    };
};

export const authClearStorage = () => {
    return dispatch => {
        AsyncStorage.removeItem("ap:auth:token");
        AsyncStorage.removeItem("ap:auth:expiryDate");
        return AsyncStorage.removeItem("ap:auth:refreshToken");
    };
};

export const authLogout = (navigation) => {
    return dispatch => {
        dispatch(authClearStorage()).then(() => {
            // App();
            // debugger;
            navigation.navigate('Login');

        });
        dispatch(authRemoveToken());
    };
};

export const authRemoveToken = () => {
    return {
        type: AUTH_REMOVE_TOKEN
    };
};

