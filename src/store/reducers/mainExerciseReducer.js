import * as actionTypes from '../actions/actionTypes';

const initialState = {
    mainExercises: [],
    loading: false
};

const mainExerciseReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.LOADING_MAIN_EXERCISE :
            return {
                ...state,
                loading: true
            };
        case actionTypes.STOP_LOADING_MAIN_EXERCISE :
            return {
                ...state,
                loading: false
            };
        case actionTypes.UPDATE_MAIN_EXERCISE :
            return {
                ...state,
                loading: false
            };
        case actionTypes.GET_MAIN_EXERCISE :
            return {
                ...state,
                mainExercises: action.exercises,
                loading: false
            };
        default:
            return state;
    }
};

export default mainExerciseReducer;
