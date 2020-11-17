import {combineReducers} from 'redux';

import loginReducer from './loginReducer';
import categoryReducer from './categoryReducer';
import exerciseReducer from './exerciseReducer';
import mainExerciseReducer from './mainExerciseReducer';
import assistanceExerciseReducer from './assistanceExerciseReducer';
import startingDetailsReducer from './startingDetailsReducer';
import workoutDayReducer from './workoutDayReducer';
import workoutReducer from './workoutReducer';
import errorReducer from './errorReducer';
import workoutRoutineReducer from './workoutRoutineReducer';

export default combineReducers({
    loginReducer: loginReducer,
    categoryReducer: categoryReducer,
    exerciseReducer: exerciseReducer,
    mainExerciseReducer: mainExerciseReducer,
    assistanceExerciseReducer: assistanceExerciseReducer,
    startingDetailsReducer: startingDetailsReducer,
    workoutDayReducer: workoutDayReducer,
    workoutReducer: workoutReducer,
    workoutRoutineReducer: workoutRoutineReducer,
    errorReducer: errorReducer
});
