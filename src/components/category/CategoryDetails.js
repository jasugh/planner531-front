import React from 'react';
import {makeStyles} from '@material-ui/core/styles';

import {Grid} from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

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
}));

const CategoryDetails = props => {

    const {categoryData, buttonText, error, onChangeCategory, onAddUpdate, onDelete, onCancel} = props;
    const classes = styles();

    const onChange = (event) => {
        onChangeCategory(event.target.name, event.target.value);
    };

    return (
        <form>
            <Grid item>
                <Typography
                    variant="subtitle2"
                    color="primary"
                >
                    Category:
                </Typography>
                <TextField
                    value={ categoryData.name }
                    error={ error.field === "name" || error.field === "exercises" }
                    helperText={ error.message }
                    onChange={ onChange }
                    required
                    id="name"
                    name="name"
                    fullWidth
                />
            </Grid>

            <Grid item>
                <Typography
                    variant="subtitle2"
                    color="primary"
                >
                    Notes:
                </Typography>
                <TextField
                    value={ categoryData.notes }
                    onChange={ onChange }
                    id="notes"
                    name="notes"
                    fullWidth
                />
            </Grid>

            <Grid item>
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
                    type="button"
                    disabled={ categoryData.id === 0 }
                    className={ classes.buttonPadding }
                    size={ "medium" }
                    variant={ "contained" }
                    color="secondary"
                    onClick={ onDelete }
                >
                    delete
                </Button>
                <Button
                    type="button"
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

export default CategoryDetails;
