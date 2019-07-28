import { UI_START_LOADING, UI_STOP_LOADING } from './actionTypes'

export const uiStartLoading = (params) => {
    return {
        type: UI_START_LOADING
    }
}
export const uiStopLoading = (params) => {
    return {
        type: UI_STOP_LOADING
    }
}
