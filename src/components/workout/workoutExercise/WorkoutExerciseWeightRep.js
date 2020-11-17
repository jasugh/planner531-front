import React, {useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {Grid} from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Remove from '@material-ui/icons/Remove';
import Input from '@material-ui/core/Input';
import isEmpty from '../../../validation/is-empty';
import Add from '@material-ui/icons/Add';
import FormHelperText from '@material-ui/core/FormHelperText';
import Button from '@material-ui/core/Button';
import WorkoutExerciseSets from './WorkoutExerciseSets';


const styles = makeStyles((theme) => ({
        //Kgs and Reps input
        inputCenter: {
            textAlign: "center",
            color: theme.palette.primary.main,
        },
        inputSize: {
            width: 100,
        },
        iconColor: {
            background: theme.palette.primary.light
        },
        //Buttons
        buttonPadding: {
            margin: 15,
            width: 110,
        },
    })
);

const WorkoutExerciseWeightRep = props => {
    const [error, setError] = useState('');
    const [index, setIndex] = useState('');

    //Properties
    const {kgs, reps, onAddKgs, onReduceKgs, onAddReps, onReduceReps} = props;
    //Styling
    const classes = styles();

    useEffect(() => {
    }, []);

    let save_update = 'update';
    let clear_delete = 'delete';


    const onSave = (event) => {
        // if (this.state.reps < 1) {
        //     setError({error: {reps: 'Please enter Reps'}});
        //     return;
        // }
        //
        // let w = this.state.workout;
        // let s = this.props.workout.selected_workout.workout.exercises[0].sets;
        //
        // const set = {
        //     kgs: this.state.kgs,
        //     reps: this.state.reps,
        //     comment: '',
        //     finished: false
        // };
        //
        // s.push(set);
        // w.exercises[0].sets = s;
        //
        // this.setState({workout: w});
    };

    const onChange = (event) => {
        // this.setState({[event.target.name]: event.target.value});
    };


    const onClear = (event) => {
        // this.setState({kgs: 0, reps: 0});
    };

    const onUpdate = (event) => {
        // let w = this.state.workout;
        // let s = this.props.workout.selected_workout.workout.exercises[0].sets;
        //
        // s[this.state.index].kgs = this.state.kgs;
        // s[this.state.index].reps = this.state.reps;
        // w.exercises[0].sets = s;
        //
        // this.setState({workout: w, index: ''});
    };

    const onDelete = (event) => {
        // let w = this.state.workout;
        // w.exercises[0].sets.splice(this.state.index, 1);
        // this.setState({workout: w, index: ''});
    };

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
                    className={ classes.iconColor }
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
                    className={ classes.iconColor }
                    style={ {marginLeft: 20} }
                    color="primary"
                    fontSize="large"
                    onClick={ onAddKgs }
                />
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
                    className={ classes.iconColor }
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
                    className={ classes.iconColor }
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
                    // style={ {
                    //     width: 150,
                    //     marginTop: 10,
                    //     marginBottom: 10
                    // } }
                    size="small"
                    variant={ "contained" }
                    color="primary"
                    onClick={ index === '' ? onSave : onUpdate }
                >
                    { save_update }
                </Button>
                <Button
                    className={ classes.buttonPadding }
                    // style={ {
                    //     width: 150,
                    //     marginTop: 10,
                    //     marginBottom: 10
                    // } }
                    size="small"
                    variant={ "contained" }
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
