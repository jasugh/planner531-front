import React, {useState} from 'react';
import * as actions from '../../../store/actions';
import {connect} from 'react-redux';
import {makeStyles} from '@material-ui/core/styles';
import WorkoutExerciseHeader from './WorkoutExerciseHeader';
import WorkoutExerciseWeightRep from './WorkoutExerciseWeightRep';
import WorkoutExerciseDo from './WorkoutExerciseDo';

const styles = makeStyles((theme) => ({})
);
const WorkoutExercise = props => {
    //Properties
    const {exercise, onStartWorkout} = props;
    //Styling
    const classes = styles();

    return (
        <>
            <WorkoutExerciseHeader
                header={ exercise.exerciseName }
                onStartWorkout={ onStartWorkout }
            />
            <WorkoutExerciseDo
                exercise={exercise}
            />
        </>
    );
};

const mapStateToProps = state => {
    return {
        login: state.loginReducer,
        error: state.errorReducer,
        workoutRoutine: state.workoutRoutineReducer,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onGetRoutineExercise: (id) => dispatch(actions.getRoutineExerciseById(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(WorkoutExercise);
