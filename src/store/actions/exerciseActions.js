import axios from 'axios';
import * as actionTypes from '../actions/actionTypes';
import {getCategories, loadingCategories, stopLoadingCategories} from './categoryActions';

export const getExercises = () => {
    return dispatch => {
        dispatch(clearError());
        dispatch(loadingExercises());

        axios.get('/api/exercise/',)
            .then(response => {
                if (!response.data) {
                    dispatch(getAllExercise([]));
                } else {
                    dispatch(getAllExercise(response.data));
                }
            })
            .catch(error => {
                dispatch(setError(error.toString(), null));
                dispatch(stopLoadingExercises());
            });
    };
};

export const addExercise = exerciseData => {
    return dispatch => {
        dispatch(clearError());
        dispatch(loadingExercises());
        dispatch(loadingCategories());

        axios.post('/api/exercise/', exerciseData)
            .then(res => {
                dispatch(saveExercise(exerciseData));
                dispatch(getExercises());
                dispatch(getCategories());
            })
            .catch(error => {
                dispatch(setError(error.response.data.message, error.response.data.field));
                dispatch(stopLoadingExercises());
                dispatch(stopLoadingCategories());
            });
    };
};

export const changeExercise = exerciseData => {
    return dispatch => {
        dispatch(clearError());
        dispatch(loadingExercises());
        dispatch(loadingCategories());

        axios.put(`/api/exercise/${ exerciseData.id }`, exerciseData)
            .then(res => {
                dispatch(updateExercise(exerciseData));
                dispatch(getExercises());
                dispatch(getCategories());
            })
            .catch(error => {
                dispatch(setError(error.response.data.message, error.response.data.field));
                dispatch(stopLoadingExercises());
                dispatch(stopLoadingCategories());
            });
    };
};

export const removeExercise = id => {
    return dispatch => {
        dispatch(clearError());
        dispatch(loadingExercises());

        axios.delete(`/api/exercise/${ id }`)
            .then(res => {
                dispatch(deleteExercise(id));
                dispatch(getExercises());
                dispatch(getCategories());
            })
            .catch(error => {
                if (error.response.data.message && error.response.data.field) {
                    dispatch(setError(error.response.data.message, error.response.data.field));
                } else {
                    dispatch(setError(error.message, ''));
                }
                dispatch(setError(`Deleting Exercise Id ${ id } failed`, ''));
                dispatch(getExercises());
                dispatch(stopLoadingCategories());
            });
    };
};

export const saveExercise = exerciseData => {
    return {
        type: actionTypes.SAVE_EXERCISE,
        exercise: exerciseData
    };
};

export const updateExercise = exerciseData => {
    return {
        type: actionTypes.UPDATE_EXERCISE,
        exercise: exerciseData
    };
};

export const deleteExercise = id => {
    return {
        type: actionTypes.DELETE_EXERCISE,
        exercise: id
    };
};

export const getAllExercise = (exercises) => {
    return {
        type: actionTypes.GET_ALL_EXERCISE,
        exercises: exercises
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

export const loadingExercises = () => {
    return {
        type: actionTypes.LOADING_EXERCISE
    };
};

export const stopLoadingExercises = () => {
    return {
        type: actionTypes.STOP_LOADING_EXERCISE
    };
};
