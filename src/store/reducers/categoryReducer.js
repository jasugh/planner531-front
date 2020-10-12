import * as actionTypes from '../actions/actionTypes';

const initialState = {
  categories: [],
  category: {},
  loading: false
};

const categoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOADING_CATEGORY :
      return {
        ...state,
        loading: true
      };
    case actionTypes.STOP_LOADING_CATEGORY :
      return {
        ...state,
        loading: false
      };
    case actionTypes.GET_ALL_CATEGORY :
      return {
        ...state,
        categories: action.categories,
        category: {},
        loading: false
      };
    case actionTypes.SAVE_CATEGORY :
      return {
        ...state,
        category: action.category,
      };
    case actionTypes.UPDATE_CATEGORY :
      return {
        ...state,
        category: action.category,
      };
    case actionTypes.DELETE_CATEGORY :
      return {
        ...state,
        category: action.category
      };
    default:
      return state;
  }
};

export default categoryReducer;
