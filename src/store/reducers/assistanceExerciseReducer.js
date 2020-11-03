import * as actionTypes from '../actions/actionTypes';

const initialState = {
    assistanceExercises: [],
    assistanceExercise: {},
    loading: false
};

const assistanceExerciseReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.LOADING_ASSISTANCE_EXERCISE :
            return {
                ...state,
                loading: true
            };
        case actionTypes.STOP_LOADING_ASSISTANCE_EXERCISE :
            return {
                ...state,
                loading: false
            };

        //    TODO: assistanceExercise: {}  OK?
        case actionTypes.GET_ALL_ASSISTANCE_EXERCISE :
            return {
                ...state,
                assistanceExercises: action.assistanceExercises,
                assistanceExercise: {},
                loading: false
            };
        case actionTypes.SAVE_ASSISTANCE_EXERCISE :
            return {
                ...state,
                assistanceExercise: action.assistanceExercise,
            };
        case actionTypes.UPDATE_ASSISTANCE_EXERCISE :
            return {
                ...state,
                assistanceExercise: action.assistanceExercise,
            };
        case actionTypes.DELETE_ASSISTANCE_EXERCISE :
            return {
                ...state,
                assistanceExercise: action.assistanceExercise
            };
        default:
            return state;
    }
};

export default assistanceExerciseReducer;
