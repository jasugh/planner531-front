import axios from 'axios';
import * as actionTypes from '../actions/actionTypes';

export const getRoutineExerciseById = (id) => {
    return dispatch => {
        dispatch(clearError());
        dispatch(loadingWorkoutExercise());

        axios.get(`/api/routine/${ id }/exercise`,)
            .then(response => {
                dispatch(getWorkoutExerciseData(response.data));
                dispatch(stopLoadingWorkoutExercise());
            })
            .catch(error => {
                if (error.response.data.message && error.response.data.field) {
                    dispatch(setError(error.response.data.message, error.response.data.field));
                } else {
                    dispatch(setError(error.response.data.message, ""));
                }
                dispatch(stopLoadingWorkoutExercise());
            });
    };
};

export const loadingWorkoutExercise = () => {
    return {
        type: actionTypes.LOADING_ROUTINE_EXERCISE
    };
};

export const stopLoadingWorkoutExercise = () => {
    return {
        type: actionTypes.STOP_LOADING_ROUTINE_EXERCISE
    };
};

export const getWorkoutExerciseData = (workoutExerciseData) => {
    return {
        type: actionTypes.GET_ROUTINE_EXERCISE,
        workoutExercise: workoutExerciseData
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

