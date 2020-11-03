import React from 'react';
import {Grid, Typography} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';

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

const WorkoutSetsHeader = props => {
    // Styling
    const classes = styles();
    // Properties
    const {workout} = props;

    return (
        <>
            <Grid container justify="center" alignItems="center">
                {/*<Grid item style={ {margin: 10} }>*/}
                {/*    <Typography*/}
                {/*        className={ classes.typographyHeader }*/}
                {/*        variant="subtitle1"*/}
                {/*        color="primary"*/}
                {/*    >*/}
                {/*        { workout.exercise.name }*/}
                {/*    </Typography>*/}
                {/*</Grid>*/}
            </Grid>
            <Grid container style={{marginTop: 10}} justify="center" alignItems="center">
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
        </>
    );
};

export default WorkoutSetsHeader;
