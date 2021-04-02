import React from 'react';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import {Add, SkipNext} from '@material-ui/icons';
import {makeStyles} from '@material-ui/core/styles';

const styles = makeStyles((theme) => ({
        speedDial: {
            margin: theme.spacing(1),
            position: "fixed",
            bottom: theme.spacing(2),
            right: theme.spacing(3),
            opacity: 0.8
        }
    })
);

const SpeedDialButtons = props => {

    // Properties
    const {speedDialOpen, onAddExercise, onSkipWorkout, onCloseSpeedDial, onOpenSpeedDial} = props;
    // Styling
    const classes = styles();

    return (
        <SpeedDial
            ariaLabel="SpeedDial example"
            className={ classes.speedDial }
            icon={ <SpeedDialIcon/> }
            onClose={ onCloseSpeedDial }
            onOpen={ onOpenSpeedDial }
            open={ speedDialOpen }
        >
            <SpeedDialAction
                key='start'
                icon={ <Add/> }
                tooltipTitle='Add exercise'
                onClick={ onAddExercise }
                title='Add exercise'
            />
            <SpeedDialAction
                key='skip'
                icon={ <SkipNext/> }
                tooltipTitle='Skip workout'
                onClick={ onSkipWorkout }
                title='Skip workout'
            />
        </SpeedDial>
    );
};

export default SpeedDialButtons;
