import React, {useEffect, useState} from 'react';
import * as actions from '../../../store/actions';

import {connect} from 'react-redux';

import MuiAlert from '@material-ui/lab/Alert';
import {makeStyles} from '@material-ui/core/styles';

import Loading from '../../common/Loading';
import WorkoutExercise from '../workoutExercise/WorkoutExercise';
// import WorkoutExercises from '../nextWorkout/workoutExercises/WorkoutExercisesList';

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

    useEffect(() => {
        props.onGetCategories();
        props.onGetExercises();
    }, []);

    useEffect(() => {
        if (props.login.id) {
            props.onGetNextWorkoutByLoginId(props.login.id);
        }
    }, [props.login.loading]);

    //Styling
    const classes = styles();

    //*************************************************************************

    const onStartWorkout = (exercise) => {
        setSelectedExercise(exercise);
        setStartWorkout(!startWorkout);
    };

    const onGoBack = () => {
        setStartWorkout(!startWorkout);
    };

    //*************************************************************************

    let errorLines = [];

    errorLines.push(
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
            />
        );
    } else {
        // show a list of exercises for the next workout
        // exerciseLines = (
            // <WorkoutExercises
            //     workout={ props.workout.workout }
            //     onStartWorkout={ onStartWorkout }
            //     exercises={ props.exercise.exercises }
            // />
        // );
    }

    //*************************************************************************

    return (
        <>
            { props.login.loading || props.workout.loading ?
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
        exercise: state.exerciseReducer,
        category: state.categoryReducer,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onGetCategories: () => dispatch(actions.getCategories()),
        onGetExercises: () => dispatch(actions.getExercises()),
        onGetNextWorkoutByLoginId: (loginId) => dispatch(actions.getNextWorkoutByLoginId(loginId)),
        onSkipWorkout: (id) => dispatch(actions.skipWorkoutById(id)),
        onDeleteExerciseFromWorkout: (id, loginId) => dispatch(actions.deleteExerciseFromWorkout(id, loginId)),
        onAddExerciseToWorkout: (id, workoutDay, loginId) => dispatch(actions.addExerciseToWorkout(id, workoutDay, loginId))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(NextWorkout);

