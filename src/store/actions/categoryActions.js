import axios from 'axios';
import * as actionTypes from '../actions/actionTypes';

export const getCategories = () => {
    return dispatch => {
        dispatch(clearError());
        dispatch(loadingCategories());

        axios.get('/api/category/',)
            .then(response => {
                if (!response.data) {
                    dispatch(getAllCategory([]));
                } else {
                    dispatch(getAllCategory(response.data));
                }
            })
            .catch(error => {


                dispatch(stopLoadingCategories());
            });
    };
};

export const addCategory = categoryData => {
    return dispatch => {
        dispatch(clearError());
        dispatch(loadingCategories());

        axios.post('/api/category/', categoryData)
            .then(res => {
                dispatch(saveCategory(categoryData));
                dispatch(getCategories());
            })
            .catch(error => {
                dispatch(setError(error.response.data.message, error.response.data.field));
                dispatch(stopLoadingCategories());
            });
    };
};

export const changeCategory = categoryData => {
    return dispatch => {
        dispatch(clearError());
        dispatch(loadingCategories());

        axios.put(`/api/category/${ categoryData.id }`, categoryData)
            .then(res => {
                dispatch(updateCategory(categoryData));
                dispatch(getCategories());
            })
            .catch(error => {
                dispatch(setError(error.response.data.message, error.response.data.field));
                dispatch(stopLoadingCategories());
            });
    };
};

export const removeCategory = id => {
    return dispatch => {
        dispatch(clearError());
        dispatch(loadingCategories());

        axios.delete(`/api/category/${ id }`)
            .then(res => {
                dispatch(deleteCategory(id));
                dispatch(getCategories());
            })
            .catch(error => {
                if (error.response.data.message && error.response.data.field) {
                    dispatch(setError(error.response.data.message, error.response.data.field));
                } else {
                    if (error.response.data.message) {
                        dispatch(setError(error.response.data.message, ''));
                    } else {
                        dispatch(setError(`Deleting Category Id ${ id } failed`, ''));
                    }
                }
                dispatch(stopLoadingCategories());
                // dispatch(getCategories());
            });
    };
};

export const saveCategory = categoryData => {
    return {
        type: actionTypes.SAVE_CATEGORY,
        category: categoryData
    };
};

export const updateCategory = categoryData => {
    return {
        type: actionTypes.UPDATE_CATEGORY,
        category: categoryData
    };
};

export const deleteCategory = id => {
    return {
        type: actionTypes.DELETE_CATEGORY,
        category: id
    };
};

export const getAllCategory = (categories) => {
    return {
        type: actionTypes.GET_ALL_CATEGORY,
        categories: categories
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

export const loadingCategories = () => {
    return {
        type: actionTypes.LOADING_CATEGORY
    };
};

export const stopLoadingCategories = () => {
    return {
        type: actionTypes.STOP_LOADING_CATEGORY
    };
};
