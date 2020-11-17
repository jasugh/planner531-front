import React, {useEffect, useState} from 'react';
import * as actions from '../../../store/actions';
import {connect} from 'react-redux';

import MuiAlert from '@material-ui/lab/Alert';
import {makeStyles} from '@material-ui/core/styles';

import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';

import Header from '../../common/Header';
import WorkoutDetails from './WorkoutDetails';
import Loading from '../../common/Loading';
import AddExercise from './AddExercise';
import {Add, SkipNext} from '@material-ui/icons';
import Workout from '../workoutExercise/WorkoutExercise';
import WorkoutExercise from '../workoutExercise/WorkoutExercise';

function Alert(props) {
    return <MuiAlert elevation={ 6 } variant="filled" { ...props } />;
}

const styles = makeStyles((theme) => ({
        root: {
            transform: 'translateZ(0px)',
            flexGrow: 1,
            paddingTop: 20
        },
        exampleWrapper: {
            position: 'relative',
            marginTop: theme.spacing(3),
            height: 380,
        },
        speedDial: {
            margin: theme.spacing(1),
            position: "fixed",
            bottom: theme.spacing(2),
            right: theme.spacing(3),
            opacity: 0.8
        }
    })
);

const NextWorkout = props => {
    const [selectedExercise, setSelectedExercise] = useState({});
    const [openSpeedDial, setOpenSpeedDial] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const [hidden, setHidden] = useState(false);
    const [startWorkout, setStartWorkout] = useState(false);

    useEffect(() => {
        props.onGetCategories();
        props.onGetExercises();
    }, []);

    useEffect(() => {
        if (props.login.id) {
            props.onGetNextWorkoutByLoginId(props.login.id);
        }
    }, [props.login.loading, props.workout.workout.completed]);

    const classes = styles();

    //Buttons on WorkoutDetail-component
    const onDeleteExercise = (exercise) => {
        props.onDeleteExerciseFromWorkout(exercise.id);
    };

    const onStartWorkout = (exercise) => {
        setSelectedExercise(exercise);
        setStartWorkout(!startWorkout);
    };

    //Speed Dial: open/close buttons
    const handleCloseSpeedDial = () => {
        setOpenSpeedDial(false);
    };

    const handleOpenSpeedDial = () => {
        setOpenSpeedDial(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    //Add new exercise to this workout (Speed Dial)
    const onAddExercise = () => {
        setOpenDialog(true);
    };

    const onAddSelectedExercise = (id) => {
        const workoutDay = {
            id: props.workout.workout.id
        };

        props.onAddExerciseToWorkout(id, workoutDay);
        setOpenDialog(false);
    };

    //Skip this workout (Speed Dial)
    const onSkipWorkout = () => {
        props.onSkipWorkout(props.workout.workout.id);
    };

    let errorLines = [];

    errorLines.push(
        <div key={ 'err' } className={ classes.root }>
            <Alert severity="warning">Workout Plan has not been created. Create Starting Details and generate a
                Plan</Alert>
        </div>
    );

    let exerciseLines = [];

    //Exercise selected from the list -> start workout
    if (startWorkout) {
        exerciseLines = (
            <WorkoutExercise
                exercise={selectedExercise}
                onStartWorkout={onStartWorkout}
            />
            )
    } else {
        exerciseLines = (
            <>
                <Header header={ "Next workout" }/>
                <div>
                    <SpeedDial
                        ariaLabel="SpeedDial example"
                        className={ classes.speedDial }
                        hidden={ hidden }
                        icon={ <SpeedDialIcon/> }
                        onClose={ handleCloseSpeedDial }
                        onOpen={ handleOpenSpeedDial }
                        open={ openSpeedDial }
                    >
                        <SpeedDialAction
                            key='start'
                            icon={ <Add/> }
                            tooltipTitle='Add exercise'
                            onClick={ onAddExercise }
                            title='Add exercise'
                        />
                        <SpeedDialAction
                            key='skip'
                            icon={ <SkipNext/> }
                            tooltipTitle='Skip workout'
                            onClick={ onSkipWorkout }
                            title='Skip workout'
                        />
                    </SpeedDial>
                </div>

                <WorkoutDetails
                    workout={ props.workout.workout }
                    onStartWorkout={ onStartWorkout }
                    onDeleteExercise={ onDeleteExercise }
                />

                <AddExercise
                    exercises={ props.exercise.exercises }
                    openDialog={ openDialog }
                    handleCloseDialog={ handleCloseDialog }
                    onAddSelectedExercise={ onAddSelectedExercise }
                />
            </>
        );
    }

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
        onDeleteExerciseFromWorkout: (id) => dispatch(actions.deleteExerciseFromWorkout(id)),
        onAddExerciseToWorkout: (id, workoutDay) => dispatch(actions.addExerciseToWorkout(id, workoutDay))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(NextWorkout);

