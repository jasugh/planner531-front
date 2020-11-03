import React from 'react';
import {Grid, Typography} from '@material-ui/core';

const WorkoutSets = props => {

    return (
        <Grid container justify="space-around" alignItems="center">
            <Grid item>
                { parseFloat(props.kgs).toFixed(1) }
            </Grid>
            <Grid item>
                { props.reps }
            </Grid>

        </Grid>
    );
};

export default WorkoutSets;
