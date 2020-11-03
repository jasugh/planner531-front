import axios from 'axios';
import * as actionTypes from '../actions/actionTypes';
import {getCategories, loadingCategories, stopLoadingCategories} from './categoryActions';

export const getAssistanceExercises = () => {
    return dispatch => {
        dispatch(clearError());
        dispatch(loadingAssistanceExercises());

        axios.get('/api/assistance/',)
            .then(response => {
                if (!response.data) {
                    dispatch(getAllAssistanceExercise([]));
                } else {
                    dispatch(getAllAssistanceExercise(response.data));
                }
            })
            .catch(error => {
                dispatch(setError(error.toString(), null));
                dispatch(stopLoadingAssistanceExercises());
            });
    };
};

export const addAssistanceExercise = assistanceExerciseData => {
    return dispatch => {
        dispatch(clearError());
        dispatch(loadingAssistanceExercises());
        dispatch(loadingCategories());

        axios.post('/api/assistance/', assistanceExerciseData)
            .then(res => {
                dispatch(saveAssistanceExercise(assistanceExerciseData));
                dispatch(getAssistanceExercises());
                dispatch(getCategories());
            })
            .catch(error => {
                dispatch(setError(error.response.data.message, error.response.data.field));
                dispatch(stopLoadingAssistanceExercises());
                dispatch(stopLoadingCategories());
            });
    };
};

export const changeAssistanceExercise = assistanceExerciseData => {
    return dispatch => {
        dispatch(clearError());
        dispatch(loadingAssistanceExercises());
        dispatch(loadingCategories());

        axios.put(`/api/assistance/${ assistanceExerciseData.id }`, assistanceExerciseData)
            .then(res => {
                dispatch(updateAssistanceExercise(assistanceExerciseData));
                dispatch(getAssistanceExercises());
                dispatch(getCategories());
            })
            .catch(error => {
                dispatch(setError(error.response.data.message, error.response.data.field));
                dispatch(stopLoadingAssistanceExercises());
                dispatch(stopLoadingCategories());
            });
    };
};

export const removeAssistanceExercise = id => {
    return dispatch => {
        dispatch(clearError());
        dispatch(loadingAssistanceExercises());

        axios.delete(`/api/assistance/${ id }`)
            .then(res => {
                dispatch(deleteAssistanceExercise(id));
                dispatch(getAssistanceExercises());
                dispatch(getCategories());
            })
            .catch(error => {
                if (error.response.data.message && error.response.data.field) {
                    dispatch(setError(error.response.data.message, error.response.data.field));
                } else {
                    dispatch(setError(error.message, ''));
                }
                dispatch(setError(`Deleting Exercise Id ${ id } failed`, ''));
                dispatch(getAssistanceExercises());
                dispatch(stopLoadingCategories());
            });
    };
};

export const saveAssistanceExercise = assistanceData => {
    return {
        type: actionTypes.SAVE_ASSISTANCE_EXERCISE,
        assistanceExercise: assistanceData
    };
};

export const updateAssistanceExercise = assistanceData => {
    return {
        type: actionTypes.UPDATE_ASSISTANCE_EXERCISE,
        assistanceExercise: assistanceData
    };
};

export const deleteAssistanceExercise = id => {
    return {
        type: actionTypes.DELETE_ASSISTANCE_EXERCISE,
        assistanceExercise: id
    };
};

export const getAllAssistanceExercise = (assistance) => {
    return {
        type: actionTypes.GET_ALL_ASSISTANCE_EXERCISE,
        assistanceExercises: assistance
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

export const loadingAssistanceExercises = () => {
    return {
        type: actionTypes.LOADING_ASSISTANCE_EXERCISE
    };
};

export const stopLoadingAssistanceExercises = () => {
    return {
        type: actionTypes.STOP_LOADING_ASSISTANCE_EXERCISE
    };
};
