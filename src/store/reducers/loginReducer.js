import * as actionTypes from '../actions/actionTypes';

const initialState = {
  authenticated: false,
  user: '',
  id: '',
  loading: false,
};

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOGIN_START :
      return {
        authenticated: false,
        user: '',
        id: '',
        loading: true,
      };
    case actionTypes.LOGIN_SUCCESS :
      return {
        ...state,
        authenticated: true,
        user: action.user,
        loading: false,
      };
    case actionTypes.GET_ID_START :
      return {
        ...state,
        loading: true,
      };
    case actionTypes.GET_ID_SUCCESS :
      return {
        ...state,
        id: action.id,
        loading: false,
      };
    case actionTypes.LOGOUT :
      return {
        ...state,
        authenticated: false,
        user: '',
        id: 0,
        loading: false
      };
    default:
      return state;
  }
};


export default loginReducer;
