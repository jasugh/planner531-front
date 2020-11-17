import * as actionTypes from '../actions/actionTypes';

const initialState = {
    workoutExercise: {},
    loading: true
};

const workoutRoutineReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.LOADING_ROUTINE_EXERCISE :
            return {
                ...state,
                loading: true
            };
        case actionTypes.STOP_LOADING_ROUTINE_EXERCISE :
            return {
                ...state,
                loading: false
            };
        case actionTypes.GET_ROUTINE_EXERCISE :
            return {
                ...state,
                workoutExercise: action.workoutExercise,
            };
        default:
            return state;
    }
};

export default workoutRoutineReducer;
