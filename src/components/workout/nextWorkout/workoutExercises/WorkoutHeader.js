import React from 'react';
import {Grid, Typography} from '@material-ui/core';

const WorkoutHeader = props => {

    const {workout} = props;

    return (
        <Grid container style={ {paddingBottom: 10} } justify="center" alignItems="center">
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
                    { workout.day }
                </Typography>
            </Grid>
        </Grid>
    );
};

export default WorkoutHeader;
