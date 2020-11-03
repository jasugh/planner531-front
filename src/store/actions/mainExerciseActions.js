import axios from 'axios';
import * as actionTypes from '../actions/actionTypes';

export const getMainExercises = loginId => {
    return dispatch => {
        dispatch(clearError());
        dispatch(loadingMainExercises());

        axios.get(`/api/main/${ loginId }`,)
            .then(response => {
                if (!response.data) {
                    dispatch(getMainExercise([]));
                } else {
                    dispatch(getMainExercise(response.data));
                }
            })
            .catch(error => {
                dispatch(setError(error.toString(), null));
                dispatch(stopLoadingMainExercises());
            });
    };
};

export const changeMainExercise = (mainExerciseData, loginId)=> {
    return dispatch => {
        dispatch(clearError());
        dispatch(loadingMainExercises());

        axios.put(`/api/main/${ mainExerciseData.id }`, mainExerciseData)
            .then(res => {
                dispatch(updateMainExercise(mainExerciseData));
                dispatch(getMainExercises(loginId));
            })
            .catch(error => {
                dispatch(setError(error.toString(), null));
                dispatch(stopLoadingMainExercises());
            });
    };
};

export const updateMainExercise = mainExerciseData => {
    return {
        type: actionTypes.UPDATE_MAIN_EXERCISE,
        exercise: mainExerciseData
    };
};

export const getMainExercise = (mainExercises) => {
    return {
        type: actionTypes.GET_MAIN_EXERCISE,
        exercises: mainExercises
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

export const loadingMainExercises = () => {
    return {
        type: actionTypes.LOADING_MAIN_EXERCISE
    };
};

export const stopLoadingMainExercises = () => {
    return {
        type: actionTypes.STOP_LOADING_MAIN_EXERCISE
    };
};
