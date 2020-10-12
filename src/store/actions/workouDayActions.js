import axios from 'axios';
import * as actionTypes from '../actions/actionTypes';

export const getWorkoutDaysByLoginId = (userId) => {
    return dispatch => {
        dispatch(clearError());
        dispatch(loadingWorkoutDays());

        axios.get(`/api/plan/${ userId }/user`,)
            .then(response => {

                console.log((response.data));

                dispatch(getWorkoutDaysData(response.data));

            })
            .catch(error => {
                if (error.response.data.message && error.response.data.field) {
                    dispatch(setError(error.response.data.message, error.response.data.field));
                } else {
                    dispatch(setError(error.response.data, ""));
                }
                dispatch(stopLoadingWorkoutDays());
            });
    };
};

export const getWorkoutDaysById = (id) => {
    return dispatch => {
        dispatch(clearError());
        dispatch(loadingWorkoutDays());

        axios.get(`/api/plan/${ id }/plan`,)
            .then(response => {
                dispatch(getWorkoutDaysData(response.data));
            })
            .catch(error => {
                if (error.response.data.message && error.response.data.field) {
                    dispatch(setError(error.response.data.message, error.response.data.field));
                } else {
                    dispatch(setError(error.response.data, ""));
                }
                dispatch(stopLoadingWorkoutDays());
            });
    };
};

export const addWorkoutDays = startingDetailsId => {
    return dispatch => {
        dispatch(clearError());
        dispatch(loadingWorkoutDays());

        axios.post(`/api/plan/${ startingDetailsId }`)
            .then(res => {
                dispatch(saveWorkoutDays(res.data));
                dispatch(stopLoadingWorkoutDays());
                dispatch(getWorkoutDaysById(res.data));
            })
            .catch(error => {
                dispatch(setError(error.response.data.message, error.response.data.field));
                dispatch(stopLoadingWorkoutDays());
            });
    };
};

export const getWorkoutDaysData = (workoutDaysData) => {
    return {
        type: actionTypes.GET_WORKOUT_DAY,
        workoutDays: workoutDaysData
    };
};

export const saveWorkoutDays = workoutDaysData => {
    return {
        type: actionTypes.SAVE_WORKOUT_DAY,
        workoutDays: workoutDaysData
    };
};


export const loadingWorkoutDays = () => {
    return {
        type: actionTypes.LOADING_WORKOUT_DAY
    };
};


export const stopLoadingWorkoutDays = () => {
    return {
        type: actionTypes.STOP_LOADING_WORKOUT_DAY
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

