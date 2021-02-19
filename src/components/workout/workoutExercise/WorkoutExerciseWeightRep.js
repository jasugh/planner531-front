import React, {useEffect, useState} from 'react';
import {Grid} from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Remove from '@material-ui/icons/Remove';
import Input from '@material-ui/core/Input';
import isEmpty from '../../../validation/is-empty';
import Add from '@material-ui/icons/Add';
import FormHelperText from '@material-ui/core/FormHelperText';
import Button from '@material-ui/core/Button';
import {makeStyles} from '@material-ui/core/styles';

const styles = makeStyles((theme) => ({
        //Kgs and Reps input
        inputCenter: {
            textAlign: "center",
            color: theme.palette.primary.main,
        },
        inputSize: {
            width: 100,
        },
        minusPlusColor: {
            background: theme.palette.button.secondary
        },
        //Buttons
        buttonPadding: {
            margin: 15,
            width: 110,
        },
    })
);

const WorkoutExerciseWeightRep = props => {
    //Properties
    const {
        kgs,
        reps,
        index,
        error,
        onAddKgs,
        onReduceKgs,
        onAddReps,
        onReduceReps,
        onSave,
        onUpdate,
        onChange,
        onClear,
        onDelete
    } = props;

    //Styling
    const classes = styles();

    let save_update = 'update';
    let clear_delete = 'delete';

    if (index === '') {
        save_update = 'save';
        clear_delete = 'clear';
    }

    return (
        <>
            <Grid container justify="center">
                <Typography
                    id="kgs"
                    variant="caption"
                    color="primary"
                >
                    Weight:
                </Typography>
            </Grid>

            <Grid container justify="center">
                <Remove
                    className={ classes.minusPlusColor }
                    style={ {marginRight: 20} }
                    color="primary"
                    fontSize="large"
                    onClick={ onReduceKgs }
                />
                <Input
                    className={ classes.inputSize }
                    classes={ {
                        input: classes.inputCenter,
                        underline: classes.underline
                    } }
                    style={ {fontKgs: 580, fontSize: 20} }
                    value={ kgs }
                    name="kgs"
                    readOnly={ false }
                    error={ !isEmpty(error.kgs) }
                    onChange={ onChange }
                />
                <Add
                    className={ classes.minusPlusColor }
                    style={ {marginLeft: 20} }
                    color="primary"
                    fontSize="large"
                    onClick={ onAddKgs }
                />
            </Grid>

            <Grid container justify="center">
                <FormHelperText
                    error={ !isEmpty(error.kgs) }
                >
                    { error.kgs }
                </FormHelperText>
            </Grid>

            <Grid container justify="center">
                <Typography
                    style={ {paddingTop: 10} }
                    variant="caption"
                    color="primary"
                >
                    Reps:
                </Typography>
            </Grid>

            <Grid container justify="center">
                <Remove
                    className={ classes.minusPlusColor }
                    color="primary"
                    fontSize="large"
                    style={ {marginRight: 20} }
                    onClick={ onReduceReps }
                />

                <Input
                    className={ classes.inputSize }
                    classes={ {
                        input: classes.inputCenter,
                        underline: classes.underline
                    } }
                    style={ {fontKgs: 580, fontSize: 20} }
                    value={ reps }
                    name="reps"
                    readOnly={ false }
                    error={ !isEmpty(error.reps) }
                    onChange={ onChange }
                />

                <Add
                    className={ classes.minusPlusColor }
                    style={ {marginLeft: 20} }
                    color="primary"
                    fontSize="large"
                    onClick={ onAddReps }
                />
            </Grid>

            <Grid container justify="center">
                <FormHelperText
                    error={ !isEmpty(error.reps) }
                >
                    { error.reps }
                </FormHelperText>
            </Grid>

            <Grid container justify="space-evenly">
                <Button
                    className={ classes.buttonPadding }
                    variant="contained"
                    color="primary"
                    onClick={ index === '' ? onSave : onUpdate }
                >
                    { save_update }
                </Button>
                <Button
                    className={ classes.buttonPadding }
                    variant="contained"
                    color={ index === '' ? "inherit" : "secondary" }
                    onClick={ index === '' ? onClear : onDelete }
                >
                    { clear_delete }
                </Button>
            </Grid>
        </>
    );
};

export default WorkoutExerciseWeightRep;
