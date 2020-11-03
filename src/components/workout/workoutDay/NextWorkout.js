import React, {useEffect, useState} from 'react';
import * as actions from '../../../store/actions';
import {connect} from 'react-redux';

import MuiAlert from '@material-ui/lab/Alert';
import {makeStyles} from '@material-ui/core/styles';

import Header from '../../common/Header';
import WorkoutDetails from './WorkoutDetails';
import SelectedWorkout from './SelectedWorkout';
import Loading from '../../common/Loading';

function Alert(props) {
    return <MuiAlert elevation={ 6 } variant="filled" { ...props } />;
}

const styles = makeStyles((theme) => ({
    root: {
        width: '100%',
        marginTop: 20,
    },
    layout: {
        width: 400,
        marginLeft: 'auto',
        marginRight: 'auto',
        [theme.breakpoints.down('md')]: {
            width: 335,
            marginLeft: 'auto',
            marginRight: 'auto',
        }
    },
    fabBottom: {
        margin: theme.spacing(1),
        position: "fixed",
        bottom: theme.spacing(2),
        right: theme.spacing(3),
        zIndex: 1
    },
}));

const NextWorkout = props => {
    const [selectedWorkoutId, setSelectedWorkoutId] = useState('');

    useEffect(() => {
        if (props.login.id) {
            props.onGetNextWorkoutByLoginId(props.login.id);
        }
    }, [props.login.loading || props.workout.workout.completed]);

    // Styling
    const classes = styles();

    const onSkipWorkoutClick = () => {
        props.onSkipWorkout(props.workout.workout.id);
    };

    const onStartWorkoutClick = () => {
        setSelectedWorkoutId(props.workout.workout.id);
    };

    let errorLines = [];

    errorLines.push(
        <div key={ 'err' } className={ classes.root }>
            <Alert severity="warning">Workout plan has not been created.</Alert>
        </div>
    );


    let workoutLines = [];

    if (selectedWorkoutId) {
        workoutLines = (
            <>
                <Header header={ "Workout" }/>
                <SelectedWorkout
                    workout={ props.workout.workout }
                />
            </>
        );
    } else {
        workoutLines = (
            <>
                <Header header={ "Next workout" }/>
                <WorkoutDetails
                    workout={ props.workout.workout }
                    onSkipWorkoutClick={ onSkipWorkoutClick }
                    onStartWorkoutClick={ onStartWorkoutClick }
                />
            </>
        );
    }

    return (
        <>
            { props.login.loading || props.workout.loading || props.workoutDays.loading ?
                <Loading/>
                :
                <div>
                    { props.error.message === "" ?
                        workoutLines
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
        workoutDays: state.workoutDayReducer
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onGetNextWorkoutByLoginId: (loginId) => dispatch(actions.getNextWorkoutByLoginId(loginId)),
        onSkipWorkout: (id) => dispatch(actions.skipWorkoutById(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(NextWorkout);

