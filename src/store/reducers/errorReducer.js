import * as actionTypes from '../actions/actionTypes';

const initialState = {
  message: '',
  field: ''
};

export default function (state = initialState, action) {
  switch (action.type) {
    case actionTypes.SET_ERROR:
      if (!action.field) {
        action.field = '';
      }
      return {
        message: action.message,
        field: action.field
      };
    case actionTypes.CLEAR_ERROR:
      return initialState;
    default:
      return state;
  }
}
