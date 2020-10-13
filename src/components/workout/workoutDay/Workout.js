import React, {useEffect} from 'react';
import * as actions from '../../../store/actions';
import {connect} from 'react-redux';
import {Grid} from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import Header from '../../common/Header';
import {makeStyles} from '@material-ui/core/styles';
import WorkoutDetails from './WorkoutDetails';

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
    }
}));

const Workout = props => {

    useEffect(() => {
        if(props.login.id) {
            props.onGetNextWorkoutByLoginId(props.login.id);
        }
    }, [props.login.loading]);

    // Styling
    const classes = styles();

    let workoutDetails = (
        <WorkoutDetails
        workout={props.workout}
        />
    );

    return (
        <>
            <Header header={ "Next workout" }/>

            <div className={ classes.layout }>
                { props.login.loading || props.workout.loading ?
                    <Grid container justify="center">
                        <CircularProgress/>
                    </Grid>
                    :
                    workoutDetails
                }
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
        onGetNextWorkoutByLoginId: (loginId) => dispatch(actions.getNextWorkoutByLoginId(loginId)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Workout);

