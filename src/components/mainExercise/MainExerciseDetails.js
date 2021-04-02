import React from 'react';
import {makeStyles} from '@material-ui/core/styles';

import {Grid} from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import InputAdornment from '@material-ui/core/InputAdornment';

const styles = makeStyles((theme) => ({
    buttonPadding: {
        marginTop: 20,
        margin: 5,
        width: 110,
        [theme.breakpoints.down("md")]: {
            marginTop: 20,
            margin: 5,
            width: 100,
        }
    },
    numberStyle: {
        width: 90,
        marginRight: 10,
    },
    oneRm: {
        width: 90,
    },
}));

const MainExerciseDetails = props => {
    const {
        mainExerciseData,
        error,
        onChangeMainExercise,
        calculate1RM,
        onUpdate,
    } = props;

    const classes = styles();

    const onChange = (event) => {
        onChangeMainExercise(event.target.name, event.target.value);
    };

    const onChangeKgReps = (event) => {
        calculate1RM(event.target.name, event.target.value);
    };

    return (
        <form>
            <Typography
                style={ {paddingTop: 10} }
                variant="subtitle2"
                color="primary"
            >
                Rest Time:
            </Typography>
            <TextField
                className={ classes.numberStyle }
                value={ mainExerciseData.restTime }
                error={ error.field === "restTimer" }
                helperText={ error.message }
                name="restTime"
                type="number"
                onChange={ onChange }
                InputProps={ {
                    endAdornment: <InputAdornment position="end">sec</InputAdornment>,
                    inputProps: {
                        min: "1",
                        max: "36000",
                        step: "1",
                    }
                } }
            />
            <Typography
                style={ {paddingTop: 10} }
                variant="subtitle2"
                color="primary"
            >
                Weight Increment:
            </Typography>
            <TextField
                className={ classes.numberStyle }
                value={ mainExerciseData.weightIncrement }
                error={ error.field === "weightIncrement" }
                helperText={ error.message }
                name="weightIncrement"
                type="number"
                onChange={ onChange }
                InputProps={ {
                    endAdornment: <InputAdornment position="end">kg</InputAdornment>,
                    inputProps: {
                        min: "2.5",
                        max: "20",
                        step: "2.5"
                    }
                } }
            />
            <Typography
                style={ {paddingTop: 10} }
                variant="subtitle2"
                color="primary"
            >
                1RM:
            </Typography>
            <TextField
                className={ classes.numberStyle }
                value={ mainExerciseData.oneRmKg }
                error={ error.field === 'pressKg' }
                name="oneRmKg"
                type="number"
                onChange={ onChangeKgReps }
                InputProps={ {
                    endAdornment: <InputAdornment position="end">kg</InputAdornment>,
                    inputProps: {
                        min: "1",
                        max: "500",
                        step: "1"
                    }
                } }
            />
            <TextField
                className={ classes.numberStyle }
                value={ mainExerciseData.oneRmReps }
                error={ error.field === 'pressKg' }
                name="oneRmReps"
                type="number"
                onChange={ onChangeKgReps }
                InputProps={ {
                    endAdornment: <InputAdornment position="end">reps</InputAdornment>,
                    inputProps: {
                        min: "1",
                        max: "20",
                        step: "1"
                    }
                } }
            />
            <TextField
                className={ classes.oneRm }
                disabled
                value={ mainExerciseData.oneRm }
                error={ error.field === 'pressKg' }
                helperText={ error.field === 'pressKg' ? error.message : '' }
                name="oneRm"
                type="number"
                InputProps={ {
                    endAdornment: <InputAdornment position="end">1RM</InputAdornment>,
                } }
            />
            <Grid container justify="center" alignItems="center">
                <Grid item>
                    <Button
                        type="submit"
                        className={ classes.buttonPadding }
                        size={ "medium" }
                        variant={ "contained" }
                        color="primary"
                        onClick={ onUpdate }
                    >
                        update
                    </Button>
                </Grid>
            </Grid>
        </form>
    );
};

export default MainExerciseDetails;
