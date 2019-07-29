import { ADD_PLACE, DELETE_PLACE, DESELECT_PLACE, SELECT_PLACE, SET_PLACES } from './actionTypes';
import { uiStartLoading, uiStopLoading, authGetToken } from "./index";


// export const addPlace = (placeName, location, image) => {

//     return dispatch => {

//         dispatch(uiStartLoading());

//         console.log("SUBIendo imagen")
//         const placeData = {
//             name: placeName,
//             location
//         }
//         fetch("https://us-central1-react-native-shareplace-9762b.cloudfunctions.net/storeImage", {
//             method: 'POST',
//             body: JSON.stringify({
//                 image: image.base64
//             })
//         }).catch(e => { console.log(e); alert("something went wrong,please try again"); dispatch(uiStopLoading()) })
//             .then(res => res.json())
//             .then(
//                 parseRes => {
//                     console.log(parseRes);

//                     placeData.image = { uri: parseRes.imageUrl }

//                     return fetch("https://react-native-shareplace-9762b.firebaseio.com/places.json", {
//                         method: 'POST',
//                         body: JSON.stringify(placeData)
//                     })
//                 }).catch(e => { console.log(e); alert("something went wrong,please try again"); dispatch(uiStopLoading()) })
//             .then(res => res.json())
//             .then(
//                 res => {
//                     console.log(res);
//                     placeData.key = res.name;
//                     dispatch({
//                         type: ADD_PLACE,
//                         placeData
//                     });
//                     dispatch(uiStopLoading());
//                 });

//     }
// };


export const addPlace = (placeName, location, image) => {
    return dispatch => {
        const placeData = {
            name: placeName,
            location
        }
        let authToken;
        dispatch(uiStartLoading());
        dispatch(authGetToken())
            .catch(() => {
                alert("No valid token found!");
            })
            .then(token => {
                authToken = token;
                return fetch(
                    "https://us-central1-react-native-shareplace-9762b.cloudfunctions.net/storeImage",
                    {
                        method: "POST",
                        body: JSON.stringify({
                            image: image.base64
                        }),
                        headers: {
                            Authorization: "Bearer " + authToken
                        }
                    }
                );
            })
            .catch(err => {
                console.log(err);
                alert(`${err.message}, please try again!`);
                dispatch(uiStopLoading());
            })
            .then(res => res.json())
            .then(res => {
                placeData.image = { uri: res.imageUrl }
                return fetch(
                    "https://react-native-shareplace-9762b.firebaseio.com/places.json?auth=" +
                    authToken,
                    {
                        method: "POST",
                        body: JSON.stringify(placeData)
                    }
                );
            })
            .then(res => res.json())
            .then(res => {
                console.log(res);
                placeData.key = res.name;
                dispatch({
                    type: ADD_PLACE,
                    placeData
                });
                dispatch(uiStopLoading());
            })
            .catch(err => {
                console.log(err);
                alert(`${err.message}, please try again!`);
                dispatch(uiStopLoading());
            });
    };
};

// export const deletePlace = (key) => {
//     return async dispatch => {



//     }
// };


export const deletePlace = key => {
    return dispatch => {
        dispatch(authGetToken())
            .catch(() => {
                alert("No valid token found!");
            })
            .then(token => {
                dispatch(removePlace(key));
                return fetch(
                    "https://react-native-shareplace-9762b.firebaseio.com/places/" +
                    key +
                    ".json?auth=" +
                    token,
                    {
                        method: "DELETE"
                    }
                );
            })
            .then(res => res.json())
            .then(parsedRes => {
                console.log("Done!");
            })
            .catch(err => {
                alert(`${err.message}, sorry :/`);
                console.log(err);
            });
    };
};

export const removePlace = key => {
    return {
        type: DELETE_PLACE,
        key: key
    };
};

export const setPlaces = places => {

    return {
        type: SET_PLACES,
        places
    }
}

// export const getPlaces = () => {
//     return async (dispatch) => {
//         try {
//             res = await fetch("https://react-native-shareplace-9762b.firebaseio.com/places.json");
//             const json = await res.json();
//             let places = []
//             for (let key in json) {
//                 places.push({
//                     ...json[key],
//                     key,
//                 })
//             }
//             dispatch(setPlaces(places))
//         } catch (e) {
//             console.error(e);
//             alert("something went wrong,please try again");
//         }
//     }
// }

export const getPlaces = () => {
    return dispatch => {
        dispatch(authGetToken())
            .then(token => {
                return fetch(
                    "https://react-native-shareplace-9762b.firebaseio.com/places.json?auth=" +
                    token
                );
            })
            .catch(() => {
                alert("No valid token found!");
            })
            .then(res => res.json())
            .then(parsedRes => {
                const places = [];
                for (let key in parsedRes) {
                    places.push({
                        ...parsedRes[key],
                        key,
                    })
                }
                dispatch(setPlaces(places));
            })
            .catch(err => {
                alert(`${err.message}, sorry :/`);
                console.log(err);
            });
    };
};

