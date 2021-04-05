import React, {useEffect, useState} from 'react';

import WorkoutHeader from './WorkoutHeader';
import AddExercise from './AddExercise';
import SpeedDialButtons from './SpeedDialButtons';
import ExercisesList from './ExercisesList';
import * as actions from '../../../../store/actions';
import {connect} from 'react-redux';
import Header from '../../../common/Header';

const WorkoutExercisesDetails = props => {
    const [speedDialOpen, setSpeedDialOpen] = useState(false);
    const [exerciseDialogOpen, setExerciseDialogOpen] = useState(false);

    useEffect(() => {
        props.onGetExercises();
    }, []);

    const {workout, loginId, onStartWorkout,} = props;

    //*************************************************************************
    // <SpeedDialButtons>
    //*************************************************************************
    const onAddExercise = () => {
        // -> open Add Exercise dialog
        setExerciseDialogOpen(true);
    };

    const onSkipWorkout = () => {
        props.onSkipWorkout(workout.id);
    };

    const onCloseSpeedDial = () => {
        setSpeedDialOpen(false);
    };

    const onOpenSpeedDial = () => {
        setSpeedDialOpen(true);
    };
    //*************************************************************************
    // <AddExercise>
    //*************************************************************************
    const onCloseExerciseDialog = () => {
        setExerciseDialogOpen(false);
    };

    const onAddSelectedExercise = (id) => {
        const workoutDay = {
            id: workout.id
        };

        props.onAddExerciseToWorkout(id, workoutDay, loginId);
        setExerciseDialogOpen(false);
    };
    //*************************************************************************
    // <ExercisesList>
    //*************************************************************************
    const onDeleteExercise = (exercise) => {
        props.onDeleteExerciseFromWorkout(exercise.id, loginId);
    };
    //*************************************************************************
    let fabLines =
        <SpeedDialButtons
            speedDialOpen={ speedDialOpen }
            onAddExercise={ onAddExercise }
            onSkipWorkout={ onSkipWorkout }
            onCloseSpeedDial={ onCloseSpeedDial }
            onOpenSpeedDial={ onOpenSpeedDial }
        />;


    let addExercise =
        <AddExercise
            assistanceExercises={ props.exercise.exercises }
            exerciseDialogOpen={ exerciseDialogOpen }
            onCloseExerciseDialog={ onCloseExerciseDialog }
            onAddSelectedExercise={ onAddSelectedExercise }
        />;

    let exercisesList =
        <ExercisesList
            workout={ workout }
            onStartWorkout={ onStartWorkout }
            onDeleteExercise={ onDeleteExercise }
        />;

    const fabRef = React.useRef();

    return (
        <React.Fragment>
            <Header header={ "Next workout" }/>
            <WorkoutHeader
                workout={ workout }
            />
            { fabLines }
            { exercisesList }
            { addExercise }
        </React.Fragment>
    );
};

const mapStateToProps = state => {
    return {
        error: state.errorReducer,
        exercise: state.exerciseReducer,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onGetExercises: () => dispatch(actions.getExercises()),
        onSkipWorkout: (id) => dispatch(actions.skipWorkoutById(id)),
        onDeleteExerciseFromWorkout: (id, loginId) => dispatch(actions.deleteExerciseFromWorkout(id, loginId)),
        onAddExerciseToWorkout: (id, workoutDay, loginId) => dispatch(actions.addExerciseToWorkout(id, workoutDay, loginId))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(WorkoutExercisesDetails);
