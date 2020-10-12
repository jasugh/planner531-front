import * as actionTypes from '../actions/actionTypes';

const initialState = {
    exercises: [],
    exercise: {},
    loading: false
};

const exerciseReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.LOADING_EXERCISE :
            return {
                ...state,
                loading: true
            };
        case actionTypes.STOP_LOADING_EXERCISE :
            return {
                ...state,
                loading: false
            };
        case actionTypes.GET_ALL_EXERCISE :
            return {
                ...state,
                exercises: action.exercises,
                exercise: {},
                loading: false
            };
        case actionTypes.SAVE_EXERCISE :
            return {
                ...state,
                exercise: action.exercise,
            };
        case actionTypes.UPDATE_EXERCISE :
            return {
                ...state,
                exercise: action.exercise,
            };
        case actionTypes.DELETE_EXERCISE :
            return {
                ...state,
                exercise: action.exercise
            };
        default:
            return state;
    }
};

export default exerciseReducer;
