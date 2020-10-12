import * as actionTypes from './actionTypes'

export const sendError = message  => {
    return dispatch => {
        dispatch(clearError());
        dispatch(setError(message, null));

    };
};

export const setError = (message, field) => {
    return {
        type: actionTypes.SET_ERROR,
        message: message,
        field: field
    };
};
export const clearError = dispatch => {
    return {
        type: actionTypes.CLEAR_ERROR
    }
}
