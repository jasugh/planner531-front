import * as actionTypes from '../actions/actionTypes';

const initialState = {
  startingDetails: {},
  loading: false
};

const startReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOADING_START :
      return {
        ...state,
        loading: true
      };
    case actionTypes.STOP_LOADING_START :
      return {
        ...state,
        loading: false
      };
    case actionTypes.GET_START :
      return {
        ...state,
        startingDetails: action.startingDetails,
        loading: false
      };
    case actionTypes.SAVE_START :
      return {
        ...state,
        startingDetails: action.startingDetails,
      };
    case actionTypes.UPDATE_START :
      return {
        ...state,
        startingDetails: action.startingDetails,
      };
    case actionTypes.DELETE_START :
      return {
        ...state,
        startingDetails: action.startingDetails
      };
    default:
      return state;
  }
};

export default startReducer;
