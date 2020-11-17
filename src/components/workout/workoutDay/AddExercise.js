import React, {useState} from 'react';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {makeStyles} from '@material-ui/core/styles';
import {Grid} from '@material-ui/core';
import Select from '@material-ui/core/Select';
import List from '@material-ui/core/List';

const styles = makeStyles((theme) => ({
    layout: {
        width: 350,
        marginLeft: 'auto',
        marginRight: 'auto',
        [theme.breakpoints.down('md')]: {
            width: 295,
            marginLeft: 'auto',
            marginRight: 'auto',
        }
    },
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

const AddExercise = props => {
    const [selectedExerciseId, setSelectedExerciseId] = useState('');

    //Properties
    const {exercises, openDialog, handleCloseDialog, onAddSelectedExercise} = props;
    //Styling
    const classes = styles();

    const onChange = (event) => {
        setSelectedExerciseId(event.target.value);
    };

    const selectLines = [];
    selectLines.push(
        <Select
            key={ 's' }
            native
            fullWidth
            onChange={ onChange }
            name="name"
        >
            <option value="">
                Select exercise...
            </option>
            { exercises.map((row, index) => {
                return (
                    <option key={ row.name } value={ row.id }>
                        { row.name }
                    </option>
                );
            }) }
        </Select>
    );

    return (
        <Dialog open={ openDialog } onClose={ handleCloseDialog } aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Add Exercise</DialogTitle>
            <DialogContent className={classes.layout}>
                <DialogContentText/>
                { selectLines }
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={ () => onAddSelectedExercise(selectedExerciseId) }
                    className={ classes.buttonPadding }
                    size={ "medium" }
                    variant={ "contained" }
                    color="primary"
                >
                    add
                </Button>
                <Button
                    onClick={ handleCloseDialog }
                    className={ classes.buttonPadding }
                    size={ "medium" }
                    variant={ "contained" }
                    color="inherit"
                >
                    cancel
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default AddExercise;
