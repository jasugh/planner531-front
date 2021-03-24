import axios from 'axios';
import jwt_decode from 'jwt-decode';

import setAuthToken from '../../utils/setAuthToken';
import * as actionTypes from './actionTypes';

export const authenticateUser = userData => {
    return dispatch => {
        dispatch(clearError());
        dispatch(authStart());

         // Get token
        axios.post('/api/login/authenticate', userData)
            .then(res => {
                const token = res.data;

                // Set token to ls
                localStorage.setItem('token', 'Bearer ' + token);

                // Set token to Auth header for Axios
                setAuthToken('Bearer ' + token);

                // Decode token to get user data
                const decoded = jwt_decode(token);

                // Set user and other auth stuff
                dispatch(authorizationSuccess(decoded.sub));
                // Get user id
                dispatch(getUserId(userData.loginName));
            })
            .catch(error => {
                    dispatch(setError(error.message, ''));
                }
            );

    };
};

export const getUserId = (loginName) => {
    return dispatch => {
        dispatch(clearError());
        dispatch(getIdStart());
        axios.get(`api/login/${ loginName }/name`)
            .then(res => {
                dispatch(getIdSuccess(res.data.id));
            })
            .catch(error => {
                    dispatch(setError(error.message, ''));
                }
            );
    };
};

export const logoutUser = () => {
    localStorage.removeItem('token');
    setAuthToken(false);
    return dispatch => {
        dispatch(clearError());
        dispatch(logOut());
    };
};

export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logoutUser());
        }, expirationTime * 1000);
    };
};

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if (!token) {
            dispatch(logoutUser());
        } else {
            const decoded = jwt_decode(localStorage.token.substring(7));
            const expirationDate = new Date(decoded.exp);

            if (expirationDate <= new Date().getTime() / 1000) {
                dispatch(logoutUser());
            } else {
                // Set token to Auth header for Axios
                setAuthToken(false);
                setAuthToken(token);
                dispatch(authorizationSuccess(decoded.sub));
                dispatch(getUserId(decoded.sub));
                dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime() / 1000)));
            }
        }
    };
};

export const authStart = () => {
    return {
        type: actionTypes.LOGIN_START
    };
};

export const authorizationSuccess = user => {
    return {
        type: actionTypes.LOGIN_SUCCESS,
        user: user
    };
};

export const getIdStart = () => {
    return {
        type: actionTypes.GET_ID_START
    };
};

export const getIdSuccess = id => {
    return {
        type: actionTypes.GET_ID_SUCCESS,
        id: id
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

export const logOut = () => {
    return {
        type: actionTypes.LOGOUT
    };
};
