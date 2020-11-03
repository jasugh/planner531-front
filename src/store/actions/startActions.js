import axios from 'axios';
import * as actionTypes from '../actions/actionTypes';
import * as workoutDays  from '../actions/workouDayActions';

export const getStart = (loginId) => {
    return dispatch => {
        dispatch(clearError());
        dispatch(loadingStart());

        // TODO: make these urls shorter
        axios.get(`/api/starting/${ loginId }/user`,)
            .then(response => {
                if (!response.data) {
                    dispatch(getUserStart({}));
                } else {
                    dispatch(getUserStart(response.data));
                }
            })
            .catch(error => {
                if (error.response.data.message && error.response.data.field) {
                    dispatch(setError(error.response.data.message, error.response.data.field));
                } else {
                    dispatch(setError(error.response.data, ""));
                }
                dispatch(stopLoadingStart());
            });
    };
};

export const addStart = startData => {
    return dispatch => {
        dispatch(clearError());
        dispatch(loadingStart());

        axios.post('/api/starting/', startData)
            .then(res => {
                dispatch(saveStart(res.data));
                dispatch(stopLoadingStart());
                dispatch(getUserStart(res.data));

                // Add workouts according to the starting details information
                dispatch(workoutDays.addWorkoutDays(res.data.id));

            })
            .catch(error => {
                dispatch(setError(error.response.data.message, error.response.data.field));
                dispatch(stopLoadingStart());
            });
    };
};

export const removeStart = id => {
    return dispatch => {
        dispatch(clearError());
        dispatch(loadingStart());

        axios.delete(`/api/starting/${ id }`)
            .then(res => {
                dispatch(deleteStart());
                dispatch(getUserStart());
            })
            .catch(error => {
                if (error.response.data.message && error.response.data.field) {
                    dispatch(setError(error.response.data.message, error.response.data.field));
                } else {
                    dispatch(setError(error.message, ''));
                }
                dispatch(setError(`Deleting Start Id ${ id } failed`, ''));
                dispatch(getUserStart());
            });
    };
};

export const saveStart = startData => {
    return {
        type: actionTypes.SAVE_START,
        startingDetails: startData
    };
};

export const updateStart = startData => {
    return {
        type: actionTypes.UPDATE_START,
        startingDetails: startData
    };
};

export const deleteStart = id => {
    return {
        type: actionTypes.DELETE_START,
        startingDetails: id
    };
};

export const getUserStart = (startData) => {
    return {
        type: actionTypes.GET_START,
        startingDetails: startData
    };
};

export const setError = (message, field) => {
    return {
        type: actionTypes.SET_ERROR,
        message: message,
        field: field
    };
};

export const clearError = () => {
    return {
        type: actionTypes.CLEAR_ERROR
    };
};

export const loadingStart = () => {
    return {
        type: actionTypes.LOADING_START
    };
};

export const stopLoadingStart = () => {
    return {
        type: actionTypes.STOP_LOADING_START
    };
};
