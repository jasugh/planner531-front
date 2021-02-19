import React, {useState} from 'react';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {makeStyles} from '@material-ui/core/styles';
import Select from '@material-ui/core/Select';

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

    // Properties
    const {assistanceExercises, exerciseDialogOpen, onCloseExerciseDialog, onAddSelectedExercise} = props;
    // Styling
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
            { assistanceExercises.map((row, index) => {
                return (
                    <option key={ row.name } value={ row.id }>
                        { row.name }
                    </option>
                );
            }) }
        </Select>
    );

    return (
        <Dialog open={ exerciseDialogOpen } onClose={ onCloseExerciseDialog } aria-labelledby="form-dialog-title">
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
                    disabled={!selectedExerciseId}
                >
                    add
                </Button>
                <Button
                    onClick={ onCloseExerciseDialog }
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
