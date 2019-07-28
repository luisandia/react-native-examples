import { ADD_PLACE, DELETE_PLACE, DESELECT_PLACE, SELECT_PLACE, SET_PLACES } from './actionTypes';
import { uiStartLoading, uiStopLoading } from './ui';

export const addPlace = (placeName, location, image) => {

    return dispatch => {

        dispatch(uiStartLoading());

        console.log("SUBIendo imagen")
        const placeData = {
            name: placeName,
            location
        }
        fetch("https://us-central1-react-native-shareplace-9762b.cloudfunctions.net/storeImage", {
            method: 'POST',
            body: JSON.stringify({
                image: image.base64
            })
        }).catch(e => { console.log(e); alert("something went wrong,please try again"); dispatch(uiStopLoading()) })
            .then(res => res.json())
            .then(
                parseRes => {
                    console.log(parseRes);

                    placeData.image = { uri: parseRes.imageUrl }

                    return fetch("https://react-native-shareplace-9762b.firebaseio.com/places.json", {
                        method: 'POST',
                        body: JSON.stringify(placeData)
                    })
                }).catch(e => { console.log(e); alert("something went wrong,please try again"); dispatch(uiStopLoading()) })
            .then(res => res.json())
            .then(
                res => {
                    console.log(res);
                    placeData.key = res.name;
                    dispatch({
                        type: ADD_PLACE,
                        placeData
                    });
                    dispatch(uiStopLoading());
                });

    }
};

// export const deletePlace = (key) => {
//     return async dispatch => {



//     }
// };

export const deletePlace = (key) => {
    return dispatch => {
        console.log("eliminando...")
        console.log(key)
        dispatch({
            type: DELETE_PLACE,
            key
        });
        fetch("https://react-native-shareplace-9762b.firebaseio.com/places/" + key + ".json", {
            method: "DELETE"
        })
            .catch(err => {
                alert("Something went wrong, sorry :/");
                console.log(err);
            })
            .then(res => res.json())
            .then(parsedRes => {
                console.log("Done!");
            });
    };
};

export const setPlaces = places => {

    return {
        type: SET_PLACES,
        places
    }
}

export const getPlaces = () => {
    return async (dispatch) => {
        try {
            res = await fetch("https://react-native-shareplace-9762b.firebaseio.com/places.json");
            const json = await res.json();
            let places = []
            for (let key in json) {
                places.push({
                    ...json[key],
                    key,
                })
            }
            dispatch(setPlaces(places))
        } catch (e) {
            console.error(e);
            alert("something went wrong,please try again");
        }
    }
}


