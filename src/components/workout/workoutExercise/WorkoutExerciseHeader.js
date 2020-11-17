import React from 'react';
import PropTypes from 'prop-types';
import Header from '../../common/Header';
import Fab from '@material-ui/core/Fab';
import Tooltip from '@material-ui/core/Tooltip';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import {makeStyles} from '@material-ui/core/styles';

const styles = makeStyles((theme) => ({
        //Fab
        fabTop: {
            position: 'fixed',
            top: theme.spacing(10),
            right: theme.spacing(2),
        },
        fabBottom: {
            position: "fixed",
            margin: theme.spacing(1),
            bottom: theme.spacing(2),
            right: theme.spacing(3)
        },
    })
);

const WorkoutExerciseHeader = props => {
    //Properties
    const {header, onStartWorkout} = props;
    //Styling
    const classes = styles();

    return (
        <>
            <Header header={ header }/>
            <Fab
                className={ classes.fabBottom }
                color="primary"
                aria-label="goBack"
                onClick={ onStartWorkout }
            >
                <Tooltip
                    title={ "Go back" }
                >
                    <ArrowBackIcon
                        color="inherit"
                    />
                </Tooltip>
            </Fab>
        </>
    );
};

Header.propTypes = {
    header: PropTypes.string
};

export default WorkoutExerciseHeader;
