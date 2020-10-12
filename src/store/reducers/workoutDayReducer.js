import * as actionTypes from '../actions/actionTypes';

const initialState = {
  workoutDays: [],
  loading: false
};

const workoutDayReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOADING_WORKOUT_DAY :
      return {
        ...state,
        loading: true
      };
    case actionTypes.STOP_LOADING_WORKOUT_DAY :
      return {
        ...state,
        loading: false
      };
    case actionTypes.GET_WORKOUT_DAY :
      return {
        ...state,
        workoutDays: action.workoutDays,
        loading: false
      };
    case actionTypes.SAVE_WORKOUT_DAY :
      return {
        ...state,
        workoutDays: action.workoutDays
      };
    case actionTypes.UPDATE_WORKOUT_DAY :
      return {
        ...state,
        workoutDays: action.workoutDays
      };
    case actionTypes.DELETE_WORKOUT_DAY :
      return {
        ...state,
        workoutDays: action.workoutDays
      };
    default:
      return state;
  }
};

export default workoutDayReducer;
