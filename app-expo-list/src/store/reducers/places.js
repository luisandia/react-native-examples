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
                    image: { uri: "https://images.pexels.com/photos/67636/rose-blue-flower-rose-blooms-67636.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" },
                }]
            }
        }
        case DELETE_PLACE: {
            return {
                ...state,
                places: state.places.filter((place) => {
                    return place.key !== state.selectedPlace.key;
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