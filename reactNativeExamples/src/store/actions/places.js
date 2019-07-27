import { ADD_PLACE, DELETE_PLACE, DESELECT_PLACE, SELECT_PLACE } from './actionTypes';

export const addPlace = (placeName, location, image) => {
    return {
        type: ADD_PLACE,
        placeName,
        location,
        image
    };
};

export const deletePlace = (key) => {
    return {
        type: DELETE_PLACE,
        key
    }
};

export const selectPlace = (key) => {
    return {
        type: SELECT_PLACE,
        key
    }
}

export const deselectPlace = () => {
    return {
        type: DESELECT_PLACE
    }
}

