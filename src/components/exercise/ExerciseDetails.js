import React from 'react';
import {makeStyles} from '@material-ui/core/styles';

import {Grid} from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import InputAdornment from '@material-ui/core/InputAdornment';
import Select from '@material-ui/core/Select';

const styles = makeStyles((theme) => ({
    buttonPadding: {
        marginTop: 50,
        margin: 5,
        width: 110,
        [theme.breakpoints.down("md")]: {
            marginTop: 40,
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

const ExerciseDetails = props => {
    // Properties
    const {exerciseData, categoryList, buttonText, error, onChangeExercise, calculate1RM, onAddUpdate, onDelete, onCancel} = props;
    // Styling
    const classes = styles();

    const onChange = (event) => {
        onChangeExercise(event.target.name, event.target.value);
    };

    const onChangeKgReps = (event) => {
        calculate1RM(event.target.name, event.target.value);
    };

    return (
        <form>
            <Typography
                variant="subtitle2"
                color="primary"
            >
                Exercise:
            </Typography>
            <TextField
                value={ exerciseData.name }
                error={ error.field === "name" }
                helperText={ error.message }
                onChange={ onChange }
                required
                id="name"
                name="name"
                fullWidth
            />

            <Grid style={ {paddingTop: 10} } item xs={ 12 }>
                <Typography
                    variant="subtitle2"
                    color="primary"
                >
                    Category:
                </Typography>
                <Select
                    native
                    required
                    fullWidth
                    value={ exerciseData.categoryId }
                    onChange={ onChange }
                    name="categoryId"
                >
                    { categoryList.map((row, index) => {
                        return (
                            <option key={ row.id } value={ row.id }>
                                { row.name }
                            </option>
                        );
                    }) }
                </Select>
            </Grid>

            <Typography
                style={{paddingTop: 10}}
                variant="subtitle2"
                color="primary"
            >
                Rest Time:
            </Typography>
            <TextField
                className={ classes.numberStyle }
                value={ exerciseData.restTime }
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
                style={{paddingTop: 10}}
                variant="subtitle2"
                color="primary"
            >
                Weight Increment:
            </Typography>
            <TextField
                className={ classes.numberStyle }
                value={ exerciseData.weightIncrement }
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
                style={{paddingTop: 10}}
                variant="subtitle2"
                color="primary"
            >
                1RM:
            </Typography>
            <TextField
                className={ classes.numberStyle }
                value={ exerciseData.oneRmKg }
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
                value={ exerciseData.oneRmReps }
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
                value={ exerciseData.oneRm }
                error={ error.field === 'pressKg' }
                helperText={ error.field === 'pressKg' ? error.message : '' }
                name="oneRm"
                type="number"
                InputProps={ {
                    endAdornment: <InputAdornment position="end">1RM</InputAdornment>,
                } }
            />


            <Typography
                style={{paddingTop: 10}}
                variant="subtitle2"
                color="primary"
            >
                Notes:
            </Typography>
            <TextField
                value={ exerciseData.notes }
                onChange={ onChange }
                required
                id="notes"
                name="notes"
                fullWidth
            />
            <Grid item xs={ 12 }>
                <Button
                    type="submit"
                    className={ classes.buttonPadding }
                    size={ "medium" }
                    variant={ "contained" }
                    color="primary"
                    onClick={ onAddUpdate }
                >
                    { buttonText }
                </Button>
                <Button
                    disabled={ exerciseData.id === 0 }
                    className={ classes.buttonPadding }
                    size={ "medium" }
                    variant={ "contained" }
                    color="secondary"
                    onClick={ onDelete }
                >
                    delete
                </Button>
                <Button
                    className={ classes.buttonPadding }
                    size={ "medium" }
                    variant={ "contained" }
                    color="inherit"
                    onClick={ onCancel }
                >
                    cancel
                </Button>
            </Grid>
        </form>
    );
};

export default ExerciseDetails;
