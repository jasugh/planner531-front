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
        [theme.breakpoints.down("sm")]: {
            marginTop: 40,
            margin: 5,
            width: 100,
        }
    },
}));

const ExerciseDetails = props => {
    // Properties
    const {exerciseData, categoryList, buttonText, error, onChangeExercise, onAddUpdate, onDelete, onCancel} = props;
    // Styling
    const classes = styles();

    const onChange = (event) => {
        onChangeExercise(event.target.name, event.target.value);
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

            <Grid style={ {paddingTop: 20} } item xs={ 12 }>
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
                variant="subtitle2"
                color="primary"
            >
                Rest Time:
            </Typography>
            <TextField
                style={ {width: 100} }
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
                // style={{paddingLeft: 5}}
                variant="subtitle2"
                color="primary"
            >
                Weight Increment:
            </Typography>
            <TextField
                style={ {width: 100} }
                value={ exerciseData.weightIncrement }
                error={ error.field === "weightIncrement" }
                helperText={ error.message }
                name="weightIncrement"
                type="number"
                onChange={ onChange }
                InputProps={ {
                    endAdornment: <InputAdornment position="end">kg</InputAdornment>,
                    inputProps: {
                        min: "0.5",
                        max: "20",
                        step: "0.5"
                    }
                } }
            />
            <Typography
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
