import {combineReducers} from 'redux';

import loginReducer from './loginReducer';
import categoryReducer from './categoryReducer';
import exerciseReducer from './exerciseReducer';
import startReducer from './startReducer';
import errorReducer from './errorReducer';
import workoutDayReducer from './workoutDayReducer';

export default combineReducers({
    login: loginReducer,
    category: categoryReducer,
    exercise: exerciseReducer,
    startingDetails: startReducer,
    workoutDays: workoutDayReducer,
    error: errorReducer
});
