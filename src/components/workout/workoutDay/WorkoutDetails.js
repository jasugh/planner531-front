import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import {Grid} from '@material-ui/core';

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
    typographyHeader: {
        fontWeight: 700
    }
}));

const WorkoutDetails = props => {
    // Styling
    const classes = styles();
    // Properties
    const {workout} = props.workout;

    let warmUp = workout.workoutDaySets.filter((s) => s.typeOfSet === 'W');
    let main = workout.workoutDaySets.filter((s) => s.typeOfSet === 'M');
    let bbb = workout.workoutDaySets.filter((s) => s.typeOfSet === 'B');

    let warmUpLines = (
        <div>
            { warmUp.map((set, i) => {
                return (
                    <div key={ i }>
                        { set.kgs }
                        { set.reps }
                    </div>
                );
            }) }
        </div>
    );

    let mainLines = (
        <div>
            { main.map((set, i) => {
                return (
                    <div key={ i }>
                        { set.kgs }
                        { set.reps }
                    </div>
                );
            }) }
        </div>
    );
    let bbbLines = (
        <div>
            { bbb.map((set, i) => {
                return (
                    <div key={ i }>
                        { set.kgs }
                        { set.reps }
                    </div>
                );
            }) }
        </div>
    );

    return (
        <Paper className={ classes.paper } elevation={ 2 }>
            <Grid container justify="center" alignItems="center">
                <Grid item style={ {margin: 10} }>
                    <Typography
                        className={ classes.typographyHeader }
                        variant="subtitle1"
                        color="primary"
                    >
                        { workout.exercise.name }
                    </Typography>
                </Grid>
            </Grid>
            <Grid container justify="center" alignItems="center">
                <Grid item style={ {marginRight: 2} }>
                    <Typography
                        variant="subtitle2"
                        color="primary"
                    >
                        Cycle
                    </Typography>
                </Grid>
                <Grid item style={ {marginRight: 10} }>
                    <Typography
                        variant="subtitle2"
                        color="primary"
                    >
                        { workout.cycle }
                    </Typography>
                </Grid>
                <Grid item style={ {marginRight: 2} }>
                    <Typography
                        variant="subtitle2"
                        color="primary"
                    >
                        Week
                    </Typography>
                </Grid>
                <Grid item style={ {marginRight: 10} }>
                    <Typography
                        variant="subtitle2"
                        color="primary"
                    >
                        { workout.week }
                    </Typography>
                </Grid>
                <Grid item style={ {marginRight: 2} }>
                    <Typography
                        variant="subtitle2"
                        color="primary"
                    >
                        Day
                    </Typography>
                </Grid>
                <Grid item>
                    <Typography
                        variant="subtitle2"
                        color="primary"
                    >
                        { workout.dayNumber }
                    </Typography>
                </Grid>
            </Grid>

            <Grid container justify="center" alignItems="center">
                <Grid item style={ {margin: 10} }>
                    <Typography
                        className={ classes.typographyHeader }
                        variant="subtitle2"
                        color="primary"
                    >
                        Warmup
                    </Typography>
                    { warmUpLines }
                </Grid>
            </Grid>

            <Grid container justify="center" alignItems="center">
                <Grid item style={ {margin: 10} }>
                    <Typography
                        className={ classes.typographyHeader }
                        variant="subtitle2"
                        color="primary"
                    >
                        Main
                    </Typography>
                    { mainLines }
                </Grid>
            </Grid>

            <Grid container justify="center" alignItems="center">
                <Grid item style={ {margin: 10} }>
                    <Typography
                        className={ classes.typographyHeader }
                        variant="subtitle2"
                        color="primary"
                    >
                        BBB
                    </Typography>
                    { bbbLines }
                </Grid>
            </Grid>

        </Paper>
    );
};

export default WorkoutDetails;
