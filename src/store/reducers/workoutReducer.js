import * as actionTypes from '../actions/actionTypes';

const initialState = {
    workout: {},
    loading: true
};

const workoutReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.LOADING_WORKOUT :
            return {
                ...state,
                loading: true
            };
        case actionTypes.STOP_LOADING_WORKOUT :
            return {
                ...state,
                loading: false
            };
        case actionTypes.GET_WORKOUT :
            return {
                ...state,
                workout: action.workout,
            };
        case actionTypes.SKIP_WORKOUT :
            return {
                ...state,
                workout: action.workout,
            };
        case actionTypes.COMPLETE_WORKOUT :
            return {
                ...state,
                workout: action.workout,
            };
        default:
            return state;
    }
};

export default workoutReducer;
