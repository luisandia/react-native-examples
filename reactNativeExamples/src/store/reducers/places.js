import { ADD_PLACE, DELETE_PLACE, SELECT_PLACE, DESELECT_PLACE } from "../actions/actionTypes";

const initialState = {
    places: [],
    selectedPlace: null

}


const reducer = (state = initialState, action) => {
    console.log("REDUCTOR")
    console.log(action)
    switch (action.type) {
        case ADD_PLACE: {
            return {
                ...state,
                places: [...state.places,
                {
                    key: Math.floor(Math.random() * 10000).toString(),
                    value: action.placeName,
                    image: { uri: "http://lorempixel.com/400/200/food/" },
                }]
            }
        }
        case DELETE_PLACE: {
            return {
                ...state,
                places: state.places.filter((place) => {
                    return place.key !== action.key;
                }),
                selectedPlace: null
            }
        }
        case SELECT_PLACE: {
            return {
                ...state,
                selectedPlace: state.places.find(place => place.key === action.key)
            }

        }
        case DESELECT_PLACE: {
            return {
                ...state,
                selectedPlace: null
            }
        }
        default:
            return state;

    }


};

export default reducer;