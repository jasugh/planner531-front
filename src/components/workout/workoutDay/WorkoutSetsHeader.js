import React from 'react';
import {Grid, Typography} from '@material-ui/core';

const WorkoutSetsHeader = () => {

    return (
        <Grid container justify='space-around' alignItems='center'>
            <Grid item></Grid>
            <Grid item style={ {marginLeft: 15, paddingTop: 0, paddingBottom: 0} }>
                <Typography
                    variant="caption"
                >
                    Kgs
                </Typography>
            </Grid>
            <Grid item>
                <Typography
                    variant="caption"
                >
                    Reps
                </Typography>
            </Grid>
            <Grid item></Grid>
        </Grid>
    );
};

export default WorkoutSetsHeader;
