import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import {Grid} from '@material-ui/core';
import Card from '@material-ui/core/Card';
import WorkoutSets from './WorkoutSets';
import WorkoutSetsHeader from './WorkoutSetsHeader';
import Fab from '@material-ui/core/Fab';
import Tooltip from '@material-ui/core/Tooltip';
import {PlayArrow, SkipNext} from '@material-ui/icons';
import WorkoutHeader from './WorkoutHeader';
import isEmpty from '../../../validation/is-empty';

const styles = makeStyles((theme) => ({
        typographyHeader: {
            fontWeight: 700
        },
        fab: {
            bottom: theme.spacing(2),
            right: theme.spacing(2)
        },
    })
);

const WorkoutDetails = props => {
    // Styling
    const classes = styles();
    // Properties
    const {workout, onSkipWorkoutClick, onStartWorkoutClick} = props;

    if(isEmpty(workout)) return null;

    let exercises = workout.workoutDayExercises[0];

    let warmUpLines = [];
    warmUpLines.push(<WorkoutSetsHeader key={ 'W' }/>);
    warmUpLines.push(exercises.workoutDaySets.map((set, i) => {
        if (set.typeOfSet === 'W') {

            return (
                <WorkoutSets key={ 'W' + i }
                             kgs={ set.kgs }
                             reps={ set.reps }
                />
            );
        }
    }));

    let mainLines = [];
    mainLines.push(<WorkoutSetsHeader key={ 'M' }/>);
    mainLines.push(exercises.workoutDaySets.map((set, i) => {
        if (set.typeOfSet === 'M') {

            return (
                <WorkoutSets key={ 'M' + i }
                             kgs={ set.kgs }
                             reps={ set.reps }
                />
            );
        }
    }));

    let bbbLines = [];
    bbbLines.push(<WorkoutSetsHeader key={ 'B' }/>);
    bbbLines.push(exercises.workoutDaySets.map((set, i) => {
        if (set.typeOfSet === 'B') {

            return (
                <WorkoutSets key={ 'B' + i }
                             kgs={ set.kgs }
                             reps={ set.reps }
                />
            );
        }
    }));

    return (
        <>
            <Paper elevation={ 2 }>
                <WorkoutHeader
                    workout={ workout }
                />
            </Paper>

            <Card elevation={ 2 }>
                <Grid item style={ {margin: 5} }>
                    <Typography
                        className={ classes.typographyHeader }
                        variant="subtitle2"
                        color="primary"
                    >
                        { exercises.exercise.name } - Warmup
                    </Typography>
                </Grid>

                { warmUpLines }
            </Card>

            <Card elevation={ 2 }>
                <Grid item style={ {margin: 5} }>
                    <Typography
                        className={ classes.typographyHeader }
                        variant="subtitle2"
                        color="primary"
                    >
                        { exercises.exercise.name } - Main
                    </Typography>
                </Grid>
                { mainLines }
            </Card>

            <Card elevation={ 2 }>
                <Grid item style={ {margin: 5} }>
                    <Typography
                        className={ classes.typographyHeader }
                        variant="subtitle2"
                        color="primary"
                    >
                        { exercises.exercise.name } - BBB
                    </Typography>
                </Grid>
                { bbbLines }
            </Card>
            <Grid container style={ {marginTop: -100} } justify="flex-end" alignContent="flex-end" direction="column">
                <Fab
                    className={ classes.fab }
                    style={ {marginBottom: 10} }
                    color="primary"
                    aria-label="add"
                    onClick={ onSkipWorkoutClick }
                >
                    <Tooltip
                        title={ "Skip this workout" }
                    >
                        <SkipNext
                            color="inherit"
                        />
                    </Tooltip>
                </Fab>
                <Fab
                    className={ classes.fab }
                    color="primary"
                    aria-label="add"
                    onClick={ onStartWorkoutClick }
                >
                    <Tooltip
                        title={ "Start workout" }
                    >
                        <PlayArrow
                            color="inherit"
                        />
                    </Tooltip>
                </Fab>
            </Grid>
        </>
    );
};

export default WorkoutDetails;
