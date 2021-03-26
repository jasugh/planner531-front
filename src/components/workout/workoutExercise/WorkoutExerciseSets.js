import React, {useState} from 'react';

import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import IconButton from '@material-ui/core/IconButton';
import Checkbox from '@material-ui/core/Checkbox';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import {Note, NoteAdd} from '@material-ui/icons';
import DialogContentText from '@material-ui/core/DialogContentText';
import TextField from '@material-ui/core/TextField';
import {makeStyles} from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import Tooltip from '@material-ui/core/Tooltip';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';


const styles = makeStyles((theme) => ({
//Table row selected ->
        tableRow: {
            "&$selected, &$selected:hover": {
                backgroundColor: theme.palette.background.secondary
                // backgroundColor: '#fafafa'
            }
        },
        selected: {},
//Table row selected <-

        dividerColor: {
            marginTop: 10,
            height:
                2,
            backgroundColor:
            theme.palette.primary.main,
        }
        ,
// blue         2196f3
// lightblue    03a9f4
// black        263238
// bluegrey     607d8b
// deeporange   ff5722
// red          f44336

        iconColor: {
            background: theme.palette.primary.main
        },
        noteAddColorLight: {
            color: theme.palette.primary.light
        },
        noteAddColorDark: {
            color: theme.palette.primary.main
        },
        paddingBottom: {
            paddingBottom: 10
        }
        ,
        inputSize: {
            width: 100,
        },
//Table
        noBorder: {
            border: 0,
        }
        ,
        kgsReps: {
            width: 5,
            border:
                0,
            paddingLeft:
                4,
        }
        ,
        kgRep: {
            width: 40,
            border:
                0,
            paddingRight:
                0,
        }
        ,
        tableCell1: {
            width: 400,
            border:
                0,
        }
        ,
        height: {
            height: 24
        },
        typography: {
            padding: theme.spacing(2),
        },
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
            right: theme.spacing(3),
            opacity: 0.8
        },
    })
);

const WorkoutExerciseSets = props => {
    //Properties
    const {
        exerciseSets,
        index,
        notes,
        addNotes,
        dialogOpen,
        alertOpen,
        onClickRow,
        onOpenNotesDialog,
        onCloseNotesDialog,
        onChangeNotes,
        onSaveNotes,
        onDeleteNotes,
        onClickFinished,
        onGoBack,
        onAlertClose,
        onGo,
        onStay,
    } = props;

    //Styling
    const classes = styles();

    let save_update_comment = 'save';
    let cancel_delete_comment = 'cancel';

    if (addNotes === false) {
        save_update_comment = 'update';
        cancel_delete_comment = 'delete';
    }

    return (
        <Grid container justify="center">
            <Table size="small">
                <TableBody>
                    { exerciseSets.map((sets_row, i) => {
                        return (
                            <TableRow
                                classes={ {selected: classes.selected} }
                                className={ classes.tableRow }
                                hover
                                selected={ i === index }
                                key={ i }
                            >
                                {/*TODO: korjaa alla olevat notes staten viittaukset */ }
                                <TableCell className={ classes.noBorder }>
                                    <IconButton
                                        className={ sets_row.notes ? classes.noteAddColorDark : classes.noteAddColorLight }
                                        style={ {padding: 0} }
                                        onClick={ () => onOpenNotesDialog(i) }
                                    >
                                        { sets_row.notes ? <Note/> : <NoteAdd/> }
                                    </IconButton>
                                </TableCell>
                                <TableCell
                                    className={ classes.noBorder }
                                    onClick={ () => onClickRow(sets_row.kgs, sets_row.reps, i) }
                                    name="index"
                                >
                                    { i + 1 }
                                </TableCell>
                                <TableCell
                                    className={ classes.kgRep }
                                    style={ {fontSize: '1.2rem'} }
                                    onClick={ () => onClickRow(sets_row.kgs, sets_row.reps, i) }
                                    name="index"
                                    align="right">
                                    { (() => {
                                        var num = parseFloat(sets_row.kgs);
                                        return num.toFixed(1);
                                    })() }
                                </TableCell>
                                <TableCell
                                    className={ classes.kgsReps }
                                    // style={{fontSize:'0.75rem'}}
                                    onClick={ () => onClickRow(sets_row.kgs, sets_row.reps, i) }
                                    name="index"
                                    align="right">
                                    kgs
                                </TableCell>
                                <TableCell
                                    className={ classes.kgRep }
                                    style={ {fontSize: '1.2rem'} }
                                    onClick={ () => onClickRow(sets_row.kgs, sets_row.reps, i) }
                                    name="index"
                                    align="right">
                                    { sets_row.reps }
                                </TableCell>
                                <TableCell
                                    className={ classes.kgsReps }
                                    // style={{fontSize:'0.75rem'}}
                                    onClick={ () => onClickRow(sets_row.kgs, sets_row.reps, i) }
                                    name="index"
                                    align="right">
                                    reps
                                </TableCell>
                                <TableCell className={ classes.noBorder }>
                                    <IconButton
                                        style={ {padding: 0} }
                                        color="primary"
                                    >
                                        <Checkbox
                                            style={ {padding: 0} }
                                            onChange={ () => onClickFinished(i) }
                                            value="finished"
                                            checked={ sets_row.finished }
                                            color="primary"
                                        >
                                        </Checkbox>
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        );
                    }) }
                </TableBody>
            </Table>


            <Dialog
                open={ alertOpen }
                onClose={ onAlertClose }
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{ "Next Exercise" }</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Sets complete. Do you want to go back to calendar?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={ onGo } color="primary" autoFocus>
                        Go
                    </Button>
                    <Button onClick={ onStay } color="primary">
                        Stay
                    </Button>

                </DialogActions>
            </Dialog>


            <Dialog open={ dialogOpen }
                    onClose={ onCloseNotesDialog }
                    aria-labelledby="form-dialog-title">
                <DialogTitle
                    id="form-dialog-title">
                    Notes
                </DialogTitle>
                <DialogContent>
                    {/*<DialogContentText>*/ }
                    {/*</DialogContentText>*/ }
                    <TextField
                        value={ notes }
                        onChange={ onChangeNotes }
                        autoFocus
                        margin="dense"
                        name="comment"
                        label="Notes"
                        type="text"
                        fullWidth
                        multiline={ true }
                    />
                </DialogContent>
                <DialogActions>
                    <Button
                        style={ {
                            width: 150,
                            marginTop: 10,
                            marginBottom: 10
                        } }
                        size="small"
                        variant={ "contained" }
                        color="primary"
                        onClick={ onSaveNotes }
                    >
                        { save_update_comment }
                    </Button>

                    <Button
                        style={ {
                            width: 150,
                            marginTop: 10,
                            marginBottom: 10
                        } }
                        size="small"
                        variant={ "contained" }
                        color={ addNotes ? "inherit" : "secondary" }
                        onClick={ addNotes ? onCloseNotesDialog : onDeleteNotes }
                    >
                        { cancel_delete_comment }
                    </Button>
                </DialogActions>
            </Dialog>

            <Fab
                className={ classes.fabBottom }
                color="primary"
                aria-label="goBack"
                onClick={ () => onGoBack() }
            >
                <Tooltip
                    title={ "Go back" }
                >
                    <ArrowBackIcon
                        color="inherit"
                    />
                </Tooltip>
            </Fab>

        </Grid>

    );
};

export default WorkoutExerciseSets;
