import React, {useEffect} from 'react';
import * as actions from '../../../store/actions';
import {connect} from 'react-redux';
import {Grid} from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import Header from '../../common/Header';
import {makeStyles} from '@material-ui/core/styles';
import WorkoutDetails from './WorkoutDetails';
import WorkoutHeader from './WorkoutHeader';
import Paper from '@material-ui/core/Paper';

const styles = makeStyles((theme) => ({
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

const SelectedWorkout = props => {
    // Styling
    const classes = styles();

    let workoutLines = [];
    workoutLines = (
        <WorkoutHeader
            workout={ props.workout.workout }
        />
    );

    return (
        <>
            <div className={ classes.layout }>
                { workoutLines }
            </div>
        </>
    );
};

const mapStateToProps = state => {
    return {
        login: state.login,
        error: state.error,
        workout: state.workout
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onCompleteWorkout: (id) => dispatch(actions.completeWorkoutById(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SelectedWorkout);

