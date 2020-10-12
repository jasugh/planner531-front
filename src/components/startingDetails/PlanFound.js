import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {Grid} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import SectionTitle from './SectionTitle';

const styles = makeStyles((theme) => ({
    buttonPadding: {
        marginTop: 50,
        margin: 5,
        width: 150,
        [theme.breakpoints.down("sm")]: {
            marginTop: 40,
            margin: 5,
            width: 150,
        }
    },
}));

const PlanFound = props => {
    // Properties
    const {onStartOver, onView} = props;
    // Styling
    const classes = styles();

    return (
        <div>
            <Grid style={ {padding: 20} } container justify="center" alignItems="center">
                <SectionTitle
                    toolTip={ "" }
                    title={ "A 5/3/1 exercise program has already been created. If you want to delete the old program " +
                    "and create a new one, then select 'Start Over'. Otherwise, select 'View'" }
                />

                <Button
                    className={ classes.buttonPadding }
                    size="large"
                    variant="contained"
                    color="primary"
                    onClick={ onStartOver }
                >
                    start over
                </Button>
                <Button
                    className={ classes.buttonPadding }
                    size="large"
                    variant="contained"
                    color="inherit"
                    onClick={ onView }
                >
                    View
                </Button>
            </Grid>
        </div>
    );
};

export default PlanFound;
