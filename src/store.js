import {applyMiddleware, createStore, compose} from "redux";
import thunk from 'redux-thunk';
import rootReducer from './store/reducers/combineReducers';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)
));

// // in case redux toos not available in Chrome ---->
// const store = createStore(
//     rootReducer,
//     initialState,
//     applyMiddleware(...middleware),
// );

export default store;
