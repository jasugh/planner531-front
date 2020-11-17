import axios from 'axios';
import * as actionTypes from '../actions/actionTypes';

export const getNextWorkoutByLoginId = (userId) => {
    return dispatch => {
        dispatch(clearError());
        dispatch(loadingWorkout());

        axios.get(`/api/plan/${ userId }/user/next`,)
            .then(response => {
                dispatch(getWorkoutData(response.data));
                dispatch(stopLoadingWorkout());
            })
            .catch(error => {
                if (error.response.data.message && error.response.data.field) {
                    dispatch(setError(error.response.data.message, error.response.data.field));
                } else {
                    dispatch(setError(error.response.data.message, ""));
                }
                dispatch(stopLoadingWorkout());
            });
    };
};

export const skipWorkoutById = (id) => {
    return dispatch => {
        dispatch(clearError());
        dispatch(loadingWorkout());

        axios.put(`/api/plan/${ id }/skip`,)
            .then(response => {
                dispatch(skipWorkoutData(response.data));
                dispatch(stopLoadingWorkout());
            })
            .catch(error => {
                if (error.response.data.message && error.response.data.field) {
                    dispatch(setError(error.response.data.message, error.response.data.field));
                } else {
                    dispatch(setError(error.response.data, ""));
                }
                dispatch(stopLoadingWorkout());
            });
    };
};

export const completeWorkoutById = (id) => {
    return dispatch => {
        dispatch(clearError());
        dispatch(loadingWorkout());

        axios.put(`/api/plan/${ id }/complete`,)
            .then(response => {
                dispatch(completeWorkoutData(response.data));
                dispatch(stopLoadingWorkout());
            })
            .catch(error => {
                if (error.response.data.message && error.response.data.field) {
                    dispatch(setError(error.response.data.message, error.response.data.field));
                } else {
                    dispatch(setError(error.response.data.message, ""));
                }
                dispatch(stopLoadingWorkout());
            });
    };
};

export const loadingWorkout = () => {
    return {
        type: actionTypes.LOADING_WORKOUT
    };
};

export const stopLoadingWorkout = () => {
    return {
        type: actionTypes.STOP_LOADING_WORKOUT
    };
};

export const getWorkoutData = (workoutData) => {
    return {
        type: actionTypes.GET_WORKOUT,
        workout: workoutData
    };
};

export const skipWorkoutData = (workoutData) => {
    return {
        type: actionTypes.SKIP_WORKOUT,
        workout: workoutData
    };
};


export const completeWorkoutData = (workoutData) => {
    return {
        type: actionTypes.COMPLETE_WORKOUT,
        workout: workoutData
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

