import { ADD_PLACE, DELETE_PLACE, SELECT_PLACE, DESELECT_PLACE, SET_PLACES } from "../actions/actionTypes";

const initialState = {
    places: [],
    selectedPlace: null

}


const reducer = (state = initialState, action) => {
    console.log("REDUCTOR")
    console.log(action)
    switch (action.type) {
        case ADD_PLACE: {
            debugger;
            return {
                ...state,
                places: [...state.places,
                action.placeData]
            }
        }
        case DELETE_PLACE: {
            debugger;
            return {
                ...state,
                places: state.places.filter((place) => {
                    return place.key !== action.key;
                }),
                selectedPlace: null
            }
        }
        // case DELETE_PLACE: {
        //     return {
        //         ...state,
        //         places: state.places.filter((place) => {
        //             return place.key !== action.key;
        //         }),
        //         selectedPlace: null
        //     }
        // }
        case SET_PLACES: {
            return {
                ...state,
                places: action.places
            }
        }
        default:
            return state;

    }


};

export default reducer;