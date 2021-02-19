import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';

import MuiAlert from '@material-ui/lab/Alert';
import {makeStyles} from '@material-ui/core/styles';

import * as actions from '../../../store/actions';

import Loading from '../../common/Loading';
import WorkoutExercise from '../workoutExercise/WorkoutExercise';
import WorkoutExercisesDetails from './workoutExercises/WorkoutExercisesDetails';

function Alert(props) {
    return <MuiAlert elevation={ 6 } variant="filled" { ...props } />;
}

const styles = makeStyles((theme) => ({
        root: {
            transform: 'translateZ(0px)',
            flexGrow: 1,
            paddingTop: 20
        }
    })
);

const NextWorkout = props => {
    const [selectedExercise, setSelectedExercise] = useState({});
    const [startWorkout, setStartWorkout] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (props.login.id) {
            props.onGetNextWorkoutByLoginId(props.login.id);
        }
    }, [props.login.loading]);

    useEffect(() => {
        if (!props.login.loading && !props.workout.loading) {
            setLoading(false);
        }
    }, [props.login.loading, props.workout.loading]);

    //Styling
    const classes = styles();

    //*************************************************************************
    // <WorkoutExercise>
    //*************************************************************************
    const onGoBack = (exerciseSets) => {
        setStartWorkout(!startWorkout);
    };

    const onUpdateSets = (exerciseSets) => {

        console.log('onUpdateSets', exerciseSets)

        setLoading(true);
        props.onUpdateExerciseSets(exerciseSets, selectedExercise.id, props.login.id);
    };

    const startTimer = restTime => {
        props.onStartTimer(restTime);
    };

    const stopTimer = () => {
        props.onStopTimer();
    };
    //*************************************************************************
    // <WorkoutExercisesDetail>
    //*************************************************************************
    const onStartWorkout = exercise => {
        setSelectedExercise(exercise);
        setStartWorkout(!startWorkout);
    };
    //*************************************************************************
    let errorLines = (
        <div key={ 'err' } className={ classes.root }>
            <Alert severity="warning">Workout Plan has not been created. Create Starting Details and generate a
                Plan</Alert>
        </div>
    );

    let exerciseLines = [];
    // an exercise is selected from the list -> start workout
    if (startWorkout) {
        exerciseLines = (
            <WorkoutExercise
                exercise={ selectedExercise }
                onGoBack={ onGoBack }
                startTimer={ startTimer }
                stopTimer={ stopTimer }
                onUpdateSets={ onUpdateSets }
            />
        );
    } else {
        // show a list of exercises for the next workout
        exerciseLines = (
            <WorkoutExercisesDetails
                workout={ props.workout.workout }
                loginId={ props.login.id }
                onStartWorkout={ onStartWorkout }
            />
        );
    }
    //*************************************************************************
    return (
        <>
            { props.login.loading || props.workout.loading || loading ?
                <Loading/>
                :
                <div>
                    { props.error.message === "" ?
                        exerciseLines
                        :
                        errorLines
                    }
                </div>
            }
        </>
    );
};

const mapStateToProps = state => {
    return {
        login: state.loginReducer,
        error: state.errorReducer,
        workout: state.workoutReducer,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onGetNextWorkoutByLoginId: (loginId) => dispatch(actions.getNextWorkoutByLoginId(loginId)),
        onSkipWorkout: (id) => dispatch(actions.skipWorkoutById(id)),
        onDeleteExerciseFromWorkout: (id, loginId) => dispatch(actions.deleteExerciseFromWorkout(id, loginId)),
        onAddExerciseToWorkout: (id, workoutDay, loginId) =>
            dispatch(actions.addExerciseToWorkout(id, workoutDay, loginId)),
        onUpdateExerciseSets: (exerciseSets, woDayExerciseId, loginId) =>
            dispatch(actions.updateExerciseSets(exerciseSets, woDayExerciseId, loginId)),
        onStartTimer: (restTime) => dispatch(actions.startRestTimer(restTime)),
        onStopTimer: () => dispatch(actions.stopRestTimer())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(NextWorkout);

